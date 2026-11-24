import { isUnspecifiedYouPrompt } from "./german-alternatives";
import { gradeLessonAnswer } from "./lesson-grading";
import type { EvaluationOptions } from "./letter-diff";
import { diagnoseExerciseAttempt } from "./error-diagnosis";
import type { ExerciseItem } from "./types";

const NON_EQUIVALENCE_TYPES = new Set<ExerciseItem["type"]>([
  "shift_select",
  "literal_gloss",
  "matching_pairs",
  "reverse_cognate",
]);

/** Resolve equivalent answers, correction requirements, and feedback from one grading policy. */
export function gradeExerciseAttempt(
  exercise: ExerciseItem,
  answers: string[],
  options: EvaluationOptions & { languageId: string },
  isRetry = false,
  wordBank: readonly string[] = exercise.word_bank ?? [],
) {
  const targets = [exercise.target_answer.trim(), ...(exercise.accepted_answers ?? [])];
  const allowGermanEquivalence = options.languageId === "de" && !NON_EQUIVALENCE_TYPES.has(exercise.type);
  const promptContext = [exercise.prompt, exercise.idea, exercise.english_hint, exercise.reply_idea]
    .filter(Boolean)
    .join(" ");
  const allowGermanRegister = allowGermanEquivalence && isUnspecifiedYouPrompt(promptContext);
  const graded = gradeLessonAnswer(
    answers,
    targets,
    { ...options, allowGermanV2: allowGermanEquivalence, allowGermanRegister },
    isRetry,
  );
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
  const diagnosis = !incorrect
    ? undefined
    : diagnoseExerciseAttempt({
        attempt: graded.answer,
        expected: graded.target || exercise.target_answer.trim(),
        acceptedAnswers: exercise.accepted_answers,
        exerciseType: exercise.type,
        languageId: options.languageId,
        shiftHint: exercise.shift_hint,
        authoredDiagnosis: exercise.diagnosis,
        explanation: exercise.explanation,
        prompt: exercise.prompt,
        englishPrompt: exercise.idea || exercise.english_hint || exercise.meaning,
        wordBank,
      });
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
