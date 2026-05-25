"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

const SPOTLIGHT_TARGETS = {
  intuition: { xRatio: 0.15, yRatio: 0.72 },
  agency: { xRatio: 0.35, yRatio: 0.75 },
  creativity: { xRatio: 0.55, yRatio: 0.72 },
} as const;

type SpotlightWord = keyof typeof SPOTLIGHT_TARGETS;

export function SlideSilhouette() {
  const [isHovering, setIsHovering] = useState(false);
  const [wordStyles, setWordStyles] = useState<Record<SpotlightWord, CSSProperties>>({
    intuition: { opacity: 0.2 },
    agency: { opacity: 0.2 },
    creativity: { opacity: 0.2 },
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const coordsRef = useRef({ x: 0, y: 0 });
  const containerSizeRef = useRef({ w: 0, h: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateSize = () => {
      if (!containerRef.current) return;
      containerSizeRef.current = {
        w: containerRef.current.clientWidth,
        h: containerRef.current.clientHeight,
      };
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const updateSpotlight = useCallback(() => {
    rafRef.current = null;

    const spotlight = spotlightRef.current;
    if (spotlight) {
      spotlight.style.transform = `translate(calc(${coordsRef.current.x}px - 50%), calc(${coordsRef.current.y}px - 50%))`;
    }

    if (!isHovering || containerSizeRef.current.w === 0) {
      setWordStyles({
        intuition: { opacity: 0.2, textShadow: "none" },
        agency: { opacity: 0.2, textShadow: "none" },
        creativity: { opacity: 0.2, textShadow: "none" },
      });
      return;
    }

    const { x, y } = coordsRef.current;
    const { w, h } = containerSizeRef.current;
    const maxDist = 200;
    const nextStyles = {} as Record<SpotlightWord, CSSProperties>;

    (Object.keys(SPOTLIGHT_TARGETS) as SpotlightWord[]).forEach((word) => {
      const target = SPOTLIGHT_TARGETS[word];
      const targetX = w * target.xRatio;
      const targetY = h * target.yRatio;
      const dist = Math.hypot(x - targetX, y - targetY);

      if (dist < maxDist) {
        const ratio = 1 - dist / maxDist;
        nextStyles[word] = {
          opacity: 0.2 + ratio * 0.8,
          color: `rgba(${Math.round(ratio * 0 + (1 - ratio) * 200)}, ${Math.round(ratio * 255 + (1 - ratio) * 211)}, ${Math.round(ratio * 135 + (1 - ratio) * 205)}, 1)`,
          textShadow: `0 0 ${Math.round(ratio * 15)}px rgba(0, 255, 135, ${ratio * 0.4})`,
          transform: `scale(${1 + ratio * 0.05})`,
        };
      } else {
        nextStyles[word] = { opacity: 0.2 };
      }
    });

    setWordStyles(nextStyles);
  }, [isHovering]);

  const scheduleUpdate = useCallback(() => {
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(updateSpotlight);
    }
  }, [updateSpotlight]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    coordsRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    scheduleUpdate();
  };

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => {
        setIsHovering(true);
        scheduleUpdate();
      }}
      onMouseLeave={() => {
        setIsHovering(false);
        scheduleUpdate();
      }}
      className="w-full h-full relative flex flex-col justify-between bg-pastel-mesh text-black p-12 overflow-hidden select-none"
    >
      <div className="absolute inset-0 bg-grid-dots opacity-100" />
      <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-indigo-500/5 via-transparent to-transparent blur-[120px] pointer-events-none animate-glow-breathe" />

      <div
        ref={spotlightRef}
        aria-hidden
        className={`pointer-events-none absolute rounded-full bg-indigo-500/10 blur-[100px] z-20 ${isHovering ? "opacity-100" : "opacity-0"}`}
        style={{
          left: 0,
          top: 0,
          width: "350px",
          height: "350px",
          willChange: "transform",
        }}
      />

      <div className="flex justify-between items-start z-10 relative">
        <div>
          <span className="font-mono text-xs text-indigo-600 uppercase tracking-widest font-extrabold block">Philosophy & Mission</span>
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mt-1">Section 05</span>
        </div>
        <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest bg-white/40 border border-white/50 px-3 py-1 rounded-full">Spotlight Hover Active</span>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between my-auto w-full z-10 relative">
        <div className="w-full md:w-3/5 space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-[1px] bg-indigo-400" />
            <span className="font-mono text-xs tracking-widest uppercase text-indigo-600 font-bold">The Human Pilot</span>
          </div>

          <h1 className="text-6xl md:text-7xl lg:text-8xl font-display font-light leading-[0.95] tracking-tight text-zinc-900">
            The Human<br />
            <span className="text-indigo-600 italic">cockpit.</span>
          </h1>

          <p className="text-zinc-600 text-lg md:text-xl leading-relaxed max-w-xl">
            Artificial systems do not replace human intent; they amplify it. AI is the ultimate cockpit built for agency, offering supreme scaling speed to human creativity.
          </p>

          <div className="flex flex-wrap gap-8 pt-8 font-mono text-base md:text-lg tracking-widest select-none pointer-events-none border-t border-zinc-200/50 w-fit">
            <div style={wordStyles.intuition} className="uppercase font-semibold select-none flex items-center gap-1 text-zinc-400">
              <span>[</span>INTUITION<span>]</span>
            </div>
            <div style={wordStyles.agency} className="uppercase font-semibold select-none flex items-center gap-1 text-zinc-400">
              <span>[</span>AGENCY<span>]</span>
            </div>
            <div style={wordStyles.creativity} className="uppercase font-semibold select-none flex items-center gap-1 text-zinc-400">
              <span>[</span>CREATIVITY<span>]</span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-2/5 flex items-center justify-center p-4">
          <div className="relative w-[320px] md:w-[450px] h-[55vh] rounded-3xl overflow-hidden border border-white/40 shadow-2xl bg-white/40 group">
            <Image
              src="/assets/image-fac292ce-febc-4254-bb0c-36d47b75799c.png"
              alt="Sunset silhouette face"
              fill
              sizes="(max-width: 768px) 320px, 450px"
              className="object-cover object-center opacity-95 group-hover:scale-105 transition-transform duration-1000"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#f7f8fa]/60 via-transparent to-transparent z-10" />

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
              <button className="px-6 py-2.5 rounded-full bg-zinc-900 text-white font-semibold text-xs uppercase tracking-widest hover:bg-indigo-600 hover:scale-105 transition-all shadow-xl">
                Unlock Potential
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center z-10 text-[10px] font-mono text-zinc-500 uppercase tracking-widest pt-4 border-t border-zinc-200/50">
        <span>Strategic Philosophy Alignment</span>
        <span>Agency ratio: Human-in-the-loop</span>
      </div>
    </div>
  );
}
