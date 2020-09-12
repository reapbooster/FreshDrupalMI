import React from 'react';
import FullWidthOneColumn from "./FullWidthOneColumn";
import FiftyFifty from './FiftyFifty';
import HeroHalfHeight from './HeroHalfHeight';
import {EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import ErrorBoundary from "../../Utility/ErrorBoundary";

const SlideBundleComponents = {
  "slide--50_50_text_on_left": FiftyFifty,
  "slide--50_50_text_on_right": FiftyFifty,
  "slide--full_width_one_column": FullWidthOneColumn,
  "slide--hero_half_height": HeroHalfHeight,
}

const SlideDisplay: React.FunctionComponent = (props: EntityComponentPropsInterface) => {
  console.debug("Slide Display", props);
  if (SlideBundleComponents[props.type] === undefined) {
    throw new Error('no bundle type defined for: '.concat(props.type));
  }
  const Component = SlideBundleComponents[props.type];
  return (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );
}


export { SlideDisplay as default, SlideBundleComponents }
