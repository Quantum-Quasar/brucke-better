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
import { expLessonHref, EXP4_ROOT } from "@/lib/exp-routes";
import type { Footnote, WordEntity } from "@/lib/types";
import { ArrowRightIcon, ShiftedWord, StarMark, useReveal } from "../p4-kit";
import { P4Twist } from "./P4Practice";

/* ------------------------------------------------------------- shared */

function Footnotes({ notes }: { notes: Footnote[] }) {
  if (!notes.length) return null;
  return (
    <details className="m-details m-note">
      <summary>Background, if you’re curious</summary>
      <div style={{ display: "grid", gap: 16, paddingTop: 8 }}>
        {notes.map((fn) => (
          <div key={fn.marker}>
            <p className="m-strong">{fn.title}</p>
            <p className="m-body">{fn.content}</p>
            {fn.interest && <p className="m-small m-muted">Just for interest — not tested.</p>}
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
    <div className="m-stepnav">
      <button type="button" className="m-btn m-btn--go" onClick={next.run}>
        {next.label}
        <ArrowRightIcon />
      </button>
      {back && (
        <button type="button" className="m-btn m-btn--ghost" onClick={back.run}>
          {back.label}
        </button>
      )}
      {next.hint && <span className="m-small m-muted m-stepnav-hint">{next.hint}</span>}
    </div>
  );
}

function Paragraphs({ text, className = "m-body" }: { text: string; className?: string }) {
  const parts = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  return (
    <>
      {parts.map((part, index) => (
        <p key={index} className={`${className} m-prewrap m-reveal`} style={{ ["--i" as string]: index + 1 }}>
          {part}
        </p>
      ))}
    </>
  );
}

/* --------------------------------------------------------------- hook */

export function P4Hook({ session }: { session: LessonSession }) {
  const { lesson, isReading, markSegmentDone } = session;
  const ref = useReveal<HTMLDivElement>([lesson.id]);
  return (
    <div ref={ref} className="m-wrap m-grid m-seg">
      <div className="m-seg-main">
        <h2 className="m-head m-reveal">{lesson.hook.title}</h2>
        <Paragraphs text={lesson.hook.content} />
        {lesson.hook.trap_note && (
          <div className="m-note m-reveal" data-tone="warn">
            <p className="m-note-title">Watch out</p>
            <p className="m-body">{lesson.hook.trap_note}</p>
          </div>
        )}
        {lesson.payoff && (
          <div className="m-note m-reveal" data-tone="good">
            <p className="m-note-title">Remember this one?</p>
            <p className="m-body">{lesson.payoff.text}</p>
          </div>
        )}
        {lesson.foreshadow && <p className="m-body m-strong m-reveal">{lesson.foreshadow.line}</p>}
        <StepNav
          next={{
            label: isReading ? "Read the story" : "See the pattern",
            run: () => markSegmentDone("hook", "pattern"),
            hint: "or press Enter",
          }}
        />
      </div>
      <aside className="m-seg-side">
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

export function P4Pattern({ session }: { session: LessonSession }) {
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
      <div ref={ref} className="m-wrap m-grid m-seg">
        <form className="m-seg-main" onSubmit={submit}>
          <h2 className="m-head m-reveal">Guess first.</h2>
          <p className="m-lead m-reveal" style={{ ["--i" as string]: 1 }}>
            {warmup.prompt}
          </p>
          <p className="m-body m-reveal" style={{ ["--i" as string]: 2 }}>
            {warmup.hint} No score — it just tunes your ear before the rule.
          </p>
          <input
            className="m-input m-reveal"
            style={{ ["--i" as string]: 3, background: "var(--m-soft)" }}
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
          <div className="m-stepnav">
            <button type="submit" className="m-btn m-btn--go m-keep">
              Show me the pattern <ArrowRightIcon />
            </button>
            <button type="button" className="m-btn m-btn--ghost" onClick={() => setResolved(true)}>
              Skip the guess
            </button>
            <button type="button" className="m-btn m-btn--ghost" onClick={() => setCurrentSegment("hook")}>
              Back
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div ref={ref} className="m-wrap m-grid m-seg">
      <div className="m-seg-main">
        {result && warmup && (
          <div className="m-note m-reveal" data-tone={result.matched ? "good" : "sun"} role="status">
            <p className="m-note-title">
              {result.matched ? `Spot on — ${warmup.expected}.` : `You guessed “${result.value}”. German says ${warmup.expected}.`}
            </p>
            <p className="m-body">Here’s the pattern behind it.</p>
          </div>
        )}
        <h2 className="m-head m-reveal">{lesson.pattern.title}</h2>
        <Paragraphs text={lesson.pattern.content} />
        {lesson.pattern.trap_note && (
          <div className="m-note m-reveal" data-tone="warn">
            <p className="m-note-title">Watch out</p>
            <p className="m-body">{lesson.pattern.trap_note}</p>
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
      <aside className="m-seg-side">
        {panoramaRef && (
          <div className="m-note">
            <p className="m-note-title">Grammar map</p>
            <p className="m-body">{panoramaRef.desc}</p>
            <Link href="/panorama" className="m-btn m-btn--ghost" style={{ paddingInline: 0 }}>
              Open the grammar map
            </Link>
          </div>
        )}
        {lesson.pattern.linguist_note && (
          <details className="m-details m-note">
            <summary>Background, if you’re curious</summary>
            <p className="m-body" style={{ paddingTop: 8 }}>
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
    <div className="m-pair m-reveal">
      <button type="button" className="m-pair-open" onClick={() => openWordDrawer(word.id)} aria-label={`${word.target_word}: details`}>
        <span className="m-pair-en">
          {word.english_cognate}
          {word.english_meaning && word.english_meaning.toLowerCase() !== word.english_cognate.toLowerCase() ? ` · “${word.english_meaning}”` : ""}
        </span>
        <span className="m-pair-target">
          {word.gender && (
            <span className="m-pair-article">
              <span className="m-gender" data-g={word.gender} aria-hidden="true" />
              {word.gender}
            </span>
          )}
          <ShiftedWord english={word.english_cognate} target={word.target_word} rule={word.shift_rule} lang={languageId} />
        </span>
        {plural && <span className="m-pair-meta">plural {plural}</span>}
      </button>
      <button
        type="button"
        className="m-icon-btn"
        onClick={() => playTargetAudio(spokenWordEntity(word, languageId), getLanguageDefinition(languageId).ttsLocale)}
        aria-label={`Listen to ${word.target_word}`}
      >
        <Volume2 />
      </button>
    </div>
  );
}

export function P4Table({ session }: { session: LessonSession }) {
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
    <div ref={ref} className="m-wrap m-seg">
      <div className="m-table-head m-grid">
        <div style={{ gridColumn: "1 / span 7" }}>
          <h2 className="m-head m-reveal">{isReading ? "Words for the story" : "The words"}</h2>
          <p className="m-body m-reveal" style={{ ["--i" as string]: 1, marginTop: 16 }}>
            {isReading
              ? "Keep these handy while you read. Tap one for its details."
              : "These are the words this lesson practises. The marked letters are the ones that changed from English. Tap a word for its details."}
          </p>
        </div>
        {genderSystem && (
          <ul className="m-legend m-reveal" aria-label="Article colours" style={{ ["--i" as string]: 2 }}>
            {genderSystem.articles.map((article, index) => (
              <li key={article}>
                <span className="m-gender" data-g={article} aria-hidden="true" />
                <span className="m-strong">{article}</span> {genderSystem.labels[index]}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="m-pairs" data-testid={isReading ? "story-word-bank" : "lesson-focus-words"}>
        {words(listIds).map((word) => (
          <WordRow key={word.id} word={word} languageId={activeLanguageId} />
        ))}
      </div>

      {!isReading && extraIds.length > 0 && (
        <details
          className="m-details m-note"
          style={{ marginTop: 32 }}
          data-testid="lesson-extra-words"
          onToggle={(event) => {
            if (event.currentTarget.open) markExtrasExplored();
          }}
        >
          <summary>More words to explore ({extraIds.length}) — optional</summary>
          <div className="m-pairs" style={{ paddingTop: 8 }}>
            {words(extraIds).map((word) => (
              <WordRow key={word.id} word={word} languageId={activeLanguageId} />
            ))}
          </div>
        </details>
      )}

      <div className="m-grid" style={{ marginTop: 32, rowGap: 16 }}>
        {soundImports.length > 0 && (
          <div className="m-note" data-tone="sun" style={{ gridColumn: "1 / span 6" }}>
            <p className="m-note-title">Sounds you already make</p>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {soundImports.map((imp) => (
                <li key={imp.grapheme} className="m-body">
                  <span className="m-strong">{imp.grapheme}</span> {importLineFor(imp)}
                </li>
              ))}
            </ul>
          </div>
        )}
        {primaryShift && (
          <div className="m-note" style={{ gridColumn: soundImports.length ? "7 / span 6" : "1 / span 6" }}>
            <p className="m-note-title">The whole family</p>
            <p className="m-body">
              {primaryShift.word_ids.length} words follow {primaryShift.symbol}. See them all in the sound atlas.
            </p>
            <Link href={`/atlas?family=${encodeURIComponent(primaryShift.id)}&lang=${activeLanguageId}`} className="m-btn m-btn--ghost" style={{ paddingInline: 0 }}>
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

export function P4Summary({ session }: { session: LessonSession }) {
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
    <div ref={ref} className="m-summary m-field">
      <div className="m-wrap m-grid m-summary-grid">
        <div className="m-summary-main">
          <div className="m-summary-title m-reveal">
            <h2 className="m-display">{preview ? "Preview done." : "Done."}</h2>
            {star && (
              <span className={celebrate ? "m-pop" : undefined} style={{ display: "inline-flex" }}>
                <StarMark star={star} size={88} title={star === "purple" ? "Purple star: every answer right first time" : "Gold star: lesson complete"} />
              </span>
            )}
          </div>
          <p className="m-lead m-reveal" style={{ ["--i" as string]: 1 }}>
            {preview
              ? "This lesson is ahead of your trail, so it isn’t marked complete yet."
              : star === "purple"
                ? "Purple star — every answer right the first time."
                : isLessonFinished
                  ? "Gold star. The ones you missed are now in your review deck."
                  : lesson.summary.outcome}
          </p>
          <div className="m-stepnav m-reveal" style={{ ["--i" as string]: 2 }}>
            {!preview && (
              <a
                href={nextLessonId ? expLessonHref(activeLanguageId, nextLessonId, EXP4_ROOT) : EXP4_ROOT}
                className="m-btn m-btn--go"
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
              <button type="button" className="m-btn" onClick={handleCompleteAll} disabled={!completedSegments.includes("practice")}>
                Mark as finished
              </button>
            )}
            <Link href={`${EXP4_ROOT}/review`} className="m-btn m-btn--ghost">
              Review these words
            </Link>
          </div>
        </div>

        <div className="m-summary-side">
          <div className="m-reveal" style={{ ["--i" as string]: 2 }}>
            <p className="m-small m-strong">You can now</p>
            <p className="m-lead-strong">{lesson.summary.outcome}</p>
          </div>
          {lesson.summary.use_example.german && (
            <figure className="m-reveal" style={{ ["--i" as string]: 3, margin: 0 }}>
              <blockquote className="m-lead-strong" lang={activeLanguageId} style={{ margin: 0, display: "flex", gap: 12, alignItems: "center" }}>
                {lesson.summary.use_example.german}
                <button
                  type="button"
                  className="m-icon-btn"
                  onClick={() => playTargetAudio(lesson.summary.use_example.german, getLanguageDefinition(activeLanguageId).ttsLocale)}
                  aria-label="Listen to the sentence"
                >
                  <Volume2 />
                </button>
              </blockquote>
              <figcaption className="m-body">{lesson.summary.use_example.english}</figcaption>
            </figure>
          )}
          <div className="m-reveal" style={{ ["--i" as string]: 4 }}>
            <p className="m-small m-strong">Keep in mind</p>
            <p className="m-body">{lesson.summary.takeaway}</p>
          </div>
          {lesson.summary.curiosity_teaser && (
            <div className="m-reveal" style={{ ["--i" as string]: 5 }}>
              <p className="m-small m-strong">Coming up</p>
              <p className="m-body">{lesson.summary.curiosity_teaser}</p>
            </div>
          )}
        </div>
      </div>

      {twistMeetAgain && lesson.twist && !twistResurfaced && (
        <div className="m-wrap" style={{ paddingBottom: 48 }}>
          <button type="button" className="m-btn m-btn--paper" onClick={handleResurfaceTwist}>
            Try the twist once more
          </button>
        </div>
      )}
      {twistResurfaced && lesson.twist && (
        <div style={{ paddingBottom: 48 }}>
          <P4Twist twist={lesson.twist} onDone={() => setTwistResurfaced(false)} />
        </div>
      )}
    </div>
  );
}
