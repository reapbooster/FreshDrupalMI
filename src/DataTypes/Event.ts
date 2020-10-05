import RevisionableEntity, {
  RevisionableEntityInterface,
} from "./RevisionableEntity";
import PathObject, { PathObjectInterface } from "./PathObject";
import { TextFieldInterface } from "../Fields/TextField";
import { ParagraphInterface } from "./Paragraph";

export interface EventInterface extends RevisionableEntityInterface {
  drupal_internal__id?: number;
  langcode?: string;
  title?: string;
  path?: PathObjectInterface;

  field_blurb?: string;
  field_campaign_id?: string;
  field_campaign_name?: string;
  field_campaign_owner?: string;
  field_campaign_type?: string;
  field_campaign_type_public?: string;
  field_description?: TextFieldInterface;
  field_event_date?: string;
  field_grid_event_id?: string;
  field_name_short?: string;
  field_published?: boolean;
  field_registration_deadline?: string;
  field_sequential_id?: number;
  field_speakers?: string;
  field_venue?: string;
  event_type?: Record<string, any>;
  field_picture?: Record<string, any>;
  field_tracks?: Record<string, any>;
  field_content?: Array<ParagraphInterface>;
}

export abstract class Event
  extends RevisionableEntity
  implements EventInterface {
  drupal_internal__id?: number;
  title?: string;
  langcode?: string;
  private _path?: PathObject;

  field_blurb?: string;
  field_campaign_id?: string;
  field_campaign_name?: string;
  field_campaign_owner?: string;
  field_campaign_type?: string;
  field_campaign_type_public?: string;
  field_description?: TextFieldInterface;
  field_event_date?: string;
  field_grid_event_id?: string;
  field_name_short?: string;
  field_published?: boolean;
  field_registration_deadline?: string;
  field_sequential_id?: number;
  field_speakers?: string;
  field_venue?: string;
  event_type?: Record<string, any>;
  field_picture?: Record<string, any>;
  field_tracks?: Record<string, any>;
  field_content?: Array<ParagraphInterface>;

  get path(): PathObjectInterface {
    return this._path;
  }

  set path(value: PathObjectInterface) {
    this._path = new PathObject(value);
  }

  hasData(): boolean {
    return this.drupal_internal__id !== undefined;
  }

  getIncluded(): string {
    return "&include=field_overview";
  }

  getEventDate(): Date {
    return this._field_event_date;
  }
}

export default Event;
