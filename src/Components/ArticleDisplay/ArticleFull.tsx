import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { SlideDisplay } from "../SlideDisplay";
import { NodeArticle, NodeArticleInterface } from "../../DataTypes/NodeArticle";
import ParagraphDisplayList from "../ParagraphDisplay/ParagraphDisplayList";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import ErrorBoundary from "../../Utility/ErrorBoundary";

export interface ArticleFullProps {
  data: NodeArticleInterface;
  view_mode: string;
}

export const ArticleFull = (props: ArticleFullProps) => {
  const { data, view_mode } = props;
  const DataObject = new NodeArticle(data);
  const [nodeArticleData, setNodeArticleData] = useState(DataObject);
  if (!nodeArticleData.hasData()) {
    console.debug("retrieving node data", nodeArticleData);
    const ecp = new EntityComponentProps(nodeArticleData);
    ecp
      .getData(nodeArticleData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        setNodeArticleData(new NodeArticle(ajaxData.data));
      });
    return <Loading />;
  }
  console.debug("Should have node data now", nodeArticleData);

  //TODO: get a default slide if field_promo_slide is empty

  return (
    <>
      <Row id={`promo-slide-${nodeArticleData.id}`}>
        <Container fluid style={{ position: "relative" }}>
          <SlideDisplay
            data={nodeArticleData.field_promo_slide}
            view_mode={"full"}
          />
        </Container>
      </Row>
      <Row className={"mt-4 pt-4"}>
        <Col md={2} sm={12} lg={2}>
          Social Media Links
        </Col>
        <Col md={8} sm={12} lg={8}>
          <ErrorBoundary>
            <ParagraphDisplayList
              list={nodeArticleData.field_content}
              view_mode="full"
            />
          </ErrorBoundary>
        </Col>
        <Col md={2} sm={12} lg={2}>
          <p>Tags Go here</p>
        </Col>
      </Row>
    </>
  );
};

export default ArticleFull;
