import React from 'react';
import ParagraphDisplay from '../ParagraphDisplay';
import {EntityInterface} from "../../DataTypes/Entity";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import {ListableInterface} from "../../DataTypes/Listable";

export interface ParagraphDisplayListProps {
  list: ListableInterface;
  view_mode: string;
}

export const ParagraphDisplayList: React.FunctionComponent = (props: ParagraphDisplayListProps) => {
  const {list, view_mode} = props;
  return list.getItems().map((item, key) => {
    return (
      <>
        <ErrorBoundary key={key}>
          <ParagraphDisplay
            data={item}
            view_mode={view_mode}
          />
        </ErrorBoundary>
      </>
    )
  });
}


export default ParagraphDisplayList;
