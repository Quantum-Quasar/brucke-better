import { frequencyRankFor } from "../../src/lib/frequency";
import type { FrequencyRanks } from "../../src/lib/frequency";
import type { CompendiumData } from "../../src/lib/types";

/** Build-time only: corpus subsets never become a static client import. */
export function withFrequencyMetadata(data: CompendiumData, ranks: FrequencyRanks): CompendiumData {
  const words = Object.fromEntries(Object.entries(data.words).map(([id, word]) => [id, {
    ...word,
    frequencyRank: frequencyRankFor(word.target_word, ranks),
  }]));
  return { ...data, words, wordList: Object.values(words), frequencyRanks: ranks };
}
