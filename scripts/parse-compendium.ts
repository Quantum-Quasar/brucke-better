import fs from "fs";
import path from "path";
import type { CompendiumData, WordEntity, ShiftFamily, Gender } from "../src/lib/types";
import { HOOK_PROBLEM_HINT, twinHookProblems } from "../src/lib/english-hooks";
import { parseWordIdCell, WORD_ID_HINT } from "../src/lib/word-id";
import { COMPENDIUM_DOMAIN_HINT, COMPENDIUM_DOMAIN_SET } from "../src/lib/compendium-domains";

type ParsedCompendium = Omit<CompendiumData, "wordList">;

export interface CompendiumIssue {
  /** 1-based line in word_connections.md. */
  line: number;
  message: string;
}

export interface CompendiumAnalysis {
  /** Null when the document skeleton could not be read at all. */
  compendium: ParsedCompendium | null;
  issues: CompendiumIssue[];
}

/** A row-level failure, carrying its source line. Caught by `collect`. */
class SourceIssue extends Error {
  constructor(readonly line: number, message: string) {
    super(message);
  }
}

interface Row {
  cols: string[];
  line: number;
}

const SHIFT_DEFINITIONS = [
  ["th_to_d", "The Dental Shift (TH → D)", "TH → D"],
  ["d_to_t", "The Stop Shift (D → T)", "D → T"],
  ["p_to_pf_f", "The Labial Shift (P → PF / F)", "P → PF / F"],
  ["t_to_s_ss_z", "The Sibilant Shift (T → S / SS / Z)", "T → S / SS / Z"],
  ["k_to_ch", "The Velar Shift (K → CH)", "K → CH"],
  ["v_to_b", "The Bilabial Shift (V / F → B)", "V / F → B"],
  ["y_gh_to_g_ch", "The Palatal & Guttural Link (Y → G & GH → CH)", "Y/GH → G/CH"],
  ["latin_ieren", "The Latin / Romance Layer (-ate / -ize → -ieren)", "-ate/-ize → -ieren"],
  ["strong_verbs_ablaut", "The 7 Strong Verb Classes (Ablaut)", "Ablaut Vowels"],
] as const;

/** Build every row, keeping the row-level failures in `issues` instead of stopping at the first. */
function buildCompendium(content: string, issues: CompendiumIssue[]): ParsedCompendium {
  const lines = content.split(/\r?\n/);
  const fail = (line: number, message: string): never => {
    throw new SourceIssue(line + 1, message);
  };
  const collect = <T,>(entries: Row[], build: (row: Row) => T): T[] => {
    const built: T[] = [];
    for (const row of entries) {
      try {
        built.push(build(row));
      } catch (error) {
        if (!(error instanceof SourceIssue)) throw error;
        issues.push({ line: error.line, message: error.message });
      }
    }
    return built;
  };
  const sections = new Map<number, { start: number; end: number; count: number | null }>();
  for (const [index, line] of lines.entries()) {
    const heading = line.match(/^## (\d+)\. /);
    if (!heading) continue;
    const id = Number(heading[1]);
    if (id < 1 || id > 5 || sections.has(id)) fail(index, `unknown or duplicate section ${id}`);
    const count = line.match(/\(All (\d+) (?:Words|Compounds|Falsche Freunde|Days)\)$/);
    if (id !== 1 && !count) fail(index, `section ${id} needs its inventory count`);
    const previous = sections.get(id - 1);
    if (id > 1 && !previous) fail(index, `section ${id} is out of order`);
    if (previous) previous.end = index;
    sections.set(id, { start: index, end: lines.length, count: count ? Number(count[1]) : null });
  }
  for (let id = 1; id <= 5; id++) {
    if (!sections.has(id)) fail(0, `missing section ${id}`);
  }
  const clean = (value: string) => value.replace(/\*\*/g, "").trim();
  const positiveInteger = (value: string, line: number): number => {
    if (!/^[1-9]\d*$/.test(value)) fail(line, `invalid row number: ${value}`);
    return Number(value);
  };
  const rows = (sectionId: number, width: number, header: string): Row[] => {
    const section = sections.get(sectionId)!;
    const result: Row[] = [];
    let sawHeader = false;
    let sawSeparator = false;
    const numbers = new Set<number>();
    for (let i = section.start + 1; i < section.end; i++) {
      const text = lines[i].trim();
      if (!text || text === "---" || text.startsWith("<!--") || text.startsWith("### ")) continue;
      try {
        if (!text.startsWith("|") || !text.endsWith("|")) fail(i, `section ${sectionId}: malformed table row`);
        const cols = text.slice(1, -1).split("|").map((cell) => cell.trim());
        if (cols.length !== width) fail(i, `section ${sectionId}: expected ${width} columns, got ${cols.length}`);
        if (cols[0] === header) {
          if (sawHeader || result.length) fail(i, `section ${sectionId}: duplicate table header`);
          sawHeader = true;
          continue;
        }
        if (cols.every((cell) => /^:?-+:?$/.test(cell))) {
          if (!sawHeader || sawSeparator) fail(i, `section ${sectionId}: misplaced separator`);
          sawSeparator = true;
          continue;
        }
        if (!sawHeader || !sawSeparator) fail(i, `section ${sectionId}: missing table header or separator`);
        if (cols.some((cell) => !cell)) fail(i, `section ${sectionId}: empty required cell`);
        const number = positiveInteger(sectionId === 5 ? cols[0].replace(/^Day\s+/, "") : cols[0], i);
        if (numbers.has(number)) fail(i, `section ${sectionId}: duplicate row number ${number}`);
        numbers.add(number);
        result.push({ cols, line: i });
      } catch (error) {
        if (!(error instanceof SourceIssue)) throw error;
        issues.push({ line: error.line, message: error.message });
      }
    }
    if (!sawHeader || !sawSeparator || result.length !== section.count) {
      issues.push({
        line: section.start + 1,
        message: `section ${sectionId}: inventory says ${section.count}, parsed ${result.length} rows (header and separator required)`,
      });
    }
    return result;
  };
  const phrase = (raw: string, line: number) => {
    const match = raw.match(/^(.*?)\s*\*\("?(.*?)"?\)\*$/);
    if (!match || !match[1].trim() || !match[2].trim()) fail(line, "expected phrase and *(\"translation\")*");
    return { text: match![1].trim(), translation: match![2].trim() };
  };
  const uniqueId = (id: string, ids: Set<string>, line: number) => {
    if (!id || ids.has(id) || ["__proto__", "constructor", "prototype"].includes(id)) fail(line, `invalid or duplicate id: ${id}`);
    ids.add(id);
    return id;
  };

  const shifts: Record<string, ShiftFamily> = {};
  const shiftSection = sections.get(1)!;
  const fields = {
    "Phonetic Rule": "phonetic_rule",
    "Historical Linguistics": "historical_linguistics",
    "Philological Note": "philological_note",
    "Literature Source": "literature_source",
  } as const;
  let current: ShiftFamily | null = null;
  for (let i = shiftSection.start + 1; i < shiftSection.end; i++) {
    const line = lines[i];
    if (!line.trim() || line.trim() === "---") continue;
    if (line.startsWith("### ")) {
      const heading = line.slice(4);
      const definition = SHIFT_DEFINITIONS.find(([, name]) => heading.startsWith(name === "The 7 Strong Verb Classes (Ablaut)" ? "The 7 Strong Verb Classes (Ablaut Vowel Harmony)" : name));
      if (!definition || shifts[definition[0]]) fail(i, `unknown or duplicate shift heading: ${heading}`);
      const [id, name, symbol] = definition!;
      current = { id, name, symbol, phonetic_rule: "", historical_linguistics: "", philological_note: "", literature_source: "", word_ids: [] };
      shifts[id] = current;
      continue;
    }
    const field = line.match(/^- \*\*([^:]+):\*\* (.+)$/);
    if (!current || !field || !(field[1] in fields)) fail(i, "malformed shift definition");
    const key = fields[field![1] as keyof typeof fields];
    if (current![key]) fail(i, `duplicate shift field: ${field![1]}`);
    current![key] = field![2].trim();
  }
  for (const [id] of SHIFT_DEFINITIONS) {
    if (!shifts[id] || Object.values(fields).some((key) => !shifts[id][key])) fail(shiftSection.start, `missing or incomplete shift: ${id}`);
  }

  const wordIds = new Set<string>();
  // Ids claimed per headword, including rows that later fail another check: a
  // duplicate must be reported even when its first claimant is otherwise invalid.
  const claimed = new Map<string, string[]>();
  const ablautVerbs: Record<string, true> = {
    singen: true, trinken: true, finden: true, treiben: true, greifen: true, brechen: true,
    sprechen: true, geben: true, liegen: true, helfen: true, schlafen: true, kommen: true,
    gehen: true, schwimmen: true, bringen: true, essen: true, sitzen: true, ziehen: true,
  };
  const wordBases = new Map<string, { line: number; suffix: string | null }[]>();
  const wordRows = collect(rows(2, 9, "#"), ({ cols, line }) => {
    const cell = parseWordIdCell(clean(cols[1]));
    if (!cell.ok) return fail(line, cell.problem);
    const headword = cell.headword;
    const base = headword.toLowerCase();
    const id = cell.suffix ? `${base}#${cell.suffix}` : base;
    if (wordIds.has(id)) {
      const taken = (claimed.get(base) ?? []).join(", ");
      fail(line, `duplicate id: ${id} — taken: ${taken}; "${headword}" needs its own sense tag (${WORD_ID_HINT})`);
    }
    wordIds.add(id);
    claimed.set(base, [...(claimed.get(base) ?? []), id]);
    if (/^(der|die|das)\s/.test(base)) fail(line, "word cell must not contain its article");
    const genderMatch = cols[3].match(/^(der|die|das)(?:\s+\([mfn]\))?$/);
    if (cols[3] !== "-" && !genderMatch) fail(line, `invalid gender: ${cols[3]}`);
    const gender = genderMatch ? genderMatch[1] as Gender : null;
    if (gender && gender.toLowerCase() === base) fail(line, `word cannot be gendered as itself: ${gender} ${headword}`);
    if (!COMPENDIUM_DOMAIN_SET.has(cols[8])) fail(line, `unknown domain: ${cols[8]} (expected one of ${COMPENDIUM_DOMAIN_HINT})`);
    const context = phrase(cols[6], line);
    const sound_shift_ids: string[] = [];
    for (const pattern of cols[5].replace(/`/g, "").split(",").map((s) => s.trim())) {
      if (pattern === "Direct Cognate") continue;
      if (!Object.hasOwn(shifts, pattern) || sound_shift_ids.includes(pattern)) fail(line, `unknown or duplicate shift id: ${pattern}`);
      sound_shift_ids.push(pattern);
    }
    if (Object.hasOwn(ablautVerbs, base) && !sound_shift_ids.includes("strong_verbs_ablaut")) sound_shift_ids.push("strong_verbs_ablaut");
    const hookProblems = twinHookProblems(cols[2]);
    if (hookProblems.length) fail(line, `${id}: ${hookProblems.join("; ")} — ${HOOK_PROBLEM_HINT}`);
    const siblings = wordBases.get(base) ?? [];
    siblings.push({ line, suffix: cell.suffix });
    wordBases.set(base, siblings);
    for (const sid of sound_shift_ids) shifts[sid].word_ids.push(id);
    return [id, {
      id, target_word: headword, english_cognate: clean(cols[2]), english_meaning: clean(cols[2]),
      gender, ipa: cols[4], sound_shift_ids,
      shift_rule: sound_shift_ids.map((sid) => shifts[sid].symbol).join(" + ") || "Direct Cognate",
      context_phrase: context.text, context_translation: context.translation,
      etymology_derivation: cols[7], domain: cols[8],
    }] as const;
  });
  const words: Record<string, WordEntity> = Object.fromEntries(wordRows);
  for (const [base, entries] of wordBases) {
    if (entries.length !== 1 || !entries[0].suffix) continue;
    issues.push({
      line: entries[0].line + 1,
      message: `unnecessary id suffix "${base}#${entries[0].suffix}": no other row has the headword "${base}"`,
    });
  }
  const compoundIds = new Set<string>();
  const compounds = collect(rows(3, 7, "#"), ({ cols, line }) => {
    const compound = clean(cols[1]);
    const article = compound.match(/^(der|die|das)\s+/);
    const example = phrase(cols[6], line);
    return {
      id: uniqueId(compound.replace(/^(der|die|das)\s+/, "").toLowerCase(), compoundIds, line),
      compound, gender: article ? article[1] as Gender : null,
      literal_morphemes: cols[2].replace(/\*|"/g, "").trim(), real_meaning: clean(cols[3]),
      english_counterpart: cols[4], lore: clean(cols[5].replace(/<br>/g, " ")),
      example_sentence: example.text, example_translation: example.translation,
    };
  });
  const friendIds = new Set<string>();
  const falseFriends = collect(rows(4, 6, "#"), ({ cols, line }) => {
    const german_word = clean(cols[1]);
    const example = phrase(cols[5], line);
    return {
      id: uniqueId(german_word.replace(/^(der|die|das)\s+/, "").toLowerCase(), friendIds, line),
      german_word, looks_like: cols[2].replace(/\*|"/g, "").trim(), actual_meaning: clean(cols[3]), trap_note: cols[4],
      example_sentence: example.text, example_translation: example.translation,
    };
  });
  const dailyInsights = collect(rows(5, 5, "Day"), ({ cols, line }) => ({
    day: positiveInteger(cols[0].replace(/^Day\s+/, ""), line), german_expression: clean(cols[1]),
    english_meaning: cols[2], cultural_etymology: cols[3], takeaway_principle: cols[4].replace(/\*/g, "").trim(),
  }));
  return { words, shifts, compounds, falseFriends, dailyInsights };
}

/** Every structural or row-level problem in the source, in file order. */
export function analyzeCompendium(content: string): CompendiumAnalysis {
  const issues: CompendiumIssue[] = [];
  try {
    return { compendium: buildCompendium(content, issues), issues };
  } catch (error) {
    if (!(error instanceof SourceIssue)) throw error;
    issues.push({ line: error.line, message: error.message });
    return { compendium: null, issues };
  }
}

/** Parse completely before writing: malformed source must never shrink shipped data. */
export function parseCompendium(content: string): ParsedCompendium {
  const { compendium, issues } = analyzeCompendium(content);
  const first = issues[0];
  if (first) throw new Error(`word_connections.md:${first.line}: ${first.message}`);
  if (!compendium) throw new Error("word_connections.md: unparseable compendium");
  return compendium;
}

/** One line per §2 row, so a review never has to load the whole table. */
export function renderDigest(compendium: ParsedCompendium): string {
  const rows = Object.values(compendium.words).map(
    (word) => `| ${word.id} | ${word.target_word} | ${word.english_meaning} | ${word.gender ?? "-"} | ${word.domain ?? "-"} |`
  );
  return [
    "# Compendium digest",
    "",
    "<!-- Generated by `bun run parse-data` from word_connections.md. Do not edit. -->",
    "",
    `${rows.length} words, in compendium order.`,
    "",
    "| id | word | meaning | gender | domain |",
    "| :--- | :--- | :--- | :--- | :--- |",
    ...rows,
    "",
  ].join("\n");
}

if (import.meta.main) {
  const mdPath = path.resolve(__dirname, "../word_connections.md");
  const outputPath = path.resolve(__dirname, "../src/data/compendium.json");
  const compendium = parseCompendium(fs.readFileSync(mdPath, "utf-8"));
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(compendium, null, 2), "utf-8");
  fs.writeFileSync(path.resolve(__dirname, "../src/data/insights.json"), JSON.stringify(compendium.dailyInsights, null, 2), "utf-8");
  fs.writeFileSync(path.resolve(__dirname, "../src/data/compendium-digest.md"), renderDigest(compendium), "utf-8");
  console.log(`[Brücke Compendium Parser] Compiled:
 - ${Object.keys(compendium.words).length} Core Words
 - ${Object.keys(compendium.shifts).length} Shift Families
 - ${compendium.compounds.length} Compound Calques
 - ${compendium.falseFriends.length} False Friends
 - ${compendium.dailyInsights.length} Daily Cultural Insights
Saved to: ${outputPath}`);
}
