"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Volume2, EyeOff, Sliders, Keyboard, Palette, ShieldAlert, Search, Zap, Download, Languages } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { SettingItem } from "@/components/settings/SettingItem";
import { BehaviorSettings } from "@/components/settings/BehaviorSettings";
import { InputSettings } from "@/components/settings/InputSettings";
import { SoundSettings } from "@/components/settings/SoundSettings";
import { ThemeSettings } from "@/components/settings/ThemeSettings";
import { VisibilitySettings } from "@/components/settings/VisibilitySettings";
import { DangerZoneSettings } from "@/components/settings/DangerZoneSettings";
import { LANGUAGES, getLanguageDefinition } from "@/data/languages";

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
    "voice", "tts", "speech", "microphone", "mic", "speaking", "pronunciation",
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
    "offline", "install", "persistent", "storage", "eviction", "protection",
  ],
};

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const setActiveLanguage = useAppStore((s) => s.setActiveLanguage);
  const completeOnboarding = useAppStore((s) => s.completeOnboarding);
  const activeLanguage = getLanguageDefinition(activeLanguageId);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && window.location.hash === "#backup") {
      document.getElementById("backup")?.scrollIntoView();
    }
  }, [mounted]);

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
                  aria-pressed={lang.id === activeLanguageId}
                  onClick={() => {
                    setActiveLanguage(lang.id);
                    // Switching from Settings is a deliberate preference change,
                    // not a request for the full intro. Mark this language seen
                    // and keep the page in place; Guide can replay the intro.
                    completeOnboarding();
                  }}
                  className={`min-h-11 flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition cursor-pointer border ${
                    lang.id === activeLanguageId
                      ? "bg-[var(--main-color)] text-[var(--bg-color)] font-bold border-[var(--main-color)] shadow-xs"
                      : "bg-[var(--sub-alt-color)] text-[var(--sub-color)] hover:text-[var(--text-color)] border-[var(--sub-color)]/20"
                  }`}
                  title={lang.status === "available" ? lang.blurb : `${lang.name} — content coming soon`}
                >
                  <span aria-hidden>{lang.flag}</span>
                  <span>{lang.nativeName}</span>
                  <span aria-hidden="true" className={lang.id === activeLanguageId ? "visible" : "invisible"}>✓</span>
                  {lang.status === "coming-soon" && (
                    <span className="text-[9px] uppercase tracking-wider opacity-70">soon</span>
                  )}
                </button>
              ))}
            </div>
          </SettingItem>
        </section>
        )}

        <BehaviorSettings matches={matches} sectionVisible={sectionVisible} />
        <InputSettings matches={matches} sectionVisible={sectionVisible} />
        <SoundSettings matches={matches} sectionVisible={sectionVisible} normalizedQuery={normalizedQuery} />
        <ThemeSettings matches={matches} sectionVisible={sectionVisible} />
        <VisibilitySettings matches={matches} sectionVisible={sectionVisible} />
        <DangerZoneSettings matches={matches} sectionVisible={sectionVisible} />
      </div>
    </div>
  );
}
