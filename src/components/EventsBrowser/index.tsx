import React, { useState } from 'react';
import EventDisplayList from '../EventDisplay/EventDisplayList'
import ListSource, {ListComponentSourceInterface} from "../../DataTypes/ListSource";
import Loading from "../Loading";
import styled from 'styled-components';
import {CardColumns} from 'react-bootstrap';

const ContainerDiv = styled.div`
  max-width: 18rem;
`;

export interface EventsBrowserProps {
  source?: ListComponentSourceInterface
  view_mode: string;
}

export const EventsBrowser = (props: EventsBrowserProps) => {
  console.debug('EventsBrowser: props', props);
  var { source, view_mode } = props;
  const DataObject = new ListSource(source);
  var [listSource, setListSource] = useState(DataObject);
  console.debug("List Source:", listSource);
  if (!listSource.hasData()) {
    listSource.refreshItems()
      .then((items) => {
        var toSet = new ListSource(ListSource.clone());
        console.debug("after clone", toSet);
        toSet.items = items;
        setListSource(toSet);
      });
    return (<Loading />);
  }
  console.debug("listSource.items should be populated", listSource);
  return (
    <>
    <CardColumns>
      <EventDisplayList
        list={listSource}
        view_mode={props.view_mode}
        container={ContainerDiv}
      />
      </CardColumns>
    </>
  )
}

export default EventsBrowser
