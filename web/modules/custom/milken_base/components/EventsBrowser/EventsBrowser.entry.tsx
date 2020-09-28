
import React from "react";
import ReactDOM from "react-dom";
import EventsBrowser from "Components/EventsBrowser";

const EventsBrowserContainer = document.querySelector('events-browser');

const EventsBrowserSource = {
  id: EventsBrowserContainer.dataset.id,
  type: EventsBrowserContainer.dataset.type,
  view_mode: EventsBrowserContainer.dataset.viewMode,
  url: EventsBrowserContainer.dataset.url
}

ReactDOM.render(
  <EventsBrowser source={EventsBrowserSource} />,
  EventsBrowserContainer
);


