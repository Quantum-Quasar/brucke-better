import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { loadCurriculum } from "../data/curriculum-client";
import { orderedTrailLessons } from "../data/curriculum-core";
import { DEFAULT_LANGUAGE_ID } from "../data/languages";
import { useAppStore } from "../lib/store";
import { getTrailState, type TrailData } from "../lib/trail-map";
import { unlockAllLessons } from "../lib/dev-lesson-access";
import { STORAGE_KEY } from "../lib/storage-keys";
import { LocalStorageMock } from "./storage-fixture";

const COURSES = ["de", "fr", "es", "nl"] as const;

function trailData(curriculum: Awaited<ReturnType<typeof loadCurriculum>>): TrailData {
  return {
    topics: curriculum.topics,
    branches: curriculum.trailBranches,
    gates: curriculum.trailGates,
    totalTopics: curriculum.totalTopics,
    epilogueTitle: curriculum.epilogueTitle,
  };
}

describe("developer lesson access", () => {
  beforeAll(() => {
    vi.stubGlobal("window", globalThis);
    vi.stubGlobal("localStorage", new LocalStorageMock());
    vi.stubGlobal("document", { cookie: "" });
  });

  afterAll(() => {
    vi.unstubAllGlobals();
  });

  beforeEach(() => {
    localStorage.clear();
    document.cookie = "";
    useAppStore.getState().resetProgress();
    useAppStore.getState().setActiveLanguage(DEFAULT_LANGUAGE_ID);
    useAppStore.setState({ storeHydrated: true });
    localStorage.clear();
    document.cookie = "";
  });

  it.each(COURSES)("makes every authored %s lesson and checkpoint playable", async (languageId) => {
    useAppStore.getState().setActiveLanguage(languageId);
    useAppStore.getState().resetProgress();

    const result = await unlockAllLessons();
    const curriculum = await loadCurriculum(languageId);
    const lessons = orderedTrailLessons(curriculum.topics, curriculum.trailBranches)
      .filter((lesson) => lesson.authored);
    const lessonIds = lessons.map((lesson) => lesson.id);
    const gateIds = curriculum.trailGates.map((gate) => gate.id);
    const state = useAppStore.getState();

    expect(result).toEqual({ languageId, lessonCount: lessons.length, gateCount: gateIds.length });
    expect(new Set(state.completedLessons)).toEqual(new Set(lessonIds));
    expect(state.passedGateIds).toEqual(gateIds);

    const trail = getTrailState(
      state.completedLessons,
      state.lessonStars,
      undefined,
      trailData(curriculum),
      state.passedGateIds
    );
    for (const lesson of lessons) {
      expect(trail.nodes.get(lesson.id)?.status, `lesson ${lesson.id}`).toBe("completed");
    }
    for (const gateId of gateIds) {
      expect(trail.gates.get(gateId)?.open, `gate ${gateId}`).toBe(true);
    }
    expect(trail.recommendedId).toBeNull();

    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY)!);
    expect(new Set(saved.progressByLanguage[languageId].completedLessons)).toEqual(new Set(lessonIds));
    expect(saved.progressByLanguage[languageId].passedGateIds).toEqual(gateIds);
  });

  it("is idempotent, preserves the resume point and leaves other courses untouched", async () => {
    useAppStore.getState().setActiveLanguage("fr");
    useAppStore.getState().resetProgress();
    useAppStore.getState().setActiveLanguage("de");
    useAppStore.getState().completeLesson(1);
    useAppStore.getState().setActiveLanguage("fr");
    useAppStore.getState().completeLesson(5);
    const resumeLessonId = useAppStore.getState().currentLessonId;

    await unlockAllLessons();
    const completed = [...useAppStore.getState().completedLessons];
    const gates = [...useAppStore.getState().passedGateIds];
    await unlockAllLessons();

    expect(useAppStore.getState().completedLessons).toEqual(completed);
    expect(useAppStore.getState().passedGateIds).toEqual(gates);
    expect(useAppStore.getState().currentLessonId).toBe(resumeLessonId);

    useAppStore.getState().setActiveLanguage("de");
    expect(useAppStore.getState().completedLessons).toEqual([1]);
    expect(useAppStore.getState().passedGateIds).toEqual([]);
  });

  it("waits for persisted progress to hydrate before applying changes", async () => {
    useAppStore.setState({ storeHydrated: false });
    const pending = unlockAllLessons();
    useAppStore.setState({ storeHydrated: true });
    const curriculum = await loadCurriculum(DEFAULT_LANGUAGE_ID);

    await expect(pending).resolves.toEqual({
      languageId: DEFAULT_LANGUAGE_ID,
      lessonCount: curriculum.lessonCount,
      gateCount: curriculum.trailGates.length,
    });
  });
});
