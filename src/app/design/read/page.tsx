"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AlertTriangle, BookOpen, RotateCcw, Sparkles, Volume2 } from "lucide-react";
import { DesignFrame } from "@/components/design/DesignFrame";
import { useAppStore } from "@/lib/store";
import { useCompendium } from "@/lib/content-client";
import { getLanguageDefinition } from "@/data/languages";
import { playTargetAudio } from "@/lib/audio";
import {
  analyzeReadingText,
  getReadingSamples,
  type ReadingToken,
} from "@/lib/reading-lens";
import type { FalseFriend } from "@/lib/types";

function tokenClasses(token: ReadingToken): string {
  if (token.falseFriend) {
    return "bg-amber-500/20 text-amber-900 dark:text-amber-200 border-b-2 border-amber-500 rounded-sm px-1 py-0.5 font-semibold cursor-pointer hover:bg-amber-500/30 transition";
  }
  if (token.status === "mastered") {
    return "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 border-b border-emerald-500/50 rounded-sm px-0.5 cursor-pointer hover:bg-emerald-500/25 transition";
  }
  if (token.status === "encountered") {
    return "bg-sky-500/15 text-sky-800 dark:text-sky-300 border-b border-sky-500/50 rounded-sm px-0.5 cursor-pointer hover:bg-sky-500/25 transition";
  }
  if (token.status === "in-course") {
    return "border-b border-dotted border-[var(--design-ink-muted)]/60 text-[var(--design-ink)] cursor-pointer hover:text-[var(--design-sapphire)] hover:border-[var(--design-sapphire)] transition";
  }
  return "text-[var(--design-ink-muted)]";
}

export default function DesignReadPage() {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const wordMastery = useAppStore((s) => s.wordMastery);
  const openWordDrawer = useAppStore((s) => s.openWordDrawer);
  const storeHydrated = useAppStore((s) => s.storeHydrated);

  const language = getLanguageDefinition(activeLanguageId);
  const compendium = useCompendium(activeLanguageId);
  const samples = useMemo(() => getReadingSamples(activeLanguageId), [activeLanguageId]);

  const [draftByLang, setDraftByLang] = useState<Record<string, string>>({});
  const [selectedFalseFriend, setSelectedFalseFriend] = useState<FalseFriend | null>(null);

  useEffect(() => {
    setSelectedFalseFriend(null);
  }, [activeLanguageId]);

  const text = draftByLang[activeLanguageId] ?? samples[0]?.text ?? "";
  const setText = (next: string) => {
    setDraftByLang((prev) => ({ ...prev, [activeLanguageId]: next }));
  };

  const analysis = useMemo(() => {
    if (!compendium.data) return null;
    return analyzeReadingText(text, compendium.data, wordMastery, activeLanguageId);
  }, [text, compendium.data, wordMastery, activeLanguageId]);

  const handleTokenClick = (token: ReadingToken) => {
    if (token.falseFriend) {
      setSelectedFalseFriend(token.falseFriend);
    }
    if (token.word) {
      openWordDrawer(token.word.id);
    }
  };

  if (!storeHydrated) {
    return (
      <DesignFrame eyebrow="Graded Reader" title="Reading Lens" showBackToTrail maxWidth="4xl">
        <div className="design-card p-12 text-center design-mono text-sm text-[var(--design-ink-muted)]" role="status">
          Loading reading lens…
        </div>
      </DesignFrame>
    );
  }

  return (
    <DesignFrame
      eyebrow="Graded Reader"
      title="Reading Lens"
      subtitle={`Paste any ${language.name} paragraph to see which words you already know, spot false-friend traps, and tap any course word to inspect its cognate card.`}
      showBackToTrail
      maxWidth="4xl"
    >
      <div className="space-y-6">
        {/* Sample Presets + Input */}
        <section className="design-card p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs design-mono text-[var(--design-ink-muted)] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[var(--design-sapphire)]" aria-hidden="true" />
                <span>Try a sample:</span>
              </span>
              {samples.map((sample) => (
                <button
                  key={sample.id}
                  type="button"
                  onClick={() => {
                    setText(sample.text);
                    setSelectedFalseFriend(null);
                  }}
                  className="min-h-10 px-3 py-1.5 rounded-full text-xs design-mono bg-[var(--design-well)] border border-[var(--design-border)] text-[var(--design-ink)] hover:border-[var(--design-sapphire-border)] hover:text-[var(--design-sapphire)] transition cursor-pointer"
                >
                  {sample.title}{" "}
                  <span className="text-[var(--design-ink-muted)]">({sample.level})</span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={!text.trim()}
                onClick={() => playTargetAudio(text, language.ttsLocale)}
                className="min-h-10 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs design-mono bg-[var(--design-well)] border border-[var(--design-border)] text-[var(--design-ink)] hover:border-[var(--design-sapphire-border)] disabled:opacity-40 transition cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5 text-[var(--design-sapphire)]" aria-hidden="true" />
                <span>Listen</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setText("");
                  setSelectedFalseFriend(null);
                }}
                className="min-h-10 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs design-mono bg-[var(--design-well)] border border-[var(--design-border)] text-[var(--design-ink-muted)] hover:text-[var(--design-ink)] transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Clear</span>
              </button>
            </div>
          </div>

          <label className="block">
            <span className="sr-only">Paste {language.name} text to analyze</span>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder={`Paste any ${language.name} paragraph here…`}
              className="w-full rounded-2xl bg-[var(--design-canvas)] border border-[var(--design-border)] p-3.5 text-sm text-[var(--design-ink)] placeholder:text-[var(--design-ink-muted)] focus:outline-none focus:border-[var(--design-sapphire)] resize-y"
            />
          </label>
        </section>

        {compendium.error && (
          <div className="design-card p-4 border-[var(--error-color)]/40 text-xs design-mono text-[var(--error-color)] flex items-center justify-between">
            <span>Could not load the {language.name} dictionary.</span>
            <button
              type="button"
              onClick={compendium.retry}
              className="min-h-10 px-4 py-1.5 rounded-full font-bold cursor-pointer"
              style={{
                backgroundColor: "var(--design-sapphire)",
                color: "var(--design-on-accent)",
              }}
            >
              Retry
            </button>
          </div>
        )}

        {!compendium.data && !compendium.error && (
          <div className="design-card p-6 text-center text-xs design-mono text-[var(--design-ink-muted)]" role="status">
            Loading {language.name.toLowerCase()} dictionary…
          </div>
        )}

        {analysis && (
          <>
            <section className="grid grid-cols-2 sm:grid-cols-5 gap-3 design-mono">
              <div className="col-span-2 sm:col-span-1 design-card p-4">
                <div className="text-[11px] text-[var(--design-ink-muted)]">Your coverage</div>
                <div className="design-serif text-2xl font-bold text-[var(--design-sapphire)]">
                  {analysis.coveragePercent}%
                </div>
                <div className="text-[10px] text-[var(--design-ink-muted)]">
                  {analysis.courseMatchPercent}% in course
                </div>
              </div>
              <div className="design-card p-4">
                <div className="text-[11px] text-[var(--design-ink-muted)]">Mastered</div>
                <div className="design-serif text-2xl font-bold text-[var(--design-emerald)]">
                  {analysis.masteredCount}
                </div>
              </div>
              <div className="design-card p-4">
                <div className="text-[11px] text-[var(--design-ink-muted)]">Encountered</div>
                <div className="design-serif text-2xl font-bold text-[var(--design-sapphire)]">
                  {analysis.encounteredCount}
                </div>
              </div>
              <div className="design-card p-4">
                <div className="text-[11px] text-[var(--design-ink-muted)]">False friends</div>
                <div className="design-serif text-2xl font-bold text-[var(--design-amber)]">
                  {analysis.falseFriendCount}
                </div>
              </div>
              <div className="design-card p-4">
                <div className="text-[11px] text-[var(--design-ink-muted)]">Unknown</div>
                <div className="design-serif text-2xl font-bold text-[var(--design-ink-muted)]">
                  {analysis.unknownCount}
                </div>
              </div>
            </section>

            <section className="design-card p-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-xs design-mono uppercase tracking-wider text-[var(--design-ink-muted)] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[var(--design-sapphire)]" aria-hidden="true" />
                  <span>Annotated Passage ({analysis.totalWords} words)</span>
                </h2>
                <div className="flex flex-wrap items-center gap-3 text-[11px] design-mono text-[var(--design-ink-muted)]">
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500/40 inline-block" /> mastered
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-sm bg-sky-500/40 inline-block" /> encountered
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-sm bg-amber-500/50 inline-block" /> false friend
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-sm border-b border-dotted border-[var(--design-ink-muted)] inline-block" /> in course
                  </span>
                </div>
              </div>

              {analysis.totalWords === 0 ? (
                <p className="text-sm text-[var(--design-ink-muted)] italic">
                  Paste or choose a sample paragraph above to highlight known words and spot false friends.
                </p>
              ) : (
                <div
                  lang={activeLanguageId}
                  className="text-base sm:text-lg leading-loose whitespace-pre-wrap text-[var(--design-ink)]"
                >
                  {analysis.tokens.map((token) => {
                    if (token.kind === "separator") {
                      return <React.Fragment key={token.index}>{token.raw}</React.Fragment>;
                    }
                    const clickable = Boolean(token.word || token.falseFriend);
                    if (!clickable) {
                      return (
                        <span key={token.index} className={tokenClasses(token)}>
                          {token.raw}
                        </span>
                      );
                    }
                    return (
                      <button
                        key={token.index}
                        type="button"
                        onClick={() => handleTokenClick(token)}
                        title={
                          token.falseFriend
                            ? `False friend: ${token.falseFriend.actual_meaning}`
                            : token.word
                            ? `${token.word.target_word} — ${token.word.english_meaning}`
                            : undefined
                        }
                        className={`inline align-baseline ${tokenClasses(token)}`}
                      >
                        {token.raw}
                        {token.falseFriend && (
                          <span
                            role="img"
                            aria-label="False friend warning"
                            className="ml-0.5 inline-flex items-center text-[10px] design-mono text-amber-700 dark:text-amber-300 align-super"
                          >
                            ⚠
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              <p className="text-xs design-mono text-[var(--design-ink-muted)]">
                Tip: tap any highlighted or underlined word to open its full cognate card and audio.
              </p>
            </section>

            {analysis.detectedFalseFriends.length > 0 && (
              <section className="design-card p-5 border-amber-500/35 space-y-3">
                <h2 className="text-xs design-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                  <span>False Friends Spotted ({analysis.detectedFalseFriends.length})</span>
                </h2>
                <div className="grid sm:grid-cols-2 gap-3">
                  {analysis.detectedFalseFriends.map((ff) => {
                    const isSelected = selectedFalseFriend?.id === ff.id;
                    return (
                      <div
                        key={ff.id}
                        className={`p-4 rounded-2xl bg-[var(--design-canvas)] border transition ${
                          isSelected
                            ? "border-amber-500 ring-1 ring-amber-500/40"
                            : "border-amber-500/25"
                        }`}
                      >
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="font-bold text-sm text-[var(--design-ink)]">
                            {ff.german_word}
                          </span>
                          <span className="text-[11px] design-mono text-amber-700 dark:text-amber-300">
                            looks like: {ff.looks_like}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--design-ink)] mt-1">
                          <span className="design-mono text-[var(--design-ink-muted)]">
                            actually means:
                          </span>{" "}
                          <strong>{ff.actual_meaning}</strong>
                        </p>
                        <p className="text-xs text-[var(--design-ink-muted)] mt-1 leading-relaxed">
                          {ff.trap_note}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </DesignFrame>
  );
}
