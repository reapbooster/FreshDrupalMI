
import JSONApiUrl from "./JSONApiUrl";

interface Link {
  href: JSONApiUrl;
}

interface ListListProps {
  self?: Link;
  previous?: Link;
  next?: Link;
  first?: Link;
  last?: Link;
}


class LinkList {
  self?:      JSONApiUrl;
  previous?:  JSONApiUrl;
  next?:      JSONApiUrl;
  first?:     JSONApiUrl;
  last?:      JSONApiUrl;

  constructor(incoming) {
    for (var i in incoming) {
      if (incoming[i].href) {
        this[i] = new JSONApiUrl(incoming[i].href);
      }
    }
  }
}

export { LinkList as default, Link }
