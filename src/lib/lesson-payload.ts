import type { CompendiumData, Lesson, LessonPayload, WordEntity } from "@/lib/types";

/**
 * Only the words this lesson can render, plus the single shift family it links
 * to. The full compendium is fetched separately by review/atlas/the word drawer,
 * so a lesson payload never pays for the whole dictionary — and it no longer
 * ships every shift family's prose and word list (≈8.5 KB) just to render one
 * atlas bridge. The total family count rides along as `shiftFamilyCount`.
 */
export function trimCompendium(
  compendium: CompendiumData,
  lesson: Lesson | null,
  entities: Readonly<Record<string, WordEntity>>
): LessonPayload["compendium"] {
  const shiftFamilyCount = Object.keys(compendium.shifts).length;
  if (!lesson) {
    return {
      words: {},
      shifts: {},
      shiftFamilyCount,
      compounds: [],
      falseFriends: [],
      dailyInsights: [],
    };
  }
  const words: Record<string, WordEntity> = {};
  for (const rawId of new Set([...lesson.word_ids, ...(lesson.table_word_ids ?? [])])) {
    const key = rawId.toLowerCase();
    const word = entities[key];
    if (word) words[key] = word;
  }
  // The lesson renders only its primary shift family (TableSegment/SummarySegment
  // atlas bridge); ship just that one, not the whole shift dictionary.
  const primaryShiftId = lesson.shift_categories?.[0];
  const primaryShift = primaryShiftId ? compendium.shifts[primaryShiftId] : undefined;
  return {
    words,
    shifts: primaryShiftId && primaryShift ? { [primaryShiftId]: primaryShift } : {},
    shiftFamilyCount,
    compounds: [],
    falseFriends: [],
    dailyInsights: [],
  };
}
