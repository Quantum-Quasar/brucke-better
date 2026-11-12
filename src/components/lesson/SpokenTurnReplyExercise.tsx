"use client";

// Spoken Turn Reply Exercise: a conversational question-and-answer turn.
// Instead of translating an isolated sentence, the learner receives a question
// in the target language (with audio playback) and replies to it in the target
// language based on a conversational cue.

import React, { useState, useEffect, useRef } from "react";
import {
  Volume2,
  MessageCircle,
  CornerDownRight,
  Lightbulb,
} from "lucide-react";
import { ProductionAnswerInput } from "./inputs/ProductionAnswerInput";
import { ProductionAnswerActions } from "./ProductionAnswerActions";
import { VoiceStatusBanner } from "@/components/common/VoiceStatusBanner";
import { ErrorFeedbackSheet } from "./ErrorFeedbackSheet";
import { SuccessFeedbackSheet } from "./SuccessFeedbackSheet";
import { arrangeTilesDeterministically } from "./exercise-tiles";
import { gradeExerciseAttempt } from "@/lib/exercise-grading";
import { affirmationFor } from "@/lib/shift-diagnosis";
import { getLanguageDefinition } from "@/data/languages";
import { playTargetAudio } from "@/lib/audio";
import { isListeningSkipped } from "@/lib/listening";
import { useAppStore } from "@/lib/store";
import { soundEngine } from "@/lib/sound";
import type { ExerciseDiagnosis, ExerciseItem } from "@/lib/types";

interface SpokenTurnReplyExerciseProps {
  exercise: ExerciseItem;
  isRetry?: boolean;
  onSuccess: () => void;
  onError: (errorType: "spelling" | "umlaut" | "capitalization") => void;
  onQueueRetry?: () => void;
  onFlagGuessed?: () => void;
  onPurpleForfeit?: () => void;
}

export const SpokenTurnReplyExercise: React.FC<SpokenTurnReplyExerciseProps> = ({
  exercise,
  isRetry = false,
  onSuccess,
  onError,
  onQueueRetry,
  onPurpleForfeit,
  onFlagGuessed,
}) => {
  const [userInput, setUserInput] = useState("");
  const [cuesRevealed, setCuesRevealed] = useState(0);
  const [showQuestionGloss, setShowQuestionGloss] = useState(false);
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

  const spokenQuestion = exercise.spoken_question ?? "";
  const questionMeaning = exercise.question_meaning ?? "";
  const replyIdea = exercise.reply_idea ?? exercise.idea ?? "";
  const cues = exercise.cues ?? [];
  const wordBank = React.useMemo(() => {
    const cleaned = (exercise.word_bank || []).map((w) => w.replace(/[.,!?;:]+$/, ""));
    return arrangeTilesDeterministically(cleaned, `${exercise.id}#wb`, exercise.target_answer);
  }, [exercise.word_bank, exercise.id, exercise.target_answer]);
  const target = exercise.target_answer.trim();
  const listeningOff = isListeningSkipped(settings.listeningSkippedUntil);

  const resetCurrentExercise = () => {
    setUserInput("");
    setCuesRevealed(0);
    setShowQuestionGloss(false);
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

  useEffect(() => {
    if (listeningOff || !spokenQuestion) return;
    const t = setTimeout(() => playTargetAudio(spokenQuestion), 350);
    return () => clearTimeout(t);
  }, [exercise.id, listeningOff, spokenQuestion]);

  const insertWord = (word: string) => {
    if (status === "correct" || status === "almost") return;
    void soundEngine.playClick(settings.playSoundOnClick, settings.soundVolume);
    setFeedbackNote(null);
    setUserInput((prev) => {
      if (!prev) return word;
      return prev.endsWith(" ") ? prev + word : `${prev} ${word}`;
    });
    setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 0);
  };

  const revealNextCue = () => {
    if (cuesRevealed >= cues.length) return;
    onPurpleForfeit?.();
    setCuesRevealed((n) => n + 1);
  };


  const handleVerify = () => {
    inputRef.current?.blur();
    const answerToCheck = userInput.trim();
    if (!answerToCheck) {
      setFeedbackNote("Write your reply before sending.");
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
      setFeedbackNote("Spot On! Natural reply.");
      setSheetVariant("exact");
      setVerifiedAttemptText(answerToCheck);
      setAlmostWarningNote(undefined);
      setShowSuccessSheet(true);
      return;
    }

    if (evaluation.accuracy === "almost") {
      setStatus("almost");
      setFeedbackNote(evaluation.warningNote || `Almost right! Standard reply: "${target}"`);
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
    if (cuesRevealed < cues.length) setCuesRevealed((n) => n + 1);
    setShowErrorSheet(true);
  };

  const affirmation = affirmationFor(exercise.affirmation, exercise.shift_hint);

  return (
    <div className="p-6 rounded-xl bg-[var(--sub-alt-color)] border border-[var(--main-color)]/25 space-y-5 shadow-lg font-mono">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--sub-color)]/15 pb-3">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-[var(--main-color)]" />
          <span className="text-xs uppercase tracking-wider text-[var(--main-color)] font-semibold">
            {isRetry ? "retry conversational turn" : "question & answer turn"}
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

      {/* Incoming Question Bubble */}
      <div className="flex flex-col items-start space-y-1.5">
        <span className="text-[10px] uppercase tracking-widest text-[var(--sub-color)] pl-1">
          incoming question
        </span>
        <div className="w-full sm:w-11/12 p-4 rounded-2xl rounded-tl-sm bg-[var(--bg-color)] border border-[var(--main-color)]/30 space-y-2">
          <div className="flex items-center justify-between gap-3">
            <p className="text-base sm:text-lg text-[var(--main-color)] font-bold leading-snug">
              {spokenQuestion}
            </p>
            {spokenQuestion && (
              <button
                type="button"
                onClick={() => playTargetAudio(spokenQuestion)}
                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--main-color)]/15 hover:bg-[var(--main-color)]/25 text-[var(--main-color)] text-xs font-bold transition cursor-pointer"
                title="Listen to the question"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>listen</span>
              </button>
            )}
          </div>
          {questionMeaning && (
            <div className="pt-1 border-t border-[var(--sub-color)]/15 flex items-center justify-between">
              {showQuestionGloss ? (
                <span className="text-xs text-[var(--sub-color)] italic">{questionMeaning}</span>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowQuestionGloss(true)}
                  className="text-[11px] text-[var(--sub-color)] hover:text-[var(--text-color)] underline decoration-dotted cursor-pointer"
                >
                  reveal question meaning
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Learner Reply Intent Bubble */}
      <div className="flex flex-col items-end space-y-1.5">
        <span className="text-[10px] uppercase tracking-widest text-[var(--main-color)] pr-1 font-bold">
          your reply
        </span>
        <div className="w-full sm:w-11/12 p-4 rounded-2xl rounded-tr-sm bg-[var(--bg-color)] border-r-4 border-[var(--main-color)] space-y-2">
          <div className="flex items-start gap-2">
            <CornerDownRight className="w-4 h-4 text-[var(--main-color)] shrink-0 mt-0.5" />
            <p className="text-sm sm:text-base text-[var(--text-color)] italic leading-relaxed">
              {replyIdea}
            </p>
          </div>
        </div>
      </div>

      {/* Optional Cue Ladder */}
      {(cuesRevealed > 0 || (cues.length > 0 && status === "idle")) && (
        <div className="space-y-2">
          {cuesRevealed > 0 && (
            <ul className="space-y-1.5" aria-live="polite">
              {cues.slice(0, cuesRevealed).map((cue, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-xs text-[var(--text-color)] leading-relaxed"
                >
                  <span className="text-[var(--main-color)] font-bold shrink-0">&bull;</span>
                  <span>{cue}</span>
                </li>
              ))}
            </ul>
          )}
          {cuesRevealed < cues.length && (
            <button
              type="button"
              onClick={revealNextCue}
              disabled={status === "correct" || status === "almost"}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/20 text-xs font-mono text-[var(--sub-color)] hover:text-[var(--main-color)] hover:border-[var(--main-color)]/40 transition cursor-pointer disabled:opacity-40"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>show a reply hint</span>
            </button>
          )}
        </div>
      )}

      {/* Input & Word Bank */}
      <div className="space-y-3">
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
          label={exercise.prompt || `Your ${language.name} reply`}
          languageId={language.id}
          placeholder={`answer in ${language.name.toLowerCase()}...`}
          readOnly={status === "correct" || status === "almost"}
          settings={settings}
        />

        <div className="flex flex-wrap gap-2 pt-1">
          {wordBank.map((word, i) => (
            <button
              key={`${word}-${i}`}
              type="button"
              onClick={() => insertWord(word)}
              disabled={status === "correct" || status === "almost"}
              className="px-3 py-1.5 rounded-lg border text-xs font-mono transition flex items-center gap-2 cursor-pointer border-[var(--sub-color)]/20 bg-[var(--bg-color)] hover:border-[var(--main-color)] text-[var(--text-color)] disabled:opacity-40"
            >
              <span>{word}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <ProductionAnswerActions status={status} feedback={feedbackNote} onVerify={handleVerify} action="reply" />

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
