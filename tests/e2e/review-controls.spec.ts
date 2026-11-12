import { expect, test } from "@playwright/test";
import { readLearningProgress, seedReturningLearner } from "./product-quality-helpers";
import type { CompendiumData, SRSCard } from "../../src/lib/types";

test("bounded article review keeps suspended and buried nouns identifiable after reload", async ({ page, request }) => {
  await seedReturningLearner(page, { preferredReviewMode: "mcq" });
  await page.goto("/review");
  const size = page.getByRole("group", { name: "Review session length" });
  await expect(size.getByRole("button", { name: "10", exact: true })).toHaveAttribute("aria-pressed", "true");
  await size.getByRole("button", { name: "5", exact: true }).click();
  await page.getByText("More practice options", { exact: true }).click();
  await page.getByRole("button", { name: "start article mcq", exact: true }).click();
  await expect(page.getByText("card 1 / 5", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Suspend", exact: true }).click();
  await expect(page.getByText("card 1 / 4", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Bury today", exact: true }).click();
  await expect(page.getByText("card 1 / 3", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: /exit.*esc/i }).click();

  const state = await readLearningProgress(page);
  const paused = (Object.values(state.srsCards) as SRSCard[]).filter((card) => card.suspended || card.buriedUntil);
  expect(paused).toHaveLength(2);
  expect(paused.every((card) => card.word_id.startsWith("article_"))).toBe(true);
  const data = await (await request.get("/data/de/compendium.json")).json() as CompendiumData;
  await page.reload();
  await page.getByText("Suspended & buried cards (2)", { exact: true }).click();
  const management = page.getByRole("region", { name: "Manage review cards" });
  for (const card of paused) {
    const noun = data.words[card.word_id.slice("article_".length)];
    const row = management.getByRole("listitem").filter({ hasText: `${noun.gender} ${noun.target_word} · article` });
    await expect(row).toBeVisible();
    await row.getByRole("button", { name: card.suspended ? "Unsuspend" : "Unbury now", exact: true }).click();
  }
  await expect(page.getByText("Suspended & buried cards (0)", { exact: true })).toBeVisible();
  expect((await readLearningProgress(page)).wordMastery).toEqual(state.wordMastery);
});
