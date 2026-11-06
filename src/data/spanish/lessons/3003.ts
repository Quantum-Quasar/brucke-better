import type { Lesson } from "@/lib/types";

const lesson: Lesson = {
  "id": 3003,
  "slug": "whole-trail-review-game",
  "title": "The Whole-Trail Review Game",
  "subtitle": "Mixed-mode synthesis across all 30 topics of El Puente",
  "phase": 5,
  "shift_categories": [
    "cion",
    "dad",
    "mente",
    "ar_engine",
    "ico",
    "al",
    "f_to_h",
    "ct_to_ch",
    "pl_cl_fl_to_ll"
  ],
  "word_ids": [
    "confirmar",
    "perfectamente",
    "saber",
    "conocer",
    "gustar",
    "gustaría",
    "ojalá",
    "poner",
    "mantener",
    "hecho",
    "se",
    "lo"
  ],
  "table_word_ids": [
    "confirmar",
    "perfectamente",
    "saber",
    "conocer",
    "gustar",
    "gustaría",
    "ojalá",
    "poner",
    "mantener",
    "hecho",
    "se",
    "lo"
  ],
  "hook": {
    "title": "The Complete Architecture of Spanish in Your Hands",
    "content": "In this final capstone lesson of the main trail, we put every major mechanism on stage together: conversion bridges, verb dynasties, ser vs estar, preterite vs imperfect vs present perfect, desde hace, por vs para, saber vs conocer, double object pronouns (se lo), gustar, the conditional, and the subjunctive!"
  },
  "pattern": {
    "title": "Thinking in Spanish, Not Memorizing",
    "content": "Notice how every sentence you build is assembled from clear logical blocks rather than memorized phrasebook lines."
  },
  "exercises": [
    {
      "type": "morpheme_tiles",
      "prompt": "Assemble the polite conditional 'would please / would like' from its infinitive and ending:",
      "tile_options": [
        "ía",
        "gustar",
        "aba",
        "ó"
      ],
      "target_answer": "gustaría",
      "meaning": "me gustaría (I would like)",
      "explanation": "Full infinitive gustar + -ía = gustaría.",
      "id": "es3003_e1"
    },
    {
      "type": "family_matrix",
      "prompt": "Complete the Verb Dynasty Matrix by writing the 1st-person present ('yo') of 'suponer' ('I suppose'):",
      "rows": [
        "poner (to put)",
        "proponer (to propose)",
        "suponer (to suppose)"
      ],
      "columns": [
        "Infinitive (-poner)",
        "Present 'yo' (-pongo)"
      ],
      "cells": [
        [
          {
            "german": "poner",
            "english": "to put"
          },
          {
            "german": "pongo",
            "english": "I put"
          }
        ],
        [
          {
            "german": "proponer",
            "english": "to propose"
          },
          {
            "german": "propongo",
            "english": "I propose"
          }
        ],
        [
          {
            "german": "suponer",
            "english": "to suppose"
          },
          {
            "german": "supongo",
            "english": "I suppose"
          }
        ]
      ],
      "seed": [
        [
          0,
          0
        ],
        [
          0,
          1
        ],
        [
          1,
          0
        ],
        [
          1,
          1
        ],
        [
          2,
          0
        ]
      ],
      "task": {
        "row": 2,
        "column": 1
      },
      "target_answer": "supongo",
      "meaning": "I suppose (yo supongo)",
      "row_law": "Every member of the -poner dynasty conjugates identically to poner.",
      "column_law": "Column 1 is the infinitive; Column 2 is the 1st-person singular present (-pongo).",
      "explanation": "poner → pongo, proponer → propongo, suponer → supongo!",
      "id": "es3003_e2"
    },
    {
      "type": "variant_english",
      "prompt": "Select every English sentence that matches the meaning of 'Me gustaría visitar Madrid mañana':",
      "german": "Me gustaría visitar Madrid mañana",
      "meaning": "I would like / I'd love to visit Madrid tomorrow",
      "renderings": [
        "I would like to visit Madrid tomorrow",
        "I'd like to visit Madrid tomorrow"
      ],
      "traps": [
        "I visited Madrid yesterday",
        "You have to visit Madrid today"
      ],
      "target_answer": "I would like to visit Madrid tomorrow",
      "explanation": "Me gustaría + infinitive expresses a polite conditional wish ('I would like to...').",
      "id": "es3003_e3"
    },
    {
      "type": "literal_gloss",
      "prompt": "Which English word-for-word blueprint mirrors Spanish 'Se lo voy a dar a mi madre'?",
      "german": "Se lo voy a dar a mi madre",
      "natural": "I am going to give it to my mother",
      "options": [
        "Herself it goes to give my mother",
        "It to her I give to my mother",
        "I am going to give it to my mother",
        "To-her it I-go to to-give to my mother"
      ],
      "target_answer": "To-her it I-go to to-give to my mother",
      "meaning": "I am going to give it to my mother (literal Spanish blueprint: To-her it I-go to to-give to my mother)",
      "explanation": "Se ('To-her', replacing le before lo) + lo ('it') + voy a dar ('I-go to to-give') + a mi madre ('to my mother').",
      "id": "es3003_e4"
    },
    {
      "type": "transcribe",
      "prompt": "Tell me:",
      "idea": "say: 'I know Madrid, I know your brother, and I know where the station is'",
      "cues": [
        "I know Madrid (place → conocer) → Conozco Madrid,",
        "I know your brother (person → conocer + personal a!) → conozco a tu hermano",
        "and I know where it is (fact/clause → saber) → y sé dónde está la estación"
      ],
      "idea_parts": [
        "I know Madrid → Conozco Madrid,",
        "I know your brother → conozco a tu hermano",
        "and I know where the station is → y sé dónde está la estación"
      ],
      "target_answer": "Conozco Madrid, conozco a tu hermano y sé dónde está la estación",
      "meaning": "I know Madrid, I know your brother, and I know where the station is",
      "word_bank": [
        "Conozco",
        "y",
        "a",
        "Madrid",
        "Sé",
        "la",
        "el",
        "hermano",
        "tu",
        "estación",
        "está",
        "es",
        "dónde",
        "conozco",
        "sé"
      ],
      "explanation": "Conozco Madrid (city), conozco a tu hermano (person + a), y sé dónde está la estación (fact clause + estar for location)!",
      "id": "es3003_e5"
    }
  ],
  "summary": {
    "outcome": "Integrate all conversion bridges, verb tenses, pronoun systems, and moods across the entire Spanish course.",
    "use_example": {
      "german": "Conozco Madrid, comprendo perfectamente lo que dices y ojalá tengas tiempo para celebrar.",
      "english": "I know Madrid, I understand perfectly what you say, and I hope you have time to celebrate."
    },
    "takeaway": "You now own the structural engine of Spanish — every new word you hear will snap into this framework.",
    "curiosity_teaser": "Explore the 15 Support Branches along the trail to practice travel, tapas, boot verbs, professions, and daily life in depth!"
  },
  "twist": {
    "prompt": "Assemble: 'I understand perfectly what you want'",
    "target_answer": "Comprendo perfectamente lo que quieres",
    "word_bank": [
      "que",
      "perfectamente",
      "lo",
      "quieres",
      "quiero",
      "Comprendo",
      "la",
      "perfecto"
    ],
    "explanation": "Comprendo perfectamente lo que quieres."
  }
};

export default lesson;
