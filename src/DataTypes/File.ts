import Entity, { EntityInterface } from "./Entity";
import { UserInterface } from "./User";

export interface FileURIInterface {
  value: string;
  url: string;
}

export interface FileInterface extends EntityInterface {
  drupal_internal__fid: number;
  uid: UserInterface;
  uri: FileURIInterface;

  hasData(): boolean;
  getIncluded(): string;
}

export abstract class File extends Entity implements FileInterface {
  drupal_internal__fid: number;

  uid: UserInterface;

  uri: FileURIInterface;
}

export default File;
