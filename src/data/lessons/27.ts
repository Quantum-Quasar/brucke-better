import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 27,
  "slug": "prepositions-as-physical-metaphors",
  "title": "Prepositions as Physical Metaphors",
  "subtitle": "über↔over, unter↔under, durch↔through — and the case each one drags along",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "über",
    "unter",
    "vor",
    "durch",
    "aus",
    "bei",
    "mit",
    "zu",
    "haus",
    "tisch",
    "ecke",
    "mitte",
    "strand",
    "mitternacht",
    "nichte",
    "legen"
  ],
  "table_word_ids": [
    "über",
    "unter",
    "vor",
    "durch",
    "aus",
    "bei",
    "mit",
    "zu",
    "haus",
    "tisch",
    "ecke",
    "mitte",
    "strand",
    "mitternacht",
    "nichte",
    "legen"
  ],
  "hook": {
    "title": "Space Is Grammar",
    "content": "The prepositions are the most physical words in German — and almost all of them are your own. über ↔ over. unter ↔ under. vor ↔ fore (before). durch ↔ through. aus ↔ out. bei ↔ by. mit ↔ mid (midwife). zu ↔ to. German describes space the way English does — it just refuses to abbreviate the case grammar: motion across a boundary drags the accusative, position drags the dative. über das Haus (over the house — flying across it) versus über dem Haus (above the house — hovering). One preposition, two cases, two physical realities.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Two-Way Prepositions",
        "content": "an, auf, hinter, in, neben, über, unter, vor, zwischen are the Wechselpräpositionen — 'changeable prepositions'. Motion (wohin? where-to?) → accusative; location (wo? where-at?) → dative. The case answers the question you ask about the scene."
      }
    ]
  },
  "pattern": {
    "title": "The Spatial Set and Its Two Cases",
    "content": "The static set (always dative): aus (out of — Ich komme aus Berlin), bei (by/at — bei Berlin), mit (with), nach (after/to), seit (since), von (from), zu (to). The dynamic pair-set (dative location, accusative motion): in dem Haus → im Haus (in the house) vs in das Haus → ins Haus (into the house); über dem Haus (above it) vs über das Haus (over it); unter dem Tisch (under it, lying there) vs unter den Tisch (under it, going there). vor and durch complete the picture: vor dem Haus (in front of it — dative), durch den Park (through it — accusative always, motion by definition).\n\nOne Denglisch ladder, read it the German way first: Das Auto steht vor dem Haus → The car stands before to-the house → The car stands in front of the house. The middle line puts both lessons on the page: vor is before/fore, and dem is the dative 'the' the parked scene demands.",
    "footnotes": [],
    "trap_note": "Your mind will offer: “case is arbitrary and each preposition just takes one.” Half of them take *two*, and the case tells you whether you are sitting still (dative: in dem Haus) or moving (accusative: in das Haus). Where are you, or where are you going? The answer picks the case.",
    "linguist_note": "The contractions are the case system showing its seams: im = in + dem (dative), ins = in + das (accusative), am = an + dem, zum = zu + dem, zur = zu + der. Each contraction tells you the case before the sentence finishes."
  },
  "exercises": [
    {
      "id": "l27_e1",
      "type": "matching_pairs",
      "prompt": "The spatial twins — match each preposition with its English cognate:",
      "matching_pairs": [
        {
          "id": "pm1",
          "english": "over",
          "german": "über"
        },
        {
          "id": "pm2",
          "english": "under",
          "german": "unter"
        },
        {
          "id": "pm3",
          "english": "through",
          "german": "durch"
        },
        {
          "id": "pm4",
          "english": "by / at",
          "german": "bei"
        },
        {
          "id": "pm5",
          "english": "corner (edge's cousin)",
          "german": "die Ecke"
        },
        {
          "id": "pm6",
          "english": "middle (mid)",
          "german": "die Mitte"
        }
      ],
      "target_answer": "über, unter, durch, bei, die Ecke, die Mitte",
      "meaning": "over, under, through, by/at, the corner, the middle",
      "explanation": "The spatial prepositions are almost all twins — the V→B shift (über), the gh→ch pair (durch/through), the exact match (bei/by) — and die Ecke, die Mitte are the nouns that name the spots: an der Ecke, in der Mitte. They build time too: um Mitternacht — at midnight, the gh→ch compound on the clock."
    },
    {
      "id": "l27_e2",
      "type": "shift_select",
      "prompt": "'Die Katze ist _____ dem Tisch.' (The cat is lying under the table — no motion):",
      "options": [
        "ohne",
        "über (dative — location)",
        "unter (dative — location)",
        "durch"
      ],
      "target_answer": "unter (dative — location)",
      "meaning": "Die Katze ist unter dem Tisch",
      "explanation": "wo? (where-at?) → dative: dem. The cat is AT REST under the table — am Strand too (the beach; strand is the shore-word English kept): location, dative. legen lays things somewhere and takes the destination: Ich lege das Buch auf den Tisch — lay's y→g twin, accusative on arrival."
    },
    {
      "id": "l27_e3",
      "type": "transcribe",
      "prompt": "You want to say:",
      "idea": "you're giving directions to a friend: you walk to the house",
      "cues": [
        "zu + dem shrinks to zum — the contraction shows its case: Ich gehe zum Haus"
      ],
      "target_answer": "Ich gehe zum Haus",
      "meaning": "I walk to the house",
      "vocab_hints": [
        {
          "word": "zum",
          "translation": "to the (zu + dem)",
          "note": "zu always takes the dative — the contraction wears it openly"
        }
      ],
      "word_bank": [
        "dem",
        "gehe",
        "zur",
        "Haus",
        "zu",
        "zum",
        "Ich"
      ],
      "explanation": "The contraction is the case system showing its seams: zum = zu + dem (dative). zu never accuses — it always dates. für accuses instead: ein Buch für die Nichte — something for the niece, accusative gift."
    },
    {
      "id": "l27_e4",
      "type": "reverse_cognate",
      "prompt": "What archaic English word (as in 'midwife') is the twin of 'mit'?",
      "target_answer": "mid",
      "meaning": "mit ↔ mid ('with')",
      "explanation": "English retired 'mid' but kept it in midwife — 'with-woman'. German uses mit daily."
    },
    {
      "id": "l27_e5",
      "type": "literal_gloss",
      "prompt": "Which English is built the German way?",
      "german": "Das Auto steht vor dem Haus.",
      "natural": "The car stands in front of the house.",
      "options": [
        "The car stands before to-the house.",
        "The car stands in front of the house.",
        "The car stands in front to-the house."
      ],
      "target_answer": "The car stands before to-the house.",
      "meaning": "The car stands in front of the house.",
      "explanation": "Read it the German way: 'before to-the house.' vor is before/fore, and dem is the dative 'the' that a motion-less scene demands — the case is on the page, where English hides it in word order."
    }
  ],
  "summary": {
    "outcome": "Use the cognate prepositions and pick accusative vs dative by motion.",
    "use_example": {
      "german": "Das Auto steht vor dem Haus.",
      "english": "The car stands in front of the house."
    },
    "takeaway": "The prepositions are your own spatial words — and the case answers the question: wohin? accusative, wo? dative.",
    "curiosity_teaser": "Next: the über, unter, durch metaphor set — spatial drills with the cognate prepositions."
  },
  "twist": {
    "prompt": "Same walk, but today comes first: I walk to the house becomes TODAY I walk to the house. (Something still holds position 2.)",
    "target_answer": "Heute gehe ich zum Haus",
    "word_bank": [
      "gehe",
      "Heute",
      "Haus",
      "ich",
      "geht",
      "zum"
    ],
    "explanation": "Fronting fills position 1, so gehe keeps position 2 and ich slips in behind — the verb-second law that survived thirty topics."
  }
};

export default lesson;
