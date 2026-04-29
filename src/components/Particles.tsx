import { useCurrentFrame, interpolate } from "remotion";

interface ParticlesProps {
  startFrame: number;
  durationInFrames: number;
  count?: number;
  baseColor?: string;
  maxSize?: number;
  driftSpeed?: number;
  opacity?: number;
}

const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export const Particles: React.FC<ParticlesProps> = ({
  startFrame,
  durationInFrames,
  count = 100,
  baseColor = "#ffffff",
  maxSize = 4,
  driftSpeed = 0.5,
  opacity = 0.8,
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  if (localFrame < 0 || localFrame > durationInFrames) return null;

  const containerOpacity = interpolate(
    localFrame,
    [0, 20, durationInFrames - 30, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const particles = Array.from({ length: count }, (_, i) => {
    const x0 = hash(i * 127) * 1920;
    const y0 = hash(i * 271) * 1080;
    const vx = (hash(i * 397) - 0.5) * driftSpeed * 2;
    const vy = (hash(i * 523) - 0.5) * driftSpeed * 2;
    const size = 1 + hash(i * 631) * maxSize;
    const birth = hash(i * 877) * durationInFrames * 0.6;
    const baseOp = opacity * (0.5 + hash(i * 991) * 0.5);

    const age = localFrame - birth;
    if (age < 0) return null;

    const x = ((x0 + vx * age) % 1920 + 1920) % 1920;
    const y = ((y0 + vy * age) % 1080 + 1080) % 1080;

    const fadeIn = interpolate(age, [0, 20], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    const fadeOut = interpolate(
      localFrame,
      [durationInFrames - 30, durationInFrames],
      [1, 0],
      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
    );
    const particleOpacity = baseOp * fadeIn * fadeOut;

    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: x,
          top: y,
          width: size,
          height: size,
          borderRadius: "50%",
          background: baseColor,
          boxShadow: `0 0 ${size * 3}px ${baseColor}`,
          opacity: particleOpacity,
        }}
      />
    );
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: containerOpacity,
      }}
    >
      {particles}
    </div>
  );
};
