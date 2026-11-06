import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5051,
  "slug": "directions-and-places",
  "title": "Directions & Places",
  "subtitle": "Asking ¿Dónde está…? and navigating with todo recto, a la izquierda, a la derecha, aquí, allí",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "dónde",
    "está",
    "aquí",
    "allí",
    "hotel",
    "restaurante",
    "estación",
    "universidad",
    "ciudad",
    "por"
  ],
  "table_word_ids": [
    "dónde",
    "está",
    "aquí",
    "allí",
    "hotel",
    "restaurante",
    "estación",
    "universidad",
    "ciudad",
    "por"
  ],
  "hook": {
    "title": "Navigating a Spanish City",
    "content": "When you stop someone on the street in Madrid or Mexico City to ask for directions, two structures do 90% of the work: **Perdón, ¿dónde está la estación?** ('Excuse me, where is the specific station?') and **¿Hay un restaurante por aquí?** ('Is there a restaurant around here?')."
  },
  "pattern": {
    "title": "Why Specific Places Take 'Está' While 'Is There A...' Takes 'Hay'",
    "content": "Remember our golden rule from Topics 5 and 10:\n• Definite article (**el / la** — a specific place you know exists): use **¿Dónde está...?** (¿Dónde está el hotel central?).\n• Indefinite article (**un / una** — asking if one exists nearby): use **¿Hay...?** (¿Hay un hotel por aquí?)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "where is the station? (specific → está)",
          "german": "¿dónde está la estación?"
        },
        {
          "id": "p2",
          "english": "is there a hotel around here? (indefinite → hay)",
          "german": "¿hay un hotel por aquí?"
        },
        {
          "id": "p3",
          "english": "it is here",
          "german": "está aquí"
        },
        {
          "id": "p4",
          "english": "it is over there",
          "german": "está allí"
        },
        {
          "id": "p5",
          "english": "the central university",
          "german": "la universidad central"
        }
      ],
      "target_answer": "¿dónde está la estación?, ¿hay un hotel por aquí?, está aquí, está allí, la universidad central",
      "meaning": "where is the station? (specific → está), is there a hotel around here? (indefinite → hay), it is here, it is over there, the central university",
      "explanation": "Specific el/la takes ¿Dónde está...?; indefinite un/una takes ¿Hay...?",
      "id": "es5051_e1"
    },
    {
      "type": "shift_select",
      "prompt": "You want to know if there is ANY pharmacy or café nearby ('around here'). Which structure is grammatical?",
      "options": [
        "¿Hay un café por aquí?",
        "*¿Está un café por aquí?",
        "*¿Es un café para aquí?"
      ],
      "target_answer": "¿Hay un café por aquí?",
      "meaning": "Is there a café around here?",
      "explanation": "Asking whether an indefinite 'a/an' place exists uses ¿Hay un/una... por aquí?",
      "id": "es5051_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Where is the central hotel?'",
      "target_answer": "Dónde está el hotel central",
      "meaning": "Where is the central hotel?",
      "word_bank": [
        "Dónde",
        "es",
        "está",
        "central",
        "la",
        "el",
        "hay",
        "hotel"
      ],
      "explanation": "¿Dónde está el hotel central?",
      "id": "es5051_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that the train station is over there",
      "cues": [
        "The station → La estación",
        "is (location) → está",
        "over there → allí"
      ],
      "idea_parts": [
        "The station → La estación",
        "is over there → está allí"
      ],
      "target_answer": "La estación está allí",
      "meaning": "The station is over there",
      "word_bank": [
        "aquí",
        "estación",
        "es",
        "hay",
        "allí",
        "La",
        "está"
      ],
      "explanation": "La estación está allí.",
      "id": "es5051_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Hay un restaurante muy bueno por aquí",
      "replays": 2,
      "target_answer": "Hay un restaurante muy bueno por aquí",
      "meaning": "There is a very good restaurant around here",
      "cues": [
        "There is: Hay",
        "a very good restaurant: un restaurante muy bueno",
        "around here: por aquí"
      ],
      "explanation": "Hay un restaurante muy bueno por aquí.",
      "affirmation": "City navigation mastered!",
      "id": "es5051_e5"
    }
  ],
  "summary": {
    "outcome": "Ask for and give directions using ¿Dónde está el/la...? and ¿Hay un/una... por aquí?",
    "use_example": {
      "german": "¿Dónde está la estación y hay un restaurante bueno por aquí?",
      "english": "Where is the station and is there a good restaurant around here?"
    },
    "takeaway": "el/la (the specific place) → está; un/una (a place) → hay.",
    "curiosity_teaser": "Next branch ([5061] ¿Cuánto es?): master shopping, prices, and restaurant bills!"
  },
  "twist": {
    "prompt": "Assemble: 'The university is here'",
    "target_answer": "La universidad está aquí",
    "word_bank": [
      "aquí",
      "es",
      "allí",
      "está",
      "La",
      "hay",
      "universidad"
    ],
    "explanation": "La universidad está aquí."
  }
};

export default lesson;
