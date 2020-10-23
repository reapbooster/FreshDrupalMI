import React, { useState } from "react";
import MediaImage from "../../DataTypes/MediaImage";
import Loading from "../Loading";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Holder from "react-holder";

export interface MediaDisplayImageProps {
  data: MediaImage;
  view_mode: string;
}

export const MediaDisplayImage = (props: MediaDisplayImageProps) => {
  const { data, view_mode } = props;
  console.debug("MediaDisplayImage", props);
  const DataObject = new MediaImage(data);
  const [mediaImage, setMediaImage] = useState(DataObject);

  if (!mediaImage.hasData()) {
    const ecp = new EntityComponentProps(mediaImage);
    ecp
      .getData(mediaImage.getIncluded())
      .then((res) => res.json())
      .then((incoming) => {
        const DataObject = new MediaImage(incoming.data);
        setMediaImage(DataObject);
      });
    return <Loading />;
  }
  console.debug("image should have data now: ", mediaImage);
  const attributes =
    mediaImage.field_media_image.imageStyleObject.imageAttributes;
  console.debug("image attributes => ", attributes);
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
    <img
      data-drupal-id={mediaImage.drupal_internal__mid}
      data-drupal-type={mediaImage.type}
      data-uuid={mediaImage.id}
      {...attributes}
    />
  );
};

export default MediaDisplayImage;
