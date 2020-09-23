import React, { useState } from 'react';
import EventDisplayList from '../EventDisplay/EventDisplayList'
import URLListSource from "../../DataTypes/URLListSource";
import ListSource, {ListComponentSourceInterface} from "../../DataTypes/ListSource";
import Loading from "../Loading";
import JSONApiUrl from "../../DataTypes/JSONApiUrl";

export interface EventsBrowserProps {
  source?: ListComponentSourceInterface
  view_mode: string;
}

export const EventsBrowser = (props: EventsBrowserProps) => {
  var { source } = props;

  const [listSource, setListSource] = useState(source);

  if (listSource instanceof URLListSource && !listSource.items) {
    fetch(listSource.url)
      .then(res => res.json())
      .then(ajaxData => {
        setListSource(new ListSource({
          items: ajaxData.data,
          id: listSource.id,
          url: listSource.url,
          entityTypeId: listSource.entityTypeId,
        }));
      });
    return (<Loading />)
  }
  return (
    <>
      <EventDisplayList
        list={listSource}
        view_mode={"card"} />
    </>
  )
}

export default EventsBrowser
