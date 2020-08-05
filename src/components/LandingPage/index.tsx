//http://localhost:8080/jsonapi/entity_subqueue/homepage_videos?jsonapi_include=1
//

import React from 'react'

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


class LandingPage extends EntityComponentBase<LandingPageComponentProps, LandingPageState> {

  include = "&include=field_content,field_hero_image";

  componentDidMount() {
    console.log("Landing Page Mount", this);
    if (!this.props.loaded && !this.props.loading) {
      this.getDataForComponent(this.include);
    }
  }

  render() {
    console.log("Landing Page Render", this.props, this.state);
    var content = ( <Loading /> );
    if (this.state?.loaded == true) {
      switch (this.props.view_mode) {
        case "tiles":
          content = (
            <div>
              <h1>Tiles View</h1>
            </div>
          );
          break;

        default:
          const list = this.state?.attributes?.field_content?.map((item) => {
            return new EntityComponentProps(item);
          })
            content = ( <ParagraphList items={list} /> );
      }

    }
   return (
      <div>
        {content}
      </div>
   );
  }

}

export default LandingPage;
