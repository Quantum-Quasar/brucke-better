"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Search, Sun } from "lucide-react";
import { DESIGN_NAV_ITEMS } from "@/components/design/DesignNavConfig";
import { LANGUAGES } from "@/data/languages";
import { useCurriculum } from "@/data/curriculum-client";
import { useAppStore } from "@/lib/store";
import { getDueCards } from "@/lib/srs";
import { stripUiVariantPrefix } from "@/lib/routes";

interface DesignRailProps {
  mode: "light" | "dark";
  onToggleMode: () => void;
  onOpenSearch: () => void;
}

const AVAILABLE_LANGUAGES = LANGUAGES.filter((l) => l.status === "available");

export function DesignRail({ mode, onToggleMode, onOpenSearch }: DesignRailProps) {
  const pathname = usePathname();
  const basePath = stripUiVariantPrefix(pathname);

  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const setActiveLanguage = useAppStore((s) => s.setActiveLanguage);
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const completedLessons = useAppStore((s) => s.completedLessons);
  const srsCards = useAppStore((s) => s.srsCards);
  const storeHydrated = useAppStore((s) => s.storeHydrated);

  const { curriculum } = useCurriculum(activeLanguageId);
  const totalLessons = Math.max(1, curriculum.lessonCount || 1);
  const completedCount = storeHydrated ? completedLessons.length : 0;
  const pct = Math.min(100, Math.round((completedCount / totalLessons) * 100));
  const dueCount = storeHydrated ? getDueCards(srsCards).length : 0;

  const radius = 17;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (pct / 100) * circumference;

  const studioItems = DESIGN_NAV_ITEMS.filter((item) => item.group === "studio");
  const referenceItems = DESIGN_NAV_ITEMS.filter((item) => item.group === "reference");

  const isActive = (itemBasePath: string) => {
    if (itemBasePath === "/") {
      return basePath === "/" || basePath.startsWith("/trail/");
    }
    return basePath === itemBasePath || basePath.startsWith(`${itemBasePath}/`);
  };

  return (
    <aside
      aria-label="Studio navigation"
      className="design-rail hidden lg:flex flex-col justify-between px-3.5 py-5 gap-5"
    >
      <div className="space-y-5">
        {/* Atelier Emblem */}
        <div className="flex items-center justify-between px-1.5">
          <Link
            href="/design"
            className="flex items-center gap-2.5 group rounded-xl focus-visible:outline-2 focus-visible:outline-[var(--design-sapphire)]"
          >
            <span
              className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
              style={{
                backgroundColor: "var(--design-sapphire)",
                color: "var(--design-on-accent)",
              }}
              aria-hidden="true"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 16.5C3 11.2533 7.02944 7 12 7C16.9706 7 21 11.2533 21 16.5"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M6.5 16.5C6.5 13.1863 8.96243 10.5 12 10.5C15.0376 10.5 17.5 13.1863 17.5 16.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeOpacity="0.7"
                />
                <path
                  d="M2 17.5H22"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <div className="leading-tight">
              <span className="block design-serif text-lg font-bold tracking-tight text-[var(--design-ink)]">
                Brücke
              </span>
              <span className="block design-mono text-[10px] uppercase tracking-[0.18em] text-[var(--design-sapphire)] font-semibold">
                Atelier
              </span>
            </div>
          </Link>

          <button
            type="button"
            onClick={onToggleMode}
            aria-label={mode === "light" ? "Switch to Twilight dark mode" : "Switch to Daylight light mode"}
            title={mode === "light" ? "Twilight Slate" : "Daylight Parchment"}
            className="w-9 h-9 rounded-xl flex items-center justify-center border border-[var(--design-border)] bg-[var(--design-surface)] text-[var(--design-ink-muted)] hover:text-[var(--design-sapphire)] hover:border-[var(--design-sapphire-border)] transition cursor-pointer"
          >
            {mode === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>

        {/* Visual Language Pill Switcher */}
        <div className="px-0.5 space-y-1.5">
          <span className="block px-1.5 design-mono text-[10px] uppercase tracking-[0.14em] text-[var(--design-ink-muted)]">
            Course
          </span>
          <div
            role="group"
            aria-label="Switch active language"
            className="grid grid-cols-4 gap-1 p-1 rounded-2xl bg-[var(--design-well)] border border-[var(--design-border)]"
          >
            {AVAILABLE_LANGUAGES.map((lang) => {
              const active = lang.id === activeLanguageId;
              return (
                <button
                  key={lang.id}
                  type="button"
                  aria-pressed={active}
                  title={`${lang.name} (${lang.nativeName})`}
                  onClick={() => {
                    setActiveLanguage(lang.id);
                    completeOnboarding();
                  }}
                  className={`py-1.5 rounded-xl design-mono text-xs font-bold uppercase tracking-wide transition cursor-pointer ${
                    active
                      ? "shadow-xs"
                      : "text-[var(--design-ink-muted)] hover:text-[var(--design-ink)]"
                  }`}
                  style={
                    active
                      ? {
                          backgroundColor: "var(--design-surface)",
                          color: "var(--design-sapphire)",
                        }
                      : undefined
                  }
                >
                  {lang.id}
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Mastery Progress Ring */}
        <div className="p-3 rounded-2xl bg-[var(--design-surface)] border border-[var(--design-border)] flex items-center gap-3">
          <div className="relative w-11 h-11 shrink-0 flex items-center justify-center">
            <svg width="44" height="44" viewBox="0 0 44 44" className="-rotate-90" aria-hidden="true">
              <circle
                cx="22"
                cy="22"
                r={radius}
                fill="none"
                stroke="var(--design-well-deep)"
                strokeWidth="4"
              />
              <circle
                cx="22"
                cy="22"
                r={radius}
                fill="none"
                stroke="var(--design-emerald)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className="transition-all duration-300"
              />
            </svg>
            <span className="absolute design-mono text-[10px] font-bold text-[var(--design-ink)]">
              {pct}%
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-semibold text-[var(--design-ink)] truncate">
              {completedCount} / {curriculum.lessonCount || "—"} lessons
            </div>
            <div className="design-mono text-[11px] text-[var(--design-ink-muted)] mt-0.5">
              {dueCount > 0 ? (
                <span style={{ color: "var(--design-sapphire)" }} className="font-semibold">
                  {dueCount} due today
                </span>
              ) : (
                "All reviews caught up"
              )}
            </div>
          </div>
        </div>

        {/* Quick Search Trigger */}
        <button
          type="button"
          onClick={onOpenSearch}
          className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-2xl bg-[var(--design-surface)] border border-[var(--design-border)] text-xs text-[var(--design-ink-muted)] hover:text-[var(--design-ink)] hover:border-[var(--design-sapphire-border)] transition cursor-pointer"
        >
          <span className="inline-flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[var(--design-sapphire)]" aria-hidden="true" />
            <span>Search words &amp; lessons</span>
          </span>
          <kbd className="design-mono text-[10px] px-1.5 py-0.5 rounded bg-[var(--design-well)] text-[var(--design-ink-muted)]">
            ⌘K
          </kbd>
        </button>

        {/* Primary Studio Navigation */}
        <nav aria-label="Primary studio routes" className="space-y-4">
          <div className="space-y-1">
            <span className="block px-2.5 pb-1 design-mono text-[10px] uppercase tracking-[0.14em] text-[var(--design-ink-muted)]">
              Studio
            </span>
            {studioItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.basePath);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-sm font-medium transition ${
                    active
                      ? "font-semibold"
                      : "text-[var(--design-ink-muted)] hover:text-[var(--design-ink)] hover:bg-[var(--design-well)]/70"
                  }`}
                  style={
                    active
                      ? {
                          backgroundColor: "var(--design-sapphire-soft)",
                          color: "var(--design-sapphire)",
                        }
                      : undefined
                  }
                >
                  <span className="inline-flex items-center gap-2.5 min-w-0">
                    <Icon className="w-4 h-4 shrink-0" aria-hidden={true} />
                    <span className="truncate">{item.label}</span>
                  </span>
                  {item.id === "review" && dueCount > 0 && (
                    <span
                      className="design-mono text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: "var(--design-sapphire)",
                        color: "var(--design-on-accent)",
                      }}
                    >
                      {dueCount}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="space-y-1">
            <span className="block px-2.5 pb-1 design-mono text-[10px] uppercase tracking-[0.14em] text-[var(--design-ink-muted)]">
              Reference
            </span>
            {referenceItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.basePath);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition ${
                    active
                      ? "font-semibold"
                      : "text-[var(--design-ink-muted)] hover:text-[var(--design-ink)] hover:bg-[var(--design-well)]/70"
                  }`}
                  style={
                    active
                      ? {
                          backgroundColor: "var(--design-sapphire-soft)",
                          color: "var(--design-sapphire)",
                        }
                      : undefined
                  }
                >
                  <Icon className="w-4 h-4 shrink-0" aria-hidden={true} />
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Explicit UI Switcher Footer */}
      <div className="pt-3 border-t border-[var(--design-border)] space-y-2">
        <span className="block px-1.5 design-mono text-[10px] uppercase tracking-[0.14em] text-[var(--design-ink-muted)]">
          Switch UI Shell
        </span>
        <div className="grid grid-cols-3 gap-1 p-1 rounded-xl bg-[var(--design-well)] border border-[var(--design-border)] text-center design-mono text-[11px]">
          <Link
            href="/"
            className="py-1.5 rounded-lg text-[var(--design-ink-muted)] hover:text-[var(--design-ink)] transition"
          >
            Original
          </Link>
          <Link
            href="/taste"
            className="py-1.5 rounded-lg text-[var(--design-ink-muted)] hover:text-[var(--design-ink)] transition"
          >
            Taste
          </Link>
          <span
            aria-current="true"
            className="py-1.5 rounded-lg font-bold shadow-xs"
            style={{
              backgroundColor: "var(--design-surface)",
              color: "var(--design-sapphire)",
            }}
          >
            Design
          </span>
        </div>
      </div>
    </aside>
  );
}
