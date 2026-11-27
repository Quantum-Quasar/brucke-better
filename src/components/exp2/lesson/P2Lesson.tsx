"use client";

import React, { useEffect, useMemo } from "react";
import { X } from "lucide-react";
import { useLesson, useLessonIndex } from "@/lib/content-client";
import { useCurriculum } from "@/data/curriculum-client";
import { useCourseRecommendation } from "@/lib/use-course-recommendation";
import { useAppNavigation } from "@/lib/app-navigation";
import { useLessonSession } from "@/components/lesson/use-lesson-session";
import type { LessonReaderProps } from "@/components/lesson/lesson-session-types";
import { getLessonMetadata } from "@/lib/lesson-metadata";
import { GERMAN_CHAPTERS, GERMAN_LESSON_CHAPTER } from "@/data/german-trail";
import { listeningSkipLabel } from "@/lib/listening";
import type { CompendiumData, LessonSegment } from "@/lib/types";
import { ArrowRightIcon, chapterStyle, minutesLabel } from "../p2-kit";
import { P2Hook, P2Pattern, P2Table, P2Summary } from "./P2Segments";
import { P2Practice } from "./P2Practice";

function Frame({ children, role }: { children: React.ReactNode; role?: string }) {
  const { closeLesson } = useAppNavigation();
  return (
    <div className="p-lesson">
      <header className="p-bar" data-tone="light">
        <button type="button" className="p-btn p-btn--ghost" onClick={closeLesson}>
          Back to the trail
        </button>
      </header>
      <section className="p-wrap" style={{ paddingBlock: "120px", minHeight: "70vh" }} role={role}>
        {children}
      </section>
    </div>
  );
}

export function P2Lesson({ languageId, lessonId }: { languageId: string; lessonId: number }) {
  const lessonIndex = useLessonIndex(languageId);
  const curriculum = useCurriculum(languageId);
  const payload = useLesson(languageId, lessonId);
  const entry = payload.data?.lesson ?? null;
  const { nextLesson: recommended, state } = useCourseRecommendation(languageId, entry?.id);
  const { closeLesson, openLesson } = useAppNavigation();

  const title = payload.data?.lesson.title;
  useEffect(() => {
    if (!title) return;
    const previous = document.title;
    const next = `${title} — Brücke`;
    document.title = next;
    return () => {
      if (document.title === next) document.title = previous;
    };
  }, [title]);

  const compendium = useMemo<CompendiumData | null>(
    () => (payload.data ? { ...payload.data.compendium, wordList: Object.values(payload.data.compendium.words) } : null),
    [payload.data]
  );

  const error = lessonIndex.error || curriculum.error || payload.error;
  if (error) {
    return (
      <Frame role="alert">
        <h1 className="p-head">This lesson didn’t load.</h1>
        <button
          type="button"
          className="p-btn"
          style={{ marginTop: 32 }}
          onClick={() => {
            lessonIndex.retry();
            curriculum.retry();
            payload.retry();
          }}
        >
          Try again
        </button>
      </Frame>
    );
  }
  if (lessonIndex.data && !lessonIndex.data.some((item) => item.id === lessonId)) {
    return (
      <Frame>
        <h1 className="p-head">Lesson {lessonId} isn’t written yet.</h1>
        <p className="p-lead" style={{ marginTop: 24 }}>
          The trail has {lessonIndex.data.length} lessons you can take today.
        </p>
        <button type="button" className="p-btn" style={{ marginTop: 32 }} onClick={closeLesson}>
          Back to the trail
        </button>
      </Frame>
    );
  }
  if (!lessonIndex.data || !curriculum.ready || !payload.data || !compendium) {
    if (!payload.loading && lessonIndex.data && curriculum.ready && !payload.data) {
      return (
        <Frame role="alert">
          <h1 className="p-head">This lesson isn’t available in this course.</h1>
          <button type="button" className="p-btn" style={{ marginTop: 32 }} onClick={payload.retry}>
            Try again
          </button>
        </Frame>
      );
    }
    return (
      <Frame role="status">
        <h1 className="p-head" aria-busy="true">Opening the lesson…</h1>
      </Frame>
    );
  }

  const nextId = languageId === "de" ? null : recommended?.id ?? null;
  const nextEntry = nextId ? lessonIndex.data.find((item) => item.id === nextId) : undefined;
  const preview = state.nodes.get(lessonId)?.status === "locked";
  const recommendedId = state.recommendedId;

  return (
    <P2LessonReader
      key={`${languageId}-${payload.data.lesson.id}`}
      lesson={payload.data.lesson}
      languageId={languageId}
      compendium={compendium}
      nextLesson={nextEntry ? { id: nextEntry.id, title: nextEntry.title } : undefined}
      nextLessonId={nextId}
      totalTopics={curriculum.curriculum.totalTopics}
      preview={preview}
      onJumpToTrail={recommendedId && preview ? () => openLesson(languageId, recommendedId) : undefined}
    />
  );
}

const STEPS: Array<{ id: LessonSegment; label: string; story: string }> = [
  { id: "hook", label: "Intro", story: "Intro" },
  { id: "pattern", label: "Pattern", story: "Story" },
  { id: "table", label: "Words", story: "Words" },
  { id: "practice", label: "Practice", story: "Questions" },
  { id: "summary", label: "Done", story: "Done" },
];

function P2LessonReader(props: LessonReaderProps & { onJumpToTrail?: () => void }) {
  const session = useLessonSession(props);
  const { lesson, activeLanguageId, totalTopics, currentSegment, setCurrentSegment, completedSegments, twistPhase, currentExercise, stickyAction, closeLesson, isReading, listeningOff, listeningSkippedUntil, preview } = session;
  const meta = getLessonMetadata(lesson);
  const topicId = meta.topicId ?? (lesson.id >= 5000 ? null : lesson.id);
  const currentIndex = STEPS.findIndex((step) => step.id === currentSegment);
  const minutes = minutesLabel(lesson.exercises.length);
  const germanChapter = activeLanguageId === "de" ? GERMAN_LESSON_CHAPTER.get(lesson.id) : undefined;

  const kind = germanChapter ? GERMAN_CHAPTERS[germanChapter].title :
    lesson.spineStory || meta.kind === "story"
      ? "Reading story"
      : meta.kind === "core"
        ? `Topic ${topicId} of ${totalTopics}`
        : meta.kind === "branch"
          ? "Side path"
          : `Topic ${topicId} · extra practice`;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentSegment]);

  return (
    <article lang={activeLanguageId} className="p-lesson" style={chapterStyle(topicId)} data-segment={currentSegment}>
      <header className="p-bar p-lesson-bar" data-tone="field">
        <button type="button" className="p-icon-btn" onClick={closeLesson} aria-label="Close the lesson and go back to the trail">
          <X />
        </button>
        <p className="p-lesson-kind p-small p-strong">
          {kind}
          <span className="p-lesson-bar-title"> · {lesson.title}</span>
        </p>
        <nav className="p-steps p-lesson-steps" aria-label="Lesson steps">
          {STEPS.map((step, index) => {
            const done = completedSegments.includes(step.id);
            const current = step.id === currentSegment;
            return (
              <button
                key={step.id}
                type="button"
                className="p-step"
                style={{ ["--fill" as string]: done || index < currentIndex ? 1 : current ? 0.5 : 0 }}
                aria-current={current ? "step" : undefined}
                disabled={!done || current}
                onClick={() => setCurrentSegment(step.id)}
              >
                <span>{isReading ? step.story : step.label}</span>
              </button>
            );
          })}
        </nav>
      </header>

      {currentSegment !== "practice" && currentSegment !== "summary" && (
        <section className="p-lesson-title p-field">
          <div className="p-wrap p-grid">
            <div className="p-lesson-title-main">
              <h1 className="p-head">{lesson.title}</h1>
              <p className="p-lead" style={{ marginTop: 16 }}>
                {lesson.subtitle}
              </p>
            </div>
            <p className="p-small p-strong p-lesson-title-meta">
              {[minutes, `${lesson.exercises.length} ${isReading ? "questions" : "exercises"}`].filter(Boolean).join(" · ")}
              {lesson.word_ids.length === 0 ? " · revision" : ""}
            </p>
          </div>
          {preview && (
            <div className="p-wrap" style={{ marginTop: 24 }}>
              <div className="p-note">
                <p className="p-note-title">You’re looking ahead</p>
                <p className="p-body">Finishing this lesson here won’t count yet — it builds on the topics before it.</p>
                {props.onJumpToTrail && (
                  <button type="button" className="p-btn p-btn--small" style={{ marginTop: 12 }} onClick={props.onJumpToTrail}>
                    Go to my next lesson
                  </button>
                )}
              </div>
            </div>
          )}
          {listeningOff && (
            <div className="p-wrap" style={{ marginTop: 16 }}>
              <p className="p-small p-strong">
                {listeningSkipLabel((listeningSkippedUntil ?? 0) - Date.now())} — listening exercises are shown as text.
              </p>
            </div>
          )}
        </section>
      )}
      {currentSegment === "practice" && <h1 className="sr-only">{lesson.title}</h1>}

      <div className="p-lesson-body">
        {currentSegment === "hook" && <P2Hook session={session} />}
        {currentSegment === "pattern" && <P2Pattern session={session} />}
        {currentSegment === "table" && <P2Table session={session} />}
        {currentSegment === "practice" && (twistPhase ? lesson.twist : currentExercise) && <P2Practice session={session} />}
        {currentSegment === "summary" && <P2Summary session={session} />}
      </div>

      {stickyAction && currentSegment !== "summary" && (
        <div className="p-sticky-action">
          <button type="button" className="p-btn p-btn--go p-btn--wide" onClick={stickyAction.run}>
            {currentSegment === "hook"
              ? isReading ? "Read the story" : "See the pattern"
              : currentSegment === "pattern"
                ? isReading ? "Words for the story" : "Meet the words"
                : session.resumingPractice
                  ? "Back to the exercises"
                  : `Start the ${lesson.exercises.length} ${isReading ? "questions" : "exercises"}`}
            <ArrowRightIcon />
          </button>
        </div>
      )}
    </article>
  );
}
