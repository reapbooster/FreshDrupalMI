import Entity, {EntityInterface} from './Entity';
import TextField, {TextFieldInterface} from "../Fields/TextField";


interface EventInterface extends EntityInterface {

  title: string;
  drupal_internal__id: number;
  langcode: string;
  field_blurb?: string;
  field_campaign_id?: string;
  field_campaign_name?: string;
  field_campaign_owner?: string;
  field_campaign_type?: string;
  field_campaign_type_public?: string
  field_description?: TextFieldInterface;
  field_event_date?: string;
  field_grid_event_id: string;
  field_name_short: string;
  field_published: boolean;
  field_registration_deadline?: string;
  field_sequential_id: number;
  field_speakers?: string;
  field_venue?: string;
  event_type: object;
  field_picture: object;
  field_tracks: object;
}

abstract class Event extends Entity {
  title: string;
  drupal_internal__id: number;
  langcode: string;
  field_blurb?: string;
  field_campaign_id?: string;
  field_campaign_name?: string;
  field_campaign_owner?: string;
  field_campaign_type?: string;
  field_campaign_type_public?: string
  field_description?: TextField;
  field_event_date?: string;
  field_grid_event_id: string;
  field_name_short: string;
  field_published: boolean;
  field_registration_deadline?: string;
  field_sequential_id: number;
  field_speakers?: string;
  field_venue?: string;
  event_type: object;
  field_picture: object;
  field_tracks: object;

}


export { Event as default, EventInterface };
