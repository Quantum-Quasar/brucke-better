import { describe, expect, it } from "vitest";
import { LANGUAGES } from "@/data/languages";
import { getPlacementQuestions, PLACEMENT_ITEM_COUNT, PLACEMENT_SECONDS, recommendPlacementTopic, suggestedReviewLimit } from "@/lib/placement";
import { estimateLessonEffort } from "@/lib/lesson-effort";

const results = (correct: number, total = 10) => Array.from({ length: total }, (_, index) => index < correct);

describe("optional placement", () => {
  it("supplies ten distinct mixed-pattern, answerable items for every available language", () => {
    expect(PLACEMENT_SECONDS).toBe(60);
    for (const language of LANGUAGES.filter((item) => item.status === "available")) {
      const questions = getPlacementQuestions(language.id);
      expect(questions, language.id).toHaveLength(PLACEMENT_ITEM_COUNT);
      expect(new Set(questions.map((item) => item.pattern)).size).toBe(10);
      expect(new Set(questions.map((item) => item.prompt)).size).toBe(10);
      for (const question of questions) {
        expect(new Set(question.options).size).toBe(3);
        expect(question.options.filter((option) => option === question.answer)).toHaveLength(1);
      }
      expect(new Set(questions.map((item) => item.options.indexOf(item.answer))).size).toBe(3);
      if (language.id !== "de") {
        expect(JSON.stringify(questions)).not.toMatch(/German|Wasser|wohne|Ich kann/);
      }
    }
    expect(getPlacementQuestions("unknown")).toEqual([]);
  });

  it("keeps sparse, skipped and low-recognition attempts at the start", () => {
    expect(recommendPlacementTopic([])).toBe(1);
    expect(recommendPlacementTopic(results(7, 7))).toBe(1);
    expect(recommendPlacementTopic(results(0))).toBe(1);
    expect(recommendPlacementTopic(results(5))).toBe(1);
  });

  it("makes conservative suggestions at explicit recognition thresholds", () => {
    expect(recommendPlacementTopic(results(6))).toBe(2);
    expect(recommendPlacementTopic(results(7))).toBe(2);
    expect(recommendPlacementTopic(results(8))).toBe(3);
    expect(recommendPlacementTopic(results(9))).toBe(3);
    expect(recommendPlacementTopic(results(10))).toBe(5);
    const attempt = Object.freeze(results(8));
    recommendPlacementTopic(attempt);
    expect(attempt).toEqual(results(8));
  });

  it("maps daily time budgets to a suggested, bounded review session", () => {
    expect([5, 10, 20, 30].map((minutes) => suggestedReviewLimit(minutes as 5 | 10 | 20 | 30))).toEqual([5, 10, 20, 20]);
  });
});

describe("lesson effort estimate", () => {
  it("reports the actual exercise count and reading plus exercise time, not a fixed short promise", () => {
    expect(estimateLessonEffort(0)).toEqual({ exerciseCount: 0, minutes: 2 });
    expect(estimateLessonEffort(1)).toEqual({ exerciseCount: 1, minutes: 3 });
    expect(estimateLessonEffort(12)).toEqual({ exerciseCount: 12, minutes: 6 });
    expect(estimateLessonEffort(60)).toEqual({ exerciseCount: 60, minutes: 22 });
    expect(estimateLessonEffort(61).minutes).toBeGreaterThan(estimateLessonEffort(60).minutes);
  });
});
