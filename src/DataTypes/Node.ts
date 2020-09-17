import RevisionableEntity, {RevisionableEntityInterface} from './RevisionableEntity';
import PathObject, {PathObjectInterface} from './PathObject';


interface NodeInterface extends RevisionableEntityInterface {

  drupal_internal__nid: number;
  path: PathObjectInterface;
  promoted: boolean;
  status: boolean;
  sticky: boolean;
  hasData(): boolean;
  getIncluded(): string;

 }

abstract class Node extends RevisionableEntity implements NodeInterface {

  drupal_internal__nid: number;
  _path: PathObject;
  promoted: boolean;
  status: boolean;
  sticky: boolean;

  get path(): PathObjectInterface {
    return this._path;
  }

  set path(incoming: PathObjectInterface) {
    this._path = new PathObject(incoming);
  }

  abstract hasData(): boolean;

  abstract getIncluded(); string;

 }

export { Node as default, NodeInterface }
