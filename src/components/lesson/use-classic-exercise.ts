"use client";

import React, { useState, useEffect, useRef } from "react";
import { classicAnswerReadings, gradeExerciseAttempt } from "@/lib/exercise-grading";
import { useClassicKeyboard } from "./use-classic-keyboard";
import { useAppStore } from "@/lib/store";
import { getLanguageDefinition } from "@/data/languages";
import { soundEngine } from "@/lib/sound";
import { arrangeTilesDeterministically } from "./exercise-tiles";
import { hashSeed, seededShuffle } from "@/lib/prng";
import type { ExerciseDiagnosis } from "@/lib/types";
import type { ExerciseWidgetProps } from "./exercise-widget-props";
import type { ClassicExerciseController } from "./classic-exercise-types";

/**
 * Extract the quoted target-language word from a reverse_cognate prompt
 * (e.g. "What English word is the twin of 'Donnerstag'?" -> "Donnerstag")
 * so audio playback pronounces the foreign word rather than reading the English
 * answer in a foreign TTS voice.
 */
function extractPromptForeignWord(prompt: string, englishTarget: string): string | null {
  const matches = [...prompt.matchAll(/['‘’"“”]([^'‘’"“”]+)['‘’"“”]/g)].map((m) => m[1].trim());
  const candidates = matches.filter(
    (m) => m.length >= 2 && m.toLowerCase() !== englishTarget.trim().toLowerCase()
  );
  if (candidates.length > 0) {
    return candidates[candidates.length - 1];
  }
  return null;
}
export const useClassicExercise = ({
  exercise,
  onSuccess,
  onError,
  isRetry = false,
  onQueueRetry,
  onFlagGuessed,
}: ExerciseWidgetProps): ClassicExerciseController => {
  const [userInput, setUserInput] = useState("");
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
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

  // Matching pairs state
  const [selectedEnglish, setSelectedEnglish] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]); // list of matched pair IDs

  const inputRef = useRef<HTMLInputElement>(null);
  // a matching grid can take several slips; one item should only count as one miss
  const reportedErrorRef = useRef(false);
  const tolerance = useAppStore((s) => s.tolerance);
  const settings = useAppStore((s) => s.settings);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);
  const isReverseCognate = exercise.type === "reverse_cognate";

  const reverseCognateForeignWord = React.useMemo(() => {
    if (!isReverseCognate) return null;
    return extractPromptForeignWord(exercise.prompt, exercise.target_answer);
  }, [isReverseCognate, exercise.prompt, exercise.target_answer]);

  const displayGermanPairs = React.useMemo(() => {
    if (!exercise.matching_pairs) return [];
    const pairs = [...exercise.matching_pairs];
    if (pairs.length <= 1) return pairs;
    // Deterministic offset so rows don't line up trivially
    return [pairs[pairs.length - 1], ...pairs.slice(0, pairs.length - 1)];
  }, [exercise.matching_pairs]);

  // Anti-spoiler: strip trailing punctuation and deterministically shuffle tiles so
  // clicking 1, 2, 3... in order never trivially solves the sentence or word.
  const sanitizedWordBank = React.useMemo(() => {
    const cleaned = (exercise.word_bank || []).map((w) => w.replace(/[.,!?;:]+$/, ""));
    return arrangeTilesDeterministically(cleaned, `${exercise.id}#wb`, exercise.target_answer);
  }, [exercise.word_bank, exercise.id, exercise.target_answer]);

  const sanitizedTileOptions = React.useMemo(() => {
    const cleaned = (exercise.tile_options || []).map((t) => t.replace(/[.,!?;:]+$/, ""));
    return arrangeTilesDeterministically(cleaned, `${exercise.id}#tiles`, exercise.target_answer);
  }, [exercise.tile_options, exercise.id, exercise.target_answer]);

  const displayOptions = React.useMemo(() => {
    if (!exercise.options) return [];
    return seededShuffle(exercise.options, hashSeed(`${exercise.id}#opts`));
  }, [exercise.options, exercise.id]);

  const resetCurrentExercise = () => {
    reportedErrorRef.current = false;
    setUserInput("");
    setSelectedIndices([]);
    setSelectedEnglish(null);
    setMatchedPairs([]);
    setStatus("idle");
    setSheetVariant("exact");
    setVerifiedAttemptText("");
    setAlmostWarningNote(undefined);
    setFeedbackNote(null);
    setShowErrorSheet(false);
    setShowSuccessSheet(false);
    setFailedAttemptText("");
    setFailedDiagnosis(undefined);

    if (exercise.type === "derive" || exercise.type === "reverse_cognate") {
      setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 50);
    }
  };

  useEffect(() => {
    resetCurrentExercise();
  }, [exercise.id]);


  const handleInputChange = (val: string) => {
    if (val.length > userInput.length) {
      if (settings.stopOnError === "letter") {
        const nextCharIndex = userInput.length;
        const expectedTarget = exercise.target_answer;
        const valChar = val[nextCharIndex]?.toLowerCase();
        const targetChar = expectedTarget[nextCharIndex]?.toLowerCase();
        const normalizeChar = (c: string | undefined) =>
          (c ?? "")
            .replace(/[äáàâ]/g, "a")
            .replace(/[öóô]/g, "o")
            .replace(/[üúùû]/g, "u")
            .replace(/[éèêë]/g, "e")
            .replace(/[íîï]/g, "i")
            .replace(/ñ/g, "n")
            .replace(/ç/g, "c")
            .replace(/ß/g, "s");
        const isMatch =
          valChar === targetChar ||
          (settings.lazyMode && valChar !== undefined && normalizeChar(valChar) === normalizeChar(targetChar));
        if (nextCharIndex < expectedTarget.length && !isMatch) {
          void soundEngine.playError(settings.playSoundOnError, settings.soundVolume);
          return;
        }
      }
      void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    } else if (val.length < userInput.length) {
      void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    }
    setUserInput(val);
    if (status !== "idle") setStatus("idle");
    setFeedbackNote(null);
  };

  const handleVerify = () => {
    inputRef.current?.blur();
    if (exercise.type === "matching_pairs") return;
    const readings = classicAnswerReadings(
      exercise.type, exercise.target_answer, userInput, selectedIndices, sanitizedTileOptions, sanitizedWordBank,
    );
    let answerToCheck = readings[0];
    const expected = exercise.target_answer.trim();

    // EMPTY INPUT GUARD: Don't fail the user if nothing has been entered!
    if (!answerToCheck) {
      setFeedbackNote("Please enter or select an answer before verifying.");
      return;
    }

    // Three-tier evaluation: Spot On (Green), Almost Right (Yellow), Obviously Wrong (Red)
    const evalOptions = {
      umlautTolerance: Boolean(settings.lazyMode ?? tolerance.umlautTolerance),
      capitalizationTolerance: Boolean(settings.capitalizationTolerance ?? tolerance.capitalizationTolerance),
      languageId: isReverseCognate ? "en" : activeLanguageId,
    };
    const graded = gradeExerciseAttempt(exercise, readings, evalOptions, isRetry);
    const evaluation = graded.result;
    answerToCheck = graded.answer;

    if (evaluation.accuracy === "exact") {
      setStatus("correct");
      setFeedbackNote("Spot On! Perfect.");
      setSheetVariant("exact");
      setVerifiedAttemptText(answerToCheck);
      setAlmostWarningNote(undefined);
      setShowSuccessSheet(true);
      return;
    }

    if (evaluation.accuracy === "almost") {
      setStatus("almost");
      setFeedbackNote(evaluation.warningNote || `Almost right! Note standard spelling: "${expected}"`);
      setSheetVariant("almost");
      setVerifiedAttemptText(answerToCheck);
      setAlmostWarningNote(evaluation.warningNote);
      setShowSuccessSheet(true);

      if (graded.queueRetry) onQueueRetry?.();
      return;
    }

    // Otherwise standard error (obviously wrong)
    setStatus("incorrect");
    void soundEngine.playError(settings.playSoundOnError, settings.soundVolume);
    onError(graded.errorType);
    onQueueRetry?.();
    setFailedAttemptText(answerToCheck);
    setFailedDiagnosis(graded.diagnosis);
    setShowErrorSheet(true);
  };

  const handleShiftOptionSelect = (option: string) => {
    void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    const graded = gradeExerciseAttempt(exercise, [option], { languageId: activeLanguageId }, isRetry);
    if (graded.result.accuracy === "exact") {
      setStatus("correct");
      setFeedbackNote("Spot On! Perfect.");
      setSheetVariant("exact");
      setVerifiedAttemptText(option);
      setAlmostWarningNote(undefined);
      setShowSuccessSheet(true);
    } else {
      setStatus("incorrect");
      void soundEngine.playError(settings.playSoundOnError, settings.soundVolume);
      onError("spelling");
      onQueueRetry?.();
      setFailedAttemptText(option);
      setFailedDiagnosis(graded.diagnosis);
      setShowErrorSheet(true);
    }
  };

  const pickTileIndex = (idx: number) => {
    if (status !== "idle" && status !== "incorrect") return;
    if (status === "incorrect") setStatus("idle");
    if (selectedIndices.includes(idx)) return;
    void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    setFeedbackNote(null);
    setSelectedIndices((prev) => [...prev, idx]);
  };

  const unpickTilePosition = (rackPosition: number) => {
    if (status !== "idle" && status !== "incorrect") return;
    if (status === "incorrect") setStatus("idle");
    void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    setFeedbackNote(null);
    setSelectedIndices((prev) => prev.filter((_, i) => i !== rackPosition));
  };

  // Matching pair selection
  const handleSelectEnglish = (en: string) => {
    if (status !== "idle" && status !== "incorrect") return;
    if (status === "incorrect") setStatus("idle");
    void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    setSelectedEnglish(en);
  };

  const handleSelectGerman = (de: string, pairId: string, pairEn: string) => {
    if (status !== "idle" && status !== "incorrect") return;
    if (status === "incorrect") setStatus("idle");
    if (!selectedEnglish) {
      setFeedbackNote("Select an English word on the left first.");
      return;
    }

    if (selectedEnglish === pairEn) {
      void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
      const updated = [...matchedPairs, pairId];
      setMatchedPairs(updated);
      setSelectedEnglish(null);
      setFeedbackNote(null);

      if (exercise.matching_pairs && updated.length === exercise.matching_pairs.length) {
        setStatus("correct");
        setFeedbackNote("All pairs matched perfectly!");
        setShowSuccessSheet(true);
      }
    } else {
      void soundEngine.playError(settings.playSoundOnError, settings.soundVolume);
      setFeedbackNote(`"${selectedEnglish}" does not match "${de}". Try again!`);
      setSelectedEnglish(null);
      // Count every reinforcement miss so guided help remains reachable.
      if (isRetry || !reportedErrorRef.current) {
        reportedErrorRef.current = true;
        onError("spelling");
        onQueueRetry?.();
      }
    }
  };

  const controller: ClassicExerciseController = {
    exercise,
    onSuccess,
    onFlagGuessed,
    isRetry,
    userInput,
    setUserInput,
    selectedIndices,
    setSelectedIndices,
    status,
    setStatus,
    sheetVariant,
    verifiedAttemptText,
    almostWarningNote,
    feedbackNote,
    setFeedbackNote,
    showErrorSheet,
    setShowErrorSheet,
    showSuccessSheet,
    setShowSuccessSheet,
    failedAttemptText,
    failedDiagnosis,
    isCapsLock,
    setIsCapsLock,
    isInputFocused,
    setIsInputFocused,
    selectedEnglish,
    matchedPairs,
    inputRef,
    settings,
    language,
    isReverseCognate,
    reverseCognateForeignWord,
    displayGermanPairs,
    sanitizedWordBank,
    sanitizedTileOptions,
    displayOptions,
    resetCurrentExercise,
    handleInputChange,
    handleVerify,
    handleShiftOptionSelect,
    pickTileIndex,
    unpickTilePosition,
    handleSelectEnglish,
    handleSelectGerman
  };
  useClassicKeyboard(controller, () => setSelectedEnglish(null));
  return controller;
};

