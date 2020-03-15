//http://localhost:8080/jsonapi/entity_subqueue/homepage_videos?jsonapi_include=1
//

import React from 'react'
import ReactDOM from 'react-dom';
import SlideShow from "../Slideshow";
import ExploreVideos from "../ExploreVideos";
import { Container } from "react-bootstrap";
import {
  EntityComponentProps,
  EntityComponentPropsInterface
} from '../../DataTypes/EntityComponentProps';

interface HomepageState {
  slideshow: EntityComponentPropsInterface,
  videos: EntityComponentPropsInterface,
}

class Homepage extends React.Component<any, HomepageState> {

  constructor(props) {
    super(props);
    this.state = {
      slideshow: new EntityComponentProps(),
      videos: new EntityComponentProps(),
    }
  }

  componentDidMount(): void {
    var me = this;
    fetch('/jsonapi/entity_subqueue/homepage_slides?jsonapi_include=1&include=items')
      .then(res => res.json())
      .then((ajaxData) => {
        if (ajaxData.data !== undefined && ajaxData.data[0] !== undefined) {
          me.setState({ slideshow: new EntityComponentProps(ajaxData.data[0]) });
        }
      });
    fetch('/jsonapi/entity_subqueue/homepage_videos?jsonapi_include=1&include=items')
      .then(res => res.json())
      .then((ajaxData) => {
        if (ajaxData.data !== undefined && ajaxData.data[0] !== undefined) {
          me.setState({ videos: new EntityComponentProps(ajaxData.data[0]) });
        }
      });
  }

  // @ts-ignore
  render() {
    return (
      <Container>
        <SlideShow {...this.state.slideshow} />
        <ExploreVideos {...this.state.videos} />
      </Container>

    )
  }

}

export default Homepage;
