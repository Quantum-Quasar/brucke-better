import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1402,
  "slug": "disambiguating-su",
  "title": "Disambiguating su",
  "subtitle": "Why su hermano means 'his, her, your (usted), or their brother' and how Spanish clarifies it",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "su",
    "hermano",
    "padre",
    "madre",
    "amigo",
    "casa",
    "libro",
    "usted",
    "de"
  ],
  "table_word_ids": [
    "su",
    "hermano",
    "padre",
    "madre",
    "amigo",
    "casa",
    "libro",
    "usted",
    "de"
  ],
  "hook": {
    "title": "The Five-in-One Word: su / sus",
    "content": "Because él ('he'), ella ('she'), usted ('you' formal), and ellos/ellas/ustedes ('they / you all') all share the 3rd person, they all share the exact same possessive: su (singular possession) and sus (plural possessions)! So su casa can mean 'his house', 'her house', 'your (formal) house', or 'their house'!"
  },
  "pattern": {
    "title": "How to Clarify When Context Isn't Enough: de él, de ella, de usted",
    "content": "Usually the conversation makes it obvious whose house it is. When you need to disambiguate, Spanish simply uses the article + noun + de ('of'): la casa de ella ('her house'), el libro de él ('his book'), la reservación de usted ('your reservation')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "his / her / your (usted) / their book",
          "german": "su libro"
        },
        {
          "id": "p2",
          "english": "his / her / your (usted) / their books",
          "german": "sus libros"
        },
        {
          "id": "p3",
          "english": "her house (clarified)",
          "german": "la casa de ella"
        },
        {
          "id": "p4",
          "english": "his brother (clarified)",
          "german": "el hermano de él"
        },
        {
          "id": "p5",
          "english": "your (formal) reservation",
          "german": "su reservación"
        }
      ],
      "target_answer": "su libro, sus libros, la casa de ella, el hermano de él, su reservación",
      "meaning": "his / her / your (usted) / their book, his / her / your (usted) / their books, her house (clarified), his brother (clarified), your (formal) reservation",
      "explanation": "su/sus agrees in number with the possession (su libro vs sus libros), regardless of how many owners there are!",
      "id": "es1402_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Two brothers own ONE house together. How do you say 'their house' using su/sus?",
      "options": [
        "sus casas",
        "su casa (singular because there is only ONE house!)",
        "sus casa"
      ],
      "target_answer": "su casa (singular because there is only ONE house!)",
      "meaning": "their house",
      "explanation": "Even when there are multiple owners ('their'), one single house takes singular su: su casa!",
      "id": "es1402_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble in Spanish: 'María has her book':",
      "target_answer": "María tiene su libro",
      "meaning": "María has her (or his/your) book",
      "word_bank": [
        "sus",
        "la",
        "libro",
        "libros",
        "tiene",
        "su",
        "María"
      ],
      "explanation": "María tiene su libro — one book takes singular su.",
      "id": "es1402_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "ask politely (using usted): 'Do you have your ticket?'",
      "cues": [
        "Do you have (usted) → ¿Tiene usted",
        "your (usted possessive) ticket → su billete?"
      ],
      "idea_parts": [
        "Do you (formal) have → Tiene usted",
        "your ticket → su billete"
      ],
      "target_answer": "Tiene usted su billete",
      "meaning": "Do you (formal) have your ticket?",
      "word_bank": [
        "sus",
        "Tiene",
        "Tienes",
        "billete",
        "su",
        "tu",
        "usted"
      ],
      "explanation": "¿Tiene usted su billete? — usted always pairs with su/sus, never tu/tus!",
      "diagnosis": {
        "slip": "used tu billete with usted",
        "cue": "Because usted is 3rd-person ('Your Mercy'), its possessive is su/sus: ¿Tiene usted su billete?"
      },
      "id": "es1402_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Ellos tienen sus libros",
      "replays": 2,
      "target_answer": "Ellos tienen sus libros",
      "meaning": "They have their books",
      "cues": [
        "They have: Ellos tienen",
        "their (plural books): sus",
        "books: libros"
      ],
      "explanation": "Ellos tienen sus libros — sus is plural because libros is plural.",
      "affirmation": "You nailed sus libros!",
      "id": "es1402_e5"
    }
  ],
  "summary": {
    "outcome": "Use su/sus across his, her, your (usted), and their, matching number strictly to the thing owned.",
    "use_example": {
      "german": "¿Tiene usted su billete y sus llaves?",
      "english": "Do you (formal) have your ticket and your keys?"
    },
    "takeaway": "One house owned by ten people is still singular su casa; ten books owned by one person is plural sus libros!",
    "curiosity_teaser": "Up next ([1403] Three Distances of Space: este, ese & aquel): discover how Spanish divides physical space into 'near me', 'near you', and 'over yonder'."
  },
  "twist": {
    "prompt": "Assemble: 'She has her keys'",
    "target_answer": "Ella tiene sus llaves",
    "word_bank": [
      "su",
      "sus",
      "llave",
      "tiene",
      "mis",
      "llaves",
      "Ella"
    ],
    "explanation": "Plural llaves requires plural sus: sus llaves."
  }
};

export default lesson;
