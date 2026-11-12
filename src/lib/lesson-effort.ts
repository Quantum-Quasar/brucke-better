import exerciseCounts from "@/data/lesson-exercise-counts.json";

const countsByLanguage: Readonly<Record<string, Readonly<Record<string, number>>>> = exerciseCounts;

/** Build-time authored counts, without loading the lesson index or body. */
export function getLessonExerciseCount(languageId: string, lessonId: number): number | undefined {
  return countsByLanguage[languageId]?.[lessonId];
}

export interface LessonEffortEstimate {
  exerciseCount: number;
  minutes: number;
}

/** Rough first pass: two minutes to read, then twenty seconds per exercise.
 * Retries and optional activities are additional; this is not a completion timer.
 */
export function estimateLessonEffort(exerciseCount: number): LessonEffortEstimate {
  return { exerciseCount, minutes: Math.ceil((120 + exerciseCount * 20) / 60) };
}
