import type { CompendiumData } from "@/lib/types";

/** A compendium-shaped bundle with nothing in it (for coming-soon languages). */
export const EMPTY_COMPENDIUM: CompendiumData = {
  words: {},
  wordList: [],
  shifts: {},
  compounds: [],
  falseFriends: [],
  dailyInsights: [],
};
