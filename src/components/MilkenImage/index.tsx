import React, { useState } from 'react';
import { Image } from 'react-bootstrap'
import LinkList from '../../DataTypes/LinkList'
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import ImageStyleObject from "../../DataTypes/ImageStyleObject";
import EntityComponentBase from "../../DataTypes/EntityComponentBase";

interface MilkenImageProps {
  entityComponentProps: EntityComponentProps;
  key: number;
  style: object;
}

class MilkenImageState {
  entityComponentProps: EntityComponentProps;
  loading?: boolean;
  loaded?: boolean;
  error?: boolean;
  image?: Image;
  attributes?: MilkenImageAttributes;

  constructor(values) {
    this.attributes = new MilkenImageAttributes(values);
  }
}


class MilkenImageAttributes {

  id?: string;
  type?: string;
  links?: LinkList;
  langcode?: string;
  filename?: string;
  uri?: ImageURIObject;
  filemime?: string;
  filesize: number;
  status: true;
  created: string;
  changed: string;
  image_style_uri: ImageStyleObject;
  field_photo_subject_name: string;
  field_photo_subject_title: string;
  field_photo_subject_org: string;

  constructor(values = null) {
    if (values !== null) {
      console.log("MilkenImageAttributes.constructor", values);
      this.image_style_uri = new ImageStyleObject(values?.image?.image_style_uri);
      this.uri = new ImageURIObject(values?.image?.uri);
      this.links = new LinkList(values?.image?.links);
      this.field_photo_subject_name = values.field_photo_subject_name;
      this.field_photo_subject_title = values.field_photo_subject_title;
      this.field_photo_subject_org = values.field_photo_subject_org;
    }
  }

}

class ImageURIObject {
  url: string;
  value: string;
}

const MilkenImage = (props: MilkenImageProps, key: number) => {
  const [ imageData , setImageData ] = useState(new MilkenImageState());
  console.log("MilkenImage:", imageData);
  if (!imageData?.image_style_uri) {
    props.entityComponentProps.getData('&include=image')
      .then(res => res.json())
      .then((ajaxData) => {
        console.log("MilkenImage: Data back from JSON", imageData);
        setImageData(new MilkenImageAttributes(ajaxData.data));
      });
    return (
      <figure>
        <Loading />
        <figcaption>Loading...</figcaption>
      </figure>
    )
  } else {
    console.log("MilkenImage:", imageData);
    var imageUrl = imageData?.uri?.url;
    if (imageData?.image_style_uri instanceof ImageStyleObject) {
      imageUrl = imageData?.image_style_uri?.getStyleByMachineName('crop_thumbnail');
    }
    return (
      <figure key={key}>
        <div
          style={{
            backgroundImage: "url(" + imageUrl + ")",
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
