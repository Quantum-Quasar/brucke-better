"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Compass, Dumbbell, Map, RotateCcw, Sliders } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { isModifiedClick } from "@/lib/app-navigation";
import { captureScroll } from "@/lib/scroll-memory";
import { getDueCards } from "@/lib/srs";
import { stripUiVariantPrefix } from "@/lib/routes";
import { prefetchAtlasContent, prefetchReviewContent } from "@/lib/content-client";

const MOBILE_TABS = [
  { href: "/taste", base: "/", label: "Trail", icon: Map },
  { href: "/taste/review", base: "/review", label: "Review", icon: RotateCcw },
  { href: "/taste/atlas", base: "/atlas", label: "Atlas", icon: Compass },
  { href: "/taste/practice", base: "/practice", label: "Practice", icon: Dumbbell },
  { href: "/taste/read", base: "/read", label: "Read", icon: BookOpen },
  { href: "/taste/settings", base: "/settings", label: "Settings", icon: Sliders },
] as const;

export function TasteMobileBar() {
  const pathname = usePathname();
  const basePath = stripUiVariantPrefix(pathname);
  const srsCards = useAppStore((s) => s.srsCards);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const lessonOpen = useViewStore((s) => s.subView?.kind === "lesson");
  const closeSubview = useViewStore((s) => s.closeSubview);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (lessonOpen) return null;

  const dueCount = mounted ? getDueCards(srsCards).length : 0;

  const handlePrefetch = (base: string) => {
    if (base === "/atlas") prefetchAtlasContent(activeLanguageId);
    else if (base === "/review") prefetchReviewContent(activeLanguageId);
  };

  return (
    <nav
      aria-label="Mobile navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-[var(--taste-border)] bg-[var(--taste-bg)]/95 backdrop-blur-sm"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-6 items-stretch">
        {MOBILE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            tab.base === "/"
              ? basePath === "/" || basePath.startsWith("/trail/")
              : basePath === tab.base || basePath.startsWith(`${tab.base}/`);
          const showDue = tab.base === "/review" && dueCount > 0;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              onClick={(event) => {
                if (isModifiedClick(event)) return;
                if (pathname !== tab.href) captureScroll(pathname);
                closeSubview();
              }}
              onPointerEnter={() => handlePrefetch(tab.base)}
              onTouchStart={() => handlePrefetch(tab.base)}
              className={`relative flex min-h-[52px] flex-col items-center justify-center gap-0.5 px-1 py-1.5 text-[10px] transition-colors ${
                isActive
                  ? "text-[var(--taste-accent)] font-semibold"
                  : "text-[var(--taste-muted)] hover:text-[var(--taste-ink)]"
              }`}
            >
              <span className="relative inline-flex items-center justify-center">
                <Icon className="w-[18px] h-[18px]" aria-hidden="true" />
                {showDue && (
                  <span
                    className="taste-mono absolute -top-1.5 -right-2.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--taste-accent)] px-1 text-[9px] font-bold text-[var(--taste-accent-ink)]"
                    aria-label={`${dueCount} due`}
                  >
                    {dueCount > 99 ? "99+" : dueCount}
                  </span>
                )}
              </span>
              <span className="truncate max-w-full leading-tight">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
