import { describe, expect, it } from "vitest";
import { TOPICS } from "@/data/curriculum";
import { CANDO_GOALS, CEFR_BANDS, evaluateCanDoProgress } from "@/data/cando-goals";

describe("cando-goals", () => {
  it("maps every single one of the 30 core curriculum topics to a unique Can-do descriptor", () => {
    expect(CANDO_GOALS).toHaveLength(30);
    expect(TOPICS).toHaveLength(30);

    const ids = CANDO_GOALS.map((g) => g.topicId);
    expect(new Set(ids).size).toBe(30);
    for (const topic of TOPICS) {
      const goal = CANDO_GOALS.find((g) => g.topicId === topic.id);
      expect(goal).toBeDefined();
      expect(goal!.canDo.startsWith("I can ")).toBe(true);
      expect(goal!.examplePhrase.trim().length).toBeGreaterThan(3);
    }
  });

  it("covers all four CEFR bands (A1.1, A1.2, A2.1, A2.2)", () => {
    const bandIds = CEFR_BANDS.map((b) => b.id);
    expect(bandIds).toEqual(["A1.1", "A1.2", "A2.1", "A2.2"]);
    for (const band of CEFR_BANDS) {
      expect(CANDO_GOALS.some((g) => g.band === band.id)).toBe(true);
    }
  });

  it("ticks off goals automatically based on completedLessons and computes percentages", () => {
    const empty = evaluateCanDoProgress([]);
    expect(empty.completedCount).toBe(0);
    expect(empty.percent).toBe(0);
    expect(empty.currentBand).toBe("A1.1");

    // Complete all A1.1 core topics (1–8) plus an unrelated sprig (101)
    const partial = evaluateCanDoProgress([1, 2, 3, 4, 5, 6, 7, 8, 101]);
    expect(partial.completedCount).toBe(8);
    expect(partial.currentBand).toBe("A1.2");
    const a11 = partial.bands.find((b) => b.band.id === "A1.1")!;
    expect(a11.completedCount).toBe(a11.totalCount);
    expect(a11.percent).toBe(100);

    // Complete all 30 core topics
    const allDone = evaluateCanDoProgress(Array.from({ length: 30 }, (_, i) => i + 1));
    expect(allDone.completedCount).toBe(30);
    expect(allDone.percent).toBe(100);
    expect(allDone.currentBand).toBe("A2.2");
  });
});
