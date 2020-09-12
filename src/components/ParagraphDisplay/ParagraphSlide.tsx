
import React from 'react';
import Slide from "../../DataTypes/SlideDataInterface";
import SlideShow from "../Slideshow";
import Loading from "../Loading";
import {Col} from "react-bootstrap";
import {ParagraphInterface} from "../../DataTypes/Paragraph";

interface ParagraphSlideProps extends ParagraphInterface {
  field_slides: Array<Slide>;
}


const ParagraphSlide: React.FunctionComponent = ( props: ParagraphSlideProps ) => {

  return (
    <Col lg={12}>
      <SlideShow
        items={props.field_slides}
        view_mode="full"
      />
    </Col>
  );

}

export default ParagraphSlide;
