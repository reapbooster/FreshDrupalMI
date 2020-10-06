import React, { useState } from "react";
import { ParagraphTilesInterface } from "../../DataTypes/ParagraphTiles";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import ParagraphDataFactory from "./ParagraphDataFactory";
import ListDisplay from "../ListDisplay";

export interface ParagraphDisplayTilesProps {
  data: ParagraphTilesInterface;
}

export const ParagraphDisplayTiles = (props: ParagraphDisplayTilesProps) => {
  const { data } = props;
  console.debug("ParagraphDisplayTiles => initial data:", data);
  const DataObject = ParagraphDataFactory(data);
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
  console.log("paragraph display tiles should have data:", paragraphData);
  return (
    <ListDisplay
      id="tiles-list-{paragraphData.id}"
      list={paragraphData.items}
      view_mode={paragraphData.field_view_mode}
    />
  );
};

export default ParagraphDisplayTiles;
