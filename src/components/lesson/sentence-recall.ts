import type { ExerciseItem } from "@/lib/types";

/** Select the last authored sentence-production task, not simply the fifth slot. */
export function finalSentenceExerciseId(exercises: readonly ExerciseItem[]): string | undefined {
  for (let index = exercises.length - 1; index >= 0; index--) {
    const exercise = exercises[index];
    if (
      (exercise.type === "syntax_builder" || exercise.type === "transcribe") &&
      /\S+\s+\S+/.test(exercise.target_answer.trim())
    ) {
      return exercise.id;
    }
  }
  return undefined;
}
