"use client";

import React, { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import {
  getWeeklyPracticeSummary,
  WEEKLY_PRACTICE_EVENT,
  WEEKLY_PRACTICE_STORAGE_KEY,
} from "@/lib/weekly-practice";

export const WeeklyPracticeBadge: React.FC = () => {
  const [daysPracticed, setDaysPracticed] = useState<number | null>(null);

  useEffect(() => {
    const refresh = () => {
      setDaysPracticed(getWeeklyPracticeSummary().daysPracticed);
    };
    refresh();
    const onStorage = (event: StorageEvent) => {
      if (!event.key || event.key === WEEKLY_PRACTICE_STORAGE_KEY) refresh();
    };
    window.addEventListener(WEEKLY_PRACTICE_EVENT, refresh);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(WEEKLY_PRACTICE_EVENT, refresh);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  if (daysPracticed === null || daysPracticed === 0) return null;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--sub-alt-color)] border border-[var(--sub-color)]/20 text-[11px] font-mono text-[var(--sub-color)]"
      title="Unique days practiced in the last 7 days"
    >
      <CalendarDays className="w-3 h-3 text-[var(--main-color)] shrink-0" aria-hidden="true" />
      <span>Practiced {daysPracticed} of 7 days (last 7 days)</span>
    </span>
  );
};
