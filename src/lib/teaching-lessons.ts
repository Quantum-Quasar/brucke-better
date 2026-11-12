import type { LessonIndexEntry } from "@/lib/types";

type TeachingLesson = Pick<LessonIndexEntry, "id" | "word_ids" | "table_word_ids">;

/** Exact authored coverage only: dictionary-only entries deliberately have no fallback. */
export function buildTeachingLessonMap(lessons: TeachingLesson[]): Map<string, number[]> {
  const map = new Map<string, number[]>();
  for (const lesson of lessons) {
    map.set(`sentence_${lesson.id}`, [lesson.id]);
    for (const id of new Set([...lesson.word_ids, ...lesson.table_word_ids])) {
      for (const key of [id, `article_${id}`]) {
        const ids = map.get(key) ?? [];
        if (!ids.includes(lesson.id)) ids.push(lesson.id);
        map.set(key, ids);
      }
    }
  }
  return map;
}
