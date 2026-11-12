import { expect, test, type Page } from "@playwright/test";
import { getPlacementQuestions } from "../../src/lib/placement";

const STORAGE_KEY = "brucke_app_state_v1";

async function state(page: Page) {
  await page.evaluate(() => window.dispatchEvent(new Event("pagehide")));
  return page.evaluate((key) => {
    const saved = JSON.parse(localStorage.getItem(key) ?? "{}");
    return { ...saved, ...saved.progressByLanguage?.[saved.activeLanguageId] };
  }, STORAGE_KEY);
}

async function openIntroduction(page: Page) {
  await page.goto("/");
  await page.waitForFunction(() => document.documentElement.getAttribute("data-app-ready") === "true");
  await page.getByRole("button", { name: /60-second intro/i }).click();
  const dialog = page.getByRole("dialog", { name: "Brücke introduction" });
  await expect(dialog).toBeVisible();
  return dialog;
}

async function openPreferences(page: Page, languageName = "German") {
  const dialog = await openIntroduction(page);
  await dialog.getByRole("button").filter({ hasText: languageName }).first().click();
  await dialog.getByRole("button", { name: /continue with/i }).click();
  await dialog.getByRole("button", { name: "next", exact: true }).click();
  await dialog.getByText("Personalize your start (optional)", { exact: true }).click();
  return dialog;
}

test("the optional flow never prevents immediate skip", async ({ page }) => {
  const dialog = await openIntroduction(page);
  await dialog.getByRole("button", { name: /skip/i }).click();
  await expect(dialog).toBeHidden();
  expect((await state(page)).hasCompletedOnboarding).toBe(true);
  await page.reload();
  await expect(dialog).toBeHidden();
});

for (const [languageId, name] of [["de", "German"], ["nl", "Dutch"], ["es", "Spanish"], ["fr", "French"]]) {
  test(`${name} placement is optional, language-specific and recommendation-only`, async ({ page }) => {
    const dialog = await openPreferences(page, name);
    await dialog.getByRole("button", { name: "travel", exact: true }).click();
    await dialog.getByRole("button", { name: "20 min/day", exact: true }).click();
    await dialog.getByRole("button", { name: "Try optional 60-second placement" }).click();
    for (const question of getPlacementQuestions(languageId)) {
      await expect(dialog.getByRole("heading", { name: question.prompt, exact: true })).toBeFocused();
      await dialog.getByRole("button", { name: question.answer, exact: true }).click();
    }
    await expect(dialog.getByTestId("placement-result")).toContainText("Suggested starting topic: 5");
    await expect(dialog.getByRole("heading", { name: "A starting suggestion, not a grade" })).toBeFocused();
    await dialog.getByLabel("Preferred starting topic (override the suggestion)").selectOption("2");
    const saved = await state(page);
    expect(saved.settings).toMatchObject({ learningGoal: "travel", dailyMinutes: 20, reviewSessionLimit: 20, placementTopic: 2 });
    expect(saved.completedLessons).toEqual([]);
    expect(saved.lessonProgress).toEqual({});
    await dialog.getByRole("button", { name: /skip/i }).click();
    await page.reload();
    expect((await state(page)).settings).toMatchObject({ learningGoal: "travel", dailyMinutes: 20, reviewSessionLimit: 20, placementTopic: 2 });
    expect((await state(page)).completedLessons).toEqual([]);
  });
}

test("placement stops at sixty seconds without pretending unanswered items were completed", async ({ page }) => {
  const dialog = await openPreferences(page);
  await page.clock.install();
  await dialog.getByRole("button", { name: "Try optional 60-second placement" }).click();
  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByRole("heading", { name: getPlacementQuestions("de")[0].prompt })).toBeVisible();
  await page.clock.fastForward(61_000);
  await expect(dialog.getByTestId("placement-result")).toContainText("0 of 10 items tried");
  expect((await state(page)).settings.placementTopic).toBe(1);
  expect((await state(page)).completedLessons).toEqual([]);
  await dialog.getByRole("button", { name: /skip/i }).click();
  await expect(dialog).toBeHidden();
});

test("placement can stop early and preserves the immediate skip control", async ({ page }) => {
  const dialog = await openPreferences(page);
  await dialog.getByRole("button", { name: "5 min/day", exact: true }).click();
  await dialog.getByRole("button", { name: "Try optional 60-second placement" }).click();
  await dialog.getByRole("button", { name: "Not sure — next item", exact: true }).click();
  await dialog.getByRole("button", { name: "Stop placement now", exact: true }).click();
  await expect(dialog.getByTestId("placement-result")).toContainText("1 of 10 items tried");
  expect((await state(page)).settings).toMatchObject({ dailyMinutes: 5, reviewSessionLimit: 5, placementTopic: 1 });
  await dialog.getByRole("button", { name: /skip/i }).click();
  await expect(dialog).toBeHidden();
});
