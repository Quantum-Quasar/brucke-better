import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 10,
  "slug": "tener-and-hay",
  "title": "tener & hay",
  "subtitle": "Possession with tener ('to hold') and existence with hay ('there is/are')",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "tener",
    "tengo",
    "tienes",
    "tiene",
    "tenemos",
    "tienen",
    "hay",
    "problema",
    "tiempo"
  ],
  "table_word_ids": [
    "tener",
    "tengo",
    "tienes",
    "tiene",
    "tenemos",
    "tienen",
    "hay",
    "problema",
    "tiempo"
  ],
  "hook": {
    "title": "How 'To Hold' Took Over 'To Have'",
    "content": "Latin had two verbs: habēre ('to have') and tenēre ('to hold/keep', English tenant, retain, tenacious). In Spanish, tenēre (tener) took over all everyday possession ('I have a car, I have time, I have an idea' = tengo...), leaving habēre (haber) to do two specialized jobs: helping past participles (he hablado 'I have spoken') and forming the tiny powerhouse word hay ('there is / there are')!"
  },
  "pattern": {
    "title": "Tengo, Tienes & the Universal 'Hay'",
    "content": "Look at tener in the present: yo tengo (with the famous -go ending), tú tienes, él/ella/usted tiene, nosotros tenemos, ellos tienen. And for general existence ('there is a problem' OR 'there are problems'), Spanish uses one unchanging word: hay (pronounced /aj/, with a silent h)!",
    "linguist_note": "hay fused Old Spanish ha ('it has', from haber) + y ('there', from Latin ibi) — the exact same blueprint as French il y a!",
    "trap_note": "Never say *hay el problema — hay ('there is/are') pairs with indefinite articles (hay un problema), numbers, or bare nouns, never with el/la!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "to have (to hold)",
          "german": "tener"
        },
        {
          "id": "p2",
          "english": "I have",
          "german": "tengo"
        },
        {
          "id": "p3",
          "english": "you have (informal)",
          "german": "tienes"
        },
        {
          "id": "p4",
          "english": "he/she/usted has",
          "german": "tiene"
        },
        {
          "id": "p5",
          "english": "we have",
          "german": "tenemos"
        },
        {
          "id": "p6",
          "english": "there is / there are",
          "german": "hay"
        }
      ],
      "target_answer": "tener, tengo, tienes, tiene, tenemos, hay",
      "meaning": "to have (to hold), I have, you have (informal), he/she/usted has, we have, there is / there are",
      "explanation": "tener handles possession; hay handles existence for both singular and plural.",
      "id": "es10_e1"
    },
    {
      "type": "reverse_cognate",
      "prompt": "Spanish tener ('to have/hold', from Latin tenēre) shares its root with which English word for someone who 'holds' an apartment lease?",
      "target_answer": "tenant",
      "meaning": "a tenant is literally 'one who holds' a property",
      "explanation": "Latin tenēre gave Spanish tener and English tenant, retain, maintain, obtain, tenacious.",
      "id": "es10_e2"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'There is no problem' (remembering Greek -ma nouns like el problema are masculine)?",
      "options": [
        "No tiene problema",
        "No es problema",
        "No hay problema"
      ],
      "target_answer": "No hay problema",
      "meaning": "There is no problem",
      "explanation": "hay means 'there is / there are', and no goes right in front: No hay problema.",
      "id": "es10_e3"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I don't have time today'",
      "target_answer": "No tengo tiempo hoy",
      "meaning": "I don't have time today",
      "word_bank": [
        "hoy",
        "tengo",
        "hay",
        "tienes",
        "problema",
        "No",
        "tiempo"
      ],
      "explanation": "No + tengo + tiempo + hoy.",
      "id": "es10_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "ask a friend if they have the confirmation",
      "cues": [
        "Do you have (tú form) → ¿Tienes",
        "the confirmation (feminine) → la confirmación?"
      ],
      "idea_parts": [
        "Do you have → Tienes",
        "the confirmation → la confirmación"
      ],
      "target_answer": "Tienes la confirmación",
      "meaning": "Do you have the confirmation?",
      "word_bank": [
        "Hay",
        "el",
        "la",
        "confirmación",
        "Tienes",
        "Tengo"
      ],
      "explanation": "¿Tienes la confirmación? — rising intonation turns tienes into a question.",
      "diagnosis": {
        "slip": "used Tengo instead of Tienes",
        "cue": "Tengo is 'I have'; tienes (with -es) is 'you have'."
      },
      "id": "es10_e5"
    }
  ],
  "summary": {
    "outcome": "Express possession with tener (tengo, tienes, tiene, tenemos, tienen) and existence with hay.",
    "use_example": {
      "german": "No tengo tiempo hoy porque hay un problema.",
      "english": "I don't have time today because there is a problem."
    },
    "takeaway": "Personal possession uses tener; general existence ('there is / there are') uses invariable hay.",
    "curiosity_teaser": "Up next ([1001] tengo & tienes Gym): drill all forms of tener across everyday nouns."
  },
  "twist": {
    "prompt": "Assemble: 'We have time today'",
    "target_answer": "Tenemos tiempo hoy",
    "word_bank": [
      "Tenemos",
      "hoy",
      "Tengo",
      "Tienes",
      "no",
      "tiempo"
    ],
    "explanation": "Tenemos ('we have') keeps the unchanged stem vowel -e-!"
  },
  "foreshadow": {
    "line": "You just unlocked the Verb Gate! In Topic 11, we build full noun phrases with plural and feminine adjective agreement.",
    "resolvedIn": 11
  },
  "payoff": {
    "ofLesson": 9,
    "text": "Just as Topic 9 showed you that dropping -s turns tú into usted, dropping -s from tienes ('you have') gives tiene ('usted has')!"
  }
};

export default lesson;
