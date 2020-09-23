
import * as React from "react";
import * as ReactDOM from "react-dom";
import VideosBrowser from "components/VideosBrowser";

const VideosBrowserContainer = document.querySelector('videos-browser');

const VideosBrowserSource = {
  id: VideosBrowserContainer.dataset.id,
  type: VideosBrowserContainer.dataset.type,
  view_mode: VideosBrowserContainer.dataset.viewMode,
  url: VideosBrowserContainer.dataset.url
}

ReactDOM.render(
  <VideosBrowser source={VideosBrowserSource} />,
  VideosBrowserContainer
);
