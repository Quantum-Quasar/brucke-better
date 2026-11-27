"use client";

import React, { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { Volume2 } from "lucide-react";
import type { LessonSession } from "@/components/lesson/lesson-session-types";
import panoramaLessonMap from "@/data/panorama-lesson-map.json";
import { importLineFor } from "@/data/sound-imports";
import { pluralForWord } from "@/data/noun-plurals";
import { useAppStore } from "@/lib/store";
import { playTargetAudio } from "@/lib/audio";
import { spokenWordEntity } from "@/lib/gender";
import { getLanguageDefinition } from "@/data/languages";
import { isModifiedClick } from "@/lib/app-navigation";
import { expLessonHref, EXP_ROOT } from "@/lib/exp-routes";
import type { Footnote, WordEntity } from "@/lib/types";
import { ArrowRightIcon, ShiftedWord, StarMark, useReveal } from "../exp-kit";
import { ExpTwist } from "./ExpPractice";

/* ------------------------------------------------------------- shared */

function Footnotes({ notes }: { notes: Footnote[] }) {
  if (!notes.length) return null;
  return (
    <details className="x-details x-note">
      <summary>Background, if you’re curious</summary>
      <div style={{ display: "grid", gap: 16, paddingTop: 8 }}>
        {notes.map((fn) => (
          <div key={fn.marker}>
            <p className="x-strong">{fn.title}</p>
            <p className="x-body">{fn.content}</p>
            {fn.interest && <p className="x-small x-muted">Just for interest — not tested.</p>}
          </div>
        ))}
      </div>
    </details>
  );
}

function StepNav({
  back,
  next,
}: {
  back?: { label: string; run: () => void };
  next: { label: string; run: () => void; hint?: string };
}) {
  return (
    <div className="x-stepnav">
      <button type="button" className="x-btn x-btn--go" onClick={next.run}>
        {next.label}
        <ArrowRightIcon />
      </button>
      {back && (
        <button type="button" className="x-btn x-btn--ghost" onClick={back.run}>
          {back.label}
        </button>
      )}
      {next.hint && <span className="x-small x-muted x-stepnav-hint">{next.hint}</span>}
    </div>
  );
}

function Paragraphs({ text, className = "x-body" }: { text: string; className?: string }) {
  const parts = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  return (
    <>
      {parts.map((part, index) => (
        <p key={index} className={`${className} x-prewrap x-reveal`} style={{ ["--i" as string]: index + 1 }}>
          {part}
        </p>
      ))}
    </>
  );
}

/* --------------------------------------------------------------- hook */

export function ExpHook({ session }: { session: LessonSession }) {
  const { lesson, isReading, markSegmentDone } = session;
  const ref = useReveal<HTMLDivElement>([lesson.id]);
  return (
    <div ref={ref} className="x-wrap x-grid x-seg">
      <div className="x-seg-main">
        <h2 className="x-head x-reveal">{lesson.hook.title}</h2>
        <Paragraphs text={lesson.hook.content} />
        {lesson.hook.trap_note && (
          <div className="x-note x-reveal" data-tone="warn">
            <p className="x-note-title">Watch out</p>
            <p className="x-body">{lesson.hook.trap_note}</p>
          </div>
        )}
        {lesson.payoff && (
          <div className="x-note x-reveal" data-tone="good">
            <p className="x-note-title">Remember this one?</p>
            <p className="x-body">{lesson.payoff.text}</p>
          </div>
        )}
        {lesson.foreshadow && <p className="x-body x-strong x-reveal">{lesson.foreshadow.line}</p>}
        <StepNav
          next={{
            label: isReading ? "Read the story" : "See the pattern",
            run: () => markSegmentDone("hook", "pattern"),
            hint: "or press Enter",
          }}
        />
      </div>
      <aside className="x-seg-side">
        <Footnotes notes={lesson.hook.footnotes ?? []} />
      </aside>
    </div>
  );
}

/* ------------------------------------------------------------ pattern */

const GUESS_WARMUPS: Record<number, { prompt: string; expected: string; accepted: string[]; hint: string }> = {
  3: { prompt: "What might “ship” be in German?", expected: "Schiff", accepted: ["schiff"], hint: "Try turning the final p into a breathier sound." },
  4: { prompt: "What might “thank” be in German?", expected: "danken", accepted: ["danken", "dank", "danke"], hint: "Try hardening the th at the start." },
  5: { prompt: "What might “water” be in German?", expected: "Wasser", accepted: ["wasser"], hint: "Try turning the middle t into a hiss." },
  6: { prompt: "What might “book” be in German?", expected: "Buch", accepted: ["buch"], hint: "Try softening the final k into a throaty sound." },
  7: { prompt: "What might “day” be in German?", expected: "Tag", accepted: ["tag"], hint: "Try sharpening the d at the start." },
};

function normalizeGuess(value: string) {
  return value
    .trim()
    .toLocaleLowerCase()
    .replace(/^(der|die|das|ein|eine|einen|einem|einer)\s+/i, "")
    .replace(/[.,!?;:]+$/g, "");
}

export function ExpPattern({ session }: { session: LessonSession }) {
  const { lesson, activeLanguageId, isReading, completedSegments, setCurrentSegment, markSegmentDone } = session;
  const ref = useReveal<HTMLDivElement>([lesson.id]);
  const panoramaRef =
    (panoramaLessonMap as Record<string, Record<string, { desc: string; href: string }>>)[activeLanguageId]?.[String(lesson.id)] ?? null;
  const warmup = activeLanguageId === "de" && !isReading ? GUESS_WARMUPS[lesson.id] ?? null : null;
  const [resolved, setResolved] = useState(false);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState<{ value: string; matched: boolean } | null>(null);
  const warmupActive = warmup !== null && !completedSegments.includes("pattern") && !resolved;

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!warmup) return;
    const value = guess.trim();
    setResult(value ? { value, matched: warmup.accepted.includes(normalizeGuess(value)) } : null);
    setResolved(true);
  };

  if (warmupActive && warmup) {
    return (
      <div ref={ref} className="x-wrap x-grid x-seg">
        <form className="x-seg-main" onSubmit={submit}>
          <h2 className="x-head x-reveal">Guess first.</h2>
          <p className="x-lead x-reveal" style={{ ["--i" as string]: 1 }}>
            {warmup.prompt}
          </p>
          <p className="x-body x-reveal" style={{ ["--i" as string]: 2 }}>
            {warmup.hint} No score — it just tunes your ear before the rule.
          </p>
          <input
            className="x-input x-reveal"
            style={{ ["--i" as string]: 3, background: "var(--x-soft)" }}
            value={guess}
            onChange={(event) => setGuess(event.target.value)}
            placeholder="Your guess"
            aria-label={warmup.prompt}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            autoFocus
            lang={activeLanguageId}
          />
          <div className="x-stepnav">
            <button type="submit" className="x-btn x-btn--go">
              Show me the pattern <ArrowRightIcon />
            </button>
            <button type="button" className="x-btn x-btn--ghost" onClick={() => setResolved(true)}>
              Skip the guess
            </button>
            <button type="button" className="x-btn x-btn--ghost" onClick={() => setCurrentSegment("hook")}>
              Back
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div ref={ref} className="x-wrap x-grid x-seg">
      <div className="x-seg-main">
        {result && warmup && (
          <div className="x-note x-reveal" data-tone={result.matched ? "good" : "sun"} role="status">
            <p className="x-note-title">
              {result.matched ? `Spot on — ${warmup.expected}.` : `You guessed “${result.value}”. German says ${warmup.expected}.`}
            </p>
            <p className="x-body">Here’s the pattern behind it.</p>
          </div>
        )}
        <h2 className="x-head x-reveal">{lesson.pattern.title}</h2>
        <Paragraphs text={lesson.pattern.content} />
        {lesson.pattern.trap_note && (
          <div className="x-note x-reveal" data-tone="warn">
            <p className="x-note-title">Watch out</p>
            <p className="x-body">{lesson.pattern.trap_note}</p>
          </div>
        )}
        <StepNav
          back={{ label: "Back", run: () => setCurrentSegment("hook") }}
          next={{
            label: isReading ? "Words for the story" : "Meet the words",
            run: () => markSegmentDone("pattern", "table"),
            hint: "or press Enter",
          }}
        />
      </div>
      <aside className="x-seg-side">
        {panoramaRef && (
          <div className="x-note">
            <p className="x-note-title">Grammar map</p>
            <p className="x-body">{panoramaRef.desc}</p>
            <Link href="/panorama" className="x-btn x-btn--ghost" style={{ paddingInline: 0 }}>
              Open the grammar map
            </Link>
          </div>
        )}
        {lesson.pattern.linguist_note && (
          <details className="x-details x-note">
            <summary>Background, if you’re curious</summary>
            <p className="x-body" style={{ paddingTop: 8 }}>
              {lesson.pattern.linguist_note}
            </p>
          </details>
        )}
        <Footnotes notes={lesson.pattern.footnotes ?? []} />
      </aside>
    </div>
  );
}

/* -------------------------------------------------------------- table */

function WordRow({ word, languageId }: { word: WordEntity; languageId: string }) {
  const openWordDrawer = useAppStore((s) => s.openWordDrawer);
  const plural = pluralForWord(languageId, word);
  return (
    <div className="x-pair x-reveal">
      <button type="button" className="x-pair-open" onClick={() => openWordDrawer(word.id)} aria-label={`${word.target_word}: details`}>
        <span className="x-pair-en">
          {word.english_cognate}
          {word.english_meaning && word.english_meaning.toLowerCase() !== word.english_cognate.toLowerCase() ? ` · “${word.english_meaning}”` : ""}
        </span>
        <span className="x-pair-target">
          {word.gender && (
            <span className="x-pair-article">
              <span className="x-gender" data-g={word.gender} aria-hidden="true" />
              {word.gender}
            </span>
          )}
          <ShiftedWord english={word.english_cognate} target={word.target_word} rule={word.shift_rule} lang={languageId} />
        </span>
        {plural && <span className="x-pair-meta">plural {plural}</span>}
      </button>
      <button
        type="button"
        className="x-icon-btn"
        onClick={() => playTargetAudio(spokenWordEntity(word, languageId), getLanguageDefinition(languageId).ttsLocale)}
        aria-label={`Listen to ${word.target_word}`}
      >
        <Volume2 />
      </button>
    </div>
  );
}

export function ExpTable({ session }: { session: LessonSession }) {
  const { lesson, data, genderSystem, isReading, setCurrentSegment, soundImports, primaryShift, markExtrasExplored, startPractice, resumingPractice, activeLanguageId } = session;
  const ref = useReveal<HTMLDivElement>([lesson.id]);
  const focusIds = [...new Set(lesson.word_ids.map((id) => id.toLowerCase()))];
  const focusSet = new Set(focusIds);
  const tableIds = [...new Set(lesson.table_word_ids.map((id) => id.toLowerCase()))];
  const extraIds = tableIds.filter((id) => !focusSet.has(id));
  const listIds = isReading ? [...tableIds, ...focusIds.filter((id) => !tableIds.includes(id))] : focusIds;
  const words = (ids: string[]) => ids.map((id) => data.words[id]).filter((w): w is WordEntity => Boolean(w));
  const noun = isReading ? "questions" : "exercises";

  return (
    <div ref={ref} className="x-wrap x-seg">
      <div className="x-table-head x-grid">
        <div style={{ gridColumn: "1 / span 7" }}>
          <h2 className="x-head x-reveal">{isReading ? "Words for the story" : "The words"}</h2>
          <p className="x-body x-reveal" style={{ ["--i" as string]: 1, marginTop: 16 }}>
            {isReading
              ? "Keep these handy while you read. Tap one for its details."
              : "These are the words this lesson practises. The underlined letters are the ones that changed from English. Tap a word for its details."}
          </p>
        </div>
        {genderSystem && (
          <ul className="x-legend x-reveal" aria-label="Article colours" style={{ ["--i" as string]: 2 }}>
            {genderSystem.articles.map((article, index) => (
              <li key={article}>
                <span className="x-gender" data-g={article} aria-hidden="true" />
                <span className="x-strong">{article}</span> {genderSystem.labels[index]}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="x-pairs" data-testid={isReading ? "story-word-bank" : "lesson-focus-words"}>
        {words(listIds).map((word) => (
          <WordRow key={word.id} word={word} languageId={activeLanguageId} />
        ))}
      </div>

      {!isReading && extraIds.length > 0 && (
        <details
          className="x-details x-note"
          style={{ marginTop: 32 }}
          data-testid="lesson-extra-words"
          onToggle={(event) => {
            if (event.currentTarget.open) markExtrasExplored();
          }}
        >
          <summary>More words to explore ({extraIds.length}) — optional</summary>
          <div className="x-pairs" style={{ paddingTop: 8 }}>
            {words(extraIds).map((word) => (
              <WordRow key={word.id} word={word} languageId={activeLanguageId} />
            ))}
          </div>
        </details>
      )}

      <div className="x-grid" style={{ marginTop: 32, rowGap: 16 }}>
        {soundImports.length > 0 && (
          <div className="x-note" data-tone="sun" style={{ gridColumn: "1 / span 6" }}>
            <p className="x-note-title">Sounds you already make</p>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {soundImports.map((imp) => (
                <li key={imp.grapheme} className="x-body">
                  <span className="x-strong">{imp.grapheme}</span> {importLineFor(imp)}
                </li>
              ))}
            </ul>
          </div>
        )}
        {primaryShift && (
          <div className="x-note" style={{ gridColumn: soundImports.length ? "7 / span 6" : "1 / span 6" }}>
            <p className="x-note-title">The whole family</p>
            <p className="x-body">
              {primaryShift.word_ids.length} words follow {primaryShift.symbol}. See them all in the sound atlas.
            </p>
            <Link href={`/atlas?family=${encodeURIComponent(primaryShift.id)}&lang=${activeLanguageId}`} className="x-btn x-btn--ghost" style={{ paddingInline: 0 }}>
              Open the atlas
            </Link>
          </div>
        )}
      </div>

      <StepNav
        back={{ label: "Back to the pattern", run: () => setCurrentSegment("pattern") }}
        next={{
          label: resumingPractice ? `Back to the ${noun}` : `Start the ${lesson.exercises.length} ${noun}`,
          run: startPractice,
          hint: "or press Enter",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------ summary */

export function ExpSummary({ session }: { session: LessonSession }) {
  const {
    lesson, activeLanguageId, nextLessonId, goToNextLesson, completedSegments, isLessonFinished, everQueued,
    twistMeetAgain, twistResurfaced, setTwistResurfaced, handleResurfaceTwist, handleCompleteAll, nextLesson, preview,
  } = session;
  const ref = useReveal<HTMLDivElement>([isLessonFinished]);
  const storedStar = useAppStore((s) => s.lessonStars[lesson.id]);
  const star = isLessonFinished ? storedStar ?? (everQueued ? "gold" : "purple") : null;
  const [celebrate, setCelebrate] = useState(false);
  useEffect(() => {
    if (isLessonFinished) setCelebrate(true);
  }, [isLessonFinished]);

  return (
    <div ref={ref} className="x-summary x-field">
      <div className="x-wrap x-grid x-summary-grid">
        <div className="x-summary-main">
          <div className="x-summary-title x-reveal">
            <h2 className="x-display">{preview ? "Preview done." : "Done."}</h2>
            {star && (
              <span className={celebrate ? "x-pop" : undefined} style={{ display: "inline-flex" }}>
                <StarMark star={star} size={88} title={star === "purple" ? "Purple star: every answer right first time" : "Gold star: lesson complete"} />
              </span>
            )}
          </div>
          <p className="x-lead x-reveal" style={{ ["--i" as string]: 1 }}>
            {preview
              ? "This lesson is ahead of your trail, so it isn’t marked complete yet."
              : star === "purple"
                ? "Purple star — every answer right the first time."
                : isLessonFinished
                  ? "Gold star. The ones you missed are now in your review deck."
                  : lesson.summary.outcome}
          </p>
          <div className="x-stepnav x-reveal" style={{ ["--i" as string]: 2 }}>
            {!preview && (
              <a
                href={nextLessonId ? expLessonHref(activeLanguageId, nextLessonId) : EXP_ROOT}
                className="x-btn x-btn--go"
                onClick={(event) => {
                  if (isModifiedClick(event)) return;
                  event.preventDefault();
                  handleCompleteAll();
                  goToNextLesson();
                }}
              >
                {nextLesson ? `Next: ${nextLesson.title}` : "Back to the trail"}
                <ArrowRightIcon />
              </a>
            )}
            {!preview && !isLessonFinished && (
              <button type="button" className="x-btn" onClick={handleCompleteAll} disabled={!completedSegments.includes("practice")}>
                Mark as finished
              </button>
            )}
            <Link href={`${EXP_ROOT}/review`} className="x-btn x-btn--ghost">
              Review these words
            </Link>
          </div>
        </div>

        <div className="x-summary-side">
          <div className="x-reveal" style={{ ["--i" as string]: 2 }}>
            <p className="x-small x-strong">You can now</p>
            <p className="x-lead-strong">{lesson.summary.outcome}</p>
          </div>
          {lesson.summary.use_example.german && (
            <figure className="x-reveal" style={{ ["--i" as string]: 3, margin: 0 }}>
              <blockquote className="x-lead-strong" lang={activeLanguageId} style={{ margin: 0, display: "flex", gap: 12, alignItems: "center" }}>
                {lesson.summary.use_example.german}
                <button
                  type="button"
                  className="x-icon-btn"
                  onClick={() => playTargetAudio(lesson.summary.use_example.german, getLanguageDefinition(activeLanguageId).ttsLocale)}
                  aria-label="Listen to the sentence"
                >
                  <Volume2 />
                </button>
              </blockquote>
              <figcaption className="x-body">{lesson.summary.use_example.english}</figcaption>
            </figure>
          )}
          <div className="x-reveal" style={{ ["--i" as string]: 4 }}>
            <p className="x-small x-strong">Keep in mind</p>
            <p className="x-body">{lesson.summary.takeaway}</p>
          </div>
          {activeLanguageId !== "de" && lesson.summary.curiosity_teaser && (
            <div className="x-reveal" style={{ ["--i" as string]: 5 }}>
              <p className="x-small x-strong">Coming up</p>
              <p className="x-body">{lesson.summary.curiosity_teaser}</p>
            </div>
          )}
        </div>
      </div>

      {twistMeetAgain && lesson.twist && !twistResurfaced && (
        <div className="x-wrap" style={{ paddingBottom: 48 }}>
          <button type="button" className="x-btn x-btn--paper" onClick={handleResurfaceTwist}>
            Try the twist once more
          </button>
        </div>
      )}
      {twistResurfaced && lesson.twist && (
        <div style={{ paddingBottom: 48 }}>
          <ExpTwist twist={lesson.twist} onDone={() => setTwistResurfaced(false)} />
        </div>
      )}
    </div>
  );
}
