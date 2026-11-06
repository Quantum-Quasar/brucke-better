import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2,
  "slug": "modals-and-inversion",
  "title": "Modal Auxiliaries & The Bracket",
  "subtitle": "Unlocking fluent sentences with 'can', 'must', and 'want'",
  "phase": 1,
  "shift_categories": [
    "t_to_s_ss_z"
  ],
  "word_ids": [
    "können",
    "müssen",
    "wollen",
    "haben",
    "sein"
  ],
  "table_word_ids": [
    "können",
    "müssen",
    "wollen",
    "haben",
    "sein",
    "senden",
    "wolf",
    "eis",
    "zoll",
    "europa",
    "zahlen",
    "rindfleisch",
    "gegen",
    "esszimmer",
    "hitze",
    "zweig",
    "haselnuss"
  ],
  "hook": {
    "title": "The Lazy Speaker's Secret Weapon",
    "content": "Conjugating dozens of German verbs can feel intimidating. Modal auxiliary verbs are your shortcut: conjugate just ONE modal verb in Position 2, and the rest of your thought travels to the end as an uninflected, easy infinitive!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Satzklammer Principle",
        "content": "The sentence bracket (Satzklammer) frames your sentence between the conjugated auxiliary verb and the final bare infinitive."
      }
    ]
  },
  "pattern": {
    "title": "The Modals: können, müssen, wollen",
    "content": "German 'ich will' = I want (not future 'I will'!). In ancient English and German, 'will' always meant desire or intent. English still uses this original meaning in living phrases like 'free will', 'will to live', 'against my will', and 'willingly' (related to Latin voluntas → voluntary). When you say 'Ich will lernen', you assert your will: 'I desire to learn'! Likewise, 'ich kann' = I can (originally 'to know', living in cunning, uncanny, and beyond my ken), and 'ich muss' = I must. Notice how 'ich will lernen' requires no extra 'zu' (to)!",
    "footnotes": [
      {
        "marker": "2",
        "title": "Free Will & Voluntary",
        "content": "Old English 'willan' meant 'to desire/wish'. English shifted it into a future tense marker, but kept its true desire meaning in 'free will', 'will to live', 'last will and testament', and Latin-borrowed 'voluntary'."
      }
    ],
    "linguist_note": "Why do German modals drop the -t ending in 'er kann', 'er will', 'er muss'? English does the exact same thing! We say 'he can' (never 'he cans!'), 'he will' (never 'he wills!'), and 'he must' (never 'he musts!'). Both languages preserve this unique ancient pattern!"
  },
  "exercises": [
    {
      "id": "l2_e1",
      "type": "shift_select",
      "prompt": "Which modal verb translates to 'I want' (as in 'free will' and 'will to live')?",
      "options": [
        "ich soll",
        "ich will",
        "ich muss",
        "ich kann"
      ],
      "target_answer": "ich will",
      "meaning": "I want / I desire (not future 'will')",
      "vocab_hints": [
        {
          "word": "will",
          "translation": "want / desire",
          "note": "false friend: means 'want', as in 'free will', 'will to live', or 'voluntary'"
        },
        {
          "word": "soll",
          "translation": "shall / supposed to",
          "note": "direct twin of English 'shall' (Shakespeare: 'thou shalt' ↔ German 'du sollst')"
        }
      ],
      "explanation": "German 'ich will' means 'I want/desire'. English keeps this original meaning in 'free will', 'will to live', 'against my will', and 'voluntary'."
    },
    {
      "id": "l2_e2",
      "type": "matching_pairs",
      "prompt": "Match the modal phrases to their English meanings:",
      "matching_pairs": [
        {
          "id": "m1",
          "english": "I can",
          "german": "ich kann"
        },
        {
          "id": "m2",
          "english": "I must",
          "german": "ich muss"
        },
        {
          "id": "m3",
          "english": "I want",
          "german": "ich will"
        },
        {
          "id": "m4",
          "english": "to have",
          "german": "haben"
        }
      ],
      "target_answer": "ich kann, ich muss, ich will, haben",
      "meaning": "I can, I must, I want, to have",
      "explanation": "Modal auxiliaries anchor German sentence frames and simplify communication."
    },
    {
      "id": "l2_e3",
      "type": "literal_gloss",
      "prompt": "Which English is built the German way?",
      "german": "Ich will heute singen.",
      "natural": "I want to sing today.",
      "options": [
        "I want to sing today.",
        "I want today to sing.",
        "I today want to sing."
      ],
      "target_answer": "I want today to sing.",
      "meaning": "I want to sing today",
      "explanation": "The modal holds position 2 and the bare infinitive closes the bracket, so today lands between the two halves of the English verb pair. English used to allow this ('I know not where the shepherds keep'); German never left it."
    },
    {
      "id": "l2_e4d",
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Kann ich morgen kommen",
      "replays": 2,
      "target_answer": "Kann ich morgen kommen",
      "meaning": "Can I come tomorrow",
      "cues": [
        "Verb first for a question, then the subject",
        "morgen sits inside the bracket",
        "The bare infinitive closes it: kommen"
      ],
      "explanation": "The verb flipped to the front for the question and the infinitive stayed parked at the end — Kann ich … kommen is one bracket, not two loosened words.",
      "affirmation": "You heard the flip and the parked infinitive — that is the bracket working in your ear."
    },
    {
      "id": "l2_e5",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you're telling me your plans for visiting: you can come tomorrow",
      "cues": [
        "Who can? → ich kann (can = know-how, as in 'beyond my ken')",
        "When? → morgen, riding inside the bracket",
        "The bare infinitive closes the bracket: kommen goes last"
      ],
      "target_answer": "Ich kann morgen kommen",
      "meaning": "I can come tomorrow",
      "vocab_hints": [
        {
          "word": "morgen",
          "translation": "tomorrow",
          "note": "English 'tomorrow' literally means 'to the morrow' (to the morning!)"
        },
        {
          "word": "kann",
          "translation": "can / am able to",
          "note": "related to 'can' and 'ken' (knowledge)"
        }
      ],
      "idea_parts": [
        "who can? → ich kann (can = know-how)",
        "when? → morgen",
        "what? → kommen, and the bare infinitive closes the bracket"
      ],
      "word_bank": [
        "morgen",
        "kann",
        "Ich",
        "kannst",
        "kommen"
      ],
      "explanation": "The Satzklammer wraps around 'morgen', placing bare infinitive 'kommen' at the caboose.",
      "diagnosis": {
        "slip": "the modal's ending jumped onto the infinitive",
        "cue": "Only the modal conjugates — ich kann stays whole, and kommen stays bare. When two verbs share a sentence, the bracket decides who bends."
      }
    }
  ],
  "summary": {
    "outcome": "Say what you want or can do by placing a bare infinitive at the end.",
    "use_example": {
      "german": "Ich kann morgen kommen.",
      "english": "I can come tomorrow."
    },
    "takeaway": "Use modal + bare infinitive at the end to assemble complex thoughts immediately.",
    "curiosity_teaser": "Next: the will ≠ will drills — separating ich will (free will) from the future, with sollen ↔ shall."
  },
  "twist": {
    "prompt": "Same thought, but tomorrow comes first: I want to learn German tomorrow. (Something still has to hold position 2.)",
    "target_answer": "Morgen will ich Deutsch lernen",
    "word_bank": [
      "lerne",
      "will",
      "lernen",
      "Deutsch",
      "ich",
      "Morgen"
    ],
    "explanation": "Fronting fills position 1, so the verb keeps position 2 and the subject slips in behind it — the bracket never breaks, it just re-grips."
  }
};

export default lesson;
