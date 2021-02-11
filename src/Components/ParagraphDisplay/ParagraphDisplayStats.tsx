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
        <Blockquote
          dangerouslySetInnerHTML={{ __html: data.field_stat_1_description }}
        ></Blockquote>
      </Container>
    </Col>
  );
};

export { ParagraphDisplayStats as default, ParagraphDisplayStatsProps };
