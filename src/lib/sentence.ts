// Locate the taught word inside its example sentence so the UI can highlight it.

export interface SentenceSegment {
  text: string;
  hit: boolean;
}

const ARTICLE = /^(der|die|das|de|het|een)\s+/i;
const TOKEN = /[\p{L}]+/gu;
/** Case-, umlaut- and ß-insensitive form, so Nuss matches Nüsse and Fuß matches Füße. */
const fold = (s: string) =>
  s.toLowerCase().replace(/ß/g, "ss").replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u");

/** Common German inflection endings, longest first, trimmed to leave a ≥3-letter stem. */
const ENDINGS = ["ern", "en", "er", "es", "em", "st", "te", "e", "n", "s", "t"];

function stems(word: string): string[] {
  const w = fold(word.replace(ARTICLE, "").trim());
  const out = new Set<string>([w]);
  for (const end of ENDINGS) {
    if (w.endsWith(end) && w.length - end.length >= 3) {
      out.add(w.slice(0, -end.length));
      break;
    }
  }
  return [...out];
}

/**
 * Splits a sentence into plain and highlighted segments. A token is a hit when it
 * equals the word or starts with its stem (so "Handschuhe" matches "Handschuh",
 * "Gäste" matches "Gast"). Separable verbs ("aufmachen" → "Ich mache … auf") also
 * highlight the detached prefix. No match → one plain segment.
 */
export function highlightWord(sentence: string, word: string): SentenceSegment[] {
  const candidates = stems(word);
  const bare = fold(word.replace(ARTICLE, "").trim());
  const PREFIXES = ["zurück", "auf", "zu", "an", "ab", "aus", "ein", "mit", "vor", "nach", "weg", "um", "her", "hin"];
  const prefix = PREFIXES.find((p) => bare.startsWith(p) && bare.length - p.length >= 3);
  const rest = prefix ? bare.slice(prefix.length) : "";
  const restStems = prefix ? stems(rest) : [];

  // Nouns sit at the end of compounds ("Telefonnummer", "Vollbart"): allow a suffix match.
  const isNoun = /^\p{Lu}/u.test(word.replace(ARTICLE, "").trim());
  const tokens = [...sentence.matchAll(TOKEN)];
  const hits = new Set<number>();
  tokens.forEach((m, i) => {
    const t = fold(m[0]);
    if (candidates.some((c) => t === c || (c.length >= 3 && t.startsWith(c)) || (isNoun && c.length >= 4 && t.endsWith(c)))) hits.add(i);
    else if (restStems.some((c) => c.length >= 3 && (t === c || t.startsWith(c)))) hits.add(i);
  });
  if (prefix && hits.size > 0) {
    tokens.forEach((m, i) => {
      if (fold(m[0]) === prefix) hits.add(i);
    });
  }
  if (hits.size === 0) return [{ text: sentence, hit: false }];

  const segments: SentenceSegment[] = [];
  let cursor = 0;
  tokens.forEach((m, i) => {
    if (!hits.has(i)) return;
    const start = m.index ?? 0;
    if (start > cursor) segments.push({ text: sentence.slice(cursor, start), hit: false });
    segments.push({ text: m[0], hit: true });
    cursor = start + m[0].length;
  });
  if (cursor < sentence.length) segments.push({ text: sentence.slice(cursor), hit: false });
  return segments;
}

/** The sentence with the taught word replaced by a blank, or null when it can't be located. */
export function clozeSentence(sentence: string, word: string): string | null {
  const segs = highlightWord(sentence, word);
  if (!segs.some((s) => s.hit)) return null;
  return segs.map((s) => (s.hit ? "____" : s.text)).join("").replace(/(____\s*)+/g, "____ ");
}
