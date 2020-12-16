import React, { useState } from "react";
import { SlideDataFactory } from "./SlideDataFactory";
import { SlideComponentFactory } from "./SlideComponentFactory";
import { ErrorBoundary } from "../../Utility/ErrorBoundary";
import { SlideInterface } from "../../DataTypes/Slide";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";

/**
 * Implementation of the View
 *
 * @param SlideDisplayProps
 */
export interface SlideDisplayProps {
  data?: SlideInterface;
  view_mode?: string;
}

export const SlideDisplay = (props: SlideDisplayProps) => {
  console.debug("Slide Display", props);
  const { data, view_mode } = props;
  const [slideData, setSlideData] = useState(SlideDataFactory(data));
  if (!slideData.hasData()) {
    const ecp = new EntityComponentProps(slideData);
    ecp
      .getData(slideData.getIncluded())
      .then((res) => res.json())
      .then((jsonData) => {
        console.debug("SlideData -- Set Data Returned", jsonData);
        const newDO = SlideDataFactory(jsonData.data);
        setSlideData(newDO);
      });
    return <Loading />;
  }
  const Component = SlideComponentFactory(slideData);

  return (
    <ErrorBoundary>
      <Component data={slideData} view_mode={view_mode ?? "full"} />
    </ErrorBoundary>
  );
};

export default SlideDisplay;
