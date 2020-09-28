
import React, {useState} from 'react';
import {Col} from "react-bootstrap";
import ParagraphTiles, {ParagraphTilesInterface} from '../../DataTypes/ParagraphTiles'
import ListDisplay from "../ListDisplay";
import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import EntitySubqueueDisplay from "../EntitySubqueueDisplay";

export interface ParagraphDisplayTilesProps  {
  data: ParagraphTilesInterface;
  view_mode?: string;
}


export const ParagraphDisplayTiles: React.FunctionComponent = (props : ParagraphDisplayTilesProps) => {
  const { data, view_mode } = props;
  const DataObject = new ParagraphTiles(data);
  const [ paragraphData, setParagraphData ] = useState(DataObject);
  if (!paragraphData.hasData()) {
    console.debug("Paragraph does not have data", paragraphData);
    const ecp = new EntityComponentProps(paragraphData);
    ecp.getData(paragraphData.getIncluded())
      .then(res => res.json())
      .then(ajaxData => {
        setParagraphData(new ParagraphTiles(ajaxData.data))
      });
    return (
      <>
        <Loading />
        </>
    )
  }
  console.log("paragraph display tiles", paragraphData);
  return (
    <Col lg={12}>
      <h3>{paragraphData.field_title}</h3>
      <ErrorBoundary>
        <EntitySubqueueDisplay
          queue={paragraphData.field_tile_queue}
          view_mode={"tile"}
        />
      </ErrorBoundary>
    </Col>
  )

}

export default ParagraphDisplayTiles;
