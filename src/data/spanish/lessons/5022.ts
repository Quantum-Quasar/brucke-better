import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5022,
  "slug": "lesson-5022",
  "title": "Minimal Pairs: Clean Vowels",
  "subtitle": "mesa, casa, música, cinco, ocho — five words that prove the vowels never glide",
  "phase": 1,
  "shift_categories": [],
  "word_ids": [
    "mesa",
    "casa",
    "música",
    "cinco",
    "ocho",
    "buena"
  ],
  "table_word_ids": [
    "mesa",
    "casa",
    "música",
    "cinco",
    "ocho"
  ],
  "hook": {
    "title": "Five Words, Five Vowels, Zero Slides",
    "content": "Lesson 5021 trained the five pure vowels. Now hear them hold their ground inside real words: mesa (clean e), casa (clean a), música (clean i and u), cinco (clean i), ocho (clean o). English vowels slide as they leave — say 'no' and you hear a little oo-glide at the end. Spanish vowels plant themselves and stop.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Why this matters at the market",
        "content": "Cinco and ocho are the prices you say all day. Glide the i in cinco and you are selling quincos; glide the o in ocho and the price changes. Pure vowels are exact change.",
        "interest": true
      }
    ]
  },
  "pattern": {
    "title": "Plant the Vowel, Stop the Glide",
    "content": "Each vowel holds one sound wherever it sits: mesa, casa, música, cinco, ocho. Say the vowel and cut it cleanly — no English slide, no diphthong, no fade-out.",
    "linguist_note": "The five vowels came from Latin and never drifted — that stability is why Spanish spelling stays so readable.",
    "trap_note": "The o in ocho dies at the end: a clean o, not the English 'oh-oo' slide. One vowel, one cut."
  },
  "exercises": [
    {
      "type": "matching_pairs",
      "prompt": "Match each vowel-test word with its meaning:",
      "matching_pairs": [
        {
          "id": "p1",
          "english": "table",
          "german": "mesa"
        },
        {
          "id": "p2",
          "english": "house",
          "german": "casa"
        },
        {
          "id": "p3",
          "english": "music",
          "german": "música"
        },
        {
          "id": "p4",
          "english": "five",
          "german": "cinco"
        },
        {
          "id": "p5",
          "english": "eight",
          "german": "ocho"
        }
      ],
      "target_answer": "mesa, casa, música, cinco, ocho",
      "meaning": "table, house, music, five, eight",
      "explanation": "Five words, five vowels — every one of them planted and stopped, never glided.",
      "id": "es5022_e1"
    },
    {
      "type": "shift_select",
      "prompt": "Which word means 'five' — and holds a clean i between the k-sounds?",
      "options": [
        "cinco",
        "cuatro",
        "ocho"
      ],
      "target_answer": "cinco",
      "meaning": "five",
      "explanation": "cinco — say it without the English glide and the i stays exactly where Latin put it.",
      "id": "es5022_e2"
    },
    {
      "type": "derive",
      "prompt": "Write the Spanish word for 'music' — keep the u as pure as the i:",
      "english_hint": "Latin musica, accent on the ú",
      "target_answer": "música",
      "meaning": "music",
      "explanation": "música — the accent marks the stress, and both vowels stay planted.",
      "id": "es5022_e3"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say: the table is in the house",
      "cues": [
        "the order: noun first, then location",
        "location takes está"
      ],
      "idea_parts": [
        "the table → La mesa",
        "is in the house → está en la casa"
      ],
      "target_answer": "La mesa está en la casa",
      "meaning": "The table is in the house",
      "word_bank": [
        "La",
        "mesa",
        "está",
        "en",
        "la",
        "casa",
        "música"
      ],
      "explanation": "La mesa está en la casa — three a's and one e, every vowel planted.",
      "diagnosis": {
        "slip": "glided the final o sounds",
        "cue": "Cut each vowel cleanly — casa has no slide, neither does mesa."
      },
      "id": "es5022_e4"
    },
    {
      "type": "dictation",
      "prompt": "Listen and write the whole sentence.",
      "spoken": "La música es buena",
      "replays": 2,
      "target_answer": "La música es buena",
      "meaning": "The music is good",
      "cues": [
        "It means: The music is good",
        "Two vowels to watch: ú and i in música"
      ],
      "explanation": "La música es buena — a sentence you can audit vowel by vowel.",
      "affirmation": "You wrote the vowel test and passed it: every sound stayed pure.",
      "id": "es5022_e5"
    }
  ],
  "summary": {
    "outcome": "Keep all five vowels pure inside real words, from prices (cinco, ocho) to places (mesa, casa).",
    "use_example": {
      "german": "La música es buena",
      "english": "The music is good"
    },
    "takeaway": "Plant the vowel, stop the glide — Spanish vowels keep their promises.",
    "curiosity_teaser": "Up next ([2] The -CIÓN Bridge): convert thousands of -tion nouns whole — and discover they are all feminine!"
  },
  "twist": {
    "prompt": "One more, no safety net — say: the table is in the house:",
    "target_answer": "La mesa está en la casa",
    "word_bank": [
      "La",
      "mesa",
      "está",
      "en",
      "la",
      "casa",
      "es"
    ],
    "explanation": "Rebuilding \"La mesa está en la casa\" — location estar, pure vowels, nothing glided."
  }
};

export default lesson;
