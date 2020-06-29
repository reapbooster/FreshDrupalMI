
import * as React from "react";
import * as ReactDOM from "react-dom";
import LandingPage from "components/LandingPage";


const parsedData = JSON.parse(document.querySelector('#node-data > script[type="application/json"][data-drupal-selector="drupal-node-json"]').textContent);
parsedData.data = {};

ReactDOM.render(
  <LandingPage {...parsedData} />,
  document.getElementById('main-wrapper')
);


