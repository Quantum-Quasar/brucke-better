import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2,
  "slug": "the-cion-bridge",
  "title": "The -CIÓN Bridge",
  "subtitle": "Hundreds of nouns convert whole: tradición, confirmación — and every one takes la",
  "phase": 1,
  "shift_categories": [
    "cion"
  ],
  "word_ids": [
    "colección",
    "tradición",
    "confirmación",
    "organización",
    "opinión",
    "reservación",
    "la",
    "querer",
    "lo"
  ],
  "table_word_ids": [
    "colección",
    "tradición",
    "confirmación",
    "organización",
    "opinión",
    "reservación",
    "la",
    "querer",
    "lo"
  ],
  "hook": {
    "title": "The Most Generous Bridge in Spanish",
    "content": "Every English noun ending in -tion converts directly into Spanish -ción. Collection becomes colección. Tradition becomes tradición. Confirmation becomes confirmación. And best of all: you never have to guess grammatical gender. Every single -ción and -sión noun is 100% feminine and takes la."
  },
  "pattern": {
    "title": "-CIÓN Guarantees Feminine Gender — and 'La' Means 'It'",
    "content": "Because Latin abstract nouns in -tiō were feminine, every single descendant in Spanish takes la. The acute accent on ó tells your voice to stress the final syllable: tra-di-CIÓN, con-fir-ma-CIÓN. And when you refer back to one of these feminine words as 'it', the walking pronoun is la: La quiero ('I want it').",
    "linguist_note": "Latin -tiōnem evolved to Spanish -ción with palatalization of the dental stop. Stress is always oxytone (aguda).",
    "trap_note": "Learners sometimes wonder if any -ción noun takes el. The answer is zero: every -ción noun in Spanish takes la."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the collection",
          "german": "la colección"
        },
        {
          "id": "p2",
          "english": "the tradition",
          "german": "la tradición"
        },
        {
          "id": "p3",
          "english": "the confirmation",
          "german": "la confirmación"
        },
        {
          "id": "p4",
          "english": "the organization",
          "german": "la organización"
        },
        {
          "id": "p5",
          "english": "the opinion",
          "german": "la opinión"
        },
        {
          "id": "p6",
          "english": "the reservation",
          "german": "la reservación"
        }
      ],
      "target_answer": "la colección, la tradición, la confirmación, la organización, la opinión, la reservación",
      "meaning": "the collection, the tradition, the confirmation, the organization, the opinion, the reservation",
      "explanation": "All take la; all stress the final -ón syllable.",
      "id": "es2_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Convert English 'confirmation' into Spanish by snapping stem and suffix together:",
      "tile_options": [
        "ation",
        "ación",
        "confirm",
        "ición"
      ],
      "target_answer": "confirmación",
      "meaning": "la confirmación (the confirmation)",
      "explanation": "confirm + ación = confirmación, always feminine and accented on ó.",
      "id": "es2_e2"
    },
    {
      "type": "derive",
      "prompt": "Convert with its feminine article: 'the tradition' →",
      "english_hint": "tradition → -ción",
      "target_answer": "la tradición",
      "meaning": "the tradition",
      "explanation": "tradition → la tradición.",
      "id": "es2_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say you want it — where 'it' refers to the feminine confirmation",
      "cues": [
        "since confirmación is feminine, 'it' is la",
        "the pronoun walks left: it I want",
        "I want is quiero"
      ],
      "idea_parts": [
        "feminine it → La",
        "I want → quiero"
      ],
      "target_answer": "La quiero",
      "meaning": "I want it (feminine)",
      "word_bank": [
        "La",
        "Lo",
        "quiero",
        "confirmación",
        "el"
      ],
      "explanation": "La quiero — because la confirmación is feminine, 'it' is la, placed before quiero.",
      "diagnosis": {
        "slip": "used lo instead of la",
        "cue": "Since la confirmación is feminine, its pronoun twin is la: La quiero."
      },
      "id": "es2_e4"
    },
    {
      "type": "literal_gloss",
      "prompt": "Which English word-for-word blueprint mirrors Spanish 'La quiero'?",
      "german": "La quiero",
      "natural": "I want it (the confirmation)",
      "options": [
        "The I want",
        "I want it (the confirmation)",
        "I want her to",
        "It (feminine) I want"
      ],
      "target_answer": "It (feminine) I want",
      "meaning": "I want it (the confirmation) (literal Spanish blueprint: It (feminine) I want)",
      "explanation": "La quiero places the feminine direct object pronoun right before the verb: 'It (fem.) I want'.",
      "id": "es2_e5"
    }
  ],
  "summary": {
    "outcome": "Convert English -tion nouns to Spanish -ción, assign feminine la, and use la as feminine 'it'.",
    "use_example": {
      "german": "Quiero la confirmación — la quiero hoy.",
      "english": "I want the confirmation — I want it today."
    },
    "takeaway": "-ción guarantees feminine gender for over a thousand nouns without memorization.",
    "curiosity_teaser": "Up next ([201] -CIÓN Is Always Feminine): test the 100% feminine rule across six more abstract nouns."
  },
  "twist": {
    "prompt": "Assemble: 'Do you want the tradition?'",
    "target_answer": "Quieres la tradición",
    "word_bank": [
      "Quiero",
      "tradición",
      "lo",
      "el",
      "la",
      "Quieres"
    ],
    "explanation": "¿Quieres la tradición? asks the question with rising vocal melody."
  },
  "foreshadow": {
    "line": "Every one of these -ción nouns hides an active verb waiting to be released. In Topic 3, we unlock the engine that turns nouns into action.",
    "resolvedIn": 3
  },
  "payoff": {
    "ofLesson": 1,
    "text": "In Topic 1, la was waiting for its true partner. Here it is: every single -ción noun is feminine and takes la."
  }
};

export default lesson;
