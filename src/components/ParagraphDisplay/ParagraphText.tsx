import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import TextField from "../../DataTypes/TextField";
import {ParagraphInterface} from "../../DataTypes/Paragraph";
import styled from 'styled-components';

interface ParagraphTextProps extends ParagraphInterface {
  key: number;
  field_body: TextField;
  field_num_text_columns: number;
}


const ParagraphText: React.FunctionComponent = (props) => {
  const Paragraph = styled.p`
    columnCount: ${Number(props.field_field_num_text_columns || 1)},
    paddingTop: "2rem",
    paddingBottom: "2rem",
  `;
  const textStyle={

  };
  console.log("Paragraph Text", props);
  return (
    <Col lg={12}>
      <Container>
        <Paragraph style={textStyle}
           dangerouslySetInnerHTML={{__html: props.field_body.value}} />
      </Container>
    </Col>
  );
}

export default ParagraphText;
