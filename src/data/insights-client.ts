"use client";

// Browser-side daily insights. German is bundled; French/Spanish load on demand.

import { useAsyncResource } from "@/lib/async-resource";
import germanInsights from "./insights.json";
import type { DailyInsight } from "@/lib/types";

const GERMAN = germanInsights as DailyInsight[];
const NONE: DailyInsight[] = [];

const loaded = new Map<string, DailyInsight[]>([["de", GERMAN]]);

function peekInsights(languageId: string): DailyInsight[] | null {
  return loaded.get(languageId) ?? null;
}

function loadInsights(languageId: string): Promise<DailyInsight[]> {
  const ready = loaded.get(languageId);
  if (ready) return Promise.resolve(ready);
  const source =
    languageId === "fr"
      ? import("./french/insights-fr").then((m) => m.FRENCH_INSIGHTS)
      : languageId === "es"
        ? import("./spanish/insights-es").then((m) => m.SPANISH_INSIGHTS)
        : languageId === "nl"
          ? import("./dutch/insights-nl").then((m) => m.DUTCH_INSIGHTS)
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
  const { data, error, retry } = useAsyncResource(languageId, loadInsights, {
    peek: peekInsights,
  });
  return { insights: data ?? NONE, error, retry };
}
