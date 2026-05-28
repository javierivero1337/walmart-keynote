"use client";

import Image from "next/image";
import { useEffect, useState, type ComponentType, type CSSProperties, type ReactNode, type SVGProps } from "react";
import { motion, AnimatePresence } from "motion/react";
import RotatingText from "@/components/RotatingText";
import { AnthropicWhite } from "@/components/ui/svgs/anthropicWhite";
import { AnthropicWhiteWordmark } from "@/components/ui/svgs/anthropicWhiteWordmark";
import { ClaudeAiIcon } from "@/components/ui/svgs/claudeAiIcon";
import { Cohere } from "@/components/ui/svgs/cohere";
import { CursorLight } from "@/components/ui/svgs/cursorLight";
import { Deepseek } from "@/components/ui/svgs/deepseek";
import { Gemini } from "@/components/ui/svgs/gemini";
import { HuggingFace } from "@/components/ui/svgs/huggingFace";
import { Meta } from "@/components/ui/svgs/meta";
import { MicrosoftCopilot } from "@/components/ui/svgs/microsoftCopilot";
import { MistralAiLogo } from "@/components/ui/svgs/mistralAiLogo";
import { OpenaiDark } from "@/components/ui/svgs/openaiDark";
import { OpenaiWordmarkDark } from "@/components/ui/svgs/openaiWordmarkDark";
import { Perplexity } from "@/components/ui/svgs/perplexity";
import { XaiDark } from "@/components/ui/svgs/xaiDark";

type Tone = "dark" | "bridge" | "warm";

interface SlideFrameProps {
  tone?: Tone;
  children: ReactNode;
  className?: string;
  atmosphere?: "default" | "minimal" | "flat" | "animated";
  fullBleed?: boolean;
}

const toneClasses: Record<Tone, string> = {
  dark: "bg-[#070908] text-[#f7f8f3]",
  bridge: "bg-[#f3efe4] text-[#0a0f0c]",
  warm: "bg-[#f7f1df] text-[#0a0f0c]",
};

function Atmosphere({ tone, variant = "default" }: { tone: Tone; variant?: "default" | "minimal" | "flat" | "animated" }) {
  if (variant === "flat") {
    return null;
  }

  if (variant === "minimal") {
    if (tone === "dark") {
      return (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,184,107,0.05),transparent_50%)]" />
      );
    }

    return (
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,184,107,0.06),transparent_50%)]" />
    );
  }

  if (variant === "animated" && tone === "dark") {
    return (
      <>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(247,248,243,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(247,248,243,0.055)_1px,transparent_1px)] bg-[size:96px_96px]" />
        <div className="absolute -left-32 top-24 h-[580px] w-[580px] rounded-full bg-[#00b86b]/32 blur-[120px] animate-cover-glow-drift" />
        <div className="absolute right-0 bottom-0 h-[560px] w-[560px] rounded-full bg-[#0077a3]/15 blur-[160px]" />
      </>
    );
  }

  if (tone === "dark") {
    return (
      <>
        <div className="absolute inset-0 bg-[linear-gradient(rgba(247,248,243,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(247,248,243,0.055)_1px,transparent_1px)] bg-[size:96px_96px]" />
        <div className="absolute -left-32 top-24 h-[520px] w-[520px] rounded-full bg-[#00b86b]/15 blur-[150px]" />
        <div className="absolute right-0 bottom-0 h-[560px] w-[560px] rounded-full bg-[#0077a3]/15 blur-[160px]" />
      </>
    );
  }

  return (
    <>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,23,19,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(18,23,19,0.055)_1px,transparent_1px)] bg-[size:96px_96px]" />
      <div className="absolute left-12 top-10 h-[480px] w-[480px] rounded-full bg-[#00b86b]/12 blur-[130px]" />
      <div className="absolute right-10 bottom-0 h-[520px] w-[520px] rounded-full bg-[#ffb84d]/20 blur-[150px]" />
    </>
  );
}

function SlideFrame({
  tone = "dark",
  children,
  className = "",
  atmosphere = "default",
  fullBleed = false,
}: SlideFrameProps) {
  return (
    <section className={`relative h-full min-h-0 w-full overflow-hidden ${toneClasses[tone]} ${className}`}>
      <Atmosphere tone={tone} variant={atmosphere} />
      <div className={`relative z-10 flex h-full min-h-0 flex-col ${fullBleed ? "" : "px-14 py-10"}`}>
        <main className="min-h-0 flex-1">{children}</main>
      </div>
    </section>
  );
}

const HUMAN_SKILL_IMAGES = {
  verdaderoStack: {
    src: "/assets/verdadero.png",
    alt: "Figura meditando al inicio de un túnel de perspectiva digital",
  },
  curiosity: {
    src: "/assets/curiosidad.png",
    alt: "Figura sentada frente a una estructura luminosa en el campo",
  },
  initiative: {
    src: "/assets/iniciativa.png",
    alt: "Figura extendiendo un rastro de luz hacia el horizonte",
  },
  optimism: {
    src: "/assets/optimismo.png",
    alt: "Figura en la cima de una colina rodeada de mariposas luminosas",
  },
} as const;

function ThinRule({ tone = "dark" }: { tone?: Tone }) {
  return <div className={`h-px w-24 ${tone === "dark" ? "bg-[#00b86b]" : "bg-[#ad6b00]"}`} />;
}

function StackTitleMarker({
  active = true,
  animate = true,
  delay,
}: {
  active?: boolean;
  animate?: boolean;
  delay?: string;
}) {
  const stateClass = !active
    ? "[clip-path:inset(0_100%_0_0_round_3px)]"
    : animate
      ? "animate-marker-highlight"
      : "[clip-path:inset(0_0_0_0_round_3px)]";

  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute -left-3 -right-3 top-[52%] h-[0.48em] overflow-hidden ${stateClass}`}
      style={delay ? { animationDelay: delay } : undefined}
    >
      <span className="block h-full w-full -skew-x-3 rounded-[3px] bg-[#00b86b]/65" />
    </span>
  );
}

function BioHighlight({ children }: { children: ReactNode }) {
  return (
    <span className="relative inline font-semibold text-[#0a0f0c]">
      <StackTitleMarker animate={false} />
      <span className="relative">{children}</span>
    </span>
  );
}

interface MilestoneData {
  year: string;
  label: string;
  headline: string;
  description: string;
  keyModels: readonly string[];
  capabilities: readonly string[];
  impact: string;
  rx: number;
  ry: number;
}

const CURVE_CHART = {
  xMin: 60,
  xMax: 520,
  yBase: 278,
  yTop: 36,
  exponent: 4.4,
} as const;

function exponentialCurveY(progress: number) {
  const { yBase, yTop, exponent } = CURVE_CHART;
  const growth =
    (Math.exp(exponent * progress) - 1) /
    (Math.exp(exponent) - 1);
  return yBase - (yBase - yTop) * growth;
}

function exponentialCurveX(index: number, total: number) {
  const progress = index / (total - 1);
  return CURVE_CHART.xMin + progress * (CURVE_CHART.xMax - CURVE_CHART.xMin);
}

function buildExponentialCurvePath(sampleCount = 56) {
  return Array.from({ length: sampleCount }, (_, index) => {
    const progress = index / (sampleCount - 1);
    const x = CURVE_CHART.xMin + progress * (CURVE_CHART.xMax - CURVE_CHART.xMin);
    const y = exponentialCurveY(progress);
    return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(" ");
}

const EXPONENTIAL_CURVE_PATH = buildExponentialCurvePath();

const milestoneContent = [
  {
    year: "2021",
    label: "MMLU",
    headline: "Conocimiento general medible",
    description: "MMLU convierte la inteligencia de los modelos en una prueba amplia: 57 materias, desde humanidades hasta ciencias duras.",
    keyModels: ["MMLU", "57 materias"],
    capabilities: ["Conocimiento académico", "Comprensión multi-dominio"],
    impact: "MMLU prueba 57 materias: GPT-3 alcanza 44%, cuando el azar da 25% y un experto humano, 90%.",
  },
  {
    year: "2022",
    label: "Aritmética",
    headline: "La IA empieza a calcular",
    description: "Los modelos dejan de solo completar texto y comienzan a resolver operaciones básicas, expresiones simples y razonamiento matemático corto.",
    keyModels: ["MATH 401", "BIG-Bench Hard"],
    capabilities: ["Aritmética básica", "Cadena de pensamiento"],
    impact: "Chain-of-thought lleva a PaLM de 4% a 58% en matemáticas escolares, sin reentrenar el modelo.",
  },
  {
    year: "2023",
    label: "Exámenes pro",
    headline: "Rendimiento de nivel profesional",
    description: "La frontera salta de resolver prompts aislados a superar pruebas humanas de alta presión, incluyendo derecho, medicina y razonamiento visual.",
    keyModels: ["Bar exam", "AP / SAT / GRE"],
    capabilities: ["Razonamiento multimodal", "Pruebas profesionales"],
    impact: "GPT-4 pasa el examen de abogacía en el top 10%, una prueba reservada para profesionales humanos.",
  },
  {
    year: "2024",
    label: "Razonamiento",
    headline: "La IA piensa antes de responder",
    description: "Los modelos de razonamiento invierten más tiempo de inferencia en una cadena de pensamiento interna antes de dar una respuesta final.",
    keyModels: ["o1", "AIME 2024"],
    capabilities: ["Chain-of-thought", "Razonamiento previo"],
    impact: "AIME 2024 prueba matemáticas olímpicas: o1 acierta 83%, cuando GPT-4o marca 12% y el corte nacional exige ~93%.",
  },
  {
    year: "2025",
    label: "ARC-AGI",
    headline: "Generalización abstracta",
    description: "ARC-AGI mide inteligencia fluida: razonar, resolver problemas nuevos y adaptarse, no conocimiento ya memorizado.",
    keyModels: ["ARC-AGI-1", "ARC Prize 2024"],
    capabilities: ["Generalización few-shot", "Razonamiento abstracto"],
    impact: "ARC-AGI mide inteligencia fluida — razonar, resolver lo desconocido y adaptarse —, no lo memorizado. OpenAI o3 alcanza 87.5%; GPT-4o apenas llegaba al 5%.",
  },
  {
    year: "2026",
    label: "Agentes",
    headline: "Razonamiento interactivo y acción",
    description: "La frontera ya no solo contesta exámenes: mantiene contexto, usa herramientas, verifica hipótesis y coordina subagentes durante tareas largas.",
    keyModels: ["ARC-AGI-3", "Terminal-Bench"],
    capabilities: ["Razonamiento interactivo", "Trabajo de larga duración"],
    impact: "METR (mayo 2026): los agentes frontera completan tareas autónomas de ~17 horas con fiabilidad del 50%.",
  },
] as const;

const milestones: MilestoneData[] = milestoneContent.map((milestone, index, all) => ({
  ...milestone,
  rx: exponentialCurveX(index, all.length),
  ry: exponentialCurveY(index / (all.length - 1)),
}));

export const CURVE_MILESTONE_COUNT = milestones.length;

const velocityCompanyLogos: Record<
  string,
  { Icon: ComponentType<SVGProps<SVGSVGElement>>; className: string }
> = {
  OpenAI: { Icon: OpenaiWordmarkDark, className: "h-9 w-auto" },
  Anthropic: { Icon: AnthropicWhiteWordmark, className: "h-7 w-auto" },
  Cursor: { Icon: CursorLight, className: "h-12 w-auto fill-white" },
};

const velocityCompanies = [
  {
    name: "OpenAI",
    accent: "#a855f7",
    accentSoft: "rgba(168,85,247,0.22)",
    stat: "De $2B ARR a ~$24B ARR run-rate en tres años.",
    metrics: [
      { label: "Valoración", value: "$852B" },
      { label: "Tiempo", value: "~3 años", accent: true },
    ],
    bars: [
      { label: "2023", value: "$2B ARR", amount: 2 },
      { label: "2026", value: "~$24B run-rate", amount: 24, highlight: true },
    ],
    comparisons: [
      { label: "Nintendo", value: "$12B", amount: 12, years: "137 años", founded: "Fundado en 1889" },
      { label: "La NFL", value: "$20B", amount: 20, years: "106 años", founded: "Fundada en 1920" },
    ],
  },
  {
    name: "Anthropic",
    accent: "#00b86b",
    accentSoft: "rgba(0,184,107,0.22)",
    stat: "Ingresos anualizados comprimidos hacia $45.0B en 2026.",
    metrics: [
      { label: "Valoración", value: "$380B" },
      { label: "Tiempo", value: "~2 años", accent: true },
    ],
    bars: [
      { label: "Jan '23", value: "$0", amount: 0 },
      { label: "Jan '24", value: "$100M+", amount: 0.1 },
      { label: "Jan '25", value: "$1B+", amount: 1 },
      { label: "2026", value: "$45.0B", amount: 45, highlight: true },
    ],
    comparisons: [
      { label: "Hilton Hotels", value: "$11B", amount: 11, years: "105 años", founded: "Fundado en 1919" },
      { label: "Spotify", value: "$15B", amount: 15, years: "20 años", founded: "Fundado en 2006" },
    ],
  },
  {
    name: "Cursor",
    accent: "#2f7df0",
    accentSoft: "rgba(47,125,240,0.22)",
    stat: "De editor emergente a $2.1B+ ARR en menos de un ciclo presupuestal.",
    metrics: [
      { label: "Valoración", value: "$29.3B" },
      { label: "Tiempo", value: "~2 años", accent: true },
    ],
    bars: [
      { label: "Early '23", value: "Nace", amount: 0 },
      { label: "2026", value: "$2.1B+ ARR", amount: 2.1, highlight: true },
    ],
    comparisons: [
      { label: "The Economist", value: "$400M", amount: 0.4, years: "183 años", founded: "Fundado en 1843" },
      { label: "FC Barcelona", value: "$1B", amount: 1, years: "127 años", founded: "Fundado en 1899" },
    ],
  },
];

export const VELOCITY_COMPANY_COUNT = velocityCompanies.length;

function CurveChart({ milestoneIndex }: { milestoneIndex: number }) {
  const activeMilestone = milestones[milestoneIndex] ?? milestones[0];

  return (
    <div 
      className="relative h-full min-h-0 w-full rounded-[2rem] border border-white/10 bg-[#0e1217]/50 p-6 shadow-2xl backdrop-blur-md flex flex-col justify-between"
    >
      {/* Background grid details */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60 rounded-[2rem] pointer-events-none" />

      {/* Main Container: Split into Left Inspector and Right Curve */}
      <div className="relative z-10 grid h-full w-full grid-cols-[1.35fr_1.65fr] gap-8 items-stretch min-h-0">
        
        {/* Left Column: Milestone Inspector Panel */}
        <div className="relative flex flex-col justify-center rounded-2xl border border-white/5 bg-slate-950/40 p-8 overflow-hidden min-h-0">
          <div className="absolute -right-16 -top-16 w-32 h-32 bg-[#00b86b]/10 blur-3xl pointer-events-none rounded-full" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMilestone.year}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-5"
            >
              <h3 className="text-[7.5rem] font-display font-black tracking-[-0.06em] text-white leading-[0.85]">
                {activeMilestone.year}
              </h3>
              <h4 className="text-[3.25rem] font-display font-semibold text-[#00b86b] tracking-[-0.04em] leading-[1.05]">
                {activeMilestone.label}
              </h4>
              <p className="border-t border-white/10 pt-6 text-[2rem] font-medium leading-snug tracking-[-0.035em] text-white/70">
                {activeMilestone.impact}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Column: Exponential Curve SVG and Axis */}
        <div className="relative flex flex-col justify-between min-h-0">
          {/* Legend indicator */}
          <div className="absolute top-0 right-2 flex items-center gap-9 font-mono text-sm text-white/48 tracking-[0.18em]">
            <div className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded-full bg-[#00b86b]" />
              <span>CAPACIDAD / INTELIGENCIA</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span>ESCALA: EXPONENCIAL</span>
            </div>
          </div>

          {/* SVG wrapper */}
          <div className="relative flex-1 min-h-0 w-full mt-4">
            <svg 
              viewBox="0 0 580 320" 
              className="h-full w-full overflow-visible"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Grid Lines inside Right Area */}
              <line x1="40" y1="280" x2="550" y2="280" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />
              <line x1="40" y1="200" x2="550" y2="200" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
              <line x1="40" y1="120" x2="550" y2="120" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
              <line x1="40" y1="40" x2="550" y2="40" stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
              
              <line x1="40" y1="40" x2="40" y2="280" stroke="rgba(255,255,255,0.08)" strokeDasharray="3 3" />

              {/* The Exponential Curve Path */}
              <motion.path
                d={EXPONENTIAL_CURVE_PATH}
                fill="none"
                stroke="rgba(0,184,107,0.15)"
                strokeWidth="24"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
              <motion.path
                d={EXPONENTIAL_CURVE_PATH}
                fill="none"
                stroke="url(#curve-gradient)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient id="curve-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00b86b" stopOpacity="0.4" />
                  <stop offset="70%" stopColor="#00b86b" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#00ff95" stopOpacity="1" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Interactive Milestones dots */}
              {milestones.map((m, index) => {
                const isActive = activeMilestone.year === m.year;
                const isReached = index <= milestoneIndex;
                
                return (
                  <g 
                    key={m.year}
                  >
                    {/* Glowing outer circle on active milestone */}
                    <AnimatePresence>
                      {isActive && (
                        <motion.circle
                          cx={m.rx}
                          cy={m.ry}
                          initial={{ r: 6, opacity: 0 }}
                          animate={{ r: 15, opacity: [0.15, 0.35, 0] }}
                          exit={{ opacity: 0 }}
                          transition={{ 
                            repeat: Infinity, 
                            duration: 1.4, 
                            ease: "easeOut" 
                          }}
                          fill="#00b86b"
                        />
                      )}
                    </AnimatePresence>

                    {/* Outer border circle */}
                    <motion.circle
                      cx={m.rx}
                      cy={m.ry}
                      r={isActive ? 10 : 7}
                      animate={{ 
                        r: isActive ? 10 : 7,
                        strokeWidth: isActive ? 4 : 3,
                        stroke: isActive ? "#00ff95" : isReached ? "#00b86b" : "rgba(0,184,107,0.35)",
                        opacity: isReached ? 1 : 0.35,
                      }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      fill="#070908"
                      stroke="#00b86b"
                      strokeWidth="3"
                    />

                    {/* Center Core dot */}
                    <circle
                      cx={m.rx}
                      cy={m.ry}
                      r="3.5"
                      fill={isActive ? "#00ff95" : isReached ? "#00b86b" : "rgba(0,184,107,0.35)"}
                      opacity={isReached ? 1 : 0.35}
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Timeline Years X-Axis Labels (Horizontal) */}
          <div className="mt-2 border-t border-white/10 pt-4 px-2 flex justify-between items-center shrink-0">
            {milestones.map((m, index) => {
              const isActive = activeMilestone.year === m.year;
              const isReached = index <= milestoneIndex;
              
              return (
                <div
                  key={m.year}
                  className="flex flex-col items-center transition-all duration-200"
                >
                  {/* Subtle marker ticker */}
                  <div className={`h-1.5 w-[2px] transition-colors duration-200 ${
                    isActive ? "bg-[#00ff95]" : isReached ? "bg-[#00b86b]" : "bg-white/20"
                  }`} />
                  
                  {/* Year text */}
                  <span className={`mt-2 font-display font-bold tracking-tight transition-all duration-200 ${
                    isActive 
                      ? "text-white scale-110 text-2xl" 
                      : isReached
                        ? "text-white/80 text-xl"
                        : "text-white/30 text-xl"
                  }`}>
                    {m.year}
                  </span>
                  
                  {/* Year shorthand label */}
                  <span className={`mt-1 font-mono text-[8px] uppercase tracking-wider transition-all duration-200 hidden md:block ${
                    isActive 
                      ? "text-white/80 font-medium" 
                      : isReached
                        ? "text-white/50"
                        : "text-white/20"
                  }`}>
                    {m.label.split(" & ")[0].split(" + ")[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

function VelocityChart({ companyIndex }: { companyIndex: number }) {
  const company = velocityCompanies[companyIndex];
  const { Icon: CompanyLogo, className: logoClassName } = velocityCompanyLogos[company.name];
  const chartColumns = [
    ...company.bars.map((bar) => ({ ...bar, type: "ai" as const })),
    ...company.comparisons.map((comparison) => ({ ...comparison, type: "traditional" as const })),
  ];
  const maxAmount = Math.max(...chartColumns.map((column) => column.amount));
  const columnTemplate = `repeat(${chartColumns.length}, minmax(0, 1fr))`;
  const getBarHeight = (amount: number) => {
    if (amount <= 0) return 5;
    return Math.max(8, Math.round((amount / maxAmount) * 100));
  };

  return (
    <div className="animate-chart-reveal relative h-full min-h-0 w-full rounded-[2rem] border border-white/10 bg-[#0e1217]/50 p-6 shadow-2xl backdrop-blur-md">
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />

      <div className="relative z-10 grid h-full min-h-0 w-full grid-cols-[1.35fr_1.65fr] items-stretch gap-8">
        <div className="relative flex min-h-0 flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-slate-950/40 p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full blur-3xl"
            style={{ backgroundColor: company.accentSoft }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full min-h-0 flex-col justify-between gap-8"
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between gap-8">
                  <CompanyLogo aria-label={company.name} className={logoClassName} />
                  <span
                    className="rounded-full border px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ borderColor: company.accent, color: company.accent, background: company.accentSoft }}
                  >
                    vertical
                  </span>
                </div>

                <p className="border-t border-white/10 pt-6 text-[1.85rem] font-medium leading-snug tracking-[-0.035em] text-white/72">
                  {company.stat}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {company.metrics.map((metric) => (
                  <div key={metric.label} className="min-w-0 rounded-2xl border border-white/8 bg-white/[0.035] p-5">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/32">
                      {metric.label}
                    </p>
                    <p
                      className="mt-3 whitespace-nowrap text-[2rem] font-display font-semibold leading-none tracking-[-0.07em]"
                      style={{ color: metric.accent ? company.accent : "#f7f8f3" }}
                    >
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative flex min-h-0 flex-col justify-between">
          <div className="absolute right-2 top-0 flex items-center gap-9 font-mono text-sm tracking-[0.18em] text-white/48">
            <div className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: company.accent }} />
              <span>ARR / ADOPCIÓN</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="h-3 w-3 rounded-full bg-[#d39518]" />
              <span>EMPRESAS TRADICIONALES</span>
            </div>
          </div>

          <div
            className="mt-10 grid min-h-0 flex-1 grid-rows-[auto_auto_minmax(0,1fr)_auto] gap-x-4 gap-y-4 px-2"
            style={{ gridTemplateColumns: columnTemplate }}
          >
            <p
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/28"
              style={{ gridColumn: `span ${company.bars.length}` }}
            >
              crecimiento IA
            </p>
            <p
              className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#d39518]/55"
              style={{ gridColumn: `span ${company.comparisons.length}` }}
            >
              vs tradicional
            </p>

            {chartColumns.map((column) => (
              <p
                key={`${column.label}-value`}
                className="row-start-2 whitespace-nowrap text-center font-display font-semibold tracking-[-0.04em]"
                style={{
                  color: column.type === "ai" ? "#f7f8f3" : "rgba(211,149,24,0.9)",
                  fontSize: chartColumns.length > 4 ? "1.05rem" : "1.28rem",
                }}
              >
                {column.value}
              </p>
            ))}

            <div className="relative col-span-full row-start-3 grid min-h-0 gap-x-4" style={{ gridTemplateColumns: columnTemplate }}>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-white/10" />
              <div className="pointer-events-none absolute inset-x-0 bottom-1/4 h-px border-t border-dashed border-white/5" />
              <div className="pointer-events-none absolute inset-x-0 bottom-1/2 h-px border-t border-dashed border-white/5" />
              <div className="pointer-events-none absolute inset-x-0 bottom-3/4 h-px border-t border-dashed border-white/5" />

              {chartColumns.map((column, columnIndex) => {
                const barHeight = getBarHeight(column.amount);
                const isAiColumn = column.type === "ai";
                const isHighlighted = isAiColumn && "highlight" in column && column.highlight;

                return (
                  <div key={`${column.label}-bar`} className="relative z-10 flex h-full min-h-0 items-end justify-center">
                    <div
                      className={`animate-velocity-bar flex w-full max-w-[88px] flex-col items-center justify-center rounded-t-xl px-2 text-center ${
                        isAiColumn ? "" : "rounded-b-md border border-[#d39518]/16 bg-[#d39518]/8"
                      }`}
                      style={{
                        height: `${barHeight}%`,
                        minHeight: column.amount <= 0 ? 12 : 30,
                        animationDelay: `${columnIndex * 70}ms`,
                        background: isAiColumn
                          ? isHighlighted
                            ? `linear-gradient(180deg, ${company.accent}, ${company.accentSoft})`
                            : "linear-gradient(180deg, rgba(247,248,243,0.3), rgba(247,248,243,0.1))"
                          : undefined,
                        boxShadow: isHighlighted ? `0 0 34px ${company.accentSoft}` : undefined,
                      }}
                    >
                      {!isAiColumn && "years" in column ? (
                        <p className="text-base font-display font-semibold leading-tight tracking-[-0.04em] text-[#d39518]/88">
                          {column.years}
                        </p>
                      ) : null}
                    </div>
                  </div>
                );
              })}
            </div>

            {chartColumns.map((column) => (
              <div key={`${column.label}-axis`} className="row-start-4 min-w-0 pt-1 text-center">
                <p
                  className={`leading-tight ${
                    column.type === "ai"
                      ? "font-mono text-xs uppercase tracking-[0.12em] text-white/36"
                      : "text-sm font-semibold text-[#d39518]/82"
                  }`}
                >
                  {column.label}
                </p>
                {"founded" in column ? (
                  <p className="mt-1 text-[10px] leading-tight text-[#d39518]/42">{column.founded}</p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const agentDomainUsage = [
  { label: "Desarrollo de Software", value: 49.7, highlight: true },
  { label: "Automatización Back-office", value: 9.1 },
  { label: "Otros", value: 7.1 },
  { label: "Marketing y Copywriting", value: 4.4 },
  { label: "Ventas y CRM", value: 4.3 },
  { label: "Finanzas y Contabilidad", value: 4.0 },
  { label: "Análisis de Datos y BI", value: 3.5 },
  { label: "Investigación Académica", value: 2.8 },
  { label: "Ciberseguridad", value: 2.4 },
  { label: "Atención al Cliente", value: 2.2 },
] as const;

const AGENT_DOMAIN_CHART_MAX = 50;
const agentDomainAxisTicks = [0, 10, 20, 30, 40, 50] as const;

function AgentDomainsChart() {
  const topDomain = agentDomainUsage[0];

  return (
    <div className="animate-chart-reveal relative h-full min-h-0 w-full rounded-[2rem] border border-white/10 bg-[#0e1217]/50 p-6 shadow-2xl backdrop-blur-md">
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] opacity-60" />

      <div className="relative z-10 grid h-full min-h-0 w-full grid-cols-[1.15fr_1.85fr] items-stretch gap-8">
        <div className="relative flex min-h-0 flex-col justify-between overflow-hidden rounded-2xl border border-white/5 bg-slate-950/40 p-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-[#00b86b]/10 blur-3xl" />

          <div className="space-y-8">
            <div className="flex items-center justify-between gap-6">
              <AnthropicWhiteWordmark aria-label="Anthropic" className="h-5 w-auto text-white/82" />
              <span className="rounded-full border border-[#00b86b]/35 bg-[#00b86b]/10 px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#00b86b]">
                agentes
              </span>
            </div>

            <p className="border-t border-white/10 pt-6 text-[1.65rem] font-medium leading-snug tracking-[-0.035em] text-white/72">
              Casi la mitad del uso de agentes ocurre en desarrollo de software.
            </p>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.035] p-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-white/32">
              {topDomain.label}
            </p>
            <p className="mt-3 font-display text-[3.4rem] font-semibold leading-none tracking-[-0.07em] text-[#00b86b]">
              {topDomain.value.toFixed(1)}%
            </p>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-white/28">
              % de tool calls
            </p>
          </div>
        </div>

        <div className="relative flex min-h-0 flex-col">
          <div className="mb-5 flex items-end justify-between gap-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/28">
              distribución por dominio
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/28">
              % de tool calls
            </p>
          </div>

          <div className="relative min-h-0 flex-1">
            <div className="pointer-events-none absolute inset-y-0 right-0 left-[11.5rem]">
              {agentDomainAxisTicks.map((tick) => (
                <div
                  key={tick}
                  className="absolute inset-y-0 border-l border-dashed border-white/8"
                  style={{ left: `${(tick / AGENT_DOMAIN_CHART_MAX) * 100}%` }}
                />
              ))}
            </div>

            <div className="relative flex h-full min-h-0 flex-col justify-between gap-2.5 py-1">
              {agentDomainUsage.map((domain, index) => {
                const barWidth = (domain.value / AGENT_DOMAIN_CHART_MAX) * 100;

                return (
                  <div key={domain.label} className="grid min-h-0 flex-1 grid-cols-[11.5rem_minmax(0,1fr)_4.5rem] items-center gap-4">
                    <p className="truncate text-right text-[0.95rem] font-medium leading-tight tracking-[-0.02em] text-white/72">
                      {domain.label}
                    </p>

                    <div className="relative h-7 overflow-hidden rounded-full bg-white/[0.04]">
                      <motion.div
                        initial={{ scaleX: 0, opacity: 0.45 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{
                          duration: 0.72,
                          delay: 0.08 + index * 0.05,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{
                          width: `${barWidth}%`,
                          transformOrigin: "left center",
                          background: "highlight" in domain && domain.highlight
                            ? "linear-gradient(90deg, #00b86b, rgba(0,184,107,0.45))"
                            : "linear-gradient(90deg, rgba(247,248,243,0.34), rgba(247,248,243,0.12))",
                          boxShadow: "highlight" in domain && domain.highlight ? "0 0 28px rgba(0,184,107,0.22)" : undefined,
                        }}
                      />
                    </div>

                    <p
                      className={`text-right font-display text-[1.05rem] font-semibold tracking-[-0.04em] ${
                        "highlight" in domain && domain.highlight ? "text-[#00b86b]" : "text-white/72"
                      }`}
                    >
                      {domain.value.toFixed(1)}%
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-[11.5rem_minmax(0,1fr)_4.5rem] items-center gap-4 border-t border-white/10 pt-4">
            <div />
            <div className="relative h-4">
              {agentDomainAxisTicks.map((tick) => (
                <span
                  key={tick}
                  className="absolute top-0 -translate-x-1/2 font-mono text-[10px] tracking-[0.08em] text-white/28"
                  style={{ left: `${(tick / AGENT_DOMAIN_CHART_MAX) * 100}%` }}
                >
                  {tick}
                </span>
              ))}
            </div>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Slide1Title() {
  return (
    <SlideFrame atmosphere="animated">
      <div className="relative flex h-full min-h-0 flex-col">
        <div className="grid min-h-0 flex-1 grid-cols-[0.95fr_1.05fr] items-center gap-16">
          <div className="space-y-10">
            <ThinRule />
            <h1 className="text-[7rem] font-display font-semibold leading-[0.86] tracking-[-0.085em]">
              Algo grande
              <br />
              <span className="text-[#00b86b]">está sucediendo</span>
            </h1>
            <p className="font-mono text-xl font-bold uppercase tracking-[0.22em] text-white/55">
              Javier Rivero 2026
            </p>
          </div>
          <div className="relative h-full min-h-0 overflow-hidden rounded-[2rem] p-px">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[-120%] animate-cover-border-spin bg-[conic-gradient(from_0deg,transparent_0%,transparent_34%,rgba(0,184,107,0.85)_44%,rgba(0,255,135,1)_52%,rgba(255,255,255,0.95)_56%,rgba(0,255,135,1)_60%,rgba(0,184,107,0.9)_68%,transparent_78%,transparent_100%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[-120%] animate-cover-border-spin-reverse opacity-45 bg-[conic-gradient(from_180deg,transparent_0%,transparent_40%,rgba(0,255,135,0.75)_50%,rgba(0,184,107,0.55)_58%,transparent_68%,transparent_100%)]"
            />
            <div className="relative h-full min-h-0 overflow-hidden rounded-[calc(2rem-1px)] bg-[#070908]">
              <Image
                src="/assets/cover.png"
                alt="División cinematográfica antes / después"
                fill
                priority
                quality={100}
                sizes="52vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 z-20">
          <Image
            src="/assets/collective-logo-white.png"
            alt="Collective"
            width={1155}
            height={186}
            priority
            className="h-auto w-[11rem] opacity-85"
          />
        </div>
      </div>
    </SlideFrame>
  );
}

export function Slide2Intro() {
  return (
    <SlideFrame tone="bridge" fullBleed>
      <div className="flex h-full w-full items-center justify-center px-[10%] py-[8%]">
        <div className="flex w-full max-w-[1240px] items-start gap-20">
          <div className="w-[300px] shrink-0">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[1.75rem] bg-[#1a1524] shadow-[0_24px_60px_rgba(10,15,12,0.18)] ring-1 ring-black/10">
              <Image
                src="/assets/Javier.webp"
                alt="Javier Rivero"
                fill
                priority
                quality={100}
                sizes="300px"
                className="object-cover object-[center_18%]"
              />
            </div>
            <div className="mt-6 space-y-2">
              <h2 className="text-[2.75rem] font-display font-semibold leading-none tracking-[-0.05em] text-[#0a0f0c]">
                Javier Rivero
              </h2>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-[#66706a]">
                Estrategia global de soporte · Stripe
              </p>
            </div>
          </div>

          <div className="min-w-0 flex-1 space-y-8 pt-1 text-[1.4rem] leading-[1.72] text-[#29352f]">
            <p>
              Lidera la estrategia global de soporte al consumidor en <BioHighlight>Stripe</BioHighlight>. Previamente
              escaló operaciones y equipos de 200+ personas en <BioHighlight>Uber</BioHighlight> y{" "}
              <BioHighlight>Philip Morris International</BioHighlight> mediante metodologías ágiles y decisiones
              basadas en datos.
            </p>
            <p>
              Su expertise combina experiencia en tech y manufactura con especialización en liderazgo de equipos,
              eficiencia de procesos y planeación estratégica, competencias que aplica como mentor de Agile Leadership
              en <BioHighlight>Collective Academy</BioHighlight>.
            </p>
            <p>
              Ha sido conferencista en <BioHighlight>Google</BioHighlight> y <BioHighlight>TEDx</BioHighlight> sobre el
              futuro del liderazgo y actualmente lidera la{" "}
              <BioHighlight>comunidad más grande de IA en México</BioHighlight>.
            </p>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

const GLOBE_EMBED_SRC = "https://space.tordapps.com/embed/YN66C6DajT4zdX4lbumdL?autoplay=true&c=eyJ2ZXJzaW9uIjoxLCJjYW52YXMiOnsid2lkdGgiOjgwMCwiaGVpZ2h0Ijo2MDB9LCJnbG9iZSI6eyJjb2xvciI6IiMwYTE2MjgiLCJvcGFjaXR5IjoxLCJyb3VnaG5lc3MiOjAuOCwibWV0YWxuZXNzIjowLjEsInNob3dUZXh0dXJlIjpmYWxzZSwidGV4dHVyZVVybCI6IiIsInJhZGl1cyI6MSwid2lyZWZyYW1lIjpmYWxzZSwic2hvd1BvbHlnb25zIjpmYWxzZSwiYm9yZGVyQ29sb3IiOiIjMWU0MGFmIiwiZmlsbENvbG9yIjoiIzBkMWYzYyIsImZpbGxPcGFjaXR5IjowLjgsInNob3dDb3VudHJ5T3V0bGluZXMiOmZhbHNlLCJvdXRsaW5lVGhpY2tuZXNzIjowLjUsIm91dGxpbmVPcGFjaXR5IjowLjZ9LCJtYXAiOnsicHJlc2V0IjoibWluaW1hbC1kYXJrIiwic2hvd0dyYXRpY3VsZXMiOmZhbHNlLCJncmF0aWN1bGVDb2xvciI6IiNmZmZmZmYiLCJncmF0aWN1bGVPcGFjaXR5IjowLjF9LCJtYXBMYXllciI6eyJlbmFibGVkIjp0cnVlLCJtb2RlIjoiZG90cyIsInByb2plY3Rpb24iOiJlcXVpcmVjdGFuZ3VsYXIiLCJzYXRlbGxpdGVTdHlsZSI6InJlYWxpc3RpYyIsImxhbmRDb2xvciI6IiNmZmZmZmYiLCJvY2VhbkNvbG9yIjoiIzA1MDcwRCIsIm91dGxpbmVDb2xvciI6IiMzYjgyZjYiLCJib3JkZXJDb2xvciI6IiNmZmZmZmYiLCJsYW5kT3BhY2l0eSI6MC4yLCJvY2Vhbk9wYWNpdHkiOjEsIm91dGxpbmVPcGFjaXR5IjowLjQsImJvcmRlck9wYWNpdHkiOjAuMzUsIm91dGxpbmVXaWR0aCI6MSwiYm9yZGVyV2lkdGgiOjAuNSwiZG90Q29sb3IiOiIjNTBmZjVkIiwiZG90U2l6ZSI6MC44LCJkb3REZW5zaXR5IjowLjY1LCJkb3RPcGFjaXR5IjowLjcsImRvdFJhbmRvbW5lc3MiOjAuMSwiZG90R2xvdyI6dHJ1ZSwiZG90R2xvd0ludGVuc2l0eSI6MC4zNSwiZG90R2xvd0NvbG9yIjoiI2ZmZmZmZiIsImRvdFNoYXBlIjoiY2lyY2xlIiwiZ3JpZEVuYWJsZWQiOnRydWUsImdyaWRDb2xvciI6IiMzYjgyZjYiLCJncmlkT3BhY2l0eSI6MC4xLCJncmlkTGluZVdpZHRoIjowLjUsImdyaWRMYXRpdHVkZVN0ZXAiOjE1LCJncmlkTG9uZ2l0dWRlU3RlcCI6MTUsIm5vaXNlRW5hYmxlZCI6ZmFsc2UsIm5vaXNlU3RyZW5ndGgiOjAuMTUsIm5vaXNlU2NhbGUiOjEsIm5vaXNlT3BhY2l0eSI6MC4yLCJjb2Fyc2VFbmFibGVkIjpmYWxzZSwiY29hcnNlU2l6ZSI6NCwiY29hcnNlVGhyZXNob2xkIjowLjUsImRpc3BsYWNlbWVudFNjYWxlIjowLCJidW1wU2NhbGUiOjAuMDUsIm5vcm1hbFNjYWxlIjowLjIsImludmVydE1hcCI6ZmFsc2UsIm1hcEJyaWdodG5lc3MiOjEsIm1hcENvbnRyYXN0IjoxLCJtYXBTYXR1cmF0aW9uIjoxLCJibGVuZE1vZGUiOiJub3JtYWwiLCJyZW5kZXJPcmRlciI6MiwiZG90c0VuYWJsZWQiOmZhbHNlLCJvdXRsaW5lRW5hYmxlZCI6ZmFsc2UsInRleHR1cmVFbmFibGVkIjpmYWxzZSwiZW1ib3NzRW5hYmxlZCI6ZmFsc2UsImVtYm9zc01vZGUiOiJyYWlzZWQiLCJlbWJvc3NTdHJlbmd0aCI6MC4wNCwiZW1ib3NzRGVwdGgiOjEsImVtYm9zc1NvZnRuZXNzIjowLjM1LCJlbWJvc3NVc2VMYW5kTWFzayI6dHJ1ZSwiZW1ib3NzQWZmZWN0c0RvdHMiOmZhbHNlLCJlbWJvc3NBZmZlY3RzT3V0bGluZXMiOnRydWV9LCJtYXRlcmlhbCI6eyJwcmVzZXQiOiJkYXJrLXRlY2giLCJiYXNlQ29sb3IiOiIjMGExNjI4Iiwib3BhY2l0eSI6MSwidHJhbnNwYXJlbnQiOmZhbHNlLCJtZXRhbG5lc3MiOjAuMSwicm91Z2huZXNzIjowLjQ1LCJ0cmFuc21pc3Npb24iOjAsInRoaWNrbmVzcyI6MCwiaW9yIjoxLjQ1LCJjbGVhcmNvYXQiOjAuMiwiY2xlYXJjb2F0Um91Z2huZXNzIjowLjM1LCJlbWlzc2l2ZUNvbG9yIjoiIzAwMDAwMCIsImVtaXNzaXZlSW50ZW5zaXR5IjowLCJlbnZNYXBJbnRlbnNpdHkiOjAuNiwiYnVtcEVuYWJsZWQiOmZhbHNlLCJidW1wU2NhbGUiOjAuMDUsIm5vcm1hbEVuYWJsZWQiOmZhbHNlLCJub3JtYWxTY2FsZSI6MC4yLCJkaXNwbGFjZW1lbnRFbmFibGVkIjpmYWxzZSwiZGlzcGxhY2VtZW50U2NhbGUiOjAsIndpcmVmcmFtZSI6ZmFsc2UsIndpcmVmcmFtZUNvbG9yIjoiI2ZmZmZmZiIsIndpcmVmcmFtZU9wYWNpdHkiOjAuMTUsInN1cmZhY2VCbHVyIjowfSwiYXRtb3NwaGVyZSI6eyJzaG93Ijp0cnVlLCJjb2xvciI6IiMxZjg5MzAiLCJhbHRpdHVkZSI6MC4xNSwib3BhY2l0eSI6MC44fSwiZ2xvdyI6eyJzaG93Ijp0cnVlLCJjb2xvciI6IiMyOWIzNTQiLCJpbnRlbnNpdHkiOjIsInNwcmVhZCI6MywiZnJlc25lbEVmZmVjdCI6dHJ1ZX0sImxpZ2h0aW5nIjp7ImFtYmllbnRJbnRlbnNpdHkiOjAuNiwiZGlyZWN0aW9uYWxJbnRlbnNpdHkiOjAuOCwiZGlyZWN0aW9uYWxDb2xvciI6IiNmZmZmZmYiLCJkaXJlY3Rpb25hbFgiOjEsImRpcmVjdGlvbmFsWSI6MSwiZGlyZWN0aW9uYWxaIjoxLCJwb2ludExpZ2h0IjpmYWxzZSwicG9pbnRMaWdodENvbG9yIjoiIzAwZDRmZiIsInBvaW50TGlnaHRJbnRlbnNpdHkiOjAuNSwiaGVtaXNwaGVyZUxpZ2h0Ijp0cnVlLCJwcmVzZXQiOiJkYXJrLXRlY2gifSwiY2FtZXJhIjp7ImF1dG9Sb3RhdGUiOnRydWUsImF1dG9Sb3RhdGVTcGVlZCI6MC41LCJpbml0aWFsTGF0IjoyMCwiaW5pdGlhbExuZyI6MCwiaW5pdGlhbEFsdGl0dWRlIjoyLjUsInpvb21FbmFibGVkIjp0cnVlLCJwYW5FbmFibGVkIjpmYWxzZSwicm90YXRlRW5hYmxlZCI6dHJ1ZSwibWluWm9vbSI6MS41LCJtYXhab29tIjo4LCJzY3JvbGxab29tIjp0cnVlLCJkcmFnU2Vuc2l0aXZpdHkiOjF9LCJpbnRlcmFjdGlvbiI6eyJjbGlja0JlaGF2aW9yIjoibGFiZWwiLCJob3ZlckJlaGF2aW9yIjoibGFiZWwifSwicG9pbnRzIjpbeyJpZCI6IkF1ZXZQNFRmVGFyVW8yOWs1TVAzYiIsIm5hbWUiOiIiLCJsYXQiOjU1LjQsImxuZyI6LTMuNCwiY29sb3IiOiIjZmY4MjAwIiwic2l6ZSI6MC41LCJhbHRpdHVkZSI6MC4wMSwic2hvd0xhYmVsIjp0cnVlLCJsYWJlbCI6IiIsImxhYmVsQ29sb3IiOiIjZmZmZmZmIiwibGFiZWxTaXplIjoxLjIsInB1bHNlIjp0cnVlLCJwdWxzZVNwZWVkIjoxLCJwdWxzZVJhZGl1cyI6MywiZ2xvdyI6dHJ1ZSwicmluZ3MiOmZhbHNlfSx7ImlkIjoiNS0xUWVNXzlkdXVCRTdGNW5ZZzk2IiwibmFtZSI6IiIsImxhdCI6MjMuNiwibG5nIjotMTAyLjUsImNvbG9yIjoiI2ZmOTkwMCIsInNpemUiOjAuNSwiYWx0aXR1ZGUiOjAuMDEsInNob3dMYWJlbCI6dHJ1ZSwibGFiZWwiOiIiLCJsYWJlbENvbG9yIjoiI2ZmZmZmZiIsImxhYmVsU2l6ZSI6MS4yLCJwdWxzZSI6dHJ1ZSwicHVsc2VTcGVlZCI6MSwicHVsc2VSYWRpdXMiOjMsImdsb3ciOnRydWUsInJpbmdzIjpmYWxzZX0seyJpZCI6InVTZTNSTDhDa01abzZlTnRTdTlpNCIsIm5hbWUiOiIiLCJsYXQiOjQwLjUsImxuZyI6LTMuNywiY29sb3IiOiIjZmY5OTAwIiwic2l6ZSI6MC41LCJhbHRpdHVkZSI6MC4wMSwic2hvd0xhYmVsIjp0cnVlLCJsYWJlbCI6IiIsImxhYmVsQ29sb3IiOiIjZmZmZmZmIiwibGFiZWxTaXplIjoxLjIsInB1bHNlIjp0cnVlLCJwdWxzZVNwZWVkIjoxLCJwdWxzZVJhZGl1cyI6MywiZ2xvdyI6dHJ1ZSwicmluZ3MiOmZhbHNlfSx7ImlkIjoiY2JTa3RNM0lhWkY4clhKQlY5YUpMIiwibmFtZSI6IiIsImxhdCI6LTI1LjMsImxuZyI6MTMzLjgsImNvbG9yIjoiI2ZmOTkwMCIsInNpemUiOjAuNSwiYWx0aXR1ZGUiOjAuMDEsInNob3dMYWJlbCI6dHJ1ZSwibGFiZWwiOiIiLCJsYWJlbENvbG9yIjoiI2ZmZmZmZiIsImxhYmVsU2l6ZSI6MS4yLCJwdWxzZSI6dHJ1ZSwicHVsc2VTcGVlZCI6MSwicHVsc2VSYWRpdXMiOjMsImdsb3ciOnRydWUsInJpbmdzIjpmYWxzZX0seyJpZCI6IkhCMFJqVTl6Vzl1NkVvTndkcG82VSIsIm5hbWUiOiIiLCJsYXQiOjE0LjUsImxuZyI6LTE0LjUsImNvbG9yIjoiI2ZmOTkwMCIsInNpemUiOjAuNSwiYWx0aXR1ZGUiOjAuMDEsInNob3dMYWJlbCI6dHJ1ZSwibGFiZWwiOiIiLCJsYWJlbENvbG9yIjoiI2ZmZmZmZiIsImxhYmVsU2l6ZSI6MS4yLCJwdWxzZSI6dHJ1ZSwicHVsc2VTcGVlZCI6MSwicHVsc2VSYWRpdXMiOjMsImdsb3ciOnRydWUsInJpbmdzIjpmYWxzZX1dLCJhcmNzIjpbeyJpZCI6InZuNlc2NVkxalNleEFacmxWa09fNSIsInN0YXJ0UG9pbnRJZCI6IkF1ZXZQNFRmVGFyVW8yOWs1TVAzYiIsImVuZFBvaW50SWQiOiI1LTFRZU1fOWR1dUJFN0Y1bllnOTYiLCJzdGFydExhdCI6NTUuNCwic3RhcnRMbmciOi0zLjQsImVuZExhdCI6MjMuNiwiY29sb3IiOiIjZmY5OTAwIiwiYWx0aXR1ZGUiOjAuMywic3Ryb2tlIjoyLCJkYXNoTGVuZ3RoIjowLjksImRhc2hHYXAiOjQsImFuaW1hdGlvblRpbWUiOjIwMDAsIm9wYWNpdHkiOjAuOCwicGFydGljbGUiOnRydWUsInBhcnRpY2xlQ29sb3IiOiIjZmZmZmZmIiwicGFydGljbGVTaXplIjowLjUsInBhcnRpY2xlU3BlZWQiOjAuMDEsInJlcGVhdEludGVydmFsIjowLCJlbmRMbmciOi0xMDIuNX0seyJpZCI6IkdvSGdKWWcwYWZseDREVGxidUoycyIsInN0YXJ0UG9pbnRJZCI6IjUtMVFlTV85ZHV1QkU3RjVuWWc5NiIsImVuZFBvaW50SWQiOiJIQjBSalU5elc5dTZFb053ZHBvNlUiLCJzdGFydExhdCI6MjMuNiwic3RhcnRMbmciOi0xMDIuNSwiZW5kTGF0IjoxNC41LCJlbmRMbmciOi0xNC41LCJjb2xvciI6IiNmZjk5MDAiLCJhbHRpdHVkZSI6MC4zLCJzdHJva2UiOjIsImRhc2hMZW5ndGgiOjAuOSwiZGFzaEdhcCI6NCwiYW5pbWF0aW9uVGltZSI6MjAwMCwib3BhY2l0eSI6MC44LCJwYXJ0aWNsZSI6dHJ1ZSwicGFydGljbGVDb2xvciI6IiNmZmZmZmYiLCJwYXJ0aWNsZVNpemUiOjAuNSwicGFydGljbGVTcGVlZCI6MC4wMSwicmVwZWF0SW50ZXJ2YWwiOjB9LHsiaWQiOiJ6bUtudm1fY1F5X2xYT3JQTER4dEsiLCJzdGFydFBvaW50SWQiOiJIQjBSalU5elc5dTZFb053ZHBvNlUiLCJlbmRQb2ludElkIjoiNS0xUWVNXzlkdXVCRTdGNW5ZZzk2Iiwic3RhcnRMYXQiOjE0LjUsInN0YXJ0TG5nIjotMTQuNSwiZW5kTGF0IjoyMy42LCJlbmRMbmciOi0xMDIuNSwiY29sb3IiOiIjZmY5MDAwIiwiYWx0aXR1ZGUiOjAuMywic3Ryb2tlIjoyLCJkYXNoTGVuZ3RoIjowLjksImRhc2hHYXAiOjQsImFuaW1hdGlvblRpbWUiOjIwMDAsIm9wYWNpdHkiOjAuOCwicGFydGljbGUiOnRydWUsInBhcnRpY2xlQ29sb3IiOiIjZmZmZmZmIiwicGFydGljbGVTaXplIjowLjUsInBhcnRpY2xlU3BlZWQiOjAuMDEsInJlcGVhdEludGVydmFsIjowfSx7ImlkIjoiWngxUmE1dWNleFRQT0VnTEhRT29lIiwic3RhcnRQb2ludElkIjoiY2JTa3RNM0lhWkY4clhKQlY5YUpMIiwiZW5kUG9pbnRJZCI6IkF1ZXZQNFRmVGFyVW8yOWs1TVAzYiIsInN0YXJ0TGF0IjotMjUuMywic3RhcnRMbmciOjEzMy44LCJlbmRMYXQiOjU1LjQsImVuZExuZyI6LTMuNCwiY29sb3IiOiIjZmY5MDAwIiwiYWx0aXR1ZGUiOjAuMywic3Ryb2tlIjoyLCJkYXNoTGVuZ3RoIjowLjksImRhc2hHYXAiOjQsImFuaW1hdGlvblRpbWUiOjIwMDAsIm9wYWNpdHkiOjAuOCwicGFydGljbGUiOnRydWUsInBhcnRpY2xlQ29sb3IiOiIjZmZmZmZmIiwicGFydGljbGVTaXplIjowLjUsInBhcnRpY2xlU3BlZWQiOjAuMDEsInJlcGVhdEludGVydmFsIjowfV0sInJpbmdzIjp7ImVuYWJsZWQiOnRydWUsImNvbG9yIjoiIzAwZDRmZiIsIm1heFJhZGl1cyI6NSwicmVwZWF0UGVyaW9kIjoxMDAwLCJwcm9wYWdhdGlvblNwZWVkIjo1LCJvcGFjaXR5IjowLjZ9LCJsYWJlbHMiOnsic2hvdyI6dHJ1ZSwiY29sb3IiOiIjZmZmZmZmIiwic2l6ZSI6MS4yLCJyZXNvbHV0aW9uIjoyfSwiYmFja2dyb3VuZCI6eyJ0cmFuc3BhcmVudCI6dHJ1ZSwiY29sb3IiOiIjMDMwNzEyIiwiZ3JhZGllbnQiOmZhbHNlLCJncmFkaWVudEZyb20iOiIjMDcwZDFhIiwiZ3JhZGllbnRUbyI6IiMwZDFmM2MiLCJzdGFyZmllbGQiOnRydWUsInN0YXJEZW5zaXR5IjoyMDAsInN0YXJDb2xvciI6IiNmZmZmZmYiLCJub2lzZSI6ZmFsc2UsImdyaWQiOmZhbHNlfSwidWlUaGVtZSI6eyJiYWNrZ3JvdW5kIjoiIiwiZm9yZWdyb3VuZCI6IiIsInN1cmZhY2UiOiIiLCJzdXJmYWNlMiI6IiIsImNhcmRCZyI6IiIsImNhcmRIZWFkZXIiOiIiLCJjYXJkQm9yZGVyIjoiIiwiYm9yZGVyIjoiIiwidGV4dE11dGVkIjoiIiwidGV4dERpbSI6IiIsImlucHV0QmciOiIiLCJpbnB1dEJvcmRlciI6IiIsInNsaWRlclRyYWNrIjoiIiwic2xpZGVyUmFuZ2UiOiIiLCJidXR0b25QcmltYXJ5IjoiIiwiYnV0dG9uUHJpbWFyeUhvdmVyIjoiIiwiYnV0dG9uUHJpbWFyeVRleHQiOiIiLCJ0b2dnbGVPbiI6IiIsInRvZ2dsZU9mZiI6IiIsInRvZ2dsZVRodW1iIjoiIn0sImFubm90YXRpb25zIjpbXX0=";

function GlobeEmbed() {
  return (
    <iframe
      title="Global signal map"
      src={GLOBE_EMBED_SRC}
      className="pointer-events-none block h-full w-full"
      allow="autoplay; fullscreen"
      style={{
        border: "none",
        borderRadius: 24,
        overflow: "hidden",
      }}
      loading="lazy"
    />
  );
}

export function Slide3Catalyst() {
  return (
    <SlideFrame atmosphere="flat" className="!bg-[#070908]">
      <div className="relative h-full min-h-0 overflow-hidden rounded-[2rem] border border-white/10 bg-[#070908] px-16 py-14 shadow-2xl">
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(rgba(247,248,243,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(247,248,243,0.045)_1px,transparent_1px)] bg-[size:96px_96px]"
        />
        <div
          aria-hidden
          className="absolute -left-28 top-12 h-[500px] w-[500px] rounded-full bg-[#00b86b]/14 blur-[140px]"
        />
        <div
          aria-hidden
          className="absolute right-[-8%] bottom-[-12%] h-[620px] w-[620px] rounded-full bg-[#4ade80]/24 blur-[160px]"
        />

        <div className="relative z-10 grid h-full min-h-0 grid-cols-[0.64fr_1.36fr] items-center gap-8">
          <div className="space-y-9">
            <div className="space-y-4">
              <p className="font-mono text-sm font-bold uppercase tracking-[0.24em] text-[#00b86b]">
                El punto de giro
              </p>
              <ThinRule />
            </div>
            <h2 className="font-display text-[7.1rem] font-semibold leading-[0.88] tracking-[-0.085em]">
              Febrero
              <br />
              <span className="text-white/34">2020</span>
            </h2>
          </div>

          <div className="relative h-full min-h-0 overflow-hidden">
            <div className="relative flex h-full min-h-0 items-center justify-center">
              <div className="relative h-full w-full max-h-full min-h-0 overflow-hidden rounded-[2rem] border border-[#00b86b]/30 bg-black/25">
                <div className="absolute inset-0 scale-[1.18] origin-center">
                  <GlobeEmbed />
                </div>
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(74,222,128,0.14)_0%,transparent_58%)]"
                />
              </div>
            </div>

            <div className="absolute bottom-[8%] right-[4%] z-20 w-[340px]">
              <div className="rounded-[1.15rem] border border-white/10 bg-[#070908]/12 p-5 shadow-[0_16px_48px_rgba(0,0,0,0.32)] backdrop-blur-md">
                <p className="text-[1.35rem] font-medium leading-snug tracking-[-0.03em] text-white/78">
                  El mercado iba bien.
                  <br />
                  Hacíamos vida normal.
                </p>
                <div className="my-4 h-0.5 w-16 rounded-full bg-[#00b86b]" />
                <p className="text-[1.05rem] leading-snug tracking-[-0.02em] text-white/42">
                  Mientras algo se extendía <span className="text-white/88">silenciosamente.</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

export function Slide4CurveIntro() {
  const titleWords = ["La", "curva", "exponencial"] as const;

  return (
    <SlideFrame atmosphere="flat" fullBleed>
      <div className="relative h-full min-h-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[#070908]" />

        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/assets/curva.png"
              alt=""
              fill
              priority
              quality={100}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[#070908]/40" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(247,248,243,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(247,248,243,0.04)_1px,transparent_1px)] bg-[size:96px_96px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_22%,rgba(7,9,8,0.62)_100%)]" />
        </motion.div>

        <div className="relative z-10 flex h-full min-h-0 flex-col items-center justify-center px-14 py-10">
          <div className="flex flex-col items-center text-center">
            <h2 className="flex items-baseline gap-[0.18em] text-[8.5rem] font-display font-semibold leading-[0.9] tracking-[-0.075em] text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.65)]">
              {titleWords.map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.18 + index * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

export function Slide4Curve({ curveMilestoneIndex = 0 }: { curveMilestoneIndex?: number }) {
  return (
    <SlideFrame>
      <div className="grid h-full min-h-0 grid-rows-[auto_1fr] gap-5">
        <div className="flex items-center justify-between gap-10">
          <h2 className="text-[3.9rem] font-display font-semibold leading-none tracking-[-0.075em]">La curva exponencial.</h2>
        </div>
        <CurveChart milestoneIndex={curveMilestoneIndex} />
      </div>
    </SlideFrame>
  );
}

export function Slide4Futuro() {
  const titleWords = ["El", "futuro", "ya", "está", "aquí"] as const;

  return (
    <SlideFrame atmosphere="flat" fullBleed>
      <div className="relative h-full min-h-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[#070908]" />

        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/assets/futuro.png"
              alt=""
              fill
              priority
              quality={100}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[#070908]/40" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(247,248,243,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(247,248,243,0.04)_1px,transparent_1px)] bg-[size:96px_96px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_22%,rgba(7,9,8,0.62)_100%)]" />
        </motion.div>

        <div className="relative z-10 flex h-full min-h-0 flex-col items-center justify-center px-14 py-10">
          <div className="flex flex-col items-center text-center">
            <h2 className="flex flex-wrap items-baseline justify-center gap-x-[0.18em] gap-y-[0.02em] text-[7.5rem] font-display font-semibold leading-[0.9] tracking-[-0.075em] text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.65)]">
              {titleWords.map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.18 + index * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

export function Slide4AgentDomains() {
  return (
    <SlideFrame atmosphere="flat" className="!bg-[#181a1e]">
      <div className="grid h-full min-h-0 grid-rows-[auto_1fr] gap-5">
        <div className="flex items-end justify-between gap-10">
          <h2 className="max-w-[980px] text-[3.5rem] font-display font-semibold leading-[0.98] tracking-[-0.075em]">
            ¿En qué dominios se despliegan los agentes?
          </h2>
          <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-white/28">
            Anthropic Economic Index
          </p>
        </div>
        <AgentDomainsChart />
      </div>
    </SlideFrame>
  );
}

export function Slide6EntrenaIntro() {
  const titleWords = ["¿Cómo", "se", "entrena", "la", "IA?"] as const;

  return (
    <SlideFrame atmosphere="flat" fullBleed>
      <div className="relative h-full min-h-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[#070908]" />

        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <Image
              src="/assets/entrena.png"
              alt=""
              fill
              priority
              quality={100}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
          <div className="absolute inset-0 bg-[#070908]/40" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(247,248,243,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(247,248,243,0.04)_1px,transparent_1px)] bg-[size:96px_96px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_22%,rgba(7,9,8,0.62)_100%)]" />
        </motion.div>

        <div className="relative z-10 flex h-full min-h-0 flex-col items-center justify-center px-14 py-10">
          <div className="flex flex-col items-center text-center">
            <h2 className="flex flex-wrap items-baseline justify-center gap-x-[0.18em] gap-y-[0.02em] text-[7.5rem] font-display font-semibold leading-[0.9] tracking-[-0.075em] text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.65)]">
              {titleWords.map((word, index) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.9,
                    delay: 0.18 + index * 0.09,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

const muskAlgorithmSteps = [
  "Cuestiona los requisitos.",
  "Elimina lo innecesario.",
  "Simplifica u optimiza.",
  "Acelera el ciclo.",
  "Automatiza al final.",
] as const;

export const MUSK_ALGORITHM_STEP_COUNT = muskAlgorithmSteps.length;

export function Slide5MuskAlgorithm({ muskStepIndex = 0 }: { muskStepIndex?: number }) {
  const revealedCount = muskStepIndex;

  return (
    <SlideFrame atmosphere="flat" className="!bg-[#181a1e]">
      <div className="grid h-full min-h-0 grid-rows-[auto_1fr] gap-10">
        <div className="flex items-end justify-between gap-10">
          <h2 className="text-[3.9rem] font-display font-semibold leading-none tracking-[-0.075em]">
            El algoritmo de Musk.
          </h2>
          <p className="shrink-0 font-mono text-[10px] uppercase tracking-[0.18em] text-white/28">
            {String(revealedCount).padStart(2, "0")} / {String(MUSK_ALGORITHM_STEP_COUNT).padStart(2, "0")}
          </p>
        </div>

        <ol className="flex min-h-0 flex-1 flex-col justify-center gap-5">
          {muskAlgorithmSteps.map((step, index) => {
            const isVisible = index < revealedCount;
            const isLatest = index === revealedCount - 1;

            return (
              <li key={step} className="relative">
                <motion.div
                  initial={false}
                  animate={
                    isVisible
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : { opacity: 0, y: 18, filter: "blur(6px)" }
                  }
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-baseline gap-6 rounded-[1.75rem] border px-8 py-6 transition-colors duration-500 ${
                    isVisible
                      ? isLatest
                        ? "border-[#00b86b]/45 bg-[#00b86b]/10"
                        : "border-white/10 bg-white/[0.04]"
                      : "pointer-events-none border-transparent bg-transparent"
                  }`}
                  aria-hidden={!isVisible}
                >
                  <span
                    className={`font-mono text-[1.35rem] font-bold tracking-[0.12em] transition-colors duration-500 ${
                      isVisible ? (isLatest ? "text-[#00ff87]" : "text-white/35") : "text-transparent"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p
                    className={`text-[2.65rem] font-display font-semibold leading-none tracking-[-0.04em] transition-colors duration-500 ${
                      isVisible ? "text-white" : "text-transparent"
                    }`}
                  >
                    {step}
                  </p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </SlideFrame>
  );
}

export function Slide5Velocity({
  velocityCompanyIndex = 0,
  onSelectVelocityCompany,
}: {
  velocityCompanyIndex?: number;
  onSelectVelocityCompany?: (index: number) => void;
}) {
  return (
    <SlideFrame atmosphere="flat" className="!bg-[#181a1e]">
      <div className="grid h-full min-h-0 grid-rows-[auto_1fr] gap-5">
        <div className="flex items-center justify-between gap-10">
          <h2 className="text-[3.9rem] font-display font-semibold leading-none tracking-[-0.075em]">Realidad exponencial.</h2>
          <div className="flex min-w-[520px] items-center justify-end gap-3">
            {velocityCompanies.map((company, index) => (
              <button
                key={company.name}
                type="button"
                onClick={() => onSelectVelocityCompany?.(index)}
                className="rounded-full border px-5 py-3 text-left font-mono text-[10px] uppercase tracking-[0.18em] text-white/45 transition hover:border-white/30"
                style={
                  index === velocityCompanyIndex
                    ? {
                        borderColor: company.accent,
                        background: company.accentSoft,
                        color: company.accent,
                      }
                    : { borderColor: "rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.045)" }
                }
              >
                {company.name}
              </button>
            ))}
          </div>
        </div>
        <VelocityChart key={velocityCompanyIndex} companyIndex={velocityCompanyIndex} />
      </div>
    </SlideFrame>
  );
}

const BrainIcon = () => (
  <svg className="w-8 h-8 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 4c-1.5 0-3 .5-4 1.5C6.5 6.7 6 8.2 6 9.5c0 1.2.4 2.3 1.2 3.2C6.4 13.6 6 14.8 6 16c0 1.5.8 3 2 3.8.8.5 1.8.7 2.8.5.6 1.1 1.8 1.7 3.2 1.7s2.6-.6 3.2-1.7c1 .2 2 0 2.8-.5 1.2-.8 2-2.3 2-3.8 0-1.2-.4-2.4-1.2-3.3.8-.9 1.2-2 1.2-3.2 0-1.3-.5-2.8-2-4C15 4.5 13.5 4 12 4z" />
    <path d="M12 4v18" opacity="0.3" />
    <path d="M12 9c1.5-1 3.5-1 4.5 0M12 13c1.5-1 3.5-1 4.5 0M12 17c1.5-1 3.5-1 4.5 0" />
    <path d="M12 9c-1.5-1-3.5-1-4.5 0M12 13c-1.5-1-3.5-1-4.5 0M12 17c-1.5-1-3.5-1-4.5 0" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-5 h-5 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ChipIcon = () => (
  <svg className="w-8 h-8 text-fuchsia-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 15h3M1 9h3M1 15h3" />
  </svg>
);

const BulletIcon = ({ color }: { color: string }) => (
  <svg className={`w-3.5 h-3.5 shrink-0 mt-1 ${color}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface Slide6ParadoxProps {
  isAlphaZeroRevealed?: boolean;
  onRevealAlphaZero?: () => void;
}

export function Slide6Paradox({ isAlphaZeroRevealed = false, onRevealAlphaZero }: Slide6ParadoxProps = {}) {
  const outerRadius = 105;
  const outerNodes = Array.from({ length: 8 }).map((_, i) => {
    const angle = (i * Math.PI * 2) / 8;
    const x = Math.cos(angle) * outerRadius;
    const y = Math.sin(angle) * outerRadius;
    return { x, y, angle, id: i };
  });

  const orbits = [
    { radius: 48, speed: 5, clockwise: true, color: "border-fuchsia-500/20" },
    { radius: 78, speed: 9, clockwise: false, color: "border-purple-500/20" },
    { radius: 108, speed: 14, clockwise: true, color: "border-pink-500/25" },
    { radius: 138, speed: 19, clockwise: false, color: "border-fuchsia-400/15" },
  ];

  const cardShell =
    "flex h-full min-h-0 flex-col rounded-[2rem] border p-4 shadow-2xl backdrop-blur-md";
  const visualShell =
    "relative my-2 flex min-h-[min(42vh,360px)] flex-1 w-full items-center justify-center overflow-hidden rounded-2xl";
  const bulletList = "shrink-0 space-y-2.5";
  const bulletText =
    "text-xl md:text-2xl font-display font-semibold text-white tracking-tight leading-tight";

  return (
    <SlideFrame>
      <div className="flex h-full min-h-0 flex-col gap-5">
        <h2 className="shrink-0 text-[3.2rem] font-display font-semibold leading-none tracking-[-0.075em]">
          De datos humanos al autojuego.
        </h2>

        <div className="grid min-h-0 flex-1 grid-cols-2 gap-8">
          {/* AlphaGo */}
          <div className={`${cardShell} border-white/10 bg-[#0e1217]/50`}>
            <h3 className="shrink-0 text-3xl font-display font-bold text-white tracking-tight">AlphaGo</h3>

            <div className={`${visualShell} border border-white/5 bg-slate-950/40`}>
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] opacity-60 pointer-events-none" />

              <div className="absolute inset-[6%] border border-dashed border-cyan-500/15 rounded-xl pointer-events-none" />

              <svg className="absolute inset-0 h-full w-full pointer-events-none" viewBox="0 0 400 400" fill="none">
                <g transform="translate(200, 200)">
                  {outerNodes.map((node) => (
                    <line
                      key={node.id}
                      x1={0}
                      y1={0}
                      x2={node.x}
                      y2={node.y}
                      stroke="rgba(34,211,238,0.15)"
                      strokeWidth="1.2"
                      strokeDasharray="3 3"
                    />
                  ))}
                </g>
              </svg>

              <motion.div
                className="absolute z-10 flex h-16 w-16 items-center justify-center rounded-full border border-cyan-500/40 bg-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.3)]"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ left: "50%", top: "50%", marginLeft: -32, marginTop: -32 }}
              >
                <BrainIcon />
              </motion.div>

              {outerNodes.map((node) => (
                <div
                  key={node.id}
                  className="absolute z-10 flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/25 bg-slate-950 shadow-[0_0_10px_rgba(34,211,238,0.1)]"
                  style={{
                    left: "50%",
                    top: "50%",
                    marginLeft: -20,
                    marginTop: -20,
                    transform: `translate(${node.x}px, ${node.y}px)`,
                  }}
                >
                  <UserIcon />
                </div>
              ))}

              {outerNodes.map((node) => (
                <motion.div
                  key={`packet-${node.id}`}
                  className="absolute z-20 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                  style={{ left: "50%", top: "50%", marginLeft: -5, marginTop: -5 }}
                  initial={{ x: node.x, y: node.y, opacity: 0 }}
                  animate={{ x: [node.x, 0], y: [node.y, 0], opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: node.id * 0.28,
                  }}
                />
              ))}
            </div>

            <ul className={bulletList}>
              <li className="flex items-center gap-3">
                <BulletIcon color="text-cyan-400" />
                <span className={bulletText}>30 Millones de Jugadas</span>
              </li>
              <li className="flex items-center gap-3">
                <BulletIcon color="text-cyan-400" />
                <span className={bulletText}>Aprendizaje Supervisado</span>
              </li>
              <li className="flex items-center gap-3">
                <BulletIcon color="text-cyan-400" />
                <span className={bulletText}>Meses de Entrenamiento</span>
              </li>
            </ul>
          </div>

          {/* AlphaZero — black until reveal */}
          {!isAlphaZeroRevealed ? (
            <button
              type="button"
              onClick={onRevealAlphaZero}
              className="h-full min-h-0 rounded-[2rem] bg-[#070908] cursor-pointer border-0 p-0"
              aria-label="Revelar AlphaZero"
            />
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className={`${cardShell} border-fuchsia-500/20 bg-[#181122]/50 shadow-[0_0_50px_rgba(217,70,239,0.05)]`}
            >
              <h3 className="shrink-0 text-3xl font-display font-bold text-white tracking-tight">AlphaZero</h3>

              <div className={`${visualShell} border border-fuchsia-500/10 bg-[#0d0717]/60`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(217,70,239,0.06),transparent_65%)] pointer-events-none" />

                <motion.div
                  className="absolute z-10 flex h-16 w-16 items-center justify-center rounded-full border border-fuchsia-500/40 bg-slate-950 shadow-[0_0_24px_rgba(217,70,239,0.3)]"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ left: "50%", top: "50%", marginLeft: -32, marginTop: -32 }}
                >
                  <ChipIcon />
                </motion.div>

                {orbits.map((orbit, index) => (
                  <motion.div
                    key={index}
                    className={`absolute rounded-full border border-dashed ${orbit.color} pointer-events-none`}
                    style={{
                      width: orbit.radius * 2,
                      height: orbit.radius * 2,
                      left: "50%",
                      top: "50%",
                      marginLeft: -orbit.radius,
                      marginTop: -orbit.radius,
                    }}
                    animate={{ rotate: orbit.clockwise ? 360 : -360 }}
                    transition={{ duration: orbit.speed, repeat: Infinity, ease: "linear" }}
                  >
                    <div
                      className="absolute h-3 w-3 rounded-full border border-white/20 bg-fuchsia-500 shadow-[0_0_14px_rgba(217,70,239,0.85)]"
                      style={{ top: -6, left: orbit.radius - 6 }}
                    />
                  </motion.div>
                ))}
              </div>

              <ul className={bulletList}>
                <li className="flex items-center gap-3">
                  <BulletIcon color="text-fuchsia-400" />
                  <span className={bulletText}>Cero Datos Humanos</span>
                </li>
                <li className="flex items-center gap-3">
                  <BulletIcon color="text-fuchsia-400" />
                  <span className={bulletText}>Millones de Partidas Propias</span>
                </li>
                <li className="flex items-center gap-3">
                  <BulletIcon color="text-fuchsia-400" />
                  <span className={bulletText}>3 Días de Entrenamiento</span>
                </li>
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </SlideFrame>
  );
}

interface StackTransitionSlideProps {
  isFalsoStackTitleRevealed?: boolean;
  isStackTransitioning?: boolean;
}

const STACK_TITLE_EASE = [0.16, 1, 0.3, 1] as const;

export function Slide7Trap({
  isFalsoStackTitleRevealed = false,
  isStackTransitioning = false,
}: StackTransitionSlideProps = {}) {
  const [markerActive, setMarkerActive] = useState(false);

  useEffect(() => {
    if (!isFalsoStackTitleRevealed) {
      setMarkerActive(false);
      return;
    }

    const markerTimer = window.setTimeout(() => setMarkerActive(true), 1050);

    return () => {
      window.clearTimeout(markerTimer);
    };
  }, [isFalsoStackTitleRevealed]);

  type LogoCloudItem = {
    Icon: ComponentType<SVGProps<SVGSVGElement>>;
    label: string;
    positionClassName: string;
    rotateClassName: string;
    iconClassName?: string;
    tileClassName?: string;
    floatDuration: string;
    floatDelay: string;
    floatVariant?: "default" | "alt";
    appearIndex: number;
  };

  const logos: LogoCloudItem[] = [
    { Icon: OpenaiDark, label: "OpenAI", positionClassName: "left-[10%] top-[10%]", rotateClassName: "-rotate-12", iconClassName: "h-20 w-20", tileClassName: "p-7", floatDuration: "7.5s", floatDelay: "0s", appearIndex: 0 },
    { Icon: AnthropicWhite, label: "Anthropic", positionClassName: "left-[42%] top-[2%]", rotateClassName: "rotate-2", iconClassName: "h-20 w-20", tileClassName: "p-7", floatDuration: "8.5s", floatDelay: "-1.2s", floatVariant: "alt", appearIndex: 4 },
    { Icon: ClaudeAiIcon, label: "Claude", positionClassName: "left-[36%] bottom-[18%]", rotateClassName: "-rotate-3", iconClassName: "h-20 w-20", tileClassName: "p-7", floatDuration: "8.8s", floatDelay: "-2.8s", appearIndex: 8 },
    { Icon: Gemini, label: "Gemini", positionClassName: "right-[8%] top-[8%]", rotateClassName: "rotate-12", iconClassName: "h-20 w-20", tileClassName: "p-7", floatDuration: "9s", floatDelay: "-2.4s", appearIndex: 1 },
    { Icon: MicrosoftCopilot, label: "Copilot", positionClassName: "right-[16%] top-[24%]", rotateClassName: "rotate-3", iconClassName: "h-16 w-16", tileClassName: "p-6", floatDuration: "9.2s", floatDelay: "-4s", appearIndex: 9 },
    { Icon: Meta, label: "Meta", positionClassName: "left-[2%] top-[42%]", rotateClassName: "-rotate-6", iconClassName: "h-16 w-16", tileClassName: "p-6", floatDuration: "8s", floatDelay: "-3.1s", appearIndex: 2 },
    { Icon: HuggingFace, label: "Hugging Face", positionClassName: "right-[2%] top-[40%]", rotateClassName: "rotate-6", iconClassName: "h-16 w-16", tileClassName: "p-6", floatDuration: "7.8s", floatDelay: "-1.7s", floatVariant: "alt", appearIndex: 6 },
    { Icon: MistralAiLogo, label: "Mistral", positionClassName: "left-[6%] bottom-[12%]", rotateClassName: "rotate-6", iconClassName: "h-12 w-12", tileClassName: "p-5", floatDuration: "7.2s", floatDelay: "-2.1s", floatVariant: "alt", appearIndex: 7 },
    { Icon: Deepseek, label: "DeepSeek", positionClassName: "left-[24%] bottom-[4%]", rotateClassName: "-rotate-3", iconClassName: "h-12 w-12", tileClassName: "p-5", floatDuration: "8.2s", floatDelay: "-0.5s", appearIndex: 10 },
    { Icon: Perplexity, label: "Perplexity", positionClassName: "right-[6%] bottom-[12%]", rotateClassName: "-rotate-12", iconClassName: "h-12 w-12", tileClassName: "p-5", floatDuration: "8.8s", floatDelay: "-1.4s", appearIndex: 5 },
    { Icon: XaiDark, label: "xAI", positionClassName: "left-[22%] top-[20%]", rotateClassName: "-rotate-6", iconClassName: "h-9 w-9", tileClassName: "p-4", floatDuration: "7s", floatDelay: "-0.8s", floatVariant: "alt", appearIndex: 3 },
    { Icon: Cohere, label: "Cohere", positionClassName: "right-[26%] bottom-[4%]", rotateClassName: "rotate-12", iconClassName: "h-9 w-9", tileClassName: "p-4", floatDuration: "7.6s", floatDelay: "-3.6s", floatVariant: "alt", appearIndex: 11 },
  ];

  const titleWordTransition = {
    duration: 1.05,
    ease: STACK_TITLE_EASE,
  } as const;

  return (
    <SlideFrame atmosphere="flat" fullBleed>
      <div className="relative h-full min-h-0 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[#070908]" />

        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: STACK_TITLE_EASE }}
        >
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.75, ease: STACK_TITLE_EASE }}
          >
            <Image
              src="/assets/falsostack.png"
              alt=""
              fill
              priority
              quality={100}
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <Image
            src={HUMAN_SKILL_IMAGES.verdaderoStack.src}
            alt=""
            fill
            priority
            quality={100}
            sizes="100vw"
            className={`object-cover object-center transition-opacity duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isStackTransitioning ? "opacity-100" : "opacity-0"
            }`}
          />
          <div
            className={`absolute inset-0 transition-colors duration-[900ms] ${
              isStackTransitioning ? "bg-[#070908]/40" : "bg-[#070908]/30"
            }`}
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(247,248,243,0.055)_1px,transparent_1px),linear-gradient(90deg,rgba(247,248,243,0.055)_1px,transparent_1px)] bg-[size:96px_96px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(7,9,8,0.55)_100%)]" />
        </motion.div>

        <div className="relative z-10 flex h-full min-h-0 flex-col items-center justify-center px-14 py-10">
          <div
            className={`absolute inset-0 select-none transition-all duration-[700ms] ease-out ${
              isStackTransitioning ? "scale-95 opacity-0 blur-sm" : "scale-100 opacity-100 blur-0"
            }`}
          >
            {logos.map(({ Icon, label, positionClassName, rotateClassName, iconClassName = "h-12 w-12", tileClassName = "p-5", floatDuration, floatDelay, floatVariant = "default", appearIndex }) => (
              <motion.div
                key={label}
                className={`absolute ${positionClassName}`}
                initial={{ opacity: 0, scale: 0.82, filter: "blur(8px)" }}
                animate={
                  isStackTransitioning
                    ? { opacity: 0, scale: 0.92, filter: "blur(6px)" }
                    : { opacity: 1, scale: 1, filter: "blur(0px)" }
                }
                transition={{
                  duration: 1.2,
                  delay: isStackTransitioning ? 0 : 0.7 + appearIndex * 0.28,
                  ease: STACK_TITLE_EASE,
                }}
              >
                <div
                  className={floatVariant === "alt" ? "animate-logo-float-alt" : "animate-logo-float"}
                  style={
                    {
                      "--float-duration": floatDuration,
                      "--float-delay": floatDelay,
                    } as CSSProperties
                  }
                >
                  <div
                    className={`flex items-center justify-center rounded-2xl border border-white/12 bg-[#070908]/45 shadow-[0_12px_45px_rgba(0,0,0,0.32)] backdrop-blur-lg transition-colors duration-300 hover:border-[#00b86b]/40 hover:bg-[#070908]/60 hover:shadow-[0_20px_50px_rgba(0,184,107,0.18)] ${tileClassName} ${rotateClassName}`}
                  >
                    <Icon aria-label={label} className={`block shrink-0 ${iconClassName}`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {isFalsoStackTitleRevealed ? (
            <div className="relative z-10 flex items-center justify-center px-8">
              <h2 className="flex items-baseline gap-[0.18em] text-[8.5rem] font-display font-semibold leading-[0.9] tracking-[-0.075em] text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.65)]">
                <motion.span
                  initial={{ opacity: 0, y: 28, filter: "blur(14px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ ...titleWordTransition, delay: 0.08 }}
                >
                  El
                </motion.span>
                <span
                  className="relative inline-flex justify-center overflow-hidden whitespace-nowrap transition-[width] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ width: isStackTransitioning ? "4.75em" : "2.45em" }}
                >
                  <StackTitleMarker active={markerActive} />
                  {isStackTransitioning ? (
                    <RotatingText
                      texts={["verdadero"]}
                      auto={false}
                      loop={false}
                      splitBy="characters"
                      staggerDuration={0.014}
                      staggerFrom="center"
                      mainClassName="relative inline-flex justify-center overflow-hidden"
                      splitLevelClassName="inline-flex"
                      elementLevelClassName="will-change-transform"
                      transition={{ type: "spring", damping: 28, stiffness: 320, mass: 0.45 }}
                      initial={{ y: "78%", opacity: 0, filter: "blur(8px)" }}
                      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                      exit={{ y: "-78%", opacity: 0, filter: "blur(8px)" }}
                    />
                  ) : (
                    <motion.span
                      className="relative"
                      initial={{ opacity: 0, y: 28, filter: "blur(14px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ ...titleWordTransition, delay: 0.28 }}
                    >
                      falso
                    </motion.span>
                  )}
                </span>
                <motion.span
                  initial={{ opacity: 0, y: 28, filter: "blur(14px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ ...titleWordTransition, delay: 0.48 }}
                >
                  stack
                </motion.span>
              </h2>
            </div>
          ) : null}
        </div>
      </div>
    </SlideFrame>
  );
}

export function Slide8Pivot() {
  const [showHabilidades, setShowHabilidades] = useState(false);

  useEffect(() => {
    const habilidadesTimer = window.setTimeout(() => setShowHabilidades(true), 80);

    return () => {
      window.clearTimeout(habilidadesTimer);
    };
  }, []);

  return (
    <SlideFrame atmosphere="flat" fullBleed>
      <div className="relative h-full min-h-0">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[#070908]" />
          <Image
            src={HUMAN_SKILL_IMAGES.verdaderoStack.src}
            alt=""
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#070908]/40" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(247,248,243,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(247,248,243,0.04)_1px,transparent_1px)] bg-[size:96px_96px]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_22%,rgba(7,9,8,0.62)_100%)]" />
        </div>

        <div className="relative z-10 flex h-full min-h-0 flex-col items-center justify-center px-14 py-10">
          <div className="flex flex-col items-center text-center">
            <h2 className="flex items-baseline gap-[0.18em] text-[8.5rem] font-display font-semibold leading-[0.9] tracking-[-0.075em] text-white drop-shadow-[0_8px_32px_rgba(0,0,0,0.65)]">
              <span>El</span>
              <span className="relative inline-flex w-[4.75em] justify-center whitespace-nowrap">
                <StackTitleMarker animate={false} />
                <span className="relative">verdadero</span>
              </span>
              <span>stack</span>
            </h2>

            <div
              className={`grid transition-[grid-template-rows,margin-top,opacity,transform,filter] duration-[950ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[grid-template-rows,transform,opacity] ${
                showHabilidades ? "mt-10 translate-y-0 opacity-100 blur-0" : "mt-0 translate-y-4 opacity-0 blur-sm"
              }`}
              style={{ gridTemplateRows: showHabilidades ? "1fr" : "0fr" }}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="whitespace-nowrap font-mono text-[2.35rem] font-bold uppercase leading-none text-[#00b86b] drop-shadow-[0_6px_24px_rgba(0,0,0,0.55)]">
                  habilidades humanas
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

export function Slide9Curiosity() {
  return (
    <SlideFrame tone="warm" atmosphere="flat" fullBleed>
      <div className="relative h-full w-full overflow-hidden select-none">
        {/* Immersive Background Image */}
        <div className="absolute inset-0">
          <Image
            src={HUMAN_SKILL_IMAGES.curiosity.src}
            alt={HUMAN_SKILL_IMAGES.curiosity.alt}
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-center transition-transform duration-[10000ms] scale-102 hover:scale-100 ease-out"
          />
          {/* Technical Grid Dots matching builder aesthetic */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Content container */}
        <div className="relative z-10 flex h-full w-full flex-col justify-between p-16">
          {/* Top Metadata */}
          <div className="flex justify-between items-start animate-subtitle-fade-in">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/60 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
              01 / El Stack Humano
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00b86b] font-bold bg-[#00b86b]/10 border border-[#00b86b]/20 px-4 py-2 rounded-full backdrop-blur-md">
              Habilidades
            </span>
          </div>

          {/* Bottom Headline - Massive, Elegant Display Typography */}
          <div className="relative space-y-3">
            <div className="relative z-10 space-y-3">
              <span 
                className="font-mono text-2xl font-bold uppercase tracking-[0.3em] text-[#00b86b] block animate-subtitle-fade-in"
                style={{ animationDelay: "200ms" }}
              >
                Pilar 01
              </span>
              <h2 
                className="text-[11rem] font-display font-semibold leading-[0.85] tracking-[-0.075em] text-white animate-word-reveal-curiosity"
                style={{ animationDelay: "450ms" }}
              >
                Curiosidad
              </h2>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

export function Slide10Initiative() {
  return (
    <SlideFrame tone="warm" atmosphere="flat" fullBleed>
      <div className="relative h-full w-full overflow-hidden select-none">
        {/* Immersive Background Image */}
        <div className="absolute inset-0">
          <Image
            src={HUMAN_SKILL_IMAGES.initiative.src}
            alt={HUMAN_SKILL_IMAGES.initiative.alt}
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-center transition-transform duration-[10000ms] scale-102 hover:scale-100 ease-out"
          />
          {/* Technical Grid Dots matching builder aesthetic */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Content container */}
        <div className="relative z-10 flex h-full w-full flex-col justify-between p-16">
          {/* Top Metadata */}
          <div className="flex justify-between items-start animate-subtitle-fade-in">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/60 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
              02 / El Stack Humano
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00b86b] font-bold bg-[#00b86b]/10 border border-[#00b86b]/20 px-4 py-2 rounded-full backdrop-blur-md">
              Habilidades
            </span>
          </div>

          {/* Bottom Headline - Massive, Elegant Display Typography */}
          <div className="relative space-y-3">
            <div className="relative z-10 space-y-3">
              <span 
                className="font-mono text-2xl font-bold uppercase tracking-[0.3em] text-[#00b86b] block animate-subtitle-fade-in"
                style={{ animationDelay: "200ms" }}
              >
                Pilar 02
              </span>
              <h2 
                className="text-[11rem] font-display font-semibold leading-[0.85] tracking-[-0.075em] text-white animate-word-reveal-initiative"
                style={{ animationDelay: "450ms" }}
              >
                Iniciativa
              </h2>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

export function Slide11Optimism() {
  return (
    <SlideFrame tone="warm" atmosphere="flat" fullBleed>
      <div className="relative h-full w-full overflow-hidden select-none">
        {/* Immersive Background Image */}
        <div className="absolute inset-0">
          <Image
            src={HUMAN_SKILL_IMAGES.optimism.src}
            alt={HUMAN_SKILL_IMAGES.optimism.alt}
            fill
            priority
            quality={100}
            sizes="100vw"
            className="object-cover object-center transition-transform duration-[10000ms] scale-102 hover:scale-100 ease-out"
          />
          {/* Technical Grid Dots matching builder aesthetic */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.12) 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        {/* Content container */}
        <div className="relative z-10 flex h-full w-full flex-col justify-between p-16">
          {/* Top Metadata */}
          <div className="flex justify-between items-start animate-subtitle-fade-in">
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-white/60 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
              03 / El Stack Humano
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00b86b] font-bold bg-[#00b86b]/10 border border-[#00b86b]/20 px-4 py-2 rounded-full backdrop-blur-md">
              Habilidades
            </span>
          </div>

          {/* Bottom Headline - Massive, Elegant Display Typography */}
          <div className="relative space-y-3">
            <div className="relative z-10 space-y-3">
              <span 
                className="font-mono text-2xl font-bold uppercase tracking-[0.3em] text-[#00b86b] block animate-subtitle-fade-in"
                style={{ animationDelay: "200ms" }}
              >
                Pilar 03
              </span>
              <h2 
                className="text-[11rem] font-display font-semibold leading-[0.85] tracking-[-0.075em] text-white animate-word-reveal-optimism"
                style={{ animationDelay: "450ms" }}
              >
                Optimismo
              </h2>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

export function Slide12Synthesis({
  isSynthesisSubtextVisible = false,
  onRevealSynthesisSubtext,
}: {
  isSynthesisSubtextVisible?: boolean;
  onRevealSynthesisSubtext?: () => void;
}) {
  return (
    <SlideFrame tone="bridge">
      <div
        className="flex h-full min-h-0 cursor-pointer items-center justify-center text-center"
        onClick={onRevealSynthesisSubtext}
      >
        <div
          className={`mx-auto flex max-w-[92rem] flex-col items-center transition-[gap] duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isSynthesisSubtextVisible ? "gap-12" : "gap-0"
          }`}
        >
          <h2
            className={`text-[8.8rem] font-display font-semibold leading-[0.88] tracking-[-0.085em] transition-transform duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isSynthesisSubtextVisible ? "-translate-y-2" : "translate-y-0"
            }`}
          >
            La IA no viene a{" "}
            <span className="relative inline-flex whitespace-nowrap">
              <StackTitleMarker animate={false} />
              <span className="relative">reemplazarte</span>
            </span>.
          </h2>
          <div
            className={`grid transition-[grid-template-rows,opacity,transform,filter] duration-[850ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isSynthesisSubtextVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-5 opacity-0 blur-sm"
            }`}
            style={{ gridTemplateRows: isSynthesisSubtextVisible ? "1fr" : "0fr" }}
          >
            <div className="min-h-0 overflow-hidden">
              <p className="mx-auto max-w-6xl text-[3.35rem] leading-[1.08] tracking-[-0.035em] text-[#29352f]">
                Viene a{" "}
                <span className="relative inline-flex whitespace-nowrap font-semibold text-[#0a0f0c]">
                  <StackTitleMarker animate={false} />
                  <span className="relative">preguntarte</span>
                </span>{" "}
                quién vas a ser cuando ya no tengas que hacer el trabajo aburrido.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

export function Slide13Outro({
  isOutroCollapsed = false,
}: {
  isOutroCollapsed?: boolean;
}) {
  return (
    <SlideFrame tone="dark" atmosphere="animated">
      <div className="relative h-full w-full min-h-0">
        <AnimatePresence mode="wait">
          {!isOutroCollapsed ? (
            <motion.div
              key="outro-text"
              initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ 
                opacity: 0, 
                scale: 0.82, 
                filter: "blur(16px)",
                transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } 
              }}
              className="absolute inset-0 flex h-full min-h-0 items-center justify-center text-center"
            >
              <div className="mx-auto max-w-[94rem] px-6">
                <h2 className="animate-subtitle-fade-in text-[6.9rem] font-display font-semibold leading-[0.98] tracking-[-0.075em] text-[#f7f8f3]">
                  Alguien con una{" "}
                  <span className="relative inline-flex whitespace-nowrap">
                    <StackTitleMarker delay="1900ms" />
                    <span className="relative">curiosidad</span>
                  </span>{" "}
                  insaciable, una{" "}
                  <span className="relative inline-flex whitespace-nowrap">
                    <StackTitleMarker delay="3900ms" />
                    <span className="relative">iniciativa</span>
                  </span>{" "}
                  absoluta y sobre todo un{" "}
                  <span className="relative inline-flex whitespace-nowrap">
                    <StackTitleMarker delay="6900ms" />
                    <span className="relative">optimismo</span>
                  </span>{" "}
                  radical.
                </h2>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="closing-credits"
              initial={{ opacity: 0, scale: 0.85, filter: "blur(16px)" }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                filter: "blur(0px)",
                transition: { 
                  duration: 0.85, 
                  ease: [0.16, 1, 0.3, 1]
                } 
              }}
              className="absolute inset-0 flex h-full min-h-0 flex-col items-center justify-between text-center px-14 py-16"
            >
              {/* Top: ¡Gracias! */}
              <motion.h2 
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="text-[5.5rem] font-display font-semibold leading-none tracking-[-0.065em] text-[#f7f8f3]"
              >
                ¡Gracias!
              </motion.h2>

              {/* Center: Collective Logo */}
              <div className="flex min-h-0 flex-1 items-center justify-center px-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 0.95, scale: 1 }}
                  transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full max-w-[38rem]"
                >
                  <Image
                    src="/assets/collective-logo-white.png"
                    alt="Collective"
                    width={1155}
                    height={186}
                    priority
                    className="h-auto w-full object-contain"
                  />
                </motion.div>
              </div>

              {/* Bottom: Name & Website */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center gap-3"
              >
                <p className="font-mono text-[1.875rem] font-bold uppercase tracking-[0.22em] text-white">
                  Javier Rivero
                </p>
                <a
                  href="http://javierivero.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[1.5rem] font-medium tracking-[0.18em] text-[#00b86b] transition-colors duration-300 hover:text-[#00ff87]"
                  data-no-advance
                >
                  http://javierivero.com
                </a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SlideFrame>
  );
}
