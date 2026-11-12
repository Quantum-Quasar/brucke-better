"use client";

import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { HelpCircle, Star } from "lucide-react";
import { ThemeDropdown } from "@/components/common/ThemeDropdown";
import { HelpPanel } from "@/components/common/HelpPanel";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { isModifiedClick } from "@/lib/app-navigation";
import { captureScroll } from "@/lib/scroll-memory";
import { getLanguageDefinition } from "@/data/languages";
import { getWordCount } from "@/data/word-counts";
import { rememberFocusOpener } from "@/lib/focus-return";

const GOLD_STAR = "#eab308";
const PURPLE_STAR = "#a78bfa";

const SearchDialog = dynamic(() => import("./SearchDialog"), { ssr: false });

function canOpenSearch(event: KeyboardEvent): boolean {
  if (event.defaultPrevented || event.key !== "/" || event.ctrlKey || event.metaKey || event.altKey || event.isComposing) return false;
  const target = event.target instanceof HTMLElement ? event.target : null;
  if (target?.closest("input, textarea, select, [contenteditable]:not([contenteditable='false']), [role='textbox']")) return false;
  return !Array.from(document.querySelectorAll<HTMLElement>("[role='dialog'], [role='alertdialog'], dialog[open]"))
    .some((dialog) => dialog.getClientRects().length > 0);
}

// Slim identity + customization bar. All destinations live in the bottom dock (BottomNav).
export const TopNav: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);
  const [helpOpen, setHelpOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const searchTriggerRef = React.useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const seenCount = useAppStore(
    (s) =>
      Object.entries(s.wordMastery).filter(
        ([id, m]) =>
          (m === "encountered" || m === "mastered") &&
          !/^(sentence_|article_|compound_|trap_)/.test(id)
      ).length
  );
  const completedCount = useAppStore((s) => s.completedLessons.length);
  const purpleCount = useAppStore(
    (s) => Object.values(s.lessonStars).filter((star) => star === "purple").length
  );
  const showMasteryCounter = useAppStore((s) => s.settings.showMasteryCounter);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);
  const lessonOpen = useViewStore((s) => s.subView?.kind === "lesson");
  const closeSubview = useViewStore((s) => s.closeSubview);
  const showTrailStars = pathname === "/" && !lessonOpen && language.status === "available";

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const handleSearch = (event: KeyboardEvent) => {
      if (!canOpenSearch(event)) return;
      event.preventDefault();
      searchTriggerRef.current?.focus();
      setSearchOpen(true);
    };
    document.addEventListener("keydown", handleSearch);
    return () => document.removeEventListener("keydown", handleSearch);
  }, []);

  const totalWords = mounted ? getWordCount(activeLanguageId) : 0;
  const displaySeen = mounted ? seenCount : 0;

  return (
    <>
    <header className="sticky top-0 z-40 w-full bg-[var(--bg-color)] border-b border-[var(--sub-color)]/20 transition-colors">
      <div className="max-w-6xl mx-auto px-safe-page h-14 flex items-center justify-between gap-2">
        {/* Logo & Identity */}
        <Link
          href="/"
          onClick={(event) => {
            if (isModifiedClick(event)) return;
            if (pathname !== "/") captureScroll(pathname);
            closeSubview();
          }}
          className="flex min-h-11 items-center gap-2 group"
        >
          <span className="font-bold text-lg text-[var(--main-color)] font-mono tracking-tighter">bü</span>
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-[var(--text-color)] text-base tracking-tight group-hover:text-[var(--main-color)] transition">
              brücke
            </span>
            <span className="text-[10px] font-mono text-[var(--sub-color)] hidden sm:inline">
              {language.name.toLowerCase()} through english
            </span>
          </div>
        </Link>

        {/* Right side: customization & guide (navigation lives in the bottom dock) */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-3 font-mono text-xs">
          <input
            ref={searchTriggerRef}
            type="search"
            readOnly
            aria-label="Search words and lessons"
            aria-haspopup="dialog"
            aria-expanded={searchOpen}
            placeholder="Search… /"
            onClick={() => setSearchOpen(true)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setSearchOpen(true);
              }
            }}
            className="min-h-11 min-w-0 w-16 sm:w-40 rounded-lg border border-[var(--sub-color)]/30 bg-[var(--sub-alt-color)] px-3 text-[var(--text-color)] placeholder:text-[var(--sub-color)] cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--main-color)]"
          />
          {mounted && showMasteryCounter && displaySeen > 0 && (
            <div
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--sub-alt-color)] text-[var(--sub-color)] text-[11px]"
              title="Words you have met so far. Words become mastered only after repeated successful reviews."
            >
              <span className="text-[var(--main-color)] font-bold">{displaySeen}</span>
              <span>/</span>
              <span>{totalWords} words seen</span>
            </div>
          )}

          {showTrailStars && (
            <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px]">
              <span
                className="inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-1 rounded-full bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 text-[var(--sub-color)]"
                title={`${completedCount} lessons completed — every lesson is one star`}
                aria-label={`${completedCount} stars`}
              >
                <Star
                  className="w-3 h-3"
                  style={{ color: GOLD_STAR, fill: GOLD_STAR }}
                  strokeWidth={0}
                  aria-hidden
                />
                <span className="text-[var(--text-color)] font-bold">{completedCount}</span>
                <span className="hidden sm:inline">stars</span>
              </span>
              <span
                className="inline-flex items-center gap-1 px-1.5 sm:px-2.5 py-1 rounded-full bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 text-[var(--sub-color)]"
                title={`${purpleCount} flawless lessons (purple stars)`}
                aria-label={`${purpleCount} flawless lessons`}
              >
                <Star
                  className="w-3 h-3"
                  style={{
                    color: PURPLE_STAR,
                    fill: PURPLE_STAR,
                    opacity: purpleCount > 0 ? 1 : 0.35,
                  }}
                  strokeWidth={0}
                  aria-hidden
                />
                <span className={purpleCount > 0 ? "text-[var(--text-color)] font-bold" : ""}>
                  {purpleCount}
                </span>
                <span className="hidden sm:inline">flawless</span>
              </span>
            </div>
          )}

          <ThemeDropdown />

          <button
            type="button"
            onClick={() => { rememberFocusOpener(); setHelpOpen(true); }}
            className="inline-flex min-h-11 min-w-11 items-center justify-center gap-1 rounded px-2.5 py-2 text-[var(--sub-color)] transition hover:bg-[var(--sub-alt-color)] hover:text-[var(--text-color)] cursor-pointer"
            title="Help and shortcuts"
            aria-label="Open help and shortcuts"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">guide</span>
          </button>
        </div>
      </div>
    </header>
    <HelpPanel open={helpOpen} onClose={() => setHelpOpen(false)} />
    {searchOpen && <SearchDialog key={activeLanguageId} onClose={() => setSearchOpen(false)} />}
    </>
  );
};
