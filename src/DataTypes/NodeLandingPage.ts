import Node, {NodeInterface} from './Node';
import Paragraph, { ParagraphInterface } from './Paragraph';
import MediaImage, {MediaImageInterface} from './MediaImage';

interface NodeLandingPageInterface extends NodeInterface {
  field_content: Array<ParagraphInterface>
  field_hero_image: MediaImageInterface
}

class NodeLandingPage extends Node {

  _field_content: Array<Paragraph>;
  _field_hero_image: MediaImage;

  get field_content(): Array<ParagraphInterface> {
    return this._field_content;
  }

  set field_content(incoming: Array<ParagraphInterface>) {
    this._field_content = incoming.map((item) => {
      return Paragraph.factory(item);
    })
  }

  hasData(): boolean {
    return (this.field_content.length > 0) ?? false
  }

  getIncluded(): string {
    return "&include=field_content,field_hero_image";
  }

}

export {NodeLandingPage as default, NodeLandingPageInterface}