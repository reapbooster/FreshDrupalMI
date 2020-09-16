import React from 'react';
import {EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import ParagraphDisplay from '../ParagraphDisplay';
import * as DataObject from '../../DataTypes/Paragraph';
import ErrorBoundary from "../../Utility/ErrorBoundary";

interface ParagraphListProps extends EntityComponentPropsInterface {
  items: Array<DataObject.ParagraphInterface>;
}

export const ParagraphList: React.FunctionComponent = (props: ParagraphListProps) => {
  if (props.items?.length) {
    return props.items.map((item: EntityInterface, key: number) => {
      return (
        <ErrorBoundary key={key}>
          <ParagraphDisplay data={item} view_mode="full" />
        </ErrorBoundary>
      )
    });
  } else {
    return (<h1>Paragraph list Component</h1>)
  }
}


export { ParagraphList as default, ParagraphListProps };
