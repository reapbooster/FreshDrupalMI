import React, {useState} from 'react';
import {ConferenceEvent, EventInterface, MeetingEvent, SummitEvent} from "../../DataTypes/Event";
import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import ErrorBoundary from "../../Utility/ErrorBoundary";


/**
 * Implementation of the Data Model
 *
 * @param incoming
 */
function EventDataFactory(incoming: EventInterface) {
  switch(incoming.type){
    case "event--conference":
      return new ConferenceEvent(incoming);
    case "event--meeting":
      return new MeetingEvent(incoming);
    case "event--summit":
      return new SummitEvent(incoming);
    default:
      console.error("Cannot determine Data Class", incoming);
      throw new Error("Cannot Determine Data Class for ".concat(incoming.type));
  }
}

/**
 * Implementation of the View
 *
 * @param incoming
 */
function EventComponentFactory(incoming: EventInterface) {
  switch(incoming.type) {
    case "event--conference":
      return new ConferenceEvent(incoming);
    case "event--meeting":
      return new MeetingEvent(incoming);
    case "event--summit":
      return new SummitEvent(incoming);
    default:
      console.error("Cannot determine Component for", incoming);
      throw new Error("Cannot Determine Component for ".concat(incoming.type));
  }
}



interface EventDisplayProps {
  key?: number;
  data: EventInterface;
  view_mode: string;
}

const EventDisplay: React.FunctionComponent = (props: EventDisplayProps) => {
  const [eventData, setEventData] = useState(EventDataFactory(props.data));
  if (!eventData.hasData()) {
    const ecp = new EntityComponentProps(eventData);
    ecp.getData(eventData.getIncluded())
      .then(res => res.json)
      .then((ajaxData) => {

      });
    return (
      <>
        <Loading />
      </>
    );
  }
  const Component = EventComponentFactory(eventData);
  return (
    <>
      <ErrorBoundary key={props.key ?? 0}>
        <Component data={eventData} view_mode={props.view_mode} />
      </ErrorBoundary>
    </>
  )

}

export {EventDisplay as default, EventDisplayProps, EventDataFactory, EventComponentFactory}
