import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 29,
  "slug": "the-french-mind",
  "title": "The French Mind",
  "subtitle": "avoir faim, avoir soif, avoir raison, avoir besoin de — feelings as possessions and idioms as thought",
  "phase": 5,
  "shift_categories": [
    "doublet"
  ],
  "word_ids": [
    "faim",
    "soif",
    "peur",
    "raison",
    "besoin",
    "avoir",
    "jai",
    "as",
    "très",
    "cœur"
  ],
  "table_word_ids": [
    "faim",
    "soif",
    "peur",
    "raison",
    "besoin",
    "avoir",
    "jai",
    "as",
    "très",
    "cœur"
  ],
  "hook": {
    "title": "Why You 'Have Hunger' and 'Have Reason' in French",
    "content": "In Topic 15 you saw that French doesn't 'be' thirty years old — it 'has' thirty years (J'ai trente ans). That same mental theatre runs across physical sensations and states of mind! You are not 'hungry' — hunger is a visitor you temporarily hold with avoir: J'ai faim ('I have hunger', cousin of famine). You are not 'thirsty' — J'ai soif ('I have thirst'). You are not 'afraid' — J'ai peur ('I have fear'). You are not 'right' — Tu as raison ('You have reason')! And 'I need' is J'ai besoin de ('I have need of').",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why 'very hungry' is J'ai très faim",
        "content": "Even though faim, soif, and peur are nouns, avoir faim acts so much like a single feeling-unit that spoken and written French puts très ('very') right before the noun: J'ai très faim, j'ai très soif!",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "avoir + Bare State Noun (No Article!)",
    "content": "Notice that in j'ai faim, tu as soif, il a peur, tu as raison, and j'ai besoin de, there is NO article (un/une/le/la) between avoir and the noun! The verb and noun fuse into a single idiom. If you say *Je suis faim, a French ear hears 'I am starvation itself'! Always possess your temporary bodily states with avoir.",
    "linguist_note": "Having a sensation (habēre famem / sitim) vs. being an identity reflects the Indo-European split between alienable temporary states and permanent attributes.",
    "trap_note": "The shortcut your mind will offer: translating 'I am hungry / You are right' with être (*Je suis faim / *Tu es raison). Temporary states of hunger, thirst, fear, and rightness ALWAYS use avoir!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each avoir expression with its natural English meaning and literal gloss:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "avoir faim (famine)",
          "german": "to be hungry (lit. have hunger)"
        },
        {
          "id": "p2",
          "english": "avoir soif",
          "german": "to be thirsty (lit. have thirst)"
        },
        {
          "id": "p3",
          "english": "avoir peur",
          "german": "to be afraid (lit. have fear)"
        },
        {
          "id": "p4",
          "english": "avoir raison (reason)",
          "german": "to be right (lit. have reason)"
        },
        {
          "id": "p5",
          "english": "avoir besoin de",
          "german": "to need (lit. have need of)"
        }
      ],
      "target_answer": "to be hungry (lit. have hunger), to be thirsty (lit. have thirst), to be afraid (lit. have fear), to be right (lit. have reason), to need (lit. have need of)",
      "meaning": "avoir faim (famine), avoir soif, avoir peur, avoir raison (reason), avoir besoin de",
      "explanation": "All five use avoir with a bare noun — never être!",
      "id": "fr29_e1"
    },
    {
      "type": "literal_gloss",
      "prompt": "What is the literal word-for-word structure of 'Tu as raison'?",
      "german": "Tu as raison",
      "natural": "You are right",
      "options": [
        "You have reason",
        "You are reasonable",
        "You are right"
      ],
      "target_answer": "You have reason",
      "meaning": "Literal structure: You have reason",
      "explanation": "In French, being right is literally 'having reason': Tu as raison.",
      "id": "fr29_e2"
    },
    {
      "type": "variant_english",
      "prompt": "Which English sentences accurately translate 'J'ai besoin d'un café'?",
      "german": "J'ai besoin d'un café",
      "meaning": "I need a coffee",
      "renderings": [
        "I need a coffee",
        "I am in need of a coffee"
      ],
      "traps": [
        "I have a coffee shop",
        "I want to make a coffee"
      ],
      "target_answer": "I need a coffee",
      "explanation": "avoir besoin de + noun/infinitive is the standard French way to say 'to need'.",
      "id": "fr29_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "I am very hungry and you are right",
      "cues": [
        "I have very hunger → J'ai très faim + and you have reason → et tu as raison"
      ],
      "idea_parts": [
        "first clause → J'ai très faim",
        "second clause → et tu as raison"
      ],
      "target_answer": "J'ai très faim et tu as raison",
      "meaning": "I am very hungry and you are right",
      "word_bank": [
        "as",
        "J'ai",
        "très",
        "faim",
        "es",
        "et",
        "tu",
        "raison",
        "suis"
      ],
      "explanation": "Both 'hungry' and 'right' are possessed with avoir in French.",
      "diagnosis": {
        "slip": "used suis or es instead of ai and as",
        "cue": "Use J'ai très faim and tu as raison."
      },
      "id": "fr29_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Est-ce que tu as soif maintenant",
      "replays": 2,
      "target_answer": "Est-ce que tu as soif maintenant",
      "meaning": "Are you thirsty now?",
      "cues": [
        "question machine: Est-ce que",
        "you have thirst: tu as soif",
        "now: maintenant"
      ],
      "explanation": "tu as soif = 'are you thirsty?'.",
      "affirmation": "You used tu as soif with Est-ce que cleanly.",
      "id": "fr29_e5"
    }
  ],
  "summary": {
    "outcome": "Express hunger, thirst, fear, being right, and needing with avoir + bare noun.",
    "use_example": {
      "german": "Tu as raison, j'ai besoin de manger parce que j'ai faim.",
      "english": "You're right, I need to eat because I'm hungry."
    },
    "takeaway": "In French, you don't 'be' hungry, thirsty, afraid, or right — you 'have' hunger, thirst, fear, and reason.",
    "curiosity_teaser": "Up next on Le Pont ([2901] Have-Hunger & Co): see how The French Mind leads directly into Have-Hunger & Co."
  },
  "twist": {
    "prompt": "Ungraded — 'I am not afraid' (wrap n'...pas around ai before peur):",
    "target_answer": "Je n'ai pas peur",
    "word_bank": [
      "n'ai",
      "peur",
      "suis",
      "pas",
      "de",
      "Je"
    ],
    "explanation": "Because avoir peur has no article to begin with, the negation is simply Je n'ai pas peur!"
  },
  "foreshadow": {
    "line": "Having mastered The French Mind, look ahead to Topic 30 (Capstone: Le Pont Reading), where this machinery expands into the next dimension of French thought.",
    "resolvedIn": 30
  },
  "payoff": {
    "ofLesson": 28,
    "text": "The foundation from Topic 28 (qui & que) now pays off directly inside The French Mind: every sentence here builds on that earlier step."
  }
};

export default lesson;
