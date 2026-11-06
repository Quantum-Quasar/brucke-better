import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2902,
  "slug": "arabic-heritage-cultural-turns",
  "title": "Arabic Heritage & Cultural Turns",
  "subtitle": "ojalá ('inshallah'), hasta ('hatta'), azul ('lazaward'), and la sobremesa",
  "phase": 5,
  "shift_categories": [],
  "word_ids": [
    "ojalá",
    "azul",
    "limón",
    "café",
    "mesa",
    "tener",
    "tengo",
    "amigo",
    "hablar",
    "mañana"
  ],
  "table_word_ids": [
    "ojalá",
    "azul",
    "limón",
    "café",
    "mesa",
    "tener",
    "tengo",
    "amigo",
    "hablar",
    "mañana"
  ],
  "hook": {
    "title": "Eight Centuries of Shared History in Your Mouth",
    "content": "Between 711 and 1492, Arabic and Romance lived side by side on the Iberian Peninsula. Whenever you say **ojalá** ('hopefully / God willing'), **azul** ('blue'), **el limón** ('the lemon'), **el azúcar** ('sugar'), **la almohada** ('the pillow'), or **hasta** ('until', as in ¡Hasta mañana! / ¡Hasta luego!), you are speaking the living heritage of Al-Andalus!"
  },
  "pattern": {
    "title": "La Sobremesa: The Untranslatable Art of Staying at the Table",
    "content": "And look at the Spanish compound **la sobremesa** (sobre 'over/after' + mesa 'table'): the cherished time spent lingering at the table talking with friends and family after the meal and coffee are finished!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "hopefully / God willing (Arabic law šá lláh)",
          "german": "ojalá"
        },
        {
          "id": "p2",
          "english": "blue (Arabic lāzaward)",
          "german": "azul"
        },
        {
          "id": "p3",
          "english": "lemon (Arabic līmūn + -ón)",
          "german": "el limón"
        },
        {
          "id": "p4",
          "english": "until tomorrow (Arabic ḥattā → hasta)",
          "german": "hasta mañana"
        },
        {
          "id": "p5",
          "english": "the table (root of la sobremesa)",
          "german": "la mesa"
        }
      ],
      "target_answer": "ojalá, azul, el limón, hasta mañana, la mesa",
      "meaning": "hopefully / God willing (Arabic law šá lláh), blue (Arabic lāzaward), lemon (Arabic līmūn + -ón), until tomorrow (Arabic ḥattā → hasta), the table (root of la sobremesa)",
      "explanation": "Arabic contributed roughly 4,000 words and expressions to Spanish.",
      "id": "es2902_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Which everyday Spanish preposition meaning 'until' (as in '¡___ mañana!' and '¡___ la vista!') came from Arabic 'ḥattā'?",
      "options": [
        "hasta",
        "desde",
        "para"
      ],
      "target_answer": "hasta",
      "meaning": "until",
      "explanation": "Arabic ḥattā became Old Spanish fasta and modern Spanish hasta (with silent h-)!",
      "id": "es2902_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Goodbye, until tomorrow!'",
      "target_answer": "Adiós hasta mañana",
      "meaning": "Goodbye, until tomorrow!",
      "word_bank": [
        "ayer",
        "por",
        "mañana",
        "hasta",
        "desde",
        "Adiós"
      ],
      "explanation": "¡Adiós, hasta mañana!",
      "id": "es2902_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say: 'Hopefully you have time to speak with my friend'",
      "cues": [
        "Hopefully you have (subjunctive) → Ojalá tengas",
        "time to (in order to) speak → tiempo para hablar",
        "with my friend → con mi amigo"
      ],
      "idea_parts": [
        "Hopefully you have time → Ojalá tengas tiempo",
        "to speak with my friend → para hablar con mi amigo"
      ],
      "target_answer": "Ojalá tengas tiempo para hablar con mi amigo",
      "meaning": "I hope you have time to speak with my friend",
      "word_bank": [
        "tengas",
        "para",
        "por",
        "amigo",
        "tienes",
        "Ojalá",
        "con",
        "tiempo",
        "hablar",
        "mi",
        "a"
      ],
      "explanation": "¡Ojalá tengas tiempo para hablar con mi amigo!",
      "id": "es2902_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Agua con limón en la mesa azul",
      "replays": 2,
      "target_answer": "Agua con limón en la mesa azul",
      "meaning": "Water with lemon on the blue table",
      "cues": [
        "Water with lemon: Agua con limón",
        "on the table: en la mesa",
        "blue: azul"
      ],
      "explanation": "Agua con limón en la mesa azul — Latin and Arabic roots side by side!",
      "affirmation": "Arabic & Latin synthesis complete!",
      "id": "es2902_e5"
    }
  ],
  "summary": {
    "outcome": "Recognize Arabic-heritage vocabulary (ojalá, azul, limón, hasta) and use it in full sentences.",
    "use_example": {
      "german": "¡Adiós, hasta mañana — ojalá tengas un buen día!",
      "english": "Goodbye, until tomorrow — I hope you have a great day!"
    },
    "takeaway": "Spanish is a tapestry of Latin structure and rich historical layers including Arabic and Greek.",
    "curiosity_teaser": "Up next ([30] Capstone: El Puente Reading): bring all 30 topics together in a connected Madrid narrative!"
  },
  "twist": {
    "prompt": "Assemble: 'Water with lemon, please'",
    "target_answer": "Agua con limón por favor",
    "word_bank": [
      "con",
      "favor",
      "por",
      "Agua",
      "sin",
      "limón",
      "gracias",
      "leche"
    ],
    "explanation": "Agua con limón, por favor."
  }
};

export default lesson;
