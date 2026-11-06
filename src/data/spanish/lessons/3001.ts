import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 3001,
  "slug": "a-day-in-madrid-reading",
  "title": "A Day in Madrid: Reading",
  "subtitle": "Connected narrative in Madrid combining ser/estar, preterite/imperfect, gustar, and object pronouns",
  "phase": 5,
  "shift_categories": [
    "cion",
    "dad",
    "ico",
    "al"
  ],
  "word_ids": [
    "ciudad",
    "hotel",
    "restaurante",
    "café",
    "estaba",
    "era",
    "fue",
    "hablé",
    "comí",
    "encantar",
    "amigo"
  ],
  "table_word_ids": [
    "ciudad",
    "hotel",
    "restaurante",
    "café",
    "estaba",
    "era",
    "fue",
    "hablé",
    "comí",
    "encantar",
    "amigo"
  ],
  "hook": {
    "title": "Morning to Night in Madrid",
    "content": "Follow the story of a day in Madrid and watch how every tense and verb choice tells part of the story:\n• *Por la mañana me levanté a las ocho.* (Preterite dot: I got up at eight.)\n• *El día era hermoso y el café estaba caliente.* (Imperfect background: The day was beautiful and the coffee was hot.)\n• *Visité a mi mejor amigo y comí en un restaurante central.* (Personal 'a' + preterite events.)\n• *¡La visita fue un éxito y me encanta esta ciudad!* (Preterite verdict fue + inverted encantar!)"
  },
  "pattern": {
    "title": "Reading for Structure and Meaning",
    "content": "Notice how era describes the day's ongoing quality, estaba describes the coffee's temperature state, and fue judges the whole completed visit as a success!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "the day was beautiful (ongoing background trait)",
          "german": "el día era hermoso"
        },
        {
          "id": "p2",
          "english": "the coffee was hot (ongoing past state)",
          "german": "el café estaba caliente"
        },
        {
          "id": "p3",
          "english": "the visit was a success (verdict on completed event)",
          "german": "la visita fue un éxito"
        },
        {
          "id": "p4",
          "english": "I spoke with my best friend",
          "german": "hablé con mi mejor amigo"
        },
        {
          "id": "p5",
          "english": "I love this magical city",
          "german": "me encanta esta ciudad mágica"
        }
      ],
      "target_answer": "el día era hermoso, el café estaba caliente, la visita fue un éxito, hablé con mi mejor amigo, me encanta esta ciudad mágica",
      "meaning": "the day was beautiful (ongoing background trait), the coffee was hot (ongoing past state), the visit was a success (verdict on completed event), I spoke with my best friend, I love this magical city",
      "explanation": "era, estaba, and fue each play their distinct role in a past narrative.",
      "id": "es3001_e1"
    },
    {
      "type": "shift_select",
      "prompt": "In 'El día era hermoso, el café estaba caliente y la cena fue fantástica', why do all three English 'was' clauses use a different Spanish verb?",
      "options": [
        "Because día, café, and cena have different genders",
        "They are interchangeable synonyms",
        "era = ongoing past characteristic (ser); estaba = ongoing past thermal state (estar); fue = final verdict on a completed past event (preterite of ser)!"
      ],
      "target_answer": "era = ongoing past characteristic (ser); estaba = ongoing past thermal state (estar); fue = final verdict on a completed past event (preterite of ser)!",
      "meaning": "Three lenses on 'was'",
      "explanation": "Spanish distinguishes essence vs state (ser vs estar) AND ongoing background vs completed event (imperfect vs preterite)!",
      "id": "es3001_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'Yesterday I spoke with my friend and ate at the restaurant'",
      "target_answer": "Ayer hablé con mi amigo y comí en el restaurante",
      "meaning": "Yesterday I spoke with my friend and ate at the restaurant",
      "word_bank": [
        "restaurante",
        "como",
        "amigo",
        "con",
        "al",
        "y",
        "hablaba",
        "en",
        "mi",
        "hablé",
        "el",
        "comí",
        "Ayer"
      ],
      "explanation": "Ayer hablé con mi amigo y comí en el restaurante.",
      "id": "es3001_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that the hotel was central and the city was beautiful (ongoing past descriptions with era)",
      "cues": [
        "The hotel was central → El hotel era central",
        "and the city was beautiful → y la ciudad era hermosa"
      ],
      "idea_parts": [
        "The hotel was central → El hotel era central",
        "and the city was beautiful → y la ciudad era hermosa"
      ],
      "target_answer": "El hotel era central y la ciudad era hermosa",
      "meaning": "The hotel was central and the city was beautiful",
      "word_bank": [
        "hermosa",
        "era",
        "y",
        "central",
        "ciudad",
        "El",
        "la",
        "estaba",
        "hotel",
        "era",
        "fue",
        "hermoso"
      ],
      "explanation": "El hotel era central y la ciudad era hermosa.",
      "id": "es3001_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Ayer fue un día mágico en Madrid",
      "replays": 2,
      "target_answer": "Ayer fue un día mágico en Madrid",
      "meaning": "Yesterday was a magical day in Madrid",
      "cues": [
        "Yesterday was (completed day): Ayer fue",
        "a magical day: un día mágico",
        "in Madrid: en Madrid"
      ],
      "explanation": "Ayer fue un día mágico en Madrid.",
      "affirmation": "Madrid narrative synthesis complete!",
      "id": "es3001_e5"
    }
  ],
  "summary": {
    "outcome": "Combine era, estaba, fue, hablé, comí, and me encanta in connected narrative passages.",
    "use_example": {
      "german": "El día era hermoso, el café estaba caliente y ayer fue un día mágico en Madrid.",
      "english": "The day was beautiful, the coffee was hot, and yesterday was a magical day in Madrid."
    },
    "takeaway": "era = ongoing trait; estaba = ongoing state/location; fue = completed event verdict.",
    "curiosity_teaser": "Up next ([3002] Trap Watch: False Friends in the Wild): test yourself against the full Spanish False Friends deck!"
  },
  "twist": {
    "prompt": "Assemble: 'The coffee was hot and the cake was delicious'",
    "target_answer": "El café estaba caliente y el pastel estaba rico",
    "word_bank": [
      "era",
      "rica",
      "caliente",
      "estaba",
      "pastel",
      "y",
      "estaba",
      "el",
      "fue",
      "rico",
      "El",
      "café"
    ],
    "explanation": "Both hotness and tasting delicious are states, so both use estaba!"
  }
};

export default lesson;
