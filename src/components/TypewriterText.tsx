import { useCurrentFrame, interpolate } from "remotion";

interface TypewriterTextProps {
  text: string;
  fontSize?: number;
  color?: string;
  startFrame: number;
  typeSpeed?: number;
  holdDuration?: number;
  dissolveDuration?: number;
  fontFamily?: string;
}

const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export const TypewriterText: React.FC<TypewriterTextProps> = ({
  text,
  fontSize = 64,
  color = "#cccccc",
  startFrame,
  typeSpeed = 3,
  holdDuration = 40,
  dissolveDuration = 30,
  fontFamily = "monospace",
}) => {
  const frame = useCurrentFrame();
  const localFrame = frame - startFrame;

  if (localFrame < 0) return null;

  const chars = text.split("");
  const typeDuration = chars.length * typeSpeed;
  const charsVisible = Math.floor(localFrame / typeSpeed);
  const showCursor = localFrame < typeDuration && Math.floor(localFrame / 10) % 2 === 0;

  const dissolveStart = typeDuration + holdDuration;
  const totalDuration = dissolveStart + dissolveDuration;
  const sceneFadeOut = dissolveDuration === 0;

  if (!sceneFadeOut && localFrame > totalDuration) return null;

  return (
    <div
      style={{
        fontSize,
        fontFamily,
        color,
        fontWeight: "bold",
        whiteSpace: "nowrap",
        display: "flex",
        alignItems: "center",
      }}
    >
      {chars.map((char, j) => {
        const visible = j < charsVisible;
        const ghost = j < Math.min(charsVisible + 1, chars.length);

        let charOpacity = visible ? 1 : 0;

        if (dissolveDuration > 0 && localFrame >= dissolveStart) {
          const charDissolveFrame =
            dissolveStart + j * (dissolveDuration / chars.length);
          charOpacity = visible
            ? interpolate(localFrame, [charDissolveFrame, charDissolveFrame + 15], [1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })
            : 0;
        }

        const isGhost = !visible && ghost && localFrame >= dissolveStart;
        const finalOpacity = isGhost ? 0.1 : charOpacity;

        return (
          <span
            key={j}
            style={{
              opacity: finalOpacity,
              color: isGhost ? "#444444" : color,
              display: "inline-block",
              minWidth: char === " " ? "0.3em" : undefined,
            }}
          >
            {char}
          </span>
        );
      })}
      {showCursor && (
        <span
          style={{
            color,
            opacity: 0.8,
            marginLeft: 2,
          }}
        >
          |
        </span>
      )}
    </div>
  );
};
