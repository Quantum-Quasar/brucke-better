import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5031,
  "slug": "actualmente-libreria-false-friends",
  "title": "Actualmente, Librería & Co.",
  "subtitle": "Key false friends in contrastive recall drills: actualmente, librería, éxito, asistir, recordar, sensible, sopa, embarazada",
  "phase": 1,
  "shift_categories": [
    "mente"
  ],
  "word_ids": [
    "actualmente",
    "librería",
    "éxito",
    "asistir",
    "recordar",
    "sensible",
    "sopa",
    "embarazada",
    "momento",
    "reservación"
  ],
  "table_word_ids": [
    "actualmente",
    "librería",
    "éxito",
    "asistir",
    "recordar",
    "sensible",
    "sopa",
    "embarazada",
    "momento",
    "reservación"
  ],
  "hook": {
    "title": "Words That Look Like Allies but Tell a Different Story",
    "content": "Because English and Spanish share thousands of true Latinate cognates, a tiny group of words drifted in meaning over the centuries. Knowing these 8 classic **False Friends** early saves you from the most famous traps in Spanish:\n• **actualmente** = currently (not actually)\n• **la librería** = bookstore (not library)\n• **el éxito** = success (not exit)\n• **asistir** = to attend (not assist)\n• **recordar** = to remember (not record)\n• **sensible** = sensitive (not sensible)\n• **la sopa** = soup (not soap)\n• **embarazada** = pregnant (NEVER embarrassed)!"
  },
  "pattern": {
    "title": "Why 'Embarazada' Uses 'Está'!",
    "content": "Notice that pregnancy is a physical state, so Spanish says **Ella está embarazada** ('She is pregnant') with estar! And because recordar ('to remember', literally 'to call back to the heart', from Latin cor 'heart') is an -ar verb, you can stack it right after quiero: Quiero recordar el momento!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "currently, at present (not actually)",
          "german": "actualmente"
        },
        {
          "id": "p2",
          "english": "bookstore (not lending library)",
          "german": "la librería"
        },
        {
          "id": "p3",
          "english": "success (not exit)",
          "german": "el éxito"
        },
        {
          "id": "p4",
          "english": "to attend (not assist)",
          "german": "asistir"
        },
        {
          "id": "p5",
          "english": "to remember (not record)",
          "german": "recordar"
        },
        {
          "id": "p6",
          "english": "pregnant (not embarrassed!)",
          "german": "embarazada"
        }
      ],
      "target_answer": "actualmente, la librería, el éxito, asistir, recordar, embarazada",
      "meaning": "currently, at present (not actually), bookstore (not lending library), success (not exit), to attend (not assist), to remember (not record), pregnant (not embarrassed!)",
      "explanation": "All six look like English words with different meanings.",
      "id": "es5031_e1"
    },
    {
      "type": "shift_select",
      "prompt": "What does 'La sopa está caliente' mean in English?",
      "options": [
        "The soap is hot",
        "The soup is hot",
        "The supper is cold"
      ],
      "target_answer": "The soup is hot",
      "meaning": "The soup is hot",
      "explanation": "la sopa means 'soup' (soap is el jabón!).",
      "id": "es5031_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I want to attend'",
      "target_answer": "Quiero asistir",
      "meaning": "I want to attend (be present)",
      "word_bank": [
        "Quiero",
        "recordar",
        "asistir",
        "éxito",
        "el"
      ],
      "explanation": "Quiero asistir = 'I want to attend'.",
      "id": "es5031_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say: 'She is pregnant' (using taught 'está' + 'embarazada')",
      "cues": [
        "She is (state → estar) → Ella está",
        "pregnant (false friend!) → embarazada"
      ],
      "idea_parts": [
        "She is → Ella está",
        "pregnant → embarazada"
      ],
      "target_answer": "Ella está embarazada",
      "meaning": "She is pregnant",
      "word_bank": [
        "Ella",
        "sensible",
        "sopa",
        "es",
        "está",
        "embarazada"
      ],
      "explanation": "Ella está embarazada — state takes está, and embarazada means pregnant!",
      "id": "es5031_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "La reservación es un éxito",
      "replays": 2,
      "target_answer": "La reservación es un éxito",
      "meaning": "The reservation is a success",
      "cues": [
        "The reservation: La reservación",
        "is: es",
        "a success: un éxito"
      ],
      "explanation": "La reservación es un éxito — el éxito means 'success'!",
      "affirmation": "False friends disarmed with taught grammar!",
      "id": "es5031_e5"
    }
  ],
  "summary": {
    "outcome": "Disarm high-frequency Spanish false friends (actualmente, librería, éxito, asistir, recordar, sensible, sopa, embarazada).",
    "use_example": {
      "german": "Quiero recordar el momento porque la reservación es un éxito.",
      "english": "I want to remember the moment because the reservation is a success."
    },
    "takeaway": "actualmente = currently; librería = bookstore; éxito = success; asistir = attend; recordar = remember; embarazada = pregnant.",
    "curiosity_teaser": "Return to the main spine or continue to the next branch along the trail!"
  },
  "twist": {
    "prompt": "Assemble: 'I want to remember the moment'",
    "target_answer": "Quiero recordar el momento",
    "word_bank": [
      "éxito",
      "Quiero",
      "el",
      "recordar",
      "momento",
      "la",
      "asistir"
    ],
    "explanation": "Quiero recordar el momento."
  }
};

export default lesson;
