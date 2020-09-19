import { ParagraphsTypeInterface } from './ParagraphsType';
import Entity, {EntityInterface} from './Entity';
import ImageFile, {ImageFileInterface} from './ImageFile';
import AudioFile, {AudioFileInterface} from './AudioFile';
import DocumentFile, {DocumentFileInterface} from './DocumentFile';
import LinkList from './LinkList';
import TextField from '../Fields/TextField';
import PathObject, {PathObjectInterface} from './PathObject';
import MediaType, {MediaTypeInterface} from './MediaType'
import Media, { MediaInterface } from './Media';


interface MediaPodcastServiceLinkInterface {
  key: string;
  description: string;
  value: string;
}

interface MediaPodcastEpisodeInterface extends MediaInterface {

  field_body: TextField;
  field_episode: number;
  field_media_audio_file: AudioFileInterface;
  field_media_image: ImageFileInterface;
  field_media_in_library: boolean;
  field_service_links: Array<MediaPodcastServiceLinkInterface>;
  field_summary: TextField;
  field_transcript: DocumentFileInterface;
  media_type: MediaType;
  parent_field_name: string;
  parent_type: string;
  path: PathObject;

}

class MediaPodcastEpisode extends Media implements MediaPodcastEpisodeInterface {

  field_photo_subject_name: string;
  field_photo_subject_title: string;
  parent_field_name: string;
  parent_type: string;



  _field_media_audio_file: AudioFile;
  private _field_body: TextField;
  field_episode: number;
  private _field_media_image: ImageFile;
  field_media_in_library: boolean;
  field_service_links: Array<MediaPodcastServiceLinkInterface>;
  field_summary: TextField;
  private _field_transcript: DocumentFile;
  private _media_type: MediaType;
  private _path: PathObject

  getIncluded(): string {
    return "&include=field_media_image,field_media_audio_file";
  }

  hasData(): boolean {
    return false;
  }

  get field_media_audio_file(): AudioFileInterface {
    return this._field_media_audio_file;
  }

  set field_media_audio_file(incoming: AudioFileInterface) {
    this._field_media_audio_file = new AudioFile(incoming);
  }
  get field_body(): TextField {
    return this._field_body;
  }

  set field_body(value: TextField) {
    this._field_body = value;
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

}



export {MediaPodcastEpisode as default, MediaPodcastEpisodeInterface, MediaPodcastServiceLinkInterface}
