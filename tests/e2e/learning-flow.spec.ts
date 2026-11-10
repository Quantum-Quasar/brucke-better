import { expect, test, type Page } from "@playwright/test";

const STORAGE_KEY = "brucke_app_state_v1";

async function seed(page: Page, patch: Record<string, unknown> = {}) {
  await page.addInitScript(([key, value]) => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, value);
  }, [STORAGE_KEY, JSON.stringify({ hasCompletedOnboarding: true, settings: { showKeyTips: false, posturePrimerSeen: true }, ...patch })]);
}

async function progress(page: Page) {
  await page.evaluate(() => window.dispatchEvent(new Event("pagehide")));
  return page.evaluate((key) => {
    const state = JSON.parse(localStorage.getItem(key)!);
    return state.progressByLanguage?.[state.activeLanguageId] ?? state;
  }, STORAGE_KEY);
}

function practice(lessonId: number, exerciseId?: string) {
  return { [lessonId]: {
    segment: "practice", practiceIndex: 4, completedSegments: ["hook", "pattern", "table"],
    everQueued: Boolean(exerciseId), retryExerciseIds: exerciseId ? [exerciseId] : [],
    inRetryPhase: Boolean(exerciseId), retryIndex: 0,
  } };
}

test.use({ viewport: { width: 390, height: 844 } });

test("Tab focuses the next-lesson bar and Enter opens the lesson without trapping subsequent Tab presses", async ({ page }) => {
  await seed(page);
  await page.goto("/");
  const start = page.locator("[data-next-lesson-start]");
  await expect(start).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(start).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(start).not.toBeFocused();
  await start.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "Lesson 1", exact: true })).toBeVisible();
  const history = page.locator("details").filter({ has: page.locator("summary", { hasText: "historical notes" }) });
  await expect(history).not.toHaveAttribute("open", "");
  await history.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(history).toHaveAttribute("open", "");
  await expect(page.getByRole("button", { name: "Pattern, locked", exact: true })).toBeDisabled();
});

test("the default recommendation includes the first side lesson rather than skipping to core 2", async ({ page }) => {
  await seed(page, { completedLessons: [1] });
  await page.goto("/");
  const bar = page.getByRole("region", { name: "Next recommended lesson" });
  await expect(bar).toContainText("Hidden Twins: Body & World");
  await bar.locator("[data-next-lesson-start]").click();
  await expect(page.getByRole("dialog", { name: "Lesson 101", exact: true })).toBeVisible();
});

test("three explicit continue-ahead choices stop resurfacing older gaps without marking them complete", async ({ page }) => {
  await seed(page, { completedLessons: [1, 2, 3] });
  await page.goto("/");
  const bar = page.getByRole("region", { name: "Next recommended lesson" });
  for (let attempt = 0; attempt < 3; attempt++) {
    await expect(bar).toContainText("Hidden Twins: Body & World");
    await bar.getByRole("button", { name: "Continue ahead", exact: true }).click();
    await expect(page.getByRole("dialog", { name: "Lesson 301", exact: true })).toBeVisible();
    await page.getByRole("button", { name: "Back to Trail", exact: true }).click();
  }
  await expect(bar).toContainText("PF- Openers");
  expect((await progress(page)).completedLessons).not.toContain(101);
  await page.reload();
  await expect(bar).toContainText("PF- Openers");
  await expect(bar.getByRole("button", { name: "Continue ahead", exact: true })).toBeHidden();
});

test("reinforcement keeps a repeated typo pending across reload and completes only after correction", async ({ page }) => {
  await seed(page, { lessonProgress: practice(1, "l1_e3") });
  await page.goto("/?lang=de&lesson=1");
  const input = page.getByRole("textbox");
  await input.fill("bringem");
  await page.getByRole("button", { name: "verify", exact: true }).click();
  await page.getByRole("button", { name: "continue", exact: true }).click();
  await expect.poll(async () => (await progress(page)).lessonProgress[1].retryExerciseIds).toEqual(["l1_e3"]);
  await page.reload();
  await page.goto("/?lang=de&lesson=1");
  await expect(input).toBeVisible();
  await input.fill("bringen");
  await page.getByRole("button", { name: "verify", exact: true }).click();
  await page.getByRole("button", { name: "continue", exact: true }).click();
  await expect.poll(async () => (await progress(page)).completedLessons).toContain(1);
  const saved = await progress(page);
  expect(saved.lessonProgress[1].retryExerciseIds).toEqual([]);
  expect(saved.lessonStars[1]).toBe("gold");
});

test("repeated matching mistakes offer guided completion instead of trapping the learner", async ({ page }) => {
  await seed(page, { lessonProgress: practice(1, "l1_e2") });
  await page.goto("/?lang=de&lesson=1");
  const help = page.getByRole("button", { name: "Walk me through it", exact: true });
  for (let attempt = 0; attempt < 2; attempt++) {
    await page.getByRole("button", { name: "come", exact: true }).click();
    await page.getByRole("button", { name: "finden", exact: true }).click();
  }
  await expect(help).toBeVisible();
  await help.click();
  await page.getByRole("button", { name: "continue", exact: true }).click();
  await expect.poll(async () => (await progress(page)).completedLessons).toContain(1);
  expect((await progress(page)).lessonStars[1]).toBe("gold");
});

test("free production accepts an authored valid German order and shows the matched answer", async ({ page }) => {
  await seed(page, {
    completedLessons: [...Array.from({ length: 12 }, (_, index) => index + 1), 101, 102, 103, 201, 202, 301, 302, 801, 802, 9001],
    passedGateIds: [1, 2], lessonProgress: practice(1201),
  });
  await page.goto("/?lang=de&lesson=1201");
  await page.getByRole("textbox").fill("Zeit habe ich keine");
  await page.getByRole("button", { name: "verify", exact: true }).click();
  await expect(page.getByText("Zeit habe ich keine", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "continue", exact: true }).click();
  const saved = (await progress(page)).lessonProgress[1201];
  expect(saved.retryExerciseIds).toEqual([]);
  expect(saved.everQueued).toBe(false);
});

test("learned-word review starts directly, persists its grade, and can be replayed", async ({ page }) => {
  await seed(page, { completedLessons: [1], wordMastery: { lernen: "encountered" }, preferredReviewMode: "flashcard" });
  await page.goto("/review");
  await expect(page.getByRole("button", { name: "review recent", exact: true })).toBeHidden();
  await page.getByRole("button", { name: "Review learned words", exact: true }).click();
  await page.getByRole("button", { name: "show answer", exact: true }).click();
  await page.getByRole("button", { name: "good", exact: true }).click();
  await expect.poll(async () => (await progress(page)).srsCards.lernen.repetitions).toBe(1);
  await page.getByRole("button", { name: "review again", exact: true }).click();
  await expect(page.getByText(/^card 1 \/ 1$/i)).toBeVisible();
});

test("tile review cannot grade a missing infinitive ending as Good", async ({ page }) => {
  await seed(page, { wordMastery: { lernen: "encountered" }, preferredReviewMode: "tiles" });
  await page.goto("/review");
  await page.getByRole("button", { name: "Review learned words", exact: true }).click();
  await page.getByRole("button", { name: "lern", exact: true }).click();
  await page.getByRole("button", { name: "check", exact: true }).click();
  await page.keyboard.press("Space");
  await expect.poll(async () => (await progress(page)).srsCards.lernen.lapses).toBe(1);
  expect((await progress(page)).srsCards.lernen.repetitions).toBe(0);
});
