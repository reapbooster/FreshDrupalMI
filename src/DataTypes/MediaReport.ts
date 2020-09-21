import Media, { MediaInterface } from "./Media";
import TaxonomyTerm, { TaxonomyTermInterface } from "./TaxonomyTerm";
import Paragraph, { ParagraphInterface } from "./Paragraph";
import ImageFile, { ImageFileInterface } from "./ImageFile";
import { Link, LinkInterface } from "./LinkList";
import DocumentFile, { DocumentFileInterface } from "./DocumentFile";
import Event, { EventInterface } from "./Event";

interface MediaReportInterface extends MediaInterface {
  field_author: object;
  field_centers: TaxonomyTermInterface;
  field_content: Array<ParagraphInterface>;
  field_cover: ImageFileInterface;
  field_custom_author: object;
  field_essay: LinkInterface;
  field_media_file: DocumentFileInterface;
  field_program_initiatives: TaxonomyTermInterface;
  field_related_event: EventInterface;
  field_term_collection: TaxonomyTermInterface;
  field_topics: TaxonomyTermInterface;
}

class MediaReport extends Media implements MediaReportInterface {
  field_author: Record<string, unknown>;

  _field_centers: TaxonomyTerm;

  _field_content: Array<ParagraphInterface>;

  _field_cover: ImageFile;

  _field_custom_author: Record<string, unknown>;

  _field_essay: Link;

  _field_media_file: DocumentFile;

  _field_program_initiatives: TaxonomyTerm;

  _field_related_event: Event;

  _field_term_collection: TaxonomyTerm;

  _field_topics: TaxonomyTerm;

  get field_centers(): TaxonomyTermInterface {
    return this._field_centers;
  }

  set field_centers(incoming: TaxonomyTermInterface) {
    this._field_centers = new TaxonomyTerm(incoming);
  }

  get field_content(): Array<ParagraphInterface> {
    return this._field_content;
  }

  set field_content(incoming: Array<ParagraphInterface>) {
    this._field_content = incoming.map((item) => Paragraph.factory(item));
  }

  get field_cover(): ImageFileInterface {
    return this._field_cover;
  }

  set field_cover(incoming: ImageFileInterface) {
    this._field_cover = new ImageFile(incoming);
  }

  get field_custom_author() {
    return this._field_centers;
  }

  set field_custom_author(incoming) {
    // TODO: Build out authors functionality
    this._field_centers = incoming;
  }

  get field_content(): Array<ParagraphInterface> {
    return this._field_content;
  }

  set field_content(incoming: Array<ParagraphInterface>) {
    this._field_content = incoming.map((item) => Paragraph.factory(item));
  }

  get field_cover(): ImageFileInterface {
    return this._field_cover;
  }

  set field_cover(incoming: ImageFileInterface) {
    this._field_cover = new ImageFile(incoming);
  }
}

export { MediaReport as default, MediaReportInterface };
