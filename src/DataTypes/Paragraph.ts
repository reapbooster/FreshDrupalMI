import Entity, {EntityInterface} from "./Entity";
import ParagraphsType, {ParagraphsTypeInterface} from "./ParagraphsType";
import ParagraphBlock, {ParagraphBlockInterface} from './ParagraphBlock';
import ParagraphBodyContent, {ParagraphBodyContentInterface} from './ParagraphBodyContent';
import ParagraphFourPanel, {ParagraphFourPanelInterface} from './ParagraphFourPanel';
import ParagraphFourPanelBlockTaxonomy, { ParagraphFourPanelBlockTaxonomyInterface} from './ParagraphFourPanelBlockTaxonomy';
import ParagraphFourTileBlockQueue, {ParagraphFourTileBlockQueueInterface} from './ParagraphFourTileBlockQueue';
import ParagraphSlide, {ParagraphSlideInterface} from './ParagraphSlide';
import ParagraphTiles, {ParagraphTilesInterface } from './ParagraphTiles';
import ParagraphPullQuote, {ParagraphPullQuoteInterface} from './ParagraphPullQuote';




interface ParagraphInterface extends EntityInterface {

  paragraph_type: ParagraphsTypeInterface;

  created: string;
  default_langcode: boolean;
  langcode: string;
  parent_field_name: string;
  parent_id: string;
  parent_type: string;
  status: boolean;


}


abstract class Paragraph extends Entity implements ParagraphInterface{

  _paragraph_type: ParagraphsType;

  _created: Date;
  default_langcode: boolean;
  langcode: string;
  parent_field_name: string;
  parent_id: string;
  parent_type: string;
  status: boolean;


  get paragraph_type(): ParagraphsTypeInterface {
    return this._paragraph_type;
  }

  set paragraph_type(incoming: ParagraphsTypeInterface) {
    this._paragraph_type = new ParagraphsType(incoming);
  }

  abstract hasData(): boolean;

  abstract getIncluded(): string;

  public static factory(incoming: ParagraphInterface) {
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

}


export {Paragraph as default, ParagraphInterface}
