"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { BookOpen, Layers, Search, SlidersHorizontal } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { getDueCards } from "@/lib/srs";
import { LANGUAGES } from "@/data/languages";
import { EXP_ROOT } from "@/lib/exp-routes";

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
  { href: EXP_ROOT, label: "Learn", icon: BookOpen },
  { href: `${EXP_ROOT}/review`, label: "Review", icon: Layers },
  { href: `${EXP_ROOT}/words`, label: "Words", icon: Search },
  { href: `${EXP_ROOT}/settings`, label: "Settings", icon: SlidersHorizontal },
] as const;

function isCurrent(pathname: string, href: string) {
  return href === EXP_ROOT ? pathname === EXP_ROOT : pathname.startsWith(href);
}

export function ExpBar({ tone = "dark" }: { tone?: "dark" | "light" | "field" }) {
  const pathname = usePathname() ?? EXP_ROOT;
  const due = useDueCount();
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const setActiveLanguage = useAppStore((s) => s.setActiveLanguage);
  const available = LANGUAGES.filter((language) => language.status === "available");

  return (
    <header className="x-bar" data-tone={tone === "dark" ? undefined : tone}>
      <Link href={EXP_ROOT} className="x-wordmark" aria-label="Brücke, home">
        <BridgeMark />
        <span>Brücke</span>
      </Link>
      <nav className="x-nav" aria-label="Main">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="x-nav-link"
            aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
          >
            {item.label}
            {item.label === "Review" && due > 0 && (
              <span className="x-nav-count" aria-label={`${due} due`}>
                {due}
              </span>
            )}
          </Link>
        ))}
        <label className="sr-only" htmlFor="x-lang">
          Course language
        </label>
        <select
          id="x-lang"
          className="x-lang"
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

export function ExpDock() {
  const pathname = usePathname() ?? EXP_ROOT;
  const due = useDueCount();
  return (
    <nav className="x-dock" aria-label="Main">
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
