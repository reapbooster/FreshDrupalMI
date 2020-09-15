import { ParagraphsTypeInterface } from './ParagraphsType';
import Entity, {EntityInterface} from './Entity';
import ImageFile, {ImageFileInterface} from './ImageFile';
import AudioFile, {AudioFileInterface} from './AudioFile';
import DocumentFile, {DocumentFileInterface} from './DocumentFile';
import LinkList from './LinkList';
import TextField from '../Fields/TextField';
import PathObject from './PathObject';
import MediaType from './MediaType'
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
  
  _field_media_audio_file: AudioFile;
  field_body: TextField;
  field_episode: number;
  field_media_image: ImageFile;
  field_media_in_library: boolean;
  field_service_links: Array<MediaPodcastServiceLinkInterface>;
  field_summary: TextField;
  field_transcript: DocumentFile;
  media_type: MediaType;
  path: PathObject


  get field_media_audio_file() {
    return this._field_media_audio_file;
  }

  set field_media_audio_file(incoming: AudioFileInterface) {
    this._field_media_audio_file = new AudioFile(incoming);
  }

}



export {MediaPodcastEpisode as default, MediaPodcastEpisodeInterface, MediaPodcastServiceLinkInterface}