import React from 'react';
import SlideShow from "../Slideshow";
import {Col} from "react-bootstrap";
import {ParagraphSlideInterface} from '../../DataTypes/ParagraphSlide';
import ErrorBoundary from '../../Utility/ErrorBoundary';

interface ParagraphDisplaySlideProps {
  data: ParagraphSlideInterface;
  view_mode: string;
}


const ParagraphDisplaySlide: React.FunctionComponent = ( props: ParagraphDisplaySlideProps ) => {
  console.log("ParagraphSlide", props);
  return (
    <Col lg={12}>
      <ErrorBoundary>
        <SlideShow
          items={props.data.field_slides}
          view_mode={props.view_mode}
        />
      </ErrorBoundary>
    </Col>
  );

}

export {ParagraphDisplaySlide as default, ParagraphDisplaySlideProps};
