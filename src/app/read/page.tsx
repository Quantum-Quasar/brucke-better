"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, BookOpen, Eye, RotateCcw, Sparkles, Volume2 } from "lucide-react";
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
    return "border-b border-dotted border-[var(--sub-color)]/60 text-[var(--text-color)] cursor-pointer hover:text-[var(--main-color)] hover:border-[var(--main-color)] transition";
  }
  return "text-[var(--sub-color)]";
}

export default function ReadingLensPage() {
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
    return analyzeReadingText(text, compendium.data, wordMastery);
  }, [text, compendium.data, wordMastery]);

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
      <div className="max-w-4xl mx-auto px-4 py-20 text-center font-mono" role="status">
        <p className="text-sm text-[var(--sub-color)]">loading reading lens…</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 font-sans">
      {/* Header */}
      <div className="space-y-2">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-1.5 text-xs font-mono text-[var(--sub-color)] hover:text-[var(--text-color)] transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
          <span>back to trail</span>
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Eye className="w-6 h-6 text-[var(--main-color)]" aria-hidden="true" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-color)]">
              Reading Lens
            </h1>
          </div>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 text-[var(--text-color)]">
            <span aria-hidden="true">{language.flag}</span>
            <span>{language.name}</span>
          </span>
        </div>
        <p className="text-sm text-[var(--sub-color)] leading-relaxed">
          Paste any {language.name} paragraph to see which words you already know, spot false-friend traps, and tap any course word to inspect its cognate card.
        </p>
      </div>

      {/* Sample Presets + Input */}
      <section className="p-5 rounded-xl bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-[var(--sub-color)] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[var(--main-color)]" aria-hidden="true" />
              Try a sample:
            </span>
            {samples.map((sample) => (
              <button
                key={sample.id}
                type="button"
                onClick={() => {
                  setText(sample.text);
                  setSelectedFalseFriend(null);
                }}
                className="px-2.5 py-1.5 rounded-lg text-xs font-mono bg-[var(--bg-color)] border border-[var(--sub-color)]/25 text-[var(--text-color)] hover:border-[var(--main-color)] hover:text-[var(--main-color)] transition cursor-pointer"
              >
                {sample.title} <span className="text-[var(--sub-color)]">({sample.level})</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={!text.trim()}
              onClick={() => playTargetAudio(text, language.ttsLocale)}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono bg-[var(--bg-color)] border border-[var(--sub-color)]/25 text-[var(--text-color)] hover:border-[var(--main-color)] disabled:opacity-40 transition cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5 text-[var(--main-color)]" aria-hidden="true" />
              <span>listen</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setText("");
                setSelectedFalseFriend(null);
              }}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono bg-[var(--bg-color)] border border-[var(--sub-color)]/25 text-[var(--sub-color)] hover:text-[var(--text-color)] transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>clear</span>
            </button>
          </div>
        </div>

        <label className="block space-y-1.5">
          <span className="sr-only">Paste {language.name} text to analyze</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            placeholder={`Paste any ${language.name} paragraph here…`}
            className="w-full rounded-lg bg-[var(--bg-color)] border border-[var(--sub-color)]/30 p-3 text-sm text-[var(--text-color)] placeholder:text-[var(--sub-color)]/70 focus:outline-none focus:border-[var(--main-color)] resize-y"
          />
        </label>
      </section>

      {/* Loading / Error State */}
      {compendium.error && (
        <div className="p-4 rounded-xl bg-[var(--sub-alt-color)] border border-[var(--error-color)]/40 text-xs font-mono text-[var(--error-color)] flex items-center justify-between">
          <span>Could not load the {language.name} dictionary.</span>
          <button
            type="button"
            onClick={compendium.retry}
            className="px-3 py-1 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-bold cursor-pointer"
          >
            retry
          </button>
        </div>
      )}

      {!compendium.data && !compendium.error && (
        <div className="p-6 rounded-xl bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-center text-xs font-mono text-[var(--sub-color)]" role="status">
          loading {language.name.toLowerCase()} dictionary…
        </div>
      )}

      {/* Analysis & Highlighted Reader */}
      {analysis && (
        <>
          {/* Coverage Metrics */}
          <section className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono">
            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-[var(--sub-alt-color)] border border-[var(--main-color)]/30">
              <div className="text-[11px] text-[var(--sub-color)]">your coverage</div>
              <div className="text-2xl font-bold text-[var(--main-color)]">
                {analysis.coveragePercent}%
              </div>
              <div className="text-[10px] text-[var(--sub-color)]">
                {analysis.courseMatchPercent}% in course
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[var(--sub-alt-color)] border border-emerald-500/30">
              <div className="text-[11px] text-[var(--sub-color)]">mastered</div>
              <div className="text-xl font-bold text-emerald-700 dark:text-emerald-300">
                {analysis.masteredCount}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[var(--sub-alt-color)] border border-sky-500/30">
              <div className="text-[11px] text-[var(--sub-color)]">encountered</div>
              <div className="text-xl font-bold text-sky-700 dark:text-sky-300">
                {analysis.encounteredCount}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[var(--sub-alt-color)] border border-amber-500/30">
              <div className="text-[11px] text-[var(--sub-color)]">false friends</div>
              <div className="text-xl font-bold text-amber-700 dark:text-amber-300">
                {analysis.falseFriendCount}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20">
              <div className="text-[11px] text-[var(--sub-color)]">unknown</div>
              <div className="text-xl font-bold text-[var(--sub-color)]">
                {analysis.unknownCount}
              </div>
            </div>
          </section>

          {/* Interactive Highlighted Passage */}
          <section className="p-6 rounded-xl bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xs font-mono uppercase tracking-wider text-[var(--sub-color)] flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[var(--main-color)]" aria-hidden="true" />
                <span>Annotated Passage ({analysis.totalWords} words)</span>
              </h2>
              <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-[var(--sub-color)]">
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
                  <span className="w-2.5 h-2.5 rounded-sm border-b border-dotted border-[var(--sub-color)] inline-block" /> in course
                </span>
              </div>
            </div>

            {analysis.totalWords === 0 ? (
              <p className="text-sm text-[var(--sub-color)] italic">
                Paste or choose a sample paragraph above to highlight known words and spot false friends.
              </p>
            ) : (
              <div
                lang={activeLanguageId}
                className="text-base sm:text-lg leading-loose whitespace-pre-wrap text-[var(--text-color)]"
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
                          className="ml-0.5 inline-flex items-center text-[10px] font-mono text-amber-700 dark:text-amber-300 align-super"
                        >
                          ⚠
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            <p className="text-xs font-mono text-[var(--sub-color)]">
              Tip: tap any highlighted or underlined word to open its full cognate card and audio.
            </p>
          </section>

          {/* False Friends Callout */}
          {analysis.detectedFalseFriends.length > 0 && (
            <section className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/35 space-y-3">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" aria-hidden="true" />
                <span>False Friends Spotted ({analysis.detectedFalseFriends.length})</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {analysis.detectedFalseFriends.map((ff) => {
                  const isSelected = selectedFalseFriend?.id === ff.id;
                  return (
                    <div
                      key={ff.id}
                      className={`p-3.5 rounded-lg bg-[var(--bg-color)] border transition ${
                        isSelected
                          ? "border-amber-500 ring-1 ring-amber-500/40"
                          : "border-amber-500/25"
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-bold text-sm text-[var(--text-color)]">
                          {ff.german_word}
                        </span>
                        <span className="text-[11px] font-mono text-amber-700 dark:text-amber-300">
                          looks like: {ff.looks_like}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--text-color)] mt-1">
                        <span className="font-mono text-[var(--sub-color)]">actually means:</span>{" "}
                        <strong>{ff.actual_meaning}</strong>
                      </p>
                      <p className="text-xs text-[var(--sub-color)] mt-1 leading-relaxed">
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
  );
}
