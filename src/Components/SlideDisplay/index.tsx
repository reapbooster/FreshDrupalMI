import React, { useState } from "react";
import SlideDisplayFullWidthOneColumn from "./SlideDisplayFullWidthOneColumn";
import SlideDisplayFiftyFifty from "./SlideDisplayFiftyFifty";
import SlideDisplayHeroHalfHeight from "./SlideDisplayHeroHalfHeight";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import { EntityInterface } from "../../DataTypes/Entity";
import { SlideInterface } from "../../DataTypes/Slide";
import SlideFiftyFifty from "../../DataTypes/SlideFiftyFifty";
import SlideFullWidthOneColumn from "../../DataTypes/SlideFullWidthOneColumn";
import SlideHeroHalfHeight from "../../DataTypes/SlideHeroHalfHeight";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";

/**
 * Implementation of the Data Model
 *
 * @param incoming: SlideInterface
 */
export function SlideDataFactory(incoming: EntityInterface) {
  switch (incoming.type) {
    case "slide--50_50_text_on_left":
      return new SlideFullWidthOneColumn(incoming);
    case "slide--50_50_text_on_right":
      return new SlideFiftyFifty(incoming);
    case "slide--full_width_one_column":
      return new SlideFullWidthOneColumn(incoming);
    case "slide--hero_half_height":
      return new SlideHeroHalfHeight(incoming);
    default:
      throw new Error("no Data type defined for: ".concat(incoming.type));
  }
}

/**
 * Implementation of the View
 *
 * @param incoming: SlideInterface
 */
export function SlideComponentFactory(incoming: EntityInterface) {
  switch (incoming.type) {
    case "slide--50_50_text_on_left":
      return SlideDisplayFiftyFifty;
    case "slide--50_50_text_on_right":
      return SlideDisplayFiftyFifty;
    case "slide--full_width_one_column":
      return SlideDisplayFullWidthOneColumn;
    case "slide--hero_half_height":
      return SlideDisplayHeroHalfHeight;
    default:
      throw new Error("no Component type defined for: ".concat(incoming.type));
  }
}

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
        setSlideData(SlideDataFactory(jsonData.data));
      });
    return (
      <>
        <Loading />
      </>
    );
  }
  const Component = SlideComponentFactory(slideData);

  return (
    <ErrorBoundary>
      <Component data={slideData} view_mode={view_mode ?? "full"} />
    </ErrorBoundary>
  );
};

export default SlideDisplay;
