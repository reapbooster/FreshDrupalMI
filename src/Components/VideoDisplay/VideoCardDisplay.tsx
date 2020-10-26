import moment from "moment";
import { Container } from "react-bootstrap";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import ImageFileDisplay from "../FileDisplay/ImageFileDisplay";
import { Card } from "react-bootstrap";
import React from "react";
import { MediaVideoInterface } from "../../DataTypes/MediaVideo";

export interface VideoCardDisplayProps {
  data: MediaVideoInterface;
}

export const VideoCardDisplay = (props: VideoCardDisplayProps) => {
  const { data } = props;
  const created = moment(data.created, moment.ISO_8601);
  return (
    <>
      <Container className="text-align-left">
        <a
          href={data.path.alias}
          className="card my-5"
          data-drupal-id={data.drupal_internal__mid}
          data-drupal-type={data.type}
          data-uuid={data.id}
        >
          <ErrorBoundary>
            <ImageFileDisplay
              data={data.getThumbnail()}
              view_mode="thumbnail"
              style={{ maxWidth: "18rem" }}
            />
          </ErrorBoundary>
          <Card.Body style={{ minHeight: "150px" }}>
            <Card.Title>{data.name}</Card.Title>
          </Card.Body>
          <Card.Footer>{created.format("MMMM D, YYYY")}</Card.Footer>
        </a>
      </Container>
    </>
  );
};

export default VideoCardDisplay;
