import JSONApiUrl from "./JSONApiUrl";
import Entity, {EntityInterface} from "./Entity";
import {ListableInterface} from "./Listable";


export interface ListComponentSourceInterface {
  id: string;
  url?: string;
  items?: Array<any>;
  entityTypeId?: string;
  bundle?: string;
  hasData(): boolean;
  refresh(): Promise<Array<EntityInterface>>;
}

export class ListSource
  implements ListComponentSourceInterface, ListableInterface {

  id: string;
  bundle: string;

  _url?: JSONApiUrl;

  _items: Array<EntityInterface>;

  entityTypeId: string;

  abortController: AbortController;

  browser: any;

  constructor(incoming: ListComponentSourceInterface) {
    console.debug("list Source Constructor", incoming);
    this._items = [];
    if (incoming) {
      Object.assign(this, incoming);
    }
    this.browser = false;
    this.abortController = new AbortController();
  }

  get url(): string {
    return this._url.toString() ?? null;
  }

  set url(incoming: string) {
    this._url = new JSONApiUrl(incoming);
  }


  updateQuery(newQuery: URLSearchParams): Promise<Array<any>> {
    this._url.query = newQuery;
    return this.getSourceData();
  }

  hasData(): boolean {
    // if Items is undefined, the first call has not been made
    return Array.isArray(this.items);
  }

  public static clone(incoming: ListComponentSourceInterface): ListSource {
    if (incoming instanceof ListSource) {
      return new ListSource(incoming.toObject());
    }
    return new ListSource(incoming);
  }

  async refresh(url: JSONApiUrl = null): Promise<Array<EntityInterface>> {
    // if you don't get a new URL, use the one you have
    console.debug("refresh called!", this, url);
    const toSend = (url instanceof JSONApiUrl)? url :  this._url;
    const self = this;
    return new Promise((resolve, reject) => {
      console.debug("fetching data...", toSend);
      return fetch(toSend.toString(), { signal: this.abortController.signal })
        .then(res => res.json())
        .then((ajaxData) => {
          console.debug("back from jsonapi", ajaxData);
          self.addItems(ajaxData.data);
          resolve(self.items);
        })
        .catch((e) => {
          console.error(`Fetch 1 error: ${e.message}`);
          reject(new Error("Error fetching items for list: ".concat()));
        });
    });
  }

  get items(): Array<EntityInterface> {
    return this._items;
  }

  set items(incoming: Array<EntityInterface>) {
    this._items = incoming;
  }

  addItems(incoming: Array<EntityInterface>) {
    this._items.push(...incoming);
  }

  toObject(): ListComponentSourceInterface {
    return {
      id: this.id,
      url: this.url,
      items: this.items,
      entityTypeId: this.entityTypeId,
      bundle: this.bundle,
    }
  }
}

export default ListSource;
