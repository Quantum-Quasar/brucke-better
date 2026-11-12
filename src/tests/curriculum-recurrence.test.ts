import { describe, expect, it } from "vitest";
import { LESSONS } from "../data/lessons";
import { compendium } from "../data/compendium";
import { flattenTrailNodes } from "../data/curriculum";
import type { ExerciseItem, Lesson } from "../lib/types";
import {
  buildRecurrenceMap,
  recurrenceDeficits,
  referenceOnlyWordIds,
} from "../lib/curriculum-recurrence";

const byId = new Map(LESSONS.map((lesson) => [lesson.id, lesson]));
const trail = flattenTrailNodes().flatMap((node) => {
  const lesson = byId.get(node.id);
  return lesson ? [lesson] : [];
});
const words = { haus: { target_word: "Haus" }, hand: { target_word: "Hand" } };
const exercise = (id: string, target_answer: string): ExerciseItem => ({
  id, type: "derive", prompt: "Recover the German", target_answer,
});
const lesson = (id: number, word_ids: string[], exercises: ExerciseItem[]): Lesson => ({
  ...LESSONS[0], id, word_ids, table_word_ids: ["haus", "hand"], exercises,
});

describe("Assessed German vocabulary recurrence", () => {
  it("gives every taught word distinct retrieval in at least two trail lessons", () => {
    const deficits = recurrenceDeficits(buildRecurrenceMap(trail, compendium.words).values());
    expect(deficits.map((row) => ({ word: row.wordId, intro: row.introducedIn, lessons: row.lessonIds }))).toEqual([]);
  });

  it("does not turn optional compendium entries into taught vocabulary", () => {
    const lessons = [lesson(1, ["haus"], [exercise("a", "Haus")])];
    expect(referenceOnlyWordIds(lessons, Object.keys(words))).toEqual(["hand"]);
    expect([...buildRecurrenceMap(lessons, words).keys()]).toEqual(["haus"]);
  });

  it("ignores banks, hints, explanations, rule labels and optional twists", () => {
    const onlyClues: ExerciseItem = {
      ...exercise("a", "Hand"), type: "shift_select", options: ["Haus", "Hand"],
      word_bank: ["Haus"], vocab_hints: [{ word: "Haus", translation: "house" }],
      explanation: "Haus means house", variants: [exercise("variant", "Haus")],
    };
    const lessons = [lesson(1, ["haus"], [onlyClues])];
    lessons[0].twist = { ...LESSONS[0].twist!, target_answer: "Haus" };
    expect(buildRecurrenceMap(lessons, words).get("haus")!.encounters).toEqual([]);
  });

  it("counts a matching path once, not its duplicate answer or repeated pair", () => {
    const matching: ExerciseItem = {
      ...exercise("a", "Haus, Haus"), type: "matching_pairs",
      matching_pairs: [{ id: "1", german: "Haus", english: "house" }],
    };
    const rows = buildRecurrenceMap([
      lesson(1, ["haus"], [matching]),
      lesson(2, [], [{ ...matching, id: "b" }]),
      lesson(3, [], [exercise("c", "Mein Haus")]),
    ], words);
    expect(rows.get("haus")!.encounters).toEqual([
      { lessonId: 1, exerciseId: "a", exerciseType: "matching_pairs" },
      { lessonId: 3, exerciseId: "c", exerciseType: "derive" },
    ]);
    expect(rows.get("haus")!.lessonIds).toEqual([1, 3]);
  });

  it("never counts a pre-introduction clue as later retrieval or matches substrings", () => {
    const rows = buildRecurrenceMap([
      lesson(1, [], [exercise("a", "Haus")]),
      lesson(2, ["haus", "hand"], [exercise("b", "Haustür und Handlung")]),
      lesson(3, [], [exercise("c", "Ein Haus")]),
    ], words);
    expect(rows.get("haus")!.lessonIds).toEqual([3]);
    expect(rows.get("hand")!.encounters).toEqual([]);
    expect(recurrenceDeficits(rows.values()).map((row) => row.wordId)).toEqual(["haus", "hand"]);
  });
});

describe("Core mixed-connection practice", () => {
  it("offers a solvable familiar-word comparison in every core from topic 5", () => {
    const known = new Set<string>();
    for (const lesson of trail) {
      if (lesson.id >= 5 && lesson.id <= 30) {
        const mixed = lesson.exercises.filter((exercise) => exercise.type === "shift_select"
          && exercise.options?.length === 4
          && exercise.options.every((option) => option.split(" → ").length === 2
            && compendium.words[option.split(" → ")[1].toLowerCase()]));
        expect(mixed.length, `core ${lesson.id}`).toBeGreaterThanOrEqual(1);
        for (const exercise of mixed) {
          expect(new Set(exercise.options).size).toBe(4);
          expect(exercise.options).toContain(exercise.target_answer);
          for (const option of exercise.options!) {
            const wordId = option.split(" → ")[1].toLowerCase();
            expect(known.has(wordId), `${exercise.id}: ${wordId} must already be taught`).toBe(true);
          }
        }
        expect(lesson.exercises).toHaveLength(5);
      }
      lesson.word_ids.forEach((id) => known.add(id));
    }
  });

  it("keeps authored recall cards playable and answerable without duplicate labels", () => {
    for (const lesson of trail) {
      for (const exercise of lesson.exercises.filter((item) => item.type === "matching_pairs")) {
        const pairs = exercise.matching_pairs!;
        expect(pairs.length, exercise.id).toBeLessThanOrEqual(12);
        expect(new Set(pairs.map((pair) => pair.id)).size, exercise.id).toBe(pairs.length);
        expect(new Set(pairs.map((pair) => pair.german.toLowerCase())).size, exercise.id).toBe(pairs.length);
        expect(new Set(pairs.map((pair) => pair.english.toLowerCase())).size, exercise.id).toBe(pairs.length);
      }
    }
  });
});
