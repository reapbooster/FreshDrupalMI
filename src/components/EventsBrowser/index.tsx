import React from 'react';
import EventDisplayList from '../EventDisplay/EventDisplayList'
import {EventInterface} from '../../DataTypes/Event'

interface EventsBrowserProps {
  items: Array<EventInterface>
  view_mode: string;
}

const EventsBrowser = (props: EventsBrowserProps) => {
  return (
    <>
      <EventDisplayList
        {...props}
      />
    </>
  )
}

export {EventsBrowser as default};
