"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, Check, Clock, GitBranch, Lock, Star } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useViewStore, EMPTY_TRAIL_POSITION } from "@/lib/view-store";
import { hasSavedPosition, hasVisited } from "@/lib/scroll-memory";
import { useAppNavigation } from "@/lib/app-navigation";
import { buildTrailEdgePairs, buildTrailLayout, type TrailNode, type GateView } from "@/lib/trail-map";
import { getLanguageDefinition } from "@/data/languages";
import { useCourseRecommendation } from "@/lib/use-course-recommendation";
import { NextLessonBar } from "./NextLessonBar";
import { LessonNodeDrawer, GateDrawer } from "./LessonNodeDrawer";
import { prefetchLesson } from "@/lib/content-client";
import { TrailMapNode, GOLD_STAR } from "./TrailMapNode";


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
  const { openLesson } = useAppNavigation();
  const completedLessons = useAppStore((s) => s.completedLessons);
  const passGate = useAppStore((s) => s.passGate);
  const lessonProgress = useAppStore((s) => s.lessonProgress);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const storeHydrated = useAppStore((s) => s.storeHydrated);

  const { state, trailData } = useCourseRecommendation(activeLanguageId);
  const edgePairs = useMemo(() => buildTrailEdgePairs(trailData), [trailData]);

  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(640);
  const trailPosition = useViewStore(
    (s) => s.trailByLanguage[activeLanguageId] ?? EMPTY_TRAIL_POSITION
  );
  const setTrailPosition = useViewStore((s) => s.setTrailPosition);
  const selectedNodeId = trailPosition.nodeId;
  const selectedGateId = trailPosition.gateId;
  const selectNode = useCallback((node: TrailNode) => {
    prefetchLesson(activeLanguageId, node.id);
    setTrailPosition(activeLanguageId, { nodeId: node.id, gateId: null });
  }, [activeLanguageId, setTrailPosition]);

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
  const nodeById = useMemo(() => new Map(layout.nodes.map((n) => [n.id, n])), [layout]);
  const groups = useMemo(() => groupNodesByTopic(layout.nodes, layout.topicAnchors), [layout]);
  const [detailedTopics, setDetailedTopics] = useState<ReadonlySet<number>>(() => new Set<number>());
  const detailedTopicIds = useMemo(() => {
    const ids = new Set(detailedTopics);
    for (const group of groups) if (group.top < 1_000) ids.add(group.topicId);
    return ids;
  }, [groups, detailedTopics]);

  // Keep every lesson button usable; hydrate off-screen decorative details only
  // as their topic approaches the viewport.
  useEffect(() => {
    const container = wrapRef.current;
    if (!container) return;
    if (typeof IntersectionObserver === "undefined") {
      setDetailedTopics(new Set(groups.map((group) => group.topicId)));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) observer.unobserve(entry.target);
      setDetailedTopics((previous) => {
        let next: Set<number> | undefined;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = Number((entry.target as HTMLElement).dataset.trailTopic);
          if ((next ?? previous).has(id)) continue;
          (next ??= new Set(previous)).add(id);
        }
        return next ?? previous;
      });
    }, { rootMargin: "600px 0px" });
    for (const section of container.querySelectorAll('[data-trail-details="false"]')) observer.observe(section);
    return () => observer.disconnect();
  }, [groups]);

  // Open the map at the learner's current lesson (topic 1 sits at the bottom),
  // then glide upward whenever the recommendation advances. The first scroll
  // must also re-run after the ResizeObserver settles the real map width,
  // otherwise phones scroll to coordinates from the 640px placeholder layout.
  const autoScrollRef = useRef<{ id: number | null; width: number }>({ id: null, width: 0 });
  // Set when the first pass deliberately leaves the viewport alone (first
  // visit, or a restored scroll position); a later width re-measure must not
  // undo that decision.
  const suppressAutoScrollRef = useRef(false);
  useEffect(() => {
    if (!storeHydrated || state.recommendedId === null) return;
    // A lesson/atlas overlay is open: keep the trail exactly where the learner
    // left it instead of scrolling the hidden page to the next recommendation.
    if (useViewStore.getState().subView) return;
    const target = wrapRef.current?.querySelector<HTMLElement>(
      `[data-trail-node-id="${state.recommendedId}"]`
    );
    if (!target) return;
    const previous = autoScrollRef.current;
    const first = previous.id === null;
    const idChanged = previous.id !== state.recommendedId;
    const widthChanged = previous.width !== width;

    if (first) {
      // A brand-new learner should see the welcome hero, not land 9,000px
      // down the trail. Returning to the tab or reloading with a saved
      // position should also keep that position.
      const shouldKeepViewport =
        document.documentElement.dataset.returning !== "true" ||
        hasVisited("/") ||
        hasSavedPosition("/");
      autoScrollRef.current = { id: state.recommendedId, width };
      suppressAutoScrollRef.current = shouldKeepViewport;
      if (shouldKeepViewport) return;
    } else {
      autoScrollRef.current = { id: state.recommendedId, width };
      if (!idChanged) {
        // Width-only re-measures exist for the 640px placeholder layout. After
        // a deliberately skipped first pass they must not steal the viewport.
        if (suppressAutoScrollRef.current || !widthChanged) return;
      } else {
        suppressAutoScrollRef.current = false;
      }
    }
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
      .map((n) =>
        n.kind === "core"
          ? `topic ${n.topicId}`
          : n.kind === "story"
          ? `story ${n.label ?? ""}`
          : `“${n.title}”`
      );
    return `Unlocks when you complete: ${parts.join(", ")}.`;
  }, [selected, nodeById, edgePairs, state]);



  return (
    <div ref={wrapRef} className="relative w-full">
      <NextLessonBar />
      {/* Map legend — the next step is the fixed resume control below */}
      <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] font-mono text-[var(--sub-color)]">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-[var(--main-color)]" aria-hidden /> main topic
        </span>
        <span className="inline-flex items-center gap-1.5">
          <BookOpen className="w-3 h-3" aria-hidden /> required story
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

      <div className="overflow-x-auto">
      <div className="relative mx-auto overflow-hidden" style={{ width: layout.width, height: layout.height }}>
        {/* faint germanic watermark decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
          {layout.decorations.map((d, i) => groups.some((group) => detailedTopicIds.has(group.topicId) &&
            d.y >= group.top && d.y <= group.top + group.height) ? (
            <span
              key={i}
              className="absolute font-bold text-[var(--sub-color)]"
              style={{ left: d.x, top: d.y, fontSize: d.size, opacity: 0.05, transform: `rotate(${d.rotate}deg)` }}
            >
              {d.char}
            </span>
          ) : null)}
        </div>

        {/* dashed connectors (decoration only — the buttons carry semantics) */}
        <svg className="absolute inset-0 pointer-events-none" width={layout.width} height={layout.height} aria-hidden>
          {layout.edges.map(({ a, b }) => {
            const na = nodeById.get(a);
            const nb = nodeById.get(b);
            if (!detailedTopicIds.has(na?.topicId ?? -1) && !detailedTopicIds.has(nb?.topicId ?? -1)) return null;
            const ca = na ? { x: na.x + na.w / 2, y: na.y + na.h / 2 } : { x: 0, y: 0 };
            const cb = nb ? { x: nb.x + nb.w / 2, y: nb.y + nb.h / 2 } : { x: 0, y: 0 };
            const lit = state.litEdges.has(`${Math.min(a, b)}-${Math.max(a, b)}`);
            const isSpine = (kind: TrailNode["kind"] | undefined) =>
              kind === "core" || kind === "story";
            const isSide = !isSpine(na?.kind) || !isSpine(nb?.kind);

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
        {groups.map((group) => {
          const detailed = detailedTopicIds.has(group.topicId);
          return (
          <section
            key={group.topicId}
            data-trail-topic={group.topicId}
            data-trail-details={String(detailed)}
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
            {group.nodes.map((node) => {
              const view = state.nodes.get(node.id)!;
              return (
              <TrailMapNode
                key={node.id}
                node={node}
                sectionTop={group.top}
                status={view.status}
                star={view.star}
                detailed={detailed}
                hasProgress={Boolean(lessonProgress[node.id])}
                onSelect={selectNode}
              />
              );
            })}
          </section>
          );
        })}

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
              onClick={() =>
                setTrailPosition(activeLanguageId, { gateId: gate.id, nodeId: null })
              }
              aria-label={`${gate.title} star gate: ${stars} of ${gate.requiredStars} stars in topics ${gv?.fromTopic}–${gv?.toTopic} — ${open ? "open" : "closed"}`}
              title={`${gate.title} — ${stars}/${gate.requiredStars}★`}
              className={`absolute z-10 flex items-center justify-center gap-1.5 rounded-full font-mono text-[10px] transition duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--main-color)] ${
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
      </div>


      {selected && (
        <LessonNodeDrawer
          node={selected}
          view={state.nodes.get(selected.id)!}
          hasProgress={Boolean(lessonProgress[selected.id])}
          unlockHint={lockHint}
          onClose={() => setTrailPosition(activeLanguageId, { nodeId: null })}
          onStart={(id) => {
            setTrailPosition(activeLanguageId, { nodeId: null });
            openLesson(activeLanguageId, id);
          }}
        />
      )}

      {selectedGate && (
        <GateDrawer
          key={`${activeLanguageId}-${selectedGate.id}`}
          gate={selectedGate}
          view={state.gates.get(selectedGate.id)!}
          languageId={activeLanguageId}
          lessons={trailData.topics
            .filter((topic) => topic.id >= state.gates.get(selectedGate.id)!.fromTopic && topic.id <= selectedGate.afterTopic)
            .flatMap((topic) => [topic.core, ...(topic.stories ?? [])].map((lesson) => ({ id: lesson.id, title: lesson.title })))}
          reached={(() => {
            const topic = trailData.topics.find((item) => item.id === selectedGate.afterTopic);
            const last = topic?.stories?.[topic.stories.length - 1] ?? topic?.core;
            return last ? completedLessons.includes(last.id) : false;
          })()}
          onPass={() => passGate(selectedGate.id)}
          onClose={() => setTrailPosition(activeLanguageId, { gateId: null })}
        />
      )}
    </div>
  );
};

