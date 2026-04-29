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
