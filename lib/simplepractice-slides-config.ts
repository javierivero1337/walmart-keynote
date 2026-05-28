import { SLIDES_CONFIG, type SlideConfig } from "@/lib/slides-config";

const SIMPLEPRACTICE_SLIDE_IDS = [
  "slide_1_title",
  "slide_2_intro",
  "slide_3_catalyst",
  "slide_4_curve_intro",
  "slide_4_curve",
  "slide_7_trap",
  "slide_8_pivot",
  "slide_9_curiosity",
  "slide_10_initiative",
  "slide_11_optimism",
  "slide_12_synthesis",
  "slide_13_outro",
] as const;

function getSlideConfig(id: (typeof SIMPLEPRACTICE_SLIDE_IDS)[number]): SlideConfig {
  const slideConfig = SLIDES_CONFIG.find((slide) => slide.id === id);

  if (!slideConfig) {
    throw new Error(`Missing slide config for ${id}`);
  }

  return slideConfig;
}

export const SIMPLEPRACTICE_SLIDES_CONFIG: SlideConfig[] = SIMPLEPRACTICE_SLIDE_IDS.map((id) => {
  const slideConfig = getSlideConfig(id);

  if (id === "slide_1_title") {
    return {
      ...slideConfig,
      title: "Cómo sobrevivir la era de la IA",
    };
  }

  return slideConfig;
});

export const SIMPLEPRACTICE_DECK_IMAGE_URLS = [
  "/assets/cover.png",
  "/assets/Javier.webp",
  "/assets/curva.png",
  "/assets/falsostack.png",
  "/assets/verdadero.png",
  "/assets/curiosidad.png",
  "/assets/iniciativa.png",
  "/assets/optimismo.png",
] as const;
