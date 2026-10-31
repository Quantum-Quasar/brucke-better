"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Info, Map, RotateCcw, Sliders, Table2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { getDueCards } from "@/lib/srs";
import { prefetchAtlasContent, prefetchReviewContent } from "@/lib/content-client";

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
      label: "trail",
      icon: Map,
      isActive: pathname === "/",
      badge: 0,
    },
    { href: "/atlas", label: "atlas", icon: Compass, isActive: pathname.startsWith("/atlas"), badge: 0 },
    { href: "/panorama", label: "panorama", icon: Table2, isActive: pathname.startsWith("/panorama"), badge: 0 },
    { href: "/review", label: "review", icon: RotateCcw, isActive: pathname.startsWith("/review"), badge: dueCount },
    { href: "/settings", label: "settings", icon: Sliders, isActive: pathname.startsWith("/settings"), badge: 0 },
    { href: "/about", label: "about", icon: Info, isActive: pathname.startsWith("/about"), badge: 0 },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-md md:max-w-lg">
        <div className="flex items-center justify-around rounded-2xl border border-[var(--sub-color)]/25 bg-[var(--bg-color)]/95 backdrop-blur px-2 py-1.5 shadow-lg shadow-black/10 font-mono">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                aria-current={tab.isActive ? "page" : undefined}
                onClick={() => {
                  // A tab click always lands on that tab's root view.
                  if (tab.href === "/atlas") closeSubview();
                }}
                onPointerEnter={() => prefetch(tab.href)}
                onTouchStart={() => prefetch(tab.href)}
                onFocus={() => prefetch(tab.href)}
                className={`relative flex flex-col items-center justify-center min-w-[56px] sm:min-w-[68px] py-1 px-2 rounded-xl transition ${
                  tab.isActive
                    ? "bg-[var(--main-color)]/12 text-[var(--main-color)] font-bold"
                    : "text-[var(--sub-color)] hover:text-[var(--text-color)]"
                }`}
              >
                <span className="relative">
                  <Icon className="w-[18px] h-[18px] mb-0.5" />
                  {tab.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2 min-w-[15px] h-[15px] px-0.5 rounded-full bg-[var(--main-color)] text-[var(--bg-color)] text-[9px] font-bold flex items-center justify-center">
                      {tab.badge > 99 ? "99+" : tab.badge}
                    </span>
                  )}
                </span>
                <span className="text-[10px] leading-none">{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
