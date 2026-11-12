export type RecognitionScore = "exact" | "near" | "try-again";

function normalizeSpeech(text: string) {
  return text.toLocaleLowerCase().normalize("NFD").replace(/\p{M}/gu, "").replace(/ß/g, "ss").replace(/[^\p{L}\p{N}\s]/gu, " ").replace(/\s+/g, " ").trim();
}

/** Forgiving transcript comparison, not an acoustic pronunciation assessment. */
export function scoreRecognition(transcript: string, target: string): RecognitionScore {
  const heard = normalizeSpeech(transcript);
  const expected = normalizeSpeech(target);
  if (!heard || !expected) return "try-again";
  if (heard === expected) return "exact";
  let previous = Array.from({ length: expected.length + 1 }, (_, index) => index);
  for (let row = 1; row <= heard.length; row++) {
    const current = [row];
    for (let column = 1; column <= expected.length; column++) {
      current[column] = Math.min(current[column - 1] + 1, previous[column] + 1, previous[column - 1] + Number(heard[row - 1] !== expected[column - 1]));
    }
    previous = current;
  }
  const distance = previous[expected.length];
  return distance <= Math.max(1, Math.floor(Math.max(heard.length, expected.length) * 0.25)) ? "near" : "try-again";
}

export interface BrowserRecognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((event: { error: string }) => void) | null;
  onend: (() => void) | null;
  start(): void;
  abort(): void;
}

type RecognitionConstructor = new () => BrowserRecognition;

declare global {
  interface Window {
    SpeechRecognition?: RecognitionConstructor;
    webkitSpeechRecognition?: RecognitionConstructor;
  }
}

export function getRecognitionConstructor(): RecognitionConstructor | null {
  if (typeof window === "undefined") return null;
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

export function recognitionErrorMessage(code: string): string {
  if (code === "not-allowed" || code === "service-not-allowed") return "Microphone permission was denied. You can allow it in browser settings or continue typing.";
  if (code === "audio-capture") return "No microphone is available. Continue typing or connect a microphone.";
  if (code === "network") return "The browser speech service could not connect. Continue typing or try again later.";
  if (code === "language-not-supported") return "The browser speech service does not support this language. Continue typing.";
  if (code === "no-speech") return "No speech was detected. Try again when you are ready, or continue typing.";
  if (code === "aborted") return "Microphone practice cancelled. You can continue typing.";
  return "Speech recognition is unavailable right now. Try again or continue typing.";
}

/** Call only from an explicit user gesture; cancellation detaches before aborting. */
export function startMicrophonePractice(options: {
  locale: string;
  onTranscript: (transcript: string) => void;
  onError: (message: string) => void;
  onEnd: () => void;
}): () => void {
  const Constructor = getRecognitionConstructor();
  if (!Constructor) {
    options.onError("Microphone practice is not supported in this browser. You can continue typing.");
    options.onEnd();
    return () => {};
  }
  let recognition: BrowserRecognition;
  try {
    recognition = new Constructor();
  } catch {
    options.onError("The browser could not start speech recognition. You can continue typing.");
    options.onEnd();
    return () => {};
  }
  let active = true;
  let receivedSpeech = false;
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const cleanup = () => {
    if (!active) return;
    active = false;
    clearTimeout(timeout);
    recognition.onresult = recognition.onerror = recognition.onend = null;
    try { recognition.abort(); } catch { /* Some engines reject abort after ending. */ }
  };
  const finish = () => {
    if (!active) return;
    cleanup();
    options.onEnd();
  };
  recognition.lang = options.locale;
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  recognition.onresult = (event) => {
    if (!active) return;
    const transcript = Array.from(event.results).map((result) => result[0]?.transcript ?? "").join(" ").trim();
    receivedSpeech = Boolean(transcript);
    if (receivedSpeech) options.onTranscript(transcript);
    else options.onError(recognitionErrorMessage("no-speech"));
    finish();
  };
  recognition.onerror = (event) => {
    if (!active) return;
    options.onError(recognitionErrorMessage(event.error));
    finish();
  };
  recognition.onend = () => {
    if (!active) return;
    if (!receivedSpeech) options.onError(recognitionErrorMessage("no-speech"));
    finish();
  };
  timeout = setTimeout(() => {
    if (!active) return;
    options.onError("Microphone practice timed out. Try again when ready or continue typing.");
    finish();
  }, 15000);
  try {
    recognition.start();
  } catch {
    options.onError("The browser could not start speech recognition. You can continue typing.");
    finish();
  }
  return cleanup;
}
