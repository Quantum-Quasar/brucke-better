"use client";

import CanDoChecklistPage from "@/app/cando/page";
import { TastePageFrame } from "@/components/taste/TastePageFrame";

export default function TasteCanDoPage() {
  return (
    <TastePageFrame eyebrow="CEFR Milestones" backHref="/taste" backLabel="Trail">
      <CanDoChecklistPage />
    </TastePageFrame>
  );
}
