"use client";

// Browser-side daily insights. German is bundled; French/Spanish load on demand.

import { useEffect, useState } from "react";
import germanInsights from "./insights.json";
import type { DailyInsight } from "@/lib/types";

const GERMAN = germanInsights as DailyInsight[];
const NONE: DailyInsight[] = [];

const loaded = new Map<string, DailyInsight[]>([["de", GERMAN]]);

function loadInsights(languageId: string): Promise<DailyInsight[]> {
  const ready = loaded.get(languageId);
  if (ready) return Promise.resolve(ready);
  const source =
    languageId === "fr"
      ? import("./french/insights-fr").then((m) => m.FRENCH_INSIGHTS)
      : languageId === "es"
        ? import("./spanish/insights-es").then((m) => m.SPANISH_INSIGHTS)
        : Promise.resolve(NONE);
  return source.then((data) => {
    loaded.set(languageId, data);
    return data;
  });
}

export function useInsights(languageId: string): DailyInsight[] {
  const [state, setState] = useState<{ languageId: string; data: DailyInsight[] | null }>(() => ({
    languageId,
    data: loaded.get(languageId) ?? null,
  }));

  useEffect(() => {
    let cancelled = false;
    loadInsights(languageId)
      .then((data) => {
        if (!cancelled) setState({ languageId, data });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [languageId]);

  const data = state.languageId === languageId ? state.data : (loaded.get(languageId) ?? null);
  return data ?? NONE;
}
