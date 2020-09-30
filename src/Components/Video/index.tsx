import React from "react";
import * as DataObject from "../../DataTypes/MediaVideo";

interface VideoProps {
  data: DataObject.MediaVideoInterface;
  view_mode: string;
}

const Video: React.FunctionComponent = (props: VideoProps) => {
  return (
    <div>
      <h1>{props.data.label}</h1>
    </div>
  );
};

export default Video;
