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
  gridId: string;
  timeZone?: string;
  view_mode?: string;
}

const GridEventsProgram: React.FunctionComponent = (
  props: GridEventsProgramProps
) => {
  const { gridId, timeZone, view_mode } = props;

  let elJumbotron = document.querySelector(".jumbotron"); 
  if (!!elJumbotron) {
    elJumbotron.style.minHeight='unset';
    elJumbotron?.querySelector('.slide-text').classList.remove('hero-tall');
    elJumbotron?.querySelector('.slide-text').classList.add('hero-short');
  }
  
  return (
    <MainContainer id="events">
      <ProgramDisplay gridId={gridId} timeZone = {timeZone} />
    </MainContainer>
  );
};

export { GridEventsProgram as default, GridEventsProgramProps };
