import { Composition } from "remotion";
import { MainVideo } from "./MainVideo";
import "./style.css";

export const RemotionRoot = () => {
  return (
    <Composition
      id="AISoul"
      component={MainVideo}
      durationInFrames={700}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
