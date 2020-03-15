
import { BodyFieldData } from '../Fields/BodyField';
import { EntityComponentProps } from './EntityComponentProps';
import ImageEntityProps from "./ImageEntityProps";

interface VideoDataInterface {
  type: string,
  id: string,
  links: object,
  drupal_internal__mid: number,
  drupal_internal__vid: number,
  langcode: string,
  revision_created: string,
  revision_log_message: string,
  status: boolean,
  name: string,
  created: string,
  changed: string,
  default_langcode: boolean,
  revision_translation_affected: boolean,
  metatag: object,
  path: object,
  field_body: BodyFieldData,
  field_embedded_id: string,
  field_embedded_service: string,
  field_height: number,
  field_media_oembed_video: string,
  field_meta_tags: object,
  field_subheader: string,
  field_thumbnail_uri: string,
  field_video_height: number,
  field_video_width: number,
  field_width: number,
  bundle: object,
  revision_user: object,
  uid: object,
  thumbnail: ImageEntityProps,
  field_centers: object,
  field_event_reference: object,
  field_program_initiatives: object,
  field_related_event: object,
  field_speakers: object,
  field_term_collection: object,
  field_topics: object
}


export default VideoDataInterface;
