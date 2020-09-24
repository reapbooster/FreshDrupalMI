import TaxonomyTerm, { TaxonomyTermInterface } from "./TaxonomyTerm";
import ImageFile, { ImageFileInterface } from "./ImageFile";
import Event, { EventInterface } from "./Event";
import { BodyFieldData } from "../Fields/BodyField";
import Media, { MediaInterface } from "./Media";

export interface MediaVideoInterface extends MediaInterface {
  field_body: BodyFieldData;
  field_centers: Array<TaxonomyTermInterface>;
  field_embedded_id: string;
  field_embedded_service: string;
  field_event_reference: EventInterface;
  field_height: number;
  field_media_oembed_video: string;
  field_program_initiatives: Array<TaxonomyTermInterface>;
  field_speakers: object;
  field_subheader: string;
  field_term_collection: Array<TaxonomyTermInterface>;
  field_thumbnail_uri: string;
  field_topics: Array<TaxonomyTermInterface>;
  field_video_height: number;
  field_video_width: number;
  field_width: number;

  hasData(): boolean;
  getIncluded(): string;
}

export class MediaVideo extends Media implements MediaVideoInterface {

  _thumbnail: ImageFileInterface;

  _field_centers: Array<TaxonomyTermInterface>;

  _field_event_reference?: Event;

  _field_program_initiatives: Array<TaxonomyTermInterface>;

  _field_term_collection: Array<TaxonomyTermInterface>;

  _field_topics: Array<TaxonomyTermInterface>;

  field_body: BodyFieldData;

  field_embedded_id: string;

  field_embedded_service: string;

  field_height: number;

  field_media_oembed_video: string;

  field_speakers: object;

  field_subheader: string;

  field_thumbnail_uri: string;

  field_video_height: number;

  field_video_width: number;

  field_width: number;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  getThumbnail(): ImageFileInterface {
    return this.thumbnail;
  }

  hasData(): boolean {
    return this.status !== undefined;
  }

  getIncluded() {
    return "&include=thumbnail";
  }

  get field_term_collection(): Array<TaxonomyTermInterface> {
    return this._field_term_collection;
  }

  set field_term_collection(incoming: Array<TaxonomyTermInterface>) {
    if (incoming.length ?? false) {
      this._field_term_collection = incoming.map((item) => {
        return new TaxonomyTerm(item);
      });
    }
  }

  get field_topics(): Array<TaxonomyTermInterface> {
    return this._field_topics;
  }

  set field_topics(incoming: Array<TaxonomyTermInterface>) {
    if (incoming.length ?? false) {
      this._field_topics = incoming.map((item) => {
        return new TaxonomyTerm(item);
      });
    }
  }

  get field_centers(): Array<TaxonomyTermInterface> {
    return this._field_centers;
  }

  set field_centers(incoming: Array<TaxonomyTermInterface>) {
    if (incoming.length ?? false) {
      this._field_centers = incoming.map((item) => {
        return new TaxonomyTerm(item);
      });
    }
  }

  get event(): EventInterface {
    return this._field_event_reference;
  }

  set event(incoming: EventInterface) {
    this._field_event_reference = incoming;
  }

  get thumbnail(): ImageFileInterface {
    return this._thumbnail;
  }

  set thumbnail(incoming: ImageFileInterface) {
    this._thumbnail = new ImageFile(incoming);
  }

  field_event_reference: EventInterface;
  field_media_image: ImageFileInterface;
  field_media_in_library: boolean;
  field_photo_subject_name: string;
  field_photo_subject_title: string;
  field_program_initiatives: Array<TaxonomyTermInterface>;

}

export default MediaVideo;
