import { frequencyLabel } from "@/lib/frequency";
import type { WordEntity } from "@/lib/types";

export function WordFrequency({ word }: { word: WordEntity }) {
  const synthetic = word.id.startsWith("sentence_") || word.id.startsWith("article_");
  if (synthetic) return null;
  return (
    <details className="mt-3 text-xs font-mono text-[var(--sub-color)]">
      <summary className="cursor-pointer leading-relaxed marker:text-[var(--main-color)]">
        {word.frequencyRank != null && (
          <span className="text-[var(--main-color)]">#{word.frequencyRank.toLocaleString("en-US")} · </span>
        )}
        {frequencyLabel(word.frequencyRank)}
      </summary>
      <div className="mt-2 space-y-2 leading-relaxed">
        <p>
          Case-normalized written-form rank in the language’s top 50,000 OpenSubtitles 2018 forms,
          not a lemma frequency or a promise of everyday usefulness. Dialogue, names and
          spelling affect this corpus. An unmatched form is unranked, not necessarily rare;
          related inflections are not combined.
        </p>
        <p>
          <a className="underline hover:text-[var(--text-color)]" href="https://github.com/hermitdave/FrequencyWords/tree/525f9b560de45753a5ea01069454e72e9aa541c6/content/2018" target="_blank" rel="noreferrer">Hermit Dave / FrequencyWords</a>
          {" · "}
          <a className="underline hover:text-[var(--text-color)]" href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noreferrer">CC BY-SA 4.0</a>
          {" · "}
          <a className="underline hover:text-[var(--text-color)]" href="/data/frequency-provenance.json" target="_blank" rel="noreferrer">source &amp; changes</a>
        </p>
      </div>
    </details>
  );
}
