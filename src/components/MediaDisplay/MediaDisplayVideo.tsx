import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import moment from 'moment';
import MediaVideo, {MediaVideoInterface} from "../../DataTypes/MediaVideo";
import ImageFileDisplay from "../FileDisplay/ImageFileDisplay";
import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import styled, {StyledComponent} from "styled-components";

export interface MediaDisplayVideoProps {
  data: MediaVideoInterface;
  view_mode: string;
  container?: StyledComponent<any, any>;
}

export const MediaDisplayVideo: React.FunctionComponent = (props: MediaDisplayVideoProps) => {
  var {data, view_mode, column } = props;
  const ColumnDiv = column ?? styled.div`
      max-width: 18rem;
    `;
  const [videoData, setVideoData] = useState(new MediaVideo(data));
  if (!videoData.hasData()) {
    var ecp = new EntityComponentProps(videoData);
    ecp.getData(videoData.getIncluded())
      .then(res => res.json())
      .then(ajaxData => {
        setVideoData(new MediaVideo(ajaxData.data));
      });
  }
  const created = moment(videoData.created, moment.ISO_8601);
  return (
    <>
      <ColumnDiv>
        <a href={"/video/".concat(videoData.drupal_internal__mid)}
           className="card my-5"
           data-drupal-id={videoData.drupal_internal__mid}
           data-drupal-type={videoData.type}
           data-uuid={videoData.id}>
          <ErrorBoundary>
            <ImageFileDisplay
              data={videoData.getThumbnail()}
              view_mode="thumbnail"
              style={{maxWidth: "18rem"}}
            />
          </ErrorBoundary>
          <Card.Body style={{minHeight: "150px"}}>
            <Card.Title>{videoData.name}</Card.Title>
          </Card.Body>
          <Card.Footer>{created.format('MMMM D, YYYY')}</Card.Footer>
        </a>
      </ColumnDiv>
    </>
  )

}


export default MediaDisplayVideo;
