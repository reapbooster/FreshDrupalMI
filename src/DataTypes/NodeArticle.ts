import Node, { NodeInterface } from './Node';
import {TaxonomyTermInterface} from './TaxonomyTerm';
import {ParagraphInterface} from "./Paragraph";
import {SlideInterface} from "./Slide";

interface NodeArticleInterface extends NodeInterface {

}

class NodeArticle extends Node implements NodeArticleInterface {

  field_authors: object;
  field_centers: TaxonomyTermInterface;
  field_content: Array<ParagraphInterface>;
  field_promo_slide: SlideInterface;
  field_topics: TaxonomyTermInterface;

  hasData(): boolean {
    return false;
  }

  getIncluded(): string {
    return "";
  }
}

export {NodeArticle as default, NodeArticleInterface}

