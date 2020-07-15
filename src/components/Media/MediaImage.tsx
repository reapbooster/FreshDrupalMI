import React from 'react';
import EntityComponentBase, {EntityComponentState} from '../../DataTypes/EntityComponentBase';
import ImageDataInterface from '../../DataTypes/ImageDataInterface';
import ImageStyleObject from "../../DataTypes/ImageStyleObject";
import {EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";


const MediaImage: React.FunctionComponent = (props) => {
  console.log(props);
  return (
    <>
      <img src={props.thumbnail.uri.url} />
    </>
  );
}

export default MediaImage;
