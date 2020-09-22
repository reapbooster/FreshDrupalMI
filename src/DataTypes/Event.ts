import RevisionableEntity, {
  RevisionableEntityInterface,
} from "./RevisionableEntity";

export interface EventInterface extends RevisionableEntityInterface {
  drupal_internal__id: number;
  langcode: string;
  title: string;

  hasData(): boolean;
  getIncluded(): string;
}

export abstract class Event extends RevisionableEntity implements EventInterface {
  drupal_internal__id: number;

  title: string;

  langcode: string;


  hasData(): boolean {}

  getIncludecd(): string {
    return "&include=entity_type,field_picture";
  }
}



export default Event;
