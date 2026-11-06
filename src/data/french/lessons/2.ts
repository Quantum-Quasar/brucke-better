import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2,
  "slug": "the-ion-bridge",
  "title": "The -ION Bridge",
  "subtitle": "Thousands of nouns convert whole — and every one is feminine",
  "phase": 1,
  "shift_categories": [
    "ion"
  ],
  "word_ids": [
    "collection",
    "tradition",
    "confirmation",
    "organisation",
    "opinion",
    "réservation",
    "complication",
    "passion",
    "invitation",
    "la"
  ],
  "table_word_ids": [
    "collection",
    "tradition",
    "confirmation",
    "opinion",
    "invitation",
    "organisation",
    "réservation",
    "complication",
    "passion",
    "la"
  ],
  "hook": {
    "title": "One Ending, a Whole Warehouse",
    "content": "Whenever an English word ends in -ion — invitation, opinion, tradition, participation — you can identify it as Latin-dressed. And most Latin English came through French. So the word is probably the same in French: invitation, opinion, tradition. No conversion needed; the ending IS the bridge.",
    "footnotes": [
      {
        "marker": "1",
        "title": "How many?",
        "content": "Thousands: nation, situation, opération, réaction, mission, question… If you can read this sentence, you can already read hundreds of French nouns.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "la — the -ION Nouns Are All Feminine",
    "content": "The cake took le. The -ION nouns take la: la collection, la tradition, la confirmation. And that is a decode rule, not memory: -ION is on the feminine squad, along with -té and -ance (coming in lesson 6). When you refer back to one of them — it — French says la again: je la veux. The article you chose for 'the' is the pronoun you use for 'it'.",
    "footnotes": [
      {
        "marker": "2",
        "title": "The half-said N",
        "content": "In collection, the final N is thought, not said: /kɔlɛksjɔ̃/. Move toward the N, then stop — that 'not arriving' nasalizes the whole vowel. You'll meet this sound everywhere; for now, just don't land on the N.",
        "interest": true
      }
    ],
    "linguist_note": "Latin -tiō → French -tion with the N nasalized. English borrowed the spelling and kept the N audible; French kept the spelling and silenced it — the most polite disagreement in the two languages.",
    "trap_note": "The tempting wrong move: le, because most things you've met so far took le. The -ION squad is feminine — la collection, l'opinion. The ending tells you."
  },
  "exercises": [
    {
      "id": "fr2_e1",
      "type": "morpheme_tiles",
      "prompt": "Assemble the French feminine noun meaning 'viewpoint / belief' (opin + ion):",
      "tile_options": [
        "opin",
        "ation",
        "ment",
        "ion"
      ],
      "target_answer": "opinion",
      "meaning": "opinion",
      "explanation": "opin + ion = opinion. The spelling converts whole; only the sounds move (nasal O, half-said N)."
    },
    {
      "id": "fr2_e2",
      "type": "shift_select",
      "prompt": "'The opinion' — pick the correct rendering:",
      "options": [
        "le opinion",
        "l'opinion",
        "la opinion"
      ],
      "target_answer": "l'opinion",
      "meaning": "the opinion",
      "explanation": "opinion starts with a vowel, so la loses its a: l'opinion. The apostrophe marks the sacrifice."
    },
    {
      "id": "fr2_e3",
      "type": "matching_pairs",
      "prompt": "Convert each English -ION noun to French — all with their article:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the tradition",
          "german": "la tradition"
        },
        {
          "id": "p2",
          "english": "the confirmation",
          "german": "la confirmation"
        },
        {
          "id": "p3",
          "english": "the reservation",
          "german": "la réservation"
        },
        {
          "id": "p4",
          "english": "the organization",
          "german": "l'organisation"
        },
        {
          "id": "p5",
          "english": "the passion",
          "german": "la passion"
        },
        {
          "id": "p6",
          "english": "the complication",
          "german": "la complication"
        }
      ],
      "target_answer": "la tradition, la confirmation, la réservation, l'organisation, la passion, la complication",
      "meaning": "the -ION conversions with articles",
      "explanation": "Every -ION noun takes la — elided to l' before a vowel. One squad, one article, thousands of words."
    },
    {
      "id": "fr2_e5",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I want it — and the it is the confirmation",
      "cues": [
        "The it borrows la confirmation's article → la",
        "Walk it left: I it want",
        "je la veux"
      ],
      "target_answer": "Je la veux",
      "meaning": "I want it (the confirmation)",
      "word_bank": [
        "la",
        "veux",
        "pas",
        "Je",
        "le"
      ],
      "idea_parts": [
        "who? → je",
        "it (la confirmation) → la",
        "position → before veux"
      ],
      "explanation": "je la veux — the same left-walk, now with a feminine it. The article you chose for 'the' is the pronoun for 'it'.",
      "diagnosis": {
        "slip": "the it stayed le",
        "cue": "It wears the noun's article: la confirmation → je la veux. The -ION squad is feminine."
      }
    },
    {
      "id": "fr2_e6",
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "La tradition est importante",
      "replays": 2,
      "target_answer": "La tradition est importante",
      "meaning": "The tradition is important",
      "cues": [
        "The tradition: la tradition",
        "is: est",
        "important — feminine squad agrees: importante"
      ],
      "explanation": "Two -AN nasals in one sentence: tradition, importante. Think the N, don't say it.",
      "affirmation": "Both nasals landed — you thought the N twice and said it zero times."
    }
  ],
  "twist": {
    "prompt": "Ungraded, just to feel it — 'Do you want the invitation?'",
    "target_answer": "Tu veux l'invitation",
    "word_bank": [
      "le",
      "la",
      "Tu",
      "l'invitation",
      "veux"
    ],
    "explanation": "l'invitation — the elision fires again. Notice how the question needed no new machinery: just the voice."
  },
  "payoff": {
    "ofLesson": 1,
    "text": "Remember la, the feminine 'the' left waiting in lesson 1? Here is her payoff: the -ION engine made her the most loaded article in French — thousands of nouns, every one hers."
  },
  "summary": {
    "outcome": "Convert any -ION noun, mark it feminine with la (elided to l'), and refer to it with la after the left-walk.",
    "use_example": {
      "german": "Je veux la confirmation. — Je la veux.",
      "english": "I want the confirmation. — I want it."
    },
    "takeaway": "-ION is a gender decoder: the ending is feminine, the article is la, and 'it' is that same la, walking.",
    "curiosity_teaser": "Up next on Le Pont ([201] L'Elision Gym): see how The -ION Bridge leads directly into L'Elision Gym."
  },
  "foreshadow": {
    "line": "Now that thousands of -ION nouns are in your pocket, what happens when you slice off -ation and bolt on -er?",
    "resolvedIn": 3
  }
};

export default lesson;
