import React from 'react';
import List from '../List';

const ReportsBrowser = (props) => {
  return (
    <>
      <List
        id="ExploreReports"
        url="/jsonapi/media/report?jsonapi_include=true"
        entityTypeId="media"
        bundle="report"
      />
    </>
  )
}

export default ReportsBrowser;
