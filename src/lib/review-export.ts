import { pluralForWord } from "@/data/noun-plurals";
import type { SRSCard, WordEntity } from "./types";

export const EXPORT_COLUMNS = [
  "target_word",
  "english_meaning",
  "gender",
  "plural",
  "context_phrase",
  "interval",
  "nextReviewDate",
] as const;

export const CSV_UTF8_BOM = "\uFEFF";
export const ANKI_TSV_HEADER = "#separator:tab\n#html:false\n";

export type ExportFormat = "csv" | "tsv";

export interface ReviewExportRow {
  target_word: string;
  english_meaning: string;
  gender: string;
  plural: string;
  context_phrase: string;
  interval: string;
  nextReviewDate: string;
}

const SYNTHETIC_ENTITY_PREFIX = /^(article|sentence|compound|trap)_/;

export function buildReviewExportRows(
  languageId: string,
  words: ReadonlyArray<WordEntity>,
  srsCards: Readonly<Record<string, SRSCard>>,
): ReviewExportRow[] {
  return words
    .filter((word) => !SYNTHETIC_ENTITY_PREFIX.test(word.id))
    .map((word) => {
      const card = srsCards[word.id];
      return {
        target_word: word.target_word ?? "",
        english_meaning: word.english_meaning ?? "",
        gender: word.gender ?? "",
        plural: pluralForWord(languageId, word) ?? "",
        context_phrase: word.context_phrase ?? "",
        interval: card ? String(card.interval) : "0",
        nextReviewDate: card?.due_date ?? "",
      };
    });
}

function escapeCsvCell(value: string): string {
  const normalized = value.replace(/\r?\n/g, " ");
  // Neutralize spreadsheet formula injection prefixes (=, +, -, @, tab, CR)
  const safe = /^[=+\-@\t\r]/.test(normalized) ? `'${normalized}` : normalized;
  if (/[",]/.test(safe)) {
    return `"${safe.replace(/"/g, '""')}"`;
  }
  return safe;
}

function escapeTsvCell(value: string): string {
  const cleaned = value.replace(/[\t\r\n]+/g, " ").trim();
  if (cleaned.includes('"')) {
    return `"${cleaned.replace(/"/g, '""')}"`;
  }
  return cleaned;
}

export function formatReviewExport(
  rows: ReadonlyArray<ReviewExportRow>,
  format: ExportFormat = "csv",
): string {
  const delimiter = format === "tsv" ? "\t" : ",";
  const escape = format === "tsv" ? escapeTsvCell : escapeCsvCell;
  const header = EXPORT_COLUMNS.join(delimiter);
  const lines = rows.map((row) =>
    EXPORT_COLUMNS.map((col) => escape(row[col])).join(delimiter)
  );
  const body = [header, ...lines].join("\n");
  return format === "tsv" ? `${ANKI_TSV_HEADER}${body}` : body;
}

export function formatReviewDownloadContent(
  rows: ReadonlyArray<ReviewExportRow>,
  format: ExportFormat = "csv",
): string {
  const content = formatReviewExport(rows, format);
  return format === "csv" ? `${CSV_UTF8_BOM}${content}` : content;
}

export function downloadReviewExport(
  languageId: string,
  words: ReadonlyArray<WordEntity>,
  srsCards: Readonly<Record<string, SRSCard>>,
  format: ExportFormat = "csv",
  scopeLabel = "review",
): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;
  const rows = buildReviewExportRows(languageId, words, srsCards);
  const content = formatReviewDownloadContent(rows, format);
  const mime = format === "tsv" ? "text/tab-separated-values;charset=utf-8;" : "text/csv;charset=utf-8;";
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `brucke-${languageId}-${scopeLabel}.${format}`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
