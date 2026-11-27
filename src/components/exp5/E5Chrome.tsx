"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BookOpen, Layers, Search, SlidersHorizontal } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { getDueCards } from "@/lib/srs";
import { LANGUAGES } from "@/data/languages";
import { EXP5_ROOT } from "@/lib/exp-routes";
import { chapterField } from "./e5-kit";

/** The mark: a single arch — the bridge between the word you know and its twin. */
export function BridgeMark() {
  return (
    <svg viewBox="0 0 34 22" aria-hidden="true" focusable="false">
      <path d="M0 22V13C0 5.8 7.6 0 17 0s17 5.8 17 13v9h-6v-8.2C28 9 23.1 5.6 17 5.6S6 9 6 13.8V22H0z" fill="currentColor" />
      <rect x="0" y="16" width="34" height="3" fill="currentColor" />
    </svg>
  );
}

export function useDueCount(): number {
  const srsCards = useAppStore((s) => s.srsCards);
  const hydrated = useAppStore((s) => s.storeHydrated);
  return useMemo(() => (hydrated ? getDueCards(srsCards).length : 0), [srsCards, hydrated]);
}

const NAV = [
  { href: EXP5_ROOT, label: "Learn", icon: BookOpen },
  { href: `${EXP5_ROOT}/review`, label: "Review", icon: Layers },
  { href: `${EXP5_ROOT}/words`, label: "Words", icon: Search },
  { href: `${EXP5_ROOT}/settings`, label: "Settings", icon: SlidersHorizontal },
] as const;

function isCurrent(pathname: string, href: string) {
  return href === EXP5_ROOT ? pathname === EXP5_ROOT : pathname.startsWith(href);
}

export function E5Bar({ tone = "dark" }: { tone?: "dark" | "light" | "field" }) {
  const pathname = usePathname() ?? EXP5_ROOT;
  const due = useDueCount();
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const setActiveLanguage = useAppStore((s) => s.setActiveLanguage);
  const available = LANGUAGES.filter((language) => language.status === "available");

  return (
    <header className="v-bar" data-tone={tone === "dark" ? undefined : tone}>
      <Link href={EXP5_ROOT} className="v-wordmark" aria-label="Brücke, home">
        <BridgeMark />
        <span>Brücke</span>
      </Link>
      <nav className="v-nav" aria-label="Main">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="v-nav-link"
            aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
          >
            {item.label}
            {item.label === "Review" && due > 0 && (
              <span className="v-nav-count" aria-label={`${due} due`}>
                {due}
              </span>
            )}
          </Link>
        ))}
        <label className="sr-only" htmlFor="v-lang">
          Course language
        </label>
        <select
          id="v-lang"
          className="v-lang"
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
      </nav>
    </header>
  );
}

export function E5Dock() {
  const pathname = usePathname() ?? EXP5_ROOT;
  const due = useDueCount();
  return (
    <nav className="v-dock" aria-label="Main">
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

/* -------------------------------------------------------------- footer */

export function E5Footer({ lastTopic }: { lastTopic?: number }) {
  return (
    <footer className="v-footer" style={{ ["--v-field" as string]: chapterField((lastTopic ?? 0) + 1) }}>
      <div className="v-wrap">
        <div className="v-footer-links">
          <p className="v-body">
            Progress stays in this browser. No account, no tracking.
          </p>
          <nav aria-label="More" className="v-footer-nav">
            <Link href="/">Classic interface</Link>
            <Link href="/exp-ui">Colour chapters UI</Link>
            <Link href="/exp-ui4">Trail UI</Link>
            <Link href="/settings">Backup &amp; data</Link>
            <Link href="/atlas">Sound atlas</Link>
            <Link href="/panorama">Grammar map</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
        <p className="v-footer-mark" aria-hidden="true">
          <BridgeMark />
          Brücke
        </p>
      </div>
    </footer>
  );
}
