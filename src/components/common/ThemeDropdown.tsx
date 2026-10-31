"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { Palette, ChevronDown } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { DEFAULT_THEME, themeDisplayName } from "@/lib/theme-runtime";
import { LazyLoadBoundary } from "@/components/common/LazyLoadBoundary";
import { MENU_PANEL_FRAME } from "@/components/common/menu-panel";

// The menu body pulls in the whole theme table; keep it out of the shared chunk.
const loadPanel = () => import("./ThemeDropdownPanel");
const ThemeDropdownPanel = dynamic(loadPanel, {
  ssr: false,
  loading: () => (
    <div
      role="status"
      className={`${MENU_PANEL_FRAME} p-4 font-mono text-xs text-[var(--sub-color)]`}
    >
      loading themes…
    </div>
  ),
});

export const ThemeDropdown: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const currentTheme = useAppStore((s) => s.theme);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Click outside to close
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const shownThemeId = mounted ? currentTheme : DEFAULT_THEME;
  const displayName = themeDisplayName(shownThemeId);

  return (
    <div className="relative" ref={containerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        onPointerEnter={() => void loadPanel()}
        onFocus={() => void loadPanel()}
        className={`inline-flex min-h-11 items-center gap-1.5 rounded bg-[var(--sub-alt-color)] px-2.5 py-2 text-[var(--sub-color)] hover:bg-[var(--sub-alt-color)]/80 hover:text-[var(--text-color)] border transition cursor-pointer font-mono text-xs ${
          isOpen
            ? "border-[var(--main-color)] text-[var(--text-color)] ring-1 ring-[var(--main-color)]/30"
            : "border-[var(--sub-color)]/20"
        }`}
        title={`Change theme — current: ${displayName}`}
        aria-label={`Change theme — current: ${displayName}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Palette className="w-3.5 h-3.5 text-[var(--main-color)] shrink-0" />
        <span className="hidden lg:inline text-[11px] truncate max-w-[110px]">
          <span className="text-[var(--sub-color)]">theme</span> {displayName}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-[var(--sub-color)] transition-transform ${
            isOpen ? "rotate-180 text-[var(--main-color)]" : ""
          }`}
        />
      </button>

      {isOpen && (
        <LazyLoadBoundary label="the theme menu" inline>
          <ThemeDropdownPanel onClose={() => setIsOpen(false)} />
        </LazyLoadBoundary>
      )}
    </div>
  );
};
