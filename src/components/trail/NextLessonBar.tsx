"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { useAppNavigation } from "@/lib/app-navigation";
import { useCourseRecommendation } from "@/lib/use-course-recommendation";
import { prefetchLesson } from "@/lib/content-client";
import { getLessonExerciseCount } from "@/lib/lesson-effort";
import { LessonEffort } from "@/components/common/LessonEffort";
import { loadMistakes, MISTAKE_NOTEBOOK_EVENT } from "@/lib/mistake-notebook";
import { resolveNextAction } from "@/lib/next-action";

export function NextLessonBar() {
  const router = useRouter();
  const languageId = useAppStore((s) => s.activeLanguageId);
  const progress = useAppStore((s) => s.lessonProgress);
  const completed = useAppStore((s) => s.completedLessons);
  const srsCards = useAppStore((s) => s.srsCards);
  const dailyMinutes = useAppStore((s) => s.settings.dailyMinutes);
  const { ready, state, trailData, nextLesson, forwardLesson, continueAhead } = useCourseRecommendation(languageId);
  const { openLesson } = useAppNavigation();
  const startRef = useRef<HTMLButtonElement>(null);
  const [mistakeCount, setMistakeCount] = useState(0);

  useEffect(() => {
    const syncMistakes = () => {
      const entries = loadMistakes();
      setMistakeCount(entries.filter((entry) => entry.languageId === languageId).length);
    };
    syncMistakes();
    window.addEventListener(MISTAKE_NOTEBOOK_EVENT, syncMistakes);
    return () => window.removeEventListener(MISTAKE_NOTEBOOK_EVENT, syncMistakes);
  }, [languageId]);

  useEffect(() => {
    const handleTab = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || event.shiftKey || event.altKey || event.ctrlKey || event.metaKey) return;
      if (event.defaultPrevented || useViewStore.getState().subView || document.querySelector('[aria-modal="true"]')) return;
      if (document.activeElement !== document.body && document.activeElement !== document.documentElement) return;
      if (!startRef.current) return;
      event.preventDefault();
      startRef.current.focus({ preventScroll: true });
    };
    window.addEventListener("keydown", handleTab);
    return () => window.removeEventListener("keydown", handleTab);
  }, []);

  const checkpoint = useMemo(() => {
    if (nextLesson) return null;
    return trailData.gates.find((gate) => {
      const view = state.gates.get(gate.id);
      const topic = trailData.topics.find((item) => item.id === gate.afterTopic);
      const last = topic?.stories?.at(-1) ?? topic?.core;
      return view && !view.open && last && completed.includes(last.id);
    }) ?? null;
  }, [nextLesson, trailData.gates, trailData.topics, state.gates, completed]);

  const recommendation = useMemo(
    () =>
      resolveNextAction({
        nextLesson,
        forwardLesson,
        checkpoint,
        completedCount: completed.length,
        lessonProgress: progress,
        missedIds: state.missedIds,
        requiredIds: state.requiredIds,
        srsCards,
        dailyMinutes,
        mistakeCount,
      }),
    [
      nextLesson,
      forwardLesson,
      checkpoint,
      completed.length,
      progress,
      state.missedIds,
      state.requiredIds,
      srsCards,
      dailyMinutes,
      mistakeCount,
    ]
  );

  if (!ready || !recommendation) return null;

  const exerciseCount =
    recommendation.lessonId !== undefined
      ? getLessonExerciseCount(languageId, recommendation.lessonId)
      : undefined;

  const launchPrimary = () => {
    if (recommendation.kind === "review") {
      router.push("/review");
    } else if (recommendation.kind === "checkpoint" && recommendation.gateId) {
      useViewStore.getState().setTrailPosition(languageId, { nodeId: null, gateId: recommendation.gateId });
    } else if (recommendation.lessonId !== undefined) {
      openLesson(languageId, recommendation.lessonId);
    }
  };

  const launchSecondary = () => {
    const secondary = recommendation.secondary;
    if (!secondary) return;
    if (secondary.kind === "forward") {
      const id = continueAhead();
      if (id) openLesson(languageId, id);
    } else if (secondary.kind === "lesson" && secondary.lessonId !== undefined) {
      openLesson(languageId, secondary.lessonId);
    } else if (secondary.kind === "review") {
      router.push("/review");
    } else if (secondary.kind === "mistakes") {
      router.push("/mistakes");
    }
  };

  return (
    <section
      aria-label="Next recommended action"
      className="fixed inset-x-3 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] z-40 mx-auto flex max-w-2xl items-center gap-2 rounded-xl border border-[var(--sub-color)]/30 bg-[var(--bg-color)]/95 p-2 shadow-lg backdrop-blur xl:bottom-6"
    >
      <div className="min-w-0 flex-1 px-2">
        <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--sub-color)]">
          {recommendation.eyebrow}
        </p>
        <p className="truncate text-sm font-semibold text-[var(--text-color)]" title={recommendation.title}>
          {recommendation.title}
        </p>
        {exerciseCount !== undefined && <LessonEffort exerciseCount={exerciseCount} />}
      </div>
      {recommendation.secondary && (
        <button
          type="button"
          onClick={launchSecondary}
          onPointerEnter={() => {
            if (recommendation.secondary?.lessonId !== undefined) {
              prefetchLesson(languageId, recommendation.secondary.lessonId);
            }
          }}
          className="min-h-11 shrink-0 rounded-lg px-2 text-xs text-[var(--sub-color)] hover:text-[var(--text-color)] focus-visible:outline-2 focus-visible:outline-[var(--main-color)] cursor-pointer"
          title={recommendation.secondary.title}
        >
          {recommendation.secondary.label}
        </button>
      )}
      <button
        ref={startRef}
        type="button"
        data-next-lesson-start
        onClick={launchPrimary}
        onPointerEnter={() => {
          if (recommendation.lessonId !== undefined) prefetchLesson(languageId, recommendation.lessonId);
        }}
        onFocus={() => {
          if (recommendation.lessonId !== undefined) prefetchLesson(languageId, recommendation.lessonId);
        }}
        aria-label={recommendation.ariaLabel}
        className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--main-color)] px-4 text-sm font-bold text-[var(--bg-color)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--main-color)] cursor-pointer"
      >
        {recommendation.actionLabel}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </section>
  );
}
