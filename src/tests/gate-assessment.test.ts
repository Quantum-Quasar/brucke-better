import { describe, expect, it } from "vitest";
import { LESSONS } from "@/data/lessons";
import { FR_LESSONS } from "@/data/french/lessons-fr";
import { ES_LESSONS } from "@/data/spanish/lessons-es";
import { NL_LESSONS } from "@/data/dutch/lessons-nl";
import {
  assembleGateQuestions,
  getMissedGateLessons,
  hasPassedGateAssessment,
  scoreGateAnswers,
  selectGateQuestion,
} from "@/lib/gate-assessment";
import type { ExerciseItem } from "@/lib/types";

const exercise = (data: Partial<ExerciseItem>): ExerciseItem => ({
  id: "test", type: "shift_select", prompt: "Choose", target_answer: "yes", ...data,
});

describe("gate assessment", () => {
  it("uses an authored choice rather than an ambiguous free-production answer", () => {
    const question = selectGateQuestion("Modal verbs", 2, [
      exercise({ type: "transcribe", idea: "you can come tomorrow", target_answer: "Ich kann morgen kommen" }),
      exercise({ options: ["yes", "no"] }),
    ]);
    expect(question?.prompt).toBe("Choose");
    expect(question?.options).toContain("yes");
    expect(question?.lessonId).toBe(2);
  });

  it("includes the original sentence for literal glosses and rejects exposed answers", () => {
    const question = selectGateQuestion("Gloss", 1, [
      exercise({ type: "literal_gloss", prompt: "Which English follows the French?", german: "Je veux partir", options: ["I want leave", "I want to leave"], target_answer: "I want leave" }),
    ]);
    expect(question?.prompt).toContain("Je veux partir");
    expect(selectGateQuestion("Bad", 1, [exercise({ prompt: "The answer is yes", options: ["yes", "no"] })])).toBeNull();
  });

  it("falls back to real matching pairs and refuses missing choices", () => {
    const question = selectGateQuestion("Pairs", 1, [exercise({ type: "matching_pairs", matching_pairs: [
      { id: "a", english: "house", german: "Haus" },
      { id: "b", english: "book", german: "Buch" },
    ] })]);
    expect(question?.prompt).toContain("house");
    expect(question?.options).toEqual(expect.arrayContaining(["Haus", "Buch"]));
    expect(selectGateQuestion("Missing", 1, [exercise({ options: ["no"] })])).toBeNull();
  });

  it("grades every answer and passes only at the 80 percent boundary", () => {
    const question = selectGateQuestion("Choice", 1, [exercise({ options: ["yes", "no"] })])!;
    const results = scoreGateAnswers(Array(5).fill(question), ["yes", "no", "yes", "yes", "yes"]);
    expect(results).toEqual([true, false, true, true, true]);
    expect(hasPassedGateAssessment(results)).toBe(true);
    expect(hasPassedGateAssessment([true, true, true, false, false])).toBe(false);
    expect(hasPassedGateAssessment([])).toBe(false);
  });

  it("prefers clean production items and varies exercise types when assembling a gate", () => {
    const questions = assembleGateQuestions([
      {
        id: 3,
        title: "The P -> F Shift",
        exercises: [
          exercise({ id: "e1", type: "shift_select", prompt: "Pick one", options: ["Schiff", "Boot"], target_answer: "Schiff" }),
          exercise({ id: "e2", type: "derive", prompt: "Shift 'ship' into German:", target_answer: "Schiff" }),
        ],
      },
      {
        id: 4,
        title: "The Dental Hardening",
        exercises: [
          exercise({ id: "e3", type: "derive", prompt: "Shift 'thank' into German:", target_answer: "danken" }),
          exercise({ id: "e4", type: "shift_select", prompt: "Which matches 'three'?", options: ["drei", "frei"], target_answer: "drei" }),
        ],
      },
    ]);

    expect(questions).toHaveLength(2);
    expect(questions[0].mode).toBe("typed");
    expect(questions[0].sourceType).toBe("derive");
    expect(questions[1].sourceType).toBe("shift_select");
    expect(scoreGateAnswers(questions, ["  schiff. ", "drei"])).toEqual([true, true]);
  });

  it("maps missed gate questions back to up to 3 exact source lessons for remediation", () => {
    const q1 = selectGateQuestion("The P -> F Shift", 3, [exercise({ options: ["Schiff", "Boot"], target_answer: "Schiff" })])!;
    const q2 = selectGateQuestion("The Dental Hardening", 4, [exercise({ options: ["danken", "tanken"], target_answer: "danken" })])!;
    const q3 = selectGateQuestion("The Sibilant Shift", 5, [exercise({ options: ["Wasser", "Wetter"], target_answer: "Wasser" })])!;
    const q4 = selectGateQuestion("The Velar Shift", 6, [exercise({ options: ["Buch", "Bauch"], target_answer: "Buch" })])!;

    const missed = getMissedGateLessons(
      [q1, q2, q3, q4, q2],
      [false, false, true, false, false],
      3,
    );

    expect(missed).toEqual([
      { lessonId: 4, title: "The Dental Hardening", missedCount: 2 },
      { lessonId: 3, title: "The P -> F Shift", missedCount: 1 },
      { lessonId: 6, title: "The Velar Shift", missedCount: 1 },
    ]);
  });

  it("can select a supported question for every course core and German spine story", () => {
    for (const lessons of [LESSONS, FR_LESSONS, ES_LESSONS, NL_LESSONS]) {
      for (const lesson of lessons.filter((item) => (item.id >= 1 && item.id <= 30) || item.spineStory)) {
        expect(selectGateQuestion(lesson.title, lesson.id, lesson.exercises), `${lesson.id}: ${lesson.title}`).not.toBeNull();
      }
    }
  });

  it("never leaks english_hint on typed gate questions and grades diacritics/ß/accepted_answers leniently", () => {
    const question = selectGateQuestion(
      "The Dental Hardening",
      4,
      [
        exercise({
          id: "l4_e4",
          type: "derive",
          prompt: "Apply TH -> D: 'door' -> German noun:",
          english_hint: "th·ink -> d·enk·en",
          target_answer: "Tür",
          accepted_answers: ["die Tür", "Tuer"],
        }),
      ],
      { preferProduction: true },
    )!;

    expect(question).not.toBeNull();
    expect(question.mode).toBe("typed");
    expect(question.hint).toBeUndefined();
    expect(question.acceptedAnswers).toEqual(["die Tür", "Tuer"]);

    // Diacritic omission and accepted_answers both pass
    expect(scoreGateAnswers([question], ["Tur"])).toEqual([true]);
    expect(scoreGateAnswers([question], ["die Tür"])).toEqual([true]);
    expect(scoreGateAnswers([question], ["Tuer"])).toEqual([true]);
    expect(scoreGateAnswers([question], ["Hund"])).toEqual([false]);

    // ß <-> ss tolerance on typed gate answers
    const sharpS = selectGateQuestion(
      "Sibilant Shift",
      5,
      [exercise({ id: "l5_e4", type: "derive", prompt: "German for 'big':", target_answer: "groß" })],
      { preferProduction: true },
    )!;
    expect(scoreGateAnswers([sharpS], ["gross"])).toEqual([true]);
  });

  it("passes active languageId and enables German V2/register/contractions only for German", () => {
    const deQuestion = selectGateQuestion(
      "Word Order",
      10,
      [exercise({ id: "g_de", type: "derive", prompt: "German for 'I drink coffee':", target_answer: "Ich trinke Kaffee" })],
      { preferProduction: true },
    )!;
    expect(scoreGateAnswers([deQuestion], ["Kaffee trinke ich"], "de")).toEqual([true]);

    const deRegQuestion = selectGateQuestion(
      "Register",
      11,
      [exercise({ id: "g_reg", type: "derive", prompt: "German for 'Are you ready?':", target_answer: "Bist du bereit" })],
      { preferProduction: true },
    )!;
    expect(scoreGateAnswers([deRegQuestion], ["Sind Sie bereit"], "de")).toEqual([true]);

    const frQuestion = selectGateQuestion(
      "French Cognates",
      1,
      [exercise({ id: "g_fr", type: "derive", prompt: "French for 'house':", target_answer: "maison" })],
      { preferProduction: true },
    )!;
    expect(scoreGateAnswers([frQuestion], ["maison"], "fr")).toEqual([true]);
  });
});
