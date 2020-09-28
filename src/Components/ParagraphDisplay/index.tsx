/**
 * FILE: ParagraphDisplay/index.tsx
 * Us the Paragraph display when you don't know the bundle of the paragraph or paragraphs being displayed.
 *
 */

import React, { useState } from 'react';
import ParagraphDisplaySlide from "./ParagraphDisplaySlide";
import ParagraphDisplayFourPanel from './ParagraphDisplayFourPanel'
import ParagraphDisplayBodyContent from "./ParagraphDisplayBodyContent";
import ParagraphDisplayPullQuote from "./ParagraphDisplayPullQuote";
import ParagraphDisplayBlock from "./ParagraphDisplayBlock";
import ParagraphDisplayTiles from './ParagraphDisplayTiles';
import { EntityComponentProps } from "../../DataTypes/EntityComponentProps";
import ErrorBoundary from "../../Utility/ErrorBoundary";
import Loading from '../Loading';
import Paragraph, { ParagraphInterface } from "../../DataTypes/Paragraph";
import ParagraphBlock from "../../DataTypes/ParagraphBlock";
import ParagraphFourPanel from "../../DataTypes/ParagraphFourPanel";
import ParagraphSlide from "../../DataTypes/ParagraphSlide";
import ParagraphFourTileBlockQueue from "../../DataTypes/ParagraphFourTileBlockQueue";
import ParagraphFourPanelBlockTaxonomy from "../../DataTypes/ParagraphFourPanelBlockTaxonomy";
import ParagraphBodyContent from "../../DataTypes/ParagraphBodyContent";
import ParagraphPullQuote from "../../DataTypes/ParagraphPullQuote";
import ParagraphTiles from '../../DataTypes/ParagraphTiles';


/**
 * Create the DataModel
 *
 * @param props: MediaDisplayProps
 */

function ParagraphDataFactory(incoming: ParagraphInterface) : Paragraph {
  console.debug("Paragraph Data Factory:", incoming);
  switch (incoming.type) {
    case "paragraph--block":
      return new ParagraphBlock(incoming);
    case "paragraph--four_panel":
      return new ParagraphFourPanel(incoming);
    case "paragraph--slide":
      return new ParagraphSlide(incoming);
    case "paragraph--four_tile_block_queue":
      return new ParagraphFourTileBlockQueue(incoming);
    case "paragraph--four_tile_block_taxonomy":
      return new ParagraphFourPanelBlockTaxonomy(incoming);
    case "paragraph--body_content":
      return new ParagraphBodyContent(incoming);
    case "paragraph--pull_quote":
      return new ParagraphPullQuote(incoming);
    case "paragraph--tiles":
      return new ParagraphTiles(incoming);


    default:
      console.error("Cannot determine Data Class", incoming);
      throw new Error("Cannot Determine Data Class for ".concat(incoming.type));
  }
}

/**
 * Create the View Component
 *
 * @param incoming: ParagraphIterface
 */
function ParagraphComponentFactory(incoming: ParagraphInterface): React.FunctionComponent {
  console.debug("Paragraph Component Factory", incoming);
  switch(incoming.type) {
    case "paragraph--slide":
      return ParagraphDisplaySlide;
    case "paragraph--four_panel":
      return ParagraphDisplayFourPanel;
    case "paragraph--body_content":
      return ParagraphDisplayBodyContent;
    case "paragraph--pull_quote":
      return ParagraphDisplayPullQuote;
    case "paragraph--block":
      return ParagraphDisplayBlock;
    case "paragraph--tiles":
      return ParagraphDisplayTiles;
    default:
      console.error(`missing config for ${incoming.type}`);
      throw new Error(`Missing config for ${incoming.type}`);
  }

}

/**
 * Create the controller
 *
 * @param ParagraphDisplayProps
 */

interface ParagraphDisplayProps {
  key?: number;
  data: ParagraphInterface;
  view_mode: string;
}

const ParagraphDisplay: React.FunctionComponent = (props: ParagraphDisplayProps) => {
  const [paragraphData, setParagraphData] = useState(ParagraphDataFactory(props.data));
  console.debug("Paragraph Display data:", paragraphData);
  if (!paragraphData.hasData()) {
    const ecp = new EntityComponentProps(paragraphData);
    ecp.getData(paragraphData.getIncluded())
    .then(res => res.json())
    .then((remoteData) => {
      console.debug("ParagraphData", remoteData);
      setParagraphData(ParagraphDataFactory(remoteData.data));
    });
    return (
      <div>
        <Loading />
      </div>
    )
  }

  const Component = ParagraphComponentFactory(paragraphData);
  return (
    <ErrorBoundary key={props.key ?? 0}>
      <Component
        data={paragraphData}
        view_mode={props.view_mode} />
    </ErrorBoundary>
  );

}

export { ParagraphDisplay as default, ParagraphDisplayProps, ParagraphComponentFactory, ParagraphDataFactory }
