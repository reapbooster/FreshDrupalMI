import React from 'react';
import EntityComponentBase, {EntityComponentState} from '../../DataTypes/EntityComponentBase';
import ImageDataInterface from '../../DataTypes/ImageDataInterface';
import ImageStyleObject from "../../DataTypes/ImageStyleObject";
import {EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";


const MediaImage: React.FunctionComponent = (props) => {
  const style = new ImageStyleObject(props.field_media_image?.image_style_uri);
  const url = style.getStyleByMachineName(props.view_mode) || props.thumbnail.uri.url;
  return (
    <>
      <img
        {...style.getImgAttributes()}
        height={props.height}
        />
    </>
  );
}

export default MediaImage;
