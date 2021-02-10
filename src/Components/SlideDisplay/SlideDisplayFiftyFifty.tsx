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
  
  const colStyleText = {
    backgroundColor: `${slideData.field_background_color?.color}`,
    margin: 0,
    padding: '8vw',
    minHeight: '24em',
    height: '33vw',
  };

  const colStyleImage = {
    backgroundColor: `${slideData.field_background_color?.color}`,
    backgroundImage: `url(${backgroundImage.imageStyleObject.large})`,
    backgroundSize: 'cover',
    margin: 0,
    padding: '8vw',
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
    href={`${slideData.field_link?.uri || "#"}`}
    style={{
      background: "var(--color-milken-orange)",
      color: "white",
      fontWeight: "bold",
      letterSpacing: "0.1em",
      padding: "1em",
      textDecoration: "none",
      textTransform: "uppercase",
    }}
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
            <Col md={6} className="" style={colStyleText} >
              {textLines}
              {slideLink}
            </Col>
          </Row>
        </Container>
        
      </ErrorBoundary>
    </>
  );
};

export default SlideDisplayFiftyFifty;
