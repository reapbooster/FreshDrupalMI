import Entity, { EntityInterface } from './Entity';

export interface EntityQueueInterface extends EntityInterface {

}

export class EntityQueue extends Entity implements EntityQueueInterface {

}

export interface EntitySubqueueInterface extends EntityInterface {
  queue: EntityQueueInterface;
  items: Array<EntityInterface>;
}

export class EntitySubqueue extends Entity implements EntitySubqueueInterface {
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
}

export default EntitySubqueue;
