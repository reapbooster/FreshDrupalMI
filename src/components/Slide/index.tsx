import React from 'react';
import FullWidthOneColumn from "./FullWidthOneColumn";
import SlideDataInterface from "../../DataTypes/SlideDataInterface";

const Slide = (props: SlideDataInterface) => {
  if (props.id) {
    switch(props.bundle) {

      default:
        return (
          <FullWidthOneColumn {...props} />
        )

    }
  }
}

export default Slide;
