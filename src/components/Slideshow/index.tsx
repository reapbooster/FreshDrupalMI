import React, { useState } from 'react';
import SlideDisplay from "../SlideDisplay";
import {
  Carousel,
  CarouselItem, Col,
  Container, Spinner, Row
} from "react-bootstrap";
import EntityComponentBase, {EntityComponentState} from '../../DataTypes/EntityComponentBase';
import * as SlideDatatype from "../../DataTypes/Slide";

interface SlideShowProps {
  items: Array<SlideDatatype.SlideInterface>
}

class SlideShow extends EntityComponentBase<SlideShowProps, EntityComponentState> {



  render() {
    if (this.state.loaded) {
      return (
        <Carousel>
          {this.props.items.map((slide: SlideDatatype.SlideInterface, key: number ) => {
            return (
              <CarouselItem key={key} id={slide.id}>
                <SlideDisplay {...slide} view_mode={"full"} />
              </CarouselItem>
            )
          })}
        </Carousel>
      );
    } else if (this.state.loading) {
      return (
        <div className={"w-25 text-align-center border-0"}>
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      );
    } else {
      return (
        <div>
          <h1>No component Data</h1>
        </div>
      );
    }

  }

}



export default SlideShow;
