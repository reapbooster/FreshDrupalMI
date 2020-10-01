import React, { useState } from "react";
import EventsDisplayList from "./EventsDisplayList";
import Loading from "../Loading";
import { CardColumns } from "react-bootstrap";
import EventsListSource from "./EventsListSource";

export interface EventsBrowserProps {
  source?: EventsListSource;
  view_mode: string;
}

export const EventsBrowser = (props: EventsBrowserProps) => {
  console.debug("EventsBrowser: props", props);
  const { source, view_mode } = props;
  const DataObject = new EventsListSource(source);
  const [eventsListSource, setEventsListSource] = useState(DataObject);
  console.debug("List Source:", eventsListSource);

  if (!eventsListSource.hasData()) {
    eventsListSource.refresh().then((cloned) => {
      setEventsListSource(cloned);
    });
    return <Loading />;
  }

  console.debug("listSource.items should be populated", eventsListSource);
  return (
    <>
      <CardColumns>
        <EventsDisplayList
          list={eventsListSource.items}
          view_mode={view_mode}
        />
      </CardColumns>
    </>
  );
};

export default EventsBrowser;
