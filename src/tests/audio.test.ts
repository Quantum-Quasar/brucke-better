import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { detectLanguageVoice, findLanguageVoice, playTargetAudio, subscribeVoiceChanges, VOICE_LOAD_WAIT_MS } from "@/lib/audio";

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

beforeEach(() => vi.useFakeTimers());
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
});
