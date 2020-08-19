
import * as React from "react";
import * as ReactDOM from "react-dom";
import Event from "components/Event";

const parsedData = JSON.parse(document.querySelector('#event-data > script[type="application/json"][data-drupal-selector="drupal-event-json"]').textContent);
parsedData.data = {};
ReactDOM.render(
  <Event {...parsedData} />,
  document.getElementById('main-wrapper')
);
