import { afterEach, describe, expect, it } from "vitest";
import { LANGUAGES } from "@/data/languages";
import { getPlacementQuestions, PLACEMENT_ITEM_COUNT, PLACEMENT_SECONDS, recommendPlacementTopic, suggestedReviewLimit } from "@/lib/placement";
import { estimateLessonEffort } from "@/lib/lesson-effort";
import { getTrailState } from "@/lib/trail-map";
import { useAppStore } from "@/lib/store";

const results = (correct: number, total = PLACEMENT_ITEM_COUNT) =>
  Array.from({ length: total }, (_, index) => index < correct);

describe("optional placement", () => {
  afterEach(() => {
    useAppStore.getState().setActiveLanguage("de");
    useAppStore.getState().resetProgress();
    useAppStore.getState().resetSettings();
  });

  it("supplies fifteen distinct mixed-pattern, answerable items spanning early, intermediate, and advanced phases for every available language", () => {
    expect(PLACEMENT_SECONDS).toBe(90);
    expect(PLACEMENT_ITEM_COUNT).toBe(15);

    for (const language of LANGUAGES.filter((item) => item.status === "available")) {
      const questions = getPlacementQuestions(language.id);
      expect(questions, language.id).toHaveLength(PLACEMENT_ITEM_COUNT);
      expect(new Set(questions.map((item) => item.pattern)).size, language.id).toBe(PLACEMENT_ITEM_COUNT);
      expect(new Set(questions.map((item) => item.prompt)).size, language.id).toBe(PLACEMENT_ITEM_COUNT);

      // Full-course coverage: early, intermediate, and advanced phases up through Topic 28–29
      expect(new Set(questions.map((item) => item.phase)), language.id).toEqual(
        new Set(["early", "intermediate", "advanced"])
      );
      expect(Math.max(...questions.map((item) => item.topic)), language.id).toBeGreaterThanOrEqual(28);
      expect(Math.min(...questions.map((item) => item.topic)), language.id).toBe(1);

      for (const question of questions) {
        expect(new Set(question.options).size).toBe(3);
        expect(question.options.filter((option) => option === question.answer)).toHaveLength(1);
      }

      // Shuffled answer indices: never always index 1 (or any single index), and all 3 positions appear
      const answerIndices = questions.map((item) => item.options.indexOf(item.answer));
      expect(new Set(answerIndices).size, language.id).toBe(3);
      expect(answerIndices.every((idx) => idx === 1), language.id).toBe(false);

      if (language.id !== "de") {
        expect(JSON.stringify(questions)).not.toMatch(/German|Wasser|wohne|Ich kann/);
      }
    }

    expect(getPlacementQuestions("unknown")).toEqual([]);
  });

  it("shuffles answer option positions per session seed without losing options or answers", () => {
    const base = getPlacementQuestions("de");
    const sessionA = getPlacementQuestions("de", 101);
    const sessionB = getPlacementQuestions("de", 202);

    const indicesBase = base.map((q) => q.options.indexOf(q.answer));
    const indicesA = sessionA.map((q) => q.options.indexOf(q.answer));
    const indicesB = sessionB.map((q) => q.options.indexOf(q.answer));

    expect(indicesA).not.toEqual(indicesBase);
    expect(indicesB).not.toEqual(indicesA);

    for (let i = 0; i < base.length; i++) {
      expect(sessionA[i].prompt).toBe(base[i].prompt);
      expect(sessionA[i].answer).toBe(base[i].answer);
      expect([...sessionA[i].options].sort()).toEqual([...base[i].options].sort());
    }
  });

  it("keeps sparse, skipped, random-guessing, and low early-band attempts at Topic 1", () => {
    expect(recommendPlacementTopic([])).toBe(1);
    expect(recommendPlacementTopic(results(7, 7))).toBe(1);
    expect(recommendPlacementTopic(results(0))).toBe(1);
    expect(recommendPlacementTopic(results(3))).toBe(1);
    // Failing early band (3/5) stays at Topic 1 even if later guesses land lucky
    expect(
      recommendPlacementTopic([
        true, true, true, false, false,
        true, true, true, true, true,
        true, true, true, true, true,
      ])
    ).toBe(1);
    // Passing early (5/5) but failing intermediate (3/5) never places into advanced
    expect(
      recommendPlacementTopic([
        true, true, true, true, true,
        true, true, true, false, false,
        true, true, true, true, true,
      ])
    ).toBeLessThanOrEqual(10);
  });

  it("places learners across the full course by band up through the advanced phase", () => {
    expect(recommendPlacementTopic(results(4))).toBe(4);
    expect(recommendPlacementTopic(results(5))).toBe(4);
    expect(recommendPlacementTopic(results(6))).toBe(4);
    expect(recommendPlacementTopic(results(7))).toBe(8);
    expect(recommendPlacementTopic(results(8))).toBe(10);
    expect(recommendPlacementTopic(results(9))).toBe(14);
    expect(recommendPlacementTopic(results(10))).toBe(14);
    expect(recommendPlacementTopic(results(11))).toBe(16);
    expect(recommendPlacementTopic(results(12))).toBe(20);
    expect(recommendPlacementTopic(results(13))).toBe(23);
    expect(recommendPlacementTopic(results(14))).toBe(26);
    expect(recommendPlacementTopic(results(15))).toBe(28);
    expect(recommendPlacementTopic(results(15))).toBeGreaterThanOrEqual(25);

    const attempt = Object.freeze(results(12));
    recommendPlacementTopic(attempt);
    expect(attempt).toEqual(results(12));
  });

  it("actually unlocks prior lessons and gates up through the placed starting topic", () => {
    // Baseline: without placement, Topic 12 and Topic 28 are locked
    const baseline = getTrailState([], {});
    expect(baseline.nodes.get(12)?.status).toBe("locked");
    expect(baseline.nodes.get(28)?.status).toBe("locked");
    expect(baseline.recommendedId).toBe(1);

    // Mid-course placement (Topic 12): Topics 1..11, Gates after 7 & 10, and Topic 12 core are unlocked
    const mid = getTrailState([], {}, undefined, undefined, [], { placedAtTopic: 12 });
    for (let topic = 1; topic <= 12; topic++) {
      expect(mid.nodes.get(topic)?.status, `topic ${topic}`).toBe("available");
    }
    expect(mid.nodes.get(13)?.status).toBe("locked");
    expect(mid.gates.get(1)?.open).toBe(true);
    expect(mid.gates.get(2)?.open).toBe(true);
    expect(mid.gates.get(3)?.open).toBe(false);
    expect(mid.recommendedId).toBe(12);
    expect(mid.forwardId).toBe(12);

    // High placement score (15/15 -> Topic 28): unlocks all prior topics and gates 1–5
    const placedTopic = recommendPlacementTopic(results(15));
    const advanced = getTrailState([], {}, undefined, undefined, [], { placedAtTopic: placedTopic });
    expect(advanced.nodes.get(placedTopic)?.status).toBe("available");
    expect(advanced.nodes.get(placedTopic + 1)?.status).toBe("locked");
    for (const gateId of [1, 2, 3, 4, 5]) {
      expect(advanced.gates.get(gateId)?.open, `gate ${gateId}`).toBe(true);
    }
    expect(advanced.gates.get(6)?.open).toBe(false);
    expect(advanced.recommendedId).toBe(placedTopic);
  });

  it("persists placedAtTopic per language in the store and unlocks the trail without faking completions", () => {
    const store = useAppStore.getState();
    const targetTopic = recommendPlacementTopic(results(15));

    store.setPlacedAtTopic(targetTopic);
    const afterDe = useAppStore.getState();
    expect(afterDe.placedAtTopic).toBe(targetTopic);
    expect(afterDe.settings.placementTopic).toBe(targetTopic);
    expect(afterDe.completedLessons).toEqual([]);

    const trailAfterPlacement = getTrailState(
      afterDe.completedLessons,
      afterDe.lessonStars,
      undefined,
      undefined,
      afterDe.passedGateIds,
      { placedAtTopic: afterDe.placedAtTopic }
    );
    expect(trailAfterPlacement.nodes.get(targetTopic)?.status).toBe("available");
    expect(trailAfterPlacement.recommendedId).toBe(targetTopic);

    // Switching languages isolates placement per language
    store.setActiveLanguage("fr");
    expect(useAppStore.getState().placedAtTopic).toBe(1);
    store.setActiveLanguage("de");
    expect(useAppStore.getState().placedAtTopic).toBe(targetTopic);

    // Resetting progress resets placement unlock back to Topic 1
    store.resetProgress();
    expect(useAppStore.getState().placedAtTopic).toBe(1);
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
