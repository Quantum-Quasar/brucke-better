import { expect, test, type Page } from "@playwright/test";
import { LESSONS } from "../../src/data/lessons";
import { activateWithKeyboard, expectModalKeysIsolated, readLearningProgress, seedReturningLearner, tabTo } from "./product-quality-helpers";

const lessonOne = LESSONS.find((lesson) => lesson.id === 1)!;
const reviewSettings = {
  showKeyTips: false,
  posturePrimerSeen: true,
  showCharBar: "off",
  quickRestart: "esc",
  confidenceMode: "off",
  stopOnError: "off",
  voiceGuidanceDismissed: ["de", "fr", "es", "nl"],
};

async function startLearnedReview(page: Page, mode: "flashcard" | "typing") {
  // Observe the native player without replacing voices or suppressing playback.
  await page.addInitScript(() => {
    const synthesis = window.speechSynthesis;
    if (!synthesis) return;
    const cancel = synthesis.cancel.bind(synthesis);
    synthesis.cancel = () => {
      performance.mark("product-pronunciation-request");
      cancel();
    };
  });
  await seedReturningLearner(page, {
    wordMastery: { lernen: "encountered" },
    preferredReviewMode: mode,
    settings: reviewSettings,
  });
  await page.goto("/review");
  await expect(page.locator("html")).toHaveAttribute("data-app-ready", "true");
  await activateWithKeyboard(page, page.getByRole("button", { name: "Review learned words", exact: true }));
  await expect(page.getByText(/^card 1 \/ 1$/i)).toBeVisible();
  return () => page.evaluate(() => performance.getEntriesByName("product-pronunciation-request").length);
}

async function isolateHelpKeys(page: Page, assertUnderlyingUnchanged: () => Promise<void>) {
  const help = page.getByRole("dialog").filter({
    has: page.getByRole("button", { name: "Close help", exact: true }),
  });
  await expectModalKeysIsolated(
    page,
    () => activateWithKeyboard(page, page.getByRole("button", { name: "Open help and shortcuts", exact: true })),
    help,
    help.getByRole("button", { name: "Close help", exact: true }),
    assertUnderlyingUnchanged,
  );
}

test.use({ viewport: { width: 1280, height: 900 }, serviceWorkers: "block" });

for (const revealed of [false, true]) {
  test(`review help owns shortcuts while the real card is ${revealed ? "revealed" : "unrevealed"}`, async ({ page }) => {
    const readPronunciationCalls = await startLearnedReview(page, "flashcard");
    const showAnswer = page.getByRole("button", { name: "show answer", exact: true });
    const good = page.getByRole("button", { name: "good", exact: true });
    if (revealed) await activateWithKeyboard(page, showAnswer);
    const before = await readLearningProgress(page);
    const pronunciationCalls = await readPronunciationCalls();

    await isolateHelpKeys(page, async () => {
      await expect(page.getByText(/^card 1 \/ 1$/i)).toBeVisible();
      if (revealed) {
        await expect(good).toBeVisible();
        await expect(showAnswer).toBeHidden();
      } else {
        await expect(showAnswer).toBeVisible();
        await expect(good).toBeHidden();
      }
      expect((await readLearningProgress(page)).srsCards).toEqual(before.srsCards);
      expect(await readPronunciationCalls()).toBe(pronunciationCalls);
    });

    // Closing help must leave the session usable, not merely swallow all keys.
    if (!revealed) await activateWithKeyboard(page, showAnswer);
    await activateWithKeyboard(page, good);
    await expect.poll(async () => (await readLearningProgress(page)).srsCards.lernen.repetitions).toBe(1);
  });
}

test("Space stays text in review input and modal keys cannot reveal or grade the typed answer", async ({ page }) => {
  const readPronunciationCalls = await startLearnedReview(page, "typing");
  const answerInput = page.getByPlaceholder("type german derivation...", { exact: true });
  const check = page.getByRole("button", { name: "check answer", exact: true });
  const good = page.getByRole("button", { name: "good", exact: true });
  await tabTo(page, answerInput);
  await page.keyboard.press("Space");
  await expect(answerInput).toHaveValue(" ");
  await expect(check).toBeVisible();
  await expect(good).toBeHidden();
  await page.keyboard.press("Backspace");
  await page.keyboard.type("ler");
  await page.keyboard.press("Space");
  await expect(answerInput).toHaveValue("ler ");
  await expect(check).toBeVisible();
  await expect(good).toBeHidden();
  const before = await readLearningProgress(page);
  const pronunciationCalls = await readPronunciationCalls();

  await isolateHelpKeys(page, async () => {
    await expect(answerInput).toHaveValue("ler ");
    await expect(check).toBeVisible();
    await expect(good).toBeHidden();
    expect((await readLearningProgress(page)).srsCards).toEqual(before.srsCards);
    expect(await readPronunciationCalls()).toBe(pronunciationCalls);
  });

  await tabTo(page, answerInput);
  await page.keyboard.press("End");
  await page.keyboard.press("Backspace");
  await page.keyboard.type("nen");
  await expect(answerInput).toHaveValue("lernen");
  await page.keyboard.press("Enter");
  await expect(good).toBeVisible();
  await activateWithKeyboard(page, good);
  await expect.poll(async () => (await readLearningProgress(page)).srsCards.lernen.repetitions).toBe(1);
});

test("canonical Lesson 1 URL renders a real overview and opens keyboard practice", async ({ page }) => {
  await seedReturningLearner(page);
  const response = await page.goto("/trail/de/1");
  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { name: lessonOne.title, exact: true })).toBeVisible();
  await activateWithKeyboard(page, page.getByRole("link", { name: "Start lesson practice", exact: true }).first());
  await expect(page.getByRole("dialog", { name: "Lesson 1", exact: true })).toBeVisible();
  await activateWithKeyboard(page, page.getByRole("button", { name: /^next: pattern/i }));
  await expect(page.getByRole("button", { name: /^next: transformation table/i })).toBeVisible();
});

test("the existing Lesson 1 deep link restores a real lesson after reload", async ({ page }) => {
  await seedReturningLearner(page);
  await page.goto("/?lesson=1&lang=de");
  const lesson = page.getByRole("dialog", { name: "Lesson 1", exact: true });
  await expect(lesson).toBeVisible();
  await expect(lesson.getByRole("heading", { name: lessonOne.title, exact: true })).toBeVisible();
  await page.reload();
  await expect(lesson).toBeVisible();
  await activateWithKeyboard(page, page.getByRole("button", { name: /^next: pattern/i }));
  await expect(page.getByRole("button", { name: /^next: transformation table/i })).toBeVisible();
});

for (const type of ["transcribe", "literal_gloss", "dictation"] as const) {
  test(`${type}: a blocking help dialog cannot type, answer or reset the replay behind it`, async ({ page }) => {
    const lesson = LESSONS.find((entry) => entry.exercises.some((exercise) => exercise.type === type))!;
    const exercise = lesson.exercises.find((entry) => entry.type === type)!;
    const id = `${lesson.id}:${exercise.id}`;
    await seedReturningLearner(page, {
      settings: reviewSettings,
      sentenceCards: { [id]: {
        id, lessonId: lesson.id, exerciseId: exercise.id,
        interval: 1, repetitions: 0, ease_factor: 2.5, due_date: "2000-01-01",
        lapses: 1, last_reviewed: null,
      } },
    });
    await page.goto("/review");
    await activateWithKeyboard(page, page.getByRole("button", { name: "review sentence processes", exact: true }));
    const widget = page.locator(`[data-exercise-type="${type}"]`);
    await expect(widget).toBeVisible();
    const input = widget.getByRole("textbox");
    if (type !== "literal_gloss") await input.fill("draft ");
    const before = await readLearningProgress(page);
    await isolateHelpKeys(page, async () => {
      await expect(widget).toBeVisible();
      if (type !== "literal_gloss") await expect(input).toHaveValue("draft ");
      await expect(page.getByRole("dialog", { name: "correct", exact: true })).toBeHidden();
      expect((await readLearningProgress(page)).sentenceCards).toEqual(before.sentenceCards);
    });
  });
}
