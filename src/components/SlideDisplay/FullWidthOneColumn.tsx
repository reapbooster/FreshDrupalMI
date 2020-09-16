import React, { useState } from 'react';
import * as SlideDataType from '../../DataTypes/Slide';
import { Row, Jumbotron, Container } from 'react-bootstrap';
import ImageFile, { ImageFileInterface } from '../../DataTypes/ImageFile'
import ImageEntityProps from "../../DataTypes/ImageEntityProps";
import { SlideDisplayProps } from '.';
import {HolderImageStyleObject} from '../../DataTypes/ImageStyleObject';


const FullWidthOneColumn : React.FunctionComponent = (props: SlideDisplayProps) => {

  console.debug("Full Width One Column", props);



  // ========== BACKGROUND IMAGE STUFF ==========
  const backgroundImageStyleObject = new HolderImageStyleObject();
  const image = new ImageFile(props.data.field_background_image);


  if (image.imageStyleObject) {
    console("I have the data I need:", image);
    var backgroundImageStyleObject = image.imageStyleObject;
  } else {
    console.debug('using state to get background image style object', image);
    const [backgroundImageStyleObject, setBackgroundImageStyleObject] = useState(backgroundImageStyleObject);
  }
  if (backgroundImageStyleObject.getData !== undefined) {
    backgroundImageStyleObject
      .getData()
      .then(res => res.json())
      .then((incoming) => {
      console.log("response", incoming);
      const image = new ImageFile(incoming.data);
      setBackgroundImageStyleObject(image.imageStyleObject);
    });
  }




  // ========== STYLES ==========
  let rowStyle = {"backgroundColor":`${props.data.field_background_color?.color}`};
  let jumbotronStyle = {
    "minHeight": "650px",
    "width": "100%",
    "backgroundPosition": "center",
    "backgroundClip": "content-box",
    "backgroundSize": "cover",
    "backgroundImage": `url('${backgroundImageStyleObject.srcSet}')`
  }
  var textLines = [];
  if (props.data.field_slide_text?.length) {
    for (var key in props.data.field_slide_text) {
      textLines.push((
        <p
          key={textLines.length + 1}
          className={props.data.field_slide_text[key]['key']}
          style={{'color': `${props.data.field_text_color?.color}`}}>{props.data.field_slide_text[key]['value']}</p>
      ));
    }
  }
  if (props.data.field_link?.title && props.data.field_link?.uri) {
    textLines.push((
      <p
        key={textLines.length + 1}
      ><a href={`${props.data.field_link?.uri || "#"}`}
            className="btn btn-primary btn-lg"
            style={{'color': `${props.data.field_text_color?.color} || #000000`}}
      >{props.data.field_link?.title || "#"}</a></p>
    ))
  }

  console.debug(textLines);


  // ========== RENDER ==========
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
