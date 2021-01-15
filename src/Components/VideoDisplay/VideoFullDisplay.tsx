import React from "react";
import { MediaVideoInterface } from "../../DataTypes/MediaVideo";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
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

  // const oEmbedObject = JSON.parse(data?.field_embedded_oembed);
  const oEmbedObject = {"html": "<h1 style='background: red; color: white; padding: 5em 2em;'>oEMBED HTML SHOULD GO HERE, but stupid thing needs to rollback migrations first</h1>" };

  const VideoElMainWrapper = styled.div`
    & .section-social {
      order: 1;
    }
    & .section-content {
      order: 2;
      @media only screen and (max-width: 1199px) {
        order: 3;
        padding-top: 1.5em;

      }
    }
    & .section-tags {
      order: 3;
      @media only screen and (max-width: 1199px) {
        order: 2;
      }
    }
  `;

  const VideoElFrameWrapper = styled.div`
    background: #27262c;
    width: 100%;

    & > iframe {
      display: block;
      margin: auto;
    }
  `;

  const VideoElTitle = styled.h1`
    font-size: 2em;
    padding-bottom: 1em;

    @media only screen and (max-width: 1200px) {
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
      <Container fluid={true} style={{ width: "90%", margin: "2em auto" }}>
        <Row>
          <Col>
            <VideoElTitle>{data.name}</VideoElTitle>
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
      </Container>
    </VideoElMainWrapper>
  );
};

export default VideoFullDisplay;
