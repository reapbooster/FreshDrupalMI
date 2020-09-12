import LinkList, { LinkListInterface } from "./LinkList";


interface EntityInterface {
  type: string;
  id: string;
  links: LinkListInterface;
}


abstract class Entity implements EntityInterface {
  type: string;
  id: string;
  _links: LinkList;

  constructor(incoming: EntityInterface) {
    Object.assign(this, incoming);
  }

  get links(): LinkListInterface {
    return this._links;
  }

  set links(incoming: LinkListInterface) {
    this._links = new LinkList(incoming);
  }

}


export {Entity as default, EntityInterface}
