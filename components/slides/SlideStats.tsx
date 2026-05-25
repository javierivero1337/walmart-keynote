export function SlideStats() {
  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-pastel-mesh text-black overflow-hidden p-8 md:p-12 items-center relative">
      <div className="w-full md:w-[30%] h-full flex flex-col justify-between p-6 bg-grid-dots">
        <div>
          <span className="font-mono text-xs text-indigo-600 uppercase tracking-widest font-extrabold block">Section 02</span>
          <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block mt-1">Metrics & Capabilities</span>
        </div>

        <div className="my-auto space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-3 h-[1px] bg-indigo-500/60" />
            <span className="font-mono text-[10px] tracking-widest uppercase text-indigo-600 font-bold">Statistics Overview</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display font-light text-zinc-900 leading-tight tracking-tight">
            Reasoning<br />
            at scale,<br />
            <span className="text-indigo-600 italic">simplified.</span>
          </h2>
          <p className="text-zinc-600 text-sm md:text-base leading-relaxed">
            Deploying neural processing clusters to project massive operational bandwidth requires surgical-grade precision in physical layers.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-indigo-600 uppercase tracking-widest hover:text-indigo-700 cursor-pointer transition-colors">
          <span>View global system map</span>
          <span className="text-lg">→</span>
        </div>
      </div>

      <div className="w-full md:w-[70%] h-full flex items-center justify-center pl-0 md:pl-8">
        <div className="w-full h-[85vh] glass-panel text-zinc-900 rounded-3xl p-10 md:p-16 flex flex-col justify-between relative shadow-2xl border-white/50 bg-grid-dots">
          <div className="flex justify-between items-center text-xs font-mono text-zinc-500 uppercase tracking-widest pb-4 border-b border-zinc-200/50">
            <span>Core Vector Performance</span>
            <span>Update: Stable Live</span>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-8 md:gap-12 py-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between group cursor-pointer">
              <div className="flex items-baseline gap-6">
                <span className="font-sans text-5xl md:text-6xl font-semibold tracking-tight text-zinc-900 tabular-nums transition-transform duration-300 group-hover:translate-x-2">
                  10²¹ FLOPs
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest bg-indigo-600/10 text-indigo-600 border border-indigo-500/20 px-2 py-0.5 rounded font-bold">Active</span>
              </div>
              <div className="max-w-sm mt-2 md:mt-0 text-left md:text-right">
                <h4 className="font-bold text-sm md:text-base text-zinc-800 uppercase tracking-tight">Active Compute Scale</h4>
                <p className="text-zinc-500 text-xs mt-0.5 uppercase">Computational capacity powering next-generation model training.</p>
              </div>
            </div>

            <div className="h-[1px] w-full bg-zinc-200/50" />

            <div className="flex flex-col md:flex-row md:items-center justify-between group cursor-pointer">
              <div className="flex items-baseline gap-6">
                <span className="font-sans text-5xl md:text-6xl font-semibold tracking-tight text-zinc-900 tabular-nums transition-transform duration-300 group-hover:translate-x-2">
                  120 ms
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest bg-amber-500/10 text-amber-600 border border-amber-500/20 px-2 py-0.5 rounded font-bold">Optimal</span>
              </div>
              <div className="max-w-sm mt-2 md:mt-0 text-left md:text-right">
                <h4 className="font-bold text-sm md:text-base text-zinc-800 uppercase tracking-tight">Inference Latency</h4>
                <p className="text-zinc-500 text-xs mt-0.5 uppercase">Sub-conversational response times optimized for direct interaction.</p>
              </div>
            </div>

            <div className="h-[1px] w-full bg-zinc-200/50" />

            <div className="flex flex-col md:flex-row md:items-center justify-between group cursor-pointer">
              <div className="flex items-baseline gap-6">
                <span className="font-sans text-5xl md:text-6xl font-semibold tracking-tight text-zinc-900 tabular-nums transition-transform duration-300 group-hover:translate-x-2">
                  99.9%
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 px-2 py-0.5 rounded font-bold">Top Tier</span>
              </div>
              <div className="max-w-sm mt-2 md:mt-0 text-left md:text-right">
                <h4 className="font-bold text-sm md:text-base text-zinc-800 uppercase tracking-tight">Context Recall Accuracy</h4>
                <p className="text-zinc-500 text-xs mt-0.5 uppercase">Retrieval reliability across multi-megatoken model layers.</p>
              </div>
            </div>

            <div className="h-[1px] w-full bg-zinc-200/50" />

            <div className="flex flex-col md:flex-row md:items-center justify-between group cursor-pointer">
              <div className="flex items-baseline gap-6">
                <span className="font-sans text-5xl md:text-6xl font-semibold tracking-tight text-zinc-900 tabular-nums transition-transform duration-300 group-hover:translate-x-2">
                  24 Hours
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest bg-indigo-600/10 text-indigo-600 border border-indigo-500/20 px-2 py-0.5 rounded font-bold">Continuous</span>
              </div>
              <div className="max-w-sm mt-2 md:mt-0 text-left md:text-right">
                <h4 className="font-bold text-sm md:text-base text-zinc-800 uppercase tracking-tight">Model Adaptation Cycles</h4>
                <p className="text-zinc-500 text-xs mt-0.5 uppercase">Continuous feedback and autonomous refinement intervals.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 uppercase tracking-widest border-t border-zinc-200/50 pt-4">
            <span>Walmart MegaKeynote Infrastructure © 2026</span>
            <span>Secured Node Stack</span>
          </div>
        </div>
      </div>
    </div>
  );
}
