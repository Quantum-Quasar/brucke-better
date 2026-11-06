import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5141,
  "slug": "lesson-5141",
  "title": "Docteur, Professeur & Acteur",
  "subtitle": "Why French drops 'a/an' before professions after être: Je suis professeur, il est docteur.",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "docteur",
    "professeur",
    "acteur",
    "directeur",
    "être",
    "suis",
    "cest",
    "bon"
  ],
  "table_word_ids": [
    "docteur",
    "professeur",
    "acteur",
    "directeur",
    "être",
    "suis",
    "cest",
    "bon"
  ],
  "hook": {
    "title": "Why French Drops 'a/an' Before Professions After être",
    "content": "After je suis / tu es / il est / elle est, French treats an unmodified profession like an adjective and drops 'a/an' (un/une): Je suis professeur ('I am a teacher'), Il est docteur ('He is a doctor'), Il est acteur ('He is an actor'). You only bring un/une back when pointing with C'est or adding an adjective: C'est un bon professeur!",
    "footnotes": [
      {
        "marker": "1",
        "title": "The clean contrast: Il est professeur (bare!) vs. C'est un bon professeur (with un!)",
        "content": "Unmodified profession after être = no article; modified profession with C'est = un/une!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Je suis / Il est + Bare Profession; C'est un(e) + (Adjective) + Profession",
    "content": "State professions without an article after je suis / il est, and bring un/une back after c'est.",
    "linguist_note": "Bare predicate nominals after copular être denote institutional role/status.",
    "trap_note": "Never say *Je suis un professeur — drop un/une after je suis / il est before a bare profession!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Contrast bare professions after je suis / il est with un/une after c'est:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "I am a teacher (bare after je suis!)",
          "german": "Je suis professeur"
        },
        {
          "id": "p2",
          "english": "He is a doctor (bare after il est!)",
          "german": "Il est docteur"
        },
        {
          "id": "p3",
          "english": "He is an actor (bare after il est!)",
          "german": "Il est acteur"
        },
        {
          "id": "p4",
          "english": "He is a good actor (adjective + c'est!)",
          "german": "C'est un bon acteur"
        },
        {
          "id": "p5",
          "english": "She is the director",
          "german": "Elle est directrice / C'est la directrice"
        }
      ],
      "target_answer": "Je suis professeur, Il est docteur, Il est acteur, C'est un bon acteur, Elle est directrice / C'est la directrice",
      "meaning": "I am a teacher (bare after je suis!), He is a doctor (bare after il est!), He is an actor (bare after il est!), He is a good actor (adjective + c'est!), She is the director",
      "explanation": "Bare profession after je suis / tu es / il est; keep un/une after C'est!",
      "id": "fr5141_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'My brother is a teacher' vs. 'He is a very good teacher'?",
      "options": [
        "Mon frère est professeur / Il est très bon professeur",
        "Mon frère est professeur / C'est un très bon professeur",
        "Mon frère est un professeur / Il est un très bon professeur"
      ],
      "target_answer": "Mon frère est professeur / C'est un très bon professeur",
      "meaning": "Bare after est; C'est un when modified by an adjective!",
      "explanation": "Unmodified profession after est takes no article; modified profession takes C'est un très bon professeur.",
      "id": "fr5141_e2"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the word-for-word structure of 'Ma mère est docteur'?",
      "german": "Ma mère est docteur",
      "natural": "My mother is a doctor",
      "options": [
        "My mother is a doctor",
        "My mother has doctor",
        "My mother is doctor"
      ],
      "target_answer": "My mother is doctor",
      "meaning": "Literal structure: My mother is doctor",
      "explanation": "French treats the unmodified profession after être like an adjective, with no 'a/an'.",
      "id": "fr5141_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I am a teacher at the university (use Je suis professeur)",
      "cues": [
        "I am teacher (no un!) → Je suis professeur",
        "at the university → à l'université"
      ],
      "idea_parts": [
        "subject + copula + bare profession → Je suis professeur",
        "place → à l'université"
      ],
      "target_answer": "Je suis professeur à l'université",
      "meaning": "I am a professor at the university",
      "word_bank": [
        "professeur",
        "l'université",
        "suis",
        "à",
        "Je",
        "un",
        "au"
      ],
      "explanation": "No 'un' between suis and professeur!",
      "diagnosis": {
        "slip": "inserted un",
        "cue": "Drop 'un' after Je suis before a bare profession: Je suis professeur."
      },
      "id": "fr5141_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Il est acteur, c'est un très bon acteur",
      "replays": 2,
      "target_answer": "Il est acteur, c'est un très bon acteur",
      "meaning": "He is an actor — he's a very good actor",
      "cues": [
        "Il est acteur",
        "c'est un très bon acteur"
      ],
      "explanation": "Hear the switch from bare Il est acteur to C'est un très bon acteur!",
      "affirmation": "You contrasted bare Il est acteur with C'est un très bon acteur!",
      "id": "fr5141_e5"
    }
  ],
  "summary": {
    "outcome": "State professions without an article after je suis / il est / elle est, and use C'est un(e) when adding an adjective.",
    "use_example": {
      "german": "Mon père est directeur et ma sœur est professeure.",
      "english": "My father is a director and my sister is a teacher."
    },
    "takeaway": "After je suis / il est, drop 'a/an' before a bare profession (Je suis professeur); with an adjective, use C'est un bon professeur.",
    "curiosity_teaser": "Up next on Le Pont ([5142] La Musique, Le Cinéma & Le Livre): see how Docteur, Professeur & Acteur leads directly into La Musique, Le Cinéma & Le Livre."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"I am a professor at the university\" in French:",
    "target_answer": "Je suis professeur à l'université",
    "word_bank": [
      "pas",
      "suis",
      "ne",
      "professeur",
      "Je",
      "l'université",
      "à"
    ],
    "explanation": "Re-constructing \"Je suis professeur à l'université\" from the underlying rule cements the pattern of Docteur, Professeur & Acteur."
  }
};

export default lesson;
