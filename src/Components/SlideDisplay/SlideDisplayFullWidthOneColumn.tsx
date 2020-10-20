import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import styled from "styled-components";
import ImageFile from "../../DataTypes/ImageFile";
import { SlideDisplayProps } from ".";
import SlideFullWidthOneColumn, {
  SlideFullWidthOneColumnInterface,
} from "../../DataTypes/SlideFullWidthOneColumn";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import Loading from "../Loading";
import ImageStyleObject from "../../DataTypes/ImageStyleObject";

export interface SlideDisplayFullWidthOneColumnProps {
  data: SlideFullWidthOneColumnInterface;
  view_mode: string;
}

export const SlideDisplayFullWidthOneColumn: React.FunctionComponent = (
  props: SlideDisplayProps
) => {
  const { data, view_mode } = props;
  const DataObject = new SlideFullWidthOneColumn(data);
  console.debug("Full Width One Column DATA:", data);

  // ========== BACKGROUND IMAGE STUFF ==========

  const [slideData, setSlideData] = useState(DataObject);

  if (!slideData.hasData()) {
    const ecp = new EntityComponentProps(slideData);
    ecp
      .getData(slideData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        console.debug("background Image Info back from jsonapi", ajaxData);
        setSlideData(new SlideFullWidthOneColumn(ajaxData.data));
      });
    return <Loading />;
  }
  const backgroundImage =
    slideData.field_background_image instanceof ImageFile
      ? slideData.field_background_image
      : new ImageFile(slideData.field_background_image);

  // ========== STYLES ==========
  const rowStyle = {
    backgroundColor: `${slideData.field_background_color?.color}`,
    margin: 0,
    padding: 0,
  };
  console.debug("background image object: ", backgroundImage);
  const Jumbotron = styled.div`
    min-height: 650px;
    width: 100%;
    background-position: center;
    background-clip: content-box;
    background-size: cover;
    background-image: url("${backgroundImage.imageStyleObject.thumbnail}");
    @media (min-width: 400px) {
      background-image: url("${backgroundImage.imageStyleObject.medium}");
    }
    @media (min-width: 720px) {
      background-image: url("${backgroundImage.uri.url}");
    }
  `;

  console.debug("Jumbotron style", Jumbotron);

  const textLines = [];
  if (slideData.field_slide_text?.length) {
    for (const key in slideData.field_slide_text) {
      textLines.push(
        <p
          key={textLines.length + 1}
          className={slideData.field_slide_text[key]["key"]}
          style={{ color: `${slideData.field_text_color?.color}` }}
        >
          {slideData.field_slide_text[key]["value"]}
        </p>
      );
    }
  }
  if (slideData.field_link?.title && slideData.field_link?.uri) {
    textLines.push(
      <p key={textLines.length + 1}>
        <a
          href={`${slideData.field_link?.uri || "#"}`}
          className="btn btn-primary btn-lg"
          style={{ color: `${slideData.field_text_color?.color} || #000000` }}
        >
          {data.field_link?.title || "#"}
        </a>
      </p>
    );
  }

  console.debug(textLines);

  // ========== RENDER ==========
  return (
    <>
      <ErrorBoundary>
        <Row
          className={"align-items-center"}
          style={rowStyle}
          data-view-mode={view_mode}
        >
          <Jumbotron
            className={"jumbotron jumbotron-fluid d-block align-items-center"}
          >
            <Container>{textLines}</Container>
          </Jumbotron>
        </Row>
      </ErrorBoundary>
    </>
  );
};

export default SlideDisplayFullWidthOneColumn;
