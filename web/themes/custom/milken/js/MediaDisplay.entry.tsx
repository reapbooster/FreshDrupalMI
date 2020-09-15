
import * as React from "react";
import * as ReactDOM from "react-dom";
import MediaDisplay from "components/MediaDisplay";

const MediaDetail = document.querySelector('media-detail');

ReactDOM.render(
  <MediaDisplay {...MediaDetail.dataset} />,
  MediaDetail
);
