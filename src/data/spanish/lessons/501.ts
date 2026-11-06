import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 501,
  "slug": "es-vs-esta-gym",
  "title": "Es vs Está Gym",
  "subtitle": "Characteristic vs state discrimination: es bueno vs está caliente, está aquí vs es grande",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "es",
    "está",
    "eres",
    "estás",
    "soy",
    "estoy",
    "aquí",
    "allí",
    "bueno",
    "contento",
    "frío"
  ],
  "table_word_ids": [
    "es",
    "está",
    "eres",
    "estás",
    "soy",
    "estoy",
    "aquí",
    "allí",
    "bueno",
    "contento",
    "frío"
  ],
  "hook": {
    "title": "Side-by-Side Discrimination",
    "content": "The fastest way to make ser vs estar instinctive is direct contrast: ¿Cómo estás? ('How are you doing right now?') vs ¿Cómo eres? ('What are you like as a person?')."
  },
  "pattern": {
    "title": "Location Always Takes Estar",
    "content": "Where is it standing? Estoy aquí ('I am here'), Está allí ('It is there'). Notice how both aquí and allí carry an acute accent on the final -í!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "you are (characteristic)",
          "german": "eres"
        },
        {
          "id": "p2",
          "english": "you are (state/location)",
          "german": "estás"
        },
        {
          "id": "p3",
          "english": "I am (characteristic)",
          "german": "soy"
        },
        {
          "id": "p4",
          "english": "I am (state/location)",
          "german": "estoy"
        },
        {
          "id": "p5",
          "english": "here",
          "german": "aquí"
        },
        {
          "id": "p6",
          "english": "there",
          "german": "allí"
        }
      ],
      "target_answer": "eres, estás, soy, estoy, aquí, allí",
      "meaning": "you are (characteristic), you are (state/location), I am (characteristic), I am (state/location), here, there",
      "explanation": "eres/soy for who you are; estás/estoy for how or where you are.",
      "id": "es501_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you ask a friend 'How are you?' (asking about their current state)?",
      "options": [
        "¿Cómo eres?",
        "¿Dónde eres?",
        "¿Cómo estás?"
      ],
      "target_answer": "¿Cómo estás?",
      "meaning": "How are you?",
      "explanation": "¿Cómo estás? asks how someone stands today; ¿Cómo eres? asks what kind of person they are.",
      "id": "es501_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I am here'",
      "target_answer": "Estoy aquí",
      "meaning": "I am here",
      "word_bank": [
        "aquí",
        "allí",
        "Estoy",
        "es",
        "Soy"
      ],
      "explanation": "Estoy + aquí — location always uses estar.",
      "id": "es501_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that the hotel is there",
      "cues": [
        "the hotel → El hotel",
        "is (location) → está",
        "there → allí"
      ],
      "idea_parts": [
        "subject → El hotel",
        "is (location) → está",
        "there → allí"
      ],
      "target_answer": "El hotel está allí",
      "meaning": "The hotel is there",
      "word_bank": [
        "hotel",
        "está",
        "aquí",
        "allí",
        "es",
        "El",
        "grande"
      ],
      "explanation": "El hotel está allí — even a massive building uses está for its location!",
      "diagnosis": {
        "slip": "used es for location",
        "cue": "Physical location always uses estar: El hotel está allí."
      },
      "id": "es501_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Estoy aquí hoy",
      "replays": 2,
      "target_answer": "Estoy aquí hoy",
      "meaning": "I am here today",
      "cues": [
        "I am (location): Estoy",
        "here: aquí",
        "today: hoy"
      ],
      "explanation": "Estoy aquí hoy — estar with place and time.",
      "affirmation": "Clean location sentence with Estoy!",
      "id": "es501_e5"
    }
  ],
  "summary": {
    "outcome": "Contrast soy/eres/es with estoy/estás/está across states and locations.",
    "use_example": {
      "german": "Estoy aquí en Madrid y el hotel está allí.",
      "english": "I am here in Madrid and the hotel is there."
    },
    "takeaway": "Whenever you state where a person, object, or building is located, reach for estar.",
    "curiosity_teaser": "Up next ([502] Description Agreement Gym): match adjective endings (-o/-a) to noun gender."
  },
  "twist": {
    "prompt": "Assemble: 'You are very good (character)'",
    "target_answer": "Eres muy bueno",
    "word_bank": [
      "muy",
      "bueno",
      "Eres",
      "Estás",
      "aquí",
      "contento"
    ],
    "explanation": "Eres muy bueno describes someone's inherent character."
  }
};

export default lesson;
