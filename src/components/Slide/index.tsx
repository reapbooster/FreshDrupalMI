import React from 'react';
import FullWidthOneColumn from "./FullWidthOneColumn";
import FiftyFifty from './FiftyFifty';
import HeroHalfHeight from './HeroHalfHeight';
import SlideDataInterface from "../../DataTypes/SlideDataInterface";
import EntityComponentBase, {EntityComponentState} from "../../DataTypes/EntityComponentBase";
import Loading from "../Loading";
import {Card} from "react-bootstrap";
import moment from "moment";

const SlideBundle = {
  "slide--50_50_text_on_left": FiftyFifty,
  "slide--50_50_text_on_right": FiftyFifty,
  "slide--full_width_one_column": FullWidthOneColumn,
  "slide--hero_half_height": HeroHalfHeight,
}

class Slide extends EntityComponentBase<SlideDataInterface, EntityComponentState> {

  static defaultProps = {
    view_mode: "full"
  }

  include = "&include=field_background_image";

  componentDidMount() {
    if (!this.state.loaded && !this.state.loading) {
      this.getDataForComponent(this.include);
    }
  }

  render() {
    console.log("slide", this.props, this.state);
    if (this.state.loaded) {
      const created = moment(this.state.attributes.created, moment.ISO_8601);
      const Component = SlideBundle[this.props.type];
      return ( <Component {...this.state.attributes} view_mode={this.props.view_mode} />)
    }
     else if (this.state.loading) {
      return (<Loading />);
    }
     else {
      return (
        <h1>No Data Available</h1>
      );
    }
  }
}


export default Slide;
