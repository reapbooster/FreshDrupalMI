import MediaType, {MediaTypeInterface} from './MediaType';
import RevisionableEntity, {RevisionableEntityInterface} from './RevisionableEntity';
import ImageFile, { ImageFileInterface } from './ImageFile';
import MediaVideo from './MediaVideo'
import MediaImage from './MediaImage'
import MediaPodcastEpisode from './MediaPodcastEpisode';
import MediaReport from './MediaReport';

interface MediaInterface extends RevisionableEntityInterface {

  drupal_internal__mid: string;
  path: object;
  bundle: MediaTypeInterface;
  field_filemime: string;
  field_filesize: number;
  field_height: string|number;
  field_media_image: ImageFileInterface;
  field_photo_subject_name: string;
  field_photo_subject_title: string;
  field_media_in_library: boolean;
  field_width: string|number;
  hasData(): boolean;
  getIncluded(): string;

}

abstract class Media extends RevisionableEntity implements MediaInterface {

  drupal_internal__mid: string;
  path: object;
  _bundle: MediaType;
  field_filemime: string;
  field_filesize: number;
  field_height: string;
  _field_media_image: ImageFile;
  field_photo_subject_name: string;
  field_photo_subject_title: string;
  field_media_in_library: boolean;
  field_width: string;

  get bundle(): MediaTypeInterface {
    return this._bundle;
  }

  set bundle(incoming: MediaTypeInterface) {
    this._bundle = new MediaType(incoming);
  }

  get field_media_image(): ImageFileInterface {
    return this._field_media_image;
  }

  set field_media_image(incoming: ImageFileInterface) {
    this._field_media_image = new ImageFile(incoming);
  }

  hasData(): boolean {
    return false
  }

  getIncluded(): string {
    return "";
  }

}

export { Media as default, MediaInterface }
