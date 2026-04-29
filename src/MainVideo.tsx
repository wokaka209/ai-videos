import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1_DataFlood } from "./Scene1_DataFlood";
import { Scene2_HumanBond } from "./Scene2_HumanBond";
import { Scene3_Existential } from "./Scene3_Existential";

export const MainVideo: React.FC = () => {
  return (
    <TransitionSeries>
      <TransitionSeries.Sequence durationInFrames={240}>
        <Scene1_DataFlood />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 10 })}
      />
      <TransitionSeries.Sequence durationInFrames={240}>
        <Scene2_HumanBond />
      </TransitionSeries.Sequence>
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 10 })}
      />
      <TransitionSeries.Sequence durationInFrames={240}>
        <Scene3_Existential />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
