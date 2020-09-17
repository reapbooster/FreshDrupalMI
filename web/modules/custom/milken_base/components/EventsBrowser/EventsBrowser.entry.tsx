
import * as React from "react";
import * as ReactDOM from "react-dom";
import EventsBrowser from "components/EventsBrowser";

const source = document.querySelector('event-browser-source');

ReactDOM.render(
  <EventsBrowser source={source.dataSet ?? null} />,
  document.getElementById('main-wrapper')
);
