import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2902,
  "slug": "wie-gehts-how-goes-it",
  "title": "Wie geht's? — How goes it?",
  "subtitle": "Greetings and small-talk idioms as archaic English survivals",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "sein",
    "gehen",
    "gut",
    "haben",
    "morgen",
    "danken",
    "schlecht",
    "fertig",
    "lustig",
    "hunger",
    "krank",
    "satt",
    "glücklich",
    "leute",
    "himmel",
    "mensch",
    "urlaub",
    "meer"
  ],
  "table_word_ids": [
    "gehen",
    "sein",
    "gut",
    "danken",
    "haben",
    "morgen",
    "schlecht",
    "fertig",
    "lustig",
    "hunger",
    "krank",
    "satt",
    "glücklich",
    "leute",
    "himmel",
    "mensch",
    "urlaub",
    "meer"
  ],
  "hook": {
    "title": "The Frozen Sentences",
    "content": "Germans greet each other in sentences English used to say. Wie geht's? = 'How goes it?' — the question your great-great-grandparents asked. Es geht mir gut = 'It goes to-me well' — the dative experiencer answering. Auf Wiedersehen = 'until re-seeing' — a farewell that refuses to be final (on the phone: Auf Wiederhören, 'until re-hearing'!). Guten Morgen = 'good morning' — word for word. And the small talk runs the same way: Was machst du? = 'What make you?' — no do-support, the archaic flip. German small talk is a museum of Early Modern English where all the exhibits still work.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "Tschüss, the Sailor's Farewell",
        "content": "The informal Tschüss has a wild history: Hanseatic sailors bent French adieu ('to God') into Low German adjüs, which wore down to Tschüss. The casual goodbye carries a thousand years of sea trade and a French blessing inside it."
      }
    ]
  },
  "pattern": {
    "title": "The Small-Talk Shelf",
    "content": "Greeting: Guten Morgen / Guten Tag / Guten Abend — the good-morning formula, word for word. Asking: Wie geht's? / Wie geht es dir? (how goes it TO YOU — the dative dir from topic 20). Answering: Es geht mir gut / schlecht (it goes to-me well/badly) or Danke, gut! Returning: Und dir? (and to-thee?). The dative feeling set joins in: Mir ist kalt (I am cold — to-me), Mir ist langweilig (I am bored — to-me it is boring). The farewell: Tschüss! (casual), Auf Wiedersehen (formal — until re-seeing). Every line is archaic English with German endings.",
    "footnotes": [],
    "linguist_note": "The 's in Wie geht's is a contraction of es: Wie geht es? → Wie geht's? English once made the identical contraction — 'how goes't?' appears in Shakespeare. The apostrophe is the same grammatical event."
  },
  "exercises": [
    {
      "id": "l2902_e1",
      "type": "matching_pairs",
      "prompt": "The small-talk shelf — match each greeting with its literal reading:",
      "matching_pairs": [
        {
          "id": "wg1",
          "english": "How goes it?",
          "german": "Wie geht's?"
        },
        {
          "id": "wg2",
          "english": "It goes to-me well",
          "german": "Es geht mir gut"
        },
        {
          "id": "wg3",
          "english": "Until re-seeing",
          "german": "Auf Wiedersehen"
        },
        {
          "id": "wg4",
          "english": "Good day",
          "german": "Guten Tag"
        },
        {
          "id": "wg5",
          "english": "It goes to-me badly",
          "german": "Es geht mir schlecht"
        },
        {
          "id": "wg6",
          "english": "The people are funny",
          "german": "Die Leute sind lustig"
        }
      ],
      "target_answer": "Wie geht's?, Es geht mir gut, Auf Wiedersehen, Guten Tag, Es geht mir schlecht, Die Leute sind lustig",
      "meaning": "how are you, I'm fine, goodbye, hello",
      "explanation": "Every greeting is an English sentence your language retired — German still runs them daily."
    },
    {
      "id": "l2902_e2",
      "type": "shift_select",
      "prompt": "Why 'Es geht MIR gut' and not 'Es geht mich gut'?",
      "options": [
        "The experiencer takes the dative — it goes well TO ME",
        "No reason — memorize it",
        "mich is a spelling error here",
        "gehen always takes accusative"
      ],
      "target_answer": "The experiencer takes the dative — it goes well TO ME",
      "meaning": "The dative of experience from topic 20",
      "explanation": "Going-well happens TO you: mir. The same case as methinks and mir ist kalt. Bist du fertig? — fertig (ready, journey-fared) asks it with sein."
    },
    {
      "id": "l2902_e3",
      "type": "shift_select",
      "prompt": "On the phone, Germans say 'Auf Wiederhören'. Why hören?",
      "options": [
        "It is a typo",
        "Until re-HEARING — you hear, not see, on the phone",
        "Hören means 'to call'",
        "It is Swiss dialect"
      ],
      "target_answer": "Until re-HEARING — you hear, not see, on the phone",
      "meaning": "Auf Wiederhören — the phone variant",
      "explanation": "The farewell describes the exact sense in play: seeing in person, hearing on the phone. German calques reality."
    },
    {
      "id": "l2902_e4",
      "type": "reverse_cognate",
      "prompt": "Which Shakespearean phrase answers 'Wie geht es dir?' word for word?",
      "target_answer": "how goes it",
      "meaning": "How goes it? ↔ Wie geht es dir?",
      "explanation": "Same question, same verb-first form — plus the dative dir (to-thee) English dropped. The answers fill the feeling fridge: glücklich, krank, satt, Hunger. Und der Himmel? — the small-talk weather report: der Himmel ist grau, aber der Mensch ist glücklich."
    },
    {
      "id": "l2902_e5",
      "type": "syntax_builder",
      "prompt": "Assemble a full small-talk exchange: 'How are you? — Thanks, good! And you?'",
      "target_answer": "Wie geht's Danke gut und dir",
      "meaning": "How goes it? — Thanks, well! And thee?",
      "vocab_hints": [
        {
          "word": "im Urlaub",
          "translation": "on holiday / vacation",
          "note": "im Urlaub — the question small talk always reaches for: Wie war der Urlaub am Meer? How was the holiday at the sea? The Urlaub is the reason you two are talking at all."
        }
      ],
      "word_bank": [
        "Wie",
        "Danke",
        "mit",
        "dir",
        "nicht",
        "geht's",
        "gut",
        "und"
      ],
      "explanation": "The whole dance in six words: the dative question, the dative thanks, the dative return — Und dir? (and to-thee?). Then the follow-up every German small talk turns to: Wie war der Urlaub? — how was the holiday?"
    }
  ],
  "summary": {
    "outcome": "Run a full German small-talk exchange and hear the archaic English inside it.",
    "use_example": {
      "german": "Wie geht's? — Danke, gut! Und dir?",
      "english": "How goes it? — Thanks, well! And thee?"
    },
    "takeaway": "The greetings are frozen English sentences: How goes it, until re-seeing, good day — with the dative doing the pointing.",
    "curiosity_teaser": "Next: Mir ist kalt — the dative feelings: cold, boredom, and sorrow all happen TO you."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Wie geht's? — How goes it? (How goes it? — Thanks, well! And thee):",
    "target_answer": "Wie geht's Danke gut und dir",
    "word_bank": [
      "geht's",
      "Danke",
      "nicht",
      "dir",
      "Wie",
      "heute",
      "gut",
      "und"
    ],
    "explanation": "Re-assembling \"Wie geht's Danke gut und dir\" from scratch locks in the structural pattern of Wie geht's? — How goes it? without relying on short-term echo."
  }
};

export default lesson;
