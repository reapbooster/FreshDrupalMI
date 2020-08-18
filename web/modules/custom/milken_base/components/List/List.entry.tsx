
import * as React from "react";
import * as ReactDOM from "react-dom";
import List from "components/List";

const parsedData = JSON.parse(document.querySelector('#list-data > script[type="application/json"][data-drupal-selector="drupal-list-json"]').textContent);
parsedData.data = {};
ReactDOM.render(
  <List {...parsedData} />,
  document.getElementById('main-wrapper')

);
