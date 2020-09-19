import React, {useState} from 'react';
import ImageFile from '../../DataTypes/ImageFile';
import {Card, Col} from "react-bootstrap";
import moment from 'moment';
import {EventSummitInterface} from "../../DataTypes/EventSummit";

interface EventConferenceDisplayProps {
  data: EventSummitInterface;
  view_mode: string;
  key?: number;
}

const EventConferenceDisplay = (props: EventConferenceDisplayProps) => {
  const eventDate = moment(props.data.field_event_date, moment.ISO_8601);
  return (
    <>
      <Col lg={3} md={4} sm={6} xs={12} className={"card"}>
        <a
          href={"event/".concat(props.data.drupal_internal__id)}
          className="my-5"
          data-drupal-id={props.data.drupal_internal__id}
          data-drupal-type={props.data.type}
          data-uuid={props.data.id}
        >
          <ImageFile
            data={props.data.field_picture}
            view_mode="thumbnail"
          />
          <Card.Body style={{minHeight: "150px"}}>
            <Card.Title>{props.data.title}</Card.Title>
          </Card.Body>
          <Card.Footer>{eventDate.format('MMMM D, YYYY')}</Card.Footer>
        </a>
      </Col>
    </>
  );
}

export {EventConferenceDisplay as default, EventConferenceDisplayProps};
