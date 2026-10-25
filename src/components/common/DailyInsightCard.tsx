"use client";

import React, { useState } from "react";
import { BookOpen, Share2, Check } from "lucide-react";
import type { DailyInsight } from "@/lib/types";

interface DailyInsightCardProps {
  insight: DailyInsight;
  className?: string;
  /** Course whose insights are shown — flavours the shared-text label. */
  languageName?: string;
}

export const DailyInsightCard: React.FC<DailyInsightCardProps> = ({
  insight,
  className = "",
  languageName = "German",
}) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const textToShare = `${languageName} Etymology Note:
"${insight.german_expression}" (${insight.english_meaning})
${insight.cultural_etymology}
Principle: ${insight.takeaway_principle}`;

    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: `Brücke: ${insight.german_expression}`,
          text: textToShare,
        });
        return;
      } catch {}
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(textToShare);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article
      key={insight.day}
      className={`p-4 sm:p-5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-3 font-sans animate-in fade-in duration-300 ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--sub-color)]">
          <BookOpen className="w-3.5 h-3.5 text-[var(--main-color)]" />
          <span>etymological note · entry {insight.day}</span>
        </div>
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[var(--bg-color)] hover:bg-[var(--sub-color)]/10 text-xs font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] transition cursor-pointer"
          title="Copy/Share this note"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-[var(--main-color)]" />
              <span className="text-[var(--main-color)] text-[11px]">copied</span>
            </>
          ) : (
            <>
              <Share2 className="w-3 h-3" />
              <span className="text-[11px]">share</span>
            </>
          )}
        </button>
      </div>

      {/* Expression & Meaning */}
      <div>
        <h4 className="text-base sm:text-lg font-bold font-mono text-[var(--text-color)] tracking-tight">
          {insight.german_expression}
        </h4>
        <p className="text-sm font-mono text-[var(--main-color)]">{insight.english_meaning}</p>
      </div>

      {/* Cultural Etymology Text */}
      <p className="text-sm text-[var(--text-color)]/85 leading-relaxed font-sans">
        {insight.cultural_etymology}
      </p>

      {/* Takeaway Principle */}
      <div className="pt-2 border-t border-[var(--sub-color)]/15 text-sm text-[var(--sub-color)] font-mono">
        <span>heuristic: {insight.takeaway_principle}</span>
      </div>
    </article>
  );
};
