import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 28,
  "slug": "que-and-quien-connective-tissue",
  "title": "que & quien: Connective Tissue",
  "subtitle": "Relative pronouns connecting ideas: la persona que conozco, lo que quiero",
  "phase": 5,
  "shift_categories": [],
  "word_ids": [
    "qué",
    "quién",
    "lo",
    "conocer",
    "querer",
    "comprender",
    "decir",
    "hablar",
    "amigo",
    "libro"
  ],
  "table_word_ids": [
    "qué",
    "quién",
    "lo",
    "conocer",
    "querer",
    "comprender",
    "decir",
    "hablar",
    "amigo",
    "libro"
  ],
  "hook": {
    "title": "Why Unaccented 'Que' Is the Glue of the Spanish Language",
    "content": "In English, you constantly switch between 'who', 'whom', 'which', and 'that' — or drop the connector altogether ('the book [that] I want', 'the friend [whom] I know'). In Spanish, **you may NEVER drop the connector**, and unaccented **que** works for BOTH people and things: el libro **que** quiero ('the book that I want'), el amigo **que** conozco ('the friend whom I know'), la persona **que** habla ('the person who is speaking')!"
  },
  "pattern": {
    "title": "When Do You Use 'Quien' and 'Lo Que'?",
    "content": "• Use **quien** (no accent when connecting!) after a preposition like con, para, de, a when referring to a person: el amigo **con quien** hablo ('the friend with whom I speak').\n• Use **lo que** ('the thing that' = English **'what'**) whenever 'what' is a connector rather than a question: **Comprendo lo que dices** ('I understand what [the thing that] you say'), **Lo que quiero es café** ('What I want is coffee')!",
    "linguist_note": "Spanish relative que continues Latin quid/quod/quem merged into an all-purpose subordinator.",
    "trap_note": "Don't overuse quien! For 'The man who is speaking', say El hombre que habla (not *El hombre quien habla). Save quien for after prepositions (con quien, para quien)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "that / which / who (unaccented universal connector!)",
          "german": "que"
        },
        {
          "id": "p2",
          "english": "whom (after a preposition: con quien 'with whom')",
          "german": "quien"
        },
        {
          "id": "p3",
          "english": "what / the thing that (neuter connector)",
          "german": "lo que"
        },
        {
          "id": "p4",
          "english": "the book (that) I want",
          "german": "el libro que quiero"
        },
        {
          "id": "p5",
          "english": "I understand what you say",
          "german": "comprendo lo que dices"
        }
      ],
      "target_answer": "que, quien, lo que, el libro que quiero, comprendo lo que dices",
      "meaning": "that / which / who (unaccented universal connector!), whom (after a preposition: con quien 'with whom'), what / the thing that (neuter connector), the book (that) I want, I understand what you say",
      "explanation": "Unaccented que connects people and things; quien follows prepositions for people; lo que means 'what / the thing that'.",
      "id": "es28_e1"
    },
    {
      "type": "shift_select",
      "prompt": "In English we can drop 'that' in 'The coffee I want is here'. How MUST you say it in Spanish?",
      "options": [
        "El café que quiero está aquí (never drop que!)",
        "*El café quiero está aquí",
        "*El café qué quiero está aquí"
      ],
      "target_answer": "El café que quiero está aquí (never drop que!)",
      "meaning": "The coffee (that) I want is here",
      "explanation": "Spanish never omits relative que between two clauses!",
      "id": "es28_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I understand what you want' (where 'what' means 'the thing that', not a question)?",
      "options": [
        "*Comprendo que quieres",
        "Comprendo lo que quieres",
        "*Comprendo qué quieres"
      ],
      "target_answer": "Comprendo lo que quieres",
      "meaning": "I understand what you want",
      "explanation": "Non-question 'what' ('the thing that') is always lo que: Comprendo lo que quieres.",
      "id": "es28_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'It is the book that I want'",
      "target_answer": "Es el libro que quiero",
      "meaning": "It is the book that I want",
      "word_bank": [
        "quiero",
        "Está",
        "el",
        "lo",
        "que",
        "quien",
        "libro",
        "Es"
      ],
      "explanation": "Es el libro + que + quiero.",
      "id": "es28_e4"
    },
    {
      "type": "literal_gloss",
      "prompt": "Which English word-for-word blueprint mirrors Spanish 'Comprendo lo que quieres'?",
      "german": "Comprendo lo que quieres",
      "natural": "I understand what you want",
      "options": [
        "I understand it what you want",
        "What you want I understand it",
        "I understand what you want",
        "I-understand that-which you-want"
      ],
      "target_answer": "I-understand that-which you-want",
      "meaning": "I understand what you want (literal Spanish blueprint: I-understand that-which you-want)",
      "explanation": "lo ('that thing') + que ('which') = 'that which / what'.",
      "id": "es28_e5"
    }
  ],
  "summary": {
    "outcome": "Join clauses with unaccented que, use quien after prepositions for people, and express 'what (the thing that)' with lo que.",
    "use_example": {
      "german": "Es el libro que quiero y comprendo perfectamente lo que dices.",
      "english": "It is the book that I want and I understand perfectly what you are saying."
    },
    "takeaway": "Never drop 'que' in Spanish — and translate non-question 'what' ('the thing that') as lo que!",
    "curiosity_teaser": "Up next ([2801] que as the Master Connector): practice connecting people and objects with que."
  },
  "twist": {
    "prompt": "Assemble: 'I have the book that you want'",
    "target_answer": "Tengo el libro que quieres",
    "word_bank": [
      "libro",
      "lo",
      "quiero",
      "quieres",
      "quien",
      "el",
      "Tengo",
      "que"
    ],
    "explanation": "Tengo el libro que quieres."
  },
  "foreshadow": {
    "line": "Next in Topic 29: vivid Spanish idioms as thought — plus in Sprig 2803 right now, unlock the Latin prefix × root matrices for poner, tener, traer, and mostrar!",
    "resolvedIn": 29
  },
  "payoff": {
    "ofLesson": 7,
    "text": "In Topic 7 you learned accented ¿qué? ('what?') and ¿quién? ('who?'); now you see their unstressed connector twins que and quien!"
  }
};

export default lesson;
