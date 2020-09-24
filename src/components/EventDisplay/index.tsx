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
import styled,{StyledComponent} from "styled-components";

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
  data: EventInterface;
  view_mode: string;
  key?: number;
  container?: StyledComponent;
}

export const EventDisplay: React.FunctionComponent = (props: EventDisplayProps) => {
  var { data, view_mode, key, container } = props;
  const ContainerDiv = container ?? styled.div`
    max-width: 18rem;
  `;
  if (!data instanceof Event) {
    data = EventDataFactory(data);
  }
  const [ eventData, setEventData ] = useState(data);
  if (!eventData.hasData()) {
    console.debug("Event Does Not Have Data");
    const ecp = new EntityComponentProps(eventData);
    ecp.getData(eventData.getIncluded())
      .then(res => res.json)
      .then((ajaxData) => {
        setEventData(EventDataFactory(ajaxData.data));
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
      <ErrorBoundary key={key ?? 0}>
        <Component
          data={eventData}
          view_mode={view_mode}
          container={ContainerDiv}
        />
      </ErrorBoundary>
    </>
  )

}

export default EventDisplay;
