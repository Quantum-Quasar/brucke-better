import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 501,
  "slug": "je-suis-i-follow",
  "title": "je suis: I Follow",
  "subtitle": "The sequence etymology, drilled into description sentences",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "suis",
    "es",
    "est",
    "être",
    "elle",
    "content",
    "grand",
    "petit",
    "très",
    "ici",
    "là"
  ],
  "table_word_ids": [
    "suis",
    "es",
    "est",
    "grand",
    "petit",
    "être",
    "elle",
    "content",
    "très",
    "ici",
    "là"
  ],
  "hook": {
    "title": "Being as Following",
    "content": "Latin sequor — 'I follow' — is why je suis means both 'I am' and 'I follow'. The idea isn't as strange as it sounds: to be somewhere is to have followed yourself there. English kept the root in sequence, sequel, consequence. French kept the verb."
  },
  "pattern": {
    "title": "Descriptions with suis and es",
    "content": "je suis grand (I am tall), tu es petit (you are small), je suis très content (I am very happy). Adjectives after être agree with the describer — grand for a male speaker, grande for a female one. The adjective follows the person it paints.",
    "trap_note": "The mind wants je suis grand to mean 'I am big' in every context — but for a woman it's je suis grande. The feminine -e follows the speaker, not the listener."
  },
  "exercises": [
    {
      "id": "fr501_e1",
      "type": "matching_pairs",
      "prompt": "Match each être form with its English meaning and etymological twin:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I am (lit. I follow)",
          "german": "je suis"
        },
        {
          "id": "p2",
          "english": "you are (thou art)",
          "german": "tu es"
        },
        {
          "id": "p3",
          "english": "he is",
          "german": "il est"
        },
        {
          "id": "p4",
          "english": "she is",
          "german": "elle est"
        }
      ],
      "target_answer": "je suis, tu es, il est, elle est",
      "meaning": "the singular forms of être",
      "explanation": "je suis (sequor), tu es (art), il/elle est (is)."
    },
    {
      "id": "fr501_e2",
      "type": "syntax_builder",
      "prompt": "Assemble: 'I am very tall' (male speaker)",
      "target_answer": "Je suis très grand",
      "meaning": "I am very tall",
      "word_bank": [
        "grande",
        "suis",
        "très",
        "Je",
        "grand",
        "la"
      ],
      "explanation": "Male speaker → grand stays masculine. très slides in before the adjective."
    },
    {
      "id": "fr501_e3",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "a woman introducing her situation: she is very happy (contente, feminine)",
      "cues": [
        "elle est — the description form",
        "feminine adjective: contente (with the e)",
        "Elle est très contente"
      ],
      "target_answer": "Elle est très contente",
      "meaning": "She is very happy",
      "word_bank": [
        "Elle",
        "contente",
        "est",
        "content",
        "la",
        "très"
      ],
      "idea_parts": [
        "who? → elle",
        "the verb → est",
        "the adjective → contente, feminine"
      ],
      "explanation": "c'est would point; elle est describes. The feminine e follows her, as it followed the house (grande).",
      "diagnosis": {
        "slip": "the adjective stayed masculine",
        "cue": "The adjective follows the person it paints: elle est contente. The -e is hers, not the sentence's."
      }
    },
    {
      "id": "fr501_e4",
      "type": "variant_english",
      "prompt": "Which English sentences capture the meaning of 'Je suis ici, tu es là'?",
      "german": "Je suis ici, tu es là",
      "meaning": "I am here, you are there",
      "renderings": [
        "I'm here, you're there",
        "I am here and you are over there"
      ],
      "traps": [
        "I was there, you were here",
        "You are here, I am there"
      ],
      "target_answer": "I'm here, you're there",
      "explanation": "ici is 'here' and là is 'there'; je suis and tu es anchor each person in space."
    },
    {
      "id": "fr501_e5",
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Je suis très contente",
      "replays": 2,
      "target_answer": "Je suis très contente",
      "meaning": "I am very happy (female speaker)",
      "cues": [
        "je suis — the follow",
        "très before the adjective",
        "the feminine e: contente"
      ],
      "explanation": "The speaker's own gender paints the adjective — contente for her, content for him.",
      "affirmation": "The e is on the page — the speaker and the adjective agree."
    }
  ],
  "summary": {
    "outcome": "Use suis/es/est in description sentences with gender-agreeing adjectives.",
    "use_example": {
      "german": "Je suis grand, tu es petit.",
      "english": "I am tall, you are small."
    },
    "takeaway": "je suis = I follow — and every description after être agrees with the person it paints.",
    "curiosity_teaser": "Up next on Le Pont ([502] C'est Gym): see how je suis: I Follow leads directly into C'est Gym."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I am very tall\" in French:",
    "target_answer": "Je suis très grand",
    "word_bank": [
      "très",
      "suis",
      "pas",
      "ne",
      "grand",
      "Je"
    ],
    "explanation": "Re-constructing \"Je suis très grand\" from the underlying rule cements the pattern of je suis: I Follow."
  }
};

export default lesson;
