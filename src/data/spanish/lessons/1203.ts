import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1203,
  "slug": "pronoun-hook-vs-left-walk",
  "title": "Pronoun Hook vs Left-Walk: lo quiero vs quiero verlo",
  "subtitle": "Why Spanish lets object pronouns either walk left of the conjugated verb (Lo quiero ver) or hook onto the tail of the infinitive (Quiero verlo, Voy a comprarlo)",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "lo",
    "la",
    "ver",
    "comprar",
    "confirmar",
    "preparar",
    "voy",
    "querer",
    "puedo"
  ],
  "table_word_ids": [
    "lo",
    "la",
    "ver",
    "comprar",
    "confirmar",
    "preparar",
    "voy",
    "querer",
    "puedo"
  ],
  "hook": {
    "title": "Two Legal Parking Spots for 'It'",
    "content": "This is one of the most liberating rules in *Complete Spanish*. When you have ONE conjugated verb ('I want it'), the object pronoun has only one spot: right in front of the verb (Lo quiero). But when you have a TWO-VERB chain — like quiero ver ('I want to see'), voy a comprar ('I am going to buy'), or puedo confirmar ('I can confirm') — Spanish gives you a 100% free choice between TWO spots!"
  },
  "pattern": {
    "title": "Option 1: Walk Before the First Verb — Option 2: Hook onto the Infinitive!",
    "content": "Want to say 'I am going to buy it' (referring to el libro)?\n• Spot 1 (Left-Walk): Lo voy a comprar.\n• Spot 2 (Infinitive Hook): Voy a comprarlo.\nBoth are 100% natural, everyday Spanish with zero difference in meaning! The only forbidden spot is in the middle between the two verbs (*Voy a lo comprar is impossible)."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I want to see it (hooked)",
          "german": "quiero verlo"
        },
        {
          "id": "p2",
          "english": "I want to see it (left-walk)",
          "german": "lo quiero ver"
        },
        {
          "id": "p3",
          "english": "I am going to buy it (hooked)",
          "german": "voy a comprarlo"
        },
        {
          "id": "p4",
          "english": "I am going to buy it (left-walk)",
          "german": "lo voy a comprar"
        },
        {
          "id": "p5",
          "english": "I can confirm it (feminine, hooked)",
          "german": "puedo confirmarla"
        }
      ],
      "target_answer": "quiero verlo, lo quiero ver, voy a comprarlo, lo voy a comprar, puedo confirmarla",
      "meaning": "I want to see it (hooked), I want to see it (left-walk), I am going to buy it (hooked), I am going to buy it (left-walk), I can confirm it (feminine, hooked)",
      "explanation": "Before the conjugated verb (two words) or hooked onto the infinitive (one welded word) — never in between!",
      "id": "es1203_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Hook 'la' ('it', feminine) onto the tail of 'preparar' to form 'to prepare it':",
      "tile_options": [
        "a",
        "lo",
        "preparar",
        "la"
      ],
      "target_answer": "prepararla",
      "meaning": "prepararla (to prepare it)",
      "explanation": "preparar + la welds into one word: prepararla.",
      "id": "es1203_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Which of these three ways to say 'I am going to see it' is FORBIDDEN in Spanish?",
      "options": [
        "*Voy a lo ver",
        "Voy a verlo",
        "Lo voy a ver"
      ],
      "target_answer": "*Voy a lo ver",
      "meaning": "Forbidden middle position",
      "explanation": "Unlike French (Je vais le voir), Spanish NEVER puts an object pronoun between the two verbs! Put it at the very front (Lo voy a ver) or welded to the tail (Voy a verlo).",
      "id": "es1203_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble using the Left-Walk position: 'I am going to buy it'",
      "target_answer": "Lo voy a comprar",
      "meaning": "I am going to buy it",
      "word_bank": [
        "voy",
        "Lo",
        "comprar",
        "La",
        "comprarlo",
        "de",
        "a"
      ],
      "explanation": "Lo + voy + a + comprar — pronoun walks in front of the whole verb chain.",
      "id": "es1203_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say 'I am going to see it today' by hooking 'lo' onto the end of 'ver'",
      "cues": [
        "I am going to → Voy a",
        "to see it (ver + lo welded) → verlo",
        "today → hoy"
      ],
      "idea_parts": [
        "I am going to → Voy a",
        "see it → verlo",
        "today → hoy"
      ],
      "target_answer": "Voy a verlo hoy",
      "meaning": "I am going to see it today",
      "word_bank": [
        "verlo",
        "Voy",
        "mañana",
        "la",
        "a",
        "lo",
        "ver",
        "hoy"
      ],
      "explanation": "Voy a verlo hoy — hooking onto the infinitive keeps the thought flowing in English-like order!",
      "diagnosis": {
        "slip": "wrote ver lo as two words",
        "cue": "When placed after an infinitive, the pronoun must attach as one single word: verlo."
      },
      "id": "es1203_e5"
    }
  ],
  "summary": {
    "outcome": "Place object pronouns either before the conjugated verb (Lo voy a ver) or welded onto the infinitive (Voy a verlo).",
    "use_example": {
      "german": "Voy a comprarlo hoy — sí, lo voy a comprar.",
      "english": "I am going to buy it today — yes, I am going to buy it."
    },
    "takeaway": "Front of the train (Lo voy a ver) or hooked to the caboose (Voy a verlo) — never between the cars!",
    "curiosity_teaser": "Up next ([13] por vs para): master Spanish's two words for 'for' with the Arrow and the Scale."
  },
  "twist": {
    "prompt": "Assemble: 'I cannot see it'",
    "target_answer": "No puedo verlo",
    "word_bank": [
      "ver",
      "No",
      "verlo",
      "puedo",
      "voy",
      "la"
    ],
    "explanation": "No puedo verlo (or No lo puedo ver)."
  }
};

export default lesson;
