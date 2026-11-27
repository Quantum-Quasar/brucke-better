import { expect, test, type Page } from "@playwright/test";
import { GERMAN_CURRICULUM } from "../../src/data/curriculum";
import { orderedTrailLessons } from "../../src/data/curriculum-core";

const STORAGE_KEY = "brucke_app_state_v1";
const isProduction = process.env.PLAYWRIGHT_PRODUCTION === "1";
const lastLesson = orderedTrailLessons(GERMAN_CURRICULUM.topics, GERMAN_CURRICULUM.trailBranches)
  .filter((lesson) => lesson.authored)
  .at(-1)!;

async function seed(page: Page) {
  await page.addInitScript(([key, value]) => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, value);
  }, [STORAGE_KEY, JSON.stringify({
    activeLanguageId: "de",
    hasCompletedOnboarding: true,
    seenIntroLanguages: ["de", "fr", "es", "nl"],
    settings: { showKeyTips: false, posturePrimerSeen: true },
  })]);
}

async function savedProgress(page: Page) {
  await page.evaluate(() => window.dispatchEvent(new Event("pagehide")));
  return page.evaluate((key) => {
    const state = JSON.parse(localStorage.getItem(key)!);
    return state.progressByLanguage[state.activeLanguageId];
  }, STORAGE_KEY);
}

test("development console command unlocks the whole active course and persists it", async ({ page }) => {
  test.skip(isProduction, "The console helper is intentionally excluded from production builds.");
  await seed(page);
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-app-ready", "true");

  const result = await page.evaluate(async () => {
    if (!window.unlockAllLessons) throw new Error("unlockAllLessons is not registered");
    return window.unlockAllLessons();
  });
  expect(result).toEqual({
    languageId: "de",
    lessonCount: GERMAN_CURRICULUM.lessonCount,
    gateCount: GERMAN_CURRICULUM.trailGates.length,
  });

  const saved = await savedProgress(page);
  expect(saved.completedLessons).toHaveLength(GERMAN_CURRICULUM.lessonCount);
  expect(saved.passedGateIds).toEqual(GERMAN_CURRICULUM.trailGates.map((gate) => gate.id));

  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-app-ready", "true");
  const lateNode = page.locator(`[data-trail-node-id="${lastLesson.id}"]`);
  await lateNode.scrollIntoViewIfNeeded();
  await lateNode.click();
  await expect(page.getByRole("dialog", { name: lastLesson.title, exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "replay lesson", exact: true })).toBeVisible();
});

test("production builds do not expose the console helper", async ({ page }) => {
  test.skip(!isProduction, "Run against a production build to verify the helper is absent.");
  await seed(page);
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-app-ready", "true");
  expect(await page.evaluate(() => typeof window.unlockAllLessons)).toBe("undefined");
});
