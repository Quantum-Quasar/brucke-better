import { expect, test, type Page } from "@playwright/test";
import type { LessonPayload } from "../../src/lib/types";
import { GERMAN_ROUTE_A } from "../../src/tests/fixtures/german-trail-routes";
import { tabTo } from "./product-quality-helpers";

const STORAGE_KEY = "brucke_app_state_v1";

async function seed(page: Page, patch: Record<string, unknown> = {}) {
  await page.addInitScript(([key, value]) => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, value);
  }, [STORAGE_KEY, JSON.stringify({ hasCompletedOnboarding: true, settings: { showKeyTips: false, posturePrimerSeen: true, voiceGuidanceDismissed: ["de", "fr", "es", "nl"] }, ...patch })]);
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

test("the home start link opens a lesson with the keyboard and does not trap Tab", async ({ page }) => {
  await seed(page);
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-app-ready", "true");
  const start = page.locator("[data-next-lesson-start]");
  await expect(start).toBeVisible();
  await tabTo(page, start);
  await expect(start).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(start).not.toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(start).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog", { name: "Lesson 1", exact: true })).toBeVisible();
  const history = page.locator("details").filter({ has: page.locator("summary", { hasText: "historical notes" }) });
  await expect(history).not.toHaveAttribute("open", "");
  await history.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(history).toHaveAttribute("open", "");
  await expect(page.getByRole("button", { name: "Pattern", exact: true })).toHaveCount(0);
});

test("German lesson 4 opens both connected branches on mobile, but not lesson 7", async ({ page }, testInfo) => {
  await seed(page, {
    completedLessons: [1, 2],
    placedAtTopic: 28,
    lessonProgress: { 4: { segment: "summary", practiceIndex: 4, completedSegments: ["hook", "pattern", "table", "practice"] } },
  });
  await page.goto("/");
  await page.getByRole("button", { name: "First words, Playable", exact: true }).click();
  const map = page.getByRole("region", { name: "First words lesson map" });
  const node = (id: number) => map.getByRole("button", { name: new RegExp(`^Lesson ${id}:`) });
  await expect(node(6)).toHaveAccessibleName(/Locked$/);
  await expect(node(8)).toHaveAccessibleName(/Locked$/);
  await node(4).click();
  await page.getByRole("link", { name: "Start lesson", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "Lesson 4", exact: true }).getByText("lesson complete ✓", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "choose a path", exact: true }).click();
  await expect(page.getByText("3 / 7 to clear", { exact: true })).toBeVisible();
  for (const id of [3, 5, 6, 8]) await expect(node(id)).toHaveAccessibleName(/Playable$/);
  await expect(node(7)).toHaveAccessibleName(/Locked$/);
  await expect(map.locator('[data-path-from="@fork"][data-path-to="6"]')).toHaveAttribute("data-lit", "true");
  await expect(map.locator('[data-path-from="@fork"][data-path-to="8"]')).toHaveAttribute("data-lit", "true");
  await expect(map.locator('[data-path-from="6"][data-path-to="7"]')).toHaveAttribute("data-lit", "false");
  await node(6).scrollIntoViewIfNeeded();
  await map.screenshot({ path: testInfo.outputPath("mobile-lesson-map.png") });
  for (const id of [6, 8]) {
    await node(id).click();
    await page.getByRole("link", { name: "Start lesson", exact: true }).click();
    const lesson = page.getByRole("dialog", { name: `Lesson ${id}`, exact: true });
    await expect(lesson.getByRole("button", { name: /^next: pattern$/i }).last()).toBeVisible();
    await expect(lesson.getByText(/Preview only/)).toHaveCount(0);
    await lesson.getByRole("button", { name: "Back to Trail", exact: true }).click();
  }
  expect((await progress(page)).completedLessons).toEqual([1, 2, 4]);
  await node(7).click();
  const locked = page.getByRole("dialog");
  await expect(locked.getByText(/complete any one connected lesson: The Velar Shift/)).toBeVisible();
  await expect(locked.getByRole("link", { name: "Start lesson", exact: true })).toHaveCount(0);
});

test("German world map shows a real fork and rejoin on desktop", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await seed(page, { completedLessons: GERMAN_ROUTE_A.slice(0, 2).flat() });
  await page.goto("/");
  const world = page.getByRole("region", { name: "German world map" });
  const sounds = world.getByRole("button", { name: "Sound workshop, Cleared" });
  const words = world.getByRole("button", { name: "Word builders, Playable" });
  const plans = world.getByRole("button", { name: "Make plans, Playable" });
  await expect(sounds).toBeVisible();
  await expect(words).toBeVisible();
  await expect(plans).toBeVisible();
  await expect(world.locator('[data-path-from="sounds"][data-path-to="@words-join"]')).toHaveAttribute("data-lit", "true");
  await expect(world.locator('[data-path-from="words"][data-path-to="@words-join"]')).toHaveAttribute("data-lit", "false");
  await expect(world.locator('[data-path-from="@words-join"][data-path-to="plans"]')).toHaveAttribute("data-lit", "true");
  await sounds.scrollIntoViewIfNeeded();
  await world.screenshot({ path: testInfo.outputPath("desktop-world-map.png") });
  await words.click();
  const lessons = page.getByRole("region", { name: "Word builders lesson map" });
  await expect(lessons.getByRole("button", { name: /^Lesson 21:.*, Playable$/ })).toBeVisible();
  await lessons.screenshot({ path: testInfo.outputPath("desktop-lesson-map.png") });
  await page.getByRole("button", { name: "World map", exact: true }).click();
  await expect(plans).toBeVisible();
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
    completedLessons: [...GERMAN_ROUTE_A.slice(0, 4).flat(), 1001, 1003], lessonProgress: practice(1201),
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
  await page.getByRole("button", { name: "Show all decks", exact: true }).click();
  await page.getByRole("button", { name: "review learned words", exact: true }).click();
  await page.getByRole("button", { name: "show answer", exact: true }).click();
  await page.getByRole("button", { name: "good", exact: true }).click();
  await expect.poll(async () => (await progress(page)).srsCards.lernen.repetitions).toBe(1);
  await page.getByRole("button", { name: "review again", exact: true }).click();
  await expect(page.getByText(/^card 1 \/ 1$/i)).toBeVisible();
});

test("tile review cannot grade a missing infinitive ending as Good", async ({ page }) => {
  await seed(page, { completedLessons: [1], wordMastery: { lernen: "encountered" }, preferredReviewMode: "tiles" });
  await page.goto("/review");
  await page.getByRole("button", { name: "Show all decks", exact: true }).click();
  await page.getByRole("button", { name: "review learned words", exact: true }).click();
  await page.getByRole("button", { name: "lern", exact: true }).click();
  await page.getByRole("button", { name: "check", exact: true }).click();
  await page.keyboard.press("Space");
  await expect.poll(async () => (await progress(page)).srsCards.lernen.lapses).toBe(1);
  expect((await progress(page)).srsCards.lernen.repetitions).toBe(0);
});

test("one failed sentence attempt persists once and its replay never awards lesson or word progress", async ({ page }) => {
  const response = await page.request.get("/data/de/lessons/1.json");
  expect(response.ok()).toBe(true);
  const payload = await response.json() as LessonPayload;
  const exercise = payload.lesson.exercises.find((item) => item.id === "l1_e5")!;
  const id = `1:${exercise.id}`;
  await seed(page, { lessonProgress: practice(1) });
  await page.goto("/?lesson=1&lang=de");
  const initial = page.locator('[data-exercise-type="syntax_builder"]');
  await initial.getByRole("textbox").fill(exercise.target_answer.split(" ")[0]);
  await initial.getByRole("button", { name: "verify", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "not quite", exact: true })).toBeVisible();
  await expect.poll(async () => (await progress(page)).sentenceCards?.[id]?.lapses).toBe(1);
  await page.reload();
  await expect.poll(async () => (await progress(page)).sentenceCards?.[id]?.lapses).toBe(1);
  const before = await progress(page);

  await page.goto("/review");
  await page.getByRole("button", { name: "review sentence processes", exact: true }).click();
  const replay = page.getByRole("region", { name: "Sentence process review" }).locator('[data-exercise-type="syntax_builder"]');
  for (const tile of ["ich", "lerne", "Deutsch", "mit", "Brücke"]) {
    await replay.getByRole("button", { name: tile, exact: true }).click();
  }
  await replay.getByRole("button", { name: "verify", exact: true }).click();
  await page.getByRole("dialog", { name: "correct", exact: true }).getByRole("button", { name: /^continue/i }).click();
  await expect.poll(async () => (await progress(page)).sentenceCards[id].repetitions).toBe(1);
  const after = await progress(page);
  expect(after.sentenceCards[id].lapses).toBe(1);
  expect(after.sentenceCards[id].due_date > before.sentenceCards[id].due_date).toBe(true);
  expect(after.completedLessons).toEqual(before.completedLessons);
  expect(after.lessonStars).toEqual(before.lessonStars);
  expect(after.wordMastery).toEqual(before.wordMastery);
  expect(after.srsCards).toEqual(before.srsCards);
});

test("replaying practice from the table cannot skip straight back to summary for a perfect star", async ({ page }) => {
  await seed(page, {
    completedLessons: [1],
    currentLessonId: 2,
    lessonStars: { 1: "gold" },
    lessonProgress: {
      1: {
        segment: "summary",
        practiceIndex: 4,
        completedSegments: ["hook", "pattern", "table", "practice", "summary"],
        everQueued: true,
        retryExerciseIds: [],
        inRetryPhase: false,
        retryIndex: 0,
      },
    },
  });
  await page.goto("/?lang=de&lesson=1");
  await page.getByRole("button", { name: "Table", exact: true }).click();
  await page.getByRole("button", { name: /^start exercises/i }).click();
  await expect(page.getByText(/problem 1 of 5/i)).toBeVisible();
  // The old summary mark must not survive the replay: otherwise the summary CTA
  // completes the lesson with a fresh everQueued=false and upgrades gold to purple.
  await expect(page.getByRole("button", { name: "Summary", exact: true })).toHaveCount(0);
  expect((await progress(page)).lessonStars[1]).toBe("gold");
});
