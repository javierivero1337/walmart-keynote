import { getImageProps } from "next/image";
import { DECK_IMAGE_URLS } from "@/lib/slides-config";

const PRELOAD_WIDTH = 3840;
const PRELOAD_HEIGHT = 2160;
const PRELOAD_QUALITY = 100;

const preloaded = new Set<string>();

export function preloadDeckImages(imageUrls: readonly string[] = DECK_IMAGE_URLS) {
  if (typeof document === "undefined") return;

  for (const src of imageUrls) {
    if (preloaded.has(src)) continue;
    preloaded.add(src);

    const { props } = getImageProps({
      src,
      alt: "",
      width: PRELOAD_WIDTH,
      height: PRELOAD_HEIGHT,
      quality: PRELOAD_QUALITY,
    });

    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = props.src;

    if (props.srcSet) {
      link.imageSrcset = props.srcSet;
      link.imageSizes = props.sizes ?? "100vw";
    }

    document.head.appendChild(link);
  }
}
