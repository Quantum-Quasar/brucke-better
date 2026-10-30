// ponytail: native browser speech synthesis with zero external dependencies
// Automatically selects the active language's TTS locale (de-DE, fr-FR, es-ES)
// and detects when the device/OS (e.g. Linux without speech-dispatcher voices or
// Android without a language pack) lacks a matching voice for that language.

import { useAppStore } from "./store";
import { getLanguageDefinition } from "@/data/languages";

export interface VoiceAvailability {
  supported: boolean;
  voicesLoaded: boolean;
  hasLanguageVoice: boolean;
  isExactLocale: boolean;
  voiceName: string | null;
  voiceLang: string | null;
  requestedLocale: string;
  languageName: string;
  /** Non-null when speech synthesis is missing or no voice exists for the target language. */
  warningMessage: string | null;
}

let cachedVoices: SpeechSynthesisVoice[] = [];
const voiceListeners = new Set<() => void>();

function notifyVoiceListeners() {
  for (const fn of voiceListeners) {
    try {
      fn();
    } catch {}
  }
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  try {
    cachedVoices = window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = () => {
      try {
        cachedVoices = window.speechSynthesis.getVoices();
        notifyVoiceListeners();
      } catch {}
    };
  } catch {}
}

export function subscribeVoiceChanges(listener: () => void): () => void {
  voiceListeners.add(listener);
  return () => {
    voiceListeners.delete(listener);
  };
}

const activeUtterances = new Set<SpeechSynthesisUtterance>();

function resolveDefaultLocale(): string {
  try {
    const activeId =
      typeof useAppStore?.getState === "function"
        ? useAppStore.getState().activeLanguageId
        : "de";
    return getLanguageDefinition(activeId || "de").ttsLocale || "de-DE";
  } catch {
    return "de-DE";
  }
}

function resolveLanguageName(locale: string): string {
  const prefix = locale.slice(0, 2).toLowerCase();
  if (prefix === "nl") return "Dutch";
  if (prefix === "fr") return "French";
  if (prefix === "es") return "Spanish";
  return "German";
}

/**
 * Inspects the browser's Web Speech API to check whether a voice for `locale`
 * (e.g. "de-DE", "fr-FR", "es-ES") is actually installed on this device.
 * Many Linux setups (Chromium/Firefox without speech-dispatcher voices) and some
 * Android profiles have no German/French/Spanish voice installed.
 */
export function detectLanguageVoice(locale?: string): VoiceAvailability {
  const effectiveLocale = locale || resolveDefaultLocale();
  const languageName = resolveLanguageName(effectiveLocale);

  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return {
      supported: false,
      voicesLoaded: false,
      hasLanguageVoice: false,
      isExactLocale: false,
      voiceName: null,
      voiceLang: null,
      requestedLocale: effectiveLocale,
      languageName,
      warningMessage: `Speech synthesis is not available in this browser. You can use "Skip listening" on audio exercises.`,
    };
  }

  let voices: SpeechSynthesisVoice[] = [];
  try {
    voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
  } catch {
    voices = [];
  }

  const prefix = effectiveLocale.slice(0, 2).toLowerCase();
  const exactVoice = voices.find(
    (v) =>
      v.lang.toLowerCase() === effectiveLocale.toLowerCase() ||
      v.lang.replace(/_/g, "-").toLowerCase() === effectiveLocale.toLowerCase()
  );
  const prefixVoice = voices.find((v) => v.lang.toLowerCase().startsWith(prefix));
  const chosen = exactVoice ?? prefixVoice ?? null;

  if (voices.length === 0) {
    return {
      supported: true,
      voicesLoaded: false,
      hasLanguageVoice: false,
      isExactLocale: false,
      voiceName: null,
      voiceLang: null,
      requestedLocale: effectiveLocale,
      languageName,
      warningMessage: `No ${languageName} (${effectiveLocale}) speech voice was detected on this device. On Linux, install speech-dispatcher + espeak-ng (or piper-tts); on Android, install the ${languageName} voice pack in System Settings → Text-to-speech output.`,
    };
  }

  if (!chosen) {
    return {
      supported: true,
      voicesLoaded: true,
      hasLanguageVoice: false,
      isExactLocale: false,
      voiceName: null,
      voiceLang: null,
      requestedLocale: effectiveLocale,
      languageName,
      warningMessage: `Your device has ${voices.length} speech ${voices.length === 1 ? "voice" : "voices"} installed, but none for ${languageName} (${effectiveLocale}). On Linux/Android without a ${languageName} voice pack, audio may sound wrong or stay silent — install a ${languageName} system TTS voice or use "Skip listening".`,
    };
  }

  return {
    supported: true,
    voicesLoaded: true,
    hasLanguageVoice: true,
    isExactLocale: Boolean(exactVoice),
    voiceName: chosen.name,
    voiceLang: chosen.lang,
    requestedLocale: effectiveLocale,
    languageName,
    warningMessage: null,
  };
}

/**
 * Plays target-language pronunciation using the native Web Speech API.
 * Comfortable 0.92x rate for clear phoneme perception.
 */
export function playTargetAudio(text: string, locale?: string): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return false;
  }

  try {
    const effectiveLocale = locale || resolveDefaultLocale();
    window.speechSynthesis.cancel();
    activeUtterances.clear();
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    const cleanText = text.replace(/^[[(].*?[)\]]\s*/, "").trim();
    if (!cleanText) return false;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = effectiveLocale;
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    const voices = cachedVoices.length > 0 ? cachedVoices : window.speechSynthesis.getVoices();
    const exactVoice = voices.find(
      (v) => v.lang === effectiveLocale || v.lang.replace(/_/g, "-") === effectiveLocale
    );
    const prefixVoice = voices.find((v) => v.lang.startsWith(effectiveLocale.slice(0, 2)));
    const voice = exactVoice ?? prefixVoice;
    if (voice) {
      utterance.voice = voice;
    }

    activeUtterances.add(utterance);
    utterance.onend = () => {
      activeUtterances.delete(utterance);
    };
    utterance.onerror = () => {
      activeUtterances.delete(utterance);
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch {
    return false;
  }
}
