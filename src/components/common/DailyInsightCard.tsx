"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { BookOpen, Check, Share2, Sparkles, Volume2, X } from "lucide-react";
import { getLanguageDefinition } from "@/data/languages";
import { playTargetAudio } from "@/lib/audio";
import { useCompendium } from "@/lib/content-client";
import { wordWithArticle } from "@/lib/gender";
import { readStorageString, writeStorageString } from "@/lib/safe-storage";
import { useAppStore } from "@/lib/store";
import type { DailyInsight } from "@/lib/types";

interface DailyInsightCardProps {
  insight: DailyInsight;
  className?: string;
  /** Course whose insights are shown — flavours the shared-text label. */
  languageName?: string;
}

const DISMISSED_KEY = "brucke_etymology_note_dismissed";

function localDateKey(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function hashDateKey(dateKey: string): number {
  let h = 0;
  for (let i = 0; i < dateKey.length; i++) {
    h = (h * 31 + dateKey.charCodeAt(i)) >>> 0;
  }
  return h;
}

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
  const [isDesktop, setIsDesktop] = useState(false);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const wordMastery = useAppStore((s) => s.wordMastery);
  const openWordDrawer = useAppStore((s) => s.openWordDrawer);
  const language = getLanguageDefinition(activeLanguageId);

  const dismissKey = `${languageName}:${insight.day}`;
  const storageKey = `${DISMISSED_KEY}:${languageName}`;

  useEffect(() => {
    setVisible(readStorageString(storageKey) !== dismissKey);
  }, [dismissKey, storageKey]);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Gate the ~496 KB compendium fetch so mobile or dismissed cards never download it.
  const { data: compendium } = useCompendium(visible && isDesktop ? activeLanguageId : "");

  const wordOfTheDay = useMemo(() => {
    if (!compendium) return null;
    const learnedIds = Object.entries(wordMastery)
      .filter(([, state]) => state === "encountered" || state === "mastered")
      .map(([id]) => id)
      .filter((id) => Boolean(compendium.words?.[id]))
      .sort();
    if (learnedIds.length === 0) return null;
    const idx = hashDateKey(localDateKey()) % learnedIds.length;
    return compendium.words[learnedIds[idx]] ?? null;
  }, [wordMastery, compendium]);

  const handleDismiss = () => {
    setVisible(false);
    writeStorageString(storageKey, dismissKey);
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
      className={`fixed bottom-[calc(5.25rem+env(safe-area-inset-bottom))] right-3 z-30 hidden w-[17rem] rounded-lg border border-[var(--sub-color)]/20 bg-[var(--sub-alt-color)] p-3 font-sans shadow-lg shadow-black/10 animate-in fade-in duration-300 sm:block xl:bottom-6 xl:right-4 xl:w-[18rem] ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="flex min-w-0 items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--sub-color)]">
          <BookOpen className="h-3.5 w-3.5 shrink-0 text-[var(--main-color)]" />
          <span className="truncate">{wordOfTheDay ? "word of the day" : `etymology · entry ${insight.day}`}</span>
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
      {wordOfTheDay && (
        <div className="mt-2.5 pt-2.5 border-t border-[var(--sub-color)]/15 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => openWordDrawer(wordOfTheDay.id)}
              title={`${wordOfTheDay.target_word} — ${wordOfTheDay.english_meaning}`}
              className="text-left font-mono text-xs font-bold text-[var(--main-color)] hover:underline cursor-pointer truncate"
            >
              {wordOfTheDay.target_word} — {wordOfTheDay.english_meaning}
            </button>
            <button
              type="button"
              onClick={() =>
                playTargetAudio(
                  wordWithArticle(wordOfTheDay.gender, wordOfTheDay.target_word, activeLanguageId),
                  language.ttsLocale
                )
              }
              className="shrink-0 rounded p-1 text-[var(--sub-color)] transition hover:bg-[var(--sub-color)]/10 hover:text-[var(--main-color)] cursor-pointer"
              aria-label={`Listen to ${wordOfTheDay.target_word}`}
              title={`Listen to ${wordOfTheDay.target_word}`}
            >
              <Volume2 className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
          <Link
            href="/review"
            className="inline-flex items-center gap-1 rounded border border-[var(--main-color)]/30 bg-[var(--main-color)]/10 px-2 py-1 font-mono text-[10px] font-bold text-[var(--main-color)] hover:bg-[var(--main-color)]/20 transition"
          >
            <Sparkles className="h-3 w-3" />
            <span>Practice in Review →</span>
          </Link>
        </div>
      )}
    </aside>
  );
};
