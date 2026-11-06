import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 802,
  "slug": "the-no-ge-club",
  "title": "The No-ge- Club",
  "subtitle": "studiert, never gestudiert — how stress polices the participle",
  "phase": 1,
  "shift_categories": [
    "latin_ieren"
  ],
  "word_ids": [
    "studieren",
    "reparieren",
    "funktionieren",
    "organisieren",
    "kopieren",
    "haben",
    "sein",
    "anprobieren",
    "spazieren",
    "fotografieren"
  ],
  "table_word_ids": [
    "studieren",
    "reparieren",
    "funktionieren",
    "organisieren",
    "kopieren",
    "haben",
    "sein",
    "anprobieren",
    "spazieren",
    "fotografieren",
    "danke",
    "golden",
    "schüssel",
    "schon",
    "supermarkt",
    "operieren"
  ],
  "hook": {
    "title": "The Stress Police",
    "content": "German stamps ge- onto almost every past participle: gemacht, gesagt, gekommen. Almost. The -ieren verbs are the club that never pays: studiert, repariert, kopiert — no ge-, ever. The reason is acoustic, not arbitrary: German refuses to put its weak little prefix ge- in front of a syllable that outranks it. Since -ieren verbs stress the suffix (-IE-), the participle simply skips the prefix. You met this club in the -ieren lesson; today you learn its law and spend its earnings.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Other Exempt Members",
        "content": "Verbs starting with an unstressed prefix skip ge- for the same reason: verstanden (understood — ver- is unstressed), besucht (visited). One law everywhere: no unstressed ge- in front of a stronger syllable."
      }
    ]
  },
  "pattern": {
    "title": "The Perfekt Preview: Bracket + Participle",
    "content": "Put haben in position 2 and the participle closes the bracket — the same frame you mastered with modals: Ich habe Deutsch studiert. Wir haben den Computer repariert. Du hast ein Buch kopiert. In the present it just works: Das System funktioniert. In the past, the bracket returns: Das System hat funktioniert. Every sentence is your modal bracket wearing a past-tense coat: auxiliary opens, participle closes.",
    "footnotes": [],
    "linguist_note": "This is the first sighting of the Perfekt bracket, the most common spoken past tense in German. The full ge- participle system arrives later — but -ieren verbs are already ready today: studiert, repariert, kopiert, organisiert, funktioniert."
  },
  "exercises": [
    {
      "id": "l802_e1",
      "type": "shift_select",
      "prompt": "Which past participle is correct?",
      "options": [
        "ge studiert",
        "gestudiert",
        "studiert",
        "gestudieren"
      ],
      "target_answer": "studiert",
      "meaning": "studied (no ge-)",
      "explanation": "Suffix stress (-IE-) blocks the unstressed ge-: studiert, never gestudiert."
    },
    {
      "id": "l802_e2",
      "type": "matching_pairs",
      "prompt": "Match each -ieren verb with its ge--free participle — the club's newest members included:",
      "matching_pairs": [
        {
          "id": "ng1",
          "english": "repaired",
          "german": "repariert"
        },
        {
          "id": "ng2",
          "english": "organized",
          "german": "organisiert"
        },
        {
          "id": "ng3",
          "english": "copied",
          "german": "kopiert"
        },
        {
          "id": "ng4",
          "english": "functioned / worked",
          "german": "funktioniert"
        },
        {
          "id": "ng5",
          "english": "tried on",
          "german": "anprobiert"
        },
        {
          "id": "ng6",
          "english": "photographed",
          "german": "fotografiert"
        },
        {
          "id": "ng7",
          "english": "gone for a walk",
          "german": "spaziert"
        }
      ],
      "target_answer": "repariert, organisiert, kopiert, funktioniert, anprobiert, fotografiert, spaziert",
      "meaning": "repaired, organized, copied, worked, tried on, photographed, gone for a walk",
      "explanation": "Drop -en from the infinitive, add -t — no ge- anywhere in the club, even when a separable prefix rides along: anprobiert keeps its an up front."
    },
    {
      "id": "l802_e3",
      "type": "morpheme_tiles",
      "prompt": "Build the participle of 'reparieren' (the No-ge- way):",
      "tile_options": [
        "iert",
        "en",
        "repar",
        "ge",
        "st"
      ],
      "target_answer": "repariert",
      "meaning": "repaired",
      "explanation": "Stem 'repar-' + '-iert': repariert. The ge- tile stays in the box."
    },
    {
      "id": "l802_e4",
      "type": "derive",
      "prompt": "Complete the bracket: 'Ich habe Deutsch _____' (to study, past participle):",
      "english_hint": "the participle closes the bracket",
      "target_answer": "studiert",
      "meaning": "Ich habe Deutsch studiert = I have studied German",
      "explanation": "haben opens in position 2, the ge--free participle closes at the end."
    },
    {
      "id": "l802_e5",
      "type": "transcribe",
      "prompt": "Say in German: \"I have repaired the computer\"",
      "target_answer": "Ich habe den Computer repariert",
      "meaning": "I have repaired the computer",
      "vocab_hints": [
        {
          "word": "den",
          "translation": "the (masculine direct object)",
          "note": "der Computer takes den in the accusative — the Him-Case again"
        }
      ],
      "word_bank": [
        "den",
        "habe",
        "oder",
        "Computer",
        "repariert",
        "du",
        "Ich"
      ],
      "explanation": "The Perfekt bracket: 'habe' opens, 'repariert' closes — and the computer stays masculine accusative in between.",
      "idea": "I have repaired the computer",
      "idea_parts": [
        "I have",
        "repaired the computer (verb in position 2)"
      ],
      "cues": [
        "Start with \"Ich\" and anchor \"habe\" in position 2.",
        "Close the frame with \"repariert\"."
      ]
    }
  ],
  "summary": {
    "outcome": "Form ge--free participles of -ieren verbs and build your first Perfekt brackets.",
    "use_example": {
      "german": "Ich habe Deutsch studiert.",
      "english": "I have studied German."
    },
    "takeaway": "Suffix stress exempts -ieren verbs from ge-: studiert, repariert, kopiert — and haben + participle gives you the spoken past for free.",
    "curiosity_teaser": "Next: conjugation roots & the living endings — Shakespeare's thou -st and he -th unlock every German ending."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from The No-ge- Club (I have repaired the computer):",
    "target_answer": "Ich habe den Computer repariert",
    "word_bank": [
      "repariert",
      "habe",
      "Ich",
      "nicht",
      "Computer",
      "heute",
      "den"
    ],
    "explanation": "Re-assembling \"Ich habe den Computer repariert\" from scratch locks in the structural pattern of The No-ge- Club without relying on short-term echo."
  }
};

export default lesson;
