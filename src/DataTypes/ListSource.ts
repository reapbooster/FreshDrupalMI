import JSONApiUrl from "./JSONApiUrl";
import {EntityInterface} from "./Entity";
import {ListableInterface} from "./Listable";

export interface ListComponentSourceInterface {
  id: string;
  url?: string;
  items?: Array<any>;
  entityTypeId: string;
}

export class ListSource
  implements ListComponentSourceInterface, ListableInterface {
  id: string;

  _url?: JSONApiUrl;

  items: [];

  entityTypeId: string;

  abortController: AbortController;

  constructor(incoming: ListComponentSourceInterface) {
    if (incoming) {
      Object.assign(this, incoming);
    }
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

  getItems(){
    return this.items;
  }

  getSourceData(): Promise<Array<EntityInterface>> {
    const self = this;
    return new Promise((resolve, reject) => {
      if (self.url?.toString()) {
        return fetch(self.url, { signal: this.abortController.signal })
          .then((res) => res.json())
          .then((ajaxData) => {
            return ajaxData.data.map((item) => {
              // push them to the local list object
              self.items.push(item);
            });
          })
          .catch((e) => {
            console.error(`Fetch 1 error: ${e.message}`);
          });
      }
      return resolve(self.items);
    });
  }
}

export default ListSource;
