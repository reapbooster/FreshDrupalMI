
import * as React from "react";
import * as ReactDOM from "react-dom";
import NodeDisplay from "components/NodeDisplay";

const ArticleDetail = document.querySelector('node-detail');

const NodeDetailData = {
  id: NodeDetail.dataset.id,
  type: NodeDetail.dataset.type,
  view_mode: NodeDetail.dataset.viewMode,
}

ReactDOM.render(
  <NodeDisplay
    data={NodeDetailData}
    view_mode={NodeDetailData.view_mode} />,
  NodeDetail
);
