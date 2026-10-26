import { describe, it, expect } from "vitest";
import { compendium as data } from "../data/compendium";
import { getWordEntity } from "../lib/word-entities";
import { TOTAL_COMPENDIUM_WORDS } from "../lib/types";

describe("Brücke Compendium Data Integrity", () => {
  it("keeps word count at or above the UI total and internally consistent", () => {
    // TOTAL_COMPENDIUM_WORDS (the UI's "x / N mastered") is synced to the final
    // compendium size at the end of a content run; the map and list must always agree.
    expect(data.wordList.length).toBeGreaterThanOrEqual(TOTAL_COMPENDIUM_WORDS);
    expect(Object.keys(data.words).length).toBe(data.wordList.length);
  });

  it("contains all 9 sound shift families", () => {
    const shiftIds = Object.keys(data.shifts);
    expect(shiftIds.length).toBe(9);
    expect(shiftIds).toContain("th_to_d");
    expect(shiftIds).toContain("d_to_t");
    expect(shiftIds).toContain("p_to_pf_f");
    expect(shiftIds).toContain("t_to_s_ss_z");
    expect(shiftIds).toContain("k_to_ch");
    expect(shiftIds).toContain("v_to_b");
    expect(shiftIds).toContain("y_gh_to_g_ch");
    expect(shiftIds).toContain("latin_ieren");
    expect(shiftIds).toContain("strong_verbs_ablaut");
  });

  it("contains all 32 compound calques", () => {
    expect(data.compounds.length).toBe(32);
    const names = data.compounds.map((c) => c.compound);
    expect(names.some((n) => n.includes("Kühlschrank"))).toBe(true);
    expect(names.some((n) => n.includes("Kummerspeck"))).toBe(true);
    expect(names.some((n) => n.includes("Handschuh"))).toBe(true);
    expect(names.some((n) => n.includes("Fernseher"))).toBe(true);
  });

  it("contains all 16 false friend traps", () => {
    expect(data.falseFriends.length).toBe(16);
    const words = data.falseFriends.map((f) => f.german_word);
    expect(words.some((w) => w.includes("das Gift"))).toBe(true);
    expect(words.some((w) => w.includes("bekommen"))).toBe(true);
    expect(words.some((w) => w.includes("der Chef"))).toBe(true);
  });

  it("contains all 28 daily cultural insights", () => {
    expect(data.dailyInsights.length).toBe(28);
    expect(data.dailyInsights[0].german_expression).toBe("der Kindergarten");
    expect(data.dailyInsights[1].german_expression).toBe("denken");
  });

  it("validates that all words have valid IPA, English cognates, and context phrases", () => {
    for (const word of data.wordList) {
      expect(word.target_word).toBeTruthy();
      expect(word.english_cognate).toBeTruthy();
      expect(word.ipa).toMatch(/^\/.*\/$/);
      expect(word.context_phrase).toBeTruthy();
      expect(word.etymology_derivation).toBeTruthy();
    }
  });

  it("keeps compound and false-friend entities on the shared word detail path", () => {
    const compound = data.compounds[0];
    const falseFriend = data.falseFriends[0];

    expect(getWordEntity(`compound_${compound.id}`)?.target_word).toBeTruthy();
    expect(getWordEntity(`trap_${falseFriend.id}`)?.target_word).toBe(falseFriend.german_word);
  });

  it("validates that every sound shift family references existing words", () => {
    for (const shift of Object.values(data.shifts)) {
      expect(shift.word_ids.length).toBeGreaterThan(0);
      for (const wid of shift.word_ids) {
        expect(data.words[wid]).toBeDefined();
      }
    }
  });
});
