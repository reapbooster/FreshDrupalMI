import React, { useState } from 'react';
import VideoDataInterface from "../../DataTypes/VideoDataInterface";
import { Col, Card } from 'react-bootstrap';
import MediaImage, {MediaImageInterface} from '../../DataTypes/MediaImage';
import moment from 'moment';
import * as DataObject from '../../DataTypes/MediaVideo';

interface MediaDisplayVideoProps {
  data: DataObject.default;
  view_mode: string;
}

const MediaDisplayVideo: React.FunctionComponent = (props: MediaDisplayVideoProps) => {

  const [ thumbnailImageUrl, setThumbnailImageUrl ] = useState("holder.js/100x100?text=thumbnail&auto=yes");
  var thumbnail = new ImageEntityProps(props.thumbnail);
  if (thumbnail.getData !== undefined) {
    thumbnail.getData()
      .then(res => res.json())
      .then((incoming) => {
        setThumbnailImageUrl(incoming.data.uri.url);
      });
  }
  const created = moment(props.created, moment.ISO_8601);
  const getVideo = (props: VideoDataInterface) => {
    if (props.field_media_oembed_video) {
      return (
        <>
          <Col lg={3} sm={4}>
            <a href={"/video/".concat(props.drupal_internal__mid)}
              className="card my-5"
              data-drupal-id={props.drupal_internal__mid}
              data-drupal-type={props.type}
              data-uuid={props.id}>
              <Card.Img
                id={"card-image-".concat()}
                src={thumbnailImageUrl} />
              <Card.Body style={{minHeight: "150px"}}>
                <Card.Title>{props.name}</Card.Title>
              </Card.Body>
              <Card.Footer>{created.format('MMMM D, YYYY')}</Card.Footer>
            </a>
          </Col>
        </>
      )
    }
    return (
      <div hidden>No data for this one!</div>
    )
  }

  return (
    <>
      {getVideo(props)}
    </>
  );

}


export default MediaDisplayVideo;
