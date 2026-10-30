import germanInsights from "./insights.json";
import { FRENCH_INSIGHTS } from "./french/insights-fr";
import { SPANISH_INSIGHTS } from "./spanish/insights-es";
import { DUTCH_INSIGHTS } from "./dutch/insights-nl";
import type { DailyInsight } from "@/lib/types";

const INSIGHTS_MAP: Record<string, DailyInsight[]> = {
  de: germanInsights as DailyInsight[],
  fr: FRENCH_INSIGHTS,
  es: SPANISH_INSIGHTS,
  nl: DUTCH_INSIGHTS,
};

export function getInsights(languageId: string): DailyInsight[] {
  return INSIGHTS_MAP[languageId] ?? [];
}
