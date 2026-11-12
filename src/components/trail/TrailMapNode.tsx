"use client";

import { memo } from "react";
import { BookOpen, GitBranch, Lock, Star } from "lucide-react";
import type { TrailNode, NodeStatus } from "@/lib/trail-map";

export const GOLD_STAR = "#eab308";
const PURPLE_STAR = "#a78bfa";

interface Props {
  node: TrailNode;
  sectionTop: number;
  status: NodeStatus;
  star?: "gold" | "purple";
  hasProgress: boolean;
  detailed: boolean;
  onSelect: (node: TrailNode) => void;
}

export const TrailMapNode = memo(function TrailMapNode({ node, sectionTop, status, star, hasProgress, detailed, onSelect }: Props) {
  const completed = status === "completed";
  const locked = status === "locked";
  const unwritten = locked && !node.authored;
  const label = `${node.kind === "core" ? `Topic ${node.topicId}` : node.kind === "story" ? `Story ${node.label ?? ""}` : node.kind === "sprig" ? "Extra lesson" : "Support branch"}: ${node.title} — ` +
    (completed ? `completed${star === "purple" ? " with a purple star" : ""}` : locked ? unwritten ? "locked, content being written" : "locked" : "available to play");
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
      onClick={() => onSelect(node)}
      aria-label={label}
      title={node.title}
      data-trail-node-id={node.id}
      className={`absolute flex items-center justify-center text-left transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--main-color)] ${statusStyle} ${locked ? "cursor-default" : "cursor-pointer"}`}
      style={{
        left: node.x,
        top: node.y - sectionTop,
        width: node.w,
        height: node.h,
        borderRadius: node.kind === "core" || node.kind === "story" ? 14 : 12,
        borderWidth: completed ? 2 : 1,
        animation: status === "available" && !hasProgress ? "trail-node-pop 400ms ease both" : undefined,
      }}
    >
      {!detailed ? <span className="px-2 text-[11px] font-mono line-clamp-2">{node.kind === "sprig" ? node.id % 100 : node.title}</span> : <>
        {node.kind === "core" && (
          <span className="flex items-center gap-2 px-2.5 w-full">
            <span className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-[11px] font-bold shrink-0 ${completed ? "bg-[var(--bg-color)]/25 text-[var(--bg-color)]" : "bg-[var(--bg-color)] text-[var(--text-color)] border border-[var(--sub-color)]/30"}`}>
              {completed ? "✓" : node.topicId}
            </span>
            <span className="text-[12px] font-semibold leading-tight line-clamp-2">{node.title}</span>
          </span>
        )}
        {node.kind === "story" && (
          <span className="flex items-center gap-2 px-2.5 w-full">
            <span className={`w-6 h-6 rounded-md flex items-center justify-center font-mono text-[11px] font-bold shrink-0 ${completed ? "bg-[var(--bg-color)]/25 text-[var(--bg-color)]" : "bg-[var(--bg-color)] text-[var(--main-color)] border border-[var(--main-color)]/35"}`}>
              {completed ? "✓" : node.label ?? "s"}
            </span>
            <span className="flex items-center gap-1 min-w-0">
              <BookOpen className="w-3 h-3 shrink-0 opacity-70" />
              <span className="text-[11px] font-semibold leading-tight line-clamp-2">{node.title}</span>
            </span>
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
          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center border-2" style={{ background: star === "purple" ? PURPLE_STAR : GOLD_STAR, borderColor: "var(--bg-color)" }} aria-hidden>
            <Star className="w-2.5 h-2.5 text-[var(--bg-color)]" fill="var(--bg-color)" strokeWidth={0} />
          </span>
        )}
        {locked && (
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-[var(--bg-color)] border border-[var(--text-color)]/35 flex items-center justify-center">
            <Lock className="w-2.5 h-2.5 text-[var(--sub-color)]" />
          </span>
        )}
      </>}
    </button>
  );
});
