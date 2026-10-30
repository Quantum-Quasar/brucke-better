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

export interface InsightsResource {
  insights: DailyInsight[];
  error: Error | null;
  retry: () => void;
}

export function useInsights(languageId: string): InsightsResource {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<{
    languageId: string;
    data: DailyInsight[] | null;
    error: Error | null;
  }>(() => ({ languageId, data: loaded.get(languageId) ?? null, error: null }));

  useEffect(() => {
    let cancelled = false;
    loadInsights(languageId)
      .then((data) => {
        if (!cancelled) setState({ languageId, data, error: null });
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setState({
            languageId,
            data: loaded.get(languageId) ?? null,
            error: error instanceof Error ? error : new Error(String(error)),
          });
        }
      });
    return () => {
      cancelled = true;
    };
  }, [languageId, attempt]);

  const current =
    state.languageId === languageId
      ? state
      : { languageId, data: loaded.get(languageId) ?? null, error: null };

  return {
    insights: current.data ?? NONE,
    error: current.error,
    retry: () => setAttempt((value) => value + 1),
  };
}
