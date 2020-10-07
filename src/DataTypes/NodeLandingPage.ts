import Node, { NodeInterface } from "./Node";
import Paragraph, { ParagraphInterface } from "./Paragraph";
import MediaImage, { MediaImageInterface } from "./MediaImage";
import { ListableInterface } from "./Listable";
import { EntityInterface } from "./Entity";
import path from "path";

export interface NodeLandingPageInterface
  extends NodeInterface,
    ListableInterface {
  field_content: Array<ParagraphInterface>;
  field_hero_image: MediaImageInterface;
}

export class NodeLandingPage
  extends Node
  implements NodeLandingPageInterface, ListableInterface {
  field_content: Array<ParagraphInterface>;

  _field_hero_image: MediaImage;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  get field_hero_image(): MediaImageInterface {
    return this._field_hero_image;
  }

  set field_hero_image(incoming: MediaImageInterface) {
    this._field_hero_image = new MediaImage(incoming);
  }

  hasData(): boolean {
    return this.status !== undefined;
  }

  getIncluded(): string {
    return "&include=field_content,field_hero_image";
  }

  get items(): Array<EntityInterface> {
    return this.field_content;
  }

  set items(incoming: Array<EntityInterface>) {
    this.field_content = incoming;
  }
}

export default NodeLandingPage;
