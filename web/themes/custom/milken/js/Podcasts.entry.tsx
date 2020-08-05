
import * as React from "react";
import * as ReactDOM from "react-dom";
import PodcastBrowser from "components/PodcastBrowser";

const parsedData = JSON.parse(document.querySelector('#podcasts-data > script[type="application/json"][data-drupal-selector="drupal-podcasts-json"]').textContent);
parsedData.data = {};
ReactDOM.render(
  <PodcastBrowser {...parsedData} />,
  document.getElementById('podcasts-component')
);
