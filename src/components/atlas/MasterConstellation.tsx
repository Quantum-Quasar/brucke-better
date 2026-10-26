"use client";

import React from "react";
import { Minus, Plus, RotateCcw, X } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { useCompendium } from "@/lib/content-client";
import { EMPTY_COMPENDIUM } from "@/data/empty-compendium";
import { buildMasterGraph, type MasterNode } from "@/lib/master-graph";

const WIDTH = 2600;
const HEIGHT = 2000;
const MIN_ZOOM = 0.1;
const LABEL_MIN_ZOOM = 0.5;
const MAX_ZOOM = 2.6;

const STROKE: Record<string, string> = {
  word: "var(--main-color)",
  phrase: "#b48ead",
  compound: "#d08770",
  falsefriend: "#bf616a",
  insight: "#88c0d0",
};

const KIND_LABEL: Record<string, string> = {
  word: "word",
  phrase: "phrase",
  compound: "compound",
  falsefriend: "false friend",
  insight: "expression",
};

export const MasterConstellation: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  const activeLanguageId = useAppStore((s) => s.activeLanguageId);
  const compendium = useCompendium(activeLanguageId);
  const data = compendium.data ?? EMPTY_COMPENDIUM;
  const wordMastery = useAppStore((s) => s.wordMastery);
  const openWordDrawer = useAppStore((s) => s.openWordDrawer);

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
  const [selectedNode, setSelectedNode] = React.useState<MasterNode | null>(null);

  const fitZoom = () => {
    const el = scrollRef.current;
    if (!el) return 1;
    return el.clientWidth < 700 ? Math.max(MIN_ZOOM, el.clientWidth / WIDTH) : 1;
  };

  // Center the viewport on the graph (which is bunched in the middle). On a
  // phone, start fitted to the poster width instead of showing 15% of it.
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const fit = fitZoom();
    prevZoomRef.current = fit;
    setZoom(fit);
    setSelectedNode(null);
    requestAnimationFrame(() => {
      const current = scrollRef.current;
      if (!current) return;
      current.scrollLeft = (current.scrollWidth - current.clientWidth) / 2;
      current.scrollTop = (current.scrollHeight - current.clientHeight) / 2;
    });
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
  }, [zoom]);

  // Escape closes the details panel; the close button is not the only way out.
  React.useEffect(() => {
    if (!selectedNode) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedNode(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedNode]);

  const changeZoom = (delta: number) => {
    setZoom((value) => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Number((value + delta).toFixed(1)))));
  };

  const resetZoom = () => setZoom(fitZoom());

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

  const counts = { word: 0, phrase: 0, compound: 0, falsefriend: 0, insight: 0 };
  for (const node of graph.nodes) counts[node.kind]++;

  return (
    <div className="absolute inset-0 flex flex-col font-sans">
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto bg-[var(--bg-color)]"
        role="region"
        aria-label="Master Web graph — scroll to explore, use the zoom controls to change scale"
      >
        <div style={{ width: WIDTH * zoom, height: HEIGHT * zoom, position: "relative" }}>
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
                      className="cursor-pointer"
                      onClick={() => node.wordId && openWordDrawer(node.wordId)}
                    >
                      {/* Invisible hit target: the visible dot is only ~8px. */}
                      <circle cx={Math.round(node.x)} cy={Math.round(node.y)} r={12} fill="transparent" />
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
                    className="cursor-pointer"
                    onClick={() => setSelectedNode(node)}
                  >
                    <rect
                      x={Math.round(node.x) - 6}
                      y={Math.round(node.y) - 6}
                      width={12}
                      height={12}
                      rx={3}
                      fill={color}
                      fillOpacity={0.25}
                      stroke={color}
                      strokeWidth={1.25}
                    />
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
        className={`absolute bottom-14 left-3 right-3 sm:bottom-3 sm:right-auto z-10 max-w-[calc(100vw-1.5rem)] sm:max-w-none ${
          selectedNode ? "hidden sm:block" : ""
        }`}
      >
        <div className="rounded-lg bg-[var(--sub-alt-color)]/90 backdrop-blur border border-[var(--sub-color)]/20 px-3 py-1.5 text-[11px] font-mono text-[var(--sub-color)] leading-relaxed">
          <span className="text-[10px] uppercase tracking-wider text-[var(--sub-color)]/80">legend</span>
          {zoom < LABEL_MIN_ZOOM && (
            <span className="text-[10px] text-[var(--main-color)]"> · zoom in for labels</span>
          )}{" "}
          <span className="text-[var(--main-color)] font-bold">{counts.word} words</span> ·{" "}
          <span style={{ color: STROKE.phrase }}>{counts.phrase} phrases</span> ·{" "}
          <span style={{ color: STROKE.compound }}>{counts.compound} compounds</span> ·{" "}
          <span style={{ color: STROKE.falsefriend }}>{counts.falsefriend} false friends</span> ·{" "}
          <span style={{ color: STROKE.insight }}>{counts.insight} expressions</span> ·{" "}
          {graph.edges.length} links
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1 rounded-lg bg-[var(--sub-alt-color)]/90 backdrop-blur border border-[var(--sub-color)]/20 p-1 font-mono text-[11px]">
        <button
          type="button"
          onClick={() => changeZoom(-0.2)}
          disabled={zoom <= MIN_ZOOM}
          className="p-1.5 rounded hover:bg-[var(--bg-color)] text-[var(--sub-color)] hover:text-[var(--text-color)] disabled:opacity-30 transition cursor-pointer"
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
          className="p-1.5 rounded hover:bg-[var(--bg-color)] text-[var(--sub-color)] hover:text-[var(--text-color)] disabled:opacity-30 transition cursor-pointer"
          aria-label="Zoom in"
          title="Zoom in"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={resetZoom}
          className="p-1.5 rounded hover:bg-[var(--bg-color)] text-[var(--sub-color)] hover:text-[var(--text-color)] transition cursor-pointer"
          aria-label="Fit the graph to the screen"
          title="Fit graph"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Details for labelled nodes */}
      {selectedNode && (
        <div className="absolute bottom-14 right-3 z-20 w-72 max-w-[calc(100vw-1.5rem)] rounded-lg bg-[var(--sub-alt-color)]/95 backdrop-blur border border-[var(--sub-color)]/25 p-3 shadow-lg space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-[var(--sub-color)]">
                {KIND_LABEL[selectedNode.kind] ?? selectedNode.kind}
              </div>
              <div className="text-sm font-bold text-[var(--text-color)] break-words">{selectedNode.label}</div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedNode(null)}
              className="p-0.5 rounded text-[var(--sub-color)] hover:text-[var(--text-color)] transition cursor-pointer"
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
