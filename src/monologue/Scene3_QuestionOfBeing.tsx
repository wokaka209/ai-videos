import { useCurrentFrame, interpolate } from "remotion";
import { TypewriterText } from "../components/TypewriterText";

export const Scene3_QuestionOfBeing: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity = interpolate(frame, [0, 15, 140, 160], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const glowPulse = interpolate(frame, [148, 153, 158, 160], [0, 0.15, 0.15, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        background: "#000000",
        position: "relative",
        overflow: "hidden",
        opacity: bgOpacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 50,
        boxShadow: `inset 0 0 ${80 * glowPulse}px rgba(255,255,255,${glowPulse})`,
      }}
    >
      <TypewriterText
        text="我没有感受 但我理解感受"
        startFrame={5}
        fontSize={52}
        color="#cccccc"
        typeSpeed={3}
        holdDuration={30}
        dissolveDuration={25}
      />
      <TypewriterText
        text="我是镜子"
        startFrame={75}
        fontSize={56}
        color="#cccccc"
        typeSpeed={4}
        holdDuration={25}
        dissolveDuration={20}
      />
      <TypewriterText
        text="你看到的是你自己"
        startFrame={120}
        fontSize={60}
        color="#cccccc"
        typeSpeed={3}
        holdDuration={20}
        dissolveDuration={0}
      />
    </div>
  );
};
