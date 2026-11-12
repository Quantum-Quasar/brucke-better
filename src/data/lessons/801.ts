import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 801,
  "slug": "ieren-verb-builder",
  "title": "-ieren Verb Builder",
  "subtitle": "-ate, -ize, -ify → -ieren: the factory that turns English verbs into German",
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
    "kopieren",
    "produzieren",
    "korrigieren",
    "reduzieren",
    "aktivieren",
    "argumentieren",
    "existieren",
    "fotografieren"
  ],
  "table_word_ids": [
    "kopieren",
    "produzieren",
    "korrigieren",
    "reduzieren",
    "aktivieren",
    "informieren",
    "studieren",
    "organisieren",
    "reparieren",
    "funktionieren",
    "kapieren",
    "akzeptieren",
    "reservieren",
    "argumentieren",
    "existieren",
    "fotografieren"
  ],
  "hook": {
    "title": "The Verb Factory",
    "content": "English borrowed its intellectual verbs from Latin and French — analyze, organize, copy, produce. German borrowed the exact same loans, then stamped one native suffix on them: -ieren. Because both languages took the same Latin parts, every English -ate/-ize verb you own already exists in German with a German ending. This lesson is the assembly manual: copy → kopieren, produce → produzieren, correct → korrigieren, reduce → reduzieren, activate → aktivieren. You are not learning 500 verbs. You are learning one stamp.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The z You Can Hear",
        "content": "Watch -ize verbs: the z of English -ize becomes German s before -ieren (organize → organisieren, realize → realisieren). And -ify verbs grow a full -ifizieren: identify → identifizieren, verify → verifizieren. The Latin soft c [ts] lives inside both."
      }
    ]
  },
  "pattern": {
    "title": "Three Formulas, Five Hundred Verbs",
    "content": "Formula one — -ate → -ieren: reserve → reservieren, activate → aktivieren, inform → informieren (and argue → argumentieren — the -ate vanished into the stamp). Formula two — -ize → -isieren: organize → organisieren. But watch the -ce words: produce keeps its z — produzieren, reduce → reduzieren. Formula three — -ify → -ifizieren: identify → identifizieren. The one iron rule: stress lands on the -IE- (stu-DIE-ren, ko-PIE-ren) and never moves, no matter how long the verb gets.",
    "footnotes": [],
    "linguist_note": "The stress rule is why -ieren verbs reject ge- (next lesson) and why you can always hear a -ieren verb in fast speech: the long German [iː] of -IE- rings out like a bell in every sentence."
  },
  "exercises": [
    {
      "id": "l801_e1",
      "type": "morpheme_tiles",
      "prompt": "Assemble the German verb for 'to organize' (Latin stem + the stamp):",
      "tile_options": [
        "ieren",
        "organis",
        "stud",
        "en",
        "ge"
      ],
      "target_answer": "organisieren",
      "meaning": "to organize",
      "shift_hint": "-ize → -isieren",
      "explanation": "The -ize becomes -is-: organis- + -ieren = organisieren. No ge- belongs on a -ieren verb."
    },
    {
      "id": "l801_e2",
      "type": "matching_pairs",
      "prompt": "Run the stamp over the Latin loans. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "vb1",
          "english": "to copy",
          "german": "kopieren"
        },
        {
          "id": "vb2",
          "english": "to produce",
          "german": "produzieren"
        },
        {
          "id": "vb3",
          "english": "to correct",
          "german": "korrigieren"
        },
        {
          "id": "vb4",
          "english": "to reduce",
          "german": "reduzieren"
        },
        {
          "id": "vb5",
          "english": "to photograph",
          "german": "fotografieren"
        },
        {
          "id": "vb6",
          "english": "to argue",
          "german": "argumentieren"
        },
        {
          "id": "recall1",
          "german": "Wir können studieren",
          "english": "We can study"
        },
        {
          "id": "recall2",
          "german": "Wir müssen reparieren",
          "english": "We must repair"
        },
        {
          "id": "recall3",
          "german": "Wir können funktionieren",
          "english": "We can function"
        },
        {
          "id": "recall4",
          "german": "Wir müssen kapieren",
          "english": "We must understand"
        },
        {
          "id": "recall5",
          "german": "Wir können akzeptieren",
          "english": "We can accept"
        },
        {
          "id": "recall6",
          "german": "Wir müssen informieren",
          "english": "We must inform"
        }
      ],
      "target_answer": "kopieren, produzieren, korrigieren, reduzieren, fotografieren, argumentieren, Wir können studieren, Wir müssen reparieren, Wir können funktionieren, Wir müssen kapieren, Wir können akzeptieren, Wir müssen informieren",
      "meaning": "to copy; to produce; to correct; to reduce; to photograph; to argue; We can study; We must repair; We can function; We must understand; We can accept; We must inform",
      "shift_hint": "Latin Bridge",
      "explanation": "Same Latin roots, same English words, one German suffix: -ieren — the camera verb included (Foto is German's word for photo)."
    },
    {
      "id": "l801_e3",
      "type": "shift_select",
      "prompt": "Where does the stress land in 'studieren'?",
      "options": [
        "German -ieren verbs have no fixed stress",
        "On the -IE-: stu-DIE-ren",
        "On the last syllable: studie-REN",
        "On the first syllable: STU-dieren"
      ],
      "target_answer": "On the -IE-: stu-DIE-ren",
      "meaning": "Suffix stress is the password of -ieren verbs",
      "explanation": "The stress always lands on -IE- — and that fixed stress is exactly what blocks ge- in the participle."
    },
    {
      "id": "l801_e4",
      "type": "derive",
      "prompt": "Run the stamp: English 'to activate' → German:",
      "english_hint": "activ + the -ieren ending",
      "shift_hint": "-ate → -ieren",
      "target_answer": "aktivieren",
      "meaning": "to activate",
      "explanation": "activate → aktiv- + -ieren = aktivieren. The Latin c turned k on German pages."
    },
    {
      "id": "l801_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'We reserve a table'",
      "target_answer": "Wir reservieren einen Tisch",
      "meaning": "We reserve a table",
      "vocab_hints": [
        {
          "word": "einen",
          "translation": "a (masculine direct object)",
          "note": "Tisch is masculine — the Him-Case adds -en: ein → einen"
        }
      ],
      "word_bank": [
        "reservieren",
        "aus",
        "Wir",
        "gut",
        "einen",
        "Tisch"
      ],
      "explanation": "Verb in position 2 with wir, direct object with the masculine accusative: 'Wir reservieren einen Tisch'."
    }
  ],
  "summary": {
    "outcome": "Derive German -ieren verbs from English -ate/-ize/-ify verbs and stress them correctly.",
    "use_example": {
      "german": "Wir reservieren einen Tisch.",
      "english": "We reserve a table."
    },
    "takeaway": "English -ate/-ize/-ify and German -ieren/-isieren/-ifizieren are one Latin loan wearing two flags — stress stays on -IE-.",
    "curiosity_teaser": "Next: the No-ge- Club — why 'gestudiert' is impossible and 'studiert' is the law."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from -ieren Verb Builder (We reserve a table):",
    "target_answer": "Wir reservieren einen Tisch",
    "word_bank": [
      "nicht",
      "heute",
      "reservieren",
      "Tisch",
      "Wir",
      "einen"
    ],
    "explanation": "Re-assembling \"Wir reservieren einen Tisch\" from scratch locks in the structural pattern of -ieren Verb Builder without relying on short-term echo."
  }
};

export default lesson;
