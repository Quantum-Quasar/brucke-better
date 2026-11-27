"use client";

import React, { useMemo, useState } from "react";
import { useAppStore } from "@/lib/store";
import { useCompendium, useLessonIndex } from "@/lib/content-client";
import { buildSearchIndex, searchIndex } from "@/lib/search-index";
import { getLanguageDefinition } from "@/data/languages";
import { useAppNavigation } from "@/lib/app-navigation";
import type { WordEntity } from "@/lib/types";
import { ExpBar } from "./ExpChrome";
import { ExpFooter } from "./ExpHome";
import { ShiftedWord } from "./exp-kit";

const FIELD = { ["--x-field" as string]: "#ffc4ef", ["--x-field-ink" as string]: "#0a0a0a" } as React.CSSProperties;

function WordLine({ word, languageId }: { word: WordEntity; languageId: string }) {
  const open = useAppStore((s) => s.openWordDrawer);
  return (
    <li>
      <button type="button" className="x-wordline" onClick={() => open(word.id)}>
        <span className="x-wordline-en">{word.english_cognate}</span>
        <span className="x-wordline-target">
          {word.gender && (
            <span className="x-pair-article">
              <span className="x-gender" data-g={word.gender} aria-hidden="true" />
              {word.gender}
            </span>
          )}
          <ShiftedWord english={word.english_cognate} target={word.target_word} rule={word.shift_rule} lang={languageId} />
        </span>
        <span className="x-wordline-meaning x-body">{word.english_meaning}</span>
      </button>
    </li>
  );
}

/** The live answer: whatever you type, its twin set large beside the field. */
function LiveTwin({
  word,
  fallback,
  languageId,
}: {
  word: WordEntity | null;
  fallback?: { english: string; target: string; rule: string; gender?: string | null };
  languageId: string;
}) {
  const open = useAppStore((s) => s.openWordDrawer);
  const shown = word
    ? { english: word.english_cognate, target: word.target_word, rule: word.shift_rule, gender: word.gender, meaning: word.english_meaning }
    : fallback
      ? { ...fallback, meaning: null as string | null }
      : null;
  if (!shown) return <div className="x-words-live" />;
  return (
    <div className="x-words-live" aria-live="polite" key={shown.target}>
      <p className="x-lead">
        {shown.english} {shown.meaning && shown.meaning.toLowerCase() !== shown.english.toLowerCase() ? `(“${shown.meaning}”)` : ""} becomes
      </p>
      <p
        className="x-words-live-target x-pop"
        style={{ margin: 0, fontSize: shown.target.length > 9 ? `clamp(2.25rem, 0.5rem + ${Math.max(3, 54 / shown.target.length).toFixed(1)}vw, 7.5rem)` : undefined }}
      >
        {shown.gender && <span style={{ fontWeight: 600 }}>{shown.gender} </span>}
        <ShiftedWord english={shown.english} target={shown.target} rule={shown.rule} lang={languageId} />
      </p>
      {word && (
        <button type="button" className="x-btn x-btn--ghost" style={{ justifySelf: "start", paddingInline: 0 }} onClick={() => open(word.id)}>
          More about {word.target_word}
        </button>
      )}
    </div>
  );
}

export function ExpWords() {
  const languageId = useAppStore((s) => s.activeLanguageId);
  const starred = useAppStore((s) => s.starredWordIds[s.activeLanguageId]);
  const srsCards = useAppStore((s) => s.srsCards);
  const language = getLanguageDefinition(languageId);
  const compendium = useCompendium(languageId);
  const lessons = useLessonIndex(languageId);
  const { openLesson } = useAppNavigation();
  const [query, setQuery] = useState("");

  const index = useMemo(
    () => (compendium.data && lessons.data ? buildSearchIndex(languageId, compendium.data, lessons.data) : null),
    [languageId, compendium.data, lessons.data]
  );
  const results = useMemo(() => (index ? searchIndex(index, query, 60) : []), [index, query]);
  const words = useMemo<Record<string, WordEntity>>(() => compendium.data?.words ?? {}, [compendium.data]);
  const wordHits = useMemo(() => {
    const q = query.trim().toLowerCase().replace(/^to\s+/, "");
    const score = (w: WordEntity) => {
      const en = w.english_cognate.toLowerCase().replace(/^to\s+/, "");
      const target = w.target_word.toLowerCase();
      if (en === q || target === q) return 0;
      if (w.english_meaning.toLowerCase().replace(/^to\s+/, "") === q) return 1;
      if (en.startsWith(q) || target.startsWith(q)) return 2;
      return 3;
    };
    return results
      .filter((r) => r.kind === "word" && words[r.id])
      .map((r) => words[r.id])
      .map((w, i) => ({ w, i, s: score(w) }))
      .sort((a, b) => a.s - b.s || a.i - b.i)
      .map(({ w }) => w);
  }, [results, words, query]);
  const lessonHits = results.filter((r) => r.kind === "lesson");
  const mine = useMemo(() => {
    const ids = new Set([...(starred ?? []), ...Object.keys(srsCards)]);
    return [...ids].map((id) => words[id]).filter((w): w is WordEntity => Boolean(w));
  }, [starred, srsCards, words]);
  const examples = language.onboarding.philosophy.demos.map((d) => d.english).slice(0, 4);
  const demo = language.onboarding.philosophy.demos[1] ?? language.onboarding.philosophy.demos[0];

  return (
    <>
      <ExpBar />
      <section className="x-words-hero x-field" style={FIELD} aria-labelledby="x-words-title">
        <div className="x-wrap x-grid x-words-grid">
          <div className="x-words-main">
          <h1 id="x-words-title" className="x-display">Words</h1>
          <p className="x-lead" style={{ marginTop: 24, maxWidth: "36ch" }}>
            Type an English word and see its {language.name} twin — or search in {language.name}.
          </p>
          <label htmlFor="x-word-search" className="sr-only">
            Search words and lessons
          </label>
          <input
            id="x-word-search"
            type="search"
            className="x-input x-words-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={`water, Haus, “to swim”…`}
            autoComplete="off"
            spellCheck={false}
            autoFocus
          />
          {!query && (
            <div className="x-tiles" style={{ marginTop: 16 }} aria-label="Try one">
              {examples.map((example) => (
                <button key={example} type="button" className="x-tile" onClick={() => setQuery(example)}>
                  {example}
                </button>
              ))}
            </div>
          )}
          </div>
          <LiveTwin word={wordHits[0] ?? null} fallback={demo} languageId={languageId} />
        </div>
      </section>

      <section className="x-words-results" aria-live="polite">
        <div className="x-wrap">
          {!index ? (
            <p className="x-lead" role="status">
              {compendium.error || lessons.error ? "The word list didn’t load." : "Loading the word list…"}
            </p>
          ) : query ? (
            <>
              <h2 className="x-head">
                {wordHits.length + lessonHits.length === 0 ? `Nothing for “${query}”.` : `${wordHits.length} ${wordHits.length === 1 ? "word" : "words"}`}
              </h2>
              <ul className="x-wordlines">
                {wordHits.map((word) => (
                  <WordLine key={word.id} word={word} languageId={languageId} />
                ))}
              </ul>
              {lessonHits.length > 0 && (
                <>
                  <h2 className="x-head" style={{ marginTop: 96 }}>
                    Lessons
                  </h2>
                  <ul className="x-wordlines">
                    {lessonHits.map((hit) => (
                      <li key={hit.id}>
                        <button type="button" className="x-wordline" onClick={() => openLesson(languageId, Number(hit.id))}>
                          <span className="x-wordline-target">{hit.title}</span>
                          <span className="x-wordline-meaning x-body">{hit.description}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </>
          ) : (
            <>
              <h2 className="x-head">{mine.length ? `Your ${mine.length} words` : "Your words appear here"}</h2>
              <p className="x-body" style={{ marginTop: 16 }}>
                {mine.length
                  ? "Everything in your review deck and everything you starred."
                  : "Finish a lesson, or star a word, and it joins this list."}
              </p>
              <ul className="x-wordlines">
                {mine.map((word) => (
                  <WordLine key={word.id} word={word} languageId={languageId} />
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
      <ExpFooter />
    </>
  );
}
