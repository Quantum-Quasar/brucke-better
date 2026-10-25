"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, Check, Share2, X } from "lucide-react";
import type { DailyInsight } from "@/lib/types";

interface DailyInsightCardProps {
  insight: DailyInsight;
  className?: string;
  /** Course whose insights are shown — flavours the shared-text label. */
  languageName?: string;
}

const DISMISSED_KEY = "brucke_etymology_note_dismissed";

/**
 * Small corner note on the trail home. It is deliberately out of the page flow
 * and hidden on phones so the map keeps the screen; the X hides that entry for
 * the rest of its day (or until the same entry comes round again).
 */
export const DailyInsightCard: React.FC<DailyInsightCardProps> = ({
  insight,
  className = "",
  languageName = "German",
}) => {
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const dismissKey = `${languageName}:${insight.day}`;

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(DISMISSED_KEY) !== dismissKey);
    } catch {
      setVisible(true);
    }
  }, [dismissKey]);

  const handleDismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(DISMISSED_KEY, dismissKey);
    } catch {}
  };

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

  if (!visible) return null;

  return (
    <aside
      aria-label="Etymology note"
      className={`fixed bottom-[5.25rem] right-3 z-30 hidden w-[17rem] rounded-lg border border-[var(--sub-color)]/20 bg-[var(--sub-alt-color)] p-3 font-sans shadow-lg shadow-black/10 animate-in fade-in duration-300 sm:block xl:bottom-6 xl:right-4 xl:w-[18rem] ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex min-w-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--sub-color)]">
          <BookOpen className="h-3.5 w-3.5 shrink-0 text-[var(--main-color)]" />
          <span className="truncate">etymology · entry {insight.day}</span>
        </span>
        <div className="flex shrink-0 items-center">
          <button
            type="button"
            onClick={handleShare}
            className="rounded p-1 text-[var(--sub-color)] transition hover:bg-[var(--sub-color)]/10 hover:text-[var(--text-color)] cursor-pointer"
            aria-label="Copy or share this note"
            title="Copy/share"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-[var(--main-color)]" />
            ) : (
              <Share2 className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="rounded p-1 text-[var(--sub-color)] transition hover:bg-[var(--sub-color)]/10 hover:text-[var(--text-color)] cursor-pointer"
            aria-label="Dismiss etymology note"
            title="Dismiss"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="mt-2">
        <h2 className="truncate font-mono text-sm font-bold tracking-tight text-[var(--text-color)]">
          {insight.german_expression}
        </h2>
        <p className="font-mono text-[11px] text-[var(--main-color)]">{insight.english_meaning}</p>
      </div>

      <p className="mt-1.5 text-[11px] leading-snug text-[var(--text-color)]/85">
        {insight.cultural_etymology}
      </p>

      <p className="mt-1.5 line-clamp-3 border-t border-[var(--sub-color)]/15 pt-1.5 font-mono text-[10px] leading-snug text-[var(--sub-color)]">
        heuristic: {insight.takeaway_principle}
      </p>
    </aside>
  );
};
