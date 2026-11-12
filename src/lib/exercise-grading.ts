import { gradeLessonAnswer } from "./lesson-grading";
import type { EvaluationOptions } from "./letter-diff";
import { diagnoseAttempt } from "./shift-diagnosis";
import { DIAGNOSIS_BY_LANGUAGE, GERMAN_DIAGNOSIS } from "@/data/shift-diagnosis-table";
import type { ExerciseDiagnosis, ExerciseItem } from "./types";

const tokensOf = (text: string) => text.toLowerCase().replace(/[.,!?;:]+/g, " ").split(/\s+/).filter(Boolean);

function diagnoseProduction(
  exercise: ExerciseItem,
  answer: string,
  target: string,
  languageId: string,
  wordBank: readonly string[],
): ExerciseDiagnosis | undefined {
  if (exercise.diagnosis) return exercise.diagnosis;
  const table = DIAGNOSIS_BY_LANGUAGE[languageId] ?? GERMAN_DIAGNOSIS;
  const attemptTokens = tokensOf(answer);
  const targetTokens = tokensOf(target);
  if (attemptTokens.length === targetTokens.length &&
      [...attemptTokens].sort().join(" ") === [...targetTokens].sort().join(" ")) {
    return table.word_order;
  }
  if (exercise.type === "dictation") return undefined;
  const targetSet = new Set(targetTokens);
  const bankSet = new Set(wordBank.map((word) => word.toLowerCase()));
  if (attemptTokens.some((token) => bankSet.has(token) && !targetSet.has(token))) return table.wrong_word;
  return diagnoseAttempt(target, answer, exercise.shift_hint, table, languageId) ?? undefined;
}

/** Resolve equivalent answers, correction requirements, and feedback from one grading policy. */
export function gradeExerciseAttempt(
  exercise: ExerciseItem,
  answers: string[],
  options: EvaluationOptions & { languageId: string },
  isRetry = false,
  wordBank: readonly string[] = exercise.word_bank ?? [],
) {
  const targets = [exercise.target_answer.trim(), ...(exercise.accepted_answers ?? [])];
  const graded = gradeLessonAnswer(answers, targets, options, isRetry);
  // Selecting a distractor is a decision, not a typed spelling slip.
  if (exercise.type === "shift_select" && !targets.includes(graded.answer)) {
    graded.result = { accuracy: "incorrect" };
  }
  const { result } = graded;
  const incorrect = result.accuracy === "incorrect";
  const queueRetry = incorrect || (result.accuracy === "almost" && (
    result.reason === "typo" || result.reason === "sharp-s" ||
    (result.reason === "umlaut" && !options.umlautTolerance)
  ));
  const errorType = result.reason === "umlaut" ? "umlaut" as const
    : result.reason === "case" ? "capitalization" as const : "spelling" as const;
  const production = exercise.type === "transcribe" || exercise.type === "dictation" ||
    exercise.type === "spoken_turn_reply" || exercise.type === "pronoun_compression";
  const diagnosis = !incorrect ? undefined : exercise.diagnosis ?? (
    production ? diagnoseProduction(exercise, graded.answer, graded.target, options.languageId, wordBank)
      : exercise.type === "derive" ? diagnoseAttempt(graded.target, graded.answer, exercise.shift_hint, undefined, options.languageId) ?? undefined
        : undefined
  );
  return { ...graded, queueRetry, errorType, diagnosis };
}

/** Read a tile selection as words or glued morphemes without changing what was selected. */
export function classicAnswerReadings(
  type: ExerciseItem["type"],
  target: string,
  input: string,
  selectedIndices: readonly number[],
  tileOptions: readonly string[],
  wordBank: readonly string[],
): string[] {
  if (type === "matching_pairs") return [];
  if (type === "syntax_builder") return [selectedIndices.map((index) => wordBank[index] ?? "").join(" ").trim()];
  if (type !== "morpheme_tiles") return [input.trim()];
  const tiles = selectedIndices.map((index) => tileOptions[index] ?? "");
  const clean = tiles.map((tile) => tile.replace(/^-/, ""));
  if (!target.includes(" ")) return [clean.join("").trim()];
  const readings = [tiles.join(" ").trim()];
  if (clean.length > 2) readings.push(`${clean[0]} ${clean.slice(1).join("")}`.trim());
  return readings;
}
