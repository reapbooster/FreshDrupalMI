
import React, { useState } from 'react';
import VideoDataInterface from "../../DataTypes/VideoDataInterface";
import { Col, Card } from 'react-bootstrap';
import ImageEntityProps from "../../DataTypes/ImageEntityProps";
import moment from 'moment';
import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";

const VideoSmall: React.FunctionComponent = (props: VideoDataInterface) => {
  const [ thumbnailImageUrl, setThumbnailImageUrl ] = useState("holder.js/100x100?text=thumbnail&auto=yes");
  var thumbnail = new ImageEntityProps(props.thumbnail);
  if (thumbnail.getData !== undefined) {
    thumbnail.getData().then((incoming) => {
      setThumbnailImageUrl(incoming.uri.url);
    });
  }
  const created = moment(props.created, moment.ISO_8601);
  const getVideo = (props: VideoDataInterface) => {
    if (props.field_media_oembed_video) {
      return (
        <>
          <Col lg={3} sm={4}>
            <Card className="my-5">
              <Card.Img
                id={"card-image-".concat()}
                src={thumbnailImageUrl} />
              <Card.Body style={{minHeight: "150px"}}>
                <Card.Title>{props.name}</Card.Title>
              </Card.Body>
              <Card.Footer>{created.format('MMMM D, YYYY')}</Card.Footer>
            </Card>
          </Col>
        </>
      )
    }
    return (
      <h1>Video Does not have Data.</h1>
    )
  }

  return (
    <>
      {getVideo(props)}
    </>
  );
}


export default VideoSmall;
