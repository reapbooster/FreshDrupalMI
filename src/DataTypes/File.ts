import Entity, {EntityInterface} from './Entity';
import { UserInterface } from './User';

interface FileURIInterface {
  value: string;
  url: string;
}


interface FileInterface extends EntityInterface {

  drupal_internal__fid: number;
  uid: UserInterface;
  uri: FileURIInterface;
  
}


abstract class File extends Entity implements FileInterface {

  drupal_internal__fid: number;
  uid: UserInterface;
  uri: FileURIInterface;

}


export { File as default, FileInterface }