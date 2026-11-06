import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 23,
  "slug": "direct-vs-indirect-lo-la-vs-le",
  "title": "Direct vs Indirect Objects: lo/la vs le",
  "subtitle": "lo/la (accusative) vs le/les (dative) — clarifying target and recipient",
  "phase": 4,
  "shift_categories": [],
  "word_ids": [
    "lo",
    "la",
    "le",
    "dar",
    "decir",
    "ver",
    "invitar",
    "conocer",
    "a",
    "amigo"
  ],
  "table_word_ids": [
    "lo",
    "la",
    "le",
    "dar",
    "decir",
    "ver",
    "invitar",
    "conocer",
    "a",
    "amigo"
  ],
  "hook": {
    "title": "Direct Target (lo / la) vs Recipient Person (le / les)",
    "content": "When a verb acts directly on an object ('I see it, I buy it, I invite her'), that direct target is lo (masculine) or la (feminine): Lo veo, La invito. When a verb sends or communicates something TO a person ('I speak to him/her, I give [something] to him/her, I tell [something] to him/her'), that recipient takes the gender-neutral indirect pronoun **le** (plural **les**): Le hablo ('I speak to him/her'), Le doy el libro ('I give the book to him/her')!"
  },
  "pattern": {
    "title": "Spanish's Famous 'Personal a' Before Human Direct Objects!",
    "content": "Here is a signature Spanish feature that neither French nor English has: whenever the direct object of your verb is a SPECIFIC PERSON (or beloved pet!), Spanish places the preposition **a** right before them — called the **Personal 'a'**: Veo el hotel ('I see the hotel' — thing, no a) vs **Veo a María** ('I see María' — person, takes a!), **Conozco a tu hermano** ('I know your brother'), **Quiero invitar a mi amigo**!",
    "linguist_note": "Differential Object Marking (the 'personal a', from Latin ad) prevents ambiguity between subject and human object when Spanish word order varies.",
    "trap_note": "One notable exception: tener ('to have') normally does NOT use the personal 'a' when stating family members you have: Tengo dos hermanos ('I have two brothers')."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "it / him (direct object, m.)",
          "german": "lo"
        },
        {
          "id": "p2",
          "english": "it / her (direct object, f.)",
          "german": "la"
        },
        {
          "id": "p3",
          "english": "to him / to her / to usted (indirect recipient)",
          "german": "le"
        },
        {
          "id": "p4",
          "english": "I see the hotel (thing: no 'a')",
          "german": "veo el hotel"
        },
        {
          "id": "p5",
          "english": "I see María (person: personal 'a'!)",
          "german": "veo a María"
        },
        {
          "id": "p6",
          "english": "I know your brother (person: personal 'a'!)",
          "german": "conozco a tu hermano"
        }
      ],
      "target_answer": "lo, la, le, veo el hotel, veo a María, conozco a tu hermano",
      "meaning": "it / him (direct object, m.), it / her (direct object, f.), to him / to her / to usted (indirect recipient), I see the hotel (thing: no 'a'), I see María (person: personal 'a'!), I know your brother (person: personal 'a'!)",
      "explanation": "lo/la = direct target; le/les = 'to him/her/them'; specific human direct objects take the personal 'a'.",
      "id": "es23_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Compare 'I visit Madrid' and 'I visit my mother'. Why does only the second one require 'a'?",
      "options": [
        "Because madre is feminine",
        "Visito Madrid (place = no 'a') vs Visito a mi madre (specific person = requires the personal 'a'!)",
        "Because Madrid starts with M"
      ],
      "target_answer": "Visito Madrid (place = no 'a') vs Visito a mi madre (specific person = requires the personal 'a'!)",
      "meaning": "I visit Madrid vs I visit my mother",
      "explanation": "Specific human direct objects receive the personal 'a' in Spanish to mark them as sentient people rather than inanimate objects!",
      "id": "es23_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I want to invite my friend (male)'",
      "target_answer": "Quiero invitar a mi amigo",
      "meaning": "I want to invite my friend",
      "word_bank": [
        "invitar",
        "a",
        "el",
        "por",
        "Quiero",
        "para",
        "mi",
        "amigo"
      ],
      "explanation": "Quiero invitar + a (personal 'a'!) + mi amigo.",
      "id": "es23_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that you give the book to María using redundant 'le' ('Le doy el libro a María')",
      "cues": [
        "To her (indirect pronoun before verb) → Le",
        "I give the book → doy el libro",
        "to María → a María"
      ],
      "idea_parts": [
        "To her I give → Le doy",
        "the book → el libro",
        "to María → a María"
      ],
      "target_answer": "Le doy el libro a María",
      "meaning": "I give the book to María",
      "word_bank": [
        "Le",
        "para",
        "La",
        "doy",
        "libro",
        "Lo",
        "a",
        "el",
        "María"
      ],
      "explanation": "Le doy el libro a María — Spanish loves announcing the recipient twice: with le before the verb AND a María after it!",
      "diagnosis": {
        "slip": "omitted Le before doy",
        "cue": "In natural Spanish, even when 'a María' is stated, you still include Le before the verb: Le doy el libro a María."
      },
      "id": "es23_e4"
    },
    {
      "type": "literal_gloss",
      "prompt": "Which English word-for-word blueprint mirrors Spanish 'Le doy el libro a María'?",
      "german": "Le doy el libro a María",
      "natural": "I give the book to María",
      "options": [
        "It I give the book María",
        "I give the book to María",
        "To-her I-give the book to María",
        "She gives the book to María"
      ],
      "target_answer": "To-her I-give the book to María",
      "meaning": "I give the book to María (literal Spanish blueprint: To-her I-give the book to María)",
      "explanation": "Spanish doubles the dative recipient: Le ('To-her') before the verb and a María ('to María') after.",
      "id": "es23_e5"
    }
  ],
  "summary": {
    "outcome": "Distinguish direct lo/la from indirect le/les, use the personal 'a' before human direct objects, and double le with a + person.",
    "use_example": {
      "german": "Veo a María y le doy el libro.",
      "english": "I see María and I give her the book."
    },
    "takeaway": "Specific people as direct objects wear the personal 'a' (Veo a mi amigo) — and indirect recipients take le/les.",
    "curiosity_teaser": "Up next ([2301] The Personal 'a'): master when to include and when to omit the personal 'a'."
  },
  "twist": {
    "prompt": "Assemble: 'I know your father'",
    "target_answer": "Conozco a tu padre",
    "word_bank": [
      "padre",
      "tu",
      "el",
      "a",
      "Conozco",
      "tú",
      "por"
    ],
    "explanation": "Conozco + a (personal 'a') + tu padre."
  },
  "foreshadow": {
    "line": "Next in Topic 24: what happens when the subject and object are the SAME person — reflexive verbs (me levanto, me acuesto)!",
    "resolvedIn": 24
  },
  "payoff": {
    "ofLesson": 22,
    "text": "Now you see why 'Le doy el libro a María' becomes 'Se lo doy' when el libro turns into lo!"
  }
};

export default lesson;
