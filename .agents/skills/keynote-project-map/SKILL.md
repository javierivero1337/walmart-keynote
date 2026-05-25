---
name: keynote-project-map
description: Maps the Walmart MegaKeynote project structure for AI agents. Use when editing this keynote, adding or reordering slides, changing presenter notes, working with slide assets/themes, or when the user asks how this deck/project is organized.
---

# Keynote Project Map

## Start Here

This is a Next.js keynote app with project-authored React slide components. The rendered keynote at `/` is the custom deck in `components/SlideDeck.tsx`, not the large open-slide example under `slides/getting-started/`.

Before editing, identify which surface the user means:

- Current live keynote: edit `components/slides/*`, `components/slides/index.ts`, and `lib/slides-config.ts`.
- open-slide content/reference: edit `slides/<id>/index.tsx` only when the user specifically asks for open-slide slides or files under `slides/`.
- Visual direction: read `styleguide.md` and `presentation-outline.md` before substantial content or design changes.

Do not edit generated folders such as `.next/`, `node_modules/`, `.git/`, or build cache files.

## Current Rendered Deck

The app route is simple:

- `app/layout.tsx` loads global fonts, metadata, and `app/globals.css`.
- `app/page.tsx` renders `SlideDeck`.
- `components/SlideDeck.tsx` controls navigation, autoplay, fullscreen, presenter notes, and grid overview.
- `lib/slides-config.ts` is the ordered deck manifest: slide ids, titles, subtitles, presenter notes, and image prefetch URLs.
- `components/slides/index.ts` maps each manifest `id` to the React component that renders that slide.
- `components/slides/*.tsx` contains the actual slide visuals and interactions.
- `public/assets/*` contains images referenced as `/assets/<filename>`.

The key invariant is: every id in `SLIDES_CONFIG` must have a matching entry in `SLIDE_COMPONENTS`.

Current deck note: the "Human Stack" presentation is centralized in `components/slides/HumanStackSlides.tsx`, which exports all 13 slide components and shared helper components such as `SlideFrame`, `ImagePlaceholder`, `CurveChart`, and `VelocityChart`. `components/slides/index.ts` maps ids like `slide_1_title` through `slide_13_outro` to those exports. For normal copy, layout, and placeholder edits in this deck, start with `HumanStackSlides.tsx`; for grid labels and presenter notes, update `lib/slides-config.ts`.

## Adding A Slide To The Live Keynote

1. Create a new component in `components/slides/`, usually named `SlideSomething.tsx`.
2. Export a function component. Add `"use client"` only if the slide uses hooks, browser APIs, event handlers with state, refs, timers, or interactive controls.
3. Import and export it from `components/slides/index.ts`.
4. Add a matching entry to `SLIDE_COMPONENTS` using the same id that will appear in the manifest.
5. Add an ordered item to `SLIDES_CONFIG` in `lib/slides-config.ts` with `id`, `title`, optional `subtitle`, and `notes`.
6. If the slide has a hero image that should prefetch, add its `/assets/...` path to `SLIDE_IMAGE_URLS`.
7. Keep the slide root full-canvas: `w-full h-full ... overflow-hidden`, or equivalent fixed full-size layout.

Use existing slide ids as the naming pattern: `slide_1_hero`, `slide_2_stats`, etc. If reordering slides, update both the order in `SLIDES_CONFIG` and the numeric prefix in ids only when the user wants ids to reflect the new order.

## Editing Existing Slides

For copy, layout, or visual changes, edit the specific component in `components/slides/`. For speaker notes or grid labels, edit `lib/slides-config.ts`.

Existing slide behavior:

- `HumanStackSlides.tsx` is a client component because slide 5 uses click-through state for the OpenAI / Anthropic / Cursor velocity chart.
- The current Human Stack deck intentionally uses large `ImagePlaceholder` regions for future inspirational imagery; preserve those spaces unless the user asks to make a slide denser.
- `SlideHero`, `SlideOverlay`, and `SlideSilhouette` use `next/image` with assets in `public/assets/`.
- `SlideTerminal`, `SlideSilhouette`, and `SlideCockpit` are client components because they use React state/effects or direct interaction.
- `SlideDeck` keyboard controls include next/previous, grid overview, notes, fullscreen, autoplay, Home, End, and Escape.
- `app/globals.css` defines shared utilities such as `bg-pastel-mesh`, `bg-grid-dots`, `glass-panel`, glow helpers, and deck animations.

Prefer reusing global utilities and local component patterns before inventing a new style system.

## Design And Narrative Sources

Use these files as the project brief:

- `presentation-outline.md`: target keynote story, planned slide sequence, emotional arc, and per-slide intent for "The Human Stack".
- `styleguide.md`: dark developer/builder visual system, palette, type scale, layout rules, motion guidance, and implementation notes.
- `themes/pastel-glass.md`: alternate Pastel Glass theme reference with reusable snippets.
- `themes/pastel-glass.demo.tsx`: executable example of the Pastel Glass theme as open-slide pages.

When authoring the Walmart keynote, follow the current deck's pastel/glass Tailwind direction unless the user asks to shift toward the darker `styleguide.md` direction or another theme.

## open-slide Reference Area

`slides/getting-started/index.tsx` is a large open-slide example deck. It imports `Page`, `SlideMeta`, and `DesignSystem` from `@open-slide/core`, exports optional `design` and `meta`, then default-exports an ordered `Page[]`.

Use this convention for open-slide decks:

```tsx
import type { Page, SlideMeta } from '@open-slide/core';

const Cover: Page = () => (
  <div style={{ width: '100%', height: '100%' }}>Hello</div>
);

export const meta: SlideMeta = { title: 'My slide' };
export default [Cover] satisfies Page[];
```

Each open-slide page renders into a 1920 x 1080 canvas. Put open-slide-specific assets under `slides/<id>/assets/` and import them relatively. `slides/.folders.json` is currently empty and only matters if the open-slide tooling starts assigning folders.

## Tech And Commands

Project basics:

- Next.js 16, React 19, TypeScript strict mode, Tailwind CSS 4.
- Path alias `@/*` points to the repo root.
- Package manager is pnpm.
- Useful scripts in `package.json`: `pnpm dev`, `pnpm build`, `pnpm start`, `pnpm lint`.

Do not run a full build unless the user asks. For normal edits, use IDE lints or focused checks on changed files.

## Editing Rules For Agents

- Read the relevant source file before editing it.
- Preserve user edits and unrelated dirty files.
- Keep changes scoped to slide/content files unless framework behavior must change.
- Do not add dependencies for visual styling alone.
- Use `public/assets/` for Next deck images and `slides/<id>/assets/` for open-slide-local assets.
- Keep slides readable from a large room: one dominant idea, short copy, strong hierarchy, and generous spacing.
- After substantive edits, check lints for the files you touched.
