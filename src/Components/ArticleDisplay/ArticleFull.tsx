import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { SlideDisplay } from "../SlideDisplay";
import { NodeArticle, NodeArticleInterface } from "../../DataTypes/NodeArticle";
import ParagraphDisplayList from "../ParagraphDisplay/ParagraphDisplayList";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import styled from "styled-components";
import moment from "moment";
import AuthorsDisplay from "../AuthorsDisplay";
import {TagsDisplay} from "../TagsDisplay";
import {SocialDisplay} from "../SocialDisplay";

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

  const ElMainContentWrapper = styled.div`
    width: 90%;
    margin: 2em auto;
    
    & .section-social {
      order: 1;
    }
    & .section-content {
      order: 2;
      & .embedded-entity img {
        max-width: 100%;
      }
      @media only screen and (max-width: 1199px) {
        order: 3;
        padding-top: 1.5em;
      }
      & section > .container {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
      }
    }
    & .section-tags {
      order: 3;
      @media only screen and (max-width: 1199px) {
        order: 2;
      }
      & .published-date {
        font-family: LatoWebItalic;
        font-size: 1.25em;
        color: #999AA3;
        letter-spacing: 0;
        line-height: 1.8em;
        margin-top: 0;
        margin-bottom: 1em;
      }
    }
  `;

  const ElTitle = styled.h1`
    font-size: 2em;
    padding-bottom: 1em;

    @media only screen and (max-width: 1200px) {
      font-size: 1.5em;
    }
  `;

  const created = moment(nodeArticleData.created, "ddd MMM DD YYYY Z");

  let tagList = [];

  if (nodeArticleData.field_tags.length !== undefined && nodeArticleData.field_tags.length > 0) {
    nodeArticleData.field_tags.map(
      (item) => {
        tagList.push({link_uri: '', tag: item.name});
      }
    )
  }
  if (nodeArticleData.field_topics.length !== undefined && nodeArticleData.field_topics.length > 0) {
    nodeArticleData.field_topics.map(
      (item) => {
        tagList.push({link_uri: '', tag: item.name});
      }
    )
  }
  if (nodeArticleData.field_region.length !== undefined && nodeArticleData.field_region.length > 0) {
    nodeArticleData.field_region.map(
      (item) => {
        tagList.push({link_uri: '', tag: item.name});
      }
    )
  }

  //TODO: get a default slide if field_promo_slide is empty

  let authorList = [];

  if (nodeArticleData.field_authors.length !== undefined && nodeArticleData.field_authors.length > 0) {
    nodeArticleData.field_authors.map(
      (item) => {
        authorList.push({ 
          photo: item.field_photo[0],
          name: item.field_first_name + " " + item.field_last_name, 
          pgtitle: item.field_pgtitle, 
          link: "/people/" + item.drupal_internal__id,
          isHidden: item.field_hidden,
        });
      }
    )
  }

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
      <Row>
        <ElMainContentWrapper className="container-fluid">
          {/* <Row>
            <Col>
              <ElTitle>{nodeArticleData.title}</ElTitle>
            </Col>
          </Row> */}
          <Row>
            <Col xs="12" lg="6" xl="1" className="section-social">
              <SocialDisplay data={{"name": nodeArticleData.title}}></SocialDisplay>
            </Col>
            <Col xs="12" xl="8" className="section-content">
              <ErrorBoundary>
                <ParagraphDisplayList
                  list={nodeArticleData.field_content}
                  view_mode="full"
                />
              </ErrorBoundary>
            </Col>
            <Col xs="12" lg="6" xl="3" className="section-tags pt-4 pt-lg-0">
              <div className="published-date">{"Published " + created.format('MMMM D, YYYY')}</div>
              <AuthorsDisplay data={{authorList: authorList}} />
              <TagsDisplay data={{tagList: tagList}} />
            </Col>
          </Row>
        </ElMainContentWrapper>
      </Row>
    </>
  );
};

export default ArticleFull;
