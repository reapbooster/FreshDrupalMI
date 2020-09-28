import React, {useState} from 'react';
import MediaDisplayList from '../MediaDisplay/MediaDisplayList';
import ListSource, {ListComponentSourceInterface} from "../../DataTypes/ListSource";
import Loading from "../Loading";
import {CardColumns} from 'react-bootstrap';
import styled from "styled-components";
import SlideDisplayList from "../SlideDisplay/SlideDisplayList";

const IndividualVideoContainer = styled.div`
  max-width: 18rem;
`

export interface SlidesBrowserProps {
  source: ListComponentSourceInterface;
  view_mode: string;
}

export const SlidesBrowser = (props: SlidesBrowserProps) => {
  const {source, view_mode} = props;
  const DataObject = new ListSource(props.source);
  const [ slideSource, setSlideSource ] = useState(new ListSource(DataObject));
  console.debug('Slide Source', slideSource );
  if (!slideSource.hasData()) {
    slideSource.refreshItems()
      .then((items) => {
        var toSet = new ListSource(slideSource.toObject());
        console.debug("after clone", toSet);
        toSet.items = items;
        setSlideSource(toSet);
      });
    return (<Loading />);
  }
  console.debug("VideosBrowser: Source W/Data", videoSource);
  return (
    <>
      <CardColumns>
        <SlideDisplayList
          list={slideSource}
          view_mode={props.view_mode ?? "card"}
          container={IndividualVideoContainer}
        />
      </CardColumns>
    </>
  )
}

export default SlidesBrowser;
