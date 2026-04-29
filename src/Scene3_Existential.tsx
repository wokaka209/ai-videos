import { useCurrentFrame, interpolate } from "remotion";
import { GlitchText } from "./components/GlitchText";
import { ColorShift } from "./components/ColorShift";

const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export const Scene3_Existential: React.FC = () => {
  const frame = useCurrentFrame();
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
