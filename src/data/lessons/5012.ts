import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5012,
  "slug": "greetings-and-goodbyes-gym",
  "title": "Greetings & Goodbyes Gym",
  "subtitle": "Guten Tag, Hallo, Tschüss, Auf Wiedersehen — dialogue drills with the du/Sie switch",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "tag",
    "morgen",
    "abend",
    "sehen",
    "gut"
  ],
  "table_word_ids": [
    "tag",
    "morgen",
    "sehen",
    "gut",
    "abend",
    "neffe",
    "schwiegermutter",
    "junge",
    "trocken",
    "löwe",
    "kohl",
    "mutig",
    "träne",
    "fischer",
    "garderobe"
  ],
  "hook": {
    "title": "The Social Scripts",
    "content": "Greetings are whole sentences wearing costumes. Guten Tag = 'good day'. Auf Wiedersehen = 'until re-seeing' — a farewell that promises a next time. Tschüss = the sailor's Tschüss, bent from French adieu. Hallo is your own hello, borrowed back. And the dialogue runs on the dative you already own: Wie geht's? — Danke, gut! — Und Ihnen? (formal) / Und dir? (informal). Today you drill the scripts until the switch between formal and informal is automatic — because that switch is the first social test every German conversation gives you.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "Moin, the North's Universal",
        "content": "Northern Germany answers with Moin — morning, day, evening, it works around the clock. Etymologically unrelated to Morgen: it may come from Low German mooi ('nice'). One syllable, zero conjugation, total coverage."
      }
    ]
  },
  "pattern": {
    "title": "The Scripts, Formal and Informal",
    "content": "Formal script: Guten Tag! — Guten Tag! Wie geht es Ihnen? — Danke, gut, und Ihnen? — Auf Wiedersehen! Informal script: Hallo! / Morgen! — Wie geht's? — Danke, gut! Und dir? — Tschüss! / Bis bald! The pieces: Guten Morgen (before noon), Guten Abend (evening), Gute Nacht (bedtime — the ghost-map word!). The verbs: sehen (see — Wiedersehen), gehen (geht in wie geht's). Notice the case: Guten Tag is masculine ACCUSATIVE — 'I wish [you a] good day', the wish-object — and Gute Nacht is feminine: the article reports the gender of the noun.",
    "footnotes": [],
    "linguist_note": "Auf Wiedersehen parses as auf (until/on) + wieder (again) + sehen (see) — and wieder itself hides the Germanic *wiþrō, the same root as English 'with' in its original 'against/return' sense. The goodbye is a small etymology sandwich."
  },
  "exercises": [
    {
      "id": "l5012_e1",
      "type": "matching_pairs",
      "prompt": "Match each greeting with its literal reading:",
      "matching_pairs": [
        {
          "id": "gg1",
          "english": "good day",
          "german": "Guten Tag"
        },
        {
          "id": "gg2",
          "english": "until re-seeing",
          "german": "Auf Wiedersehen"
        },
        {
          "id": "gg3",
          "english": "good evening",
          "german": "Guten Abend"
        },
        {
          "id": "gg4",
          "english": "good night (bedtime)",
          "german": "Gute Nacht"
        }
      ],
      "target_answer": "Guten Tag, Auf Wiedersehen, Guten Abend, Gute Nacht",
      "meaning": "hello, formal goodbye, good evening, good night",
      "explanation": "Guten Tag wishes a good day (masculine accusative); Gute Nacht is feminine — the article reports the noun's gender."
    },
    {
      "id": "l5012_e2",
      "type": "shift_select",
      "prompt": "You are leaving a shop. Which farewell is appropriate (formal)?",
      "options": [
        "Moin, du!",
        "Auf Wiedersehen!",
        "Tschüss!",
        "Bis bald, Alter!"
      ],
      "target_answer": "Auf Wiedersehen!",
      "meaning": "The formal farewell",
      "explanation": "Shops and strangers run the Sie-line: Auf Wiedersehen. Tschüss is for the du-circle."
    },
    {
      "id": "l5012_e3",
      "type": "shift_select",
      "prompt": "Complete the informal exchange: 'Wie geht's? — Danke, gut! _____?'",
      "options": [
        "Und Ihnen?",
        "Und Sie sind?",
        "Und dir?",
        "Und Sie?"
      ],
      "target_answer": "Und dir?",
      "meaning": "And thee? — the informal return",
      "explanation": "The dative return question mirrors the ask: dir after du-address, Ihnen after Sie."
    },
    {
      "id": "l5012_e4",
      "type": "reverse_cognate",
      "prompt": "Which part of 'Auf Wiedersehen' means SEE?",
      "target_answer": "sehen",
      "meaning": "sehen = to see (the Wieder-seen core)",
      "explanation": "Wieder-sehen = re-see: the farewell literally says 'until [we] see [each other] again' — the same logic as French au revoir."
    },
    {
      "id": "l5012_e5",
      "type": "dictation",
      "prompt": "Listen and write the German sentence you hear:",
      "target_answer": "Guten Tag wie geht es Ihnen",
      "meaning": "Good day! How goes it to-you-formal?",
      "word_bank": [
        "geht",
        "es",
        "Tag",
        "früh",
        "Ihnen",
        "Guten",
        "wie",
        "kein"
      ],
      "explanation": "The full formal opener: Guten Tag + the dative question — es geht ES Ihnen (to-you-formal), capital I.",
      "spoken": "Guten Tag wie geht es Ihnen",
      "replays": 3,
      "cues": [
        "Meaning: \"Good day! How goes it to-you-formal?\"",
        "Opens with \"Guten Tag\" and ends with \"Ihnen\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Run both greeting scripts and switch register without hesitation.",
    "use_example": {
      "german": "Guten Tag! Wie geht es Ihnen? — Danke, gut!",
      "english": "Good day! How are you? — Thanks, well!"
    },
    "takeaway": "Greetings are sentences in costume: good-day, until-re-seeing — and the du/Sie switch decides dir vs Ihnen.",
    "curiosity_teaser": "Next: Gift, Rat & Co. — the six highest-value false friends, in the wild."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Greetings & Goodbyes Gym (Good day! How goes it to-you-formal):",
    "target_answer": "Guten Tag wie geht es Ihnen",
    "word_bank": [
      "heute",
      "Ihnen",
      "Tag",
      "es",
      "wie",
      "geht",
      "Guten",
      "nicht"
    ],
    "explanation": "Re-assembling \"Guten Tag wie geht es Ihnen\" from scratch locks in the structural pattern of Greetings & Goodbyes Gym without relying on short-term echo."
  }
};

export default lesson;
