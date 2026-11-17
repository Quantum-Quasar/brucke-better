import { useAppStore } from "./store";
import { getLanguageDefinition, isValidLanguageId } from "@/data/languages";
import { DEFAULT_PRONUNCIATION_PREFERENCE, MAX_PRONUNCIATION_VOICE_URI_LENGTH, PRONUNCIATION_RATES } from "@/data/settings";

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

function normalizeLocale(locale: string): string {
  return locale.replace(/_/g, "-").toLowerCase();
}

function pronunciationPreference(locale: string) {
  const languageId = normalizeLocale(locale).split("-")[0];
  return (isValidLanguageId(languageId) && useAppStore.getState().settings.pronunciationByLanguage[languageId])
    || DEFAULT_PRONUNCIATION_PREFERENCE;
}

export function getLanguageVoices(locale = resolveDefaultLocale()): SpeechSynthesisVoice[] {
  const synthesis = getSynthesis();
  if (!synthesis) return [];
  observeVoices(synthesis);
  try {
    const languageId = normalizeLocale(locale).split("-")[0];
    return synthesis.getVoices().filter((voice) =>
      normalizeLocale(voice.lang).split("-")[0] === languageId
      && voice.voiceURI.length > 0 && voice.voiceURI.length <= MAX_PRONUNCIATION_VOICE_URI_LENGTH
    );
  } catch {
    return [];
  }
}

export function findLanguageVoice(voices: readonly SpeechSynthesisVoice[], locale: string, preferredVoiceURI: string | null = null) {
  const normalized = normalizeLocale(locale);
  const language = normalized.split("-")[0];
  const exact = voices.find((voice) => normalizeLocale(voice.lang) === normalized);
  const regional = voices.find((voice) => normalizeLocale(voice.lang).split("-")[0] === language);
  const preferred = preferredVoiceURI
    ? voices.find((voice) => voice.voiceURI === preferredVoiceURI && normalizeLocale(voice.lang).split("-")[0] === language)
    : undefined;
  return { exact, voice: preferred ?? exact ?? regional };
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
  const { voice } = findLanguageVoice(voices, locale, pronunciationPreference(locale).voiceURI);
  const loaded = Boolean(voice) || state.settled;
  return {
    ...base, voicesLoaded: loaded, hasLanguageVoice: Boolean(voice),
    isExactLocale: Boolean(voice && normalizeLocale(voice.lang) === normalizeLocale(locale)), voiceName: voice?.name ?? null, voiceLang: voice?.lang ?? null,
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
    const preference = pronunciationPreference(locale);
    utterance.rate = PRONUNCIATION_RATES[preference.rate] ?? PRONUNCIATION_RATES.normal;
    utterance.pitch = 1;
    const { voice } = findLanguageVoice(synthesis.getVoices(), locale, preference.voiceURI);
    if (voice) utterance.voice = voice;
    activeUtterances.add(utterance);
    utterance.onend = utterance.onerror = () => { activeUtterances.delete(utterance); };
    synthesis.speak(utterance);
    return true;
  } catch {
    return false;
  }
}
