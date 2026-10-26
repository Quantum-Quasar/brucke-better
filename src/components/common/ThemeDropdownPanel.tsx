"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { Search, Check, Sparkles, Moon, Sun, Shuffle, Maximize2, Type, X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { THEME_LIST, POPULAR_THEMES, filterThemes, type ThemeFilterTab } from "@/data/themes";

/** The open dropdown body. Split from the trigger so the 187-theme table is
 * only downloaded when someone opens the theme menu. */
export default function ThemeDropdownPanel({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<ThemeFilterTab>("popular");

  const currentTheme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const openThemeSelector = useAppStore((s) => s.openThemeSelector);
  const openFontSelector = useAppStore((s) => s.openFontSelector);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(id);
  }, []);

  const filteredThemes = useMemo(() => filterThemes(query, activeTab), [activeTab, query]);

  const handleRandomTheme = () => {
    const pool = filteredThemes.length > 0 ? filteredThemes : THEME_LIST;
    const chosen = pool[Math.floor(Math.random() * pool.length)];
    if (chosen) setTheme(chosen.id);
  };

  return (
    <div className="absolute right-0 top-full mt-1.5 w-72 sm:w-80 rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/30 shadow-2xl z-50 overflow-hidden font-sans text-[var(--text-color)] animate-in fade-in slide-in-from-top-1 duration-100">
      {/* Search Header */}
      <div className="p-2.5 border-b border-[var(--sub-color)]/20 bg-[var(--sub-alt-color)]/60 space-y-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-[var(--sub-color)] absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${THEME_LIST.length} themes...`}
            className="w-full pl-8 pr-7 py-1.5 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/30 text-xs font-mono text-[var(--text-color)] placeholder-[var(--sub-color)] outline-none focus:border-[var(--main-color)] transition"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--sub-color)] hover:text-[var(--text-color)] p-0.5 cursor-pointer"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 text-[10px] font-mono overflow-x-auto pb-0.5">
          <button
            type="button"
            onClick={() => setActiveTab("popular")}
            className={`px-2 py-0.5 rounded transition cursor-pointer flex items-center gap-1 shrink-0 ${
              activeTab === "popular"
                ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold"
                : "bg-[var(--bg-color)] text-[var(--sub-color)] hover:text-[var(--text-color)]"
            }`}
          >
            <Sparkles className="w-2.5 h-2.5" />
            <span>Popular ({POPULAR_THEMES.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("dark")}
            className={`px-2 py-0.5 rounded transition cursor-pointer flex items-center gap-1 shrink-0 ${
              activeTab === "dark"
                ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold"
                : "bg-[var(--bg-color)] text-[var(--sub-color)] hover:text-[var(--text-color)]"
            }`}
          >
            <Moon className="w-2.5 h-2.5" />
            <span>Dark</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("light")}
            className={`px-2 py-0.5 rounded transition cursor-pointer flex items-center gap-1 shrink-0 ${
              activeTab === "light"
                ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold"
                : "bg-[var(--bg-color)] text-[var(--sub-color)] hover:text-[var(--text-color)]"
            }`}
          >
            <Sun className="w-2.5 h-2.5" />
            <span>Light</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`px-2 py-0.5 rounded transition cursor-pointer shrink-0 ${
              activeTab === "all"
                ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold"
                : "bg-[var(--bg-color)] text-[var(--sub-color)] hover:text-[var(--text-color)]"
            }`}
          >
            All ({THEME_LIST.length})
          </button>
        </div>
      </div>

      {/* Theme List */}
      <div className="max-h-64 overflow-y-auto p-1.5 space-y-1">
        {filteredThemes.map((theme) => {
          const isSelected = currentTheme === theme.id;

          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => {
                setTheme(theme.id);
                onClose();
              }}
              className={`w-full px-2.5 py-1.5 rounded text-left transition flex items-center justify-between cursor-pointer group ${
                isSelected
                  ? "bg-[var(--sub-alt-color)] border border-[var(--main-color)]/50"
                  : "hover:bg-[var(--sub-alt-color)]/60 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <span
                  className={`text-xs font-mono truncate ${
                    isSelected
                      ? "text-[var(--main-color)] font-bold"
                      : "text-[var(--text-color)] group-hover:text-[var(--main-color)]"
                  }`}
                >
                  {theme.name}
                </span>
                <span className="text-[9px] font-mono text-[var(--sub-color)] shrink-0">
                  {theme.isDark ? "dark" : "light"}
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Palette Swatch Preview */}
                <div
                  className="flex items-center gap-0.5 p-1 rounded border border-black/10 shrink-0"
                  style={{ backgroundColor: theme.bg }}
                  title={`${theme.name} preview`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: theme.sub }}
                  />
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: theme.main }}
                  />
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: theme.text }}
                  />
                </div>

                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-[var(--main-color)] shrink-0" />
                )}
              </div>
            </button>
          );
        })}

        {filteredThemes.length === 0 && (
          <div className="py-6 text-center text-xs font-mono text-[var(--sub-color)]">
            No themes found matching &quot;{query}&quot;
          </div>
        )}
      </div>

      {/* Dropdown Footer Actions */}
      <div className="p-2 border-t border-[var(--sub-color)]/20 bg-[var(--sub-alt-color)]/60 flex items-center justify-between text-[11px] font-mono">
        <button
          type="button"
          onClick={handleRandomTheme}
          className="inline-flex items-center gap-1 text-[var(--sub-color)] hover:text-[var(--text-color)] px-1.5 py-0.5 rounded transition cursor-pointer"
          title="Pick a random theme"
        >
          <Shuffle className="w-3 h-3 text-[var(--main-color)]" />
          <span>random</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              onClose();
              openFontSelector();
            }}
            className="inline-flex items-center gap-1 text-[var(--sub-color)] hover:text-[var(--text-color)] px-1.5 py-0.5 rounded transition cursor-pointer"
            title="Change font"
          >
            <Type className="w-3 h-3 text-[var(--main-color)]" />
            <span>font</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              openThemeSelector();
            }}
            className="inline-flex items-center gap-1 text-[var(--sub-color)] hover:text-[var(--text-color)] px-1.5 py-0.5 rounded transition cursor-pointer"
            title="Open full grid modal"
          >
            <Maximize2 className="w-3 h-3 text-[var(--main-color)]" />
            <span>all {THEME_LIST.length} grid</span>
          </button>
        </div>
      </div>
    </div>
  );
}
