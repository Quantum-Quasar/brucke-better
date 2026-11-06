import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 30,
  "slug": "capstone-el-puente-reading",
  "title": "Capstone: El Puente Reading",
  "subtitle": "One connected Madrid story synthesizing all 9 conversion bridges and key structures",
  "phase": 5,
  "shift_categories": [
    "cion",
    "dad",
    "mente",
    "ar_engine",
    "ico",
    "al",
    "f_to_h",
    "ct_to_ch",
    "pl_cl_fl_to_ll"
  ],
  "word_ids": [
    "ciudad",
    "universidad",
    "tradición",
    "confirmación",
    "perfectamente",
    "mágico",
    "central",
    "hecho",
    "lleno",
    "gustar",
    "gustaría",
    "conocer"
  ],
  "table_word_ids": [
    "ciudad",
    "universidad",
    "tradición",
    "confirmación",
    "perfectamente",
    "mágico",
    "central",
    "hecho",
    "lleno",
    "gustar",
    "gustaría",
    "conocer"
  ],
  "hook": {
    "title": "Look How Far Across the Bridge You Have Walked",
    "content": "Thirty topics ago, you started with el pastel, el café, and lo quiero. Today you command all **9 conversion and sound-shift families** (-ción, -dad, -mente, -ar, -ico, -al, f→h, ct→ch, pl/cl→ll), both verbs for 'to be' (ser vs estar), all three past perspectives (he hablado, hablé/fue, hablaba/era/estaba), the near future (voy a), double object pronouns (me lo, se lo), the personal 'a', saber vs conocer, gustar/encantar, the conditional (-ía), and the opposite-vowel subjunctive!"
  },
  "pattern": {
    "title": "Reading & Producing Connected Spanish Without Translating Word-by-Word",
    "content": "Notice how all these pieces flow together effortlessly in a real Madrid narrative: *Actualmente vivo en Madrid, una ciudad mágica y hermosa. Conozco a muchos amigos en la universidad central. Ayer confirmé la reservación, fuimos al restaurante y comimos muy bien. ¡Me encanta hablar español!*"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "-tion → -ción (100% feminine)",
          "german": "la confirmación / la tradición"
        },
        {
          "id": "p2",
          "english": "-ty → -dad (100% feminine)",
          "german": "la ciudad / la universidad"
        },
        {
          "id": "p3",
          "english": "feminine adj. + -mente (-ly)",
          "german": "perfectamente / exactamente"
        },
        {
          "id": "p4",
          "english": "-ic → accented -ico & -al → invariable -al",
          "german": "mágico / central"
        },
        {
          "id": "p5",
          "english": "f→h, ct→ch, pl/cl→ll shifts",
          "german": "hecho / noche / lleno"
        },
        {
          "id": "p6",
          "english": "inverted liking & polite conditional",
          "german": "me encanta / me gustaría"
        }
      ],
      "target_answer": "la confirmación / la tradición, la ciudad / la universidad, perfectamente / exactamente, mágico / central, hecho / noche / lleno, me encanta / me gustaría",
      "meaning": "-tion → -ción (100% feminine), -ty → -dad (100% feminine), feminine adj. + -mente (-ly), -ic → accented -ico & -al → invariable -al, f→h, ct→ch, pl/cl→ll shifts, inverted liking & polite conditional",
      "explanation": "All 9 conversion bridges and core grammatical engines work as one integrated system.",
      "id": "es30_e1"
    },
    {
      "type": "shift_select",
      "prompt": "In 'Actualmente vivo en Madrid desde hace dos años', why is 'vivo' in the present tense and what does 'actualmente' mean?",
      "options": [
        "actualmente means 'formerly'",
        "actualmente means 'currently', and Spanish uses the present tense (vivo) with desde hace for actions that began in the past and continue right now!",
        "actualmente means 'actually', and vivo is past tense"
      ],
      "target_answer": "actualmente means 'currently', and Spanish uses the present tense (vivo) with desde hace for actions that began in the past and continue right now!",
      "meaning": "Currently I have lived in Madrid for two years",
      "explanation": "Two signature Spanish rules in one sentence: false friend actualmente ('currently') + present-tense duration with desde hace!",
      "id": "es30_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I love this magical city and I understand what you say'",
      "target_answer": "Me encanta esta ciudad mágica y comprendo lo que dices",
      "meaning": "I love this magical city and I understand what you say",
      "word_bank": [
        "encanta",
        "esta",
        "ciudad",
        "mágico",
        "comprendo",
        "mágica",
        "lo",
        "este",
        "que",
        "dices",
        "Me",
        "y",
        "encantan"
      ],
      "explanation": "Me encanta esta ciudad mágica + y comprendo lo que dices.",
      "id": "es30_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say: 'I have the confirmation and I am going to give it to him today'",
      "cues": [
        "I have the confirmation → Tengo la confirmación",
        "and I am going to give it (fem. la!) to him (le → se!) today → y se la voy a dar hoy"
      ],
      "idea_parts": [
        "I have the confirmation → Tengo la confirmación",
        "and I am going to give it to him today → y se la voy a dar hoy"
      ],
      "target_answer": "Tengo la confirmación y se la voy a dar hoy",
      "meaning": "I have the confirmation and I am going to give it to him today",
      "word_bank": [
        "la",
        "voy",
        "se",
        "hoy",
        "Tengo",
        "lo",
        "le",
        "dar",
        "confirmación",
        "y",
        "a",
        "de",
        "la"
      ],
      "explanation": "Tengo la confirmación y se la voy a dar hoy — combining tener, -ción, se la, and ir a + infinitive!",
      "diagnosis": {
        "slip": "used se lo instead of se la for la confirmación",
        "cue": "Because la confirmación is feminine, 'it' is la: se la voy a dar."
      },
      "id": "es30_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Me gustaría visitar la universidad central mañana",
      "replays": 2,
      "target_answer": "Me gustaría visitar la universidad central mañana",
      "meaning": "I would like to visit the central university tomorrow",
      "cues": [
        "I would like: Me gustaría",
        "to visit the university: visitar la universidad",
        "central tomorrow: central mañana"
      ],
      "explanation": "Me gustaría visitar la universidad central mañana.",
      "affirmation": "You just synthesized the conditional, -ar verb, -dad noun, and -al adjective in one breath!",
      "id": "es30_e5"
    }
  ],
  "summary": {
    "outcome": "Synthesize all 9 Spanish conversion bridges and core grammatical structures in connected reading and production.",
    "use_example": {
      "german": "Me encanta esta ciudad mágica, comprendo perfectamente lo que dices y se lo voy a explicar a mi amigo.",
      "english": "I love this magical city, I understand perfectly what you say, and I am going to explain it to my friend."
    },
    "takeaway": "You don't memorize Spanish — you reconstruct it live from the Latin and structural bridges you already own.",
    "curiosity_teaser": "Up next ([3001] A Day in Madrid: Reading): read and build a connected narrative through a full day in Madrid."
  },
  "twist": {
    "prompt": "Assemble: 'Hopefully you have a fantastic day!'",
    "target_answer": "Ojalá tengas un día fantástico",
    "word_bank": [
      "día",
      "fantástica",
      "Ojalá",
      "fantástico",
      "una",
      "tienes",
      "tengas",
      "un"
    ],
    "explanation": "¡Ojalá tengas un día fantástico!"
  },
  "payoff": {
    "ofLesson": 1,
    "text": "From 'Quiero el pastel' and 'Lo quiero' in Topic 1 to 'Tengo la confirmación y se la voy a dar hoy' in Topic 30 — the bridge is yours!"
  }
};

export default lesson;
