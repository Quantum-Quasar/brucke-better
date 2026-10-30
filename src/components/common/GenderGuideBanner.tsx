"use client";

// ponytail: informative, dismissible gender guide banner and compact legend —
// one component for every language's article system, not just German.

import React, { useState, useEffect } from "react";
import { Info, X, HelpCircle } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { getLanguageDefinition } from "@/data/languages";
import { GenderBadge } from "./GenderBadge";

interface GenderGuideBannerProps {
  compact?: boolean;
}

const COLOR_TEXT: Record<string, string> = {
  blue: "text-blue-700 dark:text-blue-400",
  rose: "text-rose-700 dark:text-rose-400",
  emerald: "text-emerald-700 dark:text-emerald-400",
};

const COLOR_BORDER: Record<string, string> = {
  blue: "border-blue-500/30",
  rose: "border-rose-500/30",
  emerald: "border-emerald-500/30",
};

const EXAMPLES: Record<string, Array<Array<{ word: string; gloss: string }>>> = {
  de: [
    [
      { word: "der Arm", gloss: "the arm" },
      { word: "der Bruder", gloss: "the brother" },
    ],
    [
      { word: "die Hand", gloss: "the hand" },
      { word: "die Nacht", gloss: "the night" },
    ],
    [
      { word: "das Wasser", gloss: "the water" },
      { word: "das Buch", gloss: "the book" },
    ],
  ],
  es: [
    [
      { word: "el brazo", gloss: "the arm" },
      { word: "el hermano", gloss: "the brother" },
    ],
    [
      { word: "la mano", gloss: "the hand" },
      { word: "la noche", gloss: "the night" },
    ],
  ],
  fr: [
    [
      { word: "le bras", gloss: "the arm" },
      { word: "le frère", gloss: "the brother" },
    ],
    [
      { word: "la main", gloss: "the hand" },
      { word: "la nuit", gloss: "the night" },
    ],
  ],
  nl: [
    [
      { word: "de arm", gloss: "the arm" },
      { word: "de broer", gloss: "the brother" },
    ],
    [
      { word: "het huis", gloss: "the house" },
      { word: "het boek", gloss: "the book" },
    ],
  ],
};

export const GenderGuideBanner: React.FC<GenderGuideBannerProps> = ({ compact = false }) => {
  const [mounted, setMounted] = useState(false);
  const hasSeenGenderIntro = useAppStore((s) => s.hasSeenGenderIntro);
  const dismissGenderIntro = useAppStore((s) => s.dismissGenderIntro);
  const openGenderIntro = useAppStore((s) => s.openGenderIntro);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);
  const genderSystem = language.genderSystem;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!genderSystem) return null;

  const articles = genderSystem.articles;
  const examples = EXAMPLES[language.id] ?? [];

  if (!mounted) {
    if (compact) {
      return (
        <div
          className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-xs font-mono text-[var(--sub-color)] opacity-0 pointer-events-none"
          aria-hidden="true"
        >
          {articles.map((article) => (
            <span key={article}>{article}</span>
          ))}
        </div>
      );
    }
    return null;
  }

  if (compact) {
    return (
      <button
        type="button"
        onClick={() => openGenderIntro()}
        className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[var(--sub-alt-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/20 text-xs font-mono text-[var(--sub-color)] transition cursor-pointer"
        title={`Click to view the ${language.name} article colour guide`}
        aria-label={`View the ${language.name} article colour guide`}
      >
        {articles.map((article, i) => (
          <span
            key={article}
            className={`font-bold ${COLOR_TEXT[genderSystem.colors[i]] ?? "text-[var(--text-color)]"}`}
          >
            {article}
          </span>
        ))}
        <HelpCircle className="w-3.5 h-3.5 text-[var(--sub-color)] ml-0.5" />
      </button>
    );
  }

  if (hasSeenGenderIntro) return null;

  return (
    <div className="p-4 rounded bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-3 animate-in fade-in duration-150">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--main-color)] font-bold">
          <Info className="w-4 h-4" />
          <span>Grammatical gender in {language.name}</span>
        </div>
        <button
          type="button"
          onClick={() => dismissGenderIntro()}
          className="text-[var(--sub-color)] hover:text-[var(--text-color)] p-1 rounded hover:bg-[var(--bg-color)] transition cursor-pointer"
          title="Dismiss"
          aria-label="Dismiss grammatical gender banner"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-sm text-[var(--sub-color)] leading-relaxed">
        In {language.name}, <strong className="text-[var(--text-color)]">nouns carry grammatical gender</strong>.
        Brücke visualizes this with high-contrast badges so you absorb the article by sight:
      </p>

      <div
        className={`grid grid-cols-1 gap-2.5 pt-1 ${
          articles.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"
        }`}
      >
        {articles.map((article, i) => (
          <div
            key={article}
            className={`p-3 rounded-lg bg-[var(--bg-color)] border space-y-1 ${
              COLOR_BORDER[genderSystem.colors[i]] ?? "border-[var(--sub-color)]/30"
            }`}
          >
            <div className="flex items-center justify-between">
              <GenderBadge gender={article} size="sm" />
              <span
                className={`text-[11px] font-mono font-bold ${
                  COLOR_TEXT[genderSystem.colors[i]] ?? "text-[var(--text-color)]"
                }`}
              >
                {genderSystem.labels[i]}
              </span>
            </div>
            <p className="text-[11px] text-[var(--sub-color)] pt-0.5">
              e.g.{" "}
              {(examples[i] ?? []).map((example, j) => (
                <React.Fragment key={example.word}>
                  {j > 0 && ", "}
                  <strong className="text-[var(--text-color)]">{example.word}</strong> ({example.gloss})
                </React.Fragment>
              ))}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-[var(--sub-color)]/10 text-xs text-[var(--sub-color)]">
        <span>Never learn a {language.name} noun without its article.</span>
        <button
          type="button"
          onClick={() => dismissGenderIntro()}
          className="px-3.5 py-1 rounded-lg bg-[var(--main-color)] hover:opacity-90 text-[var(--bg-color)] font-bold font-mono text-xs transition cursor-pointer"
        >
          Understood ✓
        </button>
      </div>
    </div>
  );
};
