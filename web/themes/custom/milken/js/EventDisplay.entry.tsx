
import * as React from "react";
import * as ReactDOM from "react-dom";
import EventDisplay from "components/EventDisplay";

const EventDetail = document.querySelector('event-detail');

console.debug("Event Detail:", EventDetail.dataset);

ReactDOM.render(
  <EventDisplay data={EventDetail.dataset} view_mode={"full"} />,
  EventDetail
);
