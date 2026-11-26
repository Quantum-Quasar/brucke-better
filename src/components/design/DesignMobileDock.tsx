"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import {
  DESIGN_MOBILE_PRIMARY_IDS,
  DESIGN_NAV_ITEMS,
} from "@/components/design/DesignNavConfig";
import { LANGUAGES } from "@/data/languages";
import { useAppStore } from "@/lib/store";
import { getDueCards } from "@/lib/srs";
import { stripUiVariantPrefix } from "@/lib/routes";

interface DesignMobileDockProps {
  mode: "light" | "dark";
  onToggleMode: () => void;
  onOpenSearch: () => void;
}

const AVAILABLE_LANGUAGES = LANGUAGES.filter((l) => l.status === "available");

export function DesignMobileDock({
  mode,
  onToggleMode,
  onOpenSearch,
}: DesignMobileDockProps) {
  const pathname = usePathname();
  const basePath = stripUiVariantPrefix(pathname);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const setActiveLanguage = useAppStore((s) => s.setActiveLanguage);
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const srsCards = useAppStore((s) => s.srsCards);
  const storeHydrated = useAppStore((s) => s.storeHydrated);

  const dueCount = storeHydrated ? getDueCards(srsCards).length : 0;

  const primaryItems = DESIGN_NAV_ITEMS.filter((item) =>
    (DESIGN_MOBILE_PRIMARY_IDS as readonly string[]).includes(item.id)
  );
  const secondaryItems = DESIGN_NAV_ITEMS.filter(
    (item) => !(DESIGN_MOBILE_PRIMARY_IDS as readonly string[]).includes(item.id)
  );

  const isActive = (itemBasePath: string) => {
    if (itemBasePath === "/") {
      return basePath === "/" || basePath.startsWith("/trail/");
    }
    return basePath === itemBasePath || basePath.startsWith(`${itemBasePath}/`);
  };

  return (
    <>
      {/* Compact Mobile Top Header */}
      <header className="design-mobile-topbar lg:hidden sticky top-0 z-30 safe-x">
        <div className="flex items-center justify-between gap-2 px-3 py-2">
          <Link
            href="/design"
            className="flex items-center gap-2 min-h-11 pr-2 rounded-xl"
          >
            <span
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{
                backgroundColor: "var(--design-sapphire)",
                color: "var(--design-on-accent)",
              }}
              aria-hidden="true"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 16.5C3 11.2533 7.02944 7 12 7C16.9706 7 21 11.2533 21 16.5"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <path
                  d="M2 17.5H22"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <span className="design-serif text-base font-bold text-[var(--design-ink)]">
              Brücke
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {/* Compact Language Switcher */}
            <div
              role="group"
              aria-label="Active language"
              className="flex items-center p-0.5 rounded-xl bg-[var(--design-well)] border border-[var(--design-border)]"
            >
              {AVAILABLE_LANGUAGES.map((lang) => {
                const active = lang.id === activeLanguageId;
                return (
                  <button
                    key={lang.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setActiveLanguage(lang.id);
                      completeOnboarding();
                    }}
                    className={`min-h-9 min-w-8 px-1.5 rounded-lg design-mono text-[11px] font-bold uppercase transition cursor-pointer ${
                      active ? "shadow-xs" : "text-[var(--design-ink-muted)]"
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

            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Search words and lessons"
              className="min-h-11 min-w-11 flex items-center justify-center rounded-xl text-[var(--design-ink-muted)] hover:text-[var(--design-sapphire)] transition cursor-pointer"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onToggleMode}
              aria-label={mode === "light" ? "Switch to dark mode" : "Switch to light mode"}
              className="min-h-11 min-w-11 flex items-center justify-center rounded-xl text-[var(--design-ink-muted)] hover:text-[var(--design-sapphire)] transition cursor-pointer"
            >
              {mode === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Secondary Routes & UI Switcher Sheet */}
      {drawerOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-black/50 backdrop-blur-[2px]"
          onClick={() => setDrawerOpen(false)}
        >
          <div
            role="dialog"
            aria-label="More studio sections"
            className="rounded-t-3xl bg-[var(--design-surface)] border-t border-[var(--design-border)] px-4 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] space-y-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="design-serif text-lg font-bold text-[var(--design-ink)]">
                Studio Menu
              </span>
              <button
                type="button"
                aria-label="Close studio menu"
                onClick={() => setDrawerOpen(false)}
                className="min-h-11 min-w-11 flex items-center justify-center rounded-xl bg-[var(--design-well)] text-[var(--design-ink)] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.basePath);
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={`min-h-12 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border text-sm font-medium transition ${
                      active
                        ? "font-semibold"
                        : "bg-[var(--design-well)]/60 border-[var(--design-border)] text-[var(--design-ink)]"
                    }`}
                    style={
                      active
                        ? {
                            backgroundColor: "var(--design-sapphire-soft)",
                            borderColor: "var(--design-sapphire-border)",
                            color: "var(--design-sapphire)",
                          }
                        : undefined
                    }
                  >
                    <Icon className="w-4 h-4 shrink-0" aria-hidden={true} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>

            <div className="pt-2 border-t border-[var(--design-border)] space-y-2">
              <span className="block design-mono text-[10px] uppercase tracking-[0.14em] text-[var(--design-ink-muted)]">
                Switch UI Shell
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                <Link
                  href="/"
                  onClick={() => setDrawerOpen(false)}
                  className="min-h-11 flex items-center justify-center rounded-xl bg-[var(--design-well)] design-mono text-xs font-semibold text-[var(--design-ink-muted)]"
                >
                  Original
                </Link>
                <Link
                  href="/taste"
                  onClick={() => setDrawerOpen(false)}
                  className="min-h-11 flex items-center justify-center rounded-xl bg-[var(--design-well)] design-mono text-xs font-semibold text-[var(--design-ink-muted)]"
                >
                  Taste
                </Link>
                <span
                  aria-current="true"
                  className="min-h-11 flex items-center justify-center rounded-xl design-mono text-xs font-bold"
                  style={{
                    backgroundColor: "var(--design-sapphire)",
                    color: "var(--design-on-accent)",
                  }}
                >
                  Design
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Pill Bottom Navigation Dock */}
      <nav
        aria-label="Main navigation"
        className="design-mobile-dock lg:hidden fixed left-1/2 -translate-x-1/2 z-40 w-[calc(100%-1.25rem)] max-w-md rounded-full px-1.5 py-1"
      >
        <div className="grid grid-cols-5 items-center gap-0.5">
          {primaryItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.basePath);
            return (
              <Link
                key={item.id}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className="relative min-h-11 flex flex-col items-center justify-center gap-0.5 rounded-full px-1 py-1 text-[10px] font-semibold transition"
                style={
                  active
                    ? {
                        backgroundColor: "var(--design-sapphire-soft)",
                        color: "var(--design-sapphire)",
                      }
                    : { color: "var(--design-ink-muted)" }
                }
              >
                <Icon className="w-4 h-4 shrink-0" aria-hidden={true} />
                <span className="truncate max-w-full">{item.shortLabel}</span>
                {item.id === "review" && dueCount > 0 && (
                  <span
                    className="absolute top-1 right-2.5 w-2 h-2 rounded-full"
                    style={{ backgroundColor: "var(--design-sapphire)" }}
                    aria-label={`${dueCount} due`}
                  />
                )}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-expanded={drawerOpen}
            className="min-h-11 flex flex-col items-center justify-center gap-0.5 rounded-full px-1 py-1 text-[10px] font-semibold text-[var(--design-ink-muted)] hover:text-[var(--design-ink)] transition cursor-pointer"
          >
            <Menu className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>More</span>
          </button>
        </div>
      </nav>
    </>
  );
}
