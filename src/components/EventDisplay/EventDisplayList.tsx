import React, { useState } from "react";
import { EntityInterface } from "../../DataTypes/Entity";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import EventDisplay from ".";
import {ListableInterface} from "../../DataTypes/Listable";
import styled,{StyledComponent} from "styled-components";


/**
 * Event List
 * Generic display of events in a list.
 * 
 * 
 * 
 */


export interface EventDisplayListProps {
  list: ListableInterface;
  view_mode: string;
  container: StyledComponent,
}

export const EventDisplayList: React.FunctionComponent = (props: EventDisplayListProps) => {
  console.debug("EventDisplayList", props);
  const {list, view_mode, container} = props;
  const ContainerDiv = container ?? styled.div`
    max-width: 18rem;
  `;
  return list.items?.map((item: EntityInterface, key: number) => {
    return (
      <>
        <ErrorBoundary key={key}>
          <EventDisplay
            data={item}
            view_mode={view_mode}
            container={ContainerDiv}
          />
        </ErrorBoundary>
      </>
    )
  });

}

export default EventDisplayList;
