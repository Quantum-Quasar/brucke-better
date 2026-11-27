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
import { expLessonHref, EXP3_ROOT } from "@/lib/exp-routes";
import type { LessonIndexEntry, LessonShell, TopicCluster, TrailBranch, TrailGate } from "@/lib/types";
import type { NodeView, GateView } from "@/lib/trail-map";
import { P3Bar, useDueCount } from "./P3Chrome";
import { P3Sheet } from "./P3WordSheet";
import { ArrowRightIcon, minutesLabel, StarMark } from "./p3-kit";
import { ART, BIOME_BIG, BIOME_DECOR, BRIDGE, seeded, Sprite } from "./p3-sprites";

const P3Checkpoint = dynamic(() => import("./P3Checkpoint").then((m) => m.P3Checkpoint), { ssr: false });

/* ----------------------------------------------------------------- model */

type Kind = "core" | "sprig" | "story" | "branch";

interface LessonStop {
  type: "lesson";
  shell: LessonShell;
  kind: Kind;
  required: boolean;
  topic: TopicCluster;
  /** what the tile shows: "04", "a", "2" */
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
    | { t: "sign"; topic: TopicCluster; side: "left" | "right" }
    | { t: "decor"; sprite: keyof typeof ART; flip: boolean };
}

const COLS = 9;
const MID = 4;

const REGIONS = [
  { until: 7, key: "heath", de: "die Heide", en: "the heath" },
  { until: 10, key: "forest", de: "der Wald", en: "the forest" },
  { until: 16, key: "lake", de: "der See", en: "the lake" },
  { until: 20, key: "town", de: "die Stadt", en: "the town" },
  { until: 26, key: "mountains", de: "die Berge", en: "the mountains" },
  { until: Infinity, key: "river", de: "der Fluss", en: "the river" },
] as const;
type Region = (typeof REGIONS)[number];

function regionOf(topicId: number): Region {
  return REGIONS.find((r) => topicId <= r.until) ?? REGIONS[REGIONS.length - 1];
}

const pad = (n: number) => String(n).padStart(2, "0");

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
  const core: LessonStop = { type: "lesson", shell: topic.core, kind: "core", required: true, topic, glyph: pad(topic.id) };
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

  // scenery in the cells nobody walks on
  const rows = r;
  const taken = new Set<string>();
  for (const cell of cells) {
    for (let dr = 0; dr < (cell.h ?? 1); dr += 1) for (let dc = 0; dc < (cell.w ?? 1); dc += 1) taken.add(`${cell.r + dr}:${cell.c + dc}`);
  }
  const rand = seeded(topic.id * 31 + 7);
  const pool = BIOME_DECOR[regionOf(topic.id).key];
  for (let rr = 0; rr < rows; rr += 1) {
    for (let cc = 0; cc < COLS; cc += 1) {
      if (taken.has(`${rr}:${cc}`)) continue;
      if (Math.abs(cc - MID) === 1 && rand() < 0.6) continue;
      if (rand() < 0.3) cells.push({ r: rr, c: cc, el: { t: "decor", sprite: pool[Math.floor(rand() * pool.length)], flip: rand() < 0.5 } });
    }
  }
  return { cells, rows };
}

/* ------------------------------------------------------------------ home */

export function P3Home() {
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
    el.scrollIntoView({ block: "center", behavior: reduce ? "auto" : behavior });
  }, []);

  // Land on the next step (or at the start) the first time the map is ready.
  useEffect(() => {
    if (!ready || !storeHydrated || scrolled.current || lessonIndex.data == null) return;
    scrolled.current = true;
    requestAnimationFrame(() => {
      if (nextKey && !firstVisit) focusTile(nextKey, "auto");
      else window.scrollTo(0, document.documentElement.scrollHeight);
    });
  }, [ready, storeHydrated, nextKey, firstVisit, focusTile, lessonIndex.data]);

  if (language.status !== "available" || !ready) {
    return (
      <>
        <P3Bar />
        <section className="q-wrap q-blank" role={error ? "alert" : "status"}>
          <h1 className="q-head">
            {language.status !== "available"
              ? `The ${language.name} course is still being written.`
              : error
                ? "The course didn’t load."
                : "Loading your map…"}
          </h1>
          {error && (
            <button type="button" className="q-btn" onClick={() => (isChunkLoadError(error) ? window.location.reload() : retry())}>
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
      <P3Bar />
      <h1 className="sr-only">Your {language.name} map</h1>
      <div className="q-map" aria-label={`${language.name} lessons, from the start at the bottom to the bridge at the top`} role="region">
        <div className="q-start" data-biome="heath">
          <span className="q-start-ring" aria-hidden="true">
            <span />
          </span>
          <p className="q-start-word">
            <span lang="de">Los!</span> · Go! You start here and climb.
          </p>
        </div>

        {blocks.map((block, i) => {
          const nextBlock = blocks[i + 1];
          const regionStarts = i === 0 || blocks[i - 1].region.key !== block.region.key;
          return (
            <section key={block.topic.id} className="q-zone" data-biome={block.region.key} aria-labelledby={`q-t-${block.topic.id}`}>
              {regionStarts && <RegionBanner region={block.region} from={block.topic.id} to={Math.min(block.region.until, lastTopic)} />}
              <TopicPatch
                cells={block.cells}
                rows={block.rows}
                region={block.region.key}
                topicId={block.topic.id}
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

        <div className="q-map-end">
          <Sprite art={BRIDGE} scale={6} className="q-bridge" />
          <p className="q-map-end-word">
            <span lang="de">die Brücke</span> · the bridge
          </p>
          <p className="q-small">The end of the map — from here you read real German.</p>
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
        <P3Checkpoint
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
    <header className="q-region" data-biome={region.key}>
      <h2 className="q-region-name">
        <span lang="de">{region.de}</span>
      </h2>
      <p className="q-region-sub">
        {region.en} · topics {from}–{to === Infinity ? "" : to}
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
  region,
  topicId,
  nodes,
  indexById,
  activeKey,
  nextKey,
  onPick,
}: {
  cells: Cell[];
  rows: number;
  region: string;
  topicId: number;
  nodes: Map<number, NodeView>;
  indexById: Map<number, LessonIndexEntry>;
  activeKey: string | null;
  nextKey: string | null;
  onPick: (key: string, stop: Stop) => void;
}) {
  const big = useMemo(() => {
    const rand = seeded(topicId * 97 + 3);
    const pool = BIOME_BIG[region] ?? BIOME_BIG.heath;
    return [0, 1, 2, 3, 4, 5].map((n) => ({
      sprite: pool[Math.floor(rand() * pool.length)],
      side: n % 2 === 0 ? "left" : "right",
      x: 4 + (n >> 1) * 22 + rand() * 14,
      y: 4 + rand() * 80,
      flip: rand() < 0.5,
      scale: 6 + Math.floor(rand() * 3),
    }));
  }, [region, topicId]);

  return (
    <div className="q-patch" style={{ ["--rows" as string]: rows }}>
      {big.map((d, i) => (
        <span
          key={i}
          className="q-big-decor"
          data-side={d.side}
          style={{ [d.side === "left" ? "right" : "left"]: `calc(100% + ${d.x}%)`, bottom: `${d.y}%`, transform: d.flip ? "scaleX(-1)" : undefined }}
        >
          <Sprite art={ART[d.sprite as keyof typeof ART]} scale={d.scale} />
        </span>
      ))}
      {cells.map((cell) => {
        const style: React.CSSProperties = {
          gridColumn: `${cell.c + 1} / span ${cell.w ?? 1}`,
          gridRow: `${rows - cell.r - (cell.h ?? 1) + 1} / span ${cell.h ?? 1}`,
        };
        const key = `${cell.r}:${cell.c}:${cell.el.t}`;
        if (cell.el.t === "line") return <Line key={key} style={style} {...cell.el} />;
        if (cell.el.t === "decor")
          return (
            <span key={key} className="q-decor" style={{ ...style, transform: cell.el.flip ? "scaleX(-1)" : undefined }} aria-hidden="true">
              <Sprite art={ART[cell.el.sprite]} scale={3} />
            </span>
          );
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
    <span className="q-line" style={style} aria-hidden="true">
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
    <div className="q-sign" data-side={side} style={style}>
      <h3 id={`q-t-${topic.id}`} className="q-sign-title">
        <span className="q-sign-num">{topic.id}</span> {topic.title}
      </h3>
      <p className="q-sign-meta">
        {finished}/{total} done
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
      className="q-tile-map"
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
      <span className="q-tile-face">
        {stop.kind === "story" ? <Sprite art={ART.book} scale={3} /> : status === "completed" && stop.kind !== "core" ? <Sprite art={ART.check} scale={3} /> : stop.glyph}
      </span>
      {view?.star && (
        <span className="q-tile-star" data-star={view.star} aria-hidden="true">
          <Sprite art={ART.star} scale={3} />
        </span>
      )}
      {active && <span className="q-cursor" aria-hidden="true" />}
      {isNext && (
        <span className="q-next-arrow" aria-hidden="true">
          <Sprite art={ART.arrow} scale={3} />
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
    <div className="q-gate-row" data-leaves={leavesRegion || undefined}>
      <span className="q-line q-line--gate" aria-hidden="true">
        <i data-d="up" />
        <i data-d="down" />
      </span>
      <button
        type="button"
        className="q-gate-tile"
        data-key={`g${gate.id}`}
        data-open={open || undefined}
        data-passed={view?.passed || undefined}
        data-active={active || undefined}
        aria-pressed={active}
        aria-label={`Checkpoint: ${gate.title}. ${open ? "Passed, the way is open" : view?.passed ? "Passed" : "Closed"}`}
        onClick={onPick}
      >
        <Sprite art={open ? ART.open : ART.lock} scale={4} />
        <span>Checkpoint</span>
        {active && <span className="q-cursor" aria-hidden="true" />}
      </button>
      <span className="q-line q-line--gate" aria-hidden="true">
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
      <div className="q-panel-text">
        <p className="q-panel-kicker">Map complete</p>
        <h2 className="q-panel-title">You crossed the bridge.</h2>
        <p className="q-panel-sub">Keep the words fresh in Review, or replay any tile on the map.</p>
      </div>
    );
  } else if (selected.type === "gate") {
    const view = gates.get(selected.gate.id);
    body = (
      <>
        <div className="q-panel-text">
          <p className="q-panel-kicker">Checkpoint{view ? ` · topics ${view.fromTopic}–${view.toTopic}` : ""}</p>
          <h2 className="q-panel-title">{selected.gate.title}</h2>
          <p className="q-panel-sub">
            {view?.open
              ? "Passed. The way on is open."
              : view?.passed
                ? "Passed. Finish the main lessons below it to walk on."
                : "A short quiz on the topics below. Pass it to open the next stretch."}
          </p>
        </div>
        <div className="q-panel-actions">
          <button type="button" className="q-btn q-btn--go" onClick={() => onOpenGate(selected.gate.id)}>
            {view?.passed ? "See checkpoint" : "Open checkpoint"}
            <ArrowRightIcon />
          </button>
          {!isNext && nextLesson && (
            <button type="button" className="q-btn q-btn--soft q-btn--small" onClick={onBackToNext}>
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
        <div className="q-panel-text">
          {intro ? (
            <>
              <p className="q-panel-kicker">You already know some {languageName}</p>
              <h2 className="q-panel-title">Start at the bottom, one square at a time.</h2>
              <p className="q-panel-sub">
                Each square is a short lesson. Finish it and the next one lights up. First: <strong>{selected.shell.title}</strong>
                {minutes ? `, ${minutes}` : ""}.
              </p>
            </>
          ) : (
            <>
              <p className="q-panel-kicker">{kicker}</p>
              <h2 className="q-panel-title">{selected.shell.title}</h2>
              <p className="q-panel-sub">
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
            <p className="q-panel-progress">
              {done}/{total} done{due ? ` · ${due} words to review` : ""}
              {view?.star && <StarMark star={view.star} size={16} />}
            </p>
          )}
        </div>
        <div className="q-panel-actions">
          {playable ? (
            <a
              href={expLessonHref(languageId, selected.shell.id, EXP3_ROOT)}
              className="q-btn q-btn--go q-btn--big"
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
            <button type="button" className="q-btn q-btn--big" disabled>
              {status === "unwritten" ? "Coming later" : "Locked"}
            </button>
          )}
          {!isNext && nextLesson && (
            <button type="button" className="q-btn q-btn--soft q-btn--small" onClick={onBackToNext}>
              Back to my next step
            </button>
          )}
          {isNext && due > 0 && !firstVisit && (
            <Link href={`${EXP3_ROOT}/review`} className="q-btn q-btn--soft q-btn--small">
              Review {due} first
            </Link>
          )}
        </div>
      </>
    );
  }

  return (
    <aside className="q-panel" aria-label="Selected lesson" aria-live="polite">
      <div className="q-panel-box">
        {body}
        <button type="button" className="q-panel-help" onClick={onLegend} aria-label="How the map works">
          ?
        </button>
      </div>
    </aside>
  );
}

function Legend({ onClose }: { onClose: () => void }) {
  const rows: { status: string; kind: Kind; glyph: React.ReactNode; text: string }[] = [
    { status: "available", kind: "core", glyph: "05", text: "A main lesson you can play. The numbers climb from the bottom." },
    { status: "completed", kind: "core", glyph: "04", text: "Done. Stars under it show how well it went." },
    { status: "locked", kind: "core", glyph: "06", text: "Not open yet. It lights up when the one below is done." },
    { status: "available", kind: "sprig", glyph: "a", text: "Side practice, hugging its main lesson. Extra unless the panel says it’s needed." },
    { status: "available", kind: "branch", glyph: "1", text: "A side path: a short run of grammar lessons off the main line." },
    { status: "available", kind: "story", glyph: <Sprite art={ART.book} scale={3} />, text: "A reading story on the main line." },
  ];
  return (
    <P3Sheet label="How the map works" onClose={onClose} head={<h2 className="q-head q-sheet-title">How the map works</h2>}>
      <p className="q-body">
        Tap a square to see what it is, then press <strong>Play</strong> (or tap it again). The pink frame is what you picked; the arrow is your next
        step. You only ever need the next one.
      </p>
      <ul className="q-legend">
        {rows.map((row) => (
          <li key={row.text}>
            <span className="q-tile-map q-tile-map--demo" data-status={row.status} data-kind={row.kind} data-required={row.kind === "core" || undefined}>
              <span className="q-tile-face">{row.glyph}</span>
            </span>
            <span className="q-body">{row.text}</span>
          </li>
        ))}
        <li>
          <span className="q-gate-tile q-gate-tile--demo" aria-hidden="true">
            <Sprite art={ART.lock} scale={4} />
          </span>
          <span className="q-body">A checkpoint: a short quiz that opens the next part of the map.</span>
        </li>
      </ul>
    </P3Sheet>
  );
}
