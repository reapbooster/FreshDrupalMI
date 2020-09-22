import React from 'react';
import EventDisplayList from '../EventDisplay/EventDisplayList'
import {EventInterface} from '../../DataTypes/Event'

export interface EventsBrowserProps {
  items: Array<EventInterface>
  view_mode: string;
}

export const EventsBrowser = (props: EventsBrowserProps) => {

  return (
    <>
      <h1>Themed Event List Browser Goes here</h1>
    </>
  )
}

export default EventsBrowser
