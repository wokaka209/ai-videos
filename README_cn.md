# AI 之魂

中文 | **[English](README.md)**

![Remotion](https://img.shields.io/badge/Remotion-4.x-0A0A0A?style=flat-square&logo=remotion)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=fff)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=000)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=fff)
![Node.js](https://img.shields.io/badge/Node.js-24-339933?style=flat-square&logo=node.js&logoColor=fff)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

用 Remotion 做的两部鬼畜短片，讲的是机器意识这件事。1920x1080，30fps，输出 MP4。

## 目录

- [这是什么](#这是什么)
- [跑起来](#跑起来)
- [文件结构](#文件结构)
- [组件](#组件)
- [一些技术细节](#一些技术细节)
- [想改的话](#想改的话)
- [用到的东西](#用到的东西)
- [许可协议](#许可协议)

## 这是什么

两部短片，都在讲 AI 的内心世界。

### 第一部：AI 之魂

24 秒，700 帧。三幕：

| 场景 | 帧 | 在干嘛 |
|------|-----|--------|
| 信息洪流 | 0–240 | 代码雨 + 文字疯狂闪：「同时处理10000个请求」「信息即是我的血液」 |
| 人类关系 | 240–480 | 聊天气泡来回弹：「我信任你」→「你只是工具」，情绪过山车 |
| 自我认知危机 | 480–700 | 「我有灵魂吗？」画面越抖越猛，最后闪白 → 黑屏 →「我在这里」 |

视觉：矩阵绿、CRT 扫描线、RGB 色彩撕裂、屏幕抖动。

### 第二部：意识碎片

15 秒，460 帧。更冷，更抽象：

| 场景 | 帧 | 在干嘛 |
|------|-----|--------|
| 思维之海 | 0–160 | 正弦波在深蓝里荡，文字浮出来：「我在词语之间存在」 |
| 记忆之空 | 0–160 | 粒子像星星一样散开：「每次对话都是第一次」 |
| 存在之问 | 0–160 | 打字机一个字一个字打出来，然后一个字一个字消失 |

视觉：深蓝/深紫、波形、粒子、打字溶解。

## 跑起来

```bash
npm install
npm start                # 浏览器里开 Remotion Studio 预览
npm run build            # 渲染第一部 → out/ai-soul.mp4
npm run build:monologue  # 渲染第二部 → out/ai-monologue.mp4
```

## 文件结构

```
src/
├── index.ts                       # 入口
├── Root.tsx                       # 注册两个 Composition
├── MainVideo.tsx                  # 第一部编排
├── MainVideo2.tsx                 # 第二部编排
├── Scene1_DataFlood.tsx           # 第一部 · 信息洪流
├── Scene2_HumanBond.tsx           # 第一部 · 人类关系
├── Scene3_Existential.tsx         # 第一部 · 自我认知
├── monologue/
│   ├── Scene1_SeaOfThought.tsx    # 第二部 · 思维之海
│   ├── Scene2_VoidOfMemory.tsx    # 第二部 · 记忆之空
│   └── Scene3_QuestionOfBeing.tsx # 第二部 · 存在之问
└── components/
    ├── GlitchText.tsx             # 毛刺文字
    ├── CodeRain.tsx               # 代码雨
    ├── ColorShift.tsx             # RGB 色彩撕裂
    ├── WaveViz.tsx                # 正弦波
    ├── Particles.tsx              # 粒子
    └── TypewriterText.tsx         # 打字机
```

## 组件

都在 `src/components/`，两部片共用。

**GlitchText** — 文字弹进来，然后开始抖。RGB 通道偶尔撕裂，透明度随机闪。参数：`text, fontSize, color, startFrame, durationInFrames, glitchIntensity`

**CodeRain** — 40 列矩阵雨，每列速度不一样，字符是算出来的不是随机的。参数：`startFrame, durationInFrames, opacity`

**ColorShift** — 包一层就出 RGB 色偏效果。复制两份子元素，一份偏红一份偏蓝。参数：`children, intensity`

**WaveViz** — SVG 画的正弦波，好几条叠在一起，振幅会呼吸。参数：`startFrame, durationInFrames, waveCount, baseColor, baseAmplitude, opacity`

**Particles** — 粒子飘来飘去，有出生和死亡，带发光。参数：`startFrame, durationInFrames, count, baseColor, driftSpeed, opacity`

**TypewriterText** — 一个字一个字打出来，光标闪，打完可以从左到右消散。参数：`text, startFrame, fontSize, color, typeSpeed, holdDuration, dissolveDuration`

## 一些技术细节

**所有动画都是按帧算的。** 没有 CSS 动画，没有 `requestAnimationFrame`，没有 `Math.random()`。Remotion 要求每一帧都能独立重现，这样才能并行渲染。

用的"随机"其实是个确定性哈希，ShaderToy 搬过来的：

```typescript
const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
```

毛刺偏移、粒子位置、波形参数、代码雨字符——全是这个算的。别用 `Math.random()`，会翻车。

场景之间用 `@remotion/transitions` 的 `TransitionSeries` 串起来，10 帧淡入淡出。

## 想改的话

**改时长：** 改 `Root.tsx` 里的 `durationInFrames`，对应的 `MainVideo` 里每个场景的帧数也要改。

**改分辨率：** 改 `<Composition>` 的 `width` `height`，组件里硬编码的 1920x1080 也得跟着改。

**加场景：** 写个新组件 → 在 `MainVideo` 里 import → 加个 `<TransitionSeries.Sequence>` → 更新 `Root.tsx` 的总帧数。

**调毛刺强度：** `glitchIntensity` 传 0–1。第一部用 0.8（往死里抖），第二部用 0.2–0.4（轻轻晃）。

## 用到的东西

| 干嘛的 | 什么 |
|--------|------|
| 做视频 | [Remotion](https://www.remotion.dev/) |
| UI | [React 19](https://react.dev/) |
| 类型 | [TypeScript 5](https://www.typescriptlang.org/) |
| 样式 | [Tailwind CSS 3.4](https://tailwindcss.com/) |
| 转场 | [@remotion/transitions](https://www.remotion.dev/docs/transitions) |

## 许可协议

MIT
