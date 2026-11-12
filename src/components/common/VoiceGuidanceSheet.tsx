"use client";

import { useEffect, useRef, useState } from "react";
import { getLanguageDefinition } from "@/data/languages";
import { detectLanguageVoice, subscribeVoiceChanges, type VoiceAvailability } from "@/lib/audio";
import { useAppStore } from "@/lib/store";
import { useDialogFocus } from "@/lib/use-dialog-focus";
import { VoiceStatusBanner } from "./VoiceStatusBanner";

export function voiceInstallInstructions(platform: string, language: string): string[] {
  if (/android/i.test(platform)) return [
    `Open Android Settings → System → Languages & input → Text-to-speech output (names vary by device).`,
    `Choose your speech engine, open its settings → Install voice data, and download ${language}.`,
    "Restart the browser after the download. Some browsers do not expose all installed voices.",
  ];
  if (/iphone|ipad|ipod/i.test(platform)) return [
    `Open Settings → Accessibility → Spoken Content (or Read & Speak) → Voices → ${language}.`,
    "Download a voice, then reopen Safari. Some iOS versions expose only system-default voices to websites.",
  ];
  if (/windows/i.test(platform)) return [
    `Open Settings → Time & language → Speech → Manage voices → Add voices, and install ${language}.`,
    "If needed, add the language under Language & region → Language options → Speech. Restart the browser.",
  ];
  if (/mac/i.test(platform)) return [
    `Open System Settings → Accessibility → Spoken Content (or Read & Speak) → System voice → Manage Voices.`,
    `Download a ${language} voice, then restart the browser.`,
  ];
  if (/linux|x11/i.test(platform)) return [
    `Use your distribution's package manager to install speech-dispatcher and espeak-ng with ${language} voice data.`,
    "Enable the Speech Dispatcher service if your distribution requires it, then restart the browser. Browser support varies; Chromium builds may still expose no system voices.",
  ];
  return [`Install a ${language} voice in your device's accessibility or text-to-speech settings, then restart the browser.`, "If the browser still cannot expose it, use text-only practice or try another browser."];
}

export function VoiceGuidanceSheet({ languageId }: { languageId: string }) {
  const language = getLanguageDefinition(languageId);
  const dismissed = useAppStore((s) => s.settings.voiceGuidanceDismissed);
  const updateSetting = useAppStore((s) => s.updateSetting);
  const [status, setStatus] = useState<VoiceAvailability | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const continueRef = useRef<HTMLButtonElement>(null);
  const open = !dismissed.includes(languageId) && Boolean(status && !status.hasLanguageVoice && (!status.supported || status.voicesLoaded));
  const close = () => {
    const current = useAppStore.getState().settings.voiceGuidanceDismissed;
    if (!current.includes(languageId)) updateSetting("voiceGuidanceDismissed", [...current, languageId]);
  };
  useDialogFocus({ open, containerRef, initialFocusRef: continueRef, onEscape: close });

  useEffect(() => {
    const refresh = () => setStatus(detectLanguageVoice(language.ttsLocale));
    const unsubscribe = subscribeVoiceChanges(refresh);
    refresh();
    return unsubscribe;
  }, [language.ttsLocale]);

  useEffect(() => {
    if (status?.hasLanguageVoice && !dismissed.includes(languageId)) {
      updateSetting("voiceGuidanceDismissed", [...dismissed, languageId]);
    }
  }, [status, dismissed, languageId, updateSetting]);

  if (!open || !status) return null;
  const platform = navigator.userAgent + (navigator.maxTouchPoints > 1 && /Mac/.test(navigator.platform) ? " iPad" : "");
  const instructions = voiceInstallInstructions(platform, language.name);
  return (
    <div className="fixed inset-0 z-[120] bg-black/60 flex items-end sm:items-center justify-center p-3">
      <div ref={containerRef} role="dialog" aria-modal="true" aria-labelledby="voice-guide-title" aria-describedby="voice-guide-description" className="w-full max-w-lg max-h-[85dvh] overflow-y-auto rounded-xl border border-[var(--main-color)]/30 bg-[var(--bg-color)] text-[var(--text-color)] p-5 space-y-4 font-mono">
        <h2 id="voice-guide-title" className="text-lg font-bold">Your {language.name} lesson voice</h2>
        <p id="voice-guide-description" className="text-sm">Pronunciation uses your browser’s system speech voices. Microphone access is not needed to listen. This one-time guide helps when a voice for your language is missing.</p>
        <VoiceStatusBanner showWhenAvailable allowSkipListening />
        <h3 className="text-sm font-bold">Install a {language.name} voice on this device</h3>
        <ol className="list-decimal pl-5 space-y-2 text-sm">{instructions.map((step) => <li key={step}>{step}</li>)}</ol>
        <p className="text-sm">You can continue without audio. Listening exercises offer a temporary text-only mode; missing voices never block learning.</p>
        <button ref={continueRef} type="button" onClick={close} className="w-full rounded-lg px-4 py-3 bg-[var(--main-color)] text-[var(--bg-color)] font-bold">Continue to lesson</button>
      </div>
    </div>
  );
}
