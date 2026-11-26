"use client";

import { DesignFrame } from "@/components/design/DesignFrame";
import { MistakeNotebook } from "@/components/common/MistakeNotebook";

export default function DesignMistakesPage() {
  return (
    <DesignFrame
      eyebrow="Personal Diagnostics"
      title="Mistake Notebook"
      subtitle="Every slip logged locally in this browser — inspect patterns, replay audio, and convert recurring misses into durable cognates."
      showBackToTrail
      maxWidth="3xl"
    >
      <div className="design-card p-4 sm:p-6">
        <MistakeNotebook />
      </div>
    </DesignFrame>
  );
}
