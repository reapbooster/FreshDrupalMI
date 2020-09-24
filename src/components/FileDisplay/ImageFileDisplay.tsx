import React, { useState } from 'react';
import Loading from "../Loading";
import ImageFile, {ImageFileInterface} from "../../DataTypes/ImageFile";
import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";

interface ImageFileDisplayProps {
  data: ImageFileInterface
  view_mode: string;
  key?: number;
  style: Record<string, any>;
}

const ImageFileDisplay: React.FunctionComponent = (props: ImageFileDisplayProps) => {
  var {data, view_mode, key, style} = props;
  const DataObject = new ImageFile(data);
  // TODO: swap this out on View_mode change
  const imageTagStyle = style ?? {
    maxWidth: "320px",
    maxHeight: "200px",
  };
  const [ imageData , setImageData ] = useState(DataObject);
  console.debug("ImageFileDisplay:", imageData);
  if (!imageData?.hasData()) {
    const ecp = new EntityComponentProps(imageData);
    ecp.getData(imageData.getIncluded())
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
          {...imageStyleObject.imageAttributes}
          style={imageTagStyle}
        />
      </>
    );
  }
}

export { ImageFileDisplay as default, ImageFileDisplayProps }
