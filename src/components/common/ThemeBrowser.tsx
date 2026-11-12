"use client";

import { useEffect, useRef } from "react";
import { Check, Moon, Search, Sparkles, Sun, X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { POPULAR_THEMES, THEME_LIST } from "@/data/themes";
import { ThemeSwatch, useThemeFilter } from "@/components/common/theme-picker";

interface ThemeBrowserProps {
  compact?: boolean;
  autoFocus?: boolean;
  onPick?: () => void;
}

/** Search, filter tabs and theme list shared by the popover and the grid modal. */
export function ThemeBrowser({ compact = false, autoFocus = false, onPick }: ThemeBrowserProps) {
  const currentTheme = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const { query, setQuery, activeTab, setActiveTab, filteredThemes } = useThemeFilter(currentTheme);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!autoFocus) return;
    const id = setTimeout(() => inputRef.current?.focus(), 50);
    return () => clearTimeout(id);
  }, [autoFocus]);

  const tabClass = (active: boolean) =>
    `${compact ? "min-h-9 rounded px-2 py-1 text-[10px]" : "px-3 py-1 text-xs"} transition cursor-pointer flex items-center gap-1 shrink-0 ${
      active
        ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold"
        : `${compact ? "bg-[var(--bg-color)]" : "bg-[var(--sub-alt-color)]"} text-[var(--sub-color)] hover:text-[var(--text-color)]`
    }`;

  return (
    <div className={compact ? "" : "flex min-h-0 flex-1 flex-col"}>
      <div className={`${compact ? "p-2.5 border-b space-y-2" : "p-4 border-b space-y-3"} border-[var(--sub-color)]/20 bg-[var(--sub-alt-color)]/60`}>
        <div className="relative">
          <Search className={`${compact ? "w-3.5 h-3.5 left-2.5" : "w-4 h-4 left-3"} text-[var(--sub-color)] absolute top-1/2 -translate-y-1/2`} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={compact ? `Search ${THEME_LIST.length} themes...` : "Search themes by name (e.g. nord, dracula, serika, cyberpunk)..."}
            className={`min-h-11 w-full rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/30 font-mono text-[var(--text-color)] placeholder-[var(--sub-color)] outline-none focus:border-[var(--main-color)] transition ${compact ? "pl-8 pr-7 py-1.5 text-xs" : "pl-9 pr-4 py-2 text-sm"}`}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--sub-color)] hover:text-[var(--text-color)] p-1.5 cursor-pointer"
              aria-label="Clear theme search"
            >
              <X className={compact ? "w-3 h-3" : "w-4 h-4"} />
            </button>
          )}
        </div>

        <div className={`flex items-center gap-1 font-mono overflow-x-auto pb-0.5 ${compact ? "text-[10px]" : "gap-1.5 text-xs"}`}>
          <button type="button" onClick={() => setActiveTab("popular")} aria-pressed={activeTab === "popular"} className={tabClass(activeTab === "popular")}>
            <Sparkles className={compact ? "w-2.5 h-2.5" : "w-3 h-3"} />
            <span>Recommended ({POPULAR_THEMES.length})</span>
          </button>
          <button type="button" onClick={() => setActiveTab("dark")} aria-pressed={activeTab === "dark"} className={tabClass(activeTab === "dark")}>
            <Moon className={compact ? "w-2.5 h-2.5" : "w-3 h-3"} />
            <span>Dark{compact ? "" : ` (${THEME_LIST.filter((theme) => theme.isDark).length})`}</span>
          </button>
          <button type="button" onClick={() => setActiveTab("light")} aria-pressed={activeTab === "light"} className={tabClass(activeTab === "light")}>
            <Sun className={compact ? "w-2.5 h-2.5" : "w-3 h-3"} />
            <span>Light{compact ? "" : ` (${THEME_LIST.filter((theme) => !theme.isDark).length})`}</span>
          </button>
          <button type="button" onClick={() => setActiveTab("all")} aria-pressed={activeTab === "all"} className={tabClass(activeTab === "all")}>
            <span>Show all ({THEME_LIST.length})</span>
          </button>
        </div>
      </div>

      <div className={compact ? "max-h-64 overflow-y-auto p-1.5 space-y-1" : "flex-1 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5"}>
        {filteredThemes.map((theme) => {
          const isSelected = currentTheme === theme.id;
          return (
            <button
              key={theme.id}
              type="button"
              onClick={() => {
                setTheme(theme.id);
                onPick?.();
              }}
              aria-pressed={isSelected}
              className={
                compact
                  ? `w-full min-h-10 px-2.5 py-1.5 rounded text-left transition flex items-center justify-between cursor-pointer group ${
                      isSelected
                        ? "bg-[var(--sub-alt-color)] border border-[var(--main-color)]/50"
                        : "hover:bg-[var(--sub-alt-color)]/60 border border-transparent"
                    }`
                  : `p-3 rounded text-left transition flex items-center justify-between border cursor-pointer ${
                      isSelected
                        ? "border-[var(--main-color)] bg-[var(--sub-alt-color)] shadow-sm"
                        : "border-[var(--sub-color)]/20 hover:border-[var(--sub-color)]/60 bg-[var(--bg-color)] hover:bg-[var(--sub-alt-color)]/50"
                    }`
              }
            >
              {compact ? (
                <>
                  <div className="flex items-center gap-2 min-w-0 pr-2">
                    <span className={`text-xs font-mono truncate ${isSelected ? "text-[var(--main-color)] font-bold" : "text-[var(--text-color)] group-hover:text-[var(--main-color)]"}`}>
                      {theme.name}
                    </span>
                    <span className="text-[9px] font-mono text-[var(--sub-color)] shrink-0">
                      {theme.id === "dark" ? "high contrast · dark" : theme.isDark ? "dark" : "light"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <ThemeSwatch theme={theme} compact />
                    {isSelected && <Check className="w-3.5 h-3.5 text-[var(--main-color)] shrink-0" />}
                  </div>
                </>
              ) : (
                <>
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono font-medium truncate">{theme.name}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[var(--main-color)] shrink-0" />}
                    </div>
                    <span className="text-[10px] font-mono text-[var(--sub-color)]">
                      {theme.id === "dark" ? "high contrast · dark" : theme.isDark ? "dark" : "light"}
                    </span>
                  </div>
                  <ThemeSwatch theme={theme} />
                </>
              )}
            </button>
          );
        })}

        {filteredThemes.length === 0 && (
          <div className={compact ? "py-6 text-center text-xs font-mono text-[var(--sub-color)]" : "col-span-full py-12 text-center text-sm text-[var(--sub-color)] font-mono"}>
            No themes matching &quot;{query}&quot;
          </div>
        )}
      </div>
    </div>
  );
}
