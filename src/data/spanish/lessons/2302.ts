import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2302,
  "slug": "dative-pronoun-redundancy",
  "title": "Dative Pronoun Redundancy",
  "subtitle": "Why Spanish loves saying 'to whom' twice: Le doy el libro a María, A mí me gusta",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "le",
    "me",
    "te",
    "nos",
    "dar",
    "decir",
    "explicar",
    "hablar",
    "a",
    "amigo"
  ],
  "table_word_ids": [
    "le",
    "me",
    "te",
    "nos",
    "dar",
    "decir",
    "explicar",
    "hablar",
    "a",
    "amigo"
  ],
  "hook": {
    "title": "Why Spanish Announces the Recipient Twice",
    "content": "In English, you say 'I give the book to Carlos' (mentioning Carlos once). In Spanish, speakers almost ALWAYS include the indirect object pronoun le (or plural les) before the verb EVEN WHEN 'a Carlos' is right there in the sentence: **Le** doy el libro **a Carlos**, **Le** digo la verdad **a mi madre**, **Le** hablo **a mi amigo**! Think of le as the verb's built-in radar locking onto the recipient before the name arrives!"
  },
  "pattern": {
    "title": "Clarifying 'Le' with 'a él / a ella / a usted'",
    "content": "Because le can mean 'to him', 'to her', or 'to usted', adding a él, a ella, or a usted makes it 100% clear who receives the action."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I give the book to María",
          "german": "le doy el libro a María"
        },
        {
          "id": "p2",
          "english": "I tell the truth to my friend",
          "german": "le digo la verdad a mi amigo"
        },
        {
          "id": "p3",
          "english": "he explains the problem to us",
          "german": "nos explica el problema"
        },
        {
          "id": "p4",
          "english": "I speak to usted",
          "german": "le hablo a usted"
        },
        {
          "id": "p5",
          "english": "to them / to you all (plural dative)",
          "german": "les"
        }
      ],
      "target_answer": "le doy el libro a María, le digo la verdad a mi amigo, nos explica el problema, le hablo a usted, les",
      "meaning": "I give the book to María, I tell the truth to my friend, he explains the problem to us, I speak to usted, to them / to you all (plural dative)",
      "explanation": "le (singular) and les (plural) preview the recipient before the verb.",
      "id": "es2302_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How does a native speaker say 'I tell the truth to my father'?",
      "options": [
        "Lo digo la verdad a mi padre",
        "Le digo la verdad a mi padre",
        "Digo la verdad para mi padre"
      ],
      "target_answer": "Le digo la verdad a mi padre",
      "meaning": "I tell the truth to my father",
      "explanation": "Le previews 'a mi padre' before the verb digo.",
      "id": "es2302_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I give the key to my mother'",
      "target_answer": "Le doy la llave a mi madre",
      "meaning": "I give the key to my mother",
      "word_bank": [
        "madre",
        "llave",
        "para",
        "doy",
        "Lo",
        "mi",
        "la",
        "Le",
        "La",
        "a"
      ],
      "explanation": "Le (previewing the recipient) + doy + la llave + a mi madre.",
      "id": "es2302_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that you explain the situation to your friend",
      "cues": [
        "To him/her (preview) → Le",
        "I explain the situation → explico la situación",
        "to my friend → a mi amigo"
      ],
      "idea_parts": [
        "I explain to him → Le explico",
        "the situation → la situación",
        "to my friend → a mi amigo"
      ],
      "target_answer": "Le explico la situación a mi amigo",
      "meaning": "I explain the situation to my friend",
      "word_bank": [
        "Lo",
        "por",
        "explico",
        "situación",
        "a",
        "para",
        "mi",
        "la",
        "Le",
        "amigo"
      ],
      "explanation": "Le explico la situación a mi amigo.",
      "id": "es2302_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Le digo la verdad a mi amigo",
      "replays": 2,
      "target_answer": "Le digo la verdad a mi amigo",
      "meaning": "I tell the truth to my friend",
      "cues": [
        "To him + I tell: Le digo",
        "the truth: la verdad",
        "to my friend: a mi amigo"
      ],
      "explanation": "Le digo la verdad a mi amigo.",
      "affirmation": "Redundant dative le mastered!",
      "id": "es2302_e5"
    }
  ],
  "summary": {
    "outcome": "Use redundant le/les before the verb whenever a dative recipient ('a + person') is present.",
    "use_example": {
      "german": "Le doy la llave a mi madre y le explico la situación a mi amigo.",
      "english": "I give the key to my mother and I explain the situation to my friend."
    },
    "takeaway": "In Spanish, 'a [person]' (recipient) and pre-verbal le/les work as a team rather than an either/or choice.",
    "curiosity_teaser": "Up next ([2303] Saber vs Conocer): master Spanish's two verbs for 'to know' — facts/skills (sé) vs people/places (conozco)!"
  },
  "twist": {
    "prompt": "Assemble: 'He gives me the book'",
    "target_answer": "Me da el libro",
    "word_bank": [
      "doy",
      "libro",
      "Me",
      "da",
      "Le",
      "el",
      "la"
    ],
    "explanation": "Me da el libro ('He gives me the book')."
  }
};

export default lesson;
