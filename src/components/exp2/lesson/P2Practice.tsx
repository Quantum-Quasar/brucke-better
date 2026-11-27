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
import { P2Exercise, P2CharBar } from "./P2Exercise";
import { ArrowRightIcon } from "../p2-kit";

const CLASSIC_TYPES = new Set(["morpheme_tiles", "matching_pairs", "shift_select", "syntax_builder", "reverse_cognate", "derive"]);

function P2Twist({ twist, onDone }: { twist: LessonTwist; onDone: (meetAgain: boolean) => void }) {
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
    <div className="p-ex">
      <div className="p-ex-body">
        <p className="p-small p-strong">Twist · not graded</p>
        <h2 className="p-head p-ex-prompt">{twist.prompt}</h2>
        <div className="p-ex-input">
          <input
            ref={inputRef}
            className="p-input"
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
          {!revealed && <P2CharBar inputRef={inputRef} value={value} onChange={setValue} />}
          {!revealed && bank.length > 0 && (
            <div style={{ marginTop: 16 }}>
              {showWords ? (
                <div className="p-tiles">
                  {bank.map((word, index) => (
                    <button
                      key={`${word}-${index}`}
                      type="button"
                      className="p-tile"
                      lang={activeLanguageId}
                      onClick={() => setValue((prev) => (!prev ? word : prev.endsWith(" ") ? prev + word : `${prev} ${word}`))}
                    >
                      {word}
                    </button>
                  ))}
                </div>
              ) : (
                <button type="button" className="p-btn p-btn--ghost" onClick={() => setShowWords(true)}>
                  Show the words
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {revealed ? (
        <section className="p-feedback" data-kind="almost" role="status">
          <div className="p-feedback-inner">
            <div style={{ display: "grid", gap: 12 }}>
              <h3 className="p-head">One way to say it</h3>
              <p className="p-lead-strong" lang={activeLanguageId}>
                {twist.target_answer}
              </p>
              <p className="p-body">{twist.explanation}</p>
            </div>
            <div style={{ display: "grid", gap: 8, minWidth: 220 }}>
              <button type="button" className="p-btn" onClick={() => onDone(false)} autoFocus>
                Got it <ArrowRightIcon />
              </button>
              <button type="button" className="p-btn p-btn--ghost p-btn--small" onClick={() => onDone(true)}>
                Not yet — show me again at the end
              </button>
            </div>
          </div>
        </section>
      ) : (
        <div className="p-ex-actions">
          <button type="button" className="p-btn p-btn--go" onClick={() => setRevealed(true)}>
            Show the answer
          </button>
          <button type="button" className="p-btn p-btn--ghost" onClick={() => onDone(false)}>
            Skip
          </button>
        </div>
      )}
    </div>
  );
}

export { P2Twist };

export function P2Practice({ session }: { session: LessonSession }) {
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
    <div className="p-practice p-field">
      <div className="p-wrap p-practice-top">
        <div className="p-dots" aria-hidden="true">
          {inRetryPhase
            ? retryQueue.map((ex, index) => (
                <span key={`${ex.id}-${index}`} className="p-dot" data-state={index < retryIndex ? "done" : index === retryIndex ? "now" : undefined} />
              ))
            : (
              <>
                {lesson.exercises.map((ex, index) => (
                  <span
                    key={ex.id}
                    className="p-dot"
                    data-state={index < practiceIndex || twistPhase ? "done" : index === practiceIndex && !twistPhase ? "now" : undefined}
                  />
                ))}
                {lesson.twist && <span className="p-dot" data-state={twistPhase ? "now" : twistCompleted ? "done" : undefined} />}
              </>
            )}
        </div>
        <p className="p-small p-strong" aria-live="polite">
          {label}
        </p>
        <div className="p-practice-links">
          {!inRetryPhase && !twistPhase && practiceIndex > 0 && (
            <button type="button" className="p-btn p-btn--ghost p-btn--small" onClick={() => setPracticeIndex((p) => Math.max(0, p - 1))}>
              Previous
            </button>
          )}
          <button type="button" className="p-btn p-btn--ghost p-btn--small" onClick={() => setCurrentSegment("table")}>
            {isReading ? "Word bank" : "Word list"}
          </button>
        </div>
      </div>

      {inRetryPhase && (
        <div className="p-wrap">
          <p className="p-body p-strong">
            The ones that tripped you up, once more. {RETRY_INTENT_LINE}
          </p>
        </div>
      )}
      {cue && (
        <div className="p-wrap">
          <p className="p-body">{cue}</p>
        </div>
      )}
      {!inRetryPhase && !twistPhase && practiceIndex === 0 && showPostureCues && consciousnessLine && (
        <div className="p-wrap">
          <p className="p-body">{consciousnessLine}</p>
        </div>
      )}

      {showDetour && detourFootnote && (
        <div className="p-wrap" style={{ marginBottom: 24 }}>
          <div className="p-note" >
            <p className="p-note-title">A short detour: {detourFootnote.title}</p>
            <p className="p-body">{detourFootnote.content}</p>
            <p className="p-small" style={{ marginTop: 8 }}>Just for interest — it isn’t tested.</p>
            <button type="button" className="p-btn p-btn--small" style={{ marginTop: 12 }} onClick={() => setDetourDismissed(true)}>
              Back to the exercise
            </button>
          </div>
        </div>
      )}

      <div
        ref={regionRef}
        tabIndex={-1}
        className="p-practice-region"
        aria-label={label}
      >
        <LazyLoadBoundary label="this exercise">
          {twistPhase && lesson.twist ? (
            <P2Twist twist={lesson.twist} onDone={handleTwistDone} />
          ) : currentExercise ? (
            CLASSIC_TYPES.has(currentExercise.type) && !(currentExercise.type === "syntax_builder" && currentExercise.id === recallExerciseId) ? (
              <P2Exercise
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
              <div className="p-wrap p-legacy">
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
        <div className="p-wrap" style={{ paddingBottom: 32 }}>
          <button type="button" className="p-btn p-btn--paper" onClick={() => setMercyRevealFor(currentExercise.id)}>
            Walk me through it
          </button>
        </div>
      )}
      {inRetryPhase && currentExercise && mercyRevealFor === currentExercise.id && (
        <section className="p-feedback" data-kind="almost">
          <div className="p-feedback-inner">
            <div style={{ display: "grid", gap: 12 }}>
              <h3 className="p-head">Here’s the answer</h3>
              <p className="p-lead-strong">{currentExercise.target_answer}</p>
              {currentExercise.explanation && <p className="p-body">{currentExercise.explanation}</p>}
              <p className="p-body p-strong">It will come back in Review.</p>
            </div>
            <button type="button" className="p-btn" onClick={drainCurrentRetry} autoFocus>
              Continue <ArrowRightIcon />
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
