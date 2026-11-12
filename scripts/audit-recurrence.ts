import { LESSONS } from "../src/data/lessons";
import { compendium } from "../src/data/compendium";
import { flattenTrailNodes } from "../src/data/curriculum";
import {
  buildRecurrenceMap,
  recurrenceDeficits,
  referenceOnlyWordIds,
  RECURRENCE_LESSON_FLOOR,
  RECURRENCE_LESSON_TARGET,
} from "../src/lib/curriculum-recurrence";

const byId = new Map(LESSONS.map((lesson) => [lesson.id, lesson]));
const lessons = flattenTrailNodes().flatMap((node) => {
  const lesson = byId.get(node.id);
  return lesson ? [lesson] : [];
});
const rows = [...buildRecurrenceMap(lessons, compendium.words).values()];
const deficits = recurrenceDeficits(rows);
const referenceOnly = referenceOnlyWordIds(lessons, Object.keys(compendium.words));

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ floor: RECURRENCE_LESSON_FLOOR, target: RECURRENCE_LESSON_TARGET, words: rows, referenceOnly }, null, 2));
} else {
  console.log(`Taught: ${rows.length}; optional reference-only: ${referenceOnly.length}`);
  console.log(`Floor: assessed retrieval in ${RECURRENCE_LESSON_FLOOR} distinct lessons after introduction; target: ${RECURRENCE_LESSON_TARGET}.`);
  console.log("Exact German answer/translation surfaces only; no declarations, banks, hints, feedback, optional twists or duplicate surfaces.");
  for (const row of process.argv.includes("--all") ? rows : deficits) {
    const paths = row.encounters.map((hit) => `${hit.lessonId}/${hit.exerciseId}:${hit.exerciseType}`).join(", ");
    console.log(`${row.wordId} (introduced ${row.introducedIn}): ${row.lessonIds.length} lessons; ${paths || "NO ASSESSED RETRIEVAL"}`);
  }
  console.log(`Below floor: ${deficits.length}; at 3+ lessons: ${rows.filter((row) => row.lessonIds.length >= RECURRENCE_LESSON_TARGET).length}`);
}
if (process.argv.includes("--strict") && deficits.length) process.exitCode = 1;
