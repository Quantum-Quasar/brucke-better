"use client";

// ponytail: comprehensive bite-sized exercise widget with tile assembly, matching cards, empty input protection, and error sheet

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Check, AlertCircle, Sparkles } from "lucide-react";
import { GermanCharBar } from "@/components/common/GermanCharBar";
import { ErrorFeedbackSheet } from "./ErrorFeedbackSheet";
import { SuccessFeedbackSheet } from "./SuccessFeedbackSheet";
import { evaluateAnswerAccuracy, evaluateBestOf } from "@/lib/letter-diff";
import { matchingPairForKey } from "@/lib/matching";
import { diagnoseAttempt, affirmationFor } from "@/lib/shift-diagnosis";
import { useAppStore } from "@/lib/store";
import { getLanguageDefinition } from "@/data/languages";
import { soundEngine } from "@/lib/sound";
import { arrangeTilesDeterministically, hashSeed, seededShuffle } from "./exercise-tiles";
import type { ExerciseDiagnosis, ExerciseItem } from "@/lib/types";

// Each exercise type is its own chunk: a lesson only downloads the widgets it
// can actually meet, instead of every widget up front.
const ExerciseLoading = () => (
  <div className="py-10 text-center font-mono text-xs text-[var(--sub-color)]" role="status">
    loading exercise…
  </div>
);

const TranscribeExercise = dynamic(
  () => import("./TranscribeExercise").then((module) => module.TranscribeExercise),
  { loading: ExerciseLoading }
);
const LiteralGloss = dynamic(
  () => import("./LiteralGloss").then((module) => module.LiteralGloss),
  { loading: ExerciseLoading }
);
const DictationExercise = dynamic(
  () => import("./DictationExercise").then((module) => module.DictationExercise),
  { loading: ExerciseLoading }
);
const FamilyMatrixExercise = dynamic(
  () => import("./FamilyMatrixExercise").then((module) => module.FamilyMatrixExercise),
  { loading: ExerciseLoading }
);
const VariantEnglishExercise = dynamic(
  () => import("./VariantEnglishExercise").then((module) => module.VariantEnglishExercise),
  { loading: ExerciseLoading }
);
const PronounCompressionExercise = dynamic(
  () => import("./PronounCompressionExercise").then((module) => module.PronounCompressionExercise),
  { loading: ExerciseLoading }
);
const SpokenTurnReplyExercise = dynamic(
  () => import("./SpokenTurnReplyExercise").then((module) => module.SpokenTurnReplyExercise),
  { loading: ExerciseLoading }
);

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

interface ExerciseWidgetProps {
  exercise: ExerciseItem;
  onSuccess: () => void;
  onError: (errorType: "spelling" | "umlaut" | "capitalization") => void;
  isRetry?: boolean;
  onQueueRetry?: () => void;
  /** TM-6: the learner got it right but did not trust it (guidebook §1.8/§1.9) */
  onFlagGuessed?: () => void;
  /** TM-1: using a transcribe cue ladder forfeits the purple star (help is honest) */
  onPurpleForfeit?: () => void;
}

export const ExerciseWidget: React.FC<ExerciseWidgetProps> = ({
  exercise,
  onSuccess,
  onError,
  isRetry = false,
  onQueueRetry,
  onPurpleForfeit,
  onFlagGuessed,
}) => {
  // TM-1/TM-2: the production-drill types are self-contained widgets with their
  // own cue ladders / option flow; they reuse the same feedback sheets.
  if (exercise.type === "transcribe") {
    return (
      <TranscribeExercise
        exercise={exercise}
        isRetry={isRetry}
        onSuccess={onSuccess}
        onError={onError}
        onQueueRetry={onQueueRetry}
        onPurpleForfeit={onPurpleForfeit}
        onFlagGuessed={onFlagGuessed}
      />
    );
  }
  if (exercise.type === "literal_gloss") {
    return (
      <LiteralGloss
        exercise={exercise}
        isRetry={isRetry}
        onSuccess={onSuccess}
        onError={onError}
        onQueueRetry={onQueueRetry}
        onFlagGuessed={onFlagGuessed}
      />
    );
  }
  if (exercise.type === "dictation") {
    return (
      <DictationExercise
        exercise={exercise}
        isRetry={isRetry}
        onSuccess={onSuccess}
        onError={onError}
        onQueueRetry={onQueueRetry}
        onPurpleForfeit={onPurpleForfeit}
        onFlagGuessed={onFlagGuessed}
      />
    );
  }
  if (exercise.type === "family_matrix") {
    return (
      <FamilyMatrixExercise
        exercise={exercise}
        isRetry={isRetry}
        onSuccess={onSuccess}
        onError={onError}
        onQueueRetry={onQueueRetry}
        onFlagGuessed={onFlagGuessed}
      />
    );
  }
  if (exercise.type === "variant_english") {
    return (
      <VariantEnglishExercise
        exercise={exercise}
        isRetry={isRetry}
        onSuccess={onSuccess}
        onError={onError}
        onQueueRetry={onQueueRetry}
        onFlagGuessed={onFlagGuessed}
      />
    );
  }
  if (exercise.type === "pronoun_compression") {
    return (
      <PronounCompressionExercise
        exercise={exercise}
        isRetry={isRetry}
        onSuccess={onSuccess}
        onError={onError}
        onQueueRetry={onQueueRetry}
        onPurpleForfeit={onPurpleForfeit}
        onFlagGuessed={onFlagGuessed}
      />
    );
  }
  if (exercise.type === "spoken_turn_reply") {
    return (
      <SpokenTurnReplyExercise
        exercise={exercise}
        isRetry={isRetry}
        onSuccess={onSuccess}
        onError={onError}
        onQueueRetry={onQueueRetry}
        onPurpleForfeit={onPurpleForfeit}
        onFlagGuessed={onFlagGuessed}
      />
    );
  }

  return (
    <LegacyExerciseWidget
      exercise={exercise}
      onSuccess={onSuccess}
      onError={onError}
      isRetry={isRetry}
      onQueueRetry={onQueueRetry}
      onFlagGuessed={onFlagGuessed}
    />
  );
};

const LegacyExerciseWidget: React.FC<Omit<ExerciseWidgetProps, never>> = ({
  exercise,
  onSuccess,
  onError,
  isRetry = false,
  onQueueRetry,
  onFlagGuessed,
}) => {
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

  // Keyboard shortcut listener for all exercise types:
  // - Enter: verify current answer
  // - Shift select: 1-4
  // - Morpheme tiles: 1-9 to pick, Backspace to unpick
  // - Syntax builder: 1-9 to pick, Backspace to unpick
  // - Matching pairs: 1-N for English, then 1-N for German, Escape to deselect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.getModifierState) {
        setIsCapsLock(e.getModifierState("CapsLock"));
      }

      // Quick restart hotkey (esc)
      if (settings.quickRestart === "esc" && e.key === "Escape") {
        e.preventDefault();
        resetCurrentExercise();
        return;
      }

      // Don't intercept when feedback modal sheets are up (they handle their own Enter/Space)
      if (showErrorSheet || showSuccessSheet) return;

      const isInput = document.activeElement === inputRef.current;

      // 1. Enter key: verify
      if (e.key === "Enter") {
        const active = document.activeElement;
        // a focused option/tile/anchor owns its own Enter (native activation) —
        // otherwise shift_select and matching_pairs are unanswerable by keyboard
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

      // If user is actively typing in the derivation text input
      if (isInput) {
        // Confidence mode: blocks Backspace key
        if (settings.confidenceMode === "on" && e.key === "Backspace") {
          e.preventDefault();
          return;
        }
        return;
      }

      // 2. Multiple choice shift select (1-9)
      if (exercise.type === "shift_select" && displayOptions.length > 0 && status === "idle") {
        const num = parseInt(e.key, 10);
        if (!isNaN(num) && num >= 1 && num <= displayOptions.length) {
          e.preventDefault();
          handleShiftOptionSelect(displayOptions[num - 1]);
          return;
        }
      }

      // 3. Morpheme tiles (1-9 to pick, Backspace to undo)
      if (exercise.type === "morpheme_tiles" && sanitizedTileOptions.length > 0 && status === "idle") {
        if (e.key === "Backspace") {
          e.preventDefault();
          if (selectedIndices.length > 0) {
            unpickTilePosition(selectedIndices.length - 1);
          }
          return;
        }
        const num = parseInt(e.key, 10);
        if (!isNaN(num) && num >= 1 && num <= sanitizedTileOptions.length) {
          e.preventDefault();
          const targetIdx = num - 1;
          if (!selectedIndices.includes(targetIdx)) {
            pickTileIndex(targetIdx);
          }
          return;
        }
      }

      // 4. Satzklammer Syntax builder (1-9 to pick, Backspace to undo)
      if (exercise.type === "syntax_builder" && sanitizedWordBank.length > 0 && status === "idle") {
        if (e.key === "Backspace") {
          e.preventDefault();
          if (selectedIndices.length > 0) {
            unpickTilePosition(selectedIndices.length - 1);
          }
          return;
        }
        const num = parseInt(e.key, 10);
        if (!isNaN(num) && num >= 1 && num <= sanitizedWordBank.length) {
          e.preventDefault();
          const targetIdx = num - 1;
          if (!selectedIndices.includes(targetIdx)) {
            pickTileIndex(targetIdx);
          }
          return;
        }
      }

      // 5. Cognate matching cards:
      // Keys are fixed to card positions for the whole exercise, so matching
      // pairs never renumber the cards that are left.
      // If no English pair selected yet: 1-N selects an English card
      // If English pair selected: 1-N selects a German card; Escape cancels
      if (exercise.type === "matching_pairs" && exercise.matching_pairs && status === "idle") {
        if (e.key === "Escape") {
          e.preventDefault();
          setSelectedEnglish(null);
          return;
        }
        const num = parseInt(e.key, 10);
        if (!isNaN(num) && num >= 1) {
          if (!selectedEnglish) {
            const chosen = matchingPairForKey(exercise.matching_pairs, matchedPairs, num);
            if (chosen) {
              e.preventDefault();
              setSelectedEnglish(chosen.english);
              return;
            }
          } else {
            const chosen = matchingPairForKey(displayGermanPairs, matchedPairs, num);
            if (chosen) {
              e.preventDefault();
              handleSelectGerman(chosen.german, chosen.id, chosen.english);
              return;
            }
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    userInput,
    selectedIndices,
    matchedPairs,
    selectedEnglish,
    displayGermanPairs,
    displayOptions,
    sanitizedTileOptions,
    sanitizedWordBank,
    status,
    showErrorSheet,
    showSuccessSheet,
    exercise,
    settings,
  ]);

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
    let answerToCheck = userInput.trim();
    // Other equally valid readings of the same tile selection (see below)
    let alternateReadings: string[] = [];

    // 1. Morpheme tiles or Syntax builder
    const expected = exercise.target_answer.trim();
    if (exercise.type === "morpheme_tiles") {
      const options = sanitizedTileOptions;
      const selectedTiles = selectedIndices.map((i) => options[i] || "");
      const cleanTiles = selectedTiles.map((t) => t.replace(/^-/, ""));
      const joinedDirect = cleanTiles.join("").trim();
      const joinedSpace = selectedTiles.join(" ").trim();
      answerToCheck = expected.includes(" ") ? joinedSpace : joinedDirect;
      if (expected.includes(" ") && cleanTiles.length > 2) {
        // "das" + "Wass" + "er": a leading article/pronoun tile followed by word
        // pieces that glue together into one word
        alternateReadings = [`${cleanTiles[0]} ${cleanTiles.slice(1).join("")}`.trim()];
      }
    } else if (exercise.type === "syntax_builder") {
      const options = sanitizedWordBank;
      const selectedTiles = selectedIndices.map((i) => options[i] || "");
      answerToCheck = selectedTiles.join(" ").trim();
    } else if (exercise.type === "matching_pairs") {
      // Handled interactively on match
      return;
    }

    // EMPTY INPUT GUARD: Don't fail the user if nothing has been entered!
    if (!answerToCheck) {
      setFeedbackNote("Please enter or select an answer before verifying.");
      return;
    }

    // Three-tier evaluation: Spot On (Green), Almost Right (Yellow), Obviously Wrong (Red)
    const evalOptions = {
      umlautTolerance: Boolean(settings.lazyMode ?? tolerance.umlautTolerance),
      capitalizationTolerance: Boolean(settings.capitalizationTolerance ?? tolerance.capitalizationTolerance),
      languageId: isReverseCognate ? "en" : undefined,
    };
    const graded = evaluateBestOf([answerToCheck, ...alternateReadings], expected, evalOptions);
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

      // If the spelling was wrong (typo or missing umlaut without tolerance), queue for repeat at the end
      if ((evaluation.reason === "typo" || evaluation.reason === "sharp-s") || (evaluation.reason === "umlaut" && !evalOptions.umlautTolerance)) {
        onQueueRetry?.();
      }
      return;
    }

    // Otherwise standard error (obviously wrong)
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
    // TM-3: authored diagnosis wins; computed diagnosis names the violated shift law
    // (only for target-language derivation, never for English reverse_cognate answers)
    setFailedDiagnosis(
      exercise.diagnosis ??
        (exercise.type === "derive"
          ? diagnoseAttempt(expected, answerToCheck, exercise.shift_hint) ?? undefined
          : undefined)
    );
    setShowErrorSheet(true);
  };

  const handleShiftOptionSelect = (option: string) => {
    void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    const evalOptions = {
      umlautTolerance: Boolean(settings.lazyMode ?? tolerance.umlautTolerance),
      capitalizationTolerance: Boolean(settings.capitalizationTolerance ?? tolerance.capitalizationTolerance),
    };
    const evaluation = evaluateAnswerAccuracy(option, exercise.target_answer, evalOptions);
    if (evaluation.accuracy === "exact") {
      setStatus("correct");
      setFeedbackNote("Spot On! Perfect.");
      setSheetVariant("exact");
      setVerifiedAttemptText(option);
      setAlmostWarningNote(undefined);
      setShowSuccessSheet(true);
    } else if (evaluation.accuracy === "almost") {
      setStatus("almost");
      setFeedbackNote(evaluation.warningNote || "Almost right!");
      setSheetVariant("almost");
      setVerifiedAttemptText(option);
      setAlmostWarningNote(evaluation.warningNote);
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
      setFailedDiagnosis(exercise.diagnosis);
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
      // one item, one miss: a 6-pair grid must not burn the mercy prompt or the
      // purple star on a single slip — report only the first mismatch
      if (!reportedErrorRef.current) {
        reportedErrorRef.current = true;
        onError("spelling");
        onQueueRetry?.();
      }
    }
  };

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
        <div className="space-y-4">
          {/* Target Assembly Slot */}
          <div className="min-h-[58px] p-3 rounded-lg bg-[var(--bg-color)] border border-dashed border-[var(--sub-color)]/30 flex flex-wrap gap-2 items-center justify-center">
            {selectedIndices.length === 0 ? (
              <span className="text-xs text-[var(--sub-color)]/60 italic">
                tap tiles or press 1–{sanitizedTileOptions.length} to assemble word...
              </span>
            ) : (
              selectedIndices.map((tileIdx, pos) => (
                <button
                  key={`${sanitizedTileOptions[tileIdx]}-${tileIdx}-${pos}`}
                  onClick={() => unpickTilePosition(pos)}
                  className="px-3 py-1.5 rounded bg-[var(--main-color)]/15 text-[var(--main-color)] border border-[var(--main-color)]/40 text-sm font-bold hover:bg-[var(--error-color)]/20 hover:text-[var(--error-color)] hover:border-[var(--error-color)]/40 transition flex items-center gap-1.5 cursor-pointer"
                  title="Click or press Backspace to unpick"
                >
                  <span lang={language.id}>{sanitizedTileOptions[tileIdx]}</span>
                  <span className="text-[10px] opacity-60 font-normal">×</span>
                </button>
              ))
            )}
          </div>

          {/* Tile Options Bank */}
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            {sanitizedTileOptions.map((tile, i) => {
              const isUsed = selectedIndices.includes(i);
              return (
                <button
                  key={`${tile}-${i}`}
                  type="button"
                  onClick={() => pickTileIndex(i)}
                  disabled={isUsed || status === "correct" || status === "almost"}
                  className={`px-3.5 py-2 rounded-lg border text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                    isUsed
                      ? "opacity-25 border-[var(--sub-color)]/10 bg-[var(--bg-color)] text-[var(--sub-color)] cursor-not-allowed"
                      : "border-[var(--sub-color)]/20 bg-[var(--bg-color)] hover:border-[var(--main-color)] text-[var(--text-color)] shadow-sm"
                  }`}
                >
                  {settings.showKeyTips && (
                    <span className="keycap text-[10px]">
                      {i + 1}
                    </span>
                  )}
                  <span lang={language.id}>{tile}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. Cognate Matching Cards */}
      {exercise.type === "matching_pairs" && exercise.matching_pairs && (
        <div className="grid grid-cols-2 gap-4 pt-1">
          {/* Left Column: English Cognates */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[var(--sub-color)] uppercase tracking-wider block">
                english cognates
              </span>
              {!selectedEnglish && (
                <span className="text-[10px] text-[var(--sub-color)]">
                  1–{exercise.matching_pairs.length}
                </span>
              )}
            </div>
            {exercise.matching_pairs.map((pair, index) => {
              const isMatched = matchedPairs.includes(pair.id);
              const isSelected = selectedEnglish === pair.english;
              return (
                <button
                  key={`en_${pair.id}`}
                  type="button"
                  onClick={() => handleSelectEnglish(pair.english)}
                  disabled={isMatched}
                  aria-pressed={isSelected}
                  className={`w-full p-3 rounded-lg border text-xs font-mono transition text-left flex items-center justify-between cursor-pointer ${
                    isMatched
                      ? "bg-[var(--main-color)]/10 border-[var(--main-color)]/30 text-[var(--main-color)] opacity-60"
                      : isSelected
                      ? "bg-[var(--main-color)]/20 border-[var(--main-color)] text-[var(--main-color)] ring-1 ring-[var(--main-color)]/40 font-bold"
                      : "bg-[var(--bg-color)] border-[var(--sub-color)]/20 hover:border-[var(--sub-color)]/50 text-[var(--text-color)]"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {settings.showKeyTips && !isMatched && (
                      <span className="keycap text-[10px]">
                        {index + 1}
                      </span>
                    )}
                    <span>{pair.english}</span>
                  </span>
                  {isMatched && <Check className="w-4 h-4 text-[var(--main-color)]" />}
                </button>
              );
            })}
          </div>

          {/* Right Column: Shifted Target Words */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-[var(--sub-color)] uppercase tracking-wider block">
                {language.name.toLowerCase()} shifted
              </span>
              {selectedEnglish && (
                <span className="text-[10px] text-[var(--main-color)]">
                  1–{displayGermanPairs.length} · esc
                </span>
              )}
            </div>
            {displayGermanPairs.map((pair, index) => {
              const isMatched = matchedPairs.includes(pair.id);
              const isSelected = false;
              return (
                <button
                  key={`de_${pair.id}`}
                  type="button"
                  onClick={() => handleSelectGerman(pair.german, pair.id, pair.english)}
                  disabled={isMatched}
                  aria-pressed={isSelected}
                  className={`w-full p-3 rounded-lg border text-xs font-mono transition text-left flex items-center justify-between cursor-pointer ${
                    isMatched
                      ? "bg-[var(--main-color)]/10 border-[var(--main-color)]/30 text-[var(--main-color)] opacity-60"
                      : "bg-[var(--bg-color)] border-[var(--sub-color)]/20 hover:border-[var(--main-color)] text-[var(--main-color)] font-bold"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {settings.showKeyTips && selectedEnglish && !isMatched && (
                      <span className="keycap text-[10px]">
                        {index + 1}
                      </span>
                    )}
                    <span lang={language.id}>{pair.german}</span>
                  </span>
                  {isMatched && <Check className="w-4 h-4 text-[var(--main-color)]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Typing Derivation Input */}
      {(exercise.type === "derive" || exercise.type === "reverse_cognate") && (
        <div className="space-y-3">
          {/* Caps Lock warning indicator */}
          {settings.capsLockWarning && isCapsLock && (
            <div className="flex items-center gap-1.5 text-xs text-[var(--error-color)] font-mono animate-pulse">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>caps lock is on</span>
            </div>
          )}

          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              aria-label={
                exercise.prompt ||
                (isReverseCognate ? "Enter English cognate" : `Enter ${language.name} translation`)
              }
              lang={isReverseCognate ? "en" : language.id}
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={(e) => {
                if (e.getModifierState) {
                  setIsCapsLock(e.getModifierState("CapsLock"));
                }
                if (settings.confidenceMode === "on" && e.key === "Backspace") {
                  e.preventDefault();
                  return;
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
              placeholder={
                isReverseCognate
                  ? exercise.english_hint
                    ? `type english cognate (${exercise.english_hint})`
                    : "type english cognate..."
                  : exercise.english_hint
                  ? `type ${language.name.toLowerCase()} (e.g. ${exercise.english_hint})`
                  : "type answer..."
              }
              className="w-full px-4 py-3 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/30 text-[var(--main-color)] text-lg font-bold font-mono outline-none focus:border-[var(--main-color)] transition placeholder:text-[var(--sub-color)]/40"
            />
          </div>

          {!isReverseCognate &&
            (settings.showCharBar === "always" || (settings.showCharBar === "on_focus" && isInputFocused)) && (
              <GermanCharBar onInsert={(char) => handleInputChange(userInput + char)} />
            )}
        </div>
      )}

      {/* 4. Multiple Choice Shift Select */}
      {exercise.type === "shift_select" && displayOptions.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {displayOptions.map((opt, i) => (
            <button
              key={opt}
              type="button"
              onClick={() => handleShiftOptionSelect(opt)}
              disabled={status !== "idle"}
              className="flex items-center justify-between p-3 rounded-lg bg-[var(--bg-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/20 text-xs font-mono text-[var(--text-color)] transition text-left group cursor-pointer"
            >
              <span className="group-hover:text-[var(--main-color)] font-bold" lang={language.id}>{opt}</span>
              {settings.showKeyTips && (
                <span className="keycap text-[10px]">
                  {i + 1}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* 5. Satzklammer Syntax Builder Tiles */}
      {exercise.type === "syntax_builder" && sanitizedWordBank.length > 0 && (
        <div className="space-y-3">
          <div className="min-h-[58px] p-3 rounded-lg bg-[var(--bg-color)] border border-dashed border-[var(--sub-color)]/30 flex flex-wrap gap-2 items-center">
            {selectedIndices.length === 0 ? (
              <span className="text-xs text-[var(--sub-color)]/60 italic pl-2">
                tap tiles or press 1–{sanitizedWordBank.length} in sentence sequence...
              </span>
            ) : (
              selectedIndices.map((tileIdx, pos) => (
                <button
                  key={`${sanitizedWordBank[tileIdx]}-${tileIdx}-${pos}`}
                  onClick={() => unpickTilePosition(pos)}
                  className="px-3 py-1.5 rounded bg-[var(--main-color)]/15 text-[var(--main-color)] border border-[var(--main-color)]/40 text-xs font-bold hover:bg-[var(--error-color)]/20 hover:text-[var(--error-color)] hover:border-[var(--error-color)]/40 transition flex items-center gap-1.5 cursor-pointer"
                  title="Click or press Backspace to unpick"
                >
                  <span lang={language.id}>{sanitizedWordBank[tileIdx]}</span>
                  <span className="text-[10px] opacity-60 font-normal">×</span>
                </button>
              ))
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {sanitizedWordBank.map((tile, i) => {
              const isUsed = selectedIndices.includes(i);
              return (
                <button
                  key={`${tile}-${i}`}
                  onClick={() => pickTileIndex(i)}
                  disabled={isUsed || status === "correct" || status === "almost"}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-mono transition flex items-center gap-2 cursor-pointer ${
                    isUsed
                      ? "opacity-25 border-[var(--sub-color)]/10 bg-[var(--bg-color)] text-[var(--sub-color)] cursor-not-allowed"
                      : "border-[var(--sub-color)]/20 bg-[var(--bg-color)] hover:border-[var(--main-color)] text-[var(--text-color)]"
                  }`}
                >
                  {settings.showKeyTips && (
                    <span className="keycap text-[10px]">
                      {i + 1}
                    </span>
                  )}
                  <span lang={language.id}>{tile}</span>
                </button>
              );
            })}
          </div>
        </div>
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
};
