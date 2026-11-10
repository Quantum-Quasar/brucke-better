import type { ExerciseItem } from "./types";

/** The German surfaces a learner actually produces or matches in an exercise.
 * Distractor word banks and English glosses are excluded so a guess flag only
 * touches words the exercise really retrieves. */
function germanSurfaces(exercise: ExerciseItem): string[] {
  const surfaces: string[] = [];
  if (exercise.target_answer) surfaces.push(exercise.target_answer);
  surfaces.push(...(exercise.accepted_answers ?? []));
  if (exercise.german) surfaces.push(exercise.german);
  if (exercise.spoken) surfaces.push(exercise.spoken);
  if (exercise.full_sentence) surfaces.push(exercise.full_sentence);
  for (const pair of exercise.matching_pairs ?? []) surfaces.push(pair.german);
  return surfaces;
}

function tokenize(text: string): string[] {
  return text.toLowerCase().match(/[\p{L}]+/gu) ?? [];
}

/** Which of the lesson's taught words this exercise actually retrieves. Scopes
 * "I guessed" to the words under the learner's fingers instead of every word in
 * the lesson. Only ids present in `wordIds` are returned; an exercise that
 * retrieves none of them flags nothing rather than the whole lesson. */
export function exerciseWordIds(exercise: ExerciseItem, wordIds: string[]): string[] {
  const tokens = new Set<string>();
  for (const surface of germanSurfaces(exercise)) {
    for (const token of tokenize(surface)) tokens.add(token);
  }
  const seen = new Set<string>();
  const matched: string[] = [];
  for (const rawId of wordIds) {
    const id = rawId.trim().toLowerCase();
    if (!id || seen.has(id)) continue;
    seen.add(id);
    // Word ids are the German word lowercased; a multi-word id matches only if
    // every one of its tokens is retrieved by the exercise.
    const idTokens = tokenize(id);
    if (idTokens.length > 0 && idTokens.every((token) => tokens.has(token))) matched.push(id);
  }
  return matched;
}