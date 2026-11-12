"use client";

import React from "react";
import { ArrowLeft, ArrowRight, BookOpen, Brain } from "lucide-react";
import { ProgressBar5 } from "./ProgressBar5";
import { LazyLoadBoundary } from "@/components/common/LazyLoadBoundary";
import { listeningSkipLabel } from "@/lib/listening";
import { useLessonSession } from "./use-lesson-session";
import type { LessonReaderProps } from "./lesson-session-types";
import { LessonEffort } from "@/components/common/LessonEffort";

const HookSegment = React.lazy(() => import("./segments/HookSegment"));
const PatternSegment = React.lazy(() => import("./segments/PatternSegment"));
const TableSegment = React.lazy(() => import("./segments/TableSegment"));
const PracticeSegment = React.lazy(() => import("./segments/PracticeSegment"));
const SummarySegment = React.lazy(() => import("./segments/SummarySegment"));

export function LessonReader(props: LessonReaderProps) {
  const session = useLessonSession(props);
  const { lesson, activeLanguageId, totalTopics, currentSegment, setCurrentSegment, completedSegments, twistPhase, listeningSkippedUntil, listeningOff, stickyAction, currentExercise, closeLesson } = session;
  return (
    <article className={`max-w-4xl mx-auto px-4 pt-8 space-y-8 ${stickyAction ? "pb-32" : "pb-8"}`}>
      {/* Top Header & Navigation — sticky so the close control never scrolls away */}
      <div className="sticky top-0 z-20 -mx-4 -mt-8 px-4 pt-3 pb-3 bg-[var(--bg-color)]/95 backdrop-blur border-b border-[var(--sub-color)]/15">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={closeLesson}
            className="inline-flex min-h-11 items-center gap-2 rounded border border-[var(--sub-color)]/20 px-3 py-2 text-xs font-mono text-[var(--sub-color)] transition hover:border-[var(--main-color)]/40 hover:text-[var(--main-color)] cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Trail
          </button>
          <span className="text-xs font-mono text-[var(--main-color)] font-medium px-2 py-0.5 rounded bg-[var(--main-color)]/10 border border-[var(--main-color)]/20">
            {lesson.spineStory
              ? `Story ${lesson.label ?? ""} · Main Path`
              : lesson.id <= 30
              ? `Topic ${lesson.id} of ${totalTopics} · Core`
              : lesson.id >= 5000
              ? `Branch Track · ${lesson.id}`
              : `Topic ${Math.floor(lesson.id / 100)} · Sprig ${lesson.id % 100}`}
          </span>
        </div>

        {/* 5-segment Progress bar */}
        <ProgressBar5
          currentSegment={currentSegment}
          completedSegments={completedSegments}
          onSelectSegment={(seg) => setCurrentSegment(seg)}
        />

        {/* Lesson Title */}
        <div className="pt-2">
          <span className="text-xs font-mono text-[var(--main-color)] uppercase tracking-wider font-semibold">
            Phase {lesson.phase} ·{" "}
            {lesson.spineStory
              ? "Reading Story"
              : lesson.id <= 30
              ? activeLanguageId === "de"
                ? "Core Shift"
                : activeLanguageId === "nl"
                ? "Core Bridge"
                : "Core"
              : lesson.id >= 5000
              ? "Support Track"
              : "Practice Sprig"}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-sans text-[var(--text-color)] tracking-tight mt-1">
            {lesson.title}
          </h1>
          <p className="text-base sm:text-lg text-[var(--sub-color)] mt-2 font-normal leading-relaxed">
            {lesson.subtitle}
          </p>

          <div className="mt-2"><LessonEffort exerciseCount={lesson.exercises.length} /></div>
          {/* TM-6: hearing is off for now — said once, plainly, never as an error */}
          {listeningOff && (
            <p className="mt-3 text-xs font-mono text-[var(--sub-color)] inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20">
              <Brain className="w-3.5 h-3.5" /> {listeningSkipLabel(
                (listeningSkippedUntil ?? 0) - Date.now()
              )} — listening exercises read from the page instead
            </p>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Main Step Card Column */}
        <div className="lg:col-span-8 space-y-6 text-[var(--text-color)] text-base leading-relaxed font-mono">
          <LazyLoadBoundary label="this lesson segment">
          <React.Suspense fallback={<p role="status">loading lesson segment…</p>}>
          {/* STEP 1: The Hook Card */}
          {currentSegment === "hook" && (
            <HookSegment session={session} />
          )}

          {/* STEP 2: The Pattern Card */}
          {currentSegment === "pattern" && (
            <PatternSegment session={session} />
          )}

          {/* STEP 3: Transformation Table Card */}
          {currentSegment === "table" && (
            <TableSegment session={session} />
          )}

          {/* STEP 4: Interactive Practice Card (ONE AT A TIME + TWIST + SEAMLESS RETRY QUEUE) */}
          {currentSegment === "practice" && (twistPhase ? lesson.twist : currentExercise) && (
            <PracticeSegment session={session} />
          )}

          {/* STEP 5: Summary & Retries */}
          {currentSegment === "summary" && (
            <SummarySegment session={session} />
            )}
          </React.Suspense>
          </LazyLoadBoundary>
        </div>

        {/* Right Margin Column: Desktop Side Notes */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4 font-mono">
          <details className="p-5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-3">
            <summary className="min-h-11 cursor-pointer text-xs uppercase tracking-widest text-[var(--main-color)] font-semibold">
              <BookOpen className="inline h-3.5 w-3.5" aria-hidden="true" /> optional background
            </summary>
            <div className="space-y-2.5 text-[13px] text-[var(--sub-color)] leading-relaxed">
              {lesson.hook.footnotes?.map((fn) => (
                <div key={fn.marker} className="p-3 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 space-y-1">
                  <span className="text-[var(--main-color)] font-bold">[{fn.marker}] {fn.title}</span>
                  <p>{fn.content}</p>
                  {fn.interest && (
                    <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-[var(--sub-color)] uppercase tracking-wider">
                      for interest — not on the test
                    </span>
                  )}
                </div>
              ))}
              {lesson.pattern.footnotes?.map((fn) => (
                <div key={fn.marker} className="p-3 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 space-y-1">
                  <span className="text-[var(--main-color)] font-bold">[{fn.marker}] {fn.title}</span>
                  <p>{fn.content}</p>
                  {fn.interest && (
                    <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-[var(--sub-color)] uppercase tracking-wider">
                      for interest — not on the test
                    </span>
                  )}
                </div>
              ))}
              <div className="p-3 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 space-y-1">
                <span className="text-[var(--main-color)] font-bold">cognate clue</span>
                <p>
                  {activeLanguageId === "fr"
                    ? "in 1066 norman french crossed the channel — thousands of cognates entered english and never left."
                    : activeLanguageId === "nl"
                    ? "dutch is the west germanic twin english kept closest: it skipped the high german consonant shift, so water stays water and ship becomes schip."
                    : activeLanguageId === "es"
                    ? "spanish and english share thousands of latin roots — castilian melted initial f- to silent h-, -ct- to -ch-, and -tion to -ción."
                    : "high german shifted consonants 1,300 years ago, leaving english as a living time capsule of ancestral germanic roots."}
                </p>
              </div>
            </div>
          </details>
        </aside>
      </div>

      {stickyAction && (
        <div
          className="sm:hidden fixed bottom-safe z-30"
          style={{
            left: "max(0.75rem, env(safe-area-inset-left))",
            right: "max(0.75rem, env(safe-area-inset-right))",
          }}
        >
          <button
            type="button"
            onClick={stickyAction.run}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[var(--main-color)] text-[var(--bg-color)] font-bold text-sm font-mono shadow-lg shadow-black/20 hover:opacity-90 transition cursor-pointer"
          >
            <span className="truncate">{stickyAction.label}</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </button>
        </div>
      )}
    </article>
  );
}
