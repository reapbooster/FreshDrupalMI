import React from 'react';
import MediaPodcastEpisode, {MediaPodcastEpisodeInterface} from '../../DataTypes/MediaPodcastEpisode'
import PodcastEpisodeDisplay from '../PodcastEpisodeDisplay';

interface MediaDisplayPodcastEpisodeProps {
  data: MediaPodcastEpisodeInterface;
  view_mode: string;
}

const MediaDisplayPodcastEpisode : React.FunctionComponent = (props) => {


  return (
    <>
      <PodcastEpisodeDisplay {...props} />
    </>
  );

}

export default MediaDisplayPodcastEpisode;
