import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1403,
  "slug": "three-distances-este-ese-aquel",
  "title": "Three Distances of Space: este, ese & aquel",
  "subtitle": "Matching Spanish's three spatial zones to the three persons: aquí/este (near me), ahí/ese (near you), allí/aquel (over yonder)",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "este",
    "ese",
    "aquel",
    "aquí",
    "allí",
    "libro",
    "mesa",
    "casa",
    "hotel",
    "café"
  ],
  "table_word_ids": [
    "este",
    "ese",
    "aquel",
    "aquí",
    "allí",
    "libro",
    "mesa",
    "casa",
    "hotel",
    "café"
  ],
  "hook": {
    "title": "English Has Two Distances ('This' vs 'That'); Spanish Has Three!",
    "content": "In English, the universe is split in two: 'this' (near me) and 'that' (everything else). Spanish maps space onto the THREE grammatical persons:\n1) **Zone 1 (Near Me — yo / aquí)**: este libro ('this book'), esta mesa ('this table'), esto ('this thing/idea').\n2) **Zone 2 (Near You — tú / ahí)**: ese libro ('that book near you'), esa mesa ('that table'), eso ('that thing/idea you just mentioned').\n3) **Zone 3 (Far from Both of Us — él / allí)**: aquel hotel ('that hotel way over there'), aquella casa ('that house over yonder / long ago')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "How 'Aquello' Paints Nostalgia in Time",
        "content": "Zone 3 (aquel, aquella, aquellos, aquellas) also works in time! En aquellos tiempos ('In those days long ago') places a memory far away on the horizon.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Why Masculine Is 'Este / Ese' (Not *Esto / *Eso) Before a Noun!",
    "content": "Watch out for the #1 demonstrative trap: masculine singular before a noun ends in -e (este libro, ese café — plural estos libros, esos cafés)! The -o forms (esto, eso, aquello) are NEUTER pronouns used ONLY when pointing at an unnamed idea or mystery object ('What is this?' = ¿Qué es esto?, 'I understand that' = Comprendo eso)!",
    "trap_note": "Remember the rhyme: 'This and these both have T's' (este/esta/estos/estas = this/these; remove the T and you get ese/esa/esos/esas = that/those)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each English expression with its Spanish partner:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "this book (near me, m.)",
          "german": "este libro"
        },
        {
          "id": "p2",
          "english": "this table (near me, f.)",
          "german": "esta mesa"
        },
        {
          "id": "p3",
          "english": "that coffee (near you, m.)",
          "german": "ese café"
        },
        {
          "id": "p4",
          "english": "that house (near you, f.)",
          "german": "esa casa"
        },
        {
          "id": "p5",
          "english": "that house way over there (far from both, f.)",
          "german": "aquella casa"
        },
        {
          "id": "p6",
          "english": "that thing / idea (neuter pronoun)",
          "german": "eso"
        }
      ],
      "target_answer": "este libro, esta mesa, ese café, esa casa, aquella casa, eso",
      "meaning": "this book (near me, m.), this table (near me, f.), that coffee (near you, m.), that house (near you, f.), that house way over there (far from both, f.), that thing / idea (neuter pronoun)",
      "explanation": "Zone 1 = este/esta; Zone 2 = ese/esa; Zone 3 = aquel/aquella; neuter ideas = esto/eso.",
      "id": "es1403_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'this coffee' (masculine singular noun)?",
      "options": [
        "esta café",
        "*esto café",
        "este café"
      ],
      "target_answer": "este café",
      "meaning": "this coffee",
      "explanation": "Masculine singular demonstrative before a noun is este (never *esto!).",
      "id": "es1403_e2"
    },
    {
      "type": "syntax_builder",
      "prompt": "Assemble: 'I want this book and that table (near you)'",
      "target_answer": "Quiero este libro y esa mesa",
      "meaning": "I want this book and that table",
      "word_bank": [
        "este",
        "esto",
        "libro",
        "ese",
        "mesa",
        "Quiero",
        "esta",
        "esa",
        "y"
      ],
      "explanation": "Quiero este libro (m., near me) y esa mesa (f., near you).",
      "id": "es1403_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say that you understand that (referring to a whole idea just mentioned)",
      "cues": [
        "I understand → Comprendo",
        "that (neuter idea pronoun) → eso"
      ],
      "idea_parts": [
        "I understand → Comprendo",
        "that idea → eso"
      ],
      "target_answer": "Comprendo eso",
      "meaning": "I understand that",
      "word_bank": [
        "ese",
        "esa",
        "este",
        "Comprendo",
        "eso"
      ],
      "explanation": "Comprendo eso — when 'that' refers to a whole statement or idea without a gendered noun, use neuter eso!",
      "diagnosis": {
        "slip": "used ese instead of eso",
        "cue": "When no specific noun is named ('that idea/fact'), use the neuter pronoun eso."
      },
      "id": "es1403_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Aquella casa allí es hermosa",
      "replays": 2,
      "target_answer": "Aquella casa allí es hermosa",
      "meaning": "That house over there is beautiful",
      "cues": [
        "That (Zone 3 feminine): Aquella",
        "house over there: casa allí",
        "is beautiful: es hermosa"
      ],
      "explanation": "Aquella casa allí es hermosa — Zone 3 aquel/aquella pairs naturally with allí.",
      "affirmation": "Three spatial zones mastered!",
      "id": "es1403_e5"
    }
  ],
  "summary": {
    "outcome": "Distinguish este/esta (near me), ese/esa (near you), aquel/aquella (far from both), and neuter esto/eso.",
    "use_example": {
      "german": "Quiero este libro aquí, ese café y aquella mesa allí.",
      "english": "I want this book here, that coffee (near you), and that table way over there."
    },
    "takeaway": "Masculine singular before a noun is este/ese (plural estos/esos); esto and eso are only for unnamed ideas!",
    "curiosity_teaser": "Up next ([5141] Médico, Profesor & Actor (No 'un'!)): professions drop the un — soy profesor!"
  },
  "twist": {
    "prompt": "Assemble: 'What is this (unnamed thing)?'",
    "target_answer": "Qué es esto",
    "word_bank": [
      "está",
      "este",
      "esto",
      "Qué",
      "esta",
      "es"
    ],
    "explanation": "¿Qué es esto? uses neuter esto because the object hasn't been named yet."
  }
};

export default lesson;
