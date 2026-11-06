import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 402,
  "slug": "negating-the-pronoun",
  "title": "Negating the Pronoun",
  "subtitle": "Placing no right before the walking pronoun: no lo quiero, no la quiero",
  "phase": 1,
  "shift_categories": [
    "ar_engine"
  ],
  "word_ids": [
    "no",
    "lo",
    "la",
    "confirmar",
    "organizar",
    "comprender",
    "ver",
    "comprar",
    "querer"
  ],
  "table_word_ids": [
    "no",
    "lo",
    "la",
    "confirmar",
    "organizar",
    "comprender",
    "ver",
    "comprar",
    "querer"
  ],
  "hook": {
    "title": "The Shield in Front of the Pronoun",
    "content": "When an object pronoun walks in front of the verb (lo quiero, la comprendo), where does no go? It steps in front of the whole pronoun+verb unit: No lo quiero ('I don't want it'), No lo comprendo ('I don't understand it')."
  },
  "pattern": {
    "title": "Two Ways to Negate with an Infinitive",
    "content": "When an infinitive is present, the pronoun can either hook onto the tail of the infinitive (No quiero confirmarlo) OR walk to the front before quiero (No lo quiero confirmar) — and in both cases, no stands at the very front!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I don't want it (masculine)",
          "german": "no lo quiero"
        },
        {
          "id": "p2",
          "english": "I don't want it (feminine)",
          "german": "no la quiero"
        },
        {
          "id": "p3",
          "english": "I don't understand it",
          "german": "no lo comprendo"
        },
        {
          "id": "p4",
          "english": "to buy",
          "german": "comprar"
        },
        {
          "id": "p5",
          "english": "to see",
          "german": "ver"
        }
      ],
      "target_answer": "no lo quiero, no la quiero, no lo comprendo, comprar, ver",
      "meaning": "I don't want it (masculine), I don't want it (feminine), I don't understand it, to buy, to see",
      "explanation": "no always leads the entire pronoun + verb block.",
      "id": "es402_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Hook 'lo' ('it') onto the tail of 'comprar' ('to buy') to form 'to buy it':",
      "tile_options": [
        "no",
        "lo",
        "el",
        "comprar"
      ],
      "target_answer": "comprarlo",
      "meaning": "comprarlo (to buy it)",
      "explanation": "comprar + lo welds into one word: comprarlo.",
      "id": "es402_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I don't want it (feminine)'",
      "target_answer": "No la quiero",
      "meaning": "I don't want it (feminine)",
      "word_bank": [
        "el",
        "la",
        "quiero",
        "No",
        "confirmar",
        "lo"
      ],
      "explanation": "No + la + quiero.",
      "id": "es402_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say you don't want it (referring to the masculine coffee)",
      "cues": [
        "no goes first: No",
        "masculine 'it' walks before quiero: lo quiero"
      ],
      "idea_parts": [
        "not → No",
        "it → lo",
        "I want → quiero"
      ],
      "target_answer": "No lo quiero",
      "meaning": "I don't want it",
      "word_bank": [
        "el",
        "No",
        "la",
        "lo",
        "comprender",
        "quiero"
      ],
      "explanation": "No lo quiero — no shields the front of the lo quiero block.",
      "id": "es402_e4"
    },
    {
      "type": "literal_gloss",
      "prompt": "Which English word-for-word blueprint mirrors Spanish 'No la quiero'?",
      "german": "No la quiero",
      "natural": "I don't want it (feminine)",
      "options": [
        "I don't want her to",
        "I don't want it (feminine)",
        "It not I want",
        "Not it (feminine) I-want"
      ],
      "target_answer": "Not it (feminine) I-want",
      "meaning": "I don't want it (feminine) (literal Spanish blueprint: Not it (feminine) I-want)",
      "explanation": "No stands before la, which stands before quiero.",
      "id": "es402_e5"
    }
  ],
  "summary": {
    "outcome": "Position 'no' before walking object pronouns and negated infinitives.",
    "use_example": {
      "german": "No la quiero — no quiero comprarla hoy.",
      "english": "I don't want it — I don't want to buy it today."
    },
    "takeaway": "Pronoun and conjugated verb form an inseparable block — no stands guard in front of both.",
    "curiosity_teaser": "Up next ([5] Ser & Estar: The Two Beings): discover why Spanish sees 'to be' through two different lenses."
  },
  "twist": {
    "prompt": "Assemble: 'I don't want to confirm it'",
    "target_answer": "No quiero confirmarlo",
    "word_bank": [
      "comprar",
      "la",
      "confirmarlo",
      "quiero",
      "lo",
      "No"
    ],
    "explanation": "With the infinitive, lo hooks onto the tail: No quiero confirmarlo."
  }
};

export default lesson;
