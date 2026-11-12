import { expect, type Locator, type Page } from "@playwright/test";

export const STORAGE_KEY = "brucke_app_state_v1";

export async function seedReturningLearner(page: Page, patch: Record<string, unknown> = {}) {
  await page.addInitScript(([key, value]) => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, value);
  }, [STORAGE_KEY, JSON.stringify({
    hasCompletedOnboarding: true,
    settings: { showKeyTips: false, posturePrimerSeen: true, showCharBar: "off" },
    ...patch,
  })]);
}

// Observation only: focus is moved exclusively by the browser's Tab key.
export async function tabTo(page: Page, target: Locator, maxTabs = 160) {
  await expect(target).toBeVisible();
  await expect(target).toBeEnabled();
  for (let index = 0; index <= maxTabs; index++) {
    if (await target.evaluate((element) => element === document.activeElement)) {
      await expect(target).toBeFocused();
      return;
    }
    if (index < maxTabs) await page.keyboard.press("Tab");
  }
  throw new Error(`Control not reachable with ${maxTabs} Tab presses: ${await target.ariaSnapshot()}`);
}

export async function activateWithKeyboard(page: Page, target: Locator) {
  await tabTo(page, target);
  await page.keyboard.press("Enter");
}

export async function readLearningProgress(page: Page) {
  await page.evaluate(() => window.dispatchEvent(new Event("pagehide")));
  return page.evaluate((key) => {
    const state = JSON.parse(localStorage.getItem(key) ?? "{}");
    return state.progressByLanguage?.[state.activeLanguageId] ?? state;
  }, STORAGE_KEY);
}
