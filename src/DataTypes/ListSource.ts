import JSONApiUrl from "./JSONApiUrl";
import Entity, { EntityInterface } from "./Entity";
import { ListableInterface } from "./Listable";

export interface ListSourceInterface {
  id: string;
  url?: string;
  items?: Array<EntityInterface>;
  entityTypeId?: string;
  bundle?: string;
  browser: boolean;
  hasData(): boolean;
  refresh(): Promise<ListSourceInterface>;
}

export abstract class ListSource implements ListSourceInterface, ListableInterface {
  id: string;
  bundle: string;

  _url?: JSONApiUrl;

  _items: Array<EntityInterface>;

  entityTypeId: string;

  abortController: AbortController;

  browser: boolean;

  constructor(incoming: ListSourceInterface) {
    if (incoming) {
      Object.assign(this, incoming);
    }
    this.browser = false;
    this.abortController = new AbortController();
    console.debug("list Source Constructor", this);
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

  public static clone(incoming: ListSourceInterface): ListSource {
    if (incoming instanceof ListSource) {
      return new ListSource(incoming.toObject());
    }
    return new ListSource(incoming);
  }

  abstract refresh(): Promise<ListSourceInterface>;

  get items(): Array<EntityInterface> {
    return this._items;
  }

  set items(incoming: Array<EntityInterface>) {
    this._items = incoming;
  }

  addItems(incoming: Array<EntityInterface>) {
    if (!Array.isArray(this.items)) {
      this._items = [];
    }
    this._items.push(...incoming);
  }

  abstract clone(): ListSourceInterface;

  toObject(): ListSourceInterface {
    return {
      id: this.id,
      url: this.url,
      items: this.items,
      entityTypeId: this.entityTypeId,
      bundle: this.bundle,
    };
  }

  getInstance(...args: any[]) {
    var instance = Object.create(Object.getPrototypeOf(this));
    instance.constructor.apply(instance, args);
    return instance;
  }
}

export default ListSource;
