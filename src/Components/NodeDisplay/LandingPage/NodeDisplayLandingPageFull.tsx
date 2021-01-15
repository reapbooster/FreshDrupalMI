import React from "react";
import styled from "styled-components";
import NodeLandingPage from "DataTypes/NodeLandingPage";
import ParagraphDisplayList from "Components/ParagraphDisplay/ParagraphDisplayList";

export interface NodeDisplayLandingPageFullProps {
  data: NodeLandingPage;
  can_edit: boolean;
}

const Container = styled.div`
  margin: 0;
  padding: 0;
  width: 100%;
`;

export const NodeDisplayLandingPageFull = (props) => {
  const { data, can_edit } = props;
  console.debug("LandingPageData.items => ", data);
  return (
    <>
      <Container>
        <ParagraphDisplayList list={data.field_content} can_edit={can_edit} />
      </Container>
    </>
  );
};

export default NodeDisplayLandingPageFull;
