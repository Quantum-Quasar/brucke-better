import { describe, expect, it } from "vitest";
import { LESSONS } from "@/data/lessons";
import { FR_LESSONS } from "@/data/french/lessons-fr";
import { ES_LESSONS } from "@/data/spanish/lessons-es";
import { NL_LESSONS } from "@/data/dutch/lessons-nl";
import { hasPassedGateAssessment, scoreGateAnswers, selectGateQuestion } from "@/lib/gate-assessment";
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

  it("can select a supported question for every course core and German spine story", () => {
    for (const lessons of [LESSONS, FR_LESSONS, ES_LESSONS, NL_LESSONS]) {
      for (const lesson of lessons.filter((item) => (item.id >= 1 && item.id <= 30) || item.spineStory)) {
        expect(selectGateQuestion(lesson.title, lesson.id, lesson.exercises), `${lesson.id}: ${lesson.title}`).not.toBeNull();
      }
    }
  });
});
