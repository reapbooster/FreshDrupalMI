import React from 'react';
import {EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import ParagraphDisplay from '../ParagraphDisplay';
import ErrorBoundary from "../../Utility/ErrorBoundary";

interface ParagraphListProps extends EntityComponentPropsInterface {
  items: Array<EntityComponentPropsInterface>;
}

export const ParagraphList: React.FunctionComponent = (props: ParagraphListProps) => {
  if (props.items?.length) {
    return props.items.map((item: EntityComponentPropsInterface, key: number) => {
      return (
        <ErrorBoundary>
          <ParagraphDisplay {...item} key={key}/>
        </ErrorBoundary>
      )
    });
  } else {
    return (<h1>Paragraph list Component</h1>)
  }
}


export { ParagraphList as default, ParagraphListProps };
