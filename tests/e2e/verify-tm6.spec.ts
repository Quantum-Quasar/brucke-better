import { test, expect, type Page } from "@playwright/test";
import { LESSONS } from "../../src/data/lessons";
import type { ExerciseItem, Lesson } from "../../src/lib/types";

// All navigation is relative so the suite follows `use.baseURL` from
// playwright.config.ts (PLAYWRIGHT_PORT), instead of pinning a port here.

const STORAGE_KEY = "brucke_app_state_v1";

const SEED = JSON.stringify({
  activeLanguageId: "de",
  hasCompletedOnboarding: true,
  isOnboardingOpen: false,
  seenIntroLanguages: ["de"],
  settings: { posturePrimerSeen: true, showPostureCues: true, listeningSkippedUntil: 0 },
});

async function seed(page: Page) {
  // Seed once: addInitScript re-runs on every navigation, so only write when the
  // store is absent — otherwise a reload would wipe state the test just set.
  await page.addInitScript(
    ([k, v]) => {
      if (!window.localStorage.getItem(k as string)) window.localStorage.setItem(k as string, v as string);
    },
    [STORAGE_KEY, SEED] as const
  );
}

const readAppState = async (page: Page) => {
  // Flush the store's idle-deferred write first, like a closing tab would.
  await page.evaluate(() => window.dispatchEvent(new Event("pagehide")));
  return page.evaluate((key) => {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    // schema v2 keeps progress only in the active language's slice; expose it
    // at the top level so assertions read the same shape as the store
    const parsed = JSON.parse(raw);
    const slice = parsed?.progressByLanguage?.[parsed.activeLanguageId];
    return slice ? { ...parsed, ...slice } : parsed;
  }, STORAGE_KEY);
};

/* -------------------------------------------------------------------------- */
/* Authored lesson data                                                       */
/*                                                                            */
/* Exercises are answered from the authored content, not from remembered      */
/* option positions: the widgets deterministically shuffle MCQ options and    */
/* tiles, so "option 1" / "tiles 1 then 2" are not stable answers.            */
/* -------------------------------------------------------------------------- */

function lessonById(lessonId: number): Lesson {
  const found = (LESSONS as Lesson[]).find((l) => l.id === lessonId);
  if (!found) throw new Error(`lesson ${lessonId} is not authored`);
  return found;
}

/** The authored exercise at a practice position (0-based, matching practiceIndex). */
function exerciseAt(lessonId: number, index: number): ExerciseItem {
  const exercise = lessonById(lessonId).exercises[index];
  if (!exercise) throw new Error(`lesson ${lessonId} has no exercise at position ${index + 1}`);
  return exercise;
}

/**
 * The visible label of an option/tile button, minus the keycap digit the widget
 * renders beside it (before the label on tiles, after it on MCQ options).
 */
function labelWithoutKeycap(raw: string): string {
  return raw
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^\d+\s+/, "")
    .replace(/\s+\d+$/, "")
    .trim();
}

/**
 * Click the enabled on-screen button whose label is `text` exactly.
 *
 * There is no "this option is correct" marker in the DOM, so the caller passes
 * the authored answer: the assertion is that the correct option/tile is
 * rendered and answerable, wherever the shuffle happened to put it.
 */
async function clickLabelledButton(page: Page, text: string): Promise<boolean> {
  const buttons = page.getByRole("button");
  const count = await buttons.count();
  for (let i = 0; i < count; i++) {
    const button = buttons.nth(i);
    if (!(await button.isEnabled().catch(() => false))) continue;
    if (!(await button.isVisible().catch(() => false))) continue;
    // the tile rack keeps already-picked tiles on screen — those unpick
    if ((await button.getAttribute("title")) === "Click or press Backspace to unpick") continue;
    const label = labelWithoutKeycap((await button.innerText().catch(() => "")) ?? "");
    if (label === text) {
      await button.click();
      return true;
    }
  }
  return false;
}

/** Answer a shuffle-proof shift_select: the option whose label is the target. */
async function answerShiftSelect(page: Page, lessonId: number, index: number) {
  const exercise = exerciseAt(lessonId, index);
  if (exercise.type !== "shift_select" || !exercise.options?.length) {
    throw new Error(`lesson ${lessonId} problem ${index + 1} is not a shift_select`);
  }
  const answered = await clickLabelledButton(page, exercise.target_answer);
  expect(
    answered,
    `the correct option ${JSON.stringify(exercise.target_answer)} should be on screen`
  ).toBe(true);
}

/**
 * Plan tile picks that spell the answer: longest tile that continues the
 * remaining text, repeatedly. Covers both compact answers ("die" = d + ie) and
 * ones built from a stem plus a suffix ("danken" = dank + en).
 */
function planTiles(tileOptions: string[], target: string): string[] {
  const remaining = tileOptions.map((tile) => tile.trim()).filter(Boolean);
  let rest = target.trim();
  const plan: string[] = [];
  while (rest.length > 0) {
    const next = remaining
      .map((tile, index) => ({ tile, index }))
      .filter(({ tile }) => rest.startsWith(tile))
      .sort((a, b) => b.tile.length - a.tile.length)[0];
    if (!next) {
      throw new Error(`no tile in ${JSON.stringify(tileOptions)} continues ${JSON.stringify(rest)}`);
    }
    plan.push(next.tile);
    remaining.splice(next.index, 1);
    rest = rest.slice(next.tile.length);
  }
  return plan;
}

/** Build a morpheme_tiles answer by clicking the rendered tiles that spell it. */
async function buildTiles(page: Page, lessonId: number, index: number) {
  const exercise = exerciseAt(lessonId, index);
  if (exercise.type !== "morpheme_tiles" || !exercise.tile_options?.length) {
    throw new Error(`lesson ${lessonId} problem ${index + 1} is not a morpheme_tiles`);
  }
  const plan = planTiles(exercise.tile_options, exercise.target_answer);
  for (const tile of plan) {
    const picked = await clickLabelledButton(page, tile);
    expect(picked, `tile ${JSON.stringify(tile)} should be on screen`).toBe(true);
    await page.waitForTimeout(150);
  }
  // the picks really do spell the authored answer
  expect(plan.join("")).toBe(exercise.target_answer.trim());
}

/**
 * Complete a matching_pairs exercise by pairing each authored English label with
 * its authored partner. The German column is deterministically shuffled, so
 * "press 1 then 2" was only ever a guess — and a wrong guess queues a retry that
 * shifts every later problem in the drill. Pairing by label is always right.
 */
async function solveMatchingPairs(page: Page, lessonId: number, index: number) {
  const exercise = exerciseAt(lessonId, index);
  if (exercise.type !== "matching_pairs" || !exercise.matching_pairs?.length) {
    throw new Error(`lesson ${lessonId} problem ${index + 1} is not a matching_pairs`);
  }
  for (const pair of exercise.matching_pairs) {
    expect(
      await clickLabelledButton(page, pair.english),
      `English card ${JSON.stringify(pair.english)} should be on screen`
    ).toBe(true);
    await page.waitForTimeout(150);
    expect(
      await clickLabelledButton(page, pair.german),
      `German card ${JSON.stringify(pair.german)} should be on screen`
    ).toBe(true);
    await page.waitForTimeout(250);
  }
  await expect(page.getByText(/matched perfectly/i).first()).toBeVisible({ timeout: 15_000 });
}

/* -------------------------------------------------------------------------- */

/**
 * Submit the current answer (when it needs submitting) and dismiss the feedback
 * sheet that follows.
 *
 * The widgets ignore the global Enter shortcut while a button has focus — tile
 * picks leave focus on the last tile — so click the widget's own verify button
 * when it renders one. shift_select and matching_pairs self-submit, so their
 * sheet is already open and no submit click is needed.
 */
async function settle(page: Page, submit = false) {
  if (submit) {
    const verify = page.getByRole("button", { name: /^verify/i }).first();
    if (await verify.count()) {
      await verify.click().catch(() => {});
    } else {
      await page.keyboard.press("Enter").catch(() => {});
    }
    await page.waitForTimeout(600);
  }
  for (let i = 0; i < 25; i++) {
    const cont = page.getByRole("button", { name: /^continue/i }).first();
    if (await cont.count()) {
      await cont.click().catch(() => {});
      await page.waitForTimeout(800);
      return;
    }
    await page.waitForTimeout(300);
  }
  throw new Error("expected a feedback sheet with a continue button");
}

/**
 * Click a wizard button, retrying until the next stage is actually rendered: on
 * a cold dev-server page the click can land before React hydrates and be
 * swallowed. The retry returns early once the target stage is already on
 * screen, so a click that worked but rendered slowly cannot be repeated.
 */
async function clickStage(page: Page, clickLabel: RegExp, waitFor: RegExp) {
  await expect(async () => {
    if (await page.getByText(waitFor).first().isVisible().catch(() => false)) return;
    await page.locator("button").filter({ hasText: clickLabel }).first().click({ timeout: 5_000 });
    await expect(page.getByText(waitFor).first()).toBeVisible({ timeout: 5_000 });
  }).toPass({ timeout: 90_000 });
}

/** Walk hook → pattern → table → the first practice problem. */
async function startDrill(page: Page, totalExercises: number) {
  await clickStage(page, /next: pattern/i, /next: transformation table/i);
  await clickStage(page, /transformation table/i, /start exercises/i);
  await clickStage(page, /start exercises/i, new RegExp(`problem 1 of ${totalExercises}`, "i"));
}

test("panorama renders five structure diagrams and is reachable from the dock", async ({ page }) => {
  await seed(page);
  await page.goto("/panorama");
  // the H1 names the active language: "The whole German structure, on one page"
  await expect(page.getByRole("heading", { name: /whole .*structure, on one page/i })).toBeVisible();
  expect(await page.locator("table").count()).toBe(5);
  await expect(page.getByText("she / her").first()).toBeVisible();
  await expect(page.getByText("who gets the result (dative)")).toBeVisible();
  await expect(page.getByText("den").first()).toBeVisible();
  await expect(page.getByRole("link", { name: /panorama/i }).first()).toBeVisible();
});

test("sprig 1003 plants the D- + pronoun frame, the trap note and the foreshadow", async ({ page }) => {
  await seed(page);
  await page.goto("/trail/1003");
  await expect(page.getByRole("heading", { name: "The Articles Are Pronouns in Disguise" })).toBeVisible();
  await expect(page.getByText(/wearing a D- hat/i).first()).toBeVisible();
  await expect(page.getByText(/D- \+ sie/).first()).toBeVisible();
  // the open loop is planted on the hook card itself
  await expect(page.getByText(/you have not met the case that moves die/i).first()).toBeVisible();

  // the name-the-shortcut panel only exists on the pattern segment
  await clickStage(page, /next: pattern/i, /the shortcut your mind will offer/i);
  await expect(
    page.getByText(/Your mind will offer: .the article depends on whether the thing is male or female/i).first()
  ).toBeVisible();
  await expect(page.getByText(/die Hand is a she-word/i).first()).toBeVisible();
});

test("the listening drill plays audio and one skip silences it for 15 minutes", async ({ page }) => {
  const errs: string[] = [];
  page.on("pageerror", (e) => errs.push(e.message));

  await seed(page);
  await page.goto("/trail/1003");
  await startDrill(page, lessonById(1003).exercises.length);

  // e1 — shift_select (submits on selection). The widget shuffles the authored
  // options, so the answer is found by its label, not by an option index. A
  // correct answer is what carries the "I guessed" affordance.
  await answerShiftSelect(page, 1003, 0);
  await expect(page.getByRole("button", { name: /I guessed/i }).first()).toBeVisible({ timeout: 15_000 });
  await settle(page);

  // e2 — matching_pairs: pair the authored cards (the German column is shuffled)
  await solveMatchingPairs(page, 1003, 1);
  await settle(page);

  // e3 — morpheme_tiles: click the tiles that spell the authored answer
  await buildTiles(page, 1003, 2);
  await settle(page, true);

  // e4 — the dictation
  await expect(page.getByText(/^Listen and write/i).first()).toBeVisible({ timeout: 25_000 });
  const playButton = page.getByRole("button", { name: /^(Play|Listen \(\d+\/\d+ used\))$/i }).first();
  await expect(playButton).toBeVisible();
  expect(errs, `uncaught page errors: ${errs.join(" | ")}`).toEqual([]);

  // the replay budget is stated on the card, and the audio affordance is real
  await expect(page.getByText(/Replays are capped on purpose/i).first()).toBeVisible();
  await expect(playButton).toBeEnabled();

  // one skip silences every listening exercise for 15 minutes
  await page.getByRole("button", { name: /I can.t listen right now/i }).click();
  await expect(page.getByText(/Listening is off/i).first()).toBeVisible();
  await expect(page.getByText(/Der Tisch und die Hand und das Buch/).first()).toBeVisible();
  await expect(page.getByRole("button", { name: /play it anyway/i })).toBeVisible();

  // the skip is persisted state, not component state
  const skippedUntil = (await readAppState(page))?.settings?.listeningSkippedUntil;
  expect(typeof skippedUntil, "listeningSkippedUntil should be a persisted timestamp").toBe("number");
  const remaining = Number(skippedUntil) - Date.now();
  expect(remaining).toBeGreaterThan(14 * 60 * 1000);
  expect(remaining).toBeLessThanOrEqual(15 * 60 * 1000);

  await page.reload();
  // the open view is not restored after a reload; re-open the lesson and
  // confirm the persisted listening skip still silences the drill
  await page.goto("/trail/1003");
  await expect(page.getByText(/listening off for/i).first()).toBeVisible();
});

test("the 30-second detour trough fires mid-lesson, ungraded and skippable", async ({ page }) => {
  await seed(page);
  await page.goto("/trail/4");
  await startDrill(page, lessonById(4).exercises.length);

  // e1 — morpheme tiles: the tiles are shuffled, so build the authored answer
  // from the tiles that spell it ("dank" + "en" = danken today, not necessarily
  // tiles 1 and 2).
  await buildTiles(page, 4, 0);
  await settle(page, true);

  // e2 — matching pairs: pair the authored cards (the German column is shuffled)
  await solveMatchingPairs(page, 4, 1);
  await settle(page);

  // the trough sits after the second exercise, before the third
  await expect(page.getByText(/for interest — not on the test/i).first()).toBeVisible({ timeout: 20_000 });
  await expect(page.getByText(/Thou\/Thee & Donner/i).first()).toBeVisible();
  // it is skippable, and skipping is an ordinary dismissal — no grade, no gate
  await expect(page.getByRole("button", { name: /back to the exercise/i }).first()).toBeVisible();
  await page.getByRole("button", { name: /back to the exercise/i }).first().click();
  await page.waitForTimeout(1000);
  // the trough is gone (the margin-note badge for the same footnote legitimately stays)
  await expect(page.getByRole("button", { name: /back to the exercise/i })).toHaveCount(0);

  // and the drill is still where it was, at the third exercise
  const after = await page.locator("body").innerText();
  const totalExercises = lessonById(4).exercises.length;
  expect(after, "should be back at the third exercise after dismissing the trough").toMatch(
    new RegExp(`problem 3 of ${totalExercises}`, "i")
  );
});
