"use client";

import React from "react";
import ClassicExercise from "./ClassicExercise";
import { TranscribeExercise } from "./TranscribeExercise";
import { LiteralGloss } from "./LiteralGloss";
import { DictationExercise } from "./DictationExercise";
import { FamilyMatrixExercise } from "./FamilyMatrixExercise";
import { VariantEnglishExercise } from "./VariantEnglishExercise";
import { PronounCompressionExercise } from "./PronounCompressionExercise";
import { SpokenTurnReplyExercise } from "./SpokenTurnReplyExercise";
import type { ExerciseWidgetProps } from "./exercise-widget-props";

const ExerciseContent: React.FC<ExerciseWidgetProps> = ({
  exercise,
  lessonId,
  onSuccess,
  onError,
  isRetry = false,
  recallFirst = false,
  onQueueRetry,
  onPurpleForfeit,
  onFlagGuessed,
}) => {
  // TM-1/TM-2: the production-drill types are self-contained widgets with their
  // own cue ladders / option flow; they reuse the same feedback sheets.
  if (exercise.type === "transcribe" || (exercise.type === "syntax_builder" && recallFirst)) {
    return (
      <TranscribeExercise
        exercise={exercise}
        isRetry={isRetry}
        recallFirst={recallFirst}
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
      lessonId={lessonId}
      onSuccess={onSuccess}
      onError={onError}
      isRetry={isRetry}
      onQueueRetry={onQueueRetry}
      onFlagGuessed={onFlagGuessed}
    />
  );
};

export default function ExerciseWidgetContent(props: ExerciseWidgetProps) {
  return (
    <div role="group" aria-label={props.exercise.prompt} data-exercise-type={props.exercise.type}>
      <ExerciseContent {...props} />
    </div>
  );
}
