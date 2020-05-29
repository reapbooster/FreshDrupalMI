import React from 'react';
import FullWidthOneColumn from "./FullWidthOneColumn";
import SlideDataInterface from "../../DataTypes/SlideDataInterface";
import EntityComponentBase, {EntityComponentState} from "../../DataTypes/EntityComponentBase";
import Loading from "../Loading";
import {Card} from "react-bootstrap";
import moment from "moment";

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
      if (this.props.view_mode == "card") {
        return (
          <Card className="my-5">
            <Card.Img
              id={"card-image-".concat(this.props.id)}
              src={this.state.attributes?.field_background_image?.uri?.url} />
            <Card.Body style={{minHeight: "150px"}}>
              <Card.Title>{this.state.attributes.title}</Card.Title>
            </Card.Body>
            <Card.Footer>{created.format('MMMM D, YYYY')}</Card.Footer>
          </Card>
        )
      }

      switch(this.state.bundle) {
        default:
          return (
            <FullWidthOneColumn {...this.state.attributes} view_mode={this.props.view_mode} />
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
