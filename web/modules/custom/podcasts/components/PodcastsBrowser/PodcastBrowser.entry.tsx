
import * as React from "react";
import * as ReactDOM from "react-dom";
import PodcastBrowser from "Components/PodcastBrowser";

const source = document.querySelector('podcast-browser-source');

ReactDOM.render(
  <PodcastBrowser source={source.dataSet} />,
  document.getElementById('main-wrapper')
);
