import ColorObject, {ColorObjectInterface} from "./ColorObject";
import {FontAwesomeIconProps} from "@fortawesome/react-fontawesome";
import PathObject, {PathObjectInterface} from "./PathObject";
import LinkList, {LinkListInterface} from './LinkList';
import Entity, {EntityInterface} from './Entity';

interface TaxonomyTermInterface extends EntityInterface {

  description: string;
  drupal_internal__tid: number;
  field_tag_color: ColorObjectInterface,
  field_tag_icon: FontAwesomeIconProps;
  field_visibility: boolean;
  path: PathObjectInterface;
  vid: string;

}

class TaxonomyTerm extends Entity implements TaxonomyTermInterface {
  
  _field_tag_color: ColorObject;
  _path: PathObject;
  description: string;
  drupal_internal__tid: number;
  field_tag_icon: FontAwesomeIconProps;
  field_visibility: boolean;
  vid: string;

  get field_tag_color(): ColorObjectInterface {
    return this._field_tag_color;
  }

  set field_tag_color(incoming: ColorObjectInterface) {
    this._field_tag_color = new ColorObject(incoming);
  }

  get path(): PathObjectInterface {
    return this._path;
  }

  set path(incoming: PathObjectInterface) {
    this._path = new PathObject(incoming);
  }

}

export { TaxonomyTerm as default, TaxonomyTermInterface };
