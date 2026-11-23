"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { SettingItem } from "./SettingItem";
import { RotateCcw, Type, Zap } from "lucide-react";
import { getLanguageDefinition } from "@/data/languages";
import type { QuickRestart } from "@/data/settings";
import { SegButton } from "./SegButton";

export function BehaviorSettings({ matches, sectionVisible, normalizedQuery = "" }: {
  matches: (keywords: string[]) => boolean;
  sectionVisible: (id: string) => boolean;
  normalizedQuery?: string;
}) {
  const settings = useAppStore((s) => s.settings);
  const updateSetting = useAppStore((s) => s.updateSetting);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const advancedOpen = showAdvanced || Boolean(normalizedQuery);
  const activePreset =
    settings.confidenceMode === "off" &&
    settings.lazyMode &&
    settings.capitalizationTolerance &&
    settings.stopOnError === "off"
      ? "forgiving"
      : settings.confidenceMode === "off" &&
          !settings.lazyMode &&
          !settings.capitalizationTolerance &&
          settings.stopOnError === "letter"
        ? "strict"
        : settings.confidenceMode === "off" &&
            settings.lazyMode &&
            !settings.capitalizationTolerance &&
            settings.stopOnError === "off"
          ? "standard"
          : "custom";

  const applyPreset = (preset: "forgiving" | "standard" | "strict") => {
    if (preset === "forgiving") {
      updateSetting("lazyMode", true);
      updateSetting("capitalizationTolerance", true);
      updateSetting("stopOnError", "off");
      updateSetting("confidenceMode", "off");
    } else if (preset === "standard") {
      updateSetting("lazyMode", true);
      updateSetting("capitalizationTolerance", false);
      updateSetting("stopOnError", "off");
      updateSetting("confidenceMode", "off");
    } else {
      updateSetting("lazyMode", false);
      updateSetting("capitalizationTolerance", false);
      updateSetting("stopOnError", "letter");
      updateSetting("confidenceMode", "off");
    }
  };
  const activeLanguage = getLanguageDefinition(activeLanguageId);
  const specialChars = activeLanguage.specialChars.map(([char]) => char).join(", ");

  return (
        <section id="behavior" style={{ display: sectionVisible("behavior") ? undefined : "none" }} className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--sub-color)] border-b border-[var(--sub-color)]/20 pb-2">
            <Zap className="w-4 h-4 text-[var(--main-color)]" />
            <span>behavior</span>
          </div>

          {/* typing preset */}
          <SettingItem
            id="typing-preset"
            icon={Type}
            title="typing strictness"
            description="Forgiving accepts ae/oe/ue and lowercase nouns; Standard checks noun capitalization; Strict requires exact accents and stops on wrong letters."
            matchesSearch={matches(["typing", "preset", "forgiving", "standard", "strict", "umlaut", "behavior"])}
          >
            {(["forgiving", "standard", "strict"] as const).map((preset) => (
              <SegButton key={preset} selected={activePreset === preset} onClick={() => applyPreset(preset)}>
                {preset}
              </SegButton>
            ))}
          </SettingItem>

          <button
            type="button"
            aria-expanded={advancedOpen}
            onClick={() => setShowAdvanced((v) => !v)}
            className="text-xs font-mono text-[var(--sub-color)] hover:text-[var(--main-color)] underline underline-offset-4 cursor-pointer"
          >
            {advancedOpen ? "Hide advanced typing & behavior toggles" : "Show advanced typing & behavior toggles"}
          </button>

          {advancedOpen && (<>
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
          </>)}
        </section>
  );
}
