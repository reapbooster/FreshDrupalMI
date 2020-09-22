import React from 'react';
import MediaDisplayList from '../MediaDisplay/MediaDisplayList';
import {MediaReportInterface} from "../../DataTypes/MediaReport";

interface ResportsBrowserProps {
  items: Array<MediaReportInterface>;
  view_mode: string;
}

const ReportsBrowser = (props: ResportsBrowserProps) => {
  return (
    <>
      <h1>Themed Reports Browser goes here.</h1>
    </>
  )
}

export { ReportsBrowser as default } ;
