"use client";

import { GermanTrailMap } from "@/components/trail/GermanTrailMap";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useAppStore } from "@/lib/store";
import { useCurriculum } from "@/data/curriculum-client";
import { getLanguageDefinition } from "@/data/languages";
import { useCourseRecommendation } from "@/lib/use-course-recommendation";
import { useAppNavigation, isModifiedClick } from "@/lib/app-navigation";
import { prefetchLesson, useLessonIndex } from "@/lib/content-client";
import { getLessonExerciseCount } from "@/lib/lesson-effort";
import { isChunkLoadError } from "@/lib/chunk-errors";
import { expLessonHref, EXP_ROOT } from "@/lib/exp-routes";
import type { LessonIndexEntry, LessonShell, TopicCluster, TrailBranch, TrailGate } from "@/lib/types";
import type { NodeView } from "@/lib/trail-map";
import { ExpBar, BridgeMark, useDueCount } from "./ExpChrome";
import { ArrowRightIcon, chapterField, chapterStyle, minutesLabel, ShiftedWord, StarMark, useReveal } from "./exp-kit";

const ExpCheckpoint = dynamic(() => import("./ExpCheckpoint").then((m) => m.ExpCheckpoint), { ssr: false });

type RowKind = "core" | "story" | "sprig" | "branch";

interface ChapterRow {
  shell: LessonShell;
  kind: RowKind;
  required: boolean;
  branchTitle?: string;
}

function kindLabel(row: ChapterRow): string {
  if (row.kind === "core") return "Main lesson";
  if (row.kind === "story") return "Reading story";
  if (row.kind === "sprig") return row.required ? "Required practice" : "Extra practice";
  return row.required ? "Required grammar" : "Side path";
}

function chapterRows(topic: TopicCluster, branches: TrailBranch[]): ChapterRow[] {
  const rows: ChapterRow[] = [{ shell: topic.core, kind: "core", required: true }];
  for (const sprig of topic.sprigs) rows.push({ shell: sprig, kind: "sprig", required: Boolean(sprig.required) });
  const owners = new Set([topic.core.id, ...topic.sprigs.map((s) => s.id)]);
  for (const branch of branches) {
    if (!owners.has(branch.attach)) continue;
    for (const lesson of branch.lessons) {
      rows.push({ shell: lesson, kind: "branch", required: Boolean(branch.required), branchTitle: branch.title });
    }
  }
  for (const story of topic.stories ?? []) rows.push({ shell: story, kind: "story", required: true });
  return rows;
}

export function ExpHome() {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const completedLessons = useAppStore((s) => s.completedLessons);
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const srsCards = useAppStore((s) => s.srsCards);
  const storeHydrated = useAppStore((s) => s.storeHydrated);
  const logDailyActivity = useAppStore((s) => s.logDailyActivity);
  const language = getLanguageDefinition(activeLanguageId);
  const { curriculum, ready, error, retry } = useCurriculum(activeLanguageId);
  const { state, nextLesson } = useCourseRecommendation(activeLanguageId);
  const lessonIndex = useLessonIndex(activeLanguageId);
  const due = useDueCount();
  const [gateId, setGateId] = useState<number | null>(null);

  useEffect(() => {
    logDailyActivity();
  }, [logDailyActivity]);

  const indexById = useMemo(() => {
    const map = new Map<number, LessonIndexEntry>();
    for (const entry of lessonIndex.data ?? []) map.set(entry.id, entry);
    return map;
  }, [lessonIndex.data]);

  // Server render shows the first-visit copy; after mount, trust the store (or
  // the pre-paint hint from the root layout until the store has hydrated).
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const firstVisit = !mounted
    ? true
    : storeHydrated
      ? completedLessons.length === 0 && Object.keys(lessonProgress).length === 0
      : document.documentElement.getAttribute("data-returning") !== "true";
  const nextTopicId = useMemo(() => {
    if (!nextLesson) return 1;
    for (const topic of curriculum.topics) {
      if (chapterRows(topic, curriculum.trailBranches).some((row) => row.shell.id === nextLesson.id)) return topic.id;
    }
    return 1;
  }, [nextLesson, curriculum]);

  if (language.status !== "available") {
    return (
      <>
        <ExpBar />
        <section className="x-wrap" style={{ padding: "120px var(--x-margin)" }}>
          <h1 className="x-head">The {language.name} course is still being written.</h1>
          <p className="x-lead" style={{ marginTop: 24 }}>
            Your progress here is kept separately. Switch language in the bar above to keep learning.
          </p>
        </section>
      </>
    );
  }

  if (!ready) {
    return (
      <>
        <ExpBar />
        <section className="x-wrap" style={{ padding: "120px var(--x-margin)", minHeight: "70vh" }} role={error ? "alert" : "status"}>
          {error ? (
            <>
              <h1 className="x-head">The course didn’t load.</h1>
              <button
                type="button"
                className="x-btn"
                style={{ marginTop: 32 }}
                onClick={() => (isChunkLoadError(error) ? window.location.reload() : retry())}
              >
                {isChunkLoadError(error) ? "Reload the page" : "Try again"}
              </button>
            </>
          ) : (
            <h1 className="x-head" aria-busy="true">Loading your course…</h1>
          )}
        </section>
      </>
    );
  }
  if (activeLanguageId === "de") {
    return <><ExpBar /><div className="mx-auto max-w-5xl px-4"><GermanTrailMap /></div></>;
  }


  const inReview = Object.keys(srsCards).filter((id) => !id.startsWith("sentence_")).length;
  const gatesAfter = new Map<number, TrailGate>();
  for (const gate of curriculum.trailGates) gatesAfter.set(gate.afterTopic, gate);
  const selectedGate = gateId !== null ? curriculum.trailGates.find((gate) => gate.id === gateId) ?? null : null;

  return (
    <>
      <ExpBar />
      <ExpHero
        languageName={language.name}
        demos={language.onboarding.philosophy.demos.slice(0, 3)}
        firstVisit={firstVisit}
        nextLesson={nextLesson}
        nextTopic={curriculum.topics.find((t) => t.id === nextTopicId) ?? null}
        nextEntry={nextLesson ? indexById.get(nextLesson.id) : undefined}
        nextView={nextLesson ? state.nodes.get(nextLesson.id) : undefined}
        completed={completedLessons.length}
        lessonCount={curriculum.lessonCount}
        totalTopics={curriculum.totalTopics}
        inReview={inReview}
        due={due}
      />

      <div id="trail" aria-label="The trail">
        {curriculum.topics.map((topic) => (
          <React.Fragment key={topic.id}>
            <Chapter
              topic={topic}
              rows={chapterRows(topic, curriculum.trailBranches)}
              nodes={state.nodes}
              recommendedId={state.recommendedId}
              indexById={indexById}
              current={topic.id === nextTopicId}
            />
            {gatesAfter.has(topic.id) && (
              <GateBand
                gate={gatesAfter.get(topic.id)!}
                view={state.gates.get(gatesAfter.get(topic.id)!.id)}
                onOpen={() => setGateId(gatesAfter.get(topic.id)!.id)}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      <ExpFooter lastTopic={curriculum.totalTopics} />

      {selectedGate && state.gates.get(selectedGate.id) && (
        <ExpCheckpoint
          gate={selectedGate}
          view={state.gates.get(selectedGate.id)!}
          languageId={activeLanguageId}
          topics={curriculum.topics.filter(
            (t) => t.id >= state.gates.get(selectedGate.id)!.fromTopic && t.id <= selectedGate.afterTopic
          )}
          onClose={() => setGateId(null)}
        />
      )}
    </>
  );
}

/* --------------------------------------------------------------- hero */

interface HeroProps {
  languageName: string;
  demos: { english: string; target: string; rule: string; gender?: string | null }[];
  firstVisit: boolean;
  nextLesson: LessonShell | null;
  nextTopic: TopicCluster | null;
  nextEntry?: LessonIndexEntry;
  nextView?: NodeView;
  completed: number;
  lessonCount: number;
  totalTopics: number;
  inReview: number;
  due: number;
}

function ExpHero({
  languageName,
  demos,
  firstVisit,
  nextLesson,
  nextTopic,
  nextEntry,
  completed,
  lessonCount,
  totalTopics,
  inReview,
  due,
}: HeroProps) {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const { openLesson } = useAppNavigation();
  const ref = useReveal<HTMLElement>([firstVisit]);
  const exercises = nextLesson ? getLessonExerciseCount(activeLanguageId, nextLesson.id) : undefined;
  const minutes = minutesLabel(exercises);

  const start = (event: React.MouseEvent) => {
    if (!nextLesson || isModifiedClick(event)) return;
    event.preventDefault();
    openLesson(activeLanguageId, nextLesson.id);
  };

  return (
    <section ref={ref} className="x-hero" aria-labelledby="x-hero-title">
      <div className="x-hero-top x-wrap">
        <h1 id="x-hero-title" className="x-display x-hero-title x-reveal">
          Brücke
        </h1>
        <p className="x-lead x-hero-sub x-reveal" style={{ ["--i" as string]: 1 }}>
          {firstVisit
            ? `Learn ${languageName} through the English words you already know.`
            : `${completed} of ${lessonCount} lessons done. ${inReview} words in your review deck${due ? `, ${due} due today` : ""}.`}
        </p>
        {firstVisit && (
          <ul className="x-hero-demos x-reveal" style={{ ["--i" as string]: 2 }} aria-label="Words you already know">
            {demos.map((demo) => (
              <li key={demo.english}>
                <span className="x-muted-on-dark">{demo.english}</span>
                <span aria-hidden="true"> → </span>
                <ShiftedWord english={demo.english} target={demo.target} rule={demo.rule} lang={activeLanguageId} className="x-strong" />
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="x-folders">
        <Link href={`${EXP_ROOT}/words`} className="x-folder" style={{ ["--x-field" as string]: "#ffc4ef" }}>
          <span className="x-folder-tab" style={{ left: "6%" }}>
            Words
          </span>
        </Link>
        <Link href={`${EXP_ROOT}/review`} className="x-folder" style={{ ["--x-field" as string]: "#a4f6f8" }}>
          <span className="x-folder-tab" style={{ left: "34%" }}>
            Review{due ? ` · ${due} due` : ""}
          </span>
        </Link>
        <a href="#trail" className="x-folder" style={{ ["--x-field" as string]: "#ffffff" }}>
          <span className="x-folder-tab" style={{ left: "62%" }}>
            All {totalTopics} topics
          </span>
        </a>
        <div className="x-folder x-folder--front" style={chapterStyle(nextTopic?.id)}>
          <span className="x-folder-tab" style={{ left: "0%" }}>
            {firstVisit ? "Start here" : "Up next"}
          </span>
          {nextLesson ? (
            <div className="x-front x-grid">
              <div className="x-front-main">
                <p className="x-lead x-strong">
                  {!nextTopic
                    ? "Your trail"
                    : nextTopic.core.id === nextLesson.id
                      ? `Topic ${nextTopic.id} of ${totalTopics}`
                      : `Topic ${nextTopic.id}: ${nextTopic.title}`}
                </p>
                <h2 className="x-head x-front-title">{nextLesson.title}</h2>
                {nextEntry?.subtitle && <p className="x-lead">{nextEntry.subtitle}</p>}
                <div className="x-front-actions">
                  <a
                    href={expLessonHref(activeLanguageId, nextLesson.id)}
                    className="x-btn x-btn--go"
                    data-next-lesson-start
                    onPointerEnter={() => prefetchLesson(activeLanguageId, nextLesson.id)}
                    onFocus={() => prefetchLesson(activeLanguageId, nextLesson.id)}
                    onClick={start}
                  >
                    {firstVisit ? "Start lesson 1" : completed > 0 ? "Continue" : "Start"}
                    <ArrowRightIcon />
                  </a>
                  <span className="x-small x-strong">
                    {[minutes, exercises ? `${exercises} exercises` : null].filter(Boolean).join(" · ")}
                  </span>
                </div>
              </div>
              {nextEntry?.summary.use_example.german && (
                <figure className="x-front-example">
                  <blockquote lang={activeLanguageId} className="x-lead-strong">
                    {nextEntry.summary.use_example.german}
                  </blockquote>
                  <figcaption className="x-body">
                    By the end you can say this: “{nextEntry.summary.use_example.english}”
                  </figcaption>
                </figure>
              )}
            </div>
          ) : (
            <div className="x-front">
              <h2 className="x-head">You’ve walked the whole trail.</h2>
              <p className="x-lead" style={{ marginTop: 16 }}>
                Keep it fresh in Review, or replay any lesson below.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ chapter */

function Chapter({
  topic,
  rows,
  nodes,
  recommendedId,
  indexById,
  current,
}: {
  topic: TopicCluster;
  rows: ChapterRow[];
  nodes: Map<number, NodeView>;
  recommendedId: number | null;
  indexById: Map<number, LessonIndexEntry>;
  current: boolean;
}) {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const { openLesson } = useAppNavigation();
  const playable = rows.filter((row) => row.shell.authored !== false && indexById.has(row.shell.id));
  const doneCount = playable.filter((row) => nodes.get(row.shell.id)?.status === "completed").length;
  const defaultPreview =
    playable.find((row) => row.shell.id === recommendedId)?.shell.id ??
    playable.find((row) => nodes.get(row.shell.id)?.status === "available")?.shell.id ??
    playable[0]?.shell.id ??
    null;
  const [previewId, setPreviewId] = useState<number | null>(null);
  const shownId = previewId ?? defaultPreview;
  const preview = shownId !== null ? indexById.get(shownId) : undefined;
  const ref = useReveal<HTMLElement>([indexById.size]);
  const locked = playable.length > 0 && playable.every((row) => nodes.get(row.shell.id)?.status === "locked");

  return (
    <section
      ref={ref}
      id={`topic-${topic.id}`}
      className="x-chapter x-field"
      style={chapterStyle(topic.id)}
      aria-labelledby={`topic-${topic.id}-title`}
      data-current={current || undefined}
    >
      <div className="x-wrap x-grid x-chapter-grid">
        <div className="x-chapter-side">
          <div className="x-chapter-sticky">
            <p className="x-chapter-num x-reveal" aria-hidden="true">
              {topic.id}
            </p>
            <h2 id={`topic-${topic.id}-title`} className="x-head x-reveal" style={{ ["--i" as string]: 1 }}>
              <span className="sr-only">Topic {topic.id}: </span>
              {topic.title}
            </h2>
            <p className="x-body x-reveal" style={{ ["--i" as string]: 2, marginTop: 16 }}>
              {topic.blurb}
            </p>
            <p className="x-small x-strong x-reveal" style={{ ["--i" as string]: 3, marginTop: 12 }}>
              {locked ? "Opens after the topics before it." : `${doneCount} of ${playable.length} done`}
            </p>
            {preview && (
              <div className="x-preview" aria-live="polite" key={preview.id}>
                <p className="x-small x-strong">{preview.title}</p>
                {preview.summary.use_example.german && (
                  <p className="x-lead-strong" lang={activeLanguageId}>
                    {preview.summary.use_example.german}
                  </p>
                )}
                {preview.summary.use_example.english && <p className="x-body">{preview.summary.use_example.english}</p>}
              </div>
            )}
          </div>
        </div>

        <ol className="x-rows" onPointerLeave={() => setPreviewId(null)}>
          {rows.map((row, index) => {
            const id = row.shell.id;
            const entry = indexById.get(id);
            const view = nodes.get(id);
            const authored = row.shell.authored !== false && Boolean(entry);
            const status = authored ? view?.status ?? "locked" : "unwritten";
            const recommended = id === recommendedId;
            const exercises = getLessonExerciseCount(activeLanguageId, id);
            const minutes = minutesLabel(exercises);
            const stateText =
              status === "completed"
                ? "Done"
                : status === "available"
                  ? recommended
                    ? "Start"
                    : "Open"
                  : status === "locked"
                    ? "Preview"
                    : "Coming later";
            const content = (
              <>
                <span className="x-row-title">{row.shell.title}</span>
                <span className="x-row-meta x-small">
                  {kindLabel(row)}
                  {minutes ? ` · ${minutes}` : ""}
                  {entry?.subtitle ? <span className="x-row-sub"> · {entry.subtitle}</span> : null}
                </span>
                <span className="x-row-state">
                  {view?.star && <StarMark star={view.star} />}
                  <span className={recommended && status === "available" ? "x-row-go" : undefined}>{stateText}</span>
                </span>
              </>
            );
            return (
              <li key={id} className="x-reveal" style={{ ["--i" as string]: Math.min(index, 6) + 1 }}>
                {authored ? (
                  <a
                    href={expLessonHref(activeLanguageId, id)}
                    className="x-row"
                    data-status={status}
                    data-recommended={recommended || undefined}
                    onPointerEnter={() => {
                      setPreviewId(id);
                      prefetchLesson(activeLanguageId, id);
                    }}
                    onFocus={() => {
                      setPreviewId(id);
                      prefetchLesson(activeLanguageId, id);
                    }}
                    onClick={(event) => {
                      if (isModifiedClick(event)) return;
                      event.preventDefault();
                      openLesson(activeLanguageId, id);
                    }}
                    aria-label={`${row.shell.title}, ${kindLabel(row)}, ${stateText}${view?.star ? `, ${view.star} star` : ""}`}
                  >
                    {content}
                  </a>
                ) : (
                  <div className="x-row" data-status="unwritten">
                    {content}
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- gate */

function GateBand({ gate, view, onOpen }: { gate: TrailGate; view?: { open: boolean; passed: boolean; fromTopic: number; toTopic: number }; onOpen: () => void }) {
  const ref = useReveal<HTMLElement>();
  const status = view?.open ? "Passed — the next stretch is open." : view?.passed ? "Passed. Finish the main lessons to open it." : "Not passed yet.";
  return (
    <section ref={ref} className="x-gate" aria-labelledby={`gate-${gate.id}`}>
      <div className="x-wrap x-grid">
        <div className="x-gate-main">
          <h2 id={`gate-${gate.id}`} className="x-head x-reveal">
            Checkpoint: {gate.title.replace(/^The /, "")}
          </h2>
          <p className="x-body x-reveal" style={{ ["--i" as string]: 1, marginTop: 16 }}>
            {gate.why}
          </p>
        </div>
        <div className="x-gate-side x-reveal" style={{ ["--i" as string]: 2 }}>
          <p className="x-lead-strong">{status}</p>
          {view && (
            <p className="x-body" style={{ marginTop: 8 }}>
              One question from each main lesson in topics {view.fromTopic}–{view.toTopic}.
            </p>
          )}
          <button type="button" className="x-btn x-btn--paper" style={{ marginTop: 20 }} onClick={onOpen}>
            {view?.passed ? "See checkpoint" : "Open checkpoint"}
            <ArrowRightIcon />
          </button>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- footer */

export function ExpFooter({ lastTopic }: { lastTopic?: number }) {
  return (
    <footer className="x-footer" style={{ ["--x-field" as string]: chapterField((lastTopic ?? 0) + 1) }}>
      <div className="x-wrap">
        <div className="x-footer-links">
          <p className="x-body">
            Progress stays in this browser. No account, no tracking.
          </p>
          <nav aria-label="More" className="x-footer-nav">
            <Link href="/">Classic interface</Link>
            <Link href="/settings">Backup &amp; data</Link>
            <Link href="/atlas">Sound atlas</Link>
            <Link href="/panorama">Grammar map</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
        <p className="x-footer-mark" aria-hidden="true">
          <BridgeMark />
          Brücke
        </p>
      </div>
    </footer>
  );
}
