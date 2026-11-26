"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { Moon, Search, Sun } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { isModifiedClick } from "@/lib/app-navigation";
import { captureScroll } from "@/lib/scroll-memory";
import { getDueCards } from "@/lib/srs";
import { LANGUAGES } from "@/data/languages";
import { stripUiVariantPrefix } from "@/lib/routes";
import { prefetchAtlasContent, prefetchReviewContent } from "@/lib/content-client";

const SearchDialog = dynamic(() => import("@/components/navigation/SearchDialog"), { ssr: false });

export interface TasteNavProps {
  scheme: "light" | "dark";
  onToggleScheme: () => void;
}

const PRIMARY_LINKS = [
  { href: "/taste", base: "/", label: "Trail" },
  { href: "/taste/review", base: "/review", label: "Review" },
  { href: "/taste/atlas", base: "/atlas", label: "Atlas" },
  { href: "/taste/practice", base: "/practice", label: "Practice" },
  { href: "/taste/read", base: "/read", label: "Read" },
  { href: "/taste/settings", base: "/settings", label: "Settings" },
] as const;

function canOpenSearch(event: KeyboardEvent): boolean {
  if (
    event.defaultPrevented ||
    event.key !== "/" ||
    event.ctrlKey ||
    event.metaKey ||
    event.altKey ||
    event.isComposing
  ) {
    return false;
  }
  const target = event.target instanceof HTMLElement ? event.target : null;
  if (
    target?.closest(
      "input, textarea, select, [contenteditable]:not([contenteditable='false']), [role='textbox']"
    )
  ) {
    return false;
  }
  return !Array.from(
    document.querySelectorAll<HTMLElement>("[role='dialog'], [role='alertdialog'], dialog[open]")
  ).some((dialog) => dialog.getClientRects().length > 0);
}

export function TasteNav({ scheme, onToggleScheme }: TasteNavProps) {
  const pathname = usePathname();
  const basePath = stripUiVariantPrefix(pathname);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const setActiveLanguage = useAppStore((s) => s.setActiveLanguage);
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const srsCards = useAppStore((s) => s.srsCards);
  const closeSubview = useViewStore((s) => s.closeSubview);

  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!canOpenSearch(event)) return;
      event.preventDefault();
      searchBtnRef.current?.focus();
      setSearchOpen(true);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const dueCount = mounted ? getDueCards(srsCards).length : 0;
  const availableLanguages = LANGUAGES.filter((l) => l.status === "available");

  const handlePrefetch = (base: string) => {
    if (base === "/atlas") prefetchAtlasContent(activeLanguageId);
    else if (base === "/review") prefetchReviewContent(activeLanguageId);
  };

  const handleNavClick = (event: React.MouseEvent, targetHref: string) => {
    if (isModifiedClick(event)) return;
    if (pathname !== targetHref) captureScroll(pathname);
    closeSubview();
  };

  return (
    <>
      <header
        className="sticky top-0 z-40 w-full border-b border-[var(--taste-border)] bg-[var(--taste-bg)]/95 backdrop-blur-sm"
        style={{ height: "var(--taste-nav-h)" }}
      >
        <div className="taste-wrap h-full flex items-center justify-between gap-2">
          {/* Left: Brand wordmark + primary section navigation */}
          <div className="flex items-center gap-5 min-w-0">
            <Link
              href="/taste"
              onClick={(event) => handleNavClick(event, "/taste")}
              className="inline-flex min-h-11 items-center gap-2 shrink-0 text-[var(--taste-ink)] hover:text-[var(--taste-accent)] transition-colors"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-[var(--taste-accent)] text-[var(--taste-accent-ink)] taste-mono text-xs font-bold tracking-tight">
                bü
              </span>
              <span className="font-semibold text-[15px] tracking-tight">Brücke</span>
            </Link>

            <nav aria-label="Primary sections" className="hidden lg:flex items-center gap-1">
              {PRIMARY_LINKS.map((item) => {
                const isActive =
                  item.base === "/"
                    ? basePath === "/" || basePath.startsWith("/trail/")
                    : basePath === item.base || basePath.startsWith(`${item.base}/`);
                const showDue = item.base === "/review" && dueCount > 0;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    onClick={(event) => handleNavClick(event, item.href)}
                    onPointerEnter={() => handlePrefetch(item.base)}
                    onFocus={() => handlePrefetch(item.base)}
                    className={`relative inline-flex min-h-9 items-center gap-1.5 rounded-md px-2.5 text-[13px] transition-colors ${
                      isActive
                        ? "bg-[var(--taste-surface-2)] text-[var(--taste-ink)] font-semibold"
                        : "text-[var(--taste-muted)] hover:text-[var(--taste-ink)] hover:bg-[var(--taste-surface-2)]/60"
                    }`}
                  >
                    <span>{item.label}</span>
                    {showDue && (
                      <span
                        className="taste-mono inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--taste-accent)] px-1 text-[10px] font-bold text-[var(--taste-accent-ink)]"
                        aria-label={`${dueCount} due`}
                      >
                        {dueCount > 99 ? "99+" : dueCount}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: Language switcher, search, scheme toggle, subtle UI switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Language switcher (de / nl / fr / es) */}
            <div
              role="group"
              aria-label="Course language"
              className="inline-flex items-center rounded-md border border-[var(--taste-border)] bg-[var(--taste-surface)] p-0.5"
            >
              {availableLanguages.map((lang) => {
                const active = lang.id === activeLanguageId;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    aria-pressed={active}
                    aria-label={`Switch course to ${lang.name}`}
                    onClick={() => {
                      if (lang.id === activeLanguageId) return;
                      setActiveLanguage(lang.id);
                      completeOnboarding();
                    }}
                    className={`taste-mono inline-flex h-8 min-w-8 sm:h-7 sm:min-w-7 items-center justify-center rounded px-1.5 text-[11px] uppercase tracking-wide cursor-pointer transition-colors ${
                      active
                        ? "bg-[var(--taste-accent)] text-[var(--taste-accent-ink)] font-bold"
                        : "text-[var(--taste-muted)] hover:text-[var(--taste-ink)]"
                    }`}
                  >
                    {lang.id}
                  </button>
                );
              })}
            </div>

            {/* Quick search trigger */}
            <button
              ref={searchBtnRef}
              type="button"
              aria-label="Search words and lessons"
              aria-haspopup="dialog"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen(true)}
              className="inline-flex min-h-11 min-w-11 sm:min-h-9 sm:min-w-0 sm:px-2.5 items-center justify-center gap-2 rounded-md border border-[var(--taste-border)] bg-[var(--taste-surface)] text-[var(--taste-muted)] hover:border-[var(--taste-border-strong)] hover:text-[var(--taste-ink)] cursor-pointer transition-colors"
            >
              <Search className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="hidden md:inline text-[12px]">Search</span>
              <kbd className="hidden md:inline-flex taste-mono h-5 items-center rounded border border-[var(--taste-border)] bg-[var(--taste-surface-2)] px-1.5 text-[10px] text-[var(--taste-muted)]">
                /
              </kbd>
            </button>

            {/* Light / Dark scheme toggle */}
            <button
              type="button"
              onClick={onToggleScheme}
              aria-label={scheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={scheme === "dark" ? "Light mode" : "Dark mode"}
              className="inline-flex min-h-11 min-w-11 sm:min-h-9 sm:min-w-9 items-center justify-center rounded-md border border-[var(--taste-border)] bg-[var(--taste-surface)] text-[var(--taste-muted)] hover:border-[var(--taste-border-strong)] hover:text-[var(--taste-ink)] cursor-pointer transition-colors"
            >
              {scheme === "dark" ? (
                <Sun className="w-4 h-4" aria-hidden="true" />
              ) : (
                <Moon className="w-4 h-4" aria-hidden="true" />
              )}
            </button>

            {/* Subtle UI switcher to compare Original (/) and Design (/design) */}
            <div
              className="hidden xl:flex items-center gap-1 pl-2 ml-1 border-l border-[var(--taste-border)] taste-mono text-[11px] text-[var(--taste-muted)]"
              aria-label="Switch UI variant"
            >
              <Link
                href="/"
                data-ui-switch="true"
                className="px-1.5 py-1 rounded hover:text-[var(--taste-ink)] hover:bg-[var(--taste-surface-2)] transition-colors"
                title="Switch to Original Brücke UI"
              >
                Original
              </Link>
              <span aria-hidden="true" className="opacity-40">/</span>
              <Link
                href="/design"
                data-ui-switch="true"
                className="px-1.5 py-1 rounded hover:text-[var(--taste-ink)] hover:bg-[var(--taste-surface-2)] transition-colors"
                title="Switch to Design Brücke UI"
              >
                Design
              </Link>
            </div>
          </div>
        </div>
      </header>

      {searchOpen && <SearchDialog key={activeLanguageId} onClose={() => setSearchOpen(false)} />}
    </>
  );
}
