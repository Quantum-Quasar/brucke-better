import { describe, it, expect } from "vitest";
import { spokenWordEntity, wordWithArticle } from "@/lib/gender";
import { buildWordEntityMaps } from "@/lib/word-entities-core";
import { frenchCompendium } from "@/data/french/compendium-fr";
import germanCompendium from "@/data/compendium.json";
import type { CompendiumData } from "@/lib/types";

describe("Synthetic article card display & audio", () => {
  it("speaks the full noun phrase for German article cards (e.g. der Tisch, not der)", () => {
    const maps = buildWordEntityMaps("de", germanCompendium as unknown as CompendiumData, []);
    const tischArticle = maps.articles.find((a) => a.id === "article_tisch");
    expect(tischArticle).toBeDefined();
    expect(tischArticle!.target_word).toBe("der");
    expect(spokenWordEntity(tischArticle!, "de")).toBe("der Tisch");

    for (const card of maps.articles) {
      const spoken = spokenWordEntity(card, "de");
      expect(spoken).not.toMatch(/^(der|die|das)\s+\1$/i);
      expect(spoken.length).toBeGreaterThan(0);
    }
  });

  it("speaks elided French noun phrases cleanly (e.g. l'heure, never la l')", () => {
    const maps = buildWordEntityMaps("fr", frenchCompendium, []);
    const elided = maps.articles.filter((a) => a.target_word === "l'");
    expect(elided.length).toBeGreaterThan(0);
    for (const card of elided) {
      const spoken = spokenWordEntity(card, "fr");
      expect(spoken.startsWith("l'")).toBe(true);
      expect(spoken.length).toBeGreaterThan(2);
      expect(spoken).not.toMatch(/^(le|la)\s+l'/i);
    }
  });

  it("omits das before bare German country and continent names while keeping das Land and die Schweiz", () => {
    expect(wordWithArticle("das", "Österreich", "de")).toBe("Österreich");
    expect(wordWithArticle("das", "Polen", "de")).toBe("Polen");
    expect(wordWithArticle("das", "Frankreich", "de")).toBe("Frankreich");
    expect(wordWithArticle("das", "Deutschland", "de")).toBe("Deutschland");
    expect(wordWithArticle("das", "Land", "de")).toBe("das Land");
    expect(wordWithArticle("die", "Schweiz", "de")).toBe("die Schweiz");
  });
});
