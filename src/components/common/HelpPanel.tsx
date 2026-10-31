"use client";

import React, { useRef } from "react";
import { usePathname } from "next/navigation";
import { BookOpen, Keyboard, X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { useDialogFocus } from "@/lib/use-dialog-focus";

interface HelpPanelProps {
  open: boolean;
  onClose: () => void;
}

const PAGE_HELP: Record<string, { title: string; tips: string[] }> = {
  home: {
    title: "the trail",
    tips: [
      "Start or resume from the card above the map.",
      "The highlighted node is the recommended next step.",
      "Topics read top-to-bottom; open a node for its lesson.",
    ],
  },
  lesson: {
    title: "a lesson",
    tips: [
      "Enter or Space advances a reading card; Backspace goes back.",
      "1–4 answer choice questions; type into derivation inputs.",
      "The summary saves completion automatically after practice.",
      "Esc restarts the current input when quick restart is on.",
    ],
  },
  review: {
    title: "review",
    tips: [
      "Space (or Show answer) reveals a card.",
      "1–4 grade the card: again, hard, good, easy.",
      "Arrow keys move back and forward through a session.",
      "Esc exits the session.",
    ],
  },
  atlas: {
    title: "the atlas",
    tips: [
      "Filter families by name, rule, or an English/target-language word.",
      "Open a family to inspect its cognates and full roster.",
      "Master Web is a zoomable poster of every word and link.",
    ],
  },
  panorama: {
    title: "the panorama",
    tips: [
      "Language tabs are view-only and do not change your course.",
      "Open a “where this is taught” link to study that language.",
      "The first table column stays in place while you scroll sideways.",
    ],
  },
  settings: {
    title: "settings",
    tips: [
      "Press / to jump to search.",
      "Language changes stay on this page; use the Guide to replay an intro.",
      "Themes and fonts are also available from the top-right control.",
    ],
  },
};

export const HelpPanel: React.FC<HelpPanelProps> = ({ open, onClose }) => {
  const pathname = usePathname();
  const lessonOpen = useViewStore((s) => s.subView?.kind === "lesson");
  const openOnboarding = useAppStore((s) => s.openOnboarding);
  const dialogRef = useRef<HTMLDivElement>(null);

  useDialogFocus({ open, containerRef: dialogRef, onEscape: onClose });

  if (!open) return null;

  const key = lessonOpen
    ? "lesson"
    : pathname === "/"
    ? "home"
    : pathname.startsWith("/review")
    ? "review"
    : pathname.startsWith("/atlas")
    ? "atlas"
    : pathname.startsWith("/panorama")
    ? "panorama"
    : pathname.startsWith("/settings")
    ? "settings"
    : "home";
  const help = PAGE_HELP[key];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 animate-in fade-in duration-150"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-panel-title"
        className="w-full sm:max-w-md rounded-t-2xl sm:rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/30 shadow-2xl p-5 sm:p-6 space-y-4 max-h-[85vh] overflow-y-auto"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--main-color)] font-semibold">
              help &amp; shortcuts
            </div>
            <h2 id="help-panel-title" className="text-lg font-bold text-[var(--text-color)]">
              {help.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded text-[var(--sub-color)] hover:text-[var(--text-color)] hover:bg-[var(--sub-alt-color)] transition cursor-pointer"
            aria-label="Close help"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <ul className="space-y-2">
          {help.tips.map((tip) => (
            <li key={tip} className="flex gap-2 text-sm text-[var(--sub-color)] leading-relaxed">
              <span className="text-[var(--main-color)] font-mono shrink-0">→</span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>

        <div className="p-3 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-2">
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--main-color)] font-semibold">
            <Keyboard className="w-3.5 h-3.5" /> keyboard
          </div>
          <div className="flex flex-wrap gap-1.5 text-[11px] font-mono text-[var(--sub-color)]">
            <span className="keycap">esc</span> back / close
            <span className="keycap">space</span> reveal / next
            <span className="keycap">1–4</span> answer / grade
            <span className="keycap">← →</span> move
          </div>
          <p className="text-[11px] font-mono text-[var(--sub-color)]">
            These work inside lessons and review, not globally.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            type="button"
            onClick={() => {
              onClose();
              openOnboarding();
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-bold text-xs font-mono hover:opacity-90 transition cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            replay the intro
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded bg-[var(--bg-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/25 text-xs font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] transition cursor-pointer"
          >
            close
            <span className="keycap text-[10px] ml-1.5">esc</span>
          </button>
        </div>
      </div>
    </div>
  );
};
