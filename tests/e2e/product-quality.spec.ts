import { expect, test, type Locator, type Page } from "@playwright/test";
import { LESSONS } from "../../src/data/lessons";
import { EXERCISE_CAPABILITIES, type ExerciseItem, type ExerciseType } from "../../src/lib/types";
import { activateWithKeyboard, expectModalKeysIsolated, readLearningProgress, seedReturningLearner, tabTo } from "./product-quality-helpers";
import { writeFile } from "node:fs/promises";

const lessonOne = LESSONS.find((lesson) => lesson.id === 1)!;
const exerciseTypes = Object.keys(EXERCISE_CAPABILITIES) as ExerciseType[];

function fixtureFor(type: typeof exerciseTypes[number]) {
  for (const lesson of LESSONS) {
    const index = lesson.exercises.findIndex((exercise) => exercise.type === type);
    if (index !== -1) return { lesson, index, exercise: lesson.exercises[index] };
  }
  throw new Error(`No authored German exercise for ${type}`);
}

function promptGroup(page: Page, exercise: ExerciseItem) {
  return page.getByRole("group", { name: exercise.prompt, exact: true });
}

async function continueFeedback(page: Page) {
  const feedback = page.getByRole("dialog", { name: "correct", exact: true });
  await expect(feedback).toBeVisible();
  await activateWithKeyboard(page, feedback.getByRole("button", { name: /^continue\b/i }));
  await expect(feedback).toBeHidden();
}

test.use({ viewport: { width: 1280, height: 900 }, serviceWorkers: "block" });

test("keyboard-only: a fresh learner finishes every Lesson 1 exercise from the homepage", async ({ page }) => {
  // No lesson progress is seeded: every segment, answer and completion is earned below.
  await seedReturningLearner(page);
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("data-app-ready", "true");
  await activateWithKeyboard(page, page.getByRole("button", { name: `Start next recommended lesson: ${lessonOne.title}`, exact: true }));
  await expect(page.getByRole("dialog", { name: "Lesson 1", exact: true })).toBeVisible();
  await activateWithKeyboard(page, page.getByRole("button", { name: /^next: pattern/i }));
  await activateWithKeyboard(page, page.getByRole("button", { name: /^next: transformation table/i }));
  const startPractice = page.getByRole("button", { name: /^start exercises/i });
  const wordDetails = page.getByRole("button", { name: /^View etymology and details for / }).first();
  const drawer = page.getByRole("dialog").filter({ has: page.getByRole("button", { name: "Close word drawer", exact: true }) });
  const tableProgress = (await readLearningProgress(page)).lessonProgress[1];
  await expectModalKeysIsolated(
    page,
    () => activateWithKeyboard(page, wordDetails),
    drawer,
    drawer.getByRole("button", { name: "Close word drawer", exact: true }),
    async () => {
      await expect(startPractice).toBeVisible();
      await expect(page.getByRole("group", { name: lessonOne.exercises[0].prompt, exact: true })).toBeHidden();
      expect((await readLearningProgress(page)).lessonProgress[1]).toEqual(tableProgress);
    },
  );
  await activateWithKeyboard(page, startPractice);

  for (const exercise of lessonOne.exercises) {
    await test.step(`${exercise.id}: ${exercise.type}`, async () => {
      const group = promptGroup(page, exercise);
      await expect(group).toBeVisible();
      switch (exercise.type) {
        case "morpheme_tiles":
          for (const tile of ["lern", "en"]) {
            await activateWithKeyboard(page, group.getByRole("button", { name: tile, exact: true }));
          }
          await activateWithKeyboard(page, group.getByRole("button", { name: "verify", exact: true }));
          break;
        case "matching_pairs":
          for (const pair of exercise.matching_pairs!) {
            await activateWithKeyboard(page, group.getByRole("button", { name: pair.english, exact: true }));
            await expect(group.getByRole("button", { name: pair.english, exact: true })).toHaveAttribute("aria-pressed", "true");
            await activateWithKeyboard(page, group.getByRole("button", { name: pair.german, exact: true }));
          }
          break;
        case "derive":
        case "reverse_cognate": {
          const input = group.getByRole("textbox", { name: exercise.prompt, exact: true });
          await tabTo(page, input);
          await page.keyboard.type(exercise.target_answer);
          await page.keyboard.press("Enter");
          break;
        }
        case "syntax_builder":
          for (const word of exercise.target_answer.split(" ")) {
            await activateWithKeyboard(page, group.getByRole("button", { name: word, exact: true }));
          }
          await activateWithKeyboard(page, group.getByRole("button", { name: "verify", exact: true }));
          break;
        default:
          throw new Error(`Lesson 1 changed: teach the keyboard scenario to answer ${exercise.type}`);
      }
      await continueFeedback(page);
    });
  }

  // The ungraded end-of-practice sentence is also answered, not skipped.
  const twist = lessonOne.twist!;
  const twistInput = page.getByRole("textbox", { name: twist.prompt, exact: true });
  await tabTo(page, twistInput);
  await page.keyboard.type(twist.target_answer);
  await page.keyboard.press("Enter");
  await activateWithKeyboard(page, page.getByRole("button", { name: "got it", exact: true }));
  await expect(page.getByText("lesson complete", { exact: true })).toBeVisible();
  const finish = page.getByRole("button", { name: /mark lesson finished/i });
  if (await finish.isVisible()) await activateWithKeyboard(page, finish);
  await expect(page.getByText("lesson mastered ✓", { exact: true })).toBeVisible();
  const progress = await readLearningProgress(page);
  expect(progress.completedLessons).toContain(1);
  expect(progress.lessonProgress[1].completedSegments).toEqual(expect.arrayContaining(["hook", "pattern", "table", "practice", "summary"]));
  expect(progress.lessonProgress[1].retryExerciseIds ?? []).toEqual([]);
});

async function expectErrorDialog(page: Page, target: string) {
  const feedback = page.getByRole("dialog", { name: "sound shift breakdown", exact: true });
  await expect(feedback).toBeVisible();
  await expect(feedback).toHaveAttribute("aria-modal", "true");
  await expect(feedback.getByText(target, { exact: true })).toBeVisible();
  const next = feedback.getByRole("button", { name: /^continue\b/i });
  await tabTo(page, next);
  await page.keyboard.press("Enter");
  await expect(feedback).toBeHidden();
}

function choice(group: Locator, text: string) {
  // Variant English displays an ordinal before the answer, unlike single-choice inputs.
  return group.getByRole("button").filter({ hasText: text });
}

test.describe("screen-reader exercise controls and feedback", () => {
  for (const type of exerciseTypes) {
    const { lesson, index, exercise } = fixtureFor(type);
    test(`${type}: authored ${exercise.id} exposes its task, controls and actionable error feedback`, async ({ page }) => {
      await seedReturningLearner(page, {
        lessonProgress: { [lesson.id]: { segment: "practice", practiceIndex: index, completedSegments: ["hook", "pattern", "table"] } },
      });
      await page.goto(`/?lang=de&lesson=${lesson.id}`);
      const group = promptGroup(page, exercise);
      await expect(group).toBeVisible();
      await expect(group).toHaveAccessibleName(exercise.prompt);

      if (["derive", "reverse_cognate", "transcribe", "dictation", "family_matrix", "pronoun_compression", "spoken_turn_reply"].includes(type)) {
        const inputName = type === "dictation" ? "Write down the sentence you heard"
          : type === "family_matrix" ? `The ${exercise.columns![exercise.task!.column]} form of ${exercise.rows![exercise.task!.row]}`
          : exercise.prompt;
        const input = group.getByRole("textbox", { name: inputName, exact: true });
        await expect(input).toHaveAttribute("lang", type === "reverse_cognate" ? "en" : "de");
        await tabTo(page, input);
        await page.keyboard.type("zzzzzzzz");
        await page.keyboard.press("Enter");
        await expectErrorDialog(page, exercise.target_answer);
      } else if (type === "matching_pairs") {
        const pairs = exercise.matching_pairs!;
        await activateWithKeyboard(page, group.getByRole("button", { name: pairs[0].english, exact: true }));
        await expect(group.getByRole("button", { name: pairs[0].english, exact: true })).toHaveAttribute("aria-pressed", "true");
        await activateWithKeyboard(page, group.getByRole("button", { name: pairs[1].german, exact: true }));
        await expect(group.getByRole("status").filter({ hasText: /does not match/i })).toContainText(/try again/i);
        await tabTo(page, group.getByRole("button", { name: pairs[0].english, exact: true }));
      } else if (type === "variant_english") {
        const trap = exercise.traps![0];
        const option = choice(group, trap);
        await expect(option).toHaveAccessibleName(new RegExp(trap.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
        await activateWithKeyboard(page, option);
        await expect(option).toHaveAttribute("aria-pressed", "true");
        await activateWithKeyboard(page, group.getByRole("button", { name: "Check", exact: true }));
        const feedback = group.getByRole("alert");
        await expect(feedback).toContainText(exercise.renderings![0]);
        await tabTo(page, feedback.getByRole("button", { name: "Continue", exact: true }));
      } else if (type === "shift_select" || type === "literal_gloss") {
        const wrong = exercise.options!.find((option) => option !== exercise.target_answer)!;
        await activateWithKeyboard(page, group.getByRole("button", { name: wrong, exact: true }));
        await expectErrorDialog(page, exercise.target_answer);
      } else {
        const tiles = type === "morpheme_tiles" ? exercise.tile_options! : exercise.word_bank!;
        // A lone distractor/word is a genuine wrong answer, not a synthetic widget fixture.
        const wrong = tiles.find((tile) => !exercise.target_answer.split(/\s+/).includes(tile)) ?? tiles[0];
        await activateWithKeyboard(page, group.getByRole("button", { name: wrong, exact: true }));
        await activateWithKeyboard(page, group.getByRole("button", { name: "verify", exact: true }));
        await expectErrorDialog(page, exercise.target_answer);
      }
    });
  }
});

const productionPerformance = process.env.PLAYWRIGHT_PRODUCTION === "1";

test("@performance production homepage and Lesson 1 stay usable on throttled 4G", async ({ page, context, browserName }, testInfo) => {
  test.skip(!productionPerformance, "Run the production-only test with PLAYWRIGHT_PRODUCTION=1 and a production server.");
  expect(browserName, "CDP network and CPU emulation require Chromium").toBe("chromium");
  expect(process.env.PLAYWRIGHT_BASE_URL || process.env.PLAYWRIGHT_WEB_SERVER, "Select an explicit production target").toBeTruthy();
  if (!process.env.PLAYWRIGHT_BASE_URL) expect(process.env.PLAYWRIGHT_WEB_SERVER).toMatch(/\bstart\b/);
  await seedReturningLearner(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => {
    document.addEventListener("focusin", (event) => {
      if (event.target instanceof Element && event.target.matches("[data-next-lesson-start]") &&
          !performance.getEntriesByName("homepage-keyboard-ready").length) performance.mark("homepage-keyboard-ready");
    }, true);
    document.addEventListener("click", (event) => {
      if (event.target instanceof Element && event.target.closest("[data-next-lesson-start]")) performance.mark("lesson-open");
    }, true);
  });
  const cdp = await context.newCDPSession(page);
  await cdp.send("Network.enable");
  await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
  // Fast 4G: 1.6 Mbit/s down, 750 Kbit/s up, 150 ms RTT; mid-range mobile CPU.
  await cdp.send("Network.emulateNetworkConditions", {
    offline: false, latency: 150, downloadThroughput: 1_600_000 / 8,
    uploadThroughput: 750_000 / 8, connectionType: "cellular4g",
  });
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  let transferredBytes = 0;
  let compressedScripts = 0;
  const responses = new Map<string, { url: string; encoding: string; transferredBytes: number }>();
  cdp.on("Network.responseReceived", ({ requestId, response, type: resourceType }) => {
    const encoding = Object.entries(response.headers).find(([key]) => key.toLowerCase() === "content-encoding")?.[1] ?? "";
    responses.set(requestId, { url: response.url, encoding, transferredBytes: 0 });
    if (resourceType === "Script" && /gzip|br|zstd/i.test(encoding)) compressedScripts++;
  });
  cdp.on("Network.loadingFinished", ({ requestId, encodedDataLength }) => {
    transferredBytes += encodedDataLength;
    const response = responses.get(requestId);
    if (response) response.transferredBytes = encodedDataLength;
  });

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.waitForFunction(() => document.documentElement.dataset.appReady === "true" &&
    Boolean(document.querySelector<HTMLButtonElement>("[data-next-lesson-start]")?.disabled === false));
  await page.keyboard.press("Tab");
  await page.waitForFunction(() => performance.getEntriesByName("homepage-keyboard-ready").length > 0);
  const homepageReadyMs = await page.evaluate(() => performance.getEntriesByName("homepage-keyboard-ready")[0].startTime);
  await page.waitForLoadState("networkidle");
  const homepageBytes = transferredBytes;

  await page.keyboard.press("Enter");
  await page.waitForFunction(() => {
    const article = document.querySelector('[role="dialog"][aria-label="Lesson 1"] article');
    if (!article || ![...article.querySelectorAll("button")].some((button) => !button.disabled && /next: pattern/i.test(button.textContent ?? ""))) return false;
    performance.mark("lesson-ready");
    return true;
  });
  const lessonReadyMs = await page.evaluate(() => performance.getEntriesByName("lesson-ready")[0].startTime -
    performance.getEntriesByName("lesson-open").at(-1)!.startTime);
  // Timing is captured in-browser before accessibility queries add test-driver work.
  await page.getByRole("button", { name: /^next: pattern/i }).last().click();
  await expect(page.getByRole("button", { name: /^next: transformation table/i }).last()).toBeVisible();
  await page.waitForLoadState("networkidle");
  const lessonPayload = [...responses.values()].find(({ url }) => new URL(url).pathname === "/data/de/lessons/1.json");
  const metrics = { homepageReadyMs, lessonReadyMs, homepageBytes, combinedBytes: transferredBytes, lessonPayload, compressedScripts, responses: [...responses.values()] };
  const metricsPath = testInfo.outputPath("4g-production-metrics.json");
  await writeFile(metricsPath, JSON.stringify(metrics, null, 2));
  await testInfo.attach("4g-production-metrics", { path: metricsPath, contentType: "application/json" });

  // Wire bytes, not decoded JS size: gzip/Brotli plus transfer framing as reported by Chromium.
  expect(compressedScripts, "Production must serve compressed JavaScript, not uncompressed dev assets").toBeGreaterThan(0);
  expect(lessonPayload, "The interaction must load the real Lesson 1 payload").toBeDefined();
  expect(lessonPayload!.encoding, "Lesson JSON is transferred compressed").toMatch(/gzip|br|zstd/i);
  expect(lessonPayload!.transferredBytes, "Lesson 1 must actually transfer bytes").toBeGreaterThan(0);
  expect(lessonPayload!.transferredBytes, "Lesson 1 compressed JSON budget (32 KiB)").toBeLessThanOrEqual(32 * 1024);
  expect(homepageBytes, "Cold homepage compressed transfer budget (900 KiB)").toBeLessThanOrEqual(900 * 1024);
  expect(transferredBytes, "Homepage + usable Lesson 1 compressed transfer budget (1.5 MiB)").toBeLessThanOrEqual(1.5 * 1024 * 1024);
  expect(homepageReadyMs, "Homepage keyboard-ready budget on 4G / 4× CPU (8 s)").toBeLessThanOrEqual(8_000);
  expect(lessonReadyMs, "Lesson 1 interactive hook budget on 4G / 4× CPU (8 s)").toBeLessThanOrEqual(8_000);
});
