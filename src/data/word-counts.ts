// Lightweight word counts for chrome that renders on every route (TopNav).
// Importing `@/data/language-content` here would pull all three languages'
// lessons and compendia (~3.2 MB) into the shared root chunk. These numbers are
// pinned to the compendia by `src/tests/languages.test.ts`; update them together.
export const WORD_COUNTS: Readonly<Record<string, number>> = {
  de: 1226,
  fr: 306,
  es: 293,
  nl: 390,
};

export interface CourseCounts {
  topics: number;
  lessons: number;
  families: number;
  words: number;
}

/** Course-shaped counts for chrome that must not import lesson data. Pinned
 *  to the real content by `src/tests/languages.test.ts`. */
export const COURSE_COUNTS: Readonly<Record<string, CourseCounts>> = {
  de: { topics: 30, lessons: 169, families: 10, words: 1226 },
  fr: { topics: 30, lessons: 123, families: 10, words: 306 },
  es: { topics: 30, lessons: 123, families: 10, words: 293 },
  nl: { topics: 30, lessons: 75, families: 10, words: 390 },
};

const EMPTY_COUNTS: CourseCounts = { topics: 0, lessons: 0, families: 0, words: 0 };

export function getCourseCounts(languageId: string): CourseCounts {
  return COURSE_COUNTS[languageId] ?? EMPTY_COUNTS;
}

export function getWordCount(languageId: string): number {
  return WORD_COUNTS[languageId] ?? 0;
}
