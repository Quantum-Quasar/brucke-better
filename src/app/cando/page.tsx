"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Award, CheckCircle2, Circle, Sparkles } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { getLanguageDefinition } from "@/data/languages";
import { isModifiedClick, useAppNavigation } from "@/lib/app-navigation";
import { lessonHref } from "@/lib/routes";
import {
  CEFR_BANDS,
  evaluateCanDoProgress,
  type CefrBandId,
} from "@/data/cando-goals";

type StatusFilter = "all" | "remaining" | "completed";

export default function CanDoChecklistPage() {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const completedLessons = useAppStore((s) => s.completedLessons);
  const storeHydrated = useAppStore((s) => s.storeHydrated);
  const { openLesson } = useAppNavigation();

  const language = getLanguageDefinition(activeLanguageId);
  const [selectedBand, setSelectedBand] = useState<CefrBandId | "all">("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");

  const summary = useMemo(
    () => evaluateCanDoProgress(completedLessons),
    [completedLessons]
  );

  const visibleBands = useMemo(() => {
    return summary.bands
      .filter((b) => selectedBand === "all" || b.band.id === selectedBand)
      .map((b) => ({
        ...b,
        goals: b.goals.filter((g) => {
          if (statusFilter === "completed") return g.completed;
          if (statusFilter === "remaining") return !g.completed;
          return true;
        }),
      }))
      .filter((b) => b.goals.length > 0);
  }, [summary.bands, selectedBand, statusFilter]);

  if (!storeHydrated) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-mono" role="status">
        <p className="text-sm text-[var(--sub-color)]">loading checklist…</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 font-sans">
      {/* Header */}
      <div className="space-y-2">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-1.5 text-xs font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>back to trail</span>
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Award className="w-6 h-6 text-[var(--main-color)]" aria-hidden="true" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-color)]">
              CEFR &ldquo;Can-do&rdquo; Checklist
            </h1>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 text-[var(--text-color)]">
            <span aria-hidden="true">{language.flag}</span>
            <span>{language.name}</span>
          </span>
        </div>
        <p className="text-sm text-[var(--sub-color)] leading-relaxed">
          Real-world milestones mapped across all 30 core topics (A1.1 → A2.2). Completing each topic&apos;s core lesson automatically ticks off its descriptor.
        </p>
      </div>

      {activeLanguageId !== "de" ? (
        <section className="p-6 rounded-xl bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 space-y-3">
          <h2 className="text-base font-bold text-[var(--text-color)]">
            German-only checklist for now
          </h2>
          <p className="text-sm text-[var(--sub-color)] leading-relaxed">
            The CEFR &ldquo;Can-do&rdquo; checklist is currently mapped to the 30-topic German curriculum. {language.name} Can-do milestones are coming soon.
          </p>
          <div className="pt-1">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-mono font-bold bg-[var(--main-color)] text-[var(--bg-color)] hover:opacity-90 transition"
            >
              <span>Return to {language.name} trail</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </section>
      ) : (
        <>
          {/* Overall Progress Card */}
          <section className="p-5 rounded-xl bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-[var(--sub-color)] uppercase tracking-wider">
                  Overall Progress
                </div>
                <div className="text-2xl font-bold font-mono text-[var(--text-color)] mt-0.5">
                  {summary.completedCount} / {summary.totalCount}{" "}
                  <span className="text-sm font-normal text-[var(--sub-color)]">
                    milestones ({summary.percent}%)
                  </span>
                </div>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg-color)] border border-[var(--main-color)]/30 text-xs font-mono text-[var(--main-color)]">
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Active band: {summary.currentBand}</span>
              </div>
            </div>

            {/* Overall Progress Bar */}
            <div
              className="h-2.5 w-full rounded-full bg-[var(--bg-color)] overflow-hidden"
              role="progressbar"
              aria-valuenow={summary.percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Overall CEFR Can-do completion"
            >
              <div
                className="h-full bg-[var(--main-color)] transition-all duration-300"
                style={{ width: `${summary.percent}%` }}
              />
            </div>

            {/* Per-band Summary Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {summary.bands.map((item) => {
                const active = selectedBand === item.band.id;
                return (
                  <button
                    key={item.band.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() =>
                      setSelectedBand(active ? "all" : item.band.id)
                    }
                    className={`p-3 rounded-lg border text-left transition cursor-pointer ${
                      active
                        ? "bg-[var(--bg-color)] border-[var(--main-color)]"
                        : "bg-[var(--bg-color)]/60 border-[var(--sub-color)]/20 hover:border-[var(--sub-color)]/50"
                    }`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs">
                      <span className="font-bold text-[var(--text-color)]">{item.band.id}</span>
                      <span className="text-[var(--main-color)]">{item.percent}%</span>
                    </div>
                    <div className="text-[11px] font-mono text-[var(--sub-color)] mt-0.5">
                      {item.completedCount}/{item.totalCount} done
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[var(--sub-alt-color)] overflow-hidden mt-2">
                      <div
                        className="h-full bg-[var(--main-color)] transition-all duration-300"
                        style={{ width: `${item.percent}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                aria-pressed={selectedBand === "all"}
                onClick={() => setSelectedBand("all")}
                className={`px-2.5 py-1.5 rounded-lg border transition cursor-pointer ${
                  selectedBand === "all"
                    ? "bg-[var(--main-color)] text-[var(--bg-color)] border-[var(--main-color)] font-bold"
                    : "bg-[var(--sub-alt-color)] text-[var(--sub-color)] border-[var(--sub-color)]/25 hover:text-[var(--text-color)]"
                }`}
              >
                All bands
              </button>
              {CEFR_BANDS.map((band) => (
                <button
                  key={band.id}
                  type="button"
                  aria-pressed={selectedBand === band.id}
                  onClick={() => setSelectedBand(band.id)}
                  className={`px-2.5 py-1.5 rounded-lg border transition cursor-pointer ${
                    selectedBand === band.id
                      ? "bg-[var(--main-color)] text-[var(--bg-color)] border-[var(--main-color)] font-bold"
                      : "bg-[var(--sub-alt-color)] text-[var(--sub-color)] border-[var(--sub-color)]/25 hover:text-[var(--text-color)]"
                  }`}
                >
                  {band.id}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5">
              {(["all", "remaining", "completed"] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={statusFilter === filter}
                  onClick={() => setStatusFilter(filter)}
                  className={`px-2.5 py-1.5 rounded-lg border transition cursor-pointer ${
                    statusFilter === filter
                      ? "bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--main-color)] font-bold"
                      : "bg-[var(--sub-alt-color)] text-[var(--sub-color)] border-[var(--sub-color)]/25 hover:text-[var(--text-color)]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Band Sections */}
          {visibleBands.length === 0 ? (
            <div className="p-8 rounded-xl bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-center text-sm font-mono text-[var(--sub-color)]">
              No milestones match the current filter.
            </div>
          ) : (
            <div className="space-y-6">
              {visibleBands.map(({ band, goals, completedCount, totalCount }) => (
                <section
                  key={band.id}
                  className="rounded-xl bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 overflow-hidden"
                >
                  <div className="p-4 sm:p-5 border-b border-[var(--sub-color)]/15 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h2 className="text-base font-bold text-[var(--text-color)]">{band.title}</h2>
                      <p className="text-xs text-[var(--sub-color)] mt-0.5">{band.subtitle}</p>
                    </div>
                    <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[var(--bg-color)] border border-[var(--sub-color)]/20 text-[var(--main-color)]">
                      {completedCount}/{totalCount} complete
                    </span>
                  </div>

                  <ul className="divide-y divide-[var(--sub-color)]/10">
                    {goals.map((goal) => {
                      const href = lessonHref(activeLanguageId, goal.topicId);
                      return (
                        <li
                          key={goal.topicId}
                          className="p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[var(--bg-color)]/40 transition"
                        >
                          <div className="flex items-start gap-3 min-w-0">
                            <div className="pt-0.5 shrink-0">
                              {goal.completed ? (
                                <CheckCircle2
                                  role="img"
                                  className="w-5 h-5 text-emerald-600 dark:text-emerald-400"
                                  aria-label="Completed"
                                />
                              ) : (
                                <Circle
                                  role="img"
                                  className="w-5 h-5 text-[var(--sub-color)]/50"
                                  aria-label="Not yet completed"
                                />
                              )}
                            </div>
                            <div className="space-y-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-[var(--bg-color)] text-[var(--sub-color)] border border-[var(--sub-color)]/20">
                                  Topic {goal.topicId}
                                </span>
                                <span className="text-xs font-mono text-[var(--main-color)]">
                                  {goal.topicTitle}
                                </span>
                                <span className="text-[10px] font-mono text-[var(--sub-color)]">
                                  · {goal.skillArea}
                                </span>
                              </div>
                              <p
                                className={`text-sm leading-snug ${
                                  goal.completed
                                    ? "text-[var(--text-color)]"
                                    : "text-[var(--text-color)]/90"
                                }`}
                              >
                                {goal.canDo}
                              </p>
                              <p className="text-xs font-mono text-[var(--sub-color)]">
                                e.g. <span className="text-[var(--text-color)]/85">{goal.examplePhrase}</span>
                              </p>
                            </div>
                          </div>

                          <Link
                            href={href}
                            onClick={(event) => {
                              if (isModifiedClick(event)) return;
                              event.preventDefault();
                              openLesson(activeLanguageId, goal.topicId);
                            }}
                            className={`shrink-0 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-mono border transition ${
                              goal.completed
                                ? "bg-[var(--bg-color)] border-[var(--sub-color)]/25 text-[var(--sub-color)] hover:text-[var(--text-color)] hover:border-[var(--main-color)]"
                                : "bg-[var(--main-color)] text-[var(--bg-color)] border-[var(--main-color)] font-bold hover:opacity-90"
                            }`}
                          >
                            <span>{goal.completed ? "review" : "start"}</span>
                            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
