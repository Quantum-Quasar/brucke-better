"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Map, RotateCcw, User } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { isModifiedClick } from "@/lib/app-navigation";
import { captureScroll } from "@/lib/scroll-memory";
import { getDueCards } from "@/lib/srs";
import { prefetchAtlasContent, prefetchReviewContent } from "@/lib/content-client";

const EXPLORE_ROUTES = ["/atlas", "/panorama", "/read", "/practice"];
const ME_ROUTES = ["/settings", "/cando", "/mistakes", "/about"];

function matchesPrefix(pathname: string, prefixes: string[]): boolean {
  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const srsCards = useAppStore((s) => s.srsCards);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const lessonOpen = useViewStore((s) => s.subView?.kind === "lesson");
  const closeSubview = useViewStore((s) => s.closeSubview);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const dueCount = mounted ? getDueCards(srsCards).length : 0;

  const prefetch = (href: string) => {
    if (href === "/atlas") prefetchAtlasContent(activeLanguageId);
    else if (href === "/review") prefetchReviewContent(activeLanguageId);
  };

  // Lessons own the whole viewport: the dock was covering the forward action,
  // so taps landed on Review instead of advancing the lesson.
  if (lessonOpen) return null;

  const tabs = [
    {
      href: "/",
      label: "learn",
      icon: Map,
      isActive: pathname === "/" || pathname.startsWith("/trail/"),
      badge: 0,
    },
    {
      href: "/review",
      label: "review",
      icon: RotateCcw,
      isActive: pathname.startsWith("/review"),
      badge: dueCount,
    },
    {
      href: "/atlas",
      label: "explore",
      icon: Compass,
      isActive: matchesPrefix(pathname, EXPLORE_ROUTES),
      badge: 0,
    },
    {
      href: "/settings",
      label: "me",
      icon: User,
      isActive: matchesPrefix(pathname, ME_ROUTES),
      badge: 0,
    },
  ];

  return (
    <nav
      className="pointer-events-none fixed bottom-0 left-0 right-0 z-40 px-safe-dock pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-md md:max-w-lg">
        <div className="pointer-events-auto flex items-center justify-around rounded-2xl border border-[var(--sub-color)]/25 bg-[var(--bg-color)]/95 backdrop-blur px-2 py-1.5 shadow-lg shadow-black/10 font-mono">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={tab.isActive ? (pathname === tab.href ? "page" : "true") : undefined}
                onClick={(event) => {
                  if (isModifiedClick(event)) return;
                  // Same-tab clicks do not navigate; don't arm a capture for them.
                  if (pathname !== tab.href) captureScroll(pathname);
                  // A tab click always lands on that tab's root view.
                  if (tab.href === "/atlas") closeSubview();
                }}
                onPointerEnter={() => prefetch(tab.href)}
                onTouchStart={() => prefetch(tab.href)}
                onFocus={() => prefetch(tab.href)}
                className={`relative flex min-w-0 flex-1 basis-0 flex-col items-center justify-center rounded-xl px-1.5 py-2 sm:px-3 transition ${
                  tab.isActive
                    ? "bg-[var(--main-color)]/12 text-[var(--main-color)] font-bold"
                    : "text-[var(--sub-color)] hover:text-[var(--text-color)]"
                }`}
              >
                <span className="relative">
                  <Icon className="w-[18px] h-[18px] mb-0.5" aria-hidden="true" />
                  {tab.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-0.5 rounded-full bg-[var(--main-color)] text-[var(--bg-color)] text-[9px] font-bold flex items-center justify-center">
                      {tab.badge > 99 ? "99+" : tab.badge}<span className="sr-only"> due</span>
                    </span>
                  )}
                </span>
                <span className="text-[10px] leading-none sm:text-[11px]">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
