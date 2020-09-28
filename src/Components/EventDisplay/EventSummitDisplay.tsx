import React, {useState} from 'react';
import {Card, Col} from "react-bootstrap";
import moment from 'moment';
import { EventSummitInterface } from "../../DataTypes/EventSummit";
import EventConference from "../../DataTypes/EventConference";
import styled, {StyledComponent} from "styled-components";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import ImageFileDisplay from '../FileDisplay/ImageFileDisplay';

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
          href={"event/".concat(data.drupal_internal__id.toString())}
          className="my-5"
          data-drupal-id={data.drupal_internal__id}
          data-drupal-type={data.type}
          data-uuid={data.id}
        >
          <ErrorBoundary>
            <ImageFileDisplay
              data={data.field_picture}
              view_mode="thumbnail"
              width="100%"
              height="220px"
            />
          </ErrorBoundary>
          <Card.Body style={{minHeight: "150px"}}>
            <Card.Title>{data.title}</Card.Title>
          </Card.Body>
          <Card.Footer>{eventDate.format('MMMM D, YYYY')}</Card.Footer>
        </a>
      </ContainerDiv>
    </>
  );
}

export default EventSummit;
