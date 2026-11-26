import { PANORAMA_LINKS } from "@/data/panorama-links";
import { PanoramaView } from "@/app/panorama/PanoramaView";
import { DesignFrame } from "@/components/design/DesignFrame";

export default function DesignPanoramaPage() {
  return (
    <DesignFrame
      eyebrow="Structural Atlas"
      title="Grammar Panorama"
      subtitle="See the complete grammar architecture of German, Dutch, French, and Spanish on one page, linked straight to the lessons that teach each pattern."
      maxWidth="6xl"
    >
      <div className="design-card p-2 sm:p-4">
        <PanoramaView linksByLanguage={PANORAMA_LINKS} />
      </div>
    </DesignFrame>
  );
}
