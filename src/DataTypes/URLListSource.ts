import ListSource, {ListComponentSourceInterface} from "./ListSource";
import {ListableInterface} from './Listable';
import {EntityInterface} from "./Entity";
import JSONApiUrl from "./JSONApiUrl";

export class URLListSource implements ListComponentSourceInterface, ListableInterface {

  entityTypeId: string;
  id: string;
  _items: Array<any>;
  _url?: JSONApiUrl;

  constructor(props: ListComponentSourceInterface) {
    Object.assign(this, props);
    if (! Array.isArray(this._items)) {
      this.refreshItems(this.url);
    }
  }

  get browser() {
    return false;
  }

  getItems(): Array<EntityInterface> {
    return this._items;
  }

  refreshItems(url: JSONApiUrl): void {
    var self = this;
    fetch(self.url)
      .then(res => res.json)
      .then(ajaxData => {
        ajaxData.data?.map((item) => {
          self._items.push(item);
        })
      });
  }

  get url(): string {
    this._url.toString();
  }

  set url(incoming: string) {
    this._url = new JSONApiUrl(incoming);
  }

}

export default URLListSource;
