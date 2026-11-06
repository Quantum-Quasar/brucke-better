import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1202,
  "slug": "the-nicht-position-map",
  "title": "The nicht Position Map",
  "subtitle": "Where nicht lands in bracket sentences, with modals, and in subclauses",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "nicht",
    "können",
    "müssen",
    "wollen",
    "haben",
    "sein",
    "gut",
    "kommen",
    "nie",
    "nichts",
    "niemand",
    "kurz",
    "laut",
    "leise",
    "billig",
    "getränk",
    "tasse"
  ],
  "table_word_ids": [
    "nicht",
    "können",
    "wollen",
    "haben",
    "sein",
    "müssen",
    "gut",
    "kommen",
    "nie",
    "nichts",
    "niemand",
    "kurz",
    "laut",
    "leise",
    "billig",
    "getränk",
    "tasse"
  ],
  "hook": {
    "title": "The No-Thing Has a Seat",
    "content": "nicht is a word with a floor plan. Default seat: the END of a simple clause, where the action dies — Ich weiß es nicht. Second seat: directly BEFORE whatever you negate — Das ist nicht gut (not good), nicht heute (not today), nicht der Mann (not THE man — someone else). With modal brackets: nicht rides inside, right after the content — Ich kann nicht kommen. In subclauses: nicht sits before the verb that waits at the end — ..., weil ich nicht kommen kann. English just drops a 'not' anywhere; German gives nicht a map. Today you learn the map.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Sondern, the Correction Word",
        "content": "When you negate and CORRECT, German uses sondern: Das ist nicht gut, sondern besser — 'not good, but better'. English 'but' does both jobs; German splits them (aber for plain contrast, sondern after a nicht). The no-thing has a partner."
      }
    ]
  },
  "pattern": {
    "title": "The Floor Plan",
    "content": "Zone one — clause end: Ich weiß es nicht. Ich komme morgen nicht. Zone two — before the target: nicht gut (not good), nicht morgen (not tomorrow — some OTHER day), nicht mein Haus (not MY house). Zone three — modal brackets: Ich kann nicht kommen (nicht between content and the closing infinitive... actually right after the modal's content — before the final verb). Zone four — subclauses: ..., dass ich nicht kommen kann — nicht before the basement verbs. Zone five — fixed pairs: nicht mehr (no longer), nicht nur... sondern auch (not only... but also). The rule of thumb: nicht negates what FOLLOWS it; if nothing follows, it negates the verb.",
    "footnotes": [],
    "linguist_note": "The placement is information structure, not grammar: 'Ich komme nicht morgen, sondern heute' negates the TIME; 'Nicht ich komme morgen' negates the SUBJECT. Move nicht, change the denial."
  },
  "exercises": [
    {
      "id": "l1202_e1",
      "type": "shift_select",
      "prompt": "Default seat: 'Ich weiß es _____.' (I do not know it):",
      "options": [
        "nichts",
        "nicht",
        "kein",
        "nichte"
      ],
      "target_answer": "nicht",
      "meaning": "Ich weiß es nicht — the clause-end default",
      "explanation": "Nothing follows to negate, so nicht negates the verb — the default seat at the end. (nichts — 'nothing' — is the noun-shaped cousin: Ich weiß nichts.)"
    },
    {
      "id": "l1202_e2",
      "type": "shift_select",
      "prompt": "Target seat: 'Das ist _____ gut, sondern besser.' (not good, but better):",
      "options": [
        "nichts",
        "kein",
        "nicht",
        "ohne"
      ],
      "target_answer": "nicht",
      "meaning": "Das ist nicht gut — nicht directly before the adjective",
      "explanation": "Adjectives take nicht right before them: nicht kurz, nicht laut, nicht leise, nicht billig. And sondern introduces the correction — besser is better's twin, waiting from the sibilant shift."
    },
    {
      "id": "l1202_e3",
      "type": "shift_select",
      "prompt": "Bracket zone: 'Ich kann _____ kommen.' (I cannot come):",
      "options": [
        "nichts",
        "kein",
        "keine",
        "nicht"
      ],
      "target_answer": "nicht",
      "meaning": "Ich kann nicht kommen",
      "explanation": "Inside the modal bracket, nicht rides before the closing infinitive — negating the coming, not the can. Time has its own negator: nie (never) is the whole-clause no — Ich komme nie."
    },
    {
      "id": "l1202_e4",
      "type": "derive",
      "prompt": "Subclause zone: '..., weil ich nicht _____ kann.' (because I cannot COME):",
      "english_hint": "infinitive for 'to come' at the end of the clause",
      "target_answer": "kommen",
      "meaning": "..., weil ich nicht kommen kann = because I cannot come",
      "explanation": "In the basement, nicht sits before the stacked verbs: nicht kommen kann — two verbs, one exit, nicht first."
    },
    {
      "id": "l1202_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'Nobody comes tomorrow'",
      "target_answer": "Niemand kommt morgen",
      "meaning": "Nobody comes tomorrow",
      "word_bank": [
        "morgen",
        "kommt",
        "Tasse",
        "Getränk",
        "Niemand"
      ],
      "explanation": "Niemand is a subject like any other — it holds position 1, the verb keeps position 2, and the whole sentence negates itself without a single nicht."
    }
  ],
  "summary": {
    "outcome": "Place nicht correctly across simple clauses, brackets, targets, and subclauses.",
    "use_example": {
      "german": "Ich kann heute nicht kommen.",
      "english": "I cannot come today."
    },
    "takeaway": "nicht negates what follows it — end of clause by default, before the target when there is one.",
    "curiosity_teaser": "Next: asking questions — was, wo, wer, wann: the w-words are pure cognates, and German asks with zero do-support."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from The nicht Position Map (Nobody comes tomorrow):",
    "target_answer": "Niemand kommt morgen",
    "word_bank": [
      "heute",
      "nicht",
      "Niemand",
      "morgen",
      "kommt"
    ],
    "explanation": "Re-assembling \"Niemand kommt morgen\" from scratch locks in the structural pattern of The nicht Position Map without relying on short-term echo."
  }
};

export default lesson;
