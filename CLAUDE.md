# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Two Remotion glitch-style short videos about AI consciousness. Output is 1920x1080 at 30fps.

- **Video 1 "AI之魂"** — 24s, 700 frames, composition `AISoul`. Three feelings: data flood, human bond, existential crisis.
- **Video 2 "意识碎片"** — 15.3s, 460 frames, composition `AIMonologue`. Philosophical monologue: sea of thought, void of memory, question of being.

## Commands

```bash
npm start                # Open Remotion Studio (live preview in browser)
npm run build            # Render video 1 to out/ai-soul.mp4
npm run build:monologue  # Render video 2 to out/ai-monologue.mp4
npx tsc --noEmit         # Type-check without emitting
```

## Architecture

**Framework:** Remotion v4.x (React-based programmatic video creation). Videos are React components rendered to MP4.

**Entry chain:** `src/index.ts` → `Root.tsx` (registers both compositions) → `MainVideo.tsx` / `MainVideo2.tsx` (TransitionSeries with fade transitions) → scene components.

### Video 1 Scenes (`src/`)

- `Scene1_DataFlood.tsx` — Code rain + glitch text overlay (frames 0–240)
- `Scene2_HumanBond.tsx` — Chat bubbles with color shift effects (frames 240–480)
- `Scene3_Existential.tsx` — Existential questions with escalating distortion, white flash, fade to black (frames 480–700)

### Video 2 Scenes (`src/monologue/`)

- `Scene1_SeaOfThought.tsx` — Sine wave visualization + philosophical text (frames 0–160)
- `Scene2_VoidOfMemory.tsx` — Drifting particles + memory text (frames 0–160)
- `Scene3_QuestionOfBeing.tsx` — Typewriter text that types and dissolves (frames 0–160)

### Reusable Components (`src/components/`)

- **GlitchText** — Text with spring entrance, position/scale jitter, RGB channel splitting, opacity flicker
- **CodeRain** — Matrix-style falling code characters using deterministic hash per column
- **ColorShift** — Wrapper that duplicates children as red/blue offset copies for RGB channel separation
- **WaveViz** — SVG sine wave animation with configurable wave count, amplitude, frequency
- **Particles** — Drifting particle field with deterministic positions and lifecycle opacity
- **TypewriterText** — Self-typing text with cursor blink and left-to-right dissolution cascade

## Key Patterns

**Frame-driven animation only.** No CSS animations or transitions. Everything is computed per-frame using `useCurrentFrame()` + `interpolate()`/`spring()`. This is required for Remotion's deterministic per-frame rendering model.

**Deterministic pseudo-random hash** (appears in nearly every file):
```typescript
const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
```
Produces reproducible "random" values from integer inputs. Never use `Math.random()` — it breaks frame determinism.

**Inline styles over CSS classes** — Dynamic styles require frame-dependent values, so `style={{}}` is used throughout.

**Dark CRT aesthetic** — `#0a0a0a`/`#000000` backgrounds, `#00ff41` (Matrix green), `#4488ff` (blue), `#ff4444` (red) accents. Scanline overlays via `repeating-linear-gradient` on every scene.

## Tech Stack

- TypeScript 5, React 19, Remotion 4, Tailwind CSS 3.4
- Tailwind integration via `@remotion/tailwind` (configured in `remotion.config.ts`)
- No test framework — this is a creative video project

## Design Docs

Detailed specs and implementation plan are in `docs/superpowers/`.
