import React from 'react';
import * as ParagraphDataObject from '../../DataTypes/Paragraph';
import ParagraphSlide from "./ParagraphSlide";
import ParagraphDisplayFourPanel from "./ParagraphDisplayFourPanel";
import ParagraphBodyContent from "./ParagraphDisplayBodyContent";
import ParagraphPullQuote from "./ParagraphPullQuote";
import ParagraphTiles from "./ParagraphTiles";
import ParagraphItemsFromAnEntityQueue from "./ParagraphItemsFromAnEntityQueue";
import ParagraphBlock from "./ParagraphDisplayBlock";
import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import Loading from '../Loading';

const ParagraphBundleComponents = {
  "paragraph--slide": ParagraphDisplaySlide,
  "paragraph--body_content": ParagraphDisplayBodyContent,
  "paragraph--pull_quote": ParagraphDisplayPullQuote,
  "paragraph--block": ParagraphDisplayBlock,
}

interface ParagraphDisplayProps {
  data: ParagraphDataObject.ParagraphInterface;
  view_mode: string;
}

const ParagraphDisplay: React.FunctionComponent = (props: ParagraphDisplayProps) => {
  const {paragraphData, setParagraphData} = useState(ParagraphDataObject.default.factory(props.data));
  console.debug("Paragraph Display", paragraphData);
  if (!paragraphData.hasData()) {
    const ecp = new EntityComponentProps(paragraphData);
    ecp.getData(paragraphData.getIncluded())
    .then(res => res.json())
    .then((remoteData) => {
      console.debug("ParagraphData", remoteData);
      setParagraphData(ParagraphDataObject.default.factory(remoteData.data));
    });
    return (
      <div>
        <Loading />
      </div>
    )
  }
  if (ParagraphBundleComponents[props.type] === undefined) {
    console.error(`missing config for ${props.type}`);
    throw new Error(`Missing config for ${props.type}`);
  }
  const Component = ParagraphBundleComponents[props.type];
  return (
    <ErrorBoundary key={props.key ?? 0}>
      <Component data={paragraphData} />
    </ErrorBoundary>
  );

}

export { ParagraphDisplay as default, ParagraphBundleComponents }
