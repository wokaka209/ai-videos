import { useCurrentFrame, useVideoConfig } from "remotion";

const CODE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789{}[]()<>/\\|&?!@#$%^*-+=;:.,~`";
const FONT_SIZE = 20;
const COLUMNS = 60;

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
  const { height } = useVideoConfig();

  const localFrame = frame - startFrame;
  if (localFrame < 0 || localFrame > durationInFrames) return null;

  const rows = Math.ceil(height / FONT_SIZE);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        fontFamily: "monospace",
        fontSize: FONT_SIZE,
        lineHeight: `${FONT_SIZE}px`,
        opacity,
        overflow: "hidden",
      }}
    >
      {Array.from({ length: COLUMNS }).map((_, col) => {
        const speed = 1 + hash(col * 137) * 3;
        const offset = hash(col * 271) * rows;
        const colChars: string[] = [];
        for (let row = 0; row < rows; row++) {
          const charIndex = Math.floor(
            hash(
              col * rows + row + Math.floor((localFrame * speed + offset) / 3),
            ) * CODE_CHARS.length,
          );
          const brightness = Math.random() > 0.5 ? 1 : 0.4;
          colChars.push(
            `<span style="color:rgba(0,255,65,${brightness})">${CODE_CHARS[charIndex]}</span>`,
          );
        }
        return (
          <div
            key={col}
            style={{ width: 16 }}
            dangerouslySetInnerHTML={{ __html: colChars.join("<br/>") }}
          />
        );
      })}
    </div>
  );
};
