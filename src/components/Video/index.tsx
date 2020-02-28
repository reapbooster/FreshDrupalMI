
import React from 'react';
import { graphql, Link } from "gatsby";
import VideoFull from "./VideoFull";

interface VideoProps {
  view: string,
  id: number,
  uuid: string,
}

class Video extends React.Component<VideoProps, VideoInterface> {

  constructor(props) {
    super(props);
    this.state = props;
    // FETCH data if data wasn't in props
  }

  render() {
    switch(this.state.view) {
      case "small":

        break;


      default:
        return <VideoFull {...this.state} />
    }
  }

}


export default Video;
