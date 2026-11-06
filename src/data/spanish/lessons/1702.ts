import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1702,
  "slug": "the-haber-auxiliary",
  "title": "The haber Auxiliary",
  "subtitle": "he, has, ha, hemos, han + invariable participle: describing recent and life experiences",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "he",
    "has",
    "ha",
    "hemos",
    "hablado",
    "comido",
    "hecho",
    "visto",
    "nunca",
    "hoy"
  ],
  "table_word_ids": [
    "he",
    "has",
    "ha",
    "hemos",
    "hablado",
    "comido",
    "hecho",
    "visto",
    "nunca",
    "hoy"
  ],
  "hook": {
    "title": "The Silent-H Rhythm: he, has, ha, hemos, han",
    "content": "Notice how the auxiliary forms of haber mirror the future endings of Spanish and all start with a silent h: yo he (/e/), tú has (/as/), él/ella/usted ha (/a/), nosotros hemos (/ˈemos/), ellos/ustedes han (/an/)."
  },
  "pattern": {
    "title": "When Spain Uses 'He Comido' (Today & This Week)",
    "content": "In Spain (especially Madrid), any completed action inside a time window that is STILL OPEN — like hoy ('today'), esta mañana ('this morning'), or esta semana ('this week') — uses he + participle: Hoy he comido un bocadillo!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I have spoken",
          "german": "he hablado"
        },
        {
          "id": "p2",
          "english": "you have eaten",
          "german": "has comido"
        },
        {
          "id": "p3",
          "english": "she has done / made",
          "german": "ella ha hecho"
        },
        {
          "id": "p4",
          "english": "we have seen",
          "german": "hemos visto"
        },
        {
          "id": "p5",
          "english": "I have never seen",
          "german": "nunca he visto"
        }
      ],
      "target_answer": "he hablado, has comido, ella ha hecho, hemos visto, nunca he visto",
      "meaning": "I have spoken, you have eaten, she has done / made, we have seen, I have never seen",
      "explanation": "Never separate he/has/ha/hemos from the participle — even nunca goes outside the pair!",
      "id": "es1702_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Where does 'nunca' ('never') go in 'I have never seen that'?",
      "options": [
        "Nunca he visto eso (or No he visto eso nunca)",
        "*Nunca tengo visto eso",
        "*He nunca visto eso"
      ],
      "target_answer": "Nunca he visto eso (or No he visto eso nunca)",
      "meaning": "I have never seen that",
      "explanation": "Because he visto is an unbreakable unit, nunca stands before he (or after the participle).",
      "id": "es1702_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'She has spoken with my mother'",
      "target_answer": "Ella ha hablado con mi madre",
      "meaning": "She has spoken with my mother",
      "word_bank": [
        "madre",
        "mi",
        "Ella",
        "ha",
        "hablado",
        "tiene",
        "con",
        "he",
        "has"
      ],
      "explanation": "Ella ha hablado con mi madre.",
      "id": "es1702_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that we have done everything today ('We have done it today')",
      "cues": [
        "It (walks before hemos) → Lo",
        "we have done → hemos hecho",
        "today → hoy"
      ],
      "idea_parts": [
        "It → Lo",
        "we have done → hemos hecho",
        "today → hoy"
      ],
      "target_answer": "Lo hemos hecho hoy",
      "meaning": "We have done it today",
      "word_bank": [
        "hoy",
        "hemos",
        "Tenemos",
        "he",
        "Lo",
        "hecho",
        "visto"
      ],
      "explanation": "Lo hemos hecho hoy.",
      "id": "es1702_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Hoy he comido muy bien",
      "replays": 2,
      "target_answer": "Hoy he comido muy bien",
      "meaning": "Today I have eaten very well",
      "cues": [
        "Today: Hoy",
        "I have eaten: he comido",
        "very well: muy bien"
      ],
      "explanation": "Hoy he comido muy bien.",
      "affirmation": "Auxiliary haber + participle mastered!",
      "id": "es1702_e5"
    }
  ],
  "summary": {
    "outcome": "Use he, has, ha, hemos with participles while keeping adverbs and pronouns outside the auxiliary-participle pair.",
    "use_example": {
      "german": "Nunca he visto eso, pero hoy lo hemos hecho.",
      "english": "I have never seen that, but today we have done it."
    },
    "takeaway": "Keep haber + participle welded together — place no, nunca, and pronouns in front of haber.",
    "curiosity_teaser": "Up next ([18] The Preterite: The Dot in Time): learn how a single accent mark separates 'I speak' (hablo) from 'he spoke' (habló)!"
  },
  "twist": {
    "prompt": "Assemble: 'Have you eaten today?'",
    "target_answer": "Has comido hoy",
    "word_bank": [
      "He",
      "comido",
      "comer",
      "Tienes",
      "hoy",
      "Has"
    ],
    "explanation": "¿Has comido hoy?"
  }
};

export default lesson;
