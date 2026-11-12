"use client";

import React from "react";
import { Volume2 } from "lucide-react";
import { alignShiftPair } from "@/lib/shift-annotator";
import { useAppStore } from "@/lib/store";
import { getLanguageDefinition } from "@/data/languages";
import { GenderBadge } from "@/components/common/GenderBadge";
import { playTargetAudio } from "@/lib/audio";
import { wordWithArticle } from "@/lib/gender";
import type { Gender } from "@/lib/types";

interface ShiftPairProps {
  english: string;
  german: string;
  gender?: Gender | null;
  rule?: string;
  wordId?: string;
  className?: string;
  showDetailsOnClick?: boolean;
}

export const ShiftPair: React.FC<ShiftPairProps> = React.memo(({
  english,
  german,
  gender,
  rule,
  wordId,
  className = "",
  showDetailsOnClick = true,
}) => {
  const openWordDrawer = useAppStore((s) => s.openWordDrawer);
  const mastery = useAppStore((s) => (wordId ? s.wordMastery[wordId] || "unexplored" : "unexplored"));
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const ttsLocale = getLanguageDefinition(activeLanguageId).ttsLocale;

  const targetId = wordId || german.toLowerCase();
  const annotation = alignShiftPair(english, german, rule);

  // Border & badge styling based on mastery state
  const getMasteryIndicator = () => {
    switch (mastery) {
      case "mastered":
        return { badge: "✓", border: "border-[var(--main-color)] bg-[var(--main-color)]/10 text-[var(--main-color)]" };
      case "encountered":
        return { badge: "●", border: "border-[var(--main-color)]/60 bg-[var(--main-color)]/10 text-[var(--main-color)]" };
      case "explored":
        return { badge: "○", border: "border-[var(--sub-color)]/60 bg-[var(--sub-color)]/10 text-[var(--sub-color)]" };
      default:
        return { badge: "·", border: "border-[var(--sub-color)]/20 bg-transparent text-[var(--sub-color)]" };
    }
  };

  const indicator = getMasteryIndicator();

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-2.5 px-3 py-1.5 rounded border transition-all duration-200 ${indicator.border} ${className}`}
    >
      {/* English Cognate */}
      <span className="text-[var(--sub-color)] font-normal tracking-wide text-sm">
        {annotation.englishSegments.map((seg, i) => (
          <span
            key={i}
            className={seg.isChanged ? "text-[var(--sub-color)] underline decoration-[var(--sub-color)]/50 decoration-1 underline-offset-4" : "text-[var(--text-color)]"}
          >
            {seg.text}
          </span>
        ))}
      </span>

      {/* Shift Rule Indicator */}
      <div className="flex items-center gap-1 text-[11px] font-mono font-medium text-[var(--main-color)] bg-[var(--sub-alt-color)] px-1.5 py-0.5 rounded border border-[var(--sub-color)]/20">
        <span>→</span>
        <span>{annotation.shiftRule}</span>
      </div>

      {/* German Word + Gender */}
      <button
        type="button"
        onClick={() => showDetailsOnClick && openWordDrawer(targetId)}
        className={`group inline-flex items-center gap-2 font-semibold text-sm transition-transform active:scale-95 ${
          showDetailsOnClick ? "cursor-pointer hover:underline decoration-[var(--main-color)]/50 underline-offset-4" : ""
        }`}
        aria-label={`View etymology and details for ${german}`}
      >
        <GenderBadge gender={gender} size="sm" />

        <span className="text-[var(--text-color)] group-hover:text-[var(--main-color)]">
          {annotation.germanSegments.map((seg, i) => (
            <span
              key={i}
              className={seg.isChanged ? "text-[var(--main-color)] font-mono font-bold bg-[var(--main-color)]/15 px-0.5 rounded" : "text-[var(--text-color)]"}
            >
              {seg.text}
            </span>
          ))}
        </span>
      </button>

      {/* Audio Pronunciation Button */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          const spoken = wordWithArticle(gender, german, activeLanguageId);
          playTargetAudio(spoken, ttsLocale);
        }}
        className="p-1 rounded text-[var(--sub-color)] hover:text-[var(--main-color)] hover:bg-[var(--sub-alt-color)] transition cursor-pointer"
        title={`Listen to the pronunciation of "${german}"`}
        aria-label={`Listen to the pronunciation of ${german}`}
      >
        <Volume2 className="w-3.5 h-3.5" />
      </button>

      {/* Mastery Badge */}
      <span
        title={`Mastery state: ${mastery}`}
        className="w-4 h-4 rounded-full flex items-center justify-center text-[11px] font-mono opacity-80"
      >
        {indicator.badge}
      </span>
    </div>
  );
});

ShiftPair.displayName = "ShiftPair";
