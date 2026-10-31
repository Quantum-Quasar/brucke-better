"use client";

import React, { useMemo } from "react";
import { ArrowLeft, MapPin, Eye } from "lucide-react";
import { LessonReader } from "@/components/lesson/LessonReader";
import { useAppStore } from "@/lib/store";
import { getTrailState } from "@/lib/trail-map";
import { useAppNavigation } from "@/lib/app-navigation";
import type {
  CompendiumData,
  Lesson,
  TrailBranch,
  TrailGate,
  TopicCluster,
} from "@/lib/types";

interface LessonCurriculum {
  topics: TopicCluster[];
  trailBranches: TrailBranch[];
  trailGates: TrailGate[];
  totalTopics: number;
}

interface LessonDetailClientProps {
  lessonId: number;
  languageId: string;
  /** The resolved lesson, or null when the id is not authored in this course. */
  lesson: Lesson | null;
  lessonCount: number;
  compendium: CompendiumData;
  curriculum: LessonCurriculum;
  lessonTitles: Record<number, string>;
  nextLesson?: { id: number; title: string };
  nextLessonId?: number | null;
}

export function LessonDetailClient({
  lessonId,
  languageId,
  lesson,
  lessonCount,
  compendium,
  curriculum,
  lessonTitles,
  nextLesson,
  nextLessonId,
}: LessonDetailClientProps) {
  const completedLessons = useAppStore((s) => s.completedLessons);
  const lessonStars = useAppStore((s) => s.lessonStars);
  const { openLesson, closeLesson } = useAppNavigation();

  const trailState = useMemo(
    () =>
      getTrailState(completedLessons, lessonStars, undefined, {
        topics: curriculum.topics,
        branches: curriculum.trailBranches,
        gates: curriculum.trailGates,
        totalTopics: curriculum.totalTopics,
      }),
    [completedLessons, lessonStars, curriculum]
  );

  if (!lesson) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4 font-mono">
        <h2 className="text-2xl font-bold text-[var(--text-color)]">Lesson {lessonId} Coming Soon</h2>
        <p className="text-[var(--sub-color)] text-sm">
          This lesson isn't part of the authored curriculum yet — the trail map currently has {lessonCount}{" "}
          interactive lessons.
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

  const view = trailState.nodes.get(lessonId);
  const isLocked = view?.status === "locked";
  const recommendedId = trailState.recommendedId;
  const recommendedTitle = recommendedId ? lessonTitles[recommendedId] : undefined;

  // Remount per lesson (and per language): the lesson route keeps this client
  // component mounted across /trail/N → /trail/N+1 navigations, so without a
  // key LessonReader would carry the previous lesson's segment/practice state
  // into the next one and persist it.
  return (
    <>
      {isLocked && (
        <div className="max-w-4xl mx-auto px-4 pt-6">
          <div className="rounded-lg border border-[var(--main-color)]/35 bg-[var(--sub-alt-color)] p-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex items-start gap-2.5 flex-1 min-w-0">
              <Eye className="w-4 h-4 text-[var(--main-color)] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--main-color)] font-semibold">
                  ahead of your trail
                </div>
                <p className="text-sm text-[var(--text-color)] leading-relaxed">
                  Preview only: finishing it here won’t mark it complete or unlock later topics.
                  Learning builds on the topics before it.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => openLesson(languageId, recommendedId ?? 1)}
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-bold text-xs font-mono hover:opacity-90 transition shrink-0 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              {recommendedTitle ? `Continue: ${recommendedTitle}` : "Continue the trail"}
            </button>
          </div>
        </div>
      )}
      <LessonReader
        key={`${languageId}-${lesson.id}`}
        lesson={lesson}
        languageId={languageId}
        compendium={compendium}
        nextLesson={nextLesson}
        nextLessonId={nextLessonId}
        totalTopics={curriculum.totalTopics}
        preview={Boolean(isLocked)}
      />
    </>
  );
}
