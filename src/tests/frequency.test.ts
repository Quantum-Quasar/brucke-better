import { describe, expect, it } from "vitest";
import ranks from "@/data/frequency-ranks.json";
import { compendium } from "@/data/compendium";
import { buildWordEntityMaps } from "@/lib/word-entities-core";
import { compareFrequencyRanks, compoundFrequencyForm, frequencyLabel, frequencyRankFor, orderVocabularySuggestions } from "@/lib/frequency";
import { appFrequencyForms, compactFrequencyRanks, parseFrequencySource } from "../../scripts/lib/frequency-source";
import { withFrequencyMetadata } from "../../scripts/lib/frequency-payload";

// Independently observed rows in the pinned OpenSubtitles 2018 source lists.
describe("real corpus vocabulary ranks", () => {
  it.each([
    ["de", "Wasser", 491],
    ["de", "trinken", 585],
    ["fr", "eau", 398],
    ["es", "agua", 358],
    ["nl", "water", 415],
  ] as const)("retains %s %s's original corpus position", (language, form, rank) => {
    expect(frequencyRankFor(form, ranks[language])).toBe(rank);
  });

  it("keeps known missing forms explicit and does not borrow an inflection's rank", () => {
    expect(ranks.de.birke).toBeNull();
    expect(frequencyRankFor("Birke", ranks.de)).toBeNull();
    expect(frequencyRankFor("getrunken", { trinken: 585 })).toBeNull();
    expect(frequencyRankFor("Wasser trinken", ranks.de)).toBeNull();
    expect(frequencyRankFor("new-author-form", ranks.de)).toBeNull();
  });

  it("matches case and Unicode composition, but not invented lemma transformations", () => {
    expect(frequencyRankFor("  ÉTÉ ", { "été": 1 })).toBe(1);
    expect(frequencyRankFor("e\u0301te\u0301", { "été": 1 })).toBe(1);
    expect(frequencyRankFor("ete", { "été": 1 })).toBeNull();
    expect(frequencyRankFor("häuser", { haus: 255 })).toBeNull();
  });

  it("ships only the current app surface vocabulary, including explicit nulls", () => {
    const forms = appFrequencyForms(compendium);
    expect(Object.keys(ranks.de).sort()).toEqual(forms);
    expect(forms.length).toBeLessThan(5_000);
    expect(Object.values(ranks.de).every((rank) => rank === null || (Number.isInteger(rank) && rank > 0 && rank <= 50_000))).toBe(true);
  });
});

describe("corpus conversion", () => {
  it("preserves row positions and tied counts rather than re-ranking a selected subset", () => {
    const source = parseFrequencySource("ich 5890279\nsie 3806767\ndas 3122198\nform-a 10\nform-b 10\n");
    expect(compactFrequencyRanks(["das", "form-b", "missing"], source)).toEqual({ das: 3, "form-b": 5, missing: null });
  });

  it.each(["word\n", "word 0\n", "word nope\n", "first 1\nsecond 2\n"])("rejects malformed or unsorted source %j", (text) => {
    expect(() => parseFrequencySource(text)).toThrow();
  });

  it("handles noun display articles without treating inflected words as lemmas", () => {
    expect(compoundFrequencyForm("het woordenboek")).toBe("woordenboek");
    expect(compoundFrequencyForm("der Handschuh")).toBe("Handschuh");
    expect(compoundFrequencyForm("Handschuhe")).toBe("Handschuhe");
  });
});

describe("frequency consumers", () => {
  it("attaches real ranks to lexical entities without giving sentence or article cards fabricated ranks", () => {
    const enriched = withFrequencyMetadata(compendium, ranks.de);
    const maps = buildWordEntityMaps("de", enriched, [{
      id: 5,
      title: "Drinking water",
      word_ids: ["wasser", "trinken"],
      summary: { use_example: { german: "Ich trinke Wasser.", english: "I drink water." } },
    }]);
    expect(enriched.words.wasser.frequencyRank).toBe(491);
    expect(maps.entities.wasser.frequencyRank).toBe(491);
    expect(maps.entities.trinken.frequencyRank).toBe(585);
    expect(maps.entities.sentence_5.frequencyRank).toBeNull();
    expect(maps.entities.article_wasser.frequencyRank).toBeNull();
    expect(compendium.words.wasser.frequencyRank).toBeUndefined();
  });

  it("uses the actual compound/trap surface form, not its English meaning or identifier", () => {
    const maps = buildWordEntityMaps("de", {
      words: {},
      compounds: [{ ...compendium.compounds[0], id: "not-the-form", compound: "das Wasser" }],
      falseFriends: [{ ...compendium.falseFriends[0], id: "different-id", german_word: "Wasser" }],
      frequencyRanks: ranks.de,
    }, []);
    expect(maps.entities["compound_not-the-form"].target_word).toBe("Wasser");
    expect(maps.entities["compound_not-the-form"].frequencyRank).toBe(491);
    expect(maps.entities["trap_different-id"].frequencyRank).toBe(491);
    expect(buildWordEntityMaps("de", { words: { wasser: compendium.words.wasser }, compounds: [], falseFriends: [] }, []).entities.wasser.frequencyRank).toBeNull();
  });

  it("provides stable, non-mutating author suggestions with unknown forms last", () => {
    const candidates = [{ target_word: "unknown-a" }, { target_word: "trinken" }, { target_word: "Wasser" }, { target_word: "unknown-b" }];
    const ordered = orderVocabularySuggestions(candidates, ranks.de);
    expect(ordered.map((word) => word.target_word)).toEqual(["Wasser", "trinken", "unknown-a", "unknown-b"]);
    expect(ordered.map((word) => word.frequencyRank)).toEqual([491, 585, null, null]);
    expect(candidates[0].target_word).toBe("unknown-a");
    expect(candidates[0]).not.toHaveProperty("frequencyRank");
  });

  it("only breaks a due-date tie and keeps unranked ties stable", () => {
    const cards = [
      { id: "earlier", due: 1, frequencyRank: 20_000 },
      { id: "less-common", due: 2, frequencyRank: 5_000 },
      { id: "common", due: 2, frequencyRank: 491 },
    ];
    cards.sort((a, b) => a.due - b.due || compareFrequencyRanks(a, b));
    expect(cards.map((card) => card.id)).toEqual(["earlier", "common", "less-common"]);
    expect(compareFrequencyRanks({ frequencyRank: null }, {})).toBe(0);
    expect(compareFrequencyRanks({}, { frequencyRank: 491 })).toBeGreaterThan(0);
  });

  it("does not label every ranked or missing form common", () => {
    expect(frequencyLabel(1_000)).toBe("Top 1,000 subtitle forms");
    expect(frequencyLabel(1_001)).toBe("Top 5,000 subtitle forms");
    expect(frequencyLabel(10_001)).toBe("Outside the top 10,000 subtitle forms");
    expect(frequencyLabel(null)).toBe("Unranked subtitle form");
  });
});
