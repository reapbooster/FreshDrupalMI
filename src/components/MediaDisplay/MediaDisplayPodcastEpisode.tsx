import React from 'react';
import MediaPodcastEpisode, {MediaPodcastEpisodeInterface} from '../../DataTypes/MediaPodcastEpisode'
import PodcastEpisode from '../PodcastEpisode';

interface MediaDisplayPodcastEpisodeProps {
  data: MediaPodcastEpisodeInterface;
  view_mode: string;
}

const MediaDisplayPodcastEpisode : React.FunctionComponent = (props) => {


  return (
    <>
      <PodcastEpisode {...props} />
    </>
  );

}

export default MediaDisplayPodcastEpisode;
