import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 9,
  "slug": "conjugation-roots-and-thou",
  "title": "Conjugation Roots & The Living Endings",
  "subtitle": "Why Shakespeare's 'thou -st' and archaic '-th' unlock German verb conjugations",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "lernen",
    "kommen",
    "trinken",
    "machen",
    "denken",
    "finden",
    "singen",
    "bringen",
    "du",
    "stehen",
    "zeigen",
    "küssen",
    "fotografieren",
    "anprobieren",
    "spazieren"
  ],
  "table_word_ids": [
    "lernen",
    "kommen",
    "trinken",
    "machen",
    "denken",
    "du",
    "finden",
    "singen",
    "bringen",
    "stehen",
    "zeigen",
    "küssen",
    "fotografieren",
    "anprobieren",
    "spazieren",
    "sportplatz"
  ],
  "hook": {
    "title": "Shakespeare's Hidden Conjugation Table",
    "content": "English speakers often view verb conjugation tables as an unnatural obstacle. But German verb endings are not foreign: they are the exact personal suffixes English used until the 17th century! Early Modern English preserved 'thou -st' (thou learnst, thou drinkst) and 3rd person '-th' (he learneth, he cometh). German simply kept these living endings intact.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Proto-Germanic Personal Inflections",
        "content": "Ancient Germanic marked the grammatical subject directly on the verb root via distinct personal suffixes."
      }
    ]
  },
  "pattern": {
    "title": "Stem + Suffix: The Universal Formula",
    "content": "Strip the dictionary infinitive '-en' to find the bare verb stem (lern-, trink-, mach-). Then attach the personal tile: 'ich -e' (Old English ic binde), 'du -st' (Early Modern English thou learnst / thou drinkst), 'er/sie/es -t' (archaic he learneth / he drinketh), 'wir -en' (Middle English we drinken), 'ihr -t' (plural y'all), and 'sie -en' (they). Once you recognize Shakespeare in 'du trinkst' and 'er trinkt', you never have to memorize a regular verb table again!",
    "footnotes": [
      {
        "marker": "2",
        "title": "Thou -st ↔ Du -st",
        "content": "2nd person singular '-st' is an identical historical cognate across both languages."
      }
    ]
  },
  "exercises": [
    {
      "id": "l9_e1",
      "type": "morpheme_tiles",
      "prompt": "Assemble the verb form for 'thou makest / you make' (Stem + Shakespearean ending):",
      "tile_options": [
        "e",
        "mach",
        "st",
        "en",
        "t"
      ],
      "target_answer": "machst",
      "meaning": "you make / thou makest",
      "shift_hint": "du -st (thou -st)",
      "explanation": "Stem 'mach-' + 2nd person singular suffix '-st' (twin of Early Modern English 'thou -st') = machst."
    },
    {
      "id": "l9_e2",
      "type": "matching_pairs",
      "prompt": "Match each thought with its German form — the ending carries the person:",
      "matching_pairs": [
        {
          "id": "cj1",
          "english": "thou standest",
          "german": "du stehst"
        },
        {
          "id": "cj2",
          "english": "he shows",
          "german": "er zeigt"
        },
        {
          "id": "cj3",
          "english": "thou kissest",
          "german": "du küsst"
        },
        {
          "id": "cj4",
          "english": "we kiss",
          "german": "wir küssen"
        },
        {
          "id": "cj5",
          "english": "we stand",
          "german": "wir stehen"
        },
        {
          "id": "cj6",
          "english": "thou makest",
          "german": "du machst"
        }
      ],
      "target_answer": "du stehst, er zeigt, du küsst, wir küssen, wir stehen, du machst",
      "meaning": "you stand, he shows, you kiss, we kiss, we stand, you make",
      "explanation": "The person lives in the ending: du takes the Shakespearean -st, er the archaic -t, wir the full dictionary -en — stehen, zeigen and küssen just wear them."
    },
    {
      "id": "l9_e3",
      "type": "shift_select",
      "prompt": "In 'Wir spazieren und wir fotografieren', why do both verbs end in -en?",
      "options": [
        "Because wir takes the dictionary -en — the full ending returns for we",
        "Because both verbs are questions",
        "Because they are Latin loans and keep their own rules",
        "Because -en marks the past tense"
      ],
      "target_answer": "Because wir takes the dictionary -en — the full ending returns for we",
      "meaning": "the wir-form is the dictionary form at work",
      "explanation": "Strip nothing: with wir the verb IS its dictionary self — spazieren, fotografieren, lernen, kommen. The ending you add for ich is the only one that ever shrinks."
    },
    {
      "id": "l9_e4",
      "type": "derive",
      "prompt": "The shop mirror: 'Wir wollen es _____' (to try on — complete the bracket infinitive):",
      "english_hint": "an + probieren — inside the bracket the separable verb stays whole",
      "target_answer": "anprobieren",
      "meaning": "Wir wollen es anprobieren = we want to try it on",
      "explanation": "The modal bracket from topic 2 keeps the separable verb whole: anprobieren closes it, prefix and all — and anprobieren is 'probe' wearing its Latin papers."
    },
    {
      "id": "l9_e5",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you're describing your household's morning split: you make the coffee and we drink the tea",
      "cues": [
        "Endings do the work: du machst (thou makest), wir trinken (we drinken)",
        "und joins two full clauses — each verb holds its own position 2"
      ],
      "target_answer": "Du machst Kaffee und wir trinken Tee",
      "meaning": "You make coffee and we drink tea",
      "vocab_hints": [
        {
          "word": "machst",
          "translation": "make (du form)",
          "note": "mach + st (thou makest)"
        },
        {
          "word": "trinken",
          "translation": "drink (wir form)",
          "note": "trink + en (we drinken)"
        }
      ],
      "word_bank": [
        "wir",
        "und",
        "Tee",
        "trinken",
        "Kaffee",
        "Du",
        "machst",
        "trinkst"
      ],
      "explanation": "Subject + conjugated verb, twice over: the endings carry the persons across both clauses.",
      "diagnosis": {
        "slip": "the thou-ending dropped off",
        "cue": "du keeps the Shakespearean -st: du machst (thou makest), du trinkst (thou drinkest). English only dropped it in the 1600s — German never did."
      }
    }
  ],
  "summary": {
    "outcome": "Conjugate a regular present-tense verb for ich, du, er/sie/es, and wir.",
    "use_example": {
      "german": "Du machst Kaffee und wir trinken Tee.",
      "english": "You make coffee and we drink tea."
    },
    "takeaway": "German present tense endings directly preserve the ancestral English system: ich -e, du -st, er -t, wir -en.",
    "curiosity_teaser": "Next: the stem hunters — strip -en at speed and rebuild every person of a verb from its stem."
  },
  "twist": {
    "prompt": "The camera changes hands: ich fotografiere → we photograph. Put it in German.",
    "target_answer": "Wir fotografieren",
    "word_bank": [
      "Wir",
      "du",
      "fotografiere",
      "fotografieren"
    ],
    "explanation": "ich -e → wir -en: the -ieren stamp never moves, only the personal ending does — fotografieren is a Latin loan taking German endings like any native verb."
  }
};

export default lesson;
