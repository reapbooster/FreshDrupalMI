import React from 'react';
import SlideDisplay from "../SlideDisplay";
import {
  Carousel,
  CarouselItem
} from "react-bootstrap";
import * as SlideDatatype from "../../DataTypes/Slide";
import ErrorBoundary from '../../Utility/ErrorBoundary';

interface SlideShowProps {
  items: Array<SlideDatatype.SlideInterface>;
  view_mode: string;
}

const SlideShow: React.FunctionComponent = (props: SlideShowProps) => {
  return (
    <Carousel>
      {props.items.map((slide: SlideDatatype.SlideInterface, key: number ) => {
        const slideData = new SlideDatatype.default(slide);
        return (
          <CarouselItem key={key} id={slide.id}>
            <SlideDisplay data={slideData} view_mode={props.view_mode ?? "full"} />
          </CarouselItem>
        )
      })}
    </Carousel>
  );
}



export default SlideShow;
