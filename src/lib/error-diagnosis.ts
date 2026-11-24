// Comprehensive, deterministic, language-aware wrong-answer diagnosis engine.
// Runs checks in strict priority order so every wrong attempt across DE, FR, ES, NL
// and every exercise type receives a truthful, beginner-friendly { slip, cue, category }
// and never falsely labels grammar, word-order, article, negation, or spelling errors
// as "Consonant Shift".

import { getLevenshteinDistance } from "./letter-diff";
import { diagnoseAttempt } from "./shift-diagnosis";
import { useAppStore } from "./store";
import type { ExerciseDiagnosis, ExerciseType } from "./types";

export interface DiagnoseExerciseAttemptParams {
  attempt: string;
  expected: string;
  acceptedAnswers?: readonly string[];
  exerciseType?: ExerciseType;
  languageId?: string;
  shiftHint?: string;
  authoredDiagnosis?: ExerciseDiagnosis;
  explanation?: string;
  prompt?: string;
  englishPrompt?: string;
  wordBank?: readonly string[];
}

// ---------------------------------------------------------------------------
// Normalization & tokenization helpers
// ---------------------------------------------------------------------------

const stripOuterPunctuation = (text: string): string =>
  text
    .trim()
    .replace(/^[¿¡"'“”‘’(\s]+/, "")
    .replace(/[.,!?;:"'“”‘’)\s]+$/, "");

const cleanToken = (token: string): string =>
  token.replace(/^[¿¡"'“”‘’(]+/, "").replace(/[.,!?;:"'“”‘’)]+$/, "");

const tokenizeOriginal = (text: string): string[] =>
  text
    .trim()
    .split(/\s+/)
    .map(cleanToken)
    .filter(Boolean);

const tokenizeLower = (text: string): string[] =>
  tokenizeOriginal(text).map((t) => t.toLowerCase());

/** Strip accents/umlauts and normalize ß → ss for diacritic-only comparisons. */
const stripDiacritics = (text: string): string =>
  text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ß/g, "ss");

/** Expand German umlaut digraphs (ae/oe/ue) to base vowels for lazy-umlaut detection. */
const foldGermanUmlautDigraphs = (text: string): string =>
  text
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss");

const truncate = (text: string, maxLen = 42): string => {
  const cleaned = text.trim();
  if (cleaned.length <= maxLen) return cleaned;
  return `${cleaned.slice(0, maxLen - 1).trimEnd()}…`;
};

const ABBREV_END_RE = /(?:e\.g|i\.e|z\.\s*B|d\.\s*h|vs|Dr|Mr|Mrs|Ms|St|Nr|ca)\.$/i;

function firstSentence(text: string): string {
  const trimmed = text.trim();
  if (!trimmed) return "";
  const re = /[.!?](?=\s+\S)/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(trimmed)) !== null) {
    const end = match.index + 1;
    const candidate = trimmed.slice(0, end).trim();
    if (candidate.length < 20 || ABBREV_END_RE.test(candidate)) continue;
    return candidate;
  }
  return trimmed;
}

function resolveLanguageId(languageId?: string): string {
  if (languageId) return languageId;
  return (
    (typeof useAppStore?.getState === "function" ? useAppStore.getState().activeLanguageId : "de") ??
    "de"
  );
}

function pickClosestTarget(
  attempt: string,
  expected: string,
  acceptedAnswers?: readonly string[]
): string {
  const trimmedExpected = expected.trim();
  if (!acceptedAnswers || acceptedAnswers.length === 0) return trimmedExpected;
  const attemptLow = stripOuterPunctuation(attempt).toLowerCase();
  if (!attemptLow) return trimmedExpected;
  const candidates = [trimmedExpected, ...acceptedAnswers.map((a) => a.trim())].filter(Boolean);
  let best = trimmedExpected;
  let bestScore = getLevenshteinDistance(attemptLow, stripOuterPunctuation(trimmedExpected).toLowerCase());
  for (let i = 1; i < candidates.length; i++) {
    const cand = candidates[i];
    const dist = getLevenshteinDistance(attemptLow, stripOuterPunctuation(cand).toLowerCase());
    if (dist < bestScore) {
      bestScore = dist;
      best = cand;
    }
  }
  return best;
}

// ---------------------------------------------------------------------------
// Language dictionaries
// ---------------------------------------------------------------------------

const ARTICLES_BY_LANG: Record<string, ReadonlySet<string>> = {
  de: new Set([
    "der", "die", "das", "den", "dem", "des",
    "ein", "eine", "einen", "einem", "einer", "eines",
    "mein", "meine", "meinen", "meinem", "meiner",
    "dein", "deine", "deinen", "deinem", "deiner",
    "sein", "seine", "seinen", "seinem", "seiner",
    "ihr", "ihre", "ihren", "ihrem", "ihrer",
    "unser", "unsere", "unseren", "unserem", "unserer",
    "euer", "eure", "euren", "eurem", "eurer",
  ]),
  fr: new Set([
    "le", "la", "l'", "les",
    "un", "une", "des", "du", "de", "d'", "au", "aux",
    "mon", "ma", "mes", "ton", "ta", "tes", "son", "sa", "ses",
    "ce", "cet", "cette", "ces",
  ]),
  es: new Set([
    "el", "la", "los", "las",
    "un", "una", "unos", "unas",
    "al", "del",
  ]),
  nl: new Set(["de", "het", "een"]),
};

const GERMAN_KEIN_FORMS = new Set(["kein", "keine", "keinen", "keinem", "keiner", "keines"]);

const V2_FRONTED_WORDS = new Set([
  // German
  "heute", "morgen", "gestern", "jetzt", "hier", "dort", "da", "dann", "danach",
  "oft", "manchmal", "immer", "nie", "leider", "vielleicht", "normalerweise",
  "abends", "morgens", "montags", "dienstags", "mittwochs", "donnerstags", "freitags", "samstags", "sonntags",
  // Dutch
  "vandaag", "gisteren", "nu", "daar", "dan", "vaak", "soms", "altijd", "nooit", "helaas", "misschien",
]);

const SUBJECT_PRONOUNS = new Set([
  "ich", "du", "er", "sie", "es", "wir", "ihr", "man",
  "ik", "jij", "je", "hij", "zij", "ze", "het", "wij", "we", "jullie", "u",
]);

const SUBORDINATORS_DE_NL = new Set([
  "weil", "dass", "obwohl", "wenn", "als", "ob", "bevor", "nachdem", "während", "damit", "sodass",
  "omdat", "dat", "hoewel", "terwijl", "voordat", "nadat", "of",
]);

const MODALS_AND_AUX_DE_NL = new Set([
  // DE modals & auxiliaries
  "kann", "kannst", "können", "könnt", "konnte", "konntest", "konnten",
  "muss", "musst", "müssen", "müsst", "musste", "musstest", "mussten",
  "will", "willst", "wollen", "wollt", "wollte", "wolltest", "wollten",
  "darf", "darfst", "dürfen", "dürft", "durfte", "durften",
  "soll", "sollst", "sollen", "sollt", "sollte", "sollten",
  "möchte", "möchtest", "möchten", "möchtet",
  "habe", "hast", "hat", "haben", "habt", "hatte", "hattest", "hatten",
  "bin", "bist", "ist", "sind", "seid", "war", "warst", "waren",
  "werde", "wirst", "wird", "werden", "werdet", "würde", "würdest", "würden",
  // NL modals & auxiliaries
  "kan", "kunt", "kunnen", "kon", "konden",
  "moet", "moeten", "moest", "moesten",
  "wil", "wilt", "willen", "wilde", "wilden", "wou",
  "mag", "mogen", "mocht", "mochten",
  "zal", "zult", "zullen", "zou", "zouden",
  "heb", "hebt", "heeft", "hebben", "had", "hadden",
  "ben", "bent", "is", "zijn", "was", "waren",
]);

const ROMANCE_OBJECT_PRONOUNS: Record<string, ReadonlySet<string>> = {
  fr: new Set(["le", "la", "les", "lui", "leur", "me", "te", "se", "nous", "vous", "y", "en"]),
  es: new Set(["lo", "la", "los", "las", "le", "les", "me", "te", "se", "nos", "os"]),
};

const AUX_GROUPS_BY_LANG: Record<string, { primary: ReadonlySet<string>; secondary: ReadonlySet<string>; primaryName: string; secondaryName: string; pairCue: string }> = {
  de: {
    primary: new Set(["habe", "hast", "hat", "haben", "habt", "hatte", "hattest", "hatten"]),
    secondary: new Set(["bin", "bist", "ist", "sind", "seid", "war", "warst", "waren"]),
    primaryName: "haben",
    secondaryName: "sein",
    pairCue: "Motion and state-change verbs pair with 'sein', while most other verbs take 'haben'",
  },
  fr: {
    primary: new Set(["ai", "as", "a", "avons", "avez", "ont", "avais", "avait", "avions", "aviez", "avaient"]),
    secondary: new Set(["suis", "es", "est", "sommes", "êtes", "sont", "étais", "était", "étions", "étiez", "étaient"]),
    primaryName: "avoir",
    secondaryName: "être",
    pairCue: "Reflexive verbs and motion/change-of-state verbs take 'être'; most other verbs take 'avoir'",
  },
  es: {
    primary: new Set(["soy", "eres", "es", "somos", "sois", "son", "era", "eras", "éramos", "eran"]),
    secondary: new Set(["estoy", "estás", "está", "estamos", "estáis", "están", "estaba", "estabas", "estaban"]),
    primaryName: "ser",
    secondaryName: "estar",
    pairCue: "'Ser' expresses identity and lasting traits, while 'estar' expresses location and states",
  },
  nl: {
    primary: new Set(["heb", "hebt", "heeft", "hebben", "had", "hadden"]),
    secondary: new Set(["ben", "bent", "is", "zijn", "was", "waren"]),
    primaryName: "hebben",
    secondaryName: "zijn",
    pairCue: "Motion and change-of-state verbs pair with 'zijn', while most other verbs take 'hebben'",
  },
};

const SAME_VERB_PARADIGMS: Record<string, ReadonlyArray<ReadonlySet<string>>> = {
  de: [
    new Set(["bin", "bist", "ist", "sind", "seid", "war", "warst", "waren", "sein"]),
    new Set(["habe", "hast", "hat", "haben", "habt", "hatte", "hattest", "hatten"]),
    new Set(["kann", "kannst", "können", "könnt", "konnte", "konntest", "konnten"]),
    new Set(["muss", "musst", "müssen", "müsst", "musste", "musstest", "mussten"]),
    new Set(["will", "willst", "wollen", "wollt", "wollte", "wolltest", "wollten"]),
    new Set(["darf", "darfst", "dürfen", "dürft", "durfte", "durften"]),
    new Set(["soll", "sollst", "sollen", "sollt", "sollte", "sollten"]),
    new Set(["möchte", "möchtest", "möchten", "möchtet"]),
    new Set(["werde", "wirst", "wird", "werden", "werdet"]),
    new Set(["gehe", "gehst", "geht", "gehen", "ging", "gingen", "gegangen"]),
    new Set(["komme", "kommst", "kommt", "kommen", "kam", "kamen", "gekommen"]),
    new Set(["spreche", "sprichst", "spricht", "sprechen", "sprach", "gesprochen"]),
    new Set(["sehe", "siehst", "sieht", "sehen", "sah", "gesehen"]),
    new Set(["gebe", "gibst", "gibt", "geben", "gab", "gegeben"]),
    new Set(["nehme", "nimmst", "nimmt", "nehmen", "nahm", "genommen"]),
    new Set(["fahre", "fährst", "fährt", "fahren", "fuhr", "gefahren"]),
    new Set(["esse", "isst", "essen", "aß", "gegessen"]),
    new Set(["lese", "liest", "lesen", "las", "gelesen"]),
    new Set(["schlafe", "schläfst", "schläft", "schlafen", "schlief", "geschlafen"]),
    new Set(["weiß", "weißt", "wissen", "wisst", "wusste"]),
  ],
  fr: [
    new Set(["suis", "es", "est", "sommes", "êtes", "sont", "être"]),
    new Set(["ai", "as", "a", "avons", "avez", "ont", "avoir"]),
    new Set(["vais", "vas", "va", "allons", "allez", "vont", "aller"]),
    new Set(["fais", "fait", "faisons", "faites", "font", "faire"]),
    new Set(["peux", "peut", "pouvons", "pouvez", "peuvent", "pouvoir"]),
    new Set(["veux", "veut", "voulons", "voulez", "veulent", "vouloir"]),
    new Set(["dois", "doit", "devons", "devez", "doivent", "devoir"]),
    new Set(["sais", "sait", "savons", "savez", "savent", "savoir"]),
    new Set(["viens", "vient", "venons", "venez", "viennent", "venir"]),
    new Set(["prends", "prend", "prenons", "prenez", "prennent", "prendre"]),
  ],
  es: [
    new Set(["soy", "eres", "es", "somos", "sois", "son", "ser"]),
    new Set(["estoy", "estás", "está", "estamos", "estáis", "están", "estar"]),
    new Set(["tengo", "tienes", "tiene", "tenemos", "tenéis", "tienen", "tener"]),
    new Set(["voy", "vas", "va", "vamos", "vais", "van", "ir"]),
    new Set(["hago", "haces", "hace", "hacemos", "hacéis", "hacen", "hacer"]),
    new Set(["puedo", "puedes", "puede", "podemos", "podéis", "pueden", "poder"]),
    new Set(["quiero", "quieres", "quiere", "queremos", "queréis", "quieren", "querer"]),
    new Set(["he", "has", "ha", "hemos", "habéis", "han", "haber"]),
    new Set(["digo", "dices", "dice", "decimos", "dicen", "decir"]),
    new Set(["vengo", "vienes", "viene", "venimos", "vienen", "venir"]),
  ],
  nl: [
    new Set(["ben", "bent", "is", "zijn", "was", "waren"]),
    new Set(["heb", "hebt", "heeft", "hebben", "had", "hadden"]),
    new Set(["kan", "kunt", "kunnen", "kon", "konden"]),
    new Set(["moet", "moeten", "moest", "moesten"]),
    new Set(["wil", "wilt", "willen", "wilde", "wilden"]),
    new Set(["ga", "gaat", "gaan", "ging", "gingen"]),
    new Set(["kom", "komt", "komen", "kwam", "kwamen"]),
    new Set(["doe", "doet", "doen", "deed", "deden"]),
    new Set(["zie", "ziet", "zien", "zag", "zagen"]),
  ],
};

const VERB_ENDINGS_BY_LANG: Record<string, readonly string[]> = {
  de: ["test", "ten", "tet", "st", "te", "en", "et", "t", "e"],
  fr: ["aient", "ions", "iez", "ais", "ait", "ons", "ent", "ées", "ez", "es", "er", "ir", "re", "ée", "és", "é", "s", "t", "e"],
  es: ["amos", "emos", "imos", "áis", "éis", "ado", "ido", "as", "an", "es", "en", "ís", "ar", "er", "ir", "o", "a", "e"],
  nl: ["den", "ten", "en", "de", "te", "t", "d"],
};

// ---------------------------------------------------------------------------
// Individual diagnostic checks
// ---------------------------------------------------------------------------

function isEnglishTargetExercise(exerciseType?: ExerciseType): boolean {
  return (
    exerciseType === "literal_gloss" ||
    exerciseType === "variant_english" ||
    exerciseType === "reverse_cognate"
  );
}

function isDiacriticOnlyDifference(attempt: string, target: string): boolean {
  const aLow = stripOuterPunctuation(attempt).toLowerCase();
  const tLow = stripOuterPunctuation(target).toLowerCase();
  if (!aLow || !tLow || aLow === tLow) return false;
  if (stripDiacritics(aLow) === stripDiacritics(tLow)) return true;
  if (foldGermanUmlautDigraphs(aLow) === foldGermanUmlautDigraphs(tLow)) return true;
  return false;
}

function isCapitalizationOnlyDifference(attempt: string, target: string): boolean {
  const aClean = stripOuterPunctuation(attempt);
  const tClean = stripOuterPunctuation(target);
  if (!aClean || !tClean) return false;
  return aClean.toLowerCase() === tClean.toLowerCase() && aClean !== tClean;
}

function isArticleOnlyDiff(
  attemptLow: string[],
  targetLow: string[],
  langId: string
): boolean {
  const articles = ARTICLES_BY_LANG[langId];
  if (!articles || attemptLow.length !== targetLow.length) return false;
  let articleDiff = false;
  for (let i = 0; i < attemptLow.length; i++) {
    if (attemptLow[i] === targetLow[i]) continue;
    const isArt =
      articles.has(attemptLow[i]) && articles.has(targetLow[i]);
    const isKeinArt =
      langId === "de" &&
      GERMAN_KEIN_FORMS.has(attemptLow[i]) &&
      GERMAN_KEIN_FORMS.has(targetLow[i]);
    if (isArt || isKeinArt) {
      articleDiff = true;
    } else {
      return false;
    }
  }
  return articleDiff;
}

function isNegationDiff(
  attemptLow: string[],
  targetLow: string[],
  langId: string
): boolean {
  if (langId === "de") {
    const aHasNicht = attemptLow.includes("nicht");
    const tHasNicht = targetLow.includes("nicht");
    const aHasKein = attemptLow.some((w) => GERMAN_KEIN_FORMS.has(w));
    const tHasKein = targetLow.some((w) => GERMAN_KEIN_FORMS.has(w));
    if ((aHasNicht && tHasKein) || (aHasKein && tHasNicht)) return true;
  }
  if (langId === "nl") {
    const aHasNiet = attemptLow.includes("niet");
    const tHasNiet = targetLow.includes("niet");
    const aHasGeen = attemptLow.includes("geen");
    const tHasGeen = targetLow.includes("geen");
    if ((aHasNiet && tHasGeen) || (aHasGeen && tHasNiet)) return true;
  }
  return false;
}

function isWordOrderSwap(attemptLow: string[], targetLow: string[]): boolean {
  if (targetLow.length < 2 || attemptLow.length !== targetLow.length) return false;
  if (attemptLow.join(" ") === targetLow.join(" ")) return false;
  const aSorted = [...attemptLow].map(stripDiacritics).sort().join(" ");
  const tSorted = [...targetLow].map(stripDiacritics).sort().join(" ");
  return aSorted === tSorted;
}

// 1. Sound shift / cognate law check
function checkSoundShift(
  attempt: string,
  target: string,
  langId: string,
  shiftHint: string | undefined,
  exerciseType: ExerciseType | undefined
): ExerciseDiagnosis | null {
  if (isEnglishTargetExercise(exerciseType)) return null;
  if (isCapitalizationOnlyDifference(attempt, target)) return null;
  if (isDiacriticOnlyDifference(attempt, target)) return null;

  const attemptLow = tokenizeLower(attempt);
  const targetLow = tokenizeLower(target);
  if (isWordOrderSwap(attemptLow, targetLow)) return null;
  if (isArticleOnlyDiff(attemptLow, targetLow, langId)) return null;
  if (isNegationDiff(attemptLow, targetLow, langId)) return null;

  // Guard: if multiple words and only a known auxiliary/copula differs, let Verb Form handle it
  if (attemptLow.length === targetLow.length && attemptLow.length >= 1) {
    const diffs = attemptLow
      .map((w, i) => ({ a: w, t: targetLow[i] }))
      .filter((p) => p.a !== p.t);
    if (diffs.length === 1) {
      const { a, t } = diffs[0];
      const paradigms = SAME_VERB_PARADIGMS[langId] ?? [];
      if (paradigms.some((p) => p.has(a) && p.has(t))) return null;
      const aux = AUX_GROUPS_BY_LANG[langId];
      if (
        aux &&
        ((aux.primary.has(a) && aux.secondary.has(t)) ||
          (aux.secondary.has(a) && aux.primary.has(t)))
      ) {
        return null;
      }
      // Run shift diagnosis on the differing word itself for multi-word sentences
      if (attemptLow.length > 1) {
        const wordHit = diagnoseAttempt(t, a, shiftHint, undefined, langId);
        if (wordHit) {
          return { ...wordHit, category: "Sound Shift" };
        }
        return null;
      }
    }
  }

  const hit = diagnoseAttempt(target, attempt, shiftHint, undefined, langId);
  if (!hit) return null;
  return { ...hit, category: "Sound Shift" };
}

// 2. Word order check
function checkWordOrder(
  attemptOrig: string[],
  targetOrig: string[],
  attemptLow: string[],
  targetLow: string[],
  target: string,
  langId: string
): ExerciseDiagnosis | null {
  if (!isWordOrderSwap(attemptLow, targetLow)) return null;

  // German / Dutch V2 inversion after fronted adverbial
  if ((langId === "de" || langId === "nl") && targetLow.length >= 3) {
    if (
      V2_FRONTED_WORDS.has(targetLow[0]) &&
      attemptLow[0] === targetLow[0] &&
      SUBJECT_PRONOUNS.has(attemptLow[1]) &&
      attemptLow[1] === targetLow[2] &&
      attemptLow[2] === targetLow[1]
    ) {
      return {
        slip: `verb '${targetOrig[1]}' left second place`,
        cue: `When '${targetOrig[0]}' opens the sentence, keep the verb '${targetOrig[1]}' in position 2 right before '${targetOrig[2]}'.`,
        category: "Word Order",
      };
    }

    // Subordinate clause verb-final
    const subordinatorIdx = targetLow.findIndex((w) => SUBORDINATORS_DE_NL.has(w));
    if (subordinatorIdx !== -1) {
      const finalVerb = targetOrig[targetOrig.length - 1];
      const finalVerbLow = targetLow[targetLow.length - 1];
      if (attemptLow[attemptLow.length - 1] !== finalVerbLow) {
        return {
          slip: `verb '${finalVerb}' wasn't sent to the end`,
          cue: `After '${targetOrig[subordinatorIdx]}', send the conjugated verb '${finalVerb}' to the very end of the clause.`,
          category: "Word Order",
        };
      }
    }

    // Modal / auxiliary bracket (Satzklammer)
    const auxIdx = targetLow.findIndex((w) => MODALS_AND_AUX_DE_NL.has(w));
    if (auxIdx !== -1 && auxIdx < targetLow.length - 2) {
      const endVerb = targetOrig[targetOrig.length - 1];
      const endVerbLow = targetLow[targetLow.length - 1];
      if (attemptLow[attemptLow.length - 1] !== endVerbLow) {
        return {
          slip: `verb bracket closed too early ('${endVerb}' belongs at the end)`,
          cue: `Keep '${targetOrig[auxIdx]}' in position 2 and send '${endVerb}' to the very end of the sentence.`,
          category: "Word Order",
        };
      }
    }
  }

  // French / Spanish object pronoun before verb
  if (langId === "fr" || langId === "es") {
    const pronouns = ROMANCE_OBJECT_PRONOUNS[langId];
    for (let i = 0; i < targetLow.length - 1; i++) {
      if (pronouns.has(targetLow[i])) {
        const aIdx = attemptLow.indexOf(targetLow[i]);
        if (aIdx > i) {
          return {
            slip: `pronoun '${targetOrig[i]}' stayed after the verb`,
            cue: `Place the object pronoun '${targetOrig[i]}' directly before '${targetOrig[i + 1]}': '${target}'.`,
            category: "Word Order",
          };
        }
      }
    }
  }

  // Exact two-token swap
  const diffIndices: number[] = [];
  for (let i = 0; i < targetLow.length; i++) {
    if (stripDiacritics(attemptLow[i]) !== stripDiacritics(targetLow[i])) {
      diffIndices.push(i);
    }
  }
  if (diffIndices.length === 2) {
    const [i, j] = diffIndices;
    return {
      slip: `swapped '${attemptOrig[i]}' and '${attemptOrig[j]}'`,
      cue: `You have all the right words — put '${targetOrig[i]}' before '${targetOrig[j]}'.`,
      category: "Word Order",
    };
  }

  const firstDiff = diffIndices[0] ?? 0;
  const langOrderTip =
    langId === "de" || langId === "nl"
      ? "Keep the finite verb in position 2 (or at the end in a subordinate clause)."
      : langId === "fr"
      ? "Keep object pronouns before the verb and wrap 'ne … pas' around the conjugated verb."
      : langId === "es"
      ? "Place object pronouns before the conjugated verb and descriptive adjectives after the noun."
      : "Check the exact word sequence.";

  return {
    slip: "right words, different word order",
    cue: `Put '${targetOrig[firstDiff]}' before '${attemptOrig[firstDiff]}'. ${langOrderTip}`,
    category: "Word Order",
  };
}

// 3. Article / gender / case check
function describeArticleMismatch(attArt: string, tgtArt: string, langId: string): string {
  const a = attArt.toLowerCase();
  const t = tgtArt.toLowerCase();
  if (langId === "de") {
    if ((a === "der" && t === "den") || (a === "ein" && t === "einen") || (a === "mein" && t === "meinen")) {
      return `Masculine direct objects take accusative '${tgtArt}' (not nominative '${attArt}').`;
    }
    if ((a === "den" && t === "der") || (a === "einen" && t === "ein")) {
      return `The subject takes nominative '${tgtArt}', not accusative '${attArt}'.`;
    }
    if (["dem", "der", "den", "einem", "einer", "meinem", "meiner"].includes(t) && ["der", "die", "das", "den", "ein", "eine", "einen"].includes(a)) {
      if (t === "dem" || t === "einem" || t === "meinem") {
        return `Dative case shifts masculine/neuter articles to '${tgtArt}'.`;
      }
      if (t === "einer" || (t === "der" && a === "die")) {
        return `Dative feminine takes '${tgtArt}' (not '${attArt}').`;
      }
    }
    if (["des", "eines"].includes(t)) {
      return `Genitive case takes '${tgtArt}' here.`;
    }
    return `Check the noun's gender and case — here it takes '${tgtArt}' instead of '${attArt}'.`;
  }
  if (langId === "fr") {
    if (t === "l'" || t === "d'") {
      return `Before a vowel or silent h, '${attArt}' contracts to '${tgtArt}'.`;
    }
    if ((a === "le" && t === "la") || (a === "un" && t === "une") || (a === "mon" && t === "ma")) {
      return `This noun is feminine — use '${tgtArt}' instead of masculine '${attArt}'.`;
    }
    if ((a === "la" && t === "le") || (a === "une" && t === "un") || (a === "ma" && t === "mon")) {
      return `This noun is masculine — use '${tgtArt}' instead of feminine '${attArt}'.`;
    }
    if (t === "les" || t === "des" || a === "les" || a === "des") {
      return `Check singular vs. plural agreement — here it takes '${tgtArt}'.`;
    }
    return `Check the noun's gender and number — here it takes '${tgtArt}' instead of '${attArt}'.`;
  }
  if (langId === "es") {
    if ((a === "el" && t === "la") || (a === "un" && t === "una")) {
      return `This noun is feminine — use '${tgtArt}' instead of masculine '${attArt}'.`;
    }
    if ((a === "la" && t === "el") || (a === "una" && t === "un")) {
      return `This noun is masculine — use '${tgtArt}' instead of feminine '${attArt}'.`;
    }
    if (["los", "las", "unos", "unas"].includes(t) || ["los", "las", "unos", "unas"].includes(a)) {
      return `Match the article in both gender and number — here it takes '${tgtArt}'.`;
    }
    return `Check the noun's gender and number — here it takes '${tgtArt}' instead of '${attArt}'.`;
  }
  if (langId === "nl") {
    if ((a === "de" && t === "het") || (a === "het" && t === "de")) {
      return `Dutch nouns are either 'de' (common) or 'het' (neuter, including all diminutives) — this noun takes '${tgtArt}'.`;
    }
    return `Use '${tgtArt}' instead of '${attArt}' before this noun.`;
  }
  return `Use '${tgtArt}' instead of '${attArt}'.`;
}

function checkArticle(
  attemptOrig: string[],
  targetOrig: string[],
  attemptLow: string[],
  targetLow: string[],
  langId: string
): ExerciseDiagnosis | null {
  const articles = ARTICLES_BY_LANG[langId];
  if (!articles) return null;

  // Handle French elision mismatch like "le ami" vs "l'ami" or "la eau" vs "l'eau"
  if (langId === "fr" && attemptLow.length === targetLow.length + 1) {
    for (let i = 0; i < targetLow.length; i++) {
      if (/^[ld]'/.test(targetLow[i]) && i + 1 < attemptLow.length) {
        const prefix = targetLow[i].slice(0, 2);
        const rest = targetLow[i].slice(2);
        if ((attemptLow[i] === "le" || attemptLow[i] === "la" || attemptLow[i] === "de") && attemptLow[i + 1] === rest) {
          return {
            slip: `You wrote '${attemptOrig[i]} ${attemptOrig[i + 1]}', expected '${targetOrig[i]}'`,
            cue: `Before a vowel or silent h, '${attemptOrig[i]}' contracts to '${prefix}' — write '${targetOrig[i]}'.`,
            category: "Article & Case",
          };
        }
      }
    }
  }

  if (attemptLow.length !== targetLow.length) return null;

  let articleMismatch: { att: string; tgt: string } | null = null;
  let nonArticleDiffs = 0;

  for (let i = 0; i < targetLow.length; i++) {
    if (attemptLow[i] === targetLow[i]) continue;
    const isArtPair = articles.has(attemptLow[i]) && articles.has(targetLow[i]);
    const isKeinCasePair =
      langId === "de" &&
      GERMAN_KEIN_FORMS.has(attemptLow[i]) &&
      GERMAN_KEIN_FORMS.has(targetLow[i]);
    if (isArtPair || isKeinCasePair) {
      if (!articleMismatch) {
        articleMismatch = { att: attemptOrig[i], tgt: targetOrig[i] };
      }
    } else {
      nonArticleDiffs++;
    }
  }

  if (articleMismatch && nonArticleDiffs <= 1) {
    return {
      slip: `You wrote '${articleMismatch.att}', expected '${articleMismatch.tgt}'`,
      cue: describeArticleMismatch(articleMismatch.att, articleMismatch.tgt, langId),
      category: "Article & Case",
    };
  }
  return null;
}

// 4. Negation check
function checkNegation(
  attemptOrig: string[],
  targetOrig: string[],
  attemptLow: string[],
  targetLow: string[],
  target: string,
  langId: string
): ExerciseDiagnosis | null {
  if (langId === "de") {
    const aNichtIdx = attemptLow.indexOf("nicht");
    const tNichtIdx = targetLow.indexOf("nicht");
    const aKeinIdx = attemptLow.findIndex((w) => GERMAN_KEIN_FORMS.has(w));
    const tKeinIdx = targetLow.findIndex((w) => GERMAN_KEIN_FORMS.has(w));

    // "nicht ein/eine/einen" instead of "kein/keine/keinen"
    if (aNichtIdx !== -1 && tKeinIdx !== -1 && aNichtIdx + 1 < attemptLow.length && /^ein(e[nrm]?)?$/.test(attemptLow[aNichtIdx + 1])) {
      return {
        slip: `wrote '${attemptOrig[aNichtIdx]} ${attemptOrig[aNichtIdx + 1]}' instead of '${targetOrig[tKeinIdx]}'`,
        cue: `German merges 'nicht + ein(e)' into '${targetOrig[tKeinIdx]}' to negate an indefinite noun.`,
        category: "Negation",
      };
    }
    if (aNichtIdx !== -1 && tKeinIdx !== -1) {
      return {
        slip: `used 'nicht' instead of '${targetOrig[tKeinIdx]}'`,
        cue: `Use '${targetOrig[tKeinIdx]}' (not 'nicht') to negate a noun with 'a/an' or no article.`,
        category: "Negation",
      };
    }
    if (aKeinIdx !== -1 && tNichtIdx !== -1) {
      return {
        slip: `used '${attemptOrig[aKeinIdx]}' instead of 'nicht'`,
        cue: `Use 'nicht' (not '${attemptOrig[aKeinIdx]}') to negate a verb, adjective, or definite phrase.`,
        category: "Negation",
      };
    }
    if (tNichtIdx !== -1 && aNichtIdx === -1 && aKeinIdx === -1 && attemptLow.length === targetLow.length - 1) {
      return {
        slip: "dropped 'nicht'",
        cue: `Include 'nicht' to negate the clause: '${target}'.`,
        category: "Negation",
      };
    }
    if (tKeinIdx !== -1 && aKeinIdx === -1 && aNichtIdx === -1 && attemptLow.length === targetLow.length - 1) {
      return {
        slip: `dropped '${targetOrig[tKeinIdx]}'`,
        cue: `Include '${targetOrig[tKeinIdx]}' to negate the noun: '${target}'.`,
        category: "Negation",
      };
    }
  }

  if (langId === "nl") {
    const aNietIdx = attemptLow.indexOf("niet");
    const tNietIdx = targetLow.indexOf("niet");
    const aGeenIdx = attemptLow.indexOf("geen");
    const tGeenIdx = targetLow.indexOf("geen");

    if (aNietIdx !== -1 && tGeenIdx !== -1 && aNietIdx + 1 < attemptLow.length && attemptLow[aNietIdx + 1] === "een") {
      return {
        slip: "wrote 'niet een' instead of 'geen'",
        cue: "Dutch merges 'niet een' into 'geen' to negate an indefinite noun.",
        category: "Negation",
      };
    }
    if (aNietIdx !== -1 && tGeenIdx !== -1) {
      return {
        slip: "used 'niet' instead of 'geen'",
        cue: "Use 'geen' to negate an indefinite noun; use 'niet' for verbs, adjectives, and definite phrases.",
        category: "Negation",
      };
    }
    if (aGeenIdx !== -1 && tNietIdx !== -1) {
      return {
        slip: "used 'geen' instead of 'niet'",
        cue: "Use 'niet' for verbs, adjectives, and definite phrases; 'geen' is only for indefinite nouns.",
        category: "Negation",
      };
    }
  }

  if (langId === "fr") {
    const tHasNe = targetLow.some((w) => w === "ne" || w.startsWith("n'"));
    const tHasPas = targetLow.includes("pas") || targetLow.includes("plus") || targetLow.includes("jamais") || targetLow.includes("rien");
    const aHasNe = attemptLow.some((w) => w === "ne" || w.startsWith("n'"));
    const aHasPas = attemptLow.includes("pas") || attemptLow.includes("plus") || attemptLow.includes("jamais") || attemptLow.includes("rien");

    if (tHasNe && tHasPas) {
      if (attemptLow.includes("non") && !aHasPas) {
        return {
          slip: "used 'non' instead of 'ne … pas'",
          cue: `To negate a verb in French, wrap 'ne … pas' around it: '${target}'.`,
          category: "Negation",
        };
      }
      if (!aHasNe && aHasPas) {
        return {
          slip: "dropped 'ne' from the negation",
          cue: `Written French wraps both parts of 'ne … pas' around the conjugated verb: '${target}'.`,
          category: "Negation",
        };
      }
      if (aHasNe && !aHasPas) {
        return {
          slip: "dropped 'pas' after the verb",
          cue: `Complete the French negation bracket with 'pas' right after the verb: '${target}'.`,
          category: "Negation",
        };
      }
    }
  }

  if (langId === "es") {
    const tNoIdx = targetLow.indexOf("no");
    const aNoIdx = attemptLow.indexOf("no");
    if (tNoIdx !== -1 && aNoIdx === -1 && attemptLow.length === targetLow.length - 1) {
      return {
        slip: "dropped 'no'",
        cue: `Place 'no' directly before the conjugated verb (and any object pronoun): '${target}'.`,
        category: "Negation",
      };
    }
  }

  return null;
}

// 5. Capitalization-only check
function checkCapitalization(
  attempt: string,
  target: string,
  attemptOrig: string[],
  targetOrig: string[],
  langId: string
): ExerciseDiagnosis | null {
  if (!isCapitalizationOnlyDifference(attempt, target)) return null;
  let wrongWord = attemptOrig[0] ?? attempt.trim();
  let rightWord = targetOrig[0] ?? target.trim();
  for (let i = 0; i < Math.min(attemptOrig.length, targetOrig.length); i++) {
    if (attemptOrig[i] !== targetOrig[i]) {
      wrongWord = attemptOrig[i];
      rightWord = targetOrig[i];
      break;
    }
  }
  const cue =
    langId === "de"
      ? `In German, every noun and sentence opener starts with a capital letter — write '${rightWord}' instead of '${wrongWord}'.`
      : `Check the capitalization — write '${rightWord}' instead of '${wrongWord}'.`;
  return {
    slip: `capitalization slip on '${wrongWord}'`,
    cue,
    category: "Capitalization",
  };
}

// 6. Umlaut / accent / Eszett diacritic check
function checkDiacritics(
  attempt: string,
  target: string,
  attemptOrig: string[],
  targetOrig: string[],
  langId: string
): ExerciseDiagnosis | null {
  if (!isDiacriticOnlyDifference(attempt, target)) return null;

  let wrongWord = attemptOrig[0] ?? attempt.trim();
  let rightWord = targetOrig[0] ?? target.trim();
  for (let i = 0; i < Math.min(attemptOrig.length, targetOrig.length); i++) {
    if (attemptOrig[i].toLowerCase() !== targetOrig[i].toLowerCase()) {
      wrongWord = attemptOrig[i];
      rightWord = targetOrig[i];
      break;
    }
  }

  if (rightWord.includes("ß") && !wrongWord.includes("ß")) {
    return {
      slip: `wrote 'ss' instead of 'ß' in '${rightWord}'`,
      cue: `Use Eszett (ß) after long vowels and diphthongs — write '${rightWord}'.`,
      category: "Spelling & Accents",
    };
  }
  if (/[äöüÄÖÜ]/.test(rightWord) || langId === "de") {
    return {
      slip: `missing or wrong umlaut in '${rightWord}'`,
      cue: `Umlauts change the vowel sound (and often the meaning) — write '${rightWord}' instead of '${wrongWord}'.`,
      category: "Spelling & Accents",
    };
  }
  return {
    slip: `missing or wrong accent in '${rightWord}'`,
    cue: `Accents mark pronunciation and stress — write '${rightWord}' instead of '${wrongWord}'.`,
    category: "Spelling & Accents",
  };
}

// 7. Verb conjugation / auxiliary check
function sharedPrefixLength(a: string, b: string): number {
  let i = 0;
  const max = Math.min(a.length, b.length);
  while (i < max && a[i] === b[i]) i++;
  return i;
}

function hasVerbEnding(word: string, endings: readonly string[]): boolean {
  return endings.some((end) => word.length > end.length && word.endsWith(end));
}

function checkVerbForm(
  attemptOrig: string[],
  targetOrig: string[],
  attemptLow: string[],
  targetLow: string[],
  langId: string
): ExerciseDiagnosis | null {
  if (targetLow.length === 0) return null;
  const aux = AUX_GROUPS_BY_LANG[langId];

  // Handle French contraction j'ai / j'avais vs je suis / j'étais (different token counts)
  if (langId === "fr" && aux && Math.abs(attemptLow.length - targetLow.length) <= 1) {
    const stripElision = (w: string) => w.replace(/^j'/, "");
    const aPrimaryIdx = attemptLow.findIndex((w) => aux.primary.has(stripElision(w)));
    const tSecondaryIdx = targetLow.findIndex((w) => aux.secondary.has(stripElision(w)));
    if (aPrimaryIdx !== -1 && tSecondaryIdx !== -1) {
      const sharedOther = attemptLow.some(
        (w, idx) => idx !== aPrimaryIdx && targetLow.includes(w)
      );
      if (sharedOther) {
        return {
          slip: `used '${attemptOrig[aPrimaryIdx]}' instead of '${targetOrig[tSecondaryIdx]}'`,
          cue: `${aux.pairCue} — use '${targetOrig[tSecondaryIdx]}' here.`,
          category: "Verb Form",
        };
      }
    }
    const aSecondaryIdx = attemptLow.findIndex((w) => aux.secondary.has(stripElision(w)));
    const tPrimaryIdx = targetLow.findIndex((w) => aux.primary.has(stripElision(w)));
    if (aSecondaryIdx !== -1 && tPrimaryIdx !== -1) {
      const sharedOther = attemptLow.some(
        (w, idx) => idx !== aSecondaryIdx && targetLow.includes(w)
      );
      if (sharedOther) {
        return {
          slip: `used '${attemptOrig[aSecondaryIdx]}' instead of '${targetOrig[tPrimaryIdx]}'`,
          cue: `${aux.pairCue} — use '${targetOrig[tPrimaryIdx]}' here.`,
          category: "Verb Form",
        };
      }
    }
  }

  if (attemptLow.length !== targetLow.length) return null;
  const paradigms = SAME_VERB_PARADIGMS[langId] ?? [];
  const endings = VERB_ENDINGS_BY_LANG[langId] ?? [];

  for (let i = 0; i < targetLow.length; i++) {
    const a = attemptLow[i];
    const t = targetLow[i];
    if (a === t) continue;

    // Auxiliary / copula pair mismatch (haben vs sein, avoir vs être, ser vs estar, hebben vs zijn)
    if (
      aux &&
      ((aux.primary.has(a) && aux.secondary.has(t)) ||
        (aux.secondary.has(a) && aux.primary.has(t)))
    ) {
      return {
        slip: `used '${attemptOrig[i]}' instead of '${targetOrig[i]}'`,
        cue: `${aux.pairCue} — use '${targetOrig[i]}' here.`,
        category: "Verb Form",
      };
    }

    // Same irregular/common verb paradigm, wrong person/tense
    if (paradigms.some((p) => p.has(a) && p.has(t))) {
      return {
        slip: `wrong verb form: '${attemptOrig[i]}' instead of '${targetOrig[i]}'`,
        cue: `Match the verb form to the subject and tense — here it conjugates to '${targetOrig[i]}'.`,
        category: "Verb Form",
      };
    }

    // Missing ge- past participle prefix (German / Dutch)
    if ((langId === "de" || langId === "nl") && t.startsWith("ge") && t.length >= 5) {
      const withoutGe = t.slice(2);
      if (a === withoutGe || getLevenshteinDistance(a, withoutGe) <= 1) {
        return {
          slip: `missing 'ge-' past participle prefix on '${targetOrig[i]}'`,
          cue: `Past participles typically add 'ge-' to the verb stem — write '${targetOrig[i]}'.`,
          category: "Verb Form",
        };
      }
    }

    // Same stem, mismatched verb ending
    const aBase = stripDiacritics(a);
    const tBase = stripDiacritics(t);
    const prefixLen = sharedPrefixLength(aBase, tBase);
    const minLen = Math.min(aBase.length, tBase.length);
    if (
      prefixLen >= 3 &&
      prefixLen >= Math.ceil(minLen * 0.55) &&
      (hasVerbEnding(t, endings) || hasVerbEnding(a, endings)) &&
      Math.abs(a.length - t.length) <= 4
    ) {
      // Avoid flagging singular/plural noun endings if capitalized in German
      const isGermanNoun = langId === "de" && i > 0 && /^[A-ZÄÖÜ]/.test(targetOrig[i]);
      if (!isGermanNoun) {
        return {
          slip: `wrong verb ending: '${attemptOrig[i]}' instead of '${targetOrig[i]}'`,
          cue: `Keep the stem and match the verb ending to the subject and tense — write '${targetOrig[i]}'.`,
          category: "Verb Form",
        };
      }
    }
  }

  return null;
}

// 8. Missing or extra word check
function checkMissingOrExtraWord(
  attemptOrig: string[],
  targetOrig: string[],
  attemptLow: string[],
  targetLow: string[],
  target: string
): ExerciseDiagnosis | null {
  if (targetLow.length < 2 || attemptLow.length === 0) return null;
  const diffCount = targetLow.length - attemptLow.length;
  if (diffCount === 0 || Math.abs(diffCount) > 2) return null;

  if (diffCount > 0) {
    // Missing 1-2 words: check if every attempt token exists in target
    const remaining = [...targetLow];
    let matched = 0;
    for (const tok of attemptLow) {
      const idx = remaining.indexOf(tok);
      if (idx !== -1) {
        remaining.splice(idx, 1);
        matched++;
      }
    }
    if (matched === attemptLow.length) {
      const missingOrig: string[] = [];
      const aPool = [...attemptLow];
      for (let i = 0; i < targetLow.length; i++) {
        const idx = aPool.indexOf(targetLow[i]);
        if (idx !== -1) {
          aPool.splice(idx, 1);
        } else {
          missingOrig.push(targetOrig[i]);
        }
      }
      if (missingOrig.length > 0) {
        const label =
          missingOrig.length === 1
            ? `'${missingOrig[0]}'`
            : `'${missingOrig[0]}' and '${missingOrig[1]}'`;
        return {
          slip: `missing ${label}`,
          cue: `Include ${label} so the sentence is complete: '${target}'.`,
          category: "Missing Word",
        };
      }
    }
  } else {
    // Extra 1-2 words: check if every target token exists in attempt
    const remaining = [...attemptLow];
    let matched = 0;
    for (const tok of targetLow) {
      const idx = remaining.indexOf(tok);
      if (idx !== -1) {
        remaining.splice(idx, 1);
        matched++;
      }
    }
    if (matched === targetLow.length) {
      const extraOrig: string[] = [];
      const tPool = [...targetLow];
      for (let i = 0; i < attemptLow.length; i++) {
        const idx = tPool.indexOf(attemptLow[i]);
        if (idx !== -1) {
          tPool.splice(idx, 1);
        } else {
          extraOrig.push(attemptOrig[i]);
        }
      }
      if (extraOrig.length > 0) {
        const label =
          extraOrig.length === 1
            ? `'${extraOrig[0]}'`
            : `'${extraOrig[0]}' and '${extraOrig[1]}'`;
        return {
          slip: `extra word ${label}`,
          cue: `Drop ${label} — the sentence only needs: '${target}'.`,
          category: "Extra Word",
        };
      }
    }
  }

  return null;
}

// Category inference helper for authored diagnoses & contextual fallbacks
const SOUND_SHIFT_HINT_RE = /(?:→|↔|\bshift\b|consonant|vowel|palatal|circumflex|lenition|-tion|-ty\b|-ieren)/i;

function isGenuineSoundShiftHint(shiftHint?: string): boolean {
  if (!shiftHint) return false;
  // Exclude grammar hints that happen to use an arrow like "der Traum → einen Traum" or "le + lo → se lo"
  if (/\b(?:der|die|das|den|dem|ein|einen|le|la|les|lo|los|se|him-case|pronoun|case|accusative|dative)\b/i.test(shiftHint)) {
    return false;
  }
  return SOUND_SHIFT_HINT_RE.test(shiftHint);
}

function inferCategoryFromText(
  text: string,
  exerciseType?: ExerciseType,
  shiftHint?: string
): string {
  const combined = text.toLowerCase();

  if (/\bfalse friend|trap\b|looks like/i.test(combined)) return "False Friend";
  if (/\bword order|position 2|v2\b|verb-second|verb.*end|bracket|satzklammer|before the verb|after the verb|invert|inversion\b/i.test(combined)) {
    return "Word Order";
  }
  if (/\bnegat|nicht\b.*kein|kein\b.*nicht|niet\b.*geen|geen\b.*niet|ne\s*[….]+\s*pas\b/i.test(combined)) {
    return "Negation";
  }
  if (/\barticle|gender|masculine|feminine|neuter|nominative|accusative|dative|genitive|de\/het\b|der\/die\/das/i.test(combined)) {
    return "Article & Case";
  }
  if (/\breflexive|pronoun\b|direct object|indirect object/i.test(combined)) {
    return "Pronouns";
  }
  if (/\bconjugat|verb\b|participle|infinitive|modal|tense|past|future|subjunctive|haben|sein|être|avoir|ser\b.*estar/i.test(combined)) {
    return "Verb Form";
  }
  if (/\bcapitaliz|uppercase/i.test(combined)) return "Capitalization";
  if (/\bumlaut|accent|eszett|circumflex|diacritic/i.test(combined)) return "Spelling & Accents";
  if (/\bprefix|suffix|morpheme|compound|root\b/i.test(combined)) return "Word Structure";
  if (isGenuineSoundShiftHint(shiftHint)) return "Sound Shift";

  switch (exerciseType) {
    case "literal_gloss":
      return "Structure & Gloss";
    case "reverse_cognate":
      return "Cognate Match";
    case "morpheme_tiles":
      return "Word Structure";
    case "family_matrix":
      return "Word Family";
    case "pronoun_compression":
      return "Pronouns";
    case "spoken_turn_reply":
      return "Conversation";
    case "dictation":
      return "Listening & Spelling";
    case "variant_english":
      return "Meaning Match";
    case "syntax_builder":
      return "Word Order";
    default:
      return "Word Choice";
  }
}

// 10. Small typo / spelling slip check
function checkSmallTypo(
  attemptOrig: string[],
  targetOrig: string[],
  attemptLow: string[],
  targetLow: string[]
): ExerciseDiagnosis | null {
  if (attemptLow.length !== targetLow.length || targetLow.length === 0) return null;

  let diffIdx = -1;
  let diffCount = 0;
  for (let i = 0; i < targetLow.length; i++) {
    if (attemptLow[i] !== targetLow[i]) {
      diffIdx = i;
      diffCount++;
    }
  }
  if (diffCount !== 1 || diffIdx === -1) return null;

  const a = attemptLow[diffIdx];
  const t = targetLow[diffIdx];
  if (t.length < 3) return null;

  const dist = getLevenshteinDistance(a, t);
  if (dist > 2) return null;

  // Find differing middle slice to give a pinpoint cue
  let start = 0;
  while (start < a.length && start < t.length && a[start] === t[start]) start++;
  let endA = a.length;
  let endT = t.length;
  while (endA > start && endT > start && a[endA - 1] === t[endT - 1]) {
    endA--;
    endT--;
  }
  const gotPart = attemptOrig[diffIdx].slice(start, endA);
  const expPart = targetOrig[diffIdx].slice(start, endT);
  const detail =
    gotPart && expPart
      ? `watch '${expPart}' vs '${gotPart}'`
      : expPart
      ? `missing '${expPart}'`
      : gotPart
      ? `extra '${gotPart}'`
      : `check the letters`;

  return {
    slip: "close spelling slip",
    cue: `Almost there — ${detail} in '${targetOrig[diffIdx]}' (you wrote '${attemptOrig[diffIdx]}').`,
    category: "Spelling",
  };
}

// 11. Smart contextual fallback
function buildContextualFallback(
  attempt: string,
  target: string,
  params: DiagnoseExerciseAttemptParams
): ExerciseDiagnosis {
  const shortAttempt = truncate(attempt);
  const shortTarget = truncate(target);
  const explanationLead = params.explanation ? firstSentence(params.explanation) : "";
  const category = inferCategoryFromText(
    [params.explanation, params.prompt, params.englishPrompt].filter(Boolean).join(" "),
    params.exerciseType,
    params.shiftHint
  );

  // Check if a distractor from word_bank slipped into a production attempt
  if (params.wordBank && params.wordBank.length > 0 && attempt.trim()) {
    const targetSet = new Set(tokenizeLower(target));
    const bankSet = new Set(params.wordBank.map((w) => cleanToken(w).toLowerCase()));
    const attemptOrig = tokenizeOriginal(attempt);
    const bankIntruder = attemptOrig.find(
      (tok) => bankSet.has(tok.toLowerCase()) && !targetSet.has(tok.toLowerCase())
    );
    if (bankIntruder) {
      return {
        slip: `used '${bankIntruder}', which isn't needed here`,
        cue: explanationLead || `Keep only the words the sentence calls for: '${shortTarget}'.`,
        category: "Word Choice",
      };
    }
  }

  let slip: string;
  switch (params.exerciseType) {
    case "shift_select":
      slip = shortAttempt
        ? `chose '${shortAttempt}' instead of '${shortTarget}'`
        : `expected '${shortTarget}'`;
      break;
    case "reverse_cognate":
      slip = shortAttempt
        ? `wrote '${shortAttempt}' instead of '${shortTarget}'`
        : `the English cognate is '${shortTarget}'`;
      break;
    case "literal_gloss":
      slip = shortAttempt
        ? `picked '${shortAttempt}' instead of the word-for-word gloss`
        : "picked a different English gloss";
      break;
    case "morpheme_tiles":
      slip = shortAttempt
        ? `assembled '${shortAttempt}' instead of '${shortTarget}'`
        : `expected '${shortTarget}'`;
      break;
    case "family_matrix":
      slip = shortAttempt
        ? `wrote '${shortAttempt}' instead of '${shortTarget}'`
        : `expected '${shortTarget}'`;
      break;
    case "pronoun_compression":
      slip = shortAttempt
        ? `folded to '${shortAttempt}' instead of '${shortTarget}'`
        : `expected '${shortTarget}'`;
      break;
    case "spoken_turn_reply":
      slip = shortAttempt
        ? `reply didn't match '${shortTarget}'`
        : `expected '${shortTarget}'`;
      break;
    case "dictation":
      slip = shortAttempt
        ? `wrote '${shortAttempt}' instead of '${shortTarget}'`
        : `expected '${shortTarget}'`;
      break;
    case "variant_english":
      slip = "selection didn't match all equivalent English renderings";
      break;
    case "matching_pairs":
      slip = shortAttempt
        ? `'${shortAttempt}' doesn't match '${shortTarget}'`
        : `expected '${shortTarget}'`;
      break;
    default:
      slip = shortAttempt
        ? `wrote '${shortAttempt}' instead of '${shortTarget}'`
        : `expected '${shortTarget}'`;
      break;
  }

  const cue = explanationLead || `The target answer is '${shortTarget}'.`;
  return { slip, cue, category };
}

// ---------------------------------------------------------------------------
// Public entry point
// ---------------------------------------------------------------------------

export function diagnoseExerciseAttempt(params: DiagnoseExerciseAttemptParams): ExerciseDiagnosis {
  const langId = resolveLanguageId(params.languageId);
  const attempt = params.attempt.trim();
  const target = pickClosestTarget(attempt, params.expected, params.acceptedAnswers);

  const attemptOrig = tokenizeOriginal(attempt);
  const targetOrig = tokenizeOriginal(target);
  const attemptLow = attemptOrig.map((t) => t.toLowerCase());
  const targetLow = targetOrig.map((t) => t.toLowerCase());

  // 1. Sound-shift / cognate law violation
  const soundShift = checkSoundShift(attempt, target, langId, params.shiftHint, params.exerciseType);
  if (soundShift) return soundShift;

  // 2. Word-order mistake
  const wordOrder = checkWordOrder(attemptOrig, targetOrig, attemptLow, targetLow, target, langId);
  if (wordOrder) return wordOrder;

  // 3. Article / gender / case mistake
  const article = checkArticle(attemptOrig, targetOrig, attemptLow, targetLow, langId);
  if (article) return article;

  // 4. Negation mistake
  const negation = checkNegation(attemptOrig, targetOrig, attemptLow, targetLow, target, langId);
  if (negation) return negation;

  // 5. Capitalization-only mistake
  const capitalization = checkCapitalization(attempt, target, attemptOrig, targetOrig, langId);
  if (capitalization) return capitalization;

  // 6. Umlaut / accent / Eszett diacritic mistake
  const diacritics = checkDiacritics(attempt, target, attemptOrig, targetOrig, langId);
  if (diacritics) return diacritics;

  // 7. Verb conjugation / auxiliary mistake
  const verbForm = checkVerbForm(attemptOrig, targetOrig, attemptLow, targetLow, langId);
  if (verbForm) return verbForm;

  // 8. Missing or extra word
  const missingExtra = checkMissingOrExtraWord(attemptOrig, targetOrig, attemptLow, targetLow, target);
  if (missingExtra) return missingExtra;

  // 9. Authored exercise diagnosis (enriched with accurate category if missing)
  if (params.authoredDiagnosis && params.authoredDiagnosis.slip.trim() && params.authoredDiagnosis.cue.trim()) {
    const category =
      params.authoredDiagnosis.category ||
      inferCategoryFromText(
        `${params.authoredDiagnosis.slip} ${params.authoredDiagnosis.cue}`,
        params.exerciseType,
        params.shiftHint
      );
    return {
      slip: params.authoredDiagnosis.slip,
      cue: params.authoredDiagnosis.cue,
      category,
    };
  }

  // 10. Small typo / spelling slip (Levenshtein <= 2)
  const smallTypo = checkSmallTypo(attemptOrig, targetOrig, attemptLow, targetLow);
  if (smallTypo) return smallTypo;

  // 11. Smart contextual fallback from explanation + exerciseType
  return buildContextualFallback(attempt, target, params);
}
