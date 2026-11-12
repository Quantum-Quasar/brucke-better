"use client";

// ponytail: prominent, high-contrast grammatical gender badge

import React from "react";
import { getGenderInfo } from "@/lib/gender";
import type { Gender } from "@/lib/types";

interface GenderBadgeProps {
  gender?: Gender | string | null;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

export const GenderBadge: React.FC<GenderBadgeProps> = React.memo(({
  gender,
  size = "md",
  showLabel = false,
  className = "",
}) => {
  const info = getGenderInfo(gender);
  if (!info) return null;

  const sizeClasses = {
    sm: "text-[11px] px-2 py-0.5 font-bold tracking-wider",
    md: "text-xs px-2.5 py-1 font-extrabold tracking-wider",
    lg: "text-sm px-3.5 py-1.5 font-extrabold tracking-widest",
  }[size];

  return (
    <span
      role="img"
      aria-label={`${info.article}: ${info.label} grammatical gender`}
      title={`Grammatical Gender: ${info.article} (${info.label})`}
      className={`inline-flex items-center gap-1.5 font-mono uppercase rounded-md border transition-transform ${info.badgeClass} ${sizeClasses} ${className}`}
    >
      <span
        aria-hidden="true"
        className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
        style={{ backgroundColor: info.dotColor }}
      />
      <span>{info.article}</span>
      {showLabel && (
        <span className="text-[10px] opacity-80 lowercase font-sans font-medium tracking-normal">
          ({info.label})
        </span>
      )}
    </span>
  );
});

GenderBadge.displayName = "GenderBadge";
