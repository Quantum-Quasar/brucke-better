"use client";

// Shared state machine for production drills: typing, cue ladder的次数 and the
// exact/almost/incorrect hand-off to the success or error sheet. Each exercise
// keeps only its own prompt and answer-entry surface.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { arrangeTilesDeterministically } from "./exercise-tiles";
import { gradeExerciseAttempt } from "@/lib/exercise-grading";
import { affirmationFor } from "@/lib/shift-diagnosis";
import { getLanguageDefinition } from "@/data/languages";
import { useAppStore } from "@/lib/store";
import { soundEngine } from "@/lib/sound";
import type { ExerciseDiagnosis, ExerciseItem } from "@/lib/types";

export type ProductionStatus = "idle" | "correct" | "almost" | "incorrect";

interface ProductionAttemptOptions {
  exercise: ExerciseItem;
  isRetry: boolean;
  onSuccess: () => void;
  onError: (errorType: "spelling" | "umlaut" | "capitalization") => void;
  onQueueRetry?: () => void;
  onPurpleForfeit?: () => void;
  emptyMessage: string;
  exactMessage: string;
  almostMessage?: string;
  /** Extra work when the attempt is wrong, before the error sheet paints owner. */
  onIncorrect?: () => void;
  /** Extra work on reset: replay counters, fold preview, etc. */
  onReset?: () => void;
  focusDelayMs?: number;
  focusPreventScroll?: boolean;
  /** Dictation can receive Enter twice (input handler + window fallback). */
  guardDuplicateVerify?: boolean;
}

export function useProductionAttempt({
  exercise,
  isRetry,
  onSuccess,
  onError,
  onQueueRetry,
  onPurpleForfeit,
  emptyMessage,
  exactMessage,
  almostMessage,
  onIncorrect,
  onReset,
  focusDelayMs = 50,
  focusPreventScroll = true,
  guardDuplicateVerify = false,
}: ProductionAttemptOptions) {
  const [userInput, setUserInput] = useState("");
  const [cuesRevealed, setCuesRevealed] = useState(0);
  const [status, setStatus] = useState<ProductionStatus>("idle");
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
  const verifyingRef = useRef(false);
  const tolerance = useAppStore((s) => s.tolerance);
  const settings = useAppStore((s) => s.settings);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);

  const wordBank = useMemo(() => {
    const cleaned = (exercise.word_bank || []).map((word) => word.replace(/[.,!?;:]+$/, ""));
    return arrangeTilesDeterministically(cleaned, `${exercise.id}#wb`, exercise.target_answer);
  }, [exercise.word_bank, exercise.id, exercise.target_answer]);
  const cues = exercise.cues ?? [];
  const target = exercise.target_answer.trim();
  const affirmation = affirmationFor(exercise.affirmation, exercise.shift_hint);

  const resetCurrentExercise = useCallback(() => {
    verifyingRef.current = false;
    setUserInput("");
    setCuesRevealed(0);
    setStatus("idle");
    setSheetVariant("exact");
    setVerifiedAttemptText("");
    setAlmostWarningNote(undefined);
    setFeedbackNote(null);
    setShowErrorSheet(false);
    setShowSuccessSheet(false);
    setFailedAttemptText("");
    setFailedDiagnosis(undefined);
    onReset?.();
    setTimeout(() => inputRef.current?.focus({ preventScroll: focusPreventScroll }), focusDelayMs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise.id]);

  useEffect(() => {
    resetCurrentExercise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise.id]);

  const insertWord = (word: string) => {
    if (status === "correct" || status === "almost") return;
    void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    setFeedbackNote(null);
    setUserInput((previous) => {
      if (!previous) return word;
      return previous.endsWith(" ") ? previous + word : `${previous} ${word}`;
    });
    setTimeout(() => inputRef.current?.focus({ preventScroll: focusPreventScroll }), 0);
  };

  const revealNextCue = () => {
    if (cuesRevealed >= cues.length) return;
    onPurpleForfeit?.();
    setCuesRevealed((count) => count + 1);
  };

  const handleVerify = () => {
    if (guardDuplicateVerify && verifyingRef.current) return;
    const answer = userInput.trim();
    if (!answer) {
      setFeedbackNote(emptyMessage);
      return;
    }
    if (guardDuplicateVerify) verifyingRef.current = true;
    inputRef.current?.blur();

    const graded = gradeExerciseAttempt(
      exercise,
      [answer],
      {
        umlautTolerance: Boolean(settings.lazyMode ?? tolerance.umlautTolerance),
        capitalizationTolerance: Boolean(settings.capitalizationTolerance ?? tolerance.capitalizationTolerance),
        languageId: activeLanguageId,
      },
      isRetry,
      wordBank
    );
    const evaluation = graded.result;
    setAcceptedTarget(graded.target);

    if (evaluation.accuracy === "exact") {
      setStatus("correct");
      setFeedbackNote(exactMessage);
      setSheetVariant("exact");
      setVerifiedAttemptText(answer);
      setAlmostWarningNote(undefined);
      setShowSuccessSheet(true);
      return;
    }

    if (evaluation.accuracy === "almost") {
      setStatus("almost");
      setFeedbackNote(
        evaluation.warningNote ?? almostMessage ?? `Almost right! Note standard spelling: "${target}"`
      );
      setSheetVariant("almost");
      setVerifiedAttemptText(answer);
      setAlmostWarningNote(evaluation.warningNote);
      setShowSuccessSheet(true);
      if (graded.queueRetry) onQueueRetry?.();
      return;
    }

    setStatus("incorrect");
    void soundEngine.playError(settings.playSoundOnError, settings.soundVolume);
    onError(graded.errorType);
    onQueueRetry?.();
    setFailedAttemptText(answer);
    setFailedDiagnosis(graded.diagnosis);
    // A failed attempt brings the next rung of the ladder; never retroactively graded.
    if (cuesRevealed < cues.length) setCuesRevealed((count) => count + 1);
    onIncorrect?.();
    setShowErrorSheet(true);
  };

  const handleSuccessContinue = () => {
    setShowSuccessSheet(false);
    setStatus("idle");
    setFeedbackNote(null);
    onSuccess();
  };

  const handleErrorContinue = () => {
    setShowErrorSheet(false);
    setStatus("idle");
    setFeedbackNote(null);
    if (isRetry) {
      setUserInput("");
      setTimeout(() => inputRef.current?.focus({ preventScroll: focusPreventScroll }), focusDelayMs);
    } else {
      onSuccess();
    }
  };

  return {
    inputRef,
    tolerance,
    settings,
    activeLanguageId,
    language,
    wordBank,
    cues,
    target,
    affirmation,
    userInput,
    setUserInput,
    cuesRevealed,
    status,
    setStatus,
    sheetVariant,
    verifiedAttemptText,
    acceptedTarget,
    almostWarningNote,
    feedbackNote,
    setFeedbackNote,
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
  };
}
