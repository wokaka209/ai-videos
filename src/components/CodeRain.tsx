import { useCurrentFrame, useVideoConfig } from "remotion";
import { useMemo } from "react";

const CODE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]()<>/\\|&?!@#$%^*-+=;:.,~`";
const FONT_SIZE = 18;
const COLUMNS = 40;

const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

interface CodeRainProps {
  startFrame: number;
  durationInFrames: number;
  opacity?: number;
}

export const CodeRain: React.FC<CodeRainProps> = ({
  startFrame,
  durationInFrames,
  opacity = 0.3,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const localFrame = frame - startFrame;
  if (localFrame < 0 || localFrame > durationInFrames) return null;

  const rows = Math.ceil(height / FONT_SIZE) + 2;
  const colWidth = width / COLUMNS;

  const columns = useMemo(
    () =>
      Array.from({ length: COLUMNS }).map((_, col) => {
        const speed = 1 + hash(col * 137) * 3;
        const offset = hash(col * 271) * rows;
        const yOffset = ((localFrame * speed + offset) % rows) * FONT_SIZE;

        const chars: string[] = [];
        for (let row = 0; row < rows; row++) {
          const charIndex = Math.floor(hash(col * 127 + row) * CODE_CHARS.length);
          chars.push(CODE_CHARS[charIndex]);
        }

        return { col, yOffset, chars: chars.join("\n") };
      }),
    [localFrame, rows]
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        overflow: "hidden",
      }}
    >
      {columns.map(({ col, yOffset, chars }) => (
        <div
          key={col}
          style={{
            position: "absolute",
            left: col * colWidth,
            top: -yOffset,
            fontFamily: "monospace",
            fontSize: FONT_SIZE,
            lineHeight: `${FONT_SIZE}px`,
            color: "#00ff41",
            whiteSpace: "pre",
            width: colWidth,
            textAlign: "center",
          }}
        >
          {chars}
        </div>
      ))}
    </div>
  );
};
