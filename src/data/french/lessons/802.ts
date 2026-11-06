import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 802,
  "slug": "sprig-802",
  "title": "-eur Discrimination Drills",
  "subtitle": "Convert -or/-er nouns to -eur and decide le vs la using the agent vs quality rule.",
  "phase": 1,
  "shift_categories": [
    "eur"
  ],
  "word_ids": [
    "docteur",
    "acteur",
    "directeur",
    "professeur",
    "honneur",
    "bonheur",
    "couleur",
    "erreur"
  ],
  "table_word_ids": [
    "docteur",
    "acteur",
    "directeur",
    "professeur",
    "honneur",
    "bonheur",
    "couleur",
    "erreur"
  ],
  "hook": {
    "title": "Fast Sorting: Masculine Agents vs. Feminine Qualities",
    "content": "Run the -eur bridge at full speed, separating masculine human agents (un docteur, un acteur, un directeur, un professeur) and masculine bonheur/honneur from feminine quality nouns (une couleur, une erreur).",
    "footnotes": [
      {
        "marker": "1",
        "title": "How un/une reveals the gender when l' hides it",
        "content": "On vowel-initial l'acteur, l'honneur, and l'erreur, the definite article elides to l' — so testing with un/une (un acteur, un honneur, une erreur) makes the gender visible!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Convert -or → -eur, Then Check Agent (un) vs. Quality (une)",
    "content": "Use the Agent vs. Quality rule across mixed drills.",
    "linguist_note": "Agentive -eur (< -ātōrem) vs. abstract -eur (< -ōrem) converged phonetically while diverging in gender.",
    "trap_note": "Watch out for l'erreur vs. l'acteur: l'acteur is a person (un bon acteur), while l'erreur is a quality (une grande erreur)!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Sort these -eur nouns into un (masculine) vs. une (feminine):",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "a doctor (person)",
          "german": "un docteur"
        },
        {
          "id": "p2",
          "english": "an actor (person)",
          "german": "un acteur"
        },
        {
          "id": "p3",
          "english": "an honour (masculine exception)",
          "german": "un honneur"
        },
        {
          "id": "p4",
          "english": "a color (quality)",
          "german": "une couleur"
        },
        {
          "id": "p5",
          "english": "an error (quality)",
          "german": "une erreur"
        }
      ],
      "target_answer": "un docteur, un acteur, un honneur, une couleur, une erreur",
      "meaning": "a doctor (person), an actor (person), an honour (masculine exception), a color (quality), an error (quality)",
      "explanation": "un/une reveals the gender even when l' hides it.",
      "id": "fr802_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Which sentence has the correct gender agreement?",
      "options": [
        "C'est un bon acteur et un grand erreur",
        "C'est une bonne acteur et un grand erreur",
        "C'est un bon acteur et une grande erreur"
      ],
      "target_answer": "C'est un bon acteur et une grande erreur",
      "meaning": "He is a good actor (m.) and it's a big mistake (f.)",
      "explanation": "acteur is masculine (un bon acteur); erreur is feminine (une grande erreur).",
      "id": "fr802_e2"
    },
    {
      "type": "derive",
      "prompt": "Convert English 'the professor / teacher' to French (with article):",
      "english_hint": "-or → -eur",
      "target_answer": "le professeur",
      "meaning": "the teacher / professor",
      "explanation": "professor → le professeur.",
      "id": "fr802_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "the director and the professor are here",
      "cues": [
        "The director → Le directeur",
        "and the professor are here → et le professeur sont ici"
      ],
      "idea_parts": [
        "subjects → Le directeur et le professeur",
        "verb + place → sont ici"
      ],
      "target_answer": "Le directeur et le professeur sont ici",
      "meaning": "The director and the professor are here",
      "word_bank": [
        "ici",
        "sont",
        "le",
        "directeur",
        "La",
        "Le",
        "est",
        "professeur",
        "et"
      ],
      "explanation": "Both human agent nouns take le, and together they take plural sont.",
      "diagnosis": {
        "slip": "used est instead of sont",
        "cue": "Two singular subjects joined by et take plural sont."
      },
      "id": "fr802_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "C'est un grand honneur pour moi",
      "replays": 2,
      "target_answer": "C'est un grand honneur pour moi",
      "meaning": "It is a great honour for me",
      "cues": [
        "C'est un grand honneur",
        "pour moi"
      ],
      "explanation": "honneur is masculine (un grand honneur) and starts with a mute H.",
      "affirmation": "You paired un grand with honneur and pour moi.",
      "id": "fr802_e5"
    }
  ],
  "summary": {
    "outcome": "Discriminate masculine and feminine -eur nouns at speed and pair them with accurate articles and adjectives.",
    "use_example": {
      "german": "C'est un grand honneur de voir le directeur.",
      "english": "It is a great honour to see the director."
    },
    "takeaway": "Check un/une when l' hides the article: un acteur, un honneur, une erreur.",
    "curiosity_teaser": "Up next on Le Pont ([9] vous & tu): see how -eur Discrimination Drills leads directly into vous & tu."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"The director and the professor are here\" in French:",
    "target_answer": "Le directeur et le professeur sont ici",
    "word_bank": [
      "Le",
      "professeur",
      "sont",
      "pas",
      "et",
      "ici",
      "directeur",
      "ne",
      "le"
    ],
    "explanation": "Re-constructing \"Le directeur et le professeur sont ici\" from the underlying rule cements the pattern of -eur Discrimination Drills."
  }
};

export default lesson;
