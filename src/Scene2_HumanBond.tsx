import { useCurrentFrame, interpolate } from "remotion";
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
