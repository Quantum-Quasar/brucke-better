"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { expLessonHref, EXP5_ROOT } from "@/lib/exp-routes";
import type { LessonIndexEntry, LessonShell, TopicCluster, TrailBranch, TrailGate } from "@/lib/types";
import type { NodeView, GateView } from "@/lib/trail-map";
import { BridgeMark, E5Bar, useDueCount } from "./E5Chrome";
import { E5Sheet } from "./E5WordSheet";
import { ArrowRightIcon, chapterStyle, minutesLabel, StarMark } from "./e5-kit";
import { BookOpen, Check, GitBranch, Lock, LockOpen } from "lucide-react";

const E5Checkpoint = dynamic(() => import("./E5Checkpoint").then((m) => m.E5Checkpoint), { ssr: false });

/* ----------------------------------------------------------------- model */

type Kind = "core" | "sprig" | "story" | "branch";

interface LessonStop {
  type: "lesson";
  shell: LessonShell;
  kind: Kind;
  required: boolean;
  topic: TopicCluster;
  /** what the square shows: "4", "a", "2" */
  glyph: string;
  branchTitle?: string;
}
interface GateStopModel {
  type: "gate";
  gate: TrailGate;
}
type Stop = LessonStop | GateStopModel;

interface Cell {
  r: number;
  c: number;
  w?: number;
  h?: number;
  el:
    | { t: "stop"; stop: LessonStop }
    | { t: "line"; up?: boolean; down?: boolean; left?: boolean; right?: boolean }
    | { t: "sign"; topic: TopicCluster; side: "left" | "right" };
}

const MID = 4;

/** The trail in six parts, each ending at a checkpoint. Named for what they teach. */
const REGIONS = [
  { until: 7, key: "1", title: "Sound shifts", blurb: "The regular ways English and German sounds moved apart." },
  { until: 10, key: "2", title: "Verbs and cases", blurb: "Verb endings, borrowed verbs and the first case pronouns." },
  { until: 16, key: "3", title: "Building sentences", blurb: "Articles, negation, questions and German word order." },
  { until: 20, key: "4", title: "Time and the past", blurb: "Numbers, clock time, the spoken past and the dative." },
  { until: 26, key: "5", title: "Word forms", blurb: "Compounds, gender clues, plurals and comparisons." },
  { until: Infinity, key: "6", title: "Putting it together", blurb: "Prepositions, verb families and the capstone reading." },
] as const;
type Region = (typeof REGIONS)[number];

function regionOf(topicId: number): Region {
  return REGIONS.find((r) => topicId <= r.until) ?? REGIONS[REGIONS.length - 1];
}


/** One topic as a small patch of map: the way in, the core with its side lessons around it, then the branches. */
function layoutTopic(topic: TopicCluster, branches: TrailBranch[]): { cells: Cell[]; rows: number } {
  const cells: Cell[] = [];
  const side: "left" | "right" = topic.id % 2 ? "right" : "left";
  const owners = new Set([topic.core.id, ...topic.sprigs.map((s) => s.id)]);
  const mine = branches.filter((b) => owners.has(b.attach));

  // the way in, with the topic's signpost beside it
  cells.push({ r: 0, c: MID, el: { t: "line", up: true, down: true } });
  cells.push({ r: 1, c: MID, el: { t: "line", up: true, down: true } });
  cells.push({ r: 0, c: side === "left" ? 0 : 5, w: 4, h: 2, el: { t: "sign", topic, side } });

  // the core, its side lessons hugging it
  const core: LessonStop = { type: "lesson", shell: topic.core, kind: "core", required: true, topic, glyph: String(topic.id) };
  cells.push({ r: 2, c: MID, el: { t: "stop", stop: core } });
  topic.sprigs.forEach((s, i) => {
    const r = 2 + Math.floor(i / 2);
    const c = i % 2 === 0 ? MID - 1 : MID + 1;
    cells.push({
      r,
      c,
      el: { t: "stop", stop: { type: "lesson", shell: s, kind: "sprig", required: Boolean(s.required), topic, glyph: String.fromCharCode(97 + i) } },
    });
  });
  const sprigRows = Math.ceil(topic.sprigs.length / 2);
  const stories = topic.stories ?? [];
  const clusterTop = 2 + Math.max(sprigRows, 1 + stories.length) - 1;
  for (let r = 3; r <= clusterTop; r += 1) {
    const story = stories[r - 3];
    if (story) {
      cells.push({ r, c: MID, el: { t: "stop", stop: { type: "lesson", shell: story, kind: "story", required: true, topic, glyph: "" } } });
    } else {
      cells.push({ r, c: MID, el: { t: "line", up: true, down: true } });
    }
  }

  // branches leave the spine sideways, two to a row
  let r = clusterTop + 1;
  for (let i = 0; i < mine.length; i += 2) {
    const pair = mine.slice(i, i + 2);
    const arms = { right: false, left: false };
    pair.forEach((branch, j) => {
      const dir = (i / 2 + j) % 2 === 0 ? (side === "left" ? "right" : "left") : side;
      const sign = dir === "right" ? 1 : -1;
      if (dir === "right") arms.right = true;
      else arms.left = true;
      cells.push({ r, c: MID + sign, el: { t: "line", left: true, right: true } });
      branch.lessons.slice(0, 3).forEach((lesson, k) => {
        cells.push({
          r,
          c: MID + sign * (2 + k),
          el: {
            t: "stop",
            stop: { type: "lesson", shell: lesson, kind: "branch", required: Boolean(branch.required), topic, glyph: String(k + 1), branchTitle: branch.title },
          },
        });
      });
    });
    cells.push({ r, c: MID, el: { t: "line", up: true, down: true, ...arms } });
    r += 1;
  }

  const rows = r;
  return { cells, rows };
}

/* ------------------------------------------------------------------ home */

export function E5Home() {
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
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [gateId, setGateId] = useState<number | null>(null);
  const [legend, setLegend] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrolled = useRef(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    logDailyActivity();
  }, [logDailyActivity]);

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

  const blocks = useMemo(
    () =>
      curriculum.topics.map((topic) => ({
        topic,
        region: regionOf(topic.id),
        ...layoutTopic(topic, curriculum.trailBranches),
        gate: curriculum.trailGates.find((g) => g.afterTopic === topic.id) ?? null,
      })),
    [curriculum]
  );

  const stops = useMemo(() => {
    const map = new Map<string, Stop>();
    for (const block of blocks) {
      for (const cell of block.cells) if (cell.el.t === "stop") map.set(`l${cell.el.stop.shell.id}`, cell.el.stop);
      if (block.gate) map.set(`g${block.gate.id}`, { type: "gate", gate: block.gate });
    }
    return map;
  }, [blocks]);

  const nextKey = nextLesson ? `l${nextLesson.id}` : null;
  const activeKey = selectedKey ?? nextKey;
  const selected = activeKey ? stops.get(activeKey) ?? null : null;

  const focusTile = useCallback((key: string, behavior: ScrollBehavior = "smooth") => {
    const el = document.querySelector<HTMLElement>(`[data-key="${key}"]`);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Place the square a little above the middle of what the bar and the panel leave
    // free, so the topic's name and the part below it stay readable.
    const barBottom = document.querySelector(".v-bar")?.getBoundingClientRect().bottom ?? 0;
    const panelTop = document.querySelector(".v-panel-box")?.getBoundingClientRect().top ?? window.innerHeight;
    const box = el.getBoundingClientRect();
    const target = barBottom + (panelTop - barBottom) * 0.38;
    window.scrollTo({ top: window.scrollY + box.top + box.height / 2 - target, behavior: reduce ? "auto" : behavior });
  }, []);

  // Land on the next step (or at the start) the first time the map is ready.
  useEffect(() => {
    if (!ready || !storeHydrated || scrolled.current || lessonIndex.data == null) return;
    scrolled.current = true;
    requestAnimationFrame(() => {
      if (nextKey) focusTile(nextKey, "auto");
      else window.scrollTo(0, document.documentElement.scrollHeight);
    });
  }, [ready, storeHydrated, nextKey, firstVisit, focusTile, lessonIndex.data]);

  if (language.status !== "available" || !ready) {
    return (
      <>
        <E5Bar />
        <section className="v-wrap v-blank" role={error ? "alert" : "status"} style={{ padding: "120px var(--v-margin)", minHeight: "70vh" }}>
          <h1 className="v-head">
            {language.status !== "available"
              ? `The ${language.name} course is still being written.`
              : error
                ? "The course didn’t load."
                : "Loading your map…"}
          </h1>
          {error && (
            <button type="button" className="v-btn" style={{ marginTop: 32 }} onClick={() => (isChunkLoadError(error) ? window.location.reload() : retry())}>
              Try again
            </button>
          )}
        </section>
      </>
    );
  }

  const authored = curriculum.lessonCount;
  const done = completedLessons.length;
  const selectedGate = gateId !== null ? curriculum.trailGates.find((g) => g.id === gateId) ?? null : null;
  const lastTopic = curriculum.topics[curriculum.topics.length - 1]?.id ?? 30;

  const onPick = (key: string, stop: Stop) => {
    if (key === activeKey) {
      if (stop.type === "gate") setGateId(stop.gate.id);
      else {
        const view = state.nodes.get(stop.shell.id);
        const isAuthored = stop.shell.authored !== false && indexById.has(stop.shell.id);
        if (isAuthored && view?.status !== "locked") document.querySelector<HTMLAnchorElement>("[data-play]")?.click();
      }
      return;
    }
    setSelectedKey(key);
  };

  return (
    <>
      <E5Bar />
      <h1 className="sr-only">Your {language.name} map</h1>
      <div className="v-map" aria-label={`${language.name} lessons, from the start at the bottom to the end at the top`} role="region">
        <div className="v-start">
          <p className="v-start-word" lang="de">
            Start
          </p>
          <p className="v-start-sub">
            {firstVisit ? "Begin with the first square and climb." : `${done} of ${authored} lessons done. Keep climbing.`}
          </p>
        </div>

        {blocks.map((block, i) => {
          const nextBlock = blocks[i + 1];
          const regionStarts = i === 0 || blocks[i - 1].region.key !== block.region.key;
          return (
            <section key={block.topic.id} className="v-zone" style={chapterStyle(block.topic.id)} aria-labelledby={`v-t-${block.topic.id}`}>
              {regionStarts && <RegionBanner region={block.region} from={block.topic.id} to={Math.min(block.region.until, lastTopic)} />}
              <TopicPatch
                cells={block.cells}
                rows={block.rows}
                nodes={state.nodes}
                indexById={indexById}
                activeKey={activeKey}
                nextKey={nextKey}
                onPick={onPick}
              />
              {block.gate && (
                <GateRow
                  gate={block.gate}
                  view={state.gates.get(block.gate.id)}
                  active={activeKey === `g${block.gate.id}`}
                  onPick={() => onPick(`g${block.gate!.id}`, { type: "gate", gate: block.gate! })}
                  leavesRegion={Boolean(nextBlock && nextBlock.region.key !== block.region.key)}
                />
              )}
            </section>
          );
        })}

        <div className="v-map-end">
          <p className="v-map-end-word" aria-hidden="true">
            <BridgeMark />
            Brücke
          </p>
          <p className="v-map-end-sub">The top of the trail. From here you read real German.</p>
        </div>
      </div>

      <Panel
        selected={selected}
        isNext={activeKey === nextKey}
        nextLesson={nextLesson}
        firstVisit={firstVisit}
        languageName={language.name}
        languageId={activeLanguageId}
        nodes={state.nodes}
        gates={state.gates}
        indexById={indexById}
        done={done}
        total={authored}
        due={due}
        onBackToNext={() => {
          setSelectedKey(null);
          if (nextKey) focusTile(nextKey);
        }}
        onOpenGate={(id) => setGateId(id)}
        onLegend={() => setLegend(true)}
      />

      {legend && <Legend onClose={() => setLegend(false)} />}

      {selectedGate && state.gates.get(selectedGate.id) && (
        <E5Checkpoint
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

/* ----------------------------------------------------------- map pieces */

function RegionBanner({ region, from, to }: { region: Region; from: number; to: number }) {
  return (
    <header className="v-region">
      <h2 className="v-region-name">{region.title}</h2>
      <p className="v-region-sub">
        Part {region.key}, topics {from} to {to}. {region.blurb}
      </p>
    </header>
  );
}

function statusOf(stop: LessonStop, view: NodeView | undefined, entry: LessonIndexEntry | undefined) {
  const authored = stop.shell.authored !== false && Boolean(entry);
  return authored ? view?.status ?? "locked" : "unwritten";
}

function TopicPatch({
  cells,
  rows,
  nodes,
  indexById,
  activeKey,
  nextKey,
  onPick,
}: {
  cells: Cell[];
  rows: number;
  nodes: Map<number, NodeView>;
  indexById: Map<number, LessonIndexEntry>;
  activeKey: string | null;
  nextKey: string | null;
  onPick: (key: string, stop: Stop) => void;
}) {
  return (
    <div className="v-patch" style={{ ["--rows" as string]: rows }}>
      {cells.map((cell) => {
        const style: React.CSSProperties = {
          gridColumn: `${cell.c + 1} / span ${cell.w ?? 1}`,
          gridRow: `${rows - cell.r - (cell.h ?? 1) + 1} / span ${cell.h ?? 1}`,
        };
        const key = `${cell.r}:${cell.c}:${cell.el.t}`;
        if (cell.el.t === "line") return <Line key={key} style={style} {...cell.el} />;
        if (cell.el.t === "sign") return <Signpost key={key} style={style} topic={cell.el.topic} side={cell.el.side} nodes={nodes} cells={cells} indexById={indexById} />;
        const stop = cell.el.stop;
        const tileKey = `l${stop.shell.id}`;
        return (
          <Tile
            key={key}
            style={style}
            stop={stop}
            tileKey={tileKey}
            view={nodes.get(stop.shell.id)}
            entry={indexById.get(stop.shell.id)}
            active={activeKey === tileKey}
            isNext={nextKey === tileKey}
            onPick={() => onPick(tileKey, stop)}
          />
        );
      })}
    </div>
  );
}

function Line({ style, up, down, left, right }: { style: React.CSSProperties; up?: boolean; down?: boolean; left?: boolean; right?: boolean }) {
  return (
    <span className="v-line" style={style} aria-hidden="true">
      {up && <i data-d="up" />}
      {down && <i data-d="down" />}
      {left && <i data-d="left" />}
      {right && <i data-d="right" />}
    </span>
  );
}

function Signpost({
  style,
  topic,
  side,
  nodes,
  cells,
  indexById,
}: {
  style: React.CSSProperties;
  topic: TopicCluster;
  side: "left" | "right";
  nodes: Map<number, NodeView>;
  cells: Cell[];
  indexById: Map<number, LessonIndexEntry>;
}) {
  let total = 0;
  let finished = 0;
  for (const cell of cells) {
    if (cell.el.t !== "stop" || !indexById.has(cell.el.stop.shell.id)) continue;
    total += 1;
    if (nodes.get(cell.el.stop.shell.id)?.status === "completed") finished += 1;
  }
  return (
    <div className="v-sign" data-side={side} style={style}>
      <p className="v-sign-num" aria-hidden="true">
        {topic.id}
      </p>
      <h3 id={`v-t-${topic.id}`} className="v-sign-title">
        <span className="sr-only">Topic {topic.id}: </span>
        {topic.title}
      </h3>
      <p className="v-sign-meta">
        {finished === total && total > 0 ? "All done" : `${finished} of ${total} done`}
      </p>
    </div>
  );
}

const KIND_NAME: Record<Kind, string> = {
  core: "Main lesson",
  sprig: "Side practice",
  story: "Reading story",
  branch: "Side path",
};

function Tile({
  style,
  stop,
  tileKey,
  view,
  entry,
  active,
  isNext,
  onPick,
}: {
  style: React.CSSProperties;
  stop: LessonStop;
  tileKey: string;
  view?: NodeView;
  entry?: LessonIndexEntry;
  active: boolean;
  isNext: boolean;
  onPick: () => void;
}) {
  const status = statusOf(stop, view, entry);
  const label = `${stop.kind === "core" ? `Lesson ${stop.topic.id}` : KIND_NAME[stop.kind]}: ${stop.shell.title}. ${
    status === "completed" ? "Done" : status === "available" ? (isNext ? "Your next step" : "Open") : status === "locked" ? "Not open yet" : "Coming later"
  }`;
  return (
    <button
      type="button"
      className="v-tile-map"
      data-key={tileKey}
      data-kind={stop.kind}
      data-status={status}
      data-required={stop.required || undefined}
      data-active={active || undefined}
      data-next={isNext || undefined}
      aria-pressed={active}
      aria-label={label}
      style={style}
      onClick={onPick}
      onPointerEnter={() => status !== "unwritten" && prefetchLesson(useAppStore.getState().activeLanguageId, stop.shell.id)}
    >
      <span className="v-tile-face">
        {stop.kind === "story" ? (
          <BookOpen aria-hidden="true" />
        ) : status === "completed" && stop.kind !== "core" ? (
          <Check aria-hidden="true" strokeWidth={3} />
        ) : stop.kind === "branch" ? (
          <>
            <GitBranch aria-hidden="true" className="v-tile-kind" />
            {stop.glyph}
          </>
        ) : (
          stop.glyph
        )}
      </span>
      {view?.star && stop.kind === "core" && (
        <span className="v-tile-star" aria-hidden="true">
          <StarMark star={view.star} size={16} />
        </span>
      )}
      {active && <span className="v-cursor" aria-hidden="true" />}
      {isNext && (
        <span className="v-next-tag" aria-hidden="true">
          Next
        </span>
      )}
    </button>
  );
}

function GateRow({
  gate,
  view,
  active,
  onPick,
  leavesRegion,
}: {
  gate: TrailGate;
  view?: GateView;
  active: boolean;
  onPick: () => void;
  leavesRegion: boolean;
}) {
  const open = Boolean(view?.open);
  return (
    <div className="v-gate-row" data-leaves={leavesRegion || undefined}>
      <span className="v-line v-line--gate" aria-hidden="true">
        <i data-d="up" />
        <i data-d="down" />
      </span>
      <button
        type="button"
        className="v-gate-tile"
        data-key={`g${gate.id}`}
        data-open={open || undefined}
        data-passed={view?.passed || undefined}
        data-active={active || undefined}
        aria-pressed={active}
        aria-label={`Checkpoint: ${gate.title}. ${open ? "Passed, the way is open" : view?.passed ? "Passed" : "Closed"}`}
        onClick={onPick}
      >
        {open ? <LockOpen aria-hidden="true" /> : <Lock aria-hidden="true" />}
        <span>{gate.title.replace(/^The /, "")}</span>
        {view?.passed && <Check aria-hidden="true" strokeWidth={3} />}
        {active && <span className="v-cursor" aria-hidden="true" />}
      </button>
      <span className="v-line v-line--gate" aria-hidden="true">
        <i data-d="up" />
        <i data-d="down" />
      </span>
    </div>
  );
}

/* ----------------------------------------------------------- the panel */

function Panel({
  selected,
  isNext,
  nextLesson,
  firstVisit,
  languageName,
  languageId,
  nodes,
  gates,
  indexById,
  done,
  total,
  due,
  onBackToNext,
  onOpenGate,
  onLegend,
}: {
  selected: Stop | null;
  isNext: boolean;
  nextLesson: LessonShell | null;
  firstVisit: boolean;
  languageName: string;
  languageId: string;
  nodes: Map<number, NodeView>;
  gates: Map<number, GateView>;
  indexById: Map<number, LessonIndexEntry>;
  done: number;
  total: number;
  due: number;
  onBackToNext: () => void;
  onOpenGate: (id: number) => void;
  onLegend: () => void;
}) {
  const { openLesson } = useAppNavigation();

  let body: React.ReactNode;
  if (!selected) {
    body = (
      <div className="v-panel-text">
        <p className="v-panel-kicker">Map complete</p>
        <h2 className="v-panel-title">You crossed the bridge.</h2>
        <p className="v-panel-sub">Keep the words fresh in Review, or replay any square on the trail.</p>
      </div>
    );
  } else if (selected.type === "gate") {
    const view = gates.get(selected.gate.id);
    body = (
      <>
        <div className="v-panel-text">
          <p className="v-panel-kicker">Checkpoint{view ? ` · topics ${view.fromTopic}–${view.toTopic}` : ""}</p>
          <h2 className="v-panel-title">{selected.gate.title}</h2>
          <p className="v-panel-sub">
            {view?.open
              ? "Passed. The way on is open."
              : view?.passed
                ? "Passed. Finish the main lessons below it to walk on."
                : "A short quiz on the topics below. Pass it to open the next stretch."}
          </p>
        </div>
        <div className="v-panel-actions">
          <button type="button" className="v-btn v-btn--go" onClick={() => onOpenGate(selected.gate.id)}>
            {view?.passed ? "See checkpoint" : "Open checkpoint"}
            <ArrowRightIcon />
          </button>
          {!isNext && nextLesson && (
            <button type="button" className="v-btn v-btn--soft v-btn--small" onClick={onBackToNext}>
              Back to my next step
            </button>
          )}
        </div>
      </>
    );
  } else {
    const view = nodes.get(selected.shell.id);
    const entry = indexById.get(selected.shell.id);
    const status = statusOf(selected, view, entry);
    const minutes = minutesLabel(getLessonExerciseCount(languageId, selected.shell.id));
    const playable = status === "available" || status === "completed";
    const intro = firstVisit && isNext;
    const kicker = [
      isNext ? "Your next step" : KIND_NAME[selected.kind],
      `topic ${selected.topic.id}`,
      minutes,
    ]
      .filter(Boolean)
      .join(" · ");
    body = (
      <>
        <div className="v-panel-text">
          {intro ? (
            <>
              <p className="v-panel-kicker">You already know some {languageName}</p>
              <h2 className="v-panel-title">Start at the bottom, one square at a time.</h2>
              <p className="v-panel-sub">
                Each square is a short lesson. Finish it and the next one lights up. First: <strong>{selected.shell.title}</strong>
                {minutes ? `, ${minutes}` : ""}.
              </p>
            </>
          ) : (
            <>
              <p className="v-panel-kicker">{kicker}</p>
              <h2 className="v-panel-title">{selected.shell.title}</h2>
              <p className="v-panel-sub">
                {status === "locked"
                  ? "Not open yet. Finish the lessons below it first."
                  : status === "unwritten"
                    ? "This lesson is still being written."
                    : selected.kind === "branch"
                      ? `${selected.branchTitle ?? "Side path"}${selected.required ? " · needed to finish the map" : " · optional"}`
                      : selected.kind === "sprig"
                        ? `${entry?.subtitle ?? ""}${selected.required ? " · needed to finish the map" : " · optional extra"}`
                        : entry?.subtitle ?? selected.topic.blurb}
              </p>
            </>
          )}
          {!intro && (
            <p className="v-panel-progress">
              {done}/{total} done{due ? ` · ${due} words to review` : ""}
              {view?.star && <StarMark star={view.star} size={16} />}
            </p>
          )}
        </div>
        <div className="v-panel-actions">
          {playable ? (
            <a
              href={expLessonHref(languageId, selected.shell.id, EXP5_ROOT)}
              className="v-btn v-btn--go v-btn--big"
              data-play
              data-next-lesson-start={isNext || undefined}
              onFocus={() => prefetchLesson(languageId, selected.shell.id)}
              onClick={(event) => {
                if (isModifiedClick(event)) return;
                event.preventDefault();
                openLesson(languageId, selected.shell.id);
              }}
            >
              {status === "completed" ? "Play again" : intro ? "Start lesson 1" : "Play"}
              <ArrowRightIcon />
            </a>
          ) : (
            <button type="button" className="v-btn v-btn--big" disabled>
              {status === "unwritten" ? "Coming later" : "Locked"}
            </button>
          )}
          {!isNext && nextLesson && (
            <button type="button" className="v-btn v-btn--soft v-btn--small" onClick={onBackToNext}>
              Back to my next step
            </button>
          )}
          {isNext && due > 0 && !firstVisit && (
            <Link href={`${EXP5_ROOT}/review`} className="v-btn v-btn--soft v-btn--small">
              Review {due} first
            </Link>
          )}
        </div>
      </>
    );
  }

  return (
    <aside className="v-panel" aria-label="Selected lesson" aria-live="polite">
      <div className="v-panel-box" style={selected?.type === "lesson" ? chapterStyle(selected.topic.id) : undefined}>
        {body}
        <button type="button" className="v-panel-help" onClick={onLegend} aria-label="How the map works">
          ?
        </button>
      </div>
    </aside>
  );
}

function Legend({ onClose }: { onClose: () => void }) {
  const rows: { status: string; kind: Kind; glyph: React.ReactNode; text: string; next?: boolean }[] = [
    { status: "available", kind: "core", glyph: "5", text: "Your next step, in pink. You only ever need this one.", next: true },
    { status: "available", kind: "core", glyph: "7", text: "A main lesson you can play. The numbers climb from the bottom." },
    { status: "completed", kind: "core", glyph: "4", text: "Done: the square turns black. A star beside a main lesson shows how well it went." },
    { status: "locked", kind: "core", glyph: "8", text: "Not open yet. It lights up when the one below is done." },
    { status: "available", kind: "sprig", glyph: "a", text: "Side practice, hugging its main lesson. Extra unless the panel says it’s needed." },
    { status: "available", kind: "branch", glyph: "1", text: "A side path: a short run of grammar lessons off the main line." },
    { status: "available", kind: "story", glyph: <BookOpen aria-hidden="true" />, text: "A reading story on the main line." },
  ];
  return (
    <E5Sheet label="How the map works" onClose={onClose} head={<p className="v-lead-strong">How the map works</p>}>
      <p className="v-body">
        Tap a square to see what it is, then press <strong>Play</strong> (or tap it again). The black frame is what you picked; the pink “Next” tag marks your next
        step. You only ever need the next one.
      </p>
      <ul className="v-maplegend">
        {rows.map((row) => (
          <li key={row.text}>
            <span className="v-legend-swatch" aria-hidden="true">
              <span className="v-tile-map v-tile-map--demo" data-status={row.status} data-kind={row.kind} data-next={row.next || undefined}>
                <span className="v-tile-face">{row.glyph}</span>
              </span>
            </span>
            <span className="v-body">{row.text}</span>
          </li>
        ))}
        <li>
          <span className="v-legend-swatch" aria-hidden="true">
            <span className="v-gate-tile v-gate-tile--demo">
              <Lock aria-hidden="true" />
            </span>
          </span>
          <span className="v-body">A checkpoint: a short quiz that opens the next part of the map.</span>
        </li>
      </ul>
    </E5Sheet>
  );
}
