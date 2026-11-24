// Deterministic shuffle helpers shared by the exercise engine and every widget
// that arranges tiles. Kept out of ExerciseWidgets.tsx on purpose: the lesson
// reader and the twist card import these, and importing them from the widget
// module pulled the whole exercise engine into the lesson route's initial chunk.

import { hashSeed, seededShuffle } from "@/lib/prng";

type LanguageId = "de" | "fr" | "es" | "nl";

/**
 * Common non-noun German sentence starters whose capitalization only marks
 * sentence position. Lowercasing them in word banks prevents the opening tile
 * from giving itself away while leaving German nouns (e.g. Morgen, Dank, Haar)
 * and formal Sie/Ihr capitalized.
 */
const DE_SENTENCE_STARTER_LOWERCASE: ReadonlySet<string> = new Set([
  // Pronouns & determiners (excluding formal Sie/Ihr and nouns)
  "ich", "wir", "du", "er", "es", "man",
  "mich", "dich", "ihn", "uns", "euch", "mir", "dir", "ihm",
  "der", "die", "das", "den", "dem", "des",
  "ein", "eine", "einen", "einem", "einer", "eines",
  "mein", "meine", "meinen", "meinem", "meiner",
  "dein", "deine", "deinen", "deinem", "deiner",
  "sein", "seine", "seinen", "seinem", "seiner",
  "unser", "unsere", "unseren", "unserem", "unserer",
  "euer", "eure", "euren", "eurem", "eurer",
  "dies", "dieser", "diese", "dieses", "diesen", "diesem",
  "jeder", "jede", "jedes", "jeden", "jedem",
  "alle", "alles", "jemand", "niemand", "etwas", "nichts",
  "nicht", "kein", "keine", "keinen", "keinem", "keiner",
  // Adverbs & question words (keeping German noun "Morgen" capitalized)
  "heute", "gestern", "vorgestern", "übermorgen", "jetzt", "nun", "gerade", "sofort", "gleich",
  "hier", "dort", "draußen", "drinnen", "oben", "unten",
  "dann", "danach", "vorher", "bald", "später", "früh", "früher",
  "oft", "immer", "manchmal", "selten", "meistens", "nie", "niemals",
  "schon", "noch", "wieder", "täglich", "sehr", "zu", "ganz", "ziemlich",
  "vielleicht", "leider", "natürlich", "gerne", "gern", "auch", "nur", "so",
  "viel", "viele", "wenig", "mehr", "gut", "schnell", "langsam",
  "wann", "wo", "woher", "wohin", "warum", "wie", "was", "wer", "wen", "wem", "welcher", "welche", "welches",
  // Discourse & greetings
  "ja", "nein", "bitte", "danke", "hallo", "guten", "gute", "gutes",
  // Contractions & prepositions
  "zum", "zur", "ins", "ans", "am", "im", "vom", "beim",
  "auf", "in", "an", "mit", "für", "von", "nach", "bei", "seit", "vor", "über", "unter",
  "aus", "durch", "gegen", "ohne", "um", "zwischen", "hinter", "neben",
  // Conjunctions
  "aber", "oder", "und", "denn", "weil", "wenn", "dass", "ob", "obwohl",
  "während", "bevor", "nachdem", "seitdem", "bis", "damit", "falls", "sobald", "solange",
  "sondern", "trotzdem", "deshalb", "außerdem",
  // Common sentence-starting verbs & auxiliaries/modals
  "bin", "bist", "ist", "sind", "seid", "war", "warst", "wart", "waren", "wäre", "wären",
  "habe", "hast", "hat", "haben", "habt", "hatte", "hatten", "hätte", "hätten",
  "werde", "wirst", "wird", "werden", "würde", "würden",
  "kann", "kannst", "können", "könnt", "könnte", "könnten",
  "will", "willst", "wollen", "wollt",
  "muss", "musst", "müssen", "müsst",
  "darf", "darfst", "dürfen", "dürft",
  "soll", "sollst", "sollen", "sollt",
  "mag", "magst", "mögen", "mögt", "möchte", "möchtest", "möchten",
  "gehe", "gehst", "geht", "gehen",
  "trinke", "trinkst", "trinkt", "trinken",
  "lese", "liest", "lesen",
  "komme", "kommst", "kommt", "kommen",
  "mache", "machst", "macht", "machen",
  "nehme", "nimmst", "nimmt", "nehmen",
  "gebe", "gibst", "gibt", "geben",
  "sehe", "siehst", "sieht", "sehen",
  "kaufe", "kaufst", "kauft", "kaufen",
  "weiß", "weißt", "wissen",
  "arbeite", "arbeitest", "arbeitet", "arbeiten",
  "spreche", "sprichst", "spricht", "sprechen",
  "esse", "isst", "essen",
  "schlafe", "schläfst", "schläft", "schlafen",
  "fahre", "fährst", "fährt", "fahren",
  "lerne", "lernst", "lernt", "lernen",
  "wohne", "wohnst", "wohnt", "wohnen",
  "suche", "suchst", "sucht", "suchen",
  "brauche", "brauchst", "braucht", "brauchen",
  "denke", "denkst", "denkt", "denken",
  "finde", "findest", "findet", "finden",
  "kenne", "kennst", "kennt", "kennen",
  "liebe", "liebst", "liebt", "lieben",
  "helfe", "hilfst", "hilft", "helfen",
  "spiele", "spielst", "spielt", "spielen",
  "bleibe", "bleibst", "bleibt", "bleiben",
  "freue", "freust", "freut", "freuen",
  "warte", "wartest", "wartet", "warten",
  "sage", "sagst", "sagt", "sagen",
  "frage", "fragst", "fragt", "fragen",
  "bringe", "bringst", "bringt", "bringen",
]);

/**
 * Proper nouns preserved when lowercasing sentence-starting tiles in FR, ES, and NL.
 */
const PROPER_NOUNS: ReadonlySet<string> = new Set([
  // Cities & places
  "berlin", "münchen", "hamburg", "wien", "zürich", "köln", "frankfurt",
  "paris", "lyon", "marseille", "bordeaux",
  "madrid", "barcelona", "sevilla", "valencia",
  "amsterdam", "rotterdam", "utrecht", "brussel", "antwerpen",
  "london", "rom", "roma", "europa", "europe",
  // Countries & nationalities / languages
  "deutschland", "österreich", "schweiz", "frankreich", "france",
  "spanien", "españa", "nederland", "belgië", "belgique",
  "deutsch", "englisch", "english", "français", "español", "nederlands",
  // German days & months
  "montag", "dienstag", "mittwoch", "donnerstag", "freitag", "samstag", "sonntag",
  "januar", "februar", "märz", "april", "mai", "juni",
  "juli", "august", "september", "oktober", "november", "dezember",
  // Common person names
  "anna", "max", "paul", "marie", "jean", "pierre", "sophie", "lucas",
  "maria", "maría", "juan", "carlos", "ana", "elena", "pablo",
  "jan", "lisa", "emma", "tom", "peter", "hans", "klaus",
]);

function resolveLanguageId(languageId?: string): LanguageId {
  if (languageId === "fr" || languageId === "es" || languageId === "nl" || languageId === "de") {
    return languageId;
  }
  return "de";
}

function isAllCapsAcronym(word: string): boolean {
  const letters = word.replace(/[^\p{L}]/gu, "");
  return letters.length >= 2 && letters === letters.toUpperCase() && letters !== letters.toLowerCase();
}

export function lowercaseSentenceStarterTiles(items: string[], languageId: string = "de"): string[] {
  const lang = resolveLanguageId(languageId);
  if (lang === "de") {
    return items.map((item) => {
      const lower = item.toLowerCase();
      if (item !== lower && DE_SENTENCE_STARTER_LOWERCASE.has(lower)) {
        return lower;
      }
      return item;
    });
  }

  // For FR, ES, NL: lowercase any sentence-starting tile that isn't a proper noun,
  // single-letter English "I", or all-caps acronym.
  return items.map((item) => {
    const lower = item.toLowerCase();
    if (item === lower) return item;
    const core = item.replace(/^[¿¡.,!?;:]+|[.,!?;:]+$/g, "");
    if (core === "I" || isAllCapsAcronym(core)) return item;
    if (PROPER_NOUNS.has(core.toLowerCase())) return item;
    return lower;
  });
}

/**
 * Capitalize the first character of an assembled tile answer when the target
 * sentence starts with an uppercase letter, so lowercased sentence-starter tiles
 * grade "exact" rather than "almost".
 */
export function capitalizeAssembledTileAnswer(answer: string, target: string): string {
  const trimmedTarget = target.trim();
  if (!answer || !trimmedTarget) return answer;
  const targetFirst = trimmedTarget[0];
  if (targetFirst === targetFirst.toUpperCase() && targetFirst !== targetFirst.toLowerCase()) {
    return answer[0].toUpperCase() + answer.slice(1);
  }
  return answer;
}

/**
 * Deterministically shuffle a tile or word bank so that pressing 1, 2, 3... in
 * left-to-right order never trivially reproduces the target answer.
 */
export function arrangeTilesDeterministically(
  items: string[],
  seedKey: string,
  targetAnswer: string
): string[] {
  if (items.length <= 1) return [...items];
  const targetClean = targetAnswer.replace(/[.,!?;:¿¡]+/g, "").trim().toLowerCase();
  const targetWords = targetClean.split(/\s+/).filter(Boolean);

  const isTrivialOrder = (candidate: string[]): boolean => {
    const candLower = candidate.map((c) => c.replace(/^-/, "").toLowerCase());
    if (
      targetWords.length >= 2 &&
      candLower.length >= targetWords.length &&
      candLower.slice(0, targetWords.length).join(" ") === targetWords.join(" ")
    ) {
      return true;
    }
    const joinedPrefix = candLower.join("");
    const targetNoSpace = targetClean.replace(/\s+/g, "");
    if (joinedPrefix.startsWith(targetNoSpace) && targetNoSpace.length >= 2) {
      return true;
    }
    return false;
  };

  const baseSeed = hashSeed(seedKey);
  for (let attempt = 0; attempt < 8; attempt++) {
    const candidate = seededShuffle(items, baseSeed + attempt * 0x9e3779b9);
    if (!isTrivialOrder(candidate)) {
      return candidate;
    }
  }
  // Fallback swap of the first two distinct elements
  const fallback = [...items];
  for (let i = 1; i < fallback.length; i++) {
    if (fallback[i].toLowerCase() !== fallback[0].toLowerCase()) {
      [fallback[0], fallback[i]] = [fallback[i], fallback[0]];
      break;
    }
  }
  return fallback;
}
