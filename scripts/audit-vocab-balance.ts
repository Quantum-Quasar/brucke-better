// Vocabulary-balance audit (vocab-rebalance-650 campaign).
//
// Complements scripts/audit-word-refs.ts (existence) with the ORDERING and
// BALANCE dimensions from docs/vocab-rebalance-movelist.md:
//   a. new-words-per-lesson within bands (classification printed for eyeballing)
//   b. no word required before its introduction lesson in trail order
//      (word_ids ordering is exact; German exercise-surface tokens are resolved
//      to candidate words and checked against first introduction, with a
//      documented PRE_EXISTING allowlist for drifts that predate this campaign)
//   c. per-word floor: ≥1 exercise mention; weaving target ≥3 later lessons
//      (minimum acceptable 2 — shortfalls below 3 are reported, below 2 fail)
//   d. zero-new lessons ≤ 25% (enforced in --strict, reported otherwise)
//   e. explicit deferral list (documented temporary exceptions)
//
// Modes:
//   bun scripts/audit-vocab-balance.ts           per-batch: fails on real
//       violations (legality, exposure/band on executed rows); reports
//       move-list rows still pending as progress.
//   bun scripts/audit-vocab-balance.ts --strict  checkpoint: additionally
//       requires every move-list row executed, zero-new ≤ 25%, and exits 1
//       on any pending row.

import { LESSONS } from "../src/data/lessons";
import { compendium } from "../src/data/compendium";
import { flattenTrailNodes } from "../src/data/curriculum";

const STRICT = process.argv.includes("--strict");

// ---------------------------------------------------------------- classification
// pattern: single-rule exemplar sets (sound-shift cores & sprigs, prefix families)
const PATTERN = new Set([1, 3, 4, 5, 6, 7, 8, 15, 16, 25, 26, 3002, 101, 301, 302, 401, 402, 501, 502, 601, 602, 701, 801, 2601]);
const GRAMMAR_CORE = new Set([2, 9, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 22, 23, 24, 27, 28, 29]);
// Deliberate zero-new revision lessons (drill/gym/reading/review; never accidental).
const REVISION = new Set([30, 702, 902, 1002, 1003, 1101, 1201, 1302, 1401, 1501, 1803, 1901, 2002, 2202, 2501, 3001, 3003, 5012, 5041, 5052, 5061, 5062, 5063, 5361, 5362]);
const BANDS: Record<string, [number, number]> = {
  pattern: [4, 11], grammarCore: [3, 6], consolidation: [2, 4], revision: [0, 2], branch: [0, 8], story: [0, 8],
};
const roleOf = (id: number, kind: string) =>
  PATTERN.has(id) ? "pattern" : GRAMMAR_CORE.has(id) ? "grammarCore" : REVISION.has(id) ? "revision" : kind === "story" ? "story" : kind === "branch" ? "branch" : "consolidation";

// ---------------------------------------------------------------- deferrals
// Lesson-level: (reason, Campaign 2 plan) — see docs/vocab-rebalance-movelist.md.
const LESSON_DEFERRALS: Record<number, string> = {
  2401: "Twin Suppletions: closed-class suppletion; no fitting untouched compendium words. Campaign 2: add gern/lieber entries and host here.",
  2801: "fahren & its Dynasty: the planned words (urlaub, meer) were hosted at l29, where the sea/vacation idioms belong; fahren, Fahrt and Zug are all taught earlier in full, so the lesson consolidates. Campaign 2: host Fahrplan/Fahrkarte here.",
};
// Tail words: fewer than 3 later lessons exist; floor met at the minimum (2).
const TAIL_DEFERRALS = new Set(["lehrer", "person", "freund"]);

// German exercise-surface tokens that referenced their word before its
// introduction in the PRE-CAMPAIGN tree. Documented drifts; shrink as batches
// reword them. Format: `${lessonId}:${token.toLowerCase()}`.
const PRE_EXISTING = new Set([
  "2:soll", "9:kaffee", "9:tee", "12:weiß", "13:weißt", "14:weiß", "22:lesen", "23:auto",
  "23:autos", "28:gift", "30:gabe", "30:rat", "30:gift", "1401:weiß", "1402:müde",
  "1604:ziehe", "1702:mittwoch", "1802:auto", "2401:film", "2403:wein", "2501:gabe",
  "2501:gift", "2901:gelesen", "3001:abend", "3001:gelesen", "1002:sehe",
  "21:zahnarzt", "21:zahn", "902:art", "1201:bekomme", "1403:vergesse", "602:kaffee",
  "602:kind", "302:schreiben", "1801:werden", "1802:werde",
  // Activated by this campaign, not authored by it: these tokens are original
  // exercise prose (verified against the pre-campaign tree at e0e9b1a) that
  // used the word before any lesson listed it. Teaching the word later in the
  // trail — as Campaign 1 does — is what lets the resolver see it at all.
  "1:deutsch", "1:brücke", "103:wander", "302:schlagen", "1101:kurz",
  "1201:weiß", "1501:fall", "1601:brücke", "1801:gewandert", "1803:gewandert",
  "2101:krankenhaus", "2101:spielen", "2201:wanderung", "2302:lehrer",
  // Activated by Campaign 2's calendar/time lessons (5121–5141), same situation:
  // original prose, verified at e0e9b1a, that named the word long before any
  // lesson listed it. "weißt" is the conjugated wissen ("do you know"), which the
  // stem resolver reads as the adjective weiß — a homograph, not an ordering fault.
  "1302:weißt", "1401:jetzt", "1703:viertel",
  // Activated by Campaign 2's batch-3 lessons (5171–5191), verified at e0e9b1a:
  // l1701's bus fare, l21's compound tile "schuh" (Zahn/arzt/haus/zeug/schuh),
  // l5052's cat-on-the-sofa reading, l8/l802's -ieren Computer sentences.
  "1701:bus", "21:schuh", "5052:sofa", "8:computer", "802:computer",
  // Activated by Campaign 2's late lessons, verified original prose:
  // l21's compound tile "arzt" (Zahn/arzt/haus/zeug/schuh), l5071's
  // "Herr Braun" — a surname, homonym of the color (the weißt/weiß class).
  "21:arzt", "5071:braun",
  // Surfaced when the ordering scan grew to dictation / spoken-turn surfaces;
  // all three are original prose present at e0e9b1a: l13's "Wo wohnst du
  // jetzt" and l1301's "dort" distractor chip.
  "13:wohnst", "13:jetzt", "1301:dort",
]);

// Weaves that are planned but not yet executed: word -> host lessons that will
// carry the word's remaining later appearances in a later batch. While a host
// row is pending the weaving floor reports pending, not failed (same rule the
// band check uses for unexecuted rows); --strict still demands they land.
const WEAVE_PLAN: Record<string, number[]> = {
  "ausziehen": [5072],
  "öl": [5072],
  "tüte": [5072],
  // Campaign 2 batch 1 (5121–5141). Each host below is a lesson already wired in
  // curriculum.ts and slated for authoring; the weave lands when that batch does.
  eins: [5161, 5172],
  vier: [5142, 5172],
  fünf: [5162, 5182],
  sechs: [5162, 5182],
  zehn: [5142, 5172],
  null: [5151, 5241],
  zahl: [5151, 5211],
  nummer: [5161, 5192],
  hälfte: [5172, 5211],
  million: [5151, 5222],
  immer: [5161, 5221],
  oft: [5142, 5143],
  manchmal: [5162, 5231],
  selten: [5191, 5292],
  einmal: [5143, 5232],
  sofort: [5161, 5272],
  später: [5151, 5191],
  früh: [5151, 5271],
  endlich: [5162, 5301],
  januar: [5143, 5271],
  februar: [5143, 5271],
  märz: [5143, 5271],
  april: [5143, 5222],
  mai: [5143, 5222],
  // Campaign 2 batch 2 (5142–5162). Hosts queued in later batches; the weave
  // lands as each host batch is authored. (5223 has no shell — jetzt's second
  // host re-pointed to 5221, which carries it naturally.)
  jetzt: [5151, 5221],
  juni: [5252, 5262],
  juli: [5262, 5143],
  august: [5143, 5261],
  september: [5261, 5222],
  oktober: [5143, 5222],
  november: [5252, 5271],
  dezember: [5271, 5241],
  feiertag: [5271, 5292],
  ostern: [5231, 5221],
  wochentag: [5221, 5292],
  moment: [5191, 5211],
  dauern: [5252, 5232],
  termin: [5281, 5292],
  sekunde: [5191, 5212],
  datum: [5252, 5271],
  hier: [5162, 5251],
  dort: [5201, 5162],
  "drüben": [5162, 5251],
  "gegenüber": [5201, 5251],
  umweg: [5172, 5251],
  links: [5171, 5251],
  rechts: [5171, 5251],
  geradeaus: [5171, 5172],
  oben: [5201, 5202],
  unten: [5201, 5202],
  // Campaign 2 batch 3 (5171–5191). Compass points ride the distance and
  // country lessons; the loanwords the Wohnen/Reisen/Hobbys lessons; the
  // wardrobe the Kleidung II and -er-job lessons.
  hinten: [5202, 5282],
  norden: [5172, 5262],
  osten: [5172, 5271],
  westen: [5172, 5262],
  "süden": [5172, 5262],
  "nähe": [5201, 5252],
  weit: [5201, 5261],
  fern: [5262, 5271],
  quer: [5261, 5251],
  entlang: [5202, 5251],
  sofa: [5201, 5202],
  radio: [5292, 5301],
  klavier: [5292, 5301],
  computer: [5202, 5281],
  kino: [5252, 5292],
  hotel: [5252, 5271],
  taxi: [5252, 5301],
  bus: [5282, 5252],
  theater: [5252, 5301],
  hobby: [5292, 5301],
  schuh: [5192, 5292],
  hose: [5192, 5282],
  hemd: [5192, 5282],
  mantel: [5192, 5282],
  jacke: [5192, 5282],
  // Batches 4-8: every remaining campaign word gets two queued hosts in later
  // lessons (the last two lessons' words fall under the tail rule instead —
  // fewer than two later lessons exist, so the floor reports thin, not failed).
  socke: [5282, 5292],
  tasche: [5261, 5252],
  "mütze": [5242, 5271],
  schal: [5241, 5282],
  hut: [5261, 5282],
  zimmer: [5202, 5252],
  wohnung: [5202, 5251],
  flur: [5202, 5312],
  keller: [5291, 5312],
  etage: [5202, 5302],
  teppich: [5241, 5312],
  schrank: [5241, 5312],
  spiegel: [5291, 5312],
  vorhang: [5241, 5312],
  balkon: [5241, 5312],
  gabel: [5221, 5232],
  messer: [5221, 5232],
  flasche: [5221, 5232],
  becher: [5221, 5232],
  kanne: [5221, 5232],
  herd: [5232, 5312],
  ofen: [5231, 5232],
  seife: [5232, 5312],
  kamm: [5291, 5312],
  klingel: [5302, 5312],
  fisch: [5261, 5271],
  fleisch: [5232, 5282],
  "käse": [5232, 5282],
  suppe: [5232, 5312],
  "gemüse": [5232, 5282],
  obst: [5232, 5261],
  kartoffel: [5261, 5282],
  tomate: [5232, 5261],
  gurke: [5261, 5282],
  zwiebel: [5261, 5282],
  zucker: [5232, 5312],
  honig: [5232, 5311],
  schokolade: [5232, 5301],
  keks: [5232, 5301],
  torte: [5232, 5301],
  "frühstück": [5252, 5292],
  "brötchen": [5252, 5301],
  marmelade: [5252, 5302],
  toast: [5252, 5301],
  butterbrot: [5252, 5302],
  rot: [5242, 5262],
  blau: [5242, 5261],
  "grün": [5242, 5271],
  schwarz: [5242, 5312],
  bunt: [5242, 5302],
  braun: [5262, 5291],
  grau: [5261, 5271],
  rosa: [5271, 5292],
  lila: [5271, 5312],
  farbe: [5271, 5312],
  fahrrad: [5261, 5292],
  koffer: [5252, 5261],
  karte: [5262, 5271],
  haltestelle: [5252, 5261],
  dorf: [5261, 5302],
  fahrkarte: [5261, 5271],
  fahrplan: [5261, 5282],
  abfahrt: [5261, 5271],
  ankunft: [5261, 5271],
  flughafen: [5271, 5291],
  ausflug: [5271, 5302],
  tourist: [5271, 5302],
  "gepäck": [5291, 5302],
  pass: [5291, 5302],
  "fähre": [5262, 5271],
  deutschland: [5271, 5302],
  frankreich: [5271, 5291],
  england: [5271, 5302],
  spanien: [5271, 5291],
  italien: [5271, 5282],
  schweiz: [5272, 5291],
  "österreich": [5272, 5281],
  "türkei": [5272, 5292],
  polen: [5272, 5282],
  irland: [5272, 5292],
  sprache: [5282, 5292],
  "französisch": [5291, 5302],
  "englisch": [5291, 5302],
  spanisch: [5291, 5302],
  "italienisch": [5291, 5292],
  arzt: [5292, 5311],
  "bäcker": [5291, 5302],
  "verkäufer": [5291, 5292],
  polizist: [5282, 5302],
  "schüler": [5282, 5302],
  student: [5291, 5302],
  fahrer: [5291, 5302],
  "sänger": [5292, 5301],
  bauer: [5292, 5311],
  arbeiter: [5302, 5312],
  ingenieur: [5302, 5311],
  friseur: [5301, 5312],
  beruf: [5292, 5301],
  pilot: [5302, 5311],
  kellner: [5302, 5312],
  musik: [5301, 5311],
  sport: [5301, 5311],
  lied: [5301, 5311],
  tanzen: [5301, 5311],
  malen: [5301, 5302],
  party: [5302, 5311],
  gitarre: [5302, 5311],
  schach: [5302, 5311],
  freizeit: [5302, 5311],
  reiten: [5302, 5311],
};

// Zero-new lessons that are deliberately deferred rather than filled (see
// docs/vocab-rebalance-movelist.md). Superset of LESSON_DEFERRALS' rationale:
// these are reported, never silently counted into the ≤25% budget.
const ZERO_NEW_DEFERRALS: Record<number, string> = {
  2801: "fahren & its Dynasty: the planned words (urlaub, meer) were hosted at l29, where the sea/vacation idioms belong; fahren, Fahrt and Zug are all taught earlier in full, so the lesson consolidates. Campaign 2: host Fahrplan/Fahrkarte here.",
};

// Move-list planned adds (word -> host lesson), for progress reporting only.
const PLANNED: Record<string, number> = {
  stehen: 9, zeigen: 9, küssen: 9, bett: 11, teller: 11, kurz: 12, laut: 12, leise: 12, billig: 12,
  dunkel: 14, sorge: 14, gleich: 14, meinung: 14, ankommen: 18, buchen: 18, blasen: 19, frieren: 19,
  zahnarzt: 21, hauptstadt: 21, zeitung: 22, berg: 22, blatt: 23, auge: 23, ei: 23, knie: 23,
  ecke: 27, mitte: 27, strand: 27, gewinnen: 28, schauen: 28, hunger: 29, krank: 29, satt: 29,
  glücklich: 29, spät: 24, pfirsich: 301, pflanze: 302, mund: 401, kleid: 401, monat: 401, darm: 401,
  zunge: 501, süß: 502, knochen: 601, riechen: 601, koch: 601, weich: 601, kauen: 602,
  fotografieren: 801, anprobieren: 802, spazieren: 802, hell: 2601, mond: 2601, stern: 2601,
  deutsch: 102, bier: 102, kuchen: 102, wurst: 102, lust: 201, teuer: 201, fernsehen: 202,
  einsteigen: 202, aussteigen: 202, setzen: 901, sitzen: 901, halten: 901, stuhl: 1001,
  fenster: 1001, löffel: 1001, insel: 1102, nebel: 1102, baum: 1102, getränk: 1103, tasse: 1103,
  nie: 1202, nichts: 1202, niemand: 1202, katze: 1301, hund: 1301, kennen: 1301, tier: 1301,
  weiß: 1402, traurig: 1402, angst: 1402, hoffnung: 1402, einkaufen: 1502, abfahren: 1502,
  verdienen: 1601, beginnen: 1602, bezahlen: 1602, ausziehen: 1604, hundert: 1701, minute: 1701,
  zählen: 1701, wochenende: 1703, sommer: 1703, winter: 1703, tragen: 1801, fliegen: 1802,
  fallen: 1902, springen: 1902, treten: 1902, schlagen: 1903, stehlen: 1903, jung: 1904,
  stark: 1904, schwach: 1904, gesund: 1904, wünschen: 1905, glück: 2001, mut: 2001, wunsch: 2001,
  schmecken: 2003, fußball: 2101, regenbogen: 2101, heimweh: 2101, geburtstag: 2102, feiern: 2102,
  flugzeug: 2103, briefmarke: 2103, rechnung: 2201, blume: 2201, lampe: 2201, bluse: 2201,
  maus: 2301, vogel: 2301, kuh: 2301, spiel: 2302, stunde: 2302, schnell: 2402, schwer: 2402,
  lecker: 2403, neu: 2403, voll: 2404, nass: 2404, selbst: 2502, mitternacht: 2602, nichte: 2602,
  legen: 2603, hafen: 2701, wald: 2701, brücke: 2701, platz: 2702, fluss: 2703, markt: 2703,
  wand: 2703, urlaub: 29, meer: 29, holen: 2802, wieder: 2802, leute: 2901, himmel: 2901,
  mensch: 2901, schlecht: 2902, fertig: 2902, lustig: 2902, übel: 2903,
  fabrik: 5021, gymnasium: 5021, rente: 5021, dom: 5021, art: 5021, kaution: 5021, eventuell: 5021,
  öl: 5031, tüte: 5031, freundlich: 5082, familie: 5091, lehrer: 5101, person: 5101,
  freund: 5102, herr: 5011, buchstabe: 5072,
  // Campaign 2 — the A1 expansion. 40 new branch lessons (5121–5312), five new
  // words each, reaching ≥650 unique. Added to PLANNED as each batch lands so the
  // band, weaving and exposure checks treat them as this campaign's words.
  eins: 5121, vier: 5121, fünf: 5121, sechs: 5121, zehn: 5121,
  null: 5122, zahl: 5122, nummer: 5122, hälfte: 5122, million: 5122,
  immer: 5131, oft: 5131, manchmal: 5131, selten: 5131, einmal: 5131,
  jetzt: 5132, sofort: 5132, später: 5132, früh: 5132, endlich: 5132,
  januar: 5141, februar: 5141, märz: 5141, april: 5141, mai: 5141,
  juni: 5142, juli: 5142, august: 5142, september: 5142, oktober: 5142,
  november: 5143, dezember: 5143, feiertag: 5143, ostern: 5143, wochentag: 5143,
  moment: 5151, dauern: 5151, termin: 5151, sekunde: 5151, datum: 5151,
  hier: 5161, dort: 5161, "drüben": 5161, "gegenüber": 5161, umweg: 5161,
  links: 5162, rechts: 5162, geradeaus: 5162, oben: 5162, unten: 5162,
  hinten: 5171, norden: 5171, osten: 5171, westen: 5171, "süden": 5171,
  "nähe": 5172, weit: 5172, fern: 5172, quer: 5172, entlang: 5172,
  sofa: 5181, radio: 5181, klavier: 5181, computer: 5181, kino: 5181,
  hotel: 5182, taxi: 5182, bus: 5182, theater: 5182, hobby: 5182,
  schuh: 5191, hose: 5191, hemd: 5191, mantel: 5191, jacke: 5191,
  socke: 5192, tasche: 5192, "mütze": 5192, schal: 5192, hut: 5192,
  zimmer: 5201, wohnung: 5201, flur: 5201, keller: 5201, etage: 5201,
  teppich: 5202, schrank: 5202, spiegel: 5202, vorhang: 5202, balkon: 5202,
  gabel: 5211, messer: 5211, flasche: 5211, becher: 5211, kanne: 5211,
  herd: 5212, ofen: 5212, seife: 5212, kamm: 5212, klingel: 5212,
  fisch: 5221, fleisch: 5221, "käse": 5221, suppe: 5221, "gemüse": 5221,
  obst: 5222, kartoffel: 5222, tomate: 5222, gurke: 5222, zwiebel: 5222,
  zucker: 5231, honig: 5231, schokolade: 5231, keks: 5231, torte: 5231,
  "frühstück": 5232, "brötchen": 5232, marmelade: 5232, toast: 5232, butterbrot: 5232,
  rot: 5241, blau: 5241, "grün": 5241, schwarz: 5241, bunt: 5241,
  braun: 5242, grau: 5242, rosa: 5242, lila: 5242, farbe: 5242,
  fahrrad: 5251, koffer: 5251, karte: 5251, haltestelle: 5251, dorf: 5251,
  fahrkarte: 5252, fahrplan: 5252, abfahrt: 5252, ankunft: 5252, flughafen: 5252,
  ausflug: 5261, tourist: 5261, "gepäck": 5261, pass: 5261, "fähre": 5261,
  deutschland: 5262, frankreich: 5262, england: 5262, spanien: 5262, italien: 5262,
  schweiz: 5271, "österreich": 5271, "türkei": 5271, polen: 5271, irland: 5271,
  sprache: 5272, "französisch": 5272, "englisch": 5272, spanisch: 5272, "italienisch": 5272,
  arzt: 5281, "bäcker": 5281, "verkäufer": 5281, polizist: 5281, "schüler": 5281,
  student: 5282, fahrer: 5282, "sänger": 5282, bauer: 5282, arbeiter: 5282,
  ingenieur: 5291, friseur: 5291, beruf: 5291, pilot: 5291, kellner: 5291,
  musik: 5292, sport: 5292, lied: 5292, tanzen: 5292, malen: 5292,
  party: 5301, gitarre: 5301, reiten: 5301, schach: 5301, freizeit: 5301,
  wir: 5302, schule: 5302, gast: 5302, gruppe: 5302, held: 5302,
  liebe: 5311, nett: 5311, "wütend": 5311, stolz: 5311, freude: 5311,
  richtig: 5312, falsch: 5312, sauber: 5312, leer: 5312, offen: 5312,
};
const REMOVALS: Record<string, string[]> = { 3002: ["fabrik", "gymnasium", "rente", "dom", "art", "kaution", "eventuell"] };
// Re-home donors: lesson keeps the word, but its introduction moved earlier.
const REHOME_DONOR: Record<string, string[]> = { 5092: ["familie"] };
// Standalone exposure fixes (zero-mention words whose host gets only an
// exercise touch). Inline fixes ride on PLANNED rows (stumpf@302, salz@502,
// begriff@22, klein@2402, lang@2403, argumentieren@801, dürfen@1905,
// handy/aktuell@3002, zahn@21 via zahnarzt, familie@5091).
const EXPOSURE_PLAN: Record<string, number> = {
  arm: 1, finger: 1, ring: 101, apfel: 3, akzeptieren: 8, informieren: 8, existieren: 8,
  teufel: 701, tausend: 701, heute: 17, gabe: 30, freuen: 1603, wohnen: 5071, jahr: 5071,
  heißen: 5071, geld: 5081, müde: 5081, froh: 5081, lesen: 5101,
};

// ---------------------------------------------------------------- resolver
const compIds = new Set(Object.keys(compendium.words));
const compTargets = new Map<string, string[]>();
for (const [id, w] of Object.entries(compendium.words)) {
  const t = w.target_word.toLowerCase();
  (compTargets.get(t) ?? compTargets.set(t, []).get(t)!).push(id);
}
// Function words beyond src/lib/word-refs-audit.ts's closed list (documented:
// uns/man/wen are pronouns, werden/werde is the future auxiliary — function
// class, no compendium claim). The ordering check consults these; existence
// is still word-refs-audit's business.
const FUNCTION_WORDS = new Set(
  [
    "ich", "du", "er", "sie", "es", "wir", "ihr",
    "mich", "dir", "mir", "ihm", "ihnen", "uns",
    "der", "die", "das", "den", "dem", "ein", "eine", "einen", "einem", "einer",
    "kein", "keine", "keinen", "mein", "meine", "meinen", "dein", "deine",
    "ist", "bin", "bist", "sind", "war", "waren", "hat", "habe", "haben", "hatte",
    "gibt", "und", "oder", "aber", "weil", "dass", "wenn", "als", "wie",
    "nicht", "ja", "nein", "bitte", "danke", "sehr", "gut", "hier",
    "in", "an", "auf", "aus", "bei", "mit", "nach", "von", "zu", "zum", "zur", "vor",
    "durch", "über", "unter", "ohne", "für",
    "morgen", "heute", "gestern", "früh", "drei", "zwei", "zwölf", "eins",
    "was", "wo", "wer", "wann", "warum", "wohin",
    "guten", "gute", "danke", "man", "wen",
  ]
);
const EXTRA_FUNCTION = new Set(["werden", "werde"]);
const RESOLVED: Record<string, string> = {
  kannst: "können", kann: "können", willst: "wollen", hast: "haben", hilft: "helfen",
  hilf: "helfen", gefunden: "finden", fand: "finden", gegessen: "essen", stehe: "aufstehen",
  steht: "aufstehen", genommen: "nehmen", gibst: "geben", kaufe: "einkaufen",
};
const stemOf = (id: string) => (id.length > 4 && id.endsWith("en") ? id.slice(0, -2) : id);
const stems = new Map<string, string[]>();
for (const id of compIds) (stems.get(stemOf(id)) ?? stems.set(stemOf(id), []).get(stemOf(id))!).push(id);
const fold = (s: string) => s.replace(/ä/g, "a").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ß/g, "ss");

function candidates(rawToken: string): string[] {
  const raw = rawToken.toLowerCase().replace(/[.,!?;:)]+$/, "");
  if (!raw || FUNCTION_WORDS.has(raw) || EXTRA_FUNCTION.has(raw)) return [];
  const out = new Set<string>();
  if (RESOLVED[raw]) out.add(RESOLVED[raw]);
  for (const id of compTargets.get(raw) ?? []) out.add(id);
  const geStripped = raw.startsWith("ge") && raw.length > 4 ? raw.slice(2) : raw;
  for (const id of compTargets.get(fold(geStripped)) ?? []) out.add(id);
  // Stem matching is morphological, and only the sharp-s fold may apply: folding
  // umlauts here made zähle (zählen, taught long ago) resolve to the unrelated
  // noun zahl. German umlauts are meaning. The ß→ss fold is kept because weist and
  // weiß really are the same word written two ways.
  if (geStripped.length >= 4) for (const [stem, ids] of stems) {
    if (stem.length >= 4 && geStripped.startsWith(stem)) for (const id of ids) out.add(id);
  }
  return [...out];
}

// ---------------------------------------------------------------- walk
type Node = { id: number; kind: "core" | "sprig" | "branch"; topicId: number };
const nodes = flattenTrailNodes() as unknown as Node[];
const byId = new Map(LESSONS.map((l) => [l.id, l]));
const plannedWordIds = new Map<number, Set<string>>(LESSONS.map((l) => [l.id, new Set(l.word_ids)]));

const firstIntro = new Map<string, number>();
// Hollow shells (Campaign 2 branches still queued for authoring) have no Lesson
// behind them yet; the taught trail is the authored nodes only.
const trail = nodes.filter((n) => byId.has(n.id)).map((n, i) => {
  const lesson = byId.get(n.id)!;
  const wids = [...plannedWordIds.get(n.id)!];
  const newW: string[] = [];
  for (const w of wids) if (!firstIntro.has(w)) { firstIntro.set(w, i); newW.push(w); }
  return { idx: i, id: n.id, kind: n.kind, title: lesson.title, wids, newW, role: roleOf(n.id, n.kind) };
});

// ---------------------------------------------------------------- checks
const fails: string[] = [], notes: string[] = [];

// b. legality — word_ids ordering (exact)
for (const l of trail) {
  for (const w of l.wids) {
    const intro = firstIntro.get(w) ?? Infinity;
    if (intro > l.idx) fails.push(`legality: l${l.id} word_ids entry "${w}" first introduced at trail ${intro}`);
  }
}
// b. legality — German exercise-surface tokens (allowlist for pre-campaign drifts)
function surfaces(lesson: (typeof LESSONS)[number]): Array<{ where: string; text: string }> {
  const out: Array<{ where: string; text: string }> = [];
  for (const ex of lesson.exercises) {
    const w = `l${lesson.id}/${ex.id}`;
    if (ex.type === "morpheme_tiles") out.push({ where: w, text: [...(ex.tile_options ?? []), ex.target_answer].join(" ") });
    else if (ex.type === "matching_pairs") out.push({ where: w, text: (ex.matching_pairs ?? []).map((p) => p.german).join(" ") });
    else if (ex.type === "shift_select") out.push({ where: w, text: [...(ex.options ?? []), ex.target_answer].join(" ") });
    else if (ex.type === "derive" || ex.type === "reverse_cognate") out.push({ where: w, text: ex.target_answer });
    else if (ex.type === "syntax_builder") out.push({ where: w, text: [...(ex.word_bank ?? []), ex.target_answer].join(" ") });
    else if (ex.type === "transcribe") out.push({ where: w, text: [ex.target_answer, ...(ex.word_bank ?? [])].join(" ") });
    else if (ex.type === "literal_gloss") out.push({ where: w, text: [ex.german ?? "", ex.target_answer].join(" ") });
    else if (ex.type === "family_matrix")
      out.push({ where: w, text: (ex.cells ?? []).flat().map((c) => c.german).join(" ") });
    else if (ex.type === "dictation")
      out.push({ where: w, text: [ex.spoken ?? ex.target_answer, ex.target_answer].join(" ") });
    else if (ex.type === "variant_english") out.push({ where: w, text: ex.german ?? "" });
    else if (ex.type === "pronoun_compression")
      out.push({ where: w, text: [ex.full_sentence ?? "", ex.target_answer, ...(ex.word_bank ?? [])].join(" ") });
    else if (ex.type === "spoken_turn_reply")
      out.push({ where: w, text: [ex.spoken_question ?? "", ex.target_answer, ...(ex.word_bank ?? [])].join(" ") });
  }
  if (lesson.twist) out.push({ where: `l${lesson.id}/twist`, text: [lesson.twist.target_answer, ...(lesson.twist.word_bank ?? [])].join(" ") });
  return out;
}
let preExistingHits = 0;
for (const l of trail) {
  const lesson = byId.get(l.id)!;
  // A vocab hint is an in-place gloss: a word the lesson introduces right where
  // it uses it counts as introduced here, not as a future-word leak.
  const hinted = new Set(
    lesson.exercises.flatMap((ex) => (ex.vocab_hints ?? []).map((h) => h.word.toLowerCase()))
  );
  for (const surf of surfaces(lesson)) {
    for (const tok of surf.text.split(/[\s—]+/)) {
      if (hinted.has(tok.toLowerCase().replace(/[.,!?;:)]+$/, ""))) continue;
      const cands = candidates(tok);
      if (!cands.length) continue;
      const firsts = cands.map((c) => firstIntro.get(c)).filter((x): x is number => x !== undefined);
      if (!firsts.length) continue;
      if (Math.min(...firsts) > l.idx) {
        const key = `${l.id}:${tok.toLowerCase().replace(/[.,!?;:)]+$/, "")}`;
        if (PRE_EXISTING.has(key)) { preExistingHits++; continue; }
        fails.push(`legality: l${l.id} ${surf.where} token "${tok}" resolves to word(s) introduced later (trail ${Math.min(...firsts)})`);
      }
    }
  }
}

// execution progress: a host lesson's row is executed when every planned add
// landed at it, every planned removal was shed, and every re-home moved past it.
const rowExecuted = (lessonId: number): boolean => {
  const l = trail.find((x) => x.id === lessonId);
  // A Campaign 2 shell whose Lesson has not been authored yet is a pending row,
  // never an executed one — its planned words cannot have landed.
  if (!l) return false;
  for (const [w, host] of Object.entries(PLANNED)) if (host === lessonId && firstIntro.get(w) !== l.idx) return false;
  for (const w of REMOVALS[lessonId] ?? []) if (l.wids.includes(w)) return false;
  for (const w of REHOME_DONOR[lessonId] ?? []) if ((firstIntro.get(w) ?? Infinity) >= l.idx) return false;
  return true;
};
// exercise-mention counts per word (exact target-word form across all
// exercises + twist), used by both the progress tracker and the exposure check
const targetOf = new Map(Object.entries(compendium.words).map(([id, w]) => [id, w.target_word.toLowerCase()]));
const wordMentions = new Map<string, number>();
for (const lesson of LESSONS) {
  const hay = JSON.stringify(lesson.exercises) + (lesson.twist ? JSON.stringify(lesson.twist) : "");
  for (const wid of new Set(lesson.word_ids)) {
    const t = targetOf.get(wid) ?? wid;
    const re = new RegExp(`(?<![\\p{L}])${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\p{L}])`, "giu");
    const m = hay.match(re);
    if (m) wordMentions.set(wid, (wordMentions.get(wid) ?? 0) + m.length);
  }
}

const pending: string[] = [], executed: string[] = [];
const hosts = new Set<number>([...Object.values(PLANNED), ...Object.keys(REMOVALS).map(Number), ...Object.keys(REHOME_DONOR).map(Number)]);
for (const host of hosts) {
  if (rowExecuted(host)) executed.push(`${host}`); else pending.push(`${host}`);
}
for (const [w, host] of Object.entries(EXPOSURE_PLAN)) {
  if (wordMentions.get(w)) executed.push(`mention:${w}@l${host}`); else pending.push(`mention:${w}@l${host}`);
}

// c. exposure — every taught word has ≥1 explicit exercise mention (per word,
// across the whole trail). Pending while its plan row is unexecuted; a real
// failure only when the row executed but the mention never landed.
const exposureFails: string[] = [], exposurePending: string[] = [];
for (const [wid, host] of [...Object.entries(PLANNED), ...Object.entries(EXPOSURE_PLAN)]) {
  if ((wordMentions.get(wid) ?? 0) === 0) {
    if (rowExecuted(host) && PLANNED[wid] === host) exposureFails.push(`${wid}@l${host}`);
    else exposurePending.push(`${wid}@l${host}`);
  }
}
for (const f of exposureFails) fails.push(`exposure: taught word "${f}" has zero exercise mentions`);
if (STRICT && exposurePending.length) fails.push(`strict: ${exposurePending.length} words still lack an exercise mention: ${exposurePending.join(", ")}`);
else if (exposurePending.length) notes.push(`${exposurePending.length} words pending their exposure fix (${exposurePending.slice(0, 8).join(", ")}${exposurePending.length > 8 ? " …" : ""})`);

// c. weaving — later-lesson appearances per introduced word. The floor binds
// words this campaign introduces (PLANNED); pre-existing shortfalls are notes.
const wordUse = new Map<string, number[]>();
for (const l of trail) for (const w of l.wids) (wordUse.get(w) ?? wordUse.set(w, []).get(w)!).push(l.idx);
const weaveFails: string[] = [], weaveThin: string[] = [], weavePreExisting: string[] = [];
let pendingWeave = 0;
for (const [w, hostIdx] of [...firstIntro]) {
  const later = (wordUse.get(w) ?? []).filter((t) => t > hostIdx).length;
  const laterExist = trail.length - 1 - hostIdx;
  const campaignWord = w in PLANNED;
  const rowDone = campaignWord && firstIntro.get(w) === trail.find((l) => l.id === PLANNED[w])!.idx;
  if (later >= 3) continue;
  const label = `${w}@l${trail[hostIdx].id}:${later}`;
  if (campaignWord) {
    if (!rowDone) pendingWeave++;
    else if (later < 2 && laterExist >= 2 && !TAIL_DEFERRALS.has(w)) {
      const queued = (WEAVE_PLAN[w] ?? []).some((h) => !rowExecuted(h));
      if (queued) pendingWeave++;
      else weaveFails.push(label);
    } else weaveThin.push(label);
  } else {
    if (later < 2 && laterExist >= 2) weavePreExisting.push(label); // documented pre-existing shortfall
    else weaveThin.push(label);
  }
}
for (const f of weaveFails) fails.push(`weaving: "${f.split(":")[0]}" (intro ${f.split("@")[1].split(":")[0]}) used in only ${f.split(":")[1]} later lesson(s), floor is 2`);
if (weavePreExisting.length) notes.push(`pre-existing words below the 2-later-lesson floor (not introduced by this campaign): ${weavePreExisting.length} — e.g. ${weavePreExisting.slice(0, 12).join(", ")}`);

// a. bands
const bandFails: string[] = [];
for (const l of trail) {
  if (LESSON_DEFERRALS[l.id]) continue;
  const [lo, hi] = BANDS[l.role];
  const n = l.newW.length;
  if (n >= lo && n <= hi) continue;
  const msg = `band: l${l.id} (${l.role}, "${l.title}") has ${n} new words, band ${lo}-${hi}`;
  if (STRICT || rowExecuted(l.id)) bandFails.push(msg);
  else notes.push(`pending — ${msg}`);
}
for (const f of bandFails) fails.push(f);

// d. zero-new share
const zeroNew = trail.filter((l) => l.newW.length === 0);
const zeroPct = (zeroNew.length / trail.length) * 100;
if (STRICT && zeroPct > 25) fails.push(`zero-new lessons ${zeroNew.length}/${trail.length} (${zeroPct.toFixed(1)}%) exceed 25%`);
const zeroNewUnplanned = zeroNew.filter((l) => !REVISION.has(l.id) && !LESSON_DEFERRALS[l.id] && !ZERO_NEW_DEFERRALS[l.id]).map((l) => l.id);

// ---------------------------------------------------------------- report
console.log(`=== vocab-balance audit ${STRICT ? "(strict)" : ""} ===`);
console.log(`unique taught words: ${firstIntro.size} (Campaign 1 band 450–500; Campaign 2 target ≥650)`);
console.log(`histogram: ${JSON.stringify(trail.reduce((h: Record<number, number>, l) => { h[l.newW.length] = (h[l.newW.length] ?? 0) + 1; return h; }, {}))}`);
console.log(`zero-new: ${zeroNew.length}/${trail.length} (${zeroPct.toFixed(1)}%)${STRICT || zeroPct <= 25 ? "" : " — over the 25% end-state bound (expected mid-campaign)"}`);
if (zeroNewUnplanned.length && (STRICT || zeroPct <= 25)) fails.push(`zero-new outside the deliberate revision set / deferrals: ${zeroNewUnplanned.join(", ")}`);
console.log(`move-list rows: ${executed.length} executed, ${pending.length} pending`);
if (pending.length && STRICT) fails.push(`strict: ${pending.length} move-list rows pending`);
console.log(`pre-existing drift tokens honored from allowlist: ${preExistingHits}`);
if (pendingWeave) {
  console.log(`weaving pending for ${pendingWeave} campaign words (host rows not yet executed)`);
  if (STRICT) fails.push(`strict: ${pendingWeave} campaign words still below the weaving floor`);
}
if (weaveThin.length) console.log(`below 3-lesson weaving target, floor 2 holds (${weaveThin.length}): ${weaveThin.slice(0, 12).join(", ")}${weaveThin.length > 12 ? " …" : ""}`);
for (const n of notes) console.log(`  · ${n}`);
if (fails.length) {
  console.log(`\n✗ ${fails.length} violation(s):`);
  for (const f of fails) console.log("  ✗ " + f);
  process.exit(1);
}
console.log(`\n✓ vocab balance checks pass${pending.length ? ` (${pending.length} rows pending — mid-campaign)` : " (move-list fully executed)"}`);
