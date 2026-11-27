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

for (const [language, languageName, familyId] of [
  ["de", "German", "unshifted"],
  ["fr", "French", "ion"],
  ["es", "Spanish", "cion"],
  ["nl", "Dutch", "sch_sh"],
]) {
  test(`${languageName} atlas table, filter and branch drill work by keyboard`, async ({ page, request }) => {
    await seed(page, language);
    const response = await request.get(`/data/${language}/compendium.json`);
    expect(response.ok()).toBe(true);
    const data = await response.json() as CompendiumData;
    const assigned = new Set(Object.values(data.shifts).flatMap((family) => family.word_ids));
    const ids = familyId === "unshifted"
      ? Object.keys(data.words).filter((id) => !assigned.has(id))
      : data.shifts[familyId].word_ids;
    const words = ids.map((id) => data.words[id]).filter(Boolean);

    await page.goto(`/atlas?family=${familyId}&lang=${language}`);
    const dialog = page.getByRole("dialog", { name: "Atlas family", exact: true });
    await keyboardActivate(page, dialog.getByRole("button", { name: "Table view", exact: true }));
    const table = dialog.getByRole("table");
    for (const heading of ["English", languageName, "Shift", "Example sentence"]) {
      await expect(table.getByRole("columnheader", { name: heading, exact: true })).toBeVisible();
    }
    await expect(table.getByRole("row")).toHaveCount(Math.min(60, words.length) + 1);
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

    await keyboardActivate(page, dialog.getByRole("button", { name: "Visual view", exact: true }));
    await expect(dialog.getByRole("button", { name: /practice this branch/ })).toBeVisible();
  });
}

test("German map nodes are keyboard operable and a locked path is preview only", async ({ page }) => {
  await seed(page, "de", { completedLessons: [1, 2, 4] });
  await page.goto("/");
  const map = page.getByRole("region", { name: "The German Trail" });
  for (const [id, status] of [[1, "Completed"], [6, "Playable"], [7, "Locked"]]) {
    const node = map.getByRole("button", { name: new RegExp(`^Lesson ${id}:.*, ${status}$`) });
    await keyboardActivate(page, node);
    const drawer = page.getByRole("dialog");
    await expect(drawer).toBeVisible();
    await closeDialog(page, drawer, node);
  }
  await page.goto("/?lesson=7&lang=de");
  await expect(page.getByText(/Preview only: this practice won’t count/)).toBeVisible();
});

test("reduced motion stops trail and badge animation without hiding layout, and atlas nodes show keyboard focus", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await seed(page);
  await page.goto("/");
  const node = page.getByRole("button", { name: /^Lesson 1:.*, Playable$/ });
  await expect(node).toBeVisible();
  expect(await node.evaluate((element) => getComputedStyle(element).transitionProperty)).toBe("none");

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
