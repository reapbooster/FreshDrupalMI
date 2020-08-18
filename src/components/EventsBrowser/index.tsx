import React from 'react';
import List from '../List';

const EventsBrowser = (props) => {
  return (
    <>
      <List
        id="ExploreEvents"
        url="/jsonapi/event/conference?jsonapi_include=true"
        entityTypeId="event"
        bundle="conference"
      />
    </>
  )
}

export default EventsBrowser;
