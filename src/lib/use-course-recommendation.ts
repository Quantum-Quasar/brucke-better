"use client";

import { useMemo } from "react";
import { useCurriculum } from "@/data/curriculum-client";
import { orderedTrailLessons } from "@/data/curriculum-core";
import { useAppStore } from "@/lib/store";
import { useViewStore, EMPTY_TRAIL_POSITION } from "@/lib/view-store";
import { getTrailState, type TrailData } from "@/lib/trail-map";

const EMPTY_BYPASSES: Record<number, number> = {};

export function useCourseRecommendation(languageId: string, afterLessonId?: number) {
  const { curriculum, ready } = useCurriculum(languageId);
  const completed = useAppStore((s) => s.completedLessons);
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const stars = useAppStore((s) => s.lessonStars);
  const passedGateIds = useAppStore((s) => s.passedGateIds);
  const resetAt = useAppStore((s) => s.progressResetAt);
  const position = useViewStore((s) => s.trailByLanguage[languageId] ?? EMPTY_TRAIL_POSITION);
  const setTrailPosition = useViewStore((s) => s.setTrailPosition);
  const bypasses = position.recommendationResetAt === resetAt ? position.bypasses ?? EMPTY_BYPASSES : EMPTY_BYPASSES;
  const trailData = useMemo<TrailData>(() => ({
    topics: curriculum.topics,
    branches: curriculum.trailBranches,
    gates: curriculum.trailGates,
    totalTopics: curriculum.totalTopics,
  }), [curriculum]);
  const state = useMemo(() => getTrailState(
    afterLessonId && !completed.includes(afterLessonId) ? [...completed, afterLessonId] : completed,
    stars, undefined, trailData, passedGateIds, { lessonProgress, bypasses }
  ), [afterLessonId, completed, stars, trailData, passedGateIds, lessonProgress, bypasses]);
  const lessons = useMemo(() => orderedTrailLessons(curriculum.topics, curriculum.trailBranches), [curriculum]);
  const nextLesson = lessons.find((lesson) => lesson.id === state.recommendedId) ?? null;
  const forwardLesson = state.forwardId !== state.recommendedId
    ? lessons.find((lesson) => lesson.id === state.forwardId) ?? null : null;
  const continueAhead = () => {
    const next = { ...bypasses };
    for (const id of state.missedIds) next[id] = Math.min(3, (next[id] ?? 0) + 1);
    setTrailPosition(languageId, { bypasses: next, recommendationResetAt: resetAt });
    return forwardLesson?.id ?? null;
  };
  return { ready, state, trailData, nextLesson, forwardLesson, continueAhead };
}
