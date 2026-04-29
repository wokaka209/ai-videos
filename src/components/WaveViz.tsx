import { useCurrentFrame, interpolate } from "remotion";

interface WaveVizProps {
  startFrame: number;
  durationInFrames: number;
  waveCount?: number;
  baseColor?: string;
  baseAmplitude?: number;
  baseFrequency?: number;
  opacity?: number;
}

const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export const WaveViz: React.FC<WaveVizProps> = ({
  startFrame,
  durationInFrames,
  waveCount = 5,
  baseColor = "#00ddff",
  baseAmplitude = 80,
  baseFrequency = 0.008,
  opacity = 0.6,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  if (localFrame < 0 || localFrame > durationInFrames) return null;

  const containerOpacity = interpolate(
    localFrame,
    [0, 30, durationInFrames - 20, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const breathe = Math.sin(localFrame * 0.02);

  const waves = Array.from({ length: waveCount }, (_, i) => {
    const amplitude = baseAmplitude * (0.5 + hash(i * 73) * 1.0) * (1 + breathe * 0.15);
    const frequency = baseFrequency * (0.6 + hash(i * 137) * 0.8);
    const phase = localFrame * (0.02 + hash(i * 271) * 0.03) + hash(i * 397) * Math.PI * 2;
    const yCenter = 540 + (i - waveCount / 2) * 60;
    const waveOpacity = opacity * (0.3 + hash(i * 523) * 0.7);
    const hue = 190 + hash(i * 157) * 30;
    const lightness = 40 + hash(i * 257) * 30;
    const color = `hsl(${hue}, 80%, ${lightness}%)`;

    const step = 4;
    const points: string[] = [];
    for (let x = 0; x <= 1920; x += step) {
      const y = yCenter + amplitude * Math.sin(x * frequency + phase);
      points.push(`${x},${y.toFixed(1)}`);
    }

    const pathD = `M ${points[0]} ${points.slice(1).map((p) => `L ${p}`).join(" ")}`;

    return (
      <path
        key={i}
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={2}
        opacity={waveOpacity}
      />
    );
  });

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1920,
        height: 1080,
        opacity: containerOpacity,
      }}
      viewBox="0 0 1920 1080"
    >
      {waves}
    </svg>
  );
};
