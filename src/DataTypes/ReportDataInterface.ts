import PathObject from "./PathObject";
import {EntityComponentProps} from "./EntityComponentProps";
import ImageEntityProps from "./ImageEntityProps";


interface ReportDataInterface {
  id: string;
  type: string;
  drupal_internal__mid: number;
  drupal_internal__vid: 9524;
  langcode: string;
  revision_created: string;
  revision_log_message?: string;
  status: boolean;
  name: string;
  created: string;
  changed: string;
  default_langcode: boolean;
  revision_translation_affected: boolean;
  metatag?: object;
  path: PathObject;
  field_custom_author?: object;
  field_essay: Array<any>;
  field_filemime?: string;
  field_filesize?: number;
  field_meta_tags?: object;
  bundle: EntityComponentProps;
  revision_user: Object;
  uid: object;
  thumbnail: ImageEntityProps;
  field_author: object;
  field_centers: object;
  field_content: Array<EntityComponentProps>;
  field_media_file: EntityComponentProps;
  field_program_initiatives: Array<EntityComponentProps>;
  field_related_event: EntityComponentProps;
  field_term_collection: object;
  field_topics: Array<EntityComponentProps>;
}

export default ReportDataInterface;
