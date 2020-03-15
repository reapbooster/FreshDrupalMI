
import React from 'react';
import { graphql, Link } from "gatsby";
import VideoFull from "./VideoFull";
import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";
import VideoDataInterface from "../../DataTypes/VideoDataInterface";

interface VideoProps {
  view: string,
  id: number,
  uuid: string,
}

const Video: React.FunctionComponent = (props: VideoDataInterface) => {

}


export default Video;
