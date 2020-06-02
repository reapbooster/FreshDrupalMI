
import React from 'react';
import {EntityComponentProps, EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import SlideDataInterface from "../../DataTypes/SlideDataInterface";
import SlideShow from "../Slideshow";
import EntityComponentBase, {EntityComponentState} from '../../DataTypes/EntityComponentBase';
import Loading from "../Loading";
import {Col} from "react-bootstrap";

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
        <Col lg={12}>
          <SlideShow
            items={this.props.field_slides}
            view_mode={this.props.view_mode}
          />
        </Col>
      )
    } else if (this.state.loading) {
      return(
        <Col key={this.props.key}>
          <Loading />
        </Col>
        );
    } else {
      return (
        <Col key={this.props.key}><h1>No Content Available</h1></Col>
      )
    }
  }

}

export default ParagraphSlide;
