"use client";

import React from "react";
import { Minus, Plus, RotateCcw, X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useViewStore } from "@/lib/view-store";
import { useCompendium } from "@/lib/content-client";
import { EMPTY_COMPENDIUM } from "@/data/empty-compendium";
import { buildMasterGraph, type MasterNode } from "@/lib/master-graph";
import { AtlasVocabularyTable } from "./AtlasVocabularyTable";

const WIDTH = 2600;
const HEIGHT = 2000;
const MIN_ZOOM = 0.1;
const LABEL_MIN_ZOOM = 0.5;
const MAX_ZOOM = 2.6;

const STROKE: Record<string, string> = {
  word: "var(--main-color)",
  phrase: "var(--text-color)",
  compound: "var(--main-color)",
  falsefriend: "var(--error-color)",
  insight: "var(--caret-color)",
};

const KIND_LABEL: Record<string, string> = {
  word: "word",
  phrase: "phrase",
  compound: "compound",
  falsefriend: "false friend",
  insight: "expression",
};

function NodeShape({ kind, x = 0, y = 0 }: { kind: MasterNode["kind"]; x?: number; y?: number }) {
  const props = { fill: STROKE[kind], fillOpacity: 0.25, stroke: STROKE[kind], strokeWidth: 1.25 };
  switch (kind) {
    case "word": return <circle cx={x} cy={y} r={5} {...props} />;
    case "phrase": return <path d={`M${x} ${y - 7}l7 7-7 7-7-7Z`} {...props} />;
    case "compound": return <rect x={x - 6} y={y - 6} width={12} height={12} rx={2} {...props} />;
    case "falsefriend": return <path d={`M${x} ${y - 7}l7 13h-14Z`} {...props} />;
    case "insight": return <path d={`M${x} ${y - 7}v14m-7-7h14m-12-5l10 10m0-10-10 10`} {...props} />;
  }
}

export const MasterConstellation: React.FC<{ view?: "visual" | "table" }> = ({ view = "visual" }) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const compendium = useCompendium(activeLanguageId);
  const data = compendium.data ?? EMPTY_COMPENDIUM;
  const wordMastery = useAppStore((s) => s.wordMastery);
  const openWordDrawer = useAppStore((s) => s.openWordDrawer);
  const setMasterPosition = useViewStore((s) => s.setMasterPosition);

  // The force layout uses hundreds of Math.hypot iterations. Bun's JSC and the
  // browser's V8 can diverge in the last bits, which produced a hydration
  // mismatch on every edge path. Build it on the client only, after mount.
  const graph = React.useMemo(
    () => (mounted ? buildMasterGraph(data) : null),
    [mounted, activeLanguageId, data]
  );
  const mastery = mounted ? wordMastery : {};

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const prevZoomRef = React.useRef(1);
  const [zoom, setZoom] = React.useState(1);
  const zoomRef = React.useRef(zoom);
  zoomRef.current = zoom;
  const [selectedNode, setSelectedNode] = React.useState<MasterNode | null>(null);

  const [query, setQuery] = React.useState("");
  const [visible, setVisible] = React.useState(60);
  const fitZoom = () => {
    const el = scrollRef.current;
    if (!el) return 1;
    return el.clientWidth < 700 ? Math.max(MIN_ZOOM, el.clientWidth / WIDTH) : 1;
  };

  // Center the viewport on the graph (which is bunched in the middle). On a
  // phone, start fitted to the poster width instead of showing 15% of it.
  // A remembered user zoom wins over the auto-fit; the fit value itself is
  // never persisted, so a desktop zoom is not restored onto a phone.
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const fit = fitZoom();
    const remembered = useViewStore.getState().masterByLanguage[activeLanguageId]?.zoom ?? null;
    const initial = remembered === null ? fit : Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, remembered));
    prevZoomRef.current = initial;
    setZoom(initial);
    requestAnimationFrame(() => {
      const current = scrollRef.current;
      if (!current) return;
      current.scrollLeft = (current.scrollWidth - current.clientWidth) / 2;
      current.scrollTop = (current.scrollHeight - current.clientHeight) / 2;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph, view]);

  // Restore the remembered labelled node once the graph exists.
  React.useEffect(() => {
    if (!graph) return;
    const nodeId = useViewStore.getState().masterByLanguage[activeLanguageId]?.nodeId ?? null;
    setSelectedNode(nodeId ? graph.nodes.find((node) => node.id === nodeId) ?? null : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph]);

  // Keep the same graph point under the viewport centre while zooming.
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const previous = prevZoomRef.current;
    if (previous === zoom) return;
    const centreX = (el.scrollLeft + el.clientWidth / 2) / previous;
    const centreY = (el.scrollTop + el.clientHeight / 2) / previous;
    el.scrollLeft = centreX * zoom - el.clientWidth / 2;
    el.scrollTop = centreY * zoom - el.clientHeight / 2;
    prevZoomRef.current = zoom;
  }, [zoom, view]);

  // Pinch-to-zoom while keeping native one-finger panning. touch-action is
  // restricted to pan gestures on the container, so the browser does not
  // hijack the two-finger gesture for page zoom.
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let pinch: { distance: number; zoom: number } | null = null;
    const distance = (touches: TouchList) => {
      const [a, b] = [touches[0], touches[1]];
      return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    };
    const onTouchStart = (event: TouchEvent) => {
      if (event.touches.length !== 2) return;
      pinch = { distance: distance(event.touches), zoom: zoomRef.current };
    };
    const onTouchMove = (event: TouchEvent) => {
      if (!pinch || event.touches.length !== 2) return;
      event.preventDefault();
      const ratio = distance(event.touches) / Math.max(1, pinch.distance);
      const next = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number((pinch.zoom * ratio).toFixed(2))));
      setZoom((previous) => (previous === next ? previous : next));
    };
    const onTouchEnd = (event: TouchEvent) => {
      if (!pinch || event.touches.length >= 2) return;
      pinch = null;
      setMasterPosition(activeLanguageId, { zoom: zoomRef.current });
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, [activeLanguageId, graph, setMasterPosition, view]);

  const selectNode = (node: MasterNode | null) => {
    setSelectedNode(node);
    setMasterPosition(activeLanguageId, { nodeId: node?.id ?? null });
  };

  // Escape closes the details panel; the close button is not the only way out.
  React.useEffect(() => {
    if (!selectedNode) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") selectNode(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNode]);

  const applyZoom = (next: number) => {
    const clamped = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number(next.toFixed(2))));
    setZoom(clamped);
    setMasterPosition(activeLanguageId, { zoom: clamped });
  };

  const changeZoom = (delta: number) => {
    applyZoom(zoom + delta);
  };

  const resetZoom = () => applyZoom(fitZoom());

  if (compendium.error) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-8 text-center font-mono" role="alert">
        <div className="space-y-3">
          <p className="text-xs text-[var(--sub-color)]">atlas data could not be loaded.</p>
          <button
            type="button"
            onClick={compendium.retry}
            className="px-3 py-1.5 rounded bg-[var(--main-color)] text-[var(--bg-color)] font-bold text-xs"
          >
            retry
          </button>
        </div>
      </div>
    );
  }

  if (!compendium.data) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <p className="text-xs font-mono text-[var(--sub-color)]" role="status">
          loading the master web…
        </p>
      </div>
    );
  }

  if (!data.wordList.length) {
    return (
      <p className="text-xs font-mono text-[var(--sub-color)] p-8 text-center">
        The master web arrives with the {activeLanguageId} trail.
      </p>
    );
  }

  if (!graph) {
    return (
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <p className="text-xs font-mono text-[var(--sub-color)]" role="status">
          Laying out the master web…
        </p>
      </div>
    );
  }

  if (view === "table") {
    const needle = query.trim().toLowerCase();
    const words = data.wordList.filter((word) => !needle || `${word.target_word} ${word.english_meaning} ${word.english_cognate}`.toLowerCase().includes(needle));
    const otherNodes = graph.nodes.filter((node) => node.kind !== "word" && (!needle || `${node.label} ${node.sub}`.toLowerCase().includes(needle)));
    return (
      <div className="absolute inset-0 overflow-auto px-3 pt-48 sm:pt-52 pb-6 space-y-4">
        <label className="block text-xs font-mono">
          Filter master web
          <input value={query} onChange={(event) => { setQuery(event.target.value); setVisible(60); }} className="mt-2 block min-h-11 w-full rounded border border-[var(--sub-color)]/30 bg-[var(--bg-color)] px-3" />
        </label>
        <AtlasVocabularyTable words={words.slice(0, visible)} caption={`Master web vocabulary: showing ${Math.min(visible, words.length)} of ${words.length} words.`} />
        <h2 className="text-sm font-bold">Phrases, compounds, false friends and expressions</h2>
        <ul className="space-y-2">
          {otherNodes.slice(0, visible).map((node) => (
            <li key={node.id}>
              <button type="button" onClick={() => selectNode(node)} className="min-h-11 w-full rounded border border-[var(--sub-color)]/25 p-3 text-left text-xs">
                <span className="font-bold">{KIND_LABEL[node.kind]}: {node.label}</span>
                <span className="block pt-1 text-[var(--sub-color)]">{node.sub}</span>
              </button>
            </li>
          ))}
        </ul>
        {(words.length > visible || otherNodes.length > visible) && (
          <button type="button" onClick={() => setVisible((count) => count + 60)} className="min-h-11 rounded border border-[var(--sub-color)]/30 px-4 text-xs font-mono">show 60 more</button>
        )}
        {selectedNode && <p role="status" className="text-xs">{selectedNode.label}: {selectedNode.sub}</p>}
      </div>
    );
  }

  const counts = { word: 0, phrase: 0, compound: 0, falsefriend: 0, insight: 0 };
  for (const node of graph.nodes) counts[node.kind]++;

  return (
    <div className="absolute inset-0 flex flex-col font-sans">
      <div
        ref={scrollRef}
        className="flex flex-1 overflow-auto overscroll-contain bg-[var(--bg-color)]"
        style={{ touchAction: "pan-x pan-y" }}
        role="region"
        aria-label="Master Web graph — drag to explore, pinch or use the zoom controls to change scale"
      >
        <div className="m-auto shrink-0" style={{ width: WIDTH * zoom, height: HEIGHT * zoom, position: "relative" }}>
          <div
            style={{
              width: WIDTH,
              height: HEIGHT,
              position: "absolute",
              left: 0,
              top: 0,
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
            }}
          >
            <svg width={WIDTH} height={HEIGHT} className="block">
              {graph.edgesByKind.map(([kind, d]) => (
                <path
                  key={kind}
                  d={d}
                  stroke={kind === "family" ? "var(--sub-color)" : STROKE[kind]}
                  strokeOpacity={kind === "family" ? 0.07 : 0.28}
                  strokeWidth={kind === "family" ? 0.9 : 1.25}
                  fill="none"
                />
              ))}
              {graph.nodes.map((node) => {
                if (node.kind === "word") {
                  const masteryState = mastery[node.wordId ?? ""];
                  return (
                    <g
                      key={node.id}
                      className="atlas-graph-node cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--main-color)]"
                      tabIndex={0}
                      onFocus={() => scrollRef.current?.scrollTo({ left: node.x * zoom - scrollRef.current.clientWidth / 2, top: node.y * zoom - scrollRef.current.clientHeight / 2, behavior: "auto" })}
                      role="button"
                      aria-label={node.sub ? `${node.label} — ${node.sub}` : node.label}
                      onClick={() => node.wordId && openWordDrawer(node.wordId)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          if (node.wordId) openWordDrawer(node.wordId);
                        }
                      }}
                    >
                      {/* Invisible hit target: the visible dot is only ~8px. */}
                      <circle className="atlas-focus-ring" vectorEffect="non-scaling-stroke" cx={Math.round(node.x)} cy={Math.round(node.y)} r={22 / zoom} fill="transparent" />
                      <circle
                        cx={Math.round(node.x)}
                        cy={Math.round(node.y)}
                        r={masteryState === "mastered" ? 6 : masteryState ? 5 : 4}
                        fill={
                          masteryState === "mastered"
                            ? "var(--main-color)"
                            : masteryState === "encountered"
                            ? "var(--text-color)"
                            : "var(--bg-color)"
                        }
                        stroke="var(--main-color)"
                        strokeOpacity={0.6}
                        strokeWidth={1.25}
                        className="hover:stroke-[var(--text-color)]"
                      >
                        <title>{node.sub ? `${node.label} — ${node.sub}` : node.label}</title>
                      </circle>
                    </g>
                  );
                }
                const color = STROKE[node.kind];
                const anchorEnd = node.x > WIDTH - 220;
                return (
                  <g
                    key={node.id}
                    aria-label={`${node.kind}: ${node.label}${node.sub ? ` — ${node.sub}` : ""}`}
                    className="atlas-graph-node cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--main-color)]"
                    tabIndex={0}
                    onFocus={() => scrollRef.current?.scrollTo({ left: node.x * zoom - scrollRef.current.clientWidth / 2, top: node.y * zoom - scrollRef.current.clientHeight / 2, behavior: "auto" })}
                    role="button"
                    onClick={() => selectNode(node)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        selectNode(node);
                      }
                    }}
                  >
                    <circle className="atlas-focus-ring" vectorEffect="non-scaling-stroke" cx={Math.round(node.x)} cy={Math.round(node.y)} r={22 / zoom} fill="transparent" />
                    <NodeShape kind={node.kind} x={Math.round(node.x)} y={Math.round(node.y)} />
                    {zoom >= LABEL_MIN_ZOOM && (
                      <text
                        x={Math.round(node.x) + (anchorEnd ? -10 : 10)}
                        y={Math.round(node.y) + 4}
                        textAnchor={anchorEnd ? "end" : "start"}
                        fontSize={10}
                        fill={color}
                        fontFamily="monospace"
                      >
                        {node.label}
                      </text>
                    )}
                    <title>{node.sub ? `${node.label} — ${node.sub}` : node.label}</title>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* Legend + totals */}
      <div
        className={`absolute bottom-20 left-3 right-3 sm:bottom-3 sm:right-auto z-10 max-w-[calc(100vw-1.5rem)] sm:max-w-none ${
          selectedNode ? "hidden sm:block" : ""
        }`}
      >
        <div className="rounded-lg bg-[var(--sub-alt-color)]/90 backdrop-blur border border-[var(--sub-color)]/20 px-3 py-1.5 text-[11px] font-mono text-[var(--sub-color)] leading-relaxed">
          <span className="text-[10px] uppercase tracking-wider text-[var(--sub-color)]/80">legend</span>
          {zoom < LABEL_MIN_ZOOM && (
            <span className="text-[10px] text-[var(--main-color)]"> · zoom in for labels</span>
          )}{" "}
          {(Object.keys(counts) as MasterNode["kind"][]).map((kind) => (
            <React.Fragment key={kind}>
              <span className="inline-flex items-center gap-1" style={{ color: STROKE[kind] }}>
                <svg aria-hidden="true" width={16} height={16} viewBox="-8 -8 16 16"><NodeShape kind={kind} /></svg>
                {counts[kind]} {kind === "falsefriend" ? "false friends" : kind === "insight" ? "expressions" : `${kind}s`}
              </span>{" · "}
            </React.Fragment>
          ))}
          {graph.edges.length} links
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1 rounded-lg bg-[var(--sub-alt-color)]/90 backdrop-blur border border-[var(--sub-color)]/20 p-1 font-mono text-[11px]">
        <button
          type="button"
          onClick={() => changeZoom(-0.2)}
          disabled={zoom <= MIN_ZOOM}
          className="inline-flex h-11 w-11 items-center justify-center rounded hover:bg-[var(--bg-color)] text-[var(--sub-color)] hover:text-[var(--text-color)] disabled:opacity-30 transition cursor-pointer"
          aria-label="Zoom out"
          title="Zoom out"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="min-w-[42px] text-center text-[var(--text-color)]">{Math.round(zoom * 100)}%</span>
        <button
          type="button"
          onClick={() => changeZoom(0.2)}
          disabled={zoom >= MAX_ZOOM}
          className="inline-flex h-11 w-11 items-center justify-center rounded hover:bg-[var(--bg-color)] text-[var(--sub-color)] hover:text-[var(--text-color)] disabled:opacity-30 transition cursor-pointer"
          aria-label="Zoom in"
          title="Zoom in"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={resetZoom}
          className="inline-flex h-11 w-11 items-center justify-center rounded hover:bg-[var(--bg-color)] text-[var(--sub-color)] hover:text-[var(--text-color)] transition cursor-pointer"
          aria-label="Fit the graph to the screen"
          title="Fit graph"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Details for labelled nodes */}
      {selectedNode && (
        <div className="absolute bottom-20 right-3 z-20 w-72 max-w-[calc(100vw-1.5rem)] rounded-lg bg-[var(--sub-alt-color)]/95 backdrop-blur border border-[var(--sub-color)]/25 p-3 shadow-lg space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--sub-color)]">
                {KIND_LABEL[selectedNode.kind] ?? selectedNode.kind}
              </div>
              <div className="text-sm font-bold text-[var(--text-color)] break-words">{selectedNode.label}</div>
            </div>
            <button
              type="button"
              onClick={() => selectNode(null)}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded text-[var(--sub-color)] hover:text-[var(--text-color)] transition cursor-pointer"
              aria-label="Close node details"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          {selectedNode.sub && (
            <p className="text-xs text-[var(--sub-color)] leading-relaxed">{selectedNode.sub}</p>
          )}
        </div>
      )}
    </div>
  );
};
