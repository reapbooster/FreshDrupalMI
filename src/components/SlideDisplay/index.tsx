import React from 'react';
import FullWidthOneColumn from "./FullWidthOneColumn";
import FiftyFifty from './FiftyFifty';
import HeroHalfHeight from './HeroHalfHeight';
import ErrorBoundary from "../../Utility/ErrorBoundary";
import { SlideInterface } from '../../DataTypes/Slide';
import SlideFullWidthOneColumn from '../../DataTypes/SlideFullWidthOneColumn';
import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";
import Loading from '../Loading';

/**
 * Implementation of the Data Model
 *
 * @param incoming: SlideInterface
 */
function SlideDataFactory(incoming: SlideInterface) {
  switch(incoming.type) {
    case "slide--50_50_text_on_left":
      return new SlideFullWidthOneColumn(incoming);
    case "slide--50_50_text_on_right":
      return FiftyFifty;
    case "slide--full_width_one_column":
      return FullWidthOneColumn;
    case "slide--hero_half_height":
      return HeroHalfHeight;
    default:
      throw new Error('no Data type defined for: '.concat(incoming.type));
  }
}

/**
 * Implementation of the View
 *
 * @param incoming: SlideInterface
 */
function SlideComponentFactory(incoming: SlideInterface) {
  switch(incoming.type) {
    case "slide--50_50_text_on_left":
      return FiftyFifty;
    case "slide--50_50_text_on_right":
      return FiftyFifty;
    case "slide--full_width_one_column":
      return FullWidthOneColumn;
    case "slide--hero_half_height":
      return HeroHalfHeight;
    default:
      throw new Error('no Component type defined for: '.concat(incoming.type));
  }

}

/**
 * Implementation of the View
 *
 * @param SlideDisplayProps
 */
interface SlideDisplayProps {
  data: SlideInterface;
  view_mode?: string;
}

const SlideDisplay: React.FunctionComponent = (props: SlideDisplayProps) => {
  console.debug("Slide Display", props);
  const [slideData, setSlideData] = useState(SlideDataFactory(props.data));
  if (!slideData.hasData()) {
    const ecp = new EntityComponentProps(slideData);
    ecp.getData(slideData.getIncluded())
      .then(res => res.json)
      .then((jsonData) => {
        console.debug("SlideData -- Set State", jsonData);
        setSlideData(SlideDataFactory(slideData));
      });
    return (
      <>
        <Loading />
      </>
    )
  }
  const Component = SlideComponentFactory(props);
  return (
    <ErrorBoundary>
      <Component data={props.data} view_mode={props.view_mode ?? "full"} />
    </ErrorBoundary>
  );
}


export { SlideDisplay as default, SlideDataFactory, SlideComponentFactory }
