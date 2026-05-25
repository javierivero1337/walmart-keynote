# Walmart MegaKeynote Light Brand Kit Style Guide

This guide defines the visual system for the current live keynote at `/`. Use it when authoring or refactoring slides so every page feels like one premium product story: a light, cinematic, high-trust presentation about intelligence, human agency, and systems that amplify people.

---

## 1. Brand Strategy

| Dimension | Direction |
| --- | --- |
| Category | Developer tool, presentation system, agent workflow |
| Audience | Builders, founders, designers, technical storytellers |
| Promise | From prompt to live deck without leaving code |
| Personality | Precise, luminous, calm, optimistic, technically credible |
| Core metaphor | A bright editorial canvas with a guided construction grid: human intent directs powerful systems |
| Logo/system logic | Cursor, frame, grid, terminal, and live canvas motifs repeated as one visual language |

Avoid generic SaaS gradients, decorative icons, fake dashboard clutter, and flat corporate whiteness. The deck should feel expensive, controlled, spacious, and implementation-ready.

---

## 2. Visual Direction

The system is **Light Editorial / Builder**: warm off-white canvas, graphite text, bright but disciplined green accent, thin technical linework, and large sparse typography. UI mockups should look like premium product surfaces, not busy app screenshots.

Core qualities:

- Warm white outer canvas with subtle construction grid structure.
- One energetic accent: calibrated green for action, focus, progress, and live states.
- Secondary cyan and amber only for inspect/tool/status details.
- Large negative space, oversized titles, very low text density.
- Browser chrome, terminal frames, command bars, selection outlines, and component strips as brand applications.
- Soft shadows, paper-like translucency, and construction lines used sparingly.

---

## 3. Design Tokens

| Token | Value | Role |
| --- | --- | --- |
| Warm Canvas | `#F7F8F3` | Primary slide background, soft enough for projection |
| Paper Surface | `#FFFFFF` | Main window/card surface |
| Raised Surface | `#F1F5ED` | Toolbars, rails, cards, active panels |
| Max Surface | `#E5EBE2` | Sliders, thumbnail blocks, nested UI wells |
| Primary Text | `#0A0F0C` | Headlines and strong labels |
| Soft Text | `#29352F` | Body copy and command text |
| Muted Text | `#66706A` | Eyebrows, captions, UI metadata |
| Dim Line | `#C9D1C7` | Inactive marks and quiet dividers |
| Signal Green | `#00B86B` | Main accent, active state, HMR, save, progress |
| Deep Green | `#075F38` | Accessible accent text and small labels |
| Signal Cyan | `#0077A3` | Inspect mode, selection geometry |
| Warm Amber | `#AD6B00` | Tool activity, git, warnings |
| Hairline Border | `rgba(18,23,19,0.12)` | Default structural border |
| Accent Border | `rgba(0,184,107,0.28)` | Active frames and focused cards |

Usage rule: every slide gets at least one meaningful green accent, but green should never become decoration. It marks something live, focused, generated, saved, or ready.

---

## 4. Typography

Use a technical sans system with sharp hierarchy.

| Role | Family | Size | Treatment |
| --- | --- | --- | --- |
| Hero | `Space Grotesk` | `132-170 px` | `600-700`, tight tracking, line-height `0.96-1.0` |
| Slide Title | `Space Grotesk` | `88-120 px` | `600`, line-height `1.0`, max two lines |
| Body | `Inter` | `28-34 px` | Normal to medium, line-height `1.35-1.45` |
| UI / Code | `JetBrains Mono` fallback stack | `18-28 px` | Regular/medium, precise spacing |
| Eyebrow | Mono | `18-22 px` | Uppercase, letter-spacing `0.16-0.20em` |
| Micro Label | Mono | `12-16 px` | Uppercase or compact metadata only |

Keep copy short enough to be read from the back of a large room. Avoid paragraphs where a phrase or command line will do.

---

## 5. Layout System

All slides use a 1920 x 1080 canvas. Primary safe-area padding is `120-140 px`; dense product mockups may use `90-120 px`.

Preferred patterns:

- **Command Cover**: one massive claim, small mono metadata, sparse step rail.
- **Terminal + Canvas Split**: agent conversation on one side, live slide/browser preview on the other.
- **Inspector Cockpit**: large product frame with one focused selection state and a right-side control panel.
- **System Contact Sheet**: repeated cards or thumbnails showing range, with one active state.
- **Proof Grid**: three to five quiet cards, each with a strong label and a tiny supporting command.
- **Deploy Strip**: logo cards and one terminal command as the closing proof.

Composition rules:

- One dominant idea per slide.
- Quiet slides should be allowed to stay quiet.
- Align everything to a visible or implied grid.
- Use gutters of `28-48 px` between major panels.
- Keep terminal/browser frames believable and minimal.

---

## 6. Component Language

Shared slide components should express the same brand world:

- **Grid background**: thin graphite construction grid, softened by pale green/cyan atmosphere.
- **Window shells**: paper-white panels, subtle green-tinted borders, soft shadow, minimal browser chrome.
- **Cards**: raised white or warm gray surfaces, tight radius, clear hierarchy, no generic frosted-pastel blur.
- **Active states**: green border plus tiny glow, not full neon flood.
- **Inspect states**: cyan outline, light cyan fill, small crosshair geometry.
- **Terminal states**: mono type, green prompt, amber tool marker, dim metadata.
- **Image/application panels**: if used, art-direct them toward bright editorial product crops, abstract construction diagrams, and clean high-contrast overlays.

---

## 7. Motion

Motion should feel precise and authored:

- Fade/translate entrance: `12-18 px`, `0.7-1.1 s`, cubic easing.
- Typing animation for prompt moments only.
- Pulses only for active inspect/save/live indicators.
- No bouncing, confetti, random rotations, or gratuitous parallax.

---

## 8. Implementation Notes

For this repo, the live deck at `/` is centralized in the custom Next keynote:

- `app/globals.css` contains the shared brand tokens, light grid background, glass panel treatment, and compatibility overrides for existing slide utilities.
- `components/SlideDeck.tsx` owns the presenter chrome, progress bar, speaker notes panel, and slide overview.
- `components/slides/*.tsx` contains the actual slide visuals.
- `lib/slides-config.ts` controls ordering, titles, subtitles, notes, and image prefetching.
- The open-slide example under `slides/getting-started/` is reference content, not what renders at `/`.

Keep edits scoped to slide files and local assets. Do not add dependencies for style alone.

---

## 9. CSS Reference

```css
.brand-grid {
  background-image:
    linear-gradient(rgba(18,23,19,0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(18,23,19,0.055) 1px, transparent 1px),
    radial-gradient(circle at 14% 12%, rgba(0,184,107,0.12), transparent 34%),
    radial-gradient(circle at 88% 84%, rgba(0,119,163,0.10), transparent 36%),
    radial-gradient(circle at 54% 108%, rgba(255,184,77,0.12), transparent 30%);
  background-size: 96px 96px, 96px 96px, auto, auto;
}

.brand-panel {
  background: linear-gradient(180deg, rgba(255,255,255,0.88), rgba(243,247,239,0.82));
  border: 1px solid rgba(18,23,19,0.12);
  box-shadow: 0 28px 70px -46px rgba(18,23,19,0.28);
}

.accent-glow {
  box-shadow: 0 0 0 1px rgba(0,184,107,0.28), 0 14px 40px rgba(0,184,107,0.14);
}

.mono-label {
  font-family: "JetBrains Mono", "SF Mono", ui-monospace, Menlo, monospace;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
```
