import React, {useState} from 'react';
import MediaDisplayList from '../MediaDisplay/MediaDisplayList';
import {MediaReportInterface} from "../../DataTypes/MediaReport";
import ListSource from "../../DataTypes/ListSource";
import Loading from "../Loading";
import styled,{StyledComponent} from "styled-components";

export interface ResportsBrowserProps {
  source: Array<MediaReportInterface>;
  view_mode: string;
  container?: StyledComponent;
}

export const ReportsBrowser = (props: ResportsBrowserProps) => {
  var {source, view_mode, container } = props;
  if (!source instanceof ListSource) {
    source = new ListSource(source);
  }
  const ContainerDiv = container ?? styled.div`
    max-width: 18rem;
  `;

  const [ reportsSource, setReportsSource ] = useState(source);
  if (!reportsSource.hasData()) {
    reportsSource.refreshItems()
      .then((items) => {
        console.debug("Coming home", items, this);
        var toSet = new ListSource(reportsSource.toObject());
        console.debug("after clone", toSet);
        toSet.items = items;
        setReportsSource(toSet);
      });
    return (<Loading />);
  }
  console.debug("VideosBrowser: Source W/Data", reportsSource);
  return (
    <>
      <MediaDisplayList
        list={reportsSource}
        view_mode={view_mode}
        container={ContainerDiv} />
    </>
  )
}

export { ReportsBrowser as default } ;
