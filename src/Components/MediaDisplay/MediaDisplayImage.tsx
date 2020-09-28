import React, { useState } from 'react';
import MediaImage, {MediaImageInterface} from '../../DataTypes/MediaImage';
import ImageStyleObject, {HolderImageStyleObject} from "../../DataTypes/ImageStyleObject";
import Loading from "../Loading";
import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";


export interface MediaDisplayImageProps {
  data: MediaImage;
  view_mode: string;
 }

export const MediaDisplayImage = (props: MediaDisplayImageProps) => {
  const {data, view_mode} = props;
  const DataObject = new MediaImage(data)
  const [ mediaImage, setMediaImage ] = useState(DataObject);

  if (!mediaImage.hasData()) {
    const ecp = new EntityComponentProps(mediaImage);
    ecp.getData(mediaImage.getIncluded())
      .then(res => res.json())
      .then((incoming) => {
        setMediaImage(new MediaImage(incoming.data));
      });
    return (
      <>
        <Loading />
      </>
    )
  }
  var attributes = mediaImage.imageAttributes;

  switch (view_mode) {
    case "thumbnail":
      attributes.width = "100%";
      attributes.height = "200px";
      break;

    case "fullsize":
      attributes.width = "100%";
      attributes.height = "100%";
  }
  return (
    <>
      <img
        data-drupal-id={mediaImage.drupal_internal__mid}
        data-drupal-type={mediaImage.type}
        data-uuid={mediaImage.id}
        {...attributes}
        />
    </>
  );
}

export default MediaDisplayImage;
