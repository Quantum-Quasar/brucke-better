"use client";

import ReviewPage from "@/app/review/page";
import { DesignFrame } from "@/components/design/DesignFrame";

export default function DesignReviewPage() {
  return (
    <DesignFrame
      eyebrow="Spaced Repetition"
      title="Review Deck"
      subtitle="FSRS-4.5 adaptive recall — tough cognates resurface sooner while mastered words stretch cleanly into long-term memory."
      maxWidth="4xl"
    >
      <div className="design-card p-2 sm:p-4">
        <ReviewPage />
      </div>
    </DesignFrame>
  );
}
