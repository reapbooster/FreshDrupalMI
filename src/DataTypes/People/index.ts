import Entity, { EntityInterface } from "./Entity";

export interface PeopleInterface extends EntityInterface {
  drupal_internal__id?: number;
}

export class People extends Entity implements PeopleInterface {
  drupal_internal__id?: number;
}

export default People;
