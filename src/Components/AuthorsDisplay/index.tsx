import React from "react";
import { Row, Col } from "react-bootstrap";
import styled from "styled-components";
import ErrorBoundary from "../../Utility/ErrorBoundary"
import ImageFileDisplay from "../FileDisplay/ImageFileDisplay";

export interface AuthorsDisplayProps {
  data: any;
}

export const AuthorsDisplay = (props: AuthorsDisplayProps) => {
  const { data } = props;

  console.debug("AuthorsDisplay", data);

  const AuthorsWrapper = styled.div`
    background-color: var(--color-milken-blue);
    font-family: "LatoWeb";

    & a {
      text-decoration: none;
      color: #fff;
    }

    & a h5 {
      font-family: LatoWebHeavy;
      margin: 0;
    }

    & h6 {
      opacity: 0.74;
      margin: 3px 0 0 0;
    }
  `;

  return (
    <AuthorsWrapper className="container p-3 mb-3 text-white">
      <Row>
        <Col>
          <h5>Authors</h5>
          {data.authorList.map((item: any, key: number) => {
            let linkElement = (
              <a
                href={item.link}
                className="d-flex"
              >
                <ImageFileDisplay
                  className="rounded-circle d-flex align-self-center"
                  data={item.photo}
                  view_mode="thumbnail"
                  style={{ width: "4em", height: "4em" }}
                />
                <div className="d-flex flex-column justify-content-center mx-3">
                  <h5>{item.name}</h5>
                  <h6>{item.pgtitle}</h6>
                </div>
              </a>
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
