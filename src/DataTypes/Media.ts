import MediaType, {MediaTypeInterface} from "./MediaType";
import RevisionableEntity, {RevisionableEntityInterface,} from "./RevisionableEntity";
import {ImageFileInterface} from "./ImageFile";
import {PathObjectInterface} from "./PathObject";


export interface MediaInterface extends RevisionableEntityInterface {
  drupal_internal__mid: string;
  path: PathObjectInterface;
  bundle: MediaTypeInterface;
  name: string;
  field_filemime: string;
  field_filesize: number;
  field_height: string | number;
  field_media_image: ImageFileInterface;
  field_photo_subject_name: string;
  field_photo_subject_title: string;
  field_media_in_library: boolean;
  field_width: string | number;

  hasData(): boolean;

  getIncluded(): string;

  getThumbnail(): ImageFileInterface;
}

export abstract class Media extends RevisionableEntity implements MediaInterface {
  drupal_internal__mid: string;
  name: string;
  path: PathObjectInterface;
  _bundle: MediaType;

  field_filemime: string;

  field_filesize: number;

  field_height: string;

  field_width: string;

  status: boolean;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }

  get label(): string {
    return this.name ?? "";
  }

  set title(incoming: string) {
    this._name = incoming;
  }

  get title(): string {
    return this._name;
  }

  get bundle(): MediaTypeInterface {
    return this._bundle;
  }

  set bundle(incoming: MediaTypeInterface) {
    this._bundle = new MediaType(incoming);
  }

  abstract hasData(): boolean;

  abstract getIncluded(): string;

  abstract getThumbnail(): ImageFileInterface;

}

export default Media;
