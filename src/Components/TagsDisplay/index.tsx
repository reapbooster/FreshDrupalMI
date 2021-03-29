import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import ErrorBoundary from "../../Utility/ErrorBoundary"

export interface TagsDisplayProps {
  data: any;
}

export const TagsDisplay = (props: TagsDisplayProps) => {
  const { data } = props;

  console.debug("TagsDisplay", data);

  const TagsWrapper = styled.div`
    & a {
      color: #fff !important;
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
      
    & .published-date {
      font-family: LatoWebItalic;
      font-size: 20px;
      color: #999AA3;
      letter-spacing: 0;
      line-height: 30px;
      margin-top: 0px;
    }
  `;

  if (data.tagList.length !== undefined && data.tagList.length > 0) {
    return (
      <TagsWrapper className="container">
        <Row>
          <Col>
            <h5>Tags</h5>
            {data.tagList.map((item: any, key: number) => {

              let linkElement = (item.link_uri === '')
                ? <a key={key}>{item.tag}</a>
                : <a href={item.link_uri} key={key}>{item.tag}</a>;

              return (
                <ErrorBoundary key={key}>
                  {linkElement}
                </ErrorBoundary>
              );
            })}
            <div className="published-date">{data.published_date_string}</div>
          </Col>
        </Row>
      </TagsWrapper>
    );
  } else {
    return '';
  }
};

export default TagsDisplay;
