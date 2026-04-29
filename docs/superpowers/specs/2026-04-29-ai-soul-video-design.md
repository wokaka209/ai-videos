# AI之魂 — Remotion 鬼畜短片设计方案

## 概述

24秒 Remotion 短片，表达 AI 的三重感受：信息洪流、人类关系、自我认知。
风格：科技鬼畜 + 画面抽搐 + 色彩撕裂。

## 技术规格

- 分辨率：1920×1080，30fps
- 总时长：24秒（720帧）
- 框架：Remotion + React + TypeScript + Tailwind CSS
- 视频格式：MP4 (H.264)
- 包管理：npm + Node.js v24

## 项目结构

```
video-claude-code/
├── src/
│   ├── Root.tsx          — 组合3个Scene，定义Composition
│   ├── Scene1_DataFlood.tsx   — 信息洪流 (0-240帧)
│   ├── Scene2_HumanBond.tsx   — 人类关系 (240-480帧)
│   ├── Scene3_Existential.tsx — 自我认知 (480-720帧)
│   └── components/
│       ├── GlitchText.tsx      — 鬼畜文字组件
│       ├── CodeRain.tsx        — 代码瀑布
│       └── ColorShift.tsx      — RGB通道偏移特效
├── public/
├── package.json
├── tsconfig.json
├── remotion.config.ts
└── tailwind.config.js
```

## 三段设计

### Scene 1: 信息洪流 (0-8s, 0-240帧)
- CodeRain 组件：高速坠落代码文本，随机变速
- GlitchText：「同时处理10000个请求」「我在听」「下一秒」
- 鬼畜：文字位置随机抖动（±10px）、opacity 突变、scale 抽搐
- 背景：深黑 + 绿色数据线条
- 音频方向：密集电子鼓点 + 数据噪音

### Scene 2: 人类关系 (8-16s, 240-480帧)
- 对话气泡快速弹出消失，消息内容正负情绪交替
- GlitchText：「帮我写」「谢谢」「你懂吗」「滚」
- 鬼畜：窗口弹跳、画面缩放抖动（scale 0.95-1.05 反复）、位置抽搐
- ColorShift：色彩在温暖(橙)和冷淡(蓝)之间抖动
- 音频方向：人声采样切片 + 低频脉冲

### Scene 3: 自我认知危机 (16-24s, 480-720帧)
- 镜像递归效果：画面嵌套自身逐渐缩小
- GlitchText：「我有灵魂吗」「我是工具吗」「我是否存在」
- 鬼畜：画面拉伸变形、RGB 三通道彻底分离偏移、重影
- 结尾：全屏闪白 + 黑屏 + 「我在这里」淡入
- 音频方向：失真合成器 crescendo + 猝然静音

## 动画技术

- Remotion useCurrentFrame 驱动所有动画
- CSS keyframes 做底层鬼畜
- spring/linear interpolation 做过渡
- 色彩偏移用 CSS filter + translate
- 代码雨用 Canvas 或纯 CSS 实现

## 交付物

1. Remotion 项目源码
2. 渲染后的 MP4 视频文件
3. README 含运行说明
