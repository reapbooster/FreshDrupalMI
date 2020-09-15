import React, {useState} from 'react';
import ImageEntityProps from "../../DataTypes/ImageEntityProps";
import Event from "../../DataTypes/EventObject";
import {Card, Col} from "react-bootstrap";
import moment from 'moment';
import Holder from 'react-holder-component'

const EventConference: React.FunctionComponent = (props: Event) => {
  const [ thumbnailImageUrl, setThumbnailImageUrl ] = useState("?holderjs/100x100&text=thumbnail&auto=yes");
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
  return (
    <>
      <Col lg={3} md={4} sm={6} xs={12} className={"card"}>
        <a
          href={"event/".concat(props.drupal_internal__id)}
          className="my-5"
          data-drupal-id={props.drupal_internal__id}
          data-drupal-type={props.type}
          data-uuid={props.id}
        >
          <Holder
            id={"card-image-".concat(props.id)}
            className={"card-img-top"}
            width="220px"
            height="150px"
          />
          <Card.Body style={{minHeight: "150px"}}>
            <Card.Title>{props.title}</Card.Title>
          </Card.Body>

          <Card.Footer>{eventDate.format('MMMM D, YYYY')}</Card.Footer>
        </a>
      </Col>
    </>
  );


}


export default EventConference;
