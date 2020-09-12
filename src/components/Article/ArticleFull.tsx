import React from 'react';
import SlideDisplay from '../SlideDisplay';
import { Row, Container, Col } from 'react-bootstrap';
import { BodyField } from "../../Fields/BodyField";
import * as ArticleDatatype from '../../DataTypes/Article'
import Paragraphs from "../Paragraphs";
import ParagraphList from "../ParagraphList";

const ArticleFull = (props: ArticleDatatype.default) => {
  console.log("ArticleFull", props);

  return (
    <>
      <Row id={`promo-slide-${props.id}`}>
        <Container fluid={true}>
          <SlideDisplay {...props.field_promo_slide} />
        </Container>
      </Row>
      <Row>
        <Col md={2} sm={12} lg={2} xs={"hidden"}>
          Social Media Links
        </Col>
        <Col md={6} sm={12} lg={6}>
          <ParagraphList items={props.field_content} />
        </Col>
        <Col md={3} sm={12} lg={3}>
          <p>Tags Go here</p>
        </Col>
      </Row>
    </>
  );

}

export default ArticleFull;
