import React, { useState } from 'react';
import { Image } from 'react-bootstrap'
import MediaImage, {MediaImageInterface} from '../../DataTypes/MediaImage';
import LinkList from '../../DataTypes/LinkList'
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import ImageStyleObject from "../../DataTypes/ImageStyleObject";
import EntityComponentBase from "../../DataTypes/EntityComponentBase";

interface MilkenImageProps {
  entityComponentProps: EntityComponentProps;
  key: number;
  style?: object;
  attributes?: MediaImageInterface
}


class MilkenImageState {

  entityComponentProps?: EntityComponentProps;
  loading?: boolean;
  loaded?: boolean;
  error?: boolean;
  attributes?: MediaImage;
  style?: object;
  key?: number;

  constructor(values: MilkenImageProps) {
    Object.assign(this, values);
  }
}


const MilkenImage = (props: MilkenImageProps, key: number) => {
  const values = Object.assign({}, props, {key: key});
  const [ imageData , setImageData ] = useState(new MilkenImageState(values));
  console.debug("MilkenImage:", imageData);
  if (!imageData?.attributes?.uri) {
    props.entityComponentProps.getData('&include=image')
      .then(res => res.json())
      .then((ajaxData) => {
        console.debug("MilkenImage: Data back from JSON", ajaxData);
        setImageData({ attributes: new MediaImage(ajaxData.data) });
      });
    return (
      <figure>
        <Loading />
        <figcaption>Loading...</figcaption>
      </figure>
    )
  } else {
    return (
      <figure key={key}>
        <div
          style={{
            backgroundImage: imageData.attributes.srcset,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            width: "8em",
            height: "8em",
            borderRadius: "50%",
            margin: "auto",
          }}
        />
        <figcaption style={{ textAlign: "center", }}>
          <em style={{ fontWeight: "bold", fontSize: "1.2em", }}>{imageData?.field_photo_subject_name}</em><br />
          {imageData?.field_photo_subject_title}<br />
          {imageData?.field_photo_subject_org}
        </figcaption>
      </figure>
    );
  }


}


export { MilkenImage as default, MilkenImageProps, MilkenImageAttributes }
