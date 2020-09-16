import React from 'react';
import * as ParagraphDataObject from '../../DataTypes/Paragraph';
import ParagraphSlide from "./ParagraphSlide";
import ParagraphFourPanel from "./ParagraphFourPanel";
import ParagraphBodyContent from "./ParagraphBodyContent";
import ParagraphPullQuote from "./ParagraphPullQuote";
import ParagraphTiles from "./ParagraphTiles";
import ParagraphItemsFromAnEntityQueue from "./ParagraphItemsFromAnEntityQueue";
import ParagraphBlock from "./ParagraphBlock";
import ParagraphMediaTilesFromAView from "./ParagraphMediaTilesFromAView";
import {EntityComponentProps, EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import Loading from '../Loading';

const ParagraphBundleComponents = {
  "paragraph--slide": ParagraphSlide,
  "paragraph--four_tile_block_queue": ParagraphFourPanel,
  "paragraph--four_tile_block_taxonomy": ParagraphFourPanel,
  "paragraph--body_content": ParagraphBodyContent,
  "paragraph--pull_quote": ParagraphPullQuote,
  "paragraph--tiles": ParagraphTiles,
  "paragraph--block": ParagraphBlock,
  "paragraph--items_from_an_entityqueue": ParagraphItemsFromAnEntityQueue,
  "paragraph--media_tiles_from_view": ParagraphMediaTilesFromAView
}


const ParagraphDisplay: React.FunctionComponent = (props: EntityComponentPropsInterface) => {
  const {paragraphData, setParagraphData} = useState(ParagraphDataObject.default.factory(props));
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
