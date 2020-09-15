import React, { useState } from 'react';
import MediaImage, {MediaImageInterface} from '../../DataTypes/MediaImage';
import ImageStyleObject, {HolderImageStyleObject} from "../../DataTypes/ImageStyleObject";
import {EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";


interface MediaImageProps extends MediaImageInterface { }

const MediaDisplayImage: React.FunctionComponent = (props: MediaImageProps) => {
  var imageStylesObject = new MediaImage(props).getStyleObject();
  const [ imageStyleObject, setImageStyleObject ] = useState(imageStyleObject);

  if (imageStyleObject.getData !== undefined) {
    imageStyleObject.getData()
      .then(res => res.json())
      .then((incoming) => {
        console.debug("Image Style Object:", incoming);
        setImageStyleObject(new ImageStyleObject(incoming.data?));
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

export { MediaDisplayImage as default, MediaImageProps };
