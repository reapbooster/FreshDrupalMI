import JSONApiUrl from './JSONApiUrl';


interface ListComponentSourceInterface {
  id: string;
  url?: string;
  items?: Array<Any>;
  entityTypeId: string;
}

class ListComponentSource implements ListComponentSourceInterface {
  
  id: string;
  _url?: JSONApiUrl;
  items: [];
  entityTypeId: string;
  abortController: AbortController;

  constructor(incoming: ListComponentSourceInterface) {
    Object.assign(this, incoming);
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

  getSourceData() : Promise<Array<any>> {
    const self = this;
    return new Promise((resolve, reject) => {
      if (self.url?.toString()) {
        return  fetch(self.url, { signal: this.abortController.signal })
        .then(res => res.json())
        .then(ajaxData => {
          ajaxData.data.map((item) => {
            self.items.push(item);
          });
        })
        .catch(e => {
            console.error(`Fetch 1 error: ${e.message}`);
        });
      }
      return resolve(self.items);
    })
    
  }

}

export {ListComponentSource as default, ListComponentSourceInterface}