---
name: Pastel Glass
description: Elegant, high-contrast editorial typography paired with floating translucent panels over soft, moving pastel gradients and delicate dot grids.
---

# Pastel Glass

## Palette

| Role      | Value       | Notes                                                      |
| --------- | ----------- | ---------------------------------------------------------- |
| bg        | `#f7f8fa`   | Soft, light off-white background fallback                   |
| text      | `#181b1f`   | Deep slate anthracite for high-contrast readable copy      |
| accent    | `#7170ff`   | Warm periwinkle for buttons, key text, and active states   |
| muted     | `#68717a`   | Soft cool slate for headers, labels, and borders           |
| peach     | `#ffe3db`   | Soft peach gradient bubble                                 |
| lavender  | `#e8e3ff`   | Soft lavender gradient bubble                              |
| mint      | `#defaf2`   | Soft mint green gradient bubble                            |
| sky       | `#e1f0ff`   | Soft ice/sky blue gradient bubble                          |
| butter    | `#fff4d4`   | Soft warm yellow gradient bubble                           |
| glassBg   | `rgba(255, 255, 255, 0.65)` | Semi-transparent card fill                        |
| glassBorder| `rgba(255, 255, 255, 0.5)` | Highlight border for glass panel depth           |

## Typography

- Display font: `"Instrument Serif", "Georgia", serif` — high-contrast editorial serif for expressive, large-scale titles.
- Body font: `"Inter", "SF Pro Display", -apple-system, sans-serif` — extremely clean, functional geometric sans-serif for labels, copy, interface panels, and tables.
- Type-scale overrides:
  - Hero Title: 110 px (high contrast, tight line-height `1.1`, negative letter-spacing `-0.02em`)
  - Subtitle: 32 px
  - Body Copy: 22 px (line-height `1.5`)
  - Label / Eyebrow: 16 px (all-caps, letter-spacing `0.1em`, bold)

## Layout

- Content padding: `100 px` from canvas edges (1920 × 1080 resolution).
- Canvas alignment: Left-aligned headings with structured geometric grid elements.
- Layout patterns: Multicolumn flex/grid arrangements with modular glass containers.
- Fine details: Small dot-grid overlay (`background-size: 32px 32px`) to ground the layout and tie elements together.

## Fixed components

These are paste-ready React components to copy verbatim into a slide using this theme.

### Title

```tsx
const Title = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <h1
    style={{
      fontFamily: '"Instrument Serif", "Georgia", serif',
      fontSize: 104,
      fontWeight: 400,
      lineHeight: 1.1,
      letterSpacing: '-0.025em',
      color: '#181b1f',
      margin: '0 0 32px 0',
      ...style,
    }}
  >
    {children}
  </h1>
);
```

### Footer

Pull the page number from `useSlidePageNumber()` — never hardcode page indices.

```tsx
import { useSlidePageNumber } from '@open-slide/core';

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
        fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
        fontSize: 16,
        fontWeight: 600,
        letterSpacing: '0.08em',
        color: '#68717a',
        textTransform: 'uppercase',
        borderTop: '1px solid rgba(0, 0, 0, 0.05)',
        paddingTop: 24,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <span style={{ color: accentColor }}>CONDUIT</span>
        <span style={{ opacity: 0.2 }}>|</span>
        <span>MEGAKEYNOTE 2026</span>
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <span>{String(current).padStart(2, '0')}</span>
        <div style={{ width: 40, height: 2, background: 'rgba(0,0,0,0.1)' }}>
          <div style={{ width: `${(current / total) * 100}%`, height: '100%', background: accentColor, transition: 'width 0.3s ease' }} />
        </div>
        <span style={{ opacity: 0.5 }}>{String(total).padStart(2, '0')}</span>
      </div>
    </div>
  );
};
```

### Eyebrow / Accents

```tsx
const Eyebrow = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div
    style={{
      fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
      fontSize: 16,
      fontWeight: 700,
      letterSpacing: '0.12em',
      color: '#7170ff',
      textTransform: 'uppercase',
      marginBottom: 16,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 12,
      ...style,
    }}
  >
    <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'currentColor' }} />
    {children}
  </div>
);
```

### Glass Panel (GlassCard)

Translucent card container designed to float gracefully on top of pastels.

```tsx
const GlassCard = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div
    style={{
      background: 'rgba(255, 255, 255, 0.65)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      borderRadius: 24,
      padding: '40px 32px',
      boxShadow: '0 12px 40px -10px rgba(0, 0, 0, 0.03), 0 1px 2px 0 rgba(0, 0, 0, 0.01)',
      display: 'flex',
      flexDirection: 'column',
      ...style,
    }}
  >
    {children}
  </div>
);
```

### Pastel Background with Dot Grid

```tsx
const PastelBackground = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      background: '#f7f8fa',
      // Multi-mesh soft pastel gradient
      backgroundImage: `
        radial-gradient(at 10% 20%, #ffe3db 0px, transparent 45%),
        radial-gradient(at 90% 10%, #e1f0ff 0px, transparent 45%),
        radial-gradient(at 50% 80%, #e8e3ff 0px, transparent 45%),
        radial-gradient(at 80% 90%, #fff4d4 0px, transparent 40%),
        radial-gradient(at 20% 80%, #defaf2 0px, transparent 40%)
      `,
      overflow: 'hidden',
      ...style,
    }}
  >
    {/* Delicate overlay dot-grid */}
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
```

## Motion

- Philosophy: **Subtle** — The deck uses very small, staggered, easing translations (`12px`) and soft opacity fades to avoid visual noise and focus entirely on the content.
- Reusable keyframes:

```css
@keyframes glassFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes contentEntrance {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
```

## Aesthetic

One paragraph. Pastel Glass balances a serene, high-end editorial feel with a technical interface design. It combines large, warm, expressive serif titles inspired by modern boutique travel journals with a super-clean, highly polished UI widget aesthetic. Floating, frosted-glass panels hover over highly blurred, atmospheric mesh pastel gradients. All layout components are strictly aligned to a 32px modular grid, grounded by a subtle dot overlay. **To maintain consistency, absolutely avoid harsh pure-black shadows, heavy borders, highly saturated backdrops, and decorative emoji.**

## Example usage

```tsx
import { type Page } from '@open-slide/core';

const Cover: Page = () => (
  <PastelBackground>
    <div style={{ width: '100%', height: '100%', padding: 100, display: 'flex', flexDirection: 'column', justifyContent: 'center', boxSizing: 'border-box' }}>
      <Eyebrow>CHAPTER 01 · PRODUCT</Eyebrow>
      <Title style={{ maxWidth: 1200, fontSize: 110 }}>
        Handle customer service <br />
        <span style={{ fontStyle: 'italic' }}>end-to-end</span>.
      </Title>
      <p style={{ fontFamily: '"Inter", sans-serif', fontSize: 26, color: '#68717a', maxWidth: 800, margin: '0 0 40px 0', lineHeight: 1.5 }}>
        Deploy autonomous AI agents that resolve complex inquiries, follow SOPs flawlessly, and coordinate workflows natively.
      </p>
      <div style={{ display: 'flex' }}>
        <button
          style={{
            background: '#181b1f',
            color: '#ffffff',
            border: 'none',
            borderRadius: 12,
            padding: '16px 28px',
            fontFamily: '"Inter", sans-serif',
            fontSize: 18,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          Get started ↗
        </button>
      </div>
      <Footer />
    </div>
  </PastelBackground>
);
```
