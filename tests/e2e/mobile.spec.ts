import { test, expect, type Page } from "@playwright/test";

// Mobile regression suite. Runs against the same dev server as the smoke
// suite; use `bun run test:e2e -- mobile.spec.ts` locally.

const STORAGE_KEY = "brucke_app_state_v1";

async function waitForApp(page: Page) {
  await page.waitForFunction(() => document.documentElement.dataset.appReady === "true", null, {
    timeout: 120_000,
  });
  await page.waitForTimeout(400);
}

async function openLesson(page: Page) {
  await page.goto("/?lang=de&lesson=1");
  await page.waitForSelector('[role="dialog"][aria-label^="Lesson"]', { timeout: 120_000 });
  await waitForApp(page);
}

test.use({ viewport: { width: 360, height: 740 }, isMobile: true, hasTouch: true });

test.describe("mobile shell", () => {
  test("the default palette is readable and the browser chrome adopts it", async ({ page }) => {
    await page.goto("/");
    await waitForApp(page);
    const info = await page.evaluate(() => ({
      sub: getComputedStyle(document.documentElement).getPropertyValue("--sub-color").trim(),
      viewport: document.querySelector('meta[name="viewport"]')?.getAttribute("content") ?? "",
      themeColor: document.querySelector('meta[name="theme-color"]')?.getAttribute("content") ?? null,
    }));
    expect(info.sub.toLowerCase()).toBe("#a0a0a0");
    expect(info.viewport).toContain("viewport-fit=cover");
    expect(info.themeColor?.toLowerCase()).toBe("#1c1c1c");
  });

  test("a first visit keeps the welcome hero in view", async ({ page }) => {
    await page.goto("/");
    await waitForApp(page);
    await page.waitForTimeout(1800);
    const state = await page.evaluate(() => {
      const rect = document.querySelector(".first-visit-hero")?.getBoundingClientRect();
      return { scrollY: window.scrollY, top: rect?.top ?? null, bottom: rect?.bottom ?? null };
    });
    expect(state.scrollY).toBeLessThan(50);
    expect(state.top).not.toBeNull();
    expect(state.top!).toBeGreaterThanOrEqual(0);
    expect(state.bottom!).toBeLessThanOrEqual(740);
  });

  test("returning to the trail restores the saved scroll position", async ({ page }) => {
    await page.goto("/");
    await waitForApp(page);
    await page.evaluate(() => window.scrollTo(0, 2600));
    await page.waitForTimeout(400);
    await page.evaluate(() =>
      document
        .querySelector<HTMLElement>('nav[aria-label="Main navigation"] a[href="/review"]')
        ?.click()
    );
    await page.waitForURL("**/review");
    await waitForApp(page);
    await page.evaluate(() =>
      document
        .querySelector<HTMLElement>('nav[aria-label="Main navigation"] a[href="/"]')
        ?.click()
    );
    await page.waitForURL((url) => url.pathname === "/");
    await page.waitForTimeout(1400);
    expect(await page.evaluate(() => Math.round(window.scrollY))).toBeGreaterThan(2500);
  });

  test("the lesson action bar clears the reading content", async ({ page }) => {
    await openLesson(page);
    await page.waitForFunction(
      () =>
        [...document.querySelectorAll("button")].some(
          (button) =>
            /next:|start exercises|start questions/i.test(button.textContent || "") &&
            getComputedStyle(button.closest("div")!).position === "fixed"
        ),
      null,
      { timeout: 30000 }
    );
    const result = await page.evaluate(() => {
      const article = document.querySelector("article");
      const cta = [...document.querySelectorAll("button")].find(
        (button) =>
          /next:|start exercises|start questions/i.test(button.textContent || "") &&
          getComputedStyle(button.closest("div")!).position === "fixed"
      );
      return {
        paddingBottom: article ? parseFloat(getComputedStyle(article).paddingBottom) : 0,
        ctaHeight: cta ? cta.getBoundingClientRect().height : 0,
      };
    });
    expect(result.ctaHeight).toBeGreaterThanOrEqual(40);
    expect(result.paddingBottom).toBeGreaterThanOrEqual(result.ctaHeight + 40);
  });

  test("the system Back gesture closes the lesson overlay", async ({ page }) => {
    await openLesson(page);
    await page.waitForTimeout(600);
    await page.evaluate(() => window.history.back());
    await expect(page.locator('[role="dialog"][aria-label^="Lesson"]')).toBeHidden({
      timeout: 5000,
    });
  });

  test("form controls avoid iOS focus zoom and the dock is tappable", async ({ page }) => {
    await page.goto("/atlas");
    await waitForApp(page);
    const sizes = await page.evaluate(() =>
      [...document.querySelectorAll('input:not([type="checkbox"]):not([type="range"]), select, textarea')]
        .filter((el) => el.getBoundingClientRect().height > 0)
        .map((el) => parseFloat(getComputedStyle(el).fontSize))
    );
    expect(sizes.length).toBeGreaterThan(0);
    expect(Math.min(...sizes)).toBeGreaterThanOrEqual(16);

    const navHeights = await page.evaluate(() =>
      [...document.querySelectorAll('nav[aria-label="Main navigation"] a')].map(
        (link) => link.getBoundingClientRect().height
      )
    );
    expect(Math.min(...navHeights)).toBeGreaterThanOrEqual(43);
  });

  test("long German words fit the word drawer", async ({ page }) => {
    await page.goto("/atlas/th_to_d");
    await page.waitForSelector('[role="dialog"][aria-label="Atlas family"]', { timeout: 120_000 });
    await waitForApp(page);
    const roster = page.locator('[role="dialog"][aria-label="Atlas family"] input[type="text"]');
    await roster.fill("Schwiegervater");
    await page
      .locator('[role="dialog"][aria-label="Atlas family"] button', { hasText: "Schwiegervater" })
      .first()
      .click({ force: true });
    await expect(page.locator("#word-drawer-title")).toBeVisible({ timeout: 15000 });
    const box = await page.evaluate(() => {
      const dialog = document.querySelector("#word-drawer-title")?.closest('[role="dialog"]');
      const title = document.querySelector("#word-drawer-title");
      return {
        overflow: dialog ? dialog.scrollWidth - dialog.clientWidth : 999,
        titleRight: title?.getBoundingClientRect().right ?? 999,
        viewportWidth: window.innerWidth,
      };
    });
    expect(box.overflow).toBeLessThanOrEqual(1);
    expect(box.titleRight).toBeLessThanOrEqual(box.viewportWidth + 1);
  });

  test("the review style modal fits or scrolls inside the viewport", async ({ page }) => {
    await page.addInitScript((key) => {
      localStorage.setItem(
        key,
        JSON.stringify({
          version: 2,
          activeLanguageId: "de",
          hasCompletedOnboarding: true,
          seenIntroLanguages: ["de"],
          completedLessons: [1],
          currentLessonId: 1,
          lessonStars: { "1": "gold" },
          wordMastery: { wasser: "encountered" },
          srsCards: {
            wasser: {
              word_id: "wasser",
              interval: 1,
              repetitions: 1,
              ease_factor: 2.5,
              due_date: "2020-01-01",
              lapses: 0,
              last_reviewed: "2019-12-31",
            },
          },
        })
      );
    }, STORAGE_KEY);
    await page.goto("/review");
    await waitForApp(page);
    await page.locator("button", { hasText: "change style" }).first().click({ force: true });
    const modal = page.locator('[role="dialog"][aria-labelledby="review-style-title"]');
    await expect(modal).toBeVisible();
    const metrics = await modal.evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return {
        top: rect.top,
        bottom: rect.bottom,
        viewportHeight: window.innerHeight,
        overflowY: getComputedStyle(el).overflowY,
        scrollable: el.scrollHeight > el.clientHeight,
      };
    });
    expect(metrics.top).toBeGreaterThanOrEqual(0);
    expect(metrics.bottom).toBeLessThanOrEqual(metrics.viewportHeight + 1);
    expect(metrics.scrollable || metrics.overflowY === "auto" || metrics.overflowY === "scroll").toBe(
      true
    );
  });
});

test.describe("small phones", () => {
  test.use({ viewport: { width: 320, height: 568 } });

  test("no page overflows horizontally and the six-tab dock fits", async ({ page }) => {
    for (const route of ["/", "/atlas", "/panorama", "/review", "/settings", "/about"]) {
      await page.goto(route);
      await waitForApp(page);
      const widths = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        innerWidth: window.innerWidth,
      }));
      expect(widths.scrollWidth, `${route} must not scroll horizontally`).toBeLessThanOrEqual(
        widths.innerWidth
      );
    }
  });
});
