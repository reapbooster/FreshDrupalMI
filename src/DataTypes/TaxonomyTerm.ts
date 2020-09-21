import { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import ColorObject, { ColorObjectInterface } from "./ColorObject";
import PathObject, { PathObjectInterface } from "./PathObject";
import Entity, { EntityInterface } from "./Entity";

export interface TaxonomyTermInterface extends EntityInterface {
  description?: string;
  drupal_internal__tid?: number;
  field_visibility?: boolean;
  vid?: string;

  field_tag_color?: ColorObjectInterface;
  field_tag_icon?: FontAwesomeIconProps;
  path?: PathObjectInterface;
}

export default class TaxonomyTerm
  extends Entity
  implements TaxonomyTermInterface {
  description?: string;

  drupal_internal__tid?: number;

  field_visibility?: boolean;

  vid?: string;

  private _field_tag_color?: ColorObject;

  private _field_tag_icon?: FontAwesomeIconProps;

  private _path?: PathObject;

  constructor(incoming: TaxonomyTermInterface) {
    super(incoming);
    Object.assign(this, incoming);
  }

  get field_tag_color(): ColorObjectInterface | null {
    return this._field_tag_color ?? null;
  }

  set field_tag_color(incoming: ColorObjectInterface) {
    this._field_tag_color = new ColorObject(incoming);
  }

  get field_tag_icon(): FontAwesomeIconProps {
    return this._field_tag_icon;
  }

  set field_tag_icon(field_tag_icon: FontAwesomeIconProps) {
    this._field_tag_icon = field_tag_icon;
  }

  get path(): PathObjectInterface {
    return this._path;
  }

  set path(incoming: PathObjectInterface) {
    this._path = new PathObject(incoming);
  }
}
