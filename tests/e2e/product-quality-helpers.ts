import { expect, type Locator, type Page } from "@playwright/test";

export const STORAGE_KEY = "brucke_app_state_v1";

export async function seedReturningLearner(page: Page, patch: Record<string, unknown> = {}) {
  await page.addInitScript(([key, value]) => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, value);
  }, [STORAGE_KEY, JSON.stringify({
    hasCompletedOnboarding: true,
    settings: { showKeyTips: false, posturePrimerSeen: true, showCharBar: "off", voiceGuidanceDismissed: ["de", "fr", "es", "nl"] },
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

export const COLLISION_KEYS = ["1", "2", "3", "4", "Backspace", "r", "R", "a", "A"] as const;

export async function expectModalKeysIsolated(
  page: Page,
  open: () => Promise<void>,
  dialog: Locator,
  close: Locator,
  assertUnderlyingUnchanged: () => Promise<void>,
) {
  await open();
  await tabTo(page, close);
  for (const key of COLLISION_KEYS) {
    await page.keyboard.press(key);
    await expect(dialog).toBeVisible();
    await expect(close).toBeFocused();
    await assertUnderlyingUnchanged();
  }
  // These keys legitimately activate Close (or dismiss the dialog). They must
  // not also reach the lesson/review listener after the modal handles them.
  for (const key of ["Space", "Enter", "Escape"]) {
    if (await dialog.isHidden()) await open();
    await tabTo(page, close);
    await page.keyboard.press(key);
    await expect(dialog).toBeHidden();
    await assertUnderlyingUnchanged();
  }
}

export async function readLearningProgress(page: Page) {
  await page.evaluate(() => window.dispatchEvent(new Event("pagehide")));
  return page.evaluate((key) => {
    const state = JSON.parse(localStorage.getItem(key) ?? "{}");
    return state.progressByLanguage?.[state.activeLanguageId] ?? state;
  }, STORAGE_KEY);
}
