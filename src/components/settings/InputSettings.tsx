"use client";

import { useAppStore } from "@/lib/store";
import { SettingItem } from "./SettingItem";
import { Keyboard, ShieldAlert } from "lucide-react";
import { getLanguageDefinition } from "@/data/languages";
import type { StopOnError, ConfidenceMode, ShowCharBar } from "@/data/settings";
import { SegButton } from "./SegButton";

export function InputSettings({ matches, sectionVisible }: {
  matches: (keywords: string[]) => boolean;
  sectionVisible: (id: string) => boolean;
}) {
  const settings = useAppStore((s) => s.settings);
  const updateSetting = useAppStore((s) => s.updateSetting);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const activeLanguage = getLanguageDefinition(activeLanguageId);
  const specialChars = activeLanguage.specialChars.map(([char]) => char).join(", ");

  return (
        <section id="input" style={{ display: sectionVisible("input") ? undefined : "none" }} className="space-y-3 pt-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--sub-color)] border-b border-[var(--sub-color)]/20 pb-2">
            <Keyboard className="w-4 h-4 text-[var(--main-color)]" />
            <span>input</span>
          </div>

          {/* stop on error */}
          <SettingItem
            id="stop-on-error"
            icon={ShieldAlert}
            title="stop on error"
            description="Halts typing in derivation inputs as soon as an incorrect character is typed."
            matchesSearch={matches(["stop on error", "error", "letter", "input"])}
          >
            {(["off", "letter"] as StopOnError[]).map((mode) => (
              <SegButton key={mode} selected={settings.stopOnError === mode} onClick={() => updateSetting("stopOnError", mode)}>
                {mode}
              </SegButton>
            ))}
          </SettingItem>

          {/* confidence mode */}
          <SettingItem
            id="confidence-mode"
            icon={ShieldAlert}
            title="confidence mode"
            description="Disables the Backspace key during word derivation; forces you to commit to your cognate intuition."
            matchesSearch={matches(["confidence mode", "backspace", "input", "strict"])}
          >
            {(["off", "on"] as ConfidenceMode[]).map((mode) => (
              <SegButton key={mode} selected={settings.confidenceMode === mode} onClick={() => updateSetting("confidenceMode", mode)}>
                {mode}
              </SegButton>
            ))}
          </SettingItem>

          {/* german char bar */}
          <SettingItem
            id="show-char-bar"
            icon={Keyboard}
            title="special character bar"
            description={`Controls when the quick character bar for ${activeLanguage.name} (${specialChars}) is shown beneath typing inputs.`}
            matchesSearch={matches([
              "character bar", "special character bar", "char bar", "accents", "umlaut buttons",
              "input", activeLanguage.name.toLowerCase(),
            ])}
          >
            {(["always", "on_focus", "off"] as ShowCharBar[]).map((mode) => (
              <SegButton key={mode} selected={settings.showCharBar === mode} onClick={() => updateSetting("showCharBar", mode)}>
                {mode}
              </SegButton>
            ))}
          </SettingItem>
        </section>
  );
}
