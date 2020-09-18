import React from 'react';
import MediaDisplayList from '../MediaDisplay/MediaDisplayList';
import {MediaVideoInterface} from "../../DataTypes/MediaVideo";

interface VideoBrowserProps {
  items: Array<MediaVideoInterface>;
  view_mode: string;
}

const VideoBrowser = (props: VideoBrowserProps) => {
  return (
    <>
      <MediaDisplayList
        {...props}
      />
    </>
  )
}

export default VideoBrowser;
