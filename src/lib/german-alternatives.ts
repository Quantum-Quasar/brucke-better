/**
 * Automatic equivalence generation for valid German alternate answers:
 * 1. Valid V2 word-order inversion with movable time/frequency/place adverbs
 *    (e.g., "Ich bin gestern nach Berlin gefahren" <-> "Gestern bin ich nach Berlin gefahren")
 *    while strictly rejecting invalid V3 / verb-final / broken-bracket orders.
 * 2. Second-person register equivalence (`du` / `ihr` / `Sie`) with matching verb conjugation
 *    when the English prompt uses "you" without specifying a register.
 */

type Register = "du" | "ihr" | "Sie";

const MOVABLE_ADVERBS = new Set([
  "heute",
  "gestern",
  "morgen",
  "vorgestern",
  "übermorgen",
  "jetzt",
  "nun",
  "gerade",
  "sofort",
  "gleich",
  "immer",
  "oft",
  "manchmal",
  "selten",
  "meistens",
  "nie",
  "niemals",
  "bald",
  "später",
  "früh",
  "früher",
  "danach",
  "vorher",
  "dann",
  "wieder",
  "täglich",
  "hier",
  "dort",
  "draußen",
  "drinnen",
  "oben",
  "unten",
]);

/** Words that bind tightly to a following adverb so the adverb cannot be fronted alone. */
const ADVERB_BLOCKING_PRECEDERS = new Set([
  "sehr",
  "zu",
  "so",
  "ganz",
  "ziemlich",
  "recht",
  "etwas",
  "nicht",
  "am",
  "im",
  "zum",
  "zur",
  "bis",
  "ab",
  "seit",
  "von",
  "für",
  "nach",
  "vor",
  "bei",
  "mit",
  "aus",
  "über",
  "unter",
]);

/** Multi-word adverbial tails that stay attached when fronting/unfronting (e.g. "morgen früh", "dort oben"). */
const ADVERB_COMPANIONS = new Set(["abend", "morgen", "mittag", "nachmittag", "nacht", "früh", "oben", "unten"]);

const SUBJECT_PRONOUNS = new Set([
  "ich",
  "du",
  "er",
  "sie",
  "es",
  "wir",
  "ihr",
  "man",
  "niemand",
  "jemand",
  "alle",
  "das",
  "dies",
  "etwas",
  "nichts",
]);

const NOMINATIVE_DETERMINERS = new Set([
  "der",
  "die",
  "das",
  "ein",
  "eine",
  "mein",
  "meine",
  "dein",
  "deine",
  "sein",
  "seine",
  "ihr",
  "ihre",
  "unser",
  "unsere",
  "euer",
  "eure",
  "dieser",
  "diese",
  "dieses",
  "jeder",
  "jede",
  "jedes",
  "kein",
  "keine",
]);

const OBJECT_DETERMINERS = new Set([
  ...NOMINATIVE_DETERMINERS,
  "den",
  "einen",
  "meinen",
  "deinen",
  "seinen",
  "ihren",
  "unseren",
  "euren",
  "diesen",
  "jeden",
  "keinen",
  "dem",
  "einem",
  "meinem",
  "deinem",
  "seinem",
  "ihrem",
  "unserem",
  "eurem",
  "diesem",
  "jedem",
  "keinem",
  "einer",
  "meiner",
  "deiner",
  "seiner",
  "ihrer",
  "unserer",
  "eurer",
  "keiner",
]);

const OBJECT_PRONOUNS = new Set([
  "mich",
  "dich",
  "ihn",
  "es",
  "uns",
  "euch",
  "mir",
  "dir",
  "ihm",
  "ihnen",
  "das",
]);

const COPULA_VERBS = new Set([
  "bin",
  "bist",
  "ist",
  "sind",
  "seid",
  "war",
  "warst",
  "wart",
  "waren",
  "wäre",
  "wärst",
  "wärt",
  "wären",
  "werde",
  "wirst",
  "wird",
  "werden",
  "werdet",
  "bleibe",
  "bleibst",
  "bleibt",
  "bleiben",
  "heiße",
  "heißt",
  "heißen",
]);

const MIDDLE_SKIPPABLE_BEFORE_ADVERB = new Set([
  "mich",
  "dich",
  "sich",
  "uns",
  "euch",
  "mir",
  "dir",
  "ihm",
  "ihr",
  "ihnen",
  "es",
  "immer",
  "oft",
  "manchmal",
  "selten",
  "meistens",
]);

const NON_VERB_WORDS = new Set([
  "und",
  "oder",
  "aber",
  "denn",
  "dass",
  "weil",
  "wenn",
  "ob",
  "wo",
  "was",
  "wer",
  "wie",
  "wann",
  "warum",
  "nicht",
  "kein",
  "keine",
  "keinen",
  "in",
  "an",
  "auf",
  "mit",
  "nach",
  "zu",
  "von",
  "bei",
  "für",
  "aus",
  "um",
  "am",
  "im",
  "zum",
  "zur",
]);

const DISCOURSE_OPENERS = new Set(["ja", "nein"]);

const SUBORDINATORS = new Set([
  "dass",
  "weil",
  "wenn",
  "ob",
  "obwohl",
  "während",
  "bevor",
  "nachdem",
  "seit",
  "seitdem",
  "bis",
  "damit",
  "falls",
  "sobald",
  "solange",
  "wo",
  "wann",
  "warum",
  "wie",
  "wer",
  "was",
]);

const MODAL_OR_AUX_QUESTION_VERBS = new Set([
  "sind",
  "waren",
  "wären",
  "haben",
  "hatten",
  "hätten",
  "können",
  "könnten",
  "wollen",
  "wollten",
  "möchten",
  "mögen",
  "müssen",
  "müssten",
  "sollen",
  "sollten",
  "dürfen",
  "dürften",
  "wissen",
  "wussten",
  "werden",
  "würden",
]);

const isCapitalized = (word: string) =>
  word.length > 0 && word[0] === word[0].toUpperCase() && word[0] !== word[0].toLowerCase();

const isLowercaseWord = (word: string) =>
  word.length > 0 && word[0] === word[0].toLowerCase() && word[0] !== word[0].toUpperCase();

const capitalize = (word: string) => (word ? word[0].toUpperCase() + word.slice(1) : word);
const decapitalize = (word: string) => (word ? word[0].toLowerCase() + word.slice(1) : word);

function looksLikePluralVerb(verbLower: string): boolean {
  return verbLower.endsWith("en") || verbLower === "sind" || verbLower === "waren" || verbLower === "wären";
}

function looksLikeFiniteVerb(word: string): boolean {
  if (!isLowercaseWord(word)) return false;
  const lower = word.toLowerCase();
  if (
    NON_VERB_WORDS.has(lower) ||
    MOVABLE_ADVERBS.has(lower) ||
    NOMINATIVE_DETERMINERS.has(lower) ||
    SUBJECT_PRONOUNS.has(lower) ||
    OBJECT_PRONOUNS.has(lower)
  ) {
    return false;
  }
  return true;
}

/**
 * Match a nominative subject span starting at `start` in `tokens`.
 * Returns the exclusive end index, or -1 if no subject starts at `start`.
 */
function matchSubjectEnd(tokens: string[], start: number): number {
  const first = tokens[start];
  if (!first) return -1;
  const firstLower = first.toLowerCase();

  // Single-word pronoun / indefinite pronoun (excluding determiner + capitalized noun)
  if (SUBJECT_PRONOUNS.has(firstLower)) {
    if (NOMINATIVE_DETERMINERS.has(firstLower) && tokens[start + 1] && isCapitalized(tokens[start + 1])) {
      // e.g. "Das Buch", "Ihr Haus" -> treat as NP below
    } else if (
      NOMINATIVE_DETERMINERS.has(firstLower) &&
      tokens[start + 1] &&
      isLowercaseWord(tokens[start + 1]) &&
      tokens[start + 2] &&
      isCapitalized(tokens[start + 2])
    ) {
      // e.g. "Das kleine Buch" -> treat as NP below
    } else {
      return start + 1;
    }
  }

  // Determiner + [optional lowercase adjective] + capitalized noun
  const matchSingleNp = (idx: number): number => {
    const det = tokens[idx];
    if (!det || !NOMINATIVE_DETERMINERS.has(det.toLowerCase())) return -1;
    const next = tokens[idx + 1];
    if (!next) return -1;
    if (isCapitalized(next)) return idx + 2;
    const third = tokens[idx + 2];
    if (isLowercaseWord(next) && third && isCapitalized(third)) return idx + 3;
    return -1;
  };

  let end = matchSingleNp(start);
  if (end === -1) return -1;

  // Coordinated NP subject: e.g. "der Mann und die Frau"
  if (tokens[end]?.toLowerCase() === "und") {
    const secondEnd = matchSingleNp(end + 1);
    if (secondEnd !== -1) end = secondEnd;
  }
  return end;
}

/** Match a movable adverbial phrase starting at `idx`. Returns exclusive end index or -1. */
function matchAdverbPhraseEnd(tokens: string[], idx: number, requireLowercase: boolean): number {
  const tok = tokens[idx];
  if (!tok) return -1;
  if (requireLowercase && !isLowercaseWord(tok)) return -1;
  if (!MOVABLE_ADVERBS.has(tok.toLowerCase())) return -1;

  // Check for "morgen um acht" style time phrase
  if (
    tokens[idx + 1]?.toLowerCase() === "um" &&
    tokens[idx + 2] &&
    isLowercaseWord(tokens[idx + 2]) &&
    tokens[idx + 3] &&
    looksLikeFiniteVerb(tokens[idx + 3])
  ) {
    return idx + 3;
  }

  // Check for 2-word adverbial phrase like "dort oben", "heute Abend", "morgen früh"
  const next = tokens[idx + 1];
  if (next && ADVERB_COMPANIONS.has(next.toLowerCase())) {
    return idx + 2;
  }

  return idx + 1;
}

function lowerSubjectTokens(subjectTokens: string[], verbLower: string): string[][] {
  const first = subjectTokens[0];
  if (!first) return [subjectTokens];
  if (subjectTokens.length === 1 && first === "Sie") {
    // Formal "Sie" stays capitalized; plural/3sg "sie" is lowercase only for singular 3rd person.
    if (looksLikePluralVerb(verbLower)) {
      return [["Sie"]];
    }
    return [["sie"]];
  }
  const lowered = [decapitalize(first), ...subjectTokens.slice(1)];
  return [lowered];
}

function capitalizeSubjectTokens(subjectTokens: string[]): string[] {
  if (!subjectTokens.length) return subjectTokens;
  return [capitalize(subjectTokens[0]), ...subjectTokens.slice(1)];
}

function lowerAdverbTokens(advTokens: string[]): string[] {
  if (!advTokens.length) return advTokens;
  return [decapitalize(advTokens[0]), ...advTokens.slice(1)];
}

function capitalizeAdverbTokens(advTokens: string[]): string[] {
  if (!advTokens.length) return advTokens;
  return [capitalize(advTokens[0]), ...advTokens.slice(1)];
}

function isCoreferentReflexive(subjTokens: string[], objTokens: string[]): boolean {
  if (subjTokens.length !== 1 || objTokens.length !== 1) return false;
  const subj = subjTokens[0].toLowerCase();
  const obj = objTokens[0].toLowerCase();
  return (
    (subj === "ich" && (obj === "mich" || obj === "mir")) ||
    (subj === "du" && (obj === "dich" || obj === "dir")) ||
    (subj === "wir" && obj === "uns") ||
    (subj === "ihr" && obj === "euch") ||
    obj === "sich"
  );
}

/**
 * Match a direct object NP or object pronoun starting at `start` in `tokens`.
 * Returns the exclusive end index, or -1 if no direct object starts at `start`.
 */
function matchObjectEnd(tokens: string[], start: number, atSentenceStart: boolean): number {
  const matchSingleObj = (idx: number, isStart: boolean): number => {
    const first = tokens[idx];
    if (!first) return -1;
    const firstLower = first.toLowerCase();

    // 1. Determiner + [optional lowercase adjective] + capitalized noun
    if (OBJECT_DETERMINERS.has(firstLower)) {
      const next = tokens[idx + 1];
      if (next && isCapitalized(next)) return idx + 2;
      const third = tokens[idx + 2];
      if (next && isLowercaseWord(next) && third && isCapitalized(third)) return idx + 3;
    }

    // 2. Object pronoun (e.g., "ihn", "mich", "das")
    if (OBJECT_PRONOUNS.has(firstLower)) {
      return idx + 1;
    }

    // 3. Bare capitalized noun (mass/plural noun, e.g., "Kaffee", "Wasser", "Deutsch")
    if (
      isCapitalized(first) &&
      !SUBJECT_PRONOUNS.has(firstLower) &&
      !MOVABLE_ADVERBS.has(firstLower) &&
      !NON_VERB_WORDS.has(firstLower) &&
      !SUBORDINATORS.has(firstLower) &&
      !DISCOURSE_OPENERS.has(firstLower) &&
      !OBJECT_DETERMINERS.has(firstLower) &&
      !MODAL_OR_AUX_QUESTION_VERBS.has(firstLower)
    ) {
      if (!isStart || (tokens[idx + 1] && (looksLikeFiniteVerb(tokens[idx + 1]) || tokens[idx + 1].toLowerCase() === "und"))) {
        return idx + 1;
      }
    }

    return -1;
  };

  let end = matchSingleObj(start, atSentenceStart);
  if (end === -1) return -1;

  // Coordinated object NP: e.g. "Brot und Käse", "eine Hose und eine Jacke"
  if (tokens[end]?.toLowerCase() === "und") {
    const secondEnd = matchSingleObj(end + 1, false);
    if (secondEnd !== -1) {
      end = secondEnd;
    }
  }
  return end;
}

function lowerObjectTokens(objTokens: string[]): string[] {
  if (!objTokens.length) return objTokens;
  const first = objTokens[0];
  if (first === "Ihnen" || first === "Sie") return objTokens;
  const firstLower = first.toLowerCase();
  if (OBJECT_DETERMINERS.has(firstLower) || OBJECT_PRONOUNS.has(firstLower)) {
    return [decapitalize(first), ...objTokens.slice(1)];
  }
  // Bare German noun stays capitalized mid-sentence (e.g. "Kaffee")
  return objTokens;
}

function capitalizeObjectTokens(objTokens: string[]): string[] {
  if (!objTokens.length) return objTokens;
  return [capitalize(objTokens[0]), ...objTokens.slice(1)];
}

/**
 * Generate valid German V2 word-order equivalents for a declarative main clause
 * containing a movable time/frequency/place adverb.
 */
export function generateGermanV2Alternatives(sentence: string): string[] {
  const trimmed = sentence.trim();
  if (!trimmed || !trimmed.includes(" ")) return [];

  // Preserve trailing punctuation (if any) and any secondary clause after comma/semicolon/dash
  const trailingPunctMatch = trimmed.match(/([.,!?;:]+)$/);
  const trailingPunct = trailingPunctMatch ? trailingPunctMatch[1] : "";
  const withoutTrailing = trailingPunct ? trimmed.slice(0, -trailingPunct.length).trim() : trimmed;

  // Do not invert questions
  if (trailingPunct.includes("?")) return [];

  // Split at the first clause delimiter (comma, semicolon, em/en dash) so subordinate clauses stay untouched
  const clauseBoundary = withoutTrailing.search(/[,;—–]/);
  const firstClause = clauseBoundary >= 0 ? withoutTrailing.slice(0, clauseBoundary).trim() : withoutTrailing;
  const restClause = clauseBoundary >= 0 ? withoutTrailing.slice(clauseBoundary) : "";

  const rawTokens = firstClause.split(/\s+/).filter(Boolean);
  if (rawTokens.length < 3) return [];

  // Optional leading discourse particle ("Ja es ist heute kälter" -> prefix "Ja ")
  let prefix = "";
  let tokens = rawTokens;
  if (DISCOURSE_OPENERS.has(rawTokens[0].toLowerCase()) && rawTokens.length >= 4) {
    prefix = `${rawTokens[0]} `;
    tokens = rawTokens.slice(1);
  }

  const results = new Set<string>();
  const emit = (clauseTokens: string[]) => {
    const candidate = `${prefix}${clauseTokens.join(" ")}${restClause}${trailingPunct}`.trim();
    if (candidate.toLowerCase() !== trimmed.toLowerCase()) {
      results.add(candidate);
    }
  };

  // Direction B: Fronted Adv - V - S - ... -> S - V - Adv - ...
  const frontedAdvEnd = matchAdverbPhraseEnd(tokens, 0, false);
  if (frontedAdvEnd !== -1 && frontedAdvEnd < tokens.length - 1) {
    const verb = tokens[frontedAdvEnd];
    if (looksLikeFiniteVerb(verb)) {
      const subjStart = frontedAdvEnd + 1;
      const subjEnd = matchSubjectEnd(tokens, subjStart);
      if (subjEnd !== -1) {
        const advTokens = lowerAdverbTokens(tokens.slice(0, frontedAdvEnd));
        const subjTokens = prefix
          ? tokens.slice(subjStart, subjEnd)
          : capitalizeSubjectTokens(tokens.slice(subjStart, subjEnd));
        const tail = tokens.slice(subjEnd);
        emit([...subjTokens, verb, ...advTokens, ...tail]);
      }
    }
  }

  // Direction A: Canonical S - V - [optional short pronoun/adverb] - Adv - ... -> Adv - V - S - ...
  if (frontedAdvEnd === -1) {
    const subjEnd = matchSubjectEnd(tokens, 0);
    if (subjEnd !== -1 && subjEnd < tokens.length - 1) {
      const verb = tokens[subjEnd];
      if (looksLikeFiniteVerb(verb)) {
        const subjTokens = tokens.slice(0, subjEnd);
        // Skip expletive Vorfeld-"es" with a plural verb ("Es kommen heute viele Gäste" -> never "*Heute kommen es viele Gäste")
        if (
          subjTokens.length === 1 &&
          subjTokens[0].toLowerCase() === "es" &&
          looksLikePluralVerb(verb.toLowerCase())
        ) {
          return Array.from(results);
        }

        const afterVerbStart = subjEnd + 1;

        // Check adverb immediately after verb, or after one skippable short pronoun/adverb
        const candidateAdvIndices = [afterVerbStart];
        if (
          afterVerbStart + 1 < tokens.length &&
          MIDDLE_SKIPPABLE_BEFORE_ADVERB.has(tokens[afterVerbStart].toLowerCase())
        ) {
          candidateAdvIndices.push(afterVerbStart + 1);
        }

        for (const advIdx of candidateAdvIndices) {
          const prevTok = tokens[advIdx - 1]?.toLowerCase();
          if (advIdx > afterVerbStart && prevTok && ADVERB_BLOCKING_PRECEDERS.has(prevTok)) continue;
          const advEnd = matchAdverbPhraseEnd(tokens, advIdx, true);
          if (advEnd === -1) continue;
          // Ensure we didn't cross a clause boundary keyword like "und" / "aber"
          const middleBefore = tokens.slice(afterVerbStart, advIdx);
          if (middleBefore.some((t) => NON_VERB_WORDS.has(t.toLowerCase()))) continue;

          const advTokens = prefix
            ? lowerAdverbTokens(tokens.slice(advIdx, advEnd))
            : capitalizeAdverbTokens(tokens.slice(advIdx, advEnd));
          const tail = tokens.slice(advEnd);
          for (const loweredSubj of lowerSubjectTokens(subjTokens, verb.toLowerCase())) {
            emit([...advTokens, verb, ...loweredSubj, ...middleBefore, ...tail]);
          }
        }

        // Direction C: Canonical S - V - Obj - ... -> Obj - V - S - ...
        if (!COPULA_VERBS.has(verb.toLowerCase())) {
          const objEnd = matchObjectEnd(tokens, afterVerbStart, false);
          if (objEnd !== -1) {
            const rawObjTokens = tokens.slice(afterVerbStart, objEnd);
            if (!isCoreferentReflexive(subjTokens, rawObjTokens)) {
              const objTokens = prefix ? lowerObjectTokens(rawObjTokens) : capitalizeObjectTokens(rawObjTokens);
              const tail = tokens.slice(objEnd);
              for (const loweredSubj of lowerSubjectTokens(subjTokens, verb.toLowerCase())) {
                emit([...objTokens, verb, ...loweredSubj, ...tail]);
              }
            }
          }
        }
      }
    }

    // Direction D: Fronted Obj - V - S - ... -> S - V - Obj - ...
    const frontedObjEnd = matchObjectEnd(tokens, 0, true);
    if (frontedObjEnd !== -1 && frontedObjEnd < tokens.length - 1) {
      const verb = tokens[frontedObjEnd];
      if (looksLikeFiniteVerb(verb) && !COPULA_VERBS.has(verb.toLowerCase())) {
        const subjStart = frontedObjEnd + 1;
        const subjEnd = matchSubjectEnd(tokens, subjStart);
        if (subjEnd !== -1) {
          const rawObjTokens = tokens.slice(0, frontedObjEnd);
          const rawSubjTokens = tokens.slice(subjStart, subjEnd);
          if (!isCoreferentReflexive(rawSubjTokens, rawObjTokens)) {
            const objTokens = lowerObjectTokens(rawObjTokens);
            const subjTokens = prefix ? rawSubjTokens : capitalizeSubjectTokens(rawSubjTokens);
            const tail = tokens.slice(subjEnd);
            emit([...subjTokens, verb, ...objTokens, ...tail]);
          }
        }
      }
    }
  }

  return Array.from(results);
}

// ---------------------------------------------------------------------------
// Second-person register equivalence (du / ihr / Sie)
// ---------------------------------------------------------------------------

/** Instructional wrapper phrases that address the learner rather than the target sentence. */
const INSTRUCTIONAL_YOU_FRAMES = [
  /\bhow would you say\b/gi,
  /\byou want to say\b/gi,
  /\bthe german sentence you hear\b/gi,
  /\bsentence you hear\b/gi,
  /\bwhat you hear\b/gi,
  /\bdo you hear\b/gi,
];

const ENGLISH_YOU_PATTERN = /\b(you|your|yours|yourself|yourselves|you['’]re|you['’]ve|you['’]ll|you['’]d)\b/i;

const EXPLICIT_REGISTER_PATTERN =
  /\b(formal|informal|familiar|casual|polite|plural|singular|thee|thou|thy)\b/i;

const EXPLICIT_GERMAN_PRONOUN_PATTERN = /\b(du|ihr)\b/i;
const EXPLICIT_GERMAN_SIE_PATTERN = /\bSie\b/;

/**
 * Returns true when an English prompt uses "you"/"your" without specifying
 * informal singular (`du`), informal plural (`ihr`), or formal (`Sie`).
 */
export function isUnspecifiedYouPrompt(promptText: string): boolean {
  if (!promptText) return false;
  if (
    EXPLICIT_REGISTER_PATTERN.test(promptText) ||
    EXPLICIT_GERMAN_PRONOUN_PATTERN.test(promptText) ||
    EXPLICIT_GERMAN_SIE_PATTERN.test(promptText)
  ) {
    return false;
  }
  let stripped = promptText;
  for (const frame of INSTRUCTIONAL_YOU_FRAMES) {
    stripped = stripped.replace(frame, " ");
  }
  return ENGLISH_YOU_PATTERN.test(stripped);
}

type ConjugationTriple = readonly [du: string, ihr: string, Sie: string];

const IRREGULAR_VERB_TRIPLES: readonly ConjugationTriple[] = [
  // Auxiliaries
  ["bist", "seid", "sind"],
  ["warst", "wart", "waren"],
  ["wärst", "wärt", "wären"],
  ["hast", "habt", "haben"],
  ["hattest", "hattet", "hatten"],
  ["hättest", "hättet", "hätten"],
  ["wirst", "werdet", "werden"],
  ["wurdest", "wurdet", "wurden"],
  ["würdest", "würdet", "würden"],
  // wissen & modals
  ["weißt", "wisst", "wissen"],
  ["wusstest", "wusstet", "wussten"],
  ["kannst", "könnt", "können"],
  ["konntest", "konntet", "konnten"],
  ["könntest", "könntet", "könnten"],
  ["musst", "müsst", "müssen"],
  ["musstest", "musstet", "mussten"],
  ["müsstest", "müsstet", "müssten"],
  ["willst", "wollt", "wollen"],
  ["wolltest", "wolltet", "wollten"],
  ["sollst", "sollt", "sollen"],
  ["solltest", "solltet", "sollten"],
  ["darfst", "dürft", "dürfen"],
  ["durftest", "durftet", "durften"],
  ["dürftest", "dürftet", "dürften"],
  ["magst", "mögt", "mögen"],
  ["möchtest", "möchtet", "möchten"],
  // Common stem-changing & irregular verbs
  ["fährst", "fahrt", "fahren"],
  ["schläfst", "schlaft", "schlafen"],
  ["trägst", "tragt", "tragen"],
  ["wäschst", "wascht", "waschen"],
  ["läufst", "lauft", "laufen"],
  ["fällst", "fallt", "fallen"],
  ["hältst", "haltet", "halten"],
  ["lässt", "lasst", "lassen"],
  ["fängst", "fangt", "fangen"],
  ["lädst", "ladet", "laden"],
  ["schlägst", "schlagt", "schlagen"],
  ["wächst", "wachst", "wachsen"],
  ["trittst", "tretet", "treten"],
  ["stirbst", "sterbt", "sterben"],
  ["rätst", "ratet", "raten"],
  ["gibst", "gebt", "geben"],
  ["nimmst", "nehmt", "nehmen"],
  ["sprichst", "sprecht", "sprechen"],
  ["hilfst", "helft", "helfen"],
  ["isst", "esst", "essen"],
  ["vergisst", "vergesst", "vergessen"],
  ["triffst", "trefft", "treffen"],
  ["siehst", "seht", "sehen"],
  ["liest", "lest", "lesen"],
  ["empfiehlst", "empfehlt", "empfehlen"],
  ["stiehlst", "stehlt", "stehlen"],
  ["brichst", "brecht", "brechen"],
  ["wirfst", "werft", "werfen"],
  ["tust", "tut", "tun"],
  ["gingst", "gingt", "gingen"],
  ["kamst", "kamt", "kamen"],
  ["brachtest", "brachtet", "brachten"],
  ["dachtest", "dachtet", "dachten"],
];

/** Common separable prefixes (longest first so `zurück` matches before `zu`). */
const SEPARABLE_PREFIXES = [
  "zurück",
  "fern",
  "auf",
  "aus",
  "ein",
  "mit",
  "vor",
  "weg",
  "ab",
  "an",
  "zu",
] as const;

/** Sibilant-ending stems whose 2sg ends in `-t` (not `-st`), checked before generic `-st` stripping. */
const SIBILANT_STEMS = new Set([
  "reis",
  "pass",
  "lös",
  "vermiss",
  "küss",
  "hass",
  "beweis",
  "heiß",
  "sitz",
  "tanz",
  "putz",
  "nutz",
  "setz",
  "schließ",
  "gieß",
  "genieß",
  "fließ",
  "schieß",
  "grüß",
  "schätz",
  "schütz",
  "übersetz",
  "besitz",
  "verletz",
  "beiß",
  "reiß",
  "schmeiß",
]);

const IRREGULAR_BY_REGISTER: Record<Register, Map<string, ConjugationTriple>> = {
  du: new Map(),
  ihr: new Map(),
  Sie: new Map(),
};
for (const triple of IRREGULAR_VERB_TRIPLES) {
  IRREGULAR_BY_REGISTER.du.set(triple[0], triple);
  IRREGULAR_BY_REGISTER.ihr.set(triple[1], triple);
  IRREGULAR_BY_REGISTER.Sie.set(triple[2], triple);
}

const REG_IDX: Record<Register, number> = { du: 0, ihr: 1, Sie: 2 };

const needsEphemeralE = (stem: string) =>
  /[td]$/.test(stem) || /(?:fn|gn|chn|tm|dm)$/.test(stem);

const endsWithSibilant = (stem: string) => /[sßzx]$/.test(stem);

function lookupIrregular(lower: string, from: Register, to: Register): string | null {
  const direct = IRREGULAR_BY_REGISTER[from].get(lower);
  if (direct) return direct[REG_IDX[to]];

  for (const prefix of SEPARABLE_PREFIXES) {
    if (lower.startsWith(prefix) && lower.length > prefix.length + 2) {
      const base = lower.slice(prefix.length);
      const match = IRREGULAR_BY_REGISTER[from].get(base);
      if (match) return `${prefix}${match[REG_IDX[to]]}`;
    }
  }
  return null;
}

function isKnownSibilantStem(stem: string): boolean {
  if (SIBILANT_STEMS.has(stem)) return true;
  for (const prefix of SEPARABLE_PREFIXES) {
    if (stem.startsWith(prefix) && SIBILANT_STEMS.has(stem.slice(prefix.length))) {
      return true;
    }
  }
  return false;
}

function conjugateVerbBetweenRegisters(word: string, from: Register, to: Register): string | null {
  if (from === to) return word;
  const wasCap = isCapitalized(word);
  const lower = word.toLowerCase();

  const irregular = lookupIrregular(lower, from, to);
  if (irregular) {
    return wasCap ? capitalize(irregular) : irregular;
  }

  let duForm: string;
  let ihrForm: string;
  let sieForm: string;

  if (from === "du") {
    const sibilantStem = lower.endsWith("t") && lower.length > 3 ? lower.slice(0, -1) : "";
    if (
      sibilantStem &&
      (isKnownSibilantStem(sibilantStem) ||
        lower.endsWith("sst") ||
        lower.endsWith("ßt") ||
        lower.endsWith("zt") ||
        lower.endsWith("xt"))
    ) {
      duForm = lower;
      ihrForm = `${sibilantStem}t`;
      sieForm = `${sibilantStem}en`;
    } else if (lower.endsWith("est") && lower.length > 4) {
      const stem = lower.slice(0, -3);
      duForm = lower;
      ihrForm = `${stem}et`;
      sieForm = `${stem}en`;
    } else if (lower.endsWith("st") && lower.length > 3) {
      const stem = lower.slice(0, -2);
      duForm = lower;
      ihrForm = `${stem}t`;
      sieForm = /(?:el|er)$/.test(stem) ? `${stem}n` : `${stem}en`;
    } else if (lower.endsWith("t") && lower.length > 3 && endsWithSibilant(lower.slice(0, -1))) {
      const stem = lower.slice(0, -1);
      duForm = lower;
      ihrForm = `${stem}t`;
      sieForm = `${stem}en`;
    } else {
      return null;
    }
  } else if (from === "ihr") {
    if (lower.endsWith("et") && lower.length > 3) {
      const stem = lower.slice(0, -2);
      duForm = `${stem}est`;
      ihrForm = lower;
      sieForm = `${stem}en`;
    } else if (lower.endsWith("t") && lower.length > 2) {
      const stem = lower.slice(0, -1);
      duForm = endsWithSibilant(stem) ? `${stem}t` : `${stem}st`;
      ihrForm = lower;
      sieForm = /(?:el|er)$/.test(stem) ? `${stem}n` : `${stem}en`;
    } else {
      return null;
    }
  } else {
    // from === "Sie"
    if (lower.endsWith("en") && lower.length > 3) {
      const stem = lower.slice(0, -2);
      duForm = needsEphemeralE(stem) ? `${stem}est` : endsWithSibilant(stem) ? `${stem}t` : `${stem}st`;
      ihrForm = needsEphemeralE(stem) ? `${stem}et` : `${stem}t`;
      sieForm = lower;
    } else if (/(?:ern|eln)$/.test(lower) && lower.length > 4) {
      const stem = lower.slice(0, -1);
      duForm = `${stem}st`;
      ihrForm = `${stem}t`;
      sieForm = lower;
    } else {
      return null;
    }
  }

  const out = to === "du" ? duForm : to === "ihr" ? ihrForm : sieForm;
  return wasCap ? capitalize(out) : out;
}

const POSSESSIVE_ENDINGS = ["", "e", "en", "em", "er", "es"] as const;

function mapPossessive(token: string, from: Register, to: Register, atSentenceStart: boolean): string | null {
  const lower = token.toLowerCase();
  let ending: string | null = null;

  if (from === "du" && lower.startsWith("dein")) {
    const rest = lower.slice(4);
    if ((POSSESSIVE_ENDINGS as readonly string[]).includes(rest)) ending = rest;
  } else if (from === "ihr") {
    if (lower === "euer") ending = "";
    else if (lower.startsWith("eur")) {
      const rest = lower.slice(3);
      if (rest && (POSSESSIVE_ENDINGS as readonly string[]).includes(rest)) ending = rest;
    }
  } else if (from === "Sie" && token.startsWith("Ihr")) {
    const rest = token.slice(3);
    if ((POSSESSIVE_ENDINGS as readonly string[]).includes(rest)) ending = rest;
  }

  if (ending === null) return null;
  if (to === "Sie") return `Ihr${ending}`;
  if (to === "du") return atSentenceStart ? `Dein${ending}` : `dein${ending}`;
  const base = ending === "" ? "euer" : `eur${ending}`;
  return atSentenceStart ? capitalize(base) : base;
}

function cleanToken(tok: string): string {
  return tok.replace(/^[.,!?;:]+|[.,!?;:]+$/g, "");
}

function isFormalPossessiveIhr(tokens: string[], index: number): boolean {
  const clean = cleanToken(tokens[index] ?? "");
  if (!/^Ihr(e|en|em|er|es)?$/.test(clean)) return false;
  // Inflected Ihr* (Ihre/Ihren/Ihrem/Ihrer/Ihres) or mid-sentence capitalized "Ihr" is formal possessive
  if (clean.length > 3 || index > 0) return true;
  // Sentence-initial "Ihr": formal possessive if followed by a capitalized noun or adj + capitalized noun
  const next = cleanToken(tokens[index + 1] ?? "");
  const third = cleanToken(tokens[index + 2] ?? "");
  if (next && isCapitalized(next)) return true;
  if (next && isLowercaseWord(next) && third && isCapitalized(third)) return true;
  return false;
}

function hasUnambiguousFormalMarker(tokens: string[]): boolean {
  for (let i = 0; i < tokens.length; i++) {
    const clean = cleanToken(tokens[i]);
    if (clean === "Ihnen") return true;
    if (clean === "Sie" && i > 0) return true;
    if (isFormalPossessiveIhr(tokens, i)) return true;
  }
  return false;
}

function detectRegister(tokens: string[]): Register | null {
  for (let i = 0; i < tokens.length; i++) {
    const clean = cleanToken(tokens[i]);
    const lower = clean.toLowerCase();
    if (lower === "du" || lower === "dich" || lower === "dir" || /^dein(e|en|em|er|es)?$/.test(lower)) {
      return "du";
    }
    if (clean === "Ihnen" || isFormalPossessiveIhr(tokens, i)) {
      return "Sie";
    }
    if (clean === "Sie") {
      // Mid-sentence capitalized "Sie" is unambiguously formal.
      // Sentence-initial "Sie" is ambiguous with 3rd-person "she"/"they" unless paired with an unambiguous formal marker.
      if (i > 0 || hasUnambiguousFormalMarker(tokens)) {
        return "Sie";
      }
      continue;
    }
    if (lower === "ihr" || lower === "euch" || lower === "euer" || /^eur(e|en|em|er|es)$/.test(lower)) {
      return "ihr";
    }
  }
  return null;
}

function isSieImperative(sentence: string, tokens: string[]): boolean {
  if (tokens.length < 2) return false;
  const trimmed = sentence.trim();
  if (trimmed.endsWith("?")) return false;
  if (cleanToken(tokens[1]) !== "Sie") return false;
  const firstClean = cleanToken(tokens[0]);
  const firstLower = firstClean.toLowerCase();
  if (NON_VERB_WORDS.has(firstLower)) return false;
  if (trimmed.endsWith("!")) return true;
  if (firstLower === "seien") return true;
  return !MODAL_OR_AUX_QUESTION_VERBS.has(firstLower);
}

/**
 * Find the index of the finite verb agreeing with a nominative subject pronoun at `subjIdx`.
 */
function findAgreeingVerbIndex(tokens: string[], subjIdx: number, register: Register): number {
  const cleanAt = (i: number) => cleanToken(tokens[i] ?? "");

  // Case 1: Inverted V2 or question — finite verb immediately precedes the subject ("Kommst du", "Wo wohnst du", "Weißt du")
  if (subjIdx > 0) {
    const prev = cleanAt(subjIdx - 1);
    const prevLower = prev.toLowerCase();
    if (!SUBORDINATORS.has(prevLower) && !NON_VERB_WORDS.has(prevLower)) {
      if (conjugateVerbBetweenRegisters(prev, register, register === "du" ? "Sie" : "du") !== null) {
        return subjIdx - 1;
      }
    }
  }

  // Case 2: Subordinate clause — subject immediately follows subordinator ("dass du Deutsch lernst")
  if (subjIdx > 0 && SUBORDINATORS.has(cleanAt(subjIdx - 1).toLowerCase())) {
    // Finite verb sits at the end of this clause (before any comma/semicolon/end)
    let end = subjIdx + 1;
    while (end < tokens.length && !/[,;—–]$/.test(tokens[end - 1])) {
      end++;
    }
    const lastIdx = end - 1;
    if (lastIdx > subjIdx) {
      const last = cleanAt(lastIdx);
      if (conjugateVerbBetweenRegisters(last, register, register === "du" ? "Sie" : "du") !== null) {
        return lastIdx;
      }
    }
  }

  // Case 3: Canonical SV — finite verb immediately follows the subject ("Du kommst morgen", "Ich hoffe du schläfst")
  if (subjIdx + 1 < tokens.length) {
    const next = cleanAt(subjIdx + 1);
    const nextLower = next.toLowerCase();
    if (!NON_VERB_WORDS.has(nextLower)) {
      if (conjugateVerbBetweenRegisters(next, register, register === "du" ? "Sie" : "du") !== null) {
        return subjIdx + 1;
      }
    }
  }

  return -1;
}

function inSameClause(tokens: string[], a: number, b: number): boolean {
  const lo = Math.min(a, b);
  const hi = Math.max(a, b);
  for (let idx = lo; idx < hi; idx++) {
    if (/[,;—–]$/.test(tokens[idx])) return false;
  }
  return true;
}

function transformRegister(sentence: string, from: Register, to: Register): string | null {
  const tokens = sentence.trim().split(/\s+/).filter(Boolean);
  if (!tokens.length) return null;

  if (from === "Sie" && isSieImperative(sentence, tokens)) {
    return null;
  }

  const out = [...tokens];
  let changed = false;

  const splitToken = (tok: string) => {
    const m = tok.match(/^([.,!?;:]*)([^.,!?;:]+)([.,!?;:]*)$/);
    return m ? { lead: m[1], core: m[2], trail: m[3] } : { lead: "", core: tok, trail: "" };
  };

  // Pre-scan nominative subject positions so reflexive object pronouns (`dich`/`dir`/`euch`/`sich`)
  // in the same clause are recognized as coreferent with the subject.
  const nomSubjectIndices: number[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const { core } = splitToken(tokens[i]);
    const lower = core.toLowerCase();
    const isNomCandidate =
      (from === "du" && lower === "du") ||
      (from === "ihr" && lower === "ihr" && !isFormalPossessiveIhr(tokens, i)) ||
      (from === "Sie" && core === "Sie");
    if (isNomCandidate && findAgreeingVerbIndex(tokens, i, from) !== -1) {
      nomSubjectIndices.push(i);
    }
  }
  const hasCoreferentSubject = (pos: number) =>
    nomSubjectIndices.some((subjIdx) => subjIdx !== pos && inSameClause(tokens, subjIdx, pos));

  for (let i = 0; i < tokens.length; i++) {
    const { lead, core, trail } = splitToken(tokens[i]);
    const lower = core.toLowerCase();
    const atSentenceStart = i === 0;

    // 1. Nominative subject pronoun + agreeing finite verb
    const isNomPronoun = nomSubjectIndices.includes(i);

    if (isNomPronoun) {
      const verbIdx = findAgreeingVerbIndex(tokens, i, from);
      if (verbIdx !== -1) {
        const vParts = splitToken(out[verbIdx]);
        const newVerb = conjugateVerbBetweenRegisters(vParts.core, from, to);
        if (!newVerb) return null;
        out[verbIdx] = `${vParts.lead}${newVerb}${vParts.trail}`;
        const newPronoun = to === "Sie" ? "Sie" : atSentenceStart ? capitalize(to) : to;
        out[i] = `${lead}${newPronoun}${trail}`;
        changed = true;
        continue;
      }
      if (from !== "Sie") continue;
    }

    // 2. Reflexive & Accusative / Dative object pronouns
    if (from === "du" && lower === "dich") {
      const coreferent = hasCoreferentSubject(i);
      const rep =
        to === "ihr"
          ? atSentenceStart
            ? "Euch"
            : "euch"
          : coreferent
            ? "sich"
            : "Sie";
      out[i] = `${lead}${rep}${trail}`;
      changed = true;
      continue;
    }
    if (from === "du" && lower === "dir") {
      const coreferent = hasCoreferentSubject(i);
      const rep =
        to === "ihr"
          ? atSentenceStart
            ? "Euch"
            : "euch"
          : coreferent
            ? "sich"
            : "Ihnen";
      out[i] = `${lead}${rep}${trail}`;
      changed = true;
      continue;
    }
    if (from === "Sie" && lower === "sich" && hasCoreferentSubject(i)) {
      const rep =
        to === "du"
          ? atSentenceStart
            ? "Dich"
            : "dich"
          : atSentenceStart
            ? "Euch"
            : "euch";
      out[i] = `${lead}${rep}${trail}`;
      changed = true;
      continue;
    }
    if (from === "Sie" && core === "Ihnen") {
      const rep = to === "du" ? (atSentenceStart ? "Dir" : "dir") : atSentenceStart ? "Euch" : "euch";
      out[i] = `${lead}${rep}${trail}`;
      changed = true;
      continue;
    }
    if (from === "Sie" && core === "Sie") {
      // Accusative formal Sie (not nominative subject, already handled above)
      const rep = to === "du" ? (atSentenceStart ? "Dich" : "dich") : atSentenceStart ? "Euch" : "euch";
      out[i] = `${lead}${rep}${trail}`;
      changed = true;
      continue;
    }
    if (from === "ihr" && lower === "euch") {
      const coreferent = hasCoreferentSubject(i);
      if (coreferent && to === "Sie") {
        out[i] = `${lead}sich${trail}`;
        changed = true;
        continue;
      }
      // Ambiguous between acc/dat: check common dative verbs/prepositions
      const prevLower = i > 0 ? splitToken(tokens[i - 1]).core.toLowerCase() : "";
      const isDative = ["danke", "helfe", "hilft", "gebe", "gibt", "sage", "sagt", "mit", "zu", "bei", "von", "und"].includes(
        prevLower,
      );
      const rep =
        to === "du"
          ? isDative
            ? atSentenceStart
              ? "Dir"
              : "dir"
            : atSentenceStart
              ? "Dich"
              : "dich"
          : isDative
            ? "Ihnen"
            : "Sie";
      out[i] = `${lead}${rep}${trail}`;
      changed = true;
      continue;
    }

    // 3. Possessives (dein* / euer,eur* / Ihr*)
    const mappedPoss = mapPossessive(core, from, to, atSentenceStart);
    if (mappedPoss) {
      out[i] = `${lead}${mappedPoss}${trail}`;
      changed = true;
    }
  }

  if (!changed) return null;
  const candidate = out.join(" ");
  return candidate.toLowerCase() === sentence.trim().toLowerCase() ? null : candidate;
}

/**
 * Generate valid `du` / `ihr` / `Sie` register equivalents (with matching verb conjugation)
 * for a German sentence.
 */
export function generateGermanRegisterAlternatives(sentence: string): string[] {
  const trimmed = sentence.trim();
  if (!trimmed) return [];
  const tokens = trimmed.split(/\s+/).filter(Boolean);
  const sourceReg = detectRegister(tokens);
  if (!sourceReg) return [];

  const allRegisters: Register[] = ["du", "ihr", "Sie"];
  const results: string[] = [];
  for (const targetReg of allRegisters) {
    if (targetReg === sourceReg) continue;
    const alt = transformRegister(trimmed, sourceReg, targetReg);
    if (alt) results.push(alt);
  }
  return results;
}

// ---------------------------------------------------------------------------
// Preposition + article & colloquial contraction equivalences
// ---------------------------------------------------------------------------

const GERMAN_CONTRACTION_PAIRS: ReadonlyArray<readonly [contracted: string, expanded: string]> = [
  ["im", "in dem"],
  ["am", "an dem"],
  ["zum", "zu dem"],
  ["zur", "zu der"],
  ["ins", "in das"],
  ["ans", "an das"],
  ["vom", "von dem"],
  ["beim", "bei dem"],
  ["geht's", "geht es"],
];

const RELATIVE_PRONOUN_FOLLOWERS = new Set([
  "ich",
  "du",
  "er",
  "sie",
  "es",
  "wir",
  "ihr",
  "man",
]);

function applyReplacementCase(matched: string, replacement: string): string {
  return isCapitalized(matched) ? capitalize(replacement) : replacement;
}

function buildBoundaryRegex(phrase: string): RegExp {
  const escaped = phrase
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/'/g, "['’]")
    .replace(/\s+/g, "\\s+");
  return new RegExp(`(?<![\\p{L}\\p{N}_])${escaped}(?![\\p{L}\\p{N}_])`, "gui");
}

const CONTRACTION_RULES: Array<{
  regex: RegExp;
  replacement: string;
  isContractionDirection: boolean;
}> = [];
for (const [contracted, expanded] of GERMAN_CONTRACTION_PAIRS) {
  CONTRACTION_RULES.push({
    regex: buildBoundaryRegex(contracted),
    replacement: expanded,
    isContractionDirection: false,
  });
  CONTRACTION_RULES.push({
    regex: buildBoundaryRegex(expanded),
    replacement: contracted,
    isContractionDirection: true,
  });
}

/**
 * Generate valid German contraction / uncontracted equivalents
 * (e.g., `im` <-> `in dem`, `am` <-> `an dem`, `zum` <-> `zu dem`, `zur` <-> `zu der`,
 * `ins` <-> `in das`, `ans` <-> `an das`, `vom` <-> `von dem`, `beim` <-> `bei dem`,
 * `geht's` <-> `geht es`).
 */
export function generateGermanContractionAlternatives(sentence: string): string[] {
  const trimmed = sentence.trim();
  if (!trimmed) return [];

  const MAX_VARIANTS = 16;
  const seen = new Set<string>([trimmed]);
  const queue: string[] = [trimmed];
  const results: string[] = [];

  while (queue.length > 0 && results.length < MAX_VARIANTS) {
    const current = queue.shift()!;
    for (const rule of CONTRACTION_RULES) {
      rule.regex.lastIndex = 0;
      let match: RegExpExecArray | null;
      while ((match = rule.regex.exec(current)) !== null) {
        const start = match.index;
        const end = start + match[0].length;
        if (rule.isContractionDirection && rule.replacement !== "geht's") {
          // Guard against contracting relative pronouns like "das Haus, in dem ich wohne"
          const after = current.slice(end).trimStart();
          const nextWord = after.match(/^[\p{L}]+/u)?.[0]?.toLowerCase();
          if (nextWord && RELATIVE_PRONOUN_FOLLOWERS.has(nextWord)) continue;
        }
        const rep = applyReplacementCase(match[0], rule.replacement);
        const candidate = `${current.slice(0, start)}${rep}${current.slice(end)}`;
        if (!seen.has(candidate)) {
          seen.add(candidate);
          results.push(candidate);
          queue.push(candidate);
          if (results.length >= MAX_VARIANTS) break;
        }
      }
      if (results.length >= MAX_VARIANTS) break;
    }
  }

  return results;
}

/**
 * Expand a list of German target answers with automatic V2 (adverb & object fronting) equivalents,
 * contraction equivalents, and (when enabled for unspecified-"you" prompts) `du`/`ihr`/`Sie` equivalents.
 */
export function expandGermanTargets(
  targets: readonly string[],
  options: { allowV2?: boolean; allowRegister?: boolean; allowContractions?: boolean } = {},
): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  const add = (candidate: string) => {
    const trimmed = candidate.trim();
    if (!trimmed || seen.has(trimmed)) return;
    seen.add(trimmed);
    out.push(trimmed);
  };

  for (const target of targets) add(target);

  if (options.allowRegister) {
    for (const target of [...out]) {
      for (const alt of generateGermanRegisterAlternatives(target)) {
        add(alt);
      }
    }
  }

  if (options.allowV2) {
    for (const target of [...out]) {
      for (const alt of generateGermanV2Alternatives(target)) {
        add(alt);
      }
    }
  }

  if (options.allowContractions ?? true) {
    for (const target of [...out]) {
      for (const alt of generateGermanContractionAlternatives(target)) {
        add(alt);
      }
    }
  }

  return out;
}
