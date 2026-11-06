import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1403,
  "slug": "zu-infinitive-ladders",
  "title": "zu + Infinitive Ladders",
  "subtitle": "Ich habe vor, Deutsch zu lernen — chaining zu-clauses onto main clauses",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "zu",
    "vor",
    "haben",
    "wollen",
    "versuchen",
    "lernen",
    "wandern",
    "kommen"
  ],
  "table_word_ids": [
    "zu",
    "vor",
    "versuchen",
    "wollen",
    "lernen",
    "haben",
    "wandern",
    "kommen",
    "schneien",
    "cent",
    "willkommen",
    "langsam",
    "sonnenaufgang",
    "ganz",
    "rest",
    "schneemann"
  ],
  "hook": {
    "title": "The zu-Bracket",
    "content": "Modal brackets take bare infinitives (Ich will lernen). But verbs like versuchen (try), vorhaben (plan — literally 'have before'), and vor haben constructions take the OTHER kind: zu + infinitive, slammed together at the end — Ich versuche, Deutsch zu lernen. Notice the rhyme: English 'to learn', German 'zu lernen' — to/zu are the twins from the sibilant shift! The zu-bracket is English's to-infinitive with German endings: glue zu onto the verb, park the whole thing at the sentence end, and the ladder builds itself.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Separable Verbs Wear zu Inside",
        "content": "With separable verbs, zu slots between prefix and stem: aufzuhören (to stop — auf + zu + hören), umzuziehen (to move — um + zu + ziehen). The prefix wins first position even against zu — the flight path from topic 15 still rules."
      }
    ]
  },
  "pattern": {
    "title": "Build the Ladder",
    "content": "Step one — the trigger verbs: versuchen (Ich versuche, ...), vorhaben (Ich habe vor, ... — 'I have it before me, that...'), vergessen? no — vergessen takes bare: Ich vergesse zu kommen (I forget TO come — zu!). Step two — the comma: German writes it — Ich habe vor, Deutsch zu lernen. Step three — the tail: [zu + infinitive] closes the sentence, exactly where the participle and bare infinitive land: one sentence end, three possible cargoes (gelernt, lernen, zu lernen). Step four — chained ladders: Ich versuche, früh aufzustehen, Deutsch zu lernen und mehr zu lesen? — every rung wears its own zu.",
    "footnotes": [],
    "linguist_note": "zu and to are the same Proto-Germanic preposition (*tō) — English split it into to (infinitive) and too/to (preposition's descendants); German split it into zu (preposition + infinitive glue) and the sibilant-shifted zu you met in topic 5. The to-infinitive is a zu-infinitive wearing English clothes."
  },
  "exercises": [
    {
      "id": "l1403_e1",
      "type": "shift_select",
      "prompt": "Which sentence uses the zu-bracket correctly?",
      "options": [
        "Ich versuche, Deutsch lernen",
        "Ich versuche zu Deutsch lernen",
        "Ich versuche, Deutsch zu lernen",
        "Ich versuche Deutsch lernen zu"
      ],
      "target_answer": "Ich versuche, Deutsch zu lernen",
      "meaning": "I am trying to learn German",
      "explanation": "Trigger verb + comma + contents + zu + infinitive at the end: the zu-glue closes the ladder."
    },
    {
      "id": "l1403_e2",
      "type": "shift_select",
      "prompt": "Why 'to learn' and 'zu lernen' feel like twins:",
      "options": [
        "zu is the past of to",
        "Pure coincidence",
        "German borrowed 'to' from English",
        "to and zu are the same ancient preposition (the sibilant shift split them)"
      ],
      "target_answer": "to and zu are the same ancient preposition (the sibilant shift split them)",
      "meaning": "to ↔ zu: one preposition, two jobs",
      "explanation": "Proto-Germanic *tō: English wore it as to, German hardened it to zu (T→Z). The to-infinitive is ancient shared kit."
    },
    {
      "id": "l1403_e3",
      "type": "derive",
      "prompt": "Glue it: 'Ich habe vor, morgen früh _____.' (zu + aufstehen — separable!):",
      "english_hint": "prefix + zu + stem",
      "target_answer": "aufzustehen",
      "meaning": "Ich habe vor, morgen früh aufzustehen = I plan to get up early tomorrow",
      "explanation": "Separable verbs wear zu INSIDE: auf + zu + stehen = aufzustehen. The prefix outranks the glue."
    },
    {
      "id": "l1403_e4",
      "type": "shift_select",
      "prompt": "Which verb takes a BARE infinitive (no zu) like a modal?",
      "options": [
        "Ich will lernen",
        "Ich vergesse zu lernen",
        "Ich habe vor zu lernen",
        "Ich versuche zu lernen"
      ],
      "target_answer": "Ich will lernen",
      "meaning": "Modals take bare infinitives; the zu-verbs take the glue",
      "explanation": "wollen, können, müssen — bare. versuchen, vorhaben, vergessen, beginnen — zu. Two clubs, no overlap."
    },
    {
      "id": "l1403_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'I plan to come tomorrow'",
      "target_answer": "Ich habe vor morgen zu kommen",
      "meaning": "I plan (have-before) to come tomorrow",
      "vocab_hints": [
        {
          "word": "vor",
          "translation": "before (fore-)",
          "note": "vorhaben = 'have before/planned' — vor is the fore- twin"
        }
      ],
      "word_bank": [
        "kommen",
        "mit",
        "vor",
        "morgen",
        "nicht",
        "Ich",
        "habe",
        "zu"
      ],
      "explanation": "Ich habe vor (the split trigger verb!) + contents + zu kommen at the end — the ladder with a two-word opener."
    }
  ],
  "summary": {
    "outcome": "Build zu-infinitive ladders, including separable verbs with internal zu.",
    "use_example": {
      "german": "Ich habe vor, morgen zu kommen.",
      "english": "I plan to come tomorrow."
    },
    "takeaway": "Trigger verb + comma + zu + infinitive at the end — the English to-infinitive with the zu-twin as glue.",
    "curiosity_teaser": "Next: Phrasal Verb Mirrors — fifteen separable verbs matched to the phrasal verbs you own."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from zu + Infinitive Ladders (I plan (have-before) to come tomorrow):",
    "target_answer": "Ich habe vor morgen zu kommen",
    "word_bank": [
      "habe",
      "kommen",
      "vor",
      "heute",
      "zu",
      "nicht",
      "Ich",
      "morgen"
    ],
    "explanation": "Re-assembling \"Ich habe vor morgen zu kommen\" from scratch locks in the structural pattern of zu + Infinitive Ladders without relying on short-term echo."
  }
};

export default lesson;
