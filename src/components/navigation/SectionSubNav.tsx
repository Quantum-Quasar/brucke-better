"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Table2, BookOpen, Dumbbell, Sliders, CheckSquare, AlertTriangle, Info } from "lucide-react";
import { useViewStore } from "@/lib/view-store";

interface SubNavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const EXPLORE_ITEMS: SubNavItem[] = [
  { href: "/atlas", label: "atlas", icon: Compass },
  { href: "/panorama", label: "panorama", icon: Table2 },
  { href: "/read", label: "read", icon: BookOpen },
  { href: "/practice", label: "practice", icon: Dumbbell },
];

const ME_ITEMS: SubNavItem[] = [
  { href: "/settings", label: "settings", icon: Sliders },
  { href: "/cando", label: "can-do", icon: CheckSquare },
  { href: "/mistakes", label: "mistakes", icon: AlertTriangle },
  { href: "/about", label: "about", icon: Info },
];

function isRouteGroup(pathname: string, items: SubNavItem[]): boolean {
  return items.some((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));
}

export const SectionSubNav: React.FC = () => {
  const pathname = usePathname();
  const subView = useViewStore((s) => s.subView);

  if (subView) return null;

  let items: SubNavItem[] | null = null;
  let label = "";
  if (isRouteGroup(pathname, EXPLORE_ITEMS)) {
    items = EXPLORE_ITEMS;
    label = "Explore navigation";
  } else if (isRouteGroup(pathname, ME_ITEMS)) {
    items = ME_ITEMS;
    label = "Personal tools navigation";
  }

  if (!items) return null;

  return (
    <nav
      aria-label={label}
      className="border-b border-[var(--sub-color)]/15 bg-[var(--bg-color)]/95 font-mono"
    >
      <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition ${
                active
                  ? "bg-[var(--main-color)]/12 text-[var(--main-color)] font-bold"
                  : "text-[var(--sub-color)] hover:bg-[var(--sub-alt-color)] hover:text-[var(--text-color)]"
              }`}
            >
              <Icon className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
