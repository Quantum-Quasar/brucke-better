"use client";

import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { SettingItem } from "./SettingItem";
import { Keyboard, Mic, ShieldAlert, Volume2, VolumeX, Play } from "lucide-react";
import { VoiceStatusBanner } from "@/components/common/VoiceStatusBanner";
import { SOUND_CLICK_OPTIONS, SOUND_ERROR_OPTIONS, soundEngine } from "@/lib/sound";
import { SegButton } from "./SegButton";
import { getLanguageDefinition } from "@/data/languages";
import { DEFAULT_PRONUNCIATION_PREFERENCE, type PronunciationPreference, type PronunciationRate } from "@/data/settings";
import { detectLanguageVoice, getLanguageVoices, playTargetAudio, subscribeVoiceChanges, type VoiceAvailability } from "@/lib/audio";

const PRONUNCIATION_PREVIEWS: Record<string, string> = {
  de: "Hallo, ich lerne Deutsch.",
  fr: "Bonjour, j’apprends le français.",
  es: "Hola, estoy aprendiendo español.",
  nl: "Hallo, ik leer Nederlands.",
};

export function SoundSettings({ matches, sectionVisible, normalizedQuery }: {
  matches: (keywords: string[]) => boolean;
  sectionVisible: (id: string) => boolean;
  normalizedQuery: string;
}) {
  const settings = useAppStore((s) => s.settings);
  const updateSetting = useAppStore((s) => s.updateSetting);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);
  const pronunciation = settings.pronunciationByLanguage[activeLanguageId] ?? DEFAULT_PRONUNCIATION_PREFERENCE;
  const [voiceSnapshot, setVoiceSnapshot] = useState<{
    locale: string;
    voices: SpeechSynthesisVoice[];
    status: VoiceAvailability;
  } | null>(null);
  const [previewFailureLocale, setPreviewFailureLocale] = useState<string | null>(null);

  useEffect(() => {
    const refresh = () => setVoiceSnapshot({
      locale: language.ttsLocale,
      voices: getLanguageVoices(language.ttsLocale),
      status: detectLanguageVoice(language.ttsLocale),
    });
    const unsubscribe = subscribeVoiceChanges(refresh);
    refresh();
    return unsubscribe;
  }, [language.ttsLocale, pronunciation.voiceURI]);

  const currentVoices = voiceSnapshot?.locale === language.ttsLocale ? voiceSnapshot : null;
  const voices = currentVoices?.voices ?? [];
  const savedVoiceMissing = pronunciation.voiceURI !== null
    && !voices.some((voice) => voice.voiceURI === pronunciation.voiceURI);
  const updatePronunciation = (patch: Partial<PronunciationPreference>) => {
    updateSetting("pronunciationByLanguage", {
      ...settings.pronunciationByLanguage,
      [activeLanguageId]: { ...pronunciation, ...patch },
    });
    setPreviewFailureLocale(null);
  };
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

          <SettingItem
            id="pronunciation"
            icon={Volume2}
            title={`${language.name} pronunciation`}
            description={
              <>
                <p>Choose a browser voice and playback speed, saved separately for {language.name}. Changes stay silent until you press preview.</p>
                <p className="mt-1">Uses browser/system speech, not a Brücke cloud voice service. Voice quality and offline availability depend on your browser, its provider and installed voices.</p>
              </>
            }
            matchesSearch={matches(["voice", "tts", "speech", "pronunciation", "sound", "rate", "speed", "slow", "normal", "faster", "preview"])}
          >
            <div className="space-y-3 w-full md:w-72">
              <label className="block space-y-1 text-xs text-[var(--sub-color)]" htmlFor="pronunciation-voice">
                <span>{language.name} voice</span>
                <select
                  id="pronunciation-voice"
                  aria-label={`${language.name} pronunciation voice`}
                  value={pronunciation.voiceURI ?? ""}
                  disabled={!currentVoices?.status.supported}
                  onChange={(event) => updatePronunciation({ voiceURI: event.target.value || null })}
                  className="block w-full px-3 py-1.5 rounded text-xs bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/30 text-[var(--text-color)] focus:outline-none focus:border-[var(--main-color)] disabled:opacity-50"
                >
                  <option value="">Automatic (exact locale, then regional)</option>
                  {savedVoiceMissing && (
                    <option value={pronunciation.voiceURI!}>
                      {currentVoices?.status.voicesLoaded ? "Saved voice unavailable — automatic fallback" : "Saved voice — checking availability…"}
                    </option>
                  )}
                  {voices.map((voice) => (
                    <option key={voice.voiceURI} value={voice.voiceURI}>
                      {voice.name} ({voice.lang}) — {voice.localService ? "device voice" : "browser provider voice"}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block space-y-1 text-xs text-[var(--sub-color)]" htmlFor="pronunciation-rate">
                <span>Pronunciation speed</span>
                <select
                  id="pronunciation-rate"
                  aria-label={`${language.name} pronunciation speed`}
                  value={pronunciation.rate}
                  onChange={(event) => updatePronunciation({ rate: event.target.value as PronunciationRate })}
                  className="block w-full px-3 py-1.5 rounded text-xs bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/30 text-[var(--text-color)] focus:outline-none focus:border-[var(--main-color)]"
                >
                  <option value="slow">Slow</option>
                  <option value="normal">Normal</option>
                  <option value="faster">Faster</option>
                </select>
              </label>
              {savedVoiceMissing && currentVoices?.status.voicesLoaded && (
                <p className="text-xs text-[var(--sub-color)]">Your saved voice is unavailable. Pronunciation uses the automatic language match until it returns.</p>
              )}
              <button
                id="pronunciation-preview"
                type="button"
                disabled={!currentVoices?.status.supported}
                aria-label={`Preview ${language.name} pronunciation`}
                onClick={() => setPreviewFailureLocale(playTargetAudio(PRONUNCIATION_PREVIEWS[activeLanguageId] ?? language.nativeName, language.ttsLocale) ? null : language.ttsLocale)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-[var(--sub-alt-color)] text-[var(--main-color)] hover:bg-[var(--main-color)] hover:text-[var(--bg-color)] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Play className="w-3 h-3" />
                <span>preview pronunciation</span>
              </button>
              {previewFailureLocale === language.ttsLocale && <p role="status" className="text-xs text-[var(--sub-color)]">This browser could not play the preview. You can continue with text-only practice.</p>}
            </div>
          </SettingItem>

          <SettingItem
            id="microphone-practice"
            icon={Mic}
            title="optional microphone practice"
            description="Show a speaking practice button on conversation replies. Starting it requests microphone permission; your browser's speech provider may process audio online. Never required for completion."
            matchesSearch={matches(["microphone", "mic", "speaking", "pronunciation", "speech", "sound"])}
          >
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={settings.microphonePractice}
                onChange={(event) => updateSetting("microphonePractice", event.target.checked)}
                aria-label="Enable optional microphone practice"
                className="accent-[var(--main-color)]"
              />
              <span>{settings.microphonePractice ? "on" : "off"}</span>
            </label>
          </SettingItem>

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
