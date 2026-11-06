import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5152,
  "slug": "abrigo-vestido-colores-clothing",
  "title": "El Abrigo, El Vestido & Los Colores",
  "subtitle": "Describing clothing with llevar ('to wear/carry') and post-nominal color agreement",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "abrigo",
    "vestido",
    "negro",
    "rojo",
    "azul",
    "blanco",
    "verde",
    "nuevo",
    "hermoso",
    "comprar"
  ],
  "table_word_ids": [
    "abrigo",
    "vestido",
    "negro",
    "rojo",
    "azul",
    "blanco",
    "verde",
    "nuevo",
    "hermoso",
    "comprar"
  ],
  "hook": {
    "title": "Why 'To Wear' Is 'To Carry' (Llevar) in Spanish",
    "content": "In Lesson 2002 you met **llevar** ('to carry') in time expressions (*llevo dos años aquí*). In everyday life, **llevar** is also the standard Spanish verb for **'to wear [clothing]'** — because you literally carry your clothes on your body! **Llevo un abrigo negro** ('I am wearing a black coat'), **Ella lleva un vestido rojo** ('She is wearing a red dress')!"
  },
  "pattern": {
    "title": "Color Agreement Review Across Clothing",
    "content": "• Masculine **el abrigo** ('the coat/overcoat'): un abrigo negro, un abrigo azul, un abrigo nuevo.\n• Masculine **el vestido** ('the dress' — cognate with English *vest* and *vestment*!): un vestido rojo, un vestido blanco, un vestido hermoso!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the coat / overcoat",
          "german": "el abrigo"
        },
        {
          "id": "p2",
          "english": "the dress (vest / vestment)",
          "german": "el vestido"
        },
        {
          "id": "p3",
          "english": "a black coat",
          "german": "un abrigo negro"
        },
        {
          "id": "p4",
          "english": "a red dress",
          "german": "un vestido rojo"
        },
        {
          "id": "p5",
          "english": "I wear / I am wearing (lit. I carry)",
          "german": "llevo"
        }
      ],
      "target_answer": "el abrigo, el vestido, un abrigo negro, un vestido rojo, llevo",
      "meaning": "the coat / overcoat, the dress (vest / vestment), a black coat, a red dress, I wear / I am wearing (lit. I carry)",
      "explanation": "llevar means both 'to carry' and 'to wear'; colors follow the clothing noun.",
      "id": "es5152_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish 'el vestido' ('dress / garment') shares its Latin clothing root with which four-letter English word for a sleeveless garment worn under a suit jacket?",
      "target_answer": "vest",
      "meaning": "vest, vestment, and invest ('to clothe your money in something') all come from the root of vestido!",
      "explanation": "Latin vestīre ('to clothe') gave Spanish vestir / el vestido and English vest and vestment.",
      "id": "es5152_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I want to buy a new black coat'?",
      "options": [
        "Quiero comprar un abrigo negro y nuevo",
        "*Quiero comprar un negro abrigo",
        "*Quiero comprar una abriga negra"
      ],
      "target_answer": "Quiero comprar un abrigo negro y nuevo",
      "meaning": "I want to buy a new black coat",
      "explanation": "el abrigo is masculine, and descriptive adjectives follow the noun.",
      "id": "es5152_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'It is a very beautiful red dress'",
      "target_answer": "Es un vestido rojo muy hermoso",
      "meaning": "It is a very beautiful red dress",
      "word_bank": [
        "un",
        "roja",
        "hermoso",
        "Es",
        "muy",
        "vestido",
        "rojo",
        "hermosa",
        "una"
      ],
      "explanation": "el vestido is a masculine noun (-o), so both rojo and hermoso stay masculine!",
      "id": "es5152_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Quiero comprar este abrigo azul",
      "replays": 2,
      "target_answer": "Quiero comprar este abrigo azul",
      "meaning": "I want to buy this blue coat",
      "cues": [
        "I want to buy: Quiero comprar",
        "this (masculine): este",
        "blue coat: abrigo azul"
      ],
      "explanation": "Quiero comprar este abrigo azul.",
      "affirmation": "All 123 lessons of El Puente authored and verified!",
      "id": "es5152_e5"
    }
  ],
  "summary": {
    "outcome": "Describe clothing (el abrigo, el vestido) with post-nominal colors and comprar / llevar.",
    "use_example": {
      "german": "Quiero comprar este abrigo negro y ese vestido rojo.",
      "english": "I want to buy this black coat and that red dress."
    },
    "takeaway": "Notice that el vestido ('the dress') ends in -o and is grammatically masculine: un vestido rojo!",
    "curiosity_teaser": "Congratulations — you have completed every spine topic, cluster sprig, and support branch of El Puente!"
  },
  "twist": {
    "prompt": "Assemble: 'I have a black coat'",
    "target_answer": "Tengo un abrigo negro",
    "word_bank": [
      "un",
      "negro",
      "una",
      "abrigo",
      "la",
      "Tengo",
      "negra"
    ],
    "explanation": "Tengo un abrigo negro."
  }
};

export default lesson;
