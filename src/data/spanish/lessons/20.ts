import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 20,
  "slug": "desde-hace-present-duration",
  "title": "desde hace & Present Duration",
  "subtitle": "vivo aquí desde hace tres años — using present tense for actions that continue",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "desde",
    "vivir",
    "estar",
    "estoy",
    "aquí",
    "año",
    "semana",
    "lunes",
    "tres",
    "dos"
  ],
  "table_word_ids": [
    "desde",
    "vivir",
    "estar",
    "estoy",
    "aquí",
    "año",
    "semana",
    "lunes",
    "tres",
    "dos"
  ],
  "hook": {
    "title": "Why 'I Have Lived Here for Three Years' Is Present Tense in Spanish!",
    "content": "In English, when an action began three years ago and is STILL true today, you use a past-looking form: 'I have lived here for three years'. In Spanish (just like French depuis and German seit), speakers ask: 'Are you still living here right now? Yes! Then use the PRESENT tense!' Vivo aquí desde hace tres años (word for word: 'I live here since it-makes three years')!"
  },
  "pattern": {
    "title": "Desde (Starting Point) vs Desde Hace (Elapsed Duration)",
    "content": "• **desde + starting point ('since')**: Vivo aquí desde enero ('I have lived here since January'), Estoy aquí desde el lunes ('I have been here since Monday').\n• **desde hace + time span ('for')**: Vivo aquí desde hace tres años ('I have lived here for three years'). Never use *por or *para for ongoing duration with the present tense!",
    "linguist_note": "desde fused Latin dē + ex + dē; hace is the impersonal 3rd-person singular of hacer ('it makes [X time]').",
    "trap_note": "Never translate English 'have been here' word-for-word as *he estado aquí when you mean an unbroken state that continues right now — use simple present Estoy aquí desde...!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "since (starting point: desde enero)",
          "german": "desde"
        },
        {
          "id": "p2",
          "english": "for + duration (since it-makes: desde hace tres años)",
          "german": "desde hace"
        },
        {
          "id": "p3",
          "english": "I have lived here for three years (lit. I live here since it-makes 3 years)",
          "german": "vivo aquí desde hace tres años"
        },
        {
          "id": "p4",
          "english": "I have been here since Monday (lit. I am here since the Monday)",
          "german": "estoy aquí desde el lunes"
        }
      ],
      "target_answer": "desde, desde hace, vivo aquí desde hace tres años, estoy aquí desde el lunes",
      "meaning": "since (starting point: desde enero), for + duration (since it-makes: desde hace tres años), I have lived here for three years (lit. I live here since it-makes 3 years), I have been here since Monday (lit. I am here since the Monday)",
      "explanation": "Ongoing actions that continue into the present always use the PRESENT tense + desde / desde hace.",
      "id": "es20_e1"
    },
    {
      "type": "variant_english",
      "prompt": "Select every natural English rendering of 'Vivo aquí desde hace tres años':",
      "german": "Vivo aquí desde hace tres años",
      "meaning": "I have lived / have been living here for three years",
      "renderings": [
        "I have lived here for three years",
        "I have been living here for three years"
      ],
      "traps": [
        "I lived here three years ago and left",
        "I will live here in three years"
      ],
      "target_answer": "I have lived here for three years",
      "explanation": "Spanish uses the present tense (Vivo) with desde hace for any action that started in the past and is still continuing right now!",
      "id": "es20_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I have lived here for three years'",
      "target_answer": "Vivo aquí desde hace tres años",
      "meaning": "I have lived here for three years",
      "word_bank": [
        "tres",
        "Viví",
        "aquí",
        "desde",
        "por",
        "años",
        "para",
        "hace",
        "Vivo"
      ],
      "explanation": "Vivo (present!) + aquí + desde hace + tres años.",
      "id": "es20_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that you have been here since Monday",
      "cues": [
        "I am here (present location) → Estoy aquí",
        "since → desde",
        "Monday → el lunes"
      ],
      "idea_parts": [
        "I am here → Estoy aquí",
        "since Monday → desde el lunes"
      ],
      "target_answer": "Estoy aquí desde el lunes",
      "meaning": "I have been here since Monday",
      "word_bank": [
        "Estoy",
        "desde",
        "por",
        "lunes",
        "Estuve",
        "hace",
        "el",
        "aquí"
      ],
      "explanation": "Estoy aquí desde el lunes — starting point ('Monday') uses bare desde without hace.",
      "diagnosis": {
        "slip": "added hace before el lunes",
        "cue": "Use bare desde before a calendar starting point (desde el lunes, desde enero) and desde hace before a quantity of time (desde hace tres días)."
      },
      "id": "es20_e4"
    },
    {
      "type": "literal_gloss",
      "prompt": "Which English word-for-word blueprint mirrors Spanish 'Vivo aquí desde hace tres años'?",
      "german": "Vivo aquí desde hace tres años",
      "natural": "I have lived here for three years",
      "options": [
        "I lived here since three years",
        "I have lived here by three years",
        "I have lived here for three years",
        "I-live here since it-makes three years"
      ],
      "target_answer": "I-live here since it-makes three years",
      "meaning": "I have lived here for three years (literal Spanish blueprint: I-live here since it-makes three years)",
      "explanation": "Spanish anchors the verb in the present (Vivo) and looks back at the elapsed time with desde hace ('since it-makes').",
      "id": "es20_e5"
    }
  ],
  "summary": {
    "outcome": "Express ongoing duration ('have been doing for X time / since Y') using the present tense with desde hace and desde.",
    "use_example": {
      "german": "Vivo en Madrid desde hace tres años y estoy aquí desde el lunes.",
      "english": "I have lived in Madrid for three years and I have been here since Monday."
    },
    "takeaway": "If the action is still happening right now, keep the verb in the present tense and add desde (since point) or desde hace (for duration).",
    "curiosity_teaser": "Up next ([2001] desde vs desde hace): contrast calendar starting points with elapsed durations."
  },
  "twist": {
    "prompt": "Assemble: 'I have been here since January'",
    "target_answer": "Estoy aquí desde enero",
    "word_bank": [
      "hace",
      "enero",
      "aquí",
      "Soy",
      "por",
      "desde",
      "Estoy"
    ],
    "explanation": "Estoy aquí desde enero."
  },
  "foreshadow": {
    "line": "Next in Topic 21: how Spanish compares anything with más... que, menos... que, tan... como, and irregular mejor/peor!",
    "resolvedIn": 21
  },
  "payoff": {
    "ofLesson": 19,
    "text": "Having mastered all past tenses in Topics 17–19, Topic 20 shows you when NOT to use a past tense in Spanish!"
  }
};

export default lesson;
