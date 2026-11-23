"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ModalDialog } from "@/components/common/ModalDialog";
import { ArrowRight, BookOpen, Check, GitBranch, Info, Lock, Sparkles, Star, X } from "lucide-react";
import { useBackDismiss } from "@/lib/use-back-dismiss";
import type { TrailNode, NodeStatus, GateView, NodeGateInfo, GateMarker } from "@/lib/trail-map";
import { loadLesson } from "@/lib/content-client";
import {
  assembleGateQuestions,
  getMissedGateLessons,
  hasPassedGateAssessment,
  scoreGateAnswers,
  type GateLessonSource,
  type GateQuestion,
} from "@/lib/gate-assessment";
import { lessonHref } from "@/lib/routes";
import { LessonEffort } from "@/components/common/LessonEffort";

interface LessonNodeDrawerProps {
  node: TrailNode;
  view: { status: NodeStatus; star?: "gold" | "purple"; gate?: NodeGateInfo };
  hasProgress: boolean;
  exerciseCount?: number;
  /** Required lessons that unlock this node. */
  unlockHint: string | null;
  onClose: () => void;
  onStart: (lessonId: number) => void;
}

const kindLabel = (node: TrailNode) =>
  node.kind === "core"
    ? `topic ${node.topicId} · main path`
    : node.kind === "story"
    ? `story ${node.label ?? ""} · main path`
    : node.kind === "sprig"
    ? `topic ${node.topicId} · ${node.required ? "required practice" : "extra practice"}`
    : node.required
    ? `${node.partLabel ?? `topic ${node.topicId}`} · required path`
    : `topic ${node.topicId} · support branch`;

export const LessonNodeDrawer: React.FC<LessonNodeDrawerProps> = ({
  node,
  view,
  hasProgress,
  unlockHint,
  exerciseCount,
  onClose,
  onStart,
}) => {
  useBackDismiss(true, onClose);


  const { status, star } = view;
  const playable = node.authored && status !== "locked";

  return (
    <ModalDialog onClose={onClose} aria-label={node.title} className="open:block z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onClose} aria-hidden />

      <div className="absolute inset-x-0 bottom-0 sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[440px] max-h-[82dvh] overflow-y-auto overscroll-contain rounded-t-2xl sm:rounded-2xl bg-[var(--bg-color)] border border-[var(--sub-color)]/30 shadow-2xl">
        <div className="safe-x p-5 pb-safe sm:p-6 space-y-4">
          {/* header */}
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 min-w-0">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--main-color)] font-semibold">
                {node.kind === "branch" ? <GitBranch className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                {kindLabel(node)}
              </span>
              <h2 className="text-lg font-bold text-[var(--text-color)] tracking-tight leading-snug">{node.title}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 text-[var(--sub-color)] hover:text-[var(--text-color)] transition cursor-pointer"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* blurb / plan */}
          <p className="text-xs text-[var(--sub-color)] leading-relaxed">
            {node.blurb ?? node.plan}
          </p>

          {exerciseCount !== undefined && <LessonEffort exerciseCount={exerciseCount} />}

          {/* status block */}
          {status === "completed" ? (
            <div className="p-3 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--main-color)]/30 flex items-center gap-2.5 text-xs font-mono">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                style={{ background: star === "purple" ? PURPLE : GOLD }}
              >
                <Star className="w-3 h-3 text-[var(--bg-color)]" fill="var(--bg-color)" strokeWidth={0} />
              </span>
              {star === "purple" ? (
                <span className="text-[var(--text-color)]">
                  purple star — a flawless run, retry queue untouched. It means you built every answer by thinking it through without a miss (a clean replay counts).
                </span>
              ) : (
                <span className="text-[var(--text-color)]">
                  gold star — completed. Replay for a flawless run to turn it purple.
                </span>
              )}
            </div>
          ) : status === "locked" ? (
            <div className="p-3 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 space-y-1.5 text-xs font-mono">
              {view.gate ? (
                <>
                  <span className="flex items-center gap-2 text-[var(--main-color)]">
                    <Lock className="w-3.5 h-3.5" /> beyond the {view.gate.title.replace(/^The /, "")}
                  </span>
                  <p className="text-[var(--sub-color)] leading-relaxed">
                    Finish the main-path lessons in topics {view.gate.fromTopic}–{view.gate.toTopic} and pass the checkpoint to continue.
                  </p>
                </>
              ) : (
                <>
                  <span className="flex items-center gap-2 text-[var(--sub-color)]">
                    <Lock className="w-3.5 h-3.5" /> locked
                  </span>
                  <p className="text-[var(--sub-color)] leading-relaxed">
                    {unlockHint ?? "Complete the earlier main-path lessons to unlock this one."}
                  </p>
                </>
              )}
            </div>
          ) : !node.authored ? (
            <div className="p-3 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 space-y-1.5 text-xs font-mono">
              <span className="flex items-center gap-2 text-[var(--main-color)]">
                <Sparkles className="w-3.5 h-3.5" /> being written
              </span>
              <p className="text-[var(--sub-color)] leading-relaxed">{node.plan}</p>
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 flex items-center gap-2 text-xs font-mono text-[var(--sub-color)]">
              <Info className="w-3.5 h-3.5 shrink-0" />
              {hasProgress ? "you have progress in this lesson" : "ready to start"}
            </div>
          )}

          {/* actions */}
          {playable && (
            <button
              type="button"
              onClick={() => onStart(node.id)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--main-color)] text-[var(--bg-color)] font-bold text-xs font-mono hover:opacity-90 transition cursor-pointer"
            >
              <span>
                {status === "completed" ? "replay lesson" : hasProgress ? "resume lesson" : "start lesson"}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </ModalDialog>
  );
};

const GOLD = "#eab308";
const PURPLE = "#a78bfa";

/* -------------------------------------------------------------------------- */

interface GateDrawerProps {
  gate: GateMarker;
  view: GateView;
  languageId: string;
  lessons: Array<{ id: number; title: string }>;
  reached: boolean;
  onPass: () => void;
  onClose: () => void;
  onOpenLesson?: (lessonId: number) => void;
}

/** Checkpoint drawer explaining why a star gate sits where it sits. */
export const GateDrawer: React.FC<GateDrawerProps> = ({
  gate,
  view,
  languageId,
  lessons,
  reached,
  onPass,
  onClose,
  onOpenLesson,
}) => {
  useBackDismiss(true, onClose);


  const [lessonSources, setLessonSources] = useState<GateLessonSource[]>([]);
  const [questions, setQuestions] = useState<GateQuestion[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<boolean[] | null>(null);
  const [attempt, setAttempt] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const eligible = reached;

  const startAssessment = async () => {
    if (!eligible || view.passed || loading) return;
    setLoading(true);
    setError(null);
    try {
      if (!lessons.length) throw new Error("No required lessons were found for this checkpoint.");
      const sources: GateLessonSource[] = await Promise.all(lessons.map(async (lesson) => {
        const payload = await loadLesson(languageId, lesson.id);
        if (!payload?.lesson?.exercises) throw new Error(`Could not load exercises for ${lesson.title}.`);
        return { id: lesson.id, title: lesson.title, exercises: payload.lesson.exercises };
      }));
      const selected = assembleGateQuestions(sources, 0);
      if (selected.length !== sources.length) {
        const covered = new Set(selected.map((q) => q.lessonId));
        const missing = sources.find((s) => !covered.has(s.id));
        throw new Error(`No supported assessment question is available for ${missing?.title ?? "this checkpoint"}.`);
      }
      setLessonSources(sources);
      setAttempt(0);
      setQuestions(selected);
      setAnswers(selected.map(() => ""));
      setResult(null);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load checkpoint questions.");
    } finally {
      setLoading(false);
    }
  };

  const retryAssessment = () => {
    const nextAttempt = attempt + 1;
    setAttempt(nextAttempt);
    if (lessonSources.length > 0) {
      const nextQuestions = assembleGateQuestions(lessonSources, nextAttempt);
      if (nextQuestions.length === lessonSources.length) {
        setQuestions(nextQuestions);
        setAnswers(nextQuestions.map(() => ""));
        setResult(null);
        return;
      }
    }
    setResult(null);
    setAnswers(questions.map(() => ""));
  };

  const submitAssessment = (event: React.FormEvent) => {
    event.preventDefault();
    if (!eligible || view.passed || !questions.length || answers.some((answer) => !answer.trim())) return;
    const scored = scoreGateAnswers(questions, answers);
    setResult(scored);
    if (hasPassedGateAssessment(scored)) onPass();
  };

  const missedLessons = result && !view.passed ? getMissedGateLessons(questions, result, 3) : [];

  return (
    <ModalDialog onClose={onClose} aria-label={gate.title} className="open:block z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onClose} aria-hidden />
      <div className="absolute inset-x-0 bottom-0 sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[440px] max-h-[82dvh] overflow-y-auto overscroll-contain rounded-t-2xl sm:rounded-2xl bg-[var(--bg-color)] border border-[var(--sub-color)]/30 shadow-2xl">
        <div className="safe-x p-5 pb-safe sm:p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 min-w-0">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--main-color)] font-semibold">
                <Lock className="w-3 h-3" />
                checkpoint · topics {view.fromTopic}–{view.toTopic}
              </span>
              <h2 className="text-lg font-bold text-[var(--text-color)] tracking-tight leading-snug">{gate.title}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 text-[var(--sub-color)] hover:text-[var(--text-color)] transition cursor-pointer"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="text-xs text-[var(--sub-color)] leading-relaxed">{gate.why}</p>

          <div className="p-3 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-[var(--sub-color)]">main-path lessons</span>
              <span className={reached ? "text-[var(--main-color)] font-bold" : "text-[var(--text-color)] font-bold"}>
                {reached ? "complete" : "in progress"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[var(--sub-color)]">checkpoint</span>
              <span className={view.passed ? "text-[var(--main-color)] font-bold" : "text-[var(--text-color)] font-bold"}>
                {view.passed ? "passed" : "not passed yet"}
              </span>
            </div>
            {view.open ? (
              <span className="flex items-center gap-1.5 text-[var(--main-color)]">
                <Check className="w-3.5 h-3.5" /> open — the next stretch awaits
              </span>
            ) : !reached ? (
              <span className="text-[var(--sub-color)]">Complete the main-path lessons before this gate to unlock the checkpoint.</span>
            ) : (
              <span className="text-[var(--sub-color)]">Checkpoint ready. Pass it to open the next stretch (side lessons remain optional).</span>
            )}
          </div>
          {!view.passed && (
            <p className="text-xs text-[var(--sub-color)]">
              The checkpoint has one question from each required main-path lesson in this stretch.
              Answer all questions; at least 80% must be correct to pass. You can retry.
            </p>
          )}
          {error && <p role="alert" className="text-sm text-red-500">{error}</p>}
          {eligible && !view.passed && questions.length === 0 && (
            <button type="button" onClick={startAssessment} disabled={loading} className="w-full rounded-lg bg-[var(--main-color)] px-4 py-3 text-sm font-bold text-[var(--bg-color)] disabled:opacity-50">
              {loading ? "Loading checkpoint…" : error ? "Retry loading checkpoint" : "Start checkpoint"}
            </button>
          )}
          {questions.length > 0 && (
            <form onSubmit={submitAssessment} className="space-y-4">
              {questions.map(({ lesson, lessonId, options, prompt, mode, hint, answer }, index) => (
                <fieldset key={`${attempt}-${index}-${lessonId}`} className="space-y-2 rounded-lg border border-[var(--sub-color)]/25 p-3">
                  <legend className="px-1 text-xs text-[var(--sub-color)]">{index + 1}. {lesson}</legend>
                  <p className="whitespace-pre-line text-sm font-medium text-[var(--text-color)]">{prompt}</p>
                  {mode === "typed" ? (
                    <div className="space-y-1.5">
                      {hint && <p className="text-xs text-[var(--sub-color)]">{hint}</p>}
                      <input
                        type="text"
                        required
                        disabled={result !== null}
                        value={answers[index] ?? ""}
                        onChange={(event) => {
                          const value = event.target.value;
                          setAnswers((old) => old.map((current, i) => (i === index ? value : current)));
                        }}
                        placeholder="Type your answer..."
                        aria-label={`Answer for ${lesson}`}
                        className="w-full rounded-md bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/30 px-3 py-2 text-sm font-mono text-[var(--text-color)] focus:border-[var(--main-color)] focus:outline-none disabled:opacity-70"
                      />
                    </div>
                  ) : (
                    options.map((option, optionIndex) => (
                      <label key={optionIndex} className="flex gap-2 text-sm text-[var(--text-color)]">
                        <input
                          type="radio"
                          name={`gate-question-${index}`}
                          value={option}
                          required
                          disabled={result !== null}
                          checked={answers[index] === option}
                          onChange={() => setAnswers((old) => old.map((current, i) => (i === index ? option : current)))}
                        />
                        {option}
                      </label>
                    ))
                  )}
                  {result && (
                    <p className={`text-xs font-semibold ${result[index] ? "text-[var(--main-color)]" : "text-[var(--error-color)]"}`}>
                      {result[index] ? "Correct" : `Incorrect — expected: ${answer}`}
                    </p>
                  )}
                </fieldset>
              ))}
              {result ? (
                <div role="status" className="space-y-3">
                  <p className="text-sm font-semibold">
                    {view.passed ? "Passed" : "Not passed"}: {result.filter(Boolean).length} / {result.length} correct
                    {" "}(need {Math.ceil(result.length * 0.8)}).
                  </p>
                  {!view.passed && missedLessons.length > 0 && (
                    <div className="p-3 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 space-y-2">
                      <p className="text-xs font-mono font-semibold text-[var(--text-color)]">
                        Review the lessons covering what you missed:
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {missedLessons.map((item) => (
                          <Link
                            key={item.lessonId}
                            href={lessonHref(languageId, item.lessonId)}
                            onClick={(event) => {
                              if (onOpenLesson && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
                                event.preventDefault();
                                onClose();
                                onOpenLesson(item.lessonId);
                              } else {
                                onClose();
                              }
                            }}
                            className="inline-flex items-center justify-between gap-2 px-3 py-2 rounded-md bg-[var(--bg-color)] border border-[var(--sub-color)]/20 hover:border-[var(--main-color)]/50 text-xs font-mono text-[var(--main-color)] font-semibold transition"
                          >
                            <span>Review {item.title} →</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                  {!view.passed && (
                    <button
                      type="button"
                      onClick={retryAssessment}
                      className="w-full rounded-lg bg-[var(--main-color)] px-4 py-3 text-sm font-bold text-[var(--bg-color)] cursor-pointer"
                    >
                      Retry checkpoint
                    </button>
                  )}
                </div>
              ) : (
                <button type="submit" className="w-full rounded-lg bg-[var(--main-color)] px-4 py-3 text-sm font-bold text-[var(--bg-color)] cursor-pointer">
                  Submit answers
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    </ModalDialog>
  );
};
