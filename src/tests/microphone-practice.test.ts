import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getRecognitionConstructor, scoreRecognition, startMicrophonePractice, type BrowserRecognition } from "@/lib/microphone-practice";

class RecognitionFixture implements BrowserRecognition {
  static current: RecognitionFixture;
  lang = "";
  continuous = true;
  interimResults = true;
  maxAlternatives = 0;
  onresult: BrowserRecognition["onresult"] = null;
  onerror: BrowserRecognition["onerror"] = null;
  onend: BrowserRecognition["onend"] = null;
  start = vi.fn();
  abort = vi.fn();
  constructor() { RecognitionFixture.current = this; }
}

beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("window", { webkitSpeechRecognition: RecognitionFixture });
});
afterEach(() => {
  vi.clearAllTimers();
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

const callbacks = () => ({ locale: "fr-FR", onTranscript: vi.fn(), onError: vi.fn(), onEnd: vi.fn() });

describe("lenient transcript practice scoring", () => {
  it.each([
    ["GUTEN Tag!", "Guten Tag", "exact"],
    ["Straße", "Strasse", "exact"],
    ["cafe", "café", "exact"],
    ["¿Cómo estás?", "Como estas", "exact"],
    ["hallo", "hello", "near"],
    ["ik heet jan", "ik heet jens", "near"],
    ["unrelated words", "Guten Morgen", "try-again"],
    ["", "Hallo", "try-again"],
    [" ", " ", "try-again"],
  ])("compares %s to %s as %s", (heard, expected, score) => {
    expect(scoreRecognition(heard, expected)).toBe(score);
  });
});

describe("browser recognition lifecycle", () => {
  it("uses prefixed recognition only when explicitly started", () => {
    expect(getRecognitionConstructor()).toBe(RecognitionFixture);
    const options = callbacks();
    const cancel = startMicrophonePractice(options);
    const recognition = RecognitionFixture.current;
    expect(recognition.start).toHaveBeenCalledOnce();
    expect(recognition).toMatchObject({ lang: "fr-FR", continuous: false, interimResults: false, maxAlternatives: 1 });
    recognition.onresult?.({ results: [[{ transcript: "Bonjour" }]] });
    expect(options.onTranscript).toHaveBeenCalledWith("Bonjour");
    expect(options.onEnd).toHaveBeenCalledOnce();
    expect(recognition.abort).toHaveBeenCalledOnce();
    expect(recognition.onresult).toBeNull();
    cancel();
    vi.runAllTimers();
    expect(options.onError).not.toHaveBeenCalled();
  });

  it("reports unsupported browser without inventing a transcript", () => {
    vi.stubGlobal("window", {});
    const options = callbacks();
    startMicrophonePractice(options);
    expect(options.onError).toHaveBeenCalledWith(expect.stringContaining("not supported"));
    expect(options.onTranscript).not.toHaveBeenCalled();
    expect(options.onEnd).toHaveBeenCalledOnce();
  });

  it.each(["not-allowed", "audio-capture", "network", "language-not-supported", "aborted"])("cleans up %s errors without recognition", (error) => {
    const options = callbacks();
    startMicrophonePractice(options);
    const recognition = RecognitionFixture.current;
    recognition.onerror?.({ error });
    expect(options.onError).toHaveBeenCalledOnce();
    expect(options.onTranscript).not.toHaveBeenCalled();
    expect(options.onEnd).toHaveBeenCalledOnce();
    expect(recognition.onend).toBeNull();
    expect(recognition.abort).toHaveBeenCalledOnce();
  });

  it("cancellation ignores late events and releases the recognition session", () => {
    const options = callbacks();
    const cancel = startMicrophonePractice(options);
    const recognition = RecognitionFixture.current;
    const lateResult = recognition.onresult;
    cancel();
    lateResult?.({ results: [[{ transcript: "Bonjour" }]] });
    vi.runAllTimers();
    expect(recognition.abort).toHaveBeenCalledOnce();
    expect(options.onTranscript).not.toHaveBeenCalled();
    expect(options.onError).not.toHaveBeenCalled();
    expect(options.onEnd).not.toHaveBeenCalled();
  });

  it("times out and aborts a service that never responds", () => {
    const options = callbacks();
    startMicrophonePractice(options);
    vi.advanceTimersByTime(15000);
    expect(options.onError).toHaveBeenCalledWith(expect.stringContaining("timed out"));
    expect(options.onEnd).toHaveBeenCalledOnce();
    expect(RecognitionFixture.current.abort).toHaveBeenCalledOnce();
  });

  it("reports engines ending without a transcript as no speech", () => {
    const options = callbacks();
    startMicrophonePractice(options);
    RecognitionFixture.current.onend?.();
    expect(options.onError).toHaveBeenCalledWith(expect.stringContaining("No speech"));
    expect(options.onTranscript).not.toHaveBeenCalled();
  });
});
