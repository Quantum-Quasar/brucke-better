"use client";

import React from "react";
import type { LucideIcon } from "lucide-react";

export interface SettingItemProps {
  id: string;
  icon: LucideIcon;
  title: string;
  description: React.ReactNode;
  children: React.ReactNode;
  matchesSearch?: boolean;
}

export const SettingItem: React.FC<SettingItemProps> = ({
  id,
  icon: Icon,
  title,
  description,
  children,
  matchesSearch = true,
}) => {
  if (!matchesSearch) return null;

  return (
    <div
      id={`setting-${id}`}
      data-setting-id={id}
      className="py-4 border-b border-[var(--sub-color)]/15 last:border-b-0 transition-colors"
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        {/* Left column: Title & Description */}
        <div className="space-y-1 md:max-w-[55%]">
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-[var(--main-color)] shrink-0" />
            <h3 id={`setting-title-${id}`} className="font-mono text-sm font-semibold text-[var(--text-color)] lowercase tracking-tight">
              {title}
            </h3>
          </div>
          <div className="text-[13px] text-[var(--sub-color)] leading-relaxed">
            {description}
          </div>
        </div>

        {/* Right column: Interactive Controls */}
        <div role="group" aria-labelledby={`setting-title-${id}`} className="flex items-center justify-start md:justify-end flex-wrap gap-1.5 shrink-0">
          {children}
        </div>
      </div>
    </div>
  );
};
