
import React from 'react';
import {EntityComponentProps, EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import EntityComponentBase, {EntityComponentState} from '../../DataTypes/EntityComponentBase';
import Loading from "../Loading";
import {Col} from "react-bootstrap";
import EntityQueue from '../EntityQueue';

interface ParagraphTileProps extends EntityComponentPropsInterface {
  key: number;
  field_title: string;
  field_tile_queue: EntityComponentProps;
}


// @ts-ignore
class ParagraphTiles extends EntityComponentBase<ParagraphTileProps, EntityComponentState> {

  static defaultProps = {
    view_mode: "full"
  }

  render(): React.ReactNode {
    console.log("Paragraph Tile", this.props, this.state);
    if (this.state.loaded) {
      console.log("Paragraph Tiles", this.props, this.state);
      return (
        <Col lg={12} key={this.props.key}>
          <h3>{this.state.attributes.field_title}</h3>
          <EntityQueue
            {...this.state.attributes.field_tile_queue}
            view_mode={"tiles"}
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

export default ParagraphTiles;
