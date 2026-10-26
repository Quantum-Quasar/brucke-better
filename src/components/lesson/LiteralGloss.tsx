"use client";

// TM-2 direct translation: the German sentence is shown, and the learner picks the
// English rendering that is built the German way. The odd English IS the explanation —
// it is a lens, never a register to produce, so the success reveal always pairs the
// word-for-word rendering with its natural English (guidebook §1.4, both limits).

import React, { useState, useEffect } from "react";
import { Check, Sparkles } from "lucide-react";
import { ErrorFeedbackSheet } from "./ErrorFeedbackSheet";
import { SuccessFeedbackSheet } from "./SuccessFeedbackSheet";
import { arrangeTilesDeterministically } from "./ExerciseWidgets";
import { evaluateAnswerAccuracy } from "@/lib/letter-diff";
import { affirmationFor } from "@/lib/shift-diagnosis";
import { useAppStore } from "@/lib/store";
import { soundEngine } from "@/lib/sound";
import type { ExerciseItem } from "@/lib/types";

interface LiteralGlossProps {
  exercise: ExerciseItem;
  isRetry?: boolean;
  onSuccess: () => void;
  onError: (errorType: "spelling" | "umlaut" | "capitalization") => void;
  onQueueRetry?: () => void;
  /** TM-6: the learner got it right but did not trust it (§1.8/§1.9) */
  onFlagGuessed?: () => void;
}

const token = (s: string) => s.toLowerCase().replace(/[.,!?;:]+$/, "");

export const LiteralGloss: React.FC<LiteralGlossProps> = ({
  exercise,
  isRetry = false,
  onSuccess,
  onError,
  onQueueRetry,
  onFlagGuessed,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "correct" | "almost" | "incorrect">("idle");
  const [sheetVariant, setSheetVariant] = useState<"exact" | "almost">("exact");
  const [feedbackNote, setFeedbackNote] = useState<string | null>(null);
  const [showErrorSheet, setShowErrorSheet] = useState(false);
  const [showSuccessSheet, setShowSuccessSheet] = useState(false);
  const [failedAttemptText, setFailedAttemptText] = useState("");

  const settings = useAppStore((s) => s.settings);
  const tolerance = useAppStore((s) => s.tolerance);

  const options = React.useMemo(() => arrangeTilesDeterministically(exercise.options ?? [], `${exercise.id}#lg`, exercise.target_answer), [exercise.options, exercise.id, exercise.target_answer]);
  const german = exercise.german ?? "";
  const natural = exercise.natural ?? "";

  // load-bearing words: present in the literal rendering but not the natural one;
  // when the two share a word set (pure re-ordering), the first word whose
  // position differs is the moved one and gets the highlight
  const literalPair = React.useMemo(() => {
    const literalTokens = exercise.target_answer.split(/\s+/);
    const naturalTokens = natural.split(/\s+/);
    const naturalTokenSet = new Set(naturalTokens.map(token));
    let highlights = literalTokens
      .map(token)
      .filter((t) => t && !naturalTokenSet.has(t));
    if (highlights.length === 0) {
      const strip = (s: string) => token(s);
      for (let i = 0; i < Math.min(literalTokens.length, naturalTokens.length); i++) {
        if (strip(literalTokens[i]) !== strip(naturalTokens[i])) {
          const moved = strip(literalTokens[i]);
          if (moved) highlights = [moved];
          break;
        }
      }
    }
    return { literal: exercise.target_answer, natural, highlights: [...new Set(highlights)] };
  }, [exercise.target_answer, natural]);

  const resetCurrentExercise = () => {
    setSelectedOption(null);
    setStatus("idle");
    setSheetVariant("exact");
    setFeedbackNote(null);
    setShowErrorSheet(false);
    setShowSuccessSheet(false);
    setFailedAttemptText("");
  };

  useEffect(() => {
    resetCurrentExercise();
  }, [exercise.id]);

  const handleOptionSelect = (option: string) => {
    if (status === "correct" || status === "almost") return;
    void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    setSelectedOption(option);
    const evalOptions = {
      umlautTolerance: Boolean(settings.lazyMode ?? tolerance.umlautTolerance),
      capitalizationTolerance: Boolean(settings.capitalizationTolerance ?? tolerance.capitalizationTolerance),
    };
    const evaluation = evaluateAnswerAccuracy(option, exercise.target_answer, evalOptions);
    if (evaluation.accuracy === "exact") {
      setStatus("correct");
      setFeedbackNote("Spot On! Perfect.");
      setSheetVariant("exact");
      setShowSuccessSheet(true);
    } else if (evaluation.accuracy === "almost") {
      setStatus("almost");
      setFeedbackNote(evaluation.warningNote || "Almost right!");
      setSheetVariant("almost");
      setShowSuccessSheet(true);
      if ((evaluation.reason === "typo" || evaluation.reason === "sharp-s") || (evaluation.reason === "umlaut" && !evalOptions.umlautTolerance)) {
        onQueueRetry?.();
      }
    } else {
      setStatus("incorrect");
      void soundEngine.playError(settings.playSoundOnError, settings.soundVolume);
      onError("spelling");
      onQueueRetry?.();
      setFailedAttemptText(option);
      setShowErrorSheet(true);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (settings.quickRestart === "esc" && e.key === "Escape") {
        e.preventDefault();
        resetCurrentExercise();
        return;
      }
      if (showErrorSheet || showSuccessSheet) return;
      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= options.length && status !== "correct" && status !== "almost") {
        e.preventDefault();
        handleOptionSelect(options[num - 1]);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [options, status, showErrorSheet, showSuccessSheet, settings]);

  return (
    <div className="p-6 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-5 shadow-lg font-mono">
      {/* Exercise Header */}
      <div className="flex items-center justify-between border-b border-[var(--sub-color)]/15 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--main-color)]" />
          <span className="text-xs uppercase tracking-wider text-[var(--main-color)] font-semibold">
            {isRetry ? "retry exercise" : "direct translation"}
          </span>
        </div>
        {exercise.shift_hint && (
          <span className="text-xs px-2.5 py-0.5 rounded bg-[var(--bg-color)] text-[var(--main-color)] border border-[var(--sub-color)]/20 font-bold">
            {exercise.shift_hint}
          </span>
        )}
      </div>

      <p className="text-base text-[var(--text-color)] font-bold leading-snug">{exercise.prompt}</p>

      {/* The German sentence — the thing being read the German way */}
      <div className="p-4 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/20 text-center">
        <div className="text-xl font-bold text-[var(--main-color)] font-mono">{german}</div>
      </div>

      {/* English renderings — exactly one is built the German way */}
      <div className="grid grid-cols-1 gap-2.5 pt-1">
        {options.map((opt, i) => (
          <button
            key={opt}
            type="button"
            onClick={() => handleOptionSelect(opt)}
            disabled={status !== "idle"}
            className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/20 text-xs font-mono text-[var(--text-color)] transition text-left group cursor-pointer disabled:opacity-60"
          >
            <span className={`group-hover:text-[var(--main-color)] font-bold ${selectedOption === opt ? "text-[var(--main-color)]" : ""}`}>
              {opt}
            </span>
            {settings.showKeyTips && (
              <span className="keycap text-[10px]">{i + 1}</span>
            )}
          </button>
        ))}
      </div>

      {/* Footer Notifications */}
      {feedbackNote && (
        <div className="pt-3 border-t border-[var(--sub-color)]/15">
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
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>{feedbackNote}</span>
          </p>
        </div>
      )}

      {showErrorSheet && (
        <ErrorFeedbackSheet
          userInput={failedAttemptText}
          expectedAnswer={exercise.target_answer}
          englishPrompt={exercise.prompt}
          shiftRule={exercise.shift_hint}
          explanation={exercise.explanation}
          onContinue={() => {
            setShowErrorSheet(false);
            setStatus("idle");
            setFeedbackNote(null);
            if (isRetry) {
              setSelectedOption(null);
            } else {
              onSuccess();
            }
          }}
        />
      )}

      {showSuccessSheet && (
        <SuccessFeedbackSheet
          onFlagGuessed={!isRetry ? onFlagGuessed : undefined}
          targetAnswer={exercise.target_answer}
          meaning={exercise.meaning}
          explanation={exercise.explanation}
          vocabHints={exercise.vocab_hints}
          shiftRule={exercise.shift_hint}
          variant={sheetVariant}
          affirmation={affirmationFor(exercise.affirmation, exercise.shift_hint)}
          literalPair={literalPair}
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
