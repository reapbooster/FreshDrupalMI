import React from "react";
import { EntityInterface } from "../../DataTypes/Entity";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import { ListableInterface } from "../../DataTypes/Listable";
import EventDisplay from ".";

export interface EventDisplayListProps {
  list: ListableInterface;
  view_mode: string;
}

export const EventDisplayList: React.FunctionComponent = (props: EventDisplayListProps) => {
  const {list, view_mode} = props;
  return list.getItems().map((item: EntityInterface, key: number) => {
    return (
      <>
        <ErrorBoundary key={key}>
          <EventDisplay
            data={item}
            view_mode={view_mode}
          />
        </ErrorBoundary>
      </>
    )
  });
}

export default EventDisplayList;
