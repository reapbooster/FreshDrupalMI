import React from "react";
import { EntityInterface } from "../../DataTypes/Entity";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import EventDisplay from ".";
import styled, { StyledComponent } from "styled-components";
import { EventInterface } from "../../DataTypes/Event";
import EventCardDisplay from "../EventDisplay/EventCardDisplay";

/**
 * Event List
 * Generic display of events in a list when the bundle is unknown.
 *
 *
 *
 */

const EventsDisplayListContainerDiv = styled.div`
  max-width: 18rem;
`;

export interface EventDisplayListProps {
  list: Array<EventInterface>;
  view_mode: string;
  container?: StyledComponent;
}

export const EventsDisplayList = (props: EventDisplayListProps) => {
  console.debug("EventDisplayList", props);
  const { list, view_mode, container } = props;
  const ContainerDiv =
    container ??
    styled.div`
      max-width: 18rem;
    `;
  return (
    list.map((item: EntityInterface, key: number) => {
      return (
        <>
          <ErrorBoundary key={key}>
            <EventCardDisplay data={item} />
          </ErrorBoundary>
        </>
      );
    }) ?? []
  );
};

EventsDisplayList.defaultProps = {
  list: [],
  view_mode: "card",
  container: EventsDisplayListContainerDiv,
};

export default EventsDisplayList;
