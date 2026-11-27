"use client";

import { GermanTrailMap } from "@/components/trail/GermanTrailMap";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  AlertCircle,
  ArrowRight,
  Award,
  BookOpen,
  Check,
  ChevronDown,
  ChevronRight,
  Clock,
  Compass,
  GitBranch,
  Layers,
  Lock,
  PlayCircle,
  RotateCcw,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { isModifiedClick, useAppNavigation } from "@/lib/app-navigation";
import { getLanguageDefinition } from "@/data/languages";
import { useCurriculum } from "@/data/curriculum-client";
import { useInsights } from "@/data/insights-client";
import { useCourseRecommendation } from "@/lib/use-course-recommendation";
import { getDueCards } from "@/lib/srs";
import { getWordCount } from "@/data/word-counts";
import { prefetchLesson } from "@/lib/content-client";
import { isChunkLoadError } from "@/lib/chunk-errors";
import { HomeSkeleton } from "@/components/common/HomeSkeleton";
import type { LessonShell, TopicCluster, TrailBranch } from "@/lib/types";

const DailyInsightCard = dynamic(
  () => import("@/components/common/DailyInsightCard").then((m) => m.DailyInsightCard),
  { ssr: false }
);

interface TopicBand {
  id: string;
  label: string;
  rangeLabel: string;
  topics: TopicCluster[];
  completedCount: number;
  totalCount: number;
}

function tasteLessonHref(languageId: string, lessonId: number): string {
  return `/taste/?lesson=${lessonId}&lang=${encodeURIComponent(languageId)}`;
}

export function TasteHome() {
  const [mounted, setMounted] = useState(false);
  const [insightIndex, setInsightIndex] = useState(0);
  const [query, setQuery] = useState("");
  const [collapsedBands, setCollapsedBands] = useState<Record<string, boolean>>({});

  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const completedLessons = useAppStore((s) => s.completedLessons);
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const lessonStars = useAppStore((s) => s.lessonStars);
  const wordMastery = useAppStore((s) => s.wordMastery);
  const srsCards = useAppStore((s) => s.srsCards);
  const logDailyActivity = useAppStore((s) => s.logDailyActivity);
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
  const { insights: dailyInsights, error: insightsError, retry: retryInsights } =
    useInsights(activeLanguageId);
  const { state: trailState, nextLesson, forwardLesson, continueAhead } =
    useCourseRecommendation(activeLanguageId);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setInsightIndex(new Date().getDate() % (dailyInsights.length || 1));
    logDailyActivity();
  }, [logDailyActivity, dailyInsights.length]);

  const hasStartedLesson = Object.keys(lessonProgress).length > 0;
  const isFirstVisit = completedLessons.length === 0 && !hasStartedLesson;

  useEffect(() => {
    if (!storeHydrated) return;
    document.documentElement.setAttribute(
      "data-returning",
      isFirstVisit ? "false" : "true"
    );
  }, [storeHydrated, isFirstVisit, activeLanguageId]);

  const firstTopic =
    curriculum.topics.find((topic) => topic.core.authored) ?? curriculum.topics[0] ?? null;
  const firstLessonId = firstTopic?.core.id ?? 1;

  const wordsSeen = useMemo(() => {
    if (!mounted) return 0;
    return Object.entries(wordMastery).filter(
      ([id, m]) =>
        (m === "encountered" || m === "mastered") &&
        !/^(sentence_|article_|compound_|trap_)/.test(id)
    ).length;
  }, [mounted, wordMastery]);

  const totalWords = mounted ? getWordCount(activeLanguageId) : 0;
  const dueCount = mounted ? getDueCards(srsCards).length : 0;
  const flawlessCount = mounted
    ? Object.values(lessonStars).filter((s) => s === "purple").length
    : 0;

  // Map branches to their owning topic for inline display
  const branchesByTopicId = useMemo(() => {
    const map = new Map<number, TrailBranch[]>();
    const ownerToTopic = new Map<number, number>();
    for (const topic of curriculum.topics) {
      ownerToTopic.set(topic.core.id, topic.id);
      for (const sprig of topic.sprigs) {
        ownerToTopic.set(sprig.id, topic.id);
      }
    }
    for (const branch of curriculum.trailBranches) {
      const topicId = ownerToTopic.get(branch.attach);
      if (topicId === undefined) continue;
      const list = map.get(topicId) ?? [];
      list.push(branch);
      map.set(topicId, list);
    }
    return map;
  }, [curriculum.topics, curriculum.trailBranches]);

  // Group topics into clean checkpoint bands (using trailGates when present, else chunks of 6)
  const bands = useMemo<TopicBand[]>(() => {
    const topics = curriculum.topics;
    if (topics.length === 0) return [];

    const gates = [...curriculum.trailGates].sort((a, b) => a.afterTopic - b.afterTopic);
    const groups: Array<{ id: string; label: string; topics: TopicCluster[] }> = [];

    if (gates.length > 0) {
      let start = 1;
      gates.forEach((gate, idx) => {
        const slice = topics.filter((t) => t.id >= start && t.id <= gate.afterTopic);
        if (slice.length > 0) {
          groups.push({
            id: `band-${gate.id}`,
            label: gate.title.replace(/^The /, ""),
            topics: slice,
          });
        }
        start = gate.afterTopic + 1;
        if (idx === gates.length - 1) {
          const rest = topics.filter((t) => t.id >= start);
          if (rest.length > 0) {
            groups.push({
              id: "band-final",
              label: curriculum.epilogueTitle || "Mastery Stretch",
              topics: rest,
            });
          }
        }
      });
    } else {
      for (let i = 0; i < topics.length; i += 6) {
        const slice = topics.slice(i, i + 6);
        groups.push({
          id: `band-${i}`,
          label: `Section ${Math.floor(i / 6) + 1}`,
          topics: slice,
        });
      }
    }

    return groups.map((group) => {
      const firstId = group.topics[0]?.id ?? 1;
      const lastId = group.topics[group.topics.length - 1]?.id ?? firstId;
      let totalCount = 0;
      let completedCount = 0;
      for (const t of group.topics) {
        const lessons = [
          t.core,
          ...(t.stories ?? []),
          ...t.sprigs,
          ...(branchesByTopicId.get(t.id) ?? []).flatMap((b) => b.lessons),
        ].filter((l) => l.authored !== false);
        totalCount += lessons.length;
        completedCount += lessons.filter((l) => completedLessons.includes(l.id)).length;
      }
      return {
        id: group.id,
        label: group.label,
        rangeLabel: firstId === lastId ? `Topic ${firstId}` : `Topics ${firstId}–${lastId}`,
        topics: group.topics,
        completedCount,
        totalCount,
      };
    });
  }, [curriculum.topics, curriculum.trailGates, curriculum.epilogueTitle, branchesByTopicId, completedLessons]);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredBands = useMemo(() => {
    if (!normalizedQuery) return bands;
    return bands
      .map((band) => {
        const matchingTopics = band.topics.filter((topic) => {
          if (
            topic.title.toLowerCase().includes(normalizedQuery) ||
            topic.blurb.toLowerCase().includes(normalizedQuery) ||
            `topic ${topic.id}`.includes(normalizedQuery)
          ) {
            return true;
          }
          const allLessons = [
            topic.core,
            ...(topic.stories ?? []),
            ...topic.sprigs,
            ...(branchesByTopicId.get(topic.id) ?? []).flatMap((b) => b.lessons),
          ];
          return allLessons.some(
            (l) =>
              l.title.toLowerCase().includes(normalizedQuery) ||
              l.plan.toLowerCase().includes(normalizedQuery)
          );
        });
        return { ...band, topics: matchingTopics };
      })
      .filter((b) => b.topics.length > 0);
  }, [bands, normalizedQuery, branchesByTopicId]);

  const toggleBand = (bandId: string) => {
    setCollapsedBands((prev) => ({ ...prev, [bandId]: !prev[bandId] }));
  };

  const handleOpenLesson = (event: React.MouseEvent, lessonId: number) => {
    if (isModifiedClick(event)) return;
    event.preventDefault();
    openLesson(activeLanguageId, lessonId);
  };

  const todayInsight = dailyInsights[insightIndex] ?? dailyInsights[0];
  const recommendedLesson = nextLesson ?? firstTopic?.core ?? null;

  return (
    <div className="taste-wrap py-6 sm:py-8 space-y-8">
      {/* Editorial First-Visit Hero */}
      {isFirstVisit && language.status === "available" && (
        <section
          aria-labelledby="taste-hero-heading"
          className="first-visit-hero taste-surface p-6 sm:p-8 lg:p-10 space-y-6"
        >
          <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-end">
            <div className="space-y-4 taste-enter">
              <div className="taste-mono text-[11px] uppercase tracking-widest text-[var(--taste-accent)] font-semibold">
                {language.name} through English
              </div>
              <h1
                id="taste-hero-heading"
                className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--taste-ink)] leading-[1.12]"
              >
                Decode {language.name} through the English words you already know.
              </h1>
              <p className="text-[15px] text-[var(--taste-muted)] leading-relaxed max-w-xl">
                Brücke maps the sound shifts and conversion bridges linking English and{" "}
                {language.name}. Instead of memorizing isolated flashcards, you learn the rules
                that unlock entire word families.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href={tasteLessonHref(activeLanguageId, firstLessonId)}
                  data-next-lesson-start
                  onPointerEnter={() => prefetchLesson(activeLanguageId, firstLessonId)}
                  onFocus={() => prefetchLesson(activeLanguageId, firstLessonId)}
                  onClick={(event) => handleOpenLesson(event, firstLessonId)}
                  className="taste-btn-primary"
                >
                  <span>{activeLanguageId === "de" ? "Start Lesson 1" : "Start Topic 1"}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <button
                  type="button"
                  onClick={openOnboarding}
                  className="taste-btn-secondary"
                >
                  <PlayCircle className="w-4 h-4 text-[var(--taste-accent)]" aria-hidden="true" />
                  <span>60-second intro</span>
                </button>
              </div>
            </div>

            {/* Concrete cognate pairs panel */}
            <div className="rounded-lg border border-[var(--taste-border)] bg-[var(--taste-surface-2)] p-4 sm:p-5 space-y-3 taste-enter-delay-1">
              <div className="flex items-center justify-between taste-mono text-[11px] uppercase tracking-wider text-[var(--taste-muted)]">
                <span>Live cognate bridges</span>
                <span>
                  {curriculum.totalTopics} topics · {curriculum.lessonCount} lessons
                </span>
              </div>
              <dl className="divide-y divide-[var(--taste-border)]">
                {language.onboarding.philosophy.demos.slice(0, 3).map((demo) => (
                  <div
                    key={demo.english}
                    className="py-2.5 first:pt-1 last:pb-0 flex items-baseline justify-between gap-3 taste-mono text-sm"
                  >
                    <dt className="text-[var(--taste-muted)]">{demo.english}</dt>
                    <dd className="font-semibold text-[var(--taste-ink)] flex items-center gap-2">
                      <span className="text-[var(--taste-accent)]" aria-hidden="true">
                        →
                      </span>
                      <span lang={activeLanguageId}>{demo.target}</span>
                    </dd>
                  </div>
                ))}
              </dl>
              <p className="taste-mono text-[11px] text-[var(--taste-muted)] pt-1">
                No account required · progress stays locally in this browser.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Returning Header + Metrics Strip */}
      <section aria-label="Course overview" className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="space-y-1">
            <span className="taste-mono text-[11px] uppercase tracking-widest text-[var(--taste-accent)] font-semibold">
              {language.name} Trail
            </span>
            {isFirstVisit ? (
              <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[var(--taste-ink)]">
                Curriculum &amp; Progress
              </h2>
            ) : (
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--taste-ink)]">
                {language.name} Curriculum
              </h1>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link href="/taste/panorama" className="taste-btn-ghost border border-[var(--taste-border)]">
              <Layers className="w-3.5 h-3.5 text-[var(--taste-accent)]" aria-hidden="true" />
              <span>Panorama</span>
            </Link>
            <Link href="/taste/cando" className="taste-btn-ghost border border-[var(--taste-border)]">
              <Award className="w-3.5 h-3.5 text-[var(--taste-accent)]" aria-hidden="true" />
              <span>Can-Do</span>
            </Link>
            <Link href="/taste/mistakes" className="taste-btn-ghost border border-[var(--taste-border)]">
              <AlertCircle className="w-3.5 h-3.5 text-[var(--taste-accent)]" aria-hidden="true" />
              <span>Mistakes</span>
            </Link>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="taste-surface p-4 space-y-1">
            <div className="taste-mono text-[11px] uppercase tracking-wider text-[var(--taste-muted)]">
              Lessons done
            </div>
            <div className="taste-mono text-2xl font-semibold text-[var(--taste-ink)]">
              {mounted ? completedLessons.length : 0}
              <span className="text-sm font-normal text-[var(--taste-muted)]">
                {" "}
                / {curriculum.lessonCount}
              </span>
            </div>
          </div>

          <div className="taste-surface p-4 space-y-1">
            <div className="taste-mono text-[11px] uppercase tracking-wider text-[var(--taste-muted)]">
              Words seen
            </div>
            <div className="taste-mono text-2xl font-semibold text-[var(--taste-ink)]">
              {wordsSeen}
              {totalWords > 0 && (
                <span className="text-sm font-normal text-[var(--taste-muted)]">
                  {" "}
                  / {totalWords}
                </span>
              )}
            </div>
          </div>

          <div className="taste-surface p-4 space-y-1">
            <div className="taste-mono text-[11px] uppercase tracking-wider text-[var(--taste-muted)]">
              Flawless runs
            </div>
            <div className="taste-mono text-2xl font-semibold text-[var(--taste-ink)]">
              {flawlessCount}
            </div>
          </div>

          <Link
            href="/taste/review"
            className="taste-card-link p-4 flex flex-col justify-between space-y-1"
          >
            <div className="flex items-center justify-between taste-mono text-[11px] uppercase tracking-wider text-[var(--taste-muted)]">
              <span>Due review</span>
              <RotateCcw className="w-3.5 h-3.5 text-[var(--taste-accent)]" aria-hidden="true" />
            </div>
            <div className="taste-mono text-2xl font-semibold text-[var(--taste-accent)]">
              {dueCount}
            </div>
          </Link>
        </div>
      </section>

      {/* Main Course Body */}
      {language.status !== "available" ? (
        <section className="taste-surface p-8 text-center space-y-3">
          <Clock className="w-7 h-7 text-[var(--taste-accent)] mx-auto" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-[var(--taste-ink)]">
            {language.name} trail is in preparation
          </h2>
          <p className="text-sm text-[var(--taste-muted)] max-w-md mx-auto leading-relaxed">
            Switch to an available course from the top language switcher. Each language keeps its
            own progress and review schedule.
          </p>
        </section>
      ) : !curriculumReady ? (
        curriculumError ? (
          <section role="alert" className="taste-surface p-8 text-center space-y-4">
            <p className="text-sm taste-mono text-[var(--taste-muted)]">
              The course could not be loaded.
            </p>
            <button
              type="button"
              onClick={() =>
                isChunkLoadError(curriculumError) ? window.location.reload() : retryCurriculum()
              }
              className="taste-btn-primary"
            >
              {isChunkLoadError(curriculumError) ? "Reload page" : "Try again"}
            </button>
          </section>
        ) : (
          <HomeSkeleton />
        )
      ) : activeLanguageId === "de" ? (
        <GermanTrailMap />
      ) : (
        <>
          {/* Next-Up Action Card */}
          {recommendedLesson && (
            <section
              aria-label="Next recommended lesson"
              className="taste-surface p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border-l-4"
              style={{ borderLeftColor: "var(--taste-accent)" }}
            >
              <div className="space-y-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 taste-mono text-[11px] uppercase tracking-wider text-[var(--taste-accent)] font-semibold">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>
                    {lessonProgress[recommendedLesson.id] ? "Resume lesson" : "Next up"}
                  </span>
                  <span className="text-[var(--taste-muted)]">· Lesson {recommendedLesson.id}</span>
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-[var(--taste-ink)] truncate">
                  {recommendedLesson.title}
                </h2>
                <p className="text-sm text-[var(--taste-muted)] line-clamp-2">
                  {recommendedLesson.plan}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                <Link
                  href={tasteLessonHref(activeLanguageId, recommendedLesson.id)}
                  onPointerEnter={() => prefetchLesson(activeLanguageId, recommendedLesson.id)}
                  onFocus={() => prefetchLesson(activeLanguageId, recommendedLesson.id)}
                  onClick={(event) => handleOpenLesson(event, recommendedLesson.id)}
                  className="taste-btn-primary"
                >
                  <span>
                    {lessonProgress[recommendedLesson.id] ? "Continue lesson" : "Open lesson"}
                  </span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                {forwardLesson && (
                  <button
                    type="button"
                    onClick={() => {
                      const nextId = continueAhead();
                      if (nextId !== null) openLesson(activeLanguageId, nextId);
                    }}
                    className="taste-btn-secondary"
                  >
                    <span>Skip ahead</span>
                  </button>
                )}
              </div>
            </section>
          )}

          {/* Curriculum Search & Band Controls */}
          <section aria-label="Curriculum topics" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search
                  className="w-4 h-4 text-[var(--taste-muted)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Filter curriculum topics and lessons"
                  placeholder="Filter topics, shifts, or lessons…"
                  className="min-h-11 w-full rounded-md border border-[var(--taste-border)] bg-[var(--taste-surface)] pl-9 pr-3 text-sm text-[var(--taste-ink)] placeholder:text-[var(--taste-muted)] focus:border-[var(--taste-accent)]"
                />
              </div>

              <div className="flex items-center gap-3 taste-mono text-xs text-[var(--taste-muted)]">
                <span>
                  {curriculum.totalTopics} topics · {curriculum.lessonCount} lessons
                </span>
                <Link
                  href="/taste/atlas"
                  className="inline-flex items-center gap-1 text-[var(--taste-accent)] hover:underline underline-offset-2"
                >
                  <Compass className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Sound Atlas</span>
                </Link>
              </div>
            </div>

            {filteredBands.length === 0 ? (
              <div className="taste-surface p-8 text-center space-y-2">
                <p className="text-sm text-[var(--taste-ink)]">
                  No topics match &ldquo;{query}&rdquo;.
                </p>
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="taste-mono text-xs text-[var(--taste-accent)] underline underline-offset-2 cursor-pointer"
                >
                  Clear filter
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredBands.map((band) => {
                  const isCollapsed = !normalizedQuery && Boolean(collapsedBands[band.id]);
                  const pct =
                    band.totalCount > 0
                      ? Math.round((band.completedCount / band.totalCount) * 100)
                      : 0;

                  return (
                    <div
                      key={band.id}
                      className="taste-surface overflow-hidden"
                    >
                      <button
                        type="button"
                        aria-expanded={!isCollapsed}
                        onClick={() => toggleBand(band.id)}
                        className="w-full min-h-12 px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 text-left bg-[var(--taste-surface-2)]/60 hover:bg-[var(--taste-surface-2)] transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {isCollapsed ? (
                            <ChevronRight
                              className="w-4 h-4 text-[var(--taste-muted)] shrink-0"
                              aria-hidden="true"
                            />
                          ) : (
                            <ChevronDown
                              className="w-4 h-4 text-[var(--taste-muted)] shrink-0"
                              aria-hidden="true"
                            />
                          )}
                          <span className="font-semibold text-sm sm:text-[15px] text-[var(--taste-ink)] truncate">
                            {band.label}
                          </span>
                          <span className="taste-mono text-[11px] text-[var(--taste-muted)] shrink-0">
                            {band.rangeLabel}
                          </span>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="hidden sm:block w-24 h-1.5 rounded-full bg-[var(--taste-border)] overflow-hidden">
                            <div
                              className="h-full bg-[var(--taste-accent)] transition-all duration-200"
                              style={{ width: `${pct}%` }}
                            />
                          </div>
                          <span className="taste-mono text-xs text-[var(--taste-muted)]">
                            {band.completedCount}/{band.totalCount}
                          </span>
                        </div>
                      </button>

                      {!isCollapsed && (
                        <div className="divide-y divide-[var(--taste-border)]">
                          {band.topics.map((topic) => {
                            const topicBranches = branchesByTopicId.get(topic.id) ?? [];
                            const topicLessons: Array<{
                              lesson: LessonShell;
                              kind: "core" | "story" | "sprig" | "branch";
                            }> = [
                              { lesson: topic.core, kind: "core" },
                              ...(topic.stories ?? []).map((lesson) => ({
                                lesson,
                                kind: "story" as const,
                              })),
                              ...topic.sprigs.map((lesson) => ({
                                lesson,
                                kind: "sprig" as const,
                              })),
                              ...topicBranches.flatMap((b) =>
                                b.lessons.map((lesson) => ({
                                  lesson,
                                  kind: "branch" as const,
                                }))
                              ),
                            ];

                            return (
                              <div key={topic.id} className="p-4 sm:px-5 space-y-3">
                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                  <div className="flex items-baseline gap-2.5 min-w-0">
                                    <span className="taste-mono text-xs font-semibold text-[var(--taste-accent)] shrink-0">
                                      {String(topic.id).padStart(2, "0")}
                                    </span>
                                    <h3 className="text-[15px] font-semibold text-[var(--taste-ink)]">
                                      {topic.title}
                                    </h3>
                                  </div>
                                  <p className="text-xs text-[var(--taste-muted)] max-w-xl">
                                    {topic.blurb}
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                                  {topicLessons.map(({ lesson, kind }) => {
                                    const nodeView = trailState.nodes.get(lesson.id);
                                    const status = nodeView?.status ?? (lesson.authored === false ? "coming-soon" : "available");
                                    const isCompleted = completedLessons.includes(lesson.id);
                                    const isInProgress = Boolean(lessonProgress[lesson.id]) && !isCompleted;
                                    const isRecommended = trailState.recommendedId === lesson.id;
                                    const isLocked = status === "locked";
                                    const isComingSoon = status === "coming-soon" || lesson.authored === false;
                                    const star = lessonStars[lesson.id];

                                    const badgeText =
                                      kind === "core"
                                        ? "Core"
                                        : kind === "story"
                                        ? "Story"
                                        : kind === "branch"
                                        ? "Branch"
                                        : lesson.required
                                        ? "Required"
                                        : "Extra";

                                    if (isComingSoon) {
                                      return (
                                        <div
                                          key={lesson.id}
                                          className="rounded-lg border border-dashed border-[var(--taste-border)] px-3.5 py-3 opacity-60 flex items-center justify-between gap-2"
                                        >
                                          <div className="min-w-0">
                                            <div className="taste-mono text-[10px] uppercase tracking-wider text-[var(--taste-muted)]">
                                              {badgeText} · Coming soon
                                            </div>
                                            <div className="text-sm font-medium text-[var(--taste-muted)] truncate mt-0.5">
                                              {lesson.title}
                                            </div>
                                          </div>
                                          <Clock className="w-3.5 h-3.5 text-[var(--taste-muted)] shrink-0" aria-hidden="true" />
                                        </div>
                                      );
                                    }

                                    return (
                                      <Link
                                        key={lesson.id}
                                        href={tasteLessonHref(activeLanguageId, lesson.id)}
                                        onPointerEnter={() => prefetchLesson(activeLanguageId, lesson.id)}
                                        onFocus={() => prefetchLesson(activeLanguageId, lesson.id)}
                                        onClick={(event) => handleOpenLesson(event, lesson.id)}
                                        className={`taste-card-link px-3.5 py-3 flex flex-col justify-between gap-2 ${
                                          isRecommended
                                            ? "border-[var(--taste-accent)] bg-[var(--taste-accent-soft)]"
                                            : isLocked
                                            ? "opacity-75"
                                            : ""
                                        }`}
                                      >
                                        <div className="flex items-start justify-between gap-2">
                                          <div className="min-w-0">
                                            <div className="flex items-center gap-1.5 taste-mono text-[10px] uppercase tracking-wider text-[var(--taste-muted)]">
                                              {kind === "story" && (
                                                <BookOpen className="w-3 h-3 text-[var(--taste-accent)]" aria-hidden="true" />
                                              )}
                                              {kind === "branch" && (
                                                <GitBranch className="w-3 h-3 text-[var(--taste-accent)]" aria-hidden="true" />
                                              )}
                                              <span>{badgeText}</span>
                                              {isRecommended && (
                                                <span className="text-[var(--taste-accent)] font-semibold">
                                                  · Next
                                                </span>
                                              )}
                                              {isInProgress && (
                                                <span className="text-[var(--taste-accent)] font-semibold">
                                                  · In progress
                                                </span>
                                              )}
                                            </div>
                                            <div className="text-sm font-medium text-[var(--taste-ink)] mt-0.5 leading-snug">
                                              {lesson.title}
                                            </div>
                                          </div>

                                          <span className="shrink-0 pt-0.5">
                                            {isCompleted ? (
                                              star === "purple" ? (
                                                <Star
                                                  className="w-4 h-4 text-[var(--taste-accent)] fill-[var(--taste-accent)]"
                                                  aria-label="Completed flawlessly"
                                                />
                                              ) : (
                                                <Check
                                                  className="w-4 h-4 text-[var(--taste-ok)]"
                                                  aria-label="Completed"
                                                />
                                              )
                                            ) : isLocked ? (
                                              <Lock
                                                className="w-3.5 h-3.5 text-[var(--taste-muted)]"
                                                aria-label="Locked"
                                              />
                                            ) : (
                                              <ArrowRight
                                                className="w-3.5 h-3.5 text-[var(--taste-muted)]"
                                                aria-hidden="true"
                                              />
                                            )}
                                          </span>
                                        </div>
                                      </Link>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Daily Insight */}
          {todayInsight ? (
            <div className="pt-2">
              <DailyInsightCard insight={todayInsight} languageName={language.name} />
            </div>
          ) : insightsError ? (
            <button
              type="button"
              onClick={() =>
                isChunkLoadError(insightsError) ? window.location.reload() : retryInsights()
              }
              className="mx-auto block taste-mono text-xs text-[var(--taste-muted)] underline underline-offset-2 cursor-pointer"
            >
              Daily insight unavailable — retry
            </button>
          ) : null}
        </>
      )}
    </div>
  );
}
