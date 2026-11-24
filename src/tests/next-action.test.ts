import { describe, it, expect, beforeEach } from "vitest";
import { resolveNextAction } from "@/lib/next-action";
import {
  dismissStorageCorruption,
  getQuarantinedStoragePayload,
  getStorageHealth,
  QUARANTINED_STORAGE_KEY,
} from "@/lib/storage-health";
import { loadSavedState } from "@/lib/store/persistence";
import { STORAGE_KEY } from "@/lib/storage-keys";
import LESSON_3 from "@/data/lessons/3";
import LESSON_302 from "@/data/lessons/302";
import LESSON_601 from "@/data/lessons/601";
import LESSON_701 from "@/data/lessons/701";
import LESSON_5081 from "@/data/lessons/5081";
import LESSON_5101 from "@/data/lessons/5101";
import LESSON_5111 from "@/data/lessons/5111";
import type { SRSCard } from "@/lib/types";

function makeDueCard(id: string, dueDate: string, reviewedOn?: string): SRSCard {
  return {
    word_id: id,
    interval: 1,
    repetitions: 1,
    ease_factor: 2.5,
    due_date: dueDate,
    lapses: 0,
    last_reviewed: reviewedOn ? `${reviewedOn}T10:00:00` : null,
  };
}

describe("resolveNextAction (#18 unified What's next engine)", () => {
  const today = "2026-11-24";
  const baseLesson = { id: 2, title: "Topic 2: Modal Verbs" };

  it("prioritizes an in-progress lesson (including retries) over due reviews", () => {
    const srsCards: Record<string, SRSCard> = {};
    for (let i = 1; i <= 8; i++) srsCards[`w${i}`] = makeDueCard(`w${i}`, today);

    const rec = resolveNextAction({
      nextLesson: baseLesson,
      completedCount: 1,
      lessonProgress: {
        2: {
          segment: "practice",
          practiceIndex: 3,
          completedSegments: ["hook", "pattern", "table"],
          inRetryPhase: true,
          retryExerciseIds: ["l2_e3"],
        },
      },
      missedIds: [],
      requiredIds: new Set(),
      srsCards,
      dailyMinutes: 10,
      today,
    });

    expect(rec?.kind).toBe("resume");
    expect(rec?.eyebrow).toBe("Finish retries");
    expect(rec?.actionLabel).toBe("Resume");
    expect(rec?.secondary?.kind).toBe("review");
    expect(rec?.secondary?.label).toBe("Review (8)");
  });

  it("recommends due review when due cards >= threshold and daily cap is not reached", () => {
    const srsCards: Record<string, SRSCard> = {};
    for (let i = 1; i <= 6; i++) srsCards[`w${i}`] = makeDueCard(`w${i}`, today);

    const rec = resolveNextAction({
      nextLesson: baseLesson,
      completedCount: 1,
      lessonProgress: {},
      missedIds: [],
      requiredIds: new Set(),
      srsCards,
      dailyMinutes: 10,
      today,
    });

    expect(rec?.kind).toBe("review");
    expect(rec?.actionLabel).toBe("Review");
    expect(rec?.title).toBe("6 cards ready for review");
    expect(rec?.secondary?.kind).toBe("lesson");
    expect(rec?.secondary?.label).toBe("Skip to lesson");
    expect(rec?.secondary?.lessonId).toBe(2);
  });

  it("falls back to the next trail lesson once the daily review cap is reached", () => {
    // 5 dailyMinutes -> dailyCap = 15
    const srsCards: Record<string, SRSCard> = {};
    for (let i = 1; i <= 15; i++) srsCards[`done_${i}`] = makeDueCard(`done_${i}`, "2026-11-30", today);
    for (let i = 1; i <= 7; i++) srsCards[`due_${i}`] = makeDueCard(`due_${i}`, today);

    const rec = resolveNextAction({
      nextLesson: baseLesson,
      completedCount: 2,
      lessonProgress: {},
      missedIds: [],
      requiredIds: new Set(),
      srsCards,
      dailyMinutes: 5,
      today,
    });

    expect(rec?.kind).toBe("lesson");
    expect(rec?.dailyCapReached).toBe(true);
    expect(rec?.eyebrow).toBe("Daily review goal met · Up next");
    expect(rec?.actionLabel).toBe("Continue");
  });

  it("surfaces unlocked checkpoint gates when no next lesson is available", () => {
    const rec = resolveNextAction({
      nextLesson: null,
      checkpoint: { id: 1, title: "Stretch 1 Checkpoint" },
      completedCount: 5,
      lessonProgress: {},
      missedIds: [],
      requiredIds: new Set(),
      srsCards: {},
      dailyMinutes: 10,
      today,
    });

    expect(rec?.kind).toBe("checkpoint");
    expect(rec?.actionLabel).toBe("Open checkpoint");
    expect(rec?.gateId).toBe(1);
  });

  it("shows below-threshold due cards or unresolved mistakes as quiet secondary pills", () => {
    const srsCards: Record<string, SRSCard> = {
      w1: makeDueCard("w1", today),
      w2: makeDueCard("w2", today),
    };

    const withSmallReview = resolveNextAction({
      nextLesson: baseLesson,
      completedCount: 1,
      lessonProgress: {},
      missedIds: [],
      requiredIds: new Set(),
      srsCards,
      dailyMinutes: 10,
      today,
    });
    expect(withSmallReview?.kind).toBe("lesson");
    expect(withSmallReview?.secondary?.kind).toBe("review");
    expect(withSmallReview?.secondary?.label).toBe("Review (2)");

    const withMistakes = resolveNextAction({
      nextLesson: baseLesson,
      completedCount: 1,
      lessonProgress: {},
      missedIds: [],
      requiredIds: new Set(),
      srsCards: {},
      dailyMinutes: 10,
      mistakeCount: 6,
      today,
    });
    expect(withMistakes?.kind).toBe("lesson");
    expect(withMistakes?.secondary?.kind).toBe("mistakes");
    expect(withMistakes?.secondary?.label).toBe("Mistakes (6)");
  });
});

describe("corrupt storage detection and quarantine", () => {
  beforeEach(() => {
    dismissStorageCorruption();
    if (typeof localStorage !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(QUARANTINED_STORAGE_KEY);
    }
  });

  it("quarantines malformed JSON in localStorage instead of silently ignoring it", () => {
    const store = new Map<string, string>([[STORAGE_KEY, "{broken-json"]]);
    const origWindow = globalThis.window;
    const origLocalStorage = globalThis.localStorage;
    Object.defineProperty(globalThis, "window", { value: globalThis, configurable: true });
    Object.defineProperty(globalThis, "localStorage", {
      value: {
        getItem: (k: string) => store.get(k) ?? null,
        setItem: (k: string, v: string) => { store.set(k, v); },
        removeItem: (k: string) => { store.delete(k); },
      },
      configurable: true,
    });
    try {
      const loaded = loadSavedState();
      expect(loaded).toEqual({});
      expect(getStorageHealth()).toBe("corrupt");
      expect(getQuarantinedStoragePayload()).toBe("{broken-json");
      expect(store.get(QUARANTINED_STORAGE_KEY)).toBe("{broken-json");

      dismissStorageCorruption();
      expect(getStorageHealth()).toBe("ok");
      expect(getQuarantinedStoragePayload()).toBeNull();
    } finally {
      Object.defineProperty(globalThis, "window", { value: origWindow, configurable: true });
      Object.defineProperty(globalThis, "localStorage", { value: origLocalStorage, configurable: true });
    }
  });
});

describe("German content correctness regressions", () => {
  it("teaches and expects proper clause commas in transcribe lessons 3, 302, and 5101", () => {
    const l3e5 = LESSON_3.exercises.find((e) => e.id === "l3_e5");
    expect(l3e5?.target_answer).toBe("Ich hoffe, du hast Lust");

    const l302e5 = LESSON_302.exercises.find((e) => e.id === "l302_e5");
    expect(l302e5?.target_answer).toBe("Ich hoffe, du schläfst");

    const l5101e5 = LESSON_5101.exercises.find((e) => e.id === "l5101_e5");
    expect(l5101e5?.target_answer).toBe("Der Mann, der Deutsch lernt, trinkt Kaffee");
    expect(LESSON_5081.exercises.find((e) => e.id === "l5081_e5")?.affirmation).toContain("hätte, wäre");
    expect(LESSON_5111.exercises.find((e) => e.id === "l5111_e5")?.affirmation).toContain("regnet, lese");
  });

  it("avoids false mental models in lessons 302, 601, and 701", () => {
    const l302e4 = LESSON_302.exercises.find((e) => e.id === "l302_e4");
    expect(l302e4?.target_answer).toBe("treffen");
    expect(l302e4?.explanation).not.toContain("drape");

    const l601e5 = LESSON_601.exercises.find((e) => e.id === "l601_e5");
    expect(l601e5?.cues?.join(" ")).toContain("findet");
    expect(l601e5?.cues?.join(" ")).not.toContain('anchor "Zunge" in position 2');

    expect(LESSON_701.pattern.content).not.toContain("Dampf: D → T");
  });
});
