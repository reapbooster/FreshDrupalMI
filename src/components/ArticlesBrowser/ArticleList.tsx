import React from 'react';
import {EntityInterface} from '../../DataTypes/Entity';
import {ListableInterface} from "../../DataTypes/Listable";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import ArticleCard from "../ArticleDisplay/ArticleCard";

export interface ArticleDisplayListProps {
  list: ListableInterface
  view_mode: string;
}


export const ArticleDisplayList: React.FunctionComponent = (props: ArticleDisplayListProps) => {
  const {list, view_mode} = props;
  return (
    <>
      {list.items?.map((item: EntityInterface, key: number) => {
        return (
          <ErrorBoundary key={key}>
            <ArticleCard
              data={item}
              view_mode={view_mode}
            />
          </ErrorBoundary>
        );
      })}
    </>
  );
}

export default ArticleDisplayList;
