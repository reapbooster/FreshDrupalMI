/**
 * FILE: ParagraphDisplay/index.tsx
 * Us the Paragraph display when you don't know the bundle of the paragraph or paragraphs being displayed.
 *
 */

import React, { useState } from "react";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import Loading from "../Loading";
import { ParagraphInterface } from "../../DataTypes/Paragraph";
import ParagraphDataFactory from "./ParagraphDataFactory";
import ParagraphComponentFactory from "./ParagraphComponentFactory";

/**
 * Create the controller
 *
 * @param ParagraphDisplayProps
 */

export interface ParagraphDisplayProps {
  key?: number;
  data: ParagraphInterface;
  view_mode: string;
}

export const ParagraphDisplay = (props: ParagraphDisplayProps) => {
  const { key, data, view_mode } = props;
  const DataObject = ParagraphDataFactory(data);
  const [paragraphData, setParagraphData] = useState(DataObject);
  console.debug("Paragraph Display data:", paragraphData);
  if (!paragraphData.hasData()) {
    const ecp = new EntityComponentProps(paragraphData);
    ecp
      .getData(paragraphData.getIncluded())
      .then((res) => res.json())
      .then((remoteData) => {
        console.debug("ParagraphData", remoteData);
        const DataObject = ParagraphDataFactory(remoteData.data);
        setParagraphData(DataObject);
      });
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const Component = ParagraphComponentFactory(paragraphData);
  return (
    <ErrorBoundary key={key ?? 0}>
      <Component data={paragraphData} view_mode={view_mode} />
    </ErrorBoundary>
  );
};

export default ParagraphDisplay;
