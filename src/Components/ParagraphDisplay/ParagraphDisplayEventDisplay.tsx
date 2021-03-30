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

  const MainContainer = styled.div``;

  let activeTabFromURL = window.location.pathname
    .split("/")
    .slice(-1)
    .pop()
    .toLowerCase();
  let activeComponent =
    activeTabFromURL === "speakers" ? (
      <GridEventsSpeakers grid_id={data.field_grid_event_id} view_mode="card" />
    ) : (
      <GridEventsProgram
        grid_id={data.field_grid_event_id}
        view_mode="accordion"
      />
    );

  return (
    <MainContainer className="container-fluid">{activeComponent}</MainContainer>
  );
};

export {
  ParagraphDisplayEventDisplay as default,
  ParagraphDisplayEventDisplayProps,
};
