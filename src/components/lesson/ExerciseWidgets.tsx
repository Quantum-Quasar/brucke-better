"use client";

import dynamic from "next/dynamic";

export const ExerciseWidget = dynamic(() => import("./ExerciseWidgetContent"), {
  ssr: false,
  loading: () => (
    <div className="py-10 text-center font-mono text-xs text-[var(--sub-color)]" role="status">
      loading exercise…
    </div>
  ),
});
