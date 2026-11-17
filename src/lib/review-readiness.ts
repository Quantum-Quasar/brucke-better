import type { LessonIndexEntry, MasteryState, SRSCard } from "./types";

type ReadinessLesson = Pick<LessonIndexEntry, "id" | "word_ids" | "table_word_ids">;

export interface ReviewVocabularyCoverage {
  taught: Set<string>;
  tableExposed: Set<string>;
}

/** Only assessed vocabulary in a completed lesson establishes production readiness. */
export function completedVocabularyCoverage(
  lessons: readonly ReadinessLesson[],
  completedLessons: readonly number[],
): ReviewVocabularyCoverage {
  const completed = new Set(completedLessons);
  const taught = new Set<string>();
  const tableExposed = new Set<string>();
  for (const lesson of lessons) {
    if (!completed.has(lesson.id)) continue;
    for (const id of lesson.word_ids) taught.add(id);
    for (const id of lesson.table_word_ids) tableExposed.add(id);
  }
  return { taught, tableExposed };
}

export type RecognitionFirstReason = "table-only" | "untaught";

/** A failed review's last_reviewed timestamp is not evidence of successful practice. */
export function recognitionFirstReason(
  wordId: string | undefined,
  coverage: ReviewVocabularyCoverage,
  card: SRSCard | undefined,
  mastery: MasteryState | undefined,
): RecognitionFirstReason | null {
  if (!wordId || wordId.startsWith("sentence_") || wordId.startsWith("article_")) return null;
  // Mastery survives lapses/relearning. Guessed-only history is not meaningful
  // recognition; otherwise successful repetitions or a historical interval count.
  const practiced = mastery === "mastered" || Boolean(card && (
    card.interval >= 7 || card.repetitions > (card.guessed ?? 0) ||
    ((card.guessed ?? 0) === 0 && (card.interval > 1 ||
      (card.last_reviewed && card.ease_factor !== 2.5)))
  ));
  if (coverage.taught.has(wordId) || practiced) return null;
  return coverage.tableExposed.has(wordId) ? "table-only" : "untaught";
}
