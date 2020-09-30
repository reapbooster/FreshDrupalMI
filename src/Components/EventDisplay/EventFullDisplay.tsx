import React from 'react';
import styled from 'styled-components';
import {Container, Row} from 'react-bootstrap;
import {EventInterface} from "../../DataTypes/Event";

export interface EventFullDisplayProps {
  data: EventInterface;
}

export const EventFullDisplay = (props: EventFullDisplayProps) => {
  const {data} = props;
  const eventData = new Event(data);

  return (
    <>
      <Container>
        <Row>

        </Row>
      </Container>
    </>
  )

}
