import Node, { NodeInterface } from './Node';
import {TaxonomyTermInterface} from './TaxonomyTerm';

interface NodeArticleInterface extends NodeInterface {

}

class NodeArticle extends Node {
  field_authors: object;
  field_centers: TaxonomyTermInterface;
  field_content: Array<ParagraphInterface>;
  field_promo_slide: SlideInterface;
  field_topics: TaxonomyTermInterface;

  hasData(): boolean {

  }

  getIncluded(): string {
    
  }
}

export {NodeArticle as default, NodeArticleInterface}

