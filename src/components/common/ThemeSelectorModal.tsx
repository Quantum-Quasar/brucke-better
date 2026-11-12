"use client";

import React, { useRef } from "react";
import { Palette, X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { THEME_LIST } from "@/data/themes";
import { useBackDismiss } from "@/lib/use-back-dismiss";
import { ModalDialog } from "@/components/common/ModalDialog";
import { ThemeBrowser } from "@/components/common/ThemeBrowser";

export const ThemeSelectorModal: React.FC = () => {
  const isOpen = useAppStore((s) => s.isThemeSelectorOpen);
  const closeThemeSelector = useAppStore((s) => s.closeThemeSelector);
  const currentTheme = useAppStore((s) => s.theme);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useBackDismiss(isOpen, closeThemeSelector);

  if (!isOpen) return null;

  return (
    <ModalDialog
      ref={dialogRef}
      onClose={closeThemeSelector}
      aria-labelledby="theme-selector-title"
      className="open:flex items-center justify-center p-3 sm:p-4 bg-black/75"
    >
      <div className="w-full max-w-3xl max-h-[85dvh] flex flex-col rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/25 text-[var(--text-color)] shadow-2xl overflow-hidden font-sans">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--sub-color)]/20">
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4 text-[var(--main-color)]" />
            <h2 id="theme-selector-title" className="text-base font-bold tracking-tight">Select Theme</h2>
            <span className="text-xs font-mono text-[var(--sub-color)] px-2 py-0.5 rounded bg-[var(--sub-alt-color)]">
              {THEME_LIST.length} themes
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[var(--sub-color)] hidden sm:inline">
              [esc] to close
            </span>
            <button
              type="button"
              onClick={closeThemeSelector}
              className="inline-flex h-11 w-11 items-center justify-center rounded text-[var(--sub-color)] hover:text-[var(--text-color)] hover:bg-[var(--sub-alt-color)] transition cursor-pointer"
              aria-label="Close theme selector"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <ThemeBrowser autoFocus />

        {/* Footer info bar */}
        <div className="px-5 py-3 border-t border-[var(--sub-color)]/20 bg-[var(--sub-alt-color)]/60 flex items-center justify-between text-xs font-mono text-[var(--sub-color)]">
          <span>
            Current:{" "}
            <span className="text-[var(--main-color)] font-bold">{currentTheme}</span>
          </span>
          <span>Instant preview · Auto-saved</span>
        </div>
      </div>
    </ModalDialog>
  );
};
