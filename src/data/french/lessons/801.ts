import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 801,
  "slug": "sprig-801",
  "title": "Couleur: The Famous Rebel",
  "subtitle": "la couleur, l'erreur, la peur, la chaleur: why abstract Latin -or nouns stayed feminine in French.",
  "phase": 1,
  "shift_categories": [
    "eur"
  ],
  "word_ids": [
    "couleur",
    "erreur",
    "peur",
    "chaleur",
    "fleur",
    "heure",
    "bon"
  ],
  "table_word_ids": [
    "couleur",
    "erreur",
    "peur",
    "chaleur",
    "fleur",
    "heure",
    "bon"
  ],
  "hook": {
    "title": "Why Abstract Qualities in -eur Are Feminine",
    "content": "Human professions in -eur are masculine (le docteur, l'acteur), while abstract sensations and natural phenomena in -eur are feminine: la couleur ('color'), l'erreur ('error'), la peur ('fear'), la chaleur ('heat'), and la fleur ('flower')!",
    "footnotes": [
      {
        "marker": "1",
        "title": "Two exceptions that stayed masculine: le bonheur and l'honneur",
        "content": "le bonheur ('happiness', built on Latin neuter augurium 'omen') and l'honneur ('honour') are the two non-person -eur words that stayed masculine.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Quality in -eur → Feminine la / une",
    "content": "Pair la couleur, l'erreur, la peur, la chaleur, and la fleur with feminine articles and adjectives (une belle couleur, une grande erreur).",
    "linguist_note": "Gallo-Romance reassigned Latin abstract nouns in -ōrem to the feminine gender.",
    "trap_note": "Don't write *un erreur or *le couleur — both are feminine quality nouns (une erreur, la couleur)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each feminine -eur noun with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "la couleur",
          "german": "the color"
        },
        {
          "id": "p2",
          "english": "l'erreur (une erreur)",
          "german": "the error / mistake"
        },
        {
          "id": "p3",
          "english": "la peur",
          "german": "the fear"
        },
        {
          "id": "p4",
          "english": "la chaleur",
          "german": "the heat / warmth"
        },
        {
          "id": "p5",
          "english": "la fleur",
          "german": "the flower"
        }
      ],
      "target_answer": "the color, the error / mistake, the fear, the heat / warmth, the flower",
      "meaning": "la couleur, l'erreur (une erreur), la peur, la chaleur, la fleur",
      "explanation": "All five take feminine la / une.",
      "id": "fr801_e1"
    },
    {
      "type": "shift_select",
      "prompt": "How do you say 'a beautiful color' in French?",
      "options": [
        "une beau couleur",
        "une belle couleur",
        "un beau couleur"
      ],
      "target_answer": "une belle couleur",
      "meaning": "a beautiful color",
      "explanation": "couleur is feminine, so both une and belle are feminine!",
      "id": "fr801_e2"
    },
    {
      "type": "derive",
      "prompt": "Translate with the indefinite article ('a'): 'a mistake / an error' →",
      "english_hint": "feminine une + erreur",
      "target_answer": "une erreur",
      "meaning": "a mistake / an error",
      "explanation": "erreur is feminine: une erreur.",
      "id": "fr801_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "this color is very beautiful (use Cette couleur)",
      "cues": [
        "This color → Cette couleur",
        "is very beautiful → est très belle"
      ],
      "idea_parts": [
        "subject → Cette couleur",
        "predicate → est très belle"
      ],
      "target_answer": "Cette couleur est très belle",
      "meaning": "This color is very beautiful",
      "word_bank": [
        "Ce",
        "belle",
        "Cette",
        "couleur",
        "très",
        "beau",
        "est"
      ],
      "explanation": "couleur is feminine, triggering Cette and belle.",
      "diagnosis": {
        "slip": "used Ce or beau",
        "cue": "couleur is feminine: Cette couleur est très belle."
      },
      "id": "fr801_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "C'est une jolie fleur rouge",
      "replays": 2,
      "target_answer": "C'est une jolie fleur rouge",
      "meaning": "It is a pretty red flower",
      "cues": [
        "pointer: C'est",
        "BAGS adj before noun: une jolie fleur",
        "color after noun: rouge"
      ],
      "explanation": "jolie stands before fleur; rouge stands after.",
      "affirmation": "You flanked fleur with jolie and rouge accurately.",
      "id": "fr801_e5"
    }
  ],
  "summary": {
    "outcome": "Use feminine articles and adjectives with la couleur, l'erreur, la peur, la chaleur, and la fleur.",
    "use_example": {
      "german": "Quelle belle couleur sur cette fleur !",
      "english": "What a beautiful color on this flower!"
    },
    "takeaway": "People in -eur are le; qualities and sensations in -eur are la.",
    "curiosity_teaser": "Up next on Le Pont ([802] -eur Discrimination Drills): see how Couleur: The Famous Rebel leads directly into -eur Discrimination Drills."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"This color is very beautiful\" in French:",
    "target_answer": "Cette couleur est très belle",
    "word_bank": [
      "Cette",
      "très",
      "ne",
      "pas",
      "belle",
      "couleur",
      "est"
    ],
    "explanation": "Re-constructing \"Cette couleur est très belle\" from the underlying rule cements the pattern of Couleur: The Famous Rebel."
  }
};

export default lesson;
