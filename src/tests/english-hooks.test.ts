import { describe, it, expect } from "vitest";
import { compendium } from "@/data/compendium";
import { LANGUAGES } from "@/data/languages";
import { getLanguageContent } from "@/data/language-content";
import hookWordData from "@/data/english-hook-words.json";
import {
  ENGLISH_HOOK_WORD_LIMIT,
  isModernHookWord,
  parseTwinAnnotations,
  twinHookProblems,
} from "@/lib/english-hooks";

/** Deep-walk any authored structure collecting every string, annotations included. */
function collectStrings(node: unknown, out: string[] = []): string[] {
  if (typeof node === "string") out.push(node);
  else if (Array.isArray(node)) node.forEach((child) => collectStrings(child, out));
  else if (node && typeof node === "object") Object.values(node).forEach((value) => collectStrings(value, out));
  return out;
}

describe("the shipped English hook-word list", () => {
  it("is the pinned, sorted, plain-word list the generator claims", () => {
    const words = hookWordData.words;
    expect(hookWordData.limit).toBe(ENGLISH_HOOK_WORD_LIMIT);
    expect(hookWordData.checksum).toMatch(/^[0-9a-f]{64}$/);
    expect(new Set(words).size).toBe(words.length);
    expect(words.length).toBeGreaterThan(ENGLISH_HOOK_WORD_LIMIT * 0.9);
    expect(words.every((word) => /^[a-z][a-z'-]*$/.test(word))).toBe(true);
    expect([...words].sort()).toEqual(words);
  });

  it("answers membership for known and archaic twins", () => {
    expect(isModernHookWord("the")).toBe(true);
    expect(isModernHookWord("Hound")).toBe(false);
    expect(isModernHookWord("hight")).toBe(false);
    expect(isModernHookWord("welkin")).toBe(false);
  });
});

describe("twin annotations", () => {
  it("finds only the parenthesized hook form, not prose about a twin", () => {
    expect(parseTwinAnnotations("back (twin: ridge)")).toEqual([{ twins: ["ridge"], qualifier: null }]);
    expect(parseTwinAnnotations("cloud (archaic twin: welkin)")).toEqual([{ twins: ["welkin"], qualifier: "archaic" }]);
    expect(parseTwinAnnotations("to read (archaic twin: lease, gather)")).toEqual([
      { twins: ["lease", "gather"], qualifier: "archaic" },
    ]);
    expect(parseTwinAnnotations("Proto-Germanic *hrugjaz — the twin of English ridge.")).toEqual([]);
    expect(parseTwinAnnotations("Match each English word with its French twin:")).toEqual([]);
  });

  it("flags twins the learner does not already own", () => {
    expect(twinHookProblems("back (twin: ridge)")).toHaveLength(1);
    expect(twinHookProblems("cloud (archaic twin: welkin)")).toHaveLength(1);
    expect(twinHookProblems("to read (archaic twin: lease, gather)")).toHaveLength(2);
    expect(twinHookProblems("bone (twin: bone)")).toEqual([]);
    expect(twinHookProblems("hour (twin: time)")).toEqual([]);
  });
});

describe("no shipped hook names an English twin the learner does not own", () => {
  it("keeps every compendium cognate column hook-safe", () => {
    const offenders: string[] = [];
    for (const language of LANGUAGES) {
      const data = getLanguageContent(language.id).compendium;
      if (!data) continue;
      for (const word of data.wordList) {
        for (const problem of twinHookProblems(word.english_cognate)) {
          offenders.push(`${language.id}/${word.id}: ${problem}`);
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  it("keeps every authored lesson string hook-safe", () => {
    const offenders: string[] = [];
    for (const language of LANGUAGES) {
      for (const lesson of getLanguageContent(language.id).lessons) {
        for (const text of collectStrings(lesson)) {
          for (const problem of twinHookProblems(text)) {
            offenders.push(`${language.id}/${lesson.id}: ${problem} in ${JSON.stringify(text.slice(0, 90))}`);
          }
        }
      }
    }
    expect(offenders).toEqual([]);
  });

  it("holds the German compendium to the same rule the parser enforces", () => {
    const offenders = Object.values(compendium.words)
      .flatMap((word) => twinHookProblems(word.english_cognate).map((problem) => `${word.id}: ${problem}`));
    expect(offenders).toEqual([]);
  });
});
