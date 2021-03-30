import React from "react";
import { Col, Row, Container } from "react-bootstrap";
import * as DataObject from "../../DataTypes/ParagraphEventDisplay";
import styled from "styled-components";
import GridEventsSpeakers from "../GridEvents/GridEventsSpeakers";
import GridEventsProgram from "../GridEvents/GridEventsProgram";

interface ParagraphDisplayEventDisplayProps {
  data: DataObject.default;
  view_mode: string;
}

const ParagraphDisplayEventDisplay: React.FunctionComponent = (
  props: ParagraphDisplayEventDisplayProps
) => {
  const { data } = props;

  console.debug("ParagraphDisplayEventDisplay: Data ", data);

  const MainContainer = styled.div`
  
    .container {
      text-align: center; 
    }
    @media screen and (min-width: 1200px){
      font-size: 1.25em;
    }

  `;

  let activeTabFromURL = (window.location.pathname.split('/').slice(-1).pop().toLowerCase());
  let activeComponent = (activeTabFromURL === 'speakers') 
    ? <GridEventsSpeakers grid_id={data.field_grid_event_id} view_mode="card" />
    : <GridEventsProgram grid_id={data.field_grid_event_id} view_mode="accordion" />;

  return (
    <MainContainer className="container py-5">
      <Row>
        {data.field_display_program ? "Display Program is ON" : "Program should not display :("}
      </Row>
      <Row>
        {data.field_display_speakers ? "Display Speakers is ON" : "Speakers should not display :("}
      </Row>
      <Row>
        This is the Grid ID: {data.field_grid_event_id}
      </Row>
      <Row>
        {activeComponent}
      </Row>
    </MainContainer>
  );
};

export { ParagraphDisplayEventDisplay as default, ParagraphDisplayEventDisplayProps };
