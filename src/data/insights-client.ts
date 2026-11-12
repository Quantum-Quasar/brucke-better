"use client";

// Browser-side daily insights, loaded separately from the primary trail action.

import { useAsyncResource } from "@/lib/async-resource";
import type { DailyInsight } from "@/lib/types";

const NONE: DailyInsight[] = [];

const loaded = new Map<string, DailyInsight[]>();

function peekInsights(languageId: string): DailyInsight[] | null {
  return loaded.get(languageId) ?? null;
}

function loadInsights(languageId: string): Promise<DailyInsight[]> {
  const ready = loaded.get(languageId);
  if (ready) return Promise.resolve(ready);
  const source =
    languageId === "de"
      ? import("./insights.json").then((m) => m.default as DailyInsight[])
      : languageId === "fr"
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
