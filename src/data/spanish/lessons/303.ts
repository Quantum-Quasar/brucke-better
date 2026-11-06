import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 303,
  "slug": "er-and-ir-verb-bridges",
  "title": "The -er & -ir Verb Bridges",
  "subtitle": "comer (edible), beber (beverage), comprender (comprehend), vivir (vivid), decidir — Spanish's other two verb classes",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "comer",
    "beber",
    "comprender",
    "vender",
    "vivir",
    "decidir",
    "abrir",
    "querer"
  ],
  "table_word_ids": [
    "comer",
    "beber",
    "comprender",
    "vender",
    "vivir",
    "decidir",
    "abrir",
    "querer"
  ],
  "hook": {
    "title": "Beyond -ar: The -er and -ir Families",
    "content": "While roughly 80% of Spanish verbs end in -ar, every Spanish verb belongs to one of three infinitive families: -ar, -er, or -ir. And your English Latinate vocabulary unlocks the -er and -ir families too! Look at comprender ('to understand' = comprehend), vender ('to sell' = vendor), decidir ('to decide', from decisión), vivir ('to live' = vivid, survive), beber ('to drink' = beverage, imbibe), comer ('to eat' = edible), and abrir ('to open' = aperture)!",
    "footnotes": [
      {
        "marker": "1",
        "title": "How 'Aperture' Unlocks 'Abrir'",
        "content": "A camera's aperture is the opening that lets light in (from Latin aperīre 'to open'). Rapid spoken Latin shortened aperīre to abrir ('to open')!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "How Present-Tense Endings Echo the Infinitive Vowel",
    "content": "In the 'I' (yo) form, all three regular families end in -o: hablo, como ('I eat'), vivo ('I live'), comprendo ('I understand'), decido ('I decide'). In the 'you' (tú) form, -ar verbs use -as (hablas), while BOTH -er and -ir verbs use -es (comes 'you eat', comprendes 'you understand', vives 'you live', decides 'you decide')!",
    "trap_note": "Don't say *decidar or *comprendar — remember that decidir (-ir) and comprender (-er) belong to the second and third verb families."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "to eat",
          "german": "comer"
        },
        {
          "id": "p2",
          "english": "to drink",
          "german": "beber"
        },
        {
          "id": "p3",
          "english": "to understand (comprehend)",
          "german": "comprender"
        },
        {
          "id": "p4",
          "english": "to sell (vend)",
          "german": "vender"
        },
        {
          "id": "p5",
          "english": "to live (vivid/survive)",
          "german": "vivir"
        },
        {
          "id": "p6",
          "english": "to decide",
          "german": "decidir"
        }
      ],
      "target_answer": "comer, beber, comprender, vender, vivir, decidir",
      "meaning": "to eat, to drink, to understand (comprehend), to sell (vend), to live (vivid/survive), to decide",
      "explanation": "-er and -ir complete the three Spanish infinitive endings (-ar, -er, -ir).",
      "id": "es303_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish beber ('to drink', from Latin bibere) shares its root with which formal English noun for any drink?",
      "target_answer": "beverage",
      "meaning": "a beverage is literally 'that which is drunk'",
      "explanation": "Latin bibere gave Spanish beber, French boire, and English beverage and imbibe.",
      "id": "es303_e2"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Convert the noun 'decisión' into its -ir verb ('to decide'):",
      "tile_options": [
        "sión",
        "ar",
        "ir",
        "decid"
      ],
      "target_answer": "decidir",
      "meaning": "decidir (to decide)",
      "explanation": "decisión → decidir (and yo decido, tú decides).",
      "id": "es303_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I want to eat and drink'",
      "target_answer": "Quiero comer y beber",
      "meaning": "I want to eat and drink",
      "word_bank": [
        "la",
        "beber",
        "el",
        "Quiero",
        "vivir",
        "y",
        "comer"
      ],
      "explanation": "Quiero comer y beber — -er infinitives stack after quiero just like -ar verbs.",
      "id": "es303_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that you understand (1st person singular of comprender)",
      "cues": [
        "strip -er from comprender",
        "add the universal yo ending -o: Comprendo"
      ],
      "idea_parts": [
        "I understand → Comprendo"
      ],
      "target_answer": "Comprendo",
      "meaning": "I understand",
      "word_bank": [
        "Vivo",
        "Quiero",
        "el",
        "Comprender",
        "Comprendo"
      ],
      "explanation": "Comprendo — one word for 'I understand'!",
      "diagnosis": {
        "slip": "left the infinitive comprender",
        "cue": "Drop -er and add -o for 'I': Comprendo."
      },
      "id": "es303_e5"
    }
  ],
  "summary": {
    "outcome": "Decode -er and -ir verbs through English cognates and conjugate yo (-o) and tú (-es) forms.",
    "use_example": {
      "german": "Comprendo el español y quiero vivir en Madrid.",
      "english": "I understand Spanish and I want to live in Madrid."
    },
    "takeaway": "All three verb classes (-ar, -er, -ir) take -o for 'I', while -er and -ir share -es for 'tú'.",
    "curiosity_teaser": "Up next ([4] Negation: The Clean 'No'): refuse any verb or pronoun in Spanish with a single word."
  },
  "twist": {
    "prompt": "Assemble: 'I want to decide'",
    "target_answer": "Quiero decidir",
    "word_bank": [
      "decidir",
      "la",
      "Quiero",
      "el",
      "comprender"
    ],
    "explanation": "Quiero decidir stacks want + -ir infinitive."
  }
};

export default lesson;
