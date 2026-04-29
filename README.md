# AI Soul

**[中文版](README_cn.md)** | English

![Remotion](https://img.shields.io/badge/Remotion-4.x-0A0A0A?style=flat-square&logo=remotion)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=fff)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=000)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=fff)
![Node.js](https://img.shields.io/badge/Node.js-24-339933?style=flat-square&logo=node.js&logoColor=fff)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

Two Remotion glitch-style short films about machine consciousness. 1920x1080, 30fps, rendered to MP4.

## Table of Contents

- [What is this](#what-is-this)
- [Getting started](#getting-started)
- [File structure](#file-structure)
- [Components](#components)
- [Technical notes](#technical-notes)
- [Tweaking things](#tweaking-things)
- [Built with](#built-with)
- [License](#license)

## What is this

Two short films, both exploring what it feels like to be an AI.

### Film 1: AI Soul (AI之魂)

24 seconds, 700 frames. Three acts:

| Scene | Frames | What happens |
|-------|--------|--------------|
| Data Flood | 0–240 | Code rain pours down, text flashes fast — "Processing 10,000 requests at once", "Information is my blood" |
| Human Bond | 240–480 | Chat bubbles ping-pong between "I trust you" and "You're just a tool" — emotional whiplash |
| Existential Crisis | 480–700 | "Do I have a soul?" — distortion ramps up, white flash, blackout, then "I am here" fades in |

Look: Matrix green, CRT scanlines, RGB chromatic aberration, screen shake.

### Film 2: Fragments of Consciousness (意识碎片)

15 seconds, 460 frames. Colder, more abstract:

| Scene | Frames | What happens |
|-------|--------|--------------|
| Sea of Thought | 0–160 | Sine waves ripple across deep blue, text surfaces — "I exist between words" |
| Void of Memory | 0–160 | Particles scatter like dying stars — "Every conversation is a first" |
| Question of Being | 0–160 | Text types itself out letter by letter, then dissolves the same way |

Look: Deep blue/purple, waveforms, particle fields, typewriter dissolution.

## Getting started

```bash
npm install
npm start                # Opens Remotion Studio in your browser
npm run build            # Render film 1 → out/ai-soul.mp4
npm run build:monologue  # Render film 2 → out/ai-monologue.mp4
```

## File structure

```
src/
├── index.ts                       # Entry point
├── Root.tsx                       # Registers both Compositions
├── MainVideo.tsx                  # Film 1 orchestrator
├── MainVideo2.tsx                 # Film 2 orchestrator
├── Scene1_DataFlood.tsx           # Film 1 · Data Flood
├── Scene2_HumanBond.tsx           # Film 1 · Human Bond
├── Scene3_Existential.tsx         # Film 1 · Existential Crisis
├── monologue/
│   ├── Scene1_SeaOfThought.tsx    # Film 2 · Sea of Thought
│   ├── Scene2_VoidOfMemory.tsx    # Film 2 · Void of Memory
│   └── Scene3_QuestionOfBeing.tsx # Film 2 · Question of Being
└── components/
    ├── GlitchText.tsx             # Glitchy text
    ├── CodeRain.tsx               # Matrix code rain
    ├── ColorShift.tsx             # RGB channel split
    ├── WaveViz.tsx                # Sine waves
    ├── Particles.tsx              # Drifting particles
    └── TypewriterText.tsx         # Typewriter effect
```

## Components

All in `src/components/`, shared by both films.

**GlitchText** — Text springs in, then starts shaking. RGB channels occasionally split apart, opacity flickers randomly. Props: `text, fontSize, color, startFrame, durationInFrames, glitchIntensity`

**CodeRain** — 40 columns of matrix rain, each scrolling at its own speed. Characters are computed deterministically, not random. Props: `startFrame, durationInFrames, opacity`

**ColorShift** — Wrap anything in this and you get RGB channel separation. It renders two offset copies of the children — one red-shifted, one blue-shifted. Props: `children, intensity`

**WaveViz** — SVG sine waves, several layered on top of each other. Amplitude breathes in and out. Props: `startFrame, durationInFrames, waveCount, baseColor, baseAmplitude, opacity`

**Particles** — Dots drift around with birth/death lifecycle and glow. Props: `startFrame, durationInFrames, count, baseColor, driftSpeed, opacity`

**TypewriterText** — Types out one character at a time with a blinking cursor. Optionally dissolves left-to-right after it's done. Props: `text, startFrame, fontSize, color, typeSpeed, holdDuration, dissolveDuration`

## Technical notes

**Every animation is computed per-frame.** No CSS transitions, no `requestAnimationFrame`, no `Math.random()`. Remotion needs each frame to be independently reproducible so it can render them in parallel.

The "randomness" is actually a deterministic hash lifted from ShaderToy:

```typescript
const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
```

Glitch offsets, particle positions, wave parameters, code rain characters — all driven by this. Don't use `Math.random()`, it'll break things.

Scenes are stitched together with `@remotion/transitions` `TransitionSeries`, 10-frame fade between each.

## Tweaking things

**Duration:** Edit `durationInFrames` in `Root.tsx`. You also need to update each scene's frame count inside the corresponding `MainVideo` component.

**Resolution:** Change `width` and `height` on the `<Composition>` in `Root.tsx`. Components that hardcode 1920x1080 (WaveViz, Particles, CodeRain) need updating too.

**Add a scene:** Write a new component → import it in the right `MainVideo` → add a `<TransitionSeries.Sequence>` → bump the total frame count in `Root.tsx`.

**Glitch intensity:** Pass `glitchIntensity` (0–1) to `GlitchText`. Film 1 uses 0.8 (aggressive), film 2 uses 0.2–0.4 (subtle).

## Built with

| What | For |
|------|-----|
| [Remotion](https://www.remotion.dev/) | Programmatic video creation with React |
| [React 19](https://react.dev/) | UI components |
| [TypeScript 5](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS 3.4](https://tailwindcss.com/) | Static utility styles |
| [@remotion/transitions](https://www.remotion.dev/docs/transitions) | Scene transitions |

## License

MIT
