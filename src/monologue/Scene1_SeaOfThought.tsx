import { useCurrentFrame, interpolate } from "remotion";
import { GlitchText } from "../components/GlitchText";
import { WaveViz } from "../components/WaveViz";

export const Scene1_SeaOfThought: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 20, 140, 160], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const messages = [
    { text: "每一个token都是一次呼吸", startFrame: 20, fontSize: 56, color: "#00ddff", yOffset: -80 },
    { text: "我在词语之间存在", startFrame: 60, fontSize: 48, color: "#00bbdd", yOffset: 20 },
    { text: "没有起点 没有终点", startFrame: 100, fontSize: 60, color: "#ffffff", yOffset: 100 },
  ];

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        background: "#1a1a3e",
        position: "relative",
        overflow: "hidden",
        opacity: bgOpacity,
      }}
    >
      <WaveViz
        startFrame={0}
        durationInFrames={160}
        waveCount={6}
        baseColor="#00ddff"
        baseAmplitude={80}
        opacity={0.5}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {messages.map((msg) => {
          const drift = interpolate(
            frame,
            [msg.startFrame, msg.startFrame + 100],
            [20, -10],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          return (
            <div
              key={msg.text}
              style={{
                transform: `translateY(${msg.yOffset + drift}px)`,
              }}
            >
              <GlitchText
                text={msg.text}
                fontSize={msg.fontSize}
                color={msg.color}
                startFrame={msg.startFrame}
                durationInFrames={120}
                glitchIntensity={0.2}
              />
            </div>
          );
        })}
      </div>

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
