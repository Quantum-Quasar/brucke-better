"use client";

import { useState, useRef, useEffect } from "react";
import {
  Download,
  EyeOff,
  Keyboard,
  Languages,
  Palette,
  Search,
  ShieldAlert,
  Volume2,
  Zap,
} from "lucide-react";
import { DesignFrame } from "@/components/design/DesignFrame";
import { useAppStore } from "@/lib/store";
import { SettingItem } from "@/components/settings/SettingItem";
import { SegButton } from "@/components/settings/SegButton";
import { BehaviorSettings } from "@/components/settings/BehaviorSettings";
import { InputSettings } from "@/components/settings/InputSettings";
import { SoundSettings } from "@/components/settings/SoundSettings";
import { ThemeSettings } from "@/components/settings/ThemeSettings";
import { VisibilitySettings } from "@/components/settings/VisibilitySettings";
import { DangerZoneSettings } from "@/components/settings/DangerZoneSettings";
import { LANGUAGES, getLanguageDefinition } from "@/data/languages";

const SECTIONS = [
  { id: "language", label: "Language", icon: Languages },
  { id: "behavior", label: "Behavior", icon: Zap },
  { id: "input", label: "Input", icon: Keyboard },
  { id: "sound", label: "Sound", icon: Volume2 },
  { id: "theme", label: "Theme", icon: Palette },
  { id: "hide_elements", label: "Visibility", icon: EyeOff },
  { id: "backup", label: "Backup & JSON", icon: Download },
  { id: "danger_zone", label: "Danger Zone", icon: ShieldAlert },
] as const;

const SECTION_TERMS: Record<string, string[]> = {
  language: [
    "language", "german", "spanish", "french", "dutch", "switch language", "learning language",
    "bridge", "german speaker", "german-to-dutch", "cognate", "false friends",
  ],
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
    "rate", "speed", "slow", "normal", "faster", "preview",
  ],
  theme: [
    "color scheme", "theme", "colors", "alduin", "font family", "typeface", "fonts", "typography",
  ],
  hide_elements: [
    "key tips", "hotkey badges", "shortcuts", "hide", "caps lock warning", "caps lock",
    "mastery counter", "progress counter", "badge", "nav", "contrast", "readability",
    "muted text", "accessibility", "larger text", "font size", "reduced text",
  ],
  danger_zone: [
    "backup", "export", "import", "restore", "json", "progress", "reset settings", "default",
    "restore defaults", "reset progress", "clear data", "delete progress",
    "download", "offline", "install", "persistent", "storage", "eviction", "protection",
  ],
};

export default function DesignSettingsPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const settings = useAppStore((s) => s.settings);
  const updateSetting = useAppStore((s) => s.updateSetting);
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
      <DesignFrame eyebrow="Preferences" title="Studio Settings" showBackToTrail maxWidth="4xl">
        <div className="design-card p-10 text-center design-mono text-sm text-[var(--design-ink-muted)]" role="status">
          Loading preferences…
        </div>
      </DesignFrame>
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
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <DesignFrame
      eyebrow="Preferences"
      title="Studio Settings"
      subtitle="Tune language courses, typing behavior, audio voices, accessibility, and local JSON progress backups."
      showBackToTrail
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Category pills + Search */}
        <div className="design-card p-4 sm:p-5 space-y-4">
          {!normalizedQuery && (
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 text-xs design-mono">
              {SECTIONS.filter(
                (sec) =>
                  sec.id !== "language" ||
                  LANGUAGES.filter((l) => l.status === "available").length > 1
              ).map((sec) => {
                const Icon = sec.icon;
                return (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className="flex min-h-10 shrink-0 items-center gap-1.5 rounded-full px-3.5 py-1.5 bg-[var(--design-well)] text-[var(--design-ink-muted)] hover:text-[var(--design-sapphire)] transition cursor-pointer"
                  >
                    <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{sec.label}</span>
                  </button>
                );
              })}
            </div>
          )}

          <div className="relative">
            <Search
              className="w-4 h-4 text-[var(--design-ink-muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search settings"
              placeholder="Type to search settings (press / to focus)…"
              className="min-h-11 w-full pl-10 pr-16 py-2.5 rounded-full bg-[var(--design-canvas)] border border-[var(--design-border)] text-sm text-[var(--design-ink)] placeholder:text-[var(--design-ink-muted)] focus:outline-none focus:border-[var(--design-sapphire)] transition"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs design-mono text-[var(--design-ink-muted)] hover:text-[var(--design-ink)] px-2 py-1 rounded cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {normalizedQuery && !anySectionVisible && (
          <div className="design-card p-6 text-center space-y-1">
            <p className="text-sm design-mono text-[var(--design-ink)]">
              No settings match &ldquo;{searchQuery}&rdquo;.
            </p>
            <p className="text-xs design-mono text-[var(--design-ink-muted)]">
              Try &ldquo;sound&rdquo;, &ldquo;theme&rdquo;, &ldquo;lazy&rdquo;, or clear the search.
            </p>
          </div>
        )}

        <div className="design-card p-5 sm:p-6 space-y-8">
          {LANGUAGES.filter((l) => l.status === "available").length > 1 &&
            sectionVisible("language") && (
              <section id="language" className="space-y-3">
                <div className="flex items-center gap-2 text-xs design-mono uppercase tracking-wider text-[var(--design-ink-muted)] border-b border-[var(--design-border)] pb-2">
                  <Languages className="w-4 h-4 text-[var(--design-sapphire)]" aria-hidden="true" />
                  <span>Language</span>
                </div>

                <SettingItem
                  id="active-language"
                  icon={Languages}
                  title={`language you are learning (${activeLanguage.flag} ${activeLanguage.name})`}
                  description="Switch the language you are learning. Each language keeps its own progress, SRS schedule, and introduction — switching never mixes them."
                  matchesSearch={matches([
                    "language",
                    "german",
                    "spanish",
                    "french",
                    "dutch",
                    "switch language",
                    "learning language",
                  ])}
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    {LANGUAGES.filter((l) => l.status === "available").map((lang) => (
                      <button
                        key={lang.id}
                        type="button"
                        aria-pressed={lang.id === activeLanguageId}
                        onClick={() => {
                          setActiveLanguage(lang.id);
                          completeOnboarding();
                        }}
                        className="min-h-11 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs design-mono transition cursor-pointer border"
                        style={
                          lang.id === activeLanguageId
                            ? {
                                backgroundColor: "var(--design-sapphire)",
                                color: "var(--design-on-accent)",
                                borderColor: "var(--design-sapphire)",
                                fontWeight: 700,
                              }
                            : {
                                backgroundColor: "var(--design-well)",
                                color: "var(--design-ink)",
                                borderColor: "var(--design-border)",
                              }
                        }
                      >
                        <span aria-hidden="true">{lang.flag}</span>
                        <span>{lang.nativeName}</span>
                      </button>
                    ))}
                  </div>
                </SettingItem>

                <SettingItem
                  id="dutch-from-german"
                  icon={Languages}
                  title="German speaker bridge (Dutch)"
                  description={
                    activeLanguageId === "nl"
                      ? "Show German cognate twins, articles (der/die/das), sound correspondences (ij↔ei, ui↔au, oe↔u), and false-friend warnings alongside Dutch words and lessons."
                      : "For learners who already know German: shows German cognate twins, articles, and false-friend warnings whenever you study Dutch."
                  }
                  matchesSearch={matches([
                    "german speaker bridge",
                    "dutch",
                    "german",
                    "bridge",
                    "cognate",
                    "false friends",
                    "language",
                  ])}
                >
                  <div className="flex items-center gap-1.5">
                    {activeLanguageId !== "nl" && (
                      <span className="text-[10px] design-mono uppercase tracking-wider text-[var(--design-ink-muted)] border border-[var(--design-border)] rounded px-1.5 py-0.5">
                        Dutch mode
                      </span>
                    )}
                    {[false, true].map((val) => (
                      <SegButton
                        key={String(val)}
                        selected={settings.dutchFromGerman === val}
                        onClick={() => updateSetting("dutchFromGerman", val)}
                      >
                        {val ? "on" : "off"}
                      </SegButton>
                    ))}
                  </div>
                </SettingItem>
              </section>
            )}

          <BehaviorSettings
            matches={matches}
            sectionVisible={sectionVisible}
            normalizedQuery={normalizedQuery}
          />
          <InputSettings matches={matches} sectionVisible={sectionVisible} />
          <SoundSettings
            matches={matches}
            sectionVisible={sectionVisible}
            normalizedQuery={normalizedQuery}
          />
          <ThemeSettings matches={matches} sectionVisible={sectionVisible} />
          <VisibilitySettings matches={matches} sectionVisible={sectionVisible} />
          <DangerZoneSettings matches={matches} sectionVisible={sectionVisible} />
        </div>
      </div>
    </DesignFrame>
  );
}
