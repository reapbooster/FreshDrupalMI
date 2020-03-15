import React, { useState } from 'react';
import SlideDataInterface from '../../DataTypes/SlideDataInterface';
import { Row, Jumbotron, Container } from 'react-bootstrap';
import ImageEntityProps from "../../DataTypes/ImageEntityProps";

const FullWidthOneColumn : React.FunctionComponent<SlideDataInterface, string> = (props: SlideDataInterface) => {
  const rowStyle = {"backgroundColor":`${props.field_background_color.color}`};
  const [backgroundImageUrl, setBackgroundImageUrl] = useState("holder.js/100x100?text=thumbnail&auto=yes");
  let jumbotronStyle = {
    "minHeight": "650px",
    "width": "100%",
    "backgroundPosition": "center",
    "backgroundClip": "content-box",
    "backgroundSize": "cover",
    "backgroundImage": `url('${backgroundImageUrl}')`
  }
  let backgroundImageProps: ImageEntityProps = new ImageEntityProps(props.field_background_image);
  if (backgroundImageProps.getData !== undefined) {
    backgroundImageProps.getData().then((incoming) => {
      setBackgroundImageUrl(incoming.uri.url);
    });
  }
  return (
    <>
    <Row className={"align-items-center"} style={rowStyle}>
      <Jumbotron fluid={true}
        className={"d-block align-items-center"}
        style={jumbotronStyle}>
          <Container>
            <h1
              className={"display-3"}
              style={{'color': `${props.text_color?.color}`}}>{props.title}</h1>
            <p
              className={"lead"}
              style={{"color":`${props.text_color?.color}`}}>{props.field_subtitle}</p>
            <hr className="my-4" />
              <p><a href={`${props.field_link?.uri}`}
                    className="btn btn-primary btn-lg"
                    style={{'color': `${props.text_color?.color}`}}
              >{props.field_link?.title}</a></p>
          </Container>
      </Jumbotron>
    </Row>
    </>
  );
};

export default FullWidthOneColumn;
