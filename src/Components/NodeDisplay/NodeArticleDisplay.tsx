import React from "react";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import ArticleDisplay from "../ArticleDisplay";
import * as DataObject from "../../DataTypes/NodeArticle";

interface NodeArticleDisplayProps {
  data: DataObject.NodeArticleInterface;
  view_mode: string;
}

const NodeArticleDisplay = (props: NodeArticleDisplayProps) => {
  <ErrorBoundary>
    <ArticleDisplay data={props.data} view_mode={props.view_mode} />
  </ErrorBoundary>;
};

export { NodeArticleDisplay as default, NodeArticleDisplayProps };
