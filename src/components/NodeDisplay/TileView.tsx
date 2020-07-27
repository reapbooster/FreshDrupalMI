
import React from 'react';
import {Card} from 'react-bootstrap';
import MediaImage, { MediaImageProps } from "../Media/MediaImage";
import ImageDataInterface from '../../DataTypes/ImageDataInterface'

interface TileViewProps {
  key: number;
  field_hero_image: MediaImageProps,
}

const TileView: React.FunctionComponent = (props: TileViewProps) => {
  var image = ( <Card.Img dataSrc={"holder.js/220x150"} /> );
  console.log("HOLDER IMAGE", this);
  if (props.field_hero_image?.field_media_image) {
    image = ( <MediaImage
      {...props.field_hero_image}
      height={"150px"}
    /> );
  }
  return (
    <Card key={props.key} className={"col-sm-6 col-sm-4 col-md-3 col-lg-3 m-10 p-10 text-center"}>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
      </Card.Body>
      {image}
    </Card>
  );

}

export { TileView as default, TileViewProps };
