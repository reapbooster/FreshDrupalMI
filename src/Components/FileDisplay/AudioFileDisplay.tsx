import React, { useState } from "react";
import { StyledComponent } from "styled-components";
import { AudioFile } from "../../DataTypes/AudioFile";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";

export interface AudioFileDisplayProps {
  data: AudioFile;
  view_mode: string;
  container: StyledComponent;
}

export const AudioFileDisplay = (props: AudioFileDisplayProps) => {
  const { data } = props;
  const DataObject = new AudioFile(data);
  const [audioData, setAudioData] = useState(DataObject);
  const ecp = new EntityComponentProps(audioData);
  ecp
    .getData()
    .then((res) => res.json())
    .then((ajaxData) => {
      const newDO = new AudioFile(ajaxData.data);
      setAudioData(newDO);
    });
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
  }
};

export default AudioFileDisplay;
