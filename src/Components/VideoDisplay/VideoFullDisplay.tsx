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

  const oEmbedObject = JSON.parse(data?.field_embedded_oembed);
  
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

  // TO-DO: Need to build the list of tags from multiple taxonomy vocabs
  const tagList = [
    {
      tag: "Health",
      link_uri: "/tagsURL/health"
    },
    {
      tag: "Finance",
      link_uri: "/tagsURL/finance"
    },
    {
      tag: "Aging",
      link_uri: "/tagsURL/aging"
    },
    {
      tag: "Policy",
      link_uri: "/tagsURL/policy"
    },
  ];

  return (
    <VideoElMainWrapper className="container-fluid p-0">
      <Row className="no-gutters">
        <Col>
          <VideoElFrameWrapper
            dangerouslySetInnerHTML={{ __html: oEmbedObject.html }}
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
              <TagsDisplay data={
                {
                  published_date_string: "Published " + created.format('MMMM D, YYYY'),
                  tagList: tagList
                }
              }></TagsDisplay>
            </Col>
          </Row>
        </ElMainContentWrapper>
      </Row>
    </VideoElMainWrapper>
  );
};

export default VideoFullDisplay;
