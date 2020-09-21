import Node, { NodeInterface } from "./Node";
import Paragraph, { ParagraphInterface } from "./Paragraph";
import MediaImage, { MediaImageInterface } from "./MediaImage";

interface NodeLandingPageInterface extends NodeInterface {
  field_content: Array<ParagraphInterface>;
  field_hero_image: MediaImageInterface;
}

class NodeLandingPage extends Node {
  _field_content: Array<ParagraphInterface>;

  _field_hero_image: MediaImage;

  constructor(props) {
    const content = props.field_content;
    super(props);
    this.field_content = content;
  }

  get field_content(): Array<ParagraphInterface> {
    return this._field_content ?? [];
  }

  set field_content(incoming: Array<ParagraphInterface>) {
    this._field_content = incoming;
  }

  hasData(): boolean {
    console.debug("NodeLandingPage has data?", this);
    return !!this.field_content?.length;
  }

  getIncluded(): string {
    return "&include=field_content,field_hero_image";
  }
}

export { NodeLandingPage as default, NodeLandingPageInterface };
