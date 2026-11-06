import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2501,
  "slug": "gusta-vs-gustan",
  "title": "gusta vs gustan",
  "subtitle": "Singular vs plural agreement: me gusta el café / me gusta viajar vs me gustan los libros",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "gustar",
    "gusta",
    "me",
    "te",
    "nos",
    "le",
    "café",
    "libro",
    "ciudad",
    "visitar",
    "comer"
  ],
  "table_word_ids": [
    "gustar",
    "gusta",
    "me",
    "te",
    "nos",
    "le",
    "café",
    "libro",
    "ciudad",
    "visitar",
    "comer"
  ],
  "hook": {
    "title": "What If You Like Doing Actions (Infinitives)? Always Singular 'Gusta'!",
    "content": "Even if you list three infinitive verbs in a row — **Me gusta comer, beber y viajar** ('I like eating, drinking, and traveling') — infinitives always count as singular concepts, so you ALWAYS use singular **gusta**! Only a plural noun (los libros, las ciudades, los hoteles) triggers plural **gustan**!"
  },
  "pattern": {
    "title": "Where Does 'Mucho' Go? Right After Gusta!",
    "content": "To say 'I really like coffee / I like coffee a lot', place mucho right after gusta/gustan: Me gusta mucho el café ('The coffee pleases me a lot')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I like the city (singular noun)",
          "german": "me gusta la ciudad"
        },
        {
          "id": "p2",
          "english": "I like the cities (plural noun)",
          "german": "me gustan las ciudades"
        },
        {
          "id": "p3",
          "english": "I like to visit / visiting (infinitive)",
          "german": "me gusta visitar"
        },
        {
          "id": "p4",
          "english": "I like coffee a lot",
          "german": "me gusta mucho el café"
        },
        {
          "id": "p5",
          "english": "do you like books? (plural noun)",
          "german": "¿te gustan los libros?"
        }
      ],
      "target_answer": "me gusta la ciudad, me gustan las ciudades, me gusta visitar, me gusta mucho el café, ¿te gustan los libros?",
      "meaning": "I like the city (singular noun), I like the cities (plural noun), I like to visit / visiting (infinitive), I like coffee a lot, do you like books? (plural noun)",
      "explanation": "Singular noun or any infinitive = gusta; plural noun = gustan.",
      "id": "es2501_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Complete: 'Me ___ visitar las ciudades hermosas.' (Look carefully at what immediately follows: the infinitive visitar!)",
      "options": [
        "gustan",
        "gusto",
        "gusta"
      ],
      "target_answer": "gusta",
      "meaning": "I like visiting beautiful cities",
      "explanation": "Because the thing that pleases you is the action of visiting (visitar, an infinitive), the verb is singular: Me gusta visitar las ciudades!",
      "id": "es2501_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I like the cities'",
      "target_answer": "Me gustan las ciudades",
      "meaning": "I like the cities",
      "word_bank": [
        "Me",
        "Yo",
        "gustan",
        "los",
        "gusta",
        "ciudades",
        "las"
      ],
      "explanation": "las ciudades is plural, so gusta adds -n: Me gustan las ciudades.",
      "id": "es2501_e3"
    },
    {
      "id": "es2501_e4",
      "type": "pronoun_compression",
      "prompt": "Fold both noun phrases and apply the Spanish le → se sound law:",
      "shift_hint": "le + lo → se lo",
      "full_sentence": "Doy el libro a mi amigo",
      "compressed_parts": [
        {
          "noun": "a mi amigo",
          "pronoun": "se",
          "role": "indirect receiver (le → se)"
        },
        {
          "noun": "el libro",
          "pronoun": "lo",
          "role": "direct object"
        }
      ],
      "word_bank": [
        "amigo",
        "la",
        "le",
        "doy",
        "lo",
        "Se"
      ],
      "target_answer": "Se lo doy",
      "meaning": "I give it to him",
      "explanation": "When le meets lo/la, Latin illi illum evolved into Spanish se lo to avoid the tongue-twister *le lo: Se lo doy."
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Me gusta mucho esta ciudad",
      "replays": 2,
      "target_answer": "Me gusta mucho esta ciudad",
      "meaning": "I like this city very much",
      "cues": [
        "To me pleases: Me gusta",
        "a lot: mucho",
        "this city: esta ciudad"
      ],
      "explanation": "Me gusta mucho esta ciudad.",
      "affirmation": "Singular gusta + mucho mastered!",
      "id": "es2501_e5"
    }
  ],
  "summary": {
    "outcome": "Choose between gusta (singular nouns and all infinitives) and gustan (plural nouns).",
    "use_example": {
      "german": "Me gusta visitar Madrid y me gustan mucho los restaurantes.",
      "english": "I like visiting Madrid and I like the restaurants very much."
    },
    "takeaway": "Infinitives always take singular gusta (Me gusta comer); plural nouns take gustan (Me gustan los libros).",
    "curiosity_teaser": "Up next ([2502] The Gustar Family): unlock encantar ('to love'), interesar ('to interest'), importar ('to matter'), and doler ('to hurt/ache')."
  },
  "twist": {
    "prompt": "Assemble: 'Do you like the books?'",
    "target_answer": "Te gustan los libros",
    "word_bank": [
      "el",
      "los",
      "libros",
      "gusta",
      "libro",
      "gustan",
      "Te"
    ],
    "explanation": "¿Te gustan los libros?"
  }
};

export default lesson;
