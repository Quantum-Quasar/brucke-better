"use client";

// Pronoun Compression Exercise: a rare, visual, numeral-free clause-folding
// moment on the trail. Instead of numbered steps or mechanical fill-in-the-blank,
// the learner sees a full noun-heavy sentence and folds its repeated or heavy
// noun phrases into compact pronouns in their natural syntactic slot.

import React, { useState, useEffect, useRef } from "react";
import {
  Check,
  AlertCircle,
  Sparkles,
  Minimize2,
  Maximize2,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { GermanCharBar } from "@/components/common/GermanCharBar";
import { ErrorFeedbackSheet } from "./ErrorFeedbackSheet";
import { SuccessFeedbackSheet } from "./SuccessFeedbackSheet";
import { arrangeTilesDeterministically } from "./ExerciseWidgets";
import { evaluateAnswerAccuracy } from "@/lib/letter-diff";
import { diagnoseAttempt, affirmationFor } from "@/lib/shift-diagnosis";
import { DIAGNOSIS_BY_LANGUAGE, GERMAN_DIAGNOSIS } from "@/data/shift-diagnosis-table";
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

const tokensOf = (s: string) =>
  s
    .toLowerCase()
    .replace(/[.,!?;:]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);

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
  const [almostWarningNote, setAlmostWarningNote] = useState<string | undefined>(undefined);
  const [feedbackNote, setFeedbackNote] = useState<string | null>(null);
  const [showErrorSheet, setShowErrorSheet] = useState(false);
  const [showSuccessSheet, setShowSuccessSheet] = useState(false);
  const [failedAttemptText, setFailedAttemptText] = useState("");
  const [failedDiagnosis, setFailedDiagnosis] = useState<ExerciseDiagnosis | undefined>(undefined);
  const [isCapsLock, setIsCapsLock] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

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

  const diagnoseFailure = (attempt: string): ExerciseDiagnosis | undefined => {
    if (exercise.diagnosis) return exercise.diagnosis;
    const diagTable = DIAGNOSIS_BY_LANGUAGE[activeLanguageId] ?? GERMAN_DIAGNOSIS;
    const attemptTokens = tokensOf(attempt);
    const targetTokens = tokensOf(target);
    const sameMultiset =
      attemptTokens.length === targetTokens.length &&
      [...attemptTokens].sort().join(" ") === [...targetTokens].sort().join(" ");
    if (sameMultiset && attempt.trim() !== target) {
      return diagTable.word_order;
    }
    const targetSet = new Set(targetTokens);
    const bankSet = new Set(wordBank.map((w) => w.toLowerCase()));
    const distractorUsed = attemptTokens.some((t) => bankSet.has(t) && !targetSet.has(t));
    if (distractorUsed) {
      return diagTable.wrong_word;
    }
    return diagnoseAttempt(target, attempt, exercise.shift_hint) ?? undefined;
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
    const evaluation = evaluateAnswerAccuracy(answerToCheck, target, evalOptions);

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
      if (
        evaluation.reason === "typo" ||
        evaluation.reason === "sharp-s" ||
        (evaluation.reason === "umlaut" && !evalOptions.umlautTolerance)
      ) {
        onQueueRetry?.();
      }
      return;
    }

    setStatus("incorrect");
    void soundEngine.playError(settings.playSoundOnError, settings.soundVolume);
    onError(
      evaluation.reason === "umlaut"
        ? "umlaut"
        : evaluation.reason === "case"
        ? "capitalization"
        : "spelling"
    );
    onQueueRetry?.();
    setFailedAttemptText(answerToCheck);
    setFailedDiagnosis(diagnoseFailure(answerToCheck));
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

        {settings.capsLockWarning && isCapsLock && (
          <div className="flex items-center gap-1.5 text-xs text-[var(--error-color)] font-mono animate-pulse">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>caps lock is on</span>
          </div>
        )}

        <input
          ref={inputRef}
          type="text"
          value={userInput}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          aria-label={exercise.prompt || `Compressed ${language.name} clause`}
          lang={language.id}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          onChange={(e) => {
            setUserInput(e.target.value);
            if (status !== "idle") setStatus("idle");
            setFeedbackNote(null);
          }}
          onKeyDown={(e) => {
            if (e.getModifierState) {
              setIsCapsLock(e.getModifierState("CapsLock"));
            }
            if (settings.quickRestart === "esc" && e.key === "Escape") {
              e.preventDefault();
              resetCurrentExercise();
              return;
            }
            if (e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              handleVerify();
            }
          }}
          readOnly={status === "correct" || status === "almost"}
          placeholder={`fold into ${language.name.toLowerCase()}...`}
          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-color)] border border-[var(--main-color)]/35 text-[var(--main-color)] text-lg font-bold font-mono outline-none focus:border-[var(--main-color)] transition placeholder:text-[var(--sub-color)]/40"
        />

        {(settings.showCharBar === "always" ||
          (settings.showCharBar === "on_focus" && isInputFocused)) && (
          <GermanCharBar onInsert={(char) => setUserInput((prev) => prev + char)} />
        )}

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
      <div className="pt-3 border-t border-[var(--sub-color)]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          {feedbackNote && (
            <p
              className={`text-xs font-mono flex items-center gap-1.5 ${
                status === "correct"
                  ? "text-[var(--main-color)]"
                  : status === "almost"
                  ? "text-[var(--sub-color)]"
                  : "text-[var(--error-color)]"
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

        {status !== "correct" && status !== "almost" && (
          <button
            type="button"
            onClick={handleVerify}
            className="px-5 py-2 rounded-lg bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-mono font-bold text-xs transition cursor-pointer ml-auto flex items-center gap-1.5"
          >
            <span>fold &amp; check</span>
          </button>
        )}
      </div>

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
          targetAnswer={target}
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
