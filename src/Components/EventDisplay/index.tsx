import React, { useState } from "react";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import { EventInterface } from "../../DataTypes/Event";

import styled, { StyledComponent } from "styled-components";
import {EventDataFactory} from "./EventFactories";


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

export const EventDisplay: React.FunctionComponent = (
  props: EventDisplayProps
) => {
  const { data, view_mode, key, container } = props;
  const ContainerDiv =
    container ??
    styled.div`
      max-width: 18rem;
    `;
  const DataObject = EventDataFactory(data);

  const [eventData, setEventData] = useState(DataObject);
  if (!eventData.hasData()) {
    console.debug("Event Does Not Have Data", eventData);
    const ecp = new EntityComponentProps(eventData);
    ecp
      .getData(eventData.getIncluded())
      .then(res => res.json())
      .then((ajaxData) => {
        setEventData(EventDataFactory(ajaxData.data));
      });
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <Error
  )
  switch(view_mode) {
    case "card":
      return


  }
};

export default EventDisplay;
