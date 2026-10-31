import type { CompendiumData, Lesson, LessonPayload, WordEntity } from "@/lib/types";

/**
 * Only the words this lesson can render (plus the language's shift families).
 * The full compendium is fetched separately by review/atlas/the word drawer,
 * so a lesson payload never pays for the whole dictionary.
 */
export function trimCompendium(
  compendium: CompendiumData,
  lesson: Lesson | null
): LessonPayload["compendium"] {
  if (!lesson) {
    return {
      words: {},
      shifts: compendium.shifts,
      compounds: [],
      falseFriends: [],
      dailyInsights: [],
    };
  }
  const words: Record<string, WordEntity> = {};
  for (const rawId of new Set([...lesson.word_ids, ...(lesson.table_word_ids ?? [])])) {
    const key = rawId.toLowerCase();
    const word = compendium.words[key];
    if (word) words[key] = word;
  }
  return {
    words,
    shifts: compendium.shifts,
    compounds: [],
    falseFriends: [],
    dailyInsights: [],
  };
}
