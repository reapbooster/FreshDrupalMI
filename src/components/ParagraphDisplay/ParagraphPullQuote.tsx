
import React from 'react';
import Slide from "../../DataTypes/SlideDataInterface";
import {Col, Container} from "react-bootstrap";
import {ParagraphInterface} from "../../DataTypes/Paragraph";
import styled from 'styled-components';

interface ParagraphSlideProps extends ParagraphInterface {
  key: number;
  field_slides: Array<Slide>;
  field_text_size: string;
}


const ParagraphPullQuote: React.FunctionComponent = (props: ParagraphSlideProps) => {
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
