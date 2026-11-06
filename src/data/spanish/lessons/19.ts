import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 19,
  "slug": "imperfect-storytelling-past",
  "title": "The Imperfect: The Storytelling Past",
  "subtitle": "hablaba, comía, era, estaba — ongoing background action, descriptions, and past habits",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "hablaba",
    "era",
    "estaba",
    "fue",
    "hablé",
    "ser",
    "estar",
    "vivir",
    "comer",
    "tiempo"
  ],
  "table_word_ids": [
    "hablaba",
    "era",
    "estaba",
    "fue",
    "hablé",
    "ser",
    "estar",
    "vivir",
    "comer",
    "tiempo"
  ],
  "hook": {
    "title": "The Line vs The Dot in the Past",
    "content": "If the Preterite (hablé, comí, fue) is a camera snapshot of a completed event ('Yesterday I spoke'), the Imperfect (el pretérito imperfecto) is a wide-angle video camera filming the ongoing background scene, how things used to be, or what was happening in the middle of an action! In English, it translates to BOTH 'I was speaking' AND 'I used to speak' — and in Spanish, it is one single, rhythmic word: hablaba!"
  },
  "pattern": {
    "title": "The Most Regular Tense in Spanish: -aba and -ía (Plus Era!)",
    "content": "Every single -ar verb in Spanish — including estar! — forms the imperfect by replacing -ar with -aba (yo hablaba, tú hablabas, él/ella/usted hablaba; yo estaba, él estaba). Every -er and -ir verb replaces -er/-ir with stressed -ía (comía 'was eating / used to eat', vivía 'was living / used to live', tenía 'had / used to have'). And ser becomes era ('was / used to be' — cousin of English 'era', an ongoing span of time)!",
    "linguist_note": "Latin imperfect -ābam survived almost unchanged as Spanish -aba; only THREE verbs in the entire Spanish language (ser → era, ir → iba, ver → veía) are irregular in the imperfect!",
    "trap_note": "Because 1st person ('I') and 3rd person ('he/she/usted') are identical in the imperfect (hablaba, estaba, era), speakers include yo or él/ella whenever context doesn't make the subject clear!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I / he / she was speaking, used to speak (-ar → -aba)",
          "german": "hablaba"
        },
        {
          "id": "p2",
          "english": "I / he / she was (ongoing trait/identity: ser)",
          "german": "era"
        },
        {
          "id": "p3",
          "english": "I / he / she was (ongoing state/location: estar)",
          "german": "estaba"
        },
        {
          "id": "p4",
          "english": "it was / he went (completed event dot: preterite)",
          "german": "fue"
        },
        {
          "id": "p5",
          "english": "I spoke (completed event dot: preterite)",
          "german": "hablé"
        }
      ],
      "target_answer": "hablaba, era, estaba, fue, hablé",
      "meaning": "I / he / she was speaking, used to speak (-ar → -aba), I / he / she was (ongoing trait/identity: ser), I / he / she was (ongoing state/location: estar), it was / he went (completed event dot: preterite), I spoke (completed event dot: preterite)",
      "explanation": "Imperfect (-aba, -ía, era, estaba) paints the ongoing line; preterite (hablé, fue) marks the completed dot.",
      "id": "es19_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish 'yo/él _____' ('was / used to be', the imperfect of ser from Latin 'erat') is spelled identically to which three-letter English noun for a long historical period?",
      "target_answer": "era",
      "meaning": "an 'era' is literally an ongoing stretch of past time — the exact job of the Spanish imperfect!",
      "explanation": "Thinking of an 'era' reminds you that era (unlike single-event fue) describes ongoing background traits in the past.",
      "id": "es19_e2"
    },
    {
      "type": "variant_english",
      "prompt": "Select every English sentence that accurately renders the Spanish imperfect 'Yo hablaba con mi amigo':",
      "german": "Yo hablaba con mi amigo",
      "meaning": "I was speaking / I used to speak with my friend",
      "renderings": [
        "I was speaking with my friend",
        "I used to speak with my friend"
      ],
      "traps": [
        "I will speak with my friend tomorrow",
        "Speak with my friend right now!"
      ],
      "target_answer": "I was speaking with my friend",
      "explanation": "One Spanish imperfect form (hablaba) covers both ongoing past action ('was speaking') and habitual past action ('used to speak')!",
      "id": "es19_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'The coffee was very hot (ongoing state in the past)'",
      "target_answer": "El café estaba muy caliente",
      "meaning": "The coffee was very hot",
      "word_bank": [
        "muy",
        "fue",
        "era",
        "El",
        "café",
        "estaba",
        "es",
        "caliente"
      ],
      "explanation": "Thermal state in the past uses the imperfect of estar: estaba.",
      "id": "es19_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that when you were here, you spoke with María ('I was here and I spoke with María')",
      "cues": [
        "I was here (ongoing background location) → Estaba aquí",
        "and I spoke (completed event dot!) → y hablé",
        "with María → con María"
      ],
      "idea_parts": [
        "I was here → Estaba aquí",
        "and I spoke → y hablé",
        "with María → con María"
      ],
      "target_answer": "Estaba aquí y hablé con María",
      "meaning": "I was here and I spoke with María",
      "word_bank": [
        "aquí",
        "Estaba",
        "María",
        "Era",
        "hablaba",
        "estoy",
        "y",
        "con",
        "hablé"
      ],
      "explanation": "Estaba aquí (background stage) + y hablé con María (the action that happened on that stage)!",
      "diagnosis": {
        "slip": "used fue instead of Estaba for location",
        "cue": "Ongoing past location always uses estaba."
      },
      "id": "es19_e5"
    }
  ],
  "summary": {
    "outcome": "Form the imperfect (-aba, -ía, era, estaba) and contrast ongoing background lines with preterite event dots.",
    "use_example": {
      "german": "La casa era grande, el café estaba caliente y hablé con mi amigo.",
      "english": "The house was big, the coffee was hot, and I spoke with my friend."
    },
    "takeaway": "-aba (all -ar verbs, including estaba) and era paint the ongoing past canvas; hablé and fue mark the events.",
    "curiosity_teaser": "Up next ([1901] -aba and -ía Paradigms): see why yo and él/ella/usted share the exact same imperfect form."
  },
  "twist": {
    "prompt": "Assemble: 'It was a beautiful city (background description)'",
    "target_answer": "Era una ciudad hermosa",
    "word_bank": [
      "Es",
      "ciudad",
      "hermosa",
      "Estaba",
      "una",
      "Era",
      "hermoso"
    ],
    "explanation": "Era una ciudad hermosa."
  },
  "foreshadow": {
    "line": "What if an action started in the past ('three years ago') and is STILL happening right now? In Topic 20, you'll see why Spanish keeps it in the PRESENT tense with desde hace!",
    "resolvedIn": 20
  },
  "payoff": {
    "ofLesson": 18,
    "text": "With Topic 18's Preterite (the dot) and Topic 19's Imperfect (the line), you now command the complete two-camera system of Spanish past storytelling."
  }
};

export default lesson;
