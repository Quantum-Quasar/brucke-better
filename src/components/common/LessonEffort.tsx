import { estimateLessonEffort } from "@/lib/lesson-effort";

export function LessonEffort({ exerciseCount }: { exerciseCount: number }) {
  const estimate = estimateLessonEffort(exerciseCount);
  return (
    <p className="text-xs font-mono text-[var(--sub-color)]" title="Rough first-pass estimate: reading plus about 20 seconds per exercise. Retries and optional activities add time.">
      ~{estimate.minutes} min · {estimate.exerciseCount} {estimate.exerciseCount === 1 ? "exercise" : "exercises"} + retries
    </p>
  );
}
