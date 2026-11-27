"use client";

import { GermanTrailMap } from "@/components/trail/GermanTrailMap";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Eye,
  FileWarning,
  Layers,
  PlayCircle,
  RotateCcw,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import { HomeSkeleton } from "@/components/common/HomeSkeleton";
import { useAppStore } from "@/lib/store";
import { isModifiedClick, useAppNavigation } from "@/lib/app-navigation";
import { getLanguageDefinition } from "@/data/languages";
import { useCurriculum } from "@/data/curriculum-client";
import { useInsights } from "@/data/insights-client";
import { prefetchLesson, useLessonIndex } from "@/lib/content-client";
import { useCourseRecommendation } from "@/lib/use-course-recommendation";
import { getDueCards } from "@/lib/srs";
import {
  getWeeklyPracticeSummary,
  WEEKLY_PRACTICE_EVENT,
  type WeeklyPracticeSummary,
} from "@/lib/weekly-practice";
import { lessonHref } from "@/lib/routes";
import { isChunkLoadError } from "@/lib/chunk-errors";
import type { LessonShell, TopicCluster, TrailBranch, TrailGate } from "@/lib/types";

const DailyInsightCard = dynamic(
  () => import("@/components/common/DailyInsightCard").then((m) => m.DailyInsightCard),
  { ssr: false }
);

interface CurriculumStage {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  topics: TopicCluster[];
}

function buildStages(topics: TopicCluster[], gates: TrailGate[]): CurriculumStage[] {
  if (topics.length === 0) return [];
  const sortedGates = [...gates].sort((a, b) => a.afterTopic - b.afterTopic);

  if (sortedGates.length === 0) {
    const chunkSize = 5;
    const stages: CurriculumStage[] = [];
    for (let i = 0; i < topics.length; i += chunkSize) {
      const slice = topics.slice(i, i + chunkSize);
      const startNum = slice[0]?.id ?? i + 1;
      const endNum = slice[slice.length - 1]?.id ?? i + slice.length;
      stages.push({
        id: `stage-${stages.length + 1}`,
        index: stages.length + 1,
        title: `Unit ${stages.length + 1}`,
        subtitle: `Topics ${startNum}–${endNum}`,
        topics: slice,
      });
    }
    return stages;
  }

  const stages: CurriculumStage[] = [];
  let lowerBound = 0;

  for (const gate of sortedGates) {
    const slice = topics.filter((t) => t.id > lowerBound && t.id <= gate.afterTopic);
    if (slice.length > 0) {
      stages.push({
        id: `gate-${gate.id}`,
        index: stages.length + 1,
        title: gate.title,
        subtitle: `Topics ${slice[0].id}–${slice[slice.length - 1].id}`,
        topics: slice,
      });
    }
    lowerBound = gate.afterTopic;
  }

  const trailing = topics.filter((t) => t.id > lowerBound);
  if (trailing.length > 0) {
    stages.push({
      id: "stage-final",
      index: stages.length + 1,
      title: "Mastery & Fluency",
      subtitle: `Topics ${trailing[0].id}–${trailing[trailing.length - 1].id}`,
      topics: trailing,
    });
  }

  return stages;
}

function formatShiftBadge(raw: string): string {
  return raw
    .replace(/_/g, " ")
    .replace(/\bto\b/g, "→")
    .trim();
}

function getTimeGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function DesignHome() {
  const [greeting, setGreeting] = useState("Welcome back");
  const [insightIndex, setInsightIndex] = useState(0);
  const [weekly, setWeekly] = useState<WeeklyPracticeSummary>({
    daysPracticed: 0,
    windowDays: 7,
    practicedToday: false,
    recentDates: [],
  });
  const [selectedStageId, setSelectedStageId] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "remaining" | "completed">("all");
  const [topicQuery, setTopicQuery] = useState("");

  const completedLessons = useAppStore((s) => s.completedLessons);
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const lessonStars = useAppStore((s) => s.lessonStars);
  const srsCards = useAppStore((s) => s.srsCards);
  const logDailyActivity = useAppStore((s) => s.logDailyActivity);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const openOnboarding = useAppStore((s) => s.openOnboarding);
  const storeHydrated = useAppStore((s) => s.storeHydrated);

  const { openLesson } = useAppNavigation();
  const language = getLanguageDefinition(activeLanguageId);
  const {
    curriculum,
    ready: curriculumReady,
    error: curriculumError,
    retry: retryCurriculum,
  } = useCurriculum(activeLanguageId);
  const {
    insights: dailyInsights,
    error: insightsError,
    retry: retryInsights,
  } = useInsights(activeLanguageId);
  const lessonIndex = useLessonIndex(activeLanguageId);
  const recommendation = useCourseRecommendation(activeLanguageId);

  useEffect(() => {
    setGreeting(getTimeGreeting());
    setInsightIndex(new Date().getDate() % (dailyInsights.length || 1));
    logDailyActivity();
  }, [logDailyActivity, dailyInsights.length]);

  useEffect(() => {
    const refreshWeekly = () => setWeekly(getWeeklyPracticeSummary());
    refreshWeekly();
    window.addEventListener(WEEKLY_PRACTICE_EVENT, refreshWeekly);
    return () => window.removeEventListener(WEEKLY_PRACTICE_EVENT, refreshWeekly);
  }, []);

  // Reset stage filter when language changes
  useEffect(() => {
    setSelectedStageId("all");
    setTopicQuery("");
  }, [activeLanguageId]);

  const completedSet = useMemo(() => new Set(completedLessons), [completedLessons]);
  const hasStartedLesson = Object.keys(lessonProgress).length > 0;
  const isFirstVisit = storeHydrated && completedLessons.length === 0 && !hasStartedLesson;

  useEffect(() => {
    if (!storeHydrated) return;
    document.documentElement.setAttribute(
      "data-returning",
      completedLessons.length > 0 || hasStartedLesson ? "true" : "false"
    );
  }, [storeHydrated, completedLessons.length, hasStartedLesson, activeLanguageId]);

  const shiftCategoriesByLessonId = useMemo(() => {
    const map = new Map<number, string[]>();
    if (!lessonIndex.data) return map;
    for (const entry of lessonIndex.data) {
      if (entry.shift_categories.length > 0) {
        map.set(entry.id, entry.shift_categories);
      }
    }
    return map;
  }, [lessonIndex.data]);

  const branchesByAttachId = useMemo(() => {
    const map = new Map<number, TrailBranch[]>();
    for (const branch of curriculum.trailBranches) {
      const list = map.get(branch.attach) ?? [];
      list.push(branch);
      map.set(branch.attach, list);
    }
    return map;
  }, [curriculum.trailBranches]);

  const stages = useMemo(
    () => buildStages(curriculum.topics, curriculum.trailGates),
    [curriculum.topics, curriculum.trailGates]
  );

  const visibleStages = useMemo(() => {
    const q = topicQuery.trim().toLowerCase();
    return stages
      .filter((stage) => selectedStageId === "all" || stage.id === selectedStageId)
      .map((stage) => ({
        ...stage,
        topics: stage.topics.filter((topic) => {
          const isDone = completedSet.has(topic.core.id);
          if (statusFilter === "completed" && !isDone) return false;
          if (statusFilter === "remaining" && isDone) return false;
          if (!q) return true;
          const shifts = shiftCategoriesByLessonId.get(topic.core.id) ?? [];
          return (
            topic.title.toLowerCase().includes(q) ||
            topic.blurb.toLowerCase().includes(q) ||
            String(topic.id) === q ||
            shifts.some((s) => s.toLowerCase().includes(q)) ||
            topic.sprigs.some((sp) => sp.title.toLowerCase().includes(q))
          );
        }),
      }))
      .filter((stage) => stage.topics.length > 0);
  }, [stages, selectedStageId, statusFilter, topicQuery, completedSet, shiftCategoriesByLessonId]);

  const dueCount = storeHydrated ? getDueCards(srsCards).length : 0;
  const completedCount = storeHydrated ? completedLessons.length : 0;
  const totalLessons = Math.max(1, curriculum.lessonCount || 1);
  const progressPct = Math.min(100, Math.round((completedCount / totalLessons) * 100));

  const starCounts = useMemo(() => {
    let gold = 0;
    let purple = 0;
    if (storeHydrated) {
      for (const star of Object.values(lessonStars)) {
        if (star === "purple") purple++;
        else if (star === "gold") gold++;
      }
    }
    return { total: gold + purple, purple };
  }, [lessonStars, storeHydrated]);

  const firstTopic =
    curriculum.topics.find((t) => t.core.authored) ?? curriculum.topics[0] ?? null;
  const recommendedLesson: LessonShell | null =
    recommendation.nextLesson ?? firstTopic?.core ?? null;
  const recommendedId = recommendedLesson?.id ?? 1;
  const todayInsight = dailyInsights[insightIndex] ?? dailyInsights[0];

  const handleLaunchLesson = (event: React.MouseEvent, lessonId: number) => {
    if (isModifiedClick(event)) return;
    event.preventDefault();
    openLesson(activeLanguageId, lessonId);
  };

  return (
    <div className="max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
      {/* Studio Greeting & Hero Dashboard */}
      <section className="design-hero-surface p-5 sm:p-8 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="design-pill design-mono uppercase tracking-[0.14em]"
                style={{
                  backgroundColor: "var(--design-sapphire-soft)",
                  color: "var(--design-sapphire)",
                }}
              >
                <span aria-hidden="true">{language.flag}</span>
                <span>{language.name} through English</span>
              </span>
              <span className="design-mono text-[11px] text-[var(--design-ink-muted)]">
                {curriculum.totalTopics} topics · {curriculum.lessonCount} lessons
              </span>
            </div>

            <h1 className="design-serif text-3xl sm:text-4xl font-bold text-[var(--design-ink)] leading-[1.12]">
              {isFirstVisit
                ? `You already know more ${language.name} than you think.`
                : `${greeting}, ready to decode ${language.name}?`}
            </h1>

            <p className="text-sm sm:text-base text-[var(--design-ink-muted)] leading-relaxed">
              {language.onboarding.philosophy.demos.slice(0, 3).map((demo, idx) => (
                <React.Fragment key={demo.english}>
                  {idx > 0 ? " · " : null}
                  <span className="design-mono text-[var(--design-ink)] font-medium">
                    {demo.english} → {demo.target}
                  </span>
                </React.Fragment>
              ))}
              . Follow the sound shifts and cognates at your own pace.
            </p>
          </div>

          {/* Next Recommended Lesson Action Card */}
          {language.status === "available" && recommendedLesson && (
            <div className="design-well p-4 sm:p-5 lg:w-80 shrink-0 space-y-3.5">
              <div className="flex items-center justify-between gap-2">
                <span className="design-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--design-emerald)] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>{isFirstVisit ? "Start Here" : "Up Next"}</span>
                </span>
                <span className="design-mono text-[11px] font-semibold text-[var(--design-ink-muted)]">
                  Lesson {recommendedId}
                </span>
              </div>

              <div className="space-y-1">
                <h2 className="design-serif text-lg font-bold text-[var(--design-ink)] leading-snug">
                  {recommendedLesson.title}
                </h2>
                {recommendedLesson.plan && (
                  <p className="text-xs text-[var(--design-ink-muted)] line-clamp-2 leading-relaxed">
                    {recommendedLesson.plan}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Link
                  href={lessonHref(activeLanguageId, recommendedId, "/design")}
                  data-next-lesson-start
                  onPointerEnter={() => prefetchLesson(activeLanguageId, recommendedId)}
                  onFocus={() => prefetchLesson(activeLanguageId, recommendedId)}
                  onClick={(e) => handleLaunchLesson(e, recommendedId)}
                  className="flex-1 min-h-11 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold shadow-xs hover:opacity-95 transition"
                  style={{
                    backgroundColor: "var(--design-sapphire)",
                    color: "var(--design-on-accent)",
                  }}
                >
                  <span>{isFirstVisit ? "Start Topic 1" : "Continue Lesson"}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>

                {isFirstVisit && (
                  <button
                    type="button"
                    onClick={openOnboarding}
                    className="min-h-11 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-[var(--design-surface)] border border-[var(--design-border)] text-xs font-semibold text-[var(--design-ink)] hover:border-[var(--design-sapphire-border)] transition cursor-pointer"
                  >
                    <PlayCircle className="w-4 h-4 text-[var(--design-sapphire)]" aria-hidden="true" />
                    <span>Intro</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* 4 KPI Studio Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-[var(--design-canvas)]/75 border border-[var(--design-border)] space-y-2">
            <div className="flex items-center justify-between text-xs text-[var(--design-ink-muted)]">
              <span>Course Progress</span>
              <BookOpen className="w-3.5 h-3.5 text-[var(--design-emerald)]" aria-hidden="true" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="design-serif text-2xl font-bold text-[var(--design-ink)]">
                {progressPct}%
              </span>
              <span className="design-mono text-xs text-[var(--design-ink-muted)]">
                {completedCount}/{curriculum.lessonCount || "—"}
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-[var(--design-well-deep)] overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progressPct}%`,
                  backgroundColor: "var(--design-emerald)",
                }}
              />
            </div>
          </div>

          <Link
            href="/design/review"
            className="p-3.5 sm:p-4 rounded-2xl bg-[var(--design-canvas)]/75 border border-[var(--design-border)] hover:border-[var(--design-sapphire-border)] transition space-y-1.5 group"
          >
            <div className="flex items-center justify-between text-xs text-[var(--design-ink-muted)]">
              <span>Due Reviews</span>
              <RotateCcw className="w-3.5 h-3.5 text-[var(--design-sapphire)]" aria-hidden="true" />
            </div>
            <div className="design-serif text-2xl font-bold text-[var(--design-ink)] group-hover:text-[var(--design-sapphire)] transition">
              {dueCount}
            </div>
            <div className="design-mono text-[11px] text-[var(--design-ink-muted)]">
              {dueCount > 0 ? "Open review deck →" : "Queue clear"}
            </div>
          </Link>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-[var(--design-canvas)]/75 border border-[var(--design-border)] space-y-1.5">
            <div className="flex items-center justify-between text-xs text-[var(--design-ink-muted)]">
              <span>Weekly Rhythm</span>
              <Calendar className="w-3.5 h-3.5 text-[var(--design-sapphire)]" aria-hidden="true" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="design-serif text-2xl font-bold text-[var(--design-ink)]">
                {weekly.daysPracticed}
              </span>
              <span className="design-mono text-xs text-[var(--design-ink-muted)]">
                / 7 days
              </span>
            </div>
            <div className="flex items-center gap-1 pt-0.5" aria-hidden="true">
              {Array.from({ length: 7 }).map((_, i) => (
                <span
                  key={i}
                  className="h-1.5 flex-1 rounded-full"
                  style={{
                    backgroundColor:
                      i < weekly.daysPracticed
                        ? "var(--design-emerald)"
                        : "var(--design-well-deep)",
                  }}
                />
              ))}
            </div>
          </div>

          <div className="p-3.5 sm:p-4 rounded-2xl bg-[var(--design-canvas)]/75 border border-[var(--design-border)] space-y-1.5">
            <div className="flex items-center justify-between text-xs text-[var(--design-ink-muted)]">
              <span>Mastery Stars</span>
              <Star className="w-3.5 h-3.5 text-[var(--design-amber)]" aria-hidden="true" />
            </div>
            <div className="design-serif text-2xl font-bold text-[var(--design-ink)]">
              {starCounts.total}
            </div>
            <div className="design-mono text-[11px] text-[var(--design-ink-muted)]">
              {starCounts.purple} flawless runs
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Browser */}
      {language.status !== "available" ? (
        <section className="design-card p-8 text-center space-y-3">
          <Clock className="w-8 h-8 text-[var(--design-sapphire)] mx-auto" aria-hidden="true" />
          <h2 className="design-serif text-xl font-bold text-[var(--design-ink)]">
            The {language.name} trail is under construction
          </h2>
          <p className="text-sm text-[var(--design-ink-muted)] max-w-md mx-auto leading-relaxed">
            Switch courses anytime from the studio rail — each language keeps its own independent progress.
          </p>
        </section>
      ) : !curriculumReady ? (
        curriculumError ? (
          <div
            role="alert"
            className="design-card p-8 text-center space-y-3 border-[var(--error-color)]/30"
          >
            <p className="text-sm text-[var(--design-ink-muted)]">
              The {language.name} curriculum could not be loaded.
            </p>
            <button
              type="button"
              onClick={() =>
                isChunkLoadError(curriculumError) ? window.location.reload() : retryCurriculum()
              }
              className="min-h-11 px-5 py-2 rounded-full text-xs font-bold cursor-pointer"
              style={{
                backgroundColor: "var(--design-sapphire)",
                color: "var(--design-on-accent)",
              }}
            >
              {isChunkLoadError(curriculumError) ? "Reload page" : "Try again"}
            </button>
          </div>
        ) : (
          <HomeSkeleton />
        )
      ) : activeLanguageId === "de" ? (
        <GermanTrailMap />
      ) : (
        <section aria-labelledby="curriculum-heading" className="space-y-5">
          {/* Curriculum Header + Controls */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <span className="design-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--design-sapphire)]">
                Interactive Curriculum
              </span>
              <h2
                id="curriculum-heading"
                className="design-serif text-2xl sm:text-3xl font-bold text-[var(--design-ink)]"
              >
                {language.name} Learning Trail
              </h2>
            </div>

            <div className="relative w-full sm:w-64">
              <Search
                className="w-4 h-4 text-[var(--design-ink-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={topicQuery}
                onChange={(e) => setTopicQuery(e.target.value)}
                aria-label="Filter curriculum topics"
                placeholder="Filter topics or shifts…"
                className="min-h-11 w-full pl-10 pr-3.5 py-2 rounded-full bg-[var(--design-surface)] border border-[var(--design-border)] text-sm text-[var(--design-ink)] placeholder:text-[var(--design-ink-muted)] focus:outline-none focus:border-[var(--design-sapphire)] transition"
              />
            </div>
          </div>

          {/* Stage & Status Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 max-w-full">
              <button
                type="button"
                aria-pressed={selectedStageId === "all"}
                onClick={() => setSelectedStageId("all")}
                className="min-h-10 shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer"
                style={
                  selectedStageId === "all"
                    ? {
                        backgroundColor: "var(--design-sapphire)",
                        color: "var(--design-on-accent)",
                        borderColor: "var(--design-sapphire)",
                      }
                    : {
                        backgroundColor: "var(--design-surface)",
                        color: "var(--design-ink-muted)",
                        borderColor: "var(--design-border)",
                      }
                }
              >
                All units ({curriculum.topics.length})
              </button>
              {stages.map((stage) => {
                const active = selectedStageId === stage.id;
                return (
                  <button
                    key={stage.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedStageId(stage.id)}
                    className="min-h-10 shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition cursor-pointer"
                    style={
                      active
                        ? {
                            backgroundColor: "var(--design-sapphire)",
                            color: "var(--design-on-accent)",
                            borderColor: "var(--design-sapphire)",
                          }
                        : {
                            backgroundColor: "var(--design-surface)",
                            color: "var(--design-ink-muted)",
                            borderColor: "var(--design-border)",
                          }
                    }
                  >
                    {stage.index}. {stage.title}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-1 p-1 rounded-full bg-[var(--design-well)] border border-[var(--design-border)]">
              {(["all", "remaining", "completed"] as const).map((filter) => {
                const active = statusFilter === filter;
                return (
                  <button
                    key={filter}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setStatusFilter(filter)}
                    className={`min-h-9 px-3 rounded-full text-xs font-semibold capitalize transition cursor-pointer ${
                      active ? "shadow-xs" : "text-[var(--design-ink-muted)] hover:text-[var(--design-ink)]"
                    }`}
                    style={
                      active
                        ? {
                            backgroundColor: "var(--design-surface)",
                            color: "var(--design-ink)",
                          }
                        : undefined
                    }
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stage Sections */}
          {visibleStages.length === 0 ? (
            <div className="design-card p-8 text-center space-y-2">
              <p className="text-sm font-medium text-[var(--design-ink)]">
                No topics match your current filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedStageId("all");
                  setStatusFilter("all");
                  setTopicQuery("");
                }}
                className="min-h-10 px-4 rounded-full design-mono text-xs font-semibold text-[var(--design-sapphire)] underline underline-offset-4 cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {visibleStages.map((stage) => {
                const stageCompleted = stage.topics.filter((t) =>
                  completedSet.has(t.core.id)
                ).length;
                return (
                  <div key={stage.id} className="space-y-3.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 pb-1.5 border-b border-[var(--design-border)]">
                      <div className="flex items-baseline gap-2.5">
                        <span className="design-mono text-xs font-bold text-[var(--design-sapphire)]">
                          0{stage.index}
                        </span>
                        <h3 className="design-serif text-xl font-bold text-[var(--design-ink)]">
                          {stage.title}
                        </h3>
                        <span className="design-mono text-xs text-[var(--design-ink-muted)]">
                          {stage.subtitle}
                        </span>
                      </div>
                      <span className="design-mono text-xs font-semibold text-[var(--design-emerald)]">
                        {stageCompleted}/{stage.topics.length} core done
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {stage.topics.map((topic) => {
                        const coreDone = completedSet.has(topic.core.id);
                        const coreStar = lessonStars[topic.core.id];
                        const isRecommended = topic.core.id === recommendedId;
                        const shiftBadges = (
                          shiftCategoriesByLessonId.get(topic.core.id) ?? []
                        ).slice(0, 3);

                        const attachedBranches = branchesByAttachId.get(topic.core.id) ?? [];
                        const extras: Array<{ shell: LessonShell; tag: string }> = [
                          ...(topic.stories ?? []).map((s) => ({
                            shell: s,
                            tag: s.label ?? "Story",
                          })),
                          ...topic.sprigs.map((sp) => ({
                            shell: sp,
                            tag: sp.required ? "Required" : "Sprig",
                          })),
                          ...attachedBranches.flatMap((br) =>
                            br.lessons.map((l) => ({
                              shell: l,
                              tag: br.required ? "Part 2" : "Branch",
                            }))
                          ),
                        ];

                        return (
                          <article
                            key={topic.id}
                            className="design-card design-card-interactive p-5 flex flex-col justify-between gap-4"
                            style={
                              isRecommended
                                ? { borderColor: "var(--design-sapphire-border)" }
                                : undefined
                            }
                          >
                            <div className="space-y-3">
                              <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="design-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[var(--design-well)] text-[var(--design-ink)]">
                                    Topic {String(topic.id).padStart(2, "0")}
                                  </span>
                                  {isRecommended && (
                                    <span
                                      className="design-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                                      style={{
                                        backgroundColor: "var(--design-sapphire-soft)",
                                        color: "var(--design-sapphire)",
                                      }}
                                    >
                                      Recommended
                                    </span>
                                  )}
                                </div>

                                {coreDone ? (
                                  <span
                                    className="inline-flex items-center gap-1 design-mono text-[11px] font-semibold"
                                    style={{ color: "var(--design-emerald)" }}
                                  >
                                    <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                                    <span>{coreStar === "purple" ? "Flawless" : "Done"}</span>
                                  </span>
                                ) : (
                                  <span className="design-mono text-[11px] text-[var(--design-ink-muted)]">
                                    Core #{topic.core.id}
                                  </span>
                                )}
                              </div>

                              <div className="space-y-1">
                                <h4 className="design-serif text-lg font-bold text-[var(--design-ink)] leading-snug">
                                  {topic.title}
                                </h4>
                                <p className="text-sm text-[var(--design-ink-muted)] leading-relaxed">
                                  {topic.blurb}
                                </p>
                              </div>

                              {/* Sound-shift / Pattern Preview Badges */}
                              {shiftBadges.length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                  {shiftBadges.map((badge) => (
                                    <span
                                      key={badge}
                                      className="design-mono text-[11px] px-2.5 py-0.5 rounded-full bg-[var(--design-well)] text-[var(--design-sapphire)] font-medium"
                                    >
                                      {formatShiftBadge(badge)}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* Extra Sprigs, Stories & Branches */}
                              {extras.length > 0 && (
                                <div className="pt-1 flex flex-wrap gap-1.5">
                                  {extras.map(({ shell, tag }) => {
                                    const extraDone = completedSet.has(shell.id);
                                    return (
                                      <Link
                                        key={shell.id}
                                        href={lessonHref(activeLanguageId, shell.id, "/design")}
                                        onPointerEnter={() => prefetchLesson(activeLanguageId, shell.id)}
                                        onFocus={() => prefetchLesson(activeLanguageId, shell.id)}
                                        onClick={(e) => handleLaunchLesson(e, shell.id)}
                                        className="min-h-9 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-xs transition hover:border-[var(--design-sapphire-border)]"
                                        style={
                                          extraDone
                                            ? {
                                                backgroundColor: "var(--design-emerald-soft)",
                                                borderColor: "var(--design-emerald-border)",
                                                color: "var(--design-ink)",
                                              }
                                            : {
                                                backgroundColor: "var(--design-canvas)",
                                                borderColor: "var(--design-border)",
                                                color: "var(--design-ink-muted)",
                                              }
                                        }
                                      >
                                        <span className="design-mono text-[10px] uppercase font-bold opacity-75">
                                          {tag}
                                        </span>
                                        <span className="truncate max-w-[160px] font-medium text-[var(--design-ink)]">
                                          {shell.title}
                                        </span>
                                      </Link>
                                    );
                                  })}
                                </div>
                              )}
                            </div>

                            <div className="pt-3 border-t border-[var(--design-border)] flex items-center justify-between gap-3">
                              <Link
                                href={lessonHref(activeLanguageId, topic.core.id, "/design")}
                                className="design-mono text-xs text-[var(--design-ink-muted)] hover:text-[var(--design-sapphire)] underline decoration-dotted underline-offset-4 transition"
                              >
                                Lesson overview
                              </Link>

                              <Link
                                href={lessonHref(activeLanguageId, topic.core.id, "/design")}
                                onPointerEnter={() =>
                                  prefetchLesson(activeLanguageId, topic.core.id)
                                }
                                onFocus={() => prefetchLesson(activeLanguageId, topic.core.id)}
                                onClick={(e) => handleLaunchLesson(e, topic.core.id)}
                                className="min-h-11 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition"
                                style={
                                  coreDone
                                    ? {
                                        backgroundColor: "var(--design-well)",
                                        color: "var(--design-ink)",
                                      }
                                    : {
                                        backgroundColor: "var(--design-sapphire)",
                                        color: "var(--design-on-accent)",
                                      }
                                }
                              >
                                <span>{coreDone ? "Replay" : "Open Lesson"}</span>
                                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                              </Link>
                            </div>
                          </article>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* Daily Insight + Studio Shortcuts */}
      <section className="space-y-4 pt-2">
        {todayInsight ? (
          <DailyInsightCard insight={todayInsight} languageName={language.name} />
        ) : insightsError ? (
          <button
            type="button"
            onClick={() =>
              isChunkLoadError(insightsError) ? window.location.reload() : retryInsights()
            }
            className="mx-auto block design-mono text-xs text-[var(--design-ink-muted)] underline decoration-dotted cursor-pointer"
          >
            Daily insight unavailable — retry
          </button>
        ) : null}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/design/read"
            className="design-card design-card-interactive p-4 flex flex-col gap-2"
          >
            <Eye className="w-5 h-5 text-[var(--design-sapphire)]" aria-hidden="true" />
            <span className="text-sm font-bold text-[var(--design-ink)]">Reading Lens</span>
            <span className="text-xs text-[var(--design-ink-muted)]">
              Annotate any {language.name} passage
            </span>
          </Link>

          <Link
            href="/design/mistakes"
            className="design-card design-card-interactive p-4 flex flex-col gap-2"
          >
            <FileWarning className="w-5 h-5 text-[var(--design-sapphire)]" aria-hidden="true" />
            <span className="text-sm font-bold text-[var(--design-ink)]">Mistake Notebook</span>
            <span className="text-xs text-[var(--design-ink-muted)]">
              Turn slips into mastery
            </span>
          </Link>

          <Link
            href="/design/panorama"
            className="design-card design-card-interactive p-4 flex flex-col gap-2"
          >
            <Layers className="w-5 h-5 text-[var(--design-sapphire)]" aria-hidden="true" />
            <span className="text-sm font-bold text-[var(--design-ink)]">Grammar Panorama</span>
            <span className="text-xs text-[var(--design-ink-muted)]">
              Whole-language structure map
            </span>
          </Link>

          <Link
            href="/design/cando"
            className="design-card design-card-interactive p-4 flex flex-col gap-2"
          >
            <Award className="w-5 h-5 text-[var(--design-emerald)]" aria-hidden="true" />
            <span className="text-sm font-bold text-[var(--design-ink)]">Can-Do Goals</span>
            <span className="text-xs text-[var(--design-ink-muted)]">
              CEFR A1–A2 milestones
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
