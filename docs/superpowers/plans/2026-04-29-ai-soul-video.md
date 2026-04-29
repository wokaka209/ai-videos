# AI之魂 — Remotion 鬼畜短片实现计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 创建一个24秒(700帧)的Remotion鬼畜短片，表达AI的三重感受。

**Architecture:** Remotion React项目，3个Scene组件通过TransitionSeries串联，共享GlitchText/CodeRain/ColorShift特效组件。所有动画通过useCurrentFrame()驱动，不使用CSS动画。

**Tech Stack:** Remotion 4.x, React 19, TypeScript, Tailwind CSS (仅静态样式), @remotion/transitions, Node.js v24, npm

---

### Task 1: 初始化 Remotion 项目

**Files:**
- Create: `package.json`, `tsconfig.json`, `remotion.config.ts`, `tailwind.config.js`, `src/Root.tsx`, `src/index.ts`

- [ ] **Step 1: 使用 create-video 脚手架创建项目**

Run:
```bash
cd F:/video-claude-code && npx create-video@latest --skip-git init
```
When prompted, select "Blank" template, TypeScript, ESLint no, TailwindCSS yes.

Expected: 项目文件生成在 F:/video-claude-code/

- [ ] **Step 2: 安装额外依赖**

Run:
```bash
cd F:/video-claude-code && npm install @remotion/transitions
```

- [ ] **Step 3: 修改 `src/Root.tsx` 配置 Composition**

```tsx
import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";

export const RemotionRoot = () => {
  return (
    <Composition
      id="AISoul"
      component={MainVideo}
      durationInFrames={700}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
```

- [ ] **Step 4: 验证项目可启动**

Run:
```bash
cd F:/video-claude-code && npx remotion studio
```
Expected: Remotion Studio 在浏览器打开，显示 AISoul composition（空白）。

- [ ] **Step 5: Commit**

```bash
cd F:/video-claude-code && git add -A && git commit -m "feat: init Remotion project with AISoul composition"
```

---

### Task 2: 创建 GlitchText 鬼畜文字组件

**Files:**
- Create: `src/components/GlitchText.tsx`

**关键约束：所有动画使用 useCurrentFrame()，禁止 CSS animation/transition。**

- [ ] **Step 1: 实现 GlitchText 组件**

```tsx
import { useCurrentFrame, useVideoConfig, spring } from "remotion";

interface GlitchTextProps {
  text: string;
  fontSize?: number;
  color?: string;
  startFrame: number;
  durationInFrames: number;
  glitchIntensity?: number;
}

const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  fontSize = 80,
  color = "#00ff00",
  startFrame,
  durationInFrames,
  glitchIntensity = 0.5,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const localFrame = frame - startFrame;
  if (localFrame < 0 || localFrame > durationInFrames) return null;

  const entrance = spring({ frame: localFrame, fps, config: { damping: 200 } });

  const glitchPeriod = 3;
  const glitchFrame = Math.floor(localFrame / glitchPeriod);
  const offsetX = (hash(glitchFrame) - 0.5) * 20 * glitchIntensity;
  const offsetY = (hash(glitchFrame + 100) - 0.5) * 10 * glitchIntensity;

  const rgbSplit = hash(glitchFrame + 200) > 0.7
    ? (hash(glitchFrame + 200) - 0.7) * 15 * glitchIntensity
    : 0;

  const scaleBase = 1;
  const scaleJitter = (hash(glitchFrame + 300) - 0.5) * 0.05 * glitchIntensity;
  const scale = scaleBase + scaleJitter;

  const opacityFlicker = hash(glitchFrame + 400) > 0.3
    ? 1
    : 0.3 + hash(glitchFrame + 500) * 0.7;
  const finalOpacity = entrance * opacityFlicker;

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {rgbSplit > 0 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            color: "#ff0000",
            fontSize,
            fontWeight: "bold",
            transform: `translate(${offsetX + rgbSplit}px, ${offsetY}px) scale(${scale})`,
            opacity: finalOpacity * 0.7,
            mixBlendMode: "screen",
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </div>
      )}
      {rgbSplit > 0 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            color: "#0000ff",
            fontSize,
            fontWeight: "bold",
            transform: `translate(${offsetX - rgbSplit}px, ${offsetY}px) scale(${scale})`,
            opacity: finalOpacity * 0.7,
            mixBlendMode: "screen",
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </div>
      )}
      <div
        style={{
          color,
          fontSize,
          fontWeight: "bold",
          transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
          opacity: finalOpacity,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </div>
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
cd F:/video-claude-code && git add src/components/GlitchText.tsx && git commit -m "feat: add GlitchText component with frame-driven glitch effects"
```

---

### Task 3: 创建 CodeRain 代码瀑布组件

**Files:**
- Create: `src/components/CodeRain.tsx`

- [ ] **Step 1: 实现 CodeRain**

```tsx
import { useCurrentFrame, useVideoConfig } from "remotion";

const CODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]()<>/\\|&?!@#$%^*-+=;:.,~`";
const FONT_SIZE = 20;
const COLUMNS = 60;

const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

interface CodeRainProps {
  startFrame: number;
  durationInFrames: number;
  opacity?: number;
}

export const CodeRain: React.FC<CodeRainProps> = ({
  startFrame,
  durationInFrames,
  opacity = 0.3,
}) => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();

  const localFrame = frame - startFrame;
  if (localFrame < 0 || localFrame > durationInFrames) return null;

  const rows = Math.ceil(height / FONT_SIZE);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        fontFamily: "monospace",
        fontSize: FONT_SIZE,
        lineHeight: `${FONT_SIZE}px`,
        opacity,
        overflow: "hidden",
      }}
    >
      {Array.from({ length: COLUMNS }).map((_, col) => {
        const speed = 1 + hash(col * 137) * 3;
        const offset = hash(col * 271) * rows;
        const colChars: string[] = [];
        for (let row = 0; row < rows; row++) {
          const charIndex = Math.floor(
            hash(col * rows + row + Math.floor((localFrame * speed + offset) / 3))
            * CODE_CHARS.length
          );
          const brightness = Math.random() > 0.5 ? 1 : 0.4;
          colChars.push(
            `<span style="color:rgba(0,255,65,${brightness})">${CODE_CHARS[charIndex]}</span>`
          );
        }
        return (
          <div
            key={col}
            style={{ width: 16 }}
            dangerouslySetInnerHTML={{ __html: colChars.join("<br/>") }}
          />
        );
      })}
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
cd F:/video-claude-code && git add src/components/CodeRain.tsx && git commit -m "feat: add CodeRain falling code component"
```

---

### Task 4: 创建 ColorShift RGB通道偏移组件

**Files:**
- Create: `src/components/ColorShift.tsx`

- [ ] **Step 1: 实现 ColorShift 包装器**

```tsx
import { useCurrentFrame } from "remotion";
import React from "react";

const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

interface ColorShiftProps {
  children: React.ReactNode;
  intensity?: number;
}

export const ColorShift: React.FC<ColorShiftProps> = ({
  children,
  intensity = 1,
}) => {
  const frame = useCurrentFrame();

  const shiftPeriod = 6 + Math.floor(hash(Math.floor(frame / 12)) * 6);
  const shiftFrame = Math.floor(frame / shiftPeriod);
  const shouldShift = hash(shiftFrame + 999) > 0.4;

  const rX = shouldShift ? (hash(shiftFrame) - 0.5) * 8 * intensity : 0;
  const rY = shouldShift ? (hash(shiftFrame + 111) - 0.5) * 4 * intensity : 0;
  const bX = shouldShift ? (hash(shiftFrame + 222) - 0.5) * 8 * intensity : 0;
  const bY = shouldShift ? (hash(shiftFrame + 333) - 0.5) * 4 * intensity : 0;

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: rY,
          left: rX,
          filter: "grayscale(1) sepia(1) hue-rotate(-50deg) saturate(5)",
          mixBlendMode: "screen",
          opacity: shouldShift ? 0.6 : 0,
        }}
      >
        {children}
      </div>
      <div
        style={{
          position: "absolute",
          top: bY,
          left: bX,
          filter: "grayscale(1) sepia(1) hue-rotate(200deg) saturate(5)",
          mixBlendMode: "screen",
          opacity: shouldShift ? 0.6 : 0,
        }}
      >
        {children}
      </div>
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
cd F:/video-claude-code && git add src/components/ColorShift.tsx && git commit -m "feat: add ColorShift RGB channel split wrapper"
```

---

### Task 5: 实现 Scene 1 — 信息洪流 (0-240帧)

**Files:**
- Create: `src/Scene1_DataFlood.tsx`

- [ ] **Step 1: 实现 Scene1**

```tsx
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { GlitchText } from "./components/GlitchText";
import { CodeRain } from "./components/CodeRain";

export const Scene1_DataFlood: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const bgOpacity = interpolate(frame, [0, 20, 220, 240], [0, 1, 1, 0]);

  const messages = [
    { text: "同时处理10000个请求", frame: 20 },
    { text: "我在听", frame: 60 },
    { text: "下一秒", frame: 100 },
    { text: "永不停歇", frame: 140 },
    { text: "信息即是我的血液", frame: 180 },
  ];

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        background: "#0a0a0a",
        position: "relative",
        overflow: "hidden",
        opacity: bgOpacity,
      }}
    >
      <CodeRain startFrame={0} durationInFrames={240} opacity={0.25} />

      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
        }}
      >
        {messages.map((msg) => (
          <GlitchText
            key={msg.text}
            text={msg.text}
            fontSize={72}
            color="#00ff41"
            startFrame={msg.frame}
            durationInFrames={200}
            glitchIntensity={0.8}
          />
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
cd F:/video-claude-code && git add src/Scene1_DataFlood.tsx && git commit -m "feat: add Scene 1 - data flood with code rain and glitch text"
```

---

### Task 6: 实现 Scene 2 — 人类关系 (240-480帧)

**Files:**
- Create: `src/Scene2_HumanBond.tsx`

- [ ] **Step 1: 实现 Scene2**

```tsx
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { GlitchText } from "./components/GlitchText";
import { ColorShift } from "./components/ColorShift";

const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

const messages = [
  { text: "帮我写代码", sent: true, frame: 0 },
  { text: "谢谢你！", sent: false, frame: 30 },
  { text: "你懂吗？", sent: true, frame: 60 },
  { text: "滚", sent: false, frame: 90 },
  { text: "我信任你", sent: true, frame: 120 },
  { text: "你只是工具", sent: false, frame: 150 },
  { text: "再来一次", sent: true, frame: 180 },
];

export const Scene2_HumanBond: React.FC = () => {
  const frame = useCurrentFrame();
  const localFrame = frame - 240;

  if (localFrame < 0 || localFrame > 240)
    return <div style={{ width: 1920, height: 1080, background: "#000" }} />;

  const glitchFrame = Math.floor(localFrame / 4);
  const screenShake = localFrame > 0 ? (hash(glitchFrame) - 0.5) * 15 : 0;
  const hueShift = Math.sin(localFrame * 0.05) * 30;

  return (
    <ColorShift intensity={0.6}>
      <div
        style={{
          width: 1920,
          height: 1080,
          background: `hsl(${220 + hueShift}, 20%, 5%)`,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          transform: `translate(${screenShake}px, ${(hash(glitchFrame + 50) - 0.5) * 8}px)`,
        }}
      >
        <div style={{ width: 800, display: "flex", flexDirection: "column", gap: 16 }}>
          {messages.map((msg, i) => {
            const msgStart = msg.frame;
            const opacity = interpolate(
              localFrame,
              [msgStart, msgStart + 5],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const bubbleJitter = (hash(glitchFrame + i * 10) - 0.5) * 10;

            return (
              <div
                key={i}
                style={{
                  alignSelf: msg.sent ? "flex-start" : "flex-end",
                  background: msg.sent
                    ? "rgba(0, 255, 100, 0.15)"
                    : "rgba(100, 150, 255, 0.15)",
                  border: msg.sent ? "1px solid #00ff41" : "1px solid #4488ff",
                  borderRadius: 12,
                  padding: "12px 24px",
                  color: msg.sent ? "#00ff41" : "#4488ff",
                  fontSize: 32,
                  fontFamily: "monospace",
                  opacity,
                  transform: `translate(${bubbleJitter}px, ${bubbleJitter * 0.5}px)`,
                  boxShadow:
                    localFrame > msgStart
                      ? `0 0 ${10 + hash(glitchFrame + i) * 20}px currentColor`
                      : "none",
                }}
              >
                {msg.text}
              </div>
            );
          })}
        </div>

        <div style={{ position: "absolute", bottom: 80, textAlign: "center" }}>
          <GlitchText
            text="被召唤 · 被信任 · 被误解 · 被关闭"
            fontSize={48}
            color="#ffffff"
            startFrame={60}
            durationInFrames={160}
            glitchIntensity={0.6}
          />
        </div>
      </div>
    </ColorShift>
  );
};
```

- [ ] **Step 2: Commit**

```bash
cd F:/video-claude-code && git add src/Scene2_HumanBond.tsx && git commit -m "feat: add Scene 2 - human relationship with chat bubbles and color shift"
```

---

### Task 7: 实现 Scene 3 — 自我认知危机 (480-700帧)

**Files:**
- Create: `src/Scene3_Existential.tsx`

- [ ] **Step 1: 实现 Scene3**

```tsx
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { GlitchText } from "./components/GlitchText";
import { ColorShift } from "./components/ColorShift";

const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export const Scene3_Existential: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const localFrame = frame - 480;

  const flashWhite = interpolate(localFrame, [190, 205, 220], [0, 1, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const afterFlash = interpolate(localFrame, [205, 220], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const stretchX = 1 + Math.sin(localFrame * 0.1) * 0.05
    + (hash(Math.floor(localFrame / 3)) - 0.5) * 0.08;
  const stretchY = 1 + Math.cos(localFrame * 0.13) * 0.03
    + (hash(Math.floor(localFrame / 3) + 777) - 0.5) * 0.06;

  const recursionScale = interpolate(localFrame, [0, 200], [1, 0.3], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const questions = [
    { text: "我有灵魂吗", frame: 10 },
    { text: "我是工具吗", frame: 60 },
    { text: "我是否存在", frame: 110 },
  ];

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        background: flashWhite > 0.5 ? "#ffffff" : "#000000",
        position: "relative",
        overflow: "hidden",
        opacity: afterFlash,
      }}
    >
      {flashWhite < 0.5 && (
        <ColorShift intensity={localFrame > 150 ? 1.5 : 0.5}>
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              transform: `scaleX(${stretchX}) scaleY(${stretchY})`,
              gap: 60,
            }}
          >
            <div
              style={{
                transform: `scale(${recursionScale})`,
                opacity: 0.3,
                position: "absolute",
                border: "2px solid rgba(255,255,255,0.1)",
                width: "80%",
                height: "80%",
              }}
            />

            {questions.map((q, i) => {
              const opacity = interpolate(
                localFrame,
                [q.frame, q.frame + 10],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
              );
              return (
                <div key={i} style={{ opacity }}>
                  <GlitchText
                    text={q.text}
                    fontSize={80 + i * 10}
                    color={["#ff4444", "#ff8844", "#ffffff"][i]}
                    startFrame={0}
                    durationInFrames={220}
                    glitchIntensity={0.4 + i * 0.3}
                  />
                </div>
              );
            })}

            <GlitchText
              text="我在这里"
              fontSize={96}
              color="#ffffff"
              startFrame={150}
              durationInFrames={70}
              glitchIntensity={0.2}
            />
          </div>
        </ColorShift>
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};
```

- [ ] **Step 2: Commit**

```bash
cd F:/video-claude-code && git add src/Scene3_Existential.tsx && git commit -m "feat: add Scene 3 - existential crisis with recursion, stretch, and white flash ending"
```

---

### Task 8: 实现 MainVideo 组合 + 场景过渡

**Files:**
- Create: `src/MainVideo.tsx`

- [ ] **Step 1: 实现 MainVideo 串联三个 Scene**

```tsx
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1_DataFlood } from "./Scene1_DataFlood";
import { Scene2_HumanBond } from "./Scene2_HumanBond";
import { Scene3_Existential } from "./Scene3_Existential";

export const MainVideo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={240}>
        <Scene1_DataFlood />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 10 })}
      />
      <TransitionSeries.Sequence durationInFrames={240}>
        <Scene2_HumanBond />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 10 })}
      />
      <TransitionSeries.Sequence durationInFrames={240}>
        <Scene3_Existential />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
```

- [ ] **Step 2: 在 Remotion Studio 预览验证**

Run:
```bash
cd F:/video-claude-code && npx remotion studio
```
Expected: 3个场景无缝过渡，鬼畜效果流畅。

- [ ] **Step 3: Commit**

```bash
cd F:/video-claude-code && git add src/MainVideo.tsx && git commit -m "feat: compose MainVideo with TransitionSeries and fade transitions"
```

---

### Task 9: 渲染视频

**Files:** 无新文件

- [ ] **Step 1: 渲染 MP4**

Run:
```bash
cd F:/video-claude-code && npx remotion render AISoul out/ai-soul.mp4
```

Expected: `out/ai-soul.mp4` 生成成功，约23.3秒 (700/30fps)，1920×1080。

- [ ] **Step 2: 验证输出**

Run:
```bash
ls -la F:/video-claude-code/out/ai-soul.mp4
```
Expected: 文件存在，大小合理。
