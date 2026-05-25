import Image from "next/image";

export function SlideOverlay() {
  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-pastel-mesh text-black overflow-hidden p-8 md:p-16 relative">
      <div className="absolute inset-0 bg-grid-dots opacity-100" />

      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-indigo-300/10 blur-[120px] pointer-events-none animate-glow-breathe" />

      <div className="relative w-full h-full flex flex-col justify-between z-10">
        <div className="flex justify-between items-start w-full">
          <div>
            <span className="font-mono text-xs text-indigo-600 uppercase tracking-widest font-extrabold block">Dynamic Architecture</span>
            <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mt-1">Section 03</span>
          </div>
          <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="font-mono text-[10px] text-indigo-600 uppercase tracking-widest font-bold">Fluid Mode Active</span>
          </div>
        </div>

        <div className="my-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 w-full relative">
          <div className="relative w-full md:w-[500px] h-[50vh] rounded-2xl overflow-hidden border border-white/40 shadow-2xl shrink-0 group">
            <Image
              src="/assets/image-8db3b2a9-5df9-46ee-b0af-d1d884641daa.png"
              alt="Aura glowing lines"
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              className="object-cover opacity-95 group-hover:scale-105 transition-all duration-1000"
            />
            <div className="absolute top-4 left-4 glass-panel px-3 py-1 rounded-md text-[10px] font-mono text-zinc-600 tracking-widest uppercase">
              Core: Vector Matrix Flow
            </div>
          </div>

          <div className="relative md:absolute md:left-[35%] flex flex-col items-start pointer-events-none z-20">
            <h3 className="text-5xl md:text-7xl lg:text-[6.5rem] font-display font-light leading-[0.95] text-zinc-900 tracking-tight select-none">
              Architect
            </h3>
            <h3 className="text-5xl md:text-7xl lg:text-[6.5rem] font-display font-light italic leading-[0.95] text-indigo-600 tracking-tight select-none">
              without
            </h3>
            <h3 className="text-5xl md:text-7xl lg:text-[6.5rem] font-display font-light leading-[0.95] text-zinc-900 tracking-tight select-none">
              boundaries.
            </h3>

            <div className="pointer-events-auto max-w-sm mt-8 p-6 glass-panel rounded-xl border-white/50 backdrop-blur-md bg-white/60">
              <p className="text-zinc-600 text-sm leading-relaxed">
                A deployment engine that mirrors the natural flow of your reasoning, expanding, observing, and adapting with liquid precision.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center w-full pt-4 border-t border-zinc-200/50 text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          <span>Continuous Integration Network</span>
          <span>Deploy protocol: Liquid</span>
        </div>
      </div>
    </div>
  );
}
