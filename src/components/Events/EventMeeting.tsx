import React, {useState} from 'react';
import ImageEntityProps from "../../DataTypes/ImageEntityProps";
import EventObject from "../../DataTypes/EventObject";
import {Card, Col} from "react-bootstrap";
import moment from 'moment';


const EventMeeting = (props) => {
  const [ thumbnailImageUrl, setThumbnailImageUrl ] = useState("holder.js/100x100?text=thumbnail&auto=yes");
  if (props.field_picture?.id) {
    var thumbnail = new ImageEntityProps(props.field_picture);
    if (thumbnail.getData !== undefined) {
      thumbnail.getData()
        .then(res => res.json())
        .then((incoming) => {
          setThumbnailImageUrl(incoming.data.uri.url);
        });
    }
  }
  const eventDate = moment(props.field_event_date, moment.ISO_8601);
  const getEvent = (props: EventObject) => {
    return (
      <>
        <Col lg={3} sm={4} >
          <a
            href={"event/".concat(props.drupal_internal__id)}
            className="card my-5"
            data-drupal-id={props.drupal_internal__id}
            data-drupal-type={props.type}
            data-uuid={props.id}
          >
            <Card.Img
              id={"card-image-".concat()}
              src={thumbnailImageUrl} />
            <Card.Body style={{minHeight: "150px"}}>
              <Card.Title>{props.title}</Card.Title>
            </Card.Body>
            <Card.Footer>{eventDate.format('MMMM D, YYYY')}</Card.Footer>
          </a>
        </Col>
      </>
    )
  }

  return (
    <>
      {getEvent(props)}
    </>
  );

}

export default EventMeeting;
