"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Mic, MicOff, RefreshCw, Sparkles, Volume2 } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useLessonIndex } from "@/lib/content-client";
import { getLanguageDefinition } from "@/data/languages";
import { playTargetAudio } from "@/lib/audio";
import {
  getRecognitionConstructor,
  startMicrophonePractice,
} from "@/lib/microphone-practice";
import {
  buildShadowingPhrases,
  scoreShadowingAttempt,
  type ShadowingOverlapResult,
} from "@/lib/practice-studio";

export const ShadowingLab: React.FC = () => {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const completedLessons = useAppStore((s) => s.completedLessons);
  const lessonIndex = useLessonIndex(activeLanguageId);
  const language = getLanguageDefinition(activeLanguageId);

  const phrases = useMemo(
    () => buildShadowingPhrases(lessonIndex.data ?? [], completedLessons, activeLanguageId),
    [lessonIndex.data, completedLessons, activeLanguageId]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [manualInput, setManualInput] = useState("");
  const [micNote, setMicNote] = useState<string | null>(null);
  const [result, setResult] = useState<ShadowingOverlapResult | null>(null);
  const [hasSpeechApi, setHasSpeechApi] = useState(false);

  const stopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setHasSpeechApi(Boolean(getRecognitionConstructor()));
    return () => {
      stopRef.current?.();
      stopRef.current = null;
    };
  }, []);

  useEffect(() => {
    stopRef.current?.();
    stopRef.current = null;
    setIsListening(false);
    setSelectedIndex(0);
    setTranscript("");
    setManualInput("");
    setMicNote(null);
    setResult(null);
  }, [activeLanguageId]);

  const safeIndex = selectedIndex < phrases.length ? selectedIndex : 0;
  const activePhrase = phrases[safeIndex];

  const chipWindowStart = Math.max(0, Math.min(safeIndex - 3, Math.max(0, phrases.length - 8)));
  const visibleChips = phrases.slice(chipWindowStart, chipWindowStart + 8);

  const selectPhrase = (index: number) => {
    stopRef.current?.();
    stopRef.current = null;
    setIsListening(false);
    setSelectedIndex(index);
    setTranscript("");
    setManualInput("");
    setMicNote(null);
    setResult(null);
  };

  const handleToggleMic = () => {
    if (!activePhrase) return;
    if (isListening) {
      stopRef.current?.();
      stopRef.current = null;
      setIsListening(false);
      return;
    }
    // Avoid active TTS being captured as the learner's speech.
    if (typeof window !== "undefined") {
      window.speechSynthesis?.cancel();
    }
    setMicNote(null);
    setTranscript("");
    setResult(null);
    setIsListening(true);

    stopRef.current = startMicrophonePractice({
      locale: language.ttsLocale,
      onTranscript: (heard) => {
        setTranscript(heard);
        setResult(scoreShadowingAttempt(heard, activePhrase.target));
      },
      onError: (msg) => {
        setMicNote(msg);
      },
      onEnd: () => {
        setIsListening(false);
        stopRef.current = null;
      },
    });
  };

  const handleManualCheck = (event: React.FormEvent) => {
    event.preventDefault();
    if (!activePhrase || !manualInput.trim()) return;
    setTranscript(manualInput.trim());
    setResult(scoreShadowingAttempt(manualInput.trim(), activePhrase.target));
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-bold text-[var(--text-color)]">
            Pronunciation Shadowing
          </h2>
          <p className="text-xs text-[var(--sub-color)] mt-0.5">
            Listen to a phrase, then echo it aloud. Feedback focuses gently on word overlap — never harsh grading.
          </p>
        </div>
        <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[var(--bg-color)] border border-[var(--sub-color)]/25 text-[var(--sub-color)]">
          {completedLessons.length > 0 ? "from completed lessons" : "starter phrases"}
        </span>
      </div>

      {/* Phrase Selector Chips */}
      <div className="flex flex-wrap gap-2">
        {visibleChips.map((phrase, offset) => {
          const idx = chipWindowStart + offset;
          return (
            <button
              key={phrase.id}
              type="button"
              onClick={() => selectPhrase(idx)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition cursor-pointer ${
                idx === safeIndex
                  ? "bg-[var(--main-color)] text-[var(--bg-color)] border-[var(--main-color)] font-bold"
                  : "bg-[var(--bg-color)] text-[var(--text-color)] border-[var(--sub-color)]/25 hover:border-[var(--main-color)]"
              }`}
            >
              {phrase.sourceLabel}
            </button>
          );
        })}
      </div>

      {/* Active Phrase Card */}
      {activePhrase && (
        <div className="p-6 rounded-xl bg-[var(--bg-color)] border border-[var(--sub-color)]/25 space-y-5">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono uppercase tracking-wider text-[var(--sub-color)]">
              <span>{activePhrase.sourceLabel}</span>
              <span>
                Card {safeIndex + 1} of {phrases.length}
              </span>
            </div>
            <p lang={activeLanguageId} className="text-xl sm:text-2xl font-bold text-[var(--text-color)] leading-snug">
              {activePhrase.target}
            </p>
            <p className="text-sm text-[var(--sub-color)]">{activePhrase.english}</p>
          </div>

          <p id="shadowing-mic-disclosure" className="text-xs text-[var(--sub-color)] leading-relaxed">
            Starting requests microphone permission. Your browser or its speech provider may send and process audio online; this app does not save recordings or transcripts. Transcript matching is only a rough practice aid, never a pronunciation grade.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => playTargetAudio(activePhrase.target, language.ttsLocale)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-bold bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/30 text-[var(--text-color)] hover:border-[var(--main-color)] transition cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-[var(--main-color)]" aria-hidden="true" />
              <span>Play audio</span>
            </button>

            <button
              type="button"
              aria-describedby="shadowing-mic-disclosure"
              onClick={handleToggleMic}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                isListening
                  ? "bg-amber-500 text-slate-950"
                  : "bg-[var(--main-color)] text-[var(--bg-color)] hover:opacity-90"
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4" aria-hidden="true" />
                  <span>Stop listening…</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" aria-hidden="true" />
                  <span>{hasSpeechApi ? "Speak & shadow" : "Try microphone"}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => selectPhrase((safeIndex + 1) % phrases.length)}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-mono bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 text-[var(--sub-color)] hover:text-[var(--text-color)] transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Next phrase</span>
            </button>
          </div>

          <div role="status" aria-live="polite" className="space-y-3">
            {micNote && (
              <p className="text-xs font-mono text-[var(--sub-color)] bg-[var(--sub-alt-color)] px-3 py-2 rounded-lg border border-[var(--sub-color)]/20">
                {micNote}
              </p>
            )}

            {/* Gentle Word-Overlap Feedback (calm emerald / sky / amber tones, never harsh red) */}
            {result && (
              <div
                className={`p-4 rounded-xl border space-y-2.5 ${
                  result.tier === "great"
                    ? "bg-emerald-500/10 border-emerald-500/35"
                    : result.tier === "good"
                    ? "bg-sky-500/10 border-sky-500/35"
                    : "bg-amber-500/10 border-amber-500/35"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[var(--text-color)]">
                    <Sparkles className="w-4 h-4 text-[var(--main-color)]" aria-hidden="true" />
                    <span>Word overlap: {result.overlapPercent}%</span>
                  </span>
                  <span className="text-xs text-[var(--sub-color)]">
                    Heard: &ldquo;{transcript}&rdquo;
                  </span>
                </div>
                <p className="text-sm text-[var(--text-color)]">{result.encouragement}</p>
                {result.missedWords.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono">
                    <span className="text-[var(--sub-color)]">Focus words for next echo:</span>
                    {result.missedWords.map((word, idx) => (
                      <span
                        key={`${word}-${idx}`}
                        className="px-2 py-0.5 rounded bg-[var(--bg-color)] border border-[var(--sub-color)]/25 text-[var(--text-color)]"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Text echo fallback so shadowing still works without a microphone */}
          <form onSubmit={handleManualCheck} className="pt-2 border-t border-[var(--sub-color)]/15 space-y-2">
            <label
              htmlFor="shadowing-manual-input"
              className="block text-[11px] font-mono text-[var(--sub-color)]"
            >
              No mic handy? Type what you heard or echoed to test word overlap:
            </label>
            <div className="flex gap-2">
              <input
                id="shadowing-manual-input"
                type="text"
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder={`Echo the ${language.name} phrase…`}
                className="flex-1 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 px-3 py-2 text-sm text-[var(--text-color)] focus:outline-none focus:border-[var(--main-color)]"
              />
              <button
                type="submit"
                disabled={!manualInput.trim()}
                className="px-4 py-2 rounded-lg text-xs font-mono font-bold bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/30 text-[var(--text-color)] hover:border-[var(--main-color)] disabled:opacity-40 transition cursor-pointer"
              >
                Check echo
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
