import React, { useState } from "react";
import ProgramDisplay from "./ProgramDisplay/ProgramDisplay";
import styled from "styled-components";

const MainContainer = styled.div`
  @media screen and (min-width: 1200px) {
    div[class^="ParagraphDisplayLinkBar"] {
      font-size: 1.25em;
    }

    #events .container {
      max-width: 1400px;
    }
  }
`;

interface GridEventsProgramProps {
  grid_id: string;
  view_mode?: string;
}

const GridEventsProgram: React.FunctionComponent = (
  props: GridEventsProgramProps
) => {
  const { grid_id, view_mode } = props;

  return (
    <MainContainer id="events">
      <ProgramDisplay gridId={grid_id} />
    </MainContainer>
  );
};

export { GridEventsProgram as default, GridEventsProgramProps };
