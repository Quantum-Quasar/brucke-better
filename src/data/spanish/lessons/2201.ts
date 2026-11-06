import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2201,
  "slug": "pronoun-highway-order",
  "title": "The Pronoun Highway Order",
  "subtitle": "People before things: Indirect object (me, te, nos) precedes direct object (lo, la): me lo da, te lo digo",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "me",
    "te",
    "nos",
    "lo",
    "la",
    "dar",
    "decir",
    "comprar",
    "explicar",
    "verdad"
  ],
  "table_word_ids": [
    "me",
    "te",
    "nos",
    "lo",
    "la",
    "dar",
    "decir",
    "comprar",
    "explicar",
    "verdad"
  ],
  "hook": {
    "title": "Person First, Thing Second, Verb Third",
    "content": "Whether the thing is masculine (lo — e.g., el libro, el café) or feminine (la — e.g., la verdad, la llave, la confirmación), the recipient person (me, te, nos) always takes the front seat: ¿Me lo das? ('Will you give it to me?'), Te la digo ('I tell it [the truth] to you')."
  },
  "pattern": {
    "title": "Where Does 'No' Go? Still at the Very Front!",
    "content": "When negating a double-pronoun sentence, no still stands at the very front of the train: No te lo digo ('I don't tell it to you')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "he gives it to me",
          "german": "me lo da"
        },
        {
          "id": "p2",
          "english": "I tell it to you",
          "german": "te lo digo"
        },
        {
          "id": "p3",
          "english": "I give it (feminine, e.g. la llave) to you",
          "german": "te la doy"
        },
        {
          "id": "p4",
          "english": "he explains it to us",
          "german": "nos lo explica"
        },
        {
          "id": "p5",
          "english": "I don't tell it to you",
          "german": "no te lo digo"
        }
      ],
      "target_answer": "me lo da, te lo digo, te la doy, nos lo explica, no te lo digo",
      "meaning": "he gives it to me, I tell it to you, I give it (feminine, e.g. la llave) to you, he explains it to us, I don't tell it to you",
      "explanation": "Order: [no] + [person: me/te/nos/se] + [thing: lo/la] + [verb].",
      "id": "es2201_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Referring to 'la llave' (feminine), how do you say 'I give it to you'?",
      "options": [
        "*La te doy",
        "Te lo doy",
        "Te la doy"
      ],
      "target_answer": "Te la doy",
      "meaning": "I give it (the key) to you",
      "explanation": "te ('to you') comes first, and la ('it', feminine for la llave) comes second: Te la doy.",
      "id": "es2201_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'He explains it to us'",
      "target_answer": "Nos lo explica",
      "meaning": "He explains it to us",
      "word_bank": [
        "explica",
        "lo",
        "me",
        "Nos",
        "nos",
        "Lo"
      ],
      "explanation": "Nos ('to us') + lo ('it') + explica ('he/she explains').",
      "id": "es2201_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say: 'He gives it (masculine) to me'",
      "cues": [
        "To me (person first) → Me",
        "it (masculine thing second) → lo",
        "he gives (3rd sg. of dar) → da"
      ],
      "idea_parts": [
        "To me → Me",
        "it → lo",
        "he gives → da"
      ],
      "target_answer": "Me lo da",
      "meaning": "He gives it to me",
      "word_bank": [
        "te",
        "Lo",
        "doy",
        "da",
        "Me",
        "lo"
      ],
      "explanation": "Me lo da — person before thing before verb.",
      "id": "es2201_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Te digo la verdad",
      "replays": 2,
      "target_answer": "Te digo la verdad",
      "meaning": "I tell you the truth",
      "cues": [
        "To you: Te",
        "I tell: digo",
        "the truth: la verdad"
      ],
      "explanation": "Te digo la verdad — and if you replace la verdad with 'it', it becomes Te la digo!",
      "affirmation": "Double pronoun order locked in!",
      "id": "es2201_e5"
    }
  ],
  "summary": {
    "outcome": "Order indirect (me, te, nos) before direct (lo, la) pronouns ahead of conjugated verbs.",
    "use_example": {
      "german": "Te digo la verdad — sí, te la digo ahora.",
      "english": "I tell you the truth — yes, I tell it to you now."
    },
    "takeaway": "Always keep the sequence: [no] + [indirect person] + [direct thing] + [verb].",
    "curiosity_teaser": "Up next ([2202] The se lo Softening Rule): master se lo and se la with both conjugated verbs and infinitives."
  },
  "twist": {
    "prompt": "Assemble: 'I do not tell it to you'",
    "target_answer": "No te lo digo",
    "word_bank": [
      "lo",
      "No",
      "te",
      "no",
      "Te",
      "digo",
      "la"
    ],
    "explanation": "No te lo digo."
  }
};

export default lesson;
