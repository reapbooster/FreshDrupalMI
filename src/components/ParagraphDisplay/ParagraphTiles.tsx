
import React from 'react';
import {EntityComponentProps, EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import {Col} from "react-bootstrap";
import EntityQueue from '../EntityQueue';
import {ParagraphInterface} from "../../DataTypes/Paragraph";

interface ParagraphTileProps extends ParagraphInterface {
  key: number;
  field_title: string;
  field_tile_queue: EntityComponentProps;
}


// @ts-ignore
const ParagraphTiles: React.FunctionComponent = (props) => {

  return (
    <Col lg={12} key={this.props.key}>
      <h3>{props.field_title}</h3>
      <EntityQueue
        {...props.field_tile_queue}
        view_mode={"tiles"}
      />
    </Col>
  )

}

export default ParagraphTiles;
