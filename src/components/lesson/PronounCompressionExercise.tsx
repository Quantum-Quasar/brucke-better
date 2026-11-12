"use client";

// Pronoun Compression Exercise: a rare, visual, numeral-free clause-folding
// moment on the trail. Instead of numbered steps or mechanical fill-in-the-blank,
// the learner sees a full noun-heavy sentence and folds its repeated or heavy
// noun phrases into compact pronouns in their natural syntactic slot.

import React, { useState } from "react";
import {
  Minimize2,
  Maximize2,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { ProductionAnswerInput } from "./inputs/ProductionAnswerInput";
import { ProductionAnswerActions } from "./ProductionAnswerActions";
import { ErrorFeedbackSheet } from "./ErrorFeedbackSheet";
import { SuccessFeedbackSheet } from "./SuccessFeedbackSheet";
import { useProductionAttempt } from "./use-production-attempt";
import { soundEngine } from "@/lib/sound";
import type { ExerciseItem } from "@/lib/types";

interface PronounCompressionExerciseProps {
  exercise: ExerciseItem;
  isRetry?: boolean;
  onSuccess: () => void;
  onError: (errorType: "spelling" | "umlaut" | "capitalization") => void;
  onQueueRetry?: () => void;
  onFlagGuessed?: () => void;
  onPurpleForfeit?: () => void;
}

export const PronounCompressionExercise: React.FC<PronounCompressionExerciseProps> = ({
  exercise,
  isRetry = false,
  onSuccess,
  onError,
  onQueueRetry,
  onPurpleForfeit,
  onFlagGuessed,
}) => {
  const [isFoldPreviewOpen, setIsFoldPreviewOpen] = useState(false);
  const {
    inputRef,
    settings,
    language,
    wordBank,
    target,
    affirmation,
    userInput,
    setUserInput,
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
    insertWord: appendChip,
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
    emptyMessage: "Fold the sentence into its compact form before verifying.",
    exactMessage: "Spot On! Cleanly folded.",
    almostMessage: `Almost right! Standard form: "${exercise.target_answer.trim()}"`,
    onIncorrect: () => setIsFoldPreviewOpen(true),
    onReset: () => setIsFoldPreviewOpen(false),
  });

  const fullSentence = exercise.full_sentence ?? "";
  const compressedParts = exercise.compressed_parts ?? [];

  const toggleFoldPreview = () => {
    void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    if (!isFoldPreviewOpen) {
      onPurpleForfeit?.();
    }
    setIsFoldPreviewOpen((prev) => !prev);
  };

  // Highlight the target noun phrases inside the unfolded sentence without any numbers
  const renderHighlightedSentence = (sentence: string) => {
    if (!sentence || compressedParts.length === 0) {
      return <span>{sentence}</span>;
    }
    let segments: Array<{ text: string; part?: (typeof compressedParts)[number] }> = [
      { text: sentence },
    ];
    for (const part of compressedParts) {
      const nextSegments: typeof segments = [];
      for (const seg of segments) {
        if (seg.part) {
          nextSegments.push(seg);
          continue;
        }
        const idx = seg.text.toLowerCase().indexOf(part.noun.toLowerCase());
        if (idx === -1) {
          nextSegments.push(seg);
          continue;
        }
        if (idx > 0) {
          nextSegments.push({ text: seg.text.slice(0, idx) });
        }
        nextSegments.push({
          text: seg.text.slice(idx, idx + part.noun.length),
          part,
        });
        if (idx + part.noun.length < seg.text.length) {
          nextSegments.push({ text: seg.text.slice(idx + part.noun.length) });
        }
      }
      segments = nextSegments;
    }

    return segments.map((seg, i) => {
      if (!seg.part) {
        return <span key={i}>{seg.text}</span>;
      }
      return (
        <span
          key={i}
          className="inline-flex items-center gap-1.5 mx-0.5 px-2.5 py-0.5 rounded-full bg-[var(--main-color)]/15 border border-[var(--main-color)]/45 text-[var(--main-color)] font-bold transition-all"
        >
          <span className={isFoldPreviewOpen ? "line-through opacity-55 text-xs" : ""}>
            {seg.text}
          </span>
          {isFoldPreviewOpen && (
            <>
              <span className="sr-only">replaced by</span>
              <ArrowRight className="w-3 h-3 opacity-70" />
              <span className="text-[var(--text-color)] underline decoration-[var(--main-color)] decoration-2">
                {seg.part.pronoun}
              </span>
            </>
          )}
        </span>
      );
    });
  };


  return (
    <div className="p-6 rounded-xl bg-[var(--sub-alt-color)] border border-[var(--main-color)]/30 space-y-5 shadow-lg font-mono">
      {/* Header — rare visual exercise badge, strictly numeral-free */}
      <div className="flex items-center justify-between border-b border-[var(--sub-color)]/15 pb-3">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-md bg-[var(--main-color)]/15 text-[var(--main-color)]">
            <Minimize2 className="w-3.5 h-3.5" />
          </span>
          <span className="text-xs uppercase tracking-wider text-[var(--main-color)] font-semibold">
            {isRetry ? "retry compression" : "compress the clause"}
          </span>
        </div>
        {exercise.shift_hint && (
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-[var(--bg-color)] text-[var(--main-color)] border border-[var(--main-color)]/30 font-bold">
            {exercise.shift_hint}
          </span>
        )}
      </div>

      <p className="text-base text-[var(--text-color)] font-bold leading-snug">{exercise.prompt}</p>

      {/* Unfolded Clause Card */}
      <div className="relative p-5 rounded-xl bg-[var(--bg-color)] border border-[var(--main-color)]/25 space-y-3 overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-[var(--sub-color)]">
            unfolded sentence
          </span>
          {compressedParts.length > 0 && (
            <button
              type="button"
              onClick={toggleFoldPreview}
              aria-expanded={isFoldPreviewOpen}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--sub-alt-color)] border border-[var(--main-color)]/30 text-[11px] text-[var(--main-color)] hover:bg-[var(--main-color)]/10 transition cursor-pointer"
            >
              {isFoldPreviewOpen ? (
                <>
                  <Maximize2 className="w-3 h-3" />
                  <span>unfold nouns</span>
                </>
              ) : (
                <>
                  <Minimize2 className="w-3 h-3" />
                  <span>peek at the fold</span>
                </>
              )}
            </button>
          )}
        </div>

        <p className="text-lg text-[var(--text-color)] leading-relaxed">
          {renderHighlightedSentence(fullSentence)}
        </p>

        {exercise.meaning && (
          <p className="text-xs text-[var(--sub-color)] italic pt-2 border-t border-[var(--sub-color)]/15">
            {exercise.meaning}
          </p>
        )}

        {/* Visual Fold Ribbon when toggled */}
        {isFoldPreviewOpen && compressedParts.length > 0 && (
          <div className="pt-2 flex flex-wrap gap-2">
            {compressedParts.map((part) => (
              <div
                key={`${part.noun}-${part.pronoun}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--main-color)]/30 text-xs"
              >
                <span className="text-[var(--sub-color)] line-through">{part.noun}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[var(--main-color)]" />
                <span className="text-[var(--main-color)] font-bold">{part.pronoun}</span>
                <span className="text-[10px] text-[var(--sub-color)] italic">({part.role})</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Compressed Input + Tactile Word Pills (zero numerals on pills) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-widest text-[var(--main-color)] font-bold">
            compressed clause
          </span>
          {userInput && status === "idle" && (
            <button
              type="button"
              onClick={() => setUserInput("")}
              className="inline-flex items-center gap-1 text-[11px] text-[var(--sub-color)] hover:text-[var(--text-color)] transition cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>clear</span>
            </button>
          )}
        </div>

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
          label={exercise.prompt || `Compressed ${language.name} clause`}
          languageId={language.id}
          placeholder={`fold into ${language.name.toLowerCase()}...`}
          readOnly={status === "correct" || status === "almost"}
          settings={settings}
        />

        <div className="flex flex-wrap gap-2 pt-1">
          {wordBank.map((word, idx) => (
            <button
              key={`${word}-${idx}`}
              type="button"
              onClick={() => appendChip(word)}
              disabled={status === "correct" || status === "almost"}
              className="px-3.5 py-1.5 rounded-full border text-xs font-mono transition flex items-center gap-1.5 cursor-pointer border-[var(--sub-color)]/25 bg-[var(--bg-color)] hover:border-[var(--main-color)] hover:bg-[var(--main-color)]/10 text-[var(--text-color)] disabled:opacity-40"
            >
              <span>{word}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <ProductionAnswerActions status={status} feedback={feedbackNote} onVerify={handleVerify} action="fold & check" />

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
