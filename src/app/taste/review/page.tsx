"use client";

import ReviewPage from "@/app/review/page";
import { TastePageFrame } from "@/components/taste/TastePageFrame";

export default function TasteReviewPage() {
  return (
    <TastePageFrame eyebrow="Spaced Repetition" backHref="/taste" backLabel="Trail">
      <ReviewPage />
    </TastePageFrame>
  );
}
