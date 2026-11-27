"use client";

import { loadCurriculum } from "@/data/curriculum-client";
import { orderedTrailLessons } from "@/data/curriculum-core";
import { isValidLanguageId } from "@/data/languages";
import { useAppStore } from "@/lib/store";
import { flushSave } from "@/lib/store/persistence";

export interface UnlockAllLessonsResult {
  languageId: string;
  lessonCount: number;
  gateCount: number;
}

async function waitForStoreHydration(): Promise<void> {
  if (useAppStore.getState().storeHydrated) return;
  await new Promise<void>((resolve) => {
    const unsubscribe = useAppStore.subscribe((state) => {
      if (!state.storeHydrated) return;
      unsubscribe();
      resolve();
    });
  });
}

/** Development-only console helper: make every authored lesson replayable. */
export async function unlockAllLessons(): Promise<UnlockAllLessonsResult> {
  await waitForStoreHydration();

  const languageId = useAppStore.getState().activeLanguageId;
  if (!isValidLanguageId(languageId)) {
    throw new Error(`Cannot unlock lessons for unsupported language: ${languageId}`);
  }

  const curriculum = await loadCurriculum(languageId);
  if (useAppStore.getState().activeLanguageId !== languageId) {
    throw new Error("The active language changed while loading. Run unlockAllLessons() again.");
  }

  const lessonIds = [...new Set(
    orderedTrailLessons(curriculum.topics, curriculum.trailBranches)
      .filter((lesson) => lesson.authored)
      .map((lesson) => lesson.id)
  )];
  const gateIds = [...new Set(curriculum.trailGates.map((gate) => gate.id))];

  if (
    lessonIds.length === 0 ||
    lessonIds.length !== curriculum.lessonCount ||
    lessonIds.some((id) => !Number.isSafeInteger(id) || id <= 0) ||
    gateIds.some((id) => !Number.isSafeInteger(id) || id <= 0)
  ) {
    throw new Error(`The ${languageId} lesson catalog is empty or inconsistent.`);
  }

  // Use the normal progress actions so language slices, stars, persistence and
  // cross-tab merging keep their existing invariants. Preserve the resume point.
  const currentLessonId = useAppStore.getState().currentLessonId;
  for (const lessonId of lessonIds) {
    useAppStore.getState().completeLesson(lessonId, { nextLessonId: currentLessonId });
  }
  for (const gateId of gateIds) {
    useAppStore.getState().passGate(gateId);
  }
  flushSave();

  console.info(
    `[dev] Marked ${lessonIds.length} ${languageId} lessons complete and passed ${gateIds.length} checkpoints.`
  );
  return { languageId, lessonCount: lessonIds.length, gateCount: gateIds.length };
}
