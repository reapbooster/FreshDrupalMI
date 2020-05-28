import React from 'react';
import FullWidthOneColumn from "./FullWidthOneColumn";
import SlideDataInterface from "../../DataTypes/SlideDataInterface";
import EntityComponentBase, {EntityComponentState} from "../../DataTypes/EntityComponentBase";
import Loading from "../Loading";

class Slide extends EntityComponentBase<SlideDataInterface, EntityComponentState> {

  include = "&include=field_background_image";

  componentDidMount() {
    if (!this.ecp.hasData()) {
      this.getDataForComponent(this.include);
    }
  }

  render() {
    console.log("slide", this.props, this.state);
    if (this.state.loaded) {
      switch(this.state.bundle) {
        default:
          return (
            <FullWidthOneColumn {...this.state.attributes} />
          )
      }
    } else if (this.state.loading) {
      return (<Loading />);
    }
     else {
      return (
        <h1>No Data Available</h1>
      )
    }
  }
}

export default Slide;
