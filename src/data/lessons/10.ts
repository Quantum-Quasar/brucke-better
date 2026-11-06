import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 10,
  "slug": "pronouns-as-case-anchors",
  "title": "Pronouns as Case Anchors (The Him-Case)",
  "subtitle": "Why only masculine articles change in the accusative (der → den, er → ihn)",
  "phase": 2,
  "shift_categories": [],
  "word_ids": [
    "der",
    "die",
    "das",
    "tisch",
    "kaffee",
    "tee",
    "traum",
    "tag"
  ],
  "table_word_ids": [
    "der",
    "die",
    "das",
    "tisch",
    "kaffee",
    "tee",
    "traum",
    "tag",
    "wolke",
    "rücken",
    "schlüssel",
    "schinken",
    "feind",
    "etwas",
    "morgens",
    "wachsen"
  ],
  "hook": {
    "title": "The 'Him-Case' Secret",
    "content": "Every beginner wonders: Why does German change 'der' to 'den', 'ein' to 'einen', and 'er' to 'ihn' for direct objects, while feminine ('die/eine') and neuter ('das/ein') stay completely unchanged? The answer lies in your own native tongue. English does this exact thing: we say 'He saw the dog', but 'The dog bit HIM' (never 'bit he'). We say 'who' for the subject, but 'WHOM' for the object. That nasal ending is the ancient Indo-European direct object marker!",
    "footnotes": [
      {
        "marker": "1",
        "title": "The Accusative Nasal Marker",
        "content": "Proto-Indo-European marked the masculine accusative with *-m. In High German, an unstressed final -m shifted to -n (him ↔ ihn, whom ↔ wen)."
      }
    ]
  },
  "pattern": {
    "title": "The Masculine Accusative -N Rhyme",
    "content": "In Proto-Germanic, neuter and feminine nouns never marked accusative differently from nominative. Masculine singular is the lone survivor that raises a flag with the letter '-N' whenever it receives an action: der ➔ den, ein ➔ einen, kein ➔ keinen, mein ➔ meinen, and er ➔ ihn (the twin of English 'him'). Feminine and neuter nouns remain steadfastly identical (die bleibt die, das bleibt das). Once you recognize the 'Him-Case', you never mistake accusative articles again.",
    "footnotes": [
      {
        "marker": "2",
        "title": "M → N Nasal Alignment",
        "content": "English preserved the ancient accusative nasal in him/them/whom; German shifted final unstressed m to n in ihn/den/wen."
      }
    ],
    "trap_note": "Your mind will offer: “der becomes den because masculine.” The rule is smaller and more useful: the masculine tail moves because *him* moved. Ask which pronoun would replace the noun and the ending follows. Feminine and neuter objects keep their article because English her and it never changed shape either."
  },
  "exercises": [
    {
      "id": "l10_e1",
      "type": "morpheme_tiles",
      "prompt": "Assemble the masculine direct object article for 'a coffee' (ein + accusative -en):",
      "tile_options": [
        "ein",
        "der",
        "en",
        "em",
        "den"
      ],
      "target_answer": "einen",
      "meaning": "a (masculine accusative)",
      "shift_hint": "Masculine Accusative -n",
      "explanation": "Indefinite root 'ein' + masculine accusative marker '-en' = einen."
    },
    {
      "id": "l10_e2",
      "type": "matching_pairs",
      "prompt": "Match the English objective pronouns with their German accusative twins:",
      "matching_pairs": [
        {
          "id": "ac1",
          "english": "him",
          "german": "ihn"
        },
        {
          "id": "ac2",
          "english": "me",
          "german": "mich"
        },
        {
          "id": "ac3",
          "english": "thee / you",
          "german": "dich"
        },
        {
          "id": "ac4",
          "english": "us",
          "german": "uns"
        }
      ],
      "target_answer": "ihn, mich, dich, uns",
      "meaning": "him, me, thee/you, us",
      "shift_hint": "The 'Him-Case'",
      "explanation": "English preserved the ancient accusative/dative in him/me/thee/us; German preserves ihn/mich/dich/uns."
    },
    {
      "id": "l10_e3",
      "type": "shift_select",
      "prompt": "Why does 'der Kaffee' change to 'den Kaffee' in 'Ich trinke den Kaffee', but 'das Wasser' stays 'das Wasser'?",
      "options": [
        "Because coffee is a hot beverage",
        "In Germanic, only masculine singular marks the direct object with the nasal -n (cognate with English 'him' and 'whom')",
        "Because trinken only changes masculine verbs",
        "Neuter nouns are completely immune to verbs"
      ],
      "target_answer": "In Germanic, only masculine singular marks the direct object with the nasal -n (cognate with English 'him' and 'whom')",
      "meaning": "Masculine exclusivity of the accusative shift",
      "explanation": "Neuter and feminine nouns collapsed nominative and accusative in ancient Indo-European. Only masculine retains the distinct nasal accusative ending (-n in German, -m in English him/whom)."
    },
    {
      "id": "l10_e4",
      "type": "derive",
      "prompt": "Complete with the masculine accusative: 'Ich habe _____ Traum' (ein + masculine direct object ending):",
      "english_hint": "ein + en",
      "shift_hint": "der Traum → einen Traum",
      "target_answer": "einen",
      "meaning": "Ich habe einen Traum = I have a dream",
      "explanation": "'Traum' is masculine (der Traum). As the direct object of haben, it takes the accusative 'einen'."
    },
    {
      "id": "l10_e5",
      "type": "transcribe",
      "prompt": "How would you say:",
      "idea": "you're at a café table, people-watching: you're drinking a coffee and looking for him",
      "cues": [
        "Coffee is masculine and acted-on: ein → einen — the Him-Case on the article",
        "The pronoun follows the same law: er → ihn (suchen needs no preposition — the 'for' is baked in)"
      ],
      "target_answer": "Ich trinke einen Kaffee und suche ihn",
      "meaning": "I am drinking a coffee and looking for him",
      "vocab_hints": [
        {
          "word": "einen",
          "translation": "a (masculine direct object)",
          "note": "Kaffee is masculine: ein → einen"
        },
        {
          "word": "ihn",
          "translation": "him (direct object)",
          "note": "direct cognate of English 'him' (er → ihn)"
        }
      ],
      "word_bank": [
        "ihn",
        "einen",
        "suche",
        "trinke",
        "Ich",
        "Kaffee",
        "und",
        "er"
      ],
      "explanation": "Two clauses, one subject — and the masculine accusative shows twice: einen Kaffee, ihn. Him-case everywhere."
    }
  ],
  "summary": {
    "outcome": "Use den or einen for a masculine direct object and ihn for 'him' as an object.",
    "use_example": {
      "german": "Ich trinke einen Kaffee und suche ihn.",
      "english": "I drink a coffee and look for it."
    },
    "takeaway": "Only masculine singular changes in the accusative: der → den, ein → einen, and er → ihn (the 'Him-Case').",
    "curiosity_teaser": "Next: the den / einen / ihn case gym — the him-case drilled with real objects: trinke einen Kaffee, suche ihn."
  },
  "twist": {
    "prompt": "Same mouth, different order: I drink a coffee becomes I drink THE tea. (Careful — still masculine, still acted-on.)",
    "target_answer": "Ich trinke den Tee",
    "word_bank": [
      "einen",
      "Tee",
      "trinke",
      "den",
      "das",
      "Ich"
    ],
    "explanation": "Tee is masculine too, so the Him-Case holds: der → den. Only the masculine article bends — feminine and neuter objects would have refused to change."
  }
};

export default lesson;
