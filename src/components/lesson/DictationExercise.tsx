"use client";

// TM-6 (guidebook §4.2 + Part 3): the app's first exercise that begins in the ear
// instead of on the page. Every other surface hands the learner the German in
// writing and then asks for a decision; this one plays the sentence and asks the
// learner to write down what they heard — the pause button the guidebook keeps
// referring to, made into a graded exercise.
//
// Environment honesty: a learner in a library, on a train or in an open office
// cannot listen. "I can't listen now" silences *every* dictation exercise for 15
// minutes and degrades this one into an ordinary typed production exercise (text
// shown, audio still available if they want it). Never a penalty, never a blocker.

import React, { useState, useRef, useEffect } from "react";
import { Volume2, EarOff, Lightbulb, Quote, Sparkles, AlertCircle } from "lucide-react";
import { GermanCharBar } from "@/components/common/GermanCharBar";
import { VoiceStatusBanner } from "@/components/common/VoiceStatusBanner";
import { ErrorFeedbackSheet } from "./ErrorFeedbackSheet";
import { SuccessFeedbackSheet } from "./SuccessFeedbackSheet";
import { evaluateAnswerAccuracy } from "@/lib/letter-diff";
import { playTargetAudio } from "@/lib/audio";
import { getLanguageDefinition } from "@/data/languages";
import { useAppStore } from "@/lib/store";
import { soundEngine } from "@/lib/sound";
import { LISTENING_SKIP_MS, isListeningSkipped } from "@/lib/listening";
import { affirmationFor } from "@/lib/shift-diagnosis";
import type { ExerciseDiagnosis, ExerciseItem } from "@/lib/types";

interface DictationExerciseProps {
  exercise: ExerciseItem;
  isRetry?: boolean;
  onSuccess: () => void;
  onError: (errorType: "spelling" | "umlaut" | "capitalization") => void;
  onQueueRetry?: () => void;
  /** TM-6: the learner got it right but did not trust it (guidebook §1.8/§1.9) */
  onFlagGuessed?: () => void;
  /** using the cue ladder forfeits the purple star for the run (help is honest) */
  onPurpleForfeit?: () => void;
}

export const DictationExercise: React.FC<DictationExerciseProps> = ({
  exercise,
  isRetry = false,
  onSuccess,
  onError,
  onQueueRetry,
  onPurpleForfeit,
  onFlagGuessed,
}) => {
  const [userInput, setUserInput] = useState("");
  const [replaysUsed, setReplaysUsed] = useState(0);
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

  const inputRef = useRef<HTMLInputElement>(null);
  // one keypress must never verify twice (Enter fires the input handler, then the
  // window fallback, unless the first verify already advanced the card)
  const verifyingRef = useRef(false);
  const tolerance = useAppStore((s) => s.tolerance);
  const settings = useAppStore((s) => s.settings);
  const skipListeningFor = useAppStore((s) => s.skipListeningFor);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);

  const spoken = exercise.spoken ?? exercise.target_answer;
  const target = exercise.target_answer.trim();
  const replayBudget = exercise.replays ?? 2;
  const cues = exercise.cues ?? [];
  const listeningOff = isListeningSkipped(settings.listeningSkippedUntil);

  const play = () => {
    if (replaysUsed >= replayBudget) return;
    playTargetAudio(spoken);
    setReplaysUsed((n) => n + 1);
  };

  const resetCurrentExercise = () => {
    verifyingRef.current = false;
    setUserInput("");
    // the autoplay that opens the card is a hearing — count it against the budget
    // (when listening is skipped, no autoplay happens and the count stays 0)
    setReplaysUsed(
      isListeningSkipped(useAppStore.getState().settings.listeningSkippedUntil) ? 0 : 1
    );
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
    setTimeout(() => {
      if (!isListeningSkipped(useAppStore.getState().settings.listeningSkippedUntil)) {
        inputRef.current?.focus({ preventScroll: true });
      }
    }, 80);
  };

  useEffect(() => {
    resetCurrentExercise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise.id]);

  // Autoplay once when the card opens and listening is available — the ear leads.
  // `resetCurrentExercise` already counts that first hearing; the functional update
  // only matters if listening was toggled back on after the reset.
  useEffect(() => {
    if (listeningOff) return;
    const t = setTimeout(() => {
      playTargetAudio(spoken);
      setReplaysUsed((n) => (n < 1 ? 1 : n));
    }, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise.id, listeningOff]);

  const revealNextCue = () => {
    if (cuesRevealed >= cues.length) return;
    onPurpleForfeit?.();
    setCuesRevealed((n) => n + 1);
  };

  const diagnoseFailure = (attempt: string): ExerciseDiagnosis | undefined => {
    if (exercise.diagnosis) return exercise.diagnosis;
    const attemptTokens = attempt.toLowerCase().split(/\s+/).filter(Boolean);
    const targetTokens = target.toLowerCase().split(/\s+/).filter(Boolean);
    if (attemptTokens.length === targetTokens.length) {
      const a = [...attemptTokens].sort().join(" ");
      const b = [...targetTokens].sort().join(" ");
      if (a === b && attempt.trim() !== target) {
        return {
          slip: "the words are right, the order is not",
          cue:
            activeLanguageId === "de"
              ? "German puts the conjugated verb in position 2 and parks the infinitive at the end — listen for which word carries the ending."
              : activeLanguageId === "nl"
                ? "Dutch puts the finite verb second in main clauses and last in subordinate clauses — listen for which word carries the ending."
                : activeLanguageId === "fr"
                  ? "French keeps object pronouns before the verb and the conjugated verb next to the subject — listen for which word comes first."
                  : "Spanish often drops the subject pronoun and leans on the verb ending — listen for which word comes first.",
        };
      }
    }
    return undefined;
  };

  const handleVerify = () => {
    if (verifyingRef.current) return;
    inputRef.current?.blur();
    const answerToCheck = userInput.trim();
    if (!answerToCheck) {
      setFeedbackNote("Write down what you heard before checking.");
      return;
    }
    verifyingRef.current = true;

    const evalOptions = {
      umlautTolerance: Boolean(settings.lazyMode ?? tolerance.umlautTolerance),
      capitalizationTolerance: Boolean(settings.capitalizationTolerance ?? tolerance.capitalizationTolerance),
    };
    const evaluation = evaluateAnswerAccuracy(answerToCheck, target, evalOptions);

    if (evaluation.accuracy === "exact" || evaluation.accuracy === "almost") {
      setStatus(evaluation.accuracy === "exact" ? "correct" : "almost");
      setSheetVariant(evaluation.accuracy === "exact" ? "exact" : "almost");
      setVerifiedAttemptText(answerToCheck);
      setAlmostWarningNote(evaluation.warningNote);
      setFeedbackNote(
        evaluation.accuracy === "exact"
          ? "Spot On! Perfect."
          : evaluation.warningNote || `Almost right! Note standard spelling: "${target}"`
      );
      setShowSuccessSheet(true);
      if (evaluation.accuracy === "almost" && (evaluation.reason === "typo" || evaluation.reason === "sharp-s")) onQueueRetry?.();
      if (evaluation.accuracy === "almost" && evaluation.reason === "umlaut" && !evalOptions.umlautTolerance) {
        onQueueRetry?.();
      }
      // the parent advances from the success sheet's onContinue, so the sheet
      // (correct spelling + meaning) actually paints before the widget unmounts
      return;
    }

    setStatus("incorrect");
    setFailedAttemptText(answerToCheck);
    setFailedDiagnosis(diagnoseFailure(answerToCheck));
    void soundEngine.playError(settings.playSoundOnError, settings.soundVolume);
    onError(
      evaluation.reason === "umlaut" ? "umlaut" : evaluation.reason === "case" ? "capitalization" : "spelling"
    );
    onQueueRetry?.();
    if (cuesRevealed < cues.length) setCuesRevealed((n) => n + 1);
    setShowErrorSheet(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.getModifierState) setIsCapsLock(e.getModifierState("CapsLock"));
      if (settings.quickRestart === "esc" && e.key === "Escape") {
        e.preventDefault();
        resetCurrentExercise();
        return;
      }
      if (showErrorSheet || showSuccessSheet) return;
      if (e.key === "Enter") {
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
        const isInput = document.activeElement === inputRef.current;
        if (!isInput && userInput.trim()) {
          e.preventDefault();
          handleVerify();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInput, showErrorSheet, showSuccessSheet, settings, cuesRevealed]);

  const affirmation = affirmationFor(exercise.affirmation, exercise.shift_hint);

  // Success and failure both hand control back to the parent only from the sheet's
  // onContinue, so the feedback is actually seen (the parent keys the widget on the
  // practice/retry index and would unmount it on an immediate advance).
  const handleSuccessContinue = () => {
    setShowSuccessSheet(false);
    onSuccess();
  };

  const handleErrorContinue = () => {
    setShowErrorSheet(false);
    if (isRetry) {
      // stay on this item for another attempt; it is already in the queue
      resetCurrentExercise();
    } else {
      // the miss is already queued for reinforcement — advance the initial run
      onSuccess();
    }
  };

  /* ---------------- degraded mode: the learner cannot listen ---------------- */
  if (listeningOff) {
    return (
      <div className="p-6 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--main-color)]/25 space-y-5 shadow-lg font-mono">
        <div className="flex items-center justify-between border-b border-[var(--sub-color)]/15 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--sub-color)]" />
            <span className="text-xs uppercase tracking-wider text-[var(--sub-color)] font-semibold">
              {isRetry ? "retry exercise" : `write the ${language.name}`}
            </span>
          </div>
          {exercise.shift_hint && (
            <span className="text-xs px-2.5 py-0.5 rounded bg-[var(--bg-color)] text-[var(--main-color)] border border-[var(--sub-color)]/20 font-bold">
              {exercise.shift_hint}
            </span>
          )}
        </div>

        <div className="p-4 rounded-lg bg-[var(--bg-color)] border border-dashed border-[var(--sub-color)]/40 space-y-2">
          <div className="flex items-center gap-2 text-xs text-[var(--sub-color)] uppercase tracking-wider">
            <EarOff className="w-4 h-4" /> Listening is off
          </div>
          <p className="text-sm text-[var(--text-color)]">
            You asked to skip listening. This one is on the page instead — type it exactly as written.
          </p>
          <p className="text-base text-[var(--main-color)] font-bold">{spoken}</p>
          <button
            onClick={() => playTargetAudio(spoken)}
            className="inline-flex items-center gap-1.5 text-xs text-[var(--sub-color)] hover:text-[var(--main-color)]"
          >
            <Volume2 className="w-3.5 h-3.5" /> play it anyway
          </button>
        </div>

        <div className="space-y-3">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            aria-label={`Type the ${language.name} sentence exactly as written`}
            lang={language.id}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && userInput.trim()) {
                e.preventDefault();
                e.stopPropagation();
                handleVerify();
              }
            }}
            placeholder={`Type the ${language.name}…`}
            className="w-full bg-[var(--bg-color)] border border-[var(--sub-color)]/40 rounded px-4 py-3 text-lg font-mono focus:border-[var(--main-color)] outline-none"
          />
          {userInput.trim() && (
            <button
              onClick={handleVerify}
              className="w-full py-3 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-semibold"
            >
              Check
            </button>
          )}
          <GermanCharBar onInsert={(c) => setUserInput((p) => p + c)} />
        </div>

        {showSuccessSheet && (
          <SuccessFeedbackSheet
            onFlagGuessed={!isRetry ? onFlagGuessed : undefined}
            targetAnswer={target}
            meaning={exercise.meaning}
            explanation={exercise.explanation}
            variant={sheetVariant}
            userAttempt={verifiedAttemptText}
            warningNote={almostWarningNote}
            affirmation={affirmation}
            onContinue={handleSuccessContinue}
          />
        )}
        {showErrorSheet && (
          <ErrorFeedbackSheet
            userInput={failedAttemptText}
            expectedAnswer={target}
            explanation={exercise.explanation}
            diagnosis={failedDiagnosis}
            onContinue={handleErrorContinue}
          />
        )}
      </div>
    );
  }

  /* ---------------------------- normal mode: the ear --------------------------- */
  return (
    <div className="p-6 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--main-color)]/25 space-y-5 shadow-lg font-mono">
      <div className="flex items-center justify-between border-b border-[var(--sub-color)]/15 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--main-color)]" />
          <span className="text-xs uppercase tracking-wider text-[var(--main-color)] font-semibold">
            {isRetry ? "retry exercise" : "listen and write"}
          </span>
        </div>
        {exercise.shift_hint && (
          <span className="text-xs px-2.5 py-0.5 rounded bg-[var(--bg-color)] text-[var(--main-color)] border border-[var(--sub-color)]/20 font-bold">
            {exercise.shift_hint}
          </span>
        )}
      </div>

      <p className="text-base text-[var(--text-color)] font-bold leading-snug">{exercise.prompt}</p>
      <VoiceStatusBanner allowSkipListening />

      {/* the prompt is a sound, not a sentence */}
      <div className="p-4 rounded-lg bg-[var(--bg-color)] border-l-4 border-[var(--main-color)] space-y-3">
        <Quote className="w-4 h-4 text-[var(--main-color)]" />
        <div className="flex items-center gap-3">
          <button
            onClick={play}
            disabled={replaysUsed >= replayBudget}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--main-color)] text-[var(--bg-color)] font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Volume2 className="w-4 h-4" />
            {replaysUsed === 0 ? "Play" : `Listen (${replaysUsed}/${replayBudget} used)`}
          </button>
          <div className="flex-1 h-1.5 rounded-full bg-[var(--sub-color)]/20 overflow-hidden">
            <div
              className="h-full bg-[var(--main-color)] transition-all"
              style={{ width: `${(replaysUsed / replayBudget) * 100}%` }}
            />
          </div>
        </div>
        <p className="text-[11px] text-[var(--sub-color)]">
          Write down what you heard. Replays are capped on purpose — the pause is the exercise.
        </p>
        <button
          onClick={() => skipListeningFor(LISTENING_SKIP_MS)}
          className="inline-flex items-center gap-1.5 text-xs text-[var(--sub-color)] hover:text-[var(--text-color)]"
        >
          <EarOff className="w-3.5 h-3.5" /> I can&rsquo;t listen right now — skip listening for 15 min
        </button>
      </div>

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
              <span>{hint.translation}</span>
            </span>
          ))}
        </div>
      )}

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
          aria-label="Write down the sentence you heard"
          lang={language.id}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && userInput.trim()) {
              e.preventDefault();
              e.stopPropagation();
              handleVerify();
            }
          }}
          placeholder="Write down what you heard…"
          disabled={status === "correct" || status === "almost"}
          className="w-full bg-[var(--bg-color)] border border-[var(--sub-color)]/40 rounded px-4 py-3 pr-4 text-lg font-mono focus:border-[var(--main-color)] outline-none disabled:opacity-50"
        />
        <GermanCharBar onInsert={(c) => setUserInput((p) => p + c)} />
        {userInput.trim() && (
          <button
            onClick={handleVerify}
            className="w-full py-3 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-semibold"
          >
            Check
          </button>
        )}
        {feedbackNote && (
          <p className="text-xs text-[var(--sub-color)]" role="status">
            {feedbackNote}
          </p>
        )}
      </div>

      {showSuccessSheet && (
        <SuccessFeedbackSheet
          onFlagGuessed={!isRetry ? onFlagGuessed : undefined}
          targetAnswer={target}
          meaning={exercise.meaning}
          explanation={exercise.explanation}
          variant={sheetVariant}
          userAttempt={verifiedAttemptText}
          warningNote={almostWarningNote}
          affirmation={affirmation}
          onContinue={handleSuccessContinue}
        />
      )}

      {showErrorSheet && (
        <ErrorFeedbackSheet
          userInput={failedAttemptText}
          expectedAnswer={target}
          explanation={exercise.explanation}
          diagnosis={failedDiagnosis}
          onContinue={handleErrorContinue}
        />
      )}
    </div>
  );
};
