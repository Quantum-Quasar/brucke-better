"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Layers, Palette, Route, Search, SlidersHorizontal } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { getDueCards } from "@/lib/srs";
import { LANGUAGES } from "@/data/languages";
import { EXP2_ROOT } from "@/lib/exp-routes";
import { POPULAR_THEMES_META, type ThemeMeta } from "@/data/popular-themes";
import { themeDisplayName } from "@/lib/theme-runtime";
import { P2Sheet } from "./P2WordSheet";
import { P2_HOUSE_THEME, setP2Palette, useP2Palette } from "./p2-palette";

/** The motif: an arch — a bridge from a word you know to its twin. */
export function ArchMark() {
  return (
    <svg viewBox="0 0 28 24" aria-hidden="true" focusable="false">
      <path d="M0 24V14C0 6.3 6.3 0 14 0s14 6.3 14 14v10h-7V14a7 7 0 0 0-14 0v10H0z" fill="currentColor" />
    </svg>
  );
}

export function useDueCount(): number {
  const srsCards = useAppStore((s) => s.srsCards);
  const hydrated = useAppStore((s) => s.storeHydrated);
  return useMemo(() => (hydrated ? getDueCards(srsCards).length : 0), [srsCards, hydrated]);
}

const NAV = [
  { href: EXP2_ROOT, label: "Path", icon: Route },
  { href: `${EXP2_ROOT}/review`, label: "Review", icon: Layers },
  { href: `${EXP2_ROOT}/words`, label: "Words", icon: Search },
  { href: `${EXP2_ROOT}/settings`, label: "Settings", icon: SlidersHorizontal },
] as const;

function isCurrent(pathname: string, href: string) {
  return href === EXP2_ROOT ? pathname === EXP2_ROOT : pathname.startsWith(href);
}

/* ------------------------------------------------------------- themes */

function Swatch({ theme }: { theme: Pick<ThemeMeta, "bg" | "main" | "text" | "sub"> }) {
  return (
    <span className="p-swatch" style={{ background: theme.bg }} aria-hidden="true">
      <span style={{ background: theme.main }} />
      <span style={{ background: theme.text }} />
      <span style={{ background: theme.sub }} />
    </span>
  );
}

/** The app's own theme collection: 12 popular ones in the bundle, all 187 on demand. */
export function ThemePicker({ compact = false }: { compact?: boolean }) {
  const current = useAppStore((s) => s.theme);
  const setTheme = useAppStore((s) => s.setTheme);
  const palette = useP2Palette();
  const [all, setAll] = useState<ThemeMeta[] | null>(null);
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"popular" | "dark" | "light" | "all">("popular");

  useEffect(() => {
    if (tab === "popular" && !query) return;
    if (all) return;
    let live = true;
    void import("@/data/themes").then((m) => {
      if (live) setAll(m.THEME_LIST);
    });
    return () => {
      live = false;
    };
  }, [tab, query, all]);

  const list = useMemo(() => {
    const source = tab === "popular" && !query ? POPULAR_THEMES_META : all ?? POPULAR_THEMES_META;
    const q = query.trim().toLowerCase();
    return source.filter(
      (t) => (tab === "dark" ? t.isDark : tab === "light" ? !t.isDark : true) && (!q || t.name.toLowerCase().includes(q) || t.id.includes(q))
    );
  }, [tab, query, all]);

  return (
    <div className="p-themes">
      <button type="button" className="p-house" aria-pressed={palette === "brucke"} onClick={() => setP2Palette("brucke")}>
        <Swatch theme={P2_HOUSE_THEME} />
        <span>
          <span className="p-lead-strong" style={{ display: "block" }}>
            Brücke
          </span>
          <span className="p-small">Made for this design: town-sign yellow on stone.</span>
        </span>
        <span className="p-house-state p-small">{palette === "brucke" ? "In use" : "Use"}</span>
      </button>
      <p className="p-body p-strong" style={{ marginTop: 8 }}>
        Or use one of your app themes
      </p>
      <div className="p-themes-controls">
        <div role="radiogroup" aria-label="Which themes" className="p-segbtns">
          {(["popular", "dark", "light", "all"] as const).map((t) => (
            <button key={t} type="button" role="radio" aria-checked={tab === t} onClick={() => setTab(t)}>
              {t === "popular" ? "Popular" : t === "dark" ? "Dark" : t === "light" ? "Light" : "All 187"}
            </button>
          ))}
        </div>
        <input
          type="search"
          className="p-input p-input--small"
          placeholder="Find a theme"
          aria-label="Find a theme"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <p className="p-small p-strong" aria-live="polite">
        Now: {palette === "brucke" ? "Brücke (this design’s own palette)" : themeDisplayName(current)}
      </p>
      <ul className={`p-theme-grid ${compact ? "p-theme-grid--compact" : ""}`}>
        {list.map((theme) => (
          <li key={theme.id}>
            <button
              type="button"
              className="p-theme"
              aria-pressed={palette === "app" && theme.id === current}
              onClick={() => {
                setTheme(theme.id);
                setP2Palette("app");
              }}
            >
              <Swatch theme={theme} />
              <span>{theme.name}</span>
            </button>
          </li>
        ))}
        {list.length === 0 && <li className="p-body">{all ? "No theme by that name." : "Loading themes…"}</li>}
      </ul>
    </div>
  );
}

function ThemeButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="p-icon-btn p-bar-theme" onClick={() => setOpen(true)} aria-label="Change theme">
        <Palette />
      </button>
      {open && (
        <P2Sheet label="Themes" onClose={() => setOpen(false)} head={<h2 className="p-head p-sheet-title">Themes</h2>}>
          <p className="p-body">This design has its own palette. You can switch to any theme from the rest of the app at any time.</p>
          <ThemePicker compact />
        </P2Sheet>
      )}
    </>
  );
}

/* ---------------------------------------------------------------- bar */

export function P2Bar() {
  const pathname = usePathname() ?? EXP2_ROOT;
  const due = useDueCount();
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const setActiveLanguage = useAppStore((s) => s.setActiveLanguage);
  const available = LANGUAGES.filter((language) => language.status === "available");

  return (
    <header className="p-bar">
      <Link href={EXP2_ROOT} className="p-wordmark" aria-label="Brücke, your path">
        <ArchMark />
        <span>Brücke</span>
      </Link>
      <nav className="p-nav" aria-label="Main">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="p-nav-link" aria-current={isCurrent(pathname, item.href) ? "page" : undefined}>
            {item.label}
            {item.label === "Review" && due > 0 && <span className="p-nav-count">{due}</span>}
          </Link>
        ))}
        <label className="sr-only" htmlFor="p-lang">
          Course language
        </label>
        <select
          id="p-lang"
          className="p-lang"
          value={activeLanguageId}
          onChange={(event) => {
            useViewStore.getState().closeSubview();
            setActiveLanguage(event.target.value);
          }}
        >
          {available.map((language) => (
            <option key={language.id} value={language.id}>
              {language.name}
            </option>
          ))}
        </select>
        <ThemeButton />
      </nav>
    </header>
  );
}

export function P2Dock() {
  const pathname = usePathname() ?? EXP2_ROOT;
  const due = useDueCount();
  return (
    <nav className="p-dock" aria-label="Main">
      {NAV.map((item) => {
        const Icon = item.icon;
        return (
          <Link key={item.href} href={item.href} aria-current={isCurrent(pathname, item.href) ? "page" : undefined}>
            <Icon aria-hidden="true" />
            <span>
              {item.label}
              {item.label === "Review" && due > 0 ? ` · ${due}` : ""}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
