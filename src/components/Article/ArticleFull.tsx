import React from 'react';
import ArticleInterface from "./ArticleInterface";
import Slideshow from '../Slideshow';
import { Row, Container, Col } from 'react-bootstrap';
import { BodyField } from "../../Fields/BodyField";

const ArticleFull = (props: ArticleInterface) => {
  console.log("ArticleFull", props);
  return (
    <>
      <Row id={`promo-slide-${props.id}`}>
        <Container fluid={true}>
          <Slideshow items={[ props.field_promo_slide ]} />
        </Container>
      </Row>
      <Row>
        <Col md={2} sm={12} lg={2} xs={"hidden"}>
          Social Media Links
        </Col>
        <Col md={6} sm={12} lg={6}>
          <BodyField data={props.field_body} />
        </Col>
        <Col md={3} sm={12} lg={3}>
          <p>Tags Go here</p>
        </Col>
      </Row>
    </>
  );

}

export default ArticleFull;
