"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, Check, Clock, GitBranch, Lock, Star } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { buildTrailEdgePairs, buildTrailLayout, getTrailState, GERMAN_TRAIL_DATA, type TrailData, type TrailNode, type NodeStatus, type GateView } from "@/lib/trail-map";
import { getLanguageDefinition } from "@/data/languages";
import { getLanguageContent } from "@/data/language-content";
import { lessonHref } from "@/lib/routes";
import { LessonNodeDrawer, GateDrawer } from "./LessonNodeDrawer";

const GOLD_STAR = "#eab308";
const PURPLE_STAR = "#a78bfa";

interface NodeGroup {
  topicId: number;
  anchor: { x: number; y: number; title: string } | null;
  nodes: TrailNode[];
  top: number;
  height: number;
}

/** Bundle nodes into one absolutely-positioned section per topic so
 *  `content-visibility` can skip off-screen clusters (cheap windowing). */
const groupNodesByTopic = (
  nodes: TrailNode[],
  anchors: Array<{ topicId: number; x: number; y: number; title: string }>
): NodeGroup[] => {
  const byTopic = new Map<number, TrailNode[]>();
  for (const node of nodes) {
    if (!byTopic.has(node.topicId)) byTopic.set(node.topicId, []);
    byTopic.get(node.topicId)!.push(node);
  }
  const anchorById = new Map(anchors.map((a) => [a.topicId, a]));
  const topicIds = new Set<number>([...byTopic.keys(), ...anchorById.keys()]);
  return [...topicIds].map((topicId) => {
    const groupNodes = byTopic.get(topicId) ?? [];
    const anchor = anchorById.get(topicId) ?? null;
    const top = Math.min(...groupNodes.map((n) => n.y), anchor?.y ?? Infinity) - 46;
    // The anchor sits *below* its cluster now that the trail climbs upward,
    // so the section box must grow to keep the label inside its paint bounds.
    const bottom = Math.max(...groupNodes.map((n) => n.y + n.h), anchor ? anchor.y + 34 : 0) + 12;
    return {
      topicId,
      anchor,
      nodes: groupNodes,
      top,
      height: bottom - top,
    };
  });
};

export const TrailMap: React.FC = () => {
  const router = useRouter();
  const completedLessons = useAppStore((s) => s.completedLessons);
  const lessonStars = useAppStore((s) => s.lessonStars);
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const storeHydrated = useAppStore((s) => s.storeHydrated);

  // the trail graph is language-scoped: German data by default, the French
  // bundle when French is active (see lib/trail-map.ts TrailData)
  const trailData: TrailData = useMemo(() => {
    const content = getLanguageContent(activeLanguageId);
    if (content.topics.length === 0) return GERMAN_TRAIL_DATA;
    return {
      topics: content.topics,
      branches: content.trailBranches,
      gates: content.trailGates,
      totalTopics: content.totalTopics,
    };
  }, [activeLanguageId]);
  const edgePairs = useMemo(() => buildTrailEdgePairs(trailData), [trailData]);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(640);
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);
  const [selectedGateId, setSelectedGateId] = useState<number | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w && Math.abs(w - width) > 2) setWidth(w);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  const decoChars = getLanguageDefinition(activeLanguageId).decoChars;
  const layout = useMemo(() => buildTrailLayout(width, trailData, decoChars), [width, trailData, decoChars]);
  const state = useMemo(
    () => getTrailState(completedLessons, lessonStars, layout.nodes, trailData),
    [completedLessons, lessonStars, layout, trailData]
  );
  const nodeById = useMemo(() => new Map(layout.nodes.map((n) => [n.id, n])), [layout]);
  const groups = useMemo(() => groupNodesByTopic(layout.nodes, layout.topicAnchors), [layout]);

  // Open the map at the learner's current lesson (topic 1 sits at the bottom),
  // then glide upward whenever the recommendation advances. The first scroll
  // must also re-run after the ResizeObserver settles the real map width,
  // otherwise phones scroll to coordinates from the 640px placeholder layout.
  const autoScrollRef = useRef<{ id: number | null; width: number }>({ id: null, width: 0 });
  useEffect(() => {
    if (!storeHydrated || state.recommendedId === null) return;
    const target = wrapRef.current?.querySelector<HTMLElement>(
      `[data-trail-node-id="${state.recommendedId}"]`
    );
    if (!target) return;
    const previous = autoScrollRef.current;
    const first = previous.id === null;
    const idChanged = previous.id !== state.recommendedId;
    const widthChanged = previous.width !== width;
    autoScrollRef.current = { id: state.recommendedId, width };
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior =
      !first && idChanged && !widthChanged && !reduceMotion ? "smooth" : "auto";
    const frame = requestAnimationFrame(() => {
      target.scrollIntoView({ behavior, block: "center" });
    });
    return () => cancelAnimationFrame(frame);
  }, [storeHydrated, state.recommendedId, width]);

  const recommended = state.recommendedId ? nodeById.get(state.recommendedId) : null;
  const selected = selectedNodeId !== null ? nodeById.get(selectedNodeId) ?? null : null;
  const selectedGate = selectedGateId !== null ? layout.gates.find((g) => g.id === selectedGateId) ?? null : null;

  const lockHint = useMemo(() => {
    if (!selected) return null;
    const neighborIds = edgePairs
      .filter((e) => e.a === selected.id || e.b === selected.id)
      .map((e) => (e.a === selected.id ? e.b : e.a));
    // Only point at neighbours that can actually be played right now.
    const availableNeighborIds = neighborIds.filter(
      (id) => state.nodes.get(id)?.status !== "locked"
    );
    if (availableNeighborIds.length === 0) {
      return "This lesson is still ahead on the trail. Complete the previous topic to unlock it.";
    }
    const parts = availableNeighborIds
      .map((id) => nodeById.get(id))
      .filter((n): n is TrailNode => Boolean(n))
      .map((n) => (n.kind === "core" ? `topic ${n.topicId}` : `“${n.title}”`));
    return `Unlocks when you complete: ${parts.join(", ")}.`;
  }, [selected, nodeById, edgePairs, state]);

  const edgeCenter = useCallback(
    (id: number) => {
      const n = nodeById.get(id);
      return n ? { x: n.x + n.w / 2, y: n.y + n.h / 2 } : { x: 0, y: 0 };
    },
    [nodeById]
  );

  const upNextLabel = recommended
    ? recommended.kind === "core"
      ? `Topic ${recommended.topicId}`
      : recommended.kind === "sprig"
      ? `Extra lesson · Topic ${recommended.topicId}`
      : `Support branch · Topic ${recommended.topicId}`
    : "Trail complete";
  const recommendedProgress = recommended ? lessonProgress[recommended.id] : undefined;
  const hasAnyProgress =
    completedLessons.length > 0 || Object.keys(lessonProgress).length > 0;

  return (
    <div ref={wrapRef} className="relative w-full">
      {/* Map legend — the next step is the fixed resume control below */}
      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-mono text-[var(--sub-color)]">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-[var(--main-color)]" aria-hidden /> main topic
        </span>
        <span className="inline-flex items-center gap-1.5">
          <BookOpen className="w-3 h-3" aria-hidden /> extra practice
        </span>
        <span className="inline-flex items-center gap-1.5">
          <GitBranch className="w-3 h-3" aria-hidden /> support branch
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Lock className="w-3 h-3" aria-hidden /> locked
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Clock className="w-3 h-3" aria-hidden /> coming soon
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Star className="w-3 h-3" style={{ color: GOLD_STAR, fill: GOLD_STAR }} aria-hidden /> star gate
        </span>
      </div>

      <div className="relative mx-auto" style={{ width: layout.width, height: layout.height, maxWidth: "100%" }}>
        {/* faint germanic watermark decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
          {layout.decorations.map((d, i) => (
            <span
              key={i}
              className="absolute font-bold text-[var(--sub-color)]"
              style={{ left: d.x, top: d.y, fontSize: d.size, opacity: 0.05, transform: `rotate(${d.rotate}deg)` }}
            >
              {d.char}
            </span>
          ))}
        </div>

        {/* dashed connectors (decoration only — the buttons carry semantics) */}
        <svg className="absolute inset-0 pointer-events-none" width={layout.width} height={layout.height} aria-hidden>
          {layout.edges.map(({ a, b }) => {
            const ca = edgeCenter(a);
            const cb = edgeCenter(b);
            const lit = state.litEdges.has(`${Math.min(a, b)}-${Math.max(a, b)}`);
            const na = nodeById.get(a);
            const nb = nodeById.get(b);
            const isSide = na?.kind !== "core" || nb?.kind !== "core";

            if (isSide) {
              // Side sprig/branch: a curved connector bowed off to the side so it
              // clearly reads as a branch hanging off the main spine.
              const mx = (ca.x + cb.x) / 2;
              const my = (ca.y + cb.y) / 2;
              const dx = cb.x - ca.x;
              const dy = cb.y - ca.y;
              const len = Math.hypot(dx, dy) || 1;
              // bow perpendicular to the segment — the branch visibly swings
              // out to the side instead of following a straight diagonal
              const bow = Math.min(70, Math.max(30, len * 0.35));
              const nx = -dy / len;
              const ny = dx / len;
              const cpx = mx + nx * bow;
              const cpy = my + ny * bow;
              return (
                <path
                  key={`${a}-${b}`}
                  d={`M ${ca.x} ${ca.y} Q ${cpx} ${cpy} ${cb.x} ${cb.y}`}
                  fill="none"
                  stroke="var(--text-color)"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeDasharray="1 8"
                  opacity={lit ? 0.38 : 0.16}
                  style={{ transition: "opacity 400ms" }}
                />
              );
            }

            return (
              <line
                key={`${a}-${b}`}
                x1={ca.x}
                y1={ca.y}
                x2={cb.x}
                y2={cb.y}
                stroke="var(--text-color)"
                strokeWidth={3.25}
                strokeLinecap="round"
                strokeDasharray="1 9"
                opacity={lit ? 0.55 : 0.24}
                style={{ transition: "opacity 400ms" }}
              />
            );
          })}
        </svg>

        {/* topic signposts + nodes, one section per topic for content-visibility windowing */}
        {groups.map((group) => (
          <section
            key={group.topicId}
            className="trail-section absolute left-0 w-full"
            style={{ top: group.top, height: group.height }}
          >
            {group.anchor && (
              <div
                className="absolute text-center"
                style={{
                  left: Math.max(4, group.anchor.x - 135),
                  width: Math.min(270, layout.width - 8),
                  top: group.anchor.y - group.top,
                }}
              >
                <span className="font-mono text-[12px] leading-tight text-[var(--text-color)]/75">
                  <span className="text-[var(--main-color)] font-bold">topic {group.topicId}</span>
                  {" — "}
                  {group.anchor.title}
                </span>
              </div>
            )}
            {group.nodes.map((node) => (
              <MapNode
                key={node.id}
                node={node}
                sectionTop={group.top}
                view={state.nodes.get(node.id)!}
                isRecommended={state.recommendedId === node.id}
                hasProgress={Boolean(lessonProgress[node.id])}
                onClick={() => setSelectedNodeId(node.id)}
              />
            ))}
          </section>
        ))}

        {/* star-gate checkpoint pills on the spine */}
        {layout.gates.map((gate) => {
          const gv: GateView | undefined = state.gates.get(gate.id);
          const open = gv?.open ?? false;
          const stars = gv?.stars ?? 0;
          const shortName = gate.title.replace(/^The /, "");
          return (
            <button
              key={gate.id}
              type="button"
              onClick={() => setSelectedGateId(gate.id)}
              aria-label={`${gate.title} star gate: ${stars} of ${gate.requiredStars} stars in topics ${gv?.fromTopic}–${gv?.toTopic} — ${open ? "open" : "closed"}`}
              title={`${gate.title} — ${stars}/${gate.requiredStars}★`}
              className={`absolute z-10 flex items-center justify-center gap-1.5 rounded-full font-mono text-[10px] transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--main-color)] ${
                open
                  ? "bg-[var(--main-color)] border-2 border-[var(--main-color)] text-[var(--bg-color)] shadow-sm"
                  : "bg-[var(--sub-alt-color)] border border-dashed border-[var(--text-color)]/35 text-[var(--text-color)]/80 hover:border-[var(--main-color)]/60"
              }`}
              style={{ left: gate.x, top: gate.y, width: 168, height: 40 }}
            >
              {open ? <Check className="w-3 h-3 shrink-0" /> : <Lock className="w-3 h-3 shrink-0" />}
              <span className="truncate max-w-[86px]">{shortName}</span>
              <span className={open ? "font-bold" : "font-bold text-[var(--text-color)]"}>
                ★ {stars}/{gate.requiredStars}
              </span>
            </button>
          );
        })}

        {/* the selector ring on the recommended node */}
        {recommended && (
          <div
            className="trail-selector absolute pointer-events-none z-10 rounded-2xl border-[2.5px] border-[var(--main-color)]"
            style={{
              width: recommended.w + 16,
              height: recommended.h + 16,
              left: recommended.x - 8,
              top: recommended.y - 8,
              transition: "top 500ms ease, left 500ms ease",
            }}
            aria-hidden
          />
        )}
      </div>

      {recommended && (
        <div className="fixed bottom-[5.25rem] left-3 z-30 xl:bottom-6 xl:left-4">
          <button
            type="button"
            onClick={() => router.push(lessonHref(activeLanguageId, recommended.id))}
            className="inline-flex items-center gap-2 rounded-full border border-[var(--sub-color)]/30 bg-[var(--bg-color)]/95 px-3.5 py-2 font-mono text-xs shadow-lg shadow-black/10 backdrop-blur transition hover:border-[var(--main-color)] cursor-pointer"
            aria-label={`${
              recommendedProgress ? "Resume" : hasAnyProgress ? "Continue" : "Start"
            } ${upNextLabel}: ${recommended.title}`}
            title={`${upNextLabel} — ${recommended.title}`}
          >
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--main-color)]">
              {recommendedProgress ? "resume" : hasAnyProgress ? "continue" : "start"}
            </span>
            <span className="truncate font-semibold text-[var(--text-color)]">{upNextLabel}</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-[var(--main-color)]" />
          </button>
        </div>
      )}

      {selected && (
        <LessonNodeDrawer
          node={selected}
          view={state.nodes.get(selected.id)!}
          hasProgress={Boolean(lessonProgress[selected.id])}
          unlockHint={lockHint}
          onClose={() => setSelectedNodeId(null)}
          onStart={(id) => {
            setSelectedNodeId(null);
            router.push(lessonHref(activeLanguageId, id));
          }}
        />
      )}

      {selectedGate && (
        <GateDrawer
          gate={selectedGate}
          view={state.gates.get(selectedGate.id)!}
          onClose={() => setSelectedGateId(null)}
        />
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */

interface MapNodeProps {
  node: TrailNode;
  sectionTop: number;
  view: { status: NodeStatus; star?: "gold" | "purple"; gate?: { id: number; title: string } };
  isRecommended: boolean;
  hasProgress: boolean;
  onClick: () => void;
}

const MapNode: React.FC<MapNodeProps> = ({ node, sectionTop, view, hasProgress, onClick }) => {
  const { status, star } = view;
  const completed = status === "completed";
  const locked = status === "locked";
  const unwritten = locked && !node.authored;

  const label =
    `${node.kind === "core" ? `Topic ${node.topicId}` : node.kind === "sprig" ? "Extra lesson" : "Support branch"}: ${node.title} — ` +
    (completed
      ? `completed${star === "purple" ? " with a purple star" : ""}`
      : locked
      ? unwritten
        ? "locked, content being written"
        : "locked"
      : "available to play");

  const statusStyle = completed
    ? "bg-[var(--main-color)] border-[var(--main-color)] text-[var(--bg-color)] shadow-sm"
    : locked
    ? unwritten
      ? "bg-[var(--bg-color)] border border-dashed border-[var(--text-color)]/25 text-[var(--text-color)]/55 cursor-not-allowed"
      : "bg-[var(--bg-color)] border border-dashed border-[var(--text-color)]/35 text-[var(--text-color)]/80"
    : "bg-[var(--sub-alt-color)] border border-[var(--text-color)]/25 text-[var(--text-color)] hover:border-[var(--main-color)] hover:-translate-y-0.5";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={node.title}
      data-trail-node-id={node.id}
      className={`absolute flex items-center justify-center text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--main-color)] ${statusStyle} ${
        locked ? "cursor-default" : "cursor-pointer"
      }`}
      style={{
        left: node.x,
        top: node.y - sectionTop,
        width: node.w,
        height: node.h,
        borderRadius: node.kind === "core" ? 14 : 12,
        borderWidth: completed ? 2 : 1,
        animation: status === "available" && !hasProgress ? "trail-node-pop 400ms ease both" : undefined,
      }}
    >
      {node.kind === "core" && (
        <span className="flex items-center gap-2 px-2.5 w-full">
          <span
            className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-[11px] font-bold shrink-0 ${
              completed
                ? "bg-[var(--bg-color)]/25 text-[var(--bg-color)]"
                : "bg-[var(--bg-color)] text-[var(--text-color)] border border-[var(--sub-color)]/30"
            }`}
          >
            {completed ? "✓" : node.topicId}
          </span>
          <span className="text-[12px] font-semibold leading-tight line-clamp-2">{node.title}</span>
        </span>
      )}

      {node.kind === "sprig" && (
        <span className="flex flex-col items-center gap-0.5">
          <BookOpen className="w-3.5 h-3.5" />
          <span className="font-mono text-[11px] font-bold">{node.id % 100}</span>
        </span>
      )}

      {node.kind === "branch" && (
        <span className="flex items-center gap-1.5 px-2 w-full min-w-0">
          <GitBranch className="w-3 h-3 shrink-0 opacity-70" />
          <span className="text-[11px] font-semibold leading-tight line-clamp-2">{node.title}</span>
        </span>
      )}

      {completed && (
        <span
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center border-2"
          style={{ background: star === "purple" ? PURPLE_STAR : GOLD_STAR, borderColor: "var(--bg-color)" }}
          aria-hidden
        >
          <Star className="w-2.5 h-2.5 text-[var(--bg-color)]" fill="var(--bg-color)" strokeWidth={0} />
        </span>
      )}

      {locked && (
        <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[var(--bg-color)] border border-[var(--text-color)]/35 flex items-center justify-center">
          <Lock className="w-2.5 h-2.5 text-[var(--sub-color)]" />
        </span>
      )}
    </button>
  );
};
