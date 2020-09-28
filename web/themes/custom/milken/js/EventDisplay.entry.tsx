
import React from "react";
import ReactDOM from "react-dom";
import EventDisplay from "Components/EventDisplay";

const EventDetail = document.querySelector('event-detail');

console.debug("Event Detail:", EventDetail.dataset);

ReactDOM.render(
  <EventDisplay data={EventDetail.dataset} view_mode={"full"} />,
  EventDetail
);
