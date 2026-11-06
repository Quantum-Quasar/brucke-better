import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1701,
  "slug": "forming-participles",
  "title": "Forming Participles",
  "subtitle": "-ar → -ado (hablado), -er/-ir → -ido (comido, vivido), plus irregulars hecho (fact) and visto (vista)",
  "phase": 3,
  "shift_categories": [
    "f_to_h",
    "ct_to_ch"
  ],
  "word_ids": [
    "hablado",
    "comido",
    "hecho",
    "visto",
    "he",
    "has",
    "hacer",
    "ver",
    "vivir",
    "confirmar"
  ],
  "table_word_ids": [
    "hablado",
    "comido",
    "hecho",
    "visto",
    "he",
    "has",
    "hacer",
    "ver",
    "vivir",
    "confirmar"
  ],
  "hook": {
    "title": "Regular -ado / -ido and the Two Cognate Irregulars: Hecho & Visto",
    "content": "Almost every verb in Spanish forms its participle regularly: -ar → -ado, -er/-ir → -ido. And what about the two most common irregulars: hacer ('to do/make') → hecho ('done/made') and ver ('to see') → visto ('seen')? You already know both from English! Visto is the exact word in 'Hasta la vista' and 'vista/vision'. And hecho comes from Latin factum ('fact/feat') with BOTH Spanish sound shifts firing at once: initial f- → silent h-, and medial -ct- → -ch-!"
  },
  "pattern": {
    "title": "Double Duty: El Hecho = 'The Fact'",
    "content": "Just like English 'fact' comes from Latin 'thing done', Spanish el hecho means both 'done/made' (Lo he hecho 'I have done it') and the noun 'the fact' (de hecho = 'in fact / actually')!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "spoken (hablar → -ado)",
          "german": "hablado"
        },
        {
          "id": "p2",
          "english": "eaten (comer → -ido)",
          "german": "comido"
        },
        {
          "id": "p3",
          "english": "done / made (hacer → factum)",
          "german": "hecho"
        },
        {
          "id": "p4",
          "english": "seen (ver → vista)",
          "german": "visto"
        },
        {
          "id": "p5",
          "english": "I have done it",
          "german": "lo he hecho"
        },
        {
          "id": "p6",
          "english": "I have seen it",
          "german": "lo he visto"
        }
      ],
      "target_answer": "hablado, comido, hecho, visto, lo he hecho, lo he visto",
      "meaning": "spoken (hablar → -ado), eaten (comer → -ido), done / made (hacer → factum), seen (ver → vista), I have done it, I have seen it",
      "explanation": "-ar → -ado, -er/-ir → -ido; hacer → hecho and ver → visto.",
      "id": "es1701_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish 'el hecho' ('that which is done', from Latin 'factum' via f-→h- and -ct-→-ch-) is the exact twin of which four-letter English noun meaning 'a proven truth'?",
      "target_answer": "fact",
      "meaning": "a fact (Latin factum) is literally 'a thing done' (hecho)!",
      "explanation": "Latin facere ('to do/make') → participle factum → English fact/feat and Spanish hecho.",
      "id": "es1701_e2"
    },
    {
      "type": "morpheme_tiles",
      "prompt": "Convert 'confirmar' into its past participle ('confirmed') by swapping -ar for -ado:",
      "tile_options": [
        "ado",
        "ido",
        "confirm",
        "ar"
      ],
      "target_answer": "confirmado",
      "meaning": "confirmado (confirmed)",
      "explanation": "confirm + ado = confirmado.",
      "id": "es1701_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I have done it today'",
      "target_answer": "Lo he hecho hoy",
      "meaning": "I have done it today",
      "word_bank": [
        "hacer",
        "hoy",
        "La",
        "he",
        "hecho",
        "tengo",
        "Lo"
      ],
      "explanation": "Lo + he + hecho + hoy.",
      "id": "es1701_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "ask a friend if they have seen the movie/house: 'Have you seen the house?'",
      "cues": [
        "Have you (auxiliary) → ¿Has",
        "seen (irregular participle of ver) → visto",
        "the house → la casa?"
      ],
      "idea_parts": [
        "Have you seen → Has visto",
        "the house → la casa"
      ],
      "target_answer": "Has visto la casa",
      "meaning": "Have you seen the house?",
      "word_bank": [
        "casa",
        "He",
        "hecho",
        "ver",
        "Has",
        "la",
        "visto"
      ],
      "explanation": "¿Has visto la casa? — visto stays invariable (-o) even though la casa is feminine!",
      "diagnosis": {
        "slip": "changed visto to vista",
        "cue": "After haber (he/has/ha/hemos), the participle NEVER changes for gender: ¿Has visto la casa?"
      },
      "id": "es1701_e5"
    }
  ],
  "summary": {
    "outcome": "Form regular -ado/-ido participles and deploy hecho (hacer) and visto (ver) after haber.",
    "use_example": {
      "german": "Lo he hecho hoy y ya he visto la casa.",
      "english": "I have done it today and I have already seen the house."
    },
    "takeaway": "hecho = Latin factum (f→h, ct→ch); visto = vista — and participles after haber never change ending.",
    "curiosity_teaser": "Up next ([1702] The haber Auxiliary): drill he, has, ha, hemos across life experiences and today's actions."
  },
  "twist": {
    "prompt": "Assemble: 'We have seen the city'",
    "target_answer": "Hemos visto la ciudad",
    "word_bank": [
      "Tenemos",
      "visto",
      "Hemos",
      "vista",
      "la",
      "el",
      "ciudad"
    ],
    "explanation": "Hemos visto la ciudad."
  }
};

export default lesson;
