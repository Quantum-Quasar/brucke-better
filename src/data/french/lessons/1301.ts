import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 1301,
  "slug": "sprig-1301",
  "title": "au & du Fusions",
  "subtitle": "à + le = au, de + le = du, de + les = des: mandatory contractions as word-glue.",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "à",
    "de",
    "au",
    "du",
    "des",
    "café",
    "restaurant",
    "gare",
    "hôtel",
    "cinéma"
  ],
  "table_word_ids": [
    "à",
    "de",
    "au",
    "du",
    "des",
    "café",
    "restaurant",
    "gare",
    "hôtel",
    "cinéma"
  ],
  "hook": {
    "title": "Why à + le and de + le Fuse on Impact",
    "content": "Masculine consonant nouns fuse mandatorily with à and de: à + le = au (/o/), de + le = du (/dy/), and plural à + les = aux, de + les = des. Meanwhile, feminine consonant nouns stay separate (à la gare, de la gare) and vowel/mute-H nouns elide (à l'hôtel, de l'hôtel)!",
    "footnotes": [
      {
        "marker": "1",
        "title": "The 3-way check: Vowel (à l'/de l'), Feminine (à la/de la), Masculine (au/du)",
        "content": "Check the first letter and gender of the noun before choosing the preposition form.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Mandatory Fusions: au / du vs. à la / de la vs. à l' / de l'",
    "content": "Apply the 3-way check across places in town.",
    "linguist_note": "Enclitic fusion of preposition + masculine/plural definite article is mandatory in French.",
    "trap_note": "Never write *à le cinéma or *de le restaurant — always fuse into au cinéma and du restaurant!"
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each destination or origin with its correct French preposition + article:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "to the cinema (le cinéma, m.)",
          "german": "au cinéma"
        },
        {
          "id": "p2",
          "english": "from the train (le train, m.)",
          "german": "du train"
        },
        {
          "id": "p3",
          "english": "to the station (la gare, f.)",
          "german": "à la gare"
        },
        {
          "id": "p4",
          "english": "from the house (la maison, f.)",
          "german": "de la maison"
        },
        {
          "id": "p5",
          "english": "to the hotel (l'hôtel, mute H)",
          "german": "à l'hôtel"
        }
      ],
      "target_answer": "au cinéma, du train, à la gare, de la maison, à l'hôtel",
      "meaning": "to the cinema (le cinéma, m.), from the train (le train, m.), to the station (la gare, f.), from the house (la maison, f.), to the hotel (l'hôtel, mute H)",
      "explanation": "Masculine consonant fuses (au/du); feminine stays separate (à la/de la); vowel/mute-H elides (à l'/de l').",
      "id": "fr1301_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Complete the sentence: 'I am coming from the restaurant and going to the station' (le restaurant, la gare):",
      "options": [
        "Je viens de le restaurant et je vais à la gare",
        "Je viens du restaurant et je vais au gare",
        "Je viens du restaurant et je vais à la gare"
      ],
      "target_answer": "Je viens du restaurant et je vais à la gare",
      "meaning": "from the restaurant (du) and to the station (à la)",
      "explanation": "de + le restaurant fuses into du restaurant; feminine la gare takes à la gare.",
      "id": "fr1301_e2"
    },
    {
      "type": "derive",
      "prompt": "Fuse the preposition and article: 'to the restaurant' (à + le restaurant) →",
      "english_hint": "à + le = au",
      "target_answer": "au restaurant",
      "meaning": "to / at the restaurant",
      "explanation": "à + le restaurant → au restaurant.",
      "id": "fr1301_e3"
    },
    {
      "id": "fr1301_e4",
      "type": "spoken_turn_reply",
      "prompt": "Reply to the question in French:",
      "spoken_question": "Où est-ce que vous habitez maintenant ?",
      "question_meaning": "Where do you live now?",
      "reply_idea": "Reply that we live in Paris now.",
      "cues": [
        "Start with Nous habitons...",
        "Place à Paris maintenant after the verb."
      ],
      "word_bank": [
        "habitons",
        "où",
        "ils",
        "Nous",
        "à",
        "Paris",
        "maintenant"
      ],
      "target_answer": "Nous habitons à Paris maintenant",
      "meaning": "We live in Paris now",
      "explanation": "To answer an où question with a city, French pairs habiter with the preposition à: Nous habitons à Paris."
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "Nous allons au restaurant à côté de la gare",
      "replays": 2,
      "target_answer": "Nous allons au restaurant à côté de la gare",
      "meaning": "We are going to the restaurant next to the station",
      "cues": [
        "Nous allons au restaurant",
        "à côté de la gare"
      ],
      "explanation": "au restaurant (m. fusion) + de la gare (f. non-fusion).",
      "affirmation": "You contrasted au restaurant and de la gare accurately.",
      "id": "fr1301_e5"
    }
  ],
  "summary": {
    "outcome": "Apply the 3-way check (au/du vs. à la/de la vs. à l'/de l') across masculine, feminine, and vowel-initial nouns.",
    "use_example": {
      "german": "Je sors de l'hôtel et je vais au café en face de la gare.",
      "english": "I leave the hotel and go to the café across from the station."
    },
    "takeaway": "Vowel → à l' / de l'; Feminine → à la / de la; Masculine → au / du.",
    "curiosity_teaser": "Up next on Le Pont ([1302] Chez, the House Word): see how au & du Fusions leads directly into Chez, the House Word."
  },
  "twist": {
    "prompt": "Think it through again without looking back — express \"We are going to the restaurant next to the station\" in French:",
    "target_answer": "Nous allons au restaurant à côté de la gare",
    "word_bank": [
      "la",
      "gare",
      "pas",
      "restaurant",
      "au",
      "Nous",
      "côté",
      "de",
      "ne",
      "allons",
      "à"
    ],
    "explanation": "Re-constructing \"Nous allons au restaurant à côté de la gare\" from the underlying rule cements the pattern of au & du Fusions."
  }
};

export default lesson;
