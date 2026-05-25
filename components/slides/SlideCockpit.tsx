"use client";

import { useMemo, useState } from "react";

export function SlideCockpit() {
  const [compute, setCompute] = useState(45);
  const [autonomy, setAutonomy] = useState(65);
  const [fluidity, setFluidity] = useState(80);

  const synergy = useMemo(
    () => Math.round(compute * 0.3 + autonomy * 0.4 + fluidity * 0.3),
    [compute, autonomy, fluidity]
  );

  const throughput = useMemo(
    () => Math.round(compute * autonomy * fluidity * 0.003),
    [compute, autonomy, fluidity]
  );

  return (
    <div className="w-full h-full flex flex-col bg-pastel-mesh text-black overflow-hidden p-8 md:p-12 justify-between bg-grid-dots relative">
      <div className="flex justify-between items-start relative z-10">
        <div>
          <span className="font-mono text-xs text-indigo-600 uppercase tracking-widest font-extrabold block">Live Demonstration Workspace</span>
          <h2 className="text-3xl md:text-4xl font-display font-light text-zinc-900 mt-1 tracking-tight">The Future Matrix</h2>
        </div>
        <div className="glass-panel px-4 py-1.5 rounded-full flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          <span className="font-mono text-[10px] text-indigo-600 uppercase tracking-widest font-bold">Simulator Ready</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-auto items-center relative z-10">
        <div className="space-y-8 glass-panel p-8 rounded-3xl border-white/50 bg-white/50">
          <div>
            <span className="font-mono text-xs text-indigo-600 font-bold uppercase tracking-wider">Dynamic Controller</span>
            <h3 className="text-2xl font-display font-light text-zinc-900 mt-1 tracking-tight">Slide to tune variables</h3>
            <p className="text-zinc-500 text-xs mt-1">Simulate live system response on the huge projector screen.</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-700 uppercase font-semibold">1. Compute Threads / GPU Scale</span>
                <span className="text-indigo-600 font-bold">{Math.round(compute * 10)} GFLOPS</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={compute}
                onChange={(e) => setCompute(Number(e.target.value))}
                className="w-full h-1 bg-black/10 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <p className="text-[10px] text-zinc-500 uppercase">Operational bandwidth dedicated to background routing</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-700 uppercase font-semibold">2. Model Autonomy Factor</span>
                <span className="text-indigo-600 font-bold">{autonomy}% Autonomy</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={autonomy}
                onChange={(e) => setAutonomy(Number(e.target.value))}
                className="w-full h-1 bg-black/10 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <p className="text-[10px] text-zinc-500 uppercase">Confidence threshold before triggering autonomous self-healing</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-zinc-700 uppercase font-semibold">3. Interface Fluidity Index</span>
                <span className="text-indigo-600 font-bold">{fluidity} FLUID</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={fluidity}
                onChange={(e) => setFluidity(Number(e.target.value))}
                className="w-full h-1 bg-black/10 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <p className="text-[10px] text-zinc-500 uppercase">Speed of client-side UI adaptations during state changes</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-4">
          <div className="relative w-full aspect-square max-w-[380px] rounded-full border border-white/50 flex items-center justify-center bg-white/50 group overflow-hidden shadow-xl">
            <div
              className="absolute rounded-full border border-indigo-500/10 blur-[10px] transition-[width,height,background-color,box-shadow] duration-300"
              style={{
                width: `${synergy * 2.8}px`,
                height: `${synergy * 2.8}px`,
                backgroundColor: `rgba(113, 112, 255, ${synergy * 0.0012})`,
                boxShadow: `0 0 ${synergy * 0.4}px rgba(113, 112, 255, ${synergy * 0.002})`,
              }}
            />

            <div
              className="absolute rounded-full border border-zinc-200/50 transition-[width,height] duration-500"
              style={{
                width: `${fluidity * 3.2}px`,
                height: `${fluidity * 3.2}px`,
              }}
            />

            <div className="z-10 text-center space-y-1">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest block">Network Status</span>
              <span className="text-6xl md:text-7xl font-sans font-semibold tracking-tighter text-zinc-900 block select-none">
                {synergy}%
              </span>
              <span className="font-mono text-xs text-indigo-600 font-extrabold uppercase tracking-widest block">
                Synergy Factor
              </span>
              <span className="inline-block mt-4 px-3 py-1 rounded-full bg-white/50 border border-zinc-200/50 text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
                Throughput: {throughput} GB/s
              </span>
            </div>

            <div className="absolute top-8 left-8 font-mono text-[9px] text-zinc-500 uppercase tracking-wider select-none">
              Aura Node Ready
            </div>
            <div className="absolute bottom-8 right-8 font-mono text-[9px] text-zinc-500 uppercase tracking-wider select-none">
              Sync Rate: {Math.round(autonomy * 0.95)}%
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center text-[10px] font-mono text-[#8E8E93] uppercase tracking-widest pt-4 border-t border-zinc-200/50">
        <span>Build the Future simulator platform</span>
        <span>Interactive Workspace Terminal v0.1</span>
      </div>
    </div>
  );
}
