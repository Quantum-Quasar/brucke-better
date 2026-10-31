"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  RotateCcw,
  Volume2,
  VolumeX,
  Play,
  Type,
  Eye,
  EyeOff,
  Sliders,
  Keyboard,
  Palette,
  ShieldAlert,
  Search,
  Zap,
  Download,
  Upload,
  Languages,
} from "lucide-react";
import { useAppStore } from "@/lib/store";
import { SettingItem } from "@/components/settings/SettingItem";
import { VoiceStatusBanner } from "@/components/common/VoiceStatusBanner";
import { THEME_COUNT } from "@/lib/theme-runtime";
import { FONT_LIST } from "@/data/fonts";
import { LANGUAGES, getLanguageDefinition } from "@/data/languages";
import {
  SOUND_CLICK_OPTIONS,
  SOUND_ERROR_OPTIONS,
  soundEngine,
} from "@/lib/sound";
import {
  type QuickRestart,
  type StopOnError,
  type ConfidenceMode,
  type ShowCharBar,
} from "@/data/settings";

const SECTIONS = [
  { id: "language", label: "language", icon: Languages },
  { id: "behavior", label: "behavior", icon: Zap },
  { id: "input", label: "input", icon: Keyboard },
  { id: "sound", label: "sound", icon: Volume2 },
  { id: "theme", label: "theme", icon: Palette },
  { id: "hide_elements", label: "visibility", icon: EyeOff },
  { id: "backup", label: "backup & json", icon: Download },
  { id: "danger_zone", label: "danger zone", icon: ShieldAlert },
] as const;

/** Union of every setting's search terms, per section. A section with no
 *  matching setting is hidden entirely while filtering instead of leaving a
 *  bare heading and unrelated banners behind. */
const SECTION_TERMS: Record<string, string[]> = {
  language: ["language", "german", "spanish", "french", "dutch", "switch language", "learning language"],
  behavior: [
    "quick restart", "esc", "restart", "behavior", "lazy mode", "umlaut", "accent", "tolerance",
    "ae", "oe", "ue", "ss", "capitalization", "noun", "lowercase", "posture", "cues",
    "pause", "whisper", "reminders",
  ],
  input: [
    "stop on error", "error", "letter", "input", "confidence mode", "backspace", "strict",
    "character bar", "special character bar", "char bar", "umlaut buttons", "accent",
  ],
  sound: [
    "sound volume", "volume", "loudness", "mute", "sound", "play sound on click", "switch",
    "mechanical", "cherry", "typewriter", "play sound on error", "error sound", "damage",
    "voice", "tts", "speech",
  ],
  theme: [
    "color scheme", "theme", "colors", "alduin", "font family", "typeface", "fonts",
    "typography",
  ],
  hide_elements: [
    "key tips", "hotkey badges", "shortcuts", "hide", "caps lock warning", "caps lock",
    "mastery counter", "progress counter", "badge", "nav", "contrast", "readability",
    "muted text", "accessibility",
  ],
  danger_zone: [
    "backup", "export", "import", "restore", "json", "progress", "reset settings", "default",
    "restore defaults", "reset progress", "clear data", "delete progress",
  ],
};

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [backupStatusNote, setBackupStatusNote] = useState<string | null>(null);
  const [jsonPasteOpen, setJsonPasteOpen] = useState(false);
  const [jsonPasteText, setJsonPasteText] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const settings = useAppStore((s) => s.settings);
  const updateSetting = useAppStore((s) => s.updateSetting);
  const resetSettings = useAppStore((s) => s.resetSettings);
  const resetProgress = useAppStore((s) => s.resetProgress);
  const theme = useAppStore((s) => s.theme);
  const font = useAppStore((s) => s.font);
  const openThemeSelector = useAppStore((s) => s.openThemeSelector);
  const openFontSelector = useAppStore((s) => s.openFontSelector);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const setActiveLanguage = useAppStore((s) => s.setActiveLanguage);
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const activeLanguage = getLanguageDefinition(activeLanguageId);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard shortcut to focus search with "/"
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = (document.activeElement as HTMLElement)?.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(activeTag)) return;
      if (e.key === "/" && document.activeElement !== searchInputRef.current) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!mounted) {
    return (
      <div className="bg-[var(--bg-color)] text-[var(--text-color)] py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-mono text-xl font-bold tracking-tight text-[var(--text-color)]">settings</h1>
          <p className="mt-2 text-xs font-mono text-[var(--sub-color)]" role="status">loading preferences…</p>
        </div>
      </div>
    );
  }

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const matches = (keywords: string[]) => {
    if (!normalizedQuery) return true;
    return keywords.some((k) => k.toLowerCase().includes(normalizedQuery));
  };

  const sectionVisible = (id: string) => {
    if (!normalizedQuery) return true;
    return (SECTION_TERMS[id] ?? []).some((k) => k.toLowerCase().includes(normalizedQuery));
  };

  const anySectionVisible = SECTIONS.some((section) => sectionVisible(section.id));
  const specialChars = activeLanguage.specialChars.map(([char]) => char).join(", ");

  const handlePreviewClick = (clickId: string) => {
    void soundEngine.playClick(clickId, settings.soundVolume || 0.5);
  };

  const handlePreviewError = (errorId: string) => {
    void soundEngine.playError(errorId, settings.soundVolume || 0.5);
  };

  // Export JSON backup
  const handleExportBackup = () => {
    const state = useAppStore.getState();
    const backupData = {
      timestamp: new Date().toISOString(),
      version: 2,
      activeLanguageId: state.activeLanguageId,
      progressByLanguage: {
        ...state.progressByLanguage,
        [state.activeLanguageId]: {
          completedLessons: state.completedLessons,
          currentLessonId: state.currentLessonId,
          lessonProgress: state.lessonProgress,
          lessonStars: state.lessonStars,
          wordMastery: state.wordMastery,
          srsCards: state.srsCards,
          weeklyActivity: state.weeklyActivity,
          lastActivityWeek: state.lastActivityWeek,
        },
      },
      seenIntroLanguages: state.seenIntroLanguages,
      settings: state.settings,
      completedLessons: state.completedLessons,
      currentLessonId: state.currentLessonId,
      lessonProgress: state.lessonProgress,
      lessonStars: state.lessonStars,
      wordMastery: state.wordMastery,
      srsCards: state.srsCards,
      weeklyActivity: state.weeklyActivity,
      lastActivityWeek: state.lastActivityWeek,
      preferredReviewMode: state.preferredReviewMode,
      hasCompletedOnboarding: state.hasCompletedOnboarding,
      hasSeenGenderIntro: state.hasSeenGenderIntro,
      theme: state.theme,
      font: state.font,
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `brucke_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON backup
  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const MAX_BACKUP_BYTES = 2 * 1024 * 1024; // 2 MB
    if (file.size > MAX_BACKUP_BYTES) {
      alert("Backup file is too large (maximum allowed size is 2 MB).");
      e.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed && typeof parsed === "object") {
          const success = useAppStore.getState().importBackupState(parsed);
          if (success) {
            alert("Backup restored successfully! All settings and learning progress have been imported.");
          } else {
            alert("Could not restore backup. File contents are missing valid data.");
          }
        } else {
          alert("Invalid backup file format. Please upload a valid JSON backup.");
        }
      } catch {
        alert("Invalid backup file format. Please upload a valid JSON backup.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-[var(--bg-color)] text-[var(--text-color)] py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Page Title & Search */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sliders className="w-5 h-5 text-[var(--main-color)]" />
              <h1 className="font-mono text-xl font-bold tracking-tight text-[var(--text-color)]">
                settings
              </h1>
            </div>
            <Link
              href="/"
              className="inline-flex min-h-11 items-center gap-1.5 text-xs font-mono text-[var(--sub-color)] hover:text-[var(--main-color)] transition"
            >
              <span>← back to dashboard</span>
            </Link>
          </div>

          {/* Quick Category Navigation Bar (hidden while filtering) */}
          {!normalizedQuery && (
          <div className="sticky top-14 z-30 bg-[var(--bg-color)]/95 backdrop-blur-xs py-2 border-b border-[var(--sub-color)]/20 -mx-4 px-4 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs font-mono">
            {SECTIONS.filter((sec) => sec.id !== "language" || LANGUAGES.filter((l) => l.status === "available").length > 1).map((sec) => {
              const Icon = sec.icon;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => scrollToSection(sec.id)}
                  className="flex min-h-10 shrink-0 items-center gap-1 rounded px-3 py-1.5 text-[var(--sub-color)] transition hover:bg-[var(--sub-alt-color)] hover:text-[var(--text-color)] cursor-pointer"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </div>
          )}

          {/* Search bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-[var(--sub-color)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="type to search settings..."
              className="min-h-11 w-full pl-10 pr-4 py-2.5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-xs font-mono text-[var(--text-color)] placeholder:text-[var(--sub-color)]/50 focus:outline-none focus:border-[var(--main-color)] transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] px-1.5 py-0.5 rounded cursor-pointer"
              >
                clear
              </button>
            )}
          </div>
        </div>

        {normalizedQuery && !anySectionVisible && (
          <div className="p-6 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-center space-y-1">
            <p className="text-sm font-mono text-[var(--text-color)]">No settings match “{searchQuery}”.</p>
            <p className="text-xs font-mono text-[var(--sub-color)]">
              Try “sound”, “theme”, “lazy”, or clear the search.
            </p>
          </div>
        )}

        {/* 0. LANGUAGE SECTION — hidden until more than one language ships */}
        {LANGUAGES.filter((l) => l.status === "available").length > 1 && sectionVisible("language") && (
        <section id="language" className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--sub-color)] border-b border-[var(--sub-color)]/20 pb-2">
            <Languages className="w-4 h-4 text-[var(--main-color)]" />
            <span>language</span>
          </div>

          <SettingItem
            id="active-language"
            icon={Languages}
            title={`language you are learning (${activeLanguage.flag} ${activeLanguage.name})`}
            description="Switch the language you are learning. Each language keeps its own progress, SRS schedule, and introduction — switching never mixes them. Switching here stays on this page; use Guide to replay the intro."
            matchesSearch={matches(["language", "german", "spanish", "french", "dutch", "switch language", "learning language"])}
          >
            <div className="flex items-center gap-2 flex-wrap">
              {LANGUAGES.filter((l) => l.status === "available").map((lang) => (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => {
                    setActiveLanguage(lang.id);
                    // Switching from Settings is a deliberate preference change,
                    // not a request for the full intro. Mark this language seen
                    // and keep the page in place; Guide can replay the intro.
                    completeOnboarding();
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition cursor-pointer border ${
                    lang.id === activeLanguageId
                      ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold border-[var(--main-color)] shadow-xs"
                      : "bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)] border-[var(--sub-color)]/20"
                  }`}
                  title={lang.status === "available" ? lang.blurb : `${lang.name} — content coming soon`}
                >
                  <span aria-hidden>{lang.flag}</span>
                  <span>{lang.nativeName}</span>
                  {lang.status === "coming-soon" && (
                    <span className="text-[9px] uppercase tracking-wider opacity-70">soon</span>
                  )}
                </button>
              ))}
            </div>
          </SettingItem>
        </section>
        )}

        {/* 1. BEHAVIOR SECTION */}
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
              <button
                key={mode}
                type="button"
                onClick={() => updateSetting("quickRestart", mode)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition cursor-pointer ${
                  settings.quickRestart === mode
                    ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold shadow-xs"
                    : "bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)]"
                }`}
              >
                {mode}
              </button>
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
              <button
                key={String(val)}
                type="button"
                onClick={() => updateSetting("lazyMode", val)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition cursor-pointer ${
                  settings.lazyMode === val
                    ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold shadow-xs"
                    : "bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)]"
                }`}
              >
                {val ? "on" : "off"}
              </button>
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
                <button
                  key={String(val)}
                  type="button"
                  disabled={activeLanguageId !== "de"}
                  onClick={() => updateSetting("capitalizationTolerance", val)}
                  className={`px-3 py-1.5 rounded text-xs font-mono transition ${
                    activeLanguageId !== "de"
                      ? "bg-[var(--sub-alt-color)] text-[var(--sub-color)] opacity-40 cursor-not-allowed"
                      : settings.capitalizationTolerance === val
                      ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold shadow-xs cursor-pointer"
                      : "bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)] cursor-pointer"
                  }`}
                >
                  {val ? "on" : "off"}
                </button>
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
              <button
                key={String(val)}
                type="button"
                onClick={() => updateSetting("showPostureCues", val)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition cursor-pointer ${
                  settings.showPostureCues === val
                    ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold shadow-xs"
                    : "bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)]"
                }`}
              >
                {val ? "on" : "off"}
              </button>
            ))}
          </SettingItem>
        </section>

        {/* 2. INPUT SECTION */}
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
              <button
                key={mode}
                type="button"
                onClick={() => updateSetting("stopOnError", mode)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition cursor-pointer ${
                  settings.stopOnError === mode
                    ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold shadow-xs"
                    : "bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)]"
                }`}
              >
                {mode}
              </button>
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
              <button
                key={mode}
                type="button"
                onClick={() => updateSetting("confidenceMode", mode)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition cursor-pointer ${
                  settings.confidenceMode === mode
                    ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold shadow-xs"
                    : "bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)]"
                }`}
              >
                {mode}
              </button>
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
              <button
                key={mode}
                type="button"
                onClick={() => updateSetting("showCharBar", mode)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition cursor-pointer ${
                  settings.showCharBar === mode
                    ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold shadow-xs"
                    : "bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)]"
                }`}
              >
                {mode}
              </button>
            ))}
          </SettingItem>
        </section>

        {/* 3. SOUND SECTION */}
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
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    updateSetting("playSoundOnError", opt.id);
                    if (opt.id !== "off") handlePreviewError(opt.id);
                  }}
                  className={`px-3 py-1.5 rounded text-xs font-mono transition cursor-pointer ${
                    settings.playSoundOnError === opt.id
                      ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold shadow-xs"
                      : "bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)]"
                  }`}
                >
                  {opt.name}
                </button>
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

        {/* 4. THEME & TYPOGRAPHY SECTION */}
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

        {/* 7. VISIBILITY & ACCESSIBILITY SECTION */}
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
              <button
                key={String(val)}
                type="button"
                onClick={() => updateSetting("showKeyTips", val)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition cursor-pointer ${
                  settings.showKeyTips === val
                    ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold shadow-xs"
                    : "bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)]"
                }`}
              >
                {val ? "show" : "hide"}
              </button>
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
              <button
                key={String(val)}
                type="button"
                onClick={() => updateSetting("capsLockWarning", val)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition cursor-pointer ${
                  settings.capsLockWarning === val
                    ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold shadow-xs"
                    : "bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)]"
                }`}
              >
                {val ? "on" : "off"}
              </button>
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
              <button
                key={String(val)}
                type="button"
                onClick={() => updateSetting("showMasteryCounter", val)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition cursor-pointer ${
                  settings.showMasteryCounter === val
                    ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold shadow-xs"
                    : "bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)]"
                }`}
              >
                {val ? "show" : "hide"}
              </button>
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
              <button
                key={String(val)}
                type="button"
                onClick={() => updateSetting("increasedContrast", val)}
                className={`px-3 py-1.5 rounded text-xs font-mono transition cursor-pointer ${
                  settings.increasedContrast === val
                    ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold shadow-xs"
                    : "bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)]"
                }`}
              >
                {val ? "on" : "off"}
              </button>
            ))}
          </SettingItem>
        </section>

        {/* 8. DANGER ZONE SECTION */}
        <section id="danger_zone" style={{ display: sectionVisible("danger_zone") ? undefined : "none" }} className="space-y-3 pt-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--error-color)] border-b border-[var(--error-color)]/20 pb-2">
            <ShieldAlert className="w-4 h-4 text-[var(--error-color)]" />
            <span>danger zone</span>
          </div>

          {/* Dedicated Progress Backup & Restore (JSON File + Raw JSON) */}
          <div id="backup" className="space-y-2">
            <SettingItem
              id="export-import"
              icon={Download}
              title="export & import progress as json"
              description="Export all your settings, completed lessons, SRS spaced-repetition schedules, and word mastery across all languages to a portable JSON file (or copy/paste raw JSON)."
              matchesSearch={matches(["backup", "export", "import", "restore", "json", "progress"])}
            >
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleExportBackup();
                    setBackupStatusNote("Exported progress backup JSON file.");
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-[var(--sub-alt-color)] text-[var(--text-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/20 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-[var(--main-color)]" />
                  <span>export json</span>
                </button>

                <label className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-[var(--sub-alt-color)] text-[var(--text-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/20 transition cursor-pointer">
                  <Upload className="w-3.5 h-3.5 text-[var(--main-color)]" />
                  <span>import json</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleImportBackup}
                    className="hidden"
                  />
                </label>

                <button
                  type="button"
                  onClick={() => setJsonPasteOpen((v) => !v)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/20 transition cursor-pointer"
                >
                  <span>{jsonPasteOpen ? "hide raw json" : "paste json"}</span>
                </button>
              </div>
            </SettingItem>

            {backupStatusNote && (
              <p className="text-xs font-mono text-[var(--main-color)] pl-2" role="status">
                {backupStatusNote}
              </p>
            )}

            {jsonPasteOpen && (
              <div className="p-4 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 space-y-2.5 font-mono text-xs">
                <p className="text-[var(--sub-color)]">
                  Paste a Brücke JSON backup below to restore your progress directly without a file picker:
                </p>
                <textarea
                  value={jsonPasteText}
                  onChange={(e) => setJsonPasteText(e.target.value)}
                  rows={4}
                  placeholder={'{"version": 2, "activeLanguageId": "de", ...}'}
                  className="w-full p-2.5 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/30 text-[var(--text-color)] text-xs font-mono outline-none focus:border-[var(--main-color)]"
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      try {
                        const parsed = JSON.parse(jsonPasteText);
                        if (parsed && typeof parsed === "object" && useAppStore.getState().importBackupState(parsed)) {
                          setBackupStatusNote("Progress restored from pasted JSON!");
                          setJsonPasteText("");
                          setJsonPasteOpen(false);
                        } else {
                          setBackupStatusNote("Could not restore: JSON does not contain valid Brücke progress fields.");
                        }
                      } catch {
                        setBackupStatusNote("Invalid JSON syntax.");
                      }
                    }}
                    disabled={!jsonPasteText.trim()}
                    className="px-3.5 py-1.5 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-bold text-xs transition cursor-pointer disabled:opacity-40"
                  >
                    restore pasted json
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Reset Settings to Default */}
          <SettingItem
            id="reset-settings"
            icon={RotateCcw}
            title="reset settings"
            description="Resets all customization preferences back to default values without affecting your lesson progress or SRS mastery."
            matchesSearch={matches(["reset settings", "default", "restore defaults"])}
          >
            <button
              type="button"
              onClick={() => {
                if (confirm("Reset all settings to default values?")) {
                  resetSettings();
                }
              }}
              className="px-3 py-1.5 rounded text-xs font-mono text-[var(--error-color)] bg-[var(--error-color)]/10 hover:bg-[var(--error-color)] hover:text-[var(--bg-color)] border border-[var(--error-color)]/30 transition cursor-pointer"
            >
              reset settings
            </button>
          </SettingItem>

          {/* Reset Progress */}
          <SettingItem
            id="reset-progress"
            icon={ShieldAlert}
            title="reset learning progress"
            description="Clears all SRS cards, lesson completions, and word mastery stats. This action is permanent and cannot be undone!"
            matchesSearch={matches(["reset progress", "clear data", "delete progress"])}
          >
            <button
              type="button"
              onClick={() => {
                if (
                  confirm(
                    "DANGER: Are you sure you want to reset all lesson progress and SRS memory cards? This cannot be undone."
                  )
                ) {
                  resetProgress();
                  alert("Progress has been reset.");
                }
              }}
              className="px-3 py-1.5 rounded text-xs font-mono font-bold text-[var(--bg-color)] bg-[var(--error-color)] hover:opacity-90 transition cursor-pointer"
            >
              reset all progress
            </button>
          </SettingItem>
        </section>
      </div>
    </div>
  );
}
