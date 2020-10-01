import React, { useState } from "react";
import MediaDisplayList from "../MediaDisplay/MediaDisplayList";
import ListSource, {
  ListComponentSourceInterface,
} from "../../DataTypes/ListSource";
import Loading from "../Loading";
import { CardColumns } from "react-bootstrap";
import styled from "styled-components";

const IndividualVideoContainer = styled.div`
  max-width: 18rem;
`;

export interface VideosBrowserProps {
  source: ListComponentSourceInterface;
  view_mode: string;
}

export const VideosBrowser = (props: VideosBrowserProps) => {
  console.debug("VideosBrowser", props);
  const source = new ListSource(props.source);
  const [videoSource, setVideoSource] = useState(source);
  console.debug(
    "Video Source",
    videoSource,
    videoSource.hasData(),
    videoSource.items
  );
  if (!videoSource.hasData()) {
    videoSource.refreshItems().then((items) => {
      console.debug("Coming home", items, this);
      const toSet = new ListSource(videoSource.toObject());
      console.debug("after clone", toSet);
      toSet.items = items;
      setVideoSource(toSet);
    });
    return <Loading />;
  }
  console.debug("VideosBrowser: Source W/Data", videoSource);
  return (
    <>
      <CardColumns>
        <MediaDisplayList
          list={videoSource}
          view_mode={props.view_mode ?? "card"}
          container={IndividualVideoContainer}
        />
      </CardColumns>
    </>
  );
};

export default VideosBrowser;
