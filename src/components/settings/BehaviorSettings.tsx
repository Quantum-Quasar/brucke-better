"use client";

import { useAppStore } from "@/lib/store";
import { SettingItem } from "./SettingItem";
import { RotateCcw, Type, Zap } from "lucide-react";
import { getLanguageDefinition } from "@/data/languages";
import type { QuickRestart } from "@/data/settings";
import { SegButton } from "./SegButton";

export function BehaviorSettings({ matches, sectionVisible }: {
  matches: (keywords: string[]) => boolean;
  sectionVisible: (id: string) => boolean;
}) {
  const settings = useAppStore((s) => s.settings);
  const updateSetting = useAppStore((s) => s.updateSetting);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const activeLanguage = getLanguageDefinition(activeLanguageId);
  const specialChars = activeLanguage.specialChars.map(([char]) => char).join(", ");

  return (
        <section id="behavior" style={{ display: sectionVisible("behavior") ? undefined : "none" }} className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--sub-color)] border-b border-[var(--sub-color)]/20 pb-2">
            <Zap className="w-4 h-4 text-[var(--main-color)]" />
            <span>behavior</span>
          </div>

          {/* quick restart */}
          <SettingItem
            id="quick-restart"
            icon={RotateCcw}
            title="quick restart"
            description="Press a hotkey to instantly restart the current lesson question or review card."
            matchesSearch={matches(["quick restart", "esc", "restart", "behavior"])}
          >
            {(["off", "esc"] as QuickRestart[]).map((mode) => (
              <SegButton key={mode} selected={settings.quickRestart === mode} onClick={() => updateSetting("quickRestart", mode)}>
                {mode}
              </SegButton>
            ))}
          </SettingItem>

          {/* lazy mode / umlaut tolerance */}
          <SettingItem
            id="lazy-mode"
            icon={Type}
            title={
              activeLanguageId === "de" ? "lazy mode (umlaut tolerance)" : "lazy mode (accent tolerance)"
            }
            description={
              activeLanguageId === "de"
                ? "Tolerates ae, oe, ue, and ss in place of ä, ö, ü, and ß so you can type quickly on US English keyboards without modifier switching."
                : `Tolerates unaccented spellings of ${activeLanguage.name}'s special characters (${specialChars}) so you can type quickly without modifier switching.`
            }
            matchesSearch={matches([
              "lazy mode", "umlaut", "accent", "tolerance", "ae", "oe", "ue", "ss",
              activeLanguage.name.toLowerCase(),
            ])}
          >
            {[false, true].map((val) => (
              <SegButton key={String(val)} selected={settings.lazyMode === val} onClick={() => updateSetting("lazyMode", val)}>
                {val ? "on" : "off"}
              </SegButton>
            ))}
          </SettingItem>

          {/* capitalization tolerance */}
          <SettingItem
            id="cap-tolerance"
            icon={Type}
            title="capitalization tolerance"
            description={
              activeLanguageId === "de"
                ? "Tolerates lowercase German nouns without marking them incorrect, showing only a gentle grammatical reminder."
                : `Only affects German noun capitalization. ${activeLanguage.name} does not capitalize common nouns, so this setting has no effect here.`
            }
            matchesSearch={matches(["capitalization", "noun", "lowercase", "tolerance"])}
          >
            <div className="flex items-center gap-1.5">
              {activeLanguageId !== "de" && (
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--sub-color)] border border-[var(--sub-color)]/25 rounded px-1.5 py-0.5">
                  German only
                </span>
              )}
              {[false, true].map((val) => (
                <SegButton
                  key={String(val)}
                  selected={settings.capitalizationTolerance === val}
                  disabled={activeLanguageId !== "de"}
                  onClick={() => updateSetting("capitalizationTolerance", val)}
                >
                  {val ? "on" : "off"}
                </SegButton>
              ))}
            </div>
          </SettingItem>

          {/* posture cues (TM-4b) */}
          <SettingItem
            id="posture-cues"
            icon={Zap}
            title="posture cues"
            description="Occasional one-line reminders of how to take the course — pause, think aloud, let Review do its job. At most two per lesson, never graded."
            matchesSearch={matches(["posture", "cues", "pause", "whisper", "behavior", "reminders"])}
          >
            {[false, true].map((val) => (
              <SegButton key={String(val)} selected={settings.showPostureCues === val} onClick={() => updateSetting("showPostureCues", val)}>
                {val ? "on" : "off"}
              </SegButton>
            ))}
          </SettingItem>
        </section>
  );
}
