import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 18,
  "slug": "preterite-dot-in-time",
  "title": "The Preterite: The Dot in Time",
  "subtitle": "hablé, comí, fue — completed single past events bounded in time",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "hablé",
    "comí",
    "fue",
    "ayer",
    "visitar",
    "celebrar",
    "comer",
    "vivir",
    "ser",
    "ir"
  ],
  "table_word_ids": [
    "hablé",
    "comí",
    "fue",
    "ayer",
    "visitar",
    "celebrar",
    "comer",
    "vivir",
    "ser",
    "ir"
  ],
  "hook": {
    "title": "One Word for a Completed Dot on the Timeline",
    "content": "When an action happened at a closed, finished point in the past — like ayer ('yesterday'), anoche ('last night'), or el lunes pasado ('last Monday') — Spanish uses a crisp one-word past tense called the Preterite (el pretérito indefinido). For -ar verbs, 'I [verb]-ed' ends in stressed -é (hablé 'I spoke', visité 'I visited') and 'he/she/usted [verb]-ed' ends in stressed -ó (habló 'he/she spoke', visitó 'he/she visited'). For -er and -ir verbs, 'I [verb]-ed' ends in stressed -í (comí 'I ate', viví 'I lived') and 3rd person ends in -ió (comió, vivió)!"
  },
  "pattern": {
    "title": "How One Accent Mark Separates Present from Past!",
    "content": "Look at the genius of Spanish stress: HAB-lo (stress on first syllable, no accent) means 'I speak' (present). ha-BLÓ (stress on final ó, with an accent) means 'he/she/usted spoke' (past)! Never treat the written accent mark in the preterite as optional — it carries the entire tense!",
    "linguist_note": "Latin perfecthabuī/amāvī contracted into -é/-aste/-ó/-amos/-aron in Castilian.",
    "trap_note": "Notice that fue (one syllable) has NO accent mark because one-syllable words in Spanish don't need an accent to show which syllable is stressed!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I spoke (yesterday)",
          "german": "hablé"
        },
        {
          "id": "p2",
          "english": "I ate (yesterday)",
          "german": "comí"
        },
        {
          "id": "p3",
          "english": "it was / he went (shared preterite of ser & ir!)",
          "german": "fue"
        },
        {
          "id": "p4",
          "english": "yesterday",
          "german": "ayer"
        },
        {
          "id": "p5",
          "english": "I speak (present, no accent) vs he spoke (past, accented)",
          "german": "hablo vs habló"
        }
      ],
      "target_answer": "hablé, comí, fue, ayer, hablo vs habló",
      "meaning": "I spoke (yesterday), I ate (yesterday), it was / he went (shared preterite of ser & ir!), yesterday, I speak (present, no accent) vs he spoke (past, accented)",
      "explanation": "-ar preterite: -é / -ó; -er/-ir preterite: -í / -ió; ser & ir share fue.",
      "id": "es18_e1"
    },
    {
      "type": "shift_select",
      "prompt": "What is the difference between 'hablo' (no accent) and 'habló' (with an acute accent)?",
      "options": [
        "Both mean 'I spoke'",
        "hablo = 'I speak' (present); habló = 'he/she/usted spoke' (preterite past)",
        "hablo = 'he spoke'; habló = 'I speak'"
      ],
      "target_answer": "hablo = 'I speak' (present); habló = 'he/she/usted spoke' (preterite past)",
      "meaning": "I speak vs he/she spoke",
      "explanation": "Without the accent, stress falls on HAB-lo ('I speak'); with the accent, stress jumps to ha-BLÓ ('he/she spoke')!",
      "id": "es18_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Yesterday I spoke with my mother'",
      "target_answer": "Ayer hablé con mi madre",
      "meaning": "Yesterday I spoke with my mother",
      "word_bank": [
        "Ayer",
        "he",
        "mi",
        "mañana",
        "con",
        "madre",
        "hablé",
        "hablaba"
      ],
      "explanation": "Ayer ('Yesterday' — closed past dot) triggers the preterite hablé.",
      "id": "es18_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that yesterday you ate at this restaurant",
      "cues": [
        "Yesterday → Ayer",
        "I ate (-er preterite in -í) → comí",
        "at/in this restaurant → en este restaurante"
      ],
      "idea_parts": [
        "Yesterday I ate → Ayer comí",
        "at this restaurant → en este restaurante"
      ],
      "target_answer": "Ayer comí en este restaurante",
      "meaning": "Yesterday I ate at this restaurant",
      "word_bank": [
        "comí",
        "este",
        "ese",
        "en",
        "comido",
        "restaurante",
        "como",
        "Ayer"
      ],
      "explanation": "Ayer comí en este restaurante — comí is the 1st-person preterite of comer.",
      "diagnosis": {
        "slip": "used como or he comido with Ayer",
        "cue": "With closed past markers like ayer ('yesterday'), use the one-word preterite: Ayer comí."
      },
      "id": "es18_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Ayer fue un día fantástico",
      "replays": 2,
      "target_answer": "Ayer fue un día fantástico",
      "meaning": "Yesterday was a fantastic day",
      "cues": [
        "Yesterday: Ayer",
        "was (preterite of ser): fue",
        "a fantastic day: un día fantástico"
      ],
      "explanation": "Ayer fue un día fantástico — fue is the 3rd-person preterite of both ser and ir!",
      "affirmation": "Preterite dot in time mastered!",
      "id": "es18_e5"
    }
  ],
  "summary": {
    "outcome": "Express completed past events with -ar (-é/-ó) and -er/-ir (-í/-ió) preterite forms and fue.",
    "use_example": {
      "german": "Ayer hablé con mi amigo y comí en el restaurante.",
      "english": "Yesterday I spoke with my friend and ate at the restaurant."
    },
    "takeaway": "In the preterite, the written accent on -é, -ó, -í, -ió is the engine of the past tense.",
    "curiosity_teaser": "Up next ([1801] -ar Preterite Endings): master the -ar preterite paradigm and why nosotros (hablamos) uses context to show tense."
  },
  "twist": {
    "prompt": "Assemble: 'Yesterday it was fantastic'",
    "target_answer": "Ayer fue fantástico",
    "word_bank": [
      "mañana",
      "es",
      "fue",
      "está",
      "Ayer",
      "fantástico"
    ],
    "explanation": "Ayer fue fantástico."
  },
  "foreshadow": {
    "line": "If the Preterite is a snapshot dot in time ('yesterday I spoke'), how do you paint an ongoing video background in the past ('I was speaking, I used to live')? Topic 19 unveils the Imperfect!",
    "resolvedIn": 19
  },
  "payoff": {
    "ofLesson": 17,
    "text": "Compare Topic 17 (Hoy he hablado 'Today I have spoken' — open time window) with Topic 18 (Ayer hablé 'Yesterday I spoke' — closed dot in time)."
  }
};

export default lesson;
