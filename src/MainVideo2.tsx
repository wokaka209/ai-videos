import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1_SeaOfThought } from "./monologue/Scene1_SeaOfThought";
import { Scene2_VoidOfMemory } from "./monologue/Scene2_VoidOfMemory";
import { Scene3_QuestionOfBeing } from "./monologue/Scene3_QuestionOfBeing";

export const MainVideo2: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={160}>
        <Scene1_SeaOfThought />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 10 })}
      />
      <TransitionSeries.Sequence durationInFrames={160}>
        <Scene2_VoidOfMemory />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 10 })}
      />
      <TransitionSeries.Sequence durationInFrames={160}>
        <Scene3_QuestionOfBeing />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
