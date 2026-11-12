"use client";

// Pronoun Compression Exercise: a rare, visual, numeral-free clause-folding
// moment on the trail. Instead of numbered steps or mechanical fill-in-the-blank,
// the learner sees a full noun-heavy sentence and folds its repeated or heavy
// noun phrases into compact pronouns in their natural syntactic slot.

import React, { useState, useEffect, useRef } from "react";
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
import { arrangeTilesDeterministically } from "./exercise-tiles";
import { gradeExerciseAttempt } from "@/lib/exercise-grading";
import { affirmationFor } from "@/lib/shift-diagnosis";
import { getLanguageDefinition } from "@/data/languages";
import { useAppStore } from "@/lib/store";
import { soundEngine } from "@/lib/sound";
import type { ExerciseDiagnosis, ExerciseItem } from "@/lib/types";

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
  const [userInput, setUserInput] = useState("");
  const [isFoldPreviewOpen, setIsFoldPreviewOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "correct" | "almost" | "incorrect">("idle");
  const [sheetVariant, setSheetVariant] = useState<"exact" | "almost">("exact");
  const [verifiedAttemptText, setVerifiedAttemptText] = useState("");
  const [acceptedTarget, setAcceptedTarget] = useState(exercise.target_answer);
  const [almostWarningNote, setAlmostWarningNote] = useState<string | undefined>(undefined);
  const [feedbackNote, setFeedbackNote] = useState<string | null>(null);
  const [showErrorSheet, setShowErrorSheet] = useState(false);
  const [showSuccessSheet, setShowSuccessSheet] = useState(false);
  const [failedAttemptText, setFailedAttemptText] = useState("");
  const [failedDiagnosis, setFailedDiagnosis] = useState<ExerciseDiagnosis | undefined>(undefined);

  const inputRef = useRef<HTMLInputElement>(null);
  const tolerance = useAppStore((s) => s.tolerance);
  const settings = useAppStore((s) => s.settings);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);

  const wordBank = React.useMemo(() => {
    const cleaned = (exercise.word_bank || []).map((w) => w.replace(/[.,!?;:]+$/, ""));
    return arrangeTilesDeterministically(cleaned, `${exercise.id}#wb`, exercise.target_answer);
  }, [exercise.word_bank, exercise.id, exercise.target_answer]);
  const target = exercise.target_answer.trim();
  const fullSentence = exercise.full_sentence ?? "";
  const compressedParts = exercise.compressed_parts ?? [];

  const resetCurrentExercise = () => {
    setUserInput("");
    setIsFoldPreviewOpen(false);
    setStatus("idle");
    setSheetVariant("exact");
    setVerifiedAttemptText("");
    setAlmostWarningNote(undefined);
    setFeedbackNote(null);
    setShowErrorSheet(false);
    setShowSuccessSheet(false);
    setFailedAttemptText("");
    setFailedDiagnosis(undefined);
    setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 50);
  };

  useEffect(() => {
    resetCurrentExercise();
  }, [exercise.id]);

  const appendChip = (word: string) => {
    if (status === "correct" || status === "almost") return;
    void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    setFeedbackNote(null);
    setUserInput((prev) => {
      if (!prev) return word;
      return prev.endsWith(" ") ? prev + word : `${prev} ${word}`;
    });
    setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 0);
  };

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


  const handleVerify = () => {
    inputRef.current?.blur();
    const answerToCheck = userInput.trim();
    if (!answerToCheck) {
      setFeedbackNote("Fold the sentence into its compact form before verifying.");
      return;
    }

    const evalOptions = {
      umlautTolerance: Boolean(settings.lazyMode ?? tolerance.umlautTolerance),
      capitalizationTolerance: Boolean(
        settings.capitalizationTolerance ?? tolerance.capitalizationTolerance
      ),
    };
    const graded = gradeExerciseAttempt(exercise, [answerToCheck], { ...evalOptions, languageId: activeLanguageId }, isRetry, wordBank);
    const evaluation = graded.result;
    setAcceptedTarget(graded.target);

    if (evaluation.accuracy === "exact") {
      setStatus("correct");
      setFeedbackNote("Spot On! Cleanly folded.");
      setSheetVariant("exact");
      setVerifiedAttemptText(answerToCheck);
      setAlmostWarningNote(undefined);
      setShowSuccessSheet(true);
      return;
    }

    if (evaluation.accuracy === "almost") {
      setStatus("almost");
      setFeedbackNote(evaluation.warningNote || `Almost right! Standard form: "${target}"`);
      setSheetVariant("almost");
      setVerifiedAttemptText(answerToCheck);
      setAlmostWarningNote(evaluation.warningNote);
      setShowSuccessSheet(true);
      if (graded.queueRetry) onQueueRetry?.();
      return;
    }

    setStatus("incorrect");
    void soundEngine.playError(settings.playSoundOnError, settings.soundVolume);
    onError(graded.errorType);
    onQueueRetry?.();
    setFailedAttemptText(answerToCheck);
    setFailedDiagnosis(graded.diagnosis);
    setIsFoldPreviewOpen(true);
    setShowErrorSheet(true);
  };

  const affirmation = affirmationFor(exercise.affirmation, exercise.shift_hint);

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
          onContinue={() => {
            setShowErrorSheet(false);
            setStatus("idle");
            setFeedbackNote(null);
            if (isRetry) {
              setUserInput("");
              setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 50);
            } else {
              onSuccess();
            }
          }}
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
};
