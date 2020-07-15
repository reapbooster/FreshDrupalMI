import ParagraphSlide from "./ParagraphSlide";
import ParagraphFourPanel from "./ParagraphFourPanel";
import ParagraphText from "./ParagraphText";
import ParagraphPullQuote from "./ParagraphPullQuote";
import ParagraphTiles from "./ParagraphTiles";

const ParagraphBundleComponents = {
  slide: ParagraphSlide,
  four_tile_block_queue: ParagraphFourPanel,
  four_tile_block_taxonomy: ParagraphFourPanel,
  body_content: ParagraphText,
  pull_quote: ParagraphPullQuote,
  tiles: ParagraphTiles,
}


class Paragraphs {

  public static getComponentForBundle(bundleId) {
    if (ParagraphBundleComponents[bundleId] == null) {
      console.log(`missing config for ${bundleId}`);
      throw new Error(`Missing config for ${bundleId}`);
    }
    return ( ParagraphBundleComponents[bundleId] || null );
  }

}

export default Paragraphs;
