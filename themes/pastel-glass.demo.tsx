import React from 'react';
import { type Page, useSlidePageNumber } from '@open-slide/core';

// ─── Font & Animation Styles Injection ───────────────────────────────────────
const FontStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap');

    @keyframes pg-float-1 {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }

    @keyframes pg-float-2 {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-12px); }
    }

    @keyframes pg-float-3 {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }

    @keyframes pg-entrance {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .pg-animate-float-1 {
      animation: pg-float-1 8s ease-in-out infinite;
    }
    .pg-animate-float-2 {
      animation: pg-float-2 10s ease-in-out infinite;
    }
    .pg-animate-float-3 {
      animation: pg-float-3 7s ease-in-out infinite;
    }
    .pg-animate-entrance {
      animation: pg-entrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `}</style>
);

// ─── Theme Design System ─────────────────────────────────────────────────────
export const design = {
  palette: {
    bg: '#f7f8fa',
    text: '#181b1f',
    accent: '#7170ff',
  },
  fonts: {
    display: '"Instrument Serif", "Georgia", serif',
    body: '"Inter", -apple-system, sans-serif',
  },
  typeScale: {
    hero: 104,
    body: 22,
  },
  radius: 24,
};

// ─── Fixed Theme Components ──────────────────────────────────────────────────
const Title = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <h1
    style={{
      fontFamily: design.fonts.display,
      fontSize: design.typeScale.hero,
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: '-0.025em',
      color: design.palette.text,
      margin: '0 0 24px 0',
      ...style,
    }}
  >
    {children}
  </h1>
);

const Eyebrow = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div
    style={{
      fontFamily: design.fonts.body,
      fontSize: 15,
      fontWeight: 700,
      letterSpacing: '0.12em',
      color: design.palette.accent,
      textTransform: 'uppercase',
      marginBottom: 20,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      ...style,
    }}
  >
    <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: 'currentColor' }} />
    {children}
  </div>
);

const Footer = ({ accentColor = '#7170ff' }: { accentColor?: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 100,
        right: 100,
        bottom: 50,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: design.fonts.body,
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: '0.08em',
        color: '#68717a',
        textTransform: 'uppercase',
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
        paddingTop: 20,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <span style={{ color: accentColor }}>CONDUIT</span>
        <span style={{ opacity: 0.2 }}>|</span>
        <span>MEGAKEYNOTE 2026</span>
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <span>{String(current || 1).padStart(2, '0')}</span>
        <div style={{ width: 40, height: 2, background: 'rgba(0,0,0,0.08)', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: `${((current || 1) / (total || 3)) * 100}%`,
              background: accentColor,
              transition: 'width 0.3s ease',
            }}
          />
        </div>
        <span style={{ opacity: 0.5 }}>{String(total || 3).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

const GlassCard = ({ children, style, className }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) => (
  <div
    className={className}
    style={{
      background: 'rgba(255, 255, 255, 0.65)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      borderRadius: design.radius,
      padding: '40px 32px',
      boxShadow: '0 12px 40px -10px rgba(0, 0, 0, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.01)',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      ...style,
    }}
  >
    {children}
  </div>
);

const PastelBackground = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div
    style={{
      width: 1920,
      height: 1080,
      position: 'relative',
      background: '#f7f8fa',
      backgroundImage: `
        radial-gradient(at 10% 20%, #ffe3db 0px, transparent 45%),
        radial-gradient(at 90% 10%, #e1f0ff 0px, transparent 45%),
        radial-gradient(at 50% 80%, #e8e3ff 0px, transparent 45%),
        radial-gradient(at 80% 90%, #fff4d4 0px, transparent 40%),
        radial-gradient(at 20% 80%, #defaf2 0px, transparent 40%)
      `,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      boxSizing: 'border-box',
      ...style,
    }}
  >
    <FontStyles />
    {/* Fine Dot Grid Overlay */}
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 0)',
        backgroundSize: '32px 32px',
        pointerEvents: 'none',
      }}
    />
    {children}
  </div>
);

// ─── Slide 1: Cover ──────────────────────────────────────────────────────────
const Cover: Page = () => (
  <PastelBackground>
    <div style={{ width: '100%', height: '100%', padding: '100px 100px 120px 100px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box', position: 'relative' }} className="pg-animate-entrance">
      <Eyebrow>01 / CORE VISION</Eyebrow>
      <Title style={{ maxWidth: 1200, fontSize: 110, marginBottom: 24 }}>
        Handle customer service <br />
        <span style={{ fontStyle: 'italic', fontWeight: 300 }}>end-to-end</span>.
      </Title>
      <p style={{ fontFamily: design.fonts.body, fontSize: 26, color: '#4a5157', maxWidth: 900, margin: '0 0 48px 0', lineHeight: 1.5, fontWeight: 400 }}>
        Deploy autonomous AI agents that resolve complex inquiries, follow policy guidelines flawlessly, and coordinate backend systems natively.
      </p>
      <div style={{ display: 'flex' }}>
        <button
          style={{
            background: '#181b1f',
            color: '#ffffff',
            border: 'none',
            borderRadius: 12,
            padding: '18px 32px',
            fontFamily: design.fonts.body,
            fontSize: 18,
            fontWeight: 600,
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            transition: 'transform 0.2s ease',
          }}
        >
          <span>Get started</span>
          <span style={{ fontSize: 16 }}>↗</span>
        </button>
      </div>
      <Footer />
    </div>
  </PastelBackground>
);

// ─── Slide 2: Features Grid ──────────────────────────────────────────────────
const Features: Page = () => (
  <PastelBackground>
    <div style={{ width: '100%', height: '100%', padding: '80px 100px 120px 100px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 48 }}>
        <div>
          <Eyebrow>02 / ARCHITECTURE</Eyebrow>
          <Title style={{ fontSize: 72, margin: 0 }}>Built for enterprise trust.</Title>
        </div>
        <p style={{ fontFamily: design.fonts.body, fontSize: 18, color: '#68717a', maxWidth: 500, margin: '12px 0 0 0', lineHeight: 1.5 }}>
          Our platform couples precise natural language understanding with strict visual safety layers to deploy bulletproof AI.
        </p>
      </div>

      {/* 3-Column Glassmorphic Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 32, flex: 1, maxHeight: 540 }}>
        
        {/* Card 1: Policy Compliant */}
        <GlassCard className="pg-animate-float-1">
          <div style={{ marginBottom: 'auto' }}>
            <h3 style={{ fontFamily: design.fonts.body, fontSize: 24, fontWeight: 600, margin: '0 0 12px 0', color: design.palette.text }}>Policy Compliant</h3>
            <p style={{ fontFamily: design.fonts.body, fontSize: 16, color: '#555c63', margin: 0, lineHeight: 1.4 }}>
              Ensure your AI reliably follows multi-step SOPs and protects sensitive customer information.
            </p>
          </div>
          {/* Card 1 Asset: Nice Mini Graph */}
          <div style={{ height: 180, background: 'rgba(255, 255, 255, 0.5)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.6)', padding: 16, display: 'flex', flexDirection: 'column', boxSizing: 'border-box', marginTop: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontFamily: design.fonts.body, fontSize: 12, color: '#889196', fontWeight: 600 }}>Automation Rate</span>
              <span style={{ fontFamily: design.fonts.body, fontSize: 16, color: design.palette.accent, fontWeight: 700 }}>34% (+8%)</span>
            </div>
            <div style={{ flex: 1, position: 'relative', display: 'flex', alignItems: 'flex-end' }}>
              <svg style={{ width: '100%', height: '100%' }} viewBox="0 0 100 50" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7170ff" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#7170ff" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path d="M0,45 C20,40 30,20 50,30 C70,40 80,10 100,5" fill="none" stroke="#7170ff" strokeWidth="2.5" strokeLinecap="round" />
                <path d="M0,45 C20,40 30,20 50,30 C70,40 80,10 100,5 L100,50 L0,50 Z" fill="url(#chartGrad)" />
              </svg>
            </div>
          </div>
        </GlassCard>

        {/* Card 2: Custom Tools */}
        <GlassCard className="pg-animate-float-2">
          <div style={{ marginBottom: 'auto' }}>
            <h3 style={{ fontFamily: design.fonts.body, fontSize: 24, fontWeight: 600, margin: '0 0 12px 0', color: design.palette.text }}>Custom Tools</h3>
            <p style={{ fontFamily: design.fonts.body, fontSize: 16, color: '#555c63', margin: 0, lineHeight: 1.4 }}>
              Give your AI tools to securely handle tasks and retrieve customer data from external systems.
            </p>
          </div>
          {/* Card 2 Asset: Styled API Window Shell */}
          <div style={{ background: '#181b1f', borderRadius: 16, padding: '16px 20px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', marginTop: 24, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
            <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5f56' }} />
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ffbd2e' }} />
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#27c93f' }} />
              <span style={{ fontFamily: 'monospace', fontSize: 10, color: '#68717a', marginLeft: 8 }}>conduit ~ api</span>
            </div>
            <pre style={{ margin: 0, fontFamily: '"JetBrains Mono", monospace', fontSize: 11, color: '#a5b4fc', overflow: 'hidden', lineHeight: 1.5 }}>
              <span style={{ color: '#38bdf8' }}>$</span> curl -X POST api.conduit.ai/agent \<br />
              &nbsp;&nbsp;-H <span style={{ color: '#34d399' }}>"Bearer $API_KEY"</span> \<br />
              &nbsp;&nbsp;-d <span style={{ color: '#fb7185' }}>'{"ticket": 42}'</span>
            </pre>
          </div>
        </GlassCard>

        {/* Card 3: Multilingual Safety */}
        <GlassCard className="pg-animate-float-3">
          <div style={{ marginBottom: 'auto' }}>
            <h3 style={{ fontFamily: design.fonts.body, fontSize: 24, fontWeight: 600, margin: '0 0 12px 0', color: design.palette.text }}>Stress Testing</h3>
            <p style={{ fontFamily: design.fonts.body, fontSize: 16, color: '#555c63', margin: 0, lineHeight: 1.4 }}>
              Simulate high-concurrency multilingual conversations before going live in production.
            </p>
          </div>
          {/* Card 3 Asset: Elegant chat bubble container */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 24 }}>
            <div style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.05)', padding: '12px 16px', borderRadius: '16px 16px 16px 4px', maxWidth: '85%', alignSelf: 'flex-start', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <span style={{ fontFamily: design.fonts.body, fontSize: 11, color: '#7170ff', fontWeight: 700, display: 'block', marginBottom: 4 }}>AGENT (ES)</span>
              <span style={{ fontFamily: design.fonts.body, fontSize: 13, color: design.palette.text, lineHeight: 1.3 }}>Hola, ¿en qué puedo ayudarte hoy?</span>
            </div>
            <div style={{ background: '#7170ff', padding: '12px 16px', borderRadius: '16px 16px 4px 16px', maxWidth: '85%', alignSelf: 'flex-end', boxShadow: '0 2px 8px rgba(113,112,255,0.2)' }}>
              <span style={{ fontFamily: design.fonts.body, fontSize: 13, color: '#ffffff', lineHeight: 1.3 }}>Quiero cambiar mi vuelo de mañana...</span>
            </div>
          </div>
        </GlassCard>

      </div>
      <Footer />
    </div>
  </PastelBackground>
);

// ─── Slide 3: Editorial Article ──────────────────────────────────────────────
const Article: Page = () => (
  <PastelBackground>
    <div style={{ width: '100%', height: '100%', padding: '100px 100px 120px 100px', display: 'flex', boxSizing: 'border-box', position: 'relative' }}>
      
      {/* Left Column: Article Text */}
      <div style={{ width: '50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingRight: 60, boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
          <span style={{ background: 'rgba(113, 112, 255, 0.1)', color: '#7170ff', padding: '6px 12px', borderRadius: 6, fontFamily: design.fonts.body, fontSize: 14, fontWeight: 700, letterSpacing: '0.05em' }}>
            BUILDING AI AGENTS
          </span>
          <span style={{ fontFamily: design.fonts.body, fontSize: 15, color: '#68717a', fontWeight: 500 }}>
            January 15, 2026
          </span>
        </div>
        <Title style={{ fontSize: 64, lineHeight: 1.15, marginBottom: 32 }}>
          What Is a Conversation Engineer? <br />
          The Emerging Role Transforming AI Hospitality.
        </Title>
        <div style={{ display: 'flex' }}>
          <a
            href="#read"
            style={{
              fontFamily: design.fonts.body,
              fontSize: 18,
              fontWeight: 700,
              color: design.palette.text,
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              borderBottom: '2px solid #181b1f',
              paddingBottom: 4,
            }}
          >
            Read Blog ↗
          </a>
        </div>
      </div>

      {/* Right Column: Hero Graphic */}
      <div style={{ width: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        {/* Soft background blob behind the glass card for depth */}
        <div
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,189,171,0.5) 0%, rgba(224,216,255,0) 70%)',
            top: '15%',
            left: '10%',
            filter: 'blur(40px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 450,
            height: 450,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(113,112,255,0.2) 0%, rgba(224,216,255,0) 70%)',
            bottom: '10%',
            right: '10%',
            filter: 'blur(50px)',
          }}
        />

        {/* Floating Glass Showcase */}
        <GlassCard style={{ width: 500, height: 500, justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '60px 48px', position: 'relative', zIndex: 1 }} className="pg-animate-float-1">
          <div style={{ fontFamily: design.fonts.body, fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em', color: design.palette.text, marginBottom: 40 }}>
            conduit
          </div>
          <h2 style={{ fontFamily: design.fonts.display, fontSize: 48, fontWeight: 400, lineHeight: 1.2, color: design.palette.text, margin: '0 0 24px 0' }}>
            AI Voice That <br />
            Sounds Human
          </h2>
          <div style={{ width: 60, height: 1, background: 'rgba(0,0,0,0.1)', margin: '0 auto 24px auto' }} />
          <p style={{ fontFamily: design.fonts.body, fontSize: 16, color: '#68717a', margin: 0, lineHeight: 1.5, maxWidth: 300 }}>
            What a 70% Automation Rate Actually Looks Like in Practice
          </p>
        </GlassCard>
      </div>

      <Footer />
    </div>
  </PastelBackground>
);

export default [Cover, Features, Article];
