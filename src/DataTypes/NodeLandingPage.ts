import Node, {NodeInterface} from './Node';
import Paragraph, { ParagraphInterface } from './Paragraph';
import MediaImage, {MediaImageInterface} from './MediaImage';

interface NodeLandingPageInterface extends NodeInterface {
  field_content: Array<ParagraphInterface>
  field_hero_image: MediaImageInterface
}

class NodeLandingPage extends Node {

  field_content: Array<Paragraph>;
  field_hero_image: MediaImage;

}

export {NodeLandingPage as default, NodeLandingPageInterface}