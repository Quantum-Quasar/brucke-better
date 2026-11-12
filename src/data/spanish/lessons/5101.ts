import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5101,
  "slug": "hypothetical-situations-conditional",
  "title": "Hypothetical Situations",
  "subtitle": "Conditional -ía across verbs and polite/hypothetical expressions",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "gustaría",
    "podría",
    "ojalá",
    "vivir",
    "comprar",
    "ir",
    "visitar",
    "ciudad",
    "casa",
    "tener"
  ],
  "table_word_ids": [
    "gustaría",
    "podría",
    "ojalá",
    "vivir",
    "comprar",
    "ir",
    "visitar",
    "ciudad",
    "casa",
    "tener"
  ],
  "hook": {
    "title": "Dreaming and Planning with '-ía'",
    "content": "Because every regular verb in Spanish forms the conditional by gluing **-ía, -ías, -ía, -íamos, -ían** onto the complete infinitive, you can instantly express hypothetical dreams: **Me gustaría vivir en Madrid** ('I would like to live in Madrid'), **Compraría una casa blanca** ('I would buy a white house'), **Iría contigo** ('I would go with you', from ir + -ía)!"
  },
  "pattern": {
    "title": "Combining Conditional Wishes with Subjunctive 'Que'",
    "content": "What if you say 'I would like YOU to visit Madrid'? Combine **Me gustaría que** with the opposite-vowel subjunctive: **Me gustaría que visites Madrid**!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I would like to live here",
          "german": "me gustaría vivir aquí"
        },
        {
          "id": "p2",
          "english": "I / he would buy (comprar + -ía)",
          "german": "compraría"
        },
        {
          "id": "p3",
          "english": "I / he would go (ir + -ía)",
          "german": "iría"
        },
        {
          "id": "p4",
          "english": "it would be (ser + -ía)",
          "german": "sería"
        },
        {
          "id": "p5",
          "english": "could you (tú) / could usted?",
          "german": "¿podrías? / ¿podría usted?"
        }
      ],
      "target_answer": "me gustaría vivir aquí, compraría, iría, sería, ¿podrías? / ¿podría usted?",
      "meaning": "I would like to live here, I / he would buy (comprar + -ía), I / he would go (ir + -ía), it would be (ser + -ía), could you (tú) / could usted?",
      "explanation": "Infinitive + -ía turns any verb into 'would [verb]'.",
      "id": "es5101_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Build 'I / he would buy' by attaching '-ía' to the full infinitive 'comprar':",
      "tile_options": [
        "ía",
        "comprar",
        "é",
        "aba"
      ],
      "target_answer": "compraría",
      "meaning": "compraría (would buy)",
      "explanation": "comprar + ía = compraría.",
      "id": "es5101_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I would go to Madrid tomorrow' (from the infinitive ir)?",
      "options": [
        "*Voyía a Madrid mañana",
        "*Fuería a Madrid mañana",
        "Iría a Madrid mañana"
      ],
      "target_answer": "Iría a Madrid mañana",
      "meaning": "I would go to Madrid tomorrow",
      "explanation": "even two-letter ir simply glues -ía onto the infinitive: ir + ía = iría!",
      "id": "es5101_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I would like to buy this house'",
      "target_answer": "Me gustaría comprar esta casa",
      "meaning": "I would like to buy this house",
      "word_bank": [
        "esta",
        "este",
        "gusta",
        "casa",
        "compré",
        "Me",
        "comprar",
        "gustaría"
      ],
      "explanation": "Me gustaría + comprar + esta casa.",
      "id": "es5101_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Me gustaría vivir en esta ciudad hermosa",
      "replays": 2,
      "target_answer": "Me gustaría vivir en esta ciudad hermosa",
      "meaning": "I would like to live in this beautiful city",
      "cues": [
        "I would like: Me gustaría",
        "to live: vivir",
        "in this beautiful city: en esta ciudad hermosa"
      ],
      "explanation": "Me gustaría vivir en esta ciudad hermosa.",
      "affirmation": "Hypothetical conditional mastered!",
      "id": "es5101_e5"
    }
  ],
  "summary": {
    "outcome": "Form conditionals across -ar, -er, and -ir infinitives (compraría, viviría, iría, sería, me gustaría).",
    "use_example": {
      "german": "Me gustaría vivir en esta ciudad hermosa y compraría una casa aquí.",
      "english": "I would like to live in this beautiful city and I would buy a house here."
    },
    "takeaway": "Even two-letter ir ('to go') forms its conditional regularly: ir + -ía = iría ('would go')!",
    "curiosity_teaser": "Up next ([5102] El Condicional Cortés): me gustaría, ¿podría… ? — the conditional as the politeness lever!"
  },
  "twist": {
    "prompt": "Assemble: 'Could you (formal) confirm?'",
    "target_answer": "Podría usted confirmar",
    "word_bank": [
      "confirmar",
      "confirmas",
      "Podría",
      "Puedes",
      "usted",
      "tú"
    ],
    "explanation": "¿Podría usted confirmar?"
  }
};

export default lesson;
