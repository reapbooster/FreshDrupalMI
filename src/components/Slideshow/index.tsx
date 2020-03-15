import React, { useState } from 'react';
import Slide from "../Slide";
import {
  Carousel,
  CarouselItem, Col,
  Container, Spinner, Row
} from "react-bootstrap";
import {
  EntityComponentProps,
  JSONAPIEntityReferenceData
} from "../../DataTypes/EntityComponentProps";
import SlideDataInterface from "../../DataTypes/SlideDataInterface";


const SlideShow: React.FunctionComponent<EntityComponentProps> = (props: EntityComponentProps) => {

  const getCarousel = (props: Array<SlideDataInterface> = []) => {
    if (props.length) {
      return (
        <Carousel>
          {props.map((slide: SlideDataInterface, key) => {
            return (
              <CarouselItem key={key} id={slide.id}>
                <Slide {...slide} />
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
      <Row className="h-100">
        <Col lg={12} className={"col-sm-12 my-auto"}>
          {getCarousel(props.items)}
        </Col>
      </Row>
    </>
  );
}

SlideShow.defaultProps = {
  items: [],
  data: {}
}

export default SlideShow;
