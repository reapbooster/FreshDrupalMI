import React from "react";
import { Carousel, CarouselItem } from "react-bootstrap";
import { SlideDisplay } from "../SlideDisplay";
import { SlideInterface } from "../../DataTypes/Slide";
import ErrorBoundary from "../../Utility/ErrorBoundary";

export interface SlideShowProps {
  items?: Array<SlideInterface>;
  view_mode: string;
}

export const SlideShow = (props: SlideShowProps) => {
  console.debug("SlideShow", props);
  return (
    <Carousel prevIcon="">
      {props.items?.map((slide: SlideInterface, key: number) => {
        console.debug("Sending to slide display...", slide);
        return (
          <CarouselItem key={key} id={slide.id}>
            <ErrorBoundary>
              <SlideDisplay
                data={slide}
                view_mode={props.view_mode ?? "full"}
              />
            </ErrorBoundary>
          </CarouselItem>
        );
      })}
    </Carousel>
  );
};

export default SlideShow;
