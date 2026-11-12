import type { WordEntity } from "@/lib/types";

export type FrequencyRanks = Readonly<Record<string, number | null>>;

/** Match the corpus's surface forms, not a guessed lemma or an inflection. */
export function normalizeFrequencyForm(form: string): string {
  return form.trim().normalize("NFC").toLowerCase();
}
/** Compendium compounds sometimes include their separately stored article. */
export function compoundFrequencyForm(compound: string): string {
  return compound.replace(/^(der|die|das|le|la|les|el|los|las|de|het)\s+/i, "");
}

export function frequencyRankFor(form: string, ranks?: FrequencyRanks): number | null {
  const rank = ranks?.[normalizeFrequencyForm(form)];
  return typeof rank === "number" && Number.isInteger(rank) && rank > 0 ? rank : null;
}

/** Only a tie-break: callers must compare due dates before frequency. */
export function compareFrequencyRanks(
  a: Pick<WordEntity, "frequencyRank">,
  b: Pick<WordEntity, "frequencyRank">
): number {
  return (a.frequencyRank ?? Infinity) - (b.frequencyRank ?? Infinity) || 0;
}

/** Stable, non-mutating ordering for an author's candidate vocabulary. */
export function orderVocabularySuggestions<T extends { target_word: string }>(
  candidates: readonly T[],
  ranks: FrequencyRanks
): Array<T & { frequencyRank: number | null }> {
  return candidates
    .map((candidate) => ({ ...candidate, frequencyRank: frequencyRankFor(candidate.target_word, ranks) }))
    .sort(compareFrequencyRanks);
}

export function frequencyLabel(rank: number | null | undefined): string {
  if (rank == null) return "Unranked subtitle form";
  if (rank <= 1_000) return "Top 1,000 subtitle forms";
  if (rank <= 5_000) return "Top 5,000 subtitle forms";
  if (rank <= 10_000) return "Top 10,000 subtitle forms";
  return "Outside the top 10,000 subtitle forms";
}
