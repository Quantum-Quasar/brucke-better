"use client";

import { useAppStore } from "@/lib/store";
import { suggestedReviewLimit } from "@/lib/placement";
import { PlacementCheck } from "./PlacementCheck";

export function LearningPreferences({ languageId, topicCount }: { languageId: string; topicCount: number }) {
  const settings = useAppStore((s) => s.settings);
  const updateSetting = useAppStore((s) => s.updateSetting);

  return (
    <details className="rounded-lg border border-[var(--sub-color)]/25 p-4 font-mono text-xs text-[var(--sub-color)]" data-onboarding-local-keys>
      <summary className="min-h-11 flex items-center cursor-pointer font-bold text-[var(--main-color)]">Personalize your start (optional)</summary>
      <div className="space-y-5 pt-3">
        <p>Skip this and start now, or choose what fits. Your goal is a reminder, not a different or restricted course.</p>
        <fieldset className="space-y-2">
          <legend className="font-bold text-[var(--text-color)]">What brings you here? (optional)</legend>
          <div className="flex flex-wrap gap-2">
            {(["travel", "work", "exam", "fun"] as const).map((goal) => (
              <button key={goal} type="button" aria-pressed={settings.learningGoal === goal} onClick={() => updateSetting("learningGoal", goal)} className={`min-h-11 rounded border px-3 cursor-pointer ${settings.learningGoal === goal ? "border-[var(--main-color)] text-[var(--main-color)]" : "border-[var(--sub-color)]/30"}`}>{goal}</button>
            ))}
          </div>
        </fieldset>
        <fieldset className="space-y-2">
          <legend className="font-bold text-[var(--text-color)]">Daily time (optional)</legend>
          <div className="flex flex-wrap gap-2">
            {([5, 10, 20, 30] as const).map((minutes) => (
              <button key={minutes} type="button" aria-pressed={settings.dailyMinutes === minutes} onClick={() => {
                updateSetting("dailyMinutes", minutes);
                updateSetting("reviewSessionLimit", suggestedReviewLimit(minutes));
              }} className={`min-h-11 rounded border px-3 cursor-pointer ${settings.dailyMinutes === minutes ? "border-[var(--main-color)] text-[var(--main-color)]" : "border-[var(--sub-color)]/30"}`}>{minutes} min/day</button>
            ))}
          </div>
          <p>Suggests {suggestedReviewLimit(settings.dailyMinutes)} review items per session. Your review session picker can override this later; minutes are a budget, not a promise of completion.</p>
        </fieldset>
        <PlacementCheck key={languageId} languageId={languageId} />
        <div className="space-y-2">
          <label htmlFor="placement-topic" className="block font-bold text-[var(--text-color)]">Preferred starting topic (override the suggestion)</label>
          <select id="placement-topic" value={Math.min(settings.placementTopic, topicCount)} onChange={(event) => updateSetting("placementTopic", Number(event.target.value))} className="min-h-11 rounded border border-[var(--sub-color)]/30 bg-[var(--bg-color)] px-3 text-[var(--text-color)]">
            {Array.from({ length: topicCount }, (_, index) => index + 1).map((topic) => <option key={topic} value={topic}>Topic {topic}</option>)}
          </select>
          <p>This is a trail recommendation only. Start with lesson 1 or follow your existing progress; completing lessons and checkpoints is still how topics unlock.</p>
        </div>
      </div>
    </details>
  );
}
