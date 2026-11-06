import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5151,
  "slug": "cabeza-mano-corazon-body",
  "title": "La Cabeza, La Mano & El Corazón",
  "subtitle": "Why la mano is feminine despite -o, and expressing aches with me duele la cabeza",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "cabeza",
    "mano",
    "corazón",
    "me",
    "te",
    "le",
    "de",
    "con",
    "el",
    "la"
  ],
  "table_word_ids": [
    "cabeza",
    "mano",
    "corazón",
    "me",
    "te",
    "le",
    "de",
    "con",
    "el",
    "la"
  ],
  "hook": {
    "title": "Meet Spanish's Famous Feminine Rebel in '-o': La Mano!",
    "content": "In Topic 9 and Topic 10 you met masculine words ending in -a: *el día* (from Latin 5th-declension masculine *diēs*) and *el problema* (from Greek neuter *-ma*). Now meet their mirror image: **la mano** ('the hand', plural **las manos**)! Why is *la mano* feminine even though it ends in **-o**? Because in Latin, *manus* (root of English *manual*, *manuscript*, *manufacture*) belonged to the 4th declension and was 100% feminine! Spanish kept both its -o vowel and its feminine gender: **la mano, una mano, las manos**!"
  },
  "pattern": {
    "title": "Talking About the Body: Definite Articles Instead of 'My / Your'",
    "content": "When talking about parts of your own body (**la cabeza** 'the head', **la mano** 'the hand', **el corazón** 'the heart', cousin of English *core* and *cordial*), Spanish uses the definite article (**el / la**) instead of *mi / tu*: **Me duele la cabeza** ('My head hurts', lit. 'To-me hurts the head')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the head (captain / capital)",
          "german": "la cabeza"
        },
        {
          "id": "p2",
          "english": "the hand (feminine rebel in -o!)",
          "german": "la mano"
        },
        {
          "id": "p3",
          "english": "the hands (feminine plural)",
          "german": "las manos"
        },
        {
          "id": "p4",
          "english": "the heart (core / cordial)",
          "german": "el corazón"
        },
        {
          "id": "p5",
          "english": "my head hurts / I have a headache",
          "german": "me duele la cabeza"
        }
      ],
      "target_answer": "la cabeza, la mano, las manos, el corazón, me duele la cabeza",
      "meaning": "the head (captain / capital), the hand (feminine rebel in -o!), the hands (feminine plural), the heart (core / cordial), my head hurts / I have a headache",
      "explanation": "la mano is feminine despite ending in -o; body parts use el/la with me/te/le.",
      "id": "es5151_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish el corazón ('the heart', from Latin cor) shares its root with which warm English adjective meaning 'heartfelt, warm, and friendly' (as in 'a ___ welcome')?",
      "target_answer": "cordial",
      "meaning": "a cordial welcome is literally a Welcome 'from the heart' (cor / corazón)!",
      "explanation": "Latin cor, cordis ('heart') gave English core, courage, cordial, record ('call back to the heart'), and Spanish corazón.",
      "id": "es5151_e2"
    },
    {
      "type": "shift_select",
      "prompt": "Which phrase is 100% grammatically accurate for 'my cold hands' / 'the small hand'?",
      "options": [
        "*el mano pequeño / los manos fríos",
        "*la mano pequeño",
        "la mano pequeña / las manos frías"
      ],
      "target_answer": "la mano pequeña / las manos frías",
      "meaning": "the small hand / the cold hands",
      "explanation": "Because la mano is feminine, its articles and adjectives are always feminine: la mano pequeña, las manos frías!",
      "id": "es5151_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'My head hurts today'",
      "target_answer": "Me duele la cabeza hoy",
      "meaning": "My head hurts today",
      "word_bank": [
        "cabeza",
        "Me",
        "mi",
        "duele",
        "el",
        "la",
        "hoy",
        "gusta"
      ],
      "explanation": "Me duele + la cabeza + hoy.",
      "id": "es5151_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Me duele mucho la cabeza hoy",
      "replays": 2,
      "target_answer": "Me duele mucho la cabeza hoy",
      "meaning": "My head hurts a lot today",
      "cues": [
        "To me hurts: Me duele",
        "a lot: mucho",
        "the head today: la cabeza hoy"
      ],
      "explanation": "Me duele mucho la cabeza hoy.",
      "affirmation": "La mano and body expressions mastered!",
      "id": "es5151_e5"
    }
  ],
  "summary": {
    "outcome": "Use la cabeza, feminine la mano, and el corazón with definite articles and doler.",
    "use_example": {
      "german": "Me duele la cabeza hoy y tengo las manos frías.",
      "english": "My head hurts today and my hands are cold."
    },
    "takeaway": "el día and el problema are masculine in -a; la mano is feminine in -o!",
    "curiosity_teaser": "Up next ([5152] El Abrigo, El Vestido & Los Colores): describe clothing and colors with llevar!"
  },
  "twist": {
    "prompt": "Assemble: 'I have cold hands (Tengo las manos frías)'",
    "target_answer": "Tengo las manos frías",
    "word_bank": [
      "manos",
      "los",
      "Tengo",
      "frías",
      "fríos",
      "las",
      "el"
    ],
    "explanation": "Tengo las manos frías — feminine plural las + frías agrees with manos!"
  }
};

export default lesson;
