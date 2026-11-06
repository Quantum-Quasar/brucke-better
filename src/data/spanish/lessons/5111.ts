import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5111,
  "slug": "boot-verbs-o-ue-and-e-ie",
  "title": "o→ue & e→ie: puedo, duermo, empiezo",
  "subtitle": "Why the vowel splits inside the singular and 3rd-person plural boot, and stays single in nosotros",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "poder",
    "puedo",
    "puedes",
    "dormir",
    "empezar",
    "preferir",
    "querer",
    "tener",
    "tenemos",
    "mostrar"
  ],
  "table_word_ids": [
    "poder",
    "puedo",
    "puedes",
    "dormir",
    "empezar",
    "preferir",
    "querer",
    "tener",
    "tenemos",
    "mostrar"
  ],
  "hook": {
    "title": "Mastering the Two Diphthong Boots: o→ue and e→ie",
    "content": "Let's put our two biggest boot-verb families side by side:\n• **o → ue under stress**: **poder** ('to be able to / can' → puedo, puedes, puede, *podemos*, pueden), **dormir** ('to sleep' → duermo, duermes, duerme, *dormimos*, duermen), **mostrar** ('to show' → muestro, muestras, muestra, *mostramos*, muestran), **recordar** ('to remember' → recuerdo, *recordamos*).\n• **e → ie under stress**: **querer** (quiero, *queremos*), **tener** (tienes, *tenemos*), **empezar** ('to begin' → empiezo, empiezas, empieza, *empezamos*, empiezan), **preferir** ('to prefer' → prefiero, prefieres, prefiere, *preferimos*, prefieren)!"
  },
  "pattern": {
    "title": "The Nosotros Anchor",
    "content": "Whenever you say 'we' (nosotros), the stress lands on **-amos / -emos / -imos**, so the stem vowel NEVER splits: podemos, dormimos, mostramos, queremos, tenemos, empezamos, preferimos!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I can / we can (poder: o→ue)",
          "german": "puedo / podemos"
        },
        {
          "id": "p2",
          "english": "I sleep / we sleep (dormir: o→ue)",
          "german": "duermo / dormimos"
        },
        {
          "id": "p3",
          "english": "I show / we show (mostrar: o→ue)",
          "german": "muestro / mostramos"
        },
        {
          "id": "p4",
          "english": "I start / we start (empezar: e→ie)",
          "german": "empiezo / empezamos"
        },
        {
          "id": "p5",
          "english": "I prefer / we prefer (preferir: e→ie)",
          "german": "prefiero / preferimos"
        }
      ],
      "target_answer": "puedo / podemos, duermo / dormimos, muestro / mostramos, empiezo / empezamos, prefiero / preferimos",
      "meaning": "I can / we can (poder: o→ue), I sleep / we sleep (dormir: o→ue), I show / we show (mostrar: o→ue), I start / we start (empezar: e→ie), I prefer / we prefer (preferir: e→ie)",
      "explanation": "Inside the boot = split vowel (ue / ie); outside the boot (nosotros) = single vowel (o / e).",
      "id": "es5111_e1"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Build 'I prefer' from 'preferir' by splitting the second 'e' into 'ie' and adding '-o':",
      "tile_options": [
        "ier",
        "pref",
        "o",
        "er"
      ],
      "target_answer": "prefiero",
      "meaning": "prefiero (I prefer)",
      "explanation": "preferir splits the stressed e (the one right before -ir) into ie: prefiero!",
      "id": "es5111_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Compare 'I prefer coffee' and 'We prefer coffee'. Which pair is 100% accurate?",
      "options": [
        "Yo prefiero el café / Nosotros preferimos el café",
        "Yo prefero el café / Nosotros prefieremos el café",
        "Yo prefiero el café / Nosotros prefierimos el café"
      ],
      "target_answer": "Yo prefiero el café / Nosotros preferimos el café",
      "meaning": "I prefer coffee / We prefer coffee",
      "explanation": "Stressed stem in yo prefiero splits e→ie; unstressed stem in nosotros preferimos stays single e!",
      "id": "es5111_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I prefer the coffee, but we can drink water'",
      "target_answer": "Prefiero el café, pero podemos beber agua",
      "meaning": "I prefer the coffee, but we can drink water",
      "word_bank": [
        "la",
        "el",
        "podemos",
        "beber",
        "puedemos",
        "Prefiero",
        "Prefero",
        "café",
        "pero",
        "agua"
      ],
      "explanation": "Prefiero (stressed stem → ie) + pero podemos (unstressed stem → o).",
      "id": "es5111_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Duermo ocho horas por la noche",
      "replays": 2,
      "target_answer": "Duermo ocho horas por la noche",
      "meaning": "I sleep eight hours at night",
      "cues": [
        "I sleep (o→ue): Duermo",
        "eight hours: ocho horas",
        "at night: por la noche"
      ],
      "explanation": "Duermo ocho horas por la noche.",
      "affirmation": "Boot-verb rhythm locked in!",
      "id": "es5111_e5"
    }
  ],
  "summary": {
    "outcome": "Switch effortlessly between stressed boot forms (puedo, duermo, empiezo, prefiero) and unstressed nosotros forms (podemos, dormimos, empezamos, preferimos).",
    "use_example": {
      "german": "Prefiero el café por la mañana y duermo ocho horas por la noche.",
      "english": "I prefer coffee in the morning and I sleep eight hours at night."
    },
    "takeaway": "Follow your voice stress: stressed stem splits (ie/ue); stressed ending (-amos/-emos/-imos) stays single.",
    "curiosity_teaser": "Up next ([5112] e→i & -go Verbs: pido, digo, hago, pongo): master the e→i boot and the famous -go squad!"
  },
  "twist": {
    "prompt": "Assemble: 'Can you show me the house?'",
    "target_answer": "Me puedes mostrar la casa",
    "word_bank": [
      "el",
      "puedes",
      "muestro",
      "casa",
      "Me",
      "mostrar",
      "la",
      "podemos"
    ],
    "explanation": "¿Me puedes mostrar la casa?"
  }
};

export default lesson;
