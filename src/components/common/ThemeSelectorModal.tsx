"use client";

import React, { useRef } from "react";
import { Search, X, Check, Sparkles, Moon, Sun, Palette } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { THEME_LIST, POPULAR_THEMES } from "@/data/themes";
import { useDialogFocus } from "@/lib/use-dialog-focus";
import { ThemeSwatch, useThemeFilter } from "@/components/common/theme-picker";

export const ThemeSelectorModal: React.FC = () => {
  const isOpen = useAppStore((s) => s.isThemeSelectorOpen);
  const closeThemeSelector = useAppStore((s) => s.closeThemeSelector);
  const currentTheme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);

  const { query, setQuery, activeTab, setActiveTab, filteredThemes } = useThemeFilter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useDialogFocus({
    open: isOpen,
    containerRef: dialogRef,
    initialFocusRef: searchInputRef,
    onEscape: closeThemeSelector,
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="theme-selector-title"
        className="w-full max-w-3xl max-h-[85vh] flex flex-col rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/25 text-[var(--text-color)] shadow-2xl overflow-hidden font-sans"
      >
        {/* Header */}
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
              className="p-1 rounded text-[var(--sub-color)] hover:text-[var(--text-color)] hover:bg-[var(--sub-alt-color)] transition cursor-pointer"
              aria-label="Close theme selector"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search and Tabs */}
        <div className="p-4 border-b border-[var(--sub-color)]/15 space-y-3 bg-[var(--sub-alt-color)]/40">
          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--sub-color)] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search themes by name (e.g. nord, dracula, serika, cyberpunk)..."
              className="w-full pl-9 pr-4 py-2 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/30 text-sm font-mono text-[var(--text-color)] placeholder-[var(--sub-color)] outline-none focus:border-[var(--main-color)] transition"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
            <button
              type="button"
              onClick={() => setActiveTab("popular")}
              className={`px-3 py-1 rounded transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === "popular"
                  ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold"
                  : "bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)]"
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Popular ({POPULAR_THEMES.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`px-3 py-1 rounded transition cursor-pointer ${
                activeTab === "all"
                  ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold"
                  : "bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)]"
              }`}
            >
              All ({THEME_LIST.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("dark")}
              className={`px-3 py-1 rounded transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === "dark"
                  ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold"
                  : "bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)]"
              }`}
            >
              <Moon className="w-3 h-3" />
              <span>Dark ({THEME_LIST.filter((t) => t.isDark).length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("light")}
              className={`px-3 py-1 rounded transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === "light"
                  ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold"
                  : "bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)]"
              }`}
            >
              <Sun className="w-3 h-3" />
              <span>Light ({THEME_LIST.filter((t) => !t.isDark).length})</span>
            </button>
          </div>
        </div>

        {/* Themes Grid */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {filteredThemes.map((theme) => {
            const isSelected = currentTheme === theme.id;

            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => setTheme(theme.id)}
                className={`p-3 rounded text-left transition flex items-center justify-between border cursor-pointer ${
                  isSelected
                    ? "border-[var(--main-color)] bg-[var(--sub-alt-color)] shadow-sm"
                    : "border-[var(--sub-color)]/20 hover:border-[var(--sub-color)]/60 bg-[var(--bg-color)] hover:bg-[var(--sub-alt-color)]/50"
                }`}
                style={{
                  outline: isSelected ? "1px solid var(--main-color)" : "none",
                }}
              >
                <div className="min-w-0 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-medium truncate">
                      {theme.name}
                    </span>
                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-[var(--main-color)] shrink-0" />
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-[var(--sub-color)]">
                    {theme.isDark ? "dark" : "light"}
                  </span>
                </div>

                {/* 4-Color Preview Swatch (bg, sub, main, text) */}
                <ThemeSwatch theme={theme} />
              </button>
            );
          })}

          {filteredThemes.length === 0 && (
            <div className="col-span-full py-12 text-center text-sm text-[var(--sub-color)] font-mono">
              No themes matching &quot;{query}&quot;
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-3 border-t border-[var(--sub-color)]/20 bg-[var(--sub-alt-color)]/60 flex items-center justify-between text-xs font-mono text-[var(--sub-color)]">
          <span>
            Current:{" "}
            <span className="text-[var(--main-color)] font-bold">{currentTheme}</span>
          </span>
          <span>Instant preview · Auto-saved</span>
        </div>
      </div>
    </div>
  );
};
