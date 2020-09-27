import JSONApiUrl from "./JSONApiUrl";
import {EntityInterface} from "./Entity";
import {ListableInterface} from "./Listable";


export interface ListComponentSourceInterface {
  id: string;
  url?: string;
  items?: Array<any>;
  entityTypeId?: string;
  bundle?: string;
  hasData(): boolean;
  refreshItems(): Promise<Array<EntityInterface>>;
}

export class ListSource
  implements ListComponentSourceInterface, ListableInterface {
  id: string;
  bundle: string;

  _url?: JSONApiUrl;

  items: Array<EntityInterface>;

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
    return this.items?.length > 0 ?? false;
  }

  public static clone(incoming: ListComponentSourceInterface): ListSource {
    if (incoming instanceof ListSource) {
      return new ListSource(incoming.toObject());
    }
    return new ListSource(incoming);
  }

  refreshItems(): Promise<Array<EntityInterface>> {
    const self = this;
    return new Promise((resolve, reject) => {
      if (self.url?.toString()) {
        return fetch(self.url, { signal: this.abortController.signal })
          .then(res => res.json())
          .then((ajaxData) => {
            console.debug("back from jsonapi", ajaxData);
            self.items = ajaxData.data;
            resolve(self.items);
          })
          .catch((e) => {
            console.error(`Fetch 1 error: ${e.message}`);
          });
      }
      return resolve(self.items);
    });
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
