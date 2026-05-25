"use client";

import { memo, useEffect, useRef, useState } from "react";

interface TerminalCardProps {
  id: string;
  name: string;
  color: string;
  quote: string;
  tags: readonly string[];
  isActive: boolean;
  onClick: () => void;
}

const TerminalCard = memo(function TerminalCard({
  id,
  name,
  color,
  quote,
  tags,
  isActive,
  onClick,
}: TerminalCardProps) {
  return (
    <div
      onClick={onClick}
      className={`glass-panel p-8 rounded-2xl cursor-pointer transition-all duration-500 relative flex flex-col justify-between h-[380px] select-none group border ${
        isActive
          ? "bg-white/50 border-indigo-400/50 shadow-[0_12px_40px_rgba(0,184,107,0.12)] scale-[1.02]"
          : "border-white/25 hover:border-indigo-300/40 hover:bg-white/30"
      }`}
    >
      <div>
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
            />
            <span className="font-mono text-xs font-bold text-zinc-800 uppercase tracking-wider">{name}</span>
          </div>
          <span className="font-mono text-[10px] text-zinc-500 font-bold">{id}</span>
        </div>

        <p className="text-zinc-600 text-base italic leading-relaxed font-sans mb-8">
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      <div>
        <hr className="border-zinc-200/50 mb-4" />
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className={`font-mono text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider ${
                isActive && tag === "ACTIVE"
                  ? "bg-indigo-600 text-white font-semibold"
                  : "bg-black/5 text-zinc-500 group-hover:text-zinc-700 transition-colors"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

const TERMINAL_CARDS = [
  {
    id: "DEV_294",
    name: "Sora Autonomous Router",
    status: "ACTIVE" as const,
    color: "#00ff87",
    quote:
      "Sora's autonomous routing architecture handles traffic spikes without manual intervention. It's like having a dedicated DevOps team embedded in the core code.",
    tags: ["ROUTER", "FINTECH", "ACTIVE"],
  },
  {
    id: "ENG_882",
    name: "Neural Predictive Engine",
    status: "COMPILING" as const,
    color: "#64d2ff",
    quote:
      "The neural interface prediction layer reduced our baseline build times and training times by 80%. I can't imagine going back to standard pipelines.",
    tags: ["INFERENCE", "SAAS", "COMPILING"],
  },
  {
    id: "SYS_001",
    name: "Edge Propagation Agent",
    status: "STABLE" as const,
    color: "#e0b25c",
    quote:
      "Data latency dropped to near-zero. The edge propagation system is completely instant. Security is top-tier without configuration headaches.",
    tags: ["PROPAGATION", "ECOMM", "STABLE"],
  },
] as const;

const MOCK_LOG_LINES = [
  (ms: number) => `[METRIC] Latency optimized to ${ms}ms.`,
  (hex: string) => `[AGENT] Synchronized neural vectors with nodes: [0x${hex}].`,
  () => `[ROUTING] Re-balancing incoming streams to prevent ingestion bottleneck...`,
  () => `[SECURITY] Completed edge validation. Safe handshakes verified.`,
  () => `[MEMORY] Context window check: 99.98% recall index across active cluster.`,
  (loss: string) => `[MODEL] Compiling active gradient weights. Matrix loss factor: ${loss}.`,
];

function pickRandomLog(): string {
  const mockLogLines = [
    MOCK_LOG_LINES[0](Math.floor(Math.random() * 5) + 1),
    MOCK_LOG_LINES[1](Math.floor(Math.random() * 1000).toString(16).toUpperCase()),
    MOCK_LOG_LINES[2](),
    MOCK_LOG_LINES[3](),
    MOCK_LOG_LINES[4](),
    MOCK_LOG_LINES[5](`0.00${Math.floor(Math.random() * 9) + 1}`),
  ];
  return mockLogLines[Math.floor(Math.random() * mockLogLines.length)];
}

export function SlideTerminal() {
  const [activeCard, setActiveCard] = useState(0);
  const [streamLogs, setStreamLogs] = useState<string[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const logIdRef = useRef(0);

  const card = TERMINAL_CARDS[activeCard];
  const baseLogs = [
    `[SYSTEM] Connecting to ${card.id} protocols...`,
    `[SYSTEM] Active handshakes verified. Status: ${card.status}.`,
  ];
  const displayLogs = [...baseLogs, ...streamLogs];

  useEffect(() => {
    const interval = setInterval(() => {
      logIdRef.current += 1;
      const line = pickRandomLog();
      setStreamLogs((prev) => [...prev.slice(-6), `${logIdRef.current}:${line}`]);
    }, 1500);

    return () => clearInterval(interval);
  }, [activeCard]);

  useEffect(() => {
    const container = logContainerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [displayLogs.length, activeCard]);

  const handleCardSelect = (idx: number) => {
    setActiveCard(idx);
    setStreamLogs([]);
    logIdRef.current = 0;
  };

  return (
    <div className="w-full h-full flex flex-col bg-pastel-mesh text-black overflow-hidden p-8 md:p-12 justify-between bg-grid-dots relative">
      <div className="flex justify-between items-start relative z-10">
        <div>
          <span className="font-mono text-xs text-indigo-600 uppercase tracking-widest font-extrabold block">Transmissions Matrix</span>
          <h2 className="text-3xl md:text-4xl font-display font-light text-zinc-900 mt-1 tracking-tight">Developer Protocols</h2>
        </div>
        <div className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest flex items-center gap-2">
          <span>Active Nodes: 3/3</span>
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-auto items-center relative z-10">
        {TERMINAL_CARDS.map((cardItem, idx) => (
          <TerminalCard
            key={cardItem.id}
            id={cardItem.id}
            name={cardItem.name}
            color={cardItem.color}
            quote={cardItem.quote}
            tags={cardItem.tags}
            isActive={idx === activeCard}
            onClick={() => handleCardSelect(idx)}
          />
        ))}
      </div>

      <div className="w-full glass-panel rounded-xl overflow-hidden mt-2 relative border border-white/50 z-10">
        <div className="bg-white/40 border-b border-white/50 px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
            <span className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
            <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest ml-2">Console output // {card.id}</span>
          </div>
          <span className="font-mono text-[9px] text-indigo-600 uppercase tracking-widest bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">Streaming...</span>
        </div>
        <div
          ref={logContainerRef}
          className="p-4 h-32 overflow-y-auto font-mono text-xs text-zinc-600 space-y-1 bg-white/40 backdrop-blur scroll-smooth no-scrollbar"
        >
          {displayLogs.map((log, index) => {
            const message = log.includes(":") ? log.slice(log.indexOf(":") + 1) : log;
            return (
              <div key={log} className="flex gap-4">
                <span className="text-zinc-400 select-none">{String(index + 1).padStart(2, "0")}</span>
                <span
                  className={
                    message.startsWith("[SYSTEM]")
                      ? "text-indigo-600 font-bold"
                      : message.startsWith("[METRIC]")
                        ? "text-indigo-500 font-bold"
                        : "text-zinc-600"
                  }
                >
                  {message}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
