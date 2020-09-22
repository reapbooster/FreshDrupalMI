import React, {useState} from 'react';
import {SlideDisplay} from '../SlideDisplay';
import { Row, Container, Col } from 'react-bootstrap';
import { BodyField } from "../../Fields/BodyField";
import NodeArticle, {NodeArticleInterface} from '../../DataTypes/NodeArticle'
import ParagraphDisplayList from "../ParagraphDisplay/ParagraphDisplayList";
import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import ErrorBoundary from "../../Utility/ErrorBoundary";

export interface ArticleFullProps {
  data: NodeArticleInterface;
  view_mode: string;
}

const ArticleFull = (props: ArticleFullProps) => {
  const {data, view_mode} = props;
  if (!data instanceof NodeArticle) {
    data = new NodeArticle(data);
  }
  const [nodeArticleData, setNodeArticleData] = useState(data);
  if (!nodeArticleData.hasData()) {
    const ecp = new EntityComponentProps(nodeArticleData);
    ecp.getData(nodeArticleData.getIncluded())
      .then(res => res.json())
      .then(ajaxData => {
        setNodeArticleData(new NodeArticle(ajaxData));
      });
    return (<Loading />);
  }
  return (
    <>
      <Row id={`promo-slide-${props.id}`}>
        <Container fluid={true}>
          <ErrorBoundary>
            <SlideDisplay data={nodeArticleData.field_promo_slide} view_mode={"full"} />
          </ErrorBoundary>
        </Container>
      </Row>
      <Row>
        <Container fluid={true}>
          <h1>{nodeArticleData.title}</h1>
        </Container>
      </Row>
      <Row>
        <Col md={2} sm={12} lg={2} xs={"hidden"}>
          Social Media Links
        </Col>
        <Col md={6} sm={12} lg={6}>
          <ErrorBoundary>
            <ParagraphDisplayList
              list={nodeArticleData} />
          </ErrorBoundary>
        </Col>
        <Col md={3} sm={12} lg={3}>
          <p>Tags Go here</p>
        </Col>
      </Row>
    </>
  );

}

export default ArticleFull;
