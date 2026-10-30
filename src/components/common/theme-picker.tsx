"use client";

import { useMemo, useState } from "react";
import { filterThemes, type ThemeFilterTab, type ThemeMeta } from "@/data/themes";

/** Shared search/tab state for the dropdown panel and the full grid modal. */
export function useThemeFilter() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<ThemeFilterTab>("popular");
  const filteredThemes = useMemo(() => filterThemes(query, activeTab), [activeTab, query]);
  return { query, setQuery, activeTab, setActiveTab, filteredThemes };
}

/** The 3-dot palette preview shared by both theme pickers. */
export function ThemeSwatch({ theme, compact = false }: { theme: ThemeMeta; compact?: boolean }) {
  return (
    <div
      className={`flex items-center ${compact ? "gap-0.5" : "gap-1"} p-1 rounded border border-black/10 shrink-0`}
      style={{ backgroundColor: theme.bg }}
      title={`${theme.name} palette`}
    >
      <span
        className={`${compact ? "w-2 h-2" : "w-2.5 h-2.5"} rounded-full`}
        style={{ backgroundColor: theme.sub }}
      />
      <span
        className={`${compact ? "w-2 h-2" : "w-2.5 h-2.5"} rounded-full`}
        style={{ backgroundColor: theme.main }}
      />
      <span
        className={`${compact ? "w-2 h-2" : "w-2.5 h-2.5"} rounded-full`}
        style={{ backgroundColor: theme.text }}
      />
    </div>
  );
}
