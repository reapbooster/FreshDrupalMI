import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import ErrorBoundary from "../../Utility/ErrorBoundary"

export interface AuthorsDisplayProps {
  data: any;
}

export const AuthorsDisplay = (props: AuthorsDisplayProps) => {
  const { data } = props;

  console.debug("AuthorsDisplay", data);

  const AuthorsWrapper = styled.div`
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
  `;

  return (
    <AuthorsWrapper className="container">
      <Row>
        <Col>
            <h5>Authors</h5>
            {data.authorList.map( (item: any, key: number) => {
              let linkElement = (
                <div>
                  <p>{item.name}</p>
                  <p>{item.link}</p>
                  <p>{item.image}</p>
                </div>
              );

              // let linkElement = (item.image_uri === '') 
              // ? <a key={key}>{item.author}</a> 
              // : <a href={item.image_uri} key={key}>{item.author}</a>;

              return (
                <ErrorBoundary key={key}>
                  {linkElement}
                </ErrorBoundary>
                
              );
            })}
        </Col>
        </Row>
    </AuthorsWrapper>
  );
};

export default AuthorsDisplay;
