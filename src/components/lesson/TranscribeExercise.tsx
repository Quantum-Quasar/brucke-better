"use client";

// TM-1 production drill: the learner gets the thought (idea) and a lexicon
// (word_bank), and must produce the target sentence themselves — choose the elements,
// decide the order, type the sentence. The word bank is vocabulary, not a jigsaw:
// tapping a chip inserts the word into a free-text input, and the learner can type
// inflections the bank doesn't carry. First attempt gets no cues; the cue ladder
// (scaled prompts) reveals on request or on a failed attempt, and using it forfeits
// the purple star — cues are help, and help is honest (guidebook §4.2, Turkish
// analysis: let the learner come in "at the moment their memory is jogged").

import React, { useState, useEffect } from "react";
import { Sparkles, Lightbulb, Quote } from "lucide-react";
import { ProductionAnswerInput } from "./inputs/ProductionAnswerInput";
import { ProductionAnswerActions } from "./ProductionAnswerActions";
import { ErrorFeedbackSheet } from "./ErrorFeedbackSheet";
import { SuccessFeedbackSheet } from "./SuccessFeedbackSheet";
import { useProductionAttempt } from "./use-production-attempt";
import { hasBlockingKeyboardDialog } from "@/components/common/ModalDialog";
import type { ExerciseItem } from "@/lib/types";

interface TranscribeExerciseProps {
  exercise: ExerciseItem;
  isRetry?: boolean;
  onSuccess: () => void;
  onError: (errorType: "spelling" | "umlaut" | "capitalization") => void;
  onQueueRetry?: () => void;
  /** TM-6: the learner got it right but did not trust it (guidebook §1.8/§1.9) */
  onFlagGuessed?: () => void;
  /** using the cue ladder forfeits the purple star for the run */
  onPurpleForfeit?: () => void;
}

export const TranscribeExercise: React.FC<TranscribeExerciseProps> = ({
  exercise,
  isRetry = false,
  onSuccess,
  onError,
  onQueueRetry,
  onPurpleForfeit,
  onFlagGuessed,
}) => {
  const [showIdeaParts, setShowIdeaParts] = useState(false);
  const {
    inputRef,
    settings,
    language,
    wordBank,
    cues,
    target,
    affirmation,
    userInput,
    setUserInput,
    cuesRevealed,
    status,
    sheetVariant,
    feedbackNote,
    setFeedbackNote,
    setStatus,
    verifiedAttemptText,
    acceptedTarget,
    almostWarningNote,
    showErrorSheet,
    showSuccessSheet,
    failedAttemptText,
    failedDiagnosis,
    resetCurrentExercise,
    insertWord,
    revealNextCue,
    handleVerify,
    handleSuccessContinue,
    handleErrorContinue,
  } = useProductionAttempt({
    exercise,
    isRetry,
    onSuccess,
    onError,
    onQueueRetry,
    onPurpleForfeit,
    emptyMessage: "Please enter or select an answer before verifying.",
    exactMessage: "Spot On! Perfect.",
    onReset: () => setShowIdeaParts(false),
    focusPreventScroll: false,
  });

  // 1–9 inserts bank words while the learner is not typing; Enter verifies (matches
  // the morpheme_tiles / syntax_builder key plumbing).
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || hasBlockingKeyboardDialog() || e.isComposing || e.ctrlKey || e.metaKey || e.altKey) return;
      if (settings.quickRestart === "esc" && e.key === "Escape") {
        e.preventDefault();
        resetCurrentExercise();
        return;
      }
      if (showErrorSheet || showSuccessSheet) return;
      const isInput = document.activeElement === inputRef.current;
      if (e.key === "Enter" && !isInput) {
        const active = document.activeElement;
        // a focused button/anchor owns its own Enter (native activation)
        if (
          active instanceof HTMLElement &&
          (active.tagName === "BUTTON" ||
            active.tagName === "A" ||
            active.getAttribute("role") === "button")
        ) {
          return;
        }
        e.preventDefault();
        handleVerify();
        return;
      }
      if (isInput) return;
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= wordBank.length && status !== "correct" && status !== "almost") {
        e.preventDefault();
        insertWord(wordBank[num - 1]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [userInput, status, showErrorSheet, showSuccessSheet, wordBank, settings, cuesRevealed, cues.length]);


  return (
    <div className="p-6 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--main-color)]/25 space-y-5 shadow-lg font-mono">
      {/* Exercise Header */}
      <div className="flex items-center justify-between border-b border-[var(--sub-color)]/15 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--main-color)]" />
          <span className="text-xs uppercase tracking-wider text-[var(--main-color)] font-semibold">
            {isRetry ? "retry exercise" : "transcribe the thought"}
          </span>
        </div>
        {exercise.shift_hint && (
          <span className="text-xs px-2.5 py-0.5 rounded bg-[var(--bg-color)] text-[var(--main-color)] border border-[var(--sub-color)]/20 font-bold">
            {exercise.shift_hint}
          </span>
        )}
      </div>

      {/* Solicitation + Thought Card — visually distinct from assembly prompts */}
      <p className="text-base text-[var(--text-color)] font-bold leading-snug">{exercise.prompt}</p>
      <div className="p-4 rounded-lg bg-[var(--bg-color)] border-l-4 border-[var(--main-color)] space-y-2">
        <Quote className="w-4 h-4 text-[var(--main-color)]" />
        <p className="text-base text-[var(--text-color)] italic leading-relaxed">{exercise.idea}</p>
        <p className="text-[11px] text-[var(--sub-color)] pt-1 border-t border-[var(--sub-color)]/15">
          Build the {language.name}. The words are yours to choose — not all are needed.
        </p>
      </div>

      {/* TM-6 (guidebook §0.3): a thought is multidimensional and must be split into
          elements before the target language orders them. */}
      {exercise.idea_parts && exercise.idea_parts.length > 0 && (
        <div className="p-3 rounded-lg bg-[var(--bg-color)] border border-dashed border-[var(--main-color)]/40 space-y-2">
          <button
            type="button"
            onClick={() => setShowIdeaParts((v) => !v)}
            aria-expanded={showIdeaParts}
            className="w-full flex items-center justify-between text-[11px] uppercase tracking-wider text-[var(--main-color)] font-bold"
          >
            <span>break the thought up first</span>
            <span className="text-[var(--sub-color)] normal-case tracking-normal">
              {showIdeaParts ? "hide" : "show"}
            </span>
          </button>
          {showIdeaParts && (
            <ul className="space-y-1">
              {exercise.idea_parts.map((part, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[var(--text-color)] leading-relaxed">
                  <span className="text-[var(--main-color)] font-bold shrink-0">{i + 1}.</span>
                  <span>{part}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Pre-exercise Vocabulary Hints */}
      {exercise.vocab_hints && exercise.vocab_hints.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 p-3 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 text-xs">
          <span className="text-[var(--main-color)] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> clue:
          </span>
          {exercise.vocab_hints.map((hint) => (
            <span
              key={hint.word}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-[var(--text-color)]"
            >
              <strong className="text-[var(--main-color)] font-bold">{hint.word}</strong>
              <span className="text-[var(--sub-color)]">=</span>
              <span className="text-[var(--text-color)]">{hint.translation}</span>
              {hint.note && <span className="text-[var(--sub-color)] text-[11px] italic">({hint.note})</span>}
            </span>
          ))}
        </div>
      )}

      {/* Cue Ladder — scaled prompts, revealed only on demand or on failure */}
      {(cuesRevealed > 0 || (cues.length > 0 && status === "idle")) && (
        <div className="space-y-2">
          {cuesRevealed > 0 && (
            <ol className="space-y-1.5" aria-live="polite">
              {cues.slice(0, cuesRevealed).map((cue, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-[var(--text-color)] leading-relaxed">
                  <span className="text-[var(--main-color)] font-bold shrink-0">{i + 1}.</span>
                  <span>{cue}</span>
                </li>
              ))}
            </ol>
          )}
          {cuesRevealed < cues.length && (
            <button
              type="button"
              onClick={revealNextCue}
              disabled={status === "correct" || status === "almost"}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/20 text-xs font-mono text-[var(--sub-color)] hover:text-[var(--main-color)] hover:border-[var(--main-color)]/40 transition cursor-pointer disabled:opacity-40"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>show me a step{cuesRevealed > 0 ? ` (${cuesRevealed}/${cues.length})` : ""}</span>
            </button>
          )}
        </div>
      )}

      {/* Free-text production input with insertable vocabulary chips */}
      <div className="space-y-3">
        <ProductionAnswerInput
          inputRef={inputRef}
          value={userInput}
          onChange={(value) => {
            setUserInput(value);
            setStatus("idle");
            setFeedbackNote(null);
          }}
          onVerify={handleVerify}
          onReset={resetCurrentExercise}
          label={exercise.prompt || `Build the ${language.name} sentence`}
          languageId={language.id}
          placeholder={`build the ${language.name.toLowerCase()} sentence...`}
          readOnly={status === "correct" || status === "almost"}
          settings={settings}
        />

        <div className="flex flex-wrap gap-2 pt-1">
          {wordBank.map((word, i) => (
            <button
              key={`${word}-${i}`}
              type="button"
              onClick={() => insertWord(word)}
              disabled={status === "correct" || status === "almost"}
              className="px-3 py-1.5 rounded-lg border text-xs font-mono transition flex items-center gap-2 cursor-pointer border-[var(--sub-color)]/20 bg-[var(--bg-color)] hover:border-[var(--main-color)] text-[var(--text-color)] disabled:opacity-40"
            >
              {settings.showKeyTips && (
                <span className="keycap text-[10px]">{i + 1}</span>
              )}
              <span>{word}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Actions & Notifications */}
      <ProductionAnswerActions
        status={status}
        feedback={feedbackNote}
        onVerify={handleVerify}
        action="verify"
        showKeyTips={settings.showKeyTips}
      />

      {showErrorSheet && (
        <ErrorFeedbackSheet
          userInput={failedAttemptText}
          expectedAnswer={target}
          englishPrompt={exercise.prompt}
          shiftRule={exercise.shift_hint}
          explanation={exercise.explanation}
          diagnosis={failedDiagnosis}
          onContinue={handleErrorContinue}
        />
      )}

      {showSuccessSheet && (
        <SuccessFeedbackSheet
          onFlagGuessed={!isRetry ? onFlagGuessed : undefined}
          targetAnswer={acceptedTarget}
          meaning={exercise.meaning}
          explanation={exercise.explanation}
          vocabHints={exercise.vocab_hints}
          shiftRule={exercise.shift_hint}
          variant={sheetVariant}
          userAttempt={verifiedAttemptText}
          warningNote={almostWarningNote}
          affirmation={affirmation}
          onContinue={handleSuccessContinue}
        />
      )}
    </div>
  );
};
