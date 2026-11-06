"use client";

import React from "react";
import { Sparkles, HeartHandshake, Zap, Compass as CompassIcon } from "lucide-react";
import { TwistCard } from "../TwistCard";

import { RETRY_INTENT_LINE } from "@/lib/retry-variation";
import { LazyLoadBoundary } from "@/components/common/LazyLoadBoundary";

import type { LessonSession } from "../lesson-session-types";

const ExerciseWidget = React.lazy(() => import("../ExerciseWidgets").then((module) => ({ default: module.ExerciseWidget })));

export default function PracticeSegment({ session }: { session: LessonSession }) {
  const { lesson, isReading, setCurrentSegment, practiceIndex, setPracticeIndex, retryQueue, retryIndex, setRetryIndex, inRetryPhase, setInRetryPhase, setEverQueued, twistPhase, twistCompleted, failCounts, mercyRevealFor, setMercyRevealFor, showPostureCues, flagGuessed, detourFootnote, setDetourDismissed, showDetour, consciousnessLine, whisperCues, handleExerciseError, handleRetryError, handleTwistDone, drainCurrentRetry, handlePracticeSuccess, currentExercise } = session;
  return (
            <LazyLoadBoundary label="this exercise">
              <React.Suspense
                fallback={
                  <div className="py-10 text-center font-mono text-xs text-[var(--sub-color)]" role="status">
                    loading exercise…
                  </div>
                }
              >
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* TM-4b whisper-cue: pacing/framing micro-line, at most twice per lesson */}
              {!inRetryPhase &&
                !twistPhase &&
                whisperCues[practiceIndex] &&
                (practiceIndex === 0 || practiceIndex === 3) && (
                  <p className="text-xs italic text-[var(--sub-color)] font-mono pl-1 border-l-2 border-[var(--main-color)]/40">
                    {whisperCues[practiceIndex]}
                  </p>
                )}

              {/* TM-6 (guidebook §1.10): one re-whispered line, on this lesson only if it is a stop */}
              {!inRetryPhase && !twistPhase && practiceIndex === 0 && showPostureCues && consciousnessLine && (
                <p className="text-xs italic text-[var(--sub-color)] font-mono pl-2.5 border-l-2 border-[var(--main-color)]/30">
                  {consciousnessLine}
                </p>
              )}

              {/* TM-6 (guidebook §1.3): the load-reset trough — a 30-second detour, skippable,
                  ungraded, never inside the queue, at the lesson's natural mid-point */}
              {showDetour && detourFootnote && (
                <div className="p-4 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/25 space-y-2 font-mono animate-in fade-in duration-200">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[var(--main-color)] font-semibold">
                      <CompassIcon className="w-3.5 h-3.5" /> 30-second detour
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-[var(--sub-color)] uppercase tracking-wider">
                      for interest — not on the test
                    </span>
                  </div>
                  <p className="text-sm font-bold text-[var(--text-color)]">{detourFootnote.title}</p>
                  <p className="text-xs text-[var(--sub-color)] leading-relaxed">{detourFootnote.content}</p>
                  <button
                    type="button"
                    onClick={() => setDetourDismissed(true)}
                    className="w-full py-2 rounded bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-[var(--sub-color)] hover:text-[var(--main-color)] text-xs font-mono transition cursor-pointer"
                  >
                    back to the exercise
                  </button>
                </div>
              )}

              {/* Exercise Step Tracker */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  {twistPhase ? (
                    <>
                      <Zap className="w-3.5 h-3.5 text-[var(--main-color)]" />
                      <span className="text-xs font-mono uppercase tracking-wider text-[var(--main-color)] font-medium">
                        twist · ungraded
                      </span>
                    </>
                  ) : inRetryPhase ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-[var(--main-color)] animate-pulse" />
                      <span className="text-xs font-mono uppercase tracking-wider text-[var(--main-color)] font-medium">
                        reinforcement · problem {retryIndex + 1} of {retryQueue.length}
                      </span>
                    </>
                  ) : (
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--main-color)] font-medium">
                      {isReading ? "question" : "problem"} {practiceIndex + 1} of {lesson.exercises.length}
                    </span>
                  )}
                </div>

                {/* Duolingo-style mini step dots */}
                <div className="flex items-center gap-1.5">
                  {inRetryPhase
                    ? retryQueue.map((ex, idx) => (
                        <span
                          key={`retry-dot-${ex.id}-${idx}`}
                          className={`h-1 rounded transition-all duration-200 ${
                            idx === retryIndex
                              ? "w-6 bg-[var(--main-color)]"
                              : idx < retryIndex
                              ? "w-3 bg-[var(--main-color)]/50"
                              : "w-3 bg-[var(--sub-color)]/20"
                          }`}
                        />
                      ))
                    : (
                      <>
                        {lesson.exercises.map((ex, idx) => (
                          <span
                            key={ex.id}
                            className={`h-1 rounded transition-all duration-200 ${
                              idx === practiceIndex && !twistPhase
                                ? "w-6 bg-[var(--main-color)]"
                                : idx < practiceIndex || twistPhase
                                ? "w-3 bg-[var(--main-color)]/50"
                                : "w-3 bg-[var(--sub-color)]/20"
                            }`}
                          />
                        ))}
                        {lesson.twist && (
                          <span
                            className={`h-1 rounded transition-all duration-200 ${
                              twistPhase
                                ? "w-6 bg-[var(--main-color)]"
                                : twistCompleted
                                ? "w-3 bg-[var(--main-color)]/50"
                                : "w-3 bg-[var(--sub-color)]/20"
                            }`}
                          />
                        )}
                      </>
                    )}
                </div>
              </div>

              {/* TM-5a: the Twist card — its own step, outside the queue entirely */}
              {twistPhase && lesson.twist && (
                <TwistCard twist={lesson.twist} onDone={handleTwistDone} />
              )}

              {!twistPhase && (
                <>
              {/* Informative Reinforcement Banner when in Retry Phase */}
              {inRetryPhase && (
                <div className="p-3 rounded bg-[var(--sub-alt-color)] border border-[var(--main-color)]/30 space-y-1 text-xs text-[var(--main-color)] font-mono">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <span>
                        reinforcing {retryQueue.length} exercise{retryQueue.length > 1 ? "s" : ""}
                      </span>
                    </div>
                    <span className="hidden sm:inline">
                      step {retryIndex + 1}/{retryQueue.length}
                    </span>
                  </div>
                  <p className="text-[var(--sub-color)]">
                    These come back in Review either way — you can&apos;t lose them.
                  </p>
                  <p className="text-[var(--sub-color)]/80 italic">{RETRY_INTENT_LINE}</p>
                </div>
              )}

              {/* The Single Bite-Sized Exercise */}
              <ExerciseWidget
                key={inRetryPhase ? `retry_${currentExercise.id}_${retryIndex}` : `init_${currentExercise.id}_${practiceIndex}`}
                exercise={currentExercise}
                isRetry={inRetryPhase}
                onSuccess={handlePracticeSuccess}
                onError={() =>
                  inRetryPhase ? handleRetryError(currentExercise) : handleExerciseError(currentExercise)
                }
                onQueueRetry={() => handleExerciseError(currentExercise)}
                onPurpleForfeit={() => setEverQueued(true)}
                onFlagGuessed={() => flagGuessed(lesson.word_ids)}
              />

              {/* TM-4c queue mercy: after a second miss on the same item, offer a guided re-learn */}
              {inRetryPhase && !mercyRevealFor && (failCounts[currentExercise.id] ?? 0) >= 2 && (
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setMercyRevealFor(currentExercise.id)}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/30 text-xs font-mono text-[var(--sub-color)] hover:text-[var(--main-color)] hover:border-[var(--main-color)]/40 transition cursor-pointer"
                  >
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>Walk me through it</span>
                  </button>
                </div>
              )}

              {inRetryPhase && mercyRevealFor === currentExercise.id && currentExercise && (
                <div className="p-4 rounded-lg bg-[var(--bg-color)] border border-[var(--main-color)]/30 space-y-2 font-mono">
                  <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[var(--main-color)] font-semibold">
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>re-learned — this one comes back in review</span>
                  </div>
                  <div className="text-sm font-bold text-[var(--main-color)]">{currentExercise.target_answer}</div>
                  {currentExercise.explanation && (
                    <p className="text-xs text-[var(--sub-color)] leading-relaxed">{currentExercise.explanation}</p>
                  )}
                  <button
                    type="button"
                    onClick={drainCurrentRetry}
                    className="w-full py-2 rounded bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-bold text-xs transition cursor-pointer"
                  >
                    continue
                  </button>
                </div>
              )}
                </>
              )}

              <div className="flex items-center justify-between px-1 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setInRetryPhase(false);
                    setRetryIndex(0);
                    setCurrentSegment("table");
                  }}
                  className="text-xs font-mono text-[var(--sub-color)] hover:text-[var(--main-color)] transition cursor-pointer"
                >
                  ← Review Transformation Table
                </button>
                {!inRetryPhase && practiceIndex > 0 && !twistPhase && (
                  <button
                    type="button"
                    onClick={() => setPracticeIndex((prev) => Math.max(0, prev - 1))}
                    className="text-xs font-mono text-[var(--sub-color)] hover:text-[var(--main-color)] transition cursor-pointer"
                  >
                    Previous Problem
                  </button>
                )}
              </div>
            </div>
            </React.Suspense>
            </LazyLoadBoundary>
  );
}
