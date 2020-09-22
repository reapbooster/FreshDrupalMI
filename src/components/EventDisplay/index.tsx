import React, {useState} from 'react';
import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import {EventInterface} from '../../DataTypes/Event';
import EventConference from "../../DataTypes/EventConference";
import EventMeeting from "../../DataTypes/EventMeeting";
import EventSummit from "../../DataTypes/EventSummit";
import EventConferenceDisplay from './EventConferenceDisplay';
import EventSummitDisplay from './EventSummitDisplay';
import EventMeetingDisplay from './EventMeetingDisplay';

/**
 * Implementation of the Data Model
 *
 * @param incoming
 */
export function EventDataFactory(incoming: EventInterface) {
  switch(incoming.type){
    case "event--conference":
      return new EventConference(incoming);
    case "event--meeting":
      return new EventMeeting(incoming);
    case "event--summit":
      return new EventSummit(incoming);
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
export function EventComponentFactory(incoming: EventInterface) {
  switch(incoming.type) {
    case "event--conference":
      return EventConferenceDisplay;
    case "event--meeting":
      return EventMeetingDisplay;
    case "event--summit":
      return EventSummitDisplay;
    default:
      console.error("Cannot determine Component for", incoming);
      throw new Error("Cannot Determine Component for ".concat(incoming.type));
  }
}


/**
 * implementation of the Controller
 *
 * @param EventDisplayProps
 */
export interface EventDisplayProps {
  key?: number;
  data: EventInterface;
  view_mode: string;
}

export const EventDisplay: React.FunctionComponent = (props: EventDisplayProps) => {
  const [ eventData, setEventData ] = useState(EventDataFactory(props.data));
  if (!eventData.hasData()) {
    const ecp = new EntityComponentProps(eventData);
    ecp.getData(eventData.getIncluded())
      .then(res => res.json)
      .then((ajaxData) => {
        setEventData(EventDataFactory(props.date))
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

export default EventDisplay;
