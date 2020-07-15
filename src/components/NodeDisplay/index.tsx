import React from 'react';
import Article from "../Article";
import LandingPage from "../LandingPage";
import {EntityComponentProps, EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import {Card} from "react-bootstrap";
import MediaImage from '../Media/MediaImage';
import Holder from 'holderjs';
import EntityComponentBase, {EntityComponentState} from '../../DataTypes/EntityComponentBase'

const NodeBundleComponents = {
  article: Article,
  landing_page: LandingPage,
}

function getComponentForBundle(bundleId) {
  return ( NodeBundleComponents[bundleId] || null );
}

class NodeDisplay extends EntityComponentBase {

  include="&include=field_hero_image,field_hero_image.field_media_image";

  componentDidMount() {
    if (!this.state.loaded && !this.state.loading) {
      this.getDataForComponent(this.include);
    }
  }

  render() {
    var image = ( <Card.Img dataSrc={"holder.js/220x150"} /> );
    console.log("HOLDER IMAGE", this);
    if (this.state?.attributes?.field_hero_image?.field_media_image) {
     image = ( <MediaImage {...this.state.attributes.field_hero_image} /> );
    }
    return (
      <Card key={this.state.key}>
        <Card.Body>
          <Card.Title>{this.state?.attributes?.title}</Card.Title>
        </Card.Body>
        {image}
      </Card>
    );
  }

}



export {NodeDisplay as default, NodeBundleComponents};
