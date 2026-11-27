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
import { listeningSkipLabel } from "@/lib/listening";
import type { CompendiumData, LessonSegment } from "@/lib/types";
import { ArrowRightIcon, chapterStyle, minutesLabel } from "../p4-kit";
import { P4Hook, P4Pattern, P4Table, P4Summary } from "./P4Segments";
import { P4Practice } from "./P4Practice";

function Frame({ children, role }: { children: React.ReactNode; role?: string }) {
  const { closeLesson } = useAppNavigation();
  return (
    <div className="m-lesson">
      <header className="m-bar" data-tone="light">
        <button type="button" className="m-btn m-btn--ghost" onClick={closeLesson}>
          Back to the trail
        </button>
      </header>
      <section className="m-wrap" style={{ paddingBlock: "120px", minHeight: "70vh" }} role={role}>
        {children}
      </section>
    </div>
  );
}

export function P4Lesson({ languageId, lessonId }: { languageId: string; lessonId: number }) {
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
        <h1 className="m-head">This lesson didn’t load.</h1>
        <button
          type="button"
          className="m-btn"
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
        <h1 className="m-head">Lesson {lessonId} isn’t written yet.</h1>
        <p className="m-lead" style={{ marginTop: 24 }}>
          The trail has {lessonIndex.data.length} lessons you can take today.
        </p>
        <button type="button" className="m-btn" style={{ marginTop: 32 }} onClick={closeLesson}>
          Back to the trail
        </button>
      </Frame>
    );
  }
  if (!lessonIndex.data || !curriculum.ready || !payload.data || !compendium) {
    if (!payload.loading && lessonIndex.data && curriculum.ready && !payload.data) {
      return (
        <Frame role="alert">
          <h1 className="m-head">This lesson isn’t available in this course.</h1>
          <button type="button" className="m-btn" style={{ marginTop: 32 }} onClick={payload.retry}>
            Try again
          </button>
        </Frame>
      );
    }
    return (
      <Frame role="status">
        <h1 className="m-head" aria-busy="true">Opening the lesson…</h1>
      </Frame>
    );
  }

  const nextId = recommended?.id ?? null;
  const nextEntry = nextId ? lessonIndex.data.find((item) => item.id === nextId) : undefined;
  const preview = state.nodes.get(lessonId)?.status === "locked";
  const recommendedId = state.recommendedId;

  return (
    <P4LessonReader
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

function P4LessonReader(props: LessonReaderProps & { onJumpToTrail?: () => void }) {
  const session = useLessonSession(props);
  const { lesson, activeLanguageId, totalTopics, currentSegment, setCurrentSegment, completedSegments, twistPhase, currentExercise, stickyAction, closeLesson, isReading, listeningOff, listeningSkippedUntil, preview } = session;
  const meta = getLessonMetadata(lesson);
  const topicId = meta.topicId ?? (lesson.id >= 5000 ? null : lesson.id);
  const currentIndex = STEPS.findIndex((step) => step.id === currentSegment);
  const minutes = minutesLabel(lesson.exercises.length);

  const kind =
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
    <article lang={activeLanguageId} className="m-lesson" style={chapterStyle(topicId)} data-segment={currentSegment}>
      <header className="m-bar m-lesson-bar" data-tone="field">
        <button type="button" className="m-icon-btn" onClick={closeLesson} aria-label="Close the lesson and go back to the trail">
          <X />
        </button>
        <p className="m-lesson-kind m-small m-strong">
          {kind}
          <span className="m-lesson-bar-title"> · {lesson.title}</span>
        </p>
        <nav className="m-steps m-lesson-steps" aria-label="Lesson steps">
          {STEPS.map((step, index) => {
            const done = completedSegments.includes(step.id);
            const current = step.id === currentSegment;
            return (
              <button
                key={step.id}
                type="button"
                className="m-step"
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
        <section className="m-lesson-title m-field">
          <div className="m-wrap m-grid">
            <div className="m-lesson-title-main">
              <h1 className="m-head">{lesson.title}</h1>
              <p className="m-lead" style={{ marginTop: 16 }}>
                {lesson.subtitle}
              </p>
            </div>
            <p className="m-small m-strong m-lesson-title-meta">
              {[minutes, `${lesson.exercises.length} ${isReading ? "questions" : "exercises"}`].filter(Boolean).join(" · ")}
              {lesson.word_ids.length === 0 ? " · revision" : ""}
            </p>
          </div>
          {preview && (
            <div className="m-wrap" style={{ marginTop: 24 }}>
              <div className="m-note">
                <p className="m-note-title">You’re looking ahead</p>
                <p className="m-body">Finishing this lesson here won’t count yet — it builds on the topics before it.</p>
                {props.onJumpToTrail && (
                  <button type="button" className="m-btn m-btn--small" style={{ marginTop: 12 }} onClick={props.onJumpToTrail}>
                    Go to my next lesson
                  </button>
                )}
              </div>
            </div>
          )}
          {listeningOff && (
            <div className="m-wrap" style={{ marginTop: 16 }}>
              <p className="m-small m-strong">
                {listeningSkipLabel((listeningSkippedUntil ?? 0) - Date.now())} — listening exercises are shown as text.
              </p>
            </div>
          )}
        </section>
      )}
      {currentSegment === "practice" && <h1 className="sr-only">{lesson.title}</h1>}

      <div className="m-lesson-body">
        {currentSegment === "hook" && <P4Hook session={session} />}
        {currentSegment === "pattern" && <P4Pattern session={session} />}
        {currentSegment === "table" && <P4Table session={session} />}
        {currentSegment === "practice" && (twistPhase ? lesson.twist : currentExercise) && <P4Practice session={session} />}
        {currentSegment === "summary" && <P4Summary session={session} />}
      </div>

      {stickyAction && currentSegment !== "summary" && (
        <div className="m-sticky-action">
          <button type="button" className="m-btn m-btn--go m-btn--wide" onClick={stickyAction.run}>
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
