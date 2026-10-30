"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, PlayCircle, Clock } from "lucide-react";
import { DailyInsightCard } from "@/components/common/DailyInsightCard";
import { TrailMap } from "@/components/trail/TrailMap";
import { useAppStore } from "@/lib/store";
import { getLanguageDefinition } from "@/data/languages";
import { useCurriculum } from "@/data/curriculum-client";
import { useInsights } from "@/data/insights-client";
import { lessonHref } from "@/lib/routes";
import { isChunkLoadError } from "@/lib/chunk-errors";

export default function HomePage() {
  const [insightIndex, setInsightIndex] = useState(0);
  const completedLessons = useAppStore((s) => s.completedLessons);
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const logDailyActivity = useAppStore((s) => s.logDailyActivity);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const openOnboarding = useAppStore((s) => s.openOnboarding);
  const storeHydrated = useAppStore((s) => s.storeHydrated);

  const language = getLanguageDefinition(activeLanguageId);
  const { curriculum, ready: curriculumReady, error: curriculumError, retry: retryCurriculum } =
    useCurriculum(activeLanguageId);
  const {
    insights: dailyInsights,
    error: insightsError,
    retry: retryInsights,
  } = useInsights(activeLanguageId);

  useEffect(() => {
    setInsightIndex(new Date().getDate() % (dailyInsights.length || 1));
    logDailyActivity();
  }, [logDailyActivity, dailyInsights.length]);

  // Keep the pre-paint landing switch honest after a progress reset/import.
  // Wait for hydration so the default empty store cannot flash the hero back.
  const hasStartedLesson = Object.keys(lessonProgress).length > 0;
  useEffect(() => {
    if (!storeHydrated) return;
    document.documentElement.setAttribute(
      "data-returning",
      completedLessons.length > 0 || hasStartedLesson ? "true" : "false"
    );
  }, [storeHydrated, completedLessons.length, hasStartedLesson, activeLanguageId]);

  const todayInsight = dailyInsights[insightIndex] ?? dailyInsights[0];

  // The lessons array is grouped by kind, not trail order. Use the first
  // authored core topic so "Start topic 1" cannot point at a sprig/branch.
  const firstTopic =
    curriculum.topics.find((topic) => topic.core.authored) ?? curriculum.topics[0] ?? null;
  const firstLessonId = firstTopic?.core.id ?? 1;
  // Kept progress-independent on the server (empty default) so the landing
  // copy is in the first paint; the pre-paint script hides it for returning
  // learners and React removes it once progress hydrates.
  const isFirstVisit = completedLessons.length === 0 && !hasStartedLesson;
  const lessonCount = curriculum.lessonCount;
  const topicCount = curriculum.totalTopics;

  const langLabel =
    activeLanguageId === "fr"
      ? "French through English"
      : activeLanguageId === "es"
      ? "Spanish through English"
      : "German through English";

  return (
    <div className="max-w-5xl mx-auto px-4 pt-3 pb-6 font-sans">
      {/* compact trail heading — stars/flawless live in the title bar */}
      <div className="flex items-center justify-between gap-3 py-1.5">
        <h1 className="text-[11px] font-mono text-[var(--main-color)] font-semibold uppercase tracking-wider">
          the trail
        </h1>
      </div>

      {language.status === "available" ? (
        !curriculumReady ? (
          curriculumError ? (
            <div
              role="alert"
              className="mt-6 p-8 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--error-color)]/30 text-center space-y-3 font-mono"
            >
              <p className="text-sm text-[var(--sub-color)]">the course could not be loaded.</p>
              <button
                type="button"
                onClick={() =>
                  isChunkLoadError(curriculumError) ? window.location.reload() : retryCurriculum()
                }
                className="px-4 py-2 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-bold text-xs cursor-pointer"
              >
                {isChunkLoadError(curriculumError) ? "reload" : "try again"}
              </button>
            </div>
          ) : (
            <div
              role="status"
              className="mt-6 p-8 text-center font-mono text-xs text-[var(--sub-color)]"
            >
              loading course…
            </div>
          )
        ) : (
        <>
          {isFirstVisit && (
            <section className="first-visit-hero mt-2 mb-5 rounded-xl border border-[var(--main-color)]/30 bg-[var(--sub-alt-color)] p-5 sm:p-7 space-y-4">
              <div className="space-y-2 max-w-2xl">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--main-color)] font-semibold">
                  {langLabel}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-color)] tracking-tight">
                  You already know more {language.name} than you think.
                </h2>
                <p className="text-sm text-[var(--sub-color)] leading-relaxed">
                  {language.onboarding.philosophy.demos.slice(0, 3).map((demo, index) => (
                    <React.Fragment key={demo.english}>
                      {index > 0 ? " " : null}
                      <span className="text-[var(--text-color)] font-mono">
                        {demo.english} → {demo.target}.
                      </span>
                    </React.Fragment>
                  ))}{" "}
                  Brücke teaches the patterns behind those pairs, so vocabulary becomes something
                  you can decode instead of a list you memorize.
                </p>
                <p className="text-xs font-mono text-[var(--sub-color)]">
                  {topicCount} topics · {lessonCount} lessons · {language.flag} {language.name}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2.5">
                <Link
                  href={lessonHref(activeLanguageId, firstLessonId)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-bold text-sm font-mono transition"
                >
                  Start topic 1 <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={openOnboarding}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded bg-[var(--bg-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/30 text-[var(--text-color)] font-bold text-sm font-mono transition cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4 text-[var(--main-color)]" />
                  60-second intro
                </button>
                <span className="text-[11px] font-mono text-[var(--sub-color)]">
                  no account · progress stays in this browser
                </span>
              </div>
            </section>
          )}

          <TrailMap />
          {todayInsight ? (
            <DailyInsightCard insight={todayInsight} languageName={language.name} />
          ) : insightsError ? (
            <button
              type="button"
              onClick={() =>
                isChunkLoadError(insightsError) ? window.location.reload() : retryInsights()
              }
              className="mt-3 mx-auto block font-mono text-[11px] text-[var(--sub-color)] underline decoration-dotted cursor-pointer"
            >
              daily insight unavailable — retry
            </button>
          ) : null}
        </>
        )
      ) : (
        <div className="mt-6 p-8 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-center space-y-3">
          <Clock className="w-8 h-8 text-[var(--main-color)] mx-auto" />
          <h2 className="text-base font-bold font-mono text-[var(--text-color)]">
            the {language.name.toLowerCase()} trail is under construction
          </h2>
          <p className="text-xs font-mono text-[var(--sub-color)] max-w-md mx-auto leading-relaxed">
            the cognate engine for {language.name} is being authored right now. your progress here is
            safe and separate — switch to another language from settings and your work waits for you.
          </p>
        </div>
      )}
    </div>
  );
}
