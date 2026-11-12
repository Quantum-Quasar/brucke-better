import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5031,
  "slug": "false-friends-preview",
  "title": "Actuellement, Librairie & Co.",
  "subtitle": "The trap deck in the wild: same word, different soul",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "trap_actuellement",
    "trap_librairie",
    "trap_attendre",
    "trap_demander",
    "trap_blesser",
    "trap_éventuellement",
    "venir",
    "habiter"
  ],
  "table_word_ids": [
    "trap_actuellement",
    "trap_librairie",
    "trap_attendre",
    "trap_demander",
    "trap_blesser",
    "trap_éventuellement",
    "venir",
    "habiter"
  ],
  "hook": {
    "title": "The Words That Lie to Your Face",
    "content": "The conversion bridge makes French feel safe — and then actuellement wounds you. It means 'currently', not 'actually'. Librairie is a bookshop, not a library. Attendre is to wait, not to attend. These are the bridge's tollbooths: words that look converted but drifted in meaning while the spelling stayed loyal.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why the drift",
        "content": "The two languages borrowed the same Latin words and then each lived its own life. Actuellement went with 'the present moment' (actuel); actually went with 'in act, in fact'. Same cradle, different careers.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Trust the Meaning, Not the Spelling",
    "content": "The rule of thumb: spelling converts reliably, meaning converts mostly. For the high-frequency liars, the fix is exposure — see each one in a real French sentence until the French meaning is the reflex. The full deck lives in the Review Hub, always playable.",
    "trap_note": "The worst offender for English speakers: demander. It's the everyday 'to ask' — je vais demander mon chemin. Nobody is demanding anything."
  },
  "exercises": [
    {
      "id": "fr5031_e1",
      "type": "matching_pairs",
      "prompt": "Match each French word with its REAL meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "currently, at present",
          "german": "actuellement"
        },
        {
          "id": "p2",
          "english": "bookshop",
          "german": "la librairie"
        },
        {
          "id": "p3",
          "english": "to wait for",
          "german": "attendre"
        },
        {
          "id": "p4",
          "english": "to ask",
          "german": "demander"
        },
        {
          "id": "p5",
          "english": "to wound, injure",
          "german": "blesser"
        },
        {
          "id": "p6",
          "english": "possibly",
          "german": "éventuellement"
        }
      ],
      "target_answer": "actuellement, la librairie, attendre, demander, blesser, éventuellement",
      "meaning": "the real meanings, not the English mirrors",
      "explanation": "Six tollbooths on the bridge — each one is a word that kept its spelling and changed its soul."
    },
    {
      "id": "fr5031_e2",
      "type": "shift_select",
      "prompt": "'I work in a bookshop' — the correct word:",
      "options": [
        "la library",
        "la librairie",
        "la bibliothèque"
      ],
      "target_answer": "la librairie",
      "meaning": "bookshop — you work there, books are sold",
      "explanation": "librairie sells; bibliothèque lends. The English 'library' is bibliothèque's job."
    },
    {
      "id": "fr5031_e3",
      "type": "variant_english",
      "prompt": "Which English sentences express the true meaning of 'J'attends le train'?",
      "german": "J'attends le train",
      "meaning": "I am waiting for the train",
      "renderings": [
        "I'm waiting for the train",
        "I wait for the train"
      ],
      "traps": [
        "I am attending the train",
        "I am assisting the train"
      ],
      "target_answer": "I'm waiting for the train",
      "explanation": "attendre means 'to wait for' (with the 'for' built right into the verb). It never means 'to attend'!"
    },
    {
      "id": "fr5031_e4",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you might possibly come, no promises (use éventuellement)",
      "cues": [
        "éventuellement = possibly, not eventually",
        "the simple future rides in one word: je viendrai — but for now: je viens éventuellement",
        "keep it simple: Je viens éventuellement"
      ],
      "target_answer": "Je viens éventuellement",
      "meaning": "I might possibly come",
      "word_bank": [
        "viens",
        "la",
        "Je",
        "finalement",
        "éventuellement"
      ],
      "idea_parts": [
        "who? → je",
        "the verb → viens (come)",
        "the hedge → éventuellement"
      ],
      "explanation": "The hedge word is the lesson: éventuellement opens a possibility; finalement closes a story.",
      "diagnosis": {
        "slip": "the hedge became a timeline",
        "cue": "éventuellement = possibly. 'Eventually' (at last, in the end) is finalement. Same looks, opposite jobs."
      }
    },
    {
      "id": "fr5031_e5",
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "J'habite actuellement à Paris",
      "replays": 2,
      "target_answer": "J'habite actuellement à Paris",
      "meaning": "I currently live in Paris",
      "cues": [
        "j'habite — the habitat verb (to dwell)",
        "actuellement — time, not truth",
        "à Paris — the ad-preposition"
      ],
      "explanation": "Three traps in a row survived: habiter's h, actuellement's soul, à's accent.",
      "affirmation": "You read actuellement as time — the tollbooth didn't collect."
    }
  ],
  "summary": {
    "outcome": "Defuse six high-frequency false friends: actuellement, librairie, attendre, demander, blesser, éventuellement.",
    "use_example": {
      "german": "Je demande mon chemin à la librairie.",
      "english": "I ask for directions at the bookshop."
    },
    "takeaway": "Spelling converts reliably; meaning converts mostly. The Review Hub keeps the liars in rotation.",
    "curiosity_teaser": "Up next on Le Pont ([5032] False Friends II: The Second Deck): see how Actuellement, Librairie & Co. leads directly into False Friends II: The Second Deck."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I might possibly come\" in French:",
    "target_answer": "Je viens éventuellement",
    "word_bank": [
      "Je",
      "viens",
      "pas",
      "éventuellement",
      "ne"
    ],
    "explanation": "Re-constructing \"Je viens éventuellement\" from the underlying rule cements the pattern of Actuellement, Librairie & Co.."
  }
};

export default lesson;
