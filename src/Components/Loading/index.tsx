import React from "react";
import FontAwesomeIcon from "react-fontawesome";
import { Col, Container, Row } from "react-bootstrap";

const Loading = () => {
  return (
    <Container>
      <Row>
        <Col lg={12}>
          <figure style={{ margin: "20px auto" }}>
            <FontAwesomeIcon name="spinner" size={"5x"} />
            <figcaption>Loading...</figcaption>
          </figure>
        </Col>
      </Row>
    </Container>
  );
};

export default Loading;
