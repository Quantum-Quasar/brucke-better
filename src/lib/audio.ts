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
  warningMessage: string | null;
}

export const VOICE_LOAD_WAIT_MS = 2500;
const voiceListeners = new Set<() => void>();
const voiceStates = new WeakMap<SpeechSynthesis, { settled: boolean }>();
const activeUtterances = new Set<SpeechSynthesisUtterance>();

function notifyVoiceListeners() {
  for (const listener of voiceListeners) listener();
}

function getSynthesis(): SpeechSynthesis | null {
  return typeof window !== "undefined" ? window.speechSynthesis ?? null : null;
}

function observeVoices(synthesis: SpeechSynthesis) {
  const existing = voiceStates.get(synthesis);
  if (existing) return existing;
  const state = { settled: false };
  voiceStates.set(synthesis, state);
  // Keep listening after the initial deadline: mobile voice packs may arrive later.
  synthesis.addEventListener?.("voiceschanged", () => {
    state.settled = true;
    notifyVoiceListeners();
  });
  setTimeout(() => {
    state.settled = true;
    notifyVoiceListeners();
  }, VOICE_LOAD_WAIT_MS);
  return state;
}

export function subscribeVoiceChanges(listener: () => void): () => void {
  const synthesis = getSynthesis();
  if (synthesis) observeVoices(synthesis);
  voiceListeners.add(listener);
  return () => { voiceListeners.delete(listener); };
}

function resolveDefaultLocale(): string {
  return getLanguageDefinition(useAppStore.getState().activeLanguageId).ttsLocale;
}

function resolveLanguageName(locale: string): string {
  const language = locale.slice(0, 2).toLowerCase();
  const names: Record<string, string> = { de: "German", fr: "French", es: "Spanish", nl: "Dutch" };
  return names[language] ?? locale;
}

export function findLanguageVoice(voices: readonly SpeechSynthesisVoice[], locale: string) {
  const normalize = (value: string) => value.replace(/_/g, "-").toLowerCase();
  const normalized = normalize(locale);
  const language = normalized.split("-")[0];
  const exact = voices.find((voice) => normalize(voice.lang) === normalized);
  const regional = voices.find((voice) => normalize(voice.lang).split("-")[0] === language);
  return { exact, voice: exact ?? regional };
}

export function detectLanguageVoice(locale = resolveDefaultLocale()): VoiceAvailability {
  const synthesis = getSynthesis();
  const base: VoiceAvailability = {
    supported: Boolean(synthesis), voicesLoaded: false, hasLanguageVoice: false,
    isExactLocale: false, voiceName: null, voiceLang: null,
    requestedLocale: locale, languageName: resolveLanguageName(locale), warningMessage: null,
  };
  if (!synthesis) {
    return { ...base, warningMessage: 'Speech synthesis is unavailable in this browser. Use text-only practice or "Skip listening" on audio exercises.' };
  }
  const state = observeVoices(synthesis);
  let voices: SpeechSynthesisVoice[];
  try {
    voices = synthesis.getVoices();
  } catch {
    return { ...base, voicesLoaded: true, warningMessage: "This browser could not load system speech voices. You can continue with text-only practice." };
  }
  const { exact, voice } = findLanguageVoice(voices, locale);
  const loaded = Boolean(voice) || state.settled;
  return {
    ...base, voicesLoaded: loaded, hasLanguageVoice: Boolean(voice),
    isExactLocale: Boolean(exact), voiceName: voice?.name ?? null, voiceLang: voice?.lang ?? null,
    warningMessage: loaded && !voice
      ? `No ${base.languageName} speech voice was detected. Browser fallback audio may sound wrong or stay silent. Install a ${base.languageName} system voice, then reopen the browser, or use "Skip listening".`
      : null,
  };
}

/** Native target-language pronunciation; a regional voice is a valid match. */
export function playTargetAudio(text: string, locale = resolveDefaultLocale()): boolean {
  const synthesis = getSynthesis();
  const cleanText = text.replace(/^[[(].*?[)\]]\s*/, "").trim();
  if (!synthesis || !cleanText) return false;
  try {
    synthesis.cancel();
    activeUtterances.clear();
    if (synthesis.paused) synthesis.resume();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = locale;
    utterance.rate = 0.92;
    utterance.pitch = 1;
    const { voice } = findLanguageVoice(synthesis.getVoices(), locale);
    if (voice) utterance.voice = voice;
    activeUtterances.add(utterance);
    utterance.onend = utterance.onerror = () => { activeUtterances.delete(utterance); };
    synthesis.speak(utterance);
    return true;
  } catch {
    return false;
  }
}
