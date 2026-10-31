"use client";

// Client container for the in-page lesson. It replaces the old /trail route:
// the lesson index validates the id, one small payload supplies the lesson and
// its trimmed compendium, and the curriculum supplies lock/next state.

import React, { useEffect, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { LessonDetailClient } from "@/components/lesson/LessonDetailClient";
import { useLesson, useLessonIndex, prefetchLesson } from "@/lib/content-client";
import { useCurriculum } from "@/data/curriculum-client";
import { getNextPlayableLessonIdFrom } from "@/data/curriculum-core";
import { useAppNavigation } from "@/lib/app-navigation";
import type { CompendiumData, LessonIndexEntry } from "@/lib/types";
import type { CurriculumData } from "@/data/curriculum-core";

interface LessonViewProps {
  languageId: string;
  lessonId: number;
}

function LoadingPanel({ message }: { message: string }) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 text-center font-mono" role="status">
      <p className="text-sm text-[var(--sub-color)]">{message}</p>
    </div>
  );
}

function ErrorPanel({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div
      className="max-w-2xl mx-auto px-4 py-24 text-center space-y-3 font-mono"
      role="alert"
    >
      <p className="text-sm text-[var(--sub-color)]">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="px-4 py-2 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-bold text-xs cursor-pointer"
      >
        try again
      </button>
    </div>
  );
}

export function LessonView({ languageId, lessonId }: LessonViewProps) {
  const lessonIndex = useLessonIndex(languageId);
  const curriculum = useCurriculum(languageId);
  const { closeLesson } = useAppNavigation();

  if (lessonIndex.error) {
    return <ErrorPanel message="the lesson list could not be loaded." onRetry={lessonIndex.retry} />;
  }
  if (curriculum.error) {
    return <ErrorPanel message="the course could not be loaded." onRetry={curriculum.retry} />;
  }
  if (!lessonIndex.data) {
    return <LoadingPanel message="loading the lesson…" />;
  }

  const known = lessonIndex.data.some((entry) => entry.id === lessonId);
  if (!known) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4 font-mono">
        <h2 className="text-2xl font-bold text-[var(--text-color)]">
          Lesson {lessonId} Coming Soon
        </h2>
        <p className="text-[var(--sub-color)] text-sm">
          This lesson isn&apos;t part of the authored curriculum yet — the trail map currently has{" "}
          {lessonIndex.data.length} interactive lessons.
        </p>
        <button
          type="button"
          onClick={closeLesson}
          className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-medium text-sm transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Trail Index
        </button>
      </div>
    );
  }

  if (!curriculum.ready) {
    return <LoadingPanel message="loading the lesson…" />;
  }

  return (
    <LessonContent
      languageId={languageId}
      lessonId={lessonId}
      entries={lessonIndex.data}
      curriculum={curriculum.curriculum}
    />
  );
}

interface LessonContentProps {
  languageId: string;
  lessonId: number;
  entries: LessonIndexEntry[];
  curriculum: CurriculumData;
}

function LessonContent({ languageId, lessonId, entries, curriculum }: LessonContentProps) {
  const payload = useLesson(languageId, lessonId);
  const entry = payload.data?.lesson ?? null;
  const nextLessonId = entry ? getNextPlayableLessonIdFrom(curriculum, entry.id) : null;

  useEffect(() => {
    if (nextLessonId) prefetchLesson(languageId, nextLessonId);
  }, [languageId, nextLessonId]);

  const lessonTitles = useMemo(() => {
    const titles: Record<number, string> = {};
    for (const item of entries) titles[item.id] = item.title;
    return titles;
  }, [entries]);

  if (payload.error) {
    return (
      <ErrorPanel
        message="this lesson could not be loaded."
        onRetry={payload.retry}
      />
    );
  }
  if (!payload.data) {
    return payload.loading ? (
      <LoadingPanel message="loading the lesson…" />
    ) : (
      <ErrorPanel message="this lesson is not available for this course." onRetry={payload.retry} />
    );
  }

  const data = payload.data;
  const compendium: CompendiumData = {
    ...data.compendium,
    wordList: Object.values(data.compendium.words),
  };
  const nextLesson = nextLessonId
    ? entries.find((item) => item.id === nextLessonId)
    : undefined;

  return (
    <LessonDetailClient
      lessonId={lessonId}
      languageId={languageId}
      lesson={data.lesson}
      lessonCount={entries.length}
      compendium={compendium}
      curriculum={{
        topics: curriculum.topics,
        trailBranches: curriculum.trailBranches,
        trailGates: curriculum.trailGates,
        totalTopics: curriculum.totalTopics,
      }}
      lessonTitles={lessonTitles}
      nextLesson={nextLesson ? { id: nextLesson.id, title: nextLesson.title } : undefined}
      nextLessonId={nextLessonId}
    />
  );
}
