import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 19,
  "slug": "strong-verbs-ancient-ablaut",
  "title": "Strong Verbs & Ancient Ablaut",
  "subtitle": "sing/sang/sung ↔ singen/sang/gesungen — the vowel melody, not endings",
  "phase": 3,
  "shift_categories": [
    "strong_verbs_ablaut"
  ],
  "word_ids": [
    "singen",
    "trinken",
    "finden",
    "geben",
    "nehmen",
    "fahren",
    "schreiben",
    "kommen",
    "sprechen",
    "schlafen",
    "blasen",
    "frieren",
    "tragen",
    "fliegen"
  ],
  "table_word_ids": [
    "singen",
    "trinken",
    "finden",
    "geben",
    "fahren",
    "sprechen",
    "nehmen",
    "schreiben",
    "kommen",
    "schlafen",
    "blasen",
    "frieren",
    "tragen",
    "fliegen",
    "bäckerei",
    "wunde"
  ],
  "hook": {
    "title": "The Vowel Melody",
    "content": "English never announces its irregular verbs with endings — it changes the VOWEL: sing, sang, sung. drink, drank, drunk. So does German, with the exact same vowels: singen, sang, gesungen. trinken, trank, getrunken. This is ablaut — the ancient Indo-European system of grading the root vowel — and it is the strongest proof of siblinghood in the entire language: nobody learns sing/sang/sung from a rule; both languages inherited the melody whole. The lesson is not memorization. It is hearing that you already know the tune.",
    "footnotes": [
      {
        "marker": "1",
        "title": "Strong Does Not Mean Difficult",
        "content": "'Strong' verbs (starke Verben) are the old Germanic verbs that form the past by vowel change; 'weak' verbs are the newer ones that added a -t/-te ending (English's -ed). The strong ones are a closed club — no new members — and you already belong: sing, drink, find, give, speak, come, take are all ancient members, and each has its German twin inside."
      }
    ]
  },
  "pattern": {
    "title": "Hear the Family, Then the Class",
    "content": "The e→i / a / o families: geben, gab, gegeben ↔ give, gave, given. sprechen, sprach, gesprochen ↔ speak, spoke, spoken. nehmen, nahm, genommen — its melody matches come/came (nehmen's true English twin is archaic nim, the word inside nimble). The a-families: finden, fand, gefunden ↔ find, found — the same class again. trinken, trank, getrunken ↔ drink, drank, drunk, vowel for vowel. The long families: fahren, fuhr, gefahren ↔ fare, fared — and schreiben, schrieb, geschrieben, the scribe family with its own strong melody. Every strong verb you own in English has a German twin singing the same three notes.",
    "footnotes": [],
    "linguist_note": "The classes go back to seven Proto-Germanic Ablaut classes (Wright's grammar catalogs them all). You do not need the numbering — you need the reflex: strong past = change the vowel, and ge- + -en for the participle (getrunken, geschrieben, gefahren)."
  },
  "exercises": [
    {
      "id": "l19_e1",
      "type": "matching_pairs",
      "prompt": "Match each English ablaut melody with its German twin:",
      "matching_pairs": [
        {
          "id": "ab1",
          "english": "sing / sang / sung",
          "german": "singen / sang / gesungen"
        },
        {
          "id": "ab2",
          "english": "drink / drank / drunk",
          "german": "trinken / trank / getrunken"
        },
        {
          "id": "ab3",
          "english": "find / found",
          "german": "finden / fand"
        },
        {
          "id": "ab4",
          "english": "give / gave / given",
          "german": "geben / gab / gegeben"
        },
        {
          "id": "ab5",
          "english": "blow / blew / blown",
          "german": "blasen / blies / geblasen"
        },
        {
          "id": "ab6",
          "english": "freeze / froze / frozen",
          "german": "frieren / fror / gefroren"
        }
      ],
      "target_answer": "singen / sang / gesungen, trinken / trank / getrunken, finden / fand, geben / gab / gegeben, blasen / blies / geblasen, frieren / fror / gefroren",
      "meaning": "the sing, drink, find, give, blow, and freeze melodies",
      "explanation": "The same three-note melody in both languages — ablaut is shared inheritance, not coincidence."
    },
    {
      "id": "l19_e2",
      "type": "shift_select",
      "prompt": "What changes when a strong verb goes into the past?",
      "options": [
        "A -te ending is added, like weak verbs",
        "The whole stem is replaced with a new word",
        "The root vowel — the ending stays out of it",
        "The final consonant shifts"
      ],
      "target_answer": "The root vowel — the ending stays out of it",
      "meaning": "Strong past = vowel change (ablaut)",
      "explanation": "singen → sang, trinken → trank: the vowel sings the tune. Endings belong to the weak (regular) system only. tragen and fliegen hum along: trug (wore), flog (flew) — the vowel IS the past tense."
    },
    {
      "id": "l19_e3",
      "type": "morpheme_tiles",
      "prompt": "Build the participle of 'finden' (the found-family):",
      "tile_options": [
        "fund",
        "fand",
        "ge",
        "t",
        "en"
      ],
      "target_answer": "gefunden",
      "meaning": "found",
      "explanation": "Strong participle: ge- + changed vowel + -en. fand's vowel u-pops into gefunden — exactly like found's ou."
    },
    {
      "id": "l19_e4",
      "type": "variant_english",
      "prompt": "English for Gib ihm das Buch — pick every shape that really says it:",
      "german": "Gib ihm das Buch",
      "renderings": [
        "Give him the book",
        "Give the book to him"
      ],
      "traps": [
        "Give to him the book",
        "Give him to the book"
      ],
      "target_answer": "Give him the book, Give the book to him",
      "meaning": "Give him the book",
      "explanation": "English says the same thought three ways and drops the 'to' in all of them. German never drops it — ihm *is* 'to him', in the dative's own shape. That is why German sounds like the word-for-word version: German kept the construction English quietly discarded.",
      "affirmation": "All three natural shapes, neither literal one — you matched the thought, not the word order."
    },
    {
      "id": "l19_e5",
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "you've been looking everywhere for the book — and you can finally announce: you have found the book",
      "idea_parts": [
        "who? → ich",
        "the auxiliary → habe",
        "what was found? → das Buch",
        "the strong participle → gefunden, parked at the end"
      ],
      "cues": [
        "Strong verb, three notes: finden, fand, gefunden — the melody's third note closes the bracket"
      ],
      "target_answer": "Ich habe das Buch gefunden",
      "meaning": "I have found the book",
      "affirmation": "You kept the melody's third note — gefunden closes the bracket the way sung closes 'have sung'.",
      "word_bank": [
        "habe",
        "das",
        "gefunden",
        "fand",
        "Buch",
        "Ich"
      ],
      "explanation": "Strong participle gefunden closes the Perfekt bracket: 'habe' opens, the melody's third note lands last."
    }
  ],
  "summary": {
    "outcome": "Recognize the shared ablaut melodies and form strong pasts and participles.",
    "use_example": {
      "german": "Ich habe das Buch gefunden.",
      "english": "I have found the book."
    },
    "takeaway": "Strong verbs change the root vowel — sing/sang ↔ singen/sang — and wear ge- + -en as participles.",
    "curiosity_teaser": "Next: sing/sang/sung Mirrors — practise German Ablaut forms with English memory clues."
  },
  "twist": {
    "prompt": "Now ask it: you have found the book → HAVE you found the book? (The helper flips to position 1.)",
    "target_answer": "Hast du das Buch gefunden",
    "word_bank": [
      "das",
      "Hast",
      "Buch",
      "du",
      "habe",
      "gefunden"
    ],
    "explanation": "In a question the helper haben takes position 1 and the subject follows — the participle still closes the bracket. Hast is the thou-form: 'Hast thou...?' was English once."
  }
};

export default lesson;
