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
import { expLessonHref, EXP3_ROOT } from "@/lib/exp-routes";
import type { Footnote, WordEntity } from "@/lib/types";
import { ArrowRightIcon, ShiftedWord, StarMark, useReveal } from "../p3-kit";
import { P3Twist } from "./P3Practice";

/* ------------------------------------------------------------- shared */

function Footnotes({ notes }: { notes: Footnote[] }) {
  if (!notes.length) return null;
  return (
    <details className="q-details q-note">
      <summary>Background, if you’re curious</summary>
      <div style={{ display: "grid", gap: 16, paddingTop: 8 }}>
        {notes.map((fn) => (
          <div key={fn.marker}>
            <p className="q-strong">{fn.title}</p>
            <p className="q-body">{fn.content}</p>
            {fn.interest && <p className="q-small q-muted">Just for interest — not tested.</p>}
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
    <div className="q-stepnav">
      <button type="button" className="q-btn q-btn--go" onClick={next.run}>
        {next.label}
        <ArrowRightIcon />
      </button>
      {back && (
        <button type="button" className="q-btn q-btn--ghost" onClick={back.run}>
          {back.label}
        </button>
      )}
      {next.hint && <span className="q-small q-muted q-stepnav-hint">{next.hint}</span>}
    </div>
  );
}

function Paragraphs({ text, className = "q-body" }: { text: string; className?: string }) {
  const parts = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  return (
    <>
      {parts.map((part, index) => (
        <p key={index} className={`${className} q-prewrap q-reveal`} style={{ ["--i" as string]: index + 1 }}>
          {part}
        </p>
      ))}
    </>
  );
}

/* --------------------------------------------------------------- hook */

export function P3Hook({ session }: { session: LessonSession }) {
  const { lesson, isReading, markSegmentDone } = session;
  const ref = useReveal<HTMLDivElement>([lesson.id]);
  return (
    <div ref={ref} className="q-wrap q-grid q-seg">
      <div className="q-seg-main">
        <h2 className="q-head q-reveal">{lesson.hook.title}</h2>
        <Paragraphs text={lesson.hook.content} />
        {lesson.hook.trap_note && (
          <div className="q-note q-reveal" data-tone="warn">
            <p className="q-note-title">Watch out</p>
            <p className="q-body">{lesson.hook.trap_note}</p>
          </div>
        )}
        {lesson.payoff && (
          <div className="q-note q-reveal" data-tone="good">
            <p className="q-note-title">Remember this one?</p>
            <p className="q-body">{lesson.payoff.text}</p>
          </div>
        )}
        {lesson.foreshadow && <p className="q-body q-strong q-reveal">{lesson.foreshadow.line}</p>}
        <StepNav
          next={{
            label: isReading ? "Read the story" : "See the pattern",
            run: () => markSegmentDone("hook", "pattern"),
            hint: "or press Enter",
          }}
        />
      </div>
      <aside className="q-seg-side">
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

export function P3Pattern({ session }: { session: LessonSession }) {
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
      <div ref={ref} className="q-wrap q-grid q-seg">
        <form className="q-seg-main" onSubmit={submit}>
          <h2 className="q-head q-reveal">Guess first.</h2>
          <p className="q-lead q-reveal" style={{ ["--i" as string]: 1 }}>
            {warmup.prompt}
          </p>
          <p className="q-body q-reveal" style={{ ["--i" as string]: 2 }}>
            {warmup.hint} No score — it just tunes your ear before the rule.
          </p>
          <input
            className="q-input q-reveal"
            style={{ ["--i" as string]: 3, background: "var(--q-soft)" }}
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
          <div className="q-stepnav">
            <button type="submit" className="q-btn q-btn--go q-keep">
              Show me the pattern <ArrowRightIcon />
            </button>
            <button type="button" className="q-btn q-btn--ghost" onClick={() => setResolved(true)}>
              Skip the guess
            </button>
            <button type="button" className="q-btn q-btn--ghost" onClick={() => setCurrentSegment("hook")}>
              Back
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div ref={ref} className="q-wrap q-grid q-seg">
      <div className="q-seg-main">
        {result && warmup && (
          <div className="q-note q-reveal" data-tone={result.matched ? "good" : "sun"} role="status">
            <p className="q-note-title">
              {result.matched ? `Spot on — ${warmup.expected}.` : `You guessed “${result.value}”. German says ${warmup.expected}.`}
            </p>
            <p className="q-body">Here’s the pattern behind it.</p>
          </div>
        )}
        <h2 className="q-head q-reveal">{lesson.pattern.title}</h2>
        <Paragraphs text={lesson.pattern.content} />
        {lesson.pattern.trap_note && (
          <div className="q-note q-reveal" data-tone="warn">
            <p className="q-note-title">Watch out</p>
            <p className="q-body">{lesson.pattern.trap_note}</p>
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
      <aside className="q-seg-side">
        {panoramaRef && (
          <div className="q-note">
            <p className="q-note-title">Grammar map</p>
            <p className="q-body">{panoramaRef.desc}</p>
            <Link href="/panorama" className="q-btn q-btn--ghost" style={{ paddingInline: 0 }}>
              Open the grammar map
            </Link>
          </div>
        )}
        {lesson.pattern.linguist_note && (
          <details className="q-details q-note">
            <summary>Background, if you’re curious</summary>
            <p className="q-body" style={{ paddingTop: 8 }}>
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
    <div className="q-pair q-reveal">
      <button type="button" className="q-pair-open" onClick={() => openWordDrawer(word.id)} aria-label={`${word.target_word}: details`}>
        <span className="q-pair-en">
          {word.english_cognate}
          {word.english_meaning && word.english_meaning.toLowerCase() !== word.english_cognate.toLowerCase() ? ` · “${word.english_meaning}”` : ""}
        </span>
        <span className="q-pair-target">
          {word.gender && (
            <span className="q-pair-article">
              <span className="q-gender" data-g={word.gender} aria-hidden="true" />
              {word.gender}
            </span>
          )}
          <ShiftedWord english={word.english_cognate} target={word.target_word} rule={word.shift_rule} lang={languageId} />
        </span>
        {plural && <span className="q-pair-meta">plural {plural}</span>}
      </button>
      <button
        type="button"
        className="q-icon-btn"
        onClick={() => playTargetAudio(spokenWordEntity(word, languageId), getLanguageDefinition(languageId).ttsLocale)}
        aria-label={`Listen to ${word.target_word}`}
      >
        <Volume2 />
      </button>
    </div>
  );
}

export function P3Table({ session }: { session: LessonSession }) {
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
    <div ref={ref} className="q-wrap q-seg">
      <div className="q-table-head q-grid">
        <div style={{ gridColumn: "1 / span 7" }}>
          <h2 className="q-head q-reveal">{isReading ? "Words for the story" : "The words"}</h2>
          <p className="q-body q-reveal" style={{ ["--i" as string]: 1, marginTop: 16 }}>
            {isReading
              ? "Keep these handy while you read. Tap one for its details."
              : "These are the words this lesson practises. The marked letters are the ones that changed from English. Tap a word for its details."}
          </p>
        </div>
        {genderSystem && (
          <ul className="q-legend q-reveal" aria-label="Article colours" style={{ ["--i" as string]: 2 }}>
            {genderSystem.articles.map((article, index) => (
              <li key={article}>
                <span className="q-gender" data-g={article} aria-hidden="true" />
                <span className="q-strong">{article}</span> {genderSystem.labels[index]}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="q-pairs" data-testid={isReading ? "story-word-bank" : "lesson-focus-words"}>
        {words(listIds).map((word) => (
          <WordRow key={word.id} word={word} languageId={activeLanguageId} />
        ))}
      </div>

      {!isReading && extraIds.length > 0 && (
        <details
          className="q-details q-note"
          style={{ marginTop: 32 }}
          data-testid="lesson-extra-words"
          onToggle={(event) => {
            if (event.currentTarget.open) markExtrasExplored();
          }}
        >
          <summary>More words to explore ({extraIds.length}) — optional</summary>
          <div className="q-pairs" style={{ paddingTop: 8 }}>
            {words(extraIds).map((word) => (
              <WordRow key={word.id} word={word} languageId={activeLanguageId} />
            ))}
          </div>
        </details>
      )}

      <div className="q-grid" style={{ marginTop: 32, rowGap: 16 }}>
        {soundImports.length > 0 && (
          <div className="q-note" data-tone="sun" style={{ gridColumn: "1 / span 6" }}>
            <p className="q-note-title">Sounds you already make</p>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {soundImports.map((imp) => (
                <li key={imp.grapheme} className="q-body">
                  <span className="q-strong">{imp.grapheme}</span> {importLineFor(imp)}
                </li>
              ))}
            </ul>
          </div>
        )}
        {primaryShift && (
          <div className="q-note" style={{ gridColumn: soundImports.length ? "7 / span 6" : "1 / span 6" }}>
            <p className="q-note-title">The whole family</p>
            <p className="q-body">
              {primaryShift.word_ids.length} words follow {primaryShift.symbol}. See them all in the sound atlas.
            </p>
            <Link href={`/atlas?family=${encodeURIComponent(primaryShift.id)}&lang=${activeLanguageId}`} className="q-btn q-btn--ghost" style={{ paddingInline: 0 }}>
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

export function P3Summary({ session }: { session: LessonSession }) {
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
    <div ref={ref} className="q-summary q-field">
      <div className="q-wrap q-grid q-summary-grid">
        <div className="q-summary-main">
          <div className="q-summary-title q-reveal">
            <h2 className="q-display">{preview ? "Preview done." : "Done."}</h2>
            {star && (
              <span className={celebrate ? "q-pop" : undefined} style={{ display: "inline-flex" }}>
                <StarMark star={star} size={88} title={star === "purple" ? "Purple star: every answer right first time" : "Gold star: lesson complete"} />
              </span>
            )}
          </div>
          <p className="q-lead q-reveal" style={{ ["--i" as string]: 1 }}>
            {preview
              ? "This lesson is ahead of your trail, so it isn’t marked complete yet."
              : star === "purple"
                ? "Purple star — every answer right the first time."
                : isLessonFinished
                  ? "Gold star. The ones you missed are now in your review deck."
                  : lesson.summary.outcome}
          </p>
          <div className="q-stepnav q-reveal" style={{ ["--i" as string]: 2 }}>
            {!preview && (
              <a
                href={nextLessonId ? expLessonHref(activeLanguageId, nextLessonId, EXP3_ROOT) : EXP3_ROOT}
                className="q-btn q-btn--go"
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
              <button type="button" className="q-btn" onClick={handleCompleteAll} disabled={!completedSegments.includes("practice")}>
                Mark as finished
              </button>
            )}
            <Link href={`${EXP3_ROOT}/review`} className="q-btn q-btn--ghost">
              Review these words
            </Link>
          </div>
        </div>

        <div className="q-summary-side">
          <div className="q-reveal" style={{ ["--i" as string]: 2 }}>
            <p className="q-small q-strong">You can now</p>
            <p className="q-lead-strong">{lesson.summary.outcome}</p>
          </div>
          {lesson.summary.use_example.german && (
            <figure className="q-reveal" style={{ ["--i" as string]: 3, margin: 0 }}>
              <blockquote className="q-lead-strong" lang={activeLanguageId} style={{ margin: 0, display: "flex", gap: 12, alignItems: "center" }}>
                {lesson.summary.use_example.german}
                <button
                  type="button"
                  className="q-icon-btn"
                  onClick={() => playTargetAudio(lesson.summary.use_example.german, getLanguageDefinition(activeLanguageId).ttsLocale)}
                  aria-label="Listen to the sentence"
                >
                  <Volume2 />
                </button>
              </blockquote>
              <figcaption className="q-body">{lesson.summary.use_example.english}</figcaption>
            </figure>
          )}
          <div className="q-reveal" style={{ ["--i" as string]: 4 }}>
            <p className="q-small q-strong">Keep in mind</p>
            <p className="q-body">{lesson.summary.takeaway}</p>
          </div>
          {lesson.summary.curiosity_teaser && (
            <div className="q-reveal" style={{ ["--i" as string]: 5 }}>
              <p className="q-small q-strong">Coming up</p>
              <p className="q-body">{lesson.summary.curiosity_teaser}</p>
            </div>
          )}
        </div>
      </div>

      {twistMeetAgain && lesson.twist && !twistResurfaced && (
        <div className="q-wrap" style={{ paddingBottom: 48 }}>
          <button type="button" className="q-btn q-btn--paper" onClick={handleResurfaceTwist}>
            Try the twist once more
          </button>
        </div>
      )}
      {twistResurfaced && lesson.twist && (
        <div style={{ paddingBottom: 48 }}>
          <P3Twist twist={lesson.twist} onDone={() => setTwistResurfaced(false)} />
        </div>
      )}
    </div>
  );
}
