import React from 'react';
import * as DataObject from '../../DataTypes/NodeArticle'
import Loading from "../Loading";
import ArticleFull from './ArticleFull';
import ArticleCard from "./ArticleCard";
import ErrorBoundary from "../../Utility/ErrorBoundary";

interface ArticleDisplayProps {
  data: DataObject.NodeArticleInterface;
  view_mode: string;
}


const ArticleDisplay: React.FunctionComponent = (props: ArticleDisplayProps) => {

  switch (props.view_mode) {
    case "card":
      return (
        <ErrorBoundary>
          <ArticleCard {...props.data} />
        </ErrorBoundary>
      );

    default:
      return (
        <ErrorBoundary>
          <ArticleFull {...props.data} />
        </ErrorBoundary>
      );
  }

}

export {ArticleDisplay as default, ArticleDisplayProps};
