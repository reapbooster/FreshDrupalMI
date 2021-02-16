import React, { useState } from "react";
import ParagraphBodyContent, {
  ParagraphBodyContentInterface,
} from "../../DataTypes/ParagraphBodyContent";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import { BodyFieldDisplay } from "../../Fields/BodyFieldDisplay";

export interface ParagraphDisplayBodyContentProps {
  data: ParagraphBodyContentInterface;
  view_mode: string;
}

export const ParagraphDisplayBodyContent = (
  props: ParagraphDisplayBodyContentProps
) => {
  const { data, view_mode } = props;
  const DataObject = new ParagraphBodyContent(data);
  const [paragraphData, setParagraphData] = useState(DataObject);
  if (!paragraphData.hasData()) {
    const ecp = new EntityComponentProps(paragraphData);
    ecp
      .getData(paragraphData.getIncluded())
      .then((res) => res.json())
      .then((ajaxData) => {
        const newDO = new ParagraphBodyContent(ajaxData.data);
        setParagraphData(newDO);
      });
      
    console.debug("Fetching ParagraphBodyContent Data", paragraphData);

    return <Loading />;
  }

  const fontColor = (
    paragraphData.field_background === "#0065CC" ||
    paragraphData.field_background === "#FF6237" || 
    paragraphData.field_background === "#666" ||
    paragraphData.field_background === "#000") ? 
    'white' :
    'black';
    
  return (
    <section style={{backgroundColor: paragraphData.field_background, color: fontColor, }}>
      <BodyFieldDisplay data={paragraphData.field_body} />
    </section>
  );
};

export default ParagraphDisplayBodyContent;
