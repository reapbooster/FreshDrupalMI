import React, {useState} from 'react';
import ImageFile from '../../DataTypes/ImageFile';
import {Card, Col} from "react-bootstrap";
import moment from 'moment';
import { EventSummitInterface } from "../../DataTypes/EventSummit";
import EventConference from "../../DataTypes/EventConference";
import styled, {StyledComponent} from "styled-components";
import ErrorBoundary from "../../Utility/ErrorBoundary";

export interface EventSummitProps {
  data: EventSummitInterface;
  view_mode: string;
  key?: number;
  container?: StyledComponent,
}

export const EventSummit = (props: EventSummitProps) => {
  var {data, view_mode, key, container} = props;
  if (!data instanceof EventConference) {
    data = new EventConference(data);
  }
  const ContainerDiv = container ?? styled.div`
    max-width: 18rem;
  `;
  const eventDate = moment(data.field_event_date, moment.ISO_8601);
  return (
    <>
      <ContainerDiv className={"card"}>
        <a
          href={"event/".concat(props.data.drupal_internal__id)}
          className="my-5"
          data-drupal-id={props.data.drupal_internal__id}
          data-drupal-type={props.data.type}
          data-uuid={props.data.id}
        >
          <ErrorBoundary>
            <ImageFile
              data={props.data.field_picture}
              view_mode="thumbnail"
            />
          </ErrorBoundary>
          <Card.Body style={{minHeight: "150px"}}>
            <Card.Title>{props.title}</Card.Title>
          </Card.Body>
          <Card.Footer>{eventDate.format('MMMM D, YYYY')}</Card.Footer>
        </a>
      </ContainerDiv>
    </>
  );
}

export default EventSummit;
