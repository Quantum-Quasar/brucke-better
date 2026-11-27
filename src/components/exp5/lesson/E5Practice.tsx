"use client";

import React, { useEffect, useRef, useState } from "react";
import type { LessonSession } from "@/components/lesson/lesson-session-types";
import ExerciseWidgetContent from "@/components/lesson/ExerciseWidgetContent";
import { finalSentenceExerciseId } from "@/components/lesson/sentence-recall";
import { arrangeTilesDeterministically, lowercaseSentenceStarterTiles } from "@/components/lesson/exercise-tiles";
import { exerciseWordIds } from "@/lib/exercise-words";
import { RETRY_INTENT_LINE } from "@/lib/retry-variation";
import { LazyLoadBoundary } from "@/components/common/LazyLoadBoundary";
import { useAppStore } from "@/lib/store";
import type { LessonTwist } from "@/lib/types";
import { E5Exercise, E5CharBar } from "./E5Exercise";
import { ArrowRightIcon } from "../e5-kit";

const CLASSIC_TYPES = new Set(["morpheme_tiles", "matching_pairs", "shift_select", "syntax_builder", "reverse_cognate", "derive"]);

function E5Twist({ twist, onDone }: { twist: LessonTwist; onDone: (meetAgain: boolean) => void }) {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const [value, setValue] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [showWords, setShowWords] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bank = React.useMemo(
    () =>
      arrangeTilesDeterministically(
        lowercaseSentenceStarterTiles((twist.word_bank ?? []).map((w) => w.replace(/[.,!?;:]+$/, "")), activeLanguageId),
        `twist#${twist.target_answer}`,
        twist.target_answer
      ),
    [twist.word_bank, twist.target_answer, activeLanguageId]
  );

  return (
    <div className="v-ex">
      <div className="v-ex-body">
        <p className="v-small v-strong">Twist · not graded</p>
        <h2 className="v-head v-ex-prompt">{twist.prompt}</h2>
        <div className="v-ex-input">
          <input
            ref={inputRef}
            className="v-input"
            value={value}
            readOnly={revealed}
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.nativeEvent.isComposing) {
                event.preventDefault();
                if (!revealed) setRevealed(true);
              }
            }}
            placeholder="Think it through, then write it"
            aria-label={twist.prompt}
            lang={activeLanguageId}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
          />
          {!revealed && <E5CharBar inputRef={inputRef} value={value} onChange={setValue} />}
          {!revealed && bank.length > 0 && (
            <div style={{ marginTop: 16 }}>
              {showWords ? (
                <div className="v-tiles">
                  {bank.map((word, index) => (
                    <button
                      key={`${word}-${index}`}
                      type="button"
                      className="v-tile"
                      lang={activeLanguageId}
                      onClick={() => setValue((prev) => (!prev ? word : prev.endsWith(" ") ? prev + word : `${prev} ${word}`))}
                    >
                      {word}
                    </button>
                  ))}
                </div>
              ) : (
                <button type="button" className="v-btn v-btn--ghost" onClick={() => setShowWords(true)}>
                  Show the words
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {revealed ? (
        <section className="v-feedback" data-kind="almost" role="status">
          <div className="v-feedback-inner">
            <div style={{ display: "grid", gap: 12 }}>
              <h3 className="v-head">One way to say it</h3>
              <p className="v-lead-strong" lang={activeLanguageId}>
                {twist.target_answer}
              </p>
              <p className="v-body">{twist.explanation}</p>
            </div>
            <div style={{ display: "grid", gap: 8, minWidth: 220 }}>
              <button type="button" className="v-btn" onClick={() => onDone(false)} autoFocus>
                Got it <ArrowRightIcon />
              </button>
              <button type="button" className="v-btn v-btn--ghost v-btn--small" onClick={() => onDone(true)}>
                Not yet — show me again at the end
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div className="v-ex-actions">
          <button type="button" className="v-btn v-btn--go" onClick={() => setRevealed(true)}>
            Show the answer
          </button>
          <button type="button" className="v-btn v-btn--ghost" onClick={() => onDone(false)}>
            Skip
          </button>
        </div>
      )}
    </div>
  );
}

export { E5Twist };

export function E5Practice({ session }: { session: LessonSession }) {
  const {
    lesson, isReading, setCurrentSegment, practiceIndex, setPracticeIndex, retryQueue, retryIndex, inRetryPhase,
    setEverQueued, twistPhase, twistCompleted, failCounts, mercyRevealFor, setMercyRevealFor, showPostureCues,
    flagGuessed, detourFootnote, setDetourDismissed, showDetour, consciousnessLine, whisperCues, handleExerciseError,
    queueExerciseRetry, handleRetryError, handleTwistDone, drainCurrentRetry, handlePracticeSuccess, currentExercise,
  } = session;
  const recallExerciseId = finalSentenceExerciseId(lesson.exercises);
  const regionRef = useRef<HTMLDivElement>(null);
  const key = currentExercise
    ? inRetryPhase
      ? `retry_${currentExercise.id}_${retryIndex}`
      : `init_${currentExercise.id}_${practiceIndex}`
    : "twist";
  const prevKey = useRef<string | null>(null);

  useEffect(() => {
    if (prevKey.current !== null && prevKey.current !== key) {
      const el = regionRef.current;
      if (el && !el.contains(document.activeElement)) el.focus({ preventScroll: true });
      el?.scrollIntoView({ block: "start", behavior: "smooth" });
    }
    prevKey.current = key;
  }, [key]);

  const noun = isReading ? "Question" : "Exercise";
  const total = lesson.exercises.length;
  const label = twistPhase
    ? "Twist"
    : inRetryPhase
      ? `Second look ${retryIndex + 1} of ${retryQueue.length}`
      : `${noun} ${practiceIndex + 1} of ${total}`;
  const cue = !inRetryPhase && !twistPhase && (practiceIndex === 0 || practiceIndex === 3) ? whisperCues[practiceIndex] : null;

  return (
    <div className="v-practice v-field">
      <div className="v-wrap v-practice-top">
        <div className="v-dots" aria-hidden="true">
          {inRetryPhase
            ? retryQueue.map((ex, index) => (
                <span key={`${ex.id}-${index}`} className="v-dot" data-state={index < retryIndex ? "done" : index === retryIndex ? "now" : undefined} />
              ))
            : (
              <>
                {lesson.exercises.map((ex, index) => (
                  <span
                    key={ex.id}
                    className="v-dot"
                    data-state={index < practiceIndex || twistPhase ? "done" : index === practiceIndex && !twistPhase ? "now" : undefined}
                  />
                ))}
                {lesson.twist && <span className="v-dot" data-state={twistPhase ? "now" : twistCompleted ? "done" : undefined} />}
              </>
            )}
        </div>
        <p className="v-small v-strong" aria-live="polite">
          {label}
        </p>
        <div className="v-practice-links">
          {!inRetryPhase && !twistPhase && practiceIndex > 0 && (
            <button type="button" className="v-btn v-btn--ghost v-btn--small" onClick={() => setPracticeIndex((p) => Math.max(0, p - 1))}>
              Previous
            </button>
          )}
          <button type="button" className="v-btn v-btn--ghost v-btn--small" onClick={() => setCurrentSegment("table")}>
            {isReading ? "Word bank" : "Word list"}
          </button>
        </div>
      </div>

      {inRetryPhase && (
        <div className="v-wrap">
          <p className="v-body v-strong">
            The ones that tripped you up, once more. {RETRY_INTENT_LINE}
          </p>
        </div>
      )}
      {cue && (
        <div className="v-wrap">
          <p className="v-body">{cue}</p>
        </div>
      )}
      {!inRetryPhase && !twistPhase && practiceIndex === 0 && showPostureCues && consciousnessLine && (
        <div className="v-wrap">
          <p className="v-body">{consciousnessLine}</p>
        </div>
      )}

      {showDetour && detourFootnote && (
        <div className="v-wrap" style={{ marginBottom: 24 }}>
          <div className="v-note" style={{ background: "rgba(255,255,255,.55)" }}>
            <p className="v-note-title">A short detour: {detourFootnote.title}</p>
            <p className="v-body">{detourFootnote.content}</p>
            <p className="v-small" style={{ marginTop: 8 }}>Just for interest — it isn’t tested.</p>
            <button type="button" className="v-btn v-btn--small" style={{ marginTop: 12 }} onClick={() => setDetourDismissed(true)}>
              Back to the exercise
            </button>
          </div>
        </div>
      )}

      <div
        ref={regionRef}
        tabIndex={-1}
        className="v-practice-region"
        aria-label={label}
      >
        <LazyLoadBoundary label="this exercise">
          {twistPhase && lesson.twist ? (
            <E5Twist twist={lesson.twist} onDone={handleTwistDone} />
          ) : currentExercise ? (
            CLASSIC_TYPES.has(currentExercise.type) && !(currentExercise.type === "syntax_builder" && currentExercise.id === recallExerciseId) ? (
              <E5Exercise
                key={key}
                exercise={currentExercise}
                lessonId={lesson.id}
                isRetry={inRetryPhase}
                onSuccess={handlePracticeSuccess}
                onError={() => (inRetryPhase ? handleRetryError(currentExercise) : handleExerciseError(currentExercise))}
                onQueueRetry={() => queueExerciseRetry(currentExercise)}
                onPurpleForfeit={() => setEverQueued(true)}
                onFlagGuessed={() => flagGuessed(exerciseWordIds(currentExercise, [...lesson.word_ids, ...(lesson.table_word_ids ?? [])]))}
              />
            ) : (
              <div className="v-wrap v-legacy">
                <ExerciseWidgetContent
                  key={key}
                  exercise={currentExercise}
                  lessonId={lesson.id}
                  isRetry={inRetryPhase}
                  recallFirst={currentExercise.id === recallExerciseId}
                  onSuccess={handlePracticeSuccess}
                  onError={() => (inRetryPhase ? handleRetryError(currentExercise) : handleExerciseError(currentExercise))}
                  onQueueRetry={() => queueExerciseRetry(currentExercise)}
                  onPurpleForfeit={() => setEverQueued(true)}
                  onFlagGuessed={() => flagGuessed(exerciseWordIds(currentExercise, [...lesson.word_ids, ...(lesson.table_word_ids ?? [])]))}
                />
              </div>
            )
          ) : null}
        </LazyLoadBoundary>
      </div>

      {inRetryPhase && currentExercise && !mercyRevealFor && (failCounts[currentExercise.id] ?? 0) >= 2 && (
        <div className="v-wrap" style={{ paddingBottom: 32 }}>
          <button type="button" className="v-btn v-btn--paper" onClick={() => setMercyRevealFor(currentExercise.id)}>
            Walk me through it
          </button>
        </div>
      )}
      {inRetryPhase && currentExercise && mercyRevealFor === currentExercise.id && (
        <section className="v-feedback" data-kind="almost">
          <div className="v-feedback-inner">
            <div style={{ display: "grid", gap: 12 }}>
              <h3 className="v-head">Here’s the answer</h3>
              <p className="v-lead-strong">{currentExercise.target_answer}</p>
              {currentExercise.explanation && <p className="v-body">{currentExercise.explanation}</p>}
              <p className="v-body v-strong">It will come back in Review.</p>
            </div>
            <button type="button" className="v-btn" onClick={drainCurrentRetry} autoFocus>
              Continue <ArrowRightIcon />
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
