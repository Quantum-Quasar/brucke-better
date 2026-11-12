import { expect, test, type Locator, type Page } from "@playwright/test";
import type { CompendiumData } from "../../src/lib/types";

const STORAGE_KEY = "brucke_app_state_v1";

async function seed(page: Page, language = "de", progress: Record<string, unknown> = {}) {
  await page.addInitScript(([key, value]) => {
    if (!localStorage.getItem(key)) localStorage.setItem(key, value);
  }, [STORAGE_KEY, JSON.stringify({
    activeLanguageId: language, hasCompletedOnboarding: true, seenIntroLanguages: [language],
    settings: { posturePrimerSeen: true, voiceGuidanceDismissed: ["de", "fr", "es", "nl"] }, ...progress,
  })]);
}

async function keyboardActivate(page: Page, target: Locator) {
  await expect(target).toBeAttached();
  await expect(target).toBeEnabled();
  const maxTabs = await page.locator("a[href], button, input, select, textarea, summary, [tabindex]").count() + 1;
  for (let index = 0; index < maxTabs; index++) {
    await page.keyboard.press("Tab");
    if (await target.evaluate((element) => element === document.activeElement)) break;
  }
  await expect(target).toBeFocused();
  await expect(target).toBeVisible();
  const focus = await target.evaluate((element) => {
    const style = getComputedStyle(element);
    return { visible: element.matches(":focus-visible"), outline: style.outlineStyle, shadow: style.boxShadow };
  });
  expect(focus.visible).toBe(true);
  expect(focus.outline !== "none" || focus.shadow !== "none").toBe(true);
  await page.keyboard.press("Enter");
}

async function closeDialog(page: Page, dialog: Locator, trigger: Locator) {
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
}

for (const [language, languageName] of [["de", "German"], ["fr", "French"], ["es", "Spanish"], ["nl", "Dutch"]]) {
  test(`${languageName} constellations all expose a complete vocabulary table and the shared drill`, async ({ page }) => {
    await seed(page, language);
    const response = await page.request.get(`/data/${language}/compendium.json`);
    expect(response.ok()).toBe(true);
    const data = await response.json() as CompendiumData;
    const assigned = new Set(Object.values(data.shifts).flatMap((family) => family.word_ids));
    const families = [
      ...Object.values(data.shifts),
      { id: "unshifted", word_ids: Object.keys(data.words).filter((id) => !assigned.has(id)) },
    ];
    for (const family of families) {
      await page.goto(`/atlas?family=${family.id}&lang=${language}`);
      const dialog = page.getByRole("dialog", { name: "Atlas family", exact: true });
      await keyboardActivate(page, dialog.getByRole("button", { name: "Table view", exact: true }));
      const table = dialog.getByRole("table");
      for (const heading of ["English", languageName, "Shift", "Example sentence"]) {
        await expect(table.getByRole("columnheader", { name: heading, exact: true })).toBeVisible();
      }
      const words = family.word_ids.map((id) => data.words[id]).filter(Boolean);
      await expect(table.getByRole("row")).toHaveCount(Math.min(60, words.length) + 1);
      if (words.length) {
        const word = words[0];
        const row = table.getByRole("row").nth(1);
        await expect(row).toContainText(word.english_meaning);
        await expect(row).toContainText(word.target_word);
        await expect(row).toContainText(word.shift_rule);
        await expect(row).toContainText(word.context_phrase);
        await expect(row).toContainText(word.context_translation);
        const last = words[words.length - 1];
        await dialog.getByRole("textbox", { name: "Filter constellation vocabulary" }).fill(last.target_word);
        await expect(table.getByRole("button", { name: last.target_word, exact: true }).first()).toBeVisible();
        const practice = dialog.getByRole("button", { name: /practice this branch/ });
        await keyboardActivate(page, practice);
        const drill = page.getByRole("dialog", { name: /^Branch Practice:/ });
        await expect(drill).toBeVisible();
        await expect(page.getByText(`question 1 of ${Math.min(5, words.length)}`, { exact: true })).toBeVisible();
        await closeDialog(page, drill, practice);
      }
      await keyboardActivate(page, dialog.getByRole("button", { name: "Visual view", exact: true }));
      await expect(dialog.getByRole("button", { name: /practice this branch/ })).toBeVisible();
    }
  });
}

test("trail nodes and gates remain keyboard operable, and optional completions cannot bypass topic 4", async ({ page }) => {
  await seed(page, "de", { completedLessons: [1, 2, 3, 501] });
  await page.goto("/");
  const nodes = page.locator("button[data-trail-node-id]");
  await expect(nodes.first()).toBeAttached();
  const semantics = await nodes.evaluateAll((elements) => elements.every((element) =>
    element instanceof HTMLButtonElement && !element.disabled && element.tabIndex === 0 && Boolean(element.getAttribute("aria-label"))));
  expect(semantics).toBe(true);
  await expect(page.locator('[data-trail-node-id="5"]')).toHaveAttribute("aria-label", /locked/);
  await expect(page.locator('[data-trail-node-id="4"]')).toHaveAttribute("aria-label", /available to play/);
  for (const id of [1, 101, 5071, 9001, 9005]) {
    const node = page.locator(`[data-trail-node-id="${id}"]`);
    await keyboardActivate(page, node);
    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible();
    await closeDialog(page, drawer, node);
  }
  const gate = page.getByRole("button", { name: /The Shift Gate star gate:/ });
  await keyboardActivate(page, gate);
  const gateDrawer = page.getByRole("dialog");
  await expect(gateDrawer).toBeVisible();
  await closeDialog(page, gateDrawer, gate);
  await page.goto("/?lesson=5&lang=de");
  await expect(page.getByText(/Preview only: finishing it here won’t mark it complete/)).toBeVisible();
});

test("reduced motion stops trail and badge animation without hiding layout, and atlas nodes show keyboard focus", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await seed(page);
  await page.goto("/");
  const node = page.locator('[data-trail-node-id="1"]');
  await expect(node).toBeAttached();
  expect(await node.evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
  const selector = page.locator(".trail-selector");
  await expect(selector).toHaveCount(1);
  expect(await selector.evaluate((element) => getComputedStyle(element).animationName)).toBe("none");
  expect(await node.boundingBox()).not.toBeNull();

  await page.goto("/atlas?family=th_to_d&lang=de");
  const family = page.getByRole("dialog", { name: "Atlas family", exact: true });
  const tableView = family.getByRole("button", { name: "Table view", exact: true });
  const visualView = family.getByRole("button", { name: "Visual view", exact: true });
  await expect(visualView).toHaveAttribute("aria-pressed", "true");
  await keyboardActivate(page, tableView);
  await expect(tableView).toHaveAttribute("aria-pressed", "true");
  await expect(visualView).toHaveAttribute("aria-pressed", "false");
  const table = family.getByRole("table");
  await expect(table).toBeVisible();
  const badges = table.getByRole("img", { name: /grammatical gender$/ });
  await expect(badges.first()).toBeVisible();
  expect(await badges.first().innerText()).toMatch(/^(der|die|das)$/i);
  for (const animation of await badges.locator('[aria-hidden="true"]').evaluateAll((elements) => elements.map((element) => getComputedStyle(element).animationName))) expect(animation).toBe("none");
  await keyboardActivate(page, visualView);
  await expect(visualView).toHaveAttribute("aria-pressed", "true");
  await expect(tableView).toHaveAttribute("aria-pressed", "false");
  const webNode = family.locator("button.absolute").first();
  await keyboardActivate(page, webNode);
  const wordDrawer = page.locator('[role="dialog"][aria-labelledby="word-drawer-title"]');
  await expect(wordDrawer).toBeVisible();
  await closeDialog(page, wordDrawer, webNode);

  await page.goto("/atlas?master=1&lang=de");
  const graphNodes = page.locator(".atlas-graph-node");
  await expect(graphNodes.first()).toBeAttached();
  expect(await graphNodes.evaluateAll((elements) => elements.every((element) => element.getAttribute("tabindex") === "0" && element.getAttribute("role") === "button"))).toBe(true);
  await keyboardActivate(page, graphNodes.first());
  await expect(wordDrawer).toBeVisible();
  await closeDialog(page, wordDrawer, graphNodes.first());
  await page.getByRole("button", { name: "Table view", exact: true }).click();
  await expect(page.getByRole("table")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Phrases, compounds, false friends and expressions" })).toBeVisible();
});
