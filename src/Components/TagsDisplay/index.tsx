import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faFacebookF,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import moment from "moment";

export interface TagsDisplayProps {
  data: any;
}

export const TagsDisplay = (props: TagsDisplayProps) => {
  const { data } = props;

  console.debug("TagsDisplay", data);

  const TagsWrapper = styled.div`
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

  return (
    <TagsWrapper className="container">
      <Row>
        <Col>
            <h5>Tags</h5>
            <a href="#video-tag-one">Video Tag One</a>
            <a href="#video-tag-two">Video Tag Two</a>
            <a href="#video-tag-tree">Video Tag Three</a>
            <div class="published-date">Published {data.published_date_string}</div>
        </Col>
        </Row>
    </TagsWrapper>
  );
};

export default TagsDisplay;
