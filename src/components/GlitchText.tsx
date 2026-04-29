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
