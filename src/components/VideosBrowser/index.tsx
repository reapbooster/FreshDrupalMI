import React from 'react';
import List from '../List';

const VideoBrowser = (props) => {
  return (
    <>
      <List
        id="ExploreVideos"
        url="/jsonapi/media/video?jsonapi_include=true"
        entityTypeId="media"
        bundle="video"
      />
    </>
  )
}

export default VideoBrowser;
