
import React from "react";
import ReactDOM from "react-dom";
import ReportsBrowser from "components/ReportsBrowser";

const ReportsBrowserContainer = document.querySelector('reports-browser');

const ReportsBrowserSource = {
  id: ReportsBrowserContainer.dataset.id,
  type: ReportsBrowserContainer.dataset.type,
  view_mode: ReportsBrowserContainer.dataset.viewMode,
  url: ReportsBrowserContainer.dataset.url
}

ReactDOM.render(
  <ReportsBrowser source={ReportsBrowserSource} />,
  ReportsBrowserContainer
);
