import React, { useState } from "react";
import { CardColumns } from "react-bootstrap";
import MediaDisplayList from "../MediaDisplay/MediaDisplayList";
import { MediaReportInterface } from "../../DataTypes/MediaReport";
import ListSource from "../../DataTypes/ListSource";
import Loading from "../Loading";
import styled, { StyledComponent } from "styled-components";

export interface ResportsBrowserProps {
  source: Array<MediaReportInterface>;
  view_mode: string;
  container?: StyledComponent;
}

export const ReportsBrowser = (props: ResportsBrowserProps) => {
  const { source, view_mode, container } = props;
  const DataObject = new ListSource(source);
  const ContainerDiv =
    container ??
    styled.div`
      max-width: 18rem;
    `;
  const [reportsSource, setReportsSource] = useState(DataObject);
  if (!reportsSource.hasData()) {
    reportsSource.refreshItems().then((items) => {
      console.debug("Coming home", items, this);
      const toSet = new ListSource(reportsSource.toObject());
      console.debug("after clone", toSet);
      toSet.items = items;
      setReportsSource(toSet);
    });
    return <Loading />;
  }
  console.debug("VideosBrowser: Source W/Data", reportsSource);
  return (
    <>
      <CardColumns>
        <MediaDisplayList
          list={reportsSource}
          view_mode={view_mode}
          container={ContainerDiv}
        />
      </CardColumns>
    </>
  );
};

export { ReportsBrowser as default };
