import {EntityComponentProps} from "../../DataTypes/EntityComponentProps";


interface LandingPageContentInterface {
  type: string;
  id: string;
  links: object;
  drupal_internal__nid: number;
  drupal_internal__vid: number;
  langcode: string;
  revision_timestamp: string;
  revision_log?: string;
  status: boolean;
  title: string;
  created: string;
  changed: string
  promote: boolean;
  sticky: boolean;
  default_langcode: string;
  revision_translation_affected: boolean;
  metatag?: object;
  path: object;
  field_meta_tags?: object;
  layout_builder__layout: object;
  node_type: object;
  revision_uid: object;
  uid: object;
  field_content: Array<any>;
}

class LandingPageContent {

  type: string;
  id: string;
  links: object;
  drupal_internal__nid: number;
  drupal_internal__vid: number;
  langcode: string;
  revision_timestamp: string;
  revision_log?: string;
  status: boolean;
  title: string;
  created: string;
  changed: string
  promote: boolean;
  sticky: boolean;
  default_langcode: string;
  revision_translation_affected: boolean;
  metatag?: object;
  path: object;
  field_meta_tags?: object;
  layout_builder__layout: object;
  node_type: object;
  revision_uid: object;
  uid: object;
  field_content: Array<EntityComponentProps>;

  constructor(props: LandingPageContentInterface) {
    var propCopy = Object.assign({}, props);
    Object.assign(this, propCopy);
    if (propCopy.field_content?.length) {
      this.field_content = propCopy.field_content.map((item) => {return new EntityComponentProps(item)});
    }
  }

}


export { LandingPageContent as default, LandingPageContentInterface }
