"use client";

import React from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { LANGUAGES, getLanguageDefinition } from "@/data/languages";
import { DEFAULT_PRONUNCIATION_PREFERENCE, type CustomizationSettings, type PronunciationRate } from "@/data/settings";
import { playTargetAudio } from "@/lib/audio";
import { P2Bar, ThemePicker } from "./P2Chrome";
import { P2Footer } from "./P2Home";

function Choice<T extends string | number | boolean>({
  label,
  hint,
  value,
  options,
  onChange,
}: {
  label: string;
  hint?: string;
  value: T;
  options: Array<{ value: T; label: string }>;
  onChange: (value: T) => void;
}) {
  return (
    <div className="p-setting">
      <div>
        <h3 className="p-lead-strong">{label}</h3>
        {hint && <p className="p-body" style={{ marginTop: 6 }}>{hint}</p>}
      </div>
      <div role="radiogroup" aria-label={label} className="p-seg-control">
        <div>
          {options.map((option) => (
            <button key={String(option.value)} type="button" role="radio" aria-checked={value === option.value} onClick={() => onChange(option.value)}>
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function P2Settings() {
  const settings = useAppStore((s) => s.settings);
  const update = useAppStore((s) => s.updateSetting);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const setActiveLanguage = useAppStore((s) => s.setActiveLanguage);
  const language = getLanguageDefinition(activeLanguageId);
  const set = <K extends keyof CustomizationSettings>(key: K) => (value: CustomizationSettings[K]) => update(key, value);
  const pronunciation = settings.pronunciationByLanguage[activeLanguageId] ?? DEFAULT_PRONUNCIATION_PREFERENCE;
  const strictness =
    settings.lazyMode && settings.capitalizationTolerance && settings.stopOnError === "off"
      ? "forgiving"
      : settings.lazyMode && !settings.capitalizationTolerance && settings.stopOnError === "off"
        ? "standard"
        : !settings.lazyMode && !settings.capitalizationTolerance && settings.stopOnError === "letter"
          ? "strict"
          : "custom";

  const applyStrictness = (preset: string) => {
    update("confidenceMode", "off");
    update("lazyMode", preset !== "strict");
    update("capitalizationTolerance", preset === "forgiving");
    update("stopOnError", preset === "strict" ? "letter" : "off");
  };

  return (
    <>
      <P2Bar />
      <section className="p-settings-hero p-field">
        <div className="p-wrap">
          <h1 className="p-display">Settings</h1>
          <p className="p-lead" style={{ marginTop: 24, maxWidth: "40ch" }}>
            Saved in this browser as you change them.
          </p>
        </div>
      </section>

      <section className="p-wrap p-settings" aria-label="Your settings">
        <div className="p-setting">
          <div>
            <h2 className="p-lead-strong">Course</h2>
            <p className="p-body" style={{ marginTop: 6 }}>Each language keeps its own progress.</p>
          </div>
          <div role="radiogroup" aria-label="Course" className="p-seg-control">
            <div>
              {LANGUAGES.filter((l) => l.status === "available").map((l) => (
                <button
                  key={l.id}
                  type="button"
                  role="radio"
                  aria-checked={l.id === activeLanguageId}
                  onClick={() => {
                    useViewStore.getState().closeSubview();
                    setActiveLanguage(l.id);
                  }}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-setting p-setting--wide">
          <div>
            <h2 className="p-lead-strong">Theme</h2>
            <p className="p-body" style={{ marginTop: 6 }}>
              The same themes as the rest of Brücke. Pick one and every screen follows it.
            </p>
          </div>
          <ThemePicker />
        </div>

        <Choice
          label="Daily goal"
          hint="Sets how many review cards you get each day."
          value={settings.dailyMinutes}
          options={[5, 10, 20, 30].map((m) => ({ value: m as CustomizationSettings["dailyMinutes"], label: `${m} min` }))}
          onChange={set("dailyMinutes")}
        />

        <Choice
          label="How strict is marking?"
          hint={`Forgiving accepts ae for ä and ignores capitals. Strict wants every letter${strictness === "custom" ? " — you have a custom mix right now" : ""}.`}
          value={strictness}
          options={[
            { value: "forgiving", label: "Forgiving" },
            { value: "standard", label: "Standard" },
            { value: "strict", label: "Strict" },
          ]}
          onChange={applyStrictness}
        />

        <div className="p-setting">
          <div>
            <h2 className="p-lead-strong">Speaking speed</h2>
            <p className="p-body" style={{ marginTop: 6 }}>Uses your device’s {language.name} voice.</p>
          </div>
          <div style={{ display: "grid", gap: 12, justifyItems: "start" }}>
            <div role="radiogroup" aria-label="Speaking speed" className="p-seg-control">
              <div>
                {(["slow", "normal", "faster"] as PronunciationRate[]).map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    role="radio"
                    aria-checked={pronunciation.rate === rate}
                    onClick={() =>
                      update("pronunciationByLanguage", {
                        ...settings.pronunciationByLanguage,
                        [activeLanguageId]: { ...pronunciation, rate },
                      })
                    }
                  >
                    {rate === "slow" ? "Slow" : rate === "normal" ? "Normal" : "Faster"}
                  </button>
                ))}
              </div>
            </div>
            <button
              type="button"
              className="p-btn p-btn--soft p-btn--small"
              onClick={() => playTargetAudio(language.onboarding.philosophy.demos[1]?.target ?? language.name, language.ttsLocale)}
            >
              Hear a sample
            </button>
          </div>
        </div>

        <Choice
          label="Accent keys under answers"
          value={settings.showCharBar}
          options={[
            { value: "always", label: "Always" },
            { value: "on_focus", label: "While typing" },
            { value: "off", label: "Hide" },
          ]}
          onChange={set("showCharBar")}
        />

        <Choice
          label="Keyboard hints"
          hint="Small numbers on tiles and keys on buttons."
          value={settings.showKeyTips}
          options={[
            { value: true, label: "Show" },
            { value: false, label: "Hide" },
          ]}
          onChange={set("showKeyTips")}
        />

        <Choice
          label="Sound for a wrong answer"
          value={settings.playSoundOnError === "off" ? "off" : "on"}
          options={[
            { value: "on", label: "On" },
            { value: "off", label: "Off" },
          ]}
          onChange={(v) => update("playSoundOnError", v === "off" ? "off" : "1")}
        />

        <Choice
          label="Coaching lines in practice"
          hint="Short reminders like “Slow is smooth.”"
          value={settings.showPostureCues}
          options={[
            { value: true, label: "Show" },
            { value: false, label: "Hide" },
          ]}
          onChange={set("showPostureCues")}
        />

        <div className="p-setting">
          <div>
            <h2 className="p-lead-strong">Everything else</h2>
            <p className="p-body" style={{ marginTop: 6 }}>
              Backups, import and export, voices, fonts and resetting progress live in the classic settings. They work on the same progress.
            </p>
          </div>
          <Link href="/settings" className="p-btn" style={{ justifySelf: "start" }}>
            Open classic settings
          </Link>
        </div>
      </section>
      <P2Footer />
    </>
  );
}
