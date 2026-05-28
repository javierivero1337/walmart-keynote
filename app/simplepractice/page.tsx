import SlideDeck from "@/components/SlideDeck";
import {
  SIMPLEPRACTICE_DECK_IMAGE_URLS,
  SIMPLEPRACTICE_SLIDES_CONFIG,
} from "@/lib/simplepractice-slides-config";

export default function SimplePracticePage() {
  return (
    <main className="h-dvh w-full overflow-hidden bg-pitch-black text-[#0a0f0c]">
      <SlideDeck
        imageUrls={SIMPLEPRACTICE_DECK_IMAGE_URLS}
        slideConfigs={SIMPLEPRACTICE_SLIDES_CONFIG}
        slideRuntimeProps={{
          coverWebsiteLabel: "javierivero.com",
          coverTitleLine1: "Cómo sobrevivir",
          coverTitleLine2: "la era de la IA",
          enableHumanSkillBulletReveal: true,
          hideCollectiveLogo: true,
        }}
        topCenterLabel="javierivero.com"
        topCenterLabelInvertedSlideIds={[
          "slide_9_curiosity",
          "slide_10_initiative",
          "slide_11_optimism",
        ]}
        topCenterLabelHiddenSlideIds={["slide_1_title"]}
        topCenterLabelRightSlideIds={["slide_4_curve"]}
      />
    </main>
  );
}
