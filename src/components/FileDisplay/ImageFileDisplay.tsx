import React, { useState } from 'react';
import MediaImage, {MediaImageInterface} from '../../DataTypes/MediaImage';
import Loading from "../Loading";
import ImageFile, {ImageFileInterface} from "../../DataTypes/ImageFile";
import ImageStyleObject, {ImageStyleObjectInterface} from "../../DataTypes/ImageStyleObject";
import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";

interface ImageFileDisplayProps {
  data: ImageFileInterface
  key?: number;
}

const ImageFileDisplay: React.FunctionComponent = (props: ImageFileDisplayProps) => {

  const [ imageData , setImageData ] = useState(new ImageFile(props.data));
  console.debug("ImageFileDisplay:", imageData);
  if (!imageData?.hasData()) {
    const ecp = new EntityComponentProps(imageData);
    ecp.getData('&include=image')
      .then(res => res.json())
      .then((ajaxData) => {
        console.debug("MilkenImage: Data back from JSON", ajaxData);
        setImageData(new ImageFile(ajaxData.data));
      });
    return (
      <>
        <Loading />
      </>
    )
  } else {
    const imageStyleObject = imageData.imageStyleObject;
    return (
      <>
        <img
          data-drupal-id={imageData.id}
          data-drupal-type={imageData.type}
          data-uuid={imageData.id}
          {...imageData.imageStyleObject.imageAttributes}
          height={props.height}
        />
      </>
    );
  }
}

export { ImageFileDisplay as default, ImageFileDisplayProps }
