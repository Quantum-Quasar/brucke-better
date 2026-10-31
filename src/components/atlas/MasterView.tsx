"use client";

import { ArrowLeft, Share2 } from "lucide-react";
import { MasterConstellation } from "@/components/atlas/MasterConstellation";

export function MasterView({ onBack }: { onBack: () => void }) {
  return (
    <div className="relative h-[calc(100dvh-110px)] font-sans overflow-hidden">
      <MasterConstellation />

      {/* Always-visible caption: the web is a poster, not a mystery screen. */}
      <div className="absolute top-3 left-3 right-3 sm:right-auto z-10 sm:max-w-sm">
        <div className="rounded-lg bg-[var(--sub-alt-color)]/95 backdrop-blur border border-[var(--sub-color)]/25 px-3 py-2 shadow-sm">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[var(--main-color)]" />
            <span className="text-sm font-bold text-[var(--text-color)]">Master Web</span>
          </div>
          <p className="hidden sm:block text-[11px] text-[var(--sub-color)] pt-1.5 leading-relaxed">
            Every family, word, and phrase in the active course, linked into one graph. Word dots
            open the word drawer; click a labelled shape for its details.
          </p>
          <div className="flex items-center justify-between gap-2 pt-1.5">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] transition cursor-pointer"
            >
              <ArrowLeft className="w-3 h-3" /> back to atlas
            </button>
            <span className="text-[10px] font-mono text-[var(--sub-color)]/80">
              scroll to explore · +/− to zoom
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
