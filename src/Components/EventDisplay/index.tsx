import React, { useState } from "react";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import { EventInterface } from "../../DataTypes/Event";
import { EventCardDisplay } from "./EventCardDisplay";
import { EventFullDisplay } from "./EventFullDisplay";
import styled, { StyledComponent } from "styled-components";
import { EventDataFactory } from "./EventFactories";

/**
 * implementation of the Controller
 *
 * @param EventDisplayProps
 */
export interface EventDisplayProps {
  data: EventInterface;
  view_mode: string;
  key?: number;
}

export const EventDisplay = (props: EventDisplayProps) => {
  const { data, view_mode, key } = props;
  const DataObject = EventDataFactory(data);
  const [eventData, setEventData] = useState(DataObject);
  if (!eventData.hasData()) {
    console.debug("Event Does Not Have Data", eventData);
    const ecp = new EntityComponentProps(eventData);
    ecp
      .getData(eventData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        const DataObject = EventDataFactory(ajaxData.data);
        setEventData(DataObject);
      });
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <ErrorBoundary>
      <EventDisplayComponentChooser data={eventData} view_mode={view_mode} />
    </ErrorBoundary>
  );
};

const EventDisplayComponentChooser = ({ data, view_mode, key }) => {
  console.debug("EventDisplayComponentChooser => ", data, view_mode);
  switch (view_mode) {
    case "card":
      return <EventCardDisplay data={data} key={key} />;
    case "full":
      return <EventFullDisplay data={data} key={key} />;
    default:
      throw new Error("No valid mode value.", view_mode);
  }
};

EventDisplayComponentChooser.defaultProps = {
  data: {},
  view_mode: "dont-render",
  key: 0,
};

export default EventDisplay;
