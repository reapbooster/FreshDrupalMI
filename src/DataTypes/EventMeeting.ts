import Event, {
  EventInterface,
} from "./Event";
import { TextFieldInterface } from "../Fields/TextField";
import {ParagraphInterface} from "./Paragraph";

export interface EventMeetingInterface extends EventInterface {
  field_blurb?: string;
  field_campaign_id?: string;
  field_campaign_name?: string;
  field_campaign_owner?: string;
  field_campaign_type?: string;
  field_campaign_type_public?: string;
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
  field_content: Array<ParagraphInterface>;

}

export class EventMeeting extends Event {
  field_blurb?: string;

  field_campaign_id?: string;

  field_campaign_name?: string;

  field_campaign_owner?: string;

  field_campaign_type?: string;

  field_campaign_type_public?: string;

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

  field_content: Array<ParagraphInterface>;


  constructor(incoming: EventMeetingInterface) {
    super(incoming);
    Object.assign(this, incoming)
  }

  getIncluded(): string {
    return "&include=entity_type,field_picture";
  }

  hasData(){
    return this.field_grid_event_id !== undefined;
  }
}

export default EventMeeting;
