import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5052,
  "slug": "lesson-5052",
  "title": "Hay vs Está in the Street",
  "subtitle": "existence asks if, location asks where — two verbs, two questions",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "hay",
    "está",
    "dónde",
    "aquí",
    "allí",
    "hotel"
  ],
  "table_word_ids": [
    "hay",
    "está",
    "dónde",
    "aquí",
    "allí"
  ],
  "hook": {
    "title": "Two Questions, Two Verbs",
    "content": "Lesson 5051 walked you through the street words. Now split the asking in two: ¿Hay un hotel por aquí ? asks whether one EXISTS at all; ¿Dónde está el hotel ? asks where the known one IS. Existence and location — Spanish keeps them in two different verbs, and the article tells you which question you're hearing.",
    "footnotes": [
      {
        "marker": "1",
        "title": "The article is the tell",
        "content": "hay goes with an indefinite noun (un hotel, una farmacia); está goes with the definite one (el hotel, la farmacia). If you can point at it, switch verbs — and switch articles.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Hay asks if; Está asks where",
    "content": "¿Hay un hotel por aquí ? — existence, no definite article. ¿Dónde está el hotel ? — location, the definite el. No hay problema negates existence in one move.",
    "linguist_note": "hay is haber frozen into one full-time job — the same verb that builds the -ado past (he comido). Spanish recycles its machinery.",
    "trap_note": "hay never takes the definite article: hay un hotel, never *hay el hotel — if you can point at it, the sentence wants está."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each street question with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "Is there a hotel around here?",
          "german": "¿Hay un hotel por aquí ?"
        },
        {
          "id": "p2",
          "english": "Where is the hotel?",
          "german": "¿Dónde está el hotel ?"
        },
        {
          "id": "p3",
          "english": "There is no problem",
          "german": "No hay problema"
        },
        {
          "id": "p4",
          "english": "It is there",
          "german": "Está allí"
        }
      ],
      "target_answer": "¿Hay un hotel por aquí ?, ¿Dónde está el hotel ?, No hay problema, Está allí",
      "meaning": "Is there a hotel around here?, Where is the hotel?, There is no problem, It is there",
      "explanation": "Two verbs split the street: hay for existence, está for location.",
      "id": "es5052_e1"
    },
    {
      "type": "shift_select",
      "prompt": "You have never seen a pharmacy on this street. Ask if one exists:",
      "options": [
        "¿Hay una farmacia por aquí ?",
        "¿Dónde está la farmacia ?",
        "¿Es una farmacia por aquí ?"
      ],
      "target_answer": "¿Hay una farmacia por aquí ?",
      "meaning": "Is there a pharmacy around here?",
      "explanation": "Unknown existence asks with hay: ¿Hay una farmacia por aquí ?",
      "id": "es5052_e2"
    },
    {
      "type": "derive",
      "prompt": "Write the existence word that never changes for singular or plural:",
      "english_hint": "haber frozen into one job",
      "target_answer": "hay",
      "meaning": "there is / there are",
      "explanation": "hay — one form for 'there is' and 'there are'; number never touches it.",
      "id": "es5052_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Ask me:",
      "idea": "where is the café?",
      "cues": [
        "the question word: dónde",
        "a known café takes está and el"
      ],
      "idea_parts": [
        "question word → Dónde",
        "where is the café → está el café ?"
      ],
      "target_answer": "¿Dónde está el café ?",
      "meaning": "Where is the café?",
      "word_bank": [
        "Dónde",
        "está",
        "el",
        "café",
        "Hay",
        "un",
        "aquí"
      ],
      "explanation": "¿Dónde está el café ? — known café, definite el, location verb.",
      "diagnosis": {
        "slip": "used hay for a known café",
        "cue": "hay asks if it exists; está asks where it is — the café is already known."
      },
      "id": "es5052_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "No hay problema",
      "replays": 2,
      "target_answer": "No hay problema",
      "meaning": "There is no problem",
      "cues": [
        "It means: There is no problem",
        "Negation rides before hay"
      ],
      "explanation": "No hay problema — existence denied in two words and a no.",
      "affirmation": "You wrote the existence verb doing its classic job: no problem at all.",
      "id": "es5052_e5"
    }
  ],
  "summary": {
    "outcome": "Ask about existence with hay (un hotel) and location with está (el hotel) — and negate existence with no hay.",
    "use_example": {
      "german": "¿Hay un hotel por aquí ?",
      "english": "Is there a hotel around here?"
    },
    "takeaway": "hay asks if it exists; está asks where it is — and hay never takes el.",
    "curiosity_teaser": "Up next ([5131] La Estación, El Tren & El Billete): the same topic opens the travel branch — all aboard!"
  },
  "twist": {
    "prompt": "One more, no safety net — ask: is there a hotel around here?",
    "target_answer": "¿Hay un hotel por aquí ?",
    "word_bank": [
      "Hay",
      "un",
      "hotel",
      "por",
      "aquí",
      "está",
      "el"
    ],
    "explanation": "Rebuilding \"¿Hay un hotel por aquí ?\" — existence verb, indefinite article, por aquí."
  }
};

export default lesson;
