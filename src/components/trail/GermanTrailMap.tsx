"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowDown, ArrowRight, ArrowUp, Check, Flag, GitBranch, Lock, Play, X } from "lucide-react";
import { useId, useLayoutEffect, useRef, useState, type MouseEvent } from "react";
import { ModalDialog } from "@/components/common/ModalDialog";
import { GERMAN_CURRICULUM } from "@/data/curriculum";
import { orderedTrailLessons } from "@/data/curriculum-core";
import { GERMAN_CHAPTERS, GERMAN_LESSON_CHAPTER, GERMAN_WORLD, type GermanChapterId } from "@/data/german-trail";
import { isModifiedClick, useAppNavigation } from "@/lib/app-navigation";
import { connectedStops, type TrailStop } from "@/lib/branching-trail-graph";
import { prefetchLesson } from "@/lib/content-client";
import type { GermanTrailProgress } from "@/lib/german-trail-progress";
import { lessonHref } from "@/lib/routes";
import { hasSavedPosition, hasVisited } from "@/lib/scroll-memory";
import { useAppStore } from "@/lib/store";
import type { NodeStatus } from "@/lib/trail-map";
import { useCourseRecommendation } from "@/lib/use-course-recommendation";
import styles from "./GermanTrailMap.module.css";

const lessons = new Map(orderedTrailLessons(GERMAN_CURRICULUM.topics, GERMAN_CURRICULUM.trailBranches).map((lesson) => [lesson.id, lesson]));
const stages: GermanChapterId[][] = [];
let stageLevel = -1;
for (const { value, level } of GERMAN_WORLD.stops) {
  if (value === null) continue;
  if (level !== stageLevel) stages.push([]);
  stages.at(-1)!.push(value);
  stageLevel = level;
}

const STEP = 104;
const TOP = 132;
const GATE = 48;
const CENTER = 500;
const ENTRY_GAP = 44;
const statusText: Record<NodeStatus, string> = { available: "Playable", completed: "Completed", locked: "Locked" };
const icons = { available: Play, completed: Check, locked: Lock };

function stopX({ lane, level }: TrailStop<number>, direction: number) {
  return CENTER + lane * 275 + Math.round(47 * Math.sin(level * 0.63)) * direction;
}

function Track({ d, active, from, to }: { d: string; active: boolean; from?: string | number; to?: string | number }) {
  return <path d={d} vectorEffect="non-scaling-stroke" data-lit={active} data-path-from={from} data-path-to={to} />;
}

function TrailStage({ ids, campaign, nextId, ready, onSelect }: {
  ids: readonly GermanChapterId[];
  campaign: GermanTrailProgress;
  nextId?: number;
  ready: boolean;
  onSelect: (stop: GermanChapterId | number) => void;
}) {
  const routes = ids.map((id) => ({ id, height: TOP + GERMAN_CHAPTERS[id].map.height * STEP + ENTRY_GAP }));
  const height = routes.reduce((sum, route) => sum + route.height, 0);
  const parallel = routes.length === 2;
  let bottom = height;
  const positioned = routes.map((route) => {
    bottom -= route.height;
    return { ...route, top: bottom, entry: bottom + route.height - ENTRY_GAP };
  });
  const [lower, upper] = positioned;
  const entryOpen = campaign.chapters.get(lower.id)!.status !== "locked";
  const lowerCleared = campaign.world.traversed.has(lower.id);
  const upperCleared = upper !== undefined && campaign.world.traversed.has(upper.id);

  return (
    <div className={styles.stage} style={{ height }}>
      <svg className={styles.tracks} viewBox={`0 0 1000 ${height}`} preserveAspectRatio="none" aria-hidden="true">
        {parallel ? (
          <>
            <Track d={`M500 ${height}V${height - 16}C500 ${height - 43} 968 ${height - 29} 968 ${height - 86}V${upper.entry + 54}C968 ${upper.entry + 8} 500 ${upper.entry + 32} 500 ${upper.entry}`} active={entryOpen} to={upper.id} />
            <Track d={`M500 ${lower.top + GATE}C370 ${lower.top + GATE} 32 ${lower.top + GATE - 8} 32 ${lower.top + GATE - 57}V72C32 25 500 48 500 16`} active={lowerCleared} from={lower.id} />
            <Track d={`M500 ${GATE}V16`} active={upperCleared} from={upper.id} />
            <Track d="M500 16V0" active={lowerCleared || upperCleared} />
          </>
        ) : <Track d={`M500 ${GATE}V0`} active={lowerCleared} from={lower.id} />}
        <Track d={`M500 ${height}V${lower.entry}`} active={entryOpen} to={lower.id} />
        {positioned.map(({ id, top }, route) => {
          const graph = GERMAN_CHAPTERS[id].map;
          const traversed = campaign.chapters.get(id)!.traversed;
          const direction = route === 0 ? 1 : -1;
          const yOf = (level: number) => top + TOP + (graph.height - level) * STEP;
          const line = (from: TrailStop<number>, to: TrailStop<number>) => {
            const ax = stopX(from, direction), bx = stopX(to, direction);
            const ay = yOf(from.level), by = yOf(to.level);
            if (ax === bx) return `M${ax} ${ay}V${by}`;
            const bend = Math.min(76, (ay - by) * 0.62);
            return `M${ax} ${ay}C${ax} ${ay - bend} ${bx} ${by + bend} ${bx} ${by}`;
          };
          return <g key={id}>
            <path className={styles.threshold} d={`M500 ${top + GATE}V${top + 94}`} vectorEffect="non-scaling-stroke" />
            {[false, true].flatMap((lit) => graph.links.flatMap(([from, to]) => traversed.has(from) !== lit ? [] : [
              <Track key={`${from}-${to}`} d={line(graph.byKey.get(from)!, graph.byKey.get(to)!)} active={lit} from={from} to={to} />,
            ]))}
          </g>;
        })}
        {parallel && <g className={styles.switches}>
          <circle cx={CENTER} cy={height - 16} r={5} data-lit={entryOpen} />
          <circle cx={CENTER} cy={16} r={5} data-lit={lowerCleared || upperCleared} />
        </g>}
      </svg>
      {positioned.map(({ id, top }, route) => {
        const chapter = GERMAN_CHAPTERS[id];
        const progress = campaign.chapters.get(id)!;
        const clearProgress = Math.min(progress.count / chapter.clearCount, 1);
        const direction = route === 0 ? 1 : -1;
        return (
          <div key={id} data-trail-section={id} role="group" aria-label={chapter.title}>
            {chapter.map.stops.map((stop) => {
              const { key, value, level } = stop;
              const point = { left: `${stopX(stop, direction) / 10}%`, top: top + TOP + (chapter.map.height - level) * STEP };
              if (value === null) return (
                <div key={key} className={styles.position} style={point} aria-hidden="true">
                  <span className={styles.junction} data-lit={progress.traversed.has(key)} />
                  {key === chapter.map.entry && <span className={styles.entry}>{chapter.title}</span>}
                </div>
              );
              const lesson = lessons.get(value)!;
              const status = campaign.nodes.get(value)!.status;
              const Icon = icons[status];
              return (
                <button key={key} type="button" id={`german-stop-${value}`}
                  className={`${styles.position} ${styles.marker}`} style={point}
                  data-lesson-stop={value} data-status={status} data-next={value === nextId} disabled={!ready}
                  aria-label={`Lesson ${value}: ${lesson.title}, ${statusText[status]}`}
                  onClick={() => onSelect(value)}>
                  <span className={styles.pin} aria-hidden="true">
                    <span>{String(value).padStart(2, "0")}</span>
                    <Icon className={styles.pinStatus} size={11} />
                  </span>
                  <span className={styles.markerTitle}>{lesson.title}</span>
                </button>
              );
            })}
            <button className={`${styles.position} ${styles.checkpoint}`} style={{ left: "50%", top: top + GATE }}
              type="button" data-checkpoint={id} data-status={progress.status} disabled={!ready} onClick={() => onSelect(id)}>
              <span className={styles.checkpointFlag} aria-hidden="true">
                {progress.status === "completed" ? <Check size={17} /> : <Flag size={17} />}
              </span>
              <span>
                <strong>{chapter.title}</strong>
                <small>{progress.status === "completed" ? "Cleared" : `${Math.min(progress.count, chapter.clearCount)} / ${chapter.clearCount} to clear`}</small>
                <span className={styles.meter} aria-hidden="true"><span style={{ scale: `${clearProgress} 1` }} /></span>
              </span>
              {parallel && <span className={styles.routeTag}>Route {route === 0 ? "A" : "B"}</span>}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export function GermanTrailMap() {
  const { campaign, nextLesson } = useCourseRecommendation("de");
  const pathname = usePathname();
  const ready = useAppStore((s) => s.storeHydrated);
  const openOnboarding = useAppStore((s) => s.openOnboarding);
  const { openLesson } = useAppNavigation();
  const [selected, setSelected] = useState<GermanChapterId | number | null>(null);
  const headingId = useId();
  const dialogTitle = useId();
  const trailhead = useRef<HTMLElement>(null);
  const finish = useRef<HTMLDivElement>(null);
  const positioned = useRef(false);
  const restoring = useRef(hasVisited(pathname) && hasSavedPosition(pathname));
  const nextId = nextLesson?.id;

  useLayoutEffect(() => {
    if (!ready || positioned.current || restoring.current) return;
    positioned.current = true;
    if (nextId === 1) trailhead.current?.scrollIntoView({ block: "end" });
    else if (nextId !== undefined) document.getElementById(`german-stop-${nextId}`)?.scrollIntoView({ block: "center" });
    else finish.current?.scrollIntoView({ block: "center" });
  }, [ready, nextId]);

  if (!campaign) return null;
  const lesson = typeof selected === "number" ? lessons.get(selected) : undefined;
  const chapterId = typeof selected === "number" ? GERMAN_LESSON_CHAPTER.get(selected) : selected;
  const chapter = chapterId ? GERMAN_CHAPTERS[chapterId] : null;
  const progress = chapterId ? campaign.chapters.get(chapterId) : null;
  const status = typeof selected === "number" ? campaign.nodes.get(selected)?.status : progress?.status;
  const titles = (ids: readonly number[]) => ids.map((id) => lessons.get(id)!.title).join(" · ");
  const nextStops = typeof selected === "number" && chapter ? connectedStops(chapter.map, selected, "outgoing") : [];
  const previous = chapterId ? connectedStops(GERMAN_WORLD, chapterId, "incoming").map((id) => GERMAN_CHAPTERS[id].title) : [];

  function startLesson(event: MouseEvent<HTMLAnchorElement>, id: number) {
    if (isModifiedClick(event)) return;
    event.preventDefault();
    setSelected(null);
    openLesson("de", id);
  }

  return (
    <section id="trail" className={styles.trail} aria-labelledby={headingId}>
      <header className={styles.trailhead} ref={trailhead}>
        <div className={styles.trailheadMark}><ArrowUp size={21} aria-hidden="true" /></div>
        <div className={styles.trailheadCopy}>
          <span className={styles.kicker}>Trailhead · {campaign.nodes.size} lessons</span>
          <h1 id={headingId}>The German Trail</h1>
          <p>Follow the paths up. Finish a lesson to open the connected stops. Where paths meet, either route is enough.</p>
        </div>
        <div className={styles.trailheadActions}>
          <Link href={lessonHref("de", 1)} data-next-lesson-start className={styles.action}
            onPointerEnter={() => prefetchLesson("de", 1)} onFocus={() => prefetchLesson("de", 1)}
            onClick={(event) => startLesson(event, 1)}>
            {campaign.nodes.get(1)?.status === "completed" ? "Replay lesson 1" : "Start lesson 1"}<ArrowUp size={16} aria-hidden="true" />
          </Link>
          <button type="button" className={styles.secondary} onClick={openOnboarding}>60-second intro</button>
        </div>
      </header>
      {stages.map((ids) => <TrailStage key={ids[0]} ids={ids} campaign={campaign} nextId={nextId} ready={ready} onSelect={setSelected} />)}
      <div className={styles.finish} data-lit={campaign.finished} ref={finish}>
        <Flag size={20} aria-hidden="true" />
        <span>{campaign.finished ? "Trail completed" : "Trail finish"}</span>
        {nextId !== undefined && <button type="button" className={styles.secondary} onClick={() =>
          document.getElementById(`german-stop-${nextId}`)?.scrollIntoView({ block: "center" })
        }>Return to your path <ArrowDown size={16} aria-hidden="true" /></button>}
      </div>

      {selected !== null && chapter && progress && status && (
        <ModalDialog aria-labelledby={dialogTitle} onClose={() => setSelected(null)} className={styles.lessonDialog}>
          <div className={styles.dialogTop}>
            <span><GitBranch size={16} aria-hidden="true" /> {lesson ? `${chapter.title} · ${statusText[status]}` : "Trail checkpoint"}</span>
            <button type="button" aria-label={lesson ? "Close lesson details" : "Close checkpoint"} onClick={() => setSelected(null)}><X size={20} /></button>
          </div>
          <h2 id={dialogTitle}>{lesson?.title ?? chapter.title}</h2>
          <p>{lesson?.plan ?? chapter.description}</p>
          {lesson && typeof selected === "number" ? (
            status === "locked" ? (
              <p>{progress.status === "locked"
                ? `To reach this stretch, clear ${previous.join(" or ")}.`
                : `To open this lesson, complete any one connected lesson: ${titles(connectedStops(chapter.map, selected, "incoming"))}.`}</p>
            ) : (
              <>
                {nextStops.length > 0 && <p>{status === "completed" ? "Connected next lessons: " : "Finishing opens: "}{titles(nextStops)}</p>}
                <Link href={lessonHref("de", selected)} className={styles.action}
                  onPointerEnter={() => prefetchLesson("de", selected)} onFocus={() => prefetchLesson("de", selected)}
                  onClick={(event) => startLesson(event, selected)}>
                  {status === "completed" ? "Replay lesson" : "Start lesson"}<ArrowRight size={17} aria-hidden="true" />
                </Link>
              </>
            )
          ) : (
            <>
              <p><strong>{progress.count} / {chapter.clearCount} to clear.</strong> Complete one listed lesson per skill as part of that total.</p>
              <ul className={styles.skills}>
                {chapter.skills.map(({ label, lessons: ids }, index) => (
                  <li key={label} data-covered={progress.skills[index]}>
                    {progress.skills[index] ? <Check size={16} aria-hidden="true" /> : <Flag size={16} aria-hidden="true" />}
                    <div><span className="sr-only">{progress.skills[index] ? "Covered: " : "Not covered: "}</span><strong>{label}</strong>
                      <small>{ids.map((id) => lessons.get(id)!.title).join(" or ")}</small>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </ModalDialog>
      )}
    </section>
  );
}
