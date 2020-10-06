import React, { useState } from "react";
import { ParagraphTilesInterface } from "../../DataTypes/ParagraphTiles";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import ParagraphDataFactory from "./ParagraphDataFactory";
import ListDisplay from "../ListDisplay";

export interface ParagraphDisplayTilesProps {
  data: ParagraphTilesInterface;
}

export const ParagraphDisplayTiles: React.FunctionComponent = (
  props: ParagraphDisplayTilesProps
) => {
  const { data } = props;
  const DataObject: ParagraphTilesInterface = ParagraphDataFactory(data);
  const [paragraphData, setParagraphData] = useState(DataObject);
  if (!paragraphData.hasData()) {
    console.debug("Paragraph does not have data", paragraphData);
    const ecp = new EntityComponentProps(paragraphData);
    ecp
      .getData(paragraphData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        const DataObject = ParagraphDataFactory(ajaxData.data);
        setParagraphData(DataObject);
      });
    return (
      <>
        <Loading />
      </>
    );
  }
  console.log("paragraph display tiles", paragraphData);
  return (
    <ListDisplay
      id="tiles-list-{paragraphData.id}"
      list={paragraphData.tiles}
      view_mode={paragraphData.field_view_mode}
    />
  );
};

export default ParagraphDisplayTiles;
