import Node, { NodeInterface } from "./Node";
import TaxonomyTerm, { TaxonomyTermInterface } from "./TaxonomyTerm";
import Paragraph, { ParagraphInterface } from "./Paragraph";
import Slide, { SlideInterface } from "./Slide";
import {ListableInterface} from "./Listable";
import {EntityInterface} from "./Entity";
import JSONApiUrl from "./JSONApiUrl";

interface NodeArticleInterface extends NodeInterface {
  field_authors: object;
  field_centers: TaxonomyTermInterface;
  field_content: Array<ParagraphInterface>;
  field_promo_slide: SlideInterface;
  field_topics: TaxonomyTermInterface;
}

class NodeArticle extends Node implements NodeArticleInterface, ListableInterface {
  field_authors: object;

  private _field_centers: TaxonomyTermInterface;

  private _field_content: Array<Paragraph>;

  private _field_promo_slide: Slide;

  private _field_topics: TaxonomyTermInterface;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  hasData(): boolean {
    return this.status !== undefined;
  }

  getIncluded(): string {
    return "";
  }

  getItems(): Array<EntityInterface> {
    return this.field_content;
  }

  refreshItems(url: JSONApiUrl) {
    // TODO:
  }

  get browser() {
    return false;
  }

  get field_centers(): TaxonomyTermInterface {
    return this._field_centers;
  }

  set field_centers(value: TaxonomyTermInterface) {
    this._field_centers = new TaxonomyTerm(value);
  }

  get field_content(): Array<ParagraphInterface> {
    return this._field_content;
  }

  set field_content(value: Array<ParagraphInterface>) {
    this._field_content = value;
  }

  get field_promo_slide(): SlideInterface {
    return this._field_promo_slide;
  }

  set field_promo_slide(value: SlideInterface) {
    this._field_promo_slide = value;
  }

  get field_topics(): TaxonomyTermInterface {
    return this._field_topics;
  }

  set field_topics(value: TaxonomyTermInterface) {
    this._field_topics = new TaxonomyTerm(value);
  }
}

export { NodeArticle as default, NodeArticleInterface };
