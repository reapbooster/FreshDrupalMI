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
import LandingPageContent, { LandingPageContentInterface } from './LandingPageContent';
import ParagraphList from '../ParagraphList';
import EntityComponentBase, { EntityComponentState } from '../../DataTypes/EntityComponentBase';
import Loading from "../Loading";

interface LandingPageComponentProps extends EntityComponentPropsInterface {
}

interface LandingPageState extends EntityComponentState {
  attributes: LandingPageContentInterface;
}

// @ts-ignore
class LandingPage extends EntityComponentBase <LandingPageComponentProps, LandingPageState> {

  include = "&include=field_content";

  componentDidMount() {
    this.getDataForComponent(this.include);
  }

  render() {
    var content = ( <Loading /> );
    if (this.state?.attributes?.field_content?.length) {
      const list = this.state?.attributes?.field_content?.map((item) => {
        return new EntityComponentProps(item);
      })
      content = ( <ParagraphList items={list} /> );
    }
   return (
      <>
        {content}
      </>
   );
  }

}

export default LandingPage;
