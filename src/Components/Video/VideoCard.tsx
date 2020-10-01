import React from "react";
import VideoDataInterface from "../../DataTypes/VideoDataInterface";
import { Card, Col } from "react-bootstrap";

const VideoCard: React.FunctionComponent = (props: VideoDataInterface) => {
  return (
    <>
      <Col lg={3} sm={4}>
        <Card className="my-5">
          <Card.Img id={"card-image-".concat()} src={thumbnailImageUrl} />
          <Card.Body style={{ minHeight: "150px" }}>
            <Card.Title>{props.name}</Card.Title>
          </Card.Body>
          <Card.Footer>{created.format("MMMM D, YYYY")}</Card.Footer>
        </Card>
      </Col>
    </>
  );
};

export default VideoSmall;
