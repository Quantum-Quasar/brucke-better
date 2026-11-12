"use client";


import { Maximize2, Shuffle, Type } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { THEME_LIST } from "@/data/themes";
import { MENU_PANEL_FRAME } from "@/components/common/menu-panel";
import { ThemeBrowser } from "@/components/common/ThemeBrowser";

/** The open dropdown body. Split from the trigger so the 187-theme table is
 * only downloaded when someone opens the theme menu. */
export default function ThemeDropdownPanel({ onClose }: { onClose: () => void }) {
  const setTheme = useAppStore((s) => s.setTheme);
  const openThemeSelector = useAppStore((s) => s.openThemeSelector);
  const openFontSelector = useAppStore((s) => s.openFontSelector);

  const handleRandomTheme = () => {
    const chosen = THEME_LIST[Math.floor(Math.random() * THEME_LIST.length)];
    if (chosen) setTheme(chosen.id);
  };

  return (
    <div className={`${MENU_PANEL_FRAME} overflow-hidden font-sans text-[var(--text-color)] animate-in fade-in slide-in-from-top-1 duration-100`}>
      <ThemeBrowser compact autoFocus onPick={onClose} />

      <div className="p-2 border-t border-[var(--sub-color)]/20 bg-[var(--sub-alt-color)]/60 flex items-center justify-between text-[11px] font-mono">
        <button
          type="button"
          onClick={handleRandomTheme}
          className="inline-flex items-center gap-1 text-[var(--sub-color)] hover:text-[var(--text-color)] px-1.5 py-0.5 rounded transition cursor-pointer"
          title="Pick a random theme"
        >
          <Shuffle className="w-3 h-3 text-[var(--main-color)]" />
          <span>random</span>
        </button>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => {
              onClose();
              openFontSelector();
            }}
            className="inline-flex items-center gap-1 text-[var(--sub-color)] hover:text-[var(--text-color)] px-1.5 py-0.5 rounded transition cursor-pointer"
            title="Change font"
          >
            <Type className="w-3 h-3 text-[var(--main-color)]" />
            <span>font</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              openThemeSelector();
            }}
            className="inline-flex items-center gap-1 text-[var(--sub-color)] hover:text-[var(--text-color)] px-1.5 py-0.5 rounded transition cursor-pointer"
            title="Open full grid modal"
          >
            <Maximize2 className="w-3 h-3 text-[var(--main-color)]" />
            <span>all {THEME_LIST.length} grid</span>
          </button>
        </div>
      </div>
    </div>
  );
}
