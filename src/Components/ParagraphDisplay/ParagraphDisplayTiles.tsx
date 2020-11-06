import React, { useState } from "react";
import { Container } from "react-bootstrap";
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
        console.debug("ParagraphDisplayTiles", ajaxData);
        const returnedData = ParagraphDataFactory(data);
        setParagraphData(returnedData);
      });
    return (
      <>
        <Loading />
      </>
    );
  }
  console.log("paragraph display tiles should have data:", paragraphData);
  // TODO: make this a flex box that holds to 100% and hides anything offscreen
  return (
    <Container 
      fluid={(props.data.field_view_mode == "card") ? true : false }
      className={(props.data.field_view_mode == "card") ? "position-relative" : "" } >
      <ListDisplay
        id={"tiles-list-".concat(paragraphData.id)}
        list={paragraphData.tiles}
        view_mode={paragraphData.field_view_mode}
      />
    </Container>
  );
};

export default ParagraphDisplayTiles;
