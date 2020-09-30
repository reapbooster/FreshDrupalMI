import React, { useState } from "react";
import { Container, Jumbotron, Row } from "react-bootstrap";
import ImageFile from "../../DataTypes/ImageFile";
import { SlideDisplayProps } from ".";
import SlideFullWidthOneColumn, {
  SlideFullWidthOneColumnInterface,
} from "../../DataTypes/SlideFullWidthOneColumn";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import Loading from "../Loading";

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

  const [slideData, setSlideData] = useState(
    DataObject
  );

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
  const backgroundImage = slideData.field_background_image;

  // ========== STYLES ==========
  const rowStyle = { backgroundColor: `${slideData.field_background_color?.color}` };
  const backgroundVersion = window.matchMedia("min-width: 700px").matches
    ? `url('${backgroundImage.image_style_uri.getStyleByMachineName(
        "fullscreen"
      )}')`
    : `url('${backgroundImage.image_style_uri.getStyleByMachineName(
        "thumbnail"
      )}')`;

  const jumbotronStyle = {
    minHeight: "650px",
    width: "100%",
    backgroundPosition: "center",
    backgroundClip: "content-box",
    backgroundSize: "cover",
    backgroundImage: backgroundVersion,
  };
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
            fluid={true}
            className={"d-block align-items-center"}
            style={jumbotronStyle}
          >
            <Container>{textLines}</Container>
          </Jumbotron>
        </Row>
      </ErrorBoundary>
    </>
  );
};

export default SlideDisplayFullWidthOneColumn;
