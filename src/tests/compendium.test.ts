import { describe, it, expect } from "vitest";
import { compendium as data } from "../data/compendium";
import { getWordEntity } from "./word-entity-fixtures";
import { TOTAL_COMPENDIUM_WORDS } from "../lib/types";
import fs from "node:fs";
import { analyzeCompendium, parseCompendium, renderDigest } from "../../scripts/parse-compendium";

describe("Compendium parser rejects data loss", () => {
  const source = fs.readFileSync(new URL("../../word_connections.md", import.meta.url), "utf8");

  it.each([
    ["missing section", "## 3. Complete", "## Missing. Complete", /missing section|out of order/],
    ["short row", "| body |", "|", /expected 9 columns/],
    ["extra cell", "| body |", "| body | extra |", /expected 9 columns/],
    ["unknown shift", "`th_to_d`", "`not_a_shift`", /unknown or duplicate shift/],
    ["invalid translation", 'Mein Arm tut weh. *("My arm hurts.")*', "Mein Arm tut weh.", /expected phrase/],
    ["duplicate word", "**Hand**", "**Arm**", /duplicate id: arm/],
    ["invalid day", "| Day 1 |", "| Day nope |", /invalid row number/],
    ["missing shift field", "- **Phonetic Rule:** English \"th\"", "- **Missing Rule:** English \"th\"", /malformed shift definition/],
  ])("rejects %s with source diagnostics", (_name, from, to, error) => {
    expect(() => parseCompendium(source.replace(from, to))).toThrow(
      new RegExp(`word_connections\\.md:\\d+: .*${error.source}`)
    );
  });

  it("uses edited shift prose from the source while preserving IDs and word membership", () => {
    const parsed = parseCompendium(source.replace(
      '- **Phonetic Rule:** English "th" (/θ/ or /ð/) ➔ German "d" ([d])',
      "- **Phonetic Rule:** A revised dental rule",
    ));
    expect(parsed.shifts.th_to_d.phonetic_rule).toBe("A revised dental rule");
    expect(parsed.shifts.th_to_d.word_ids).toContain("denken");
    expect(parsed.words.arm.context_translation).toBe("My arm hurts.");
  });
});

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

describe("Compendium ids and table invariants", () => {
  const source = fs.readFileSync(new URL("../../word_connections.md", import.meta.url), "utf8");
  const inventoryCount = Number(source.match(/## 2\..*?\(All (\d+) Words\)/)![1]);

  function withWordRow(cell: string, gender = "-"): string {
    const row = `| ${inventoryCount + 1} | **${cell}** | test | ${gender} | /tɛst/ | \`Direct Cognate\` | Test. *("Test.")* | test | food |`;
    return source
      .replace("\n\n---\n\n## 3.", `\n${row}\n\n---\n\n## 3.`)
      .replace(/(## 2\..*?\(All )\d+( Words\))/, `$1${inventoryCount + 1}$2`);
  }

  it("parses the shipped source with no issues at all", () => {
    const { compendium, issues } = analyzeCompendium(source);
    expect(issues).toEqual([]);
    expect(compendium).not.toBeNull();
  });

  it("reports the slug under which the digest is generated, and keeps it in sync", () => {
    const { compendium } = analyzeCompendium(source);
    const digest = fs.readFileSync(new URL("../../src/data/compendium-digest.md", import.meta.url), "utf8");
    expect(digest).toBe(renderDigest(compendium!));
  });

  it("refuses a second sense of an existing headword until the row is tagged", () => {
    expect(() => parseCompendium(withWordRow("Essen"))).toThrow(
      /duplicate id: essen .*needs its own sense tag \(#noun, #verb, #adj, #adv\)/
    );
    expect(() => parseCompendium(withWordRow("Essen#nounish"))).toThrow(/unknown id suffix/);
  });

  it("gives a tagged second sense its own id and keeps the bare display headword", () => {
    const { compendium } = analyzeCompendium(withWordRow("Essen#noun", "das (n)"));
    expect(compendium!.words["essen"]!.target_word).toBe("essen");
    expect(compendium!.words["essen#noun"]).toMatchObject({ id: "essen#noun", target_word: "Essen", gender: "das" });
  });

  it("rejects a sense tag that is not needed", () => {
    expect(() => parseCompendium(withWordRow("Testwort#noun"))).toThrow(/unnecessary id suffix/);
  });

  it("rejects a domain outside the Review Hub vocabulary", () => {
    const row = `| ${inventoryCount + 1} | **Testwort** | test | - | /tɛst/ | \`Direct Cognate\` | Test. *("Test.")* | test | fodd |`;
    const broken = source
      .replace("\n\n---\n\n## 3.", `\n${row}\n\n---\n\n## 3.`)
      .replace(/(## 2\..*?\(All )\d+( Words\))/, `$1${inventoryCount + 1}$2`);
    expect(() => parseCompendium(broken)).toThrow(/unknown domain: fodd/);
  });

  it("reports every bad row in one run, with line numbers", () => {
    const broken = withWordRow("Essen").replace(
      /^\| 103 \| \*\*essen\*\*.*$/m,
      '| 103 | **essen** | to eat | - | /t/ | `t_to_s_ss_z` | X *("X")* | x | fodd |'
    );
    const { issues } = analyzeCompendium(broken);
    const domains = issues.filter((issue) => issue.message.includes("unknown domain"));
    expect(domains).toHaveLength(1);
    expect(issues.length).toBeGreaterThan(1);
    for (const issue of issues) expect(issue.line).toBeGreaterThan(0);
  });
});
