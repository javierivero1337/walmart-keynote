"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { SLIDES_CONFIG, type SlideConfig } from "@/lib/slides-config";
import { preloadDeckImages } from "@/lib/preload-deck-images";
import { SLIDE_COMPONENTS } from "@/components/slides";
import { CURVE_MILESTONE_COUNT, MUSK_ALGORITHM_STEP_COUNT, VELOCITY_COMPANY_COUNT } from "@/components/slides/HumanStackSlides";

const AUTOPLAY_DURATION = 8000;
const STACK_WORD_TRANSITION_DURATION = 1200;

const SEAMLESS_TRANSITION_PAIRS: ReadonlyArray<readonly [string, string]> = [
  ["slide_7_trap", "slide_8_pivot"],
  ["slide_8_pivot", "slide_7_trap"],
  ["slide_3_catalyst", "slide_4_curve_intro"],
  ["slide_4_curve_intro", "slide_3_catalyst"],
  ["slide_4_curve_intro", "slide_4_curve"],
  ["slide_4_curve", "slide_4_curve_intro"],
];

const SLIDES_WITH_INTERNAL_ENTER = new Set(["slide_4_curve_intro", "slide_6_entrena_intro", "slide_7_trap"]);

export default function SlideDeck() {
  const slides = SLIDES_CONFIG;
  const [current, setCurrent] = useState(0);
  const [isGridOpen, setIsGridOpen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [isFalsoStackTitleRevealed, setIsFalsoStackTitleRevealed] = useState(false);
  const [isStackTransitionPending, setIsStackTransitionPending] = useState(false);
  const [isSynthesisSubtextVisible, setIsSynthesisSubtextVisible] = useState(false);
  const [isAlphaZeroRevealed, setIsAlphaZeroRevealed] = useState(false);
  const [isOutroCollapsed, setIsOutroCollapsed] = useState(false);
  const [curveMilestoneIndex, setCurveMilestoneIndex] = useState(0);
  const [velocityCompanyIndex, setVelocityCompanyIndex] = useState(0);
  const [muskStepIndex, setMuskStepIndex] = useState(0);
  const [previousSlideId, setPreviousSlideId] = useState<string | null>(null);

  const deckRef = useRef<HTMLDivElement>(null);

  const currentSlide = slides[current];
  const ActiveSlide = SLIDE_COMPONENTS[currentSlide.id];

  const changeSlide = useCallback(
    (nextIndex: number) => {
      setPreviousSlideId(currentSlide.id);
      setIsFalsoStackTitleRevealed(false);
      setIsStackTransitionPending(false);
      setIsSynthesisSubtextVisible(false);
      setIsAlphaZeroRevealed(false);
      setIsOutroCollapsed(false);
      setCurveMilestoneIndex(0);
      setVelocityCompanyIndex(0);
      setMuskStepIndex(0);
      setCurrent(nextIndex);
      setIsGridOpen(false);
    },
    [currentSlide.id]
  );

  const nextSlide = useCallback(() => {
    if (currentSlide.id === "slide_6_paradox" && !isAlphaZeroRevealed) {
      setIsAlphaZeroRevealed(true);
      return;
    }

    if (currentSlide.id === "slide_7_trap") {
      if (!isFalsoStackTitleRevealed) {
        setIsFalsoStackTitleRevealed(true);
        return;
      }

      if (isStackTransitionPending) return;

      setIsStackTransitionPending(true);
      return;
    }

    if (currentSlide.id === "slide_12_synthesis" && !isSynthesisSubtextVisible) {
      setIsSynthesisSubtextVisible(true);
      return;
    }

    if (currentSlide.id === "slide_13_outro" && !isOutroCollapsed) {
      setIsOutroCollapsed(true);
      return;
    }

    if (currentSlide.id === "slide_4_curve" && curveMilestoneIndex < CURVE_MILESTONE_COUNT - 1) {
      setCurveMilestoneIndex((index) => index + 1);
      return;
    }

    if (currentSlide.id === "slide_5_velocity" && velocityCompanyIndex < VELOCITY_COMPANY_COUNT - 1) {
      setVelocityCompanyIndex((index) => index + 1);
      return;
    }

    if (currentSlide.id === "slide_5_musk_algorithm" && muskStepIndex < MUSK_ALGORITHM_STEP_COUNT) {
      setMuskStepIndex((index) => index + 1);
      return;
    }

    changeSlide(current < slides.length - 1 ? current + 1 : 0);
  }, [changeSlide, current, currentSlide.id, curveMilestoneIndex, isAlphaZeroRevealed, isFalsoStackTitleRevealed, isStackTransitionPending, isSynthesisSubtextVisible, isOutroCollapsed, muskStepIndex, slides.length, velocityCompanyIndex]);

  const prevSlide = useCallback(() => {
    if (currentSlide.id === "slide_13_outro" && isOutroCollapsed) {
      setIsOutroCollapsed(false);
      return;
    }

    if (currentSlide.id === "slide_4_curve" && curveMilestoneIndex > 0) {
      setCurveMilestoneIndex((index) => index - 1);
      return;
    }

    if (currentSlide.id === "slide_5_velocity" && velocityCompanyIndex > 0) {
      setVelocityCompanyIndex((index) => index - 1);
      return;
    }

    if (currentSlide.id === "slide_5_musk_algorithm" && muskStepIndex > 0) {
      setMuskStepIndex((index) => index - 1);
      return;
    }

    if (currentSlide.id === "slide_7_trap") {
      if (isStackTransitionPending) {
        setIsStackTransitionPending(false);
        return;
      }

      if (isFalsoStackTitleRevealed) {
        setIsFalsoStackTitleRevealed(false);
        return;
      }
    }

    changeSlide(current > 0 ? current - 1 : slides.length - 1);
  }, [changeSlide, current, currentSlide.id, curveMilestoneIndex, isFalsoStackTitleRevealed, isOutroCollapsed, isStackTransitionPending, muskStepIndex, slides.length, velocityCompanyIndex]);

  const goToSlide = useCallback(
    (index: number) => {
      if (index >= 0 && index < slides.length) {
        changeSlide(index);
      }
    },
    [changeSlide, slides.length]
  );

  const toggleFullscreen = useCallback(() => {
    if (!deckRef.current) return;

    if (!document.fullscreenElement) {
      deckRef.current.requestFullscreen().catch((err) => {
        console.error("Error attempting to enable fullscreen:", err);
      });
    } else {
      document.exitFullscreen();
    }
  }, []);

  const toggleAutoplay = useCallback(() => {
    setIsAutoplay((prev) => !prev);
  }, []);

  const handleAutoplayEnd = useCallback(() => {
    if (isAutoplay) {
      nextSlide();
    }
  }, [isAutoplay, nextSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case "arrowright":
        case "space":
        case " ":
          e.preventDefault();
          nextSlide();
          break;
        case "arrowleft":
        case "backspace":
          e.preventDefault();
          prevSlide();
          break;
        case "m":
        case "o":
        case "g":
          e.preventDefault();
          setIsGridOpen((prev) => !prev);
          break;
        case "n":
        case "p":
          e.preventDefault();
          setShowNotes((prev) => !prev);
          break;
        case "f":
          e.preventDefault();
          toggleFullscreen();
          break;
        case "home":
          e.preventDefault();
          goToSlide(0);
          break;
        case "end":
          e.preventDefault();
          goToSlide(slides.length - 1);
          break;
        case "escape":
          setIsGridOpen(false);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToSlide, nextSlide, prevSlide, slides.length, toggleFullscreen]);

  useEffect(() => {
    if (!isStackTransitionPending || currentSlide.id !== "slide_7_trap") return;

    const transitionTimer = window.setTimeout(() => {
      changeSlide(current < slides.length - 1 ? current + 1 : 0);
    }, STACK_WORD_TRANSITION_DURATION);

    return () => window.clearTimeout(transitionTimer);
  }, [changeSlide, current, currentSlide.id, isStackTransitionPending, slides.length]);

  useEffect(() => {
    preloadDeckImages();
  }, []);

  const isSeamlessSlideTransition = useMemo(() => {
    if (!previousSlideId) return false;

    return SEAMLESS_TRANSITION_PAIRS.some(
      ([from, to]) => previousSlideId === from && currentSlide.id === to
    );
  }, [currentSlide.id, previousSlideId]);

  const slideEnterClass = useMemo(() => {
    if (isSeamlessSlideTransition || SLIDES_WITH_INTERNAL_ENTER.has(currentSlide.id)) {
      return "";
    }

    return "animate-slide-enter";
  }, [currentSlide.id, isSeamlessSlideTransition]);

  const progressWidth = useMemo(
    () => `${((current + 1) / slides.length) * 100}%`,
    [current, slides.length]
  );

  return (
    <div
      ref={deckRef}
      className="relative flex h-dvh w-full overflow-hidden bg-pitch-black text-[#0a0f0c]"
    >
      <div className="absolute top-0 left-0 w-full h-[3px] bg-black/10 z-50">
        {isAutoplay ? (
          <div
            key={`autoplay-${current}`}
            className="h-full bg-neon-green animate-autoplay-progress shadow-[0_0_10px_#00FF87]"
            style={{ animationDuration: `${AUTOPLAY_DURATION}ms` }}
            onAnimationEnd={handleAutoplayEnd}
          />
        ) : (
          <div
            className="h-full bg-neon-green transition-[width] duration-500 ease-out shadow-[0_0_10px_#00FF87]"
            style={{ width: progressWidth }}
          />
        )}
      </div>

      <div className="flex w-full h-full min-h-0 relative">
        <div
          className={`relative flex flex-col flex-1 min-h-0 h-full transition-[width] duration-700 ease-in-out ${
            showNotes ? "w-[70%]" : "w-full"
          }`}
        >
          <div
            className="relative flex-1 min-h-0 w-full contain-layout cursor-pointer"
            onClick={(event) => {
              const target = event.target as HTMLElement;
              if (target.closest("button, a, input, textarea, [data-no-advance]")) return;
              nextSlide();
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                nextSlide();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label="Next slide or step"
          >
            <div
              key={currentSlide.id}
              className={`absolute inset-0 h-full w-full min-h-0 ${slideEnterClass}`}
              style={{ zIndex: 10 }}
            >
              {ActiveSlide ? (
                <ActiveSlide
                  isFalsoStackTitleRevealed={
                    currentSlide.id === "slide_7_trap" && isFalsoStackTitleRevealed
                  }
                  isStackTransitioning={currentSlide.id === "slide_7_trap" && isStackTransitionPending}
                  isSynthesisSubtextVisible={
                    currentSlide.id === "slide_12_synthesis" && isSynthesisSubtextVisible
                  }
                  onRevealSynthesisSubtext={() => setIsSynthesisSubtextVisible(true)}
                  isAlphaZeroRevealed={
                    currentSlide.id === "slide_6_paradox" && isAlphaZeroRevealed
                  }
                  onRevealAlphaZero={() => setIsAlphaZeroRevealed(true)}
                  curveMilestoneIndex={
                    currentSlide.id === "slide_4_curve" ? curveMilestoneIndex : undefined
                  }
                  velocityCompanyIndex={
                    currentSlide.id === "slide_5_velocity" ? velocityCompanyIndex : undefined
                  }
                  onSelectVelocityCompany={setVelocityCompanyIndex}
                  muskStepIndex={
                    currentSlide.id === "slide_5_musk_algorithm" ? muskStepIndex : undefined
                  }
                  isOutroCollapsed={
                    currentSlide.id === "slide_13_outro" && isOutroCollapsed
                  }
                />
              ) : null}
            </div>
          </div>
        </div>

        <PresenterNotes
          slide={currentSlide}
          current={current}
          total={slides.length}
          showNotes={showNotes}
          onClose={() => setShowNotes(false)}
        />
      </div>

      {isGridOpen && (
        <SlideGrid
          slides={slides}
          current={current}
          onSelect={goToSlide}
          onClose={() => setIsGridOpen(false)}
        />
      )}
    </div>
  );
}

interface PresenterNotesProps {
  slide: SlideConfig;
  current: number;
  total: number;
  showNotes: boolean;
  onClose: () => void;
}

function PresenterNotes({ slide, current, total, showNotes, onClose }: PresenterNotesProps) {
  return (
    <div
      className={`bg-white border-l border-black/10 flex flex-col h-full overflow-hidden transition-[width,opacity] duration-700 ease-in-out z-30 ${
        showNotes
          ? "w-[30%] opacity-100 pointer-events-auto"
          : "w-0 opacity-0 pointer-events-none border-l-0"
      }`}
    >
      <div className="p-6 border-b border-black/10 flex justify-between items-center bg-[#f1f5ed]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-neon-green animate-pulse" />
          <h3 className="font-mono text-xs uppercase tracking-widest text-[#0a7f4a]">
            Presenter Cockpit
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-[#66706a] hover:text-neon-green transition-colors"
          aria-label="Close presenter notes"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 p-8 overflow-y-auto no-scrollbar space-y-6">
        <div>
          <span className="font-mono text-xs text-neon-green uppercase tracking-wide">Active Slide</span>
          <h2 className="text-2xl font-black text-[#0a0f0c] mt-1 leading-none">{slide.title}</h2>
          <p className="font-mono text-xs text-[#66706a] mt-2">
            Index: {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </p>
        </div>

        <hr className="border-black/10" />

        <div className="space-y-4">
          <span className="font-mono text-xs text-[#66706a] uppercase tracking-wide block">
            Delivery Guide & Talk Notes
          </span>
          <ul className="space-y-3">
            {slide.notes.map((note, i) => (
              <li key={`${slide.id}-note-${i}`} className="flex gap-3 text-sm md:text-base leading-relaxed text-[#3d4942]">
                <span className="font-mono text-xs text-neon-green mt-1.5 shrink-0">[{i + 1}]</span>
                <span>{note}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-6 border-t border-black/10 bg-[#f1f5ed] space-y-3">
        <span className="font-mono text-[10px] text-[#66706a] uppercase tracking-widest block">Pro Shortcuts</span>
        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#66706a]">
          <div><kbd className="bg-black/5 px-1.5 py-0.5 rounded text-[#0a0f0c] border border-black/10">Space</kbd> / <kbd className="bg-black/5 px-1.5 py-0.5 rounded text-[#0a0f0c] border border-black/10">→</kbd> Next</div>
          <div><kbd className="bg-black/5 px-1.5 py-0.5 rounded text-[#0a0f0c] border border-black/10">←</kbd> Previous</div>
          <div><kbd className="bg-black/5 px-1.5 py-0.5 rounded text-[#0a0f0c] border border-black/10">M</kbd> Grid Overview</div>
          <div><kbd className="bg-black/5 px-1.5 py-0.5 rounded text-[#0a0f0c] border border-black/10">N</kbd> Toggle Notes</div>
          <div><kbd className="bg-black/5 px-1.5 py-0.5 rounded text-[#0a0f0c] border border-black/10">F</kbd> Fullscreen</div>
          <div><kbd className="bg-black/5 px-1.5 py-0.5 rounded text-[#0a0f0c] border border-black/10">Esc</kbd> Close Grid</div>
        </div>
      </div>
    </div>
  );
}

interface SlideGridProps {
  slides: SlideConfig[];
  current: number;
  onSelect: (index: number) => void;
  onClose: () => void;
}

function SlideGrid({ slides, current, onSelect, onClose }: SlideGridProps) {
  return (
    <div className="absolute inset-0 z-50 bg-[#f7f8f3]/95 backdrop-blur-xl flex flex-col p-12 overflow-y-auto no-scrollbar">
      <div className="max-w-6xl mx-auto w-full flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-12">
          <div>
            <span className="font-mono text-xs text-neon-green uppercase tracking-widest block">Slide Deck Map</span>
            <h2 className="text-4xl font-extrabold text-[#0a0f0c] tracking-tight mt-1">Interactive Overview</h2>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-black/10 hover:border-neon-green/50 text-[#66706a] hover:text-neon-green transition-all text-xs font-mono uppercase tracking-widest flex items-center gap-2"
          >
            Close
            <kbd className="bg-black/10 px-1 py-0.5 rounded text-[9px] text-[#0a0f0c]">ESC</kbd>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1 items-start">
          {slides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => onSelect(idx)}
              className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer group border transition-all duration-300 bg-white text-left shadow-sm ${
                idx === current
                  ? "border-neon-green shadow-[0_0_20px_rgba(0,255,135,0.2)]"
                  : "border-black/10 hover:border-neon-green/40 hover:scale-[1.02]"
              }`}
            >
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-4 bg-gradient-to-t from-white/95 via-white/75 to-transparent">
                <span className="font-mono text-xs text-[#66706a] group-hover:text-neon-green transition-colors font-bold">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="text-base font-bold text-[#0a0f0c] group-hover:text-neon-green transition-colors leading-snug">
                    {slide.title}
                  </h4>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="mt-12 text-center text-xs font-mono text-[#66706a] border-t border-black/10 pt-6">
          Click any slide card to jump to it. Use{" "}
          <kbd className="bg-black/5 px-1.5 py-0.5 rounded text-[#0a0f0c] border border-black/10 mx-1">ESC</kbd>{" "}
          to exit slide overview.
        </div>
      </div>
    </div>
  );
}
