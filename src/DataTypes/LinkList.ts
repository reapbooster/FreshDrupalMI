
import JSONApiUrl from "./JSONApiUrl";

interface LinkInterface {
  href: JSONApiUrl;
}

interface LinkListInterface {
  self?: LinkInterface;
  previous?: LinkInterface;
  next?: LinkInterface;
  first?: LinkInterface;
  last?: LinkInterface;
}


class LinkList implements LinkListInterface{
  self?:      LinkInterface;
  previous?:  LinkInterface;
  next?:      LinkInterface;
  first?:     LinkInterface;
  last?:      LinkInterface;

  constructor(incoming: LinkListInterface) {
    Object.assign(this, incoming);
  }

}

export { LinkList as default, LinkListInterface, LinkInterface }
