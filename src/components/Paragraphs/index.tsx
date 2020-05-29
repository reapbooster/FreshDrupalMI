import EntityComponentBase, {EntityComponentState} from "../../DataTypes/EntityComponentBase";
import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";
import ParagraphSlide from "./ParagraphSlide";
import ParagraphFourPanel from "./ParagraphFourPanel";
import ParagraphText from "./ParagraphText";
import ParagraphPullQuote from "./ParagraphPullQuote";

const ParagraphBundleComponents = {
  slide: ParagraphSlide,
  four_tile_block_queue: ParagraphFourPanel,
  four_tile_block_taxonomy: ParagraphFourPanel,
  body_content_alternative: ParagraphText,
  pull_quote: ParagraphPullQuote,
}


class Paragraphs extends EntityComponentBase<EntityComponentProps, EntityComponentState> {

  public static getComponentForBundle(bundleId) {
    return ( ParagraphBundleComponents[bundleId] || null );
  }

}

export default Paragraphs;
