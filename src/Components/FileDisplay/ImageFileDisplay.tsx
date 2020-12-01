import React, { useState } from "react";
import Loading from "../Loading";
import { ImageFile, ImageFileInterface } from "../../DataTypes/ImageFile";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";

export interface ImageFileDisplayProps {
  data: ImageFileInterface;
  view_mode: string;
  key?: number;
  style: Record<string, unknown>;
  width?: string;
  height?: string;
  className?: string;
  srcsetSizes?: string;
}

export const ImageFileDisplay: React.FunctionComponent = (
  props: ImageFileDisplayProps
) => {
  const { data, style, width, height, className, srcsetSizes } = props;
  const DataObject = new ImageFile(data);
  const [imageData, setImageData] = useState(DataObject);
  if (!DataObject.valid()) {
    return <div data-error="DATA INVALID" />;
  }
  if (!imageData?.hasData()) {
    const ecp = new EntityComponentProps(imageData);
    ecp
      .getData(imageData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        console.debug("MilkenImage: Data back from JSON", ajaxData);
        const newDO = new ImageFile(ajaxData.data);
        setImageData(newDO);
      });
    return (
      <>
        <Loading />
      </>
    );
  }

  console.debug("Image should have data now:", imageData);

  const attributes = {
    width: width ?? "100%",
    height: height ?? "200px,",
  };

  const imageTagStyle = style ?? {
    width: "100%",
  };

  if (style) {
    attributes.style = style;
  }
  const styleObject = imageData.imageStyleObject;
  return (
    <>
      <img
        data-drupal-id={imageData.id}
        data-drupal-type={imageData.type}
        data-uuid={imageData.id}
        {...styleObject.imageAttributes}
        style={imageTagStyle}
        className={className}
        sizes={srcsetSizes || ""}
        alt={imageData.filename}
      />
    </>
  );
};

export default ImageFileDisplay;
