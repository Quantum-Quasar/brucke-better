import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";

const STORAGE_KEY = "brucke_app_state_v1";

test("loads only the opened lesson and resumes visited practice after an offline reload", async ({ page, context }) => {
  test.skip(!process.env.PLAYWRIGHT_WEB_SERVER?.includes("start"), "Offline caching is production-only; run against next start.");
  const lessons: string[] = [];
  page.on("request", (request) => {
    if (/\/data\/.*\/lessons\//.test(request.url())) lessons.push(new URL(request.url()).pathname);
  });
  await page.goto("/");
  await page.waitForFunction(() => document.documentElement.dataset.appReady === "true");
  expect(lessons).toEqual([]);
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller));
  await page.getByRole("link", { name: "Start topic 1", exact: true }).click();
  await page.getByRole("button", { name: /^next: pattern/i }).click();
  await page.getByRole("button", { name: /^next: transformation table/i }).click();
  await page.getByRole("button", { name: /^start exercises/i }).click();
  await page.getByRole("button", { name: /^(?:\d+\s+)?lern$/ }).click();
  await page.getByRole("button", { name: /^(?:\d+\s+)?en$/ }).click();
  await page.getByRole("button", { name: /^verify/i }).click();
  await expect(page.getByRole("heading", { name: "correct", exact: true })).toBeVisible();
  await page.getByRole("button", { name: /^continue/i }).click();
  await expect(page.getByText(/problem 2 of 5/i)).toBeVisible();
  expect([...new Set(lessons)]).toEqual(["/data/de/lessons/1.json"]);

  await page.evaluate(() => window.dispatchEvent(new Event("pagehide")));
  await page.waitForFunction(async () => {
    const urls = [location.origin + "/", ...performance.getEntriesByType("resource").map((entry) => entry.name).filter((url) => /\/_next\/static\/|\/data\//.test(url))];
    return (await Promise.all(urls.map((url) => caches.match(url)))).every(Boolean);
  });
  await context.setOffline(true);
  await page.reload();
  await page.getByRole("button", { name: "Resume next recommended lesson: The Germanic Core", exact: true }).click();
  await expect(page.getByText(/problem 2 of 5/i)).toBeVisible();
  await expect(page.getByText(/Offline — cached pages/)).toBeVisible();
  await context.setOffline(false);
});

test("offers a backup after progress and restores its downloaded JSON", async ({ page }) => {
  await page.addInitScript((key) => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify({
      activeLanguageId: "de", completedLessons: [1], lessonStars: { 1: "purple" }, currentLessonId: 2, hasCompletedOnboarding: true,
    }));
  }, STORAGE_KEY);
  await page.goto("/");
  const reminder = page.getByRole("complementary", { name: "Protect your learning progress" });
  await expect(reminder).toBeVisible();
  const downloading = page.waitForEvent("download");
  await reminder.getByRole("button", { name: "download progress backup" }).click();
  const download = await downloading;
  expect(await download.failure()).toBeNull();
  const file = await download.path();
  if (!file) throw new Error("Backup did not produce a file");
  const backup = JSON.parse(await readFile(file, "utf8"));
  expect(backup.progressByLanguage.de.completedLessons).toEqual([1]);
  expect(backup.progressByLanguage.de.lessonStars).toEqual({ 1: "purple" });
  await expect(reminder).toBeHidden();

  await page.goto("/settings#backup");
  await expect.poll(async () => {
    const box = await page.locator("#backup").boundingBox();
    return box !== null && box.y >= 0 && box.y < 300;
  }).toBe(true);
  page.on("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "reset all progress", exact: true }).click();
  await expect.poll(() => page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).progressByLanguage.de.completedLessons, STORAGE_KEY)).toEqual([]);
  await page.locator('input[type="file"]').setInputFiles(file);
  await expect.poll(() => page.evaluate((key) => JSON.parse(localStorage.getItem(key)!).progressByLanguage.de.completedLessons, STORAGE_KEY)).toEqual([1]);
});

test("does not claim storage protection when the browser refuses it", async ({ page }) => {
  await page.addInitScript(() => {
    let attempts = 0;
    Object.defineProperty(navigator.storage, "persisted", { value: async () => false });
    Object.defineProperty(navigator.storage, "persist", { value: async () => ++attempts >= 2 });
  });
  await page.goto("/settings#backup");
  const protect = page.getByRole("button", { name: "protect storage from automatic eviction" });
  await protect.click();
  await expect(page.getByText("The browser did not grant protection. Keep downloading backups.")).toBeVisible();
  await protect.click();
  await expect(page.getByText("Persistent storage is enabled.")).toBeVisible();
  await expect(protect).toBeHidden();
});
