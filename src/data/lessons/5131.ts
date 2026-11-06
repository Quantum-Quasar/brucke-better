import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 5131,
  "slug": "wie-oft-immer-oft-manchmal-selten-einmal",
  "title": "Wie oft? immer, oft, manchmal, selten, einmal",
  "subtitle": "frequency without a helping verb — five single words doing English's -ly work",
  "phase": 3,
  "shift_categories": [
    "d_to_t"
  ],
  "word_ids": [
    "immer",
    "oft",
    "manchmal",
    "selten",
    "einmal",
    "morgen",
    "heute",
    "zeit",
    "kaffee",
    "trinken"
  ],
  "table_word_ids": [
    "immer",
    "oft",
    "manchmal",
    "selten",
    "einmal",
    "morgen",
    "heute",
    "zeit",
    "kaffee",
    "trinken",
    "schweinefleisch",
    "möglich",
    "wespe",
    "anfang",
    "haushalt",
    "tat"
  ],
  "hook": {
    "title": "English Needs a Helper, German Doesn't",
    "content": "To say how often in English you reach for a helper: I always drink coffee, I often drink coffee, I sometimes drink coffee. German needs none of that — immer, oft, manchmal are single words that drop straight into the sentence and stay put. There is no do-support, no -ly, no position rule to memorise. Two of the five hide a shift you already own: selten is seldom's twin wearing Tag's badge — German hardened seldom's seld- to selt- while English kept the D — and einmal is ein + Mal — one + time — the same doubling that built zweimal in topic 5. English kept the -mal half of that family and lost the German word for it.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "The Mal Family",
        "content": "Jedes Mal, ein Mal, zwei Mal — English and German split this word's jobs. English kept the root as the noun meal — das Mal's old twin, both from a root meaning 'mark, measure' — and built once and twice on it; German kept das Mal as noun AND built einmal, zweimal, dreimal on it. Both languages still say it: once and once."
      }
    ]
  },
  "pattern": {
    "title": "Where the Frequency Word Lands",
    "content": "Default slot: right after the verb, before the object. Ich trinke immer Kaffee (I always drink coffee). Freestyle fronting for emphasis: Immer trinke ich Kaffee — the adverb takes position 1 and pushes the conjugated verb to position 2, the same swap you do with heute and morgen. With negation: Ich trinke nicht oft Kaffee; nie is the absolute ('never') and sits exactly where nicht would. And the one-off: einmal means 'once', and its opposite einmalig is not needed — Einmal im Jahr fahre ich ans Meer does the job with an ordinary time phrase.",
    "footnotes": [],
    "linguist_note": "German's frequency adverbs are uninflected single words, which is why they never drift away from the verb. English bolted them on with -ly and let them wander to the front of the sentence; German's wandered and settled back into the same slot every time."
  },
  "exercises": [
    {
      "id": "l5131_e1",
      "type": "matching_pairs",
      "prompt": "Frequency — match each sentence with its reading:",
      "matching_pairs": [
        {
          "id": "hf1",
          "english": "I always drink coffee in the morning",
          "german": "Ich trinke immer Kaffee am Morgen"
        },
        {
          "id": "hf2",
          "english": "We often have time",
          "german": "Wir haben oft Zeit"
        },
        {
          "id": "hf3",
          "english": "Sometimes I read a book",
          "german": "Manchmal lese ich ein Buch"
        },
        {
          "id": "hf4",
          "english": "I seldom drink coffee",
          "german": "Ich trinke selten Kaffee"
        },
        {
          "id": "hf5",
          "english": "Once a year I go to the sea",
          "german": "Einmal im Jahr fahre ich ans Meer"
        }
      ],
      "target_answer": "Ich trinke immer Kaffee am Morgen, Wir haben oft Zeit, Manchmal lese ich ein Buch, Ich trinke selten Kaffee, Einmal im Jahr fahre ich ans Meer",
      "meaning": "always, often, sometimes, seldom, once a year",
      "explanation": "No helper verb anywhere: always/never/often/sometimes/once are all single German words sitting after the conjugated verb."
    },
    {
      "id": "l5131_e2",
      "type": "shift_select",
      "prompt": "'Ich trinke _____ Kaffee.' (I seldom drink coffee) — which word wears the D→T badge?",
      "options": [
        "immer",
        "manchmal",
        "selten",
        "oft"
      ],
      "target_answer": "selten",
      "meaning": "selten ↔ seldom: German hardened the D to T (seld- → selt-), English kept the D",
      "explanation": "selten is seldom's twin, and Tag's law is at work in it: German hardened the d of seld- to t (selt-), while English kept the D. Same word, same meaning — the shift simply worked on the German side."
    },
    {
      "id": "l5131_e3",
      "type": "shift_select",
      "prompt": "Fronted for emphasis: '_____ trinke ich Kaffee.' (Always I drink coffee):",
      "options": [
        "Nicht",
        "Sehr",
        "Schon",
        "Immer"
      ],
      "target_answer": "Immer",
      "meaning": "Immer trinke ich Kaffee = always I drink coffee",
      "explanation": "Fronting a frequency adverb swaps positions 1 and 2: the adverb takes position 1, and the conjugated verb (trinke) moves up behind it. Same rule as heute and morgen."
    },
    {
      "id": "l5131_e4",
      "type": "reverse_cognate",
      "prompt": "'einmal' = one + Mal — and das Mal has an English twin hiding in plain sight. What is the English word that survives?",
      "options": [
        "meal",
        "again",
        "never",
        "often"
      ],
      "target_answer": "meal",
      "meaning": "das Mal ↔ meal: the same old 'mark, measure' root, each language keeping a piece",
      "explanation": "das Mal is meal's twin — both from an ancient root meaning 'mark, measure' (English still keeps it in piecemeal). German kept das Mal as noun AND built the adverbs (einmal, zweimal) on it; English built once and twice on the same root. Time is a different root entirely."
    },
    {
      "id": "l5131_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'I always drink coffee in the morning'",
      "target_answer": "Ich trinke immer Kaffee am Morgen",
      "meaning": "I always drink coffee in the morning",
      "vocab_hints": [
        {
          "word": "immer",
          "translation": "always",
          "note": "immer goes straight after the conjugated verb — no helping word, no -ly. Ich trinke immer Kaffee."
        }
      ],
      "word_bank": [
        "trinke",
        "Morgen",
        "am",
        "Kaffee",
        "sehr",
        "Ich",
        "in",
        "immer"
      ],
      "explanation": "Verb in slot 2, immer in the slot behind it, then the object. am Morgen folds an + dem into one word — the dative of time; the accusative version is jeden Morgen, 'every morning'."
    }
  ],
  "summary": {
    "outcome": "Answer 'how often?' with one word, and slot it after the verb without a helper.",
    "use_example": {
      "german": "Manchmal trinke ich Kaffee.",
      "english": "Sometimes I drink coffee."
    },
    "takeaway": "immer, oft, manchmal, selten, einmal — five helperless adverbs, and selten is English seldom's D→T twin.",
    "curiosity_teaser": "Next: point-in-time adverbs — jetzt, sofort, später, früh, endlich."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from Wie oft? immer, oft, manchmal, selten, einmal (I always drink coffee in the morning):",
    "target_answer": "Ich trinke immer Kaffee am Morgen",
    "word_bank": [
      "trinke",
      "nicht",
      "Morgen",
      "Ich",
      "am",
      "Kaffee",
      "heute",
      "immer"
    ],
    "explanation": "Re-assembling \"Ich trinke immer Kaffee am Morgen\" from scratch locks in the structural pattern of Wie oft? immer, oft, manchmal, selten, einmal without relying on short-term echo."
  }
};

export default lesson;
