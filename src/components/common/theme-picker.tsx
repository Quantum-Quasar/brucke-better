"use client";

import { useEffect, useMemo, useState } from "react";
import {
  POPULAR_THEMES_META,
  type ThemeFilterTab,
  type ThemeMeta,
} from "@/data/popular-themes";

type FilterFn = (query: string, tab: ThemeFilterTab, selectedTheme?: string) => ThemeMeta[];

const POPULAR_IDS = new Set(POPULAR_THEMES_META.map((t) => t.id));

/** Shared search/tab state for the dropdown panel and the full grid modal. */
export function useThemeFilter(selectedTheme?: string) {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<ThemeFilterTab>("popular");
  const [fullFilter, setFullFilter] = useState<FilterFn | null>(null);
  const selectedOutsidePopular = Boolean(selectedTheme && !POPULAR_IDS.has(selectedTheme));
  const needsFullCatalog = activeTab !== "popular" || query.trim().length > 0 || selectedOutsidePopular;

  useEffect(() => {
    if (!needsFullCatalog || fullFilter) return;
    let active = true;
    void import("@/data/themes").then((m) => {
      if (active) setFullFilter(() => m.filterThemes);
    });
    return () => {
      active = false;
    };
  }, [needsFullCatalog, fullFilter]);

  const filteredThemes = useMemo(() => {
    if (fullFilter) return fullFilter(query, activeTab, selectedTheme);
    if (!needsFullCatalog) return POPULAR_THEMES_META;
    const q = query.trim().toLowerCase();
    return POPULAR_THEMES_META.filter((t) => {
      if (activeTab === "dark" && !t.isDark) return false;
      if (activeTab === "light" && t.isDark) return false;
      return !q || t.name.toLowerCase().includes(q) || t.id.toLowerCase().includes(q);
    });
  }, [fullFilter, needsFullCatalog, activeTab, query, selectedTheme]);

  return { query, setQuery, activeTab, setActiveTab, filteredThemes, isCatalogLoading: needsFullCatalog && !fullFilter };
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
