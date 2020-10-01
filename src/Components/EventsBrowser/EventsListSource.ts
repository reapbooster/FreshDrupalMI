import { ListSource, ListSourceInterface } from "../../DataTypes/ListSource";
import { EventInterface } from "../../DataTypes/Event";
import JSONApiUrl from "../../DataTypes/JSONApiUrl";

interface EventsListSourceInterface extends ListSourceInterface {
  items: Array<EventInterface>;
}

export class EventsListSource
  extends ListSource
  implements EventsListSourceInterface {
  _items: Array<EventInterface>;

  constructor(props: EventsListSourceInterface) {
    super(props);
    Object.assign(this, props);
  }

  get items(): Array<EventInterface> {
    return this._items;
  }

  set items(incoming: Array<EventInterface>) {
    this._items = incoming;
  }

  public clone<T extends object>(source: T): T {
    const self = this;
    return this.getInstance(this);
  }

  async refresh(url: JSONApiUrl = null): Promise<EventsListSource> {
    // if you don't get a new URL, use the one you have
    console.debug("refresh called!", this, url);
    const toSend = url instanceof JSONApiUrl ? url : this._url;
    const self = this;
    return fetch(toSend.toString(), { signal: this.abortController.signal })
      .then((res) => res.json())
      .then((ajaxData) => {
        console.debug("back from jsonapi", ajaxData);
        const theClone = self.clone();
        console.debug("THE CLONED DATA:", theClone);
        theClone.addItems(ajaxData.data);
        return theClone;
      })
      .catch((e) => {
        console.error(`Fetch 1 error: ${e.message}`);
        throw new Error("Error fetching items for list: ".concat(e.message));
      });
  }
}

export default EventsListSource;
