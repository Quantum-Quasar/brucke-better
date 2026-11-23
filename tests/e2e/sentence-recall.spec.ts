import { expect, test, type Page } from "@playwright/test";
import lessonOne from "../../src/data/lessons/1";
import lessonTwo from "../../src/data/lessons/2";

const STORAGE_KEY = "brucke_app_state_v1";

test.use({ viewport: { width: 390, height: 844 } });

async function openFinalSentence(page: Page, lessonId: number, retry = false) {
  await page.addInitScript(({ key, lessonId, retry }) => {
    if (localStorage.getItem(key)) return;
    localStorage.setItem(key, JSON.stringify({
      hasCompletedOnboarding: true,
      completedLessons: lessonId === 2 ? [1, 101, 102, 103] : [],
      settings: { showKeyTips: false, posturePrimerSeen: true, stopOnError: "letter", voiceGuidanceDismissed: ["de", "fr", "es", "nl"] },
      lessonProgress: { [lessonId]: {
        segment: "practice", practiceIndex: 4, completedSegments: ["hook", "pattern", "table"],
        everQueued: retry, retryExerciseIds: retry ? [`l${lessonId}_e5`] : [], inRetryPhase: retry, retryIndex: 0,
      } },
    }));
  }, { key: STORAGE_KEY, lessonId, retry });
  await page.goto(`/?lang=de&lesson=${lessonId}`);
}

async function progress(page: Page, lessonId: number) {
  await page.evaluate(() => window.dispatchEvent(new Event("pagehide")));
  return page.evaluate(({ key, lessonId }) => {
    const stored = JSON.parse(localStorage.getItem(key)!);
    const slice = stored.progressByLanguage?.[stored.activeLanguageId] ?? stored;
    return { lesson: slice.lessonProgress[lessonId], stars: slice.lessonStars[lessonId] };
  }, { key: STORAGE_KEY, lessonId });
}

for (const lesson of [lessonOne, lessonTwo]) {
  const exercise = lesson.exercises[4];
  test(`${exercise.type}: the final sentence accepts typed recall through normal grading`, async ({ page }) => {
    await openFinalSentence(page, lesson.id);
    const group = page.locator(`[data-exercise-type="${exercise.type}"]`);
    await expect(group.getByTestId("sentence-word-bank")).toBeHidden();
    const help = group.getByRole("button", { name: "Show words / help", exact: true });
    await expect(help).toBeVisible();
    await help.focus();
    await page.keyboard.press("1");
    await expect(group.getByRole("textbox")).toHaveValue("");
    await group.getByRole("textbox").pressSequentially(exercise.target_answer);
    await group.getByRole("textbox").press("Enter");
    const correct = page.getByRole("dialog", { name: "correct", exact: true });
    await expect(correct).toBeVisible();
    await correct.getByRole("button", { name: /^continue/i }).click();
    await page.getByRole("button", { name: "Skip — I'll meet it in review", exact: true }).click();
    await expect.poll(async () => (await progress(page, lesson.id)).stars).toBe("purple");
    expect((await progress(page, lesson.id)).lesson.retryExerciseIds).toEqual([]);
  });

  test(`${exercise.type}: optional words are keyboard accessible, usable and penalty-free`, async ({ page }) => {
    await openFinalSentence(page, lesson.id);
    const group = page.locator(`[data-exercise-type="${exercise.type}"]`);
    const input = group.getByRole("textbox");
    await expect(input).toBeFocused();
    const help = group.getByRole("button", { name: "Show words / help", exact: true });
    await help.press("Enter");
    await expect(group.getByRole("button", { name: "Words / help shown", exact: true })).toHaveAttribute("aria-expanded", "true");
    const bank = group.getByTestId("sentence-word-bank");
    await expect(bank).toBeVisible();
    if (lesson.id === 2) await group.getByRole("button", { name: "show me a step", exact: true }).click();
    const state = (await progress(page, lesson.id)).lesson;
    expect(state.everQueued).toBe(false);
    expect(state.retryExerciseIds).toEqual([]);
    // The bank shows sentence-starter pronouns in lowercase; grading restores
    // sentence-initial capitalization for answers assembled from the bank.
    const [starter, ...rest] = exercise.target_answer.split(/\s+/);
    const words = [starter.toLowerCase(), ...rest];
    for (const word of words) {
      await bank.getByRole("button", { name: word, exact: true }).press("Enter");
    }
    await expect(input).toHaveValue(words.join(" "));
    await group.getByRole("button", { name: "verify", exact: true }).click();
    await page.getByRole("dialog", { name: "correct", exact: true }).getByRole("button", { name: /^continue/i }).click();
    await page.getByRole("button", { name: "Skip — I'll meet it in review", exact: true }).click();
    await expect.poll(async () => (await progress(page, lesson.id)).stars).toBe("purple");
  });
}

test("a retry keeps its word support and stays finishable after another failure", async ({ page }) => {
  await openFinalSentence(page, 1, true);
  const group = page.locator('[data-exercise-type="syntax_builder"]');
  await expect(group.getByTestId("sentence-word-bank")).toBeVisible();
  await group.getByRole("textbox").fill("falsch");
  await group.getByRole("button", { name: "verify", exact: true }).click();
  await page.getByRole("dialog", { name: "not quite", exact: true }).getByRole("button", { name: "continue", exact: true }).click();
  await expect(group.getByTestId("sentence-word-bank")).toBeVisible();
  await group.getByRole("textbox").fill(lessonOne.exercises[4].target_answer);
  await group.getByRole("button", { name: "verify", exact: true }).click();
  await page.getByRole("dialog", { name: "correct", exact: true }).getByRole("button", { name: /^continue/i }).click();
  await expect.poll(async () => (await progress(page, 1)).lesson.retryExerciseIds).toEqual([]);
});
