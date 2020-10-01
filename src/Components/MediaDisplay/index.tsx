import React, { useState } from "react";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import { MediaInterface } from "../../DataTypes/Media";
import MediaDisplayImage from "./MediaDisplayImage";
import MediaDisplayVideo from "./MediaDisplayVideo";
import MediaDisplayReport from "./MediaDisplayReport";
import MediaDisplayPodcastEpisode from "./MediaDisplayPodcastEpisode";
import MediaVideo from "../../DataTypes/MediaVideo";
import MediaImage from "../../DataTypes/MediaImage";
import MediaReport from "../../DataTypes/MediaReport";
import MediaPodcastEpisode from "../../DataTypes/MediaPodcastEpisode";

/**
 * Create the Data Model
 *
 * @param incoming: MediaInterface
 */
export function MediaDataFactory(incoming: MediaInterface): MediaInterface {
  console.debug("MediaDataFactory", incoming);
  switch (incoming.type) {
    case "media--video":
      return new MediaVideo(incoming);
    case "media--image":
      return new MediaImage(incoming);
    case "media--report":
      return new MediaReport(incoming);
    case "media--podcast_episode":
      return new MediaPodcastEpisode(incoming);
    default:
      console.error("Cannot determine Data Class", incoming);
      throw new Error("Cannot Determine Data Class for ".concat(incoming.type));
  }
}

/**
 * Create the View Component
 *
 * @param incoming: MediaInterface
 */
export function MediaComponentFactory(incoming: MediaInterface) {
  console.debug("MediaComponentFactory", incoming);
  switch (incoming.type) {
    case "media--video":
      return MediaDisplayVideo;
    case "media--image":
      return MediaDisplayImage;
    case "media--report":
      return MediaDisplayReport;
    case "media--podcast":
      return MediaDisplayPodcastEpisode;
    default:
      console.error("cannot find component", incoming);
      throw new Error(
        "Cannot find component for props.type ".concat(incoming.type)
      );
  }
}

/**
 * Create the Controller
 *
 * @param props: MediaDisplayProps
 */

export interface MediaDisplayProps {
  key?: number;
  data: MediaInterface;
  view_mode: string;
}

export const MediaDisplay: React.FunctionComponent = (
  props: MediaDisplayProps
) => {
  const { key, data, view_mode } = props;
  const [mediaData, setMediaData] = useState(MediaDataFactory(data));
  console.debug("MediaDisplay", props, mediaData);
  if (!mediaData.hasData()) {
    const ecp = new EntityComponentProps(mediaData);
    ecp
      .getData(mediaData.getIncluded())
      .then((res) => res.json())
      .then((remoteData) => {
        console.debug("Media Remote Data", remoteData);
        setMediaData(MediaDataFactory(remoteData.data));
      });
    return (
      <div>
        <Loading />
      </div>
    );
  }
  const Component = MediaComponentFactory(mediaData);
  console.debug("get MediaDisplayComponent", Component);
  return (
    <ErrorBoundary key={key ?? 0}>
      <Component
        data={mediaData}
        view_mode={view_mode}
        style={{ width: "18rem" }}
      />
    </ErrorBoundary>
  );
};

export default MediaDisplay;
