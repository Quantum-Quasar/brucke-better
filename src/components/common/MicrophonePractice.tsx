"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, Square } from "lucide-react";
import { getRecognitionConstructor, scoreRecognition, startMicrophonePractice } from "@/lib/microphone-practice";

export function MicrophonePractice({ target, locale }: { target: string; locale: string }) {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState("");
  const [transcript, setTranscript] = useState("");
  const cancelRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setSupported(Boolean(getRecognitionConstructor()));
    setMessage("");
    setTranscript("");
    setListening(false);
    return () => {
      cancelRef.current?.();
      cancelRef.current = null;
    };
  }, [target, locale]);

  useEffect(() => {
    const cancelWhenHidden = () => {
      if (document.visibilityState !== "hidden") return;
      cancelRef.current?.();
      cancelRef.current = null;
      setListening(false);
      setMessage("Microphone practice cancelled while the page was hidden. Continue typing or start again.");
    };
    document.addEventListener("visibilitychange", cancelWhenHidden);
    return () => document.removeEventListener("visibilitychange", cancelWhenHidden);
  }, []);

  const start = () => {
    cancelRef.current?.();
    setTranscript("");
    setMessage("");
    setListening(true);
    // Avoid the question's TTS being mistaken for the learner's speech.
    window.speechSynthesis?.cancel();
    cancelRef.current = startMicrophonePractice({
      locale,
      onTranscript: (heard) => {
        setTranscript(heard);
        const score = scoreRecognition(heard, target);
        setMessage(score === "exact" ? "Exact match — the browser heard the expected words." : score === "near" ? "Close enough for practice — compare with the example and try again if you like." : "Try again when ready — the browser heard different words. This is not a pronunciation grade.");
      },
      onError: setMessage,
      onEnd: () => setListening(false),
    });
  };

  return (
    <section aria-label="Optional microphone practice" className="rounded-lg border border-[var(--sub-color)]/25 bg-[var(--bg-color)] p-4 space-y-3 text-sm">
      <h3 className="font-bold text-[var(--main-color)]">Optional speaking practice</h3>
      <p className="text-[var(--text-color)]">Say: <span lang={locale}>{target}</span></p>
      <p id="microphone-disclosure" className="text-xs text-[var(--sub-color)]">Starting requests microphone permission. Your browser or its speech provider may send and process audio online; this app does not save recordings or transcripts. Transcript matching is only a rough practice aid, never a pronunciation grade. It never completes or blocks this exercise — continue with the written answer.</p>
      {supported === false ? (
        <p role="status" className="text-xs text-[var(--sub-color)]">Microphone practice is not supported in this browser. You can continue typing.</p>
      ) : supported ? (
        <button type="button" aria-describedby="microphone-disclosure" onClick={listening ? () => {
          cancelRef.current?.();
          cancelRef.current = null;
          setListening(false);
          setMessage("Microphone practice cancelled. You can continue typing.");
        } : start} className="inline-flex items-center gap-2 rounded-lg border border-[var(--main-color)]/40 px-3 py-2 text-[var(--main-color)]">
          {listening ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          {listening ? "Cancel microphone practice" : "Start microphone practice"}
        </button>
      ) : null}
      <div role="status" aria-live="polite" className="text-xs space-y-1">
        {listening && <p>Listening… You can cancel at any time.</p>}
        {transcript && <p>Heard: <span lang={locale}>{transcript}</span></p>}
        {message && <p>{message}</p>}
      </div>
    </section>
  );
}
