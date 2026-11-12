"use client";

import { useAppStore } from "@/lib/store";
import { SettingItem } from "./SettingItem";
import { EyeOff, Keyboard, ShieldAlert, Eye } from "lucide-react";
import { SegButton } from "./SegButton";

export function VisibilitySettings({ matches, sectionVisible }: {
  matches: (keywords: string[]) => boolean;
  sectionVisible: (id: string) => boolean;
}) {
  const settings = useAppStore((s) => s.settings);
  const updateSetting = useAppStore((s) => s.updateSetting);

  return (
        <section id="hide_elements" style={{ display: sectionVisible("hide_elements") ? undefined : "none" }} className="space-y-3 pt-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--sub-color)] border-b border-[var(--sub-color)]/20 pb-2">
            <EyeOff className="w-4 h-4 text-[var(--main-color)]" />
            <span>visibility & accessibility</span>
          </div>

          {/* key tips */}
          <SettingItem
            id="show-key-tips"
            icon={Keyboard}
            title="show key tips"
            description="Display numeric hotkey pills ([1], [2], [Enter]) on choice buttons and exercise tiles."
            matchesSearch={matches(["key tips", "hotkey badges", "shortcuts", "hide"])}
          >
            {[true, false].map((val) => (
              <SegButton key={String(val)} selected={settings.showKeyTips === val} onClick={() => updateSetting("showKeyTips", val)}>
                {val ? "show" : "hide"}
              </SegButton>
            ))}
          </SettingItem>

          {/* caps lock warning */}
          <SettingItem
            id="caps-lock-warning"
            icon={ShieldAlert}
            title="caps lock warning"
            description="Display an alert indicator when Caps Lock is toggled during typing exercises."
            matchesSearch={matches(["caps lock warning", "caps lock", "hide"])}
          >
            {[true, false].map((val) => (
              <SegButton key={String(val)} selected={settings.capsLockWarning === val} onClick={() => updateSetting("capsLockWarning", val)}>
                {val ? "on" : "off"}
              </SegButton>
            ))}
          </SettingItem>

          {/* show mastery counter */}
          <SettingItem
            id="show-mastery-counter"
            icon={Eye}
            title="progress counter in nav"
            description="Show or hide the words-seen progress badge in the top navigation bar. Words become mastered only after repeated successful reviews."
            matchesSearch={matches(["mastery counter", "progress counter", "progress", "badge", "nav", "hide"])}
          >
            {[true, false].map((val) => (
              <SegButton key={String(val)} selected={settings.showMasteryCounter === val} onClick={() => updateSetting("showMasteryCounter", val)}>
                {val ? "show" : "hide"}
              </SegButton>
            ))}
          </SettingItem>

          {/* increased contrast */}
          <SettingItem
            id="increased-contrast"
            icon={Eye}
            title="increase contrast"
            description="Strengthen muted text and error colors for easier reading. Your selected theme stays unchanged."
            matchesSearch={matches(["contrast", "readability", "muted text", "accessibility", "hide"])}
          >
            {[true, false].map((val) => (
              <SegButton key={String(val)} selected={settings.increasedContrast === val} onClick={() => updateSetting("increasedContrast", val)}>
                {val ? "on" : "off"}
              </SegButton>
            ))}
          </SettingItem>
        </section>
  );
}
