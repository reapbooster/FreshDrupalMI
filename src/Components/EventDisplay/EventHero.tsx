import React from 'react';
import {EventInterface} from "../../DataTypes/Event";
import styled from 'styled-components';
import {Jumbotron} from "react-bootstrap";


export const EventHero = (props: EventHeroProps) => {
  const { data } = props;

  return (
    <Jumbotron style={{minHeight: "300px", midWidth: "100%"}}>
      <h1>{data.title}</h1>
    </Jumbotron>
  )
}
