"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUp, Check, Circle, Flag, Lock, Play, X } from "lucide-react";
import { useEffect, useId, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ModalDialog } from "@/components/common/ModalDialog";
import { GERMAN_CURRICULUM } from "@/data/curriculum";
import { orderedTrailLessons } from "@/data/curriculum-core";
import { GERMAN_CHAPTERS, GERMAN_FINISH, GERMAN_LESSON_CHAPTER, GERMAN_WORLD, type GermanChapterId } from "@/data/german-trail";
import { isModifiedClick, useAppNavigation } from "@/lib/app-navigation";
import { connectedStops, type BranchingGraph, type TrailKey, type TrailStop } from "@/lib/branching-trail-graph";
import { prefetchLesson } from "@/lib/content-client";
import { focusGermanChapter } from "@/lib/german-trail-progress";
import { lessonHref } from "@/lib/routes";
import type { NodeStatus } from "@/lib/trail-map";
import { useAppStore } from "@/lib/store";
import { useCourseRecommendation } from "@/lib/use-course-recommendation";
import { useViewStore } from "@/lib/view-store";
import styles from "./GermanTrailMap.module.css";

const LESSONS = new Map(orderedTrailLessons(GERMAN_CURRICULUM.topics, GERMAN_CURRICULUM.trailBranches).map((lesson) => [lesson.id, lesson]));
const STEP = 94;
const PADDING = 50;
const WIDTH = 1000;
const xOf = (lane: number) => WIDTH * (0.5 + lane * 0.318);

const STATUS: Record<NodeStatus, string> = { available: "Playable", completed: "Completed", locked: "Locked" };
const icons = { available: Play, completed: Check, locked: Lock };

function StatusIcon({ status }: { status: NodeStatus }) {
  const Icon = icons[status];
  return <Icon aria-hidden="true" size={14} />;
}

function ClearCount({ count, target }: { count: number; target: number }) {
  return <>{Math.min(count, target)} / {target} to clear</>;
}

function MapCanvas<T extends TrailKey>({ graph, traversed, anchor, label, world, ready, renderStop }: {
  graph: BranchingGraph<T>;
  traversed: ReadonlySet<TrailKey>;
  anchor: TrailKey;
  label: string;
  world?: boolean;
  ready: boolean;
  renderStop: (value: T) => ReactNode;
}) {
  const view = useRef<HTMLDivElement>(null);
  const height = graph.height * STEP + PADDING * 2;
  const yOf = (level: number) => (graph.height - level) * STEP + PADDING;
  const anchorY = yOf(graph.byKey.get(anchor)?.level ?? 0);
  const opened = useRef(false);
  useLayoutEffect(() => {
    const viewport = view.current;
    if (!viewport || !ready || opened.current) return;
    viewport.scrollTop = anchorY - viewport.clientHeight / 2;
    opened.current = true;
  }, [anchorY, ready]);

  function line(from: TrailStop<T>, to: TrailStop<T>) {
    const ax = xOf(from.lane), bx = xOf(to.lane);
    const ay = yOf(from.level), by = yOf(to.level);
    if (ax === bx) return `M ${ax} ${ay} V ${by}`;
    const mid = from.value === null ? ay - 34 : to.value === null ? by + 34 : (ay + by) / 2;
    return `M ${ax} ${ay} V ${mid} H ${bx} V ${by}`;
  }

  return (
    <div className={styles.map} tabIndex={0} role="region" aria-label={label} ref={view}>
      <div className={styles.field} style={{ height }} data-view={world ? "world" : "chapter"}>
        <svg className={styles.tracks} viewBox={`0 0 ${WIDTH} ${height}`} preserveAspectRatio="none" aria-hidden="true">
          {[false, true].map((lit) => graph.links.map(([from, to]) => traversed.has(from) === lit && (
            <path key={`${from}-${to}`} d={line(graph.byKey.get(from)!, graph.byKey.get(to)!)}
              vectorEffect="non-scaling-stroke" data-path-from={from} data-path-to={to} data-lit={lit} />
          )))}
        </svg>
        {graph.stops.map((stop) => {
          const landmark = stop.key === graph.entry ? "Trailhead" : stop.key === GERMAN_FINISH ? "Main finish" : null;
          return <div key={stop.key} className={styles.position} style={{ left: `${xOf(stop.lane) / 10}%`, top: yOf(stop.level) }}>
            {stop.value !== null ? renderStop(stop.value) : landmark ? (
              <div className={styles.landmark} data-lit={traversed.has(stop.key)}>
                {stop.key === graph.entry ? <ArrowUp size={15} aria-hidden="true" /> : <Flag size={15} aria-hidden="true" />}
                {landmark}
              </div>
            ) : <span className={styles.junction} data-lit={traversed.has(stop.key)} aria-hidden="true" />}
          </div>;
        })}
      </div>
    </div>
  );
}

export function GermanTrailMap() {
  const { campaign, nextLesson } = useCourseRecommendation("de");
  const subView = useViewStore((s) => s.subView);
  const ready = useAppStore((s) => s.storeHydrated);
  const { openLesson } = useAppNavigation();
  const [chapterId, setChapterId] = useState<GermanChapterId | null>(null);
  const [lastChapter, setLastChapter] = useState<GermanChapterId | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const headingId = useId();
  const dialogTitle = useId();

  useEffect(() => {
    if (subView?.kind !== "lesson" || subView.languageId !== "de") return;
    const chapter = GERMAN_LESSON_CHAPTER.get(subView.lessonId);
    if (chapter) {
      setChapterId(chapter);
      setLastChapter(chapter);
    }
  }, [subView]);

  useLayoutEffect(() => {
    if (moved.current) heading.current?.focus({ preventScroll: true });
    moved.current = false;
  }, [chapterId]);

  if (!campaign) return null;
  const current = focusGermanChapter(campaign);
  const chapter = chapterId ? GERMAN_CHAPTERS[chapterId] : null;
  const progress = chapterId ? campaign.chapters.get(chapterId)! : null;
  const selectedLesson = selected === null ? undefined : LESSONS.get(selected);
  const selectedStatus = selected === null ? undefined : campaign.nodes.get(selected)?.status;

  const showChapter = (id: GermanChapterId | null) => {
    moved.current = true;
    setSelected(null);
    if (id) setLastChapter(id);
    setChapterId(id);
  };

  const milestones = chapterId ? connectedStops(GERMAN_WORLD, chapterId, "outgoing") : [];
  const previous = chapterId ? connectedStops(GERMAN_WORLD, chapterId, "incoming") : [];
  const labelLessons = (ids: readonly number[]) => ids.map((id) => LESSONS.get(id)!.title).join(" · ");
  const nextStops = selected !== null && chapter ? connectedStops(chapter.map, selected, "outgoing") : [];

  return (
    <section id="trail" className={styles.trail} aria-labelledby={headingId}>
      <header className={styles.header}>
        <div>
          {chapter ? (
            <button type="button" onClick={() => showChapter(null)} className={styles.breadcrumb}>
              <ArrowLeft size={16} aria-hidden="true" /> World map
            </button>
          ) : <div className={styles.kicker}>German Trail</div>}
          <h2 id={headingId} className={styles.heading} tabIndex={-1} ref={heading}>{chapter?.title ?? "World map"}</h2>
          <p className={styles.intro}>{chapter?.description ?? "Clear chapters to open connected routes. Where paths meet, either route gets you there."}</p>
        </div>
        {chapter && progress ? (
          <div className={styles.progress} aria-live="polite" data-status={progress.status}>
            <strong>{progress.status === "completed" ? "Chapter cleared" : <ClearCount count={progress.count} target={chapter.clearCount} />}</strong>
            <span>{progress.count} of {progress.total} lessons completed</span>
          </div>
        ) : (
          <button type="button" className={styles.action} onClick={() => showChapter(current)}>
            Open {GERMAN_CHAPTERS[current].title}<ArrowRight size={17} aria-hidden="true" />
          </button>
        )}
      </header>

      <div className={styles.body}>
        <div>
          <div className={styles.mapCaption}>
            <span>{chapter ? "Lesson map" : "Chapter map"}</span>
            <span><ArrowUp size={13} aria-hidden="true" /> Follow the paths up</span>
          </div>
          {chapter && progress && chapterId ? (
            <MapCanvas key={chapterId} graph={chapter.map} traversed={progress.traversed} ready={ready}
              anchor={nextLesson && GERMAN_LESSON_CHAPTER.get(nextLesson.id) === chapterId ? nextLesson.id : chapter.map.entry}
              label={`${chapter.title} lesson map`} renderStop={(id) => {
                const lesson = LESSONS.get(id)!;
                const status = campaign.nodes.get(id)!.status;
                return (
                  <button type="button" data-lesson-stop={id} data-status={status} className={styles.marker}
                    aria-label={`Lesson ${id}: ${lesson.title}, ${STATUS[status]}`} onClick={() => setSelected(id)}>
                    <span className={styles.markerCode}><span>{String(id).padStart(2, "0")}</span><StatusIcon status={status} /></span>
                    <span className={styles.markerTitle}>{lesson.title}</span>
                  </button>
                );
              }} />
          ) : (
            <MapCanvas key="world" graph={GERMAN_WORLD} traversed={campaign.world.traversed} ready={ready}
              anchor={lastChapter ?? (campaign.finished ? GERMAN_FINISH : current)} label="German world map" world renderStop={(id) => {
                const waypoint = GERMAN_CHAPTERS[id];
                const view = campaign.chapters.get(id)!;
                return (
                  <button type="button" data-chapter-stop={id} data-status={view.status} className={styles.marker}
                    aria-label={`${waypoint.title}, ${view.status === "completed" ? "Cleared" : STATUS[view.status]}`}
                    onClick={() => showChapter(id)}>
                    <StatusIcon status={view.status} />
                    <span className={styles.markerTitle}>{waypoint.title}</span>
                    <span className={styles.markerCount}>{view.status === "completed" ? "Cleared" : <ClearCount count={view.count} target={waypoint.clearCount} />}</span>
                  </button>
                );
              }} />
          )}
        </div>

        <aside className={styles.guide} aria-label={chapter ? "Chapter clear requirements" : "How the world map works"}>
          <div className={styles.legend} aria-label="Map key">
            {(["completed", "available", "locked"] as const).map((status) => <span key={status}><StatusIcon status={status} />{STATUS[status]}</span>)}
          </div>
          {chapter && progress ? (
            <>
              {progress.status === "locked" ? <p>To open this chapter, clear {previous.map((id) => GERMAN_CHAPTERS[id].title).join(" or ")}.</p> : (
                <p>Finish a lesson to open every connected next stop. At a merge, completing either incoming route is enough.</p>
              )}
              <div>
                <h3>{progress.status === "completed" ? "Skills covered" : "Skills to cover"}</h3>
                <p>Complete one listed lesson per skill as part of the chapter count.</p>
                <ul className={styles.skills}>
                  {chapter.skills.map((skill, index) => (
                    <li key={skill.label} data-covered={progress.skills[index]}>
                      {progress.skills[index] ? <Check size={16} aria-hidden="true" /> : <Circle size={13} aria-hidden="true" />}
                      <div><span className="sr-only">{progress.skills[index] ? "Covered: " : "Not covered: "}</span><strong>{skill.label}</strong>
                        <small>Lessons {skill.lessons.join(" or ")}</small>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {progress.status === "completed" ? (
                milestones.length > 0 ? <div className={styles.links}>
                  <h3>Now open</h3>
                  {milestones.map((id) => <button key={id} type="button" onClick={() => showChapter(id)}>{GERMAN_CHAPTERS[id].title}<ArrowRight size={15} aria-hidden="true" /></button>)}
                </div> : <p>You reached the main finish. The other routes are still available to explore.</p>
              ) : null}
            </>
          ) : (
            <>
              <h3>{campaign.finished ? "Main finish reached" : "Choose where to go"}</h3>
              <p>{campaign.finished ? "Return to any open chapter to finish other paths." : "Open a chapter to see its lesson paths. Clear it by completing its lesson target and covering the listed skills. Unfinished paths stay available."}</p>
            </>
          )}
        </aside>
      </div>

      {chapter && selected !== null && selectedLesson && selectedStatus && (
        <ModalDialog aria-labelledby={dialogTitle} onClose={() => setSelected(null)} className={styles.lessonDialog}>
          <div className={styles.dialogTop}>
            <span><StatusIcon status={selectedStatus} /> Lesson {selected} · {STATUS[selectedStatus]}</span>
            <button type="button" aria-label="Close lesson details" onClick={() => setSelected(null)}><X size={20} /></button>
          </div>
          <h3 id={dialogTitle}>{selectedLesson.title}</h3>
          <p>{selectedLesson.plan}</p>
          {selectedStatus === "locked" ? (
            <p>{progress?.status === "locked" ? "Open this chapter first." : `To open this lesson, complete any one connected lesson: ${labelLessons(connectedStops(chapter.map, selected, "incoming"))}.`}</p>
          ) : (
            <>
              {nextStops.length > 0 && (
                <p>{selectedStatus === "completed" ? "Connected next lessons: " : "Finishing opens: "}{labelLessons(nextStops)}</p>
              )}
              <Link href={lessonHref("de", selected)} className={styles.action}
                onPointerEnter={() => prefetchLesson("de", selected)} onFocus={() => prefetchLesson("de", selected)}
                onClick={(event) => {
                  if (isModifiedClick(event)) return;
                  event.preventDefault();
                  setSelected(null);
                  openLesson("de", selected);
                }}>
                {selectedStatus === "completed" ? "Replay lesson" : "Start lesson"}<ArrowRight size={17} aria-hidden="true" />
              </Link>
            </>
          )}
        </ModalDialog>
      )}
    </section>
  );
}
