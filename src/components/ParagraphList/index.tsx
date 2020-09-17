import React from 'react';
import ParagraphDisplay from '../ParagraphDisplay';
import {EntityInterface} from "../../DataTypes/Entity";
import ErrorBoundary from "../../Utility/ErrorBoundary";

interface ParagraphListProps {
  items: Array<DataObject.ParagraphInterface>;
  view_mode: string;
}

export const ParagraphList: React.FunctionComponent = (props: ParagraphListProps) => {
  if (props.items?.length) {
    return props.items.map((item: EntityInterface, key: number) => {
      return (
        <>
          <ParagraphDisplay
            key={key}
            data={item}
            view_mode="full"
          />
        </>
      )
    });
  } else {
    return (
      <>
        <h1 className="visually-hidden">No Paragraph Items to render</h1>
      </>
    )
  }
}


export { ParagraphList as default, ParagraphListProps };
