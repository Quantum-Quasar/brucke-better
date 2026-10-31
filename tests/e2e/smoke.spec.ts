import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import type { SRSCard } from "@/lib/types";

// Browser smoke suite: onboarding, lesson progress, review + SRS persistence,
// keyboard navigation, and static-route boundaries. Unit-level coverage for
// the same machinery lives in src/tests/ — these tests only pin down what
// breaks in a real browser (hydration, storage, routing, event handling).

const STORAGE_KEY = "brucke_app_state_v1";

/** Read the persisted app state from the page's localStorage. */
async function readAppState(page: Page): Promise<any> {
  // saveState() coalesces writes into an idle callback. pagehide is the store's
  // own flush path for a closing tab, so dispatching it makes the read
  // deterministic without waiting out the debounce.
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
}

/**
 * Seed persisted progress before any page script runs. Every test below gets a
 * fresh browser context, so this is the only way to start the app in a
 * returning-learner state.
 *
 * Only an empty store is filled: on a reload the app's own saved state must
 * survive, otherwise seeded progress would be re-applied over the test's work.
 */
async function seedAppState(page: Page, state: Record<string, unknown> = {}) {
  await page.addInitScript(
    ([key, value]) => {
      if (!window.localStorage.getItem(key)) {
        window.localStorage.setItem(key, value);
      }
    },
    [STORAGE_KEY, JSON.stringify({ hasCompletedOnboarding: true, ...state })] as const
  );
}

/**
 * A learner who has finished the first three trail lessons. The "recent
 * lessons" deck is built from `completedLessons` (not from SRS history), so
 * without this the hub button renders `disabled` and Playwright waits forever
 * on the click. `lessonProgress`/`lessonStars` are seeded too so the stored
 * state matches what finishing those lessons actually writes.
 */
const THREE_FINISHED_LESSONS: Record<string, unknown> = {
  completedLessons: [1, 2, 3],
  currentLessonId: 4,
  lessonProgress: {
    1: { segment: "summary", practiceIndex: 0, completedSegments: ["hook", "pattern", "table", "practice", "summary"] },
    2: { segment: "summary", practiceIndex: 0, completedSegments: ["hook", "pattern", "table", "practice", "summary"] },
    3: { segment: "summary", practiceIndex: 0, completedSegments: ["hook", "pattern", "table", "practice", "summary"] },
  },
  lessonStars: { 1: "gold", 2: "gold", 3: "gold" },
  // Deck clicks start immediately in the stored style, so pin the style these
  // tests grade in instead of relying on the app's default.
  preferredReviewMode: "flashcard",
};

/** A card that is already due, used to unlock the review hub's stats bar. */
const DUE_CARD: SRSCard = {
  word_id: "arm",
  interval: 1,
  repetitions: 0,
  ease_factor: 2.5,
  due_date: "2020-01-01",
  lapses: 0,
  last_reviewed: null,
};

/** The session counter, e.g. "card 3 / 29" (rendered uppercase via CSS). */
const CARD_COUNTER = /^card \d+ \/ \d+$/i;

/** Read the current card position and the deck's size off the session card. */
async function readCardCounter(page: Page): Promise<{ index: number; total: number }> {
  const counter = page.getByText(CARD_COUNTER).first();
  await expect(counter).toBeVisible();
  const text = (await counter.innerText()).replace(/\s+/g, " ").trim();
  const match = text.match(/card (\d+) \/ (\d+)/i);
  if (!match) throw new Error(`unexpected review counter: ${text}`);
  return { index: Number(match[1]), total: Number(match[2]) };
}

/** Assert the session is showing the card at `index` (1-based). */
async function expectCard(page: Page, index: number) {
  await expect(page.getByText(new RegExp(`^card ${index} \\/ \\d+$`, "i")).first()).toBeVisible();
}

/**
 * The word id the session graded, derived by diffing persisted SRS state before
 * and after a grade — no assumption that the deck's first card is the only one
 * in storage.
 */
function gradedWordId(before: any, after: any): string {
  const beforeIds = new Set(Object.keys(before?.srsCards ?? {}));
  const added = Object.keys(after?.srsCards ?? {}).filter((id) => !beforeIds.has(id));
  if (added.length === 1) return added[0];
  const reviewed = Object.entries(after?.srsCards ?? {})
    .filter(([, card]) => Boolean((card as SRSCard | undefined)?.last_reviewed))
    .map(([id]) => id);
  if (reviewed.length === 1) return reviewed[0];
  throw new Error(
    `expected exactly one graded card, found added=${JSON.stringify(added)} reviewed=${JSON.stringify(reviewed)}`
  );
}

/** Open the "recent lessons" deck in recall (flashcard) mode. */
async function openRecentReviewSession(page: Page) {
  await page.goto("/review");
  // enabled only when at least one lesson has been completed
  const recent = page.getByRole("button", { name: /review recent/i });
  await expect(recent).toBeEnabled();
  await recent.click();

  // a deck click starts the session straight away in the stored style; the
  // style picker is no longer a gate between the click and the first card
  await expect(page.getByText(CARD_COUNTER).first()).toBeVisible();
}

test.describe("browser smoke", () => {
  test("landing page offers the intro and skipping stays dismissed after reload", async ({ page }) => {
    await page.goto("/");

    // First visit is a landing page, not a modal wall. Wait for React hydration
    // before the one click, then allow the lazy modal chunk to arrive. Retrying
    // the click is wrong once the modal is open: the overlay blocks the button.
    const dialog = page.locator('div[aria-label="Brücke introduction"]');
    await expect(dialog).toBeHidden();
    await page.waitForFunction(
      () => document.documentElement.getAttribute("data-app-ready") === "true",
      undefined,
      { timeout: 30_000 }
    );
    await page.getByRole("button", { name: /60-second intro/i }).click();
    await expect(dialog).toBeVisible({ timeout: 45_000 });

    await dialog.getByRole("button", { name: /skip/i }).click();
    await expect(dialog).toBeHidden();

    // the dismissal must survive a reload (persisted hasCompletedOnboarding)
    await page.reload();
    await expect(page.locator('div[aria-label="Brücke introduction"]')).toBeHidden();
    const state = await readAppState(page);
    expect(state?.hasCompletedOnboarding).toBe(true);
  });

  test.describe("with onboarding already completed", () => {
    // Each test seeds the persisted state it needs *before* the first page
    // script runs; a shared beforeEach would win the "seed only an empty
    // store" race and the per-test progress would never be applied.
    test("lesson wizard advances a segment and persists progress across reload", async ({ page }) => {
      await seedAppState(page);
      await page.goto("/trail/1");
      const nextPattern = page.getByRole("button", { name: /next: pattern/i });
      await expect(nextPattern).toBeVisible();

      // On a fresh dev-server page the click can land before React hydrates
      // and get swallowed — retry until the wizard actually advances.
      const nextTable = page.getByRole("button", { name: /next: transformation table/i });
      await expect(async () => {
        await nextPattern.click();
        await expect(nextTable).toBeVisible();
      }).toPass({ timeout: 30_000 });

      const state = await readAppState(page);
      expect(state?.lessonProgress?.["1"]?.segment).toBe("pattern");

      // progress survives a reload; the open view itself is intentionally not
      // restored, so re-open the lesson and confirm it resumes at the segment
      await page.reload();
      await page.goto("/trail/1");
      await expect(nextTable).toBeVisible();
    });

    test("review session: keyboard reveal + SM-2 grading persist to SRS storage", async ({ page }) => {
      await seedAppState(page, THREE_FINISHED_LESSONS);
      await openRecentReviewSession(page);

      // the recent deck is every word from the last three finished lessons —
      // it is not size-capped, so the size is read from the UI, never assumed
      const { total } = await readCardCounter(page);
      expect(total).toBeGreaterThan(1);

      // keyboard: space reveals, "3" grades Good → SM-2 advances to card 2
      await page.keyboard.press("Space");
      await expect(page.getByRole("button", { name: /^good/i })).toBeVisible();
      await page.keyboard.press("3");
      await expectCard(page, 2);
      // grading does not shrink or re-shuffle the session
      expect((await readCardCounter(page)).total).toBe(total);

      // the graded card landed in persistent SRS storage
      const state = await readAppState(page);
      const graded = Object.values(state?.srsCards ?? {}).filter(
        (card: any) => card?.repetitions >= 1
      );
      expect(graded.length).toBeGreaterThanOrEqual(1);

      // back returns to the first card, which must be un-revealed and answerable
      await page.getByRole("button", { name: /^back/i }).click();
      await expectCard(page, 1);
      await expect(page.getByRole("button", { name: /show answer/i })).toBeVisible();
      await expect(page.getByRole("button", { name: /^back/i })).toBeDisabled();

      // escape exits the session cleanly back to the deck hub
      await page.keyboard.press("Escape");
      await expect(page.getByRole("heading", { name: /due today/i })).toBeVisible();
    });

    test("review session: back after grading restores the card so the re-grade counts once", async ({ page }) => {
      await seedAppState(page, THREE_FINISHED_LESSONS);

      await openRecentReviewSession(page);
      await expectCard(page, 1);
      const before = await readAppState(page);

      // grade card 1 Easy, then go back and grade it Hard instead
      await page.keyboard.press("Space");
      await page.keyboard.press("4");
      await expectCard(page, 2);

      const easyState = await readAppState(page);
      const firstWordId = gradedWordId(before, easyState);
      // Easy recorded a real SM-2 step before the walk-back
      expect((easyState?.srsCards?.[firstWordId] as SRSCard | undefined)?.repetitions).toBe(1);

      await page.keyboard.press("ArrowLeft");
      await expectCard(page, 1);

      await page.keyboard.press("Space");
      await page.keyboard.press("2"); // Hard
      await expectCard(page, 2);

      const state = await readAppState(page);
      const finalCard = state?.srsCards?.[firstWordId] as SRSCard | undefined;

      // the card went back to its pre-session state, so the Hard grade is the
      // only graded step — interval stays at the first successful step (1 day)
      // instead of compounding from the Easy schedule (which would be 6 days)
      expect(finalCard?.repetitions).toBe(1);
      expect(finalCard?.lapses).toBe(0);
      expect(finalCard?.interval).toBe(1);

      // exactly one card was graded in this session
      const gradedCount = Object.values(state?.srsCards ?? {}).filter(
        (card) => (card as SRSCard | undefined) !== undefined && (card as SRSCard).repetitions >= 1
      ).length;
      expect(gradedCount).toBe(1);
    });

    test("review style picker opens only from the explicit change-style control", async ({ page }) => {
      await seedAppState(page, {
        ...THREE_FINISHED_LESSONS,
        srsCards: { [DUE_CARD.word_id]: DUE_CARD },
      });
      await page.goto("/review");

      // a deck click starts the session in the stored style — no picker gate
      const recent = page.getByRole("button", { name: /review recent/i });
      await expect(recent).toBeEnabled();
      await recent.click();
      await expect(page.getByText(CARD_COUNTER).first()).toBeVisible();
      await expect(page.locator("#review-style-title")).toBeHidden();

      // leaving the session returns to the hub, where the picker is reachable
      await page.keyboard.press("Escape");
      await expect(page.getByRole("heading", { name: /due today/i })).toBeVisible();

      await page.getByRole("button", { name: /change style/i }).click();
      await expect(page.locator("#review-style-title")).toBeVisible();
      await page.keyboard.press("Escape");
      await expect(page.locator("#review-style-title")).toBeHidden();
    });

    test("legacy deep links restore in-page views and unknown ids fail gracefully", async ({ page }) => {
      await seedAppState(page);
      await page.goto("/atlas/th_to_d");
      await expect(page.getByText(/Dental Shift/i).first()).toBeVisible();
      await expect(page).toHaveURL(/\/atlas\/?$/);

      await page.goto("/trail/999999");
      await expect(page.getByText(/Lesson 999999 Coming Soon/i)).toBeVisible();
      await expect(page).toHaveURL(/\/$/);

      await page.goto("/atlas/not_a_family");
      await expect(page.getByText(/No authored course defines this shift family/i)).toBeVisible();
      await expect(page).toHaveURL(/\/atlas\/?$/);
    });
  });
});

test("language-scoped lesson URL opens the named course in-page", async ({ page }) => {
  await page.goto("/trail/fr/1");
  await expect(page.getByRole("button", { name: /next: pattern/i })).toBeVisible();
  await expect(page.locator("header")).toContainText(/french through english/i, {
    timeout: 15_000,
  });
  await expect(page).toHaveURL(/\/$/);
});

test("opening and closing a lesson adds no browser-history entries", async ({ page }) => {
  await seedAppState(page);
  await page.goto("/");
  const before = await page.evaluate(() => history.length);

  const start = page.getByRole("button", { name: /^(start|continue|resume) topic 1/i });
  await expect(async () => {
    await start.click();
    await expect(page.getByRole("button", { name: /back to trail/i })).toBeVisible();
  }).toPass({ timeout: 30_000 });

  expect(await page.evaluate(() => history.length)).toBe(before);
  await page.getByRole("button", { name: /back to trail/i }).click();
  await expect(start).toBeVisible();
  expect(await page.evaluate(() => history.length)).toBe(before);
});

test("tab switches add one history entry and Back returns", async ({ page }) => {
  await page.goto("/");
  const before = await page.evaluate(() => history.length);
  await page
    .getByRole("navigation", { name: /main navigation/i })
    .getByRole("link", { name: /^atlas$/i })
    .click();
  await expect(page).toHaveURL(/\/atlas\/?$/);
  expect(await page.evaluate(() => history.length)).toBe(before + 1);

  await page.goBack();
  await expect(page).toHaveURL(/\/$/);
});

test("theme picker mounts on demand and applies the chosen theme", async ({ page }) => {
  await seedAppState(page);
  await page.goto("/settings");

  // The theme table is not part of the route bundle; the gated modal chunk
  // loads only when the learner asks for it.
  const browse = page.getByRole("button", { name: /browse 187 themes/i });
  await expect(browse).toBeVisible();
  await browse.click();

  const dialog = page.getByRole("dialog", { name: "Select Theme" });
  await expect(dialog).toBeVisible();
  await dialog.getByPlaceholder(/search themes by name/i).fill("monokai");
  await dialog.getByRole("button", { name: /monokai/i }).first().click();

  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "monokai");
});
