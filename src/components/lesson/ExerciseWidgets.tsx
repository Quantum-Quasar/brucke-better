"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ExerciseLoading } from "./ExerciseLoading";
import type { ExerciseWidgetProps } from "./exercise-widget-props";

const TranscribeExercise = dynamic(
  () => import("./TranscribeExercise").then((module) => module.TranscribeExercise),
  { loading: ExerciseLoading }
);
const LiteralGloss = dynamic(
  () => import("./LiteralGloss").then((module) => module.LiteralGloss),
  { loading: ExerciseLoading }
);
const DictationExercise = dynamic(
  () => import("./DictationExercise").then((module) => module.DictationExercise),
  { loading: ExerciseLoading }
);
const FamilyMatrixExercise = dynamic(
  () => import("./FamilyMatrixExercise").then((module) => module.FamilyMatrixExercise),
  { loading: ExerciseLoading }
);
const VariantEnglishExercise = dynamic(
  () => import("./VariantEnglishExercise").then((module) => module.VariantEnglishExercise),
  { loading: ExerciseLoading }
);
const PronounCompressionExercise = dynamic(
  () => import("./PronounCompressionExercise").then((module) => module.PronounCompressionExercise),
  { loading: ExerciseLoading }
);
const SpokenTurnReplyExercise = dynamic(
  () => import("./SpokenTurnReplyExercise").then((module) => module.SpokenTurnReplyExercise),
  { loading: ExerciseLoading }
);

const ClassicExercise = dynamic(() => import("./ClassicExercise"), { loading: ExerciseLoading });

const ExerciseContent: React.FC<ExerciseWidgetProps> = ({
  exercise,
  onSuccess,
  onError,
  isRetry = false,
  onQueueRetry,
  onPurpleForfeit,
  onFlagGuessed,
}) => {
  // TM-1/TM-2: the production-drill types are self-contained widgets with their
  // own cue ladders / option flow; they reuse the same feedback sheets.
  if (exercise.type === "transcribe") {
    return (
      <TranscribeExercise
        exercise={exercise}
        isRetry={isRetry}
        onSuccess={onSuccess}
        onError={onError}
        onQueueRetry={onQueueRetry}
        onPurpleForfeit={onPurpleForfeit}
        onFlagGuessed={onFlagGuessed}
      />
    );
  }
  if (exercise.type === "literal_gloss") {
    return (
      <LiteralGloss
        exercise={exercise}
        isRetry={isRetry}
        onSuccess={onSuccess}
        onError={onError}
        onQueueRetry={onQueueRetry}
        onFlagGuessed={onFlagGuessed}
      />
    );
  }
  if (exercise.type === "dictation") {
    return (
      <DictationExercise
        exercise={exercise}
        isRetry={isRetry}
        onSuccess={onSuccess}
        onError={onError}
        onQueueRetry={onQueueRetry}
        onPurpleForfeit={onPurpleForfeit}
        onFlagGuessed={onFlagGuessed}
      />
    );
  }
  if (exercise.type === "family_matrix") {
    return (
      <FamilyMatrixExercise
        exercise={exercise}
        isRetry={isRetry}
        onSuccess={onSuccess}
        onError={onError}
        onQueueRetry={onQueueRetry}
        onFlagGuessed={onFlagGuessed}
      />
    );
  }
  if (exercise.type === "variant_english") {
    return (
      <VariantEnglishExercise
        exercise={exercise}
        isRetry={isRetry}
        onSuccess={onSuccess}
        onError={onError}
        onQueueRetry={onQueueRetry}
        onFlagGuessed={onFlagGuessed}
      />
    );
  }
  if (exercise.type === "pronoun_compression") {
    return (
      <PronounCompressionExercise
        exercise={exercise}
        isRetry={isRetry}
        onSuccess={onSuccess}
        onError={onError}
        onQueueRetry={onQueueRetry}
        onPurpleForfeit={onPurpleForfeit}
        onFlagGuessed={onFlagGuessed}
      />
    );
  }
  if (exercise.type === "spoken_turn_reply") {
    return (
      <SpokenTurnReplyExercise
        exercise={exercise}
        isRetry={isRetry}
        onSuccess={onSuccess}
        onError={onError}
        onQueueRetry={onQueueRetry}
        onPurpleForfeit={onPurpleForfeit}
        onFlagGuessed={onFlagGuessed}
      />
    );
  }

  return (
    <ClassicExercise
      exercise={exercise}
      onSuccess={onSuccess}
      onError={onError}
      isRetry={isRetry}
      onQueueRetry={onQueueRetry}
      onFlagGuessed={onFlagGuessed}
    />
  );
};

export const ExerciseWidget: React.FC<ExerciseWidgetProps> = (props) => (
  <div role="group" aria-label={props.exercise.prompt} data-exercise-type={props.exercise.type}>
    <ExerciseContent {...props} />
  </div>
);
