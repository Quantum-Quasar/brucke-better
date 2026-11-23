"use client";

// ponytail: focused bottom modal sheet presenting letter-by-letter diff and mechanical shift explanation

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AlertCircle, ArrowRight, ChevronDown, ChevronUp, Stethoscope, Volume2 } from "lucide-react";
import { computeLetterDiff } from "@/lib/letter-diff";
import { useBackDismiss } from "@/lib/use-back-dismiss";
import { ModalDialog } from "@/components/common/ModalDialog";
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

const ABBREV_END_RE = /(?:e\.g|i\.e|z\.\s*B|d\.\s*h|vs|Dr|Mr|Mrs|Ms|St|Nr|ca)\.$/i;

function splitFirstSentence(text: string): { lead: string; rest: string } {
  const trimmed = text.trim();
  const re = /[.!?](?=\s+\S)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(trimmed)) !== null) {
    const end = match.index + 1;
    const candidate = trimmed.slice(0, end).trim();
    if (candidate.length < 24 || ABBREV_END_RE.test(candidate)) continue;
    const rest = trimmed.slice(end).trim();
    if (rest.length > 0) {
      return { lead: candidate, rest };
    }
  }
  return { lead: trimmed, rest: "" };
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
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setShowMore(false);
  }, [expectedAnswer, explanation, diagnosis]);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);
  const spokenText = audioText ?? expectedAnswer;
  const spokenLocale = audioLocale ?? language.ttsLocale;

  const explanationParts = explanation ? splitFirstSentence(explanation) : null;
  // When diagnosis is present, tuck the full explanation behind "More"; otherwise show the first sentence and tuck any extra text.
  const hasCollapsibleMore = Boolean(
    explanation && (diagnosis || (explanationParts && explanationParts.rest.length > 0))
  );

  useBackDismiss(true, onContinue);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.isComposing) return;
      if (e.key !== "Enter" && e.key !== " " && e.code !== "Space") return;
      // a focused control keeps its native activation (continue, play-audio, more)
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

  return createPortal(
    <ModalDialog onClose={onContinue} initialFocusRef={continueBtnRef} aria-labelledby="error-feedback-title" className="open:flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 animate-in fade-in duration-200">
      <div
        className="w-full sm:max-w-md max-h-[85dvh] overflow-y-auto overscroll-contain bg-[var(--bg-color)] border-t sm:border border-[var(--error-color)]/30 sm:rounded-lg rounded-t-lg shadow-2xl p-5 pb-safe space-y-4 animate-in slide-in-from-bottom duration-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2 text-[var(--error-color)]">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <h4 id="error-feedback-title" className="text-sm font-bold text-[var(--text-color)] font-mono">not quite</h4>
          </div>
          {englishPrompt && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-[var(--main-color)] font-semibold">
              {shiftRule || "Consonant Shift"}
            </span>
          )}
        </div>

        {/* Letter Comparison */}
        <div className="space-y-2.5 p-3.5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20">
          <div>
            <span className="text-[11px] font-mono text-[var(--sub-color)] uppercase tracking-wider block mb-0.5">
              your attempt:
            </span>
            <div className="text-base font-mono tracking-wide flex flex-wrap gap-0.5">
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

          <div className="pt-2 border-t border-[var(--sub-color)]/15 flex items-start justify-between gap-2">
            <div>
              <span className="text-[11px] font-mono text-[var(--sub-color)] uppercase tracking-wider block mb-0.5">
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
        </div>

        {/* 1-line why: diagnosis if present, otherwise first sentence of explanation */}
        {diagnosis ? (
          <div className="text-xs font-mono text-[var(--text-color)] leading-relaxed bg-[var(--sub-alt-color)] p-3 rounded-lg border border-[var(--main-color)]/30">
            <span className="text-[var(--main-color)] font-semibold flex items-center gap-1.5 mb-0.5 uppercase tracking-wider text-[11px]">
              <Stethoscope className="w-3.5 h-3.5" /> why
            </span>
            <em>
              {diagnosis.slip} — {diagnosis.cue}
            </em>
          </div>
        ) : explanationParts ? (
          <div id="error-feedback-more" className="text-xs font-mono text-[var(--sub-color)] leading-relaxed bg-[var(--sub-alt-color)] p-3 rounded-lg border border-[var(--sub-color)]/20">
            <span className="text-[var(--main-color)] font-semibold block mb-0.5">why:</span>
            {showMore ? explanation : explanationParts.lead}
          </div>
        ) : null}

        {/* Expandable longer note behind "More" */}
        {hasCollapsibleMore && (
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => setShowMore((prev) => !prev)}
              aria-expanded={showMore}
              aria-controls="error-feedback-more"
              className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--main-color)] hover:underline cursor-pointer"
            >
              {showMore ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>{showMore ? "Less" : "More"}</span>
            </button>
            {showMore && diagnosis && explanation && (
              <div id="error-feedback-more" className="text-xs font-mono text-[var(--sub-color)] leading-relaxed bg-[var(--sub-alt-color)] p-3 rounded-lg border border-[var(--sub-color)]/20">
                <span className="text-[var(--main-color)] font-semibold block mb-0.5">shift note:</span>
                {explanation}
              </div>
            )}
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
    </ModalDialog>,
    document.body
  );
};
