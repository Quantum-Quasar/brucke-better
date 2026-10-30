// TM-3 slip diagnosis: message table keyed by shift-family id (or detected slip id).
// Each language defines its own diagnosis table mapped to the sound shifts and
// structural rules taught on its trail. Every cue states a real law from the
// language's compendium and lessons — no invented connections (P7).

export interface DiagnosisRow {
  slip: string;
  cue: string;
}

export const GERMAN_DIAGNOSIS: Record<string, DiagnosisRow> = {
  t_to_s_ss_z: {
    slip: "the English T survived",
    cue: "High German hisses T into SS/S/Z — Wasser, besser, zwei.",
  },
  th_to_d: {
    slip: "the English TH survived",
    cue: "German abolished 'th' 1,300 years ago — harden it to D: denken, Dank, Bruder.",
  },
  d_to_t: {
    slip: "the English D survived",
    cue: "Voiced D hardened to T in High German: Tag, Tür, trinken.",
  },
  p_to_pf_f: {
    slip: "the English P survived",
    cue: "Word-initial P explodes to PF (Pfad); after vowels it breathes to F/FF (hoffen, Schiff).",
  },
  k_to_ch: {
    slip: "the English K survived",
    cue: "K melts into ch after vowels — machen, Buch, suchen.",
  },
  v_to_b: {
    slip: "the English V survived",
    cue: "English v/f between vowels is German b: geben, leben, lieben.",
  },
  y_gh_to_g_ch: {
    slip: "the ghost letter stayed silent",
    cue: "English gh/y carries the old sound German still pronounces: Nacht, sagen, acht.",
  },
  strong_verbs_ablaut: {
    slip: "the vowel melody was flattened",
    cue: "Strong verbs change the root vowel — sing/sang ↔ singen/sang.",
  },
  latin_ieren: {
    slip: "the -ieren stamp was dropped",
    cue: "Romance loan verbs end in -ieren and never take ge-.",
  },
  // sh ↔ sch spelling: English sh (ship, fish) is German sch (Schiff, Fisch).
  sch_spelling: {
    slip: "the sh-sound kept its bare English S",
    cue: "English sh (ship, fish) is German sch — Schiff, Fisch, schlafen. Same sound, German spelling.",
  },
  // Word-order slides, fired from transcribe order errors (keyed separately).
  word_order: {
    slip: "the elements are in English order",
    cue: "Find the verb's seat first — position 2, or the basement after dass/weil — then pour the rest around it.",
  },
  // A word_bank distractor slipped into a transcribe attempt.
  wrong_word: {
    slip: "wrong word, right idea",
    cue: "The thought was right — a bank word the sentence doesn't need slipped in. Say it to yourself and keep only the words the thought calls for.",
  },
};

const SPANISH_DIAGNOSIS: Record<string, DiagnosisRow> = {
  tion_to_cion: {
    slip: "the English -tion survived",
    cue: "Latin -tio became -ción in Spanish — nación, situación, información.",
  },
  ty_to_dad: {
    slip: "the English -ty ending survived",
    cue: "English -ty corresponds to Spanish -dad — universidad, ciudad, realidad.",
  },
  f_to_h: {
    slip: "the Latin F wasn't silenced to H",
    cue: "Castilian turned initial Latin F- into silent H- — hacer, hablar, hijo, horno.",
  },
  ct_to_ch: {
    slip: "the Latin -CT- cluster survived",
    cue: "Latin -ct- palatalized into -ch- in Spanish — noche, leche, hecho, ocho.",
  },
  pl_cl_to_ll: {
    slip: "the initial cluster wasn't melted to LL",
    cue: "Initial pl-/cl-/fl- melted into ll- in Spanish — llave, llegar, llamar, lleno.",
  },
  li_to_j: {
    slip: "the palatal -J- shift was missed",
    cue: "Latin -li-/-cl- rasped into Spanish j — mujer, ojo, mejor, trabajar.",
  },
  no_at_in_ar: {
    slip: "the English -at- stem crept in",
    cue: "Strip all of -ate before adding -ar — celebrar, crear, separar (never *celebratar).",
  },
  word_order: {
    slip: "the elements are in English order",
    cue: "Spanish places object pronouns before a conjugated verb (lo tengo) or welded to the infinitive (tenerlo), and descriptive adjectives after the noun.",
  },
  wrong_word: {
    slip: "wrong word, right idea",
    cue: "The thought was right — a bank word the sentence doesn't need slipped in. Say it to yourself and keep only the words the thought calls for.",
  },
};

const FRENCH_DIAGNOSIS: Record<string, DiagnosisRow> = {
  ty_to_ite: {
    slip: "the English -ty kept its English ending",
    cue: "English -ty is Old French -té, modern French -ité — université, liberté, qualité.",
  },
  or_to_eur: {
    slip: "the Latin -or wasn't softened to -eur",
    cue: "Latin/English -or became -eur in French — couleur, docteur, acteur, erreur.",
  },
  s_drop_circumflex: {
    slip: "the vanished S reappeared",
    cue: "Old French dropped S before a consonant and left a circumflex hat (ˆ) in its place — forêt, hôpital, fête, île, côte.",
  },
  w_to_gu_g: {
    slip: "the Germanic W survived",
    cue: "Old French hardened Frankish W- into GU-/G- — guerre (war), garder (ward), garantir (warrant).",
  },
  c_to_ch: {
    slip: "the Latin CA- wasn't softened to CH-",
    cue: "Francien softened Latin ca- into ch- — chanter, chambre, château, chien.",
  },
  ation_to_er: {
    slip: "the noun suffix wasn't trimmed to -er",
    cue: "Drop -ation and add -er for the French verb — préparer, présenter, organiser, imaginer.",
  },
  word_order: {
    slip: "the elements are in English order",
    cue: "French wraps ne … pas around the conjugated verb and places object pronouns directly before the verb (je le vois).",
  },
  wrong_word: {
    slip: "wrong word, right idea",
    cue: "The thought was right — a bank word the sentence doesn't need slipped in. Say it to yourself and keep only the words the thought calls for.",
  },
};

const DUTCH_DIAGNOSIS: Record<string, DiagnosisRow> = {
  sch_sh: {
    slip: "the sch block lost its throat",
    cue: "English sh is Dutch sch, pronounced /sx/ — schip, schoen, schaap. Read sch as one sound and finish with ch.",
  },
  th_d: {
    slip: "the English th survived",
    cue: "Dutch hardens th to d — broeder, drie, denken, danken.",
  },
  f_v: {
    slip: "the English f stayed f",
    cue: "Dutch writes v for the old f — vader, voet, vis. The spelling is the clue even when the accent devoices it.",
  },
  s_z: {
    slip: "the English s stayed s",
    cue: "Dutch voices the old s to z — zon, zee, zout, zeven.",
  },
  gh_ch: {
    slip: "the silent gh stayed silent",
    cue: "English gh is Dutch ch — nacht, licht, recht, acht.",
  },
  vowel_ij: {
    slip: "the ij was read as English 'eye'",
    cue: "IJ is /ɛi/, starting from 'bed' and gliding — ijs, wijn, vijf.",
  },
  vowel_ui: {
    slip: "the ui was split into two English vowels",
    cue: "UI is one rounded glide /œy/ — huis, muis, uit. Do not say 'oo-ee'.",
  },
  vowel_oe: {
    slip: "the oe took the English 'book' vowel",
    cue: "Dutch oe is /u/, the vowel of 'boot' — boek, voet, goed.",
  },
  g_y: {
    slip: "the Dutch g became an English stop",
    cue: "Dutch g is a fricative, never the g of 'good' — goed, groen, geel.",
  },
  gender: {
    slip: "the article defaulted to de",
    cue: "De/het is lexical: check the noun and its compound head, and remember every diminutive is het.",
  },
  negation: {
    slip: "the negator was the wrong one",
    cue: "Geen negates an indefinite noun; niet negates a verb, adjective or definite phrase.",
  },
  v2_order: {
    slip: "the verb left second place",
    cue: "Front a word and invert: Vandaag werk ik, not Vandaag ik werk.",
  },
  word_order: {
    slip: "the elements are in English order",
    cue: "Find the finite verb's seat first — second in a main clause, last in a subordinate — then pour the rest around it.",
  },
  wrong_word: {
    slip: "wrong word, right idea",
    cue: "The thought was right — a bank word the sentence doesn't need slipped in. Keep only the words the thought calls for.",
  },
  strong_verbs_ablaut: {
    slip: "the vowel melody was flattened",
    cue: "Strong verbs change the root vowel in the past — komen/kwam, zien/zag, geven/gaf.",
  },
};

export const DIAGNOSIS_BY_LANGUAGE: Record<string, Record<string, DiagnosisRow>> = {
  de: GERMAN_DIAGNOSIS,
  es: SPANISH_DIAGNOSIS,
  fr: FRENCH_DIAGNOSIS,
  nl: DUTCH_DIAGNOSIS,
};
