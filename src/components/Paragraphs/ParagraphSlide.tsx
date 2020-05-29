
import React from 'react';
import {EntityComponentProps, EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import SlideDataInterface from "../../DataTypes/SlideDataInterface";
import SlideShow from "../Slideshow";
import EntityComponentBase, {EntityComponentState} from '../../DataTypes/EntityComponentBase';
import Loading from "../Loading";

interface ParagraphSlideProps extends EntityComponentPropsInterface {
  key: number;
  field_slides: Array<SlideDataInterface>;
}


class ParagraphSlide extends EntityComponentBase<ParagraphSlideProps, EntityComponentState> {

  static defaultProps = {
    view_mode: "full"
  }

  render(): React.ReactNode {
    console.log("Paragraph Slide", this.props, this.state);
    if (this.state.loaded) {
      return (
        <SlideShow
          items={this.props.field_slides}
          view_mode={this.props.view_mode}
        />
      )
    } else if (this.state.loading) {
      return(
        <div key={this.props.key}>
          <Loading />
        </div>
        );
    } else {
      return (
        <h1 key={this.props.key}>No Content Available</h1>
      )
    }
  }

}

export default ParagraphSlide;
