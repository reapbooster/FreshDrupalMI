import styled from "styled-components";
import moment from "moment";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import ImageFileDisplay from "../FileDisplay/ImageFileDisplay";
import {Card} from "react-bootstrap";
import React from "react";
import {EventDataFactory} from "./EventFactories";
import {EventInterface} from "../../DataTypes/Event";

interface EventCardDisplayInterface {
  data: EventInterface;
  key?: number;
}

export const EventCardDisplay = (props: EventCardDisplayInterface) => {
  const {data, key} = props;
  const eventData = EventDataFactory(data);
  const ContainerDiv = styled.div`
      max-width: 18rem;
    `;
  const eventDate = moment(eventData.field_event_date, moment.ISO_8601);
  return (
    <>
      <ContainerDiv className={"card"} key={key ?? 0}>
        <a
          href={"event/".concat(eventData.drupal_internal__id.toString())}
          className="my-5"
          data-drupal-id={eventData.drupal_internal__id}
          data-drupal-type={eventData.type}
          data-uuid={eventData.id}
        >
          <ErrorBoundary>
            <ImageFileDisplay
              data={eventData.field_picture}
              view_mode="thumbnail"
              width="100%"
              height="220px"
            />
          </ErrorBoundary>
          <Card.Body style={{ minHeight: "150px" }}>
            <Card.Title>{eventData.title}</Card.Title>
          </Card.Body>
          <Card.Footer>{eventDate.format("MMMM D, YYYY")}</Card.Footer>
        </a>
      </ContainerDiv>
    </>
  );
}

export default EventCardDisplay;
