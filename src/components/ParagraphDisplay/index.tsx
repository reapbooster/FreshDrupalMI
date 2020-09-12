import React from 'react';
import ParagraphSlide from "./ParagraphSlide";
import ParagraphFourPanel from "./ParagraphFourPanel";
import ParagraphText from "./ParagraphText";
import ParagraphPullQuote from "./ParagraphPullQuote";
import ParagraphTiles from "./ParagraphTiles";
import ParagraphItemsFromAnEntityQueue from "./ParagraphItemsFromAnEntityQueue";
import ParagraphBlock from "./ParagraphBlock";
import ParagraphMediaTilesFromAView from "./ParagraphMediaTilesFromAView";
import {EntityComponentPropsInterface} from "../../DataTypes/EntityComponentProps";
import ErrorBoundary from "../../Utility/ErrorBoundary";

const ParagraphBundleComponents = {
  "paragraph--slide": ParagraphSlide,
  "paragraph--four_tile_block_queue": ParagraphFourPanel,
  "paragraph--four_tile_block_taxonomy": ParagraphFourPanel,
  "paragraph--body_content": ParagraphText,
  "paragraph--pull_quote": ParagraphPullQuote,
  "paragraph--tiles": ParagraphTiles,
  "paragraph--block": ParagraphBlock,
  "paragraph--items_from_an_entityqueue": ParagraphItemsFromAnEntityQueue,
  "paragraph--media_tiles_from_view": ParagraphMediaTilesFromAView
}


const ParagraphDisplay: React.FunctionComponent = (props: EntityComponentPropsInterface) => {
  if (ParagraphBundleComponents[props.type] === undefined) {
    console.log(`missing config for ${props.type}`);
    throw new Error(`Missing config for ${props.type}`);
  }
  const Component = ParagraphBundleComponents[props.type];
  return (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  )

}

export { ParagraphDisplay as default, ParagraphBundleComponents }
