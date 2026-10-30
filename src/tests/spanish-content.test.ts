import { describe, it, expect } from "vitest";
import { getLanguageContent } from "../data/language-content";
import { spanishCompendium } from "../data/spanish/compendium-es";
import { ES_LESSONS } from "../data/spanish/lessons-es";
import { ES_TOPICS, ES_TRAIL_BRANCHES, ES_TRAIL_GATES } from "../data/spanish/curriculum-es";
import { SPANISH_INSIGHTS } from "../data/spanish/insights-es";
import { getWordEntityMap } from "./word-entity-fixtures";
import type { Lesson } from "../lib/types";

// The Spanish course is authored as typed TS modules under src/data/spanish/
// (not parsed from word_connections.md), so its correctness guarantees live
// here: bundle wiring, id integrity, referential word ids, Spanish-only
// content hygiene, and gender validation.

const esContent = getLanguageContent("es");

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

// German function words that have no business appearing in Spanish/English prose.
const GERMAN_FUNCTION_WORDS = /\b(nicht|ich|wir|aber|auch|noch|schon|haben|werden|ist)\b/i;
const GERMAN_ONLY_CHARS = /[äöüßÄÖÜ]/;

describe("spanish course content", () => {
  it("wires the spanish bundle completely", () => {
    expect(esContent.totalTopics).toBe(30);
    expect(esContent.topics).toHaveLength(30);
    expect(esContent.lessons.length).toBeGreaterThanOrEqual(19);
    expect(esContent.insights).toHaveLength(28);
    expect(esContent.compendium).toBe(spanishCompendium);

    // Validate exercise solvability, MCQ integrity, and narrative arcs
    for (const lesson of ES_LESSONS) {
      for (const ex of lesson.exercises) {
        if (ex.type === "shift_select" || ex.type === "literal_gloss") {
          expect(ex.options, `${lesson.id}/${ex.id} must include target_answer`).toContain(ex.target_answer);
          expect(new Set(ex.options).size, `${lesson.id}/${ex.id} options must be unique`).toBe(ex.options?.length);
        }
        if (ex.type === "syntax_builder" || ex.type === "transcribe") {
          const targetWords = ex.target_answer
            .replace(/[?,.!¿¡]/g, "")
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
      }
      if (lesson.twist?.word_bank && lesson.twist?.target_answer) {
        const targetWords = lesson.twist.target_answer
          .replace(/[?,.!¿¡]/g, "")
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
        const foreshadow = lesson.foreshadow;
        const target = ES_LESSONS.find((l) => l.id === foreshadow.resolvedIn);
        expect(target, `foreshadow in ${lesson.id} must resolve to an authored lesson`).toBeDefined();
      }
      if (lesson.payoff) {
        const payoff = lesson.payoff;
        const origin = ES_LESSONS.find((l) => l.id === payoff.ofLesson);
        expect(origin, `payoff in ${lesson.id} must refer to an authored origin lesson`).toBeDefined();
      }
    }
  });

  it("authors shift families, compounds and false friends", () => {
    expect(Object.keys(spanishCompendium.shifts)).toHaveLength(9);
    expect(spanishCompendium.compounds.length).toBeGreaterThanOrEqual(10);
    expect(spanishCompendium.falseFriends.length).toBeGreaterThanOrEqual(12);
  });

  it("keeps every id space unique", () => {
    const lessonIds = ES_LESSONS.map((l) => l.id);
    expect(new Set(lessonIds).size).toBe(lessonIds.length);

    const topicIds = ES_TOPICS.map((t) => t.id);
    expect(new Set(topicIds).size).toBe(topicIds.length);

    const shellIds = ES_TOPICS.flatMap((t) => [t.core, ...t.sprigs])
      .map((s) => s.id)
      .concat(ES_TRAIL_BRANCHES.flatMap((b) => [b.id, ...b.lessons.map((l) => l.id)]));
    expect(new Set(shellIds).size).toBe(shellIds.length);

    const gateIds = ES_TRAIL_GATES.map((g) => g.id);
    expect(new Set(gateIds).size).toBe(gateIds.length);

    const days = SPANISH_INSIGHTS.map((i) => i.day);
    expect(new Set(days).size).toBe(days.length);

    const entityIds = Object.keys(getWordEntityMap("es"));
    expect(new Set(entityIds).size).toBe(entityIds.length);
  });

  it("resolves every lesson word id in the spanish entity map", () => {
    const entities = getWordEntityMap("es");
    const missing: string[] = [];
    for (const lesson of ES_LESSONS) {
      const withTable = lesson as Lesson & { table_word_ids?: string[] };
      const ids = [...lesson.word_ids, ...(withTable.table_word_ids ?? [])];
      for (const id of ids) {
        if (!entities[id]) missing.push(`lesson ${lesson.id}: ${id}`);
      }
    }
    expect(missing).toEqual([]);
  });

  it("agrees between authored curriculum shells and authored lessons", () => {
    const authoredShells = ES_TOPICS.flatMap((t) => [t.core, ...t.sprigs])
      .concat(ES_TRAIL_BRANCHES.flatMap((b) => b.lessons))
      .filter((s) => s.authored)
      .map((s) => s.id)
      .sort((a, b) => a - b);
    const lessonIds = ES_LESSONS.map((l) => l.id).sort((a, b) => a - b);
    expect(authoredShells).toEqual(lessonIds);
  });

  it("keeps german out of the spanish course", () => {
    const blobs = [
      ...ES_LESSONS.map((l) => JSON.stringify(l)),
      JSON.stringify(spanishCompendium),
      JSON.stringify(SPANISH_INSIGHTS),
    ];
    for (const blob of blobs) {
      const head = blob.slice(0, 120);
      expect(GERMAN_FUNCTION_WORDS.test(blob), `function words leaked: ${head}`).toBe(false);
      expect(GERMAN_ONLY_CHARS.test(blob), `umlauts leaked: ${head}`).toBe(false);
    }
  });

  it("uses only spanish genders", () => {
    for (const word of Object.values(spanishCompendium.words)) {
      expect(["el", "la", null]).toContain(word.gender);
    }
  });

  it("keeps gates and branches on the trail", () => {
    for (const gate of ES_TRAIL_GATES) {
      expect(gate.afterTopic).toBeGreaterThanOrEqual(1);
      expect(gate.afterTopic).toBeLessThanOrEqual(29);
    }
    for (const branch of ES_TRAIL_BRANCHES) {
      expect(branch.attach).toBeGreaterThanOrEqual(1);
      expect(branch.attach).toBeLessThanOrEqual(30);
    }
  });

  it("does not copy long prose between lessons", () => {
    const seen = new Map<string, number>();
    for (const lesson of ES_LESSONS) {
      for (const text of new Set(collectLongStrings(lesson))) {
        seen.set(text, (seen.get(text) ?? 0) + 1);
      }
    }
    const duplicated = [...seen.entries()].filter(([, n]) => n > 1);
    expect(duplicated.map(([t]) => t.slice(0, 80))).toEqual([]);
  });
});
