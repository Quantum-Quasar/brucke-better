import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2103,
  "slug": "reading-compounds-in-the-wild",
  "title": "Reading Compounds in the Wild",
  "subtitle": "Split six-word monsters into meaning — Donaudampfschifffahrt territory",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "zug",
    "fahrt",
    "dampf",
    "haus",
    "zeit",
    "wort",
    "kind",
    "flugzeug",
    "briefmarke",
    "fußball",
    "regenbogen",
    "heimweh",
    "geburtstag",
    "feiern"
  ],
  "table_word_ids": [
    "zug",
    "fahrt",
    "dampf",
    "haus",
    "zeit",
    "wort",
    "kind",
    "flugzeug",
    "briefmarke",
    "fußball",
    "regenbogen",
    "heimweh",
    "geburtstag",
    "feiern",
    "vanille"
  ],
  "hook": {
    "title": "The Monster Reading Method",
    "content": "German compound monsters are famous: Donaudampfschifffahrtsgesellschaft ('Danube steam-shipping company'). They terrify because learners read them as units. Read them as RUSSIANS? no — as stacks: split from the RIGHT, one head at a time. Gesellschaft (company) ← Schifffahrt (shipping) ← Dampf (steam) ← Donau (Danube). Each split gives a smaller compound; the RIGHTMOST word is always the head. Six splits and the monster is a sentence fragment: 'the Danube steam-shipping company'. You own every skill: head-word grammar from topic 21, compound reading, and the vocab pieces.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Right-Headed, Always",
        "content": "German compounds are right-headed: the LAST word is the grammatical head (gender, plural) and the semantic core. English compounds too ('school bus driver' — a driver, not a bus!). The right-split rule works because the head is always at the door."
      }
    ]
  },
  "pattern": {
    "title": "Split, Head, Translate",
    "content": "Monster one: Donaudampfschifffahrt → Donau + Dampf + Schifffahrt = 'Danube-steam-shipping' — steam-boats on the Danube. Monster two: Unabhängigkeitserklärung → Unabhängigkeit (independence) + Erklärung (explanation/declaration) = 'declaration of independence' — and Erklärung is YOUR er- factory verb as a noun! Monster three: Zeitverschiebung → Zeit + Verschiebung (shift) = 'time-shift' — jetlag, via the -ung factory. Monster four: Krankenhaus? small now — Krankenhausfiliale? no — try: Handschuhfabrik → glove-factory. The method: right-split, read the head, stack the modifiers, translate bottom-up.",
    "footnotes": [],
    "linguist_note": "The famous longest words are legal texts: Rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz (the beef-labeling law of Mecklenburg, retired 2013). Every link was real grammar — Germans laugh at these too."
  },
  "exercises": [
    {
      "id": "l2103_e1",
      "type": "shift_select",
      "prompt": "Split 'Zeitverschiebung' (jetlag): what is the HEAD word?",
      "options": [
        "die Zeit",
        "die Verschiebung (the shift) — rightmost = head",
        "Both equally",
        "Neither"
      ],
      "target_answer": "die Verschiebung (the shift) — rightmost = head",
      "meaning": "Zeit + Verschiebung = time-shift",
      "explanation": "Right-split: the last word carries gender and meaning-core. die Verschiebung — the -ung factory again! Flugzeug splits the same way: Flug (flight) + Zeug (stuff) — the fly-stuff, neuter by the -zeug law."
    },
    {
      "id": "l2103_e2",
      "type": "shift_select",
      "prompt": "Monster check: 'Donaudampfschifffahrt' — split from the right: what comes FIRST (leftmost)?",
      "options": [
        "Schiff (ship)",
        "Fahrt (journey)",
        "Donau (the Danube river)",
        "Dampf (steam)"
      ],
      "target_answer": "Donau (the Danube river)",
      "meaning": "Donau | Dampf | Schifffahrt",
      "explanation": "Modifiers stack leftward: Danube → steam → shipping. The leftmost piece is the outermost modifier."
    },
    {
      "id": "l2103_e3",
      "type": "shift_select",
      "prompt": "Which monster contains YOUR er- factory noun?",
      "options": [
        "Zeitverschiebung",
        "Handschuhfabrik",
        "Donaudampfschifffahrt",
        "Unabhängigkeitserklärung (declaration of independence)"
      ],
      "target_answer": "Unabhängigkeitserklärung (declaration of independence)",
      "meaning": "Erklärung — erklären as a noun",
      "explanation": "die Erklärung is erklären's -ung... no, its own nominalization — 'the explanation'. The factory you drilled, fossilized into a monster."
    },
    {
      "id": "l2103_e4",
      "type": "reverse_cognate",
      "prompt": "'Donaudampfschifffahrt' — which piece is a shift-family word you drilled (steam)?",
      "target_answer": "dampf",
      "meaning": "Dampf ↔ damp (p → pf)",
      "explanation": "Dampf/damp: the double-shift word from the Double-Shift Detectives — steaming inside the monster. The gallery walls hold more: Fußball, Regenbogen, Heimweh — and die Briefmarke, the stamp: Brief (letter) + Marke (mark), the little mark for the letter."
    },
    {
      "id": "l2103_e5",
      "type": "syntax_builder",
      "prompt": "Assemble a mini-monster: 'The journey with the train is good'",
      "target_answer": "Die Fahrt mit dem Zug ist gut",
      "meaning": "Die Fahrt mit dem Zug ist gut",
      "word_bank": [
        "Die",
        "auf",
        "mit",
        "oder",
        "gut",
        "ist",
        "Fahrt",
        "Zug",
        "dem"
      ],
      "explanation": "Two fahren-family nouns + mit + dative — the simple sentence that monsters are built from. And when the day comes: wir feiern den Geburtstag — the party verb takes the accusative present."
    }
  ],
  "summary": {
    "outcome": "Split wild compound monsters by right-heads and translate bottom-up.",
    "use_example": {
      "german": "Die Fahrt mit dem Zug ist gut.",
      "english": "The journey by train is good."
    },
    "takeaway": "Right-split every monster: the last word is the head, modifiers stack leftward — monsters are just long sentences.",
    "curiosity_teaser": "Next: gender heuristics & suffix clues — decode der/die/das from the word's tail: -ung is feminine, -chen is neuter."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Reading Compounds in the Wild (Die Fahrt mit dem Zug ist gut):",
    "target_answer": "Die Fahrt mit dem Zug ist gut",
    "word_bank": [
      "Zug",
      "nicht",
      "gut",
      "dem",
      "mit",
      "ist",
      "Fahrt",
      "heute",
      "Die"
    ],
    "explanation": "Re-assembling \"Die Fahrt mit dem Zug ist gut\" from scratch locks in the structural pattern of Reading Compounds in the Wild without relying on short-term echo."
  }
};

export default lesson;
