import { PANORAMA_LINKS } from "@/data/panorama-links";
import { PanoramaView } from "@/app/panorama/PanoramaView";
import { TastePageFrame } from "@/components/taste/TastePageFrame";

export default function TastePanoramaPage() {
  return (
    <TastePageFrame eyebrow="Grammar Panorama" backHref="/taste" backLabel="Trail">
      <PanoramaView linksByLanguage={PANORAMA_LINKS} />
    </TastePageFrame>
  );
}
