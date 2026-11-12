import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5042,
  "slug": "lesson-5042",
  "title": "Usted in the Wild",
  "subtitle": "the formal you with its third-person verb — politeness at a polite distance",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "usted",
    "hola",
    "gracias",
    "cómo",
    "está",
    "señor",
    "señora",
    "buenos_días"
  ],
  "table_word_ids": [
    "usted",
    "hola",
    "gracias",
    "cómo",
    "está",
    "señor",
    "señora"
  ],
  "hook": {
    "title": "The Formal You, Spoken",
    "content": "Lesson 5041 drew the tú/usted line. Now cross it every day: Buenos días, señora. ¿Cómo está usted ? usted borrows the he/she verb — está, never estás — the same third-person trick French plays with vous. The distance IS the politeness.",
    "footnotes": [
      {
        "marker": "1",
        "title": "A whole title worn into a pronoun",
        "content": "usted was ground down from vuestra merced — 'your grace'. A full honorific compressed into two syllables, which is why its verb still bows to third person.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "usted + Third-Person Verb",
    "content": "¿Cómo está usted ? ¿Qué desea usted ? The pronoun takes the he/she form: está, quiere, es. Write it Ud. in a letter, say it in one breath in the street.",
    "linguist_note": "Latin America leans more formal than Spain in everyday shops — but the verb rule never changes: usted + third person, always.",
    "trap_note": "Never pair usted with the tú form: ¿cómo está usted ?, not *¿cómo estás usted ? — the bow happens in the verb."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each formal greeting with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "How are you? (formal)",
          "german": "¿Cómo está usted ?"
        },
        {
          "id": "p2",
          "english": "Good morning",
          "german": "Buenos días"
        },
        {
          "id": "p3",
          "english": "sir",
          "german": "señor"
        },
        {
          "id": "p4",
          "english": "madam",
          "german": "señora"
        },
        {
          "id": "p5",
          "english": "thank you",
          "german": "gracias"
        }
      ],
      "target_answer": "¿Cómo está usted ?, Buenos días, señor, señora, gracias",
      "meaning": "How are you? (formal), Good morning, sir, madam, thank you",
      "explanation": "The politeness set: formal question, time-of-day greeting, and the titles that go with usted.",
      "id": "es5042_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Greet your boss formally:",
      "options": [
        "¿Cómo está usted ?",
        "¿Cómo estás usted ?",
        "¿Cómo eres usted ?"
      ],
      "target_answer": "¿Cómo está usted ?",
      "meaning": "How are you? (formal)",
      "explanation": "¿Cómo está usted ? — third-person verb, and estar for the state you're in.",
      "id": "es5042_e2"
    },
    {
      "type": "derive",
      "prompt": "Write the title for 'madam' — the word that pairs with señ 'sir':",
      "english_hint": "Latin senior — older, superior",
      "target_answer": "señora",
      "meaning": "madam",
      "explanation": "señora — the feminine title that earns the same third-person bow.",
      "id": "es5042_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "greet a madam formally and ask how she is",
      "cues": [
        "the greeting: Buenos días, señora",
        "the formal question: ¿cómo está usted ?"
      ],
      "idea_parts": [
        "greeting → Buenos días, señora",
        "how are you → ¿cómo está usted ?"
      ],
      "target_answer": "Buenos días, señora, ¿cómo está usted ?",
      "meaning": "Good morning, madam, how are you?",
      "word_bank": [
        "Buenos",
        "días",
        "señora",
        "cómo",
        "está",
        "usted",
        "estás"
      ],
      "explanation": "Buenos días, señora, ¿cómo está usted ? — greeting, title, formal question.",
      "diagnosis": {
        "slip": "used the tú form with usted",
        "cue": "usted bows in the verb: está, never estás."
      },
      "id": "es5042_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Gracias, señor",
      "replays": 2,
      "target_answer": "Gracias, señor",
      "meaning": "Thank you, sir",
      "cues": [
        "It means: Thank you, sir",
        "The title rides at the end"
      ],
      "explanation": "Gracias, señor — two words that close a polite exchange.",
      "affirmation": "You wrote the formal close with the title riding at the end.",
      "id": "es5042_e5"
    }
  ],
  "summary": {
    "outcome": "Greet formally with usted + third-person verb, buenos días, and the señor/señora titles.",
    "use_example": {
      "german": "Buenos días, señora, ¿cómo está usted ?",
      "english": "Good morning, madam, how are you?"
    },
    "takeaway": "usted borrows the he/she verb — the distance is the politeness.",
    "curiosity_teaser": "Up next ([10] tener & hay): meet the two verbs that say 'have' and 'there is' — and the irregular tengo that starts them!"
  },
  "twist": {
    "prompt": "Think it through again without looking back — greet a madam formally and ask how she is:",
    "target_answer": "Buenos días, señora, ¿cómo está usted ?",
    "word_bank": [
      "Buenos",
      "días",
      "señora",
      "cómo",
      "está",
      "usted",
      "hola"
    ],
    "explanation": "Rebuilding \"Buenos días, señora, ¿cómo está usted ?\" — greeting, title, formal bow in the verb."
  }
};

export default lesson;
