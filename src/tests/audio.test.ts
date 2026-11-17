import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { detectLanguageVoice, findLanguageVoice, getLanguageVoices, playTargetAudio, subscribeVoiceChanges, VOICE_LOAD_WAIT_MS } from "@/lib/audio";
import { useAppStore } from "@/lib/store";
import { DEFAULT_SETTINGS } from "@/data/settings";

function voice(name: string, lang: string): SpeechSynthesisVoice {
  return { name, lang, default: false, localService: true, voiceURI: name };
}

function synthesisFixture(initialVoices: SpeechSynthesisVoice[] = []) {
  let voices = initialVoices;
  const events = new EventTarget();
  const synthesis = Object.assign(events, {
    getVoices: () => voices,
    cancel: vi.fn(), speak: vi.fn(), resume: vi.fn(), paused: false,
  });
  vi.stubGlobal("window", { speechSynthesis: synthesis });
  return { synthesis, change: (next: SpeechSynthesisVoice[]) => {
    voices = next;
    synthesis.dispatchEvent(new Event("voiceschanged"));
  } };
}

beforeEach(() => {
  vi.useFakeTimers();
  useAppStore.setState({ activeLanguageId: "de", settings: { ...DEFAULT_SETTINGS, pronunciationByLanguage: {} } });
});
afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("native target-language voices", () => {
  it("handles non-browser environments and empty speech safely", () => {
    vi.stubGlobal("window", undefined);
    expect(detectLanguageVoice("de-DE").supported).toBe(false);
    expect(playTargetAudio("Wasser")).toBe(false);
    synthesisFixture();
    expect(playTargetAudio("  ")).toBe(false);
  });

  it.each([["de-DE", "de-AT"], ["fr-FR", "fr-CA"], ["es-ES", "es-MX"], ["nl-NL", "nl-BE"]])("accepts %s regional voice %s", (requested, regional) => {
    synthesisFixture([voice("Regional", regional)]);
    const status = detectLanguageVoice(requested);
    expect(status).toMatchObject({ hasLanguageVoice: true, isExactLocale: false, voiceLang: regional, warningMessage: null });
  });

  it("prefers normalized exact locale and rejects unrelated language prefixes", () => {
    const voices = [voice("Austrian", "de-AT"), voice("German", "DE_de"), voice("Unrelated", "den")];
    expect(findLanguageVoice(voices, "de-DE").voice?.name).toBe("German");
    expect(findLanguageVoice([voices[2]], "de-DE").voice).toBeUndefined();
  });

  it("waits for asynchronous voiceschanged without an early missing warning", () => {
    const fixture = synthesisFixture();
    const listener = vi.fn();
    const otherListener = vi.fn();
    fixture.synthesis.addEventListener("voiceschanged", otherListener);
    const unsubscribe = subscribeVoiceChanges(listener);
    expect(detectLanguageVoice("fr-FR")).toMatchObject({ voicesLoaded: false, warningMessage: null });
    vi.advanceTimersByTime(350);
    expect(detectLanguageVoice("fr-FR").warningMessage).toBeNull();
    fixture.change([voice("Quebec", "fr-CA")]);
    expect(listener).toHaveBeenCalledOnce();
    expect(otherListener).toHaveBeenCalledOnce();
    expect(detectLanguageVoice("fr-FR").hasLanguageVoice).toBe(true);
    unsubscribe();
    fixture.change([]);
    expect(listener).toHaveBeenCalledOnce();
  });

  it("waits for target voices even if an initial partial list contains another language", () => {
    const fixture = synthesisFixture([voice("English", "en-US")]);
    expect(detectLanguageVoice("es-ES")).toMatchObject({ voicesLoaded: false, warningMessage: null });
    fixture.change([voice("English", "en-US"), voice("Mexican Spanish", "es-MX")]);
    expect(detectLanguageVoice("es-ES")).toMatchObject({ voicesLoaded: true, hasLanguageVoice: true, warningMessage: null });
  });

  it("shows a bounded missing warning and recovers when a late voice arrives", () => {
    const fixture = synthesisFixture();
    expect(detectLanguageVoice("nl-NL").voicesLoaded).toBe(false);
    vi.advanceTimersByTime(VOICE_LOAD_WAIT_MS);
    expect(detectLanguageVoice("nl-NL")).toMatchObject({ voicesLoaded: true, hasLanguageVoice: false });
    expect(detectLanguageVoice("nl-NL").warningMessage).toContain("Dutch");
    fixture.change([voice("Belgian Dutch", "nl-BE")]);
    expect(detectLanguageVoice("nl-NL").warningMessage).toBeNull();
  });

  it("sets pronunciation locale, rate and preferred voice", () => {
    const fixture = synthesisFixture([voice("German", "de-DE")]);
    vi.stubGlobal("SpeechSynthesisUtterance", class { constructor(public text: string) {} });
    expect(playTargetAudio("[der] Wasser", "de-DE")).toBe(true);
    expect(fixture.synthesis.cancel).toHaveBeenCalledOnce();
    expect(fixture.synthesis.speak).toHaveBeenCalledWith(expect.objectContaining({ text: "Wasser", lang: "de-DE", rate: 0.92, voice: expect.objectContaining({ name: "German" }) }));
  });

  it("uses a saved regional voice ahead of the automatic exact-locale choice", () => {
    const fixture = synthesisFixture([voice("German", "de-DE"), voice("Austrian", "de-AT")]);
    vi.stubGlobal("SpeechSynthesisUtterance", class { constructor(public text: string) {} });
    useAppStore.getState().updateSetting("pronunciationByLanguage", { de: { voiceURI: "Austrian", rate: "slow" } });
    expect(fixture.synthesis.speak).not.toHaveBeenCalled();
    expect(detectLanguageVoice("de-DE")).toMatchObject({ voiceName: "Austrian", isExactLocale: false });
    expect(playTargetAudio("Guten Tag", "de-DE")).toBe(true);
    expect(fixture.synthesis.speak).toHaveBeenCalledWith(expect.objectContaining({
      rate: 0.75, voice: expect.objectContaining({ name: "Austrian" }),
    }));
  });

  it("resolves explicit locales independently of the active course and its preferences", () => {
    const fixture = synthesisFixture([voice("German", "de-DE"), voice("French", "fr-FR"), voice("Quebec", "fr-CA"), voice("English", "en-US")]);
    vi.stubGlobal("SpeechSynthesisUtterance", class { constructor(public text: string) {} });
    useAppStore.getState().updateSetting("pronunciationByLanguage", {
      de: { voiceURI: "German", rate: "slow" },
      fr: { voiceURI: "Quebec", rate: "faster" },
    });
    expect(playTargetAudio("Bonjour", "FR_fr")).toBe(true);
    expect(fixture.synthesis.speak).toHaveBeenLastCalledWith(expect.objectContaining({
      lang: "FR_fr", rate: 1.1, voice: expect.objectContaining({ name: "Quebec" }),
    }));
    expect(playTargetAudio("Hello", "en-US")).toBe(true);
    expect(fixture.synthesis.speak).toHaveBeenLastCalledWith(expect.objectContaining({
      rate: 0.92, voice: expect.objectContaining({ name: "English" }),
    }));
    useAppStore.setState({ activeLanguageId: "fr" });
    expect(playTargetAudio("Bonjour")).toBe(true);
    expect(fixture.synthesis.speak).toHaveBeenLastCalledWith(expect.objectContaining({
      lang: "fr-FR", rate: 1.1, voice: expect.objectContaining({ name: "Quebec" }),
    }));
  });

  it("never applies a saved voice from the wrong language", () => {
    const fixture = synthesisFixture([voice("German", "de-DE"), voice("French", "fr-FR")]);
    vi.stubGlobal("SpeechSynthesisUtterance", class { constructor(public text: string) {} });
    useAppStore.getState().updateSetting("pronunciationByLanguage", { de: { voiceURI: "French", rate: "normal" } });
    expect(playTargetAudio("Wasser", "de-DE")).toBe(true);
    expect(fixture.synthesis.speak).toHaveBeenLastCalledWith(expect.objectContaining({
      voice: expect.objectContaining({ name: "German" }),
    }));
    expect(getLanguageVoices("de-DE").map((item) => item.name)).toEqual(["German"]);
  });

  it("keeps a saved selection through delayed loading and falls back when it disappears", () => {
    const fixture = synthesisFixture([voice("German", "de-DE")]);
    vi.stubGlobal("SpeechSynthesisUtterance", class { constructor(public text: string) {} });
    useAppStore.getState().updateSetting("pronunciationByLanguage", { de: { voiceURI: "Austrian", rate: "slow" } });
    const listener = vi.fn();
    const unsubscribe = subscribeVoiceChanges(listener);
    expect(detectLanguageVoice("de-DE").voiceName).toBe("German");
    fixture.change([voice("German", "de-DE"), voice("Austrian", "de-AT")]);
    expect(listener).toHaveBeenCalledOnce();
    expect(getLanguageVoices("de-DE")).toHaveLength(2);
    expect(detectLanguageVoice("de-DE").voiceName).toBe("Austrian");
    fixture.change([voice("German", "de-DE")]);
    expect(playTargetAudio("Hallo", "de-DE")).toBe(true);
    expect(fixture.synthesis.speak).toHaveBeenLastCalledWith(expect.objectContaining({
      rate: 0.75, voice: expect.objectContaining({ name: "German" }),
    }));
    expect(useAppStore.getState().settings.pronunciationByLanguage.de.voiceURI).toBe("Austrian");
    unsubscribe();
  });

  it("retains browser fallback speech and handles inaccessible voice lists safely", () => {
    const fixture = synthesisFixture([voice("English", "en-US")]);
    vi.stubGlobal("SpeechSynthesisUtterance", class { constructor(public text: string) {} });
    expect(playTargetAudio("Hallo", "de-DE")).toBe(true);
    const utterance = fixture.synthesis.speak.mock.calls[0][0];
    expect(utterance.lang).toBe("de-DE");
    expect(utterance.voice).toBeUndefined();
    vi.spyOn(fixture.synthesis, "getVoices").mockImplementation(() => { throw new Error("unavailable"); });
    expect(getLanguageVoices("de-DE")).toEqual([]);
    expect(detectLanguageVoice("de-DE")).toMatchObject({ voicesLoaded: true, hasLanguageVoice: false });
    expect(playTargetAudio("Hallo", "de-DE")).toBe(false);
  });
});
