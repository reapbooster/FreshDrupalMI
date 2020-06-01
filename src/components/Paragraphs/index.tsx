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


class Paragraphs {

  public static getComponentForBundle(bundleId) {
    return ( ParagraphBundleComponents[bundleId] || null );
  }

}

export default Paragraphs;
