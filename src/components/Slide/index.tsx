import React from 'react';
import { EntityComponentPropsInterface } from "../../DataTypes/EntityComponentProps";
import FullWidthOneColumn from "./FullWidthOneColumn";

class Slide extends React.Component {

  constructor(props: EntityComponentPropsInterface) {
    super(props);
    console.log("Slide Init!", props);
    this.state = {
      data: {}
    };
  }

  componentDidMount(): void {
    this.fetchNodeData();
  }

  fetchNodeData() {
    let me = this;
    console.log("mounted Slide, let's get some data...", this);
    fetch(`/jsonapi/${this.props.entityTypeId}/${this.props.bundle}/${this.props.id}?include=field_background_image&jsonapi_include=1`)
      .then(res => res.json())
      .then((ajaxData) => {
        console.log('data is back from drupal', ajaxData);
        me.setState({ data: ajaxData.data });
      });
  }

  render() {
    if (this.state.data.id) {
      switch(this.props.bundle) {

        default:
          return (
            <FullWidthOneColumn {...this.state.data} />
          )

      }
    }

    return (<div></div>);
  }

}

export default Slide;
