import { describe, it, expect } from "vitest";
import { getGenderInfo, wordWithArticle } from "@/lib/gender";
import { compendium as data } from "@/data/compendium";
import { LANGUAGES } from "@/data/languages";
import { getLanguageContent } from "@/data/language-content";
import { getWordEntityMap } from "./word-entity-fixtures";

describe("Article prefixing never doubles the article", () => {
  it("keeps no compendium word gendered as the word it already is", () => {
    // word_connections.md rows 41-43 gave das/die/der self-referential gender,
    // which shipped "der der — the / he" into TRAIL.md and spoke "der der".
    for (const { id: languageId } of LANGUAGES) {
      const compendium = getLanguageContent(languageId).compendium;
      if (!compendium) continue;
      for (const word of compendium.wordList) {
        if (!word.gender) continue;
        expect(word.target_word.toLowerCase(), `${languageId}/${word.id}`).not.toBe(word.gender.toLowerCase());
      }
    }
  });

  it("composes the printed/spoken form once, elided where the language elides", () => {
    expect(wordWithArticle("der", "Tisch", "de")).toBe("der Tisch");
    expect(wordWithArticle("der", "der", "de")).toBe("der");
    expect(wordWithArticle("die", "die", "de")).toBe("die");
    expect(wordWithArticle("le", "le", "fr")).toBe("le");
    expect(wordWithArticle("le", "ami", "fr")).toBe("l'ami");
    expect(wordWithArticle("la", "heure", "fr")).toBe("l'heure");
    expect(wordWithArticle(null, "haben", "de")).toBe("haben");
  });

  it("never yields a doubled article for any generated review card", () => {
    for (const { id: languageId } of LANGUAGES) {
      for (const word of Object.values(getWordEntityMap(languageId))) {
        const form = wordWithArticle(word.gender, word.target_word, languageId);
        expect(form, `${languageId}: ${word.id}`).not.toMatch(/^(der|die|das|le|la|el|de|het)\s+\1\b/i);
      }
    }
  });
});

describe("Grammatical Gender Engine & Color Coding", () => {
  it("maps der to masculine azure blue metadata", () => {
    const info = getGenderInfo("der");
    expect(info).toBeDefined();
    expect(info?.gender).toBe("der");
    expect(info?.label).toBe("Masculine");
    expect(info?.colorName).toBe("Azure Blue");
    expect(info?.badgeClass).toContain("blue");

    const el = getGenderInfo("el");
    expect(el?.label).toBe("Masculine");
    expect(el?.badgeClass).toContain("blue");
  });

  it("maps die to feminine vivid rose metadata", () => {
    const info = getGenderInfo("die");
    expect(info).toBeDefined();
    expect(info?.gender).toBe("die");
    expect(info?.label).toBe("Feminine");
    expect(info?.colorName).toBe("Vivid Rose");
    expect(info?.badgeClass).toContain("rose");

    const la = getGenderInfo("la");
    expect(la?.label).toBe("Feminine");
    expect(la?.badgeClass).toContain("rose");
  });

  it("maps das to neuter emerald green metadata", () => {
    const info = getGenderInfo("das");
    expect(info).toBeDefined();
    expect(info?.gender).toBe("das");
    expect(info?.label).toBe("Neuter");
    expect(info?.colorName).toBe("Emerald Green");
    expect(info?.badgeClass).toContain("emerald");
  });

  it("returns null for null, undefined, or invalid gender", () => {
    expect(getGenderInfo(null)).toBeNull();
    expect(getGenderInfo(undefined)).toBeNull();
    expect(getGenderInfo("")).toBeNull();
    expect(getGenderInfo("invalid")).toBeNull();
  });

  it("verifies Hand in compendium has feminine gender die", () => {
    const hand = data.words["hand"] || data.wordList.find((w) => w.target_word === "Hand");
    expect(hand).toBeDefined();
    expect(hand?.gender).toBe("die");

    const info = getGenderInfo(hand?.gender);
    expect(info?.label).toBe("Feminine");
    expect(info?.badgeClass).toContain("rose");
  });

  it("verifies Wasser in compendium has neuter gender das", () => {
    const wasser = data.words["wasser"] || data.wordList.find((w) => w.target_word === "Wasser");
    expect(wasser).toBeDefined();
    expect(wasser?.gender).toBe("das");

    const info = getGenderInfo(wasser?.gender);
    expect(info?.label).toBe("Neuter");
    expect(info?.badgeClass).toContain("emerald");
  });

  it("verifies Bruder in compendium has masculine gender der", () => {
    const bruder = data.words["bruder"] || data.wordList.find((w) => w.target_word === "Bruder");
    expect(bruder).toBeDefined();
    expect(bruder?.gender).toBe("der");

    const info = getGenderInfo(bruder?.gender);
    expect(info?.label).toBe("Masculine");
    expect(info?.badgeClass).toContain("blue");
  });
});
