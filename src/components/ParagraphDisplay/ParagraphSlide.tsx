
import React from 'react';
import Slide from "../../DataTypes/SlideDataInterface";
import SlideShow from "../Slideshow";
import {Col} from "react-bootstrap";
import * as DataObject from '../../DataTypes/ParagraphSlide'

interface ParagraphDisplaySlideProps {
  data: DataObject.default;
  view_mode: string;
}


const ParagraphDisplaySlide: React.FunctionComponent = ( props: ParagraphDisplaySlideProps ) => {
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

export {ParagraphDisplaySlide as default, ParagraphDisplaySlideProps};
