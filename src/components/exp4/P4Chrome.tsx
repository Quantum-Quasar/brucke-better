"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { Layers, Palette, Route, Search, SlidersHorizontal } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { getDueCards } from "@/lib/srs";
import { LANGUAGES } from "@/data/languages";
import { EXP4_ROOT } from "@/lib/exp-routes";
import { POPULAR_THEMES_META, type ThemeMeta } from "@/data/popular-themes";
import { themeDisplayName } from "@/lib/theme-runtime";
import { P4Sheet } from "./P4WordSheet";

/** The classic app's own mark. */
export function ArchMark() {
  return (
    <span className="m-mark" aria-hidden="true">
      bü
    </span>
  );
}

export function useDueCount(): number {
  const srsCards = useAppStore((s) => s.srsCards);
  const hydrated = useAppStore((s) => s.storeHydrated);
  return useMemo(() => (hydrated ? getDueCards(srsCards).length : 0), [srsCards, hydrated]);
}

const NAV = [
  { href: EXP4_ROOT, label: "Map", icon: Route },
  { href: `${EXP4_ROOT}/review`, label: "Review", icon: Layers },
  { href: `${EXP4_ROOT}/words`, label: "Words", icon: Search },
  { href: `${EXP4_ROOT}/settings`, label: "Settings", icon: SlidersHorizontal },
] as const;

function isCurrent(pathname: string, href: string) {
  return href === EXP4_ROOT ? pathname === EXP4_ROOT : pathname.startsWith(href);
}

/* ------------------------------------------------------------- themes */

function Swatch({ theme }: { theme: Pick<ThemeMeta, "bg" | "main" | "text" | "sub"> }) {
  return (
    <span className="m-swatch" style={{ background: theme.bg }} aria-hidden="true">
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
    <div className="m-themes">
      <div className="m-themes-controls">
        <div role="radiogroup" aria-label="Which themes" className="m-segbtns">
          {(["popular", "dark", "light", "all"] as const).map((t) => (
            <button key={t} type="button" role="radio" aria-checked={tab === t} onClick={() => setTab(t)}>
              {t === "popular" ? "Popular" : t === "dark" ? "Dark" : t === "light" ? "Light" : "All 187"}
            </button>
          ))}
        </div>
        <input
          type="search"
          className="m-input m-input--small"
          placeholder="Find a theme"
          aria-label="Find a theme"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </div>
      <p className="m-small m-strong" aria-live="polite">
        Now: {themeDisplayName(current)}
      </p>
      <ul className={`m-theme-grid ${compact ? "m-theme-grid--compact" : ""}`}>
        {list.map((theme) => (
          <li key={theme.id}>
            <button
              type="button"
              className="m-theme"
              aria-pressed={theme.id === current}
              onClick={() => {
                setTheme(theme.id);
              }}
            >
              <Swatch theme={theme} />
              <span>{theme.name}</span>
            </button>
          </li>
        ))}
        {list.length === 0 && <li className="m-body">{all ? "No theme by that name." : "Loading themes…"}</li>}
      </ul>
    </div>
  );
}

function ThemeButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button type="button" className="m-icon-btn m-bar-theme" onClick={() => setOpen(true)} aria-label="Change theme">
        <Palette />
      </button>
      {open && (
        <P4Sheet label="Themes" onClose={() => setOpen(false)} head={<h2 className="m-head m-sheet-title">Themes</h2>}>
          <p className="m-body">The same themes as the rest of the app. A change here changes them everywhere.</p>
          <ThemePicker compact />
        </P4Sheet>
      )}
    </>
  );
}

/* ---------------------------------------------------------------- bar */

export function P4Bar() {
  const pathname = usePathname() ?? EXP4_ROOT;
  const due = useDueCount();
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const setActiveLanguage = useAppStore((s) => s.setActiveLanguage);
  const available = LANGUAGES.filter((language) => language.status === "available");

  return (
    <header className="m-bar">
      <Link href={EXP4_ROOT} className="m-wordmark" aria-label="Brücke, your trail">
        <ArchMark />
        <span>brücke</span>
        <span className="m-wordmark-tag">the trail</span>
      </Link>
      <nav className="m-nav" aria-label="Main">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href} className="m-nav-link" aria-current={isCurrent(pathname, item.href) ? "page" : undefined}>
            {item.label}
            {item.label === "Review" && due > 0 && <span className="m-nav-count">{due}</span>}
          </Link>
        ))}
        <label className="sr-only" htmlFor="m-lang">
          Course language
        </label>
        <select
          id="m-lang"
          className="m-lang"
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

export function P4Dock() {
  const pathname = usePathname() ?? EXP4_ROOT;
  const due = useDueCount();
  return (
    <nav className="m-dock" aria-label="Main">
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

export function P4Footer() {
  return (
    <footer className="m-footer">
      <div className="m-wrap">
        <div className="m-footer-links">
          <p className="m-body">Progress stays in this browser. No account, no tracking.</p>
          <nav aria-label="More" className="m-footer-nav">
            <Link href="/">Classic interface</Link>
            <Link href="/exp-ui">Colour chapters UI</Link>
            <Link href="/exp-ui2">One motif UI</Link>
            <Link href="/exp-ui3">Pixel map UI</Link>
            <Link href="/atlas">Sound atlas</Link>
            <Link href="/settings">Backup &amp; data</Link>
          </nav>
        </div>
        <p className="m-footer-mark" aria-hidden="true">
          <ArchMark />
          Brücke
        </p>
      </div>
    </footer>
  );
}
