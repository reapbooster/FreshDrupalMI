

interface Link {
  href: string;
}


class LinkList {
  self?: Link;
  previous?: Link;
  next?: Link;
  first?: Link;
  last?: Link;
}

export { LinkList as default, Link }
