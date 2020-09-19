import RevisionableEntity, {RevisionableEntityInterface} from './RevisionableEntity';
import TextField, {TextFieldInterface} from "../Fields/TextField";


interface EventInterface extends RevisionableEntityInterface {

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
  hasData(): boolean;
  getIncluded(): string;

}

abstract class Event extends RevisionableEntity implements EventInterface {

  drupal_internal__id: number;
  title: string;
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

  hasData(): boolean {
    return
  }

  getIncludecd(): string {
    return "";
  }

}

class ConferenceEvent extends Event { }

class MeetingEvent extends Event { }

class SummitEvent extends Event { }

export { Event as default, EventInterface, ConferenceEvent, MeetingEvent, SummitEvent };
