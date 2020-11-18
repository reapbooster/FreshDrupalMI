import Media, { MediaInterface } from "./Media";
import TaxonomyTerm, { TaxonomyTermInterface } from "./TaxonomyTerm";
import Paragraph, { ParagraphInterface } from "./Paragraph";
import ImageFile, { ImageFileInterface } from "./ImageFile";
import { Link, LinkInterface } from "./LinkList";
import DocumentFile, { DocumentFileInterface } from "./DocumentFile";
import Event, { EventInterface } from "./Event";
import User, { UserInterface } from "./User";

export interface MediaReportInterface extends MediaInterface {
  thumbnail: ImageFileInterface;
  field_author: UserInterface;
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

export class MediaReport extends Media implements MediaReportInterface {
  field_content: Array<ParagraphInterface>;
  field_essay: Link;
  protected _thumbnail: ImageFile;
  protected _field_author: User;
  protected _field_centers: TaxonomyTerm;
  protected _field_cover: ImageFile;
  protected _field_custom_author: Record<string, unknown>;
  protected _field_media_file: DocumentFile;
  protected _field_program_initiatives: TaxonomyTerm;
  protected _field_related_event: Event;
  protected _field_term_collection: TaxonomyTerm;
  protected _field_topics: TaxonomyTerm;

  constructor(props) {
    super(props);
    Object.assign(props);
    if (props.thumbnail !== undefined && this.thumbnail === undefined) {
      this._thumbnail = new ImageFile(props.thumbnail);
    }
    if (props.field_cover !== undefined && this.field_cover === undefined) {
      this._field_cover = new ImageFile(props.field_cover);
    }
    if (
      props.field_media_file !== undefined &&
      this.field_media_file === undefined
    ) {
      this._field_media_file = new DocumentFile(props.field_cover);
    }
  }

  getIncluded(): string {
    return "&include=thumbnail,field_cover,field_media_file";
  }

  hasData(): boolean {
    return this.status !== undefined;
  }

  getThumbnail(): ImageFileInterface {
    return this._thumbnail;
  }

  get field_author(): User {
    return this._field_author;
  }

  set field_author(value: User) {
    this._field_author = value;
  }

  get field_centers(): TaxonomyTermInterface {
    return this._field_centers;
  }

  set field_centers(incoming: TaxonomyTermInterface) {
    this._field_centers = new TaxonomyTerm(incoming);
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

  get field_media_file(): DocumentFileInterface {
    return this._field_media_file;
  }

  set field_media_file(value: DocumentFileInterface) {
    this._field_media_file = new DocumentFile(value) ?? null;
  }

  get field_program_initiatives(): TaxonomyTerm {
    return this._field_program_initiatives;
  }

  set field_program_initiatives(value: TaxonomyTerm) {
    this._field_program_initiatives = value;
  }

  get field_related_event(): Event {
    return this._field_related_event;
  }

  set field_related_event(value: Event) {
    this._field_related_event = value;
  }

  get field_term_collection(): TaxonomyTerm {
    return this._field_term_collection;
  }

  set field_term_collection(value: TaxonomyTerm) {
    this._field_term_collection = value;
  }

  get field_topics(): TaxonomyTerm {
    return this._field_topics;
  }

  set field_topics(value: TaxonomyTerm) {
    this._field_topics = value;
  }

  get thumbnail(): ImageFileInterface {
    return this._thumbnail;
  }

  set thumbnail(value: ImageFileInterface) {
    if (value.data === undefined && value !== undefined) {
      this._thumbnail = new ImageFile(value);
    }
  }
}

export default MediaReport;
