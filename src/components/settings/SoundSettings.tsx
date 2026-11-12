"use client";

import { useAppStore } from "@/lib/store";
import { SettingItem } from "./SettingItem";
import { Keyboard, ShieldAlert, Volume2, VolumeX, Play } from "lucide-react";
import { VoiceStatusBanner } from "@/components/common/VoiceStatusBanner";
import { SOUND_CLICK_OPTIONS, SOUND_ERROR_OPTIONS, soundEngine } from "@/lib/sound";
import { SegButton } from "./SegButton";

export function SoundSettings({ matches, sectionVisible, normalizedQuery }: {
  matches: (keywords: string[]) => boolean;
  sectionVisible: (id: string) => boolean;
  normalizedQuery: string;
}) {
  const settings = useAppStore((s) => s.settings);
  const updateSetting = useAppStore((s) => s.updateSetting);
  const handlePreviewClick = (clickId: string) => {
    void soundEngine.playClick(clickId, settings.soundVolume || 0.5);
  };
  const handlePreviewError = (errorId: string) => {
    void soundEngine.playError(errorId, settings.soundVolume || 0.5);
  };

  return (
        <section id="sound" style={{ display: sectionVisible("sound") ? undefined : "none" }} className="space-y-3 pt-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--sub-color)] border-b border-[var(--sub-color)]/20 pb-2">
            <Volume2 className="w-4 h-4 text-[var(--main-color)]" />
            <span>sound</span>
          </div>
          {(!normalizedQuery || /voice|tts|speech/i.test(normalizedQuery)) && (
            <VoiceStatusBanner showWhenAvailable />
          )}

          {/* sound volume */}
          <SettingItem
            id="sound-volume"
            icon={Volume2}
            title="sound volume"
            description="Adjust the master volume of all typing keypresses and audio feedback cues."
            matchesSearch={matches(["sound volume", "volume", "loudness", "mute", "sound"])}
          >
            <div className="flex items-center gap-3 w-full md:w-64">
              {settings.soundVolume === 0 ? (
                <VolumeX className="w-4 h-4 text-[var(--sub-color)]" />
              ) : (
                <Volume2 className="w-4 h-4 text-[var(--main-color)]" />
              )}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.soundVolume}
                onChange={(e) => updateSetting("soundVolume", parseFloat(e.target.value))}
                className="w-full accent-[var(--main-color)] cursor-pointer"
              />
              <span className="font-mono text-xs text-[var(--sub-color)] w-10 text-right">
                {Math.round(settings.soundVolume * 100)}%
              </span>
            </div>
          </SettingItem>

          {/* play sound on click */}
          <SettingItem
            id="play-sound-click"
            icon={Keyboard}
            title="play sound on click"
            description="Authentic mechanical keyboard switch audio packs with subtle acoustic variation per keystroke."
            matchesSearch={matches(["play sound on click", "switch", "mechanical", "cherry", "typewriter", "sound"])}
          >
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={settings.playSoundOnClick}
                onChange={(e) => {
                  const val = e.target.value;
                  updateSetting("playSoundOnClick", val);
                  if (val !== "off") handlePreviewClick(val);
                }}
                className="px-3 py-1.5 rounded text-xs font-mono bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/30 text-[var(--text-color)] focus:outline-none focus:border-[var(--main-color)] cursor-pointer"
              >
                {SOUND_CLICK_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}
              </select>

              {settings.playSoundOnClick !== "off" && (
                <button
                  type="button"
                  onClick={() => handlePreviewClick(settings.playSoundOnClick)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-[var(--sub-alt-color)] text-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-[var(--bg-color)] transition cursor-pointer"
                  title="Test click sound"
                >
                  <Play className="w-3 h-3" />
                  <span>test switch</span>
                </button>
              )}
            </div>
          </SettingItem>

          {/* play sound on error */}
          <SettingItem
            id="play-sound-error"
            icon={ShieldAlert}
            title="play sound on error"
            description="Plays an acoustic notification tone when a mistake or incorrect answer is submitted."
            matchesSearch={matches(["play sound on error", "error sound", "damage", "sound"])}
          >
            <div className="flex items-center gap-2 flex-wrap">
              {SOUND_ERROR_OPTIONS.map((opt) => (
                <SegButton
                  key={opt.id}
                  selected={settings.playSoundOnError === opt.id}
                  onClick={() => {
                    updateSetting("playSoundOnError", opt.id);
                    if (opt.id !== "off") handlePreviewError(opt.id);
                  }}
                >
                  {opt.name}
                </SegButton>
              ))}

              {settings.playSoundOnError !== "off" && (
                <button
                  type="button"
                  onClick={() => handlePreviewError(settings.playSoundOnError)}
                  className="flex items-center gap-1 px-2.5 py-1.5 rounded text-xs font-mono bg-[var(--sub-alt-color)] text-[var(--error-color)] hover:bg-[var(--error-color)] hover:text-[var(--bg-color)] transition cursor-pointer"
                  title="Test error sound"
                >
                  <Play className="w-3 h-3" />
                  <span>test</span>
                </button>
              )}
            </div>
          </SettingItem>
        </section>
  );
}
