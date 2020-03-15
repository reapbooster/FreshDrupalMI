import React from 'react';
import VideoSmall from '../Video/VideoSmall';
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import VideoDataInterface from "../../DataTypes/VideoDataInterface";
import { Col, Row, Spinner } from "react-bootstrap";


const ExploreVideos: React.FunctionComponent = (props: EntityComponentProps) => {
  const getVideos = (items: Array<VideoDataInterface> = []) => {
    if (items.length) {
      return items.map((videoData: VideoDataInterface, key: number) => <VideoSmall key={key} {...videoData} />)
    }
    return (
      <div className={"w-25 text-align-center border-0"}>
        <Spinner
          animation="border"
          role="status"
          style={{margin: "0px auto"}}>
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }
  return (
    <>
      <Row className="h-100">
        {getVideos(props.items)}
      </Row>
    </>
  );
}


export default ExploreVideos;
