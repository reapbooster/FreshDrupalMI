import MediaType, {MediaTypeInterface} from './MediaType';
import RevisionableEntity, {RevisionableEntityInterface} from './RevisionableEntity';
import ImageFile, { ImageFileInterface } from './ImageFile';

interface MediaInterface extends RevisionableEntityInterface {
  
  drupal_internal__mid: string;
  path: object;
  bundle: MediaTypeInterface;

}

abstract class Media extends RevisionableEntity implements MediaInterface {

  drupal_internal__mid: string;
  path: object;
  _bundle: MediaType;

  get bundle(): MediaTypeInterface {
    return this._bundle;
  }

  set bundle(incoming: MediaTypeInterface) {
    this._bundle = new MediaType(incoming);
  }

}

export { Media as default, MediaInterface }