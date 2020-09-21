import ContentDatatype, { ContentDatatypeInterface } from "./ContentDatatype";
import TaxonomyTerm, { TaxonomyTermInterface } from "./TaxonomyTerm";
import Slide, { SlideInterface } from "./Slide";
import Paragraph, { ParagraphInterface } from "./Paragraph";

export interface ArticleInterface extends ContentDatatypeInterface {
  field_authors: TaxonomyTermInterface;
  field_centers: TaxonomyTermInterface;
  field_topics: TaxonomyTermInterface;
  field_promo_slide: SlideInterface;
  field_content: Array<ParagraphInterface>;

  public static getIncluded(): string;

  hasData(): boolean;
}

export default class Article
  extends ContentDatatype
  implements ArticleInterface {
  private _field_authors?: TaxonomyTerm;

  private _field_centers?: TaxonomyTerm;

  private _field_topics?: TaxonomyTerm;

  private _field_promo_slide?: Slide;

  private _field_content?: Array<ParagraphInterface>;

  constructor(incoming: ArticleInterface) {
    super(incoming);
    Object.assign(this, incoming);
  }

  get field_authors(): TaxonomyTermInterface {
    return this._field_authors;
  }

  set field_authors(incoming: TaxonomyTermInterface) {
    this._field_authors = new TaxonomyTerm(incoming);
  }

  get field_centers(): TaxonomyTermInterface {
    return this._field_centers;
  }

  set field_centers(incoming: TaxonomyTermInterface) {
    this._field_centers = new TaxonomyTerm(incoming);
  }

  get field_topics(): TaxonomyTermInterface {
    return this._field_topics;
  }

  set field_topics(incoming: TaxonomyTermInterface) {
    this._field_topics = new TaxonomyTerm(incoming);
  }

  get field_promo_slide(): SlideInterface {
    return this._field_promo_slide;
  }

  set field_promo_slide(incoming: SlideInterface) {
    this._field_promo_slide = new Slide(incoming);
  }

  get field_content(): Array<ParagraphInterface> {
    return this._field_content;
  }

  set field_content(incoming: Array<ParagraphInterface>) {
    this._field_content = incoming.map((item: ParagraphInterface) => {
      return new Paragraph(item);
    });
  }

  hasData(): boolean {
    return this.field_content?.length > 0 ?? false;
  }

  public static getIncluded(): string {
    return "&include=field_promo_slide,field_promo_slide.field_background_image,field_content";
  }
}
