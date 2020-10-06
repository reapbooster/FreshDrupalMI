import Paragraph, { ParagraphInterface } from "./Paragraph";
import ColorObject, { ColorObjectInterface } from "./ColorObject";
import { EntityInterface } from "./Entity";
import { EventInterface } from "./Event";
import { MediaInterface } from "./Media";
import { ContentDatatypeInterface } from "./ContentDatatype";
import { EntitySubqueueInterface } from "./EntitySubqueue";
import { SlideInterface } from "./Slide";

export interface ParagraphTilesInterface extends ParagraphInterface {
  tiles: Array<EntityInterface>;
  field_title: string;
  field_view_mode: string;
  field_background_color: ColorObjectInterface;
}

export abstract class ParagraphTiles
  extends Paragraph
  implements ParagraphTilesInterface {
  field_title: string;
  field_view_mode: string;
  private _field_background_color: ColorObject;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  getIncluded(): string {
    return "&include=field_tile_queue,field_tile_queue.items,paragraph_type";
  }

  get field_background_color(): ColorObjectInterface {
    return this._field_background_color;
  }

  set field_background_color(value: ColorObjectInterface) {
    this._field_background_color = new ColorObject(value);
  }

  get browser() {
    return null;
  }

  hasData() {
    return Array.isArray(this.tiles);
  }
  abstract tiles: Array<EntityInterface>;
}

export default ParagraphTiles;

export class ParagraphEventTiles
  extends ParagraphTiles
  implements ParagraphTilesInterface {
  field_event_references: Array<EventInterface>;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  get tiles(): Array<EventInterface> {
    return this.field_event_references;
  }

  set tiles(incoming: Array<EventInterface>) {
    this.field_event_references = incoming;
  }
}

export class ParagraphMediaTiles
  extends ParagraphTiles
  implements ParagraphTilesInterface {
  field_media_refs: Array<MediaInterface>;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  get tiles(): Array<MediaInterface> {
    return this.field_media_refs;
  }

  set tiles(incoming: Array<MediaInterface>) {
    this.field_media_refs = incoming;
  }
}

export class ParagraphContentTiles
  extends ParagraphTiles
  implements ParagraphTilesInterface {
  field_content_refs: Array<ContentDatatypeInterface>;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  get tiles(): Array<ContentDatatypeInterface> {
    return this.field_content_refs;
  }

  set tiles(incoming: Array<ContentDatatypeInterface>) {
    this.field_content_refs = incoming;
  }
}

export class ParagraphEntityQueueTiles
  extends ParagraphTiles
  implements ParagraphTilesInterface {
  field_subqueue: EntitySubqueueInterface;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  get tiles(): Array<EntityInterface> {
    return this.field_subqueue?.items;
  }

  set tiles(incoming: Array<EntityInterface>) {
    this.field_subqueue = {
      items: incoming,
    };
  }
}

export class ParagraphSlideTiles
  extends ParagraphTiles
  implements ParagraphTilesInterface {
  field_slide_refs: Array<SlideInterface>;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  get tiles(): Array<SlideInterface> {
    return this.field_slide_refs;
  }

  set tiles(incoming: Array<SlideInterface>) {
    this.field_slide_refs = incoming;
  }
}
