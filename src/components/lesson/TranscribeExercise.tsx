"use client";

// Sentence production reuses the ordinary typed grading path. Earlier transcribe
// drills keep their bank and cue ladder; final sentences offer free optional help.

import React, { useState, useEffect, useId } from "react";
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
  recallFirst?: boolean;
  onSuccess: () => void;
  onError: (errorType: "spelling" | "umlaut" | "capitalization") => void;
  onQueueRetry?: () => void;
  /** TM-6: the learner got it right but did not trust it (guidebook §1.8/§1.9) */
  onFlagGuessed?: () => void;
  /** Earlier production drills only; final sentence help never forfeits purple. */
  onPurpleForfeit?: () => void;
}

export const TranscribeExercise: React.FC<TranscribeExerciseProps> = ({
  exercise,
  isRetry = false,
  recallFirst = false,
  onSuccess,
  onError,
  onQueueRetry,
  onPurpleForfeit,
  onFlagGuessed,
}) => {
  const [showIdeaParts, setShowIdeaParts] = useState(false);
  const [showWords, setShowWords] = useState(isRetry);
  const [showClues, setShowClues] = useState(isRetry);
  const wordBankId = useId();
  const vocabCluesId = useId();
  const wordsVisible = !recallFirst || showWords;
  const hasVocabHints = Boolean(exercise.vocab_hints && exercise.vocab_hints.length > 0);
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
    onPurpleForfeit: recallFirst ? undefined : onPurpleForfeit,
    emptyMessage: "Please enter or select an answer before verifying.",
    exactMessage: "Spot On! Perfect.",
    onReset: () => { setShowIdeaParts(false); setShowClues(isRetry); },
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
      const active = document.activeElement;
      const isInput = active === inputRef.current;
      if (!isInput && active instanceof HTMLElement &&
        (active.isContentEditable || active.tagName === "INPUT" || active.tagName === "TEXTAREA" || active.tagName === "SELECT")) return;
      if (e.key === "Enter" && !isInput) {
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
      if (wordsVisible && !isNaN(num) && num >= 1 && num <= wordBank.length && status !== "correct" && status !== "almost") {
        e.preventDefault();
        insertWord(wordBank[num - 1]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [userInput, status, showErrorSheet, showSuccessSheet, wordBank, settings, cuesRevealed, cues.length, wordsVisible]);


  return (
    <div className="p-6 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--main-color)]/25 space-y-5 shadow-lg font-mono">
      {/* Exercise Header */}
      <div className="flex items-center justify-between border-b border-[var(--sub-color)]/15 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--main-color)]" />
          <span className="text-xs uppercase tracking-wider text-[var(--main-color)] font-semibold">
            {isRetry ? "retry exercise" : recallFirst ? "recall the sentence" : "transcribe the thought"}
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
        <p className="text-base text-[var(--text-color)] italic leading-relaxed">{exercise.idea || exercise.meaning || exercise.prompt}</p>
        <p className="text-[11px] text-[var(--sub-color)] pt-1 border-t border-[var(--sub-color)]/15">
          {recallFirst
            ? `Try typing the ${language.name} from the meaning. The words and help are here whenever you need them — no penalty.`
            : `Build the ${language.name}. The words are yours to choose — not all are needed.`}
        </p>
      </div>

      {recallFirst && (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            {hasVocabHints && (
              <button
                type="button"
                onClick={() => setShowClues(true)}
                aria-expanded={showClues || showWords || status === "incorrect" || Boolean(failedAttemptText)}
                aria-controls={vocabCluesId}
                className="min-h-11 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[var(--sub-color)]/40 text-sm font-bold text-[var(--text-color)] hover:border-[var(--main-color)]/60 hover:text-[var(--main-color)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--main-color)] cursor-pointer"
              >
                <Sparkles aria-hidden="true" className="w-4 h-4 text-[var(--main-color)]" />
                {showClues || showWords || status === "incorrect" || Boolean(failedAttemptText) ? "Vocabulary clues shown" : "Show vocabulary clues"}
              </button>
            )}
            <button
              type="button"
              onClick={() => setShowWords(true)}
              aria-expanded={wordsVisible}
              aria-controls={wordBankId}
              className="min-h-11 w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-[var(--main-color)]/50 text-sm font-bold text-[var(--main-color)] hover:bg-[var(--main-color)]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--main-color)] cursor-pointer"
            >
              <Lightbulb aria-hidden="true" className="w-4 h-4" />
              {wordsVisible ? "Words / help shown" : "Show words / help"}
            </button>
          </div>
          <p className="text-xs text-[var(--sub-color)]">Try from memory first — vocabulary clues and the word bank unlock whenever you ask or miss.</p>
        </div>
      )}

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

      {/* Pre-exercise Vocabulary Hints — hidden on first recall attempt until requested or missed */}
      {hasVocabHints && (!recallFirst || showClues || showWords || status === "incorrect" || Boolean(failedAttemptText)) && (
        <div id={vocabCluesId} className="flex flex-wrap items-center gap-2 p-3 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 text-xs">
          <span className="text-[var(--main-color)] font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> clue:
          </span>
          {(exercise.vocab_hints ?? []).map((hint) => (
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
          placeholder={recallFirst ? `type the ${language.name.toLowerCase()} sentence...` : `build the ${language.name.toLowerCase()} sentence...`}
          readOnly={status === "correct" || status === "almost"}
          settings={settings}
        />

        <div id={wordBankId} hidden={!wordsVisible} data-testid="sentence-word-bank" className={wordsVisible ? "flex flex-wrap gap-2 pt-1" : undefined}>
          {wordsVisible && wordBank.map((word, i) => (
            <button
              key={`${word}-${i}`}
              type="button"
              onClick={() => insertWord(word)}
              disabled={status === "correct" || status === "almost"}
              className="min-h-11 px-3 py-1.5 rounded-lg border text-xs font-mono transition flex items-center gap-2 cursor-pointer border-[var(--sub-color)]/20 bg-[var(--bg-color)] hover:border-[var(--main-color)] text-[var(--text-color)] disabled:opacity-40"
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
        inputRef={inputRef}
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
