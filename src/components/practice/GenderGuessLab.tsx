"use client";

import React, { useMemo, useState } from "react";
import { CheckCircle2, HelpCircle, RotateCcw, Sparkles, Volume2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { getLanguageDefinition } from "@/data/languages";
import { useCompendium } from "@/lib/content-client";
import { playTargetAudio } from "@/lib/audio";
import {
  buildGenderLabDeck,
  GENDER_SUFFIX_RULES,
  type GermanArticle,
} from "@/lib/practice-quizzes";

const ARTICLE_BUTTONS: Array<{
  article: GermanArticle;
  label: string;
  classes: string;
}> = [
  {
    article: "der",
    label: "der (masculine)",
    classes: "border-blue-500/40 text-blue-700 dark:text-blue-300 hover:bg-blue-500/15",
  },
  {
    article: "die",
    label: "die (feminine)",
    classes: "border-rose-500/40 text-rose-700 dark:text-rose-300 hover:bg-rose-500/15",
  },
  {
    article: "das",
    label: "das (neuter)",
    classes: "border-emerald-500/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/15",
  },
];

export const GenderGuessLab: React.FC = () => {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);

  if (activeLanguageId !== "de") {
    return (
      <div className="p-6 rounded-xl bg-[var(--bg-color)] border border-[var(--sub-color)]/25 space-y-2">
        <h2 className="text-lg font-bold text-[var(--text-color)]">
          Gender-Guess Lab (German only for now)
        </h2>
        <p className="text-sm text-[var(--sub-color)] leading-relaxed">
          The der / die / das suffix lab is built for German noun endings. {language.name} gender suffix drills are coming soon — switch to German to try this lab, or use Shadowing and Weekly Mixed Test for {language.name}.
        </p>
      </div>
    );
  }

  return <GermanGenderLabContent />;
};

const GermanGenderLabContent: React.FC = () => {
  // Load German compendium only when the active language is German
  const deCompendium = useCompendium("de");
  const deck = useMemo(
    () => buildGenderLabDeck(deCompendium.data),
    [deCompendium.data]
  );

  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState<GermanArticle | null>(null);
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showCheatSheet, setShowCheatSheet] = useState(false);

  const safeIndex = deck.length > 0 ? index % deck.length : 0;
  const item = deck[safeIndex];

  const handleGuess = (article: GermanArticle) => {
    if (!item || guess !== null) return;
    setGuess(article);
    const isCorrect = article === item.article;
    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
    setStreak((prev) => (isCorrect ? prev + 1 : 0));
  };

  const handleNext = () => {
    setGuess(null);
    setIndex((i) => (i + 1) % Math.max(1, deck.length));
  };

  const handleReset = () => {
    setGuess(null);
    setIndex(0);
    setStreak(0);
    setScore({ correct: 0, total: 0 });
  };

  if (!item) return null;

  const stemLength = Math.max(0, item.noun.length - item.rule.suffix.length);
  const stem = item.noun.slice(0, stemLength);
  const suffixPart = item.noun.slice(stemLength);
  const isCorrect = guess === item.article;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-[var(--text-color)]">
            Gender-Guess Lab (der / die / das)
          </h2>
          <p className="text-xs text-[var(--sub-color)] mt-0.5">
            Predict German noun genders from high-signal word endings instead of memorizing from scratch.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/25 text-[var(--text-color)]">
            {score.correct}/{score.total} · streak {streak}
          </span>
          <button
            type="button"
            aria-expanded={showCheatSheet}
            onClick={() => setShowCheatSheet((v) => !v)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/25 text-[var(--sub-color)] hover:text-[var(--text-color)] cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{showCheatSheet ? "Hide rules" : "Suffix rules"}</span>
          </button>
          <button
            type="button"
            onClick={handleReset}
            aria-label="Reset score"
            className="p-1.5 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/25 text-[var(--sub-color)] hover:text-[var(--text-color)] cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Main Drill Card */}
      <div className="p-6 rounded-xl bg-[var(--bg-color)] border border-[var(--sub-color)]/25 space-y-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="text-[11px] font-mono uppercase tracking-wider text-[var(--sub-color)]">
              Card {safeIndex + 1} of {deck.length} · Spot the ending
            </div>
            <div lang="de" className="text-3xl font-bold tracking-tight text-[var(--text-color)]">
              <span className="text-[var(--sub-color)] font-mono text-2xl mr-2">
                {guess ? item.article : "___"}
              </span>
              <span>{stem}</span>
              <span
                className={
                  guess
                    ? "text-[var(--main-color)] underline decoration-2 underline-offset-4"
                    : "text-[var(--text-color)]"
                }
              >
                {suffixPart}
              </span>
            </div>
            <p className="text-sm text-[var(--sub-color)]">{item.english}</p>
          </div>

          <button
            type="button"
            onClick={() =>
              playTargetAudio(guess ? `${item.article} ${item.noun}` : item.noun, "de-DE")
            }
            aria-label="Listen to German noun"
            className="p-2.5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 text-[var(--main-color)] hover:border-[var(--main-color)] transition cursor-pointer"
          >
            <Volume2 className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* der / die / das Buttons */}
        <div className="grid grid-cols-3 gap-3">
          {ARTICLE_BUTTONS.map((btn) => {
            const selected = guess === btn.article;
            const correctChoice = btn.article === item.article;
            let stateStyle = `bg-[var(--sub-alt-color)] ${btn.classes}`;
            if (guess !== null) {
              if (correctChoice) {
                stateStyle =
                  "bg-emerald-500/15 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold";
              } else if (selected) {
                stateStyle =
                  "bg-amber-500/15 border-amber-500 text-amber-900 dark:text-amber-200";
              } else {
                stateStyle =
                  "bg-[var(--sub-alt-color)]/50 border-[var(--sub-color)]/15 text-[var(--sub-color)] opacity-60";
              }
            }

            return (
              <button
                key={btn.article}
                type="button"
                disabled={guess !== null}
                onClick={() => handleGuess(btn.article)}
                className={`py-3.5 px-3 rounded-xl border text-center font-mono text-sm transition cursor-pointer disabled:cursor-default ${stateStyle}`}
              >
                <div className="text-base font-bold">{btn.article}</div>
                <div className="text-[11px] opacity-80 hidden sm:block">
                  {btn.label.split(" ")[1]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Instant Rule Explanation */}
        {guess !== null && (
          <div
            className={`p-4 rounded-xl border space-y-2 ${
              isCorrect
                ? "bg-emerald-500/10 border-emerald-500/35"
                : "bg-amber-500/10 border-amber-500/35"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-color)]">
                {isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                ) : (
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                )}
                <span>
                  {isCorrect ? "Spot on!" : `It's ${item.article} ${item.noun}`} · Rule:{" "}
                  <code className="font-mono text-[var(--main-color)]">
                    {item.rule.tileLabel ?? item.suffix}
                  </code>{" "}
                  ({item.rule.reliability})
                </span>
              </div>
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-1.5 rounded-lg text-xs font-mono font-bold bg-[var(--main-color)] text-[var(--bg-color)] cursor-pointer"
              >
                Next noun
              </button>
            </div>
            <p className="text-xs text-[var(--text-color)]/90 leading-relaxed">
              {item.rule.explanation}
            </p>
          </div>
        )}
      </div>

      {/* Collapsible Suffix Reference Table */}
      {showCheatSheet && (
        <div className="p-4 rounded-xl bg-[var(--bg-color)] border border-[var(--sub-color)]/20 space-y-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--main-color)]">
            German Suffix Heuristics Cheat Sheet
          </h3>
          <div className="grid sm:grid-cols-3 gap-2 text-xs font-mono">
            {GENDER_SUFFIX_RULES.map((rule) => (
              <div
                key={rule.suffix}
                className="p-2.5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/15 flex items-center justify-between gap-2"
              >
                <span>
                  <strong className="text-[var(--text-color)]">
                    {rule.tileLabel ?? `-${rule.suffix}`}
                  </strong>
                </span>
                <span className="text-[var(--main-color)] font-bold shrink-0">
                  {rule.article}{" "}
                  <span className="font-normal text-[var(--sub-color)] text-[10px]">
                    ({rule.reliability})
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
