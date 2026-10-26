import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

// Non-German courses: the review hub and the atlas fetch their own
// `/data/<lang>/*.json` payloads at runtime instead of shipping them in the
// bundle. German is covered by smoke.spec.ts; this guards the path where the
// active course is French or Spanish, i.e. where a missing export, a wrong
// language id, or a German-only assumption would only fail at runtime.

const STORAGE_KEY = "brucke_app_state_v1";

/** Persisted state for a learner who finished the first three lessons of `languageId`. */
function seedFor(languageId: string): string {
  const lessonProgress = {
    1: { segment: "summary", practiceIndex: 0, completedSegments: ["hook", "pattern", "table", "practice", "summary"] },
    2: { segment: "summary", practiceIndex: 0, completedSegments: ["hook", "pattern", "table", "practice", "summary"] },
    3: { segment: "summary", practiceIndex: 0, completedSegments: ["hook", "pattern", "table", "practice", "summary"] },
  };
  const slice = {
    completedLessons: [1, 2, 3],
    currentLessonId: 4,
    lessonProgress,
    lessonStars: { 1: "gold", 2: "gold", 3: "gold" },
    wordMastery: {},
    srsCards: {},
    weeklyActivity: [true, false, false, false, false, false, false],
  };
  return JSON.stringify({
    activeLanguageId: languageId,
    hasCompletedOnboarding: true,
    isOnboardingOpen: false,
    seenIntroLanguages: ["de", languageId],
    preferredReviewMode: "flashcard",
    progressByLanguage: { [languageId]: slice },
    ...slice,
  });
}

/**
 * Seed once per context: addInitScript re-runs on every navigation, so it must
 * never overwrite state the app itself wrote during the test.
 */
async function seed(page: Page, languageId: string) {
  const seedJson = seedFor(languageId);
  await page.addInitScript(
    ([key, value]) => {
      if (!window.localStorage.getItem(key)) window.localStorage.setItem(key, value);
    },
    [STORAGE_KEY, seedJson] as const
  );
}

/** Every `/data/<lang>/*.json` request the page made, so the fetch is proven. */
function trackDataRequests(page: Page, languageId: string): string[] {
  const urls: string[] = [];
  page.on("request", (request) => {
    const url = request.url();
    if (url.includes(`/data/${languageId}/`)) urls.push(new URL(url).pathname);
  });
  return urls;
}

test.describe("French and Spanish courses", () => {
  test("the French review hub loads its own compendium and lesson index", async ({ page }) => {
    await seed(page, "fr");
    const dataRequests = trackDataRequests(page, "fr");
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/review");

    // the hub only renders once both JSON payloads resolved
    await expect(page.getByRole("heading", { name: /due today/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /review recent/i })).toBeEnabled();
    await expect(page.locator("header")).toContainText(/french through english/i);

    expect(dataRequests).toEqual(
      expect.arrayContaining(["/data/fr/compendium.json", "/data/fr/lesson-index.json"])
    );
    // no German payload for a French learner
    expect(dataRequests.some((path) => path.includes("/data/de/"))).toBe(false);
    expect(errors, `uncaught page errors: ${errors.join(" | ")}`).toEqual([]);
  });

  test("the French atlas renders its own families and family detail", async ({ page }) => {
    await seed(page, "fr");
    const dataRequests = trackDataRequests(page, "fr");

    await page.goto("/atlas");
    await expect(page.getByRole("heading", { name: "Conversion Bridge Families" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "The -ION Bridge" })).toBeVisible();
    expect(dataRequests).toContain("/data/fr/compendium.json");

    // the family route is shared across atlases; a French learner must land on
    // the French family, not the "belongs to another atlas" fallback
    await page.getByRole("heading", { name: "The -ION Bridge" }).click();
    await expect(page).toHaveURL(/\/atlas\/ion$/);
    await expect(page.getByRole("heading", { name: "The -ION Bridge" })).toBeVisible();
    await expect(page.getByText(/Participating Vocabulary/)).toBeVisible();
    await expect(page.getByText(/belongs to the .* atlas/i)).toBeHidden();
  });

  test("the Spanish atlas resolves Spanish families", async ({ page }) => {
    await seed(page, "es");
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));

    await page.goto("/atlas");
    await expect(page.getByRole("heading", { name: "Castilian Sound Shift Families" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "The -CIÓN Passport" })).toBeVisible();

    await page.goto("/atlas/cion");
    await expect(page.getByRole("heading", { name: "The -CIÓN Passport" })).toBeVisible();
    await expect(page.getByText(/Participating Vocabulary/)).toBeVisible();
    expect(errors, `uncaught page errors: ${errors.join(" | ")}`).toEqual([]);
  });

  test("a language-scoped lesson route switches the course without a reload", async ({ page }) => {
    await seed(page, "de");

    // deep link into the Spanish course while German is active: the URL wins,
    // and the header identity follows it
    await page.goto("/trail/es/1");
    await expect(page.locator("header")).toContainText(/spanish through english/i, { timeout: 15_000 });

    // the lesson body is server-rendered for the named course
    await expect(page.getByRole("button", { name: /next: pattern/i })).toBeVisible();
    const state = await page.evaluate((key) => {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    }, STORAGE_KEY);
    expect(state?.activeLanguageId).toBe("es");
  });
});
