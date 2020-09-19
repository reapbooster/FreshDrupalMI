import React, { useState } from 'react';
import MediaImage, {MediaImageInterface} from '../../DataTypes/MediaImage';
import ImageStyleObject, {HolderImageStyleObject} from "../../DataTypes/ImageStyleObject";
import Loading from "../Loading";
import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";


interface MediaDisplayImageProps {
  data: MediaImage;
  view_mode: string;
 }

const MediaDisplayImage: React.FunctionComponent = (props: MediaDisplayImageProps) => {
  const [ mediaImage, setMediaImage ] = useState(new MediaImage(props.data));

  if (!mediaImage.hasData()) {
    const ecp = new EntityComponentProps(mediaImage);
    ecp.getData()
      .then(res => res.json())
      .then((incoming) => {
        console.debug("Image Style Object:", incoming);
        setMediaImage(new MediaImage(incoming.data));
      });
    return (
      <>
        <Loading />
      </>
    )
  }
  return (
    <>
      <img
        data-drupal-id={mediaImage.drupal_internal__mid}
        data-drupal-type={mediaImage.type}
        data-uuid={mediaImage.id}
        {...mediaImage.getStyleObject().imageAttributes}
        height={mediaImage.field_height.concat('px')}
        />
    </>
  );
}

export { MediaDisplayImage as default, MediaDisplayImageProps };
