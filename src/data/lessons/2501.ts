import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 2501,
  "slug": "geben-and-give-family-tour",
  "title": "geben & give Family Tour",
  "subtitle": "geben/Gabe/vergeben radiation — with the Perfekt forms gab and gegeben",
  "phase": 3,
  "shift_categories": [
    "v_to_b",
    "strong_verbs_ablaut"
  ],
  "word_ids": [
    "geben",
    "vergessen",
    "haben",
    "gefallen",
    "mir",
    "kind"
  ],
  "table_word_ids": [
    "geben",
    "gefallen",
    "vergessen",
    "haben",
    "mir",
    "kind",
    "wind",
    "rolle",
    "blitz",
    "kosten",
    "kirsche",
    "ehrlich",
    "lippe",
    "apotheker",
    "übermorgen"
  ],
  "hook": {
    "title": "One Root, a Dynasty",
    "content": "geben is not one word — it is a dynasty. The verb geben (give) radiates: die Gabe (the gift — the verb frozen into a noun), vergeben (to forgive — literally to give completely away, the exact construction of for-give!), das Geschenk (the gift — a different root, the false-friend Gift is 'poison'!), es gibt (there is — literally 'it gives', the same impersonal trick as French il y a). And the ablaut forms you own: gab, gegeben. English runs the same dynasty from give: gift, forgive, given. Walk the family tree and every branch is a twin.",
    "footnotes": [
      {
        "interest": true,
        "marker": "1",
        "title": "Forgive and vergeben: the Same Coinage",
        "content": "Both 'forgive' and 'vergeben' are 'give completely away' — for-/ver- intensifying the giving into release. Two languages coined the same metaphor independently... because they inherited the parts from the same toolbox. Even 'die Gabe' and 'gift' are the same ancient noun, which is exactly why German's Gift (poison) is the false-friend deck's star trap."
      }
    ]
  },
  "pattern": {
    "title": "The Dynasty Walk",
    "content": "The verb: geben, gab, gegeben ↔ give, gave, given. The impersonal: es gibt ↔ there is ('it gives') — Es gibt ein Problem. The noun: die Gabe (the gift/talent — 'a giving'), with English gift as the twin. The prefix verb: vergeben, vergab, vergeben ↔ forgive, forgave, forgiven — ver-/for- + geben/give, the complete dynasty in one word. The feeling form: gefallen (it falls to me = it pleases me) — a different root but the same dative grammar: Es gefällt mir. Sentence plan: Ich habe ihm das Buch gegeben — geben, dative receiver, accusative thing, participle closing the bracket.",
    "footnotes": [],
    "linguist_note": "'Es gibt' is the Germanic version of existence-as-giving: God gives, therefore there is. English kept the construction only in fossil phrases ('there's' was once 'there is' the same way). The Perfekt: es hat gegeben — though Germans prefer es gab for the past."
  },
  "exercises": [
    {
      "id": "l2501_e1",
      "type": "matching_pairs",
      "prompt": "The dynasty — match each family member with its English twin. Then recall earlier vocabulary in the short phrases:",
      "matching_pairs": [
        {
          "id": "gv1",
          "english": "to give",
          "german": "geben"
        },
        {
          "id": "gv2",
          "english": "to forgive",
          "german": "vergeben"
        },
        {
          "id": "gv3",
          "english": "the gift (talent)",
          "german": "die Gabe"
        },
        {
          "id": "gv4",
          "english": "there is",
          "german": "es gibt"
        },
        {
          "id": "recall1",
          "german": "Mein Glas ist voll",
          "english": "My glass is full"
        },
        {
          "id": "recall1b",
          "german": "Der Apfel ist gelb",
          "english": "The apple is yellow"
        },
        {
          "id": "recall2",
          "german": "Wir können glauben und hoffen",
          "english": "We can believe and hope"
        },
        {
          "id": "recall3",
          "german": "das Kalb",
          "english": "the calf"
        },
        {
          "id": "spaced1",
          "german": "Silber und Gold",
          "english": "silver and gold"
        }
      ],
      "target_answer": "geben, vergeben, die Gabe, es gibt, Mein Glas ist voll, Der Apfel ist gelb, Wir können glauben und hoffen, das Kalb, Silber und Gold",
      "meaning": "to give; to forgive; the gift (talent); there is; My glass is full; The apple is yellow; We can believe and hope; the calf; silver and gold",
      "explanation": "One root radiates through both languages: give, forgive, gift, 'it gives'."
    },
    {
      "id": "l2501_e2",
      "type": "shift_select",
      "prompt": "'Es gibt ein Problem' — what does 'gibt' literally mean here?",
      "options": [
        "takes",
        "was given",
        "exists (a different verb)",
        "gives — existence expressed as giving"
      ],
      "target_answer": "gives — existence expressed as giving",
      "meaning": "es gibt = 'it gives' = there is",
      "explanation": "German says 'it gives a problem' where English says 'there is' — the impersonal-give construction."
    },
    {
      "id": "l2501_e3",
      "type": "shift_select",
      "prompt": "Trap alert: which German word means a wrapped PRESENT, and which means POISON?",
      "options": [
        "das Geschenk = present; das Gift = poison",
        "Both mean poison",
        "das Gift = present; das Geschenk = poison",
        "Both mean present"
      ],
      "target_answer": "das Geschenk = present; das Gift = poison",
      "meaning": "The gift/poison false friend",
      "explanation": "Both descend from 'a giving': English kept the friendly branch (gift), German kept the dose branch (poison). Say das Geschenk for presents."
    },
    {
      "id": "l2501_e4",
      "type": "variant_english",
      "prompt": "Select EVERY honest English rendering of this V↔B shift sentence:",
      "german": "Wir haben sieben Bücher",
      "renderings": [
        "We have seven books",
        "We've got seven books"
      ],
      "traps": [
        "We had seven books",
        "They have seven books"
      ],
      "target_answer": "We have seven books",
      "meaning": "We have seven books",
      "explanation": "haben → have and sieben → seven both showcase the V↔B consonant bridge (while Gabe and Gift show how roots diverge). [Ref: Wir haben es ihm gegeben]"
    },
    {
      "id": "l2501_e5",
      "type": "syntax_builder",
      "prompt": "Assemble: 'I have given him the book'",
      "target_answer": "Ich habe ihm das Buch gegeben",
      "meaning": "I have given him the book",
      "word_bank": [
        "habe",
        "gegeben",
        "Ich",
        "Buch",
        "ihm",
        "das",
        "sind",
        "nach"
      ],
      "explanation": "The full dynasty in one bracket: geben's participle, the dative receiver ihm, the accusative thing — give gave given, to-him."
    }
  ],
  "summary": {
    "outcome": "Radiate geben into its noun, prefix-verbs, and Perfekt forms — and dodge the Gift trap.",
    "use_example": {
      "german": "Ich habe ihm das Buch gegeben.",
      "english": "I have given him the book."
    },
    "takeaway": "geben is a dynasty: Gabe, vergeben/forgive, es gibt — and das Gift is poison, say Geschenk for presents.",
    "curiosity_teaser": "Next: the v→b word hunt — the whole quiet family, hunted through the Atlas bridge."
  },
  "twist": {
    "prompt": "Without looking back — rebuild the core sentence from geben & give Family Tour (I have given him the book):",
    "target_answer": "Ich habe ihm das Buch gegeben",
    "word_bank": [
      "Ich",
      "heute",
      "ihm",
      "habe",
      "nicht",
      "Buch",
      "gegeben",
      "das"
    ],
    "explanation": "Re-assembling \"Ich habe ihm das Buch gegeben\" from scratch locks in the structural pattern of geben & give Family Tour without relying on short-term echo."
  }
};

export default lesson;
