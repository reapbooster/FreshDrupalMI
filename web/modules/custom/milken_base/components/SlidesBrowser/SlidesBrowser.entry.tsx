
import React from "react";
import ReactDOM from "react-dom";
import SlidesBrowser from "components/SlideBrowser";

const SlidesBrowserContainer = document.querySelector('slides-browser');

const SlidesBrowserSource = {
  id: SlidesBrowserContainer.dataset.id,
  type: SlidesBrowserContainer.dataset.type,
  view_mode: SlidesBrowserContainer.dataset.viewMode,
  url: SlidesBrowserContainer.dataset.url
}

ReactDOM.render(
  <SlidesBrowser source={SlidesBrowserSource} />,
  SlidesBrowserContainer
);
