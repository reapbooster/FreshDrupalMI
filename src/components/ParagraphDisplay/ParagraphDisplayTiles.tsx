
import React from 'react';
import {Col} from "react-bootstrap";
import EntityQueue from '../EntityQueue';
import * as DataObject from '../../DataTypes/ParagraphTiles'

interface ParagraphDisplayTilesProps  {
  data: DataObject.default;
  view_mode: string;
}


const ParagraphDisplayTiles: React.FunctionComponent = (props : ParagraphTilesProps) => {
  const paragraphData = props.data;
  return (
    <Col lg={12}>
      <h3>{paragraphData.field_title}</h3>
      <EntityQueue
        data={paragraphData.field_tile_queue}
        view_mode={props.view_mode ?? "tiles"}
      />
    </Col>
  )

}

export { ParagraphDisplayTiles as default, ParagraphDisplayTilesProps };
