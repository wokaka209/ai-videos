import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
import { MainVideo2 } from "./MainVideo2";
import "./style.css";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="AISoul"
        component={MainVideo}
        durationInFrames={700}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="AIMonologue"
        component={MainVideo2}
        durationInFrames={460}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
