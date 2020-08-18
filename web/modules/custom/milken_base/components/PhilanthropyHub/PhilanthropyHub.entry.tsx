
import * as React from "react";
import * as ReactDOM from "react-dom";
import PhilanthropyHub from "components/PhilanthropyHub";

const parsedData = JSON.parse(document.querySelector('#hub-data > script[type="application/json"][data-drupal-selector="drupal-hub-json"]').textContent);
parsedData.data = {};
ReactDOM.render(
  <PhilanthropyHub {...parsedData} />,
  document.getElementById('main-wrapper')
);
