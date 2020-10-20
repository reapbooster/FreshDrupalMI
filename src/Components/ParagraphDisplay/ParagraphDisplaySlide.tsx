import React from "react";
import SlideShow from "../Slideshow";
import { Col } from "react-bootstrap";
import { ParagraphSlideInterface } from "../../DataTypes/ParagraphSlide";
import ErrorBoundary from "../../Utility/ErrorBoundary";

interface ParagraphDisplaySlideProps {
  data: ParagraphSlideInterface;
  view_mode: string;
}

const ParagraphDisplaySlide: React.FunctionComponent = (
  props: ParagraphDisplaySlideProps
) => {
  const { data, view_mode } = props;
  return (
    <Col lg={12} style={{ margin: 0, padding: 0 }}>
      <ErrorBoundary>
        <SlideShow items={data.field_slides} view_mode={view_mode} />
      </ErrorBoundary>
    </Col>
  );
};

export { ParagraphDisplaySlide as default, ParagraphDisplaySlideProps };
