import {EntityComponentProps} from "./EntityComponentProps";
import ColorObject from "./ColorObject";
import {FontAwesomeIconProps} from "@fortawesome/react-fontawesome";
import PathObject from "./PathObject";
import LinkList from './LinkList';

interface TaxonomyTermProps {
  type: string;
  id: string;
  name: string;
  description: string;
  changed: string;
  created: string;
  path: PathObject;
  links: LinkList;
  field_tag_color: ColorObject,
  field_tag_icon: FontAwesomeIconProps;
  field_visibility: boolean;
  vid: string;
}

class TaxonomyTerm {
  type: string;
  id: string;
  name: string;
  description: string;
  changed: string;
  created: string;
  path: PathObject;
  links: LinkList;
  field_tag_color: ColorObject,
  field_tag_icon: FontAwesomeIconProps;
  field_visibility: boolean;
  vid: string;

  constructor(incoming: TaxonomyTermProps) {
    Object.assign(this, incoming);
  }

}

export { TaxonomyTerm as default, TaxonomyTermProps };
