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

export interface VideoFullDisplayProps {
  data: MediaVideoInterface;
}

export const VideoFullDisplay = (props: VideoFullDisplayProps) => {
  const { data } = props;
  const url = data.field_media_oembed_video;

  console.debug("VideoFullDisplay", data);

  const oEmbedObject = JSON.parse(data?.field_embedded_oembed);

  const VideoElMainWrapper = styled.div`
    & .section-social {
      order: 1;
      & svg {
        background: #f1f4f6;
        color: #959595;
        font-size: 2.25em;
        border-radius: 50%;
        padding: 0.33em;
        margin: 0.2em;
        width: 1.25em !important;
        height: 1.25em !important;
      }
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
      & a {
        color: #fff;
        margin-top: 8px;
        padding: 4px 12px;
        text-decoration: none;
        background-color: #9a6397;
        font-size: 12px;
        font-family: 'LatoWebBold';
        display: inline-block;
        line-height: 16px;
        white-space: nowrap;
        margin: 10px 10px 10px 0;
      }
    }
    & .published-date {
      font-family: LatoWebItalic;
      font-size: 20px;
      color: #999AA3;
      letter-spacing: 0;
      line-height: 30px;
      margin-top: 0px;
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

  return (
    <VideoElMainWrapper className="container-fluid">
      <Row>
        <Col>
          <VideoElFrameWrapper
            dangerouslySetInnerHTML={{ __html: oEmbedObject.html }}
          />
        </Col>
      </Row>
      <Container fluid="true" style={{ width: "90%", margin: "2em auto" }}>
        <Row>
          <Col>
            <VideoElTitle>{data.name}</VideoElTitle>
          </Col>
        </Row>
        <Row>
          <Col xs="12" lg="6" xl="1" className="section-social">
            <h5>Social</h5>
            <a href={"https://twitter.com/intent/tweet?url=" + window.location.href +"&text=" + data.name}>
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a href={"https://www.facebook.com/share.php?u=" + window.location.href +"&quote=" + data.name}>
              <FontAwesomeIcon icon={faFacebookF} />
            </a>
            <a href={"https://www.linkedin.com/sharing/share-offsite/?url=" + window.location.href +"&title=" + data.name}>
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </Col>
          <Col xs="12" xl="8" className="section-content">
            <div dangerouslySetInnerHTML={{ __html: data.field_body?.value }} />
          </Col>
          <Col xs="12" lg="6" xl="3" className="section-tags">
            <h5>Tags</h5>
            <a href="#video-tag-one">Video Tag One</a>
            <a href="#video-tag-two">Video Tag Two</a>
            <a href="#video-tag-tree">Video Tag Three</a>
            <div class="published-date">Published {created.format("MMMM D, YYYY")}</div>
          </Col>
        </Row>
      </Container>
    </VideoElMainWrapper>
  );
};

export default VideoFullDisplay;
