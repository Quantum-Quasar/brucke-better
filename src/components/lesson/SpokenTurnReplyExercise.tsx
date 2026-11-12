"use client";

// Spoken Turn Reply Exercise: a conversational question-and-answer turn.
// Instead of translating an isolated sentence, the learner receives a question
// in the target language (with audio playback) and replies to it in the target
// language based on a conversational cue.

import React, { useState, useEffect } from "react";
import {
  Volume2,
  MessageCircle,
  CornerDownRight,
  Lightbulb,
} from "lucide-react";
import { ProductionAnswerInput } from "./inputs/ProductionAnswerInput";
import { ProductionAnswerActions } from "./ProductionAnswerActions";
import { VoiceStatusBanner } from "@/components/common/VoiceStatusBanner";
import { MicrophonePractice } from "@/components/common/MicrophonePractice";
import { ErrorFeedbackSheet } from "./ErrorFeedbackSheet";
import { SuccessFeedbackSheet } from "./SuccessFeedbackSheet";
import { playTargetAudio } from "@/lib/audio";
import { isListeningSkipped } from "@/lib/listening";
import { useProductionAttempt } from "./use-production-attempt";
import type { ExerciseItem } from "@/lib/types";

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
  const [showQuestionGloss, setShowQuestionGloss] = useState(false);
  const {
    inputRef,
    settings,
    language,
    wordBank,
    cues,
    target,
    affirmation,
    userInput,
    setUserInput,
    cuesRevealed,
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
    insertWord,
    revealNextCue,
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
    emptyMessage: "Write your reply before sending.",
    exactMessage: "Spot On! Natural reply.",
    almostMessage: `Almost right! Standard reply: "${exercise.target_answer.trim()}"`,
    onReset: () => setShowQuestionGloss(false),
  });

  const spokenQuestion = exercise.spoken_question ?? "";
  const questionMeaning = exercise.question_meaning ?? "";
  const replyIdea = exercise.reply_idea ?? exercise.idea ?? "";
  const listeningOff = isListeningSkipped(settings.listeningSkippedUntil);

  useEffect(() => {
    if (listeningOff || !spokenQuestion) return;
    const timer = setTimeout(() => playTargetAudio(spokenQuestion), 350);
    return () => clearTimeout(timer);
  }, [exercise.id, listeningOff, spokenQuestion]);

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

      {settings.microphonePractice && status !== "correct" && status !== "almost" && (
        <MicrophonePractice key={exercise.id} target={target} locale={language.ttsLocale} />
      )}

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
