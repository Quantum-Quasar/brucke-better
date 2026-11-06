"use client";

import dynamic from "next/dynamic";
import { Check, AlertCircle, Sparkles } from "lucide-react";
import { ErrorFeedbackSheet } from "./ErrorFeedbackSheet";
import { SuccessFeedbackSheet } from "./SuccessFeedbackSheet";
import { affirmationFor } from "@/lib/shift-diagnosis";
import { useClassicExercise } from "./use-classic-exercise";
import type { ExerciseWidgetProps } from "./exercise-widget-props";
import { ExerciseLoading } from "./ExerciseLoading";

const MorphemeInput = dynamic(() => import("./inputs/MorphemeInput"), { loading: ExerciseLoading });
const MatchingInput = dynamic(() => import("./inputs/MatchingInput"), { loading: ExerciseLoading });
const TypingInput = dynamic(() => import("./inputs/TypingInput"), { loading: ExerciseLoading });
const ChoiceInput = dynamic(() => import("./inputs/ChoiceInput"), { loading: ExerciseLoading });
const SyntaxInput = dynamic(() => import("./inputs/SyntaxInput"), { loading: ExerciseLoading });

export default function ClassicExercise(props: ExerciseWidgetProps) {
  const controller = useClassicExercise(props);
  const { exercise, onSuccess, onFlagGuessed, isRetry, setUserInput, setSelectedIndices, status, setStatus, sheetVariant, verifiedAttemptText, almostWarningNote, feedbackNote, setFeedbackNote, showErrorSheet, setShowErrorSheet, showSuccessSheet, setShowSuccessSheet, failedAttemptText, failedDiagnosis, inputRef, settings, language, isReverseCognate, reverseCognateForeignWord, sanitizedWordBank, sanitizedTileOptions, displayOptions, handleVerify } = controller;
  return (
    <div className="p-6 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-5 shadow-lg font-mono">
      {/* Exercise Header */}
      <div className="flex items-center justify-between border-b border-[var(--sub-color)]/15 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--main-color)]" />
          <span className="text-xs uppercase tracking-wider text-[var(--main-color)] font-semibold">
            {isRetry
              ? "retry exercise"
              : exercise.type === "morpheme_tiles"
              ? "morpheme assembly"
              : exercise.type === "matching_pairs"
              ? "cognate matching"
              : exercise.type === "shift_select"
              ? "shift recognition"
              : exercise.type === "syntax_builder"
              ? "sentence builder"
              : exercise.type === "reverse_cognate"
              ? "reverse cognate"
              : "rule application"}
          </span>
        </div>

        {exercise.shift_hint && (
          <span className="text-xs px-2.5 py-0.5 rounded bg-[var(--bg-color)] text-[var(--main-color)] border border-[var(--sub-color)]/20 font-bold">
            {exercise.shift_hint}
          </span>
        )}
      </div>

      <p className="text-base text-[var(--text-color)] font-bold leading-snug">{exercise.prompt}</p>

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
              <strong className="text-[var(--main-color)] font-bold" lang={language.id}>{hint.word}</strong>
              <span className="text-[var(--sub-color)]">=</span>
              <span className="text-[var(--text-color)]">{hint.translation}</span>
              {hint.note && <span className="text-[var(--sub-color)] text-[11px] italic">({hint.note})</span>}
            </span>
          ))}
        </div>
      )}

      {/* 1. Morpheme Tile Assembly (Scaffolded Beginner) */}
      {exercise.type === "morpheme_tiles" && sanitizedTileOptions.length > 0 && (
        <MorphemeInput controller={controller} />
      )}

      {/* 2. Cognate Matching Cards */}
      {exercise.type === "matching_pairs" && exercise.matching_pairs && (
        <MatchingInput controller={controller} />
      )}

      {/* 3. Typing Derivation Input */}
      {(exercise.type === "derive" || exercise.type === "reverse_cognate") && (
        <TypingInput controller={controller} />
      )}

      {/* 4. Multiple Choice Shift Select */}
      {exercise.type === "shift_select" && displayOptions.length > 0 && (
        <ChoiceInput controller={controller} />
      )}

      {/* 5. Satzklammer Syntax Builder Tiles */}
      {exercise.type === "syntax_builder" && sanitizedWordBank.length > 0 && (
        <SyntaxInput controller={controller} />
      )}

      {/* Footer Actions & Notifications */}
      <div className="pt-3 border-t border-[var(--sub-color)]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div aria-live="polite" role="status">
          {feedbackNote && (
            <p
              className={`text-xs font-mono flex items-center gap-1.5 ${
                status === "correct"
                  ? "text-[var(--main-color)]"
                  : status === "almost"
                  ? "text-[var(--sub-color)]"
                  : status === "incorrect"
                  ? "text-[var(--error-color)]"
                  : "text-[var(--sub-color)]"
              }`}
            >
              {status === "correct" ? (
                <Check className="w-4 h-4 text-[var(--main-color)]" />
              ) : status === "almost" ? (
                <Sparkles className="w-4 h-4 text-[var(--sub-color)]" />
              ) : (
                <AlertCircle className="w-4 h-4 text-[var(--error-color)]" />
              )}
              <span>{feedbackNote}</span>
            </p>
          )}
        </div>

        {status !== "correct" && status !== "almost" && exercise.type !== "shift_select" && exercise.type !== "matching_pairs" && (
          <button
            type="button"
            onClick={handleVerify}
            className="px-5 py-2 rounded-lg bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-mono font-bold text-xs transition cursor-pointer ml-auto flex items-center gap-1.5"
          >
            <span>verify</span>
            {settings.showKeyTips && (
              <span className="keycap text-[10px]">enter</span>
            )}
          </button>
        )}
      </div>

      {/* Error Breakdown Pop-up / Bottom Sheet */}
      {showErrorSheet && (
        <ErrorFeedbackSheet
          userInput={failedAttemptText}
          expectedAnswer={exercise.target_answer}
          englishPrompt={exercise.prompt}
          shiftRule={exercise.shift_hint}
          explanation={exercise.explanation}
          diagnosis={failedDiagnosis}
          answerLabel={isReverseCognate ? "target english cognate:" : undefined}
          audioText={isReverseCognate ? reverseCognateForeignWord ?? exercise.target_answer : undefined}
          audioLocale={
            isReverseCognate
              ? reverseCognateForeignWord
                ? language.ttsLocale
                : "en-US"
              : undefined
          }
          onContinue={() => {
            setShowErrorSheet(false);
            setStatus("idle");
            setFeedbackNote(null);
            if (isRetry) {
              // In retry mode, stay on current exercise and reset input so user can try again
              setUserInput("");
              setSelectedIndices([]);
              setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 50);
            } else {
              // In normal flow, exercise was appended to retry queue, advance
              onSuccess();
            }
          }}
        />
      )}

      {/* Success / Almost Right Breakdown Pop-up / Bottom Sheet */}
      {showSuccessSheet && (
        <SuccessFeedbackSheet
          onFlagGuessed={!isRetry ? onFlagGuessed : undefined}
          targetAnswer={exercise.target_answer}
          meaning={exercise.meaning}
          explanation={exercise.explanation}
          vocabHints={exercise.vocab_hints}
          shiftRule={exercise.shift_hint}
          variant={sheetVariant}
          userAttempt={verifiedAttemptText}
          warningNote={almostWarningNote}
          answerLabel={isReverseCognate ? "english cognate:" : undefined}
          audioText={isReverseCognate ? reverseCognateForeignWord ?? exercise.target_answer : undefined}
          audioLocale={
            isReverseCognate
              ? reverseCognateForeignWord
                ? language.ttsLocale
                : "en-US"
              : undefined
          }
          affirmation={affirmationFor(exercise.affirmation, exercise.shift_hint)}
          onContinue={() => {
            setShowSuccessSheet(false);
            setStatus("idle");
            setFeedbackNote(null);
            onSuccess();
          }}
        />
      )}
    </div>
  );
}
