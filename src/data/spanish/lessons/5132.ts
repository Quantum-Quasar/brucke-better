import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5132,
  "slug": "ida-y-vuelta-salida-llegada",
  "title": "Ida y Vuelta, Salida & Llegada",
  "subtitle": "Buying one-way (sencillo / de ida) and round-trip (de ida y vuelta) tickets with para + city",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "billete",
    "tren",
    "estación",
    "ir",
    "voy",
    "para",
    "dos",
    "mañana",
    "hoy",
    "por_favor"
  ],
  "table_word_ids": [
    "billete",
    "tren",
    "estación",
    "ir",
    "voy",
    "para",
    "dos",
    "mañana",
    "hoy",
    "por_favor"
  ],
  "hook": {
    "title": "Decoding Station Boards: Ida y Vuelta, Salida & Llegada",
    "content": "When you look up at the departure board in Atocha Station in Madrid or buy a ticket at the window, three transparent words greet you:\n• **un billete de ida** = 'a one-way ticket' (lit. 'of going', from *ir* 'to go'!).\n• **un billete de ida y vuelta** = 'a round-trip / return ticket' (lit. 'of going and turning-back', from *volver* 'to return/revolve'!).\n• **la salida** = 'the exit / departure' (remember our false friend: *el éxito* is 'success', while **la salida** is the physical exit or departure!)."
  },
  "pattern": {
    "title": "Ordering Tickets at the Window",
    "content": "*Un billete de ida y vuelta para Toledo, por favor* ('A round-trip ticket to Toledo, please')."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "a round-trip ticket ('of going and return')",
          "german": "un billete de ida y vuelta"
        },
        {
          "id": "p2",
          "english": "a one-way ticket ('of going')",
          "german": "un billete de ida"
        },
        {
          "id": "p3",
          "english": "for / to Madrid (destination arrow)",
          "german": "para Madrid"
        },
        {
          "id": "p4",
          "english": "for tomorrow (deadline/target date)",
          "german": "para mañana"
        },
        {
          "id": "p5",
          "english": "the exit / the departure (not éxito!)",
          "german": "la salida"
        }
      ],
      "target_answer": "un billete de ida y vuelta, un billete de ida, para Madrid, para mañana, la salida",
      "meaning": "a round-trip ticket ('of going and return'), a one-way ticket ('of going'), for / to Madrid (destination arrow), for tomorrow (deadline/target date), the exit / the departure (not éxito!)",
      "explanation": "ida comes from ir ('to go'); vuelta comes from volver ('to turn/return'); la salida is the exit or departure.",
      "id": "es5132_e1"
    },
    {
      "type": "shift_select",
      "prompt": "At the airport or train station, you see a sign that says 'SALIDA'. What does it mean (and how does it contrast with 'éxito')?",
      "options": [
        "la salida = 'success'",
        "la salida = 'salad'",
        "la salida = 'exit / departure' (whereas el éxito = 'success'!)"
      ],
      "target_answer": "la salida = 'exit / departure' (whereas el éxito = 'success'!)",
      "meaning": "exit / departure",
      "explanation": "From salir ('to go out / depart'), la salida means both 'the physical exit' and 'departure time'!",
      "id": "es5132_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Two tickets for Madrid, please'",
      "target_answer": "Dos billetes para Madrid, por favor",
      "meaning": "Two tickets for Madrid, please",
      "word_bank": [
        "Madrid",
        "billete",
        "Dos",
        "para",
        "por",
        "el",
        "favor",
        "billetes"
      ],
      "explanation": "Dos billetes + para Madrid, por favor.",
      "id": "es5132_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that tomorrow you are going to Madrid by train ('en tren')",
      "cues": [
        "Tomorrow I am going → Mañana voy",
        "to Madrid → a Madrid",
        "by train (in train) → en tren"
      ],
      "idea_parts": [
        "Tomorrow I am going to Madrid → Mañana voy a Madrid",
        "by train → en tren"
      ],
      "target_answer": "Mañana voy a Madrid en tren",
      "meaning": "Tomorrow I am going to Madrid by train",
      "word_bank": [
        "en",
        "por",
        "Mañana",
        "vas",
        "a",
        "tren",
        "voy",
        "el",
        "Madrid"
      ],
      "explanation": "Mañana voy a Madrid en tren — Spanish uses en + vehicle (en tren, en coche, en autobús) for 'by train / by car'!",
      "id": "es5132_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Quiero dos billetes para mañana por favor",
      "replays": 2,
      "target_answer": "Quiero dos billetes para mañana por favor",
      "meaning": "I want two tickets for tomorrow, please",
      "cues": [
        "I want: Quiero",
        "two tickets: dos billetes",
        "for tomorrow, please: para mañana, por favor"
      ],
      "explanation": "Quiero dos billetes para mañana, por favor.",
      "affirmation": "Travel and ticket Spanish mastered!",
      "id": "es5132_e5"
    }
  ],
  "summary": {
    "outcome": "Buy tickets, travel by train (en tren), and distinguish la salida ('exit/departure') from el éxito ('success').",
    "use_example": {
      "german": "Quiero dos billetes para Madrid mañana en tren, por favor.",
      "english": "I want two tickets for Madrid tomorrow by train, please."
    },
    "takeaway": "Travel by a vehicle takes en without an article: en tren ('by train').",
    "curiosity_teaser": "Next branch ([5141] Familia, Profesiones & Pasiones): learn why Spanish drops 'un/una' before professions!"
  },
  "twist": {
    "prompt": "Assemble: 'I am going to the station today'",
    "target_answer": "Voy a la estación hoy",
    "word_bank": [
      "en",
      "mañana",
      "a",
      "estación",
      "Voy",
      "al",
      "hoy",
      "la"
    ],
    "explanation": "Voy a la estación hoy."
  }
};

export default lesson;
