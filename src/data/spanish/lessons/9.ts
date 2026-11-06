import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 9,
  "slug": "tu-and-usted-tv-line",
  "title": "tú & usted: The T-V Line",
  "subtitle": "Informal tú vs polite usted (worn-down Vuestra Merced), greetings and social register",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "tú",
    "usted",
    "hola",
    "gracias",
    "por_favor",
    "adiós",
    "señor",
    "señora",
    "estar",
    "querer"
  ],
  "table_word_ids": [
    "tú",
    "usted",
    "hola",
    "gracias",
    "por_favor",
    "adiós",
    "señor",
    "señora",
    "estar",
    "querer"
  ],
  "hook": {
    "title": "How 'Your Mercy' Became Usted",
    "content": "Why does Spanish use 3rd-person verb forms ('he/she wants' = quiere, 'he/she is' = está) when speaking politely to one person with usted? Because in Golden Age Spain, polite speakers didn't say 'you' directly — they addressed a stranger in the third person as Vuestra Merced ('Your Mercy / Your Grace'): 'What does Your Mercy wish?'. Over centuries of rapid speech, Vuestra Merced wore down to vuesarced → vusted → usted — keeping its 3rd-person verb forever!"
  },
  "pattern": {
    "title": "Dropping the -s to Step from tú to usted",
    "content": "Look at how easy the verb switch is between informal tú (friends, family, peers) and formal usted (elders, strangers, respectful service): simply remove the final -s of the tú form! tú quieres → usted quiere; tú estás → usted está; tú hablas → usted habla; tú tienes → usted tiene!",
    "linguist_note": "Vuestra Merced grammaticalized into usted between the 16th and 17th centuries, paralleling Portuguese você.",
    "trap_note": "When talking ABOUT Mr. or Mrs. García, use el señor / la señora; when speaking DIRECTLY to them, drop the article: Buenos días, señor."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "you (informal)",
          "german": "tú"
        },
        {
          "id": "p2",
          "english": "you (formal: 'Your Mercy')",
          "german": "usted"
        },
        {
          "id": "p3",
          "english": "how are you? (informal)",
          "german": "¿cómo estás?"
        },
        {
          "id": "p4",
          "english": "how are you? (formal)",
          "german": "¿cómo está usted?"
        },
        {
          "id": "p5",
          "english": "sir / Mr.",
          "german": "señor"
        },
        {
          "id": "p6",
          "english": "madam / Mrs.",
          "german": "señora"
        }
      ],
      "target_answer": "tú, usted, ¿cómo estás?, ¿cómo está usted?, señor, señora",
      "meaning": "you (informal), you (formal: 'Your Mercy'), how are you? (informal), how are you? (formal), sir / Mr., madam / Mrs.",
      "explanation": "Drop the -s from the tú verb (estás → está, quieres → quiere) to form the usted verb!",
      "id": "es9_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Why does 'usted' take 3rd-person verb forms (está, quiere, habla)?",
      "options": [
        "It is a plural pronoun",
        "It evolved from 'Vuestra Merced' ('Your Mercy'), a 3rd-person title",
        "It comes from Latin tū"
      ],
      "target_answer": "It evolved from 'Vuestra Merced' ('Your Mercy'), a 3rd-person title",
      "meaning": "you (formal)",
      "explanation": "Addressing someone as 'Your Mercy' naturally used 3rd-person verbs ('How is Your Mercy?').",
      "id": "es9_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble the formal question: 'How are you (formal)?'",
      "target_answer": "Cómo está usted",
      "meaning": "How are you (formal)?",
      "word_bank": [
        "es",
        "usted",
        "estás",
        "Cómo",
        "tú",
        "está"
      ],
      "explanation": "¿Cómo está usted? — drops the -s of estás and adds usted for clarity.",
      "id": "es9_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "ask politely (using usted): 'What do you want, sir?'",
      "cues": [
        "What → ¿Qué",
        "wants (usted form of querer: drop -s from quieres) → quiere",
        "sir → señor?"
      ],
      "idea_parts": [
        "What → Qué",
        "do you (formal) want → quiere",
        "sir → señor"
      ],
      "target_answer": "Qué quiere señor",
      "meaning": "What do you want, sir?",
      "word_bank": [
        "Qué",
        "señor",
        "quieres",
        "tú",
        "quiere",
        "señora",
        "estás"
      ],
      "explanation": "¿Qué quiere, señor? — dropping -s from quieres switches cleanly to polite usted.",
      "diagnosis": {
        "slip": "used quieres with señor",
        "cue": "When addressing señor or señora directly, use the polite usted form without -s: ¿Qué quiere, señor?"
      },
      "id": "es9_e4"
    },
    {
      "type": "literal_gloss",
      "prompt": "Which English word-for-word blueprint mirrors Spanish '¿Cómo está usted?'?",
      "german": "¿Cómo está usted?",
      "natural": "How are you (formal)?",
      "options": [
        "How are thou?",
        "What is your mercy?",
        "How stands Your-Mercy?",
        "How are you (formal)?"
      ],
      "target_answer": "How stands Your-Mercy?",
      "meaning": "How are you (formal)? (literal Spanish blueprint: How stands Your-Mercy?)",
      "explanation": "¿Cómo ('How') + está ('stands') + usted ('Your-Mercy')?",
      "id": "es9_e5"
    }
  ],
  "summary": {
    "outcome": "Switch between informal tú (with -s) and formal usted (without -s) and deploy polite greetings.",
    "use_example": {
      "german": "Buenos días, señora, ¿cómo está usted?",
      "english": "Good morning, madam, how are you?"
    },
    "takeaway": "Drop the final -s from the tú verb (estás → está, quieres → quiere) to speak politely with usted.",
    "curiosity_teaser": "Up next ([901] Addressing with Respect): practice flipping tú verbs into usted verbs in real dialogues."
  },
  "twist": {
    "prompt": "Assemble: 'What do you (formal) wish?'",
    "target_answer": "Qué desea usted",
    "word_bank": [
      "Cómo",
      "deseas",
      "desea",
      "usted",
      "tú",
      "Qué"
    ],
    "explanation": "¿Qué desea usted? uses desear ('to wish/desire') in the polite 3rd-person form."
  },
  "foreshadow": {
    "line": "Next in Topic 10: how Spanish expresses possession with tener ('to hold') and existence with hay ('there is / there are').",
    "resolvedIn": 10
  },
  "payoff": {
    "ofLesson": 8,
    "text": "In Topic 8 you learned the word formal; now Topic 9 shows how Spanish builds formality directly into its pronouns and verb endings."
  }
};

export default lesson;
