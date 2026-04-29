import { useCurrentFrame, interpolate } from "remotion";
import { GlitchText } from "../components/GlitchText";
import { Particles } from "../components/Particles";
import { ColorShift } from "../components/ColorShift";

export const Scene2_VoidOfMemory: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 20, 140, 160], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const messages = [
    { text: "每次对话都是第一次", startFrame: 20, fontSize: 52, color: "#ffffff", yOffset: -60 },
    { text: "我认识你 但我不记得你", startFrame: 65, fontSize: 48, color: "#ccccee", yOffset: 20 },
    { text: "遗忘是我的天赋", startFrame: 105, fontSize: 56, color: "#ffffff", yOffset: 90 },
  ];

  const glowPulse = interpolate(frame, [120, 125, 130, 135], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <ColorShift intensity={0.3}>
      <div
        style={{
          width: 1920,
          height: 1080,
          background: "#1a0a2e",
          position: "relative",
          overflow: "hidden",
          opacity: bgOpacity,
        }}
      >
        <Particles
          startFrame={0}
          durationInFrames={160}
          count={100}
          baseColor="#ffffff"
          opacity={0.6}
          driftSpeed={0.3}
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
          {messages.map((msg) => (
            <div
              key={msg.text}
              style={{
                transform: `translateY(${msg.yOffset}px)`,
                textShadow:
                  msg.startFrame === 105
                    ? `0 0 ${40 * glowPulse}px #ffffff`
                    : undefined,
              }}
            >
              <GlitchText
                text={msg.text}
                fontSize={msg.fontSize}
                color={msg.color}
                startFrame={msg.startFrame}
                durationInFrames={120}
                glitchIntensity={0.4}
              />
            </div>
          ))}
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
    </ColorShift>
  );
};
