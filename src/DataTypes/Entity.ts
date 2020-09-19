import LinkList, { LinkListInterface } from "./LinkList";


interface EntityInterface {
  changed: string;
  created: string;
  id: string;
  links: LinkListInterface;
  type: string;
  label: string;
}


abstract class Entity implements EntityInterface {
  _changed: Date;
  _created: Date;
  _links: LinkList;
  id: string;
  type: string;
  label: string;

  constructor(incoming: EntityInterface) {
    Object.assign(this, incoming);
  }

  get links(): LinkListInterface {
    return this._links;
  }

  set links(incoming: LinkListInterface) {
    this._links = new LinkList(incoming);
  }

  get created() {
    return this._created.toString();
  }

  set created(incoming: string) {
    this._created = new Date(incoming);
  }

  get changed(): string {
    return this._changed.toString();
  }

  set changed(incoming) {
    this._changed = new Date(incoming);
  }

}


export {Entity as default, EntityInterface}
