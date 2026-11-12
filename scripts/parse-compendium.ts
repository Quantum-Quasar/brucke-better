import fs from "fs";
import path from "path";
import type { CompendiumData, WordEntity, ShiftFamily, Gender } from "../src/lib/types";
import { HOOK_PROBLEM_HINT, twinHookProblems } from "../src/lib/english-hooks";

type ParsedCompendium = Omit<CompendiumData, "wordList">;

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

/** Parse completely before writing: malformed source must never shrink shipped data. */
export function parseCompendium(content: string): ParsedCompendium {
  const lines = content.split(/\r?\n/);
  const fail = (line: number, message: string): never => {
    throw new Error(`word_connections.md:${line + 1}: ${message}`);
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
  const rows = (sectionId: number, width: number, header: string) => {
    const section = sections.get(sectionId)!;
    const result: { cols: string[]; line: number }[] = [];
    let sawHeader = false;
    let sawSeparator = false;
    const numbers = new Set<number>();
    for (let i = section.start + 1; i < section.end; i++) {
      const text = lines[i].trim();
      if (!text || text === "---" || text.startsWith("<!--") || text.startsWith("### ")) continue;
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
    }
    if (!sawHeader || !sawSeparator || result.length !== section.count) {
      fail(section.start, `section ${sectionId}: inventory says ${section.count}, parsed ${result.length} rows (header and separator required)`);
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

  const words: Record<string, WordEntity> = {};
  const wordIds = new Set<string>();
  const ablautVerbs: Record<string, true> = {
    singen: true, trinken: true, finden: true, treiben: true, greifen: true, brechen: true,
    sprechen: true, geben: true, liegen: true, helfen: true, schlafen: true, kommen: true,
    gehen: true, schwimmen: true, bringen: true, essen: true, sitzen: true, ziehen: true,
  };
  for (const { cols, line } of rows(2, 9, "#")) {
    const rawGerman = clean(cols[1]);
    const id = uniqueId(rawGerman.toLowerCase(), wordIds, line);
    if (/^(der|die|das)\s/.test(id)) fail(line, "word cell must not contain its article");
    const genderMatch = cols[3].match(/^(der|die|das)(?:\s+\([mfn]\))?$/);
    if (cols[3] !== "-" && !genderMatch) fail(line, `invalid gender: ${cols[3]}`);
    const gender = genderMatch ? genderMatch[1] as Gender : null;
    const context = phrase(cols[6], line);
    const sound_shift_ids: string[] = [];
    for (const pattern of cols[5].replace(/`/g, "").split(",").map((s) => s.trim())) {
      if (pattern === "Direct Cognate") continue;
      if (!Object.hasOwn(shifts, pattern) || sound_shift_ids.includes(pattern)) fail(line, `unknown or duplicate shift id: ${pattern}`);
      sound_shift_ids.push(pattern);
    }
    if (Object.hasOwn(ablautVerbs, id) && !sound_shift_ids.includes("strong_verbs_ablaut")) sound_shift_ids.push("strong_verbs_ablaut");
    const hookProblems = twinHookProblems(cols[2]);
    if (hookProblems.length) fail(line, `${id}: ${hookProblems.join("; ")} — ${HOOK_PROBLEM_HINT}`);
    words[id] = {
      id, target_word: rawGerman, english_cognate: clean(cols[2]), english_meaning: clean(cols[2]),
      gender, ipa: cols[4], sound_shift_ids,
      shift_rule: sound_shift_ids.map((sid) => shifts[sid].symbol).join(" + ") || "Direct Cognate",
      context_phrase: context.text, context_translation: context.translation,
      etymology_derivation: cols[7], domain: cols[8],
    };
    for (const sid of sound_shift_ids) shifts[sid].word_ids.push(id);
  }
  const compoundIds = new Set<string>();
  const compounds = rows(3, 7, "#").map(({ cols, line }) => {
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
  const falseFriends = rows(4, 6, "#").map(({ cols, line }) => {
    const german_word = clean(cols[1]);
    const example = phrase(cols[5], line);
    return {
      id: uniqueId(german_word.replace(/^(der|die|das)\s+/, "").toLowerCase(), friendIds, line),
      german_word, looks_like: cols[2].replace(/\*|"/g, "").trim(), actual_meaning: clean(cols[3]), trap_note: cols[4],
      example_sentence: example.text, example_translation: example.translation,
    };
  });
  const dailyInsights = rows(5, 5, "Day").map(({ cols, line }) => ({
    day: positiveInteger(cols[0].replace(/^Day\s+/, ""), line), german_expression: clean(cols[1]),
    english_meaning: cols[2], cultural_etymology: cols[3], takeaway_principle: cols[4].replace(/\*/g, "").trim(),
  }));
  return { words, shifts, compounds, falseFriends, dailyInsights };
}

if (import.meta.main) {
  const mdPath = path.resolve(__dirname, "../word_connections.md");
  const outputPath = path.resolve(__dirname, "../src/data/compendium.json");
  const compendium = parseCompendium(fs.readFileSync(mdPath, "utf-8"));
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(compendium, null, 2), "utf-8");
  fs.writeFileSync(path.resolve(__dirname, "../src/data/insights.json"), JSON.stringify(compendium.dailyInsights, null, 2), "utf-8");
  console.log(`[Brücke Compendium Parser] Compiled:
 - ${Object.keys(compendium.words).length} Core Words
 - ${Object.keys(compendium.shifts).length} Shift Families
 - ${compendium.compounds.length} Compound Calques
 - ${compendium.falseFriends.length} False Friends
 - ${compendium.dailyInsights.length} Daily Cultural Insights
Saved to: ${outputPath}`);
}
