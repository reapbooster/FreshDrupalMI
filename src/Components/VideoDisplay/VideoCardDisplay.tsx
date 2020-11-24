import moment from "moment";
import { Container } from "react-bootstrap";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import ImageFileDisplay from "../FileDisplay/ImageFileDisplay";
import { Card } from "react-bootstrap";
import React from "react";
import { MediaVideoInterface } from "../../DataTypes/MediaVideo";
import styled from "styled-components";

export interface VideoCardDisplayProps {
  data: MediaVideoInterface;
}

export const VideoCardDisplay = (props: VideoCardDisplayProps) => {
  const { data } = props;

  const created = moment(data.created, "ddd MMM DD YYYY Z");

  const CardWrapper = styled.div`
    min-width: 222px;

    &:hover {
      box-shadow: 0 8px 16px 0 grey;
    }
  `;

  const CustomCardHeader = styled.div`
    position: relative;
  `;

  const DateWrapper = styled.div`
    width: 100%;
    background: rgba(0, 0, 0, 0.53);
    color: white;
    text-align: right;
    padding-right: 0.5em;
    position: absolute;
    bottom: 0;
  `;

  return (
    <>
      <CardWrapper className="card my-5 mx-2 text-align-left flex-shrink-1">
        <a
          href={
            data.path.alias
              ? data.path.alias
              : "/media/" + data.drupal_internal__mid
          }
          className=""
          data-drupal-id={data.drupal_internal__mid}
          data-drupal-type={data.type}
          data-uuid={data.id}
          style={{ maxWidth: "393px" }}
        >
          <CustomCardHeader>
            <ErrorBoundary>
              <ImageFileDisplay
                data={data.getThumbnail()}
                view_mode="thumbnail"
                style={{ maxWidth: "100%" }}
              />
              <DateWrapper>{created.format("MMMM D, YYYY")}</DateWrapper>
            </ErrorBoundary>
          </CustomCardHeader>
          <Card.Body style={{ minHeight: "5em", paddingBottom: "0" }}>
            <Card.Title style={{ fontSize: "1em", marginBottom: "0" }}>
              {data.name}
            </Card.Title>
          </Card.Body>
          <Card.Footer className="bg-white border-0">
            Authors and Tags
          </Card.Footer>
        </a>
      </CardWrapper>
    </>
  );
};

export default VideoCardDisplay;
