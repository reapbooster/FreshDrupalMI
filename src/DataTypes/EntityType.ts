

interface EntityTypeInterface {
  type: string;
  id: string;
}

abstract class EntityType implements EntityTypeInterface {
  type: string;
  id: string;

  constructor(incoming: EntityTypeInterface) {
    Object.assign(this, incoming);
  }
}

export {EntityType as default, EntityTypeInterface};
