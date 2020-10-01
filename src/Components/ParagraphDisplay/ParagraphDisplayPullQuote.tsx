import React from "react";
import { Col, Container } from "react-bootstrap";
import * as DataObject from "../../DataTypes/ParagraphPullQuote";
import styled from "styled-components";

interface ParagraphDisplayPullQuoteProps {
  data: DataObject.default;
  view_mode: string;
}

const ParagraphDisplayPullQuote: React.FunctionComponent = (
  props: ParagraphDisplayPullQuoteProps
) => {
  // Example styled component
  const Blockquote = styled.blockquote`
    border: 1px solid orange;
  `;
  return (
    <Col lg={12}>
      <Container py={"2rem"}>
        <Blockquote
          className={props.data.field_text_size}
          dangerouslySetInnerHTML={{ __html: props.data.field_body.processed }}
        ></Blockquote>
      </Container>
    </Col>
  );
};

export { ParagraphDisplayPullQuote as default, ParagraphDisplayPullQuoteProps };
