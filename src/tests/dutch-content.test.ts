import { describe, it, expect } from "vitest";
import { getLanguageContent } from "../data/language-content";
import { dutchCompendium } from "../data/dutch/compendium-nl";
import { NL_LESSONS } from "../data/dutch/lessons-nl";
import { NL_TOPICS, NL_TRAIL_BRANCHES, NL_TRAIL_GATES } from "../data/dutch/curriculum-nl";
import { DUTCH_INSIGHTS } from "../data/dutch/insights-nl";
import { getWordEntityMap } from "./word-entity-fixtures";
import { displayArticle } from "../lib/gender";
import { evaluateAnswerAccuracy } from "../lib/letter-diff";
import type { Lesson } from "../lib/types";

// The Dutch course is authored as typed TS modules under src/data/dutch/
// (not parsed from word_connections.md), so its correctness guarantees live
// here: bundle wiring, id integrity, referential word ids, Dutch-only content
// hygiene, and the de/het article rule.

const nlContent = getLanguageContent("nl");

/** Deep-walk any authored structure collecting strings long enough to be prose. */
function collectLongStrings(node: unknown, out: string[] = []): string[] {
  if (typeof node === "string") {
    if (node.trim().length > 60) out.push(node);
  } else if (Array.isArray(node)) {
    node.forEach((n) => collectLongStrings(n, out));
  } else if (node && typeof node === "object") {
    Object.values(node).forEach((v) => collectLongStrings(v, out));
  }
  return out;
}

// German function words that have no business appearing in Dutch/English prose.
// "werden" is included because it is a German form; Dutch uses "worden".
const GERMAN_FUNCTION_WORDS = /\b(nicht|ich|wir|aber|auch|noch|schon|haben|werden|ist)\b/i;
const GERMAN_ONLY_CHARS = /[äöüßÄÖÜ]/;

describe("dutch course content", () => {
  it("wires the dutch bundle completely", () => {
    expect(nlContent.totalTopics).toBe(30);
    expect(nlContent.topics).toHaveLength(30);
    expect(NL_LESSONS).toHaveLength(75);
    expect(nlContent.lessons).toHaveLength(75);
    expect(nlContent.insights).toHaveLength(28);
    expect(nlContent.compendium).toBe(dutchCompendium);
    expect(nlContent.totalTopics).toBe(NL_TOPICS.length);

    for (const lesson of NL_LESSONS) {
      expect(lesson.exercises.length, `lesson ${lesson.id} needs five exercises`).toBe(5);
      expect(new Set(lesson.exercises.map((ex) => ex.type)).size).toBeGreaterThanOrEqual(3);
      expect(lesson.twist, `lesson ${lesson.id} must end with a Twist card`).toBeTruthy();

      for (const ex of lesson.exercises) {
        if (ex.type === "shift_select" || ex.type === "literal_gloss") {
          expect(ex.options, `${lesson.id}/${ex.id} must include target_answer`).toContain(ex.target_answer);
          expect(new Set(ex.options).size, `${lesson.id}/${ex.id} options must be unique`).toBe(
            ex.options?.length
          );
        }
        if (ex.type === "syntax_builder" || ex.type === "transcribe") {
          const targetWords = ex.target_answer
            .replace(/[?,.!]/g, "")
            .trim()
            .split(/\s+/);
          const bank = [...(ex.word_bank || [])];
          for (const w of targetWords) {
            const idx = bank.indexOf(w);
            expect(idx, `${lesson.id}/${ex.id} missing word "${w}" in bank`).toBeGreaterThanOrEqual(0);
            bank.splice(idx, 1);
          }
          expect(bank.length, `${lesson.id}/${ex.id} must have >= 1 distractor in bank`).toBeGreaterThanOrEqual(1);
        }
        if (ex.type === "dictation") {
          expect(ex.spoken, `${lesson.id}/${ex.id} needs spoken text`).toBeTruthy();
          expect(ex.replays, `${lesson.id}/${ex.id} needs replays`).toBeGreaterThan(0);
        }
      }

      if (lesson.twist?.word_bank && lesson.twist?.target_answer) {
        const targetWords = lesson.twist.target_answer
          .replace(/[?,.!]/g, "")
          .trim()
          .split(/\s+/);
        const bank = [...lesson.twist.word_bank];
        for (const w of targetWords) {
          const idx = bank.indexOf(w);
          expect(idx, `${lesson.id}/twist missing word "${w}" in bank`).toBeGreaterThanOrEqual(0);
          bank.splice(idx, 1);
        }
        expect(bank.length, `${lesson.id}/twist must have >= 1 distractor in bank`).toBeGreaterThanOrEqual(1);
      }

      if (lesson.foreshadow) {
        const target = NL_LESSONS.find((l) => l.id === lesson.foreshadow!.resolvedIn);
        expect(target, `foreshadow in ${lesson.id} must resolve to an authored lesson`).toBeDefined();
      }
      if (lesson.payoff) {
        const origin = NL_LESSONS.find((l) => l.id === lesson.payoff!.ofLesson);
        expect(origin, `payoff in ${lesson.id} must refer to an authored origin lesson`).toBeDefined();
      }
    }
  });

  it("authors correspondence families, compounds and false friends", () => {
    expect(Object.keys(dutchCompendium.shifts)).toHaveLength(9);
    expect(dutchCompendium.compounds.length).toBeGreaterThanOrEqual(10);
    expect(dutchCompendium.falseFriends.length).toBeGreaterThanOrEqual(12);
    expect(dutchCompendium.wordList.length).toBeGreaterThanOrEqual(150);
  });

  it("keeps every id space unique", () => {
    const lessonIds = NL_LESSONS.map((l) => l.id);
    expect(new Set(lessonIds).size).toBe(lessonIds.length);

    const topicIds = NL_TOPICS.map((t) => t.id);
    expect(new Set(topicIds).size).toBe(topicIds.length);

    const shellIds = NL_TOPICS.flatMap((t) => [t.core, ...t.sprigs])
      .map((s) => s.id)
      .concat(NL_TRAIL_BRANCHES.flatMap((b) => [b.id, ...b.lessons.map((l) => l.id)]));
    expect(new Set(shellIds).size).toBe(shellIds.length);

    const gateIds = NL_TRAIL_GATES.map((g) => g.id);
    expect(new Set(gateIds).size).toBe(gateIds.length);

    const days = DUTCH_INSIGHTS.map((i) => i.day);
    expect(new Set(days).size).toBe(days.length);

    const entityIds = Object.keys(getWordEntityMap("nl"));
    expect(new Set(entityIds).size).toBe(entityIds.length);
  });

  it("resolves every lesson word id in the dutch entity map", () => {
    const entities = getWordEntityMap("nl");
    const missing: string[] = [];
    for (const lesson of NL_LESSONS) {
      const withTable = lesson as Lesson & { table_word_ids?: string[] };
      const ids = [...lesson.word_ids, ...(withTable.table_word_ids ?? [])];
      for (const id of ids) {
        if (!entities[id]) missing.push(`lesson ${lesson.id}: ${id}`);
      }
    }
    expect(missing).toEqual([]);
  });

  it("agrees between authored curriculum shells and authored lessons", () => {
    const authoredShells = NL_TOPICS.flatMap((t) => [t.core, ...t.sprigs])
      .concat(NL_TRAIL_BRANCHES.flatMap((b) => b.lessons))
      .filter((s) => s.authored)
      .map((s) => s.id)
      .sort((a, b) => a - b);
    const lessonIds = NL_LESSONS.map((l) => l.id).sort((a, b) => a - b);
    expect(authoredShells).toEqual(lessonIds);
  });

  it("uses the ASCII apostrophe in every authored Dutch string", () => {
    const blob = JSON.stringify(NL_LESSONS) + JSON.stringify(DUTCH_INSIGHTS);
    expect(blob).not.toMatch(/[\u2018\u2019]/);
  });

  it("keeps german out of the dutch course", () => {
    const blobs = [
      ...NL_LESSONS.map((l) => JSON.stringify(l)),
      JSON.stringify(dutchCompendium),
      JSON.stringify(DUTCH_INSIGHTS),
    ];
    for (const blob of blobs) {
      const head = blob.slice(0, 120);
      expect(GERMAN_FUNCTION_WORDS.test(blob), `function words leaked: ${head}`).toBe(false);
      expect(GERMAN_ONLY_CHARS.test(blob), `umlauts leaked: ${head}`).toBe(false);
    }
  });

  it("uses only dutch genders", () => {
    for (const word of Object.values(dutchCompendium.words)) {
      expect(["de", "het", null]).toContain(word.gender);
    }
  });

  it("keeps gates and branches on the trail", () => {
    for (const gate of NL_TRAIL_GATES) {
      expect(gate.afterTopic).toBeGreaterThanOrEqual(1);
      expect(gate.afterTopic).toBeLessThanOrEqual(29);
    }
    for (const branch of NL_TRAIL_BRANCHES) {
      expect(branch.attach).toBeGreaterThanOrEqual(1);
      expect(branch.attach).toBeLessThanOrEqual(30);
    }
  });

  it("does not elide de/het and grades Dutch case-insensitively", () => {
    expect(displayArticle("de", "arm", "nl")).toBe("de");
    expect(displayArticle("het", "huis", "nl")).toBe("het");
    expect(displayArticle("het", "uur", "nl")).toBe("het");
    expect(evaluateAnswerAccuracy("ik heb honger", "Ik heb honger", { languageId: "nl" })).toEqual({
      accuracy: "exact",
    });
  });

  it("does not copy long prose between lessons", () => {
    const seen = new Map<string, number>();
    for (const lesson of NL_LESSONS) {
      for (const text of new Set(collectLongStrings(lesson))) {
        seen.set(text, (seen.get(text) ?? 0) + 1);
      }
    }
    const duplicated = [...seen.entries()].filter(([, n]) => n > 1);
    expect(duplicated.map(([t]) => t.slice(0, 80))).toEqual([]);
  });
});
