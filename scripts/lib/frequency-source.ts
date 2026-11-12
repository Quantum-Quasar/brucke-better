import { normalizeFrequencyForm, frequencyRankFor, compoundFrequencyForm } from "../../src/lib/frequency";
import type { FrequencyRanks } from "../../src/lib/frequency";
import type { CompendiumData } from "../../src/lib/types";

/** Rank is the source row position, including equal-count rows; never re-rank a subset. */
export function parseFrequencySource(text: string): Record<string, number> {
  const ranks: Record<string, number> = Object.create(null);
  let previousCount = Infinity;
  let row = 0;
  for (const line of text.trimEnd().split(/\r?\n/)) {
    row += 1;
    const match = /^(\S+) (\d+)$/.exec(line);
    if (!match) throw new Error(`Invalid frequency source row ${row}`);
    const count = Number(match[2]);
    if (!Number.isSafeInteger(count) || count < 1 || count > previousCount) {
      throw new Error(`Invalid or unsorted frequency count at row ${row}`);
    }
    previousCount = count;
    const form = normalizeFrequencyForm(match[1]);
    if (!(form in ranks)) ranks[form] = row;
  }
  return ranks;
}

export function appFrequencyForms(data: Pick<CompendiumData, "words" | "compounds" | "falseFriends">): string[] {
  return [...new Set([
    ...Object.values(data.words).map((word) => word.target_word),
    ...data.compounds.map((compound) => compoundFrequencyForm(compound.compound)),
    ...data.falseFriends.map((trap) => trap.german_word),
  ].map(normalizeFrequencyForm))].sort();
}

export function compactFrequencyRanks(forms: readonly string[], source: FrequencyRanks): Record<string, number | null> {
  return Object.fromEntries(forms.map((form) => [normalizeFrequencyForm(form), frequencyRankFor(form, source)]));
}
