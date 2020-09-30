import React from "react";
import { EntityInterface } from "../../DataTypes/Entity";
import { ErrorBoundary } from "../../Utility/ErrorBoundary";
import ArticleCard from "../ArticleDisplay/ArticleCard";
import { NodeArticleInterface } from "../../DataTypes/NodeArticle";

export interface ArticleDisplayListProps {
  list: Array<NodeArticleInterface>;
  view_mode: string;
}

export const ArticleDisplayList = (props: ArticleDisplayListProps) => {
  const { list, view_mode } = props;
  return (
    <>
      {list.map((item: NodeArticleInterface, key: number) => {
        return (
          <ErrorBoundary key={key}>
            <ArticleCard data={item} view_mode={view_mode} />
          </ErrorBoundary>
        );
      })}
    </>
  );
};

ArticleDisplayList.defaultProps = {
  list: [],
  view_mode: "full",
};

export default ArticleDisplayList;
