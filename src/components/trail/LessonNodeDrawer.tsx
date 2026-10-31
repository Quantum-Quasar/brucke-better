"use client";

import React, { useRef } from "react";
import { useDialogFocus } from "@/lib/use-dialog-focus";
import { ArrowRight, BookOpen, Check, GitBranch, Info, Lock, Sparkles, Star } from "lucide-react";
import type { TrailNode, NodeStatus, GateView, NodeGateInfo, GateMarker } from "@/lib/trail-map";

interface LessonNodeDrawerProps {
  node: TrailNode;
  view: { status: NodeStatus; star?: "gold" | "purple"; gate?: NodeGateInfo };
  hasProgress: boolean;
  /** titles of the adjacent lessons that can unlock this node */
  unlockHint: string | null;
  onClose: () => void;
  onStart: (lessonId: number) => void;
}

const kindLabel = (node: TrailNode) =>
  node.kind === "core"
    ? `topic ${node.topicId} · main path`
    : node.kind === "story"
    ? `story ${node.label ?? ""} · main path`
    : node.kind === "sprig"
    ? `topic ${node.topicId} · extra practice`
    : `topic ${node.topicId} · support branch`;

export const LessonNodeDrawer: React.FC<LessonNodeDrawerProps> = ({
  node,
  view,
  hasProgress,
  unlockHint,
  onClose,
  onStart,
}) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  useDialogFocus({
    open: true,
    containerRef: dialogRef,
    initialFocusRef: closeRef,
    onEscape: onClose,
  });

  const { status, star } = view;
  const playable = node.authored && status !== "locked";

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onClose} aria-hidden />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={node.title}
        className="absolute inset-x-0 bottom-0 sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[440px] max-h-[82vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-[var(--bg-color)] border border-[var(--sub-color)]/30 shadow-2xl"
      >
        <div className="p-5 sm:p-6 space-y-4">
          {/* header */}
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 min-w-0">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--main-color)] font-semibold">
                {node.kind === "branch" ? <GitBranch className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                {kindLabel(node)}
              </span>
              <h2 className="text-lg font-bold text-[var(--text-color)] tracking-tight leading-snug">{node.title}</h2>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="shrink-0 w-8 h-8 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 text-[var(--sub-color)] hover:text-[var(--text-color)] transition text-sm font-mono cursor-pointer"
              aria-label="Close"
            >
              esc
            </button>
          </div>

          {/* blurb / plan */}
          <p className="text-xs text-[var(--sub-color)] leading-relaxed">
            {node.blurb ?? node.plan}
          </p>

          {/* status block */}
          {status === "completed" ? (
            <div className="p-3 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--main-color)]/30 flex items-center gap-2.5 text-xs font-mono">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                style={{ background: star === "purple" ? PURPLE : GOLD }}
              >
                <Star className="w-3 h-3 text-[var(--bg-color)]" fill="var(--bg-color)" strokeWidth={0} />
              </span>
              {star === "purple" ? (
                <span className="text-[var(--text-color)]">
                  purple star — a flawless run, retry queue untouched. It means you built every answer by thinking it through without a miss (a clean replay counts).
                </span>
              ) : (
                <span className="text-[var(--text-color)]">
                  gold star — completed. Replay for a flawless run to turn it purple.
                </span>
              )}
            </div>
          ) : status === "locked" ? (
            <div className="p-3 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 space-y-1.5 text-xs font-mono">
              {view.gate ? (
                <>
                  <span className="flex items-center gap-2 text-[var(--main-color)]">
                    <Lock className="w-3.5 h-3.5" /> beyond the {view.gate.title.replace(/^The /, "")}
                  </span>
                  <p className="text-[var(--sub-color)] leading-relaxed">
                    <span className="text-[var(--text-color)] font-bold">
                      {view.gate.stars} / {view.gate.requiredStars} ★
                    </span>{" "}
                    earned in topics {view.gate.fromTopic}–{view.gate.toTopic}. Clear the extra lessons in this stretch —
                    the gate opens on its own once you have enough stars.
                  </p>
                </>
              ) : (
                <>
                  <span className="flex items-center gap-2 text-[var(--sub-color)]">
                    <Lock className="w-3.5 h-3.5" /> locked
                  </span>
                  <p className="text-[var(--sub-color)] leading-relaxed">
                    {unlockHint ?? "Complete an adjacent lesson on the map to unlock this one."}
                  </p>
                </>
              )}
            </div>
          ) : !node.authored ? (
            <div className="p-3 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 space-y-1.5 text-xs font-mono">
              <span className="flex items-center gap-2 text-[var(--main-color)]">
                <Sparkles className="w-3.5 h-3.5" /> being written
              </span>
              <p className="text-[var(--sub-color)] leading-relaxed">{node.plan}</p>
            </div>
          ) : (
            <div className="p-3 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 flex items-center gap-2 text-xs font-mono text-[var(--sub-color)]">
              <Info className="w-3.5 h-3.5 shrink-0" />
              {hasProgress ? "you have progress in this lesson" : "ready to start"}
            </div>
          )}

          {/* actions */}
          {playable && (
            <button
              type="button"
              onClick={() => onStart(node.id)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--main-color)] text-[var(--bg-color)] font-bold text-xs font-mono hover:opacity-90 transition cursor-pointer"
            >
              <span>
                {status === "completed" ? "replay lesson" : hasProgress ? "resume lesson" : "start lesson"}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const GOLD = "#eab308";
const PURPLE = "#a78bfa";

/* -------------------------------------------------------------------------- */

interface GateDrawerProps {
  gate: GateMarker;
  view: GateView;
  onClose: () => void;
}

/** Checkpoint drawer explaining why a star gate sits where it sits. */
export const GateDrawer: React.FC<GateDrawerProps> = ({ gate, view, onClose }) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeRef = useRef<HTMLButtonElement | null>(null);
  useDialogFocus({
    open: true,
    containerRef: dialogRef,
    initialFocusRef: closeRef,
    onEscape: onClose,
  });

  const pct = Math.min(100, Math.round((view.stars / gate.requiredStars) * 100));

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={onClose} aria-hidden />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={gate.title}
        className="absolute inset-x-0 bottom-0 sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-[440px] max-h-[82vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl bg-[var(--bg-color)] border border-[var(--sub-color)]/30 shadow-2xl"
      >
        <div className="p-5 sm:p-6 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 min-w-0">
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[var(--main-color)] font-semibold">
                <Lock className="w-3 h-3" />
                star gate · topics {view.fromTopic}–{view.toTopic}
              </span>
              <h2 className="text-lg font-bold text-[var(--text-color)] tracking-tight leading-snug">{gate.title}</h2>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="shrink-0 w-8 h-8 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 text-[var(--sub-color)] hover:text-[var(--text-color)] transition text-sm font-mono cursor-pointer"
              aria-label="Close"
            >
              esc
            </button>
          </div>

          <p className="text-xs text-[var(--sub-color)] leading-relaxed">{gate.why}</p>

          <div className="p-3 rounded-lg bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/25 space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-[var(--sub-color)]">stars in this stretch</span>
              <span className={view.open ? "text-[var(--main-color)] font-bold" : "text-[var(--text-color)] font-bold"}>
                {view.stars} / {gate.requiredStars}
              </span>
            </div>
            <div
              role="progressbar"
              aria-valuenow={view.stars}
              aria-valuemin={0}
              aria-valuemax={gate.requiredStars}
              aria-label={`Star requirement for ${gate.title}`}
              className="w-full h-1.5 rounded-full bg-[var(--bg-color)] overflow-hidden"
            >
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${pct}%`, background: view.open ? "var(--main-color)" : "var(--sub-color)" }}
              />
            </div>
            {view.open ? (
              <span className="flex items-center gap-1.5 text-[var(--main-color)]">
                <Check className="w-3.5 h-3.5" /> open — the next stretch awaits
              </span>
            ) : (
              <span className="text-[var(--sub-color)] leading-relaxed">
                {gate.requiredStars - view.stars} more star{gate.requiredStars - view.stars === 1 ? "" : "s"} to open —
                gold or purple both count.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
