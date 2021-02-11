import React from "react";
import { Col, Container } from "react-bootstrap";
import * as DataObject from "../../DataTypes/ParagraphStats";
import styled from "styled-components";

interface ParagraphDisplayStatsProps {
  data: DataObject.default;
  view_mode: string;
}

const ParagraphDisplayStats: React.FunctionComponent = (
  props: ParagraphDisplayStatsProps
) => {
  const { data } = props;
  // Example styled component
  const Blockquote = styled.blockquote`
    text-align: right;
    background-color: red;
  `;

  console.debug("ParagraphDisplayStats: Data ", data);

  return (
    <Col lg={12}>
      <Container py={"2rem"}>
        <center><h1>{data.admin_title}</h1></center>
        <Blockquote>
          <h1>{data.field_stat_1_h_symbol}{data.field_stat_1_h_number}</h1>
          <h2>{data.field_stat_1_h_subscript}</h2>
          <p>{data.field_stat_1_description}</p>
        </Blockquote>
      </Container>
    </Col>
  );
};

export { ParagraphDisplayStats as default, ParagraphDisplayStatsProps };
