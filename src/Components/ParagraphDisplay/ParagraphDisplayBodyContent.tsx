import React, { useState } from "react";
import ParagraphBodyContent, {
  ParagraphBodyContentInterface,
} from "../../DataTypes/ParagraphBodyContent";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import { BodyFieldDisplay } from "../../Fields/BodyField";

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
        setParagraphData(new ParagraphBodyContent(ajaxData.data));
      });
    return <Loading />;
  }
  return (
    <BodyFieldDisplay data={paragraphData.field_body} view_mode={view_mode} />
  );
};

export default ParagraphDisplayBodyContent;
