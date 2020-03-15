import React from 'react';
import ImageDataInterface from "../../DataTypes/ImageDataInterface";
import {Image, Spinner} from 'react-bootstrap'
import ImageEntityProps from "../../DataTypes/ImageEntityProps";

class MilkenImage extends React.Component<ImageEntityProps, Promise<ImageDataInterface>> {

  constructor(props) {
    super(props);
    if (props.getData !== undefined) {
      this.state = props.getData();
    }
  }

  render() {
    return (
      <>
        <h3>Milken Image</h3>
      </>
    );
  }


}

export default MilkenImage;
