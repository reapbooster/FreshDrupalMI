import React, { useState } from "react";
import { Container, Jumbotron, Row } from "react-bootstrap";
import ImageFile from "../../DataTypes/ImageFile";
import { SlideDisplayProps } from ".";
import SlideFullWidthOneColumn, {
  SlideFullWidthOneColumnInterface,
} from "../../DataTypes/SlideFullWidthOneColumn";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import ErrorBoundary from "../../Utility/ErrorBoundary";

export interface SlideDisplayFullWidthOneColumnProps {
  data: SlideFullWidthOneColumnInterface;
  view_mode: string;
}

export const SlideDisplayFullWidthOneColumn: React.FunctionComponent = (
  props: SlideDisplayProps
) => {
  const { data, view_mode } = props;
  if (!data instanceof SlideFullWidthOneColumn) {
    data = new SlideFullWidthOneColumn(data);
  }
  console.debug("Full Width One Column DATA:", data);

  // ========== BACKGROUND IMAGE STUFF ==========

  const [backgroundImage, setBackgroundImage] = useState(
    data.field_background_image
  );

  if (!backgroundImage.hasData()) {
    const ecp = new EntityComponentProps(backgroundImage);
    ecp
      .getData(backgroundImage.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        console.debug("background Image Info back from jsonapi", ajaxData);
        setBackgroundImage(new ImageFile(ajaxData.data));
      });
  }

  // ========== STYLES ==========
  const rowStyle = { backgroundColor: `${data.field_background_color?.color}` };
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
  if (data.field_slide_text?.length) {
    for (const key in data.field_slide_text) {
      textLines.push(
        <p
          key={textLines.length + 1}
          className={data.field_slide_text[key]["key"]}
          style={{ color: `${data.field_text_color?.color}` }}
        >
          {data.field_slide_text[key]["value"]}
        </p>
      );
    }
  }
  if (data.field_link?.title && data.field_link?.uri) {
    textLines.push(
      <p key={textLines.length + 1}>
        <a
          href={`${data.field_link?.uri || "#"}`}
          className="btn btn-primary btn-lg"
          style={{ color: `${data.field_text_color?.color} || #000000` }}
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
