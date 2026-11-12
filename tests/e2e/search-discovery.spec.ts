import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";
import { setTimeout as delay } from "node:timers/promises";

// Exercise client loading errors, not service-worker cache hits or worker-owned fetches.
test.use({ serviceWorkers: "block" });

async function seed(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem("brucke_app_state_v1", JSON.stringify({
      hasCompletedOnboarding: true,
      activeLanguageId: "de",
      settings: { showKeyTips: false, posturePrimerSeen: true },
    }));
  });
}

test("search opens by slash, finds words and lessons, and preserves native link targets", async ({ page, request }) => {
  await seed(page);
  await page.goto("/");
  await expect(page.getByRole("searchbox", { name: "Search words and lessons" })).toBeVisible();
  await page.keyboard.press("/");
  const dialog = page.getByRole("dialog", { name: "Search German words & lessons" });
  await expect(dialog).toBeVisible();
  const input = dialog.getByRole("searchbox", { name: "Word, meaning, cognate or lesson" });
  await expect(input).toBeFocused();
  await input.fill("vergessen");
  const word = dialog.getByRole("button").filter({ hasText: /^vergessen/ }).first();
  await expect(word).toContainText(/forget/i);
  const teaching = dialog.getByRole("link", { name: /^Lesson \d+:/ }).first();
  await expect(teaching).toHaveAttribute("href", /^\/trail\/de\/\d+$/);
  const href = await teaching.getAttribute("href");
  const response = await request.get(href!);
  expect(response.status()).toBe(200);
  expect(new URL(response.url()).pathname).toBe(href);
  expect(await response.text()).toContain('application/ld+json');
  await word.click();
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("dialog")).toContainText("vergessen");
  await page.keyboard.press("/");
  await expect(dialog).not.toBeVisible();
  await page.keyboard.press("Escape");
  await page.getByRole("searchbox", { name: "Search words and lessons" }).click();
  await input.fill("Gift");
  await expect(dialog.getByRole("button").filter({ hasText: /^Gift/ }).first()).toContainText(/poison/i);
  await input.fill("dative");
  await expect(dialog.getByRole("link", { name: /Lesson .*Dative/ }).first()).toBeVisible();
  await input.fill("no-match-987654321");
  await expect(dialog.getByRole("status")).toContainText("No results");
  await input.press("/");
  await expect(input).toHaveValue("no-match-987654321/");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(page.getByRole("searchbox", { name: "Search words and lessons" })).toBeFocused();
});

test("search reports lazy loading failure and retries real content", async ({ page }) => {
  await seed(page);
  await page.route("**/data/de/compendium.json*", async (route) => {
    await delay(500);
    await route.fulfill({ status: 503, body: "temporarily unavailable" });
  });
  await page.goto("/");
  const failedContent = page.waitForResponse((response) => new URL(response.url()).pathname === "/data/de/compendium.json");
  await page.getByRole("searchbox", { name: "Search words and lessons" }).click();
  const dialog = page.getByRole("dialog", { name: "Search German words & lessons" });
  await expect(dialog.getByRole("status")).toHaveText("Loading search…");
  expect((await failedContent).status()).toBe(503);
  await expect(dialog.getByRole("status")).toContainText("Search could not be loaded");
  await page.unroute("**/data/de/compendium.json*");
  const retriedContent = page.waitForResponse((response) => new URL(response.url()).pathname === "/data/de/compendium.json");
  await dialog.getByRole("button", { name: "Retry search" }).click();
  expect((await retriedContent).status()).toBe(200);
  await dialog.getByRole("searchbox").fill("Gift");
  await expect(dialog.getByRole("button").filter({ hasText: /^Gift/ }).first()).toContainText(/poison/i);
});

test("sitemap contains real canonical lesson pages and invalid courses do not masquerade as German", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  expect(await sitemap.text()).toContain("/trail/de/1</loc>");
  expect(await sitemap.text()).not.toContain("?lesson=");
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("/sitemap.xml");
  expect((await request.get("/trail/zz/1")).status()).toBe(404);
  expect((await request.get("/trail/de/9999999")).status()).toBe(404);
});
