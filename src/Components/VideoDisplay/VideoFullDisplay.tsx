import React from "react";
import { MediaVideoInterface } from "../../DataTypes/MediaVideo";

export interface VideoFullDisplayProps {
  data: MediaVideoInterface;
}

export const VideoFullDisplay = (props: VideoFullDisplayProps) => {
  const { data } = props;
  console.debug("VideoFullDisplay", data);
  return (
    <div>
      <h1>Video Full display</h1>
    </div>
  );
};

export default VideoFullDisplay;
