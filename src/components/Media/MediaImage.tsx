import React, { useState } from 'react';
import EntityComponentBase, {EntityComponentState} from '../../DataTypes/EntityComponentBase';
import ImageDataObject, {ImageDataInterface} from '../../DataTypes/ImageDataObject';
import ImageStyleObject, {HolderImageStyleObject} from "../../DataTypes/ImageStyleObject";
import {EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import ImageEntityProps from "../../DataTypes/ImageEntityProps";
import moment from "moment";
import {Col} from "react-bootstrap";

interface MediaImageProps extends EntityComponentPropsInterface {
  field_media_image: ImageDataInterface;
}

const MediaImage: React.FunctionComponent = (props: MediaImageProps) => {
  var dataObject = new ImageDataObject(props.field_media_image);
  const [ imageStyleObject, setImageStyleObject ] = useState(dataObject.imageStyleObject);

  if (imageStyleObject.getData !== undefined) {
    imageStyleObject.getData()
      .then(res => res.json())
      .then((incoming) => {
        console.debug("Image Style Object:", incoming);
        setImageStyleObject(new ImageStyleObject(incoming.data?.image_style_uri));
      });
  }
  return (
    <>
      <img
        data-drupal-id={props.drupal_internal__mid}
        data-drupal-type={props.type}
        data-uuid={props.id}
        {...imageStyleObject.getImgAttributes()}
        height={props.height}
        />
    </>
  );
}

export { MediaImage as default, MediaImageProps };
