import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1102,
  "slug": "plural-concord-drills",
  "title": "Plural Concord Drills",
  "subtitle": "los hoteles grandes, las ciudades hermosas — concord across number and gender",
  "phase": 2,
  "shift_categories": [
    "dad"
  ],
  "word_ids": [
    "hotel",
    "ciudad",
    "libro",
    "casa",
    "grande",
    "hermoso",
    "nuevo",
    "importante",
    "son",
    "están"
  ],
  "table_word_ids": [
    "hotel",
    "ciudad",
    "libro",
    "casa",
    "grande",
    "hermoso",
    "nuevo",
    "importante",
    "son",
    "están"
  ],
  "hook": {
    "title": "Every Piece Pluralizes Together",
    "content": "In English, only the noun takes a plural -s: 'the big houses'. In Spanish, the article, the noun, the verb, AND the adjective all pluralize in harmony: Las casas son grandes ('The-pl. houses are-pl. big-pl.')!"
  },
  "pattern": {
    "title": "Vowel + -s vs Consonant + -es",
    "content": "Ends in a vowel? Add -s: la casa hermosa → las casas hermosas.\nEnds in a consonant? Add -es: el hotel → los hoteles, la ciudad → las ciudades!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the big hotels",
          "german": "los hoteles grandes"
        },
        {
          "id": "p2",
          "english": "the beautiful cities",
          "german": "las ciudades hermosas"
        },
        {
          "id": "p3",
          "english": "the new books",
          "german": "los libros nuevos"
        },
        {
          "id": "p4",
          "english": "they are (identity: ser)",
          "german": "son"
        },
        {
          "id": "p5",
          "english": "they are (location/state: estar)",
          "german": "están"
        }
      ],
      "target_answer": "los hoteles grandes, las ciudades hermosas, los libros nuevos, son, están",
      "meaning": "the big hotels, the beautiful cities, the new books, they are (identity: ser), they are (location/state: estar)",
      "explanation": "el → los, la → las; es → son, está → están.",
      "id": "es1102_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Pluralize 'la ciudad' ('the city' → 'the cities') by adding the consonant-stem plural ending:",
      "tile_options": [
        "las",
        "s",
        "es",
        "ciudad"
      ],
      "target_answer": "lasciudades",
      "meaning": "las ciudades (the cities)",
      "explanation": "Because ciudad ends in a consonant (-d), it adds -es in the plural: las ciudades.",
      "id": "es1102_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Choose the correct plural of 'La tradición es importante':",
      "options": [
        "La tradiciones es importante",
        "Las tradiciones son importantes",
        "Los tradiciones son importantes"
      ],
      "target_answer": "Las tradiciones son importantes",
      "meaning": "The traditions are important",
      "explanation": "tradición adds -es (and drops its tilde because stress stays on -cio-): las tradiciones son importantes.",
      "id": "es1102_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'The cities are beautiful'",
      "target_answer": "Las ciudades son hermosas",
      "meaning": "The cities are beautiful",
      "word_bank": [
        "ciudades",
        "hermosas",
        "es",
        "Las",
        "hermosos",
        "Los",
        "son"
      ],
      "explanation": "Las ciudades + son + hermosas.",
      "id": "es1102_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that the hotels are big",
      "cues": [
        "The hotels (masculine plural) → Los hoteles",
        "are (characteristic) → son",
        "big (plural) → grandes"
      ],
      "idea_parts": [
        "subject → Los hoteles",
        "verb → son",
        "adjective → grandes"
      ],
      "target_answer": "Los hoteles son grandes",
      "meaning": "The hotels are big",
      "word_bank": [
        "es",
        "Las",
        "Los",
        "grandes",
        "hoteles",
        "grande",
        "son"
      ],
      "explanation": "Los hoteles son grandes — hotel (+es), son, grandes (+s).",
      "id": "es1102_e5"
    }
  ],
  "summary": {
    "outcome": "Pluralize articles (los/las), nouns (-s/-es), verbs (son/están), and adjectives in full harmony.",
    "use_example": {
      "german": "Las ciudades son hermosas y los hoteles son grandes.",
      "english": "The cities are beautiful and the hotels are big."
    },
    "takeaway": "In Spanish, plurality is a chord played across article, noun, verb, and adjective together.",
    "curiosity_teaser": "Up next ([1103] Diminutives & Augmentatives: -ito, -illo & -ón): discover how Spanish suffixes express affection and build brand-new nouns like bocadillo, pesadilla, and limón!"
  },
  "twist": {
    "prompt": "Assemble: 'Where are the books?'",
    "target_answer": "Dónde están los libros",
    "word_bank": [
      "los",
      "el",
      "están",
      "Dónde",
      "son",
      "libros",
      "está"
    ],
    "explanation": "¿Dónde están los libros? uses plural están for location."
  }
};

export default lesson;
