
import * as React from "react";
import * as ReactDOM from "react-dom";
import NodeDisplay from "components/NodeDisplay";

const NodeDetail = document.querySelector('node-detail');

ReactDOM.render(
  <NodeDisplay {...NodeDetail.dataset} />,
  NodeDetail
);
