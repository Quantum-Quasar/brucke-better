"use client";

import { useEffect, useRef, type Dispatch, type SetStateAction } from "react";
import { useAppStore } from "@/lib/store";
import type { ExerciseItem, Lesson, LessonProgress, LessonSegment } from "@/lib/types";
import type { LessonSession } from "./lesson-session-types";

export function restoreRetries(lesson: Lesson, progress?: LessonProgress): ExerciseItem[] {
  const exercises = new Map(lesson.exercises.map((exercise) => [exercise.id, exercise]));
  return (progress?.retryExerciseIds ?? []).map((id) => exercises.get(id))
    .filter((exercise): exercise is ExerciseItem => exercise !== undefined);
}
type Setter<T> = Dispatch<SetStateAction<T>>;
type LessonProgressOptions = Pick<LessonSession, "lesson" | "preview" | "currentSegment" | "practiceIndex" | "completedSegments" | "everQueued" | "retryQueue" | "inRetryPhase" | "retryIndex" | "setCurrentSegment" | "setPracticeIndex" | "setEverQueued" | "setInRetryPhase" | "setRetryIndex"> & {
  languageId?: string;
  storeLanguageId: string;
  setCompletedSegments: Setter<LessonSegment[]>;
  setRetryQueue: Setter<ExerciseItem[]>;
  setIsLessonFinished: Setter<boolean>;
};
export function useLessonProgress(options: LessonProgressOptions) {
  const { lesson, preview, languageId, storeLanguageId, currentSegment, practiceIndex, completedSegments, everQueued, retryQueue, inRetryPhase, retryIndex, setCurrentSegment, setPracticeIndex, setCompletedSegments, setEverQueued, setRetryQueue, setInRetryPhase, setRetryIndex, setIsLessonFinished } = options;
  const storeHydrated = useAppStore((state) => state.storeHydrated);
  const hydrateEpoch = useAppStore((state) => state.hydrateEpoch);
  const setLessonProgress = useAppStore((state) => state.setLessonProgress);
  const adoptedEpochRef = useRef(-1);
  useEffect(() => {
    // The store starts from defaults and applies localStorage only after mount,
    // and child effects run before the root layout's hydration effect (Strict
    // Mode even re-runs them after it). So on a reload this effect first sees
    // the initial "hook" position. Before persisting that over the saved state,
    // adopt the position the store just restored; only then write. The epoch
    // also makes an open lesson adopt a cross-tab save instead of overwriting it.
    if (preview || (languageId && storeLanguageId !== languageId)) return;
    if (!storeHydrated) return;
    if (adoptedEpochRef.current !== hydrateEpoch) {
      const isRehydration = adoptedEpochRef.current !== -1;
      adoptedEpochRef.current = hydrateEpoch;
      const persisted = useAppStore.getState().lessonProgress[lesson.id];
      if (persisted) {
        const restoredQueue = restoreRetries(lesson, persisted);
        const restoredRetryPhase = Boolean(persisted.inRetryPhase && restoredQueue.length);
        const restoredRetryIndex = Math.min(persisted.retryIndex ?? 0, Math.max(0, restoredQueue.length - 1));
        const samePosition =
          persisted.segment === currentSegment &&
          persisted.practiceIndex === practiceIndex &&
          persisted.completedSegments.join("|") === completedSegments.join("|") &&
          (persisted.everQueued ?? false) === everQueued &&
          restoredRetryPhase === inRetryPhase &&
          restoredRetryIndex === retryIndex &&
          restoredQueue.length === retryQueue.length &&
          restoredQueue.every((exercise, index) => exercise.id === retryQueue[index].id);
        if (!samePosition) {
          setCurrentSegment(persisted.segment);
          setPracticeIndex(persisted.practiceIndex);
          setCompletedSegments(persisted.completedSegments);
          setEverQueued(persisted.everQueued ?? false);
          setRetryQueue(restoredQueue);
          setInRetryPhase(restoredRetryPhase);
          setRetryIndex(restoredRetryIndex);
          return;
        }
      } else if (isRehydration) {
        // Another tab reset/imported progress and this lesson's entry is gone:
        // restart it rather than immediately writing the stale local position back.
        setCurrentSegment("hook");
        setPracticeIndex(0);
        setCompletedSegments([]);
        setEverQueued(false);
        setRetryQueue([]);
        setInRetryPhase(false);
        setRetryIndex(0);
        setIsLessonFinished(false);
        return;
      }
    }
    setLessonProgress(lesson.id, {
      segment: currentSegment,
      practiceIndex,
      completedSegments,
      everQueued,
      retryExerciseIds: retryQueue.map((exercise) => exercise.id),
      inRetryPhase,
      retryIndex,
    });
  }, [
    lesson,
    currentSegment,
    practiceIndex,
    completedSegments,
    everQueued,
    retryQueue,
    inRetryPhase,
    retryIndex,
    storeHydrated,
    hydrateEpoch,
    setLessonProgress,
    preview,
    languageId,
    storeLanguageId,
  ]);
}
