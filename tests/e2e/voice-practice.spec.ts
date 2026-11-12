import { expect, test, type Page } from "@playwright/test";
import { seedReturningLearner, STORAGE_KEY } from "./product-quality-helpers";

async function installSpeechFixture(page: Page, initialLangs: string[] = []) {
  await page.addInitScript((langs) => {
    let voices = langs.map((lang) => ({ name: `Fixture ${lang}`, lang, default: false, localService: true, voiceURI: lang }));
    const synthesis = Object.assign(new EventTarget(), {
      getVoices: () => voices,
      speak: () => {}, cancel: () => {}, resume: () => {}, paused: false,
    });
    Object.defineProperty(window, "speechSynthesis", { configurable: true, value: synthesis });
    window.addEventListener("fixture:voices", (event) => {
      const fixtureEvent = event as CustomEvent<string[]>;
      voices = fixtureEvent.detail.map((lang) => ({ name: `Fixture ${lang}`, lang, default: false, localService: true, voiceURI: lang }));
      synthesis.dispatchEvent(new Event("voiceschanged"));
    });
    class Recognition {
      lang = "";
      continuous = false;
      interimResults = false;
      maxAlternatives = 1;
      onresult: ((event: { results: { transcript: string }[][] }) => void) | null = null;
      onerror: ((event: { error: string }) => void) | null = null;
      onend: (() => void) | null = null;
      private result = (event: Event) => {
        const fixtureEvent = event as CustomEvent<string>;
        this.onresult?.({ results: [[{ transcript: fixtureEvent.detail }]] });
      };
      start() {
        document.documentElement.dataset.fixtureMicStarted = "true";
        window.addEventListener("fixture:recognition", this.result);
      }
      abort() {
        document.documentElement.dataset.fixtureMicActive = "false";
        window.removeEventListener("fixture:recognition", this.result);
      }
    }
    Object.defineProperty(window, "SpeechRecognition", { configurable: true, value: Recognition });
  }, initialLangs);
}

async function savedSettings(page: Page) {
  await page.evaluate(() => window.dispatchEvent(new Event("pagehide")));
  return page.evaluate((key) => JSON.parse(localStorage.getItem(key) ?? "{}").settings, STORAGE_KEY);
}

test("a delayed regional voice is accepted without a missing-voice sheet", async ({ page }) => {
  await installSpeechFixture(page);
  await seedReturningLearner(page, { settings: { voiceGuidanceDismissed: [] } });
  await page.goto("/?lang=de&lesson=1");
  await expect(page.getByRole("dialog", { name: "Lesson 1", exact: true })).toBeVisible();
  await page.evaluate(() => window.dispatchEvent(new CustomEvent("fixture:voices", { detail: ["de-AT"] })));
  await expect.poll(async () => (await savedSettings(page)).voiceGuidanceDismissed).toContain("de");
  await expect(page.getByRole("dialog", { name: "Your German lesson voice" })).toBeHidden();
});

test("missing voice guidance is keyboard accessible and only shown once per language", async ({ page }) => {
  await installSpeechFixture(page, ["en-US"]);
  await seedReturningLearner(page, { settings: { voiceGuidanceDismissed: [] } });
  await page.goto("/?lang=de&lesson=1");
  const germanGuide = page.getByRole("dialog", { name: "Your German lesson voice" });
  await expect(germanGuide).toBeVisible();
  await expect(germanGuide).toContainText("No German speech voice detected");
  await expect(germanGuide).toContainText("Install a German voice");
  await expect(germanGuide.getByRole("button", { name: "Continue to lesson" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(germanGuide).toBeHidden();
  await expect.poll(async () => (await savedSettings(page)).voiceGuidanceDismissed).toContain("de");
  await page.reload();
  await expect(page.getByRole("dialog", { name: "Lesson 1", exact: true })).toBeVisible();
  await expect(germanGuide).toBeHidden();
  await page.goto("/?lang=fr&lesson=1");
  await expect(page.getByRole("dialog", { name: "Your French lesson voice" })).toBeVisible();
});

test("microphone gesture gives optional transcript feedback without submitting the written reply", async ({ page }) => {
  await installSpeechFixture(page, ["de-DE"]);
  await seedReturningLearner(page, {
    completedLessons: [...Array.from({ length: 13 }, (_, index) => index + 1), 101, 102, 103, 201, 202, 301, 302, 801, 802, 9001, 1201],
    passedGateIds: [1, 2],
    lessonProgress: { 1301: { segment: "practice", practiceIndex: 3, completedSegments: ["hook", "pattern", "table"], everQueued: false, retryExerciseIds: [], inRetryPhase: false, retryIndex: 0 } },
    settings: { showKeyTips: false, posturePrimerSeen: true, microphonePractice: true, voiceGuidanceDismissed: ["de"] },
  });
  await page.goto("/?lang=de&lesson=1301");
  const practice = page.getByRole("region", { name: "Optional microphone practice" });
  await expect(practice).toBeVisible();
  await expect(practice).toContainText("provider may send and process audio online");
  await expect(page.locator("html")).not.toHaveAttribute("data-fixture-mic-started", "true");
  const input = page.getByRole("textbox");
  await expect(input).toHaveValue("");
  await practice.getByRole("button", { name: "Start microphone practice" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-fixture-mic-started", "true");
  await page.evaluate(() => window.dispatchEvent(new CustomEvent("fixture:recognition", { detail: "Das Buch ist hier" })));
  await expect(practice).toContainText("Exact match");
  await expect(input).toHaveValue("");
  await expect(page.getByRole("dialog", { name: "correct", exact: true })).toBeHidden();
  await practice.getByRole("button", { name: "Start microphone practice" }).click();
  await practice.getByRole("button", { name: "Cancel microphone practice" }).click();
  await expect(practice).toContainText("cancelled");
  await expect(page.locator("html")).toHaveAttribute("data-fixture-mic-active", "false");
  await input.fill("Das Buch ist hier");
  await page.getByRole("button", { name: "reply", exact: true }).click();
  await expect(page.getByRole("dialog", { name: "correct", exact: true })).toBeVisible();
});
