import { describe, it, expect } from "vitest";
import { playTargetAudio, detectLanguageVoice } from "@/lib/audio";

describe("Native Speech Synthesis Audio Engine", () => {
  it("safely handles server-side or non-browser environments without crashing", () => {
    // In node/test environment, window or speechSynthesis might not be fully featured
    const result = playTargetAudio("Wasser");
    expect(typeof result).toBe("boolean");
  });

  it("handles empty or whitespace strings gracefully", () => {
    const result = playTargetAudio("");
    expect(result).toBe(false);

    const whitespaceResult = playTargetAudio("   ");
    expect(whitespaceResult).toBe(false);
  });

  it("configures utterance with de-DE locale and 0.92 rate when browser speech synthesis is present", () => {
    let capturedUtterance: any = null;
    let cancelCalled = false;
    let spoken = false;

    const mockVoices = [
      { name: "Austrian Voice", lang: "de-AT" },
      { name: "German Voice", lang: "DE_de" },
    ];

    (globalThis as any).window = {
      speechSynthesis: {
        cancel: () => {
          cancelCalled = true;
        },
        getVoices: () => mockVoices,
        speak: (utt: any) => {
          capturedUtterance = utt;
          spoken = true;
        },
        onvoiceschanged: null,
      },
    };
    (globalThis as any).SpeechSynthesisUtterance = function (text: string) {
      this.text = text;
      this.lang = "";
      this.rate = 1;
      this.pitch = 1;
      this.voice = null;
    };

    expect(detectLanguageVoice("de-DE").voiceName).toBe("German Voice");
    const res = playTargetAudio("[der] Wasser");
    expect(res).toBe(true);
    expect(cancelCalled).toBe(true);
    expect(spoken).toBe(true);
    expect(capturedUtterance).toBeDefined();
    expect(capturedUtterance.text).toBe("Wasser");
    expect(capturedUtterance.lang).toBe("de-DE");
    expect(capturedUtterance.rate).toBe(0.92);
    expect(capturedUtterance.voice?.name).toBe("German Voice");

    delete (globalThis as any).window;
    delete (globalThis as any).SpeechSynthesisUtterance;
  });
});

  it("detects when a Linux/Android device has no voice installed for the target language", () => {
    (globalThis as any).window = {
      speechSynthesis: {
        getVoices: () => [{ name: "Unrelated language", lang: "den" }],
      },
    };
    const diag = detectLanguageVoice("de-DE");
    expect(diag.supported).toBe(true);
    expect(diag.hasLanguageVoice).toBe(false);
    expect(diag.warningMessage).toContain("German");
    delete (globalThis as any).window;
  });
