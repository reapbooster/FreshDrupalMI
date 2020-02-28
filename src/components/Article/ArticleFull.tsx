import React from 'react';
import ArticleInterface from "./ArticleInterface";
import Slide from '../Slide';
import {
  EntityComponentProps,
  EntityComponentPropsInterface,
  JSONAPIEntityReferenceData
} from '../../DataTypes/EntityComponentProps';
import { Row, Container, Col } from 'react-bootstrap';
import BodyField from "../../Fields/BodyField";

const ArticleFull = (props: ArticleInterface) => {
  console.log("ArticleFull", props);
  const getSlide = (slideDataRaw: JSONAPIEntityReferenceData) => {
    if (slideDataRaw.type !== undefined) {
      let slideData = EntityComponentProps.fromJSONAPIEntityReferenceData(slideDataRaw);
      if (slideData.entityTypeId === "slide") {
        return ( <Slide {...slideData.toObject()} /> ) ;
      }
    }
    return (
      <Col md={12} sm={12} lg={12} style={{
        "backgroundColor": "#0063ca",
        "minHeight": "350px"
      }}>
        <Container>
          <h1>{props.title}</h1>
        </Container>
      </Col>
    );
  };
  return (
    <>
      <Row id={`promo-slide-${props.id}`}>
        <Container fluid={true}>
          {getSlide(props.field_promo_slide)}
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
