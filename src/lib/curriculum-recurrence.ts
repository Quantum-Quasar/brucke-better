import type { ExerciseItem, ExerciseType, Lesson, WordEntity } from "./types";

// Introduction plus a retrieval in another lesson is the minimum spaced practice
// unit. Three lessons is the authoring target, not an exemption for thin words.
export const RECURRENCE_LESSON_FLOOR = 2;
export const RECURRENCE_LESSON_TARGET = 3;

export interface WordEncounter {
  lessonId: number;
  exerciseId: string;
  exerciseType: ExerciseType;
}

export interface WordRecurrence {
  wordId: string;
  introducedIn: number;
  encounters: WordEncounter[];
  lessonIds: number[];
}

function normalized(text: string): string {
  return ` ${(text.toLowerCase().match(/[\p{L}]+/gu) ?? []).join(" ")} `;
}

/** Only the path actually assessed, never banks, hints, feedback or variants.
 * Matching cards count once per exercise even when target_answer repeats them.
 * Rule labels are not word recall; English answers are not German production.
 */
export function assessedGermanSurfaces(exercise: ExerciseItem): string[] {
  switch (exercise.type) {
    case "matching_pairs":
      return (exercise.matching_pairs ?? []).map((pair) => pair.german);
    case "reverse_cognate":
      return [...exercise.prompt.matchAll(/['‘"„“]([^'’"„“]+)['’"”]/gu)].map((match) => match[1]);
    case "literal_gloss":
    case "variant_english":
      return exercise.german ? [exercise.german] : [];
    case "shift_select":
      return [];
    default:
      return [exercise.target_answer];
  }
}

/** Exact whole-word/phrase matching deliberately undercounts inflections rather
 * than claiming that an unrelated substring or an unassessed grid cell is recall.
 * word_ids declares teaching; table-only words remain optional reference material.
 */
export function buildRecurrenceMap(
  lessons: readonly Lesson[],
  words: Record<string, Pick<WordEntity, "target_word">>,
): Map<string, WordRecurrence> {
  const result = new Map<string, WordRecurrence>();
  for (const lesson of lessons) {
    for (const wordId of lesson.word_ids) {
      if (!result.has(wordId)) {
        result.set(wordId, { wordId, introducedIn: lesson.id, encounters: [], lessonIds: [] });
      }
    }
  }
  const targets = new Map([...result.keys()].map((id) => [id, normalized(words[id]?.target_word ?? id)]));
  const seenSurfaces = new Map<string, Set<string>>();
  const introduced = new Set<string>();
  for (const lesson of lessons) {
    lesson.word_ids.forEach((id) => introduced.add(id));
    for (const exercise of lesson.exercises) {
      const surfaces = assessedGermanSurfaces(exercise).map(normalized);
      for (const [wordId, row] of result) {
        const qualifying = surfaces.filter((text) => text.includes(targets.get(wordId)!));
        const seen = seenSurfaces.get(wordId) ?? new Set<string>();
        if (!introduced.has(wordId) || !qualifying.some((text) => !seen.has(text))) continue;
        qualifying.forEach((text) => seen.add(text));
        seenSurfaces.set(wordId, seen);
        row.encounters.push({ lessonId: lesson.id, exerciseId: exercise.id, exerciseType: exercise.type });
        if (!row.lessonIds.includes(lesson.id)) row.lessonIds.push(lesson.id);
      }
    }
  }
  return result;
}

export function recurrenceDeficits(rows: Iterable<WordRecurrence>): WordRecurrence[] {
  return [...rows].filter((row) => row.lessonIds.length < RECURRENCE_LESSON_FLOOR);
}

export function referenceOnlyWordIds(lessons: readonly Lesson[], wordIds: readonly string[]): string[] {
  const taught = new Set(lessons.flatMap((lesson) => lesson.word_ids));
  return wordIds.filter((id) => !taught.has(id));
}
