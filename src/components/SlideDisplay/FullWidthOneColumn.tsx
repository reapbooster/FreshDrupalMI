import React, { useState } from 'react';
import * as SlideDataType from '../../DataTypes/Slide';
import { Row, Jumbotron, Container } from 'react-bootstrap';
import ImageEntityProps from "../../DataTypes/ImageEntityProps";

const FullWidthOneColumn : React.FunctionComponent = (props: SlideDataType.default) => {
  console.debug("Full Width One Column", props);
  const rowStyle = {"backgroundColor":`${props?.field_background_color?.color}`};
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("holder.js/100x100?text=thumbnail&auto=yes");
  let jumbotronStyle = {
    "minHeight": "650px",
    "width": "100%",
    "backgroundPosition": "center",
    "backgroundClip": "content-box",
    "backgroundSize": "cover",
    "backgroundImage": `url('${backgroundImageUrl}')`
  }
  let backgroundImageProps = new ImageEntityProps(props.field_background_image);
  if (backgroundImageProps.getData !== undefined) {
    backgroundImageProps
      .getData()
      .then(res => res.json())
      .then((incoming) => {
      console.log("response", incoming);
      setBackgroundImageUrl(incoming.data.uri.url);
    });
  }
  var textLines = [];
  if (props.field_slide_text?.length) {
    for (var key in props.field_slide_text) {
      textLines.push((
        <p
          key={textLines.length + 1}
          className={props.field_slide_text[key]['key']}
          style={{'color': `${props.field_text_color?.color}`}}>{props.field_slide_text[key]['value']}</p>
      ));
    }
  }
  if (props.field_link?.title && props.field_link?.uri) {
    textLines.push((
      <p
        key={textLines.length + 1}
      ><a href={`${props.field_link?.uri || "#"}`}
            className="btn btn-primary btn-lg"
            style={{'color': `${props.field_text_color?.color} || #000000`}}
      >{props.field_link?.title || "#"}</a></p>
    ))
  }
  console.debug(textLines);
  return (
    <>
    <Row className={"align-items-center"} style={rowStyle}>
      <Jumbotron fluid={true}
        className={"d-block align-items-center"}
        style={jumbotronStyle}>
          <Container>
            {textLines}
          </Container>
      </Jumbotron>
    </Row>
    </>
  );
};

export default FullWidthOneColumn;
