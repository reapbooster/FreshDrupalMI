
import React from 'react';
import Slide from "../../DataTypes/SlideDataInterface";
import SlideShow from "../Slideshow";
import {Col} from "react-bootstrap";
import * as DataObject from '../../DataTypes/ParagraphSlide'

interface ParagraphSlideProps extends ParagraphInterface {
  data: DataObject.default;
  view_mode: string;
}


const ParagraphSlide: React.FunctionComponent = ( props: ParagraphSlideProps ) => {
  console.log("ParagraphSlide", props);
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
