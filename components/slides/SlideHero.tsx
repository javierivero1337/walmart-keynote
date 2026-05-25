import Image from "next/image";

export function SlideHero() {
  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-pastel-mesh text-black overflow-hidden relative">
      <div className="w-full md:w-1/2 h-full flex flex-col justify-between p-12 md:p-20 relative z-10 bg-grid-dots">
        <div>
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-600 font-mono text-xs uppercase tracking-widest font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            Platform Ingestion Engine
          </span>
        </div>

        <div className="my-auto space-y-2">
          <span className="block font-mono text-xs text-zinc-500 uppercase tracking-widest">Incoming Paradigm</span>
          <h1 className="text-7xl md:text-8xl lg:text-[7.5rem] font-display font-light leading-[0.9] tracking-tight text-zinc-900">
            Intelligence
          </h1>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-light italic leading-none tracking-tight text-indigo-600">
            the seed.
          </h2>
          <div className="h-0.5 w-24 bg-indigo-400 mt-6 rounded" />
        </div>

        <div className="max-w-md">
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest mb-2">Architectural Directive</p>
          <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
            The ultimate engine to scale adaptive reasoning and dynamic interfaces with liquid precision across distributed clusters.
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2 h-full relative flex items-center justify-center p-8 bg-transparent">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f7f8fa] to-transparent z-10 pointer-events-none" />

        <div className="relative w-full h-[85vh] rounded-3xl overflow-hidden border border-white/40 group shadow-2xl">
          <Image
            src="/assets/image-adeaa0d3-3e89-4c4b-915d-dd848c7487ab.png"
            alt="AI Vibe Profile"
            fill
            sizes="50vw"
            priority
            className="object-cover object-center opacity-95 group-hover:scale-105 transition-transform duration-1000"
          />

          <div className="absolute bottom-8 left-8 right-8 z-20 flex flex-col md:flex-row gap-4">
            <div className="flex-1 glass-panel p-6 rounded-2xl border-white/50 hover:border-indigo-400/40 transition-colors">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Compute Core</span>
              <p className="text-xl font-bold text-zinc-900 mt-1">10K+ Supernodes</p>
              <div className="w-full h-1 bg-zinc-200/50 rounded mt-3 overflow-hidden">
                <div className="w-4/5 h-full bg-indigo-500 rounded" />
              </div>
            </div>

            <div className="flex-1 glass-panel p-6 rounded-2xl border-white/50 hover:border-indigo-400/40 transition-colors">
              <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest">Routing Latency</span>
              <p className="text-xl font-bold text-zinc-900 mt-1">1.2ms Avg response</p>
              <div className="w-full h-1 bg-zinc-200/50 rounded mt-3 overflow-hidden">
                <div className="w-5/6 h-full bg-indigo-500 rounded" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
