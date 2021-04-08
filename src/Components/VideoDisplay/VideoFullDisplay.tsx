import React from "react";
import { MediaVideoInterface } from "../../DataTypes/MediaVideo";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import moment from "moment";
import {TagsDisplay} from "../TagsDisplay"
import {SocialDisplay} from "../SocialDisplay"

export interface VideoFullDisplayProps {
  data: MediaVideoInterface;
}

export const VideoFullDisplay = (props: VideoFullDisplayProps) => {
  const { data } = props;
  const url = data.field_media_oembed_video;

  console.debug("VideoFullDisplay", data);

  const oEmbedObject = (data.field_embedded_oembed != null) 
  ? JSON.parse(data?.field_embedded_oembed)
  : {
    "html":'<iframe width="200" height="113" src="https://www.youtube.com/embed/' + data?.field_embedded_id + '?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
  };
  
  console.debug("oEmbedObject", oEmbedObject);

  const VideoElMainWrapper = styled.div`
  `;

  const VideoElFrameWrapper = styled.div`
    background: #27262c;
    width: 100%;

    @media only screen and (max-width: 767.98px) {
      padding-top: 55.25%;
    }

    & > iframe {
      display: block;
      margin: auto;

      @media only screen and (max-width: 767.98px) {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }

      @media only screen and (min-width: 768px) {
        width: 600px;
        height: 339px;
      }

      @media only screen and (min-width: 1200px) {
        width: 700px;
        height: 452px;
      }
    }
  `;

  const ElMainContentWrapper = styled.div`
    & .section-social {
      order: 1;
    }
    & .section-content {
      order: 2;
      @media only screen and (max-width: 1199.98px) {
        order: 3;
        padding-top: 1.5em;

      }
    }
    & .section-tags {
      order: 3;
      @media only screen and (max-width: 1199.98px) {
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

    @media only screen and (max-width: 1199.98px) {
      font-size: 1.5em;
    }
  `;
  
  const created = moment(data.created, "ddd MMM DD YYYY Z");

  let tagList = [];

  if (data.field_tags.length !== undefined && data.field_tags.length > 0) {
    data.field_tags.map(
      (item) => {
        tagList.push({link_uri: '', tag: item.name});
      }
    )
  }
  if (data.field_topics.length !== undefined && data.field_topics.length > 0) {
    data.field_topics.map(
      (item) => {
        tagList.push({link_uri: '', tag: item.name});
      }
    )
  }
  if (data.field_regions.length !== undefined && data.field_regions > 0) {
    data.field_regions.map(
      (item) => {
        tagList.push({link_uri: '', tag: item.name});
      }
    )
  }
  
  return (
    <VideoElMainWrapper className="container-fluid p-0">
      <Row className="no-gutters">
        <Col>
          <VideoElFrameWrapper
            dangerouslySetInnerHTML={{ __html: oEmbedObject?.html }}
          />
        </Col>
      </Row>
      <Row>
        <ElMainContentWrapper className="container-fluid" style={{ width: "90%", margin: "2em auto" }}>
          <Row>
            <Col>
              <ElTitle>{data.name}</ElTitle>
            </Col>
          </Row>
          <Row>
            <Col xs="12" lg="6" xl="1" className="section-social">
              <SocialDisplay data={{"name": data.name}}></SocialDisplay>
            </Col>
            <Col xs="12" xl="8" className="section-content">
              <div dangerouslySetInnerHTML={{ __html: data.field_body?.value }} />
            </Col>
            <Col xs="12" lg="6" xl="3" className="section-tags">
            <div className="published-date">{"Published " + created.format('MMMM D, YYYY')}</div>
              <TagsDisplay data={{tagList: tagList}} />
            </Col>
          </Row>
        </ElMainContentWrapper>
      </Row>
    </VideoElMainWrapper>
  );
};

export default VideoFullDisplay;
