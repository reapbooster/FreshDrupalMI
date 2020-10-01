import React, { useState } from "react";
import AudioFile from "../../DataTypes/AudioFile";
import { StyledComponent } from "styled-components";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";

export interface AudioFileDisplayProps {
  data: AudioFile;
  view_mode: string;
  container: StyledComponent;
}

export const AudioFileDisplay = (props: AudioFileDisplayProps) => {
  let { data, view_mode, container } = props;

  if (data.uri?.url) {
    return (
      <>
        <audio
          controls
          src={data.uri?.url}
          style={{ width: "100%", marginBottom: "2rem" }}
        />
      </>
    );
  } else {
    if (!data instanceof AudioFile) {
      data = new AudioFile(data);
    }
    const [audioData, setAudioData] = useState(data);
    const ecp = new EntityComponentProps(audioData);
    ecp
      .getData()
      .then((res) => res.json())
      .then((audioData) => {
        setAudioData(new AudioFile(audioData.data));
      });
  }
};

export default AudioFileDisplay;
