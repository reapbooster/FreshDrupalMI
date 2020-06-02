import LinkList from "./LinkList";


interface DrupalDefaultEntityInterface {
  type: string;
  id: string;
  links?: LinkList;
  langcode?: string;
  status?: boolean;
  created?: string;
  entityTypeId: string;
  bundle: string;
}

class DrupalDefaultEntityValues {
  type?: string;
  id?: string;
  links?: LinkList;
  langcode?: string;
  status?: boolean;
  created?: string;
  entityTypeId?: string;
  bundle?: string;
}

export { DrupalDefaultEntityInterface, DrupalDefaultEntityValues } ;
