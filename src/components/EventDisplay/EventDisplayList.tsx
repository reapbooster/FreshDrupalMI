import React from 'react';
import { EventInterface } from '../../DataTypes/Event'
import EventDisplay from ".";

export interface EventDisplayListProps {
  items: Array<EventInterface>;
  view_mode: string;
}


export const EventDisplayList: React.FunctionComponent = (props: EventDisplayListProps) => {
  return (
    <>
      {props.items.map((item: EventInterface, key: number) => {
        return (
          <EventDisplay
            data={item}
            key={key}
            view_mode={props.view_mode}
          />
        )
      })}
    </>
  )
}

export default EventDisplayList;
