import { useCurrentFrame } from "remotion";
import React from "react";

const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

interface ColorShiftProps {
  children: React.ReactNode;
  intensity?: number;
}

export const ColorShift: React.FC<ColorShiftProps> = ({
  children,
  intensity = 1,
}) => {
  const frame = useCurrentFrame();

  const shiftPeriod = 6 + Math.floor(hash(Math.floor(frame / 12)) * 6);
  const shiftFrame = Math.floor(frame / shiftPeriod);
  const shouldShift = hash(shiftFrame + 999) > 0.4;

  const rX = shouldShift ? (hash(shiftFrame) - 0.5) * 8 * intensity : 0;
  const rY = shouldShift ? (hash(shiftFrame + 111) - 0.5) * 4 * intensity : 0;
  const bX = shouldShift ? (hash(shiftFrame + 222) - 0.5) * 8 * intensity : 0;
  const bY = shouldShift ? (hash(shiftFrame + 333) - 0.5) * 4 * intensity : 0;

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: rY,
          left: rX,
          filter: "grayscale(1) sepia(1) hue-rotate(-50deg) saturate(5)",
          mixBlendMode: "screen",
          opacity: shouldShift ? 0.6 : 0,
        }}
      >
        {children}
      </div>
      <div
        style={{
          position: "absolute",
          top: bY,
          left: bX,
          filter: "grayscale(1) sepia(1) hue-rotate(200deg) saturate(5)",
          mixBlendMode: "screen",
          opacity: shouldShift ? 0.6 : 0,
        }}
      >
        {children}
      </div>
      <div style={{ position: "relative" }}>{children}</div>
    </div>
  );
};
