"use client";

import { GermanTrailMap } from "@/components/trail/GermanTrailMap";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Check, Lock } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useCurriculum } from "@/data/curriculum-client";
import { getLanguageDefinition } from "@/data/languages";
import { useCourseRecommendation } from "@/lib/use-course-recommendation";
import { useAppNavigation, isModifiedClick } from "@/lib/app-navigation";
import { prefetchLesson, useLessonIndex } from "@/lib/content-client";
import { getLessonExerciseCount } from "@/lib/lesson-effort";
import { isChunkLoadError } from "@/lib/chunk-errors";
import { expLessonHref, EXP2_ROOT } from "@/lib/exp-routes";
import type { LessonIndexEntry, LessonShell, TopicCluster, TrailBranch, TrailGate } from "@/lib/types";
import type { NodeView, GateView } from "@/lib/trail-map";
import { P2Bar, ArchMark, useDueCount } from "./P2Chrome";
import { ArrowRightIcon, minutesLabel, ShiftedWord, StarMark, useReveal } from "./p2-kit";

const P2Checkpoint = dynamic(() => import("./P2Checkpoint").then((m) => m.P2Checkpoint), { ssr: false });

type RowKind = "core" | "story" | "sprig" | "branch";
interface Row {
  shell: LessonShell;
  kind: RowKind;
  required: boolean;
}

function kindLabel(row: Row): string {
  if (row.kind === "core") return "Main lesson";
  if (row.kind === "story") return "Reading story";
  if (row.kind === "sprig") return row.required ? "Required practice" : "Extra practice";
  return row.required ? "Required grammar" : "Side path";
}

/** The spine of a topic (core, then stories) and the branches hanging off it. */
function topicRows(topic: TopicCluster, branches: TrailBranch[]): { spine: Row[]; side: Row[] } {
  const spine: Row[] = [{ shell: topic.core, kind: "core", required: true }];
  const side: Row[] = topic.sprigs.map((s) => ({ shell: s, kind: "sprig" as const, required: Boolean(s.required) }));
  const owners = new Set([topic.core.id, ...topic.sprigs.map((s) => s.id)]);
  for (const branch of branches) {
    if (!owners.has(branch.attach)) continue;
    for (const lesson of branch.lessons) side.push({ shell: lesson, kind: "branch", required: Boolean(branch.required) });
  }
  for (const story of topic.stories ?? []) spine.push({ shell: story, kind: "story", required: true });
  return { spine, side };
}

export function P2Home() {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const completedLessons = useAppStore((s) => s.completedLessons);
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const storeHydrated = useAppStore((s) => s.storeHydrated);
  const logDailyActivity = useAppStore((s) => s.logDailyActivity);
  const language = getLanguageDefinition(activeLanguageId);
  const { curriculum, ready, error, retry } = useCurriculum(activeLanguageId);
  const { state, nextLesson } = useCourseRecommendation(activeLanguageId);
  const lessonIndex = useLessonIndex(activeLanguageId);
  const due = useDueCount();
  const [gateId, setGateId] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const heroAction = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(true);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    logDailyActivity();
  }, [logDailyActivity]);

  useEffect(() => {
    const el = heroAction.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [ready]);

  const indexById = useMemo(() => {
    const map = new Map<number, LessonIndexEntry>();
    for (const entry of lessonIndex.data ?? []) map.set(entry.id, entry);
    return map;
  }, [lessonIndex.data]);

  const firstVisit = !mounted
    ? true
    : storeHydrated
      ? completedLessons.length === 0 && Object.keys(lessonProgress).length === 0
      : document.documentElement.getAttribute("data-returning") !== "true";

  const nextTopic = useMemo(() => {
    if (!nextLesson) return null;
    return (
      curriculum.topics.find((topic) => {
        const { spine, side } = topicRows(topic, curriculum.trailBranches);
        return [...spine, ...side].some((row) => row.shell.id === nextLesson.id);
      }) ?? null
    );
  }, [nextLesson, curriculum]);

  if (language.status !== "available" || !ready) {
    return (
      <>
        <P2Bar />
        <section className="p-wrap p-blank" role={error ? "alert" : "status"}>
          <h1 className="p-head">
            {language.status !== "available"
              ? `The ${language.name} course is still being written.`
              : error
                ? "The course didn’t load."
                : "Loading your path…"}
          </h1>
          {error && (
            <button type="button" className="p-btn" onClick={() => (isChunkLoadError(error) ? window.location.reload() : retry())}>
              Try again
            </button>
          )}
        </section>
      </>
    );
  }
  if (activeLanguageId === "de") {
    return <><P2Bar /><div className="mx-auto max-w-5xl px-4"><GermanTrailMap /></div></>;
  }


  const authoredTotal = curriculum.lessonCount;
  const done = completedLessons.length;
  const gatesAfter = new Map<number, TrailGate>();
  for (const gate of curriculum.trailGates) gatesAfter.set(gate.afterTopic, gate);
  const selectedGate = gateId !== null ? curriculum.trailGates.find((g) => g.id === gateId) ?? null : null;
  const nextEntry = nextLesson ? indexById.get(nextLesson.id) : undefined;

  return (
    <>
      <P2Bar />
      <P2Hero
        firstVisit={firstVisit}
        languageName={language.name}
        demos={language.onboarding.philosophy.demos.slice(0, 3)}
        nextLesson={nextLesson}
        nextEntry={nextEntry}
        nextTopic={nextTopic}
        done={done}
        total={authoredTotal}
        due={due}
        actionRef={heroAction}
      />
      <HowItWorks />

      <section className="p-trail" id="path" aria-labelledby="p-trail-title">
        <div className="p-wrap">
          <h2 id="p-trail-title" className="p-head p-trail-title">
            The path
          </h2>
          <p className="p-body p-trail-intro">
            One main lesson after another, top to bottom. Side lessons branch off when you want extra practice — the main path
            never waits for them.
          </p>
        </div>
        {curriculum.topics.map((topic) => (
          <React.Fragment key={topic.id}>
            <TopicStretch
              topic={topic}
              rows={topicRows(topic, curriculum.trailBranches)}
              nodes={state.nodes}
              recommendedId={state.recommendedId}
              indexById={indexById}
            />
            {gatesAfter.has(topic.id) && (
              <GateStop
                gate={gatesAfter.get(topic.id)!}
                view={state.gates.get(gatesAfter.get(topic.id)!.id)}
                onOpen={() => setGateId(gatesAfter.get(topic.id)!.id)}
              />
            )}
          </React.Fragment>
        ))}
        <div className="p-wrap p-trail-end">
          <div className="p-rail-cap" aria-hidden="true" />
          <p className="p-lead">The end of the path — and the start of reading real German.</p>
        </div>
      </section>

      <P2Footer />

      {nextLesson && (
        <NextBar
          visible={!heroVisible}
          lesson={nextLesson}
          entry={nextEntry}
          languageId={activeLanguageId}
          firstVisit={firstVisit}
        />
      )}

      {selectedGate && state.gates.get(selectedGate.id) && (
        <P2Checkpoint
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

/* ------------------------------------------------------------------ hero */

function P2Hero({
  firstVisit,
  languageName,
  demos,
  nextLesson,
  nextEntry,
  nextTopic,
  done,
  total,
  due,
  actionRef,
}: {
  firstVisit: boolean;
  languageName: string;
  demos: { english: string; target: string; rule: string }[];
  nextLesson: LessonShell | null;
  nextEntry?: LessonIndexEntry;
  nextTopic: TopicCluster | null;
  done: number;
  total: number;
  due: number;
  actionRef: React.RefObject<HTMLDivElement | null>;
}) {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const { openLesson } = useAppNavigation();
  const ref = useReveal<HTMLElement>([firstVisit, nextLesson?.id]);
  const exercises = nextLesson ? getLessonExerciseCount(activeLanguageId, nextLesson.id) : undefined;
  const minutes = minutesLabel(exercises);
  const pct = total ? Math.round((done / total) * 100) : 0;

  return (
    <section ref={ref} className="p-hero" aria-labelledby="p-hero-title">
      <div className="p-hero-arch" aria-hidden="true">
        <div className="p-hero-arch-inner">
          {demos.map((demo) => (
            <p key={demo.english} className="p-hero-pair">
              <span className="p-hero-pair-en">{demo.english}</span>
              <ShiftedWord english={demo.english} target={demo.target} rule={demo.rule} lang={activeLanguageId} />
            </p>
          ))}
        </div>
      </div>
      <div className="p-wrap p-hero-copy">
        {firstVisit ? (
          <>
            <h1 id="p-hero-title" className="p-display p-reveal">
              You already know some {languageName}.
            </h1>
            <p className="p-lead p-reveal" style={{ ["--i" as string]: 1 }}>
              Brücke walks you from the English words you know to the {languageName} you can use — one short lesson at a time.
            </p>
          </>
        ) : (
          <>
            <h1 id="p-hero-title" className="p-display p-reveal">
              Your next step
            </h1>
            <p className="p-lead p-reveal" style={{ ["--i" as string]: 1 }}>
              {done} of {total} lessons done ({pct}%).{due ? ` ${due} words are ready to review.` : ""}
            </p>
          </>
        )}

        {nextLesson ? (
          <div className="p-next p-reveal" style={{ ["--i" as string]: 2 }} ref={actionRef}>
            <p className="p-small p-strong">
              {nextTopic ? `Topic ${nextTopic.id} · ${nextTopic.title}` : "Next"}
              {minutes ? ` · ${minutes}` : ""}
            </p>
            <h2 className="p-head p-next-title">{nextLesson.title}</h2>
            {nextEntry?.subtitle && <p className="p-body">{nextEntry.subtitle}</p>}
            <div className="p-next-actions">
              <a
                href={expLessonHref(activeLanguageId, nextLesson.id, EXP2_ROOT)}
                className="p-btn p-btn--go p-btn--big"
                data-next-lesson-start
                onPointerEnter={() => prefetchLesson(activeLanguageId, nextLesson.id)}
                onFocus={() => prefetchLesson(activeLanguageId, nextLesson.id)}
                onClick={(event) => {
                  if (isModifiedClick(event)) return;
                  event.preventDefault();
                  openLesson(activeLanguageId, nextLesson.id);
                }}
              >
                {firstVisit ? "Start lesson 1" : "Start this lesson"}
                <ArrowRightIcon />
              </a>
              {due > 0 && !firstVisit && (
                <Link href={`${EXP2_ROOT}/review`} className="p-btn p-btn--ghost">
                  Review {due} words first
                </Link>
              )}
              <a href={`#lesson-${nextLesson.id}`} className="p-btn p-btn--ghost">
                See it on the path
              </a>
            </div>
          </div>
        ) : (
          <div className="p-next" ref={actionRef}>
            <h2 className="p-head">You’ve walked the whole path.</h2>
            <p className="p-body">Keep it fresh in Review, or replay any lesson below.</p>
          </div>
        )}
      </div>
    </section>
  );
}

/* --------------------------------------------------------- how it works */

function HowItWorks() {
  const ref = useReveal<HTMLElement>();
  const steps = [
    { title: "Read the idea", text: "A short intro and the one pattern this lesson teaches." },
    { title: "Meet the words", text: "The words you’ll use, with the English you already know." },
    { title: "Practise five", text: "Five short exercises. Misses come back once before you finish." },
    { title: "The next one opens", text: "Finished? Your next lesson is waiting at the top of this page." },
  ];
  return (
    <section ref={ref} className="p-how" aria-labelledby="p-how-title">
      <div className="p-wrap p-grid">
        <h2 id="p-how-title" className="p-head p-how-title p-reveal">
          One lesson, four steps, then the next.
        </h2>
        <ol className="p-how-steps">
          {steps.map((step, index) => (
            <li key={step.title} className="p-reveal" style={{ ["--i" as string]: index + 1 }}>
              <span className="p-how-arch" aria-hidden="true" data-n={index + 1} />
              <h3 className="p-lead p-strong">{step.title}</h3>
              <p className="p-body">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- trail */

function Stop({
  row,
  view,
  entry,
  recommended,
  side,
}: {
  row: Row;
  view?: NodeView;
  entry?: LessonIndexEntry;
  recommended: boolean;
  side?: boolean;
}) {
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const { openLesson } = useAppNavigation();
  const id = row.shell.id;
  const authored = row.shell.authored !== false && Boolean(entry);
  const status = authored ? view?.status ?? "locked" : "unwritten";
  const minutes = minutesLabel(getLessonExerciseCount(activeLanguageId, id));
  const label = `${row.shell.title}, ${kindLabel(row)}, ${
    status === "completed" ? "done" : status === "available" ? (recommended ? "your next step" : "open") : status === "locked" ? "not open yet — preview" : "coming later"
  }`;

  const node = (
    <span className="p-node" data-status={status} data-now={recommended || undefined} aria-hidden="true">
      {status === "completed" ? <Check strokeWidth={3} /> : status === "locked" ? <Lock strokeWidth={2.5} /> : null}
    </span>
  );
  const text = (
    <span className="p-stop-text">
      <span className="p-stop-title">{row.shell.title}</span>
      <span className="p-stop-meta p-small">
        {kindLabel(row)}
        {minutes ? ` · ${minutes}` : ""}
        {status === "locked" ? " · opens later" : ""}
      </span>
      {recommended && entry?.subtitle && <span className="p-body p-stop-sub">{entry.subtitle}</span>}
    </span>
  );
  const end = (
    <span className="p-stop-end">
      {view?.star && <StarMark star={view.star} size={22} />}
      {recommended && status === "available" && <span className="p-stop-go">Start</span>}
    </span>
  );

  return (
    <li id={`lesson-${id}`} className={`p-stop ${side ? "p-stop--side" : "p-stop--spine"}`} data-status={status} data-now={recommended || undefined}>
      {authored ? (
        <a
          href={expLessonHref(activeLanguageId, id, EXP2_ROOT)}
          className="p-stop-link"
          aria-label={label}
          onPointerEnter={() => prefetchLesson(activeLanguageId, id)}
          onFocus={() => prefetchLesson(activeLanguageId, id)}
          onClick={(event) => {
            if (isModifiedClick(event)) return;
            event.preventDefault();
            openLesson(activeLanguageId, id);
          }}
        >
          {node}
          {text}
          {end}
        </a>
      ) : (
        <div className="p-stop-link" aria-label={label}>
          {node}
          {text}
        </div>
      )}
    </li>
  );
}

function TopicStretch({
  topic,
  rows,
  nodes,
  recommendedId,
  indexById,
}: {
  topic: TopicCluster;
  rows: { spine: Row[]; side: Row[] };
  nodes: Map<number, NodeView>;
  recommendedId: number | null;
  indexById: Map<number, LessonIndexEntry>;
}) {
  const ref = useReveal<HTMLElement>([indexById.size]);
  const all = [...rows.spine, ...rows.side].filter((r) => indexById.has(r.shell.id));
  const doneCount = all.filter((r) => nodes.get(r.shell.id)?.status === "completed").length;
  const coreDone = nodes.get(topic.core.id)?.status === "completed";
  const coreLocked = nodes.get(topic.core.id)?.status === "locked";
  const [core, ...stories] = rows.spine;

  return (
    <section
      ref={ref}
      className="p-stretch"
      data-state={coreDone ? "done" : coreLocked ? "ahead" : "now"}
      aria-labelledby={`p-topic-${topic.id}`}
    >
      <div className="p-wrap p-grid">
        <header className="p-stretch-head p-reveal">
          <p className="p-stretch-num" aria-hidden="true">
            {topic.id}
          </p>
          <div>
            <h3 id={`p-topic-${topic.id}`} className="p-lead p-strong">
              <span className="sr-only">Topic {topic.id}: </span>
              {topic.title}
            </h3>
            <p className="p-body">{topic.blurb}</p>
            <p className="p-small p-strong p-stretch-count">
              {doneCount} of {all.length} done
            </p>
          </div>
        </header>
        <div className="p-stretch-rail">
          <ol className="p-stops">
            <Stop row={core} view={nodes.get(core.shell.id)} entry={indexById.get(core.shell.id)} recommended={core.shell.id === recommendedId} />
          </ol>
          {rows.side.length > 0 && (
            <ol className="p-branch" aria-label={`Side lessons for ${topic.title}`}>
              {rows.side.map((row) => (
                <Stop
                  key={row.shell.id}
                  row={row}
                  side
                  view={nodes.get(row.shell.id)}
                  entry={indexById.get(row.shell.id)}
                  recommended={row.shell.id === recommendedId}
                />
              ))}
            </ol>
          )}
          {stories.length > 0 && (
            <ol className="p-stops">
              {stories.map((row) => (
                <Stop key={row.shell.id} row={row} view={nodes.get(row.shell.id)} entry={indexById.get(row.shell.id)} recommended={row.shell.id === recommendedId} />
              ))}
            </ol>
          )}
        </div>
      </div>
    </section>
  );
}

function GateStop({ gate, view, onOpen }: { gate: TrailGate; view?: GateView; onOpen: () => void }) {
  const open = Boolean(view?.open);
  return (
    <section className="p-gate" data-open={open || undefined} aria-labelledby={`p-gate-${gate.id}`}>
      <div className="p-wrap p-grid">
        <div className="p-gate-rail">
          <span className="p-gate-arch" aria-hidden="true">
            {open ? <Check strokeWidth={3} /> : <Lock strokeWidth={2.5} />}
          </span>
          <div>
            <h3 id={`p-gate-${gate.id}`} className="p-lead p-strong">
              Checkpoint: {gate.title.replace(/^The /, "")}
            </h3>
            <p className="p-body">
              {open
                ? "Passed. The next stretch is open."
                : view?.passed
                  ? "Passed. Finish the main lessons above to open the next stretch."
                  : `A short quiz on topics ${view?.fromTopic ?? ""}–${view?.toTopic ?? ""} opens the next stretch.`}
            </p>
          </div>
          <button type="button" className="p-btn p-btn--small" onClick={onOpen}>
            {view?.passed ? "See it" : "Open"}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ next bar */

function NextBar({
  visible,
  lesson,
  entry,
  languageId,
  firstVisit,
}: {
  visible: boolean;
  lesson: LessonShell;
  entry?: LessonIndexEntry;
  languageId: string;
  firstVisit: boolean;
}) {
  const { openLesson } = useAppNavigation();
  return (
    <div className="p-nextbar" data-visible={visible || undefined} aria-hidden={!visible} inert={!visible}>
      <div className="p-nextbar-inner">
        <span className="p-nextbar-arch" aria-hidden="true" />
        <p className="p-nextbar-text">
          <span className="p-small p-strong">Your next step</span>
          <span className="p-nextbar-title">{lesson.title}</span>
          {entry?.subtitle && <span className="p-small p-nextbar-sub">{entry.subtitle}</span>}
        </p>
        <a
          href={expLessonHref(languageId, lesson.id, EXP2_ROOT)}
          className="p-btn p-btn--go"
          onClick={(event) => {
            if (isModifiedClick(event)) return;
            event.preventDefault();
            openLesson(languageId, lesson.id);
          }}
        >
          {firstVisit ? "Start" : "Continue"}
          <ArrowRightIcon />
        </a>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- footer */

export function P2Footer() {
  return (
    <footer className="p-footer">
      <div className="p-wrap">
        <div className="p-footer-links">
          <p className="p-body">Progress stays in this browser. No account, no tracking.</p>
          <nav aria-label="More" className="p-footer-nav">
            <Link href="/">Classic interface</Link>
            <Link href="/exp-ui">Colour chapters UI</Link>
            <Link href="/atlas">Sound atlas</Link>
            <Link href="/panorama">Grammar map</Link>
            <Link href="/settings">Backup &amp; data</Link>
          </nav>
        </div>
        <p className="p-footer-mark" aria-hidden="true">
          <ArchMark />
          Brücke
        </p>
      </div>
    </footer>
  );
}
