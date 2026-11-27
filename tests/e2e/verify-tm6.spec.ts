import { GERMAN_ROUTE_A } from "../../src/tests/fixtures/german-trail-routes";
import { test, expect, type Page } from "@playwright/test";
import { LESSONS } from "../../src/data/lessons";
import type { ExerciseItem, Lesson } from "../../src/lib/types";

// All navigation is relative so the suite follows `use.baseURL` from
// playwright.config.ts (PLAYWRIGHT_PORT), instead of pinning a port here.

const STORAGE_KEY = "brucke_app_state_v1";

const SEED = {
  activeLanguageId: "de",
  hasCompletedOnboarding: true,
  isOnboardingOpen: false,
  seenIntroLanguages: ["de"],
  settings: { posturePrimerSeen: true, showPostureCues: true, listeningSkippedUntil: 0, voiceGuidanceDismissed: ["de", "fr", "es", "nl"] },
};

async function seed(page: Page, progress: { placedAtTopic?: number; completedLessons?: number[] } = {}) {
  // Seed once: addInitScript re-runs on every navigation, so only write when the
  // store is absent — otherwise a reload would wipe state the test just set.
  await page.addInitScript(
    ([k, v]) => {
      if (!window.localStorage.getItem(k as string)) window.localStorage.setItem(k as string, v as string);
    },
    [STORAGE_KEY, JSON.stringify({ ...SEED, ...progress })] as const
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
  let target = -1;
  await expect.poll(async () => {
    const count = await buttons.count();
    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      if (!(await button.isEnabled().catch(() => false))) continue;
      if (!(await button.isVisible().catch(() => false))) continue;
      if ((await button.getAttribute("title")) === "Click or press Backspace to unpick") continue;
      const label = labelWithoutKeycap((await button.innerText().catch(() => "")) ?? "");
      if (label === text) {
        target = i;
        return true;
      }
    }
    return false;
  }, { message: `Expected button "${text}" to appear` }).toBe(true);
  await buttons.nth(target).click();
  return true;
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

async function settle(page: Page, submit = false) {
  if (submit) await page.getByRole("button", { name: /^verify/i }).click();
  const correct = page.getByRole("dialog", { name: "correct", exact: true });
  await correct.getByRole("button", { name: /^continue/i }).click();
  await expect(correct).toBeHidden();
}

async function startDrill(page: Page, lessonId: number, { skipWarmup = false } = {}) {
  const lesson = page.getByRole("dialog", { name: `Lesson ${lessonId}`, exact: true });
  await expect(lesson.getByRole("heading", { name: lessonById(lessonId).title, exact: true })).toBeVisible();
  await expect(lesson.getByText(/Preview only:/)).toBeHidden();
  await lesson.getByRole("button", { name: /^next: pattern/i }).click();
  if (skipWarmup) await lesson.getByRole("button", { name: "Skip to pattern", exact: true }).click();
  await lesson.getByRole("button", { name: /^next: transformation table/i }).click();
  await lesson.getByRole("button", { name: /^start exercises/i }).click();
  await expect(lesson.getByText(`problem 1 of ${lessonById(lessonId).exercises.length}`, { exact: true })).toBeVisible();
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

test("dictation requests speech and a 15-minute mute survives reload and expires", async ({ page }) => {
  const errs: string[] = [];
  page.on("pageerror", (e) => errs.push(e.message));

  await page.addInitScript(() => {
    const synthesis = window.speechSynthesis;
    const speak = synthesis.speak.bind(synthesis);
    synthesis.speak = (utterance) => {
      speak(utterance);
      performance.mark("dictation-speak", { detail: utterance.text });
    };
  });
  await seed(page, { completedLessons: [...GERMAN_ROUTE_A.slice(0, 4).flat(), 1001] });
  await page.goto("/trail/1003");
  await startDrill(page, 1003);

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

  const dictation = exerciseAt(1003, 3);
  const spoken = dictation.spoken ?? dictation.target_answer;
  const speechRequests = () => page.evaluate((text) =>
    performance.getEntriesByName("dictation-speak", "mark")
      .filter((entry) => (entry as PerformanceMark).detail === text).length, spoken);
  await expect.poll(speechRequests).toBe(1); // Autoplay uses the first hearing.
  await expect(page.getByText(/Replays are capped on purpose/i)).toBeVisible();
  await page.getByRole("button", { name: /^Listen \(1\/\d+ used\)$/i }).click();
  await expect.poll(speechRequests).toBe(2);
  expect(errs, `uncaught page errors: ${errs.join(" | ")}`).toEqual([]);

  await page.getByRole("button", { name: "Mute listening for 15 min", exact: true }).click();
  await expect(page.getByText("Listening is off", { exact: true })).toBeVisible();
  await expect(page.getByText(spoken, { exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "play it anyway", exact: true })).toBeVisible();

  // the skip is persisted state, not component state
  const skippedUntil = (await readAppState(page))?.settings?.listeningSkippedUntil;
  expect(typeof skippedUntil, "listeningSkippedUntil should be a persisted timestamp").toBe("number");
  const remaining = Number(skippedUntil) - Date.now();
  expect(remaining).toBeGreaterThan(14 * 60 * 1000);
  expect(remaining).toBeLessThanOrEqual(15 * 60 * 1000);

  await page.reload();
  await expect(page.getByText(/listening off for/i).first()).toBeVisible();

  // Closing the tab must not clear the environmental pause.
  const reopened = await page.context().newPage();
  await page.close();
  await reopened.goto("/?lesson=1003&lang=de");
  await expect(reopened.getByText(/listening off for/i).first()).toBeVisible();
  expect((await readAppState(reopened))?.settings?.listeningSkippedUntil).toBe(skippedUntil);

  // Reopening after expiry must not restart a fresh 15-minute window.
  await reopened.clock.install({ time: new Date(Number(skippedUntil) + 1) });
  await reopened.reload();
  await expect(reopened.getByRole("button", { name: "Mute listening for 15 min", exact: true })).toBeVisible();
  await expect(reopened.getByText(/listening off for/i)).toBeHidden();
  expect((await readAppState(reopened))?.settings?.listeningSkippedUntil).toBe(skippedUntil);
});

test("the 30-second detour trough fires mid-lesson, ungraded and skippable", async ({ page }) => {
  await seed(page, { completedLessons: [1, 2, 3] });
  await page.goto("/trail/4");
  await startDrill(page, 4, { skipWarmup: true });

  // e1 — morpheme tiles: the tiles are shuffled, so build the authored answer
  // from the tiles that spell it ("dank" + "en" = danken today, not necessarily
  // tiles 1 and 2).
  await buildTiles(page, 4, 0);
  await settle(page, true);

  // e2 — matching pairs: pair the authored cards (the German column is shuffled)
  await solveMatchingPairs(page, 4, 1);
  await settle(page);

  // the trough sits after the second exercise, before the third
  const dismiss = page.getByRole("button", { name: "back to the exercise", exact: true });
  await expect(page.getByText("30-second detour", { exact: true })).toBeVisible();
  await expect(page.getByText("for interest — not on the test", { exact: true }).filter({ visible: true })).toBeVisible();
  await expect(page.getByText("Thou/Thee & Donner", { exact: true })).toBeVisible();
  await dismiss.click();
  await expect(dismiss).toBeHidden();
  await expect(page.getByText(`problem 3 of ${lessonById(4).exercises.length}`, { exact: true })).toBeVisible();
  await expect.poll(async () => (await readAppState(page))?.lessonProgress?.[4]).toMatchObject({
    practiceIndex: 2, everQueued: false, retryExerciseIds: [],
  });
});
