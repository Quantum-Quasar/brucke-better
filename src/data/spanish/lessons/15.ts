import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 15,
  "slug": "numbers-and-ages-1-100",
  "title": "Numbers & Ages: 1–100",
  "subtitle": "Counting, prices, and expressing age as possession: tengo treinta años",
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
    "treinta",
    "cien",
    "año",
    "tengo"
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
    "treinta",
    "cien",
    "año",
    "tengo"
  ],
  "hook": {
    "title": "Why You 'Have' Your Years in Spanish",
    "content": "In English, your age is something you ARE: 'I am thirty years old'. In Spanish (just like French and Italian), your years are treasures you HAVE accumulated and hold in your hands with tener: Tengo treinta años (word for word: 'I have thirty years'). Asking someone's age is ¿Cuántos años tienes? ('How many years do you have?')!"
  },
  "pattern": {
    "title": "Diphthong Twins Inside the Numbers: Siete (7), Nueve (9), Diez (10), Cien (100)",
    "content": "Remember our stress-splitting vowel rule from Topic 10 (e → ie, o → ue)? Look at how it explains the numbers! Latin septem → siete (7), Latin novem → nueve (9, just like nuevo 'new'!), Latin decem → diez (10, English decimal), and Latin centum → cien (100, English century)!",
    "linguist_note": "Latin double -nn- in annus palatalized to /ɲ/ in Spanish, written ñ (originally a scribal shorthand of a small n written above the first n).",
    "trap_note": "Never omit the tilde on el año ('the year', /ˈaɲo/) — without the tilde on ñ, the word changes meaning completely!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "one (un / una before a noun)",
          "german": "uno"
        },
        {
          "id": "p2",
          "english": "five (quintet)",
          "german": "cinco"
        },
        {
          "id": "p3",
          "english": "seven (septem → e→ie)",
          "german": "siete"
        },
        {
          "id": "p4",
          "english": "nine (novem → o→ue)",
          "german": "nueve"
        },
        {
          "id": "p5",
          "english": "twenty / thirty",
          "german": "veinte / treinta"
        },
        {
          "id": "p6",
          "english": "one hundred (cent)",
          "german": "cien"
        }
      ],
      "target_answer": "uno, cinco, siete, nueve, veinte / treinta, cien",
      "meaning": "one (un / una before a noun), five (quintet), seven (septem → e→ie), nine (novem → o→ue), twenty / thirty, one hundred (cent)",
      "explanation": "siete, nueve, diez, and cien all show the familiar e→ie and o→ue diphthong shifts.",
      "id": "es15_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'I am twenty years old' in Spanish?",
      "options": [
        "Tengo veinte años",
        "*Soy veinte años",
        "*Estoy veinte años"
      ],
      "target_answer": "Tengo veinte años",
      "meaning": "I am twenty years old",
      "explanation": "Age is possessed with tener: Tengo veinte años ('I have twenty years').",
      "id": "es15_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I am thirty years old'",
      "target_answer": "Tengo treinta años",
      "meaning": "I am thirty years old",
      "word_bank": [
        "Soy",
        "treinta",
        "años",
        "Estoy",
        "veinte",
        "Tengo"
      ],
      "explanation": "Tengo + treinta + años.",
      "id": "es15_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "ask a friend how old they are: 'How many years do you have?'",
      "cues": [
        "How many (masculine plural to match años) → ¿Cuántos",
        "years → años",
        "do you have → tienes?"
      ],
      "idea_parts": [
        "How many years → Cuántos años",
        "do you have → tienes"
      ],
      "target_answer": "Cuántos años tienes",
      "meaning": "How old are you?",
      "word_bank": [
        "Cuánto",
        "años",
        "tienes",
        "eres",
        "tengo",
        "Cuántos",
        "estás"
      ],
      "explanation": "¿Cuántos años tienes? — cuántos agrees in masculine plural with años.",
      "diagnosis": {
        "slip": "used eres or estás for age",
        "cue": "Spanish never uses ser or estar for age — always use tener + años!"
      },
      "id": "es15_e4"
    },
    {
      "type": "literal_gloss",
      "prompt": "Which English word-for-word blueprint mirrors Spanish 'Tengo treinta años'?",
      "german": "Tengo treinta años",
      "natural": "I am thirty years old",
      "options": [
        "I am thirty of years",
        "I-have thirty years",
        "I am thirty years old",
        "Thirty years I stand"
      ],
      "target_answer": "I-have thirty years",
      "meaning": "I am thirty years old (literal Spanish blueprint: I-have thirty years)",
      "explanation": "Spanish views age as the count of years you hold: Tengo treinta años.",
      "id": "es15_e5"
    }
  ],
  "summary": {
    "outcome": "Count from 1 to 100 and ask and state ages using tener + años.",
    "use_example": {
      "german": "¿Cuántos años tienes? — Tengo treinta años.",
      "english": "How old are you? — I am thirty years old."
    },
    "takeaway": "In Spanish you are not 'years old' — you HAVE years (Tengo X años).",
    "curiosity_teaser": "Up next ([1501] Numbers 1 to 30): master counting 1–30 and see why uno drops its -o before masculine nouns."
  },
  "twist": {
    "prompt": "Assemble: 'He is ten years old'",
    "target_answer": "Tiene diez años",
    "word_bank": [
      "Está",
      "Tiene",
      "diez",
      "Es",
      "años",
      "Tengo"
    ],
    "explanation": "Tiene diez años ('He/she has ten years')."
  },
  "foreshadow": {
    "line": "Next in Topic 16: the days of the week (named after the planets!) and how Spanish says 'on Monday' without a preposition.",
    "resolvedIn": 16
  },
  "payoff": {
    "ofLesson": 14,
    "text": "Having crossed the Sentence Gate after Topic 14, you now enter Phase 3 (Time, Past & Comparison)."
  }
};

export default lesson;
