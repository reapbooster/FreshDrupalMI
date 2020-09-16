
import React from 'react';
import {Col, Container} from "react-bootstrap";
import * as DataObject from '../../DataTypes/ParagraphPullQuote';
import styled from 'styled-components';

interface ParagraphPullQuoteProps  {
  data: DataObject.default;
  view_mode: string;
}


const ParagraphPullQuote: React.FunctionComponent = (props: ParagraphPullQuoteProps) => {
  // Example styled component
  const Blockquote = styled.blockquote`
    border: 1px solid orange;
  `;
  return (
    <Col lg={12}>
      <Container py={"2rem"}>
        <Blockquote className={props.field_text_size}
            dangerouslySetInnerHTML={{__html: props.field_body.processed}}>
        </Blockquote>
      </Container>
    </Col>
  );

}

export default ParagraphPullQuote;
