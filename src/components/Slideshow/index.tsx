import React from 'react';
import { SlideDisplay } from "../SlideDisplay";
import {
  Carousel,
  CarouselItem
} from "react-bootstrap";
import Slide, {SlideInterface} from "../../DataTypes/Slide";
import ErrorBoundary from '../../Utility/ErrorBoundary';

interface SlideShowProps {
  items?: Array<SlideInterface>;
  view_mode: string;
}

const SlideShow: React.FunctionComponent = (props: SlideShowProps) => {
  console.debug("SlideShow", props);
  return (
      <Carousel>
          {props.items?.map((slide: SlideInterface, key: number ) => {
            console.debug("Sending to slide display...", slide);
            return (
              <CarouselItem key={key} id={slide.id}>
                <SlideDisplay data={slide} view_mode={props.view_mode ?? "full"} />
              </CarouselItem>
            )
          })}
      </Carousel>
  );
}



export default SlideShow;
