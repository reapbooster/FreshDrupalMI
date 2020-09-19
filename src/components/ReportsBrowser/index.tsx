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
      <MediaDisplayList
        {...props}
      />
    </>
  )
}

export { ReportsBrowser as default } ;
