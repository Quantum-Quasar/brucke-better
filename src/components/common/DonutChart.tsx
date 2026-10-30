"use client";

// Native CSS donut: conic-gradient segments with a radial mask for the ring.

import React from "react";

interface DonutChartProps {
  mastered: number;
  encountered: number;
  explored: number;
  unexplored: number;
  size?: number;
  strokeWidth?: number;
}

export const DonutChart: React.FC<DonutChartProps> = ({
  mastered,
  encountered,
  explored,
  unexplored,
  size = 44,
  strokeWidth = 5,
}) => {
  const total = mastered + encountered + explored + unexplored;
  if (total === 0) {
    return (
      <div
        style={{ width: size, height: size }}
        className="rounded-full border border-[var(--sub-color)]/30 flex items-center justify-center text-[10px] text-[var(--sub-color)] font-mono"
      >
        0
      </div>
    );
  }

  const segments = [
    { count: mastered, color: "var(--main-color)" },
    { count: encountered, color: "var(--text-color)" },
    { count: explored, color: "var(--sub-color)" },
    { count: unexplored, color: "color-mix(in srgb, var(--sub-color) 35%, transparent)" },
  ];

  let accumulated = 0;
  const stops = segments
    .filter((seg) => seg.count > 0)
    .map((seg) => {
      const start = (accumulated / total) * 100;
      accumulated += seg.count;
      const end = (accumulated / total) * 100;
      return `${seg.color} ${start}% ${end}%`;
    });

  const ringMask = `radial-gradient(farthest-side, transparent calc(100% - ${strokeWidth}px), #000 calc(100% - ${strokeWidth}px))`;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <div
        className="h-full w-full rounded-full"
        style={{
          background: `conic-gradient(${stops.join(", ")})`,
          mask: ringMask,
          WebkitMask: ringMask,
        }}
      />
      <span className="absolute text-[10px] font-mono font-bold text-[var(--text-color)]">
        {mastered + encountered}
      </span>
    </div>
  );
};
