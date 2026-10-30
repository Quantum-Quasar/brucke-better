"use client";

import React, { useEffect, useState } from "react";
import { AlertCircle, CheckCircle2, EarOff, Volume2, X } from "lucide-react";
import { detectLanguageVoice, subscribeVoiceChanges, playTargetAudio, type VoiceAvailability } from "@/lib/audio";
import { useAppStore } from "@/lib/store";
import { getLanguageDefinition } from "@/data/languages";
import { LISTENING_SKIP_MS, isListeningSkipped } from "@/lib/listening";

interface VoiceStatusBannerProps {
  /** When true, also shows positive voice confirmation (used on the Settings page). */
  showWhenAvailable?: boolean;
  /** When true, offers a one-click "Skip listening for 15 min" button when no voice is found. */
  allowSkipListening?: boolean;
  className?: string;
}

export const VoiceStatusBanner: React.FC<VoiceStatusBannerProps> = ({
  showWhenAvailable = false,
  allowSkipListening = false,
  className = "",
}) => {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const skipListeningFor = useAppStore((s) => s.skipListeningFor);
  const listeningSkippedUntil = useAppStore((s) => s.settings.listeningSkippedUntil);
  const language = getLanguageDefinition(activeLanguageId);

  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [status, setStatus] = useState<VoiceAvailability | null>(null);

  useEffect(() => {
    setMounted(true);
    const refresh = () => setStatus(detectLanguageVoice(language.ttsLocale));
    refresh();
    // Voices load asynchronously on Chrome/Linux/Android; re-check after a short tick and onvoiceschanged
    const timer = setTimeout(refresh, 350);
    const unsub = subscribeVoiceChanges(refresh);
    return () => {
      clearTimeout(timer);
      unsub();
    };
  }, [language.ttsLocale]);

  if (!mounted || !status || dismissed) return null;

  if (status.hasLanguageVoice && !showWhenAvailable) {
    return null;
  }

  const listeningOff = isListeningSkipped(listeningSkippedUntil);

  if (status.hasLanguageVoice && showWhenAvailable) {
    return (
      <div
        className={`p-3 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--main-color)]/30 flex flex-wrap items-center justify-between gap-2 text-xs font-mono ${className}`}
      >
        <div className="flex items-center gap-2 text-[var(--text-color)]">
          <CheckCircle2 className="w-4 h-4 text-[var(--main-color)] shrink-0" />
          <span>
            {status.languageName} TTS voice active:{" "}
            <strong className="text-[var(--main-color)]">{status.voiceName}</strong> ({status.voiceLang})
          </span>
        </div>
        <button
          type="button"
          onClick={() =>
            playTargetAudio(
              activeLanguageId === "nl"
                ? "Hallo, de Nederlandse stem werkt."
                : activeLanguageId === "fr"
                ? "Bonjour, la voix française fonctionne."
                : activeLanguageId === "es"
                ? "Hola, la voz en español funciona."
                : "Hallo, die deutsche Stimme funktioniert.",
              language.ttsLocale
            )
          }
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[var(--bg-color)] hover:border-[var(--main-color)] border border-[var(--sub-color)]/25 text-[var(--main-color)] text-[11px] transition cursor-pointer"
        >
          <Volume2 className="w-3.5 h-3.5" />
          <span>test voice</span>
        </button>
      </div>
    );
  }

  return (
    <div
      role="status"
      className={`p-3.5 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--error-color)]/40 space-y-2 text-xs font-mono ${className}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-2 text-[var(--text-color)]">
          <AlertCircle className="w-4 h-4 text-[var(--error-color)] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-bold text-[var(--error-color)]">
              No {status.languageName} ({status.requestedLocale}) speech voice detected on this device
            </div>
            <p className="text-[var(--sub-color)] leading-relaxed">{status.warningMessage}</p>
          </div>
        </div>
        {!showWhenAvailable && (
          <button
            type="button"
            onClick={() => setDismissed(true)}
            className="p-1 rounded text-[var(--sub-color)] hover:text-[var(--text-color)] transition cursor-pointer"
            aria-label="Dismiss voice warning"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {allowSkipListening && !listeningOff && (
        <div className="pt-1 pl-6">
          <button
            type="button"
            onClick={() => skipListeningFor(LISTENING_SKIP_MS)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/30 hover:border-[var(--main-color)] text-[var(--main-color)] text-[11px] font-bold transition cursor-pointer"
          >
            <EarOff className="w-3.5 h-3.5" />
            <span>Switch to text-only mode for 15 min</span>
          </button>
        </div>
      )}
    </div>
  );
};
