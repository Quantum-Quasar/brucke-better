"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle, Sparkles } from "lucide-react";
import { DesignFrame } from "@/components/design/DesignFrame";
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

export default function DesignCanDoPage() {
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
      <DesignFrame eyebrow="CEFR Milestones" title='CEFR "Can-Do" Goals' showBackToTrail maxWidth="4xl">
        <div className="design-card p-12 text-center design-mono text-sm text-[var(--design-ink-muted)]" role="status">
          Loading checklist…
        </div>
      </DesignFrame>
    );
  }

  return (
    <DesignFrame
      eyebrow="CEFR Milestones"
      title='CEFR "Can-Do" Goals'
      subtitle="Real-world milestones mapped across all 30 core topics (A1.1 → A2.2). Topics completed on the trail check off automatically."
      showBackToTrail
      maxWidth="4xl"
    >
      {activeLanguageId !== "de" ? (
        <section className="design-card p-6 space-y-3">
          <h2 className="design-serif text-lg font-bold text-[var(--design-ink)]">
            German-only checklist for now
          </h2>
          <p className="text-sm text-[var(--design-ink-muted)] leading-relaxed">
            The CEFR &ldquo;Can-Do&rdquo; checklist is currently mapped to the 30-topic German curriculum. {language.name} milestones are coming soon.
          </p>
          <div className="pt-1">
            <Link
              href="/design"
              className="min-h-11 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition"
              style={{
                backgroundColor: "var(--design-sapphire)",
                color: "var(--design-on-accent)",
              }}
            >
              <span>Return to {language.name} trail</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </section>
      ) : (
        <div className="space-y-6">
          {/* Overall Progress Card */}
          <section className="design-card p-5 sm:p-6 space-y-4">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs design-mono text-[var(--design-ink-muted)] uppercase tracking-wider">
                  Overall Progress
                </div>
                <div className="design-serif text-3xl font-bold text-[var(--design-ink)] mt-0.5">
                  {summary.completedCount} / {summary.totalCount}{" "}
                  <span className="design-mono text-sm font-normal text-[var(--design-ink-muted)]">
                    milestones ({summary.percent}%)
                  </span>
                </div>
              </div>
              <div
                className="design-pill design-mono"
                style={{
                  backgroundColor: "var(--design-sapphire-soft)",
                  color: "var(--design-sapphire)",
                }}
              >
                <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Active band: {summary.currentBand}</span>
              </div>
            </div>

            <div
              className="h-2.5 w-full rounded-full bg-[var(--design-well)] overflow-hidden"
              role="progressbar"
              aria-valuenow={summary.percent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Overall CEFR Can-do completion"
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${summary.percent}%`,
                  backgroundColor: "var(--design-emerald)",
                }}
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {summary.bands.map((item) => {
                const active = selectedBand === item.band.id;
                return (
                  <button
                    key={item.band.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedBand(active ? "all" : item.band.id)}
                    className="p-3 rounded-2xl border text-left transition cursor-pointer"
                    style={
                      active
                        ? {
                            backgroundColor: "var(--design-sapphire-soft)",
                            borderColor: "var(--design-sapphire-border)",
                          }
                        : {
                            backgroundColor: "var(--design-canvas)",
                            borderColor: "var(--design-border)",
                          }
                    }
                  >
                    <div className="flex items-center justify-between design-mono text-xs">
                      <span className="font-bold text-[var(--design-ink)]">{item.band.id}</span>
                      <span className="text-[var(--design-sapphire)] font-semibold">
                        {item.percent}%
                      </span>
                    </div>
                    <div className="text-[11px] design-mono text-[var(--design-ink-muted)] mt-0.5">
                      {item.completedCount}/{item.totalCount} done
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[var(--design-well)] overflow-hidden mt-2">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{
                          width: `${item.percent}%`,
                          backgroundColor: "var(--design-emerald)",
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 design-mono text-xs">
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                type="button"
                aria-pressed={selectedBand === "all"}
                onClick={() => setSelectedBand("all")}
                className="min-h-10 px-3.5 py-1.5 rounded-full border font-semibold transition cursor-pointer"
                style={
                  selectedBand === "all"
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
                All bands
              </button>
              {CEFR_BANDS.map((band) => {
                const active = selectedBand === band.id;
                return (
                  <button
                    key={band.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setSelectedBand(band.id)}
                    className="min-h-10 px-3.5 py-1.5 rounded-full border font-semibold transition cursor-pointer"
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
                    {band.id}
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
                    className={`min-h-9 px-3 rounded-full capitalize font-semibold transition cursor-pointer ${
                      active ? "shadow-xs" : "text-[var(--design-ink-muted)]"
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

          {visibleBands.length === 0 ? (
            <div className="design-card p-8 text-center text-sm design-mono text-[var(--design-ink-muted)]">
              No milestones match the current filter.
            </div>
          ) : (
            <div className="space-y-6">
              {visibleBands.map(({ band, goals, completedCount, totalCount }) => (
                <section key={band.id} className="design-card overflow-hidden">
                  <div className="p-4 sm:p-5 border-b border-[var(--design-border)] flex flex-wrap items-center justify-between gap-2 bg-[var(--design-well)]/45">
                    <div>
                      <h2 className="design-serif text-lg font-bold text-[var(--design-ink)]">
                        {band.title}
                      </h2>
                      <p className="text-xs text-[var(--design-ink-muted)] mt-0.5">
                        {band.subtitle}
                      </p>
                    </div>
                    <span className="design-pill design-mono bg-[var(--design-surface)] border border-[var(--design-border)] text-[var(--design-emerald)]">
                      {completedCount}/{totalCount} complete
                    </span>
                  </div>

                  <ul className="divide-y divide-[var(--design-border)]">
                    {goals.map((goal) => {
                      const href = lessonHref(activeLanguageId, goal.topicId, "/design");
                      return (
                        <li
                          key={goal.topicId}
                          className="p-4 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[var(--design-well)]/30 transition"
                        >
                          <div className="flex items-start gap-3 min-w-0">
                            <div className="pt-0.5 shrink-0">
                              {goal.completed ? (
                                <CheckCircle2
                                  role="img"
                                  className="w-5 h-5 text-[var(--design-emerald)]"
                                  aria-label="Completed"
                                />
                              ) : (
                                <Circle
                                  role="img"
                                  className="w-5 h-5 text-[var(--design-ink-muted)]/50"
                                  aria-label="Not yet completed"
                                />
                              )}
                            </div>
                            <div className="space-y-1 min-w-0">
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-[11px] design-mono px-2 py-0.5 rounded-full bg-[var(--design-well)] text-[var(--design-ink)] font-semibold">
                                  Topic {goal.topicId}
                                </span>
                                <span className="text-xs design-mono text-[var(--design-sapphire)] font-semibold">
                                  {goal.topicTitle}
                                </span>
                                <span className="text-[10px] design-mono text-[var(--design-ink-muted)]">
                                  · {goal.skillArea}
                                </span>
                              </div>
                              <p className="text-sm text-[var(--design-ink)] leading-snug">
                                {goal.canDo}
                              </p>
                              <p className="text-xs design-mono text-[var(--design-ink-muted)]">
                                e.g.{" "}
                                <span className="text-[var(--design-ink)]">{goal.examplePhrase}</span>
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
                            className="shrink-0 min-h-10 inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition"
                            style={
                              goal.completed
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
                            <span>{goal.completed ? "Review" : "Start"}</span>
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
        </div>
      )}
    </DesignFrame>
  );
}
