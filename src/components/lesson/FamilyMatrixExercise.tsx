"use client";

// TM-6 (guidebook §4.1.1): vocabulary families read two ways. A prefix × base grid
// turns "just learn the separable verb" into a system: read across a row and the
// prefix's job speaks; read down a column and the base's job speaks. The learner
// produces ONE cell from the two laws that meet there — then the whole grid
// reveals, so the exercise teaches far more than the single answer it graded.

import React, { useState, useEffect, useRef } from "react";
import { Grid3x3, Check, AlertCircle } from "lucide-react";
import { GermanCharBar } from "@/components/common/GermanCharBar";
import { ErrorFeedbackSheet } from "./ErrorFeedbackSheet";
import { SuccessFeedbackSheet } from "./SuccessFeedbackSheet";
import { evaluateAnswerAccuracy } from "@/lib/letter-diff";
import { getLanguageDefinition } from "@/data/languages";
import { useAppStore } from "@/lib/store";
import { soundEngine } from "@/lib/sound";
import { affirmationFor } from "@/lib/shift-diagnosis";
import type { ExerciseDiagnosis, ExerciseItem } from "@/lib/types";

interface FamilyMatrixExerciseProps {
  exercise: ExerciseItem;
  isRetry?: boolean;
  onSuccess: () => void;
  onError: (errorType: "spelling" | "umlaut" | "capitalization") => void;
  onQueueRetry?: () => void;
  /** TM-6: the learner got it right but did not trust it (guidebook §1.8/§1.9) */
  onFlagGuessed?: () => void;
  onPurpleForfeit?: () => void;
}

export const FamilyMatrixExercise: React.FC<FamilyMatrixExerciseProps> = ({
  exercise,
  isRetry = false,
  onSuccess,
  onError,
  onQueueRetry,
  onFlagGuessed,
}) => {
  const [userInput, setUserInput] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [verifiedAttemptText, setVerifiedAttemptText] = useState("");
  const [almostWarningNote, setAlmostWarningNote] = useState<string | undefined>(undefined);
  const [showErrorSheet, setShowErrorSheet] = useState(false);
  const [showSuccessSheet, setShowSuccessSheet] = useState(false);
  const [failedAttemptText, setFailedAttemptText] = useState("");
  const [failedDiagnosis, setFailedDiagnosis] = useState<ExerciseDiagnosis | undefined>(undefined);
  const [isCapsLock, setIsCapsLock] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const tolerance = useAppStore((s) => s.tolerance);
  const settings = useAppStore((s) => s.settings);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);

  const rows = exercise.rows ?? [];
  const columns = exercise.columns ?? [];
  const cells = exercise.cells ?? [];
  const seed = new Set((exercise.seed ?? []).map(([r, c]) => `${r}:${c}`));
  const task = exercise.task ?? { row: 0, column: 0 };
  const target = exercise.target_answer.trim();
  const affirmation = affirmationFor(exercise.affirmation, exercise.shift_hint);

  useEffect(() => {
    setUserInput("");
    setRevealed(false);
    setShowErrorSheet(false);
    setShowSuccessSheet(false);
    setVerifiedAttemptText("");
    setAlmostWarningNote(undefined);
    setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 60);
  }, [exercise.id]);

  const handleVerify = () => {
    inputRef.current?.blur();
    const answer = userInput.trim();
    if (!answer) return;

    const evalOptions = {
      umlautTolerance: Boolean(settings.lazyMode ?? tolerance.umlautTolerance),
      capitalizationTolerance: Boolean(settings.capitalizationTolerance ?? tolerance.capitalizationTolerance),
    };
    const evaluation = evaluateAnswerAccuracy(answer, target, evalOptions);

    if (evaluation.accuracy === "exact" || evaluation.accuracy === "almost") {
      setVerifiedAttemptText(answer);
      setAlmostWarningNote(evaluation.warningNote);
      setRevealed(true);
      setShowSuccessSheet(true);
      if (
        evaluation.accuracy === "almost" &&
        (evaluation.reason === "typo" || evaluation.reason === "sharp-s" || evaluation.reason === "umlaut")
      ) {
        onQueueRetry?.();
      }
      return;
    }

    setFailedAttemptText(answer);
    setFailedDiagnosis(exercise.diagnosis);
    void soundEngine.playError(settings.playSoundOnError, settings.soundVolume);
    onError(evaluation.reason === "umlaut" ? "umlaut" : "spelling");
    onQueueRetry?.();
    setShowErrorSheet(true);
  };

  const taskCell = cells[task.row]?.[task.column];

  return (
    <div className="p-6 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--main-color)]/25 space-y-5 shadow-lg font-mono">
      <div className="flex items-center justify-between border-b border-[var(--sub-color)]/15 pb-3">
        <div className="flex items-center gap-2">
          <Grid3x3 className="w-4 h-4 text-[var(--main-color)]" />
          <span className="text-xs uppercase tracking-wider text-[var(--main-color)] font-semibold">
            {isRetry ? "retry exercise" : "the family grid"}
          </span>
        </div>
        {exercise.shift_hint && (
          <span className="text-xs px-2.5 py-0.5 rounded bg-[var(--bg-color)] text-[var(--main-color)] border border-[var(--sub-color)]/20 font-bold">
            {exercise.shift_hint}
          </span>
        )}
      </div>

      <p className="text-base text-[var(--text-color)] font-bold leading-snug">{exercise.prompt}</p>

      <div className="grid gap-1.5" style={{ gridTemplateColumns: `minmax(72px, auto) repeat(${Math.max(1, columns.length)}, minmax(0, 1fr))` }}>
        <div />
        {columns.map((c, ci) => (
          <div key={`h-${ci}`} className="px-2 py-1.5 text-center text-xs font-bold text-[var(--main-color)]">
            {c}
          </div>
        ))}

        {rows.map((r, ri) => (
          <React.Fragment key={`r-${ri}`}>
            <div className="px-2 py-1.5 text-xs font-bold text-[var(--main-color)] self-center">{r}</div>
            {columns.map((_c, ci) => {
              const isTask = task.row === ri && task.column === ci;
              const isSeed = seed.has(`${ri}:${ci}`);
              const cell = cells[ri]?.[ci];
              const show = isSeed || revealed;
              return (
                <div
                  key={`c-${ri}-${ci}`}
                  className={[
                    "px-2 py-2 rounded border text-center text-sm min-h-[3rem] flex flex-col items-center justify-center gap-0.5",
                    isTask
                      ? "border-[var(--main-color)] bg-[var(--main-color)]/10 text-[var(--main-color)] font-bold"
                      : show
                      ? "border-[var(--sub-color)]/25 bg-[var(--bg-color)] text-[var(--text-color)]"
                      : "border-dashed border-[var(--sub-color)]/30 text-[var(--sub-color)]",
                  ].join(" ")}
                >
                  {isTask && !revealed ? (
                    <span className="text-[11px] uppercase tracking-wider">you build this</span>
                  ) : show && cell ? (
                    <>
                      <span className="font-semibold">{cell.german}</span>
                      <span className="text-[10px] text-[var(--sub-color)]">{cell.english}</span>
                    </>
                  ) : (
                    <span className="text-lg leading-none text-[var(--sub-color)]">?</span>
                  )}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-1 text-[11px] text-[var(--sub-color)]">
        <span>
          <span className="text-[var(--main-color)] font-bold">across →</span> {exercise.column_law}
        </span>
        <span>
          <span className="text-[var(--main-color)] font-bold">down ↓</span> {exercise.row_law}
        </span>
      </div>

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
          aria-label={
            taskCell
              ? `The ${columns[task.column]} form of ${rows[task.row]}`
              : `Family grid cell answer in ${language.name}`
          }
          lang={language.id}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && userInput.trim()) {
              e.preventDefault();
              handleVerify();
            }
            if (e.getModifierState) setIsCapsLock(e.getModifierState("CapsLock"));
          }}
          placeholder={taskCell ? `the ${columns[task.column]} form of ${rows[task.row]}…` : "build the cell…"}
          disabled={revealed}
          className="w-full bg-[var(--bg-color)] border border-[var(--sub-color)]/40 rounded px-4 py-3 text-lg font-mono focus:border-[var(--main-color)] outline-none disabled:opacity-50"
        />
        <GermanCharBar onInsert={(c) => setUserInput((p) => p + c)} />
        {userInput.trim() && !revealed && (
          <button
            onClick={handleVerify}
            className="w-full py-3 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-semibold"
          >
            Check
          </button>
        )}
        {!revealed && (
          <button
            onClick={() => {
              setRevealed(true);
              onQueueRetry?.();
            }}
            className="w-full py-2 text-xs text-[var(--sub-color)] hover:text-[var(--text-color)]"
          >
            I don&rsquo;t know — show the family
          </button>
        )}
        {revealed && !showSuccessSheet && !showErrorSheet && (
          <button
            onClick={() => {
              setUserInput("");
              setRevealed(false);
              onSuccess();
            }}
            className="w-full py-3 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-semibold"
          >
            Continue
          </button>
        )}
      </div>

      {showSuccessSheet && (
        <SuccessFeedbackSheet
          onFlagGuessed={!isRetry ? onFlagGuessed : undefined}
          targetAnswer={target}
          meaning={exercise.meaning}
          explanation={exercise.explanation}
          userAttempt={verifiedAttemptText}
          warningNote={almostWarningNote}
          affirmation={affirmation}
          onContinue={() => {
            setShowSuccessSheet(false);
            setUserInput("");
            setRevealed(false);
            onSuccess();
          }}
        />
      )}

      {showErrorSheet && (
        <ErrorFeedbackSheet
          userInput={failedAttemptText}
          expectedAnswer={target}
          explanation={exercise.explanation}
          diagnosis={failedDiagnosis}
          onContinue={() => {
            setShowErrorSheet(false);
            setRevealed(true);
            setUserInput("");
            if (!isRetry) {
              onSuccess();
            }
          }}
        />
      )}

      <div className="flex items-center gap-1.5 text-[10px] text-[var(--sub-color)]">
        <Check className="w-3 h-3" /> the grid fills in either way — the family is the lesson
      </div>
    </div>
  );
};
