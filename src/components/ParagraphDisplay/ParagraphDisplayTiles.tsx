
import React, {useState} from 'react';
import {Col} from "react-bootstrap";
import EntitySubqueueDisplay from '../EntitySubqueueDisplay';
import ParagraphTiles, {ParagraphTilesInterface} from '../../DataTypes/ParagraphTiles'
import ListDisplay from "../ListDisplay";
import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import ErrorBoundary from "../../Utility/ErrorBoundary";

export interface ParagraphDisplayTilesProps  {
  data: ParagraphTilesInterface;
  view_mode?: string;
}


export const ParagraphDisplayTiles: React.FunctionComponent = (props : ParagraphDisplayTilesProps) => {
  const { data, view_mode } = props;
  const [paragraphData, setParagraphData] = useState(new ParagraphTiles(data));
  if (!paragraphData.hasData()) {
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
  if (!paragraphData instanceof ParagraphTiles) {
    paragraphData = new ParagraphTiles(paragraphData);
  }
  console.log("paragraph display tiles", paragraphData);
  return (
    <Col lg={12}>
      <h3>{paragraphData.field_title}</h3>
      <ErrorBoundary>
        <EntitySubqueueDisplay
          queue={paragraphData}
          view_mode={"tiles"}
        />
      </ErrorBoundary>
    </Col>
  )

}

export default ParagraphDisplayTiles;
