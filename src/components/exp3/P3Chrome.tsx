"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Layers, Palette, Route, Search, SlidersHorizontal } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { getDueCards } from "@/lib/srs";
import { LANGUAGES } from "@/data/languages";
import { EXP3_ROOT } from "@/lib/exp-routes";
import { POPULAR_THEMES_META, type ThemeMeta } from "@/data/popular-themes";
import { themeDisplayName } from "@/lib/theme-runtime";
import { P3Sheet } from "./P3WordSheet";
import { P3_HOUSE_THEME, setP3Palette, useP3Palette } from "./p3-palette";

/** The mark: a pixel bridge, the goal at the top of the map. */
export function ArchMark() {
  return (
    <svg viewBox="0 0 14 8" aria-hidden="true" focusable="false" shapeRendering="crispEdges">
      <path d="M0 0h14v2H0zM0 2h2v6H0zM12 2h2v6h-2zM2 2h3v1H2zM9 2h3v1H9zM2 3h1v1H2zM11 3h1v1h-1zM6 2h2v6H6zM5 2h1v1H5zM8 2h1v1H8z" fill="currentColor" />
    </svg>
  );
}

export function useDueCount(): number {
  const srsCards = useAppStore((s) => s.srsCards);
  const hydrated = useAppStore((s) => s.storeHydrated);
  return useMemo(() => (hydrated ? getDueCards(srsCards).length : 0), [srsCards, hydrated]);
}

const NAV = [
  { href: EXP3_ROOT, label: "Map", icon: Route },
  { href: `${EXP3_ROOT}/review`, label: "Review", icon: Layers },
  { href: `${EXP3_ROOT}/words`, label: "Words", icon: Search },
  { href: `${EXP3_ROOT}/settings`, label: "Settings", icon: SlidersHorizontal },
] as const;

function isCurrent(pathname: string, href: string) {
  return href === EXP3_ROOT ? pathname === EXP3_ROOT : pathname.startsWith(href);
}

/* ------------------------------------------------------------- themes */

function Swatch({ theme }: { theme: Pick<ThemeMeta, "bg" | "main" | "text" | "sub"> }) {
  return (
    <span className="q-swatch" style={{ background: theme.bg }} aria-hidden="true">
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
  const palette = useP3Palette();
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
    <div className="q-themes">
      <button type="button" className="q-house" aria-pressed={palette === "nacht"} onClick={() => setP3Palette("nacht")}>
        <Swatch theme={P3_HOUSE_THEME} />
        <span>
          <span className="q-lead-strong" style={{ display: "block" }}>
            Nacht
          </span>
          <span className="q-small">Made for this map: lantern gold on a night-blue ground.</span>
        </span>
        <span className="q-house-state q-small">{palette === "nacht" ? "In use" : "Use"}</span>
      </button>
      <p className="q-body q-strong" style={{ marginTop: 8 }}>
        Or use one of your app themes
      </p>
      <div className="q-themes-controls">
        <div role="radiogroup" aria-label="Which themes" className="q-segbtns">
          {(["popular", "dark", "light", "all"] as const).map((t) => (
            <button key={t} type="button" role="radio" aria-checked={tab === t} onClick={() => setTab(t)}>
              {t === "popular" ? "Popular" : t === "dark" ? "Dark" : t === "light" ? "Light" : "All 187"}
            </button>
          ))}
        </div>
        <input
          type="search"
          className="q-input q-input--small"
          placeholder="Find a theme"
          aria-label="Find a theme"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <p className="q-small q-strong" aria-live="polite">
        Now: {palette === "nacht" ? "Nacht (this map’s own palette)" : themeDisplayName(current)}
      </p>
      <ul className={`q-theme-grid ${compact ? "q-theme-grid--compact" : ""}`}>
        {list.map((theme) => (
          <li key={theme.id}>
            <button
              type="button"
              className="q-theme"
              aria-pressed={palette === "app" && theme.id === current}
              onClick={() => {
                setTheme(theme.id);
                setP3Palette("app");
              }}
            >
              <Swatch theme={theme} />
              <span>{theme.name}</span>
            </button>
          </li>
        ))}
        {list.length === 0 && <li className="q-body">{all ? "No theme by that name." : "Loading themes…"}</li>}
      </ul>
    </div>
  );
}

function ThemeButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="q-icon-btn q-bar-theme" onClick={() => setOpen(true)} aria-label="Change theme">
        <Palette />
      </button>
      {open && (
        <P3Sheet label="Themes" onClose={() => setOpen(false)} head={<h2 className="q-head q-sheet-title">Themes</h2>}>
          <p className="q-body">This design has its own palette. You can switch to any theme from the rest of the app at any time.</p>
          <ThemePicker compact />
        </P3Sheet>
      )}
    </>
  );
}

/* ---------------------------------------------------------------- bar */

export function P3Bar() {
  const pathname = usePathname() ?? EXP3_ROOT;
  const due = useDueCount();
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const setActiveLanguage = useAppStore((s) => s.setActiveLanguage);
  const available = LANGUAGES.filter((language) => language.status === "available");

  return (
    <header className="q-bar">
      <Link href={EXP3_ROOT} className="q-wordmark" aria-label="Brücke, your map">
        <ArchMark />
        <span>Brücke</span>
      </Link>
      <nav className="q-nav" aria-label="Main">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="q-nav-link" aria-current={isCurrent(pathname, item.href) ? "page" : undefined}>
            {item.label}
            {item.label === "Review" && due > 0 && <span className="q-nav-count">{due}</span>}
          </Link>
        ))}
        <label className="sr-only" htmlFor="q-lang">
          Course language
        </label>
        <select
          id="q-lang"
          className="q-lang"
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

export function P3Dock() {
  const pathname = usePathname() ?? EXP3_ROOT;
  const due = useDueCount();
  return (
    <nav className="q-dock" aria-label="Main">
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

export function P3Footer() {
  return (
    <footer className="q-footer">
      <div className="q-wrap">
        <div className="q-footer-links">
          <p className="q-body">Progress stays in this browser. No account, no tracking.</p>
          <nav aria-label="More" className="q-footer-nav">
            <Link href="/">Classic interface</Link>
            <Link href="/exp-ui">Colour chapters UI</Link>
            <Link href="/exp-ui2">One motif UI</Link>
            <Link href="/atlas">Sound atlas</Link>
            <Link href="/settings">Backup &amp; data</Link>
          </nav>
        </div>
        <p className="q-footer-mark" aria-hidden="true">
          <ArchMark />
          Brücke
        </p>
      </div>
    </footer>
  );
}
