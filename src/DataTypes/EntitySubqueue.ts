import Entity, { EntityInterface } from './Entity';
import {ListableInterface} from "./Listable";
import JSONApiUrl from "./JSONApiUrl";

export interface EntityQueueInterface extends EntityInterface {

  vid: string;
}

export class EntityQueue extends Entity implements EntityQueueInterface {

  vid: string;

  constructor(props) {
    super(props);
    Object.assign(this, props);
  }
}

export interface EntitySubqueueInterface extends EntityInterface {
  queue: EntityQueueInterface;
  items: Array<EntityInterface>;
}

export class EntitySubqueue extends Entity implements EntitySubqueueInterface, ListableInterface {
  queue: EntityQueue;
  items: Array<EntityInterface>;

  constructor(incoming) {
    super(incoming);
    Object.assign(this, incoming);
  }

  getIncluded(): string {
    return "&include=queue,items";
  }

  hasData() {
    return Array.isArray(this.items);
  }

  getItems(): Array<EntityInterface> {
      return this.items ?? [];
  }

  refreshItems(url: JSONApiUrl) {
    //TODO
  }

  get browser() {
    return false;
  }

}

export default EntitySubqueue;
