"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { useAppNavigation } from "@/lib/app-navigation";
import { useCourseRecommendation } from "@/lib/use-course-recommendation";
import { prefetchLesson } from "@/lib/content-client";

export function NextLessonBar() {
  const languageId = useAppStore((s) => s.activeLanguageId);
  const progress = useAppStore((s) => s.lessonProgress);
  const completed = useAppStore((s) => s.completedLessons);
  const { ready, state, trailData, nextLesson, forwardLesson, continueAhead } = useCourseRecommendation(languageId);
  const { openLesson } = useAppNavigation();
  const startRef = useRef<HTMLButtonElement>(null);

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

  const checkpoint = !nextLesson ? trailData.gates.find((gate) => {
    const view = state.gates.get(gate.id);
    const topic = trailData.topics.find((item) => item.id === gate.afterTopic);
    const last = topic?.stories?.at(-1) ?? topic?.core;
    return view && !view.open && last && completed.includes(last.id);
  }) : undefined;
  if (!ready || (!nextLesson && !checkpoint)) return null;
  const resume = nextLesson ? Boolean(progress[nextLesson.id]) : false;
  const missed = nextLesson ? state.missedIds.includes(nextLesson.id) : false;
  const action = checkpoint ? "Open checkpoint" : resume ? "Resume" : completed.length ? "Continue" : "Start";
  const title = nextLesson?.title ?? checkpoint!.title;
  const launch = () => {
    if (nextLesson) openLesson(languageId, nextLesson.id);
    else if (checkpoint) useViewStore.getState().setTrailPosition(languageId, { nodeId: null, gateId: checkpoint.id });
  };

  return (
    <section aria-label="Next recommended lesson" className="fixed inset-x-3 bottom-[calc(5.25rem+env(safe-area-inset-bottom))] z-30 mx-auto flex max-w-2xl items-center gap-2 rounded-xl border border-[var(--sub-color)]/30 bg-[var(--bg-color)]/95 p-2 shadow-lg backdrop-blur xl:bottom-6">
      <div className="min-w-0 flex-1 px-2">
        <p className="text-[10px] font-mono uppercase tracking-wider text-[var(--sub-color)]">{missed ? "Pick up a missed lesson" : "Up next"}</p>
        <p className="truncate text-sm font-semibold text-[var(--text-color)]" title={title}>{title}</p>
      </div>
      {missed && forwardLesson && (
        <button type="button" onClick={() => { const id = continueAhead(); if (id) openLesson(languageId, id); }} className="min-h-11 shrink-0 rounded-lg px-2 text-xs text-[var(--sub-color)] hover:text-[var(--text-color)] focus-visible:outline-2 focus-visible:outline-[var(--main-color)]" title={`Keep earlier lessons skipped and open ${forwardLesson.title}`}>
          Continue ahead
        </button>
      )}
      <button ref={startRef} type="button" data-next-lesson-start onClick={launch} onPointerEnter={() => { if (nextLesson) prefetchLesson(languageId, nextLesson.id); }} onFocus={() => { if (nextLesson) prefetchLesson(languageId, nextLesson.id); }} aria-label={`${action} next recommended ${checkpoint ? "checkpoint" : "lesson"}: ${title}`} className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[var(--main-color)] px-4 text-sm font-bold text-[var(--bg-color)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--main-color)]">
        {action}<ArrowRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </section>
  );
}
