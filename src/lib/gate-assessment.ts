import type { ExerciseItem } from "./types";

export interface GateQuestion {
  lesson: string;
  prompt: string;
  options: string[];
  answer: string;
}

/** Select a graded choice exercise without treating one possible translation as the only answer. */
export function selectGateQuestion(lesson: string, lessonId: number, exercises: ExerciseItem[]): GateQuestion | null {
  for (const type of ["literal_gloss", "shift_select"] as const) {
    for (const exercise of exercises) {
      if (exercise.type !== type || !exercise.target_answer?.trim() || !exercise.prompt?.trim()) continue;
      const source = type === "literal_gloss" ? exercise.german?.trim() : "";
      if (type === "literal_gloss" && !source) continue;
      const prompt = source ? `${exercise.prompt}\n${source}` : exercise.prompt;
      const options = exercise.options?.filter((option) => option.trim()) ?? [];
      if (options.length < 2 || new Set(options).size !== options.length || !options.includes(exercise.target_answer)) continue;
      if (prompt.toLocaleLowerCase().includes(exercise.target_answer.trim().toLocaleLowerCase())) continue;
      return { lesson, prompt, options: rotate(options, lessonId), answer: exercise.target_answer };
    }
  }
  for (const exercise of exercises) {
    if (exercise.type !== "matching_pairs" || !exercise.matching_pairs) continue;
    const pairs = exercise.matching_pairs.filter((pair) => pair.english?.trim() && pair.german?.trim());
    for (const pair of pairs) {
      const options = [...new Set(pairs.map((item) => item.german))];
      if (options.length < 2 || pair.english.toLocaleLowerCase().includes(pair.german.toLocaleLowerCase())) continue;
      if (pairs.some((item) => item !== pair && item.english.toLocaleLowerCase() === pair.english.toLocaleLowerCase() && item.german !== pair.german)) continue;
      return { lesson, prompt: `Choose the translation for: ${pair.english}`, options: rotate(options, lessonId), answer: pair.german };
    }
  }
  return null;
}

function rotate(options: string[], seed: number): string[] {
  const offset = seed % options.length;
  return [...options.slice(offset), ...options.slice(0, offset)];
}

export function scoreGateAnswers(questions: GateQuestion[], answers: string[]): boolean[] {
  return questions.map((question, index) => answers[index] === question.answer);
}

export function hasPassedGateAssessment(results: boolean[]): boolean {
  return results.length > 0 && results.filter(Boolean).length >= Math.ceil(results.length * 0.8);
}
