import React from 'react';
import SlideDataInterface from '../../DataTypes/SlideDataInterface';
import { Row, Jumbotron, Container } from 'react-bootstrap';

const FullWidthOneColumn = (props: SlideDataInterface) => {
  console.log("FullWidthOneColumn", props);
  const rowStyle = {"backgroundColor":`${props.field_background_color.color}`};
  var jumbotronStyle = {
    "minHeight": "650px",
    "width": "100%"
  }
  if (props.field_background_image?.uri) {
    Object.assign(jumbotronStyle, {
      "backgroundPosition": "center",
      "backgroundClip": "content-box",
      "backgroundSize": "cover",
      "backgroundImage": `url(${props.field_background_image.uri.url})`
    });
  }
  console.log("JumbotronStyle", jumbotronStyle);
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
