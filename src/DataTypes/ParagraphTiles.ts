import Entity, {EntityInterface} from './Entity';
import Paragraph, {ParagraphInterface} from "./Paragraph";
import EntitySubqueue, {EntitySubqueueInterface} from "./EntitySubqueue";
import {ListableInterface} from "./Listable";
import JSONApiUrl from "./JSONApiUrl";

export interface ParagraphTilesInterface extends ParagraphInterface, ListableInterface {
  field_title: string;
  field_tile_queue: EntitySubqueueInterface;
}

export class ParagraphTiles extends Paragraph implements ParagraphTilesInterface, ListableInterface {
  field_title: string;
  field_tile_queue: EntitySubqueue;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  getIncluded(): string {
    return "&include=field_tile_queue,field_tile_queue.items,paragraph_type";
  }

  getItems(): Array<EntityInterface> {
    return this.field_tile_queue?.items ?? [];
  }

  refreshItems(url: JSONApiUrl) {
    // TODO
  }

  get browser() {
    return false;
  }

}

export default ParagraphTiles;
