import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 8,
  "slug": "latin-ieren-bridge",
  "title": "The Latin Bridge (-ieren)",
  "subtitle": "Unlock 500+ German verbs instantly with the Romance loan suffix",
  "phase": 1,
  "shift_categories": [
    "latin_ieren"
  ],
  "word_ids": [
    "studieren",
    "organisieren",
    "reparieren",
    "funktionieren",
    "kapieren",
    "akzeptieren",
    "informieren",
    "reservieren",
    "existieren"
  ],
  "table_word_ids": [
    "studieren",
    "organisieren",
    "reparieren",
    "funktionieren",
    "kapieren",
    "akzeptieren",
    "informieren",
    "reservieren",
    "existieren",
    "rock",
    "feuer",
    "gewürz",
    "sanft",
    "wurm",
    "ärgern",
    "schieben"
  ],
  "hook": {
    "title": "The Medieval Aristocratic Cheat Code",
    "content": "During the High Middle Ages, French courtly culture swept across European nobility. German knights and scholars borrowed hundreds of French verbs ending in '-ier'. To assimilate them into German grammar, they welded the native Germanic infinitive ending '-en' onto the French suffix, creating '-ieren' (-ier + -en). Because English borrowed the exact same Latin roots after the Norman Conquest, you instantly understand hundreds of advanced German verbs!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Old French -ier + Germanic -en",
        "content": "Originating in 12th-century Middle High German courtly poetry, this hybrid suffix became the universal German receptor for international loan verbs."
      }
    ]
  },
  "pattern": {
    "title": "The -ieren Formula & The No-'ge-' Secret",
    "content": "Any English intellectual, technical, or Latinate verb ending in -ate, -ize, or -ify maps to a German -ieren verb (-ize and -ify add -is- or -ifiz- before -ieren: organisieren, klassifizieren): study ↔ studieren, repair ↔ reparieren, organize ↔ organisieren, function ↔ funktionieren, grasp ↔ kapieren (from Latin capere), accept ↔ akzeptieren, and reserve ↔ reservieren. Unlike Germanic verbs, verbs in -ieren always stress the suffix (stu-DIE-ren). Because German phonotactics rejects the prefix 'ge-' on verbs without initial root stress, -ieren verbs NEVER take 'ge-' in the past participle: studiert, repariert, funktioniert!",
    "footnotes": [
      {
        "marker": "2",
        "title": "Stress and Participle Rules",
        "content": "Suffix stress (/iːʁən/) prohibits unaccented 'ge-' in the Perfekt participle (studiert, NOT gestudiert)."
      }
    ]
  },
  "exercises": [
    {
      "id": "l8_e1",
      "type": "morpheme_tiles",
      "prompt": "Assemble the German verb for 'to organize' (Latin root + romance infinitive):",
      "tile_options": [
        "stud",
        "ieren",
        "organis",
        "reparier",
        "en"
      ],
      "target_answer": "organisieren",
      "meaning": "to organize",
      "shift_hint": "Romance Bridge (-ieren)",
      "explanation": "Stem 'organis-' + loan verb suffix '-ieren' = organisieren."
    },
    {
      "id": "l8_e2",
      "type": "matching_pairs",
      "prompt": "Match the English Latinate verbs with their German -ieren counterparts. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "ir1",
          "english": "to study",
          "german": "studieren"
        },
        {
          "id": "ir2",
          "english": "to repair",
          "german": "reparieren"
        },
        {
          "id": "ir3",
          "english": "to function / work",
          "german": "funktionieren"
        },
        {
          "id": "ir4",
          "english": "to grasp / understand",
          "german": "kapieren"
        },
        {
          "id": "ir5",
          "english": "to accept",
          "german": "akzeptieren"
        },
        {
          "id": "ir6",
          "english": "to inform",
          "german": "informieren"
        },
        {
          "id": "ir7",
          "english": "to exist",
          "german": "existieren"
        },
        {
          "id": "recall1",
          "german": "Der Tod kommt",
          "english": "Death comes"
        },
        {
          "id": "recall1b",
          "german": "ein Traum",
          "english": "a dream"
        }
      ],
      "target_answer": "studieren, reparieren, funktionieren, kapieren, akzeptieren, informieren, existieren, Der Tod kommt, ein Traum",
      "meaning": "to study; to repair; to function / work; to grasp / understand; to accept; to inform; to exist; Death comes; a dream",
      "shift_hint": "-ate / -ize / -ish → -ieren",
      "explanation": "French/Latin verbs entered English directly and entered German through the -ieren suffix — accept, inform and exist included."
    },
    {
      "id": "l8_e3",
      "type": "shift_select",
      "prompt": "Which pair needs a different memory aid from its three neighbours?",
      "options": [
        "make → machen",
        "cook → kochen",
        "milk → Milch",
        "cold → kalt"
      ],
      "target_answer": "cold → kalt",
      "meaning": "Recognize a familiar German word by choosing between earlier connection patterns.",
      "explanation": "Make, cook and milk use K → CH. Cold → kalt uses D → T at the end."
    },
    {
      "id": "l8_e4",
      "type": "derive",
      "prompt": "Apply the -ieren rule: English 'to repair' → German verb:",
      "english_hint": "repair → repar·ieren",
      "shift_hint": "Latinate Bridge",
      "target_answer": "reparieren",
      "meaning": "to repair",
      "explanation": "Latin reparare + German -ieren suffix = reparieren."
    },
    {
      "id": "l8_e5",
      "type": "transcribe",
      "prompt": "Put into German:",
      "idea": "you're annoyed at the café: the computer doesn't work",
      "cues": [
        "Der Computer is the subject; the -ieren verb takes position 2, conjugated: funktioniert (-ier stem + the er/sie/es -t)",
        "Negation lands at the end: nicht — the no-thing word (not ↔ nicht: gh became ch)"
      ],
      "target_answer": "Der Computer funktioniert nicht",
      "meaning": "The computer does not work",
      "vocab_hints": [
        {
          "word": "Computer",
          "translation": "computer",
          "note": "masculine noun: der Computer"
        },
        {
          "word": "funktioniert",
          "translation": "functions / works",
          "note": "Latinate verb stem funktion- + 3rd person -t"
        },
        {
          "word": "nicht",
          "translation": "not",
          "note": "gh → ch shift: nought/not ↔ nicht"
        }
      ],
      "word_bank": [
        "nicht",
        "Computer",
        "Der",
        "funktionieren",
        "funktioniert"
      ],
      "explanation": "Subject, conjugated -ieren verb in position 2, nicht at the end — the Romance stamp never changes, only the personal ending does.",
      "diagnosis": {
        "slip": "the -ieren verb stayed in dictionary clothes",
        "cue": "Position 2 needs the conjugated form: funktioniert (-ier + the er/sie/es -t). The stamp -ieren is for the dictionary, not the sentence."
      }
    }
  ],
  "summary": {
    "outcome": "Recognize common German verbs ending in -ieren and use one in a simple statement.",
    "use_example": {
      "german": "Der Computer funktioniert nicht.",
      "english": "The computer does not work."
    },
    "takeaway": "Romance loan verbs systematically end in '-ieren', carry suffix stress, and drop 'ge-' in the past participle.",
    "curiosity_teaser": "Next: the -ieren verb builder — copy becomes kopieren, produce becomes produzieren: one stamp, five hundred verbs."
  },
  "twist": {
    "prompt": "Turn the -ieren verb on yourself: he studies → I study. What happens to the ending? (Careful — ich keeps an -e.)",
    "target_answer": "Ich studiere Deutsch",
    "word_bank": [
      "Deutsch",
      "studiert",
      "Ich",
      "studiere"
    ],
    "explanation": "funktioniert was the er-form (-t); for ich it's studiere (-e). The Romance stamp -ieren never moves — only the personal ending does. And studieren takes its object bare: Ich studiere Deutsch."
  }
};

export default lesson;
