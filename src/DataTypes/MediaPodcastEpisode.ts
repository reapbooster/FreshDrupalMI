import { ParagraphsTypeInterface } from "./ParagraphsType";
import Entity, { EntityInterface } from "./Entity";
import ImageFile, { ImageFileInterface } from "./ImageFile";
import AudioFile, { AudioFileInterface } from "./AudioFile";
import DocumentFile, { DocumentFileInterface } from "./DocumentFile";
import LinkList from "./LinkList";
import TextField from "../Fields/TextField";
import PathObject, { PathObjectInterface } from "./PathObject";
import MediaType, { MediaTypeInterface } from "./MediaType";
import Media, { MediaInterface } from "./Media";

export interface MediaPodcastServiceLinkInterface {
  key: string;
  description: string;
  value: string;
}

export interface MediaPodcastEpisodeInterface extends MediaInterface {
  field_body?: TextField;
  field_episode?: number;
  field_media_audio_file?: AudioFileInterface;
  field_media_image?: ImageFileInterface;
  field_media_in_library?: boolean;
  field_service_links?: Array<MediaPodcastServiceLinkInterface>;
  field_summary?: TextField;
  field_transcript?: DocumentFileInterface;
  media_type?: MediaType;
  parent_field_name?: string;
  parent_type?: string;
  path?: PathObject;
  thumbnail: ImageFile;
}

export class MediaPodcastEpisode
  extends Media
  implements MediaPodcastEpisodeInterface {
  field_photo_subject_name?: string;
  field_photo_subject_title?: string;
  parent_field_name?: string;
  parent_type?: string;
  field_body?: TextField;
  field_episode?: number;
  field_media_in_library?: boolean;
  field_service_links?: Array<MediaPodcastServiceLinkInterface>;
  field_summary?: TextField;
  protected _field_media_audio_file?: AudioFile;
  protected _field_media_image?: ImageFile;
  protected _field_transcript?: DocumentFile;
  protected _media_type?: MediaType;
  protected _path?: PathObject;
  protected _thumbnail?: ImageFile;

  constructor(props) {
    super(props);
    Object.assign(this, props);
    if (props.thumbnail !== undefined && this.thumbnail === undefined) {
      this._thumbnail = new ImageFile(props.thumbnail);
    }
    if (
      props.field_media_image !== undefined &&
      this.field_media_image === undefined
    ) {
      this._field_media_image = new ImageFile(props.field_media_image);
    }
    if (
      props.field_media_audio_file !== undefined &&
      this.field_media_audio_file === undefined
    ) {
      this._field_media_audio_file = new AudioFile(props.field_media_audio_file);
    }
    if (
      props.field_transcript !== undefined &&
      this.field_transcript === undefined
    ) {
      this._field_transcript = new DocumentFile(props.field_transcript);
    }
  }

  getThumbnail(): ImageFileInterface {
    return this.field_media_image;
  }

  getIncluded(): string {
    return "&include=field_media_image,field_media_audio_file";
  }

  hasData(): boolean {
    return this.status !== undefined;
  }

  get field_media_audio_file(): AudioFileInterface {
    return this._field_media_audio_file;
  }

  set field_media_audio_file(incoming: AudioFileInterface) {
    if (incoming) {
      this._field_media_audio_file = new AudioFile(incoming);
    }
  }

  get field_media_image(): ImageFileInterface {
    return this._field_media_image;
  }

  set field_media_image(value: ImageFileInterface) {
    this._field_media_image = new ImageFile(value);
  }

  get field_transcript(): DocumentFileInterface {
    return this._field_transcript;
  }

  set field_transcript(value: DocumentFileInterface) {
    this._field_transcript = new DocumentFile(value);
  }

  get media_type(): MediaTypeInterface {
    return this._media_type;
  }

  set media_type(value: MediaTypeInterface) {
    this._media_type = new MediaType(value);
  }

  get path(): PathObjectInterface {
    return this._path;
  }

  set path(value: PathObjectInterface) {
    this._path = new PathObject(value);
  }

  get thumbnail(): ImageFileInterface {
    return this._thumbnail;
  }

  set thumbnail(incoming: ImageFileInterface) {
    this._thumbnail = new ImageFile(incoming);
  }

  getThumbnail() {
    return this.thumbnail;
  }
}

export default MediaPodcastEpisode;
