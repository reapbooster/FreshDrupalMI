import React, { useState } from 'react';
import SlideDisplay from "../SlideDisplay";
import {
  Carousel,
  CarouselItem, Col,
  Container, Spinner, Row
} from "react-bootstrap";
import {
  EntityComponentProps,
  JSONAPIEntityReferenceData
} from "../../DataTypes/EntityComponentProps";
import * as SlideDatatype from "../../DataTypes/SlideDataInterface";


const SlideShow: React.FunctionComponent<EntityComponentProps> = (props: EntityComponentProps) => {

  const getCarousel = (slideData: Array<Slide> = []) => {
    if (slideData.length) {
      return (
        <Carousel>
          {slideData.map((slide: Slide, key) => {
            return (
              <CarouselItem key={key} id={slide.id}>
                <SlideDisplay {...slide} view={"full"} />
              </CarouselItem>
            )
          })}
        </Carousel>
      );
    }
    return (
      <div className={"w-25 text-align-center border-0"}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  console.log("Rendering Slideshow:", props);

  return (
    <>
      {getCarousel(props.items)}
    </>
  );
}

SlideShow.defaultProps = {
  items: [],
  data: {}
}

export default SlideShow;
