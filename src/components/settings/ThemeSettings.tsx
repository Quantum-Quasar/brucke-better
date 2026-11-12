"use client";

import { useAppStore } from "@/lib/store";
import { SettingItem } from "./SettingItem";
import { Palette, Type } from "lucide-react";
import { THEME_COUNT } from "@/lib/theme-runtime";
import { FONT_LIST } from "@/data/fonts";

export function ThemeSettings({ matches, sectionVisible }: {
  matches: (keywords: string[]) => boolean;
  sectionVisible: (id: string) => boolean;
}) {
  const theme = useAppStore((s) => s.theme);
  const font = useAppStore((s) => s.font);
  const openThemeSelector = useAppStore((s) => s.openThemeSelector);
  const openFontSelector = useAppStore((s) => s.openFontSelector);

  return (
        <section id="theme" style={{ display: sectionVisible("theme") ? undefined : "none" }} className="space-y-3 pt-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--sub-color)] border-b border-[var(--sub-color)]/20 pb-2">
            <Palette className="w-4 h-4 text-[var(--main-color)]" />
            <span>theme & typography</span>
          </div>

          {/* active theme */}
          <SettingItem
            id="active-theme"
            icon={Palette}
            title="color scheme"
            description={`Currently active theme: ${theme}. Choose from ${THEME_COUNT} Monkeytype color schemes.`}
            matchesSearch={matches(["color scheme", "theme", "colors", "alduin"])}
          >
            <button
              type="button"
              onClick={openThemeSelector}
              className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono bg-[var(--sub-alt-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/20 text-[var(--main-color)] transition cursor-pointer"
            >
              <span>{theme}</span>
              <span className="text-[10px] text-[var(--sub-color)]">browse {THEME_COUNT} themes</span>
            </button>
          </SettingItem>

          {/* font family */}
          <SettingItem
            id="font-family"
            icon={Type}
            title="font family"
            description={`Currently active font: ${font}. Select from ${FONT_LIST.length} Monkeytype monospace, sans-serif, and display webfonts.`}
            matchesSearch={matches(["font family", "typeface", "fonts", "typography"])}
          >
            <button
              type="button"
              onClick={openFontSelector}
              className="flex items-center gap-2 px-3 py-1.5 rounded text-xs font-mono bg-[var(--sub-alt-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/20 text-[var(--main-color)] transition cursor-pointer"
            >
              <span>{font}</span>
              <span className="text-[10px] text-[var(--sub-color)]">browse {FONT_LIST.length} fonts</span>
            </button>
          </SettingItem>
        </section>
  );
}
