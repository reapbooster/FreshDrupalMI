import React, { useState } from "react";
import Loading from "../Loading";
import ImageFile, { ImageFileInterface } from "../../DataTypes/ImageFile";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Holder from "react-holder-component";

interface ImageFileDisplayProps {
  data: ImageFileInterface;
  view_mode: string;
  key?: number;
  style: Record<string, any>;
  width?: string;
  height?: string;
  className?: string;
  srcsetSizes?: string;
}

const ImageFileDisplay: React.FunctionComponent = (
  props: ImageFileDisplayProps
) => {
  const { data, view_mode, key, style, width, height, className, srcsetSizes } = props;
  const DataObject = new ImageFile(data);
  if (!DataObject.valid()) {
    return <div data-error={"DATA INVALID"} />;
  }
  const [imageData, setImageData] = useState(DataObject);
  if (!imageData?.hasData()) {
    const ecp = new EntityComponentProps(imageData);
    ecp
      .getData(imageData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        console.debug("MilkenImage: Data back from JSON", ajaxData);
        const DataObject = new ImageFile(ajaxData.data);
        setImageData(DataObject);
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
    maxWidth: "320px",
    maxHeight: "200px",
    width: "100%",
  };

  if (style) {
    attributes["style"] = style;
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
        sizes = {srcsetSizes ? srcsetSizes : ''}
      />
    </>
  );
};

export { ImageFileDisplay as default, ImageFileDisplayProps };
