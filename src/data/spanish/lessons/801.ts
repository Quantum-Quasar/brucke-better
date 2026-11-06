import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 801,
  "slug": "esdrujula-accent-gym",
  "title": "The Esdrújula Accent Gym",
  "subtitle": "mágico, público, básico, económico, clásico — the accent mark tells your voice where to jump",
  "phase": 2,
  "shift_categories": [
    "ico"
  ],
  "word_ids": [
    "mágico",
    "público",
    "básico",
    "económico",
    "clásico",
    "fantástico",
    "música",
    "libro"
  ],
  "table_word_ids": [
    "mágico",
    "público",
    "básico",
    "económico",
    "clásico",
    "fantástico",
    "música",
    "libro"
  ],
  "hook": {
    "title": "Why Spanish Accent Marks Are Your Best Friend",
    "content": "Normally, Spanish words ending in a vowel stress the SECOND-to-last syllable (ca-sa, li-bro, bue-no). Whenever a word breaks that default rhythm by stressing the THIRD-to-last syllable (called esdrújula), Spanish MUST print an accent mark over that vowel so you never have to guess the stress!"
  },
  "pattern": {
    "title": "Gender Agreement on -ico → -ica",
    "content": "Even when -ico switches to feminine -ica (un libro clásico → la música clásica), the stress stays on that exact same third-from-last syllable!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "magical",
          "german": "mágico"
        },
        {
          "id": "p2",
          "english": "public",
          "german": "público"
        },
        {
          "id": "p3",
          "english": "basic",
          "german": "básico"
        },
        {
          "id": "p4",
          "english": "economical / inexpensive",
          "german": "económico"
        },
        {
          "id": "p5",
          "english": "classic",
          "german": "clásico"
        },
        {
          "id": "p6",
          "english": "the music",
          "german": "la música"
        }
      ],
      "target_answer": "mágico, público, básico, económico, clásico, la música",
      "meaning": "magical, public, basic, economical / inexpensive, classic, the music",
      "explanation": "Every one of these words stresses the third syllable from the end.",
      "id": "es801_e1"
    },
    {
      "type": "derive",
      "prompt": "Convert 'economic / economical' into Spanish (masculine singular):",
      "english_hint": "economic → -ico with tilde on ó",
      "target_answer": "económico",
      "meaning": "economic, economical",
      "explanation": "economic → económico.",
      "id": "es801_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Complete with feminine agreement: 'La música es ___.'",
      "options": [
        "fantastica",
        "fantástico",
        "fantástica"
      ],
      "target_answer": "fantástica",
      "meaning": "The music is fantastic",
      "explanation": "la música is feminine, so fantástico becomes fantástica (keeping its tilde!).",
      "id": "es801_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'It is a classic book'",
      "target_answer": "Es un libro clásico",
      "meaning": "It is a classic book",
      "word_bank": [
        "Es",
        "clásico",
        "un",
        "libro",
        "clásica",
        "una",
        "la"
      ],
      "explanation": "Es un libro clásico — noun first, adjective second.",
      "id": "es801_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "El hotel es muy económico",
      "replays": 2,
      "target_answer": "El hotel es muy económico",
      "meaning": "The hotel is very economical / inexpensive",
      "cues": [
        "The hotel: El hotel",
        "is: es",
        "very economical: muy económico"
      ],
      "explanation": "El hotel es muy económico — económico often means 'thrifty / good-value' in everyday Spanish.",
      "affirmation": "Clean esdrújula stress and tilde!",
      "id": "es801_e5"
    }
  ],
  "summary": {
    "outcome": "Pronounce, spell, and inflect -ico/-ica adjectives with their mandatory antepenultimate accent mark.",
    "use_example": {
      "german": "Es un libro clásico y la música es mágica.",
      "english": "It is a classic book and the music is magical."
    },
    "takeaway": "Whenever a Spanish word ends in -ico or -ica, the syllable right before it wears a written accent mark.",
    "curiosity_teaser": "Up next ([802] The -al Invariable Passport): use invariable -al cognates across masculine and feminine nouns."
  },
  "twist": {
    "prompt": "Assemble: 'The tradition is magical'",
    "target_answer": "La tradición es mágica",
    "word_bank": [
      "tradición",
      "El",
      "está",
      "La",
      "mágica",
      "mágico",
      "es"
    ],
    "explanation": "La tradición (feminine) pairs with mágica."
  }
};

export default lesson;
