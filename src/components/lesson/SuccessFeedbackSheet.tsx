"use client";

import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, ArrowRight, Sparkles, BookOpen, AlertCircle, Repeat, Volume2 } from "lucide-react";
import type { VocabHint } from "@/lib/types";
import { useDialogFocus } from "@/lib/use-dialog-focus";
import { useAppStore } from "@/lib/store";
import { getLanguageDefinition } from "@/data/languages";
import { playTargetAudio } from "@/lib/audio";

interface LiteralGlossPair {
  literal: string;
  natural: string;
  /** load-bearing words (present in one rendering, absent in the other) */
  highlights: string[];
}

interface SuccessFeedbackSheetProps {
  targetAnswer: string;
  meaning?: string;
  explanation?: string;
  vocabHints?: VocabHint[];
  shiftRule?: string;
  variant?: "exact" | "almost";
  userAttempt?: string;
  warningNote?: string;
  /** Optional override for the answer language label (e.g. "english cognate:" on reverse_cognate) */
  answerLabel?: string;
  /** Optional override for the spoken text when clicking the speaker button */
  audioText?: string;
  /** Optional override for the TTS locale when clicking the speaker button */
  audioLocale?: string;
  /** TM-3 process affirmation — the correct answer restates the process (guidebook §1.7). */
  affirmation?: string;
  /** TM-2 literal-gloss reveal: the word-for-word English beside its natural form. */
  literalPair?: LiteralGlossPair;
  /**
   * TM-6: offered only when the learner got it right. A correct answer the learner
   * did not trust is still an uncertainty — the guidebook promises "we will revisit
   * everything you are uncertain of", which is unkeepable if the only observable
   * signal is failure. Never rendered in the retry queue.
   */
  onFlagGuessed?: () => void;
  onContinue: () => void;
}

export const SuccessFeedbackSheet: React.FC<SuccessFeedbackSheetProps> = ({
  targetAnswer,
  meaning,
  explanation,
  vocabHints,
  shiftRule,
  variant = "exact",
  userAttempt,
  warningNote,
  answerLabel,
  audioText,
  audioLocale,
  affirmation,
  literalPair,
  onFlagGuessed,
  onContinue,
}) => {
  const continueBtnRef = React.useRef<HTMLButtonElement>(null);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const isAlmost = variant === "almost";
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);
  const spokenText = audioText ?? targetAnswer;
  const spokenLocale = audioLocale ?? language.ttsLocale;

  useDialogFocus({
    open: true,
    containerRef: dialogRef,
    initialFocusRef: continueBtnRef,
    onEscape: onContinue,
  });

  // Listen for Enter or Space key to advance immediately. A focused control keeps
  // its native activation: Enter on "I guessed — bring this one back sooner" must
  // flag the guess, not be swallowed and advanced past by this window shortcut.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " " && e.code !== "Space") return;
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

  // Portal out of the lesson's transformed/scrolled ancestors: a `fixed`
  // sheet inside them is positioned against the scroll container, not the
  // viewport, which puts the continue button off-screen.
  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 animate-in fade-in duration-150">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="success-feedback-title"
        className={`w-full sm:max-w-md bg-[var(--bg-color)] border-t sm:border sm:rounded-lg rounded-t-lg shadow-2xl p-6 space-y-5 animate-in slide-in-from-bottom duration-200 font-mono ${
          isAlmost
            ? "border-[var(--sub-color)]/40"
            : "border-[var(--main-color)]/40"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center gap-2 ${
              isAlmost ? "text-[var(--sub-color)]" : "text-[var(--main-color)]"
            }`}
          >
            {isAlmost ? (
              <Sparkles className="w-5 h-5 shrink-0 text-[var(--sub-color)]" />
            ) : (
              <CheckCircle2 className="w-5 h-5 shrink-0 text-[var(--main-color)]" />
            )}
            <h4 id="success-feedback-title" className="text-sm font-bold font-mono text-[var(--text-color)]">
              {isAlmost ? "almost right — accepted" : "correct"}
            </h4>
          </div>
          {shiftRule && (
            <span className="text-[11px] font-mono px-2 py-0.5 rounded font-bold border border-[var(--sub-color)]/20 bg-[var(--sub-alt-color)] text-[var(--main-color)]">
              {shiftRule}
            </span>
          )}
        </div>

        {/* TM-3: masked repetition — a correct answer restates the process, specifically (§1.7) */}
        {affirmation && (
          <p className="text-xs font-mono text-[var(--main-color)] flex items-center gap-2 leading-relaxed">
            <Repeat className="w-4 h-4 shrink-0" />
            <span>{affirmation}</span>
          </p>
        )}

        {/* Almost Right Comparison Callout */}
        {isAlmost && userAttempt && (
          <div className="p-3.5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 space-y-2">
            <div className="flex items-center gap-1.5 text-[var(--sub-color)] font-mono uppercase tracking-wider text-[11px]">
              <AlertCircle className="w-3.5 h-3.5" /> note difference
            </div>
            <div className="flex items-center justify-between text-xs font-mono bg-[var(--bg-color)] p-2.5 rounded border border-[var(--sub-color)]/20">
              <div>
                <span className="text-[var(--sub-color)] block text-[10px] uppercase">your input</span>
                <span className="text-[var(--text-color)] line-through decoration-[var(--sub-color)]">{userAttempt}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[var(--sub-color)]" />
              <div className="text-right">
                <span className="text-[var(--sub-color)] block text-[10px] uppercase">standard</span>
                <span className="text-[var(--main-color)] font-bold">{targetAnswer}</span>
              </div>
            </div>
            {warningNote && <p className="text-xs text-[var(--sub-color)] leading-relaxed">{warningNote}</p>}
          </div>
        )}

        {/* TM-2: the literal rendering beside its natural form, load-bearing words highlighted */}
        {literalPair ? (
          <div className="p-4 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-2.5">
            <div>
              <span className="text-[11px] font-mono text-[var(--sub-color)] uppercase tracking-wider block">
                built the {language.name.toLowerCase()} way:
              </span>
              <div className="text-lg font-bold text-[var(--main-color)] font-mono">
                {literalPair.literal.split(/(\s+)/).map((token, i) =>
                  literalPair.highlights.includes(token.toLowerCase().replace(/[.,!?;:]+$/, "")) && token.trim() ? (
                    <span key={i} className="px-1 rounded bg-[var(--main-color)]/15 underline decoration-2">
                      {token}
                    </span>
                  ) : (
                    <span key={i}>{token}</span>
                  )
                )}
              </div>
            </div>
            <div className="pt-2 border-t border-[var(--sub-color)]/15">
              <span className="text-[11px] font-mono text-[var(--sub-color)] uppercase tracking-wider block">
                natural english:
              </span>
              <div className="text-sm text-[var(--text-color)] font-medium">&ldquo;{literalPair.natural}&rdquo;</div>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-2.5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[11px] font-mono text-[var(--sub-color)] uppercase tracking-wider block">
                  {answerLabel ?? `${language.name.toLowerCase()}:`}
                </span>
                <div className="text-xl font-bold text-[var(--main-color)] font-mono">
                  {targetAnswer}
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

            {meaning && (
              <div className="pt-2 border-t border-[var(--sub-color)]/15">
                <span className="text-[11px] font-mono text-[var(--sub-color)] uppercase tracking-wider block">
                  meaning:
                </span>
                <div className="text-sm text-[var(--text-color)] font-medium">
                  &ldquo;{meaning}&rdquo;
                </div>
              </div>
            )}
          </div>
        )}

        {/* Vocabulary Clue / Reinforcement if present */}
        {vocabHints && vocabHints.length > 0 && (
          <div className="p-3 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-1.5 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-[var(--sub-color)] uppercase tracking-wider text-[11px]">
              <Sparkles className="w-3.5 h-3.5" /> vocabulary reinforcement
            </div>
            <div className="space-y-1 text-[var(--text-color)]">
              {vocabHints.map((hint) => (
                <div key={hint.word}>
                  <strong className="text-[var(--main-color)] font-mono">{hint.word}</strong> = {hint.translation}
                  {hint.note && <span className="text-[var(--sub-color)] ml-1">({hint.note})</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Instructive Explanation */}
        {explanation && (
          <div className="text-xs text-[var(--sub-color)] leading-relaxed bg-[var(--sub-alt-color)] p-3 rounded-lg border border-[var(--sub-color)]/20 flex items-start gap-2 font-mono">
            <BookOpen className="w-4 h-4 text-[var(--main-color)] shrink-0 mt-0.5" />
            <div>{explanation}</div>
          </div>
        )}

        {/* TM-6: uncertainty is observable even when the answer is right (§1.8/§1.9) */}
        {onFlagGuessed && (
          <button
            type="button"
            onClick={() => {
              onFlagGuessed();
              onContinue();
            }}
            className="w-full py-2 rounded-lg border border-[var(--sub-color)]/30 text-[var(--sub-color)] hover:text-[var(--text-color)] hover:border-[var(--main-color)]/40 font-mono text-[11px] transition cursor-pointer"
          >
            I guessed — bring this one back sooner
          </button>
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
