"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CheckCircle2, ArrowRight, Sparkles, BookOpen, AlertCircle, Repeat, Volume2, ChevronDown, ChevronUp } from "lucide-react";
import type { VocabHint } from "@/lib/types";
import { useBackDismiss } from "@/lib/use-back-dismiss";
import { ModalDialog } from "@/components/common/ModalDialog";
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
  onFlagGuessed?: () => void;
  onContinue: () => void;
}

const ABBREV_END_RE = /(?:e\.g|i\.e|z\.\s*B|d\.\s*h|vs|Dr|Mr|Mrs|Ms|St|Nr|ca)\.$/i;

function firstSentence(text: string): { lead: string; hasRest: boolean } {
  const trimmed = text.trim();
  const re = /[.!?](?=\s+\S)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(trimmed)) !== null) {
    const end = match.index + 1;
    const candidate = trimmed.slice(0, end).trim();
    if (candidate.length < 24 || ABBREV_END_RE.test(candidate)) continue;
    if (trimmed.slice(end).trim().length > 0) {
      return { lead: candidate, hasRest: true };
    }
  }
  return { lead: trimmed, hasRest: false };
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
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setShowMore(false);
  }, [targetAnswer, explanation, affirmation]);
  const isAlmost = variant === "almost";
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);
  const spokenText = audioText ?? targetAnswer;
  const spokenLocale = audioLocale ?? language.ttsLocale;

  const explanationLead = explanation ? firstSentence(explanation) : null;
  const hasExtraDetails = Boolean(
    (vocabHints && vocabHints.length > 0) ||
    (explanation && (affirmation || explanationLead?.hasRest))
  );

  useBackDismiss(true, onContinue);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.isComposing) return;
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

  return createPortal(
    <ModalDialog onClose={onContinue} initialFocusRef={continueBtnRef} aria-labelledby="success-feedback-title" className="open:flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 animate-in fade-in duration-150">
      <div
        className={`w-full sm:max-w-md max-h-[85dvh] overflow-y-auto overscroll-contain bg-[var(--bg-color)] border-t sm:border sm:rounded-lg rounded-t-lg shadow-2xl p-5 pb-safe space-y-4 animate-in slide-in-from-bottom duration-200 font-mono ${
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

        {/* Almost Right Comparison Callout */}
        {isAlmost && userAttempt && (
          <div className="p-3 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 space-y-2">
            <div className="flex items-center gap-1.5 text-[var(--sub-color)] font-mono uppercase tracking-wider text-[11px]">
              <AlertCircle className="w-3.5 h-3.5" /> note difference
            </div>
            <div className="flex items-center justify-between text-xs font-mono bg-[var(--bg-color)] p-2 rounded border border-[var(--sub-color)]/20">
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

        {/* Answer block */}
        {literalPair ? (
          <div className="p-3.5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-2">
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
          <div className="p-3.5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-2">
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

        {/* 1-line why: affirmation if present, otherwise first sentence of explanation */}
        {affirmation ? (
          <p className="text-xs font-mono text-[var(--main-color)] flex items-center gap-2 leading-relaxed">
            <Repeat className="w-4 h-4 shrink-0" />
            <span>{affirmation}</span>
          </p>
        ) : explanationLead ? (
          <div className="text-xs text-[var(--sub-color)] leading-relaxed bg-[var(--sub-alt-color)] p-3 rounded-lg border border-[var(--sub-color)]/20 flex items-start gap-2 font-mono">
            <BookOpen className="w-4 h-4 text-[var(--main-color)] shrink-0 mt-0.5" />
            <div>{showMore ? explanation : explanationLead.lead}</div>
          </div>
        ) : null}

        {/* Extra details behind compact "More" toggle */}
        {hasExtraDetails && (
          <div className="space-y-2.5">
            <button
              type="button"
              onClick={() => setShowMore((prev) => !prev)}
              aria-expanded={showMore}
              aria-controls="success-feedback-more"
              className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--main-color)] hover:underline cursor-pointer"
            >
              {showMore ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              <span>{showMore ? "Less" : "More"}</span>
            </button>

            {showMore && (
              <div id="success-feedback-more" className="space-y-2.5">
                {affirmation && explanation && (
                  <div className="text-xs text-[var(--sub-color)] leading-relaxed bg-[var(--sub-alt-color)] p-3 rounded-lg border border-[var(--sub-color)]/20 flex items-start gap-2 font-mono">
                    <BookOpen className="w-4 h-4 text-[var(--main-color)] shrink-0 mt-0.5" />
                    <div>{explanation}</div>
                  </div>
                )}

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
              </div>
            )}
          </div>
        )}

        {/* TM-6: uncertainty is observable even when the answer is right */}
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
    </ModalDialog>,
    document.body
  );
};
