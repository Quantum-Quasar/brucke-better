import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1501,
  "slug": "numbers-1-to-30",
  "title": "Numbers 1 to 30",
  "subtitle": "uno, dos, tres to treinta: foundational counting and diphthong twins siete (7), nueve (9), diez (10)",
  "phase": 3,
  "shift_categories": [],
  "word_ids": [
    "uno",
    "dos",
    "tres",
    "cuatro",
    "cinco",
    "seis",
    "siete",
    "ocho",
    "nueve",
    "diez",
    "veinte",
    "treinta"
  ],
  "table_word_ids": [
    "uno",
    "dos",
    "tres",
    "cuatro",
    "cinco",
    "seis",
    "siete",
    "ocho",
    "nueve",
    "diez",
    "veinte",
    "treinta"
  ],
  "hook": {
    "title": "Why 'Uno' Drops Its '-o' Before Masculine Nouns",
    "content": "When counting alone ('one, two, three'), you say uno, dos, tres. The moment uno stands before a masculine noun, it drops its -o and becomes un: un café ('one coffee / a coffee'), veintiún años ('twenty-one years'). Before a feminine noun, it becomes una: una mesa ('one table / a table')!"
  },
  "pattern": {
    "title": "Recognizing Latin Roots Across 1 to 30",
    "content": "dos (duet), tres (trio), cuatro (quartet), cinco (quintet), seis (sextet), siete (September), ocho (octave, -ct- → -ch-), nueve (November), diez (decimal), veinte (vigesimal), treinta (thirty)."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "two / three",
          "german": "dos / tres"
        },
        {
          "id": "p2",
          "english": "four / five",
          "german": "cuatro / cinco"
        },
        {
          "id": "p3",
          "english": "six / seven",
          "german": "seis / siete"
        },
        {
          "id": "p4",
          "english": "eight / nine",
          "german": "ocho / nueve"
        },
        {
          "id": "p5",
          "english": "ten",
          "german": "diez"
        },
        {
          "id": "p6",
          "english": "twenty / thirty",
          "german": "veinte / treinta"
        }
      ],
      "target_answer": "dos / tres, cuatro / cinco, seis / siete, ocho / nueve, diez, veinte / treinta",
      "meaning": "two / three, four / five, six / seven, eight / nine, ten, twenty / thirty",
      "explanation": "Every number from 1 to 30 connects directly to English Latinate or Germanic roots.",
      "id": "es1501_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'one book' vs 'one table'?",
      "options": [
        "un libro / un mesa",
        "uno libro / una mesa",
        "un libro / una mesa"
      ],
      "target_answer": "un libro / una mesa",
      "meaning": "one book / one table",
      "explanation": "uno apocopates (drops -o) to un before a masculine noun and becomes una before a feminine noun.",
      "id": "es1501_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I have two brothers and three sisters'",
      "target_answer": "Tengo dos hermanos y tres hermanas",
      "meaning": "I have two brothers and three sisters",
      "word_bank": [
        "uno",
        "hermanos",
        "tres",
        "cuatro",
        "Tengo",
        "dos",
        "hermanas",
        "y",
        "hermano"
      ],
      "explanation": "Tengo dos hermanos y tres hermanas.",
      "id": "es1501_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "ask for 'five minutes, please'",
      "cues": [
        "Five → Cinco",
        "minutes (plural of minuto) → minutos",
        "please → por favor"
      ],
      "idea_parts": [
        "Five minutes → Cinco minutos",
        "please → por favor"
      ],
      "target_answer": "Cinco minutos por favor",
      "meaning": "Five minutes, please",
      "word_bank": [
        "minuto",
        "Cinco",
        "Cuatro",
        "minutos",
        "por",
        "favor",
        "gracias"
      ],
      "explanation": "Cinco minutos, por favor.",
      "id": "es1501_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Son las ocho de la noche",
      "replays": 2,
      "target_answer": "Son las ocho de la noche",
      "meaning": "It is eight o'clock at night",
      "cues": [
        "It is (plural hours): Son las",
        "eight: ocho",
        "at night: de la noche"
      ],
      "explanation": "Son las ocho de la noche — telling time uses Son las + hour.",
      "affirmation": "Numbers and time in action!",
      "id": "es1501_e5"
    }
  ],
  "summary": {
    "outcome": "Deploy numbers 1–30 in counting, quantities, and clock times.",
    "use_example": {
      "german": "Tengo dos libros y necesito cinco minutos, por favor.",
      "english": "I have two books and I need five minutes, please."
    },
    "takeaway": "uno becomes un before masculine nouns and una before feminine nouns.",
    "curiosity_teaser": "Up next ([1502] Age as Possession): combine numbers up to 100 with tener + años."
  },
  "twist": {
    "prompt": "Assemble: 'Ten minutes, please'",
    "target_answer": "Diez minutos por favor",
    "word_bank": [
      "por",
      "Nueve",
      "gracias",
      "minutos",
      "favor",
      "minuto",
      "Diez"
    ],
    "explanation": "Diez minutos, por favor."
  }
};

export default lesson;
