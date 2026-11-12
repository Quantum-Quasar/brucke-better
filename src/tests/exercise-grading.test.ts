import { describe, expect, it } from "vitest";
import { classicAnswerReadings, gradeExerciseAttempt } from "../lib/exercise-grading";
import type { ExerciseItem } from "../lib/types";

const options = { languageId: "de", umlautTolerance: false, capitalizationTolerance: false };
const exercise: ExerciseItem = {
  id: "production-grading",
  type: "transcribe",
  prompt: "Say that you have no time.",
  target_answer: "Ich habe keine Zeit.",
  accepted_answers: ["Zeit habe ich keine."],
  word_bank: ["Ich", "habe", "keine", "Zeit", "kein"],
};

describe("production exercise grading", () => {
  it.each(["transcribe", "dictation", "spoken_turn_reply", "pronoun_compression"] as const)(
    "accepts authored alternatives for %s and returns the accepted target for feedback",
    (type) => {
      const graded = gradeExerciseAttempt({ ...exercise, type }, ["Zeit habe ich keine"], options);
      expect(graded.result.accuracy).toBe("exact");
      expect(graded.target).toBe("Zeit habe ich keine.");
      expect(graded.queueRetry).toBe(false);
      expect(graded.diagnosis).toBeUndefined();
    },
  );
  it("does not turn a selected distractor into a tolerated spelling slip", () => {
    const item: ExerciseItem = { ...exercise, type: "shift_select", target_answer: "Wasser", accepted_answers: [] };
    expect(gradeExerciseAttempt(item, ["Waser"], options).result.accuracy).toBe("incorrect");
    expect(gradeExerciseAttempt(item, ["wasser"], { ...options, capitalizationTolerance: true }).result.accuracy).toBe("incorrect");
    expect(gradeExerciseAttempt(item, ["Wasser"], options).result.accuracy).toBe("exact");
  });

  it.each([
    ["lernen", "lern"],
    ["das Haus", "Haus"],
    ["kein Haus", "Haus"],
    ["Ich habe keine Zeit.", "Ich keine Zeit."],
  ])("requires the grammatical form %s rather than %s", (target_answer, answer) => {
    const graded = gradeExerciseAttempt({ ...exercise, target_answer, accepted_answers: [] }, [answer], options);
    expect(graded.result.accuracy).toBe("incorrect");
    expect(graded.queueRetry).toBe(true);
    expect(graded.errorType).toBe("spelling");
  });

  it.each([
    ["Wasser", "Waser", "typo", "spelling"],
    ["Äpfel", "Apfel", "umlaut", "umlaut"],
    ["Straße", "Strasse", "sharp-s", "spelling"],
  ] as const)("permits a first-pass %s spelling slip, then requires correction", (target_answer, answer, reason, errorType) => {
    const item = { ...exercise, target_answer, accepted_answers: [] };
    const initial = gradeExerciseAttempt(item, [answer], options);
    expect(initial.result).toMatchObject({ accuracy: "almost", reason });
    expect(initial.queueRetry).toBe(true);
    const retry = gradeExerciseAttempt(item, [answer], options, true);
    expect(retry.result.accuracy).toBe("incorrect");
    expect(retry.errorType).toBe(errorType);
    expect(gradeExerciseAttempt(item, [target_answer], options, true).result.accuracy).toBe("exact");
  });

  it("keeps German case feedback non-blocking, including on reinforcement", () => {
    const item = { ...exercise, target_answer: "Wasser", accepted_answers: [] };
    for (const isRetry of [false, true]) {
      const graded = gradeExerciseAttempt(item, ["wasser"], options, isRetry);
      expect(graded.result).toMatchObject({ accuracy: "almost", reason: "case" });
      expect(graded.queueRetry).toBe(false);
      expect(graded.errorType).toBe("capitalization");
    }
    expect(gradeExerciseAttempt(item, ["wasser"], { ...options, capitalizationTolerance: true }).result.accuracy).toBe("exact");
  });

  it("honours lazy spelling during reinforcement without removing case boundaries", () => {
    const item = { ...exercise, target_answer: "Käse", accepted_answers: [] };
    const lazy = { ...options, umlautTolerance: true };
    expect(gradeExerciseAttempt(item, ["Kaese"], lazy, true).result.accuracy).toBe("exact");
    const lower = gradeExerciseAttempt(item, ["kaese"], lazy, true);
    expect(lower.result).toMatchObject({ accuracy: "almost", reason: "case" });
    expect(lower.queueRetry).toBe(false);
  });

  it("uses the passed language rather than ambient language for reverse cognates", () => {
    const item: ExerciseItem = { ...exercise, type: "reverse_cognate", target_answer: "water", accepted_answers: [] };
    expect(gradeExerciseAttempt(item, ["Water"], { ...options, languageId: "en" }).result.accuracy).toBe("exact");
  });

  it("keeps authored re-learning diagnosis and diagnoses word-order mistakes", () => {
    const diagnosis = { slip: "the verb is missing", cue: "Put habe after ich." };
    const authored = gradeExerciseAttempt({ ...exercise, diagnosis }, ["Ich keine Zeit"], options);
    expect(authored.diagnosis).toEqual(diagnosis);
    const reordered = gradeExerciseAttempt(exercise, ["Ich keine habe Zeit"], options);
    expect(reordered.result.accuracy).toBe("incorrect");
    expect(reordered.diagnosis?.slip).toBeTruthy();
    expect(reordered.queueRetry).toBe(true);
  });
});

describe("classic answer readings", () => {
  it("grades glued morphemes and leading article plus word pieces", () => {
    const tiles = ["das", "Wass", "-er"];
    const readings = classicAnswerReadings("morpheme_tiles", "das Wasser", "", [0, 1, 2], tiles, []);
    const graded = gradeExerciseAttempt({ ...exercise, type: "morpheme_tiles", target_answer: "das Wasser", accepted_answers: [] }, readings, options);
    expect(graded.result.accuracy).toBe("exact");
    expect(graded.answer).toBe("das Wasser");
    expect(classicAnswerReadings("morpheme_tiles", "Wasser", "", [1, 2], tiles, [])).toEqual(["Wasser"]);
  });

  it("preserves sentence order and never invents missing tiles", () => {
    const bank = ["Ich", "habe", "keine", "Zeit"];
    const correct = classicAnswerReadings("syntax_builder", exercise.target_answer, "", [0, 1, 2, 3], [], bank);
    expect(gradeExerciseAttempt(exercise, correct, options).result.accuracy).toBe("exact");
    const missing = classicAnswerReadings("syntax_builder", exercise.target_answer, "", [0, 2, 3], [], bank);
    expect(gradeExerciseAttempt(exercise, missing, options).result.accuracy).toBe("incorrect");
    expect(classicAnswerReadings("syntax_builder", exercise.target_answer, "", [], [], bank)).toEqual([""]);
    expect(classicAnswerReadings("matching_pairs", "", "", [], [], [])).toEqual([]);
  });
});
