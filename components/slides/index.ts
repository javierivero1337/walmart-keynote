import type { ComponentType } from "react";
import {
  Slide1Title,
  Slide2Intro,
  Slide3Catalyst,
  Slide4CurveIntro,
  Slide4Curve,
  Slide4Futuro,
  Slide4AgentDomains,
  Slide5Velocity,
  Slide6EntrenaIntro,
  Slide6Paradox,
  Slide7Trap,
  Slide8Pivot,
  Slide9Curiosity,
  Slide10Initiative,
  Slide11Optimism,
  Slide12Synthesis,
  Slide13Outro,
} from "./HumanStackSlides";

export interface SlideRuntimeProps {
  isStackTransitioning?: boolean;
  isSynthesisSubtextVisible?: boolean;
  onRevealSynthesisSubtext?: () => void;
  isAlphaZeroRevealed?: boolean;
  onRevealAlphaZero?: () => void;
  curveMilestoneIndex?: number;
  velocityCompanyIndex?: number;
  onSelectVelocityCompany?: (index: number) => void;
  isOutroCollapsed?: boolean;
}

export const SLIDE_COMPONENTS: Record<string, ComponentType<SlideRuntimeProps>> = {
  slide_1_title: Slide1Title,
  slide_2_intro: Slide2Intro,
  slide_3_catalyst: Slide3Catalyst,
  slide_4_curve_intro: Slide4CurveIntro,
  slide_4_curve: Slide4Curve,
  slide_4_futuro: Slide4Futuro,
  slide_4_agent_domains: Slide4AgentDomains,
  slide_5_velocity: Slide5Velocity,
  slide_6_entrena_intro: Slide6EntrenaIntro,
  slide_6_paradox: Slide6Paradox,
  slide_7_trap: Slide7Trap,
  slide_8_pivot: Slide8Pivot,
  slide_9_curiosity: Slide9Curiosity,
  slide_10_initiative: Slide10Initiative,
  slide_11_optimism: Slide11Optimism,
  slide_12_synthesis: Slide12Synthesis,
  slide_13_outro: Slide13Outro,
};

export {
  Slide1Title,
  Slide2Intro,
  Slide3Catalyst,
  Slide4CurveIntro,
  Slide4Curve,
  Slide4Futuro,
  Slide4AgentDomains,
  Slide5Velocity,
  Slide6EntrenaIntro,
  Slide6Paradox,
  Slide7Trap,
  Slide8Pivot,
  Slide9Curiosity,
  Slide10Initiative,
  Slide11Optimism,
  Slide12Synthesis,
  Slide13Outro,
};
