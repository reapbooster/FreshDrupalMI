import React, { useState } from "react";
import ParagraphBodyContent, {
  ParagraphBodyContentInterface,
} from "../../DataTypes/ParagraphBodyContent";
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import Loading from "../Loading";
import { BodyFieldDisplay } from "../../Fields/BodyFieldDisplay";
import styled from "styled-components";
import { ImageFile } from "../../DataTypes/ImageFile";

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
  
  const backgroundImageObject =
    paragraphData.field_background_image instanceof ImageFile
      ? paragraphData.field_background_image
      : (paragraphData.field_background_image !== null)
      ? new ImageFile(paragraphData.field_background_image)
      : null;

  const backgroundImageStyle = 
    (backgroundImageObject.imageStyleObject?.large !== null)
    ? 'url(' + backgroundImageObject.imageStyleObject?.large + ')'
    : 'none';

  const fontColor = (
    paragraphData.field_background === "#0065CC" ||
    paragraphData.field_background === "#FF6237" || 
    paragraphData.field_background === "#666" ||
    paragraphData.field_background === "#000") ? 
    'white' :
    'black';

  const WrapperSection = styled.section`
    background-color: ${paragraphData.field_background};
    background-image: ${backgroundImageStyle};
    background-size: cover;
    background-position: center center;
    color: ${fontColor};

    & h1 {
      font-size: 3em;
      font-family: 'LatoWebBlack';
    }

    & h2 {
      font-family: 'LatoWebBlack';
      font-size: 2.25rem;  
      margin-top: 1em;    
    }

    & p {
      font-size: 1.25em;
      margin: 0 0 1em 0;
      color: ${(fontColor === "black")?'dimgray':'white'}
    }
  `;
    
  return (
    <WrapperSection>
      <BodyFieldDisplay data={paragraphData.field_body} />
    </WrapperSection>
  );
};

export default ParagraphDisplayBodyContent;
