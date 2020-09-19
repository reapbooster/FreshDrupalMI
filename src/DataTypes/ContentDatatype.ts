import LinkList, { LinkListInterface } from './LinkList';
import User, { UserInterface } from './User';
import PathObject, { PathObjectInterface } from './PathObject';
import NodeType, { NodeTypeInterface } from './NodeType';
import Entity, {EntityInterface} from "./Entity";

interface ContentDatatypeInterface extends EntityInterface {

  changed: string,
  created: string,
  default_langcode: boolean,
  drupal_internal__nid: number,
  drupal_internal__vid: number,
  langcode: string,
  metatag?: object,
  node_type: NodeTypeInterface,
  path: PathObjectInterface,
  promote: boolean,
  revision_log?: string,
  revision_timestamp: string,
  revision_translation_affected: boolean,
  revision_uid: UserInterface,
  status: boolean,
  sticky: boolean,
  title: string,
  uid: UserInterface,

}

abstract class ContentDatatype extends Entity implements ContentDatatypeInterface {

  _changed: Date;
  _created: Date;
  _revision_timestamp: Date;
  _uid: User;
  _path: PathObject;
  _node_type: NodeTypeInterface;
  _links: LinkList;
  _revision_uid: User;

  default_langcode: boolean;
  drupal_internal__nid: number;
  drupal_internal__vid: number;
  langcode: string;
  metatag?: object;
  promote: boolean;
  revision_log?: string;
  revision_translation_affected: boolean;
  status: boolean;
  sticky: boolean;
  title: string;

  get revision_timestamp() : string  {
    return this._revision_timestamp.toString();
  }

  set revision_timestamp(incoming) {
    this._revision_timestamp = new Date(incoming);
  }

  get created() {
    return this._created.toString();
  }

  set created(incoming: string) {
    this._created = new Date(incoming);
  }

  get changed(): string {
    return this._changed.toString();
  }

  set changed(incoming) {
    this._changed = new Date(incoming);
  }

  get path() : PathObjectInterface {
    return this._path;
  }

  set path(incoming: PathObjectInterface) {
    this._path = new PathObject(incoming);
  }

  get user() : UserInterface {
    return this._uid;
  }

  get uid() : UserInterface {
    return this._uid;
  }

  set user(incoming: UserInterface) {
    this._uid = new User(incoming)
  }

  set uid(incoming: UserInterface) {
    this._uid = new User(incoming);
  }

  get node_type(): NodeType {
    return this._node_type;
  }

  set node_type(incoming) {
    this._node_type = new NodeType(incoming);
  }

  get links(): LinkListInterface {
    return this._links;
  }

  set links(incoming: LinkListInterface) {
    this._links = new LinkList(incoming);
  }

  get revision_uid(): UserInterface {
    return this._revision_uid;
  }

  set revision_uid(incoming: UserInterface) {
    this._revision_uid = new User(incoming);
  }


}


export { ContentDatatype as default, ContentDatatypeInterface }
