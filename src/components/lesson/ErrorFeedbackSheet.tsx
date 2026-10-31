"use client";

// ponytail: focused bottom modal sheet presenting letter-by-letter diff and mechanical shift explanation

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { AlertCircle, ArrowRight, Stethoscope, Volume2 } from "lucide-react";
import { computeLetterDiff } from "@/lib/letter-diff";
import { useDialogFocus } from "@/lib/use-dialog-focus";
import { useAppStore } from "@/lib/store";
import { getLanguageDefinition } from "@/data/languages";
import { playTargetAudio } from "@/lib/audio";
import type { ExerciseDiagnosis } from "@/lib/types";

interface ErrorFeedbackSheetProps {
  userInput: string;
  expectedAnswer: string;
  englishPrompt?: string;
  shiftRule?: string;
  explanation?: string;
  diagnosis?: ExerciseDiagnosis;
  answerLabel?: string;
  audioText?: string;
  audioLocale?: string;
  onContinue: () => void;
}

export const ErrorFeedbackSheet: React.FC<ErrorFeedbackSheetProps> = ({
  userInput,
  expectedAnswer,
  englishPrompt,
  shiftRule,
  explanation,
  diagnosis,
  answerLabel,
  audioText,
  audioLocale,
  onContinue,
}) => {
  const diff = computeLetterDiff(userInput, expectedAnswer);
  const continueBtnRef = React.useRef<HTMLButtonElement>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);
  const spokenText = audioText ?? expectedAnswer;
  const spokenLocale = audioLocale ?? language.ttsLocale;

  useDialogFocus({
    open: true,
    containerRef: dialogRef,
    initialFocusRef: continueBtnRef,
    onEscape: onContinue,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " " && e.code !== "Space") return;
      // a focused control keeps its native activation (continue, play-audio)
      const target = e.target;
      if (
        target instanceof HTMLElement &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.getAttribute("role") === "button")
      ) {
        return;
      }
      e.preventDefault();
      onContinue();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onContinue]);

  if (typeof document === "undefined") return null;

  // Portal out of the lesson's transformed/scrolled ancestors so the sheet is
  // positioned against the viewport (see SuccessFeedbackSheet).
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 animate-in fade-in duration-200">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="error-feedback-title"
        className="w-full sm:max-w-md bg-[var(--bg-color)] border-t sm:border border-[var(--error-color)]/30 sm:rounded-lg rounded-t-lg shadow-2xl p-6 space-y-5 animate-in slide-in-from-bottom duration-200"
      >
        {/* Header */}
        <div className="flex items-center gap-2 text-[var(--error-color)]">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <h4 id="error-feedback-title" className="text-sm font-bold text-[var(--text-color)] font-mono">sound shift breakdown</h4>
        </div>

        {/* Letter Comparison */}
        <div className="space-y-3 p-4 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20">
          {/* User Input with character-level diff */}
          <div>
            <span className="text-[11px] font-mono text-[var(--sub-color)] uppercase tracking-wider block mb-1">
              your attempt:
            </span>
            <div className="text-lg font-mono tracking-wide flex flex-wrap gap-0.5">
              {diff.userChars.length > 0 ? (
                diff.userChars.map((c, i) => (
                  <span
                    key={i}
                    className={
                      c.status === "correct"
                        ? "text-[var(--text-color)] font-medium"
                        : "text-[var(--error-color)] font-bold underline decoration-[var(--error-color)] decoration-2 bg-[var(--error-color)]/15 px-0.5 rounded"
                    }
                  >
                    {c.char}
                  </span>
                ))
              ) : (
                <span className="text-[var(--sub-color)]/50 italic text-sm">(no input)</span>
              )}
            </div>
          </div>

          {/* Correct Target Form */}
          <div className="pt-2 border-t border-[var(--sub-color)]/15 flex items-start justify-between gap-2">
            <div>
              <span className="text-[11px] font-mono text-[var(--sub-color)] uppercase tracking-wider block mb-1">
                {answerLabel ?? `target ${language.name.toLowerCase()}:`}
              </span>
              <div className="text-lg font-mono font-bold text-[var(--main-color)]">
                {expectedAnswer}
              </div>
            </div>
            {spokenText && (
              <button
                type="button"
                onClick={() => playTargetAudio(spokenText, spokenLocale)}
                className="shrink-0 p-1.5 rounded bg-[var(--bg-color)] hover:bg-[var(--main-color)]/15 text-[var(--main-color)] border border-[var(--sub-color)]/20 transition cursor-pointer"
                title="Listen to pronunciation"
                aria-label="Listen to pronunciation"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {englishPrompt && (
            <div className="pt-2 border-t border-[var(--sub-color)]/15 flex items-center justify-between text-xs font-mono">
              <span className="text-[var(--sub-color)]">rule:</span>
              <span className="text-[var(--main-color)] font-bold">{shiftRule || "Consonant Shift"}</span>
            </div>
          )}
        </div>

        {/* TM-3: name the slip before the letter diff — feedback is teaching time */}
        {diagnosis && (
          <div className="text-xs font-mono text-[var(--text-color)] leading-relaxed bg-[var(--sub-alt-color)] p-3 rounded-lg border border-[var(--main-color)]/30">
            <span className="text-[var(--main-color)] font-semibold flex items-center gap-1.5 mb-0.5 uppercase tracking-wider text-[11px]">
              <Stethoscope className="w-3.5 h-3.5" /> what went wrong
            </span>
            <em>
              {diagnosis.slip} — {diagnosis.cue}
            </em>
          </div>
        )}

        {/* Instructive Explanation */}
        {explanation && (
          <div className="text-xs font-mono text-[var(--sub-color)] leading-relaxed bg-[var(--sub-alt-color)] p-3 rounded-lg border border-[var(--sub-color)]/20">
            <span className="text-[var(--main-color)] font-semibold block mb-0.5">shift note:</span>
            {explanation}
          </div>
        )}

        {/* Continue Button */}
        <button
          ref={continueBtnRef}
          type="button"
          onClick={onContinue}
          className="w-full py-3 rounded-lg bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-mono font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>continue</span>
          <span className="keycap text-[10px]">enter</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>,
    document.body
  );
};
