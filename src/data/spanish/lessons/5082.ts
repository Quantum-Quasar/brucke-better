import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5082,
  "slug": "lesson-5082",
  "title": "De la Tarde a la Noche",
  "subtitle": "por la mañana, por la noche — stamp the reflexive day with clockwork",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "levantarse",
    "acostarse",
    "por",
    "mañana",
    "noche",
    "buenas_tardes"
  ],
  "table_word_ids": [
    "levantarse",
    "acostarse",
    "por",
    "mañana",
    "noche",
    "buenas_tardes"
  ],
  "hook": {
    "title": "The Day, Told in Order",
    "content": "Lesson 5081 chained the reflexive day: me levanto, me lavo, me acuesto. Now stamp each link with the time it happens: Por la mañana me levanto, por la noche me acuesto. The motive-path preposition por turns into a clock word — 'through the morning, through the night'.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Greeting the clock",
        "content": "The greetings match the clock: buenos días opens the morning, buenas tardes covers the afternoon and evening, buenas noches closes the night. One day, three hellos.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "por la + Time of Day",
    "content": "por la mañana (in the morning), por la tarde (in the afternoon), por la noche (at night) — por measures the day the old way, 'through' each stretch of time, and the reflexive pair keeps walking inside it.",
    "linguist_note": "por la mañana reads literally as 'through the morning' — the same por that pays for things and walks streets.",
    "trap_note": "The reflexive pair still travels together: por la noche me acuesto — the time phrase never separates me from acuesto."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each clock-and-routine phrase with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "in the morning",
          "german": "por la mañana"
        },
        {
          "id": "p2",
          "english": "at night",
          "german": "por la noche"
        },
        {
          "id": "p3",
          "english": "I get up",
          "german": "me levanto"
        },
        {
          "id": "p4",
          "english": "I go to bed",
          "german": "me acuesto"
        },
        {
          "id": "p5",
          "english": "good afternoon",
          "german": "buenas tardes"
        }
      ],
      "target_answer": "por la mañana, por la noche, me levanto, me acuesto, buenas tardes",
      "meaning": "in the morning, at night, I get up, I go to bed, good afternoon",
      "explanation": "The day in five links: two clock phrases, two reflexives, one greeting.",
      "id": "es5082_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Say 'in the morning':",
      "options": [
        "por la mañana",
        "para la mañana",
        "por el mañana"
      ],
      "target_answer": "por la mañana",
      "meaning": "in the morning",
      "explanation": "por la mañana — the clock takes por, and mañana is feminine so it takes la.",
      "id": "es5082_e2"
    },
    {
      "type": "derive",
      "prompt": "Write the reflexive for 'I go to bed' — acostarse in the yo-form:",
      "english_hint": "the o-ue boot: acostarse → me acuesto",
      "target_answer": "me acuesto",
      "meaning": "I go to bed",
      "explanation": "me acuesto — the boot verb acostarse with its pronoun and its o→ue jump.",
      "id": "es5082_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say: in the morning I get up",
      "cues": [
        "the clock phrase: por la mañana",
        "the pair: me levanto"
      ],
      "idea_parts": [
        "in the morning → Por la mañana",
        "I get up → me levanto"
      ],
      "target_answer": "Por la mañana me levanto",
      "meaning": "In the morning I get up",
      "word_bank": [
        "Por",
        "la",
        "mañana",
        "me",
        "levanto",
        "acuesto",
        "noche"
      ],
      "explanation": "Por la mañana me levanto — clock first, reflexive second, pair intact.",
      "diagnosis": {
        "slip": "swapped por for para",
        "cue": "The clock measures 'through' the day — por la mañana, por la noche."
      },
      "id": "es5082_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Por la noche me acuesto",
      "replays": 2,
      "target_answer": "Por la noche me acuesto",
      "meaning": "At night I go to bed",
      "cues": [
        "It means: At night I go to bed",
        "The pair: me acuesto"
      ],
      "explanation": "Por la noche me acuesto — the day's last link, stamped with the clock.",
      "affirmation": "You wrote the day's final reflexive with its clockwork around it.",
      "id": "es5082_e5"
    }
  ],
  "summary": {
    "outcome": "Order a full day with por la mañana / por la noche around the reflexive routine.",
    "use_example": {
      "german": "Por la noche me acuesto",
      "english": "At night I go to bed"
    },
    "takeaway": "por turns the day into a schedule; the reflexive pair keeps walking.",
    "curiosity_teaser": "Up next ([25] Gustar: The Inverted Liking): flip liking upside-down — me gusta el café is 'the coffee pleases me'!"
  },
  "twist": {
    "prompt": "Think it through again without looking back — say: at night I go to bed:",
    "target_answer": "Por la noche me acuesto",
    "word_bank": [
      "Por",
      "la",
      "noche",
      "me",
      "acuesto",
      "mañana",
      "levanto"
    ],
    "explanation": "Rebuilding \"Por la noche me acuesto\" — clock phrase, reflexive pair, done."
  }
};

export default lesson;
