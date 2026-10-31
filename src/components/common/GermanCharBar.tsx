"use client";

import React from "react";
import { useAppStore } from "@/lib/store";
import { getLanguageDefinition } from "@/data/languages";

interface GermanCharBarProps {
  onInsert: (char: string) => void;
  className?: string;
}

/**
 * Quick-insert bar for the active language's special characters.
 * (Keeps its historical GermanCharBar name; characters come from the
 * language registry, so other languages get their own accents for free.)
 */
export const GermanCharBar: React.FC<GermanCharBarProps> = ({ onInsert, className = "" }) => {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);

  return (
    <div className={`flex flex-wrap items-center gap-1.5 p-1.5 rounded bg-[var(--sub-alt-color)]/50 border border-[var(--sub-color)]/20 ${className}`}>
      <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--sub-color)] px-1.5 hidden sm:inline">
        {language.charBarLabel}:
      </span>
      {language.specialChars.map(([char, digraph]) => (
        <button
          key={char}
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onInsert(char)}
          title={`Insert ${char}${digraph ? ` (or type "${digraph}" with lazy mode on)` : ""}`}
          className="group relative flex h-11 min-w-11 flex-col items-center justify-center rounded bg-[var(--bg-color)] px-2 hover:bg-[var(--main-color)]/10 active:scale-95 border border-[var(--sub-color)]/30 hover:border-[var(--main-color)]/40 transition-colors cursor-pointer sm:h-9 sm:min-w-9"
        >
          <span className="text-sm font-mono font-medium text-[var(--main-color)]">{char}</span>
          <span className="text-[9px] font-mono text-[var(--sub-color)] leading-none hidden sm:block">
            {digraph}
          </span>
        </button>
      ))}
    </div>
  );
};
