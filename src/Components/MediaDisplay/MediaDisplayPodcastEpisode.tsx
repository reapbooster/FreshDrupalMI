import React from "react";
import { MediaPodcastEpisodeInterface } from "../../DataTypes/MediaPodcastEpisode";
import PodcastEpisodeDisplay from "../PodcastEpisodeDisplay";

interface MediaDisplayPodcastEpisodeProps {
  data: MediaPodcastEpisodeInterface;
  view_mode: string;
}

const MediaDisplayPodcastEpisode: React.FunctionComponent = (
  props: MediaDisplayPodcastEpisodeProps
) => {
  return (
    <>
      <PodcastEpisodeDisplay {...props} />
    </>
  );
};

export default MediaDisplayPodcastEpisode;
