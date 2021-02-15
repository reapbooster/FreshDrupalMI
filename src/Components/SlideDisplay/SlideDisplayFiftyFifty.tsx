import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { SlideInterface } from "DataTypes/Slide";
import { SlideFiftyFifty } from "DataTypes/SlideFiftyFifty";
import { EntityComponentProps } from "DataTypes/EntityComponentProps";
import Loading from "../Loading";
import { ErrorBoundary } from "../../Utility/ErrorBoundary";
import { ImageFile } from "../../DataTypes/ImageFile";
import { KeyValueTextFieldDisplay } from "../../Fields/KeyValueTextFieldDisplay";
import styled from "styled-components";

export interface SlideDisplayFiftyFiftyProps {
  data: SlideInterface;
  view_mode: string;
}

export const SlideDisplayFiftyFifty: React.FunctionComponent = (
  props: SlideDisplayFiftyFiftyProps
) => {
  console.debug("SlideDisplayFiftyFifty Component Start", props);
  const { data, view_mode } = props;
  const DataObject = new SlideFiftyFifty(data);
  const [slideData, setSlideData] = useState(DataObject);

  if (!slideData.hasData()) {
    const ecp = new EntityComponentProps(slideData);
    ecp
      .getData(slideData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        setSlideData(new SlideFiftyFifty(ajaxData.data));
      });
    return <Loading />;
  }
  console.log("Slide Fifty Fifty Data:", slideData);

  const backgroundImage =
    slideData.field_background_image instanceof ImageFile
      ? slideData.field_background_image
      : new ImageFile(slideData.field_background_image);

  const textLeftOrRight = slideData.type.split("_").pop();
  const colOrder = (textLeftOrRight === "left") ? "align-items-center align-items-stretch flex-row-reverse" : "align-items-center align-items-stretch";

  const textLineContainer = styled.div``;

  const WrapperSlideText = styled.div`
    & .h1 {
      font-size: 2.25em;
      font-family: 'LatoWebBlack';
    }

    & .p {
      font-size: 1.25em;
      font-family: 'LatoWeb';
      color: dimgray !important;
    }

    & a {
      font-size: 0.9em;
      font-family: 'LatoWebBlack';
      margin-top: 2em;
    }
  `;

  const colStyleText = {
    backgroundColor: `${slideData.field_background_color?.color}`,
    margin: 0,
    padding: '3em 2em',
    minHeight: '24em',
    height: '33vw',
  };

  const colStyleImage = {
    backgroundColor: `${slideData.field_background_color?.color}`,
    backgroundImage: `url(${backgroundImage.imageStyleObject.large})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    margin: 0,
    padding: '3em 2em',
    minHeight: '24em',
    height: '33vw',
  };

  const textLines = (
    <KeyValueTextFieldDisplay
      Container={textLineContainer}
      style={{ color: `${slideData.field_text_color?.color}` }}
      data={slideData.field_slide_text}
    />
  );

  const slideLink = (slideData.field_link?.title && slideData.field_link?.uri) ? (
    <a
      href={`${slideData.field_link?.uri.replace('internal:','') || "#"}`}
      className="btn-milken-orange"
    >
      {`${slideData.field_link?.title || "View More"}`}
    </a>
  )
    :
    '';

  console.debug(textLines);

  return (
    <>
      <ErrorBoundary>
        <Container fluid>
          <Row className={colOrder} data-view-mode={view_mode} >
            <Col md={6} className="align-items-stretch" style={colStyleImage} >
            </Col>
            <Col md={6} className="d-flex justify-content-center align-items-center" style={colStyleText} >
              <WrapperSlideText>
                {textLines}
                {slideLink}
              </WrapperSlideText>
              
            </Col>
          </Row>
        </Container>

      </ErrorBoundary>
    </>
  );
};

export default SlideDisplayFiftyFifty;
