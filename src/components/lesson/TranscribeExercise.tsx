"use client";

// TM-1 production drill: the learner gets the thought (idea) and a lexicon
// (word_bank), and must produce the target sentence themselves — choose the elements,
// decide the order, type the sentence. The word bank is vocabulary, not a jigsaw:
// tapping a chip inserts the word into a free-text input, and the learner can type
// inflections the bank doesn't carry. First attempt gets no cues; the cue ladder
// (scaled prompts) reveals on request or on a failed attempt, and using it forfeits
// the purple star — cues are help, and help is honest (guidebook §4.2, Turkish
// analysis: let the learner come in "at the moment their memory is jogged").

import React, { useState, useEffect, useRef } from "react";
import { Check, AlertCircle, Sparkles, Lightbulb, Quote } from "lucide-react";
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

const tokensOf = (s: string) =>
  s
    .toLowerCase()
    .replace(/[.,!?;:]+/g, " ")
    .split(/\s+/)
    .filter(Boolean);

export const TranscribeExercise: React.FC<TranscribeExerciseProps> = ({
  exercise,
  isRetry = false,
  onSuccess,
  onError,
  onQueueRetry,
  onPurpleForfeit,
  onFlagGuessed,
}) => {
  const [userInput, setUserInput] = useState("");
  const [showIdeaParts, setShowIdeaParts] = useState(false);
  const [cuesRevealed, setCuesRevealed] = useState(0);
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

  const cues = exercise.cues ?? [];
  const wordBank = React.useMemo(() => {
    const cleaned = (exercise.word_bank || []).map((w) => w.replace(/[.,!?;:]+$/, ""));
    return arrangeTilesDeterministically(cleaned, `${exercise.id}#wb`, exercise.target_answer);
  }, [exercise.word_bank, exercise.id, exercise.target_answer]);
  const target = exercise.target_answer.trim();

  const resetCurrentExercise = () => {
    setUserInput("");
    setShowIdeaParts(false);
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
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  useEffect(() => {
    resetCurrentExercise();
  }, [exercise.id]);

  const insertWord = (word: string) => {
    if (status === "correct" || status === "almost") return;
    void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    setFeedbackNote(null);
    setUserInput((prev) => {
      if (!prev) return word;
      return prev.endsWith(" ") ? prev + word : `${prev} ${word}`;
    });
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const revealNextCue = () => {
    if (cuesRevealed >= cues.length) return;
    onPurpleForfeit?.();
    setCuesRevealed((n) => n + 1);
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
    const distractorUsed = attemptTokens.some(
      (t) => bankSet.has(t) && !targetSet.has(t)
    );
    if (distractorUsed) {
      return diagTable.wrong_word;
    }
    return diagnoseAttempt(target, attempt, exercise.shift_hint) ?? undefined;
  };

  const handleVerify = () => {
    inputRef.current?.blur();
    const answerToCheck = userInput.trim();

    if (!answerToCheck) {
      setFeedbackNote("Please enter or select an answer before verifying.");
      return;
    }

    const evalOptions = {
      umlautTolerance: Boolean(settings.lazyMode ?? tolerance.umlautTolerance),
      capitalizationTolerance: Boolean(settings.capitalizationTolerance ?? tolerance.capitalizationTolerance),
    };
    const evaluation = evaluateAnswerAccuracy(answerToCheck, target, evalOptions);

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
      setFeedbackNote(evaluation.warningNote || `Almost right! Note standard spelling: "${target}"`);
      setSheetVariant("almost");
      setVerifiedAttemptText(answerToCheck);
      setAlmostWarningNote(evaluation.warningNote);
      setShowSuccessSheet(true);
      if ((evaluation.reason === "typo" || evaluation.reason === "sharp-s") || (evaluation.reason === "umlaut" && !evalOptions.umlautTolerance)) {
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
    // a failed attempt brings the next rung of the ladder (never retroactively graded)
    if (cuesRevealed < cues.length) setCuesRevealed((n) => n + 1);
    setShowErrorSheet(true);
  };

  // 1–9 inserts bank words while the learner is not typing; Enter verifies (matches
  // the morpheme_tiles / syntax_builder key plumbing).
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.getModifierState) {
        setIsCapsLock(e.getModifierState("CapsLock"));
      }
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

  const affirmation = affirmationFor(exercise.affirmation, exercise.shift_hint);

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
            <ol className="space-y-1.5">
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
          aria-label={exercise.prompt || `Build the ${language.name} sentence`}
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
          placeholder={`build the ${language.name.toLowerCase()} sentence...`}
          className="w-full px-4 py-3 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/30 text-[var(--main-color)] text-lg font-bold font-mono outline-none focus:border-[var(--main-color)] transition placeholder:text-[var(--sub-color)]/40"
        />

        {(settings.showCharBar === "always" || (settings.showCharBar === "on_focus" && isInputFocused)) && (
          <GermanCharBar onInsert={(char) => setUserInput((prev) => prev + char)} />
        )}

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
      <div className="pt-3 border-t border-[var(--sub-color)]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
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

        {status !== "correct" && status !== "almost" && (
          <button
            type="button"
            onClick={handleVerify}
            className="px-5 py-2 rounded-lg bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-mono font-bold text-xs transition cursor-pointer ml-auto flex items-center gap-1.5"
          >
            <span>verify</span>
            {settings.showKeyTips && <span className="keycap text-[10px]">enter</span>}
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
              setTimeout(() => inputRef.current?.focus(), 50);
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
